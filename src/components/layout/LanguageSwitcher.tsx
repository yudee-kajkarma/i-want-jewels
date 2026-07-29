'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { languages, cookieName } from '../../i18n/settings';

const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español'
};

function ChevronIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 7 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.resolvedLanguage || 'en';
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }
    
    // Set cookie for middleware persistence
    document.cookie = `${cookieName}=${newLocale}; path=/; max-age=31536000`;
    
    // Replace the locale prefix in the pathname
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath || `/${newLocale}`);
    
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative z-50">
      <button
        type="button"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-8 items-center gap-1 rounded-full px-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
      >
        <span className="text-[13px] font-medium uppercase">{currentLocale}</span>
        <ChevronIcon className="h-3 w-3 text-zinc-500" />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Language options"
          className="absolute right-0 top-[calc(100%+10px)] min-w-[140px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_18px_40px_rgba(17,24,39,0.12)]"
        >
          {languages.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => handleLanguageChange(locale)}
              className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] tracking-[0.02em] ${
                locale === currentLocale
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <span>{LANGUAGE_LABELS[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
