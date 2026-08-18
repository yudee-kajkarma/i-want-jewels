/**
 * Project translation cost without calling the API. Spends nothing.
 *
 * Usage:
 *   node scripts/translate/estimate.mjs                    # every scope
 *   node scripts/translate/estimate.mjs blogs resources    # named scopes
 *   node scripts/translate/estimate.mjs --batch            # apply Batch API discount
 *   node scripts/translate/estimate.mjs --locales=de,fr    # subset of locales
 */
import { LOCALES, SCOPES, readJson, resolveScope } from './lib/corpus.mjs';
import { collect } from './lib/walk.mjs';
import { MODELS, TIERS, estimateTokens, projectCost, usd } from './lib/pricing.mjs';

const args = process.argv.slice(2);
const batch = args.includes('--batch');
const localeArg = args.find((a) => a.startsWith('--locales='));
const locales = localeArg ? localeArg.split('=')[1].split(',') : LOCALES;
const scopes = args.filter((a) => !a.startsWith('--'));
const targets = scopes.length ? scopes : Object.keys(SCOPES);

const overrides = {
  high: args.find((a) => a.startsWith('--high='))?.split('=')[1] ?? TIERS.high,
  bulk: args.find((a) => a.startsWith('--bulk='))?.split('=')[1] ?? TIERS.bulk,
};

for (const [tier, model] of Object.entries(overrides)) {
  if (!MODELS[model]) {
    console.error(`Unknown model "${model}" for tier ${tier}. Known: ${Object.keys(MODELS).join(', ')}`);
    process.exit(1);
  }
}

console.log(`Locales: ${locales.join(', ')}${batch ? '   (Batch API pricing)' : ''}`);
console.log(`Tiers:   high=${overrides.high}  bulk=${overrides.bulk}\n`);

const rows = [];
let grand = 0;

for (const scope of targets) {
  const items = resolveScope(scope);
  if (!items.length) {
    console.log(`${scope}: no files found, skipping`);
    continue;
  }

  let chars = 0;
  let strings = 0;
  for (const item of items) {
    for (const leaf of collect(readJson(item.source))) {
      chars += leaf.value.length;
      strings += 1;
    }
  }

  const tier = items[0].tier;
  const model = overrides[tier];
  const sourceTokens = estimateTokens(chars);
  const projection = projectCost({
    sourceTokens,
    fileCount: items.length,
    model,
    locales,
    batch,
  });

  grand += projection.total;
  rows.push({
    scope,
    files: items.length,
    strings,
    sourceTokens,
    model,
    total: projection.total,
  });
}

const pad = (s, n) => String(s).padEnd(n);
const num = (s, n) => String(s).padStart(n);

console.log(`${pad('SCOPE', 12)}${num('FILES', 6)}${num('STRINGS', 9)}${num('SRC TOK', 10)}  ${pad('MODEL', 15)}${num('COST', 9)}`);
console.log('-'.repeat(61));
for (const r of rows) {
  console.log(
    pad(r.scope, 12)
    + num(r.files, 6)
    + num(r.strings.toLocaleString(), 9)
    + num(`${Math.round(r.sourceTokens / 1000)}k`, 10)
    + '  ' + pad(r.model, 15)
    + num(usd(r.total), 9),
  );
}
console.log('-'.repeat(61));
console.log(`${pad('TOTAL', 12)}${num('', 6)}${num('', 9)}${num('', 10)}  ${pad('', 15)}${num(usd(grand), 9)}`);
console.log('\nEstimates are biased high and exclude retries. Enforce the real');
console.log('ceiling with: node scripts/translate/translate.mjs <scope> --max-spend=5');
