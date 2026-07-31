export const fallbackLng = "en";
export const languages = [fallbackLng, "nl", "de", "fr", "it", "es"];
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}

/** Locales for `[locale]` static generation (English uses root URLs, no `/en` prefix). */
export function getLocalizedStaticParams() {
  return languages
    .filter((l) => l !== fallbackLng)
    .map((locale) => ({ locale }));
}
