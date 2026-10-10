/**
 * Translate only what is new: English guides/blogs that a language does not
 * have yet, plus their titles and SEO metadata that are still missing or still
 * English. Uses translate.mjs underneath, so the glossary, style guides, SEO
 * length budgets, cache and spend ceiling all apply.
 *
 * Usage (from the frontend folder):
 *   node scripts/translate/new-content.mjs --list                    # what would be translated, no API calls
 *   node scripts/translate/new-content.mjs --estimate                # cost estimate, no API calls
 *   node --env-file=.env.translate scripts/translate/new-content.mjs --max-spend=5
 *
 * Options:
 *   --locales=de,fr      only these languages (default: nl, de, fr, it, es)
 *   --model=<model>      model for the article text   (default: the "bulk" tier)
 *   --meta-model=<model> model for titles + SEO meta  (default: the "high" tier)
 *   --max-spend=5        total USD ceiling for the whole run
 *   --dry-run            show the first request and stop, nothing written
 *
 * Needs OPENAI_API_KEY (put it in .env.translate — see README.md).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

import { LOCALES, ROOT, readJson, writeJson } from './lib/corpus.mjs';

const HERE = path.join(ROOT, 'scripts/translate');

// .env.local names the key OPENAI_KEY and the model NEXT_OPENAI_MODEL; accept both.
if (!process.env.OPENAI_API_KEY && process.env.OPENAI_KEY) process.env.OPENAI_API_KEY = process.env.OPENAI_KEY;
const argv = process.argv.slice(2);
const flagRaw = (name) => argv.find((a) => a.startsWith(`--${name}=`))?.split('=').slice(1).join('=');
const flag = (name) => flagRaw(name) ?? (name === 'model' ? process.env.NEXT_OPENAI_MODEL : undefined);
const has = (name) => argv.includes(`--${name}`);

const locales = flag('locales') ? flag('locales').split(',').map((l) => l.trim()).filter(Boolean) : LOCALES;
const unknown = locales.filter((l) => !LOCALES.includes(l));
if (unknown.length) {
  console.error(`Unknown locale(s): ${unknown.join(', ')}. Use: ${LOCALES.join(', ')}`);
  process.exit(1);
}
const maxSpend = flag('max-spend') ? Number(flag('max-spend')) : Infinity;
const dryRun = has('dry-run');

const CONTENT_DIRS = ['src/content/resources', 'src/content/blogs'];
/** Locale files holding per-item titles/SEO, and how deep one item sits. */
const META_FILES = { 'resources-meta.json': 2, 'blogs-meta.json': 2, 'pageMeta.json': 1 };
const PENDING_DIR = 'src/locales/en/_pending';
const CONTENT_LIST = path.join(HERE, '.pending-content.txt');
const META_LIST = path.join(HERE, '.pending-meta.txt');

// ------------------------------------------------------------ find the work

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith('.json')) out.push(full);
  }
  return out;
}

/** English articles this language does not have yet. */
function missingContent(locale) {
  const out = [];
  for (const dir of CONTENT_DIRS) {
    const enDir = path.join(ROOT, dir, 'en');
    for (const file of walk(enDir)) {
      const rel = path.relative(enDir, file);
      if (!fs.existsSync(path.join(ROOT, dir, locale, rel))) out.push(path.join(dir, 'en', rel).split(path.sep).join('/'));
    }
  }
  return out;
}

/** Items (e.g. `articles.<cat/slug>`) at a fixed depth, as [keyPath[], value]. */
function entries(doc, depth, prefix = []) {
  if (depth === 0) return [[prefix, doc]];
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) return [];
  return Object.entries(doc).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? entries(v, depth - 1, [...prefix, k]) : depth === 1 ? [[[...prefix, k], v]] : [],
  );
}
const getAt = (doc, keys) => keys.reduce((n, k) => (n == null ? undefined : n[k]), doc);
function setAt(doc, keys, value) {
  let node = doc;
  keys.slice(0, -1).forEach((k) => { node[k] ??= {}; node = node[k]; });
  node[keys[keys.length - 1]] = value;
}

/**
 * Title/SEO entries that a language lacks, or still has as an English copy.
 * Returns the English entries to translate plus, per language, which to merge.
 */
function missingMeta(locale) {
  const pending = {};
  const keysByFile = {};
  for (const [file, depth] of Object.entries(META_FILES)) {
    const enPath = path.join(ROOT, 'src/locales/en', file);
    if (!fs.existsSync(enPath)) continue;
    const en = readJson(enPath);
    const locPath = path.join(ROOT, 'src/locales', locale, file);
    const loc = fs.existsSync(locPath) ? readJson(locPath) : {};
    for (const [keys, value] of entries(en, depth)) {
      const current = getAt(loc, keys);
      if (current === undefined || JSON.stringify(current) === JSON.stringify(value)) {
        setAt((pending[file] ??= {}), keys, value);
        (keysByFile[file] ??= []).push(keys);
      }
    }
  }
  return { pending, keysByFile };
}

// ------------------------------------------------------------ run helpers

/** Runs a script, streaming its output; returns { code, spent }. */
function run(script, args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join(HERE, script), ...args], { cwd: ROOT, env: process.env });
    let output = '';
    const relay = (stream, target) => stream.on('data', (d) => { output += d; target.write(d); });
    relay(child.stdout, process.stdout);
    relay(child.stderr, process.stderr);
    child.on('close', (code) => {
      const m = output.match(/Actual spend: \$([\d.]+)/);
      resolve({ code, spent: m ? Number(m[1]) : 0 });
    });
  });
}

const URL_IN_LINK = /\]\(([^)\s]+)\)/g;

/**
 * Links must keep their exact target. Where a translation changed a link's
 * path, put the English path back; report any string whose link count changed.
 */
function protectLinks(contentFiles, locale) {
  let fixed = 0;
  const problems = [];
  const visit = (src, dst, where, setDst) => {
    if (typeof src === 'string') {
      if (typeof dst !== 'string' || !src.includes('](')) return;
      const want = [...src.matchAll(URL_IN_LINK)].map((m) => m[1]);
      let got = [...dst.matchAll(URL_IN_LINK)].map((m) => m[1]);
      if (got.length > want.length) {
        // The model added links the English does not have (sometimes to pages
        // that do not exist): keep their words, drop the link.
        const allowed = [...want];
        dst = dst.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (whole, label, url) => {
          const i = allowed.indexOf(url);
          if (i === -1) return label;
          allowed.splice(i, 1);
          return whole;
        });
        setDst(dst);
        fixed += 1;
        got = [...dst.matchAll(URL_IN_LINK)].map((m) => m[1]);
      }
      if (want.length !== got.length) { problems.push(where); return; }
      if (want.every((u, i) => u === got[i])) return;
      let i = 0;
      setDst(dst.replace(URL_IN_LINK, () => `](${want[i++]})`));
      fixed += 1;
      return;
    }
    if (src && typeof src === 'object' && dst && typeof dst === 'object') {
      for (const key of Object.keys(src)) visit(src[key], dst[key], `${where}.${key}`, (v) => { dst[key] = v; });
    }
  };
  for (const rel of contentFiles) {
    const en = readJson(path.join(ROOT, rel));
    const target = path.join(ROOT, rel.replace('/en/', `/${locale}/`));
    if (!fs.existsSync(target)) continue;
    const doc = readJson(target);
    const before = fixed;
    visit(en, doc, `${locale}:${rel}`, () => {});
    if (fixed > before) writeJson(target, doc);
  }
  return { fixed, problems };
}

function cleanupPending() {
  for (const locale of ['en', ...LOCALES]) {
    fs.rmSync(path.join(ROOT, 'src/locales', locale, '_pending'), { recursive: true, force: true });
  }
  fs.rmSync(CONTENT_LIST, { force: true });
  fs.rmSync(META_LIST, { force: true });
}

// ------------------------------------------------------------ main

async function main() {
  const plan = locales.map((locale) => ({ locale, content: missingContent(locale), ...missingMeta(locale) }));
  console.log('Language   articles   titles/SEO entries');
  for (const p of plan) {
    const metaCount = Object.values(p.keysByFile).reduce((n, k) => n + k.length, 0);
    console.log(`${p.locale.padEnd(10)} ${String(p.content.length).padStart(8)}   ${metaCount}`);
  }
  const work = plan.filter((p) => p.content.length || Object.keys(p.pending).length);
  if (!work.length) {
    console.log('\nNothing to translate — every language is up to date.');
    return;
  }
  if (has('list')) {
    for (const p of work) {
      p.content.forEach((f) => console.log(`  ${p.locale}  article  ${f}`));
      for (const [file, keys] of Object.entries(p.keysByFile)) console.log(`  ${p.locale}  ${file}: ${keys.map((k) => k.join('.')).join(', ')}`);
    }
    return;
  }
  if (!has('estimate') && !dryRun && !process.env.OPENAI_API_KEY) {
    console.error('\nOPENAI_API_KEY is not set. Run with: node --env-file=.env.translate scripts/translate/new-content.mjs …');
    process.exitCode = 1;
    return;
  }

  let spent = 0;
  const report = [];
  for (const p of work) {
    const { locale, content, pending, keysByFile } = p;
    const metaFiles = Object.keys(pending);
    console.log(`\n================ ${locale} ================`);
    // Inputs for translate.mjs: a list of article files, and English "pending"
    // copies holding only the titles/SEO entries this language is missing.
    fs.writeFileSync(CONTENT_LIST, content.join('\n'));
    for (const file of metaFiles) writeJson(path.join(ROOT, PENDING_DIR, file), pending[file]);
    fs.writeFileSync(META_LIST, metaFiles.map((f) => `${PENDING_DIR}/${f}`).join('\n'));
    const listArg = (file) => `@${path.relative(ROOT, file)}`;

    try {
      if (has('estimate')) {
        await run('estimate.mjs', [...(content.length ? [listArg(CONTENT_LIST)] : []), ...(metaFiles.length ? [listArg(META_LIST)] : []), `--locales=${locale}`]);
        continue;
      }
      const left = () => (Number.isFinite(maxSpend) ? [`--max-spend=${Math.max(0, maxSpend - spent).toFixed(2)}`] : []);
      if (Number.isFinite(maxSpend) && maxSpend - spent <= 0) {
        console.log('Spend ceiling reached — re-run to continue (finished work is kept).');
        break;
      }
      const common = [`--locales=${locale}`, ...(dryRun ? ['--dry-run'] : [])];

      if (content.length) {
        const r = await run('translate.mjs', [listArg(CONTENT_LIST), ...common, ...(flag('model') ? [`--model=${flag('model')}`] : []), ...left()]);
        spent += r.spent;
        if (r.code !== 0) { process.exitCode = r.code; break; }
      }
      if (dryRun) break;

      let merged = 0;
      if (metaFiles.length) {
        const r = await run('translate.mjs', [listArg(META_LIST), ...common, ...(flag('meta-model') ? [`--model=${flag('meta-model')}`] : []), ...left()]);
        spent += r.spent;
        if (r.code !== 0) { process.exitCode = r.code; break; }
        // Merge only the entries this language was missing; nothing else changes.
        for (const [file, keyList] of Object.entries(keysByFile)) {
          const translatedPath = path.join(ROOT, 'src/locales', locale, '_pending', file);
          if (!fs.existsSync(translatedPath)) continue;
          const translated = readJson(translatedPath);
          const targetPath = path.join(ROOT, 'src/locales', locale, file);
          const target = fs.existsSync(targetPath) ? readJson(targetPath) : {};
          for (const keys of keyList) {
            const value = getAt(translated, keys);
            // Two English tags can translate to the same word; keep each once.
            if (value && Array.isArray(value.tags)) {
              const seen = new Set();
              value.tags = value.tags.filter((t) => { const k = String(t).trim().toLowerCase(); return k && !seen.has(k) && seen.add(k); });
            }
            if (value !== undefined) { setAt(target, keys, value); merged += 1; }
          }
          writeJson(targetPath, target);
        }
      }
      const { fixed, problems } = protectLinks(content, locale);
      report.push({ locale, articles: content.filter((rel) => fs.existsSync(path.join(ROOT, rel.replace('/en/', `/${locale}/`)))).length, merged, fixed, problems });
    } finally {
      cleanupPending();
    }
  }

  if (has('estimate') || dryRun) return;
  console.log('\n================ Summary ================');
  for (const r of report) {
    console.log(`${r.locale}: ${r.articles} article(s) written, ${r.merged} title/SEO entr${r.merged === 1 ? 'y' : 'ies'} merged${r.fixed ? `, ${r.fixed} link path(s) restored` : ''}`);
    if (r.problems.length) {
      console.log(`  ⚠ ${r.problems.length} string(s) have a different number of links than the English — check them:`);
      r.problems.slice(0, 10).forEach((x) => console.log(`    ${x}`));
    }
  }
  console.log(`Total spend: $${spent.toFixed(2)}`);
  console.log('Next: node scripts/translate/validate.mjs resources && node scripts/translate/validate.mjs locales');
}

main();
