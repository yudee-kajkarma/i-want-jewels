/**
 * Cost model.
 *
 * Estimates are deliberately biased HIGH — undershooting a budget is the
 * harmful direction. Real spend is tracked from API usage in translate.mjs
 * and enforced by --max-spend; treat these numbers as a planning aid only.
 *
 * Prices are USD per 1M tokens, verified against OpenAI's pricing docs on
 * 2026-08-18. Re-check before relying on them: prices move.
 */

export const MODELS = {
  'gpt-5.6-sol': { input: 5.0, cachedInput: 0.5, output: 30.0 },
  'gpt-5.6-terra': { input: 2.0, cachedInput: 0.2, output: 12.0 },
  'gpt-5.6-luna': { input: 0.2, cachedInput: 0.02, output: 1.2 },
  'gpt-5-mini': { input: 0.25, cachedInput: 0.025, output: 2.0 },
  'gpt-5-nano': { input: 0.05, cachedInput: 0.005, output: 0.4 },
};

/** Default tier assignment. Override per run with --high / --bulk. */
export const TIERS = {
  high: 'gpt-5.6-terra', // common.json + metadata: small volume, every page
  bulk: 'gpt-5.6-luna', // long-form articles: 97% of tokens
};

/**
 * Output tokens per input token, per locale. Bundles two effects: European
 * languages run longer than English, and a GPT tokenizer is less efficient on
 * them than on English. Conservative by design.
 */
export const OUTPUT_FACTOR = { de: 1.45, fr: 1.4, es: 1.35, it: 1.35, nl: 1.35 };

/** Rough token count for English source text. Good to roughly +/-15%. */
export function estimateTokens(chars) {
  return Math.ceil(chars / 4);
}

/**
 * Project cost for one scope.
 *
 * @param sourceTokens total translatable English tokens across all files
 * @param fileCount    number of requests per locale (system prompt is re-sent each time)
 * @param systemTokens size of the glossary + style guide prefix
 */
export function projectCost({ sourceTokens, fileCount, model, locales, systemTokens = 2500, batch = false }) {
  const price = MODELS[model];
  if (!price) throw new Error(`No pricing for model "${model}"`);

  let inputCost = 0;
  let outputCost = 0;
  let inputTokens = 0;
  let outputTokens = 0;

  for (const locale of locales) {
    // System prefix is identical across files for a locale, so only the first
    // request pays full price; the rest hit the automatic prompt cache.
    const systemFull = systemTokens;
    const systemCached = systemTokens * Math.max(0, fileCount - 1);
    const body = sourceTokens;
    const out = Math.ceil(sourceTokens * (OUTPUT_FACTOR[locale] ?? 1.4));

    inputTokens += systemFull + systemCached + body;
    outputTokens += out;

    inputCost += (systemFull / 1e6) * price.input
      + (systemCached / 1e6) * price.cachedInput
      + (body / 1e6) * price.input;
    outputCost += (out / 1e6) * price.output;
  }

  const multiplier = batch ? 0.5 : 1;
  return {
    model,
    inputTokens,
    outputTokens,
    inputCost: inputCost * multiplier,
    outputCost: outputCost * multiplier,
    total: (inputCost + outputCost) * multiplier,
  };
}

export function usd(n) {
  return `$${n.toFixed(2)}`;
}

/** Cost of a completed request, from the API's own usage object. */
export function actualCost(model, usage) {
  const price = MODELS[model];
  if (!price || !usage) return 0;
  const cached = usage.prompt_tokens_details?.cached_tokens ?? 0;
  const fresh = Math.max(0, (usage.prompt_tokens ?? 0) - cached);
  return (
    (fresh / 1e6) * price.input
    + (cached / 1e6) * price.cachedInput
    + ((usage.completion_tokens ?? 0) / 1e6) * price.output
  );
}
