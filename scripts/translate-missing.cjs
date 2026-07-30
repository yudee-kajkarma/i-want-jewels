/**
 * Translate only keys that still match English in target locale files.
 * Usage: node scripts/translate-missing.cjs [nl|de|fr|it|es|all]
 */
const fs = require('fs');
const path = require('path');

const TARGETS = { nl: 'nl', de: 'de', fr: 'fr', it: 'it', es: 'es' };
const root = path.join(__dirname, '..');
const cachePath = path.join(__dirname, '.translation-cache.json');
const delayMs = Number(process.env.TRANSLATE_DELAY_MS || 80);

const BRAND_TERMS = new Set(['I Want Jewels', 'Visa', 'MasterCard', 'RuPay', 'Amex', 'UPI', 'Stripe', 'SKU']);

function loadCache() {
  if (!fs.existsSync(cachePath)) return {};
  try { return JSON.parse(fs.readFileSync(cachePath, 'utf8')); } catch { return {}; }
}
function saveCache(cache) {
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
}

function protectPlaceholders(text) {
  const placeholders = [];
  const protectedText = text.replace(/\{\{[^}]+\}\}/g, (match) => {
    const token = `__PH${placeholders.length}__`;
    placeholders.push({ token, match });
    return token;
  });
  return { protectedText, placeholders };
}
function restorePlaceholders(text, placeholders) {
  let result = text;
  for (const { token, match } of placeholders) result = result.replaceAll(token, match);
  return result;
}

function shouldSkip(text) {
  if (!text?.trim()) return true;
  if (BRAND_TERMS.has(text)) return true;
  return false;
}

async function translateText(text, targetLang, cache) {
  const cacheKey = `${targetLang}::${text}`;
  if (cache[cacheKey]) return cache[cacheKey];
  if (shouldSkip(text)) { cache[cacheKey] = text; return text; }

  const { protectedText, placeholders } = protectPlaceholders(text);
  try {
    const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(protectedText)}`;
    const gRes = await fetch(gUrl);
    if (gRes.ok) {
      const gData = await gRes.json();
      const translated = restorePlaceholders(gData[0].map((p) => p[0]).join(''), placeholders);
      cache[cacheKey] = translated;
      await new Promise((r) => setTimeout(r, delayMs));
      return translated;
    }
  } catch { /* ignore */ }

  cache[cacheKey] = text;
  return text;
}

function setByPath(obj, pathParts, value) {
  let cur = obj;
  for (let i = 0; i < pathParts.length - 1; i++) cur = cur[pathParts[i]];
  cur[pathParts[pathParts.length - 1]] = value;
}

function flatten(obj, prefix = '') {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) Object.assign(out, flatten(value, next));
    else out[next] = value;
  }
  return out;
}

async function translateMissing(locale, enJson, cache) {
  const filePath = path.join(root, 'src/locales', locale, 'common.json');
  const locJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const enFlat = flatten(enJson);
  const locFlat = flatten(locJson);
  const missing = Object.entries(enFlat).filter(([k, v]) => locFlat[k] === v);
  console.log(`\n${locale}: translating ${missing.length} remaining keys…`);

  let translated = 0;
  for (const [key, value] of missing) {
    const result = await translateText(String(value), TARGETS[locale], cache);
    if (result !== value) {
      setByPath(locJson, key.split('.'), result);
      translated++;
    }
    if (translated % 20 === 0 && translated > 0) saveCache(cache);
  }

  fs.writeFileSync(filePath, JSON.stringify(locJson, null, 2), 'utf8');
  saveCache(cache);
  console.log(`  Done ${locale}: ${translated}/${missing.length} newly translated`);
  return translated;
}

async function main() {
  const arg = process.argv[2] || 'all';
  const locales = arg === 'all' ? Object.keys(TARGETS) : [arg];
  const enJson = JSON.parse(fs.readFileSync(path.join(root, 'src/locales/en/common.json'), 'utf8'));
  const cache = loadCache();
  for (const locale of locales) await translateMissing(locale, enJson, cache);
  console.log('\nComplete.');
}

main().catch((e) => { console.error(e); process.exit(1); });
