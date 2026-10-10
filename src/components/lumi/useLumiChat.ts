'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useStore } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { useCurrency } from '../../context/CurrencyContext'
import { useNavigate } from '../../lib/router'
import {
  httpStatus,
  isReplyId,
  needsBotCheck,
  sendChatMessage,
  sendFeedback as postFeedback,
  toChatTurns,
  type ChatPageContext,
} from '../../services/chatService'
import { fit, newLumiId } from '../../services/lumiHistoryService'
import { getOrderById, getOrders } from '../../services/orderService'
import { createTicket } from '../../services/ticketService'
import { sendContactMessage } from '../../services/contactService'
import { getProductBySlug, getProducts } from '../../services/productService'
import { getMyGiftCards, type MyGiftCard } from '../../services/giftCardService'
import { addToCart, fetchCart } from '../../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import type { RootState } from '../../store/store'
import { addToWishlist, fetchWishlist, removeWishlistItem } from '../../store/wishlistSlice'
import type { CartItem } from '../../types/cart'
import type { Order } from '../../types/order'
import type { Product, ProductDetail } from '../../types/product'
import type { WishlistItem } from '../../types/wishlist'
import { setSingleCheckoutDraft } from '../../utils/checkoutStorage'
import { getGuestCartId } from '../../utils/guestCart'
import { formatPrice } from '../../utils/price'
import { getVariantImage } from '../../utils/productUtils'
import {
  LUMI_MAX_QUESTION,
  type ChatOrderSummary,
  type ChatOrderView,
  type GiftAnswers,
  type LumiAction,
  type LumiActionType,
  type LumiBagSelection,
  type LumiBlock,
  type LumiChatApi,
  type LumiContextQuestion,
  type LumiLink,
  type LumiLocale,
  type LumiMessage,
  type LumiPageContext,
  type LumiProductCard,
  type LumiQuickAction,
  type LumiReply,
} from './contract'
import {
  LAST_GIFT_STEP,
  bagItemKey,
  budgetCurrency,
  bagQuantity,
  checkoutDraft,
  giftIntent,
  giftStep,
  giftSummary,
  isCompleteGift,
  isProductSlug,
  mergeGiftAnswers,
  pageContextOf,
  productSlugFromPath,
  toLumiProduct,
  type LumiIntent,
  type ProductWords,
} from './shop'
import { findLumiSuggestion } from './suggestions'
import { useLumiHistory } from './useLumiHistory'

/**
 * Lumi's chat controller (LumiChatApi): everything the chat does except
 * drawing it. Typed and library questions go to POST /api/chat; orders, gift
 * cards and "talk to a person" are answered by the website from the shop's
 * own APIs, never by the AI. Shopping happens through the shop's own store,
 * exactly as on the product page: the bag (guests too), "Buy now", the
 * wishlist (accounts only). Products, prices, sizes and stock always come
 * from the shop's data. Every message goes through the history, so chats are
 * kept (on the device or the account), and an answer always lands in the chat
 * it was asked in, even if the visitor has opened another since.
 *
 * There is no typing indicator: the visitor's message shows "Sent" until
 * Lumi adds anything after it, then "Seen" (see useLumiHistory).
 *
 * Visitors without an account pass Cloudflare's invisible bot check
 * (Turnstile) before their first question; the backend then gives them a
 * pass for the rest of the visit.
 */

// ---------------------------------------------------------------------------
// Bot check (Cloudflare Turnstile)
// ---------------------------------------------------------------------------

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
/** How long a question waits for the bot check before giving up. */
const TOKEN_WAIT_MS = 6000
const TOKEN_POLL_MS = 200
const SCRIPT_TIMEOUT_MS = 15_000

type Turnstile = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string | undefined
  reset: (widgetId?: string) => void
  remove: (widgetId?: string) => void
}

const turnstile = () => (window as Window & { turnstile?: Turnstile }).turnstile

let turnstileLoading: Promise<void> | undefined

/** Loads Cloudflare's script once per page; after a failed load, the next question tries again. */
function loadTurnstile(): Promise<void> {
  if (turnstile()) return Promise.resolve()
  turnstileLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`) ?? document.createElement('script')
    const fail = () => {
      script.remove() // a fresh tag is added on the next try
      reject(new Error('The bot check could not load'))
    }
    const timer = window.setTimeout(() => (turnstile() ? resolve() : fail()), SCRIPT_TIMEOUT_MS)
    script.addEventListener('load', () => {
      window.clearTimeout(timer)
      if (turnstile()) resolve()
      else fail()
    }, { once: true })
    script.addEventListener('error', () => {
      window.clearTimeout(timer)
      fail()
    }, { once: true })
    if (!script.src) {
      script.src = TURNSTILE_SRC
      script.async = true
      document.head.appendChild(script)
    }
  }).catch((error: unknown) => {
    turnstileLoading = undefined
    throw error
  })
  return turnstileLoading
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// ---------------------------------------------------------------------------
// Products, loaded by slug
// ---------------------------------------------------------------------------

/**
 * A product loaded by slug is kept for a minute: the page's name, "Add" and
 * "Buy now" usually need the same one within moments, and stock stays fresh.
 */
const PRODUCT_TTL_MS = 60_000

type LoadedProduct = { at: number; loading: Promise<ProductDetail | null>; product?: ProductDetail | null }

const loadedProducts = new Map<string, LoadedProduct>()

/** One product in the visitor's language; null when the shop doesn't have it. Throws when it can't be loaded (and tries again next time). */
function loadProduct(slug: string, locale: LumiLocale): Promise<ProductDetail | null> {
  const key = `${locale}:${slug}`
  const now = Date.now()
  const known = loadedProducts.get(key)
  if (known && now - known.at < PRODUCT_TTL_MS) return known.loading
  for (const [oldKey, old] of loadedProducts) {
    if (now - old.at >= PRODUCT_TTL_MS) loadedProducts.delete(oldKey)
  }
  const entry: LoadedProduct = {
    at: now,
    loading: getProductBySlug(slug, locale).then(
      (product) => {
        entry.product = product
        return product
      },
      (error: unknown) => {
        if (httpStatus(error) === 404) {
          entry.product = null
          return null
        }
        if (loadedProducts.get(key) === entry) loadedProducts.delete(key)
        throw error
      },
    ),
  }
  loadedProducts.set(key, entry)
  return entry.loading
}

/** The product if it has already been loaded here ("Buy now" can't wait for it). */
const productLoaded = (slug: string, locale: LumiLocale) => loadedProducts.get(`${locale}:${slug}`)?.product ?? undefined

// ---------------------------------------------------------------------------
// Blocks the website makes from the shop's own data
// ---------------------------------------------------------------------------

/** Most recent orders shown in the chat; the full list is under My orders. */
const ORDERS_SHOWN = 5
/** A products block holds at most 10 cards (contract). */
const GIFT_CARDS_SHOWN = 10

const QUICK_ACTIONS: Record<LumiQuickAction, LumiActionType> = {
  track: 'my_orders',
  gifts: 'gift_cards',
  person: 'talk_to_person',
  bag: 'show_bag',
  wishlist: 'show_wishlist',
  giftFinder: 'gift_finder',
}
/**
 * Library questions the website can answer without the backend. They still go
 * to the backend first (it logs them); if it can't answer, they open anyway.
 */
const SUGGESTION_ACTIONS: Partial<Record<string, LumiActionType>> = {
  'track-order': 'my_orders',
  'gift-cards': 'gift_cards',
  'talk-person': 'talk_to_person',
}
const CONTEXT_QUESTIONS: readonly LumiContextQuestion[] = ['pairs', 'size', 'stock']

const NO_MESSAGES: LumiMessage[] = []

const textBlock = (text: string): LumiBlock => ({ type: 'text', text })
const noticeBlock = (tone: 'info' | 'warning', text: string): LumiBlock => ({ type: 'notice', tone, text })
const linksBlock = (links: LumiLink[]): LumiBlock => ({ type: 'links', links })
const newGiftFinder = (): LumiBlock => ({ type: 'giftFinder', step: 0, answers: {} })

type GiftFinderBlock = Extract<LumiBlock, { type: 'giftFinder' }>
const isGiftFinder = (block: LumiBlock): block is GiftFinderBlock => block.type === 'giftFinder'

const byNewestOrder = (a: Order, b: Order) => +new Date(b.createdAt) - +new Date(a.createdAt)
const digits = (orderNumber: string) => orderNumber.replace(/[^0-9]/g, '')
/** "IWJ1011", "iwj 1011" and "#1011" are the same order. */
const sameOrderNumber = (a: string, b: string) => digits(a) !== '' && digits(a) === digits(b)

function orderSummary(o: Order): ChatOrderSummary {
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

function orderView(o: Order): ChatOrderView {
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

/** The gift cards we sell, cheapest first, as on the Gift cards page. */
function giftCardProducts(products: Product[]): LumiProductCard[] {
  return products
    .filter((p) => p.availability !== false && p.variants.length > 0)
    .sort((a, b) => a.minPrice.eur - b.minPrice.eur)
    .slice(0, GIFT_CARDS_SHOWN)
    .map((p) => ({
      productId: p.id,
      slug: p.slug,
      title: p.variants[0].title || p.title,
      image: getVariantImage(p.variants[0]),
      price: p.minPrice,
      fixedPrice: true,
      url: `/products/${p.slug}`,
      inStock: true,
    }))
}

function money(amount: number, currency: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency || 'EUR' }).format(amount)
  } catch {
    return `${amount} ${currency}`
  }
}

/** Marks a message's form as done, so it shows as sent (also when the chat is opened again). */
function markDone(type: 'messageForm') {
  return (message: LumiMessage): LumiMessage => ({
    ...message,
    blocks: message.blocks.map((block) => (block.type === type ? { ...block, done: true } : block)),
  })
}

/** Sets a message's gift finder: its step and answers, and `done` once Lumi has searched. */
function updateGiftFinder(update: { step: number; answers: GiftAnswers; done?: boolean }) {
  return (message: LumiMessage): LumiMessage => ({
    ...message,
    blocks: message.blocks.map((block) =>
      block.type === 'giftFinder'
        ? { type: 'giftFinder', step: update.step, answers: update.answers, ...(update.done ? { done: true } : {}) }
        : block,
    ),
  })
}

// ---------------------------------------------------------------------------
// The controller
// ---------------------------------------------------------------------------

/**
 * `open`: whether the chat panel is open. `locale`: the visitor's language, for
 * answers and amounts. `onClose`: closes the panel ("Buy now" leaves for the
 * checkout).
 */
export function useLumiChat({ open, locale, onClose }: { open: boolean; locale: LumiLocale; onClose: () => void }): LumiChatApi {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const { isAuthenticated } = useAuth()
  const { currency } = useCurrency()
  const history = useLumiHistory({ open })
  const dispatch = useAppDispatch()
  /** Read at the moment of use: a question's answer can arrive long after the render that sent it. */
  const store = useStore<RootState>()
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlist?.items)
  const navigate = useNavigate()
  const pathname = usePathname() ?? '/'
  const [busy, setBusy] = useState(false)
  /** Set at once (state lags a render), so two quick taps can't both send. */
  const busyRef = useRef(false)
  const botBoxRef = useRef<HTMLDivElement | null>(null)
  const botWidget = useRef<{ id: string; box: HTMLElement } | null>(null)
  const botToken = useRef<string | undefined>(undefined)
  /** Bag lines being added: a second tap gets the first one's result instead of adding again. */
  const adding = useRef(new Map<string, Promise<boolean>>())
  /** A new guest's bag being created: two quick adds share it instead of making two bags. */
  const creatingBag = useRef<Promise<unknown> | null>(null)
  /** Products whose wishlist heart is being changed. */
  const wishing = useRef(new Set<string>())
  /** Products whose options are being loaded: one card per tap. */
  const choosing = useRef(new Set<string>())

  /** Texts with values as written: React escapes what it draws, and i18next's own escaping would show "&" as "&amp;". */
  const tr = (key: string, values: Record<string, string> = {}) => t(key, { ...values, interpolation: { escapeValue: false } })

  // --- Bot check ---------------------------------------------------------------

  /** Draws the invisible check into botBoxRef: once, and again when the panel was closed and reopened. */
  const prepareBotCheck = useCallback(async () => {
    if (!SITE_KEY) return
    try {
      await loadTurnstile()
    } catch {
      return // the backend refuses without a token; the chat then offers the contact page
    }
    const box = botBoxRef.current
    const api = turnstile()
    if (!box || !api) return
    if (botWidget.current?.box === box && box.isConnected) return
    if (botWidget.current) {
      try {
        api.remove(botWidget.current.id)
      } catch {
        /* already gone with its old box */
      }
    }
    botWidget.current = null
    botToken.current = undefined
    try {
      const id = api.render(box, {
        sitekey: SITE_KEY,
        appearance: 'interaction-only',
        callback: (token: string) => {
          botToken.current = token
        },
        'expired-callback': () => {
          botToken.current = undefined
        },
      })
      if (id) botWidget.current = { id, box }
    } catch {
      /* as above: the question then shows the contact page */
    }
  }, [])

  const removeBotCheck = useCallback(() => {
    const api = turnstile()
    if (botWidget.current && api) {
      try {
        api.remove(botWidget.current.id)
      } catch {
        /* already gone */
      }
    }
    botWidget.current = null
    botToken.current = undefined
  }, [])

  // Prepare the check when a visitor opens the chat, so it's ready by their first question.
  useEffect(() => {
    if (!open) return
    if (SITE_KEY && needsBotCheck(isAuthenticated)) void prepareBotCheck()
    return removeBotCheck
  }, [open, isAuthenticated, prepareBotCheck, removeBotCheck])

  /** Visitors need a bot-check token for the backend; account holders and visitors with a pass don't. */
  async function botCheck(): Promise<{ ok: boolean; token?: string }> {
    if (!SITE_KEY || !needsBotCheck(isAuthenticated)) return { ok: true }
    const deadline = Date.now() + TOKEN_WAIT_MS
    void prepareBotCheck()
    while (!botToken.current && Date.now() < deadline) await wait(TOKEN_POLL_MS)
    const token = botToken.current
    return token ? { ok: true, token } : { ok: false }
  }

  /** A token works once: forget it and let the widget fetch a fresh one. */
  function spendBotToken(token?: string) {
    if (!token) return
    botToken.current = undefined
    const api = turnstile()
    if (!botWidget.current || !api) return
    try {
      api.reset(botWidget.current.id)
    } catch {
      removeBotCheck() // drawn again for the next question
    }
  }

  // --- The product page being viewed ------------------------------------------------

  const pageSlug = productSlugFromPath(pathname)
  const pageKey = pageSlug ? `${locale}:${pageSlug}` : null
  /** The page's product as last loaded, with the page (and language) it was loaded for. */
  const [pageProduct, setPageProduct] = useState<{ key: string; context: LumiPageContext | null } | null>(null)

  // Its name and picture are loaded once the chat is opened there: most visitors never open it.
  useEffect(() => {
    if (!open || !pageSlug || !pageKey) return
    let current = true
    loadProduct(pageSlug, locale).then(
      (product) => {
        if (current) setPageProduct({ key: pageKey, context: product ? pageContextOf(product, pageSlug) : null })
      },
      () => {
        // Offline: questions still carry the slug, and the name is loaded when the chat opens again.
      },
    )
    return () => {
      current = false
    }
  }, [open, pageSlug, pageKey, locale])

  /** The slug at once, the name and picture once loaded; null on other pages and for products the shop doesn't have. */
  const context = useMemo<LumiPageContext | null>(() => {
    if (!pageSlug) return null
    return pageProduct?.key === pageKey ? pageProduct.context : { slug: pageSlug }
  }, [pageSlug, pageKey, pageProduct])

  const pageContext = (): ChatPageContext => (context ? { productSlug: context.slug } : {})

  // --- Messages ----------------------------------------------------------------

  /** One thing at a time: nothing else is sent while Lumi is answering. */
  async function whileBusy<T>(work: () => Promise<T>): Promise<T | undefined> {
    if (busyRef.current) return undefined
    busyRef.current = true
    setBusy(true)
    try {
      return await work()
    } catch (error) {
      // Every expected failure is answered in the chat; this only catches the unexpected.
      console.error('Lumi:', error)
      return undefined
    } finally {
      busyRef.current = false
      setBusy(false)
    }
  }

  /** The visitor's message: "Sent" until Lumi adds anything after it. */
  const youSaid = (text: string, suggestion?: string): LumiMessage => ({
    id: newLumiId(),
    from: 'you',
    at: new Date().toISOString(),
    blocks: [textBlock(text)],
    status: 'sent',
    ...(suggestion ? { suggestion } : {}),
  })

  /** Adds Lumi's message to a chat (null: the one on screen, or a new one). `replyId` comes with the backend's answers, for feedback. */
  function say(chatId: string | null, blocks: LumiBlock[], extra: { followUps?: string[]; replyId?: string } = {}) {
    const { followUps = [], replyId } = extra
    history.addTo(chatId, {
      id: newLumiId(),
      from: 'lumi',
      at: new Date().toISOString(),
      blocks,
      ...(followUps.length ? { followUps } : {}),
      ...(isReplyId(replyId) ? { replyId } : {}),
    })
  }

  /** The chat on screen, where a tap's answer goes (null: a new one). */
  const shownChat = () => history.currentNow()?.id ?? null

  const contactLink = (): LumiLink => ({ title: t('quick.person.link'), url: '/contact' })
  /** Something went wrong: say so and offer the contact page. */
  const trouble = (text: string): LumiBlock[] => [noticeBlock('warning', text), linksBlock([contactLink()])]

  /** Answers the visitor's message; even an unexpected failure gets an answer, so it never stays "Sent". */
  async function answering(chatId: string, work: () => Promise<void>) {
    try {
      await work()
    } catch (error) {
      console.error('Lumi:', error)
      say(chatId, trouble(t('unavailable')))
    }
  }

  // --- Questions ---------------------------------------------------------------

  type Asking = { suggestion?: string; intent?: LumiIntent }

  /** Asks in the current chat (a new one if none is open) and adds the answer to that same chat. Runs inside whileBusy. */
  async function askNow(question: string, { suggestion, intent }: Asking = {}) {
    const text = fit(question, LUMI_MAX_QUESTION)
    const turns = toChatTurns(history.currentNow()?.messages ?? [])
    const chatId = history.addTo(null, youSaid(text, suggestion))
    if (!chatId) return
    await answering(chatId, async () => {
      const check = await botCheck()
      const reply: LumiReply = check.ok
        ? await sendChatMessage({ message: text, locale, history: turns, suggestion, intent, context: pageContext(), botToken: check.token })
        : { kind: 'botCheck' }
      spendBotToken(check.token)
      await answer(chatId, reply, suggestion ? SUGGESTION_ACTIONS[suggestion] : undefined)
    })
  }

  async function send(question: string, asking?: Asking) {
    await whileBusy(() => askNow(question, asking))
  }

  async function answer(chatId: string, reply: LumiReply, fallback?: LumiActionType) {
    if (reply.kind === 'answer') say(chatId, reply.blocks, { followUps: reply.followUps, replyId: reply.id })
    else if (reply.kind === 'action') await runAction(chatId, reply.action)
    else if (reply.kind === 'limit') say(chatId, limitBlocks(reply.tier))
    // Orders, gift cards and the message form don't need the backend: open them anyway.
    else if (fallback) await runAction(chatId, { type: fallback })
    else say(chatId, trouble(t(reply.kind === 'botCheck' ? 'botCheck' : 'unavailable')))
  }

  function limitBlocks(tier: 'visitor' | 'loggedIn' | 'customer'): LumiBlock[] {
    return tier === 'visitor'
      ? [noticeBlock('info', t('limitVisitor')), linksBlock([{ title: t('logIn'), url: '/login' }, contactLink()])]
      : [noticeBlock('info', t('limitAccount')), linksBlock([contactLink()])]
  }

  async function ask(question: string) {
    const text = fit(question.trim(), LUMI_MAX_QUESTION).trim()
    if (text) await send(text)
  }

  async function askSuggestion(id: string) {
    if (findLumiSuggestion(id)) await send(t(`lumi.suggestions.${id}`), { suggestion: id })
  }

  /** Pairings, size help or stock for the product page being viewed, asked by name (the page goes along as context). */
  async function askAboutContext(question: LumiContextQuestion) {
    if (!context || !CONTEXT_QUESTIONS.includes(question)) return
    let title = context.title
    if (!title) {
      try {
        title = (await loadProduct(context.slug, locale))?.title.trim() || undefined
      } catch {
        // Asked without the name.
      }
    }
    await send(title ? tr(`lumi.context.${question}`, { title }) : t(`lumi.context.${question}This`))
  }

  async function quick(action: LumiQuickAction) {
    const type = QUICK_ACTIONS[action]
    if (!type) return
    await whileBusy(async () => {
      const chatId = history.addTo(null, youSaid(t(`lumi.actions.${action}`)))
      if (chatId) await answering(chatId, () => runAction(chatId, { type }))
    })
  }

  // --- Tools: orders, gift cards, messages and shopping, from the shop's own APIs ----

  /** Opens what was asked for: a form, gift cards, orders, a product's options, the bag, the wishlist or the gift finder. */
  async function runAction(chatId: string, action: LumiAction) {
    switch (action.type) {
      case 'talk_to_person':
        say(chatId, [textBlock(t(isAuthenticated ? 'tools.personIntroAccount' : 'tools.personIntro')), { type: 'messageForm' }])
        return
      case 'gift_cards':
        await showGiftCards(chatId)
        return
      case 'add_to_bag':
        await showOptions(chatId, action.productSlug)
        return
      case 'add_to_wishlist':
        await saveToWishlist(chatId, action.productSlug)
        return
      case 'show_bag':
        await showBag(chatId)
        return
      case 'show_wishlist':
        await showWishlist(chatId)
        return
      case 'gift_finder':
        say(chatId, [newGiftFinder()])
        return
      case 'my_orders':
      case 'order_status':
        if (!isAuthenticated) {
          // Orders are private: guests are asked to log in (no lookup by order number).
          say(chatId, [textBlock(t('lumi.ordersLogin')), linksBlock([{ title: t('logIn'), url: '/login' }])])
        } else if (action.type === 'order_status' && action.orderNumber) {
          await showOrderByNumber(chatId, action.orderNumber)
        } else {
          await showMyOrders(chatId)
        }
    }
  }

  const ordersFailed = (): LumiBlock[] => [textBlock(t('tools.ordersFailed')), linksBlock([{ title: t('tools.allOrders'), url: '/orders' }])]

  /** The latest orders (tap one for its status), or a nudge to shop when there are none. */
  function orderList(orders: Order[], total: number | undefined, intro: string): LumiBlock[] {
    const latest = [...orders].sort(byNewestOrder).slice(0, ORDERS_SHOWN)
    if (!latest.length) return [textBlock(t('tools.noOrders')), linksBlock([{ title: t('tools.shopNow'), url: '/products' }])]
    const more = Math.max(total ?? 0, orders.length) > ORDERS_SHOWN
    return [
      textBlock(intro),
      { type: 'orders', orders: latest.map(orderSummary), ...(more ? { more: { title: t('tools.allOrders'), url: '/orders' } } : {}) },
    ]
  }

  async function showMyOrders(chatId: string) {
    try {
      const { orders, pagination } = await getOrders()
      say(chatId, orderList(orders, pagination?.totalRecords, t('tools.yourOrders')))
    } catch {
      say(chatId, ordersFailed())
    }
  }

  async function showOrderIn(chatId: string, orderId: string) {
    try {
      say(chatId, [{ type: 'order', order: orderView(await getOrderById(orderId)) }])
    } catch {
      say(chatId, ordersFailed())
    }
  }

  /** A typed order number: that order when it's the customer's, else their orders. */
  async function showOrderByNumber(chatId: string, orderNumber: string) {
    try {
      const { orders, pagination } = await getOrders()
      const match = orders.find((o) => sameOrderNumber(o.orderNumber, orderNumber))
      if (match) await showOrderIn(chatId, match.id)
      else say(chatId, orderList(orders, pagination?.totalRecords, t('tools.orderNotYours')))
    } catch {
      say(chatId, ordersFailed())
    }
  }

  /** The gift cards we sell, plus a signed-in customer's own cards that still have money on them. */
  async function showGiftCards(chatId: string) {
    const [shop, mine] = await Promise.allSettled([
      getProducts({ productType: 'GIFT_CARD', limit: 12 }),
      isAuthenticated ? getMyGiftCards() : Promise.resolve<MyGiftCard[]>([]),
    ])
    const cards = shop.status === 'fulfilled' ? giftCardProducts(shop.value.products) : []
    const balances = mine.status === 'fulfilled'
      ? mine.value
        .filter((card) => card.status === 'ACTIVE' && card.balance > 0)
        .map((card) => ({ code: `…${card.code.slice(-4)}`, balance: money(card.balance, card.currency, locale) }))
      : []
    const blocks: LumiBlock[] = [textBlock(t('tools.giftCardsIntro'))]
    if (cards.length) blocks.push({ type: 'products', products: cards })
    if (balances.length) blocks.push(textBlock(t('tools.myGiftCardsIntro')), { type: 'giftBalances', cards: balances })
    blocks.push(linksBlock([
      { title: t('tools.allGiftCards'), url: '/gift-cards' },
      ...(balances.length ? [{ title: t('tools.myGiftCards'), url: '/account/gift-cards' }] : []),
    ]))
    say(chatId, blocks)
  }

  async function showOrder(orderId: string) {
    await whileBusy(async () => {
      const chatId = history.currentNow()?.id
      if (chatId) await showOrderIn(chatId, orderId)
    })
  }

  /** A ticket for account holders, the contact form for guests. True when sent. */
  async function sendToTeam(messageId: string, input: { name: string; email: string; message: string }): Promise<boolean> {
    const sent = await whileBusy(async () => {
      const chatId = history.currentNow()?.id
      if (!chatId) return false
      try {
        if (isAuthenticated) {
          const ticket = await createTicket({
            subject: `Chat: ${input.message.slice(0, 60)}`,
            category: 'general',
            priority: 'medium',
            message: input.message,
          })
          history.changeIn(chatId, messageId, markDone('messageForm'))
          say(chatId, [textBlock(t('tools.ticketSent', { id: ticket?.ticketId ?? '' })), linksBlock([{ title: t('tools.myTickets'), url: '/tickets' }])])
        } else {
          await sendContactMessage(input)
          history.changeIn(chatId, messageId, markDone('messageForm'))
          say(chatId, [textBlock(t('tools.sent'))])
        }
        return true
      } catch {
        say(chatId, [textBlock(t('tools.sendFailed')), linksBlock([contactLink()])])
        return false
      }
    })
    return sent ?? false
  }

  // --- Shopping: a product's options, the bag, "Buy now" and the wishlist ------------

  const productWords: ProductWords = {
    colour: (key) => t(`lumi.colours.${key}`),
    material: (metal, finish) => tr('lumi.shop.material', { metal, finish }),
  }
  const productLink = (slug: string): LumiBlock => linksBlock([{ title: t('lumi.product.view'), url: `/products/${slug}` }])

  /**
   * A product with all its colours and sizes, so the visitor can choose and
   * add it. Gift cards open their own page instead, where the recipient and
   * message are chosen.
   */
  async function showOptions(chatId: string | null, slug: string | undefined) {
    if (!isProductSlug(slug)) {
      say(chatId, [textBlock(t('lumi.shop.whichProduct'))])
      return
    }
    let product: ProductDetail | null
    try {
      product = await loadProduct(slug, locale)
    } catch {
      say(chatId, [noticeBlock('warning', t('lumi.shop.loadFailed')), productLink(slug)])
      return
    }
    if (product?.productType === 'GIFT_CARD') {
      say(chatId, [textBlock(t('lumi.shop.giftCardPage')), productLink(slug)])
      return
    }
    const detail = product ? toLumiProduct(product, productWords, slug) : null
    say(chatId, detail ? [{ type: 'product', product: detail }] : [noticeBlock('info', t('lumi.shop.unknownProduct'))])
  }

  async function chooseOptions(slug: string) {
    if (choosing.current.has(slug)) return
    choosing.current.add(slug)
    try {
      await showOptions(shownChat(), slug)
    } finally {
      choosing.current.delete(slug)
    }
  }

  /** True when the chosen colour comes in sizes and none was picked, as the product page checks (known for products loaded here). */
  function sizeMissing(selection: LumiBagSelection): boolean {
    if (selection.size !== undefined) return false
    const variant = productLoaded(selection.slug, locale)?.variants.find((v) => v.id === selection.variantId)
    return Boolean(variant?.sizes?.length)
  }

  function addToBag(selection: LumiBagSelection): Promise<boolean> {
    const key = bagItemKey(selection)
    const running = adding.current.get(key)
    if (running) return running
    const work = putInBag(shownChat(), selection).finally(() => adding.current.delete(key))
    adding.current.set(key, work)
    return work
  }

  /**
   * A guest's bag is found by the id this browser keeps, which the shop only
   * stores when it reads the bag. A new guest's add would go into a bag whose
   * id is never kept (the shop then shows another, empty one), so their bag is
   * created first. Two quick adds share that one bag.
   */
  async function guestBagReady() {
    if (isAuthenticated || getGuestCartId()) return
    creatingBag.current ??= dispatch(fetchCart()).unwrap().finally(() => {
      creatingBag.current = null
    })
    await creatingBag.current
  }

  /** Puts the choice in the shop's bag exactly as the product page does (guests may shop too), then confirms it here. */
  async function putInBag(chatId: string | null, selection: LumiBagSelection): Promise<boolean> {
    if (sizeMissing(selection)) {
      say(chatId, [noticeBlock('info', t('lumi.shop.chooseSize'))])
      return false
    }
    const quantity = bagQuantity(selection.quantity)
    let line: CartItem | undefined
    try {
      if (!selection.productId || !selection.variantId) throw new Error('Nothing chosen')
      await guestBagReady()
      const cart = await dispatch(addToCart({
        productId: selection.productId,
        quantity,
        variantId: selection.variantId,
        ...(selection.size !== undefined ? { size: selection.size } : {}),
      })).unwrap()
      line = cart.items.find((item) => item.productId === selection.productId && item.variantId === selection.variantId && item.size === selection.size)
    } catch {
      say(chatId, [noticeBlock('warning', t('lumi.shop.addFailed'))])
      return false
    }
    const image = selection.image ?? (line && /^https?:\/\//i.test(line.thumbnail) ? line.thumbnail : undefined)
    say(chatId, [{
      type: 'cartAdded',
      item: {
        title: selection.title,
        ...(selection.variantTitle ? { variantTitle: selection.variantTitle } : {}),
        ...(selection.sizeLabel ? { sizeLabel: selection.sizeLabel } : {}),
        ...(image ? { image } : {}),
        // The bag's own price for it (the server's), else the one the card showed.
        price: line?.price ?? selection.price,
        quantity,
      },
    }])
    return true
  }

  /** Straight to the checkout with only this piece, exactly as "Buy now" on the product page. */
  function buyNow(selection: LumiBagSelection) {
    if (!selection.productId || !selection.variantId) return
    if (sizeMissing(selection)) {
      say(shownChat(), [noticeBlock('info', t('lumi.shop.chooseSize'))])
      return
    }
    const variant = productLoaded(selection.slug, locale)?.variants.find((v) => v.id === selection.variantId)
    const draft = checkoutDraft(selection, {
      returnPath: pathname,
      thumbnail: selection.image ?? (variant ? getVariantImage(variant) : ''),
      sizeMeasurement: variant?.sizeMeasurement,
    })
    onClose()
    try {
      setSingleCheckoutDraft(draft)
      navigate('/checkout?source=single', { state: { source: 'single', draft } })
    } catch (error) {
      // Only when this browser blocks storage, where the product page can't buy now either.
      console.error('Lumi:', error)
    }
  }

  const isWishlisted = (productId: string) => Boolean(productId) && (wishlistItems ?? []).some((item) => item.productId === productId)

  /** As on the product page, the wishlist needs an account. */
  const wishlistLogin = (): LumiBlock[] => [noticeBlock('info', t('lumi.shop.wishlistLogin')), linksBlock([{ title: t('logIn'), url: '/login' }])]

  /** The customer's wishlist from the shop's store, loaded first when it isn't there yet. Throws when it can't be loaded. */
  async function savedPieces(): Promise<WishlistItem[]> {
    const { wishlist, status } = store.getState().wishlist
    if (status === 'succeeded' && wishlist) return wishlist.items
    return (await dispatch(fetchWishlist()).unwrap()).items
  }

  /** Saves a product to the wishlist (a toggle removes it when it's already there) and says so in a few words. */
  async function changeWishlist(chatId: string | null, productId: string, mode: 'add' | 'toggle') {
    try {
      const saved = (await savedPieces()).find((item) => item.productId === productId)
      if (saved && mode === 'add') {
        say(chatId, [textBlock(t('lumi.shop.wishlistAlready'))])
      } else if (saved) {
        await dispatch(removeWishlistItem(saved.id)).unwrap()
        say(chatId, [textBlock(t('lumi.shop.wishlistRemoved'))])
      } else {
        await dispatch(addToWishlist(productId)).unwrap()
        say(chatId, [textBlock(t('lumi.shop.wishlistSaved'))])
      }
    } catch {
      say(chatId, [noticeBlock('warning', t('lumi.shop.wishlistFailed'))])
    }
  }

  async function toggleWishlist({ productId, slug }: { productId: string; slug: string }) {
    const chatId = shownChat()
    if (!isAuthenticated) {
      say(chatId, wishlistLogin())
      return
    }
    const key = productId || slug
    if (!key || wishing.current.has(key)) return
    wishing.current.add(key)
    try {
      // A card without the id (it shouldn't happen) is found by its slug.
      const id = productId || (isProductSlug(slug) ? (await loadProduct(slug, locale))?.id : undefined)
      if (id) await changeWishlist(chatId, id, 'toggle')
      else say(chatId, [noticeBlock('info', t('lumi.shop.unknownProduct'))])
    } catch {
      say(chatId, [noticeBlock('warning', t('lumi.shop.wishlistFailed'))])
    } finally {
      wishing.current.delete(key)
    }
  }

  /** "Save the Spilla necklace to my wishlist": only ever adds, and says when it's already there. */
  async function saveToWishlist(chatId: string, slug: string | undefined) {
    if (!isAuthenticated) {
      say(chatId, wishlistLogin())
      return
    }
    if (!isProductSlug(slug)) {
      say(chatId, [textBlock(t('lumi.shop.whichProduct'))])
      return
    }
    let product: ProductDetail | null
    try {
      product = await loadProduct(slug, locale)
    } catch {
      say(chatId, [noticeBlock('warning', t('lumi.shop.loadFailed')), productLink(slug)])
      return
    }
    if (product) await changeWishlist(chatId, product.id, 'add')
    else say(chatId, [noticeBlock('info', t('lumi.shop.unknownProduct'))])
  }

  /** The bag, drawn live from the shop's store; loaded first unless it's there (or on its way). */
  async function showBag(chatId: string) {
    const { status } = store.getState().cart
    // A guest without a bag has nothing to load (asking would create an empty one, as CartSync knows).
    const load = status !== 'succeeded' && status !== 'loading' && (isAuthenticated || Boolean(getGuestCartId()))
    try {
      if (load) await dispatch(fetchCart()).unwrap()
      say(chatId, [{ type: 'bag' }])
    } catch {
      say(chatId, [noticeBlock('warning', t('lumi.shop.bagFailed')), linksBlock([{ title: t('lumi.shop.openBag'), url: '/cart' }])])
    }
  }

  /** The wishlist, drawn live from the shop's store (accounts only). */
  async function showWishlist(chatId: string) {
    if (!isAuthenticated) {
      say(chatId, wishlistLogin())
      return
    }
    try {
      await savedPieces()
      say(chatId, [{ type: 'wishlist' }])
    } catch {
      say(chatId, [noticeBlock('warning', t('lumi.shop.wishlistLoadFailed')), linksBlock([{ title: t('lumi.shop.openWishlist'), url: '/wishlist' }])])
    }
  }

  // --- Gift finder -------------------------------------------------------------

  /** A gift budget's euros as money, in the visitor's currency where the shop's prices allow it. */
  const budgetMoney = (euros: number) => formatPrice(euros, budgetCurrency(currency))

  function startGiftFinder() {
    const chat = history.currentNow()
    // A second tap doesn't stack another finder under one that is still waiting for answers.
    const last = chat?.messages.at(-1)
    if (last?.from === 'lumi' && last.blocks.some((block) => block.type === 'giftFinder' && !block.done)) return
    say(chat?.id ?? null, [newGiftFinder()])
  }

  /**
   * Records answers in the finder and moves to the next question. After the
   * fourth, the visitor's answers become their message ("A necklace under
   * €100 for my partner's birthday") and Lumi searches exactly that, without
   * the AI deciding anything.
   */
  async function answerGiftFinder(messageId: string, answers: GiftAnswers) {
    const chat = history.currentNow()
    const finder = chat?.messages.find((message) => message.id === messageId)?.blocks.find(isGiftFinder)
    if (!chat || !finder || finder.done) return
    const merged = mergeGiftAnswers(finder.answers, answers)
    history.changeIn(chat.id, messageId, updateGiftFinder({ step: Math.min(giftStep(merged), LAST_GIFT_STEP), answers: merged }))
    if (!isCompleteGift(merged)) return
    // Searched once, and not while Lumi is answering something else (the last answer can then be tapped again).
    await whileBusy(async () => {
      history.changeIn(chat.id, messageId, updateGiftFinder({ step: LAST_GIFT_STEP, answers: merged, done: true }))
      await askNow(giftSummary(merged, tr, budgetMoney), { intent: giftIntent(merged) })
    })
  }

  // --- Feedback ----------------------------------------------------------------

  /** Thumbs up or down on one of Lumi's answers: shown at once, sent quietly (a failed send isn't retried). */
  async function sendFeedback(messageId: string, helpful: boolean) {
    const chat = history.currentNow()
    const message = chat?.messages.find((m) => m.id === messageId)
    const feedback = helpful ? 'up' : 'down'
    if (!chat || !message || message.from !== 'lumi' || !message.replyId || message.feedback === feedback) return
    history.changeIn(chat.id, messageId, (m) => ({ ...m, feedback }))
    await postFeedback(message.replyId, helpful)
  }

  return {
    busy,
    messages: history.current?.messages ?? NO_MESSAGES,
    ask,
    askSuggestion,
    quick,
    showOrder,
    sendToTeam,
    context,
    askAboutContext,
    chooseOptions,
    addToBag,
    buyNow,
    toggleWishlist,
    isWishlisted,
    startGiftFinder,
    answerGiftFinder,
    sendFeedback,
    history,
    botBoxRef,
  }
}
