import { authApiClient } from './apiClient'
import { httpStatus, isReplyId, knownFollowUps, readBlock } from './chatService'
import type { LumiBlock, LumiConversation, LumiConversationSummary, LumiMessage } from '../components/lumi/contract'

/**
 * Lumi's chat history. Customers' chats are kept on their account by the
 * backend (/api/chat/conversations), so they follow them to every device;
 * guests' chats stay in this browser (localStorage), within the limits below.
 * Saved chats are read with the same checks as live replies (chatService): a
 * damaged chat or block is left out rather than breaking the chat.
 * The store logic itself lives in components/lumi/useLumiHistory.ts.
 */

/** Where a guest's chats are kept in this browser. */
export const DEVICE_KEY = 'lumi:chats:v1:guest'
/** A guest's browser keeps at most this many chats, */
export const MAX_CHATS = 30
/** each with its latest this-many messages (also the most sent per save to the account), */
export const MAX_MESSAGES = 60
/** for this long after their last message. */
export const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000
const TITLE_CHARS = 60
const PREVIEW_CHARS = 90
/** The backend refuses chats over 256 KB of JSON; long chats send fewer old messages instead. */
const MAX_SAVE_BYTES = 240 * 1024
const REQUEST_TIMEOUT_MS = 15_000

// ---------------------------------------------------------------------------
// Ids and text
// ---------------------------------------------------------------------------

/**
 * A new id for a chat or message (the backend accepts 8–64 letters, digits,
 * "_" or "-"). crypto.randomUUID only exists on https and localhost, so on a
 * plain-http address (a phone testing over the LAN) the id is built from
 * crypto.getRandomValues instead.
 */
export function newLumiId(): string {
  const random = typeof crypto === 'undefined' ? undefined : crypto
  if (typeof random?.randomUUID === 'function') {
    try {
      return random.randomUUID()
    } catch {
      /* not a secure context: build one below */
    }
  }
  const bytes = new Uint8Array(16)
  if (typeof random?.getRandomValues === 'function') random.getRandomValues(bytes)
  else for (let i = 0; i < bytes.length; i += 1) bytes[i] = Math.floor(Math.random() * 256)
  bytes[6] = (bytes[6] & 0x0f) | 0x40 // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80 // RFC 4122 variant
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/** The longest start of `text` that fits in `max` characters, without splitting an emoji in two. */
export function fit(text: string, max: number): string {
  if (text.length <= max) return text
  const code = text.charCodeAt(max - 1)
  return text.slice(0, code >= 0xd800 && code <= 0xdbff ? max - 1 : max)
}

/** One line of text, at most `max` characters, ending in "…" when shortened. */
export function clip(text: string, max: number): string {
  const line = text.replace(/\s+/g, ' ').trim()
  return line.length <= max ? line : `${fit(line, max - 1).trimEnd()}…`
}

/** What a block says: its sentence or its points. */
function saidIn(block: LumiBlock): string[] {
  if (block.type === 'text' || block.type === 'notice') return [block.text]
  if (block.type === 'points') return block.items
  return []
}

/** What a block shows by name: products, links or order numbers. */
function namesIn(block: LumiBlock): string[] {
  switch (block.type) {
    case 'product':
      return [block.product.title]
    case 'cartAdded':
      return [block.item.title]
    case 'products':
    case 'compare':
      return block.products.map((product) => product.title)
    case 'links':
      return block.links.map((link) => link.title)
    case 'orders':
      return block.orders.map((order) => order.orderNumber)
    case 'order':
      return [block.order.orderNumber]
    default:
      return []
  }
}

/** A chat's title: the visitor's first question on one line, at most 60 characters. */
export function titleOf(message: LumiMessage): string {
  return message.from === 'you' ? clip(message.blocks.flatMap(saidIn).join(' '), TITLE_CHARS) : ''
}

/**
 * The last thing said, as one line of plain text: the last message's text and
 * points, else the names it shows. A message with neither (a form) falls back
 * to the one before it. Same rule as the backend's preview for saved chats.
 */
export function previewOf(messages: LumiMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const { blocks } = messages[i]
    const said = blocks.flatMap(saidIn)
    const line = clip(said.length ? said.join(' ') : blocks.flatMap(namesIn).join(', '), PREVIEW_CHARS)
    if (line) return line
  }
  return ''
}

export function toSummary(chat: LumiConversation): LumiConversationSummary {
  return { id: chat.id, title: chat.title, updatedAt: chat.updatedAt, preview: previewOf(chat.messages), messageCount: chat.messages.length }
}

const time = (iso: string) => Date.parse(iso) || 0

/** Newest first. */
export const byNewest = (a: { updatedAt: string }, b: { updatedAt: string }) => time(b.updatedAt) - time(a.updatedAt)

/**
 * The guest's chats within the device limits: none older than 30 days, at most
 * 30 chats (the newest) and each with its latest 60 messages; newest first.
 */
export function pruneChats(chats: LumiConversation[], now = Date.now()): LumiConversation[] {
  const recent = chats.filter((chat) => chat.messages.length > 0 && now - time(chat.updatedAt) <= MAX_AGE_MS).sort(byNewest)
  const kept: LumiConversation[] = []
  const seen = new Set<string>()
  for (const chat of recent) {
    if (kept.length >= MAX_CHATS) break
    if (seen.has(chat.id)) continue // two copies of one chat: the newest wins
    seen.add(chat.id)
    kept.push(chat.messages.length > MAX_MESSAGES ? { ...chat, messages: chat.messages.slice(-MAX_MESSAGES) } : chat)
  }
  return kept
}

// ---------------------------------------------------------------------------
// Reading saved chats (from this browser or the backend)
// ---------------------------------------------------------------------------

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isTime = (value: unknown): value is string => typeof value === 'string' && !Number.isNaN(Date.parse(value))

function readMessage(raw: unknown): LumiMessage | undefined {
  if (!isObject(raw) || typeof raw.id !== 'string' || !raw.id || (raw.from !== 'you' && raw.from !== 'lumi') || !isTime(raw.at)) return undefined
  const blocks = Array.isArray(raw.blocks) ? raw.blocks.map(readBlock).filter((block): block is LumiBlock => block !== undefined) : []
  if (!blocks.length) return undefined
  const followUps = knownFollowUps(raw.followUps)
  return {
    id: raw.id,
    from: raw.from,
    at: raw.at,
    blocks,
    ...(followUps.length ? { followUps } : {}),
    ...(typeof raw.suggestion === 'string' && raw.suggestion ? { suggestion: raw.suggestion } : {}),
    ...(raw.status === 'sent' || raw.status === 'seen' ? { status: raw.status } : {}),
    ...(isReplyId(raw.replyId) ? { replyId: raw.replyId } : {}),
    ...(raw.feedback === 'up' || raw.feedback === 'down' ? { feedback: raw.feedback } : {}),
  }
}

/** A saved chat, checked; undefined when there's nothing usable in it. */
export function readConversation(raw: unknown): LumiConversation | undefined {
  if (!isObject(raw) || typeof raw.id !== 'string' || !raw.id || !Array.isArray(raw.messages)) return undefined
  const messages: LumiMessage[] = []
  const ids = new Set<string>()
  for (const item of raw.messages) {
    const message = readMessage(item)
    // Message ids are the screen's keys, so each may appear once.
    if (message && !ids.has(message.id)) {
      ids.add(message.id)
      messages.push(message)
    }
  }
  if (!messages.length) return undefined
  return {
    id: raw.id,
    title: typeof raw.title === 'string' ? clip(raw.title, TITLE_CHARS) : '',
    createdAt: isTime(raw.createdAt) ? raw.createdAt : messages[0].at,
    updatedAt: isTime(raw.updatedAt) ? raw.updatedAt : messages[messages.length - 1].at,
    messages,
  }
}

/** A row of the backend's chat list (a whole chat is summed up instead). */
function readListedChat(raw: unknown): LumiConversationSummary | undefined {
  if (isObject(raw) && Array.isArray(raw.messages)) {
    const chat = readConversation(raw)
    return chat && toSummary(chat)
  }
  if (!isObject(raw) || typeof raw.id !== 'string' || !raw.id || !isTime(raw.updatedAt)) return undefined
  return {
    id: raw.id,
    title: typeof raw.title === 'string' ? clip(raw.title, TITLE_CHARS) : '',
    updatedAt: raw.updatedAt,
    preview: typeof raw.preview === 'string' ? clip(raw.preview, PREVIEW_CHARS) : '',
    messageCount: typeof raw.messageCount === 'number' && raw.messageCount >= 0 ? Math.floor(raw.messageCount) : 0,
  }
}

// ---------------------------------------------------------------------------
// This browser (guests). Storage can be blocked (private mode) or full, so
// every call is guarded: the chat keeps working without it.
// ---------------------------------------------------------------------------

/** The guest's saved chats, newest first; null when this browser won't let us read storage. */
export function readDeviceChats(now = Date.now()): LumiConversation[] | null {
  let saved: string | null
  try {
    saved = window.localStorage.getItem(DEVICE_KEY)
  } catch {
    return null
  }
  if (!saved) return []
  try {
    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []
    return pruneChats(parsed.map(readConversation).filter((chat): chat is LumiConversation => chat !== undefined), now)
  } catch {
    return [] // damaged: the next save replaces it
  }
}

/**
 * Saves the guest's chats in this browser. When storage is full, the oldest
 * chats are left out until the rest fit. False when nothing could be saved.
 */
export function writeDeviceChats(chats: LumiConversation[]): boolean {
  let kept = chats
  for (;;) {
    try {
      if (kept.length) window.localStorage.setItem(DEVICE_KEY, JSON.stringify(kept))
      else window.localStorage.removeItem(DEVICE_KEY)
      return true
    } catch {
      if (kept.length <= 1) return false
      kept = kept.slice(0, Math.ceil(kept.length / 2))
    }
  }
}

export function clearDeviceChats(): void {
  try {
    window.localStorage.removeItem(DEVICE_KEY)
  } catch {
    /* storage blocked: there was nothing saved */
  }
}

// ---------------------------------------------------------------------------
// The customer's account (backend). Answers are { success, data: … }.
// ---------------------------------------------------------------------------

const dataOf = (body: unknown): Record<string, unknown> => (isObject(body) && isObject(body.data) ? body.data : {})
const chatUrl = (id: string) => `/chat/conversations/${encodeURIComponent(id)}`

/** The customer's chats, newest first. Throws when the list can't be read, so the one on screen is kept. */
export async function fetchConversations(): Promise<LumiConversationSummary[]> {
  const response = await authApiClient.get<unknown>('/chat/conversations', { timeout: REQUEST_TIMEOUT_MS })
  const { conversations } = dataOf(response.data)
  if (!Array.isArray(conversations)) throw new Error('Unexpected chat list')
  return conversations.map(readListedChat).filter((chat): chat is LumiConversationSummary => chat !== undefined).sort(byNewest)
}

/** One of the customer's chats; null when it no longer exists (deleted on another device). */
export async function fetchConversation(id: string): Promise<LumiConversation | null> {
  try {
    const response = await authApiClient.get<unknown>(chatUrl(id), { timeout: REQUEST_TIMEOUT_MS })
    const chat = readConversation(dataOf(response.data).conversation)
    if (!chat) throw new Error('Unreadable chat')
    return chat
  } catch (error) {
    if (httpStatus(error) === 404) return null
    throw error
  }
}

/** The body of a save: the latest messages that fit the backend's size limit. */
export function saveBody(chat: LumiConversation): { title: string; messages: LumiMessage[]; createdAt: string } {
  let messages = chat.messages.slice(-MAX_MESSAGES)
  const body = () => ({ title: chat.title, messages, createdAt: chat.createdAt })
  const size = () => new TextEncoder().encode(JSON.stringify(body())).length
  while (messages.length > 1 && size() > MAX_SAVE_BYTES) messages = messages.slice(Math.ceil(messages.length / 10))
  return body()
}

/**
 * Lets a save finish while the page is closing (fetch keepalive). axios's
 * fetch adapter adds a User-Agent header, which some browsers would put in
 * the CORS preflight; the backend doesn't allow it, so it isn't sent.
 */
const KEEPALIVE = { adapter: 'fetch', fetchOptions: { keepalive: true }, headers: { 'User-Agent': false } } as const

/** Saves the whole chat (the backend creates or replaces it). */
export async function saveConversation(chat: LumiConversation, options: { keepalive?: boolean } = {}): Promise<void> {
  await authApiClient.put(chatUrl(chat.id), saveBody(chat), { timeout: REQUEST_TIMEOUT_MS, ...(options.keepalive ? KEEPALIVE : {}) })
}

/** Deletes one chat; one that is already gone counts as deleted. */
export async function deleteConversation(id: string): Promise<void> {
  try {
    await authApiClient.delete(chatUrl(id), { timeout: REQUEST_TIMEOUT_MS })
  } catch (error) {
    if (httpStatus(error) !== 404) throw error
  }
}

export async function deleteAllConversations(): Promise<void> {
  await authApiClient.delete('/chat/conversations', { timeout: REQUEST_TIMEOUT_MS })
}
