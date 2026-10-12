import type { JulesContextQuestion, JulesQuickAction } from './contract'

/** The three tabs at the bottom of Jules's panel. */
export type JulesTab = 'home' | 'chats' | 'explore'

/** What the panel shows: a tab, or a conversation opened from it (Back returns to that tab). */
export type JulesView = { tab: JulesTab; thread: boolean }

/**
 * How a new chat starts: a typed question, a library question, a quick
 * action, a question about the product page being viewed, a product's
 * options to add it to the bag, the gift finder, or empty.
 */
export type JulesStart =
  | { kind: 'ask'; text: string }
  | { kind: 'suggestion'; id: string }
  | { kind: 'quick'; action: JulesQuickAction }
  | { kind: 'context'; question: JulesContextQuestion }
  | { kind: 'options'; slug: string }
  | { kind: 'giftFinder' }
  | { kind: 'blank' }

/** The panel's navigation, handed to each screen. */
export type JulesNav = {
  /** Starts a new chat and shows it. */
  start(start: JulesStart): void
  /** Shows a saved chat. */
  openChat(id: string): Promise<void>
  showTab(tab: JulesTab): void
  close(): void
}
