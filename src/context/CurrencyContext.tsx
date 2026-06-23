'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  CURRENCY_MANUAL_KEY,
  CURRENCY_STORAGE_KEY,
  DEFAULT_CURRENCY,
  detectLocaleCurrency,
  formatPrice as formatPriceUtil,
  getCurrencyIsoCode,
  getPriceAmount as getPriceAmountUtil,
  isoToCurrencyCode,
  type CurrencyCode,
  type PriceInput,
} from '../utils/price'
import { useAuth } from './AuthContext'
import { updateCurrencyPreference } from '../services/authService'

type SetCurrencyOptions = {
  // When true, the choice is treated as an explicit user selection: it is
  // remembered as manual (winning over auto-detection) and, if the user is
  // logged in, persisted to their account.
  manual?: boolean
}

type CurrencyContextValue = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode, options?: SetCurrencyOptions) => void
  // Auto-switch to GBP when a UK ('GB') address is entered/selected, unless the
  // user has already made an explicit manual choice. No-op for other countries.
  applyAddressCountry: (country: string | null | undefined) => void
  format: (price: PriceInput) => string
  amount: (price: PriceInput) => number
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

function isValidCurrency(value: string | null): value is CurrencyCode {
  return value === 'dol' || value === 'eur' || value === 'pou'
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth()
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY)

  const preferredCurrency = session?.preferredCurrency
  const currencyManuallySet = session?.currencyManuallySet

  // Resolve the active currency on mount and whenever the signed-in user's
  // currency info changes. Precedence (highest → lowest):
  //   1. Manual choice (account-level, then device-level localStorage)
  //   2. UK-address-derived account preference (auto)
  //   3. Browser locale / timezone detection
  //   4. EUR default
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const localManual =
      window.localStorage.getItem(CURRENCY_MANUAL_KEY) === '1'
    const localStored = window.localStorage.getItem(CURRENCY_STORAGE_KEY)

    // 1a. Explicit manual choice saved on the account wins everywhere. Mirror
    // it to this device so it also persists locally.
    if (currencyManuallySet && preferredCurrency) {
      const code = isoToCurrencyCode(preferredCurrency)
      if (code) {
        window.localStorage.setItem(CURRENCY_STORAGE_KEY, code)
        window.localStorage.setItem(CURRENCY_MANUAL_KEY, '1')
        setCurrencyState(code)
        return
      }
    }

    // 1b. Explicit manual choice made on this device.
    if (localManual && isValidCurrency(localStored)) {
      setCurrencyState(localStored)
      return
    }

    // 2. Address-derived account preference (e.g. a UK address → GBP).
    if (preferredCurrency) {
      const code = isoToCurrencyCode(preferredCurrency)
      if (code) {
        setCurrencyState(code)
        return
      }
    }

    // 3. Locale / timezone guess.  4. Falls back to the default inside helper.
    setCurrencyState(detectLocaleCurrency())
  }, [preferredCurrency, currencyManuallySet])

  const setCurrency = useCallback(
    (next: CurrencyCode, options?: SetCurrencyOptions) => {
      setCurrencyState(next)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CURRENCY_STORAGE_KEY, next)

        if (options?.manual) {
          window.localStorage.setItem(CURRENCY_MANUAL_KEY, '1')
        }
      }

      // Persist an explicit choice to the account so it follows the user to
      // other devices. Local state stays correct even if this request fails.
      if (options?.manual && session?.token) {
        const iso = getCurrencyIsoCode(next)
        if (iso === 'EUR' || iso === 'GBP') {
          void updateCurrencyPreference(iso).catch(() => {})
        }
      }
    },
    [session?.token],
  )

  const applyAddressCountry = useCallback(
    (country: string | null | undefined) => {
      if (typeof window === 'undefined') {
        return
      }

      if ((country ?? '').trim().toUpperCase() !== 'GB') {
        return
      }

      // Respect an explicit manual choice (device or account).
      const localManual =
        window.localStorage.getItem(CURRENCY_MANUAL_KEY) === '1'
      if (localManual || currencyManuallySet) {
        return
      }

      setCurrencyState('pou')
    },
    [currencyManuallySet],
  )

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      applyAddressCountry,
      format: (price) => formatPriceUtil(price, currency),
      amount: (price) => getPriceAmountUtil(price, currency),
    }),
    [currency, setCurrency, applyAddressCountry],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext)

  if (!ctx) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }

  return ctx
}
