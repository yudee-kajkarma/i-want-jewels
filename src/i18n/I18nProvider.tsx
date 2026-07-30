'use client';

import { ReactNode, useEffect } from 'react';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions, languages } from './settings';

const runsOnServerSide = typeof window === 'undefined';

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`)))
    .init({
      ...getOptions(),
      lng: undefined,
      preload: runsOnServerSide ? languages : []
    });
}

export function I18nProvider({ children, locale }: { children: ReactNode; locale: string }) {
  useEffect(() => {
    if (i18next.resolvedLanguage !== locale) {
      void i18next.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
