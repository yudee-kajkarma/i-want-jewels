/**
 * Apply cached MyMemory translations to locale files (fallback: keep English).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const cachePath = path.join(__dirname, '.translation-cache.json');
const enPath = path.join(root, 'src', 'locales', 'en', 'common.json');

const cache = fs.existsSync(cachePath)
  ? JSON.parse(fs.readFileSync(cachePath, 'utf8'))
  : {};

function walkApply(enValue, locale, pathParts = []) {
  if (typeof enValue === 'string') {
    const cacheKey = `${locale}::${enValue}`;
    return cache[cacheKey] || enValue;
  }

  if (Array.isArray(enValue)) {
    return enValue.map((item) => walkApply(item, locale, pathParts));
  }

  if (enValue && typeof enValue === 'object') {
    const result = {};
    for (const key of Object.keys(enValue)) {
      result[key] = walkApply(enValue[key], locale, [...pathParts, key]);
    }
    return result;
  }

  return enValue;
}

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

for (const locale of ['nl', 'de', 'fr', 'it', 'es']) {
  const translated = walkApply(en, locale);
  const out = path.join(root, 'src', 'locales', locale, 'common.json');
  fs.writeFileSync(out, JSON.stringify(translated, null, 2), 'utf8');
  console.log(`Applied cache → ${locale}`);
}
