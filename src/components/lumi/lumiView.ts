import type { LumiContextQuestion, LumiQuickAction } from './contract'

/** The three tabs at the bottom of Lumi's panel. */
export type LumiTab = 'home' | 'chats' | 'explore'

/** What the panel shows: a tab, or a conversation opened from it (Back returns to that tab). */
export type LumiView = { tab: LumiTab; thread: boolean }

/**
 * How a new chat starts: a typed question, a library question, a quick
 * action, a question about the product page being viewed, a product's
 * options to add it to the bag, the gift finder, or empty.
 */
export type LumiStart =
  | { kind: 'ask'; text: string }
  | { kind: 'suggestion'; id: string }
  | { kind: 'quick'; action: LumiQuickAction }
  | { kind: 'context'; question: LumiContextQuestion }
  | { kind: 'options'; slug: string }
  | { kind: 'giftFinder' }
  | { kind: 'blank' }

/** The panel's navigation, handed to each screen. */
export type LumiNav = {
  /** Starts a new chat and shows it. */
  start(start: LumiStart): void
  /** Shows a saved chat. */
  openChat(id: string): Promise<void>
  showTab(tab: LumiTab): void
  close(): void
}
