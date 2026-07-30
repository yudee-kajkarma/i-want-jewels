/**
 * Compare locale files against English and report translation progress.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const locales = ['nl', 'de', 'fr', 'it', 'es'];

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

console.log('English keys:', Object.keys(en).length);
console.log('');

for (const locale of locales) {
  const file = path.join(root, 'src/locales', locale, 'common.json');
  const loc = flatten(JSON.parse(fs.readFileSync(file, 'utf8')));
  let same = 0;
  let missing = 0;
  let translated = 0;

  for (const [key, value] of Object.entries(en)) {
    if (!(key in loc)) {
      missing += 1;
      continue;
    }
    if (loc[key] === value) same += 1;
    else translated += 1;
  }

  console.log(`${locale}: ${translated} translated, ${same} still English, ${missing} missing`);
}
