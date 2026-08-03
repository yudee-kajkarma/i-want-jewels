'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { languages, cookieName } from '../../i18n/settings';
import { getLocalizedPath, parseLocalePathname } from '../../i18n/routing';

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
};

function ChevronIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 7 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function setLocaleCookie(locale: string) {
  document.cookie = `${cookieName}=${locale}; path=/; max-age=31536000`;
}

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'languageSwitcher' });
  const pathname = usePathname() ?? '/';

  const { locale: localeFromPath, pathnameWithoutLocale } = useMemo(
    () => parseLocalePathname(pathname),
    [pathname],
  );

  const currentLocale = localeFromPath ?? i18n.resolvedLanguage ?? 'en';

  return (
    <details className="group relative z-[100]">
      <summary
        className="flex h-8 cursor-pointer list-none items-center gap-1 rounded-full px-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900 [&::-webkit-details-marker]:hidden"
        aria-label={t('selectLanguage')}
      >
        <span className="text-[13px] font-medium uppercase">{currentLocale}</span>
        <ChevronIcon className="h-3 w-3 text-zinc-500 transition group-open:rotate-180" />
      </summary>

      <div
        role="listbox"
        aria-label={t('languageOptions')}
        className="absolute right-0 top-[calc(100%+8px)] z-[100] min-w-[180px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_18px_40px_rgba(17,24,39,0.12)]"
      >
        {languages.map((locale) => {
          const href = getLocalizedPath(locale, pathnameWithoutLocale);
          const isActive = locale === currentLocale;

          return (
            <Link
              key={locale}
              href={href}
              prefetch={false}
              onClick={(event) => {
                if (event.defaultPrevented) return;
                if (event.button !== 0) return;
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                setLocaleCookie(locale);
                // Full document navigation guarantees the new cookie is used
                // for the request and bypasses the Router Cache (which would
                // otherwise serve a prefetch made under the previous locale).
                window.location.assign(href);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] tracking-[0.02em] ${
                isActive
                  ? 'bg-zinc-100 font-medium text-zinc-900'
                  : 'text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <span className="w-6 text-[11px] font-semibold uppercase text-zinc-400">
                {locale}
              </span>
              <span>{LANGUAGE_LABELS[locale]}</span>
            </Link>
          );
        })}
      </div>
    </details>
  );
}
