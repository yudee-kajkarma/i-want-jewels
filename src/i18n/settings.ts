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

/** Locales for `[locale]` static generation. Empty = all locales render on-demand
 *  via ISR (keeps the Amplify deploy artifact under the 220 MB limit). */
export function getLocalizedStaticParams() {
  return [];
}
