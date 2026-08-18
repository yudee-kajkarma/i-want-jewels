/**
 * Translate English locale/content JSON into nl, de, fr, it, es via the OpenAI API.
 *
 * Usage:
 *   node scripts/translate/translate.mjs <scope> [options]
 *
 *   <scope>              locales | blogs | resources | a repo-relative .json path
 *   --locales=de,fr      subset of target locales          (default: all five)
 *   --limit=3            only the first N source files     (pilot runs)
 *   --filter=tennis      only files whose path contains this substring
 *   --max-spend=5        hard USD ceiling; aborts before exceeding it
 *   --model=gpt-5.6-luna override the tier's model
 *   --force              ignore the cache and re-translate everything
 *   --dry-run            print the first request and exit without calling the API
 *
 * Requires OPENAI_API_KEY in the environment.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

import { LOCALES, ROOT, readJson, resolveScope, writeJson } from './lib/corpus.mjs';
import { apply, collect, preserveExtras } from './lib/walk.mjs';
import { seoLimit } from './lib/seo.mjs';
import { MODELS, TIERS, actualCost, usd } from './lib/pricing.mjs';

const HERE = path.join(ROOT, 'scripts/translate');
const CACHE_FILE = path.join(HERE, '.cache.json');

/** Max source characters per request. Larger files are split, preserving order. */
const CHUNK_CHARS = 8000;
/** Parallel in-flight requests across the whole run. */
const CONCURRENCY = 6;
/** Translation is a spec-following task, not a reasoning one — keep this low. */
const REASONING_EFFORT = 'low';

// ---------------------------------------------------------------- arguments

const argv = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : fallback;
};
const has = (name) => argv.includes(`--${name}`);

const scope = argv.find((a) => !a.startsWith('--'));
if (!scope) {
  console.error('Usage: node scripts/translate/translate.mjs <scope> [options]');
  console.error('Scopes: locales | blogs | resources | <repo-relative .json path>');
  process.exit(1);
}

const locales = flag('locales') ? flag('locales').split(',') : LOCALES;
const limit = flag('limit') ? Number(flag('limit')) : Infinity;
const filter = flag('filter');
const maxSpend = flag('max-spend') ? Number(flag('max-spend')) : Infinity;
const force = has('force');
const dryRun = has('dry-run');

for (const locale of locales) {
  if (!LOCALES.includes(locale)) {
    console.error(`Unknown locale "${locale}". Known: ${LOCALES.join(', ')}`);
    process.exit(1);
  }
}

// ------------------------------------------------------------------ prompts

const glossary = readJson(path.join(HERE, 'glossary.json'));
const sharedStyle = fs.readFileSync(path.join(HERE, 'style/_shared.md'), 'utf8');

function glossaryFor(locale) {
  const lines = glossary.terms
    .map((term) => {
      const target = term.targets[locale];
      if (!target) return null;
      const note = term.note ? `  // ${term.note}` : '';
      return `- "${term.en}" -> "${target.use}"${note}`;
    })
    .filter(Boolean);

  return [
    `Never translate: ${glossary.doNotTranslate.join(', ')}.`,
    '',
    'Binding glossary:',
    ...lines,
  ].join('\n');
}

const systemPrompts = new Map(
  locales.map((locale) => {
    const localeStyle = fs.readFileSync(path.join(HERE, `style/${locale}.md`), 'utf8');
    return [
      locale,
      [
        sharedStyle,
        localeStyle,
        glossaryFor(locale),
        '',
        '## Output contract',
        'The user message is a JSON object with a `text` field mapping',
        'integer-string keys to English strings, in document order. It may also',
        'carry a `maxChars` field (see Length budgets above) and an `english`',
        'field for reference.',
        '',
        'Return a JSON object whose keys are exactly the keys of `text`, mapped',
        'to the translated strings. Do not nest the result under `text`. No extra',
        'keys, no missing keys, no commentary, no markdown fence.',
      ].join('\n\n'),
    ];
  }),
);

const styleFingerprint = crypto
  .createHash('sha256')
  .update([...systemPrompts.values()].join('\n'))
  .digest('hex')
  .slice(0, 12);

// -------------------------------------------------------------------- cache

const cache = force || !fs.existsSync(CACHE_FILE) ? {} : readJson(CACHE_FILE);
let cacheDirty = false;

const cacheKey = (locale, text) => `${locale}:${styleFingerprint}:${crypto
  .createHash('sha256')
  .update(text)
  .digest('hex')
  .slice(0, 20)}`;

function flushCache() {
  if (!cacheDirty) return;
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache), 'utf8');
  cacheDirty = false;
}

// ------------------------------------------------------------------ spend

let spent = 0;
let aborted = false;

function recordSpend(model, usage) {
  spent += actualCost(model, usage);
  if (spent >= maxSpend && !aborted) {
    aborted = true;
    console.error(`\n!! Spend ceiling reached (${usd(spent)} >= ${usd(maxSpend)}). Finishing in-flight work and stopping.`);
  }
}

// ------------------------------------------------------------------- client

// Imported lazily so estimate/validate/--dry-run need no dependency installed.
let client = null;
let reasoningSupported = true;

async function getClient() {
  if (client) return client;
  let OpenAI;
  try {
    ({ default: OpenAI } = await import('openai'));
  } catch {
    console.error('The "openai" package is not installed. Run:\n\n  npm install --save-dev openai\n');
    process.exit(1);
  }
  client = new OpenAI();
  return client;
}

/**
 * The exact user-message payload. `maxChars` attaches a hard character budget
 * to specific keys — without it the model cannot tell an SEO meta description
 * from body prose, since the payload is keyed by integer index and the path
 * (and therefore the rule) is invisible to it.
 */
function buildPayload(entries, limits = {}) {
  const relevant = Object.fromEntries(
    entries.map(([i]) => [String(i), limits[i]]).filter(([, max]) => max),
  );
  // maxChars is emitted BEFORE text so the model reads the constraint first
  // rather than after a few hundred strings of body copy.
  return {
    ...(Object.keys(relevant).length ? { maxChars: relevant } : {}),
    text: Object.fromEntries(entries.map(([i, text]) => [String(i), text])),
  };
}

async function translateChunk(locale, model, entries, label, limits = {}) {
  const payload = buildPayload(entries, limits);

  const request = {
    model,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompts.get(locale) },
      { role: 'user', content: JSON.stringify(payload) },
    ],
  };
  if (reasoningSupported) request.reasoning_effort = REASONING_EFFORT;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    let response;
    try {
      response = await (await getClient()).chat.completions.create(request);
    } catch (error) {
      // The reasoning_effort parameter name/values vary across model families.
      // Drop it once and carry on rather than failing the whole run.
      if (reasoningSupported && /reasoning_effort/i.test(error?.message ?? '')) {
        console.warn('  reasoning_effort rejected by the API — retrying without it');
        reasoningSupported = false;
        delete request.reasoning_effort;
        continue;
      }
      if (attempt === 3) throw error;
      await new Promise((r) => setTimeout(r, 1000 * attempt));
      continue;
    }

    recordSpend(model, response.usage);

    let parsed;
    try {
      parsed = JSON.parse(response.choices[0].message.content);
    } catch {
      if (attempt === 3) throw new Error(`${label}: model returned unparseable JSON after 3 attempts`);
      continue;
    }

    const missing = entries.filter(([i]) => typeof parsed[String(i)] !== 'string');
    if (missing.length === 0) return parsed;

    if (attempt === 3) {
      throw new Error(`${label}: ${missing.length}/${entries.length} keys missing after 3 attempts`);
    }
    console.warn(`  ${label}: ${missing.length} keys missing, retry ${attempt}/3`);
  }

  throw new Error(`${label}: exhausted retries`);
}

/**
 * Second pass over SEO strings that came back over budget. Sends the current
 * translation plus its limit and asks for a shorter rewrite, up to twice.
 * Returns { [index]: shortenedText } for whatever it managed to fix.
 */
async function repairLengths(locale, model, overLong, leaves, map, label) {
  const fixed = {};
  let remaining = overLong;

  for (let attempt = 1; attempt <= 2 && remaining.length; attempt += 1) {
    const payload = {
      instruction:
        'Each entry is a translation that exceeds its character budget. Rewrite each '
        + 'one SHORTER than maxChars, keeping the primary keyword and the meaning. '
        + 'Do not truncate mid-word or end with an ellipsis — rephrase. '
        + 'Return a JSON object mapping the same keys to the shortened text.',
      text: Object.fromEntries(remaining.map(([i]) => [String(i), map[leaves[i].path]])),
      maxChars: Object.fromEntries(remaining.map(([i, max]) => [String(i), max])),
      english: Object.fromEntries(remaining.map(([i]) => [String(i), leaves[i].value])),
    };

    let parsed;
    try {
      const response = await (await getClient()).chat.completions.create({
        model,
        response_format: { type: 'json_object' },
        ...(reasoningSupported ? { reasoning_effort: REASONING_EFFORT } : {}),
        messages: [
          { role: 'system', content: systemPrompts.get(locale) },
          { role: 'user', content: JSON.stringify(payload) },
        ],
      });
      recordSpend(model, response.usage);
      parsed = JSON.parse(response.choices[0].message.content);
    } catch {
      break; // keep the over-length text; validate.mjs will flag it
    }

    const still = [];
    for (const [index, max] of remaining) {
      const candidate = parsed[String(index)];
      if (typeof candidate === 'string' && candidate.length <= max) fixed[index] = candidate;
      else still.push([index, max]);
    }
    remaining = still;
  }

  if (remaining.length) {
    console.warn(`  ${label}: ${remaining.length} SEO field(s) still over budget after repair`);
  }
  return fixed;
}

// --------------------------------------------------------------------- run

function chunk(entries) {
  const out = [];
  let current = [];
  let size = 0;
  for (const entry of entries) {
    if (size + entry[1].length > CHUNK_CHARS && current.length) {
      out.push(current);
      current = [];
      size = 0;
    }
    current.push(entry);
    size += entry[1].length;
  }
  if (current.length) out.push(current);
  return out;
}

async function translateFile(item, locale, model) {
  const source = readJson(item.source);
  const leaves = collect(source);

  // Character budgets by leaf index. Skipped where English already overruns —
  // we ask the model to fit a limit only when fitting it is actually possible.
  const limits = {};
  leaves.forEach((leaf, index) => {
    const max = seoLimit(item.relative, leaf.path);
    if (max !== null && leaf.value.length <= max) limits[index] = max;
  });

  const map = {};
  const pending = [];
  leaves.forEach((leaf, index) => {
    const hit = cache[cacheKey(locale, leaf.value)];
    // A cached value that busts its budget is not reusable — retranslate it.
    if (hit !== undefined && !(limits[index] && hit.length > limits[index])) {
      map[leaf.path] = hit;
    } else {
      pending.push([index, leaf.value]);
    }
  });

  const label = `${locale}/${path.basename(item.source)}`;
  const record = (index, translated) => {
    map[leaves[index].path] = translated;
    cache[cacheKey(locale, leaves[index].value)] = translated;
    cacheDirty = true;
  };

  if (pending.length) {
    if (aborted) return { skipped: true };
    for (const group of chunk(pending)) {
      if (aborted) return { skipped: true };
      const parsed = await translateChunk(locale, model, group, label, limits);
      for (const [index] of group) record(index, parsed[String(index)]);
    }
  }

  // Repair pass: anything still over budget goes back with an explicit
  // shorten-this instruction. Cheap — only the offending strings are re-sent.
  const overLong = Object.entries(limits)
    .map(([index, max]) => [Number(index), max])
    .filter(([index, max]) => (map[leaves[index].path] ?? '').length > max);

  if (overLong.length && !aborted) {
    const repaired = await repairLengths(locale, model, overLong, leaves, map, label);
    for (const [index, value] of Object.entries(repaired)) record(Number(index), value);
  }

  // Merge over the existing target so locale-only keys (fr/it/es `_many` plural
  // forms) survive rather than being deleted by the English-shaped rebuild.
  const targetPath = item.targetFor(locale);
  const rebuilt = apply(source, map);
  const existing = fs.existsSync(targetPath) ? readJson(targetPath) : null;
  writeJson(targetPath, existing ? preserveExtras(rebuilt, existing) : rebuilt);
  return { cached: pending.length === 0, strings: leaves.length };
}

async function pool(tasks, size) {
  const queue = [...tasks];
  const workers = Array.from({ length: Math.min(size, queue.length) }, async () => {
    while (queue.length) {
      const task = queue.shift();
      await task();
    }
  });
  await Promise.all(workers);
}

async function main() {
  let items;
  try {
    items = resolveScope(scope, filter);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  if (Number.isFinite(limit)) items = items.slice(0, limit);
  if (!items.length) {
    console.error(`No source files matched scope "${scope}"${filter ? ` with filter "${filter}"` : ''}.`);
    process.exit(1);
  }

  const model = flag('model', TIERS[items[0].tier]);
  if (!MODELS[model]) {
    console.error(`Unknown model "${model}". Known: ${Object.keys(MODELS).join(', ')}`);
    process.exit(1);
  }

  console.log(`Scope    ${scope}  (${items.length} file${items.length === 1 ? '' : 's'})`);
  console.log(`Locales  ${locales.join(', ')}`);
  console.log(`Model    ${model}`);
  console.log(`Ceiling  ${Number.isFinite(maxSpend) ? usd(maxSpend) : 'none'}\n`);

  if (dryRun) {
    const leaves = collect(readJson(items[0].source));
    const limits = {};
    leaves.forEach((leaf, index) => {
      const max = seoLimit(items[0].relative, leaf.path);
      if (max !== null && leaf.value.length <= max) limits[index] = max;
    });
    const first = chunk(leaves.map((l, i) => [i, l.value]))[0];

    console.log(`--- system prompt (${locales[0]}) ---\n`);
    console.log(systemPrompts.get(locales[0]));
    console.log(`\n--- user message (chunk 1 of ${path.basename(items[0].source)}, ${first.length} strings) ---\n`);
    console.log(JSON.stringify(buildPayload(first, limits), null, 2).slice(0, 2500));
    console.log(`\n[dry run — no API calls made, nothing written]`);
    console.log(`[${Object.keys(limits).length} string(s) in this file carry a maxChars budget]`);
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set.');
    process.exit(1);
  }

  const started = Date.now();
  let done = 0;
  const failures = [];

  const tasks = [];
  for (const item of items) {
    for (const locale of locales) {
      tasks.push(async () => {
        try {
          const result = await translateFile(item, locale, model);
          done += 1;
          if (!result.skipped) {
            const tag = result.cached ? 'cached' : usd(spent);
            process.stdout.write(`  [${String(done).padStart(4)}/${items.length * locales.length}] ${locale}/${path.basename(item.source)}  ${tag}\n`);
          }
        } catch (error) {
          failures.push(`${locale}/${path.relative(ROOT, item.source)}: ${error.message}`);
        }
        flushCache();
      });
    }
  }

  await pool(tasks, CONCURRENCY);
  flushCache();

  const elapsed = ((Date.now() - started) / 1000).toFixed(0);
  console.log(`\nDone in ${elapsed}s. Actual spend: ${usd(spent)}`);
  if (aborted) console.log('Run stopped early at the spend ceiling — re-run to continue (cache is warm).');
  if (failures.length) {
    console.error(`\n${failures.length} failure(s):`);
    for (const f of failures) console.error(`  ${f}`);
    process.exitCode = 1;
  }
  console.log('\nNext: node scripts/translate/validate.mjs ' + scope);
}

main().catch((error) => {
  flushCache();
  console.error(error);
  process.exit(1);
});
