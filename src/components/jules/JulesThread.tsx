'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ChevronLeft, Clock, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { formatDate } from '../../utils/formatDate'
import { BlockList, isKnownBlock } from './blocks/BlockList'
import { withBold } from './blocks/richText'
import { JULES_OLD_CHAT_MS, type JulesChatApi, type JulesMessage } from './contract'
import { olderThan, shortAgo } from './dates'
import { useNow, useReducedMotion } from './hooks'
import { InlineConfirm } from './InlineConfirm'
import { JulesAvatar } from './JulesAvatar'
import { findJulesSuggestion, JULES_TOP_SUGGESTIONS } from './suggestions'
import { ThreadMenu } from './ThreadMenu'
import { CHIP, FOCUS_RING, ICON_BUTTON, SCROLL_FADE, WORDMARK } from './ui'

/** Starter questions offered in a new, empty chat. */
const STARTERS = JULES_TOP_SUGGESTIONS.slice(0, 4)
/** Further than this from the end, the "go to the latest message" button shows. */
const NEAR_END_PX = 120

type Receipt = 'sent' | 'seen'

type JulesThreadProps = {
  chat: JulesChatApi
  onBack: () => void
  onNewChat: () => void
  /** The panel's buttons (expand, close), at the end of the header. */
  controls: ReactNode
}

/**
 * One conversation, as in the owner's mock: Jules's messages on the left in
 * dark bubbles with "Jules · 2m" under each run, the visitor's on the right in
 * light bubbles with "Sent" under the last one until Jules answers ("Seen").
 * There is no typing indicator. Follow-up questions sit under Jules's last
 * answer, and answers from the backend can be marked helpful or not.
 * The shortcuts and the question box are drawn by the panel, under this.
 */
export function JulesThread({ chat, onBack, onNewChat, controls }: JulesThreadProps) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat' })
  const now = useNow()
  const reducedMotion = useReducedMotion()
  const listRef = useRef<HTMLDivElement>(null)
  const lastRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  /** The first scroll (opening a chat) jumps; later ones glide. */
  const jumped = useRef(false)
  const [nearEnd, setNearEnd] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const { busy, history } = chat
  const messages = chat.messages.filter((m) => m.from === 'you' || m.blocks.some(isKnownBlock))
  const last = messages[messages.length - 1]
  const lastYours = messages.findLastIndex((m) => m.from === 'you')
  const conversation = history.current
  const old = conversation ? olderThan(conversation.createdAt, now, JULES_OLD_CHAT_MS) : false
  const followUps = last?.from === 'jules' && !busy ? (last.followUps ?? []).filter((id) => findJulesSuggestion(id)) : []

  // Keep the newest message in view: the end of the chat, or the top of a long answer.
  const lastId = last?.id
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const behavior: ScrollBehavior = jumped.current && !reducedMotion ? 'smooth' : 'auto'
    jumped.current = true
    const answer = lastRef.current
    if (!busy && answer?.dataset.from === 'jules' && answer.offsetHeight > list.clientHeight * 0.7) {
      list.scrollTo({ top: answer.offsetTop - 12, behavior })
    } else {
      list.scrollTo({ top: list.scrollHeight, behavior })
    }
  }, [lastId, busy, reducedMotion])

  function onScroll() {
    const list = listRef.current
    if (list) setNearEnd(list.scrollHeight - list.scrollTop - list.clientHeight < NEAR_END_PX)
  }

  function goToEnd() {
    const list = listRef.current
    list?.scrollTo({ top: list.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  /** "Seen" once Jules has answered (also for chats saved before receipts existed), else "Sent" while waiting. */
  function receiptFor(message: JulesMessage, index: number): Receipt | undefined {
    if (message.status === 'seen' || messages.slice(index + 1).some((m) => m.from === 'jules')) return 'seen'
    return message.status === 'sent' ? 'sent' : undefined
  }

  function cancelDelete() {
    setDeleting(false)
    requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  async function deleteChat() {
    if (!conversation) return
    await history.remove(conversation.id)
    setDeleting(false)
    onBack()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col motion-safe:animate-jules-fade">
      <header
        data-jules-grab
        className="relative z-20 flex shrink-0 touch-none items-center gap-2.5 border-b border-white/[0.08] pb-3 pl-2 pr-3 pt-5 sm:pt-3"
      >
        <button type="button" onClick={onBack} aria-label={t('back')} className={cn(ICON_BUTTON, FOCUS_RING, 'h-8 w-8')}>
          <ChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        <JulesAvatar size={40} />
        <div className="min-w-0 flex-1">
          <h2 className={cn(WORDMARK, 'text-[14px] leading-tight')}>{t('jules.name')}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-[12px] leading-none text-[#a69d98]">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]" />
            <span className="truncate">{t('jules.roleOnline')}</span>
          </p>
        </div>
        <ThreadMenu
          buttonRef={menuButtonRef}
          busy={busy}
          canDelete={Boolean(conversation)}
          onNewChat={onNewChat}
          onDelete={() => setDeleting(true)}
        />
        {controls}
      </header>

      {deleting && conversation ? (
        <div className="shrink-0 border-b border-white/[0.08] px-3 py-2.5">
          <InlineConfirm question={t('jules.chats.deleteConfirm')} onConfirm={deleteChat} onCancel={cancelDelete} />
        </div>
      ) : null}

      <div className="relative min-h-0 flex-1">
        <div ref={listRef} onScroll={onScroll} role="log" className={cn('h-full overflow-y-auto overscroll-contain px-4 pb-4 pt-4', SCROLL_FADE)}>
          {old && conversation ? (
            <p className="mx-auto mb-4 flex max-w-[94%] items-start gap-2 rounded-xl border border-white/[0.08] bg-[#1e1a19] px-3 py-2 text-[12px] leading-snug text-[#a69d98]">
              <Clock aria-hidden className="mt-px h-3.5 w-3.5 shrink-0" />
              {t('jules.thread.oldChat', { date: formatDate(conversation.createdAt, i18n.language) })}
            </p>
          ) : null}

          {messages.length === 0 ? <Intro busy={busy} onPick={(id) => void chat.askSuggestion(id)} /> : null}

          {messages.map((message, i) => {
            const firstOfRun = messages[i - 1]?.from !== message.from
            const lastOfRun = messages[i + 1]?.from !== message.from
            return (
              <div
                key={message.id}
                ref={i === messages.length - 1 ? lastRef : undefined}
                data-from={message.from}
                className={cn(firstOfRun ? 'mt-5 first:mt-0' : 'mt-2', 'motion-safe:animate-jules-fade')}
              >
                {message.from === 'you' ? (
                  <YourMessage message={message} receipt={i === lastYours ? receiptFor(message, i) : undefined} />
                ) : (
                  <JulesMessageRow message={message} firstOfRun={firstOfRun} lastOfRun={lastOfRun} chat={chat} now={now} />
                )}
              </div>
            )
          })}

          {followUps.length ? (
            <div role="group" aria-label={t('jules.thread.followUps')} className="ml-9 mt-3 flex flex-wrap gap-2 motion-safe:animate-jules-fade">
              {followUps.map((id) => (
                <button key={id} type="button" onClick={() => void chat.askSuggestion(id)} className={cn(CHIP, FOCUS_RING)}>
                  {t(`jules.suggestions.${id}`)}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {!nearEnd ? (
          <button
            type="button"
            onClick={goToEnd}
            aria-label={t('jules.thread.scrollDown')}
            className={cn(
              FOCUS_RING,
              // In the corner, where it covers the least of a card (never its buttons' labels).
              'absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-[#282422] text-[#f6f1ee] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.7)] transition-colors hover:bg-[#322c2a] motion-safe:animate-jules-fade motion-reduce:transition-none',
            )}
          >
            <ArrowDown aria-hidden className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

/** The visitor's words, right-aligned in a light bubble. A library question shows in today's language. */
function YourMessage({ message, receipt }: { message: JulesMessage; receipt?: Receipt }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const suggestion = message.suggestion ? findJulesSuggestion(message.suggestion) : undefined
  const text = suggestion
    ? t(`jules.suggestions.${suggestion.id}`)
    : message.blocks.flatMap((block) => (block.type === 'text' ? [block.text] : [])).join('\n')

  return (
    <div className="flex flex-col items-end">
      <p className="max-w-[82%] whitespace-pre-line break-words rounded-[20px] rounded-br-[6px] bg-[#ebe5e1] px-3.5 py-2.5 text-[14px] leading-relaxed text-[#1b1715]">
        <span className="sr-only">{t('jules.thread.you')}: </span>
        {text}
      </p>
      {receipt ? <p className="mr-1 mt-1 text-[12px] text-[#a69d98]">{t(`jules.status.${receipt}`)}</p> : null}
    </div>
  )
}

type JulesMessageRowProps = {
  message: JulesMessage
  firstOfRun: boolean
  lastOfRun: boolean
  chat: JulesChatApi
  now: number
}

/** One of Jules's messages: the small avatar on the first of a run, "Jules · 2m" under the last, thumbs under answers. */
function JulesMessageRow({ message, firstOfRun, lastOfRun, chat, now }: JulesMessageRowProps) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat' })
  const rateable = Boolean(message.replyId)
  return (
    <div className="flex items-start gap-2">
      <span className="w-7 shrink-0">{firstOfRun ? <JulesAvatar size={28} /> : null}</span>
      <div className="min-w-0 flex-1">
        <span className="sr-only">{t('jules.name')}: </span>
        <BlockList messageId={message.id} blocks={message.blocks} actions={chat} first={firstOfRun} />
        {lastOfRun || rateable ? (
          <div className="mt-1 flex min-h-[28px] flex-wrap items-center gap-x-2 pl-1 text-[12px] text-[#a69d98]">
            {lastOfRun ? <span>{t('jules.meta', { time: shortAgo(message.at, i18n.language, now) })}</span> : null}
            {rateable ? <Feedback message={message} onRate={chat.sendFeedback} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Two small thumbs under an answer. The chosen one fills in and a "Thanks!"
 * shows; the visitor can still change their mind.
 */
function Feedback({ message, onRate }: { message: JulesMessage; onRate: JulesChatApi['sendFeedback'] }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules.feedback' })
  /** Shown at once, before the saved message catches up. */
  const [picked, setPicked] = useState<'up' | 'down' | null>(null)
  const chosen = picked ?? message.feedback

  function rate(helpful: boolean) {
    const choice = helpful ? 'up' : 'down'
    if (choice === chosen) return
    setPicked(choice)
    void onRate(message.id, helpful)
  }

  const thumb = (helpful: boolean) => {
    const on = chosen === (helpful ? 'up' : 'down')
    const Icon = helpful ? ThumbsUp : ThumbsDown
    return (
      <button
        type="button"
        onClick={() => rate(helpful)}
        aria-pressed={on}
        aria-label={t(helpful ? 'up' : 'down')}
        title={t(helpful ? 'up' : 'down')}
        className={cn(
          FOCUS_RING,
          'flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150 hover:bg-white/[0.06] hover:text-[#f6f1ee] motion-reduce:transition-none',
          on ? 'text-[#f6f1ee]' : 'text-[#a69d98]',
        )}
      >
        <Icon aria-hidden className="h-3.5 w-3.5" fill={on ? 'currentColor' : 'none'} />
      </button>
    )
  }

  return (
    <span role="group" aria-label={t('label')} className="inline-flex items-center">
      {thumb(true)}
      {thumb(false)}
      <span role="status" className="ml-1">
        {picked ? t('thanks') : ''}
      </span>
    </span>
  )
}

/** A new chat: Jules says hello and offers four popular questions. */
function Intro({ busy, onPick }: { busy: boolean; onPick: (id: string) => void }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  return (
    <div className="flex items-start gap-2 motion-safe:animate-jules-fade">
      <JulesAvatar size={28} />
      <div className="min-w-0 flex-1">
        <p className="inline-block max-w-full rounded-[20px] rounded-tl-[6px] bg-[#231e1d] px-3.5 py-2.5 text-[14px] leading-[1.6] text-[#f6f1ee]">
          {withBold(t('jules.thread.intro'))}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {STARTERS.map((suggestion) => (
            <li key={suggestion.id} className="max-w-full">
              <button type="button" disabled={busy} onClick={() => onPick(suggestion.id)} className={cn(CHIP, FOCUS_RING)}>
                {t(`jules.suggestions.${suggestion.id}`)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
