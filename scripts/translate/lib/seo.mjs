/**
 * Which leaves carry SEO copy, and their character budgets.
 *
 * Shared by translate.mjs (to tell the model the limit up front) and
 * validate.mjs (to enforce it afterwards). Keep them in sync by keeping this
 * the only definition.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

const TITLE_KEYS = new Set(['title', 'ogTitle', 'twitterTitle']);
const DESCRIPTION_KEYS = new Set(['description', 'ogDescription', 'twitterDescription']);

/**
 * Character limit for a leaf, or null if it is not an SEO field.
 * Two shapes carry real SEO copy:
 *   - content files:  `meta.title`, `meta.description`
 *   - pageMeta.json:  `<page>.title`, `<page>.ogDescription`, ...
 * Everything else (`posts.<slug>.title`, `articles.<slug>.title`) is a display
 * title and is not length-capped.
 */
export function seoLimit(relSourcePath, leafPath) {
  const parts = leafPath.split('.');
  const key = parts[parts.length - 1];
  const parent = parts[parts.length - 2];

  const isMetaBlock = parent === 'meta';
  const isPageMeta = relSourcePath.endsWith('/pageMeta.json') && parts.length === 2;
  if (!isMetaBlock && !isPageMeta) return null;

  if (TITLE_KEYS.has(key)) return TITLE_MAX;
  if (DESCRIPTION_KEYS.has(key)) return DESCRIPTION_MAX;
  return null;
}
