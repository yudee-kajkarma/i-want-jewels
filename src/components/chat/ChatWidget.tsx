'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { MessageCircle, RotateCcw, Send, X } from 'lucide-react'
import { Link } from '@/lib/router'
import { useAuth } from '../../context/AuthContext'
import { lookupGuestOrder, needsBotCheck, sendChatMessage, type ChatAction, type ChatLink, type ChatProduct, type ChatTurn } from '../../services/chatService'
import { getOrderById, getOrders } from '../../services/orderService'
import { createTicket } from '../../services/ticketService'
import { sendContactMessage } from '../../services/contactService'
import { getProducts } from '../../services/productService'
import { getMyGiftCards } from '../../services/giftCardService'
import { getVariantImage } from '../../utils/productUtils'
import type { Order } from '../../types/order'
import {
  MessageForm,
  OrderList,
  OrderLookupForm,
  OrderStatusCard,
  ProductCarousel,
  type ChatOrderSummary,
  type ChatOrderView,
} from './ChatCards'

/**
 * The I Want Jewels chat helper: a round button in the corner that opens a
 * small chat. Quick buttons answer the common questions right here; "Track my
 * order" and "Talk to a person" open the customer's orders or a message form
 * inside the chat, using the shop's own APIs. Typed questions go to
 * POST /api/chat, which answers from the shop's guides and FAQ, shows products
 * as cards and can open those same tools. Visitors without an account pass
 * Cloudflare's invisible bot check before their first typed question.
 */

type Message = {
  id: number
  from: 'bot' | 'you'
  text: string
  links?: ChatLink[]
  products?: ChatProduct[]
  orders?: ChatOrderSummary[]
  order?: ChatOrderView
  form?: { type: 'lookup'; orderNumber?: string } | { type: 'message' }
}

/** Most recent orders shown in the chat; the full list is under My orders. */
const ORDERS_SHOWN = 5

const byNewest = (a: Order, b: Order) => +new Date(b.createdAt) - +new Date(a.createdAt)
const sameOrderNumber = (a: string, b: string) => a.replace(/[^0-9]/g, '') === b.replace(/[^0-9]/g, '')

function toSummary(o: Order): ChatOrderSummary {
  return {
    id: o.id,
    orderNumber: o.orderNumber,
    createdAt: o.createdAt,
    status: o.orderStatus,
    total: o.payableAmount ?? o.totalAmount,
    currency: o.currency,
    itemCount: o.totalItems,
    image: o.items[0]?.thumbnail,
  }
}

function toView(o: Order): ChatOrderView {
  return {
    orderNumber: o.orderNumber,
    status: o.orderStatus,
    createdAt: o.createdAt,
    items: o.items.map((i) => ({ title: i.title, quantity: i.quantity, image: i.thumbnail })),
    carrier: o.shippingCarrier ?? undefined,
    trackingNumber: o.trackingNumber ?? undefined,
    trackingUrl: o.trackingUrl && /^https?:\/\//i.test(o.trackingUrl) ? o.trackingUrl : undefined,
    deliveredAt: o.deliveredAt ?? undefined,
    url: `/orders/${o.id}`,
  }
}

type QuickId = 'track' | 'shipping' | 'size' | 'care' | 'gifts' | 'person'
const QUICK_IDS: QuickId[] = ['track', 'shipping', 'size', 'care', 'gifts', 'person']

/** The welcome greeting: small at the icon → grown in → shrinking back → gone. */
type TeaserPhase = 'off' | 'mount' | 'in' | 'out'

/** Shown once per visit (browser tab session), not on every page change. */
const TEASER_KEY = 'iwj-chat-greeted'
const TEASER_DELAY_MS = 100
const TEASER_HOLD_MS = 8000
const TYPE_MS_PER_CHAR = 28
/** The question box grows with the text up to this many lines, then scrolls. */
const INPUT_MAX_LINES = 4

const LOCALES = ['en', 'de', 'nl', 'fr', 'it', 'es']
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`)
    const script = existing ?? document.createElement('script')
    script.addEventListener('load', () => resolve(), { once: true })
    script.addEventListener('error', () => reject(new Error('Bot check failed to load')), { once: true })
    if (!existing) {
      script.src = TURNSTILE_SRC
      script.async = true
      document.head.appendChild(script)
    }
  })
}

export default function ChatWidget() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat' })
  const pathname = usePathname() ?? ''
  const { isAuthenticated } = useAuth()

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [teaser, setTeaser] = useState<TeaserPhase>('off')
  const [typed, setTyped] = useState('')
  const teaserHovered = useRef(false)
  /** The 8-second wait before the greeting closes (paused while hovered). */
  const holdTimer = useRef<number | undefined>(undefined)
  /** The short shrink animation before the greeting is removed. Kept separate so clearing the hold never cancels it. */
  const removeTimer = useRef<number | undefined>(undefined)
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Bot check (visitors only)
  const botBoxRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const botToken = useRef<string | undefined>(undefined)

  const locale = LOCALES.includes(i18n.language) ? i18n.language : 'en'
  const hidden = /\/admin(\/|$)/.test(pathname)
  const teaserText = t('teaser')

  const closeTeaser = useCallback(() => {
    window.clearTimeout(holdTimer.current)
    window.clearTimeout(removeTimer.current)
    setTeaser((phase) => (phase === 'off' ? 'off' : 'out'))
    removeTimer.current = window.setTimeout(() => setTeaser('off'), 320)
  }, [])

  // Welcome greeting: once per visit, a moment after the visitor arrives.
  useEffect(() => {
    if (hidden) return
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return
    } catch {
      return // storage blocked: skip the greeting rather than repeat it on every page
    }
    const start = window.setTimeout(() => {
      try { sessionStorage.setItem(TEASER_KEY, '1') } catch { /* ignore */ }
      setTeaser('mount')
      // Render small at the icon first, then grow on the next frame.
      requestAnimationFrame(() => requestAnimationFrame(() => setTeaser('in')))
    }, TEASER_DELAY_MS)
    return () => window.clearTimeout(start)
  }, [hidden])

  // Type the greeting out letter by letter (all at once when motion is reduced).
  useEffect(() => {
    if (teaser !== 'in') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(teaserText)
      return
    }
    setTyped('')
    // Whole characters, so an emoji (two UTF-16 units) is never shown half-typed.
    const letters = Array.from(teaserText)
    let count = 0
    const id = window.setInterval(() => {
      count += 1
      setTyped(letters.slice(0, count).join(''))
      if (count >= letters.length) window.clearInterval(id)
    }, TYPE_MS_PER_CHAR)
    return () => window.clearInterval(id)
  }, [teaser, teaserText])

  // Once fully typed, wait a few seconds, then shrink back into the icon (not while hovered).
  useEffect(() => {
    if (teaser !== 'in' || typed.length < teaserText.length) return
    holdTimer.current = window.setTimeout(() => {
      if (!teaserHovered.current) closeTeaser()
    }, TEASER_HOLD_MS)
    return () => window.clearTimeout(holdTimer.current)
  }, [teaser, typed, teaserText, closeTeaser])

  function openChat() {
    window.clearTimeout(holdTimer.current)
    window.clearTimeout(removeTimer.current)
    setTeaser('off')
    setOpen(true)
  }

  const add = useCallback((message: Omit<Message, 'id'>) => {
    setMessages((current) => [...current, { ...message, id: nextId.current++ }])
  }, [])

  // Greet once, the first time the chat opens.
  useEffect(() => {
    if (open && messages.length === 0) add({ from: 'bot', text: t('welcome') })
  }, [open, messages.length, add, t])

  // Grow the question box with its text (up to INPUT_MAX_LINES), then scroll inside it.
  useEffect(() => {
    const box = inputRef.current
    if (!box) return
    const style = window.getComputedStyle(box)
    const line = parseFloat(style.lineHeight) || 20
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
    const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)
    const max = line * INPUT_MAX_LINES + padding + border
    box.style.height = 'auto'
    box.style.height = `${Math.min(box.scrollHeight + border, max)}px`
    box.style.overflowY = box.scrollHeight + border > max ? 'auto' : 'hidden'
  }, [input, open])

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  // Prepare the invisible bot check when a visitor opens the chat.
  useEffect(() => {
    if (!open || !SITE_KEY || !needsBotCheck(isAuthenticated) || widgetId.current) return
    let cancelled = false
    loadTurnstile()
      .then(() => {
        if (cancelled || !botBoxRef.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(botBoxRef.current, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          callback: (token: string) => { botToken.current = token },
          'expired-callback': () => { botToken.current = undefined },
        })
      })
      .catch(() => { /* the backend refuses without a token; the chat then offers "Talk to a person" */ })
    return () => { cancelled = true }
  }, [open, isAuthenticated])

  // Close with Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function waitForBotToken(): Promise<string | undefined> {
    for (let i = 0; i < 30 && !botToken.current; i++) await new Promise((r) => setTimeout(r, 200))
    return botToken.current
  }

  /** Visitors need a bot-check token for the backend; account holders don't. */
  async function botCheckToken(): Promise<{ ok: boolean; token?: string }> {
    if (!SITE_KEY || !needsBotCheck(isAuthenticated)) return { ok: true }
    const token = await waitForBotToken()
    return token ? { ok: true, token } : { ok: false }
  }

  /** A bot-check token works once; get a fresh one in case it's needed again. */
  function refreshBotToken(token?: string) {
    if (token && widgetId.current && window.turnstile) {
      botToken.current = undefined
      window.turnstile.reset(widgetId.current)
    }
  }

  // --- Tools: orders and messages, straight from the shop's own APIs -------

  async function withBusy(work: () => Promise<void>) {
    setBusy(true)
    try {
      await work()
    } finally {
      setBusy(false)
    }
  }

  async function showMyOrders() {
    try {
      const { orders } = await getOrders()
      const latest = [...orders].sort(byNewest).slice(0, ORDERS_SHOWN)
      if (!latest.length) {
        add({ from: 'bot', text: t('tools.noOrders'), links: [{ title: t('tools.shopNow'), url: '/products' }] })
        return
      }
      add({
        from: 'bot',
        text: t('tools.yourOrders'),
        orders: latest.map(toSummary),
        links: orders.length > ORDERS_SHOWN ? [{ title: t('tools.allOrders'), url: '/orders' }] : undefined,
      })
    } catch {
      add({ from: 'bot', text: t('tools.ordersFailed'), links: [{ title: t('tools.allOrders'), url: '/orders' }] })
    }
  }

  async function showOrder(orderId: string) {
    try {
      add({ from: 'bot', text: '', order: toView(await getOrderById(orderId)) })
    } catch {
      add({ from: 'bot', text: t('tools.ordersFailed'), links: [{ title: t('tools.allOrders'), url: '/orders' }] })
    }
  }

  async function showOrderByNumber(orderNumber: string) {
    try {
      const { orders } = await getOrders()
      const match = orders.find((o) => sameOrderNumber(o.orderNumber, orderNumber))
      if (match) await showOrder(match.id)
      else {
        add({ from: 'bot', text: t('tools.orderNotYours') })
        await showMyOrders()
      }
    } catch {
      add({ from: 'bot', text: t('tools.ordersFailed'), links: [{ title: t('tools.allOrders'), url: '/orders' }] })
    }
  }

  function askForLookup(orderNumber?: string) {
    add({ from: 'bot', text: t('tools.lookupIntro'), form: { type: 'lookup', orderNumber } })
  }

  async function lookup(orderNumber: string, email: string) {
    const check = await botCheckToken()
    if (!check.ok) {
      add({ from: 'bot', text: t('botCheck'), links: [{ title: t('quick.person.link'), url: '/contact' }] })
      return
    }
    const result = await lookupGuestOrder({ orderNumber, email, botToken: check.token })
    refreshBotToken(check.token)
    if (result.kind === 'found') add({ from: 'bot', text: '', order: result.order })
    else if (result.kind === 'notFound') add({ from: 'bot', text: t('tools.orderNotFound') })
    else if (result.kind === 'botCheck') add({ from: 'bot', text: t('botCheck'), links: [{ title: t('quick.person.link'), url: '/contact' }] })
    else add({ from: 'bot', text: t('unavailable'), links: [{ title: t('quick.person.link'), url: '/contact' }] })
  }

  function askForMessage() {
    add({ from: 'bot', text: isAuthenticated ? t('tools.personIntroAccount') : t('tools.personIntro'), form: { type: 'message' } })
  }

  async function sendToTeam(input: { name: string; email: string; message: string }): Promise<boolean> {
    try {
      if (isAuthenticated) {
        const ticket = await createTicket({
          subject: `Chat: ${input.message.slice(0, 60)}`,
          category: 'general',
          priority: 'medium',
          message: input.message,
        })
        add({ from: 'bot', text: t('tools.ticketSent', { id: ticket?.ticketId ?? '' }), links: [{ title: t('tools.myTickets'), url: '/tickets' }] })
      } else {
        await sendContactMessage(input)
        add({ from: 'bot', text: t('tools.sent') })
      }
      return true
    } catch {
      add({ from: 'bot', text: t('tools.sendFailed'), links: [{ title: t('quick.person.link'), url: '/contact' }] })
      return false
    }
  }

  /** The gift cards we sell (as on the Gift cards page), plus the customer's own balances. */
  async function showGiftCards() {
    try {
      const { products } = await getProducts({ productType: 'GIFT_CARD', limit: 12 })
      const cards: ChatProduct[] = products
        .filter((p) => p.availability !== false && p.variants.length)
        .sort((a, b) => a.minPrice.eur - b.minPrice.eur)
        .map((p) => ({
          slug: p.slug,
          title: p.variants[0].title || p.title,
          image: getVariantImage(p.variants[0]),
          price: p.minPrice,
          fixedPrice: true,
          url: `/products/${p.slug}`,
        }))
      add({
        from: 'bot',
        text: t('tools.giftCardsIntro'),
        products: cards,
        links: [{ title: t('tools.allGiftCards'), url: '/gift-cards' }],
      })
    } catch {
      add({ from: 'bot', text: t('tools.giftCardsIntro'), links: [{ title: t('tools.allGiftCards'), url: '/gift-cards' }] })
    }

    if (!isAuthenticated) return
    try {
      const mine = (await getMyGiftCards()).filter((c) => c.status === 'ACTIVE' && c.balance > 0)
      if (!mine.length) return
      const money = (amount: number, iso: string) => {
        try {
          return new Intl.NumberFormat(i18n.language, { style: 'currency', currency: iso || 'EUR' }).format(amount)
        } catch {
          return `${amount} ${iso}`
        }
      }
      const lines = mine.map((c) => `• ${t('tools.myGiftCard', { code: `…${c.code.slice(-4)}`, balance: money(c.balance, c.currency) })}`)
      add({ from: 'bot', text: `${t('tools.myGiftCardsIntro')}\n${lines.join('\n')}`, links: [{ title: t('tools.myGiftCards'), url: '/account/gift-cards' }] })
    } catch {
      /* the gift cards above are still shown */
    }
  }

  /** What the assistant asked to open: the orders, one order, or a message form. */
  async function runAction(action: ChatAction) {
    if (action.type === 'talk_to_person') askForMessage()
    else if (!isAuthenticated) askForLookup(action.orderNumber)
    else if (action.type === 'order_status' && action.orderNumber) await showOrderByNumber(action.orderNumber)
    else await showMyOrders()
  }

  /** Clears the conversation; the welcome message and all quick buttons come back. */
  function newChat() {
    if (busy) return
    setMessages([])
    setInput('')
    nextId.current = 1
    inputRef.current?.focus()
  }

  function quick(id: QuickId) {
    if (id === 'track' || id === 'person' || id === 'gifts') {
      add({ from: 'you', text: t(`quick.${id}.label`) })
      if (id === 'gifts') void withBusy(showGiftCards)
      else if (id === 'person') askForMessage()
      else if (isAuthenticated) void withBusy(showMyOrders)
      else askForLookup()
      return
    }
    const to: Record<typeof id, string> = {
      shipping: '/faq',
      size: '/resources',
      care: '/resources/jewellery-care-guides',
    }
    add({ from: 'you', text: t(`quick.${id}.label`) })
    add({ from: 'bot', text: t(`quick.${id}.answer`), links: [{ title: t(`quick.${id}.link`), url: to[id] }] })
  }

  async function send(event?: FormEvent) {
    event?.preventDefault()
    const text = input.trim()
    if (!text || busy) return

    const history: ChatTurn[] = messages
      .filter((m) => m.id !== 1 && m.text) // the greeting and cards-only messages aren't part of the conversation
      .map((m) => ({ role: m.from === 'you' ? 'user' : 'assistant', content: m.text }))

    setInput('')
    add({ from: 'you', text })
    setBusy(true)
    try {
      const check = await botCheckToken()
      if (!check.ok) {
        add({ from: 'bot', text: t('botCheck'), links: [{ title: t('quick.person.link'), url: '/contact' }] })
        return
      }

      const reply = await sendChatMessage({ message: text, locale, history, botToken: check.token })
      refreshBotToken(check.token)

      if (reply.kind === 'answer' && reply.action) {
        await runAction(reply.action)
      } else if (reply.kind === 'answer') {
        // The product cards show the listed products, so the text keeps only its opening line.
        const lines = reply.answer.split('\n')
        const listLines = lines.filter((l) => /^[ \t]*[*•-][ \t]+/.test(l))
        const text = reply.products.length && listLines.length <= reply.products.length
          ? lines.filter((l) => !listLines.includes(l)).join('\n').trim()
          : reply.answer.replace(/^[ \t]*[*-][ \t]+/gm, '• ')
        add({ from: 'bot', text: text.replace(/\*\*(.+?)\*\*/g, '$1'), links: reply.links, products: reply.products })
      } else if (reply.kind === 'limit') {
        add({
          from: 'bot',
          text: reply.tier === 'visitor' ? t('limitVisitor') : t('limitAccount'),
          links: reply.tier === 'visitor'
            ? [{ title: t('logIn'), url: '/login' }, { title: t('quick.person.link'), url: '/contact' }]
            : [{ title: t('quick.person.link'), url: '/contact' }],
        })
      } else if (reply.kind === 'botCheck') {
        add({ from: 'bot', text: t('botCheck'), links: [{ title: t('quick.person.link'), url: '/contact' }] })
      } else {
        add({ from: 'bot', text: t('unavailable'), links: [{ title: t('quick.person.link'), url: '/contact' }] })
      }
    } finally {
      setBusy(false)
      inputRef.current?.focus()
    }
  }

  if (hidden) return null

  const showQuick = messages.length <= 1

  return (
    <>
      {open ? (
        <section
          role="dialog"
          aria-label={t('title')}
          className="fixed right-4 bottom-[152px] z-50 flex h-[min(680px,calc(100dvh-176px))] w-[calc(100vw-2rem)] max-w-[420px] flex-col md:h-[min(680px,calc(100dvh-128px))] overflow-hidden rounded-2xl border border-[#eadfd4] bg-white font-poppins shadow-[0_24px_60px_rgba(31,22,17,0.22)] md:bottom-24"
        >
          <header className="flex items-start justify-between gap-3 bg-[#1f2732] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">{t('title')}</p>
              <p className="text-[11px] text-white/70">{t('subtitle')}</p>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 1 ? (
                <button
                  type="button"
                  onClick={newChat}
                  disabled={busy}
                  className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-medium text-white/85 transition hover:bg-white/10 hover:text-white disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t('newChat')}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('close')}
                className="rounded-full p-1 text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={m.from === 'you' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={`${m.products?.length || m.orders || m.order || m.form ? 'w-full' : 'max-w-[85%]'} whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                    m.from === 'you' ? 'rounded-br-md bg-[#8f2a60] text-white' : 'rounded-bl-md bg-[#f6eff3] text-[#1f2732]'
                  }`}
                >
                  {m.text}
                  {m.products?.length ? <ProductCarousel products={m.products} /> : null}
                  {m.orders ? (
                    <OrderList orders={m.orders} disabled={busy} onPick={(o) => void withBusy(() => showOrder(o.id))} />
                  ) : null}
                  {m.order ? <OrderStatusCard order={m.order} /> : null}
                  {m.form?.type === 'lookup' ? (
                    <OrderLookupForm initialNumber={m.form.orderNumber} onSubmit={(n, e) => withBusy(() => lookup(n, e))} />
                  ) : null}
                  {m.form?.type === 'message' ? <MessageForm guest={!isAuthenticated} onSubmit={sendToTeam} /> : null}
                  {m.links?.length ? (
                    <div className="mt-2 flex flex-col gap-1">
                      {m.links.map((link) => (
                        <Link
                          key={link.url + link.title}
                          to={link.url}
                          className="text-[12.5px] font-medium text-[#8f2a60] underline underline-offset-2"
                        >
                          {link.title} →
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}

            {showQuick ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => quick(id)}
                    className="rounded-full border border-[#e3cfda] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#8f2a60] transition hover:bg-[#f6eff3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f2a60]"
                  >
                    {t(`quick.${id}.label`)}
                  </button>
                ))}
              </div>
            ) : null}

            {busy ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-[#f6eff3] px-3.5 py-2.5 text-[13px] text-[#6b5f68]">{t('thinking')}</div>
              </div>
            ) : null}
          </div>

          <form onSubmit={send} className="border-t border-[#eadfd4] px-3 pb-2 pt-2.5">
            <div ref={botBoxRef} />
            {!showQuick ? (
              <div
                role="group"
                aria-label={t('quickOptions')}
                className="-mx-3 mb-2 flex gap-1.5 overflow-x-auto px-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {QUICK_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    disabled={busy}
                    onClick={() => quick(id)}
                    className="shrink-0 rounded-full border border-[#e3cfda] bg-white px-2.5 py-1 text-[11.5px] font-medium text-[#8f2a60] transition hover:bg-[#f6eff3] disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f2a60]"
                  >
                    {t(`quick.${id}.label`)}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="flex items-end gap-2">
              <label htmlFor="iwj-chat-input" className="sr-only">{t('placeholder')}</label>
              <textarea
                id="iwj-chat-input"
                ref={inputRef}
                rows={1}
                maxLength={300}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void send()
                  }
                }}
                placeholder={t('placeholder')}
                className="min-h-[42px] flex-1 resize-none rounded-xl border border-[#e3cfda] px-3 py-2.5 text-[13.5px] leading-5 outline-none focus:border-[#8f2a60]"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={t('send')}
                className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#8f2a60] text-white transition hover:bg-[#74224f] disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-[10.5px] text-[#8a7f87]">{t('privacy')}</p>
          </form>
        </section>
      ) : null}

      {teaser !== 'off' && !open ? (
        <div
          role="status"
          onMouseEnter={() => { teaserHovered.current = true; window.clearTimeout(holdTimer.current) }}
          onMouseLeave={() => {
            teaserHovered.current = false
            if (typed.length >= teaserText.length) holdTimer.current = window.setTimeout(closeTeaser, 1500)
          }}
          style={{
            opacity: teaser === 'in' ? 1 : 0,
            transform: teaser === 'in' ? 'scale(1) translateY(0)' : 'scale(0.35) translateY(28px)',
            pointerEvents: teaser === 'in' ? 'auto' : 'none',
          }}
          className="fixed right-4 bottom-[152px] z-50 w-[min(300px,calc(100vw-2rem))] origin-bottom-right font-poppins transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none md:bottom-24"
        >
          <div className="relative rounded-2xl rounded-br-md border border-[#eadfd4] bg-white p-4 shadow-[0_20px_50px_rgba(31,22,17,0.2)]">
            <button
              type="button"
              onClick={closeTeaser}
              aria-label={t('close')}
              className="absolute right-2 top-2 rounded-full p-1 text-[#8a7f87] transition hover:bg-[#f6eff3] hover:text-[#1f2732] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8f2a60]"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2.5 pr-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8f2a60] text-white">
                <MessageCircle className="h-4 w-4" />
              </span>
              <p className="text-[13px] font-semibold text-[#1f2732]">{t('title')}</p>
            </div>
            <p className="mt-2.5 min-h-[3.6em] text-[13.5px] leading-relaxed text-[#3b3340]">
              {typed}
              {typed.length < teaserText.length ? (
                <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[#8f2a60]" />
              ) : null}
            </p>
            <button
              type="button"
              onClick={openChat}
              className="mt-3 rounded-full bg-[#8f2a60] px-3.5 py-1.5 text-[12.5px] font-medium text-white transition hover:bg-[#74224f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f2a60]"
            >
              {t('teaserCta')}
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? t('close') : t('open')}
        aria-expanded={open}
        className="fixed right-4 bottom-[84px] z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#8f2a60] text-white shadow-[0_12px_30px_rgba(143,42,96,0.4)] transition hover:bg-[#74224f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f2a60] md:bottom-6"
      >
        {teaser === 'in' && !open ? (
          <span aria-hidden className="absolute inset-0 rounded-full bg-[#8f2a60]/40 motion-safe:animate-ping" />
        ) : null}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </button>
    </>
  )
}
