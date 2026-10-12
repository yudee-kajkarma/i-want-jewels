import type { RefObject } from 'react'
import type { Price } from '../../utils/price'

/**
 * Jules, the shop's chat assistant: the shapes of everything it shows.
 *
 * Server blocks mirror the backend's reply format
 * (Ecom_Backend_Services/src/ai/jules/contract.ts) exactly. Client blocks are
 * made by the website itself from the shop's own APIs (orders, forms, gift
 * card balances) and never come from the AI. A message is a list of blocks,
 * drawn in order, each by its own component.
 */

// ---------------------------------------------------------------------------
// Reply format from POST /api/chat (same as the backend)
// ---------------------------------------------------------------------------

export type JulesLocale = 'en' | 'de' | 'nl' | 'fr' | 'it' | 'es'
export type JulesColourKey = 'yellow' | 'rose' | 'white'
export type JulesTool =
  | 'find_products' | 'product_details' | 'my_orders' | 'order_status' | 'gift_cards'
  | 'talk_to_person' | 'ask_question' | 'greeting' | 'off_topic' | 'saved'
  | 'pairs_with' | 'add_to_bag' | 'add_to_wishlist' | 'show_bag' | 'show_wishlist' | 'gift_finder'
export type JulesSource = 'shortcut' | 'suggestion' | 'saved' | 'tool' | 'ai'

/** A link inside the shop: always a path like "/blogs/…". */
export type JulesLink = { title: string; url: string }

export type JulesProductCard = {
  /** The product's database id: what the bag and wishlist need. */
  productId: string
  slug: string
  title: string
  image?: string
  /** The lowest price, in every shop currency. */
  price: Price
  /** One price for every option: no "from". */
  fixedPrice: boolean
  url: string
  inStock: boolean
}

/** `size` is the value the bag needs (e.g. 0.25 or 52); `label` is what the visitor sees ("0.25 ct"). */
export type JulesSizeOption = { size: number; label: string; price: Price; inStock: boolean }

/** One colour of a product (the shop's variant) with its own sizes. */
export type JulesVariant = {
  /** The variant's database id: what the bag needs. */
  id: string
  colour?: JulesColourKey
  /** As the shop names it, e.g. "Yellow Gold". */
  title: string
  image?: string
  price: Price
  inStock: boolean
  /** Empty for one-size products. */
  sizes: JulesSizeOption[]
}

export type JulesProductDetail = JulesProductCard & {
  priceHigh: Price
  colours: Array<{ key: JulesColourKey; name: string }>
  material?: string
  /** Two or more sizes with their own prices; empty for one-size products. */
  sizes: JulesSizeOption[]
  /** Every colour with its own sizes and stock: the card adds the exact choice to the bag. */
  variants: JulesVariant[]
}

export type JulesServerBlock =
  | { type: 'text'; text: string }
  | { type: 'points'; items: string[] }
  | { type: 'products'; products: JulesProductCard[] }
  | { type: 'product'; product: JulesProductDetail }
  | { type: 'compare'; products: JulesProductDetail[] }
  | { type: 'links'; links: JulesLink[] }
  | { type: 'notice'; tone: 'info' | 'warning'; text: string }

export type JulesActionType =
  | 'my_orders' | 'order_status' | 'talk_to_person' | 'gift_cards'
  | 'add_to_bag' | 'add_to_wishlist' | 'show_bag' | 'show_wishlist' | 'gift_finder'
/** `productSlug` comes with add_to_bag / add_to_wishlist. */
export type JulesAction = { type: JulesActionType; orderNumber?: string; productSlug?: string }

type ReplyCommon = { id: string; tool: JulesTool; source: JulesSource; language: JulesLocale; remaining: number }

export type JulesReply =
  | (ReplyCommon & { kind: 'answer'; blocks: JulesServerBlock[]; followUps: string[] })
  | (ReplyCommon & { kind: 'action'; action: JulesAction })
  | { kind: 'limit'; tier: 'visitor' | 'loggedIn' | 'customer' }
  | { kind: 'unavailable' }
  /** The bot check failed (HTTP 403): the visitor must try again. */
  | { kind: 'botCheck' }

// ---------------------------------------------------------------------------
// Blocks the website makes itself (never from the AI)
// ---------------------------------------------------------------------------

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

export type JulesClientBlock =
  /** The customer's latest orders; tapping one shows its status. */
  | { type: 'orders'; orders: ChatOrderSummary[]; more?: JulesLink }
  /** One order's status and tracking. */
  | { type: 'order'; order: ChatOrderView }
  /** Message to the team: a ticket for accounts, the contact form for guests. `done` once sent. */
  | { type: 'messageForm'; done?: boolean }
  /** The customer's own gift cards, with the code shortened to its last 4 characters. */
  | { type: 'giftBalances'; cards: Array<{ code: string; balance: string }> }

export type GiftRecipient = 'partner' | 'mum' | 'friend' | 'myself'
export type GiftOccasion = 'birthday' | 'anniversary' | 'wedding' | 'justBecause'
export type GiftBudget = 'under100' | 'from100to200' | 'over200' | 'any'
export type GiftType = 'earrings' | 'necklaces' | 'rings' | 'bracelets' | 'any'
export type GiftAnswers = { recipient?: GiftRecipient; occasion?: GiftOccasion; budget?: GiftBudget; type?: GiftType }

export type JulesShopBlock =
  /** Confirmation after adding to the bag, with View bag / Checkout. */
  | { type: 'cartAdded'; item: { title: string; variantTitle?: string; sizeLabel?: string; image?: string; price: Price; quantity: number } }
  /** The shopping bag, drawn live from the shop's store (not a snapshot). */
  | { type: 'bag' }
  /** The wishlist, drawn live from the shop's store (not a snapshot). */
  | { type: 'wishlist' }
  /** The guided gift finder: four questions, then Jules's picks. `step` 0–3 while asking; `done` once searched. */
  | { type: 'giftFinder'; step: number; answers: GiftAnswers; done?: boolean }

export type JulesBlock = JulesServerBlock | JulesClientBlock | JulesShopBlock

// ---------------------------------------------------------------------------
// Messages and conversations (chat history)
// ---------------------------------------------------------------------------

export type JulesMessage = {
  id: string
  from: 'you' | 'jules'
  /** ISO time it was added. */
  at: string
  blocks: JulesBlock[]
  /** Library questions (ids) offered under this answer. */
  followUps?: string[]
  /** The library question this message asked, if it was one. */
  suggestion?: string
  /** The visitor's messages: "sent" until Jules answers, then "seen" (instead of a typing indicator). */
  status?: 'sent' | 'seen'
  /** Jules's answers: the backend's reply id, used for feedback. */
  replyId?: string
  /** Jules's answers: the visitor's thumbs up/down. */
  feedback?: 'up' | 'down'
}

export type JulesConversation = {
  id: string
  /** The first question, shortened. */
  title: string
  createdAt: string
  updatedAt: string
  messages: JulesMessage[]
}

export type JulesConversationSummary = {
  id: string
  title: string
  updatedAt: string
  /** The last thing said, as plain text. */
  preview: string
  messageCount: number
}

/** Where chats are kept: on this device (guests) or on the customer's account (synced). */
export type JulesHistoryStore = 'device' | 'account'

export interface JulesHistoryApi {
  /** False until the saved chats have been read. */
  ready: boolean
  store: JulesHistoryStore
  /** Newest first. */
  conversations: JulesConversationSummary[]
  /** The chat on screen; null before the first message of a new chat. */
  current: JulesConversation | null
  /** Shows a saved chat. */
  open(id: string): Promise<void>
  /** Starts a new, empty chat (saved once its first message is added). */
  startNew(): void
  /** Adds a message to the current chat, creating the chat if there is none. */
  append(message: JulesMessage): void
  /** Changes one message of the current chat (e.g. marks a form as sent). */
  update(messageId: string, change: (message: JulesMessage) => JulesMessage): void
  remove(id: string): Promise<void>
  clearAll(): Promise<void>
}

// ---------------------------------------------------------------------------
// What the screens get from the chat controller (useJulesChat)
// ---------------------------------------------------------------------------

export type JulesQuickAction = 'track' | 'gifts' | 'person' | 'bag' | 'wishlist' | 'giftFinder'

/** The product page the visitor is on (from the address), shown as context and sent with questions. */
export type JulesPageContext = { slug: string; title?: string; image?: string }

/** One exact choice to put in the bag or buy now. */
export type JulesBagSelection = {
  productId: string
  slug: string
  variantId: string
  /**
   * The bag's size value (e.g. 0.25 or 52). Sent whenever the chosen colour
   * has sizes, even just one (necklaces store [18], bracelets [7]): the bag
   * refuses those without it. Left out only when the colour has no sizes.
   */
  size?: number
  quantity?: number
  /** For the confirmation and the buy-now checkout. */
  title: string
  variantTitle?: string
  sizeLabel?: string
  image?: string
  price: Price
}

/** Chips shown on product pages; each asks about the product being viewed. */
export type JulesContextQuestion = 'pairs' | 'size' | 'stock'

export interface JulesChatApi {
  /** Jules is answering: blocks a second send. (No typing indicator: the visitor's message shows Sent, then Seen.) */
  busy: boolean
  /** The current chat's messages (empty for a new chat). */
  messages: JulesMessage[]
  /** Sends a typed question. */
  ask(text: string): Promise<void>
  /** Asks a library question (its text in the visitor's language is added as their message). */
  askSuggestion(id: string): Promise<void>
  /** Track my order, gift cards, talk to a person: answered by the website, no AI. */
  quick(action: JulesQuickAction): Promise<void>
  /** Opens one order from an orders block. */
  showOrder(orderId: string): Promise<void>
  /** Sends the message form; true when sent. */
  sendToTeam(messageId: string, input: { name: string; email: string; message: string }): Promise<boolean>
  /** The product page being viewed, or null. */
  context: JulesPageContext | null
  /** Asks about the product page being viewed (pairings, size help, stock). */
  askAboutContext(question: JulesContextQuestion): Promise<void>
  /** Shows a product with its colours and sizes so the visitor can choose and add it (used by list cards' "Add"). */
  chooseOptions(slug: string): Promise<void>
  /** Adds the exact choice to the shop's bag (the header's bag count updates); true when added. */
  addToBag(selection: JulesBagSelection): Promise<boolean>
  /** Goes straight to checkout with just this item (as "Buy now" on the product page); closes the panel. */
  buyNow(selection: JulesBagSelection): void
  /** Saves or removes a product from the wishlist (needs an account: guests get a log-in prompt). */
  toggleWishlist(product: { productId: string; slug: string }): Promise<void>
  isWishlisted(productId: string): boolean
  /** Starts the guided gift finder (a giftFinder block). */
  startGiftFinder(): void
  /** Records one gift-finder answer; after the last one Jules searches and shows her picks. */
  answerGiftFinder(messageId: string, answers: GiftAnswers): Promise<void>
  /** Thumbs up/down on one of Jules's answers. */
  sendFeedback(messageId: string, helpful: boolean): Promise<void>
  history: JulesHistoryApi
  /** Where Cloudflare's invisible bot check is drawn: keep it mounted while the panel is open. */
  botBoxRef: RefObject<HTMLDivElement | null>
}

/** Chats older than this show a note that prices and stock may have changed. */
export const JULES_OLD_CHAT_MS = 24 * 60 * 60 * 1000
/** The question box grows up to this many lines, then scrolls. */
export const JULES_INPUT_MAX_LINES = 4
/** Longest question (same as the backend's CHAT_MAX_QUESTION_CHARS). */
export const JULES_MAX_QUESTION = 300
