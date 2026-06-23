export type CurrencyCode = 'eur' | 'pou'

export type Price = {
  // dol: number
  eur: number
  pou: number
}

export const CURRENCY_STORAGE_KEY = 'iwj_currency'
// Set to '1' once the visitor explicitly picks a currency from the switcher.
// A manual choice wins over the automatic address/timezone detection.
export const CURRENCY_MANUAL_KEY = 'iwj_currency_manual'
export const DEFAULT_CURRENCY: CurrencyCode = 'eur'

export const CURRENCY_OPTIONS: Array<{ code: CurrencyCode; label: string; symbol: string }> = [
  // { code: 'dol', label: 'USD', symbol: '$' },
  { code: 'eur', label: 'EUR', symbol: '€' },
  { code: 'pou', label: 'GBP', symbol: '£' },
]

const CURRENCY_ISO: Record<CurrencyCode, string> = {
  // dol: 'USD',
  eur: 'EUR',
  pou: 'GBP',
}

export function getCurrencyIsoCode(currency: CurrencyCode): string {
  return CURRENCY_ISO[currency]
}

// Map a backend ISO code (e.g. 'GBP'/'EUR') to our internal currency code.
// Returns null for anything we don't support so callers can fall back.
export function isoToCurrencyCode(iso: string | null | undefined): CurrencyCode | null {
  if (!iso) {
    return null
  }

  const normalized = iso.trim().toUpperCase()

  if (normalized === 'GBP') {
    return 'pou'
  }

  if (normalized === 'EUR') {
    return 'eur'
  }

  return null
}

// Best-effort, client-only guess of whether the visitor is in the UK, based on
// browser language and timezone. No network/IP lookup. UK → GBP, else EUR.
export function detectLocaleCurrency(): CurrencyCode {
  if (typeof window === 'undefined') {
    return DEFAULT_CURRENCY
  }

  try {
    const languages =
      (Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language]
      ).filter(Boolean) as string[]

    if (languages.some((lang) => lang.toLowerCase() === 'en-gb')) {
      return 'pou'
    }

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timeZone === 'Europe/London') {
      return 'pou'
    }
  } catch {
    // Intl/navigator unavailable — fall through to the default.
  }

  return DEFAULT_CURRENCY
}

const CURRENCY_LOCALE: Record<CurrencyCode, string> = {
  // dol: 'en-US',
  eur: 'en-IE',
  pou: 'en-GB',
}

const formatterCache = new Map<CurrencyCode, Intl.NumberFormat>()

function getFormatter(currency: CurrencyCode): Intl.NumberFormat {
  let formatter = formatterCache.get(currency)

  if (!formatter) {
    formatter = new Intl.NumberFormat(CURRENCY_LOCALE[currency], {
      style: 'currency',
      currency: CURRENCY_ISO[currency],
      maximumFractionDigits: 0,
    })
    formatterCache.set(currency, formatter)
  }

  return formatter
}

export type PriceInput = Price | number | null | undefined

export function toPrice(value: PriceInput): Price {
  if (value == null) {
    return { eur: 0, pou: 0 }
  }

  if (typeof value === 'number') {
    return { eur: value, pou: value }
  }

  if (typeof value === 'object') {
    return {
      // dol: Number((value as Price).dol) || 0,
      eur: Number((value as Price).eur) || 0,
      pou: Number((value as Price).pou) || 0,
    }
  }

  return {  eur: 0, pou: 0 }
}

export function getPriceAmount(price: PriceInput, currency: CurrencyCode): number {
  return toPrice(price)[currency]
}

export function formatPrice(price: PriceInput, currency: CurrencyCode): string {
  return getFormatter(currency).format(getPriceAmount(price, currency))
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return CURRENCY_OPTIONS.find((option) => option.code === currency)?.symbol ?? ''
}

export function minPriceOf(prices: PriceInput[]): Price {
  if (prices.length === 0) {
    return { eur: 0, pou: 0 }
  }

  const normalized = prices.map(toPrice)

  return {
    eur: Math.min(...normalized.map((price) => price.eur)),
    pou: Math.min(...normalized.map((price) => price.pou)),
  }
}
