/**
 * Locale-aware date formatting.
 *
 * Dates are a locale concern, not a language one: `15/08/2026`, `15.08.2026`
 * and `8/15/2026` are all "English" depending on where you are. Formatting was
 * previously hardcoded per call site (`en-IN`, `en-US`, `en-GB`, or the machine
 * default), so a French customer read their own order history in Indian-English
 * format. Everything now derives from the active app locale.
 */

/**
 * BCP 47 tag to format with, for a given app locale.
 *
 * `en` maps to `en-GB` rather than `en-US`: the store is European — EUR
 * pricing, British spelling throughout the copy — so an English visitor expects
 * `15 Aug 2026`, not `Aug 15, 2026`. This matches the choice already made in
 * `formatReviewDate` on the product detail page.
 *
 * The other five locales (`nl`, `de`, `fr`, `it`, `es`) are already valid BCP 47
 * tags and pass through unchanged.
 */
const DATE_LOCALES: Record<string, string> = {
  en: "en-GB",
};

export function toDateLocale(locale: string): string {
  return DATE_LOCALES[locale] ?? locale;
}

/** `15 Aug 2026` in en-GB, `15. Aug. 2026` in de, `15 août 2026` in fr. */
export const DATE_ONLY: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

/** As `DATE_ONLY`, plus `14:30`. Note 12- vs 24-hour is decided by the locale. */
export const DATE_AND_TIME: Intl.DateTimeFormatOptions = {
  ...DATE_ONLY,
  hour: "2-digit",
  minute: "2-digit",
};

type DateInput = string | number | Date | null | undefined;

function toDate(value: DateInput): Date | null {
  if (value == null || value === "") {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Format a date in the visitor's locale.
 *
 * Returns `fallback` (empty by default) for a missing or unparseable value, so
 * a bad timestamp renders as nothing rather than the literal "Invalid Date".
 */
export function formatDate(
  value: DateInput,
  locale: string,
  options: Intl.DateTimeFormatOptions = DATE_ONLY,
  fallback = "",
): string {
  const date = toDate(value);

  if (!date) {
    return fallback;
  }

  return new Intl.DateTimeFormat(toDateLocale(locale), options).format(date);
}

/** Date plus time — used for orders, payments and support tickets. */
export function formatDateTime(
  value: DateInput,
  locale: string,
  fallback = "",
): string {
  return formatDate(value, locale, DATE_AND_TIME, fallback);
}
