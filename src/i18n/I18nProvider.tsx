"use client";

import { createInstance, type Resource } from "i18next";
import { ReactNode, useEffect, useMemo } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { setClientI18n } from "./clientRef";
import { getOptions } from "./settings";

type I18nProviderProps = {
  children: ReactNode;
  locale: string;
  resources: Resource;
};

export function I18nProvider({
  children,
  locale,
  resources,
}: I18nProviderProps) {
  const i18n = useMemo(() => {
    const instance = createInstance();
    instance
      .use(initReactI18next)
      .use(
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`../locales/${language}/${namespace}.json`),
        ),
      )
      .init({
        ...getOptions(locale),
        lng: locale,
        resources,
        initAsync: false,
      });
    setClientI18n(instance);
    return instance;
  }, [locale, resources]);

  useEffect(() => {
    setClientI18n(i18n);
    if (i18n.resolvedLanguage !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
