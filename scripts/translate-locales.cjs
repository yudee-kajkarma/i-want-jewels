/**
 * Translates en/common.json into target locales, preserving {{placeholders}}.
 * Uses MyMemory free API with disk cache. Re-run safe — skips cached strings.
 *
 * Usage: node scripts/translate-locales.cjs [nl|de|fr|it|es|all]
 */
const fs = require('fs');
const path = require('path');

const TARGETS = {
  nl: 'nl',
  de: 'de',
  fr: 'fr',
  it: 'it',
  es: 'es',
};

const BRAND_TERMS = new Set([
  'I Want Jewels',
  'Visa',
  'MasterCard',
  'RuPay',
  'Amex',
  'UPI',
  'Stripe',
  'SKU',
]);

const root = path.join(__dirname, '..');
const enPath = path.join(root, 'src', 'locales', 'en', 'common.json');
const cachePath = path.join(root, 'scripts', '.translation-cache.json');

const delayMs = Number(process.env.TRANSLATE_DELAY_MS || 400);

function loadCache() {
  if (!fs.existsSync(cachePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch {
    return {};
  }
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
  for (const { token, match } of placeholders) {
    result = result.replaceAll(token, match);
  }
  return result;
}

function shouldSkipTranslation(text) {
  if (!text || !text.trim()) return true;
  if (BRAND_TERMS.has(text)) return true;
  if (/^[\d\s\W]+$/.test(text)) return true;
  return false;
}

async function translateText(text, targetLang, cache) {
  const cacheKey = `${targetLang}::${text}`;
  if (cache[cacheKey]) return cache[cacheKey];

  if (shouldSkipTranslation(text)) {
    cache[cacheKey] = text;
    return text;
  }

  const { protectedText, placeholders } = protectPlaceholders(text);

  // Primary: Google Translate (unofficial gtx client — no API key).
  try {
    const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(protectedText)}`;
    const gRes = await fetch(gUrl);
    if (gRes.ok) {
      const gData = await gRes.json();
      const translated = restorePlaceholders(
        gData[0].map((part) => part[0]).join(''),
        placeholders,
      );
      cache[cacheKey] = translated;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return translated;
    }
  } catch {
    // fall through to MyMemory
  }

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(protectedText)}&langpair=en|${targetLang}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.responseStatus !== 200) {
    console.warn(`  [skip] ${targetLang}: ${data.responseDetails || 'translation failed'} — "${text.slice(0, 40)}"`);
    cache[cacheKey] = text;
    return text;
  }

  const translated = restorePlaceholders(data.responseData.translatedText, placeholders);
  cache[cacheKey] = translated;
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return translated;
}

async function walkTranslate(value, targetLang, cache, stats) {
  if (typeof value === 'string') {
    stats.total += 1;
    const translated = await translateText(value, targetLang, cache);
    if (translated !== value) stats.translated += 1;
    if (stats.total % 50 === 0) {
      saveCache(cache);
      console.log(`  ${targetLang}: ${stats.total} strings processed (${stats.translated} translated)`);
    }
    return translated;
  }

  if (Array.isArray(value)) {
    const result = [];
    for (const item of value) {
      result.push(await walkTranslate(item, targetLang, cache, stats));
    }
    return result;
  }

  if (value && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value)) {
      result[key] = await walkTranslate(value[key], targetLang, cache, stats);
    }
    return result;
  }

  return value;
}

async function translateLocale(locale, enJson, cache) {
  console.log(`\nTranslating → ${locale}`);
  const stats = { total: 0, translated: 0 };
  const translated = await walkTranslate(enJson, TARGETS[locale], cache, stats);
  const outPath = path.join(root, 'src', 'locales', locale, 'common.json');
  fs.writeFileSync(outPath, JSON.stringify(translated, null, 2), 'utf8');
  saveCache(cache);
  console.log(`  Done ${locale}: ${stats.translated}/${stats.total} strings translated`);
  return stats;
}

async function main() {
  const arg = process.argv[2] || 'all';
  const locales = arg === 'all' ? Object.keys(TARGETS) : [arg];

  for (const locale of locales) {
    if (!TARGETS[locale]) {
      console.error(`Unknown locale: ${locale}`);
      process.exit(1);
    }
  }

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const cache = loadCache();

  for (const locale of locales) {
    await translateLocale(locale, enJson, cache);
  }

  console.log('\nAll requested locales complete.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
