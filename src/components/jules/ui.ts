/**
 * Jules's look in one place: the owner's calm, warm dark palette with a single
 * accent, the shop's pink. Every screen and block uses these, so the panel
 * reads as one quiet piece next to the website.
 *
 *   panel   #141110   surface #1e1a19   raised #231e1d   chip #282422
 *   text    #f6f1ee   muted   #a69d98   faint  #6f6763   hairline white/8%
 *   accent  #e6297e (hover #cf1f6e), only for the send button, a chosen size
 *           or colour, primary buttons, the active tab and the avatar ring.
 */

/** Keyboard focus: a soft white ring with a gap in the panel's colour, visible on every surface. */
export const FOCUS_RING =
  'outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141110]'

/** The same ring for things on a card, with the gap in the card's colour. */
export const CARD_FOCUS_RING =
  'outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1a19]'

/** A card on the panel. */
export const CARD = 'rounded-2xl border border-white/[0.08] bg-[#1e1a19]'

/** A card you can tap. */
export const CARD_BUTTON = `${CARD} transition-colors duration-150 hover:bg-[#231e1d] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#1e1a19] motion-reduce:transition-none`

/** The main action (Add to bag, Checkout): the shop's pink with white text. */
export const PRIMARY_BUTTON =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-[#e6297e] font-semibold text-white transition-colors duration-150 hover:bg-[#cf1f6e] disabled:cursor-not-allowed disabled:bg-[#2e2927] disabled:text-[#8a817c] motion-reduce:transition-none'

/** The action next to the main one (Buy now, View bag): outlined. */
export const OUTLINE_BUTTON =
  'inline-flex items-center justify-center gap-1.5 rounded-full border border-white/[0.16] font-medium text-[#f6f1ee] transition-colors duration-150 hover:border-white/30 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent motion-reduce:transition-none'

/** A light button on the dark panel (confirming a delete): clear without adding a colour. */
export const LIGHT_BUTTON =
  'inline-flex items-center justify-center gap-1.5 rounded-full bg-[#ebe5e1] font-semibold text-[#1b1715] transition-colors duration-150 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none'

/**
 * The round pink send button with a white arrow. It stays pink while the box
 * is empty (as in the owner's mock; it is then aria-disabled and does
 * nothing) and turns quiet only while Jules is answering (disabled).
 */
export const SEND_BUTTON =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e6297e] text-white transition-colors duration-150 hover:bg-[#cf1f6e] aria-disabled:cursor-default aria-disabled:hover:bg-[#e6297e] disabled:cursor-not-allowed disabled:bg-[#2e2927] disabled:text-[#8a817c] disabled:hover:bg-[#2e2927] motion-reduce:transition-none'

/** A quiet round icon button (back, close, menu, expand). */
export const ICON_BUTTON =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#a69d98] transition-colors duration-150 hover:bg-white/[0.06] hover:text-[#f6f1ee] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#a69d98] motion-reduce:transition-none'

/** Small capitals above a group of rows. */
export const SECTION_LABEL = 'text-[11px] font-medium uppercase tracking-[0.14em] text-[#a69d98]'

/** Text fields: 16px on phones so iOS doesn't zoom in, smaller from tablets up. */
export const INPUT =
  'w-full rounded-xl border border-white/[0.08] bg-[#231e1d] px-3.5 py-2.5 text-[16px] text-[#f6f1ee] outline-none transition-colors placeholder:text-[#a69d98] focus:border-white/25 disabled:opacity-60 sm:text-[13.5px]'

/** A question to tap (follow-ups, starters, gift-finder answers): outlined, as in the owner's mock. */
export const CHIP =
  'inline-flex max-w-full items-center rounded-full border border-white/[0.12] px-3.5 py-2 text-left text-[13px] leading-snug text-[#f6f1ee] transition-colors duration-150 hover:border-white/25 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-white/[0.12] disabled:hover:bg-transparent motion-reduce:transition-none'

/** A shortcut (above the question box, on a product's context card): filled. */
export const QUICK_CHIP =
  'inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#282422] px-3.5 py-[7px] text-[13px] leading-snug text-[#f6f1ee] transition-colors duration-150 hover:bg-[#322c2a] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-[#282422] motion-reduce:transition-none'

/** Where jewellery photos sit: a light tile, so they look as they do on the website. */
export const PHOTO_TILE = 'bg-[#f4efec]'

/** Jules's name: capitals, widely spaced, white. */
export const WORDMARK = 'font-semibold uppercase tracking-[0.25em] text-[#f6f1ee]'

/** Keeps a row scrollable but hides its scroll bar. */
export const NO_SCROLLBAR = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

/**
 * Soft edges for a scrolling list: what scrolls under the header or towards
 * the tab bar fades out instead of being cut by a hard line. The fades only
 * cover the list's own padding while it rests at the top or the end.
 */
export const SCROLL_FADE =
  '[mask-image:linear-gradient(to_bottom,transparent,#000_16px,#000_calc(100%_-_20px),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_16px,#000_calc(100%_-_20px),transparent)]'

/** A sliding row of cards: cards fade out at the sides instead of being cut (only the row's padding at rest). */
export const ROW_FADE =
  '[mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%_-_16px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%_-_16px),transparent)]'

/** Only the top edge fades (the list's end has its own floating button). */
export const SCROLL_FADE_TOP =
  '[mask-image:linear-gradient(to_bottom,transparent,#000_12px)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_12px)]'

/**
 * i18next HTML-escapes inserted values by default, which would show a typed
 * "&" as "&amp;". React already escapes everything it draws, so values that
 * people type (a name, a question) are passed through as typed.
 */
export const AS_TYPED = { interpolation: { escapeValue: false } } as const
