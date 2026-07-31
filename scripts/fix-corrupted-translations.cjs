/**
 * Re-translates content JSON files containing MYMEMORY WARNING from English sources.
 * Usage: node scripts/fix-corrupted-translations.cjs
 */
const fs = require('fs');
const path = require('path');
const { translateJsonObject, loadCache, saveCache } = require('./translate-content.cjs');

const root = path.join(__dirname, '..');
const TARGETS = ['nl', 'de', 'fr', 'it', 'es'];

function purgeCorruptedCache(cache) {
  let removed = 0;
  for (const [key, value] of Object.entries(cache)) {
    if (typeof value === 'string' && value.includes('MYMEMORY WARNING')) {
      delete cache[key];
      removed += 1;
    }
  }
  return removed;
}

async function fixFile(localePath, enPath, locale, cache) {
  const raw = fs.readFileSync(localePath, 'utf8');
  if (!raw.includes('MYMEMORY WARNING')) return false;

  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const translated = await translateJsonObject(enContent, locale, cache);

  if (JSON.stringify(translated).includes('MYMEMORY WARNING')) {
    console.error(`Still corrupted: ${path.relative(root, localePath)}`);
    return false;
  }

  fs.writeFileSync(localePath, JSON.stringify(translated, null, 2), 'utf8');
  console.log(`Fixed ${path.relative(root, localePath)}`);
  return true;
}

async function main() {
  const cache = loadCache();
  const removed = purgeCorruptedCache(cache);
  console.log(`Purged ${removed} corrupted cache entries\n`);
  saveCache(cache);

  let fixed = 0;

  for (const dir of ['resources', 'blogs']) {
    const enRoot = path.join(root, 'src', 'content', dir, 'en');
    if (!fs.existsSync(enRoot)) continue;

    async function walkEn(enDir, rel = '') {
      for (const entry of fs.readdirSync(enDir)) {
        const enPath = path.join(enDir, entry);
        const relPath = path.join(rel, entry);
        if (fs.statSync(enPath).isDirectory()) {
          await walkEn(enPath, relPath);
        } else if (entry.endsWith('.json')) {
          for (const locale of TARGETS) {
            const localePath = path.join(root, 'src', 'content', dir, locale, relPath);
            if (fs.existsSync(localePath) && (await fixFile(localePath, enPath, locale, cache))) {
              fixed += 1;
              if (fixed % 5 === 0) saveCache(cache);
            }
          }
        }
      }
    }

    await walkEn(enRoot);
  }

  saveCache(cache);
  console.log(`\nFixed ${fixed} files.`);

  const remaining = [];
  for (const dir of ['resources', 'blogs']) {
    for (const locale of TARGETS) {
      const localeRoot = path.join(root, 'src', 'content', dir, locale);
      if (!fs.existsSync(localeRoot)) continue;
      for (const file of fs.readdirSync(localeRoot, { recursive: true })) {
        if (typeof file !== 'string' || !file.endsWith('.json')) continue;
        const filePath = path.join(localeRoot, file);
        if (fs.readFileSync(filePath, 'utf8').includes('MYMEMORY WARNING')) {
          remaining.push(path.relative(root, filePath));
        }
      }
    }
  }

  if (remaining.length > 0) {
    console.log(`\nWarning: ${remaining.length} files still contain MYMEMORY WARNING`);
  } else {
    console.log('\nAll corrupted files repaired.');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
