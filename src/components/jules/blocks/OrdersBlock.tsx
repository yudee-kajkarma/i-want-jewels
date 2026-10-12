'use client'

import { ArrowRight, ChevronRight, Package } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useCurrency } from '../../../context/CurrencyContext'
import { formatDate } from '../../../utils/formatDate'
import { formatPrice, isoToCurrencyCode } from '../../../utils/price'
import type { ChatOrderSummary, JulesLink } from '../contract'
import { CARD_BUTTON, FOCUS_RING } from '../ui'
import { Thumb } from './ShopParts'
import { SmartLink } from './SmartLink'
import { StatusChip } from './StatusChip'

/** "#IWJ1011", without doubling a "#" the number may already have. */
export const orderLabel = (orderNumber: string) => `#${orderNumber.replace(/^#/, '')}`

type OrdersBlockProps = {
  orders: ChatOrderSummary[]
  more?: JulesLink
  busy: boolean
  onPick: (orderId: string) => void
}

/** The customer's latest orders; tapping one shows its status and tracking. */
export function OrdersBlock({ orders, more, busy, onPick }: OrdersBlockProps) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const { currency } = useCurrency()

  return (
    <div className="flex flex-col gap-1.5">
      {orders.map((order) => (
        <button
          key={order.id}
          type="button"
          disabled={busy}
          onClick={() => onPick(order.id)}
          className={cn(CARD_BUTTON, FOCUS_RING, 'group flex w-full items-center gap-3 rounded-xl p-2.5 text-left')}
        >
          {order.image ? (
            <Thumb src={order.image} sizes="48px" className="h-12 w-12 rounded-lg" />
          ) : (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#282422]">
              <Package aria-hidden className="h-5 w-5 text-[#a69d98]" strokeWidth={1.8} />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="truncate text-[13px] font-semibold text-[#f6f1ee]">{orderLabel(order.orderNumber)}</span>
              <StatusChip status={order.status} />
            </span>
            <span className="mt-1 flex items-center justify-between gap-2 text-[11.5px] text-[#a69d98]">
              <span className="truncate">
                {formatDate(order.createdAt, i18n.language)} · {t('items', { count: order.itemCount })}
              </span>
              {order.total ? (
                <span className="shrink-0 font-semibold text-[#f6f1ee]">
                  {formatPrice(order.total, isoToCurrencyCode(order.currency) ?? currency)}
                </span>
              ) : null}
            </span>
          </span>
          <ChevronRight
            aria-hidden
            className="h-4 w-4 shrink-0 text-[#6f6763] transition-colors group-hover:text-[#a69d98] motion-reduce:transition-none"
          />
        </button>
      ))}
      {more ? (
        <SmartLink
          to={more.url}
          className={cn(
            FOCUS_RING,
            'mt-1 inline-flex items-center gap-1 self-start rounded-full px-1 text-[12.5px] font-medium text-[#f6f1ee] transition-colors hover:text-[#e6297e] motion-reduce:transition-none',
          )}
        >
          {more.title}
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </SmartLink>
      ) : null}
    </div>
  )
}
