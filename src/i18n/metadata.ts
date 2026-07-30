import type { Metadata } from 'next';
import { buildAlternateLanguages, getLocalizedPath } from './routing';

const BASE_URL = 'https://www.iwantjewels.com';

/** Locale-aware canonical + hreflang alternates for App Router metadata. */
export function localizedAlternates(
  pathWithoutLocale: string,
  locale: string,
): NonNullable<Metadata['alternates']> {
  return {
    canonical: getLocalizedPath(locale, pathWithoutLocale),
    languages: buildAlternateLanguages(pathWithoutLocale),
  };
}

/** Absolute URLs for sitemap entries. */
export function getAbsoluteLocalizedUrl(pathWithoutLocale: string, locale: string): string {
  return `${BASE_URL}${getLocalizedPath(locale, pathWithoutLocale)}`;
}

export function getSitemapAlternateLanguages(
  pathWithoutLocale: string,
): Record<string, string> {
  const alternates: Record<string, string> = {};

  for (const [locale, path] of Object.entries(buildAlternateLanguages(pathWithoutLocale))) {
    if (locale === 'x-default') {
      alternates['x-default'] = `${BASE_URL}${path}`;
    } else {
      alternates[locale] = `${BASE_URL}${path}`;
    }
  }

  return alternates;
}
