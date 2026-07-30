import { fallbackLng, languages } from './settings';

/** Locales that use a URL prefix (all except English). */
export const localizedLanguages = languages.filter((locale) => locale !== fallbackLng);

/** Legacy English URL prefixes that must redirect to the root. */
export const englishUrlPrefixes = ['en', 'eng', 'english', 'en-us', 'en-gb'] as const;

export function normalizePath(path: string): string {
  if (!path || path === '') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

/** Public URL path for a locale + path-without-locale (English has no prefix). */
export function getLocalizedPath(locale: string, pathWithoutLocale: string): string {
  const path = normalizePath(pathWithoutLocale);

  if (locale === fallbackLng) {
    return path;
  }

  if (path === '/') {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
}

export type ParsedLocalePath = {
  locale: string | null;
  pathnameWithoutLocale: string;
};

/** Detect locale prefix in a pathname, including legacy English prefixes. */
export function parseLocalePathname(pathname: string): ParsedLocalePath {
  for (const prefix of englishUrlPrefixes) {
    if (pathname === `/${prefix}`) {
      return { locale: fallbackLng, pathnameWithoutLocale: '/' };
    }
    if (pathname.startsWith(`/${prefix}/`)) {
      return {
        locale: fallbackLng,
        pathnameWithoutLocale: normalizePath(pathname.slice(prefix.length + 1)),
      };
    }
  }

  for (const locale of localizedLanguages) {
    if (pathname === `/${locale}`) {
      return { locale, pathnameWithoutLocale: '/' };
    }
    if (pathname.startsWith(`/${locale}/`)) {
      return {
        locale,
        pathnameWithoutLocale: normalizePath(pathname.slice(locale.length + 1)),
      };
    }
  }

  return { locale: null, pathnameWithoutLocale: normalizePath(pathname) };
}

/** True when the pathname uses a legacy English prefix that should 308-redirect to root. */
export function isLegacyEnglishPrefix(pathname: string): boolean {
  return englishUrlPrefixes.some(
    (prefix) => pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`),
  );
}

/** Build hreflang map including x-default (English root URLs). */
export function buildAlternateLanguages(pathWithoutLocale: string): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const locale of languages) {
    alternates[locale] = getLocalizedPath(locale, pathWithoutLocale);
  }

  alternates['x-default'] = getLocalizedPath(fallbackLng, pathWithoutLocale);

  return alternates;
}

/** Internal Next.js path under `[locale]` (always includes `/en` segment for English). */
export function getInternalLocalePath(locale: string, pathWithoutLocale: string): string {
  const path = normalizePath(pathWithoutLocale);
  if (path === '/') {
    return `/${locale}`;
  }
  return `/${locale}${path}`;
}
