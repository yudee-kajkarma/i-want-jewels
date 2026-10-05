'use client'

import { useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight, ExternalLink, Package, Truck } from 'lucide-react'
import { Link } from '@/lib/router'
import { useCurrency } from '../../context/CurrencyContext'
import { formatPrice, isoToCurrencyCode, type Price } from '../../utils/price'
import type { ChatProduct } from '../../services/chatService'

/**
 * What the chat shows besides text: product cards in a sliding row, the
 * customer's orders, one order's status, and small forms (order lookup,
 * message to the team). Data comes from the shop's own APIs.
 */

export type ChatOrderSummary = {
  id: string
  orderNumber: string
  createdAt: string
  status: string
  total?: Price
  currency?: string
  itemCount: number
  image?: string
}

export type ChatOrderView = {
  orderNumber: string
  status: string
  createdAt: string
  items: Array<{ title: string; quantity: number; image?: string }>
  carrier?: string
  trackingNumber?: string
  trackingUrl?: string
  estimatedDelivery?: string
  deliveredAt?: string
  lastUpdate?: { at: string; text: string }
  /** Signed-in customers can open the full order page. */
  url?: string
}

const STEPS = ['CONFIRMED', 'SHIPPED', 'DELIVERED'] as const

function useDate() {
  const { i18n } = useTranslation()
  return (iso: string) => {
    try {
      return new Intl.DateTimeFormat(i18n.language, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
    } catch {
      return iso.slice(0, 10)
    }
  }
}

// ---------------------------------------------------------------------------
// Products: a sliding row of cards (swipe, or the arrows on larger screens)
// ---------------------------------------------------------------------------

export function ProductCarousel({ products }: { products: ChatProduct[] }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const { currency } = useCurrency()
  const rowRef = useRef<HTMLDivElement>(null)

  const slide = (direction: 1 | -1) => {
    const row = rowRef.current
    if (row) row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative mt-2 -mx-1">
      <div
        ref={rowRef}
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <Link
            key={p.slug}
            to={p.url}
            className="group w-[148px] shrink-0 snap-start overflow-hidden rounded-xl border border-[#eadfd4] bg-white transition hover:border-[#8f2a60]"
          >
            <div className="aspect-square w-full bg-[#faf6f3]">
              {p.image ? (
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-[1.03]" />
              ) : null}
            </div>
            <div className="px-2 py-1.5">
              <p className="line-clamp-2 text-[12px] font-medium leading-snug text-[#1f2732]">{p.title}</p>
              {p.price ? (
                <p className="mt-0.5 text-[12px] font-semibold text-[#8f2a60]">
                  {p.fixedPrice ? formatPrice(p.price, currency) : t('from', { price: formatPrice(p.price, currency) })}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
      {products.length > 2 ? (
        <>
          <button
            type="button"
            onClick={() => slide(-1)}
            aria-label={t('previous')}
            className="absolute left-0 top-[52px] hidden h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-[#eadfd4] bg-white text-[#8f2a60] shadow sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => slide(1)}
            aria-label={t('next')}
            className="absolute right-0 top-[52px] hidden h-7 w-7 translate-x-1/2 items-center justify-center rounded-full border border-[#eadfd4] bg-white text-[#8f2a60] shadow sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      ) : null}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

function StatusChip({ status }: { status: string }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools.status' })
  const tone =
    status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700'
      : status === 'SHIPPED' ? 'bg-sky-50 text-sky-700'
        : status === 'CANCELLED' || status === 'RETURNED' ? 'bg-zinc-100 text-zinc-600'
          : 'bg-amber-50 text-amber-700'
  return <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${tone}`}>{t(status, { defaultValue: status })}</span>
}

export function OrderList({ orders, onPick, disabled }: { orders: ChatOrderSummary[]; onPick: (order: ChatOrderSummary) => void; disabled?: boolean }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const { currency } = useCurrency()
  const date = useDate()

  return (
    <div className="mt-2 flex flex-col gap-1.5">
      {orders.map((o) => (
        <button
          key={o.id}
          type="button"
          disabled={disabled}
          onClick={() => onPick(o)}
          className="flex items-center gap-2.5 rounded-xl border border-[#eadfd4] bg-white p-2 text-left transition hover:border-[#8f2a60] disabled:opacity-60"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#faf6f3]">
            {o.image ? (
              <img src={o.image} alt="" className="h-full w-full object-cover" />
            ) : (
              <Package className="h-5 w-5 text-[#8a7f87]" />
            )}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-semibold text-[#1f2732]">{o.orderNumber}</span>
              <StatusChip status={o.status} />
            </span>
            <span className="mt-0.5 block text-[11.5px] text-[#6b5f68]">
              {t('orderedOn', { date: date(o.createdAt) })} · {t('items', { count: o.itemCount })}
              {o.total ? ` · ${formatPrice(o.total, isoToCurrencyCode(o.currency) ?? currency)}` : ''}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}

export function OrderStatusCard({ order }: { order: ChatOrderView }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const date = useDate()
  const reached = STEPS.indexOf(order.status as (typeof STEPS)[number])
  const stopped = order.status === 'CANCELLED' || order.status === 'RETURNED'

  return (
    <div className="mt-2 rounded-xl border border-[#eadfd4] bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-[#1f2732]">{order.orderNumber}</span>
        <StatusChip status={order.status} />
      </div>
      <p className="mt-0.5 text-[11.5px] text-[#6b5f68]">{t('orderedOn', { date: date(order.createdAt) })}</p>

      {!stopped ? (
        <ol className="mt-3 flex items-center gap-1" aria-label={t('progress')}>
          {STEPS.map((step, i) => (
            <li key={step} className="flex flex-1 flex-col items-center gap-1">
              <span className={`h-1.5 w-full rounded-full ${i <= reached ? 'bg-[#8f2a60]' : 'bg-[#eadfd4]'}`} />
              <span className={`text-[10.5px] ${i <= reached ? 'font-semibold text-[#8f2a60]' : 'text-[#8a7f87]'}`}>
                {t(`status.${step}`)}
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      <div className="mt-3 space-y-1 text-[12px] text-[#3b3340]">
        {order.deliveredAt ? <p>{t('deliveredOn', { date: date(order.deliveredAt) })}</p> : null}
        {!order.deliveredAt && order.estimatedDelivery ? <p>{t('expected', { date: date(order.estimatedDelivery) })}</p> : null}
        {order.carrier ? (
          <p className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-[#8a7f87]" />
            {t('carrier', { carrier: order.carrier === 'FEDEX' ? 'FedEx' : order.carrier })}
            {order.trackingNumber ? ` · ${order.trackingNumber}` : ''}
          </p>
        ) : !stopped && order.status !== 'DELIVERED' ? (
          <p className="text-[#6b5f68]">{t('notShippedYet')}</p>
        ) : null}
        {order.lastUpdate ? (
          <p className="text-[#6b5f68]">
            {t('lastUpdate')}: {order.lastUpdate.text} ({date(order.lastUpdate.at)})
          </p>
        ) : null}
      </div>

      {order.items.length ? (
        <ul className="mt-2.5 flex flex-col gap-1.5">
          {order.items.slice(0, 3).map((item, i) => (
            <li key={`${item.title}-${i}`} className="flex items-center gap-2 text-[12px] text-[#1f2732]">
              <span className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-[#faf6f3]">
                {item.image ? (
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </span>
              <span className="line-clamp-1">{item.quantity > 1 ? `${item.quantity} × ` : ''}{item.title}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {order.trackingUrl ? (
          <a
            href={order.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-[#8f2a60] px-3 py-1.5 text-[12px] font-medium text-white hover:bg-[#74224f]"
          >
            {t('trackParcel')} <ExternalLink className="h-3 w-3" />
          </a>
        ) : null}
        {order.url ? (
          <Link to={order.url} className="inline-flex items-center rounded-full border border-[#e3cfda] px-3 py-1.5 text-[12px] font-medium text-[#8f2a60] hover:bg-[#f6eff3]">
            {t('viewOrder')}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

const inputClass = 'w-full rounded-lg border border-[#e3cfda] px-2.5 py-2 text-[12.5px] outline-none focus:border-[#8f2a60]'
const submitClass = 'rounded-full bg-[#8f2a60] px-3.5 py-1.5 text-[12px] font-medium text-white transition hover:bg-[#74224f] disabled:opacity-50'

/** Guests: find an order by its number and the checkout email. */
export function OrderLookupForm({ initialNumber, onSubmit }: { initialNumber?: string; onSubmit: (orderNumber: string, email: string) => Promise<void> }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const [orderNumber, setOrderNumber] = useState(initialNumber ?? '')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!orderNumber.trim() || !email.includes('@') || sending) return
    setSending(true)
    try {
      await onSubmit(orderNumber.trim(), email.trim())
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-2 flex flex-col gap-1.5">
      <input className={inputClass} value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder={t('orderNumber')} aria-label={t('orderNumber')} maxLength={20} />
      <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} aria-label={t('email')} maxLength={200} />
      <div>
        <button type="submit" disabled={sending || !orderNumber.trim() || !email.includes('@')} className={submitClass}>{t('find')}</button>
      </div>
    </form>
  )
}

/** A message to the team: a ticket for account holders, the contact form for guests. */
export function MessageForm({ guest, onSubmit }: { guest: boolean; onSubmit: (input: { name: string; email: string; message: string }) => Promise<boolean> }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')

  const ready = message.trim().length >= 5 && (!guest || (name.trim() && email.includes('@')))

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!ready || state !== 'idle') return
    setState('sending')
    const ok = await onSubmit({ name: name.trim(), email: email.trim(), message: message.trim() })
    setState(ok ? 'sent' : 'idle')
  }

  if (state === 'sent') return null

  return (
    <form onSubmit={submit} className="mt-2 flex flex-col gap-1.5">
      {guest ? (
        <>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('name')} aria-label={t('name')} maxLength={100} />
          <input className={inputClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} aria-label={t('email')} maxLength={200} />
        </>
      ) : null}
      <textarea className={`${inputClass} min-h-[72px] resize-none`} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t('message')} aria-label={t('message')} maxLength={2000} />
      <div>
        <button type="submit" disabled={!ready || state === 'sending'} className={submitClass}>{t('sendMessage')}</button>
      </div>
    </form>
  )
}
