/**
 * List keys that are still identical to English in a target locale.
 * Usage: node scripts/list-untranslated.cjs [nl|de|fr|it|es|all]
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const locales = process.argv[2] && process.argv[2] !== 'all'
  ? [process.argv[2]]
  : ['nl', 'de', 'fr', 'it', 'es'];

function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flatten(value, next));
    } else {
      out[next] = value;
    }
  }
  return out;
}

const en = flatten(JSON.parse(fs.readFileSync(path.join(root, 'src/locales/en/common.json'), 'utf8')));

for (const locale of locales) {
  const loc = flatten(JSON.parse(fs.readFileSync(path.join(root, `src/locales/${locale}/common.json`), 'utf8')));
  const untranslated = [];
  for (const [key, value] of Object.entries(en)) {
    if (loc[key] === value) untranslated.push({ key, value });
  }
  console.log(`\n${locale}: ${untranslated.length} untranslated`);
  untranslated.slice(0, 30).forEach(({ key, value }) => {
    console.log(`  ${key}: "${String(value).slice(0, 60)}${String(value).length > 60 ? '…' : ''}"`);
  });
  if (untranslated.length > 30) console.log(`  … and ${untranslated.length - 30} more`);
}
