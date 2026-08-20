import { createInstance, type Resource } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

export const namespaces = [
  "common",
  "blogs-meta",
  "resources-meta",
  "pageMeta",
] as const;

/**
 * Namespaces the browser actually reads, and therefore the only ones worth
 * serialising into the RSC payload of every page.
 *
 * `pageMeta` is excluded: its sole consumer is `buildPageMetadata()`, which runs
 * server-side inside `generateMetadata`. Shipping it to the client added ~2 KB
 * gzip per page that nothing could ever read.
 */
export const clientNamespaces = [
  "common",
  "blogs-meta",
  "resources-meta",
] as const;

const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function getTranslation(
  lng: string,
  ns?: string | string[],
  options: { keyPrefix?: string } = {},
) {
  const namespacesToLoad = ns ?? [...namespaces];
  const i18nextInstance = await initI18next(lng, namespacesToLoad);
  const primaryNs = Array.isArray(namespacesToLoad)
    ? namespacesToLoad[0]
    : namespacesToLoad;

  // Only the requested locale is serialised. The English fallback copy used to
  // ride along here, doubling the payload on every non-English page (~26 KB
  // gzip) to guard against missing keys — but locale parity is complete, so it
  // could never fire. If a key ever does go missing, the client instance still
  // has `fallbackLng` set and `resourcesToBackend` registered, so it fetches the
  // English namespace on demand as a chunk rather than preloading it for
  // everyone. Server-side `t` below is unaffected: its instance keeps the full
  // store, fallback included.
  const fullStore = i18nextInstance.services.resourceStore.data as Resource;
  const trimmedResources: Resource = {};
  if (fullStore[lng]) trimmedResources[lng] = fullStore[lng];

  return {
    t: i18nextInstance.getFixedT(lng, primaryNs, options.keyPrefix),
    i18n: i18nextInstance,
    resources: Object.keys(trimmedResources).length > 0
      ? trimmedResources
      : fullStore,
  };
}

/** @deprecated Use getTranslation instead */
export async function useTranslation(
  lng: string,
  ns?: string | string[],
  options: { keyPrefix?: string } = {},
) {
  return getTranslation(lng, ns, options);
}
