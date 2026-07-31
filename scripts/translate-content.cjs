/**
 * Translates resources-meta, blogs-meta, and content JSON files from English.
 * Uses batched Google Translate for speed.
 *
 * Usage: node scripts/translate-content.cjs [nl|de|fr|it|es|all] [meta|articles|blogs|all]
 */
const fs = require('fs');
const path = require('path');

const TARGETS = { nl: 'nl', de: 'de', fr: 'fr', it: 'it', es: 'es' };
const root = path.join(__dirname, '..');
const cachePath = path.join(root, 'scripts', '.translation-cache.json');
const delayMs = Number(process.env.TRANSLATE_DELAY_MS || 80);
const BATCH_SEP = '\n\u241E\n';
const SKIP_KEYS = new Set([
  'href', 'shopHref', 'primaryHref', 'secondaryHref', 'tertiaryHref',
  'image', 'coverImage', 'type', 'imagePosition',
]);

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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  if (/^[\d\s\W]+$/.test(text)) return true;
  if (/^\/[a-z0-9\-/?=&]+$/i.test(text)) return true;
  if (/^https?:\/\//i.test(text)) return true;
  return false;
}

async function translateBatch(strings, targetLang, cache) {
  const results = new Array(strings.length);
  const pending = [];

  for (let i = 0; i < strings.length; i++) {
    const text = strings[i];
    const cacheKey = `${targetLang}::${text}`;
    const cached = cache[cacheKey];
    if (cached && !cached.includes('MYMEMORY WARNING')) {
      results[i] = cached;
      continue;
    }
    if (shouldSkipTranslation(text)) {
      cache[cacheKey] = text;
      results[i] = text;
      continue;
    }
    pending.push({ index: i, text, cacheKey });
  }

  if (pending.length === 0) return results;

  const batches = [];
  let current = [];
  let currentLen = 0;

  for (const item of pending) {
    const len = item.text.length + BATCH_SEP.length;
    if (current.length > 0 && currentLen + len > 4500) {
      batches.push(current);
      current = [];
      currentLen = 0;
    }
    current.push(item);
    currentLen += len;
  }
  if (current.length > 0) batches.push(current);

  for (const batch of batches) {
    const joined = batch.map((item) => item.text).join(BATCH_SEP);
    const { protectedText, placeholders } = protectPlaceholders(joined);

    let translatedJoined = null;

    try {
      const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(protectedText)}`;
      const gRes = await fetch(gUrl);
      if (gRes.ok) {
        const gData = await gRes.json();
        translatedJoined = restorePlaceholders(
          gData[0].map((part) => part[0]).join(''),
          placeholders,
        );
      }
    } catch {
      translatedJoined = null;
    }

    if (translatedJoined && !translatedJoined.includes('MYMEMORY WARNING')) {
      const parts = translatedJoined.split(BATCH_SEP);
      if (parts.length === batch.length) {
        batch.forEach((item, idx) => {
          cache[item.cacheKey] = parts[idx];
          results[item.index] = parts[idx];
        });
        await sleep(delayMs);
        continue;
      }
    }

    for (const item of batch) {
      results[item.index] = await translateSingle(item.text, targetLang, cache);
    }
  }

  return results;
}

async function translateSingle(text, targetLang, cache) {
  const cacheKey = `${targetLang}::${text}`;
  if (cache[cacheKey] && !cache[cacheKey].includes('MYMEMORY WARNING')) return cache[cacheKey];
  if (shouldSkipTranslation(text)) {
    cache[cacheKey] = text;
    return text;
  }

  const { protectedText, placeholders } = protectPlaceholders(text);

  try {
    const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(protectedText)}`;
    const gRes = await fetch(gUrl);
    if (gRes.ok) {
      const gData = await gRes.json();
      const translated = restorePlaceholders(
        gData[0].map((part) => part[0]).join(''),
        placeholders,
      );
      if (!translated.includes('MYMEMORY WARNING')) {
        cache[cacheKey] = translated;
        await sleep(delayMs);
        return translated;
      }
    }
  } catch {
    // fall through
  }

  cache[cacheKey] = text;
  return text;
}

function collectStrings(value, key, strings, refs, pathParts) {
  if (typeof value === 'string') {
    if (key && SKIP_KEYS.has(key)) return;
    const index = strings.length;
    strings.push(value);
    refs.push(pathParts.slice());
    return index;
  }

  if (Array.isArray(value)) {
    value.forEach((item, i) => collectStrings(item, null, strings, refs, [...pathParts, i]));
    return;
  }

  if (value && typeof value === 'object') {
    for (const [k, nested] of Object.entries(value)) {
      collectStrings(nested, k, strings, refs, [...pathParts, k]);
    }
  }
}

function applyStrings(value, key, stringMap, pathParts) {
  if (typeof value === 'string') {
    if (key && SKIP_KEYS.has(key)) return value;
    return stringMap.get(pathParts.join('\0')) ?? value;
  }

  if (Array.isArray(value)) {
    return value.map((item, i) => applyStrings(item, null, stringMap, [...pathParts, i]));
  }

  if (value && typeof value === 'object') {
    const result = {};
    for (const [k, nested] of Object.entries(value)) {
      result[k] = applyStrings(nested, k, stringMap, [...pathParts, k]);
    }
    return result;
  }

  return value;
}

async function translateJsonObject(source, targetLang, cache) {
  const strings = [];
  const refs = [];
  collectStrings(source, null, strings, refs, []);

  const unique = [...new Set(strings)];
  const translatedUnique = await translateBatch(unique, targetLang, cache);
  const uniqueMap = new Map(unique.map((s, i) => [s, translatedUnique[i]]));

  const stringMap = new Map();
  refs.forEach((parts, i) => {
    stringMap.set(parts.join('\0'), uniqueMap.get(strings[i]) ?? strings[i]);
  });

  return applyStrings(source, null, stringMap, []);
}

async function translateJsonFile(sourcePath, targetPath, targetLang, cache, force = false) {
  if (!fs.existsSync(sourcePath)) return;
  if (!force && fs.existsSync(targetPath)) {
    const existing = fs.readFileSync(targetPath, 'utf8');
    if (!existing.includes('MYMEMORY WARNING')) return;
    force = true;
  }
  if (!force && fs.existsSync(targetPath)) return;

  const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const translated = await translateJsonObject(source, targetLang, cache);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, JSON.stringify(translated, null, 2), 'utf8');
}

async function translateMeta(targetLang, cache, force = false) {
  for (const file of ['resources-meta.json', 'blogs-meta.json']) {
    await translateJsonFile(
      path.join(root, 'src', 'locales', 'en', file),
      path.join(root, 'src', 'locales', targetLang, file),
      targetLang,
      cache,
      force,
    );
    console.log(`Translated ${targetLang}/${file}`);
  }
}

async function walkAndTranslateContent(sourceDir, targetDir, targetLang, cache) {
  if (!fs.existsSync(sourceDir)) return;

  let processed = 0;

  async function translateWalk(currentSource, currentTarget) {
    for (const entry of fs.readdirSync(currentSource)) {
      const sourcePath = path.join(currentSource, entry);
      const targetPath = path.join(currentTarget, entry);
      if (fs.statSync(sourcePath).isDirectory()) {
        await translateWalk(sourcePath, targetPath);
      } else if (entry.endsWith('.json')) {
        const exists = fs.existsSync(targetPath);
        const corrupted = exists && fs.readFileSync(targetPath, 'utf8').includes('MYMEMORY WARNING');
        if (!exists || corrupted) {
          await translateJsonFile(sourcePath, targetPath, targetLang, cache, corrupted);
          processed += 1;
          console.log(`${corrupted ? 'Re-fixed' : 'Translated'} ${targetLang}: ${path.relative(root, targetPath)} (${processed})`);
          if (processed % 3 === 0) saveCache(cache);
        }
      }
    }
  }

  await translateWalk(sourceDir, targetDir);
}

async function main() {
  const targetArg = process.argv[2] || 'all';
  const scopeArg = process.argv[3] || 'all';
  const langs = targetArg === 'all' ? Object.keys(TARGETS) : [targetArg];
  const cache = loadCache();

  for (const lang of langs) {
    if (!TARGETS[lang]) {
      console.error(`Unknown language: ${lang}`);
      process.exit(1);
    }

    console.log(`\n=== Translating to ${lang} (${scopeArg}) ===`);

    if (scopeArg === 'all' || scopeArg === 'meta') {
      await translateMeta(lang, cache, true);
    }

    if (scopeArg === 'all' || scopeArg === 'articles') {
      await walkAndTranslateContent(
        path.join(root, 'src', 'content', 'resources', 'en'),
        path.join(root, 'src', 'content', 'resources', lang),
        lang,
        cache,
      );
    }

    if (scopeArg === 'all' || scopeArg === 'blogs') {
      await walkAndTranslateContent(
        path.join(root, 'src', 'content', 'blogs', 'en'),
        path.join(root, 'src', 'content', 'blogs', lang),
        lang,
        cache,
      );
    }
  }

  saveCache(cache);
  console.log('\nDone.');
}

module.exports = {
  translateJsonObject,
  translateJsonFile,
  loadCache,
  saveCache,
};

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
