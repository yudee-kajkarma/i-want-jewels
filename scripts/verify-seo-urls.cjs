/** Verify public URL generation for SEO (no /en/ prefix for English). */
const BASE = 'https://www.iwantjewels.com';
const fallbackLng = 'en';
const languages = ['en', 'nl', 'de', 'fr', 'it', 'es'];

function getLocalizedPath(locale, pathWithoutLocale) {
  const path = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
  if (locale === fallbackLng) return path;
  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

function buildAlternateLanguages(pathWithoutLocale) {
  const alternates = {};
  for (const locale of languages) alternates[locale] = getLocalizedPath(locale, pathWithoutLocale);
  alternates['x-default'] = getLocalizedPath(fallbackLng, pathWithoutLocale);
  return alternates;
}

const paths = ['/', '/about', '/products', '/resources', '/contact', '/faq'];
let ok = true;

for (const p of paths) {
  const enUrl = `${BASE}${getLocalizedPath('en', p)}`;
  if (enUrl.includes('/en/') || enUrl.endsWith('/en')) {
    console.error('FAIL English URL has prefix:', enUrl);
    ok = false;
  }
  const nlUrl = `${BASE}${getLocalizedPath('nl', p)}`;
  if (!nlUrl.includes('/nl/') && p !== '/') {
    console.error('FAIL Dutch URL missing prefix:', nlUrl);
    ok = false;
  }
  const alts = buildAlternateLanguages(p);
  const required = ['en', 'nl', 'de', 'fr', 'it', 'es', 'x-default'];
  for (const key of required) {
    if (!alts[key]) {
      console.error(`FAIL missing hreflang ${key} for ${p}`);
      ok = false;
    }
  }
}

console.log('Sample English URLs:', paths.map((p) => `${BASE}${getLocalizedPath('en', p)}`).join(', '));
console.log('Sample Dutch URLs:', paths.map((p) => `${BASE}${getLocalizedPath('nl', p)}`).join(', '));
console.log('hreflang /about:', buildAlternateLanguages('/about'));
console.log(ok ? 'SEO URL verification: PASS' : 'SEO URL verification: FAIL');
