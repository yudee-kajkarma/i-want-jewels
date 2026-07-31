import type { Metadata } from "next";
import { getTranslation } from "./index";
import { buildAlternateLanguages, getLocalizedPath } from "./routing";

const BASE_URL = "https://www.iwantjewels.com";

/** Locale-aware canonical + hreflang alternates for App Router metadata. */
export function localizedAlternates(
  pathWithoutLocale: string,
  locale: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `${BASE_URL}${getLocalizedPath(locale, pathWithoutLocale)}`,
    languages: buildAlternateLanguages(pathWithoutLocale),
  };
}

/** Absolute URLs for sitemap entries. */
export function getAbsoluteLocalizedUrl(
  pathWithoutLocale: string,
  locale: string,
): string {
  return `${BASE_URL}${getLocalizedPath(locale, pathWithoutLocale)}`;
}

export function getSitemapAlternateLanguages(
  pathWithoutLocale: string,
): Record<string, string> {
  return buildAlternateLanguages(pathWithoutLocale);
}

type PageMetadataOptions = {
  includeOpenGraph?: boolean;
  includeTwitter?: boolean;
};

/** Build localized page metadata from the pageMeta namespace. */
export async function buildPageMetadata(
  locale: string,
  pageKey: string,
  pathWithoutLocale: string,
  options: PageMetadataOptions = {},
): Promise<Metadata> {
  const { includeOpenGraph = true, includeTwitter = true } = options;
  const { t } = await getTranslation(locale, "pageMeta");

  const title = t(`${pageKey}.title`);
  const description = t(`${pageKey}.description`);
  const ogTitle = t(`${pageKey}.ogTitle`, { defaultValue: title });
  const ogDescription = t(`${pageKey}.ogDescription`, {
    defaultValue: description,
  });
  const twitterTitle = t(`${pageKey}.twitterTitle`, { defaultValue: title });
  const twitterDescription = t(`${pageKey}.twitterDescription`, {
    defaultValue: description,
  });

  const metadata: Metadata = {
    title: { absolute: title },
    description,
    alternates: localizedAlternates(pathWithoutLocale, locale),
  };

  if (includeOpenGraph) {
    metadata.openGraph = {
      title: ogTitle,
      description: ogDescription,
      type: "website",
    };
  }

  if (includeTwitter) {
    metadata.twitter = {
      card: "summary_large_image",
      title: twitterTitle,
      description: twitterDescription,
    };
  }

  return metadata;
}
