'use client'

import { ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useCurrency } from '../../../context/CurrencyContext'
import { useAppSelector } from '../../../store/hooks'
import type { CartItem } from '../../../types/cart'
import { formatPrice, getPriceAmount } from '../../../utils/price'
import { CARD } from '../ui'
import { BagLinks, EMPTY_ACTION, EmptyCard, ShopSkeleton, Thumb } from './ShopParts'
import { SmartLink } from './SmartLink'

/** Items listed in the chat; the rest are on the bag page. */
const ITEMS_SHOWN = 4

/** The item's photo; the bag's own "No Image" placeholder (a data: picture) shows Jules's gem instead. */
const photoOf = (item: CartItem) => {
  const src = item.thumbnail?.trim()
  return src && /^(https?:\/\/|\/(?![/\\]))/i.test(src) ? src : undefined
}

/**
 * The shopping bag, read live from the shop's store (not a copy taken when
 * it was asked for), so it always matches the bag page: each item with its
 * colour, size, quantity and price in the visitor's currency, the subtotal,
 * and View bag / Checkout. An empty bag offers the shop instead.
 */
export function BagBlock() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat' })
  const { currency } = useCurrency()
  const cart = useAppSelector((state) => state.cart.cart)
  const loading = useAppSelector((state) => state.cart.status === 'loading' && !state.cart.cart)
  const items = cart?.items ?? []

  if (loading) return <ShopSkeleton label={t('jules.loading')} />
  if (!items.length) {
    return (
      <EmptyCard
        icon={ShoppingBag}
        text={t('jules.shop.emptyBag')}
        action={
          <SmartLink to="/products" className={EMPTY_ACTION}>
            {t('tools.shopNow')}
          </SmartLink>
        }
      />
    )
  }

  const count = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + getPriceAmount(item.price, currency) * item.quantity, 0)
  const hidden = items.length - ITEMS_SHOWN

  /** A size as Jules writes sizes elsewhere: "0.5 ct" (carats), "18 in" (a necklace's length), else "Size 52". */
  const sizeText = (value: number, measurement?: string) => {
    const size = new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 2 }).format(value)
    const unit = measurement?.trim().toUpperCase()
    if (unit === 'CARAT' || unit === 'CT') return t('jules.shop.sizeCarat', { size })
    if (unit === 'INCH' || unit === 'IN') return t('jules.shop.sizeInch', { size })
    return t('jules.shop.size', { size })
  }

  /** "Yellow Gold · 18 in · Qty 1". */
  const details = (item: CartItem) =>
    [
      item.variantTitle,
      typeof item.size === 'number' ? sizeText(item.size, item.sizeMeasurement) : undefined,
      t('jules.shop.qty', { count: item.quantity }),
    ]
      .filter(Boolean)
      .join(' · ')

  return (
    <section aria-label={t('jules.shop.bag')} className={cn(CARD, 'overflow-hidden')}>
      <div className="flex items-baseline justify-between gap-3 px-4 pb-1 pt-3.5">
        <h3 className="text-[14px] font-semibold text-[#f6f1ee]">{t('jules.shop.bag')}</h3>
        <span className="text-[12px] text-[#a69d98]">{t('tools.items', { count })}</span>
      </div>
      <ul className="divide-y divide-white/[0.06] px-4">
        {items.slice(0, ITEMS_SHOWN).map((item, i) => (
          <li key={item.id || `${i}-${item.variantId}`} className="flex items-center gap-3 py-3">
            <Thumb src={photoOf(item)} sizes="48px" className="h-12 w-12" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-[#f6f1ee]">{item.title}</p>
              <p className="mt-0.5 truncate text-[12px] text-[#a69d98]">{details(item)}</p>
            </div>
            <p className="shrink-0 text-[13px] font-semibold text-white">
              {formatPrice(getPriceAmount(item.price, currency) * item.quantity, currency)}
            </p>
          </li>
        ))}
      </ul>
      {hidden > 0 ? <p className="px-4 pb-2 text-[12px] text-[#a69d98]">{t('jules.shop.more', { count: hidden })}</p> : null}
      <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-3 text-[13px]">
        <span className="text-[#a69d98]">{t('jules.shop.subtotal')}</span>
        <span className="font-semibold text-white">{formatPrice(subtotal, currency)}</span>
      </div>
      <BagLinks className="px-4 pb-4" />
    </section>
  )
}
