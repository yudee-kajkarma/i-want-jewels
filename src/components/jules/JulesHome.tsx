'use client'

import { useId, useState, type FormEvent, type ReactNode } from 'react'
import { ArrowUp, CreditCard, Gift, Heart, ShoppingBag, Truck, UserRound, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { withBold } from './blocks/richText'
import { Thumb } from './blocks/ShopParts'
import {
  JULES_MAX_QUESTION,
  type JulesChatApi,
  type JulesContextQuestion,
  type JulesConversationSummary,
  type JulesPageContext,
} from './contract'
import { timeAgo } from './dates'
import { useNow } from './hooks'
import { JulesAvatar } from './JulesAvatar'
import type { JulesNav, JulesStart } from './julesView'
import { ListFooterButton, SuggestionList } from './SuggestionRow'
import { JULES_TOP_SUGGESTIONS } from './suggestions'
import { AS_TYPED, CARD, CARD_BUTTON, CARD_FOCUS_RING, FOCUS_RING, NO_SCROLLBAR, QUICK_CHIP, SCROLL_FADE, SECTION_LABEL, SEND_BUTTON } from './ui'

/** The quick help on Home, two to a row, with their labels (texts under chat.). */
const QUICK: Array<{ label: string; icon: LucideIcon; start: JulesStart }> = [
  { label: 'jules.actions.track', icon: Truck, start: { kind: 'quick', action: 'track' } },
  { label: 'jules.home.giftFinder', icon: Gift, start: { kind: 'giftFinder' } },
  { label: 'jules.home.bag', icon: ShoppingBag, start: { kind: 'quick', action: 'bag' } },
  { label: 'jules.home.wishlist', icon: Heart, start: { kind: 'quick', action: 'wishlist' } },
  { label: 'jules.actions.gifts', icon: CreditCard, start: { kind: 'quick', action: 'gifts' } },
  { label: 'jules.actions.person', icon: UserRound, start: { kind: 'quick', action: 'person' } },
]

const CONTEXT_QUESTIONS: JulesContextQuestion[] = ['pairs', 'size', 'stock']

type JulesHomeProps = {
  chat: JulesChatApi
  nav: JulesNav
  /** The signed-in customer's first name, for the hello. */
  firstName?: string
  /** The panel's buttons (expand, close), at the top right. */
  controls: ReactNode
}

/**
 * Jules's welcome screen, like the owner's references: a muted wash at the
 * top with the hello, then calm cards. The product being viewed (with
 * questions about it), the last chat to continue, a question box that
 * starts a new chat, quick help and the popular questions.
 */
export function JulesHome({ chat, nav, firstName, controls }: JulesHomeProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const inputId = useId()
  const [question, setQuestion] = useState('')
  const latest = chat.history.ready ? chat.history.conversations[0] : undefined

  function ask(event: FormEvent) {
    event.preventDefault()
    const text = question.trim()
    if (!text || chat.busy) return
    setQuestion('')
    nav.start({ kind: 'ask', text })
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      {/* A soft, muted wash at the top that fades into the panel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(180deg,#4a3c3e_0%,#3c3132_34%,#251f1e_68%,rgba(20,17,16,0)_100%)]"
      />

      <header data-jules-grab className="relative flex shrink-0 touch-none items-center justify-between gap-3 pb-1 pl-5 pr-3 pt-5 sm:pt-4">
        <JulesAvatar size={44} online />
        {controls}
      </header>

      <div data-jules-stagger className={cn('relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6', NO_SCROLLBAR, SCROLL_FADE)}>
        <h2 className="px-1 pb-7 pt-6 text-[26px] font-semibold leading-[1.22] tracking-[-0.01em] text-white">
          <span className="block break-words">
            {firstName ? t('jules.home.greetingName', { name: firstName, ...AS_TYPED }) : t('jules.home.greeting')}
          </span>
          <span className="block">{t('jules.home.help')}</span>
        </h2>

        <div className="flex flex-col gap-3">
          {chat.context ? <ContextCard context={chat.context} onStart={nav.start} /> : null}

          {latest ? <ContinueCard chat={latest} onOpen={() => void nav.openChat(latest.id)} /> : null}

          <form onSubmit={ask} className={cn(CARD, 'flex items-center gap-2 py-2 pl-4 pr-2 transition-colors duration-150 focus-within:border-white/20 motion-reduce:transition-none')}>
            <label htmlFor={inputId} className="sr-only">
              {t('jules.home.askPlaceholder')}
            </label>
            <input
              id={inputId}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={JULES_MAX_QUESTION}
              placeholder={t('jules.home.askPlaceholder')}
              enterKeyHint="send"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[16px] text-[#f6f1ee] outline-none placeholder:text-[#a69d98] sm:text-[14px]"
            />
            <button
              type="submit"
              disabled={chat.busy}
              aria-disabled={!question.trim() || undefined}
              aria-label={t('send')}
              className={cn(SEND_BUTTON, CARD_FOCUS_RING)}
            >
              <ArrowUp aria-hidden className="h-[18px] w-[18px]" strokeWidth={2.4} />
            </button>
          </form>

          <div className="pt-2">
            <h3 className={cn(SECTION_LABEL, 'mb-2 px-1')}>{t('jules.home.quickActions')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {QUICK.map(({ label, icon: Icon, start }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => nav.start(start)}
                  className={cn(CARD_BUTTON, FOCUS_RING, 'flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-left')}
                >
                  <Icon aria-hidden className="h-[18px] w-[18px] shrink-0 text-[#a69d98]" strokeWidth={1.8} />
                  <span className="min-w-0 text-[13px] font-medium leading-tight text-[#f6f1ee]">{t(label)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <SuggestionList
              title={t('jules.home.popular')}
              suggestions={JULES_TOP_SUGGESTIONS}
              onPick={(id) => nav.start({ kind: 'suggestion', id })}
              footer={<ListFooterButton onClick={() => nav.showTab('explore')}>{t('jules.home.exploreAll')}</ListFooterButton>}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/** On a product page: the piece being viewed, with one tap to add it or ask about it. */
function ContextCard({ context, onStart }: { context: JulesPageContext; onStart: (start: JulesStart) => void }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules.context' })
  const title = context.title?.trim()
  const viewing = title ? t('viewing', { title: `**${title}**`, ...AS_TYPED }) : t('viewing', { title: t('thisPiece') })
  return (
    <section aria-label={title ?? t('thisPiece')} className={cn(CARD, 'p-3.5')}>
      <div className="flex items-center gap-3">
        <Thumb src={context.image} sizes="48px" className="h-12 w-12" />
        <p className="min-w-0 flex-1 text-[13.5px] leading-snug text-[#a69d98] [&_strong]:font-medium [&_strong]:text-[#f6f1ee]">{withBold(viewing)}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => onStart({ kind: 'options', slug: context.slug })} className={cn(QUICK_CHIP, CARD_FOCUS_RING)}>
          <ShoppingBag aria-hidden className="h-3.5 w-3.5 text-[#a69d98]" />
          {t('chips.addToBag')}
        </button>
        {CONTEXT_QUESTIONS.map((question) => (
          <button key={question} type="button" onClick={() => onStart({ kind: 'context', question })} className={cn(QUICK_CHIP, CARD_FOCUS_RING)}>
            {t(`chips.${question}`)}
          </button>
        ))}
      </div>
    </section>
  )
}

/** The latest chat, as in the reference's "Recent message": Jules, how long ago, and the last line. */
function ContinueCard({ chat, onOpen }: { chat: JulesConversationSummary; onOpen: () => void }) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat' })
  const now = useNow()
  return (
    <button type="button" onClick={onOpen} className={cn(CARD_BUTTON, FOCUS_RING, 'block w-full p-4 text-left')}>
      <span className="block text-[14px] font-semibold text-[#f6f1ee]">{t('jules.home.continue')}</span>
      <span className="mt-3 flex items-center gap-3">
        <JulesAvatar size={40} />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-3">
            <span className="text-[14px] text-[#f6f1ee]">{t('jules.name')}</span>
            <span className="shrink-0 text-[12px] text-[#a69d98]">{timeAgo(chat.updatedAt, i18n.language, now)}</span>
          </span>
          <span className="mt-0.5 block truncate text-[13px] text-[#a69d98]">{chat.preview || chat.title || t('jules.chats.untitled')}</span>
        </span>
      </span>
    </button>
  )
}
