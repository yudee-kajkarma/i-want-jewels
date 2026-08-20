/**
 * File discovery. Every scope resolves to a list of { source, targetFor(locale) }
 * so the runner and estimator agree on exactly what work exists.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(fileURLToPath(import.meta.url), '../../../..');
export const LOCALES = ['nl', 'de', 'fr', 'it', 'es'];
export const SOURCE_LOCALE = 'en';

/** Which model tier each scope runs on — see README for the rationale. */
export const SCOPES = {
  locales: { dir: 'src/locales', tier: 'high' },
  blogs: { dir: 'src/content/blogs', tier: 'bulk' },
  resources: { dir: 'src/content/resources', tier: 'bulk' },
};

function walkDir(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, out);
    else if (entry.name.endsWith('.json')) out.push(full);
  }
  return out;
}

/**
 * Resolve a scope name (or an explicit repo-relative file path) to work items.
 * `filter` is an optional substring match against the source path.
 */
export function resolveScope(scope, filter) {
  const explicit = path.join(ROOT, scope);
  if (fs.existsSync(explicit) && fs.statSync(explicit).isFile()) {
    return [toItem(explicit, inferScopeDir(explicit))];
  }

  const config = SCOPES[scope];
  if (!config) {
    throw new Error(
      `Unknown scope "${scope}". Use one of: ${Object.keys(SCOPES).join(', ')}, or a repo-relative .json path.`,
    );
  }

  const sourceDir = path.join(ROOT, config.dir, SOURCE_LOCALE);
  let files = walkDir(sourceDir);
  if (filter) files = files.filter((f) => f.includes(filter));
  return files.map((f) => toItem(f, config.dir));
}

function inferScopeDir(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const match = Object.values(SCOPES).find((s) => rel.startsWith(`${s.dir}/`));
  if (!match) throw new Error(`File is outside a known scope: ${rel}`);
  return match.dir;
}

function toItem(source, scopeDir) {
  const base = path.join(ROOT, scopeDir, SOURCE_LOCALE);
  const relative = path.relative(base, source);
  return {
    source,
    relative: path.join(scopeDir, SOURCE_LOCALE, relative).split(path.sep).join('/'),
    tier: Object.values(SCOPES).find((s) => s.dir === scopeDir)?.tier ?? 'bulk',
    targetFor: (locale) => path.join(ROOT, scopeDir, locale, relative),
  };
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}
