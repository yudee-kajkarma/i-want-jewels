'use client'

import { CircleCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { localSizeLabel } from '../shop'
import { cn } from '@/lib/utils'
import { useCurrency } from '../../../context/CurrencyContext'
import { formatPrice, getPriceAmount } from '../../../utils/price'
import type { LumiShopBlock } from '../contract'
import { CARD } from '../ui'
import { BagLinks, Thumb } from './ShopParts'

type AddedItem = Extract<LumiShopBlock, { type: 'cartAdded' }>['item']

/** After adding to the bag: what was added (colour, size, price) and the way on, View bag or Checkout. */
export function CartAddedBlock({ item }: { item: AddedItem }) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat.lumi.shop' })
  const { currency } = useCurrency()
  const quantity = Math.max(1, item.quantity || 1)
  const details = [item.variantTitle, item.sizeLabel && localSizeLabel(item.sizeLabel, i18n.language), quantity > 1 ? t('qty', { count: quantity }) : undefined].filter(Boolean).join(' · ')

  return (
    <div className={cn(CARD, 'p-3.5')}>
      <p className="flex items-center gap-2 text-[13px] font-medium text-[#f6f1ee]">
        <CircleCheck aria-hidden className="h-4 w-4 shrink-0 text-[#4ade80]" />
        {t('addedToBag')}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <Thumb src={item.image} sizes="56px" className="h-14 w-14" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-medium text-[#f6f1ee]">{item.title}</p>
          {details ? <p className="mt-0.5 truncate text-[12px] text-[#a69d98]">{details}</p> : null}
        </div>
        <p className="shrink-0 text-[13.5px] font-semibold text-white">{formatPrice(getPriceAmount(item.price, currency) * quantity, currency)}</p>
      </div>
      <BagLinks className="mt-3.5" />
    </div>
  )
}
