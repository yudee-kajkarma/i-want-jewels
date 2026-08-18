/**
 * Traversal for locale + content JSON.
 *
 * collect() flattens a document into an ordered list of translatable leaves,
 * keyed by dotted path. apply() rebuilds the document from a path->string map.
 * Document order is preserved so the model reads the flattened map as prose
 * rather than a bag of disconnected strings.
 */

/** Keys whose string values are never translated (URLs, assets, discriminators). */
export const SKIP_KEYS = new Set([
  'href', 'shopHref', 'primaryHref', 'secondaryHref', 'tertiaryHref',
  'image', 'coverImage', 'type', 'imagePosition',
]);

/** Values that carry no translatable content regardless of key. */
function isSkippableValue(text) {
  if (!text.trim()) return true;
  if (/^[\d\s.,:/–—-]+$/.test(text)) return true; // pure numerics/punctuation
  if (/^(https?:)?\/\//.test(text)) return true; // bare URLs
  return false;
}

/**
 * Flatten to ordered [{ path, value }]. Paths use dots for object keys and
 * numeric segments for array indices: `sections.2.content.0.text`.
 */
export function collect(node, path = [], out = []) {
  if (typeof node === 'string') {
    const key = path.length ? path[path.length - 1] : '';
    const arrayLeaf = /^\d+$/.test(String(key));
    const ownerKey = arrayLeaf ? path[path.length - 2] : key;
    if (!SKIP_KEYS.has(ownerKey) && !isSkippableValue(node)) {
      out.push({ path: path.join('.'), value: node });
    }
    return out;
  }

  if (Array.isArray(node)) {
    node.forEach((item, i) => collect(item, [...path, String(i)], out));
    return out;
  }

  if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) collect(node[key], [...path, key], out);
  }

  return out;
}

/**
 * Rebuild a document with translated strings. Any path missing from `map`
 * keeps its English value, so a partial map degrades rather than corrupts.
 */
export function apply(node, map, path = []) {
  if (typeof node === 'string') {
    const joined = path.join('.');
    return Object.prototype.hasOwnProperty.call(map, joined) ? map[joined] : node;
  }

  if (Array.isArray(node)) {
    return node.map((item, i) => apply(item, map, [...path, String(i)]));
  }

  if (node && typeof node === 'object') {
    const result = {};
    for (const key of Object.keys(node)) {
      result[key] = apply(node[key], map, [...path, key]);
    }
    return result;
  }

  return node;
}

/** CLDR plural category suffixes. Which of these a locale needs varies by language. */
export const PLURAL_SUFFIX = /_(zero|one|two|few|many|other)$/;

/**
 * Merge freshly-translated output over an existing target file, keeping any
 * keys the target has that English does not.
 *
 * This matters: fr/it/es carry 31 `_many` plural keys that en/nl/de have no
 * equivalent for. Rebuilding purely from the English shape would delete them
 * and silently break pluralisation. `next` always wins where both have a key.
 */
export function preserveExtras(next, existing) {
  if (!existing || typeof existing !== 'object' || Array.isArray(existing)) return next;
  if (!next || typeof next !== 'object' || Array.isArray(next)) return next;

  const result = { ...next };
  for (const key of Object.keys(existing)) {
    if (!(key in result)) result[key] = existing[key];
    else result[key] = preserveExtras(result[key], existing[key]);
  }
  return result;
}

/** Structural fingerprint: every path in the doc plus the type at each leaf. */
export function shape(node, path = [], out = []) {
  if (Array.isArray(node)) {
    out.push(`${path.join('.')}[]${node.length}`);
    node.forEach((item, i) => shape(item, [...path, String(i)], out));
  } else if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) shape(node[key], [...path, key], out);
  } else {
    out.push(`${path.join('.')}:${typeof node}`);
  }
  return out;
}

/** Interpolation placeholders that must survive translation byte-identical. */
export function placeholders(text) {
  return (text.match(/\{\{[^}]+\}\}/g) || []).sort();
}
