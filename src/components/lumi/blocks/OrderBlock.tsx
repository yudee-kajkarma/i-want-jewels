'use client'

import { Check, ExternalLink, Truck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { formatDate } from '../../../utils/formatDate'
import type { ChatOrderView } from '../contract'
import { CARD, FOCUS_RING, OUTLINE_BUTTON, PRIMARY_BUTTON } from '../ui'
import { orderLabel } from './OrdersBlock'
import { Thumb } from './ShopParts'
import { SmartLink } from './SmartLink'
import { StatusChip } from './StatusChip'

const STEPS = ['CONFIRMED', 'SHIPPED', 'DELIVERED'] as const
/** Carriers as people write them. */
const CARRIERS: Record<string, string> = { FEDEX: 'FedEx', DHL: 'DHL', UPS: 'UPS' }
const ITEMS_SHOWN = 3

/**
 * One order's status: Confirmed → Shipped → Delivered with the steps reached
 * filled in, the carrier and tracking link, dates, the latest update and the items.
 */
export function OrderBlock({ order }: { order: ChatOrderView }) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const date = (iso: string) => formatDate(iso, i18n.language)
  const reached = STEPS.indexOf(order.status as (typeof STEPS)[number])
  const stopped = order.status === 'CANCELLED' || order.status === 'RETURNED'
  const carrier = order.carrier ? (CARRIERS[order.carrier.toUpperCase()] ?? order.carrier) : undefined
  const hidden = order.items.length - ITEMS_SHOWN

  return (
    <div className={cn(CARD, 'p-4')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[14px] font-semibold text-[#f6f1ee]">{orderLabel(order.orderNumber)}</p>
          <p className="mt-0.5 text-[11.5px] text-[#a69d98]">{t('orderedOn', { date: date(order.createdAt) })}</p>
        </div>
        <StatusChip status={order.status} />
      </div>

      {!stopped ? (
        <ol aria-label={t('progress')} className="mt-4 grid grid-cols-3">
          {STEPS.map((step, i) => {
            const done = i <= reached
            const current = i === reached
            return (
              <li key={step} aria-current={current ? 'step' : undefined} className="relative flex flex-col items-center gap-1.5 text-center">
                {i > 0 ? (
                  <span aria-hidden className={cn('absolute right-1/2 top-[7px] h-[2px] w-full rounded-full', done ? 'bg-[#f6f1ee]/70' : 'bg-white/[0.1]')} />
                ) : null}
                <span
                  className={cn(
                    'relative flex h-4 w-4 items-center justify-center rounded-full',
                    done ? 'bg-[#f6f1ee]' : 'border-2 border-white/[0.14] bg-[#1e1a19]',
                    current && 'ring-4 ring-white/[0.1]',
                  )}
                >
                  {done && !current ? <Check aria-hidden className="h-2.5 w-2.5 text-[#141110]" strokeWidth={3} /> : null}
                </span>
                <span className={cn('text-[11px] leading-tight', done ? 'font-medium text-[#f6f1ee]' : 'text-[#a69d98]')}>{t(`status.${step}`)}</span>
              </li>
            )
          })}
        </ol>
      ) : null}

      <div className="mt-4 space-y-1.5 text-[12.5px] leading-relaxed text-[#f6f1ee]">
        {order.deliveredAt ? <p>{t('deliveredOn', { date: date(order.deliveredAt) })}</p> : null}
        {!order.deliveredAt && order.estimatedDelivery ? <p>{t('expected', { date: date(order.estimatedDelivery) })}</p> : null}
        {carrier ? (
          <p className="flex items-center gap-1.5">
            <Truck aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#a69d98]" />
            <span className="min-w-0 break-words">
              {t('carrier', { carrier })}
              {order.trackingNumber ? ` · ${order.trackingNumber}` : ''}
            </span>
          </p>
        ) : !stopped && order.status !== 'DELIVERED' ? (
          <p className="text-[#a69d98]">{t('notShippedYet')}</p>
        ) : null}
        {order.lastUpdate ? (
          <p className="text-[#a69d98]">
            <span className="font-medium text-[#f6f1ee]">{t('lastUpdate')}:</span> {order.lastUpdate.text} ({date(order.lastUpdate.at)})
          </p>
        ) : null}
      </div>

      {order.items.length ? (
        <ul className="mt-3 flex flex-col gap-1.5 border-t border-white/[0.08] pt-3">
          {order.items.slice(0, ITEMS_SHOWN).map((item, i) => (
            <li key={`${i}-${item.title}`} className="flex items-center gap-2.5 text-[12.5px] text-[#f6f1ee]">
              {item.image ? (
                <Thumb src={item.image} sizes="36px" className="h-9 w-9 rounded-lg" />
              ) : (
                <span aria-hidden className="h-9 w-9 shrink-0 rounded-lg bg-[#282422]" />
              )}
              <span className="line-clamp-1 min-w-0">
                {item.quantity > 1 ? `${item.quantity} × ` : ''}
                {item.title}
              </span>
            </li>
          ))}
          {hidden > 0 ? <li className="pl-[46px] text-[11.5px] text-[#a69d98]">+{hidden}</li> : null}
        </ul>
      ) : null}

      {order.trackingUrl || order.url ? (
        <div className="mt-3.5 flex flex-wrap gap-2">
          {order.trackingUrl ? (
            <SmartLink to={order.trackingUrl} className={cn(PRIMARY_BUTTON, FOCUS_RING, 'px-3.5 py-2 text-[12.5px]')}>
              {t('trackParcel')}
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
            </SmartLink>
          ) : null}
          {order.url ? (
            <SmartLink to={order.url} className={cn(OUTLINE_BUTTON, FOCUS_RING, 'px-3.5 py-2 text-[12.5px]')}>
              {t('viewOrder')}
            </SmartLink>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
