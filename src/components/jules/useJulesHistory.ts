'use client'

import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { useAuth } from '../../context/AuthContext'
import { httpStatus } from '../../services/chatService'
import {
  DEVICE_KEY,
  byNewest,
  clearDeviceChats,
  deleteAllConversations,
  deleteConversation,
  fetchConversation,
  fetchConversations,
  newJulesId,
  pruneChats,
  readDeviceChats,
  saveConversation,
  titleOf,
  toSummary,
  writeDeviceChats,
} from '../../services/julesHistoryService'
import { getStoredAuthSession } from '../../utils/authStorage'
import type { JulesConversation, JulesConversationSummary, JulesHistoryApi, JulesHistoryStore, JulesMessage } from './contract'

/**
 * Jules's chat history (JulesHistoryApi). Guests' chats are kept in this browser
 * and written after every change. Customers' chats are kept on their account:
 * a change is saved to the backend a moment later (one save for a question
 * and its answer), and at once when the chat closes or the page is hidden. If
 * the backend can't be reached, the chat keeps working from memory and the
 * save is retried quietly. Signing in or out switches to the other store and
 * starts a new chat; a save is only ever sent for the account that made it.
 *
 * The store is a plain object outside React (read with useSyncExternalStore),
 * so answers that arrive late still land in the chat they belong to.
 */

/** The history API plus what the chat controller needs to finish work after the visitor has moved on. */
export interface JulesHistoryControl extends JulesHistoryApi {
  /**
   * Adds a message to a chat (null: the current one, created if there is none).
   * A message from Jules also marks the visitor's messages before it "seen".
   * Returns the chat's id; null when that chat is gone.
   */
  addTo(chatId: string | null, message: JulesMessage): string | null
  /** Changes one message of a chat, whether or not it's on screen. */
  changeIn(chatId: string, messageId: string, change: (message: JulesMessage) => JulesMessage): void
  /** The chat on screen right now (`current` can be one render behind). */
  currentNow(): JulesConversation | null
}

const GUEST = 'guest'
const accountOwner = (email: string) => `account:${email.trim().toLowerCase()}`

/** Who is signed in right now, read from storage rather than React state, so a save never goes to someone else. */
function signedInOwner(): string {
  try {
    const session = getStoredAuthSession()
    return session ? accountOwner(session.email) : GUEST
  } catch {
    return GUEST
  }
}

/** A question and its answer usually arrive within this: one save for both. */
const SAVE_DELAY_MS = 800
/** Waits before trying a failed save again (then once a minute). */
const RETRY_MS = [2_000, 5_000, 15_000, 30_000, 60_000]
/** Opening the chat reads the account's list again once it is this old. */
const LIST_FRESH_MS = 30_000

type Snapshot = Pick<JulesHistoryApi, 'ready' | 'store' | 'conversations' | 'current'>
type Job = { kind: 'clear' } | { kind: 'delete'; id: string } | { kind: 'save'; chat: JulesConversation }

/** The backend refused it (bad request, not found, signed out): sending it again won't help. */
function lastingFailure(error: unknown): boolean {
  const status = httpStatus(error)
  return status !== undefined && status >= 400 && status < 500 && status !== 408 && status !== 429
}

const time = (iso: string) => Date.parse(iso) || 0

/**
 * Jules answering (or adding anything) means she has read what came before, as
 * in any messenger: the visitor's "Sent" turns to "Seen". This takes the place
 * of a typing indicator.
 */
const seen = (message: JulesMessage): JulesMessage =>
  message.from === 'you' && message.status === 'sent' ? { ...message, status: 'seen' } : message

/**
 * One owner's chats: a guest's on this device, or one account's. `owner` is
 * null until the login state is known; that store keeps chats in memory only.
 */
export class JulesChatHistory {
  readonly store: JulesHistoryStore
  private readonly owner: string | null
  /** Whole chats in memory: all of a guest's; the customer's opened and new ones. */
  private chats = new Map<string, JulesConversation>()
  /** The customer's list, as last read from the backend plus the changes made here. */
  private listed = new Map<string, JulesConversationSummary>()
  /** Chats that may have changed on another device since we read them: opening one reads it again. */
  private readonly stale = new Set<string>()
  private current: JulesConversation | null = null
  private ready = false
  private readonly initial: Snapshot
  private snapshot: Snapshot
  private readonly listeners = new Set<() => void>()
  private active = false
  /** Counts chat switches, so a slow open() can't replace a chat chosen after it. */
  private showing = 0
  /** False after a write to this browser's storage failed: our copies are then the only ones. */
  private deviceSaved = true
  private listing = false
  private listedAt = 0
  // What still has to reach the account, sent in this order: delete all, deletes, saves.
  private clearing = false
  private readonly deletes = new Set<string>()
  private readonly saves = new Map<string, JulesConversation>()
  /** When each chat was last saved, so a list read before that doesn't hide it. */
  private readonly savedAt = new Map<string, number>()
  private failures = 0
  private timer: ReturnType<typeof setTimeout> | undefined
  private sending: Promise<void> | undefined
  private sendAgain = false

  constructor(owner: string | null) {
    this.owner = owner
    this.store = owner !== null && owner !== GUEST ? 'account' : 'device'
    this.initial = { ready: false, store: this.store, conversations: [], current: null }
    this.snapshot = this.initial
  }

  // --- For React -------------------------------------------------------------

  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  getSnapshot = () => this.snapshot
  getServerSnapshot = () => this.initial

  private publish() {
    const summaries = this.store === 'device' ? [...this.chats.values()].map(toSummary) : [...this.listed.values()]
    this.snapshot = { ready: this.ready, store: this.store, conversations: summaries.sort(byNewest), current: this.current }
    this.listeners.forEach((listener) => listener())
  }

  // --- Lifecycle ---------------------------------------------------------------

  /** Listens for other tabs (guests), the network coming back and the page being hidden (customers). */
  start = () => {
    if (this.active || this.owner === null) return
    this.active = true
    window.addEventListener('storage', this.onStorage)
    window.addEventListener('online', this.onOnline)
    window.addEventListener('pagehide', this.onHide)
    document.addEventListener('visibilitychange', this.onVisibility)
    if (this.waiting()) this.schedule(0)
  }

  /** Stops listening and sends what is still waiting (the chat unmounted, or the visitor signed in or out). */
  stop = () => {
    if (!this.active) return
    this.active = false
    clearTimeout(this.timer)
    window.removeEventListener('storage', this.onStorage)
    window.removeEventListener('online', this.onOnline)
    window.removeEventListener('pagehide', this.onHide)
    document.removeEventListener('visibilitychange', this.onVisibility)
    void this.flush()
  }

  /** Reads the saved chats when the chat opens: the first time, and again later for other tabs and devices. */
  load = () => {
    if (this.owner === null) return
    if (this.store === 'account') {
      void this.refreshList()
      return
    }
    this.syncDevice()
    // The first read also writes back, so chats past the limits are really deleted, not just hidden.
    if (!this.ready) this.saveDevice()
    this.ready = true
    this.publish()
  }

  private onStorage = (event: StorageEvent) => {
    if (this.owner !== GUEST || !this.ready || (event.key !== null && event.key !== DEVICE_KEY)) return
    this.syncDevice()
    this.publish()
  }

  private onOnline = () => {
    if (this.waiting()) void this.flush()
  }

  private onHide = () => {
    if (this.waiting()) void this.flush({ keepalive: true })
  }

  private onVisibility = () => {
    if (document.visibilityState === 'hidden') this.onHide()
  }

  // --- JulesHistoryApi --------------------------------------------------------

  currentNow = () => this.current

  open = async (id: string): Promise<void> => {
    if (this.owner === null || this.current?.id === id) return
    const ticket = ++this.showing
    if (this.store === 'device') {
      if (!this.chats.has(id)) this.syncDevice() // another tab may have saved it
      this.current = this.chats.get(id) ?? this.current
      this.publish()
      return
    }
    const known = this.chats.get(id)
    // Our copy is the latest when it's unsaved, or nothing newer was seen on the backend.
    if (known && (!this.stale.has(id) || this.saves.has(id))) {
      this.current = known
      this.publish()
      return
    }
    try {
      const chat = await fetchConversation(id)
      if (ticket !== this.showing) return
      this.stale.delete(id)
      if (chat) {
        this.chats.set(id, chat)
        this.listed.set(id, toSummary(chat))
        this.current = chat
      } else {
        // Deleted on another device.
        this.chats.delete(id)
        this.listed.delete(id)
      }
      this.publish()
    } catch {
      // Offline or the server failed: show the copy we have, if any; tapping again retries.
      if (!known || ticket !== this.showing) return
      this.current = known
      this.publish()
    }
  }

  startNew = () => {
    this.showing += 1
    if (!this.current) return
    this.current = null
    this.publish()
  }

  append = (message: JulesMessage) => {
    this.addTo(null, message)
  }

  update = (messageId: string, change: (message: JulesMessage) => JulesMessage) => {
    if (this.current) this.changeIn(this.current.id, messageId, change)
  }

  remove = async (id: string): Promise<void> => {
    if (this.current?.id === id) {
      this.current = null
      this.showing += 1
    }
    this.syncDevice() // so the write below keeps what other tabs saved
    this.chats.delete(id)
    this.listed.delete(id)
    this.stale.delete(id)
    this.saves.delete(id)
    if (this.store === 'account') this.deletes.add(id)
    this.saveDevice()
    this.publish()
    await this.flush()
  }

  clearAll = async (): Promise<void> => {
    this.showing += 1
    this.current = null
    this.chats.clear()
    this.listed.clear()
    this.stale.clear()
    if (this.owner === GUEST) clearDeviceChats()
    if (this.store === 'account') {
      // Deleting everything covers the saves and deletes still waiting.
      this.saves.clear()
      this.deletes.clear()
      this.clearing = true
    }
    this.publish()
    await this.flush()
  }

  // --- For the chat controller --------------------------------------------------

  addTo = (chatId: string | null, message: JulesMessage): string | null => {
    const chat = chatId === null ? this.current : this.find(chatId)
    if (chatId !== null && !chat) return null // deleted, or it belonged to whoever signed out
    // Message ids are the screen's keys: never two alike in one chat.
    const added = chat?.messages.some((m) => m.id === message.id) ? { ...message, id: newJulesId() } : message
    const at = new Date().toISOString()
    // Saved together with the message: one write for both.
    const earlier = chat ? (added.from === 'jules' ? chat.messages.map(seen) : chat.messages) : []
    const next: JulesConversation = chat
      ? { ...chat, title: chat.title || titleOf(added), updatedAt: at, messages: [...earlier, added] }
      : { id: newJulesId(), title: titleOf(added), createdAt: at, updatedAt: at, messages: [added] }
    this.commit(next, !chat || chat.id === this.current?.id)
    return next.id
  }

  changeIn = (chatId: string, messageId: string, change: (message: JulesMessage) => JulesMessage) => {
    const chat = this.find(chatId)
    const index = chat ? chat.messages.findIndex((m) => m.id === messageId) : -1
    if (!chat || index < 0) return
    const changed = change(chat.messages[index])
    if (changed === chat.messages[index]) return
    const messages = [...chat.messages]
    messages[index] = { ...changed, id: messageId }
    this.commit({ ...chat, updatedAt: new Date().toISOString(), messages }, chat.id === this.current?.id)
  }

  // --- Keeping chats ---------------------------------------------------------

  private find(chatId: string): JulesConversation | null {
    return this.current?.id === chatId ? this.current : (this.chats.get(chatId) ?? null)
  }

  private commit(chat: JulesConversation, show: boolean) {
    this.chats.set(chat.id, chat)
    this.stale.delete(chat.id) // the save below makes ours the latest
    if (show) this.current = chat
    this.saveDevice()
    if (this.store === 'account') {
      this.listed.set(chat.id, toSummary(chat))
      this.saves.set(chat.id, chat)
      this.schedule(SAVE_DELAY_MS)
    }
    this.publish()
  }

  /** Writes the guest's chats to this browser, within the device limits. */
  private saveDevice() {
    if (this.owner !== GUEST) return
    const kept = pruneChats([...this.chats.values()])
    this.chats = new Map(kept.map((chat) => [chat.id, chat]))
    this.deviceSaved = writeDeviceChats(kept)
  }

  /** Takes in what other tabs saved, keeping our newer copies (and all of them, if our last write failed). */
  private syncDevice() {
    if (this.owner !== GUEST) return
    const stored = readDeviceChats()
    if (!stored) return // storage blocked: what's in memory is all there is
    const merged = new Map(stored.map((chat) => [chat.id, chat]))
    for (const chat of this.chats.values()) {
      const saved = merged.get(chat.id)
      if (saved ? time(chat.updatedAt) > time(saved.updatedAt) : !this.deviceSaved) merged.set(chat.id, chat)
    }
    this.chats = new Map(pruneChats([...merged.values()]).map((chat) => [chat.id, chat]))
    const shown = this.current
    const latest = shown ? this.chats.get(shown.id) : undefined
    if (shown && latest && time(latest.updatedAt) > time(shown.updatedAt)) this.current = latest
  }

  private async refreshList() {
    if (this.listing || (this.ready && Date.now() - this.listedAt < LIST_FRESH_MS)) return
    this.listing = true
    const startedAt = Date.now()
    try {
      this.applyList(await fetchConversations(), startedAt)
      this.listedAt = Date.now()
    } catch {
      // Keep the list we have; it is read again the next time the chat opens.
    } finally {
      this.listing = false
    }
    this.ready = true
    this.publish()
  }

  /** The backend's list, with what changed here since it was read laid over it. */
  private applyList(list: JulesConversationSummary[], startedAt: number) {
    const next = new Map<string, JulesConversationSummary>()
    if (!this.clearing) for (const chat of list) next.set(chat.id, chat)
    for (const id of this.deletes) next.delete(id)
    for (const [id, chat] of this.chats) {
      if (this.saves.has(id) || (this.savedAt.get(id) ?? 0) >= startedAt) next.set(id, toSummary(chat))
      // It may have changed on another device: read it again when it's opened. The copy
      // stays, so an answer still on its way can be added to it.
      else this.stale.add(id)
    }
    this.listed = next
  }

  // --- Sending to the account -------------------------------------------------

  private waiting() {
    return this.clearing || this.deletes.size > 0 || this.saves.size > 0
  }

  private schedule(ms: number) {
    clearTimeout(this.timer)
    this.timer = this.active ? setTimeout(() => void this.flush(), ms) : undefined
  }

  /** Sends every save and delete still waiting, in order. A failure is retried later, quietly. */
  flush = (options: { keepalive?: boolean } = {}): Promise<void> => {
    if (this.store !== 'account') return Promise.resolve()
    clearTimeout(this.timer)
    if (this.sending) {
      this.sendAgain = true
      return this.sending
    }
    this.sending = this.sendWaiting(options).finally(() => {
      this.sending = undefined
      if (this.sendAgain) {
        this.sendAgain = false
        void this.flush()
      }
    })
    return this.sending
  }

  private async sendWaiting(options: { keepalive?: boolean }) {
    for (let job = this.nextJob(); job; job = this.nextJob()) {
      // These chats are only ever saved to the account that made them.
      if (signedInOwner() !== this.owner) return
      try {
        await this.send(job, options)
        this.done(job)
      } catch (error) {
        if (lastingFailure(error)) {
          this.done(job)
          continue
        }
        this.failures += 1
        this.schedule(RETRY_MS[Math.min(this.failures, RETRY_MS.length) - 1])
        return
      }
    }
    this.failures = 0
  }

  private nextJob(): Job | undefined {
    if (this.clearing) return { kind: 'clear' }
    const id = this.deletes.values().next().value
    if (id !== undefined) return { kind: 'delete', id }
    const chat = this.saves.values().next().value
    return chat ? { kind: 'save', chat } : undefined
  }

  private send(job: Job, options: { keepalive?: boolean }): Promise<void> {
    if (job.kind === 'clear') return deleteAllConversations()
    if (job.kind === 'delete') return deleteConversation(job.id)
    return saveConversation(job.chat, options)
  }

  private done(job: Job) {
    if (job.kind === 'clear') this.clearing = false
    else if (job.kind === 'delete') this.deletes.delete(job.id)
    else {
      this.savedAt.set(job.chat.id, Date.now())
      // A newer version that arrived meanwhile stays waiting.
      if (this.saves.get(job.chat.id) === job.chat) this.saves.delete(job.chat.id)
    }
  }
}

/**
 * The chat history for whoever is visiting. One instance per chat widget (it
 * comes with useJulesChat). `open` is whether the chat panel is open: chats are
 * read when it opens, and waiting saves are sent when it closes.
 */
export function useJulesHistory({ open }: { open: boolean }): JulesHistoryControl {
  const { isAuthReady, session } = useAuth()
  const owner = !isAuthReady ? null : session ? accountOwner(session.email) : GUEST
  const history = useMemo(() => new JulesChatHistory(owner), [owner])
  const snapshot = useSyncExternalStore(history.subscribe, history.getSnapshot, history.getServerSnapshot)

  useEffect(() => {
    history.start()
    return history.stop
  }, [history])

  useEffect(() => {
    if (open) history.load()
    else void history.flush()
  }, [open, history])

  return useMemo(
    () => ({
      ...snapshot,
      open: history.open,
      startNew: history.startNew,
      append: history.append,
      update: history.update,
      remove: history.remove,
      clearAll: history.clearAll,
      addTo: history.addTo,
      changeIn: history.changeIn,
      currentNow: history.currentNow,
    }),
    [snapshot, history],
  )
}
