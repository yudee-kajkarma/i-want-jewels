import { createInstance, type Resource } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { fallbackLng, getOptions } from "./settings";

export const namespaces = [
  "common",
  "blogs-meta",
  "resources-meta",
  "pageMeta",
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

  const fullStore = i18nextInstance.services.resourceStore.data as Resource;
  const trimmedResources: Resource = {};
  if (fullStore[lng]) trimmedResources[lng] = fullStore[lng];
  if (lng !== fallbackLng && fullStore[fallbackLng]) {
    trimmedResources[fallbackLng] = fullStore[fallbackLng];
  }

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
