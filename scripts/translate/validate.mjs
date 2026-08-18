/**
 * Structural and terminology gate for translated locale/content JSON.
 * Spends nothing. Exits non-zero if any check fails.
 *
 * Usage:
 *   node scripts/translate/validate.mjs <scope> [--locales=de,fr] [--filter=x] [--verbose]
 *
 * Checks, per file per locale:
 *   1. target exists and parses
 *   2. every English path exists in the target; extra target paths are allowed
 *      only as CLDR plural variants (fr/it/es carry `_many` forms en does not)
 *   3. {{placeholders}} identical per string
 *   4. non-translatable keys (href/image/type/...) byte-identical
 *   5. SEO title <= 60 / description <= 155 chars, but only for genuine meta
 *      fields and only where English was already within the limit
 *   6. glossary terms present in the output when present in the source
 *   7. not-obviously-untranslated (share of leaves identical to English)
 */
import fs from 'node:fs';
import path from 'node:path';

import { LOCALES, ROOT, readJson, resolveScope } from './lib/corpus.mjs';
import { PLURAL_SUFFIX, SKIP_KEYS, collect, placeholders } from './lib/walk.mjs';
 import { seoLimit } from './lib/seo.mjs';

const HERE = path.join(ROOT, 'scripts/translate');
const glossary = readJson(path.join(HERE, 'glossary.json'));

/** Above this share of leaves identical to English, assume the file was not translated. */
const UNTRANSLATED_RATIO = 0.5;
/** Short strings legitimately match across languages ("2026", "Instagram"). */
const UNTRANSLATED_MIN_CHARS = 25;

const argv = process.argv.slice(2);
const flag = (n) => argv.find((a) => a.startsWith(`--${n}=`))?.split('=').slice(1).join('=');
const scope = argv.find((a) => !a.startsWith('--'));
const locales = flag('locales') ? flag('locales').split(',') : LOCALES;
const verbose = argv.includes('--verbose');

if (!scope) {
  console.error('Usage: node scripts/translate/validate.mjs <scope> [--locales=de,fr] [--verbose]');
  process.exit(1);
}

/** Byte-identical values for keys that must never be translated. */
function frozenValues(node, path = [], out = {}) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => frozenValues(item, [...path, String(i)], out));
  } else if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      if (typeof node[key] === 'string' && SKIP_KEYS.has(key)) {
        out[[...path, key].join('.')] = node[key];
      } else {
        frozenValues(node[key], [...path, key], out);
      }
    }
  }
  return out;
}

function allText(leaves) {
  return leaves.map((l) => l.value).join('\n').toLowerCase();
}

let items;
try {
  items = resolveScope(scope, flag('filter'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
if (!items.length) {
  console.error(`No source files matched scope "${scope}".`);
  process.exit(1);
}

const problems = [];
const warnings = [];
let checked = 0;

for (const item of items) {
  const source = readJson(item.source);
  const sourceLeaves = collect(source);
  const sourcePaths = new Set(sourceLeaves.map((l) => l.path));
  const sourceFrozen = frozenValues(source);
  const sourceText = allText(sourceLeaves);
  const rel = path.relative(ROOT, item.source).split(path.sep).join('/');

  for (const locale of locales) {
    const targetPath = item.targetFor(locale);
    const where = `${locale}  ${rel}`;
    const fail = (msg) => problems.push(`${where}\n      ${msg}`);

    if (!fs.existsSync(targetPath)) {
      fail('missing target file');
      continue;
    }

    let target;
    try {
      target = readJson(targetPath);
    } catch (error) {
      fail(`unparseable JSON: ${error.message}`);
      continue;
    }
    checked += 1;

    const targetLeaves = collect(target);
    const targetByPath = new Map(targetLeaves.map((l) => [l.path, l.value]));

    // 2. structure. Compared by path, not by index: fr/it/es legitimately carry
    // extra `_many` plural keys, so the two leaf lists are not index-aligned.
    const missing = sourceLeaves.filter((l) => !targetByPath.has(l.path));
    if (missing.length) {
      fail(`${missing.length} path(s) missing vs English, first: ${missing[0].path}`);
      continue; // later checks need the paths to resolve
    }

    const sourceStems = new Set(sourceLeaves.map((l) => l.path.replace(PLURAL_SUFFIX, '')));
    const illegalExtras = targetLeaves.filter(
      (l) => !sourcePaths.has(l.path)
        && !(PLURAL_SUFFIX.test(l.path) && sourceStems.has(l.path.replace(PLURAL_SUFFIX, ''))),
    );
    if (illegalExtras.length) {
      fail(`${illegalExtras.length} unexpected path(s) not in English and not a plural form, `
        + `first: ${illegalExtras[0].path}`);
    }

    // 3. placeholders
    for (const leaf of sourceLeaves) {
      const a = placeholders(leaf.value).join(',');
      const b = placeholders(targetByPath.get(leaf.path)).join(',');
      if (a !== b) {
        fail(`placeholder mismatch at ${leaf.path}: expected [${a}] got [${b}]`);
      }
    }

    // 4. frozen keys
    const targetFrozen = frozenValues(target);
    for (const [p, value] of Object.entries(sourceFrozen)) {
      if (targetFrozen[p] !== value) {
        fail(`non-translatable key changed at ${p}: "${value}" -> "${targetFrozen[p]}"`);
      }
    }

    // 5. SEO limits.
    // Only genuine SEO fields, and only when the TRANSLATION causes the overrun —
    // 57 of 223 English `.title` values are already over 60 chars, and a blog's
    // display title is not a meta title. Pre-existing English overruns are an
    // authoring problem, not this pipeline's to flag.
    for (const leaf of sourceLeaves) {
      const limit = seoLimit(rel, leaf.path);
      if (limit === null) continue;
      if (leaf.value.length > limit) continue; // English already over — not ours to flag
      const translated = targetByPath.get(leaf.path);
      if (translated.length > limit) {
        fail(`${leaf.path}: ${translated.length} > ${limit} chars `
          + `(English was ${leaf.value.length}) — rewrite shorter`);
      }
    }

    // 6. glossary. Only terms marked `reviewed: true` hard-fail — the rest are
    // unverified model output and must not be enforced as if they were fact.
    const targetText = allText(targetLeaves);
    for (const term of glossary.terms) {
      const spec = term.targets[locale];
      if (!spec) continue;
      const present = term.match.some((m) => sourceText.includes(m.toLowerCase()));
      if (!present || targetText.includes(spec.assert.toLowerCase())) continue;

      const message = `glossary: source uses "${term.en}" but output lacks "${spec.assert}" (expected ${spec.use})`;
      if (term.reviewed) fail(message);
      else warnings.push(`${where}\n      [unreviewed] ${message}`);
    }

    // 7. untranslated
    let comparable = 0;
    let identical = 0;
    for (const leaf of sourceLeaves) {
      if (leaf.value.length < UNTRANSLATED_MIN_CHARS) continue;
      comparable += 1;
      if (leaf.value === targetByPath.get(leaf.path)) identical += 1;
    }
    if (comparable >= 5) {
      const ratio = identical / comparable;
      if (ratio > UNTRANSLATED_RATIO) {
        fail(`${Math.round(ratio * 100)}% of substantial strings are identical to English — likely untranslated`);
      }
    }
  }
}

console.log(`Validated ${checked} file/locale pair${checked === 1 ? '' : 's'} across ${items.length} source file${items.length === 1 ? '' : 's'}.\n`);

const reviewedCount = glossary.terms.filter((t) => t.reviewed).length;

function report(list, label, stream) {
  const shown = verbose ? list : list.slice(0, 40);
  stream(`${label} — ${list.length}:\n`);
  for (const entry of shown) stream(`  ${entry}\n`);
  if (!verbose && list.length > shown.length) {
    stream(`  ... and ${list.length - shown.length} more. Re-run with --verbose.\n`);
  }
}

if (warnings.length) {
  report(warnings, 'WARNINGS (unreviewed glossary terms, not enforced)', (s) => console.log(s));
  console.log(`  ${reviewedCount}/${glossary.terms.length} glossary terms are marked reviewed.`);
  console.log('  Confirm a term with a native speaker, set "reviewed": true, and it becomes a hard failure.\n');
}

if (!problems.length) {
  console.log(`PASS — no enforced problems found.${warnings.length ? ' (See warnings above.)' : ''}`);
  process.exit(0);
}

report(problems, 'FAIL', (s) => console.error(s));
process.exit(1);
