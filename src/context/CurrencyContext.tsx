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
  CURRENCY_STORAGE_KEY,
  DEFAULT_CURRENCY,
  formatPrice as formatPriceUtil,
  getPriceAmount as getPriceAmountUtil,
  type CurrencyCode,
  type PriceInput,
} from '../utils/price'

type CurrencyContextValue = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  format: (price: PriceInput) => string
  amount: (price: PriceInput) => number
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

function isValidCurrency(value: string | null): value is CurrencyCode {
  return value === 'dol' || value === 'eur' || value === 'pou'
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const stored = window.localStorage.getItem(CURRENCY_STORAGE_KEY)

    if (isValidCurrency(stored)) {
      setCurrencyState(stored)
    }
  }, [])

  const setCurrency = useCallback((next: CurrencyCode) => {
    setCurrencyState(next)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, next)
    }
  }, [])

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      format: (price) => formatPriceUtil(price, currency),
      amount: (price) => getPriceAmountUtil(price, currency),
    }),
    [currency, setCurrency],
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
