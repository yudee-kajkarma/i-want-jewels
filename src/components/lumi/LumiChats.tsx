'use client'

import { useId, useRef, useState, type ReactNode } from 'react'
import { Cloud, LoaderCircle, Smartphone, SquarePen, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@/lib/router'
import { cn } from '@/lib/utils'
import { useAuth } from '../../context/AuthContext'
import type { LumiConversationSummary, LumiHistoryApi } from './contract'
import { clockTime, daysAgo, longDay } from './dates'
import { useNow } from './hooks'
import { InlineConfirm } from './InlineConfirm'
import { LumiAvatar } from './LumiAvatar'
import type { LumiNav } from './lumiView'
import { TabHeader } from './PanelHeader'
import { FOCUS_RING, ICON_BUTTON, PRIMARY_BUTTON, SCROLL_FADE_TOP, SECTION_LABEL } from './ui'

type DayGroup = { key: string; title: string; chats: LumiConversationSummary[] }

/** Today, Yesterday, then one group per date (chats arrive newest first). */
function groupByDay(
  chats: LumiConversationSummary[],
  now: number,
  language: string,
  words: { today: string; yesterday: string },
): DayGroup[] {
  const groups: DayGroup[] = []
  for (const chat of chats) {
    const days = daysAgo(chat.updatedAt, now)
    const key = String(days)
    const last = groups[groups.length - 1]
    if (last?.key === key) {
      last.chats.push(chat)
      continue
    }
    const title = days <= 0 ? words.today : days === 1 ? words.yesterday : longDay(chat.updatedAt, language, now)
    groups.push({ key, title, chats: [chat] })
  }
  return groups
}

type LumiChatsProps = {
  history: LumiHistoryApi
  nav: LumiNav
  /** The panel's buttons (expand, close), in the header. */
  controls: ReactNode
}

/**
 * The visitor's saved chats ("Messages"), like the reference: rows with
 * Lumi's avatar, the chat's title, the time and its last line, grouped by
 * day. Each can be deleted with a confirm right in the row, or all at once;
 * "Chat with Lumi" floats at the bottom. Where the chats are kept (this
 * device or the account) is noted quietly at the top.
 */
export function LumiChats({ history, nav, controls }: LumiChatsProps) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'chat' })
  const { isAuthenticated } = useAuth()
  const now = useNow()
  const [opening, setOpening] = useState<string | null>(null)
  const [clearing, setClearing] = useState(false)
  const clearRef = useRef<HTMLButtonElement>(null)

  const groups = groupByDay(history.conversations, now, i18n.language, {
    today: t('lumi.chats.today'),
    yesterday: t('lumi.chats.yesterday'),
  })
  const StoreIcon = history.store === 'account' ? Cloud : Smartphone

  async function open(id: string) {
    if (opening) return
    setOpening(id)
    try {
      await nav.openChat(id)
    } finally {
      setOpening(null)
    }
  }

  function stopClearing() {
    setClearing(false)
    requestAnimationFrame(() => clearRef.current?.focus())
  }

  async function clearAll() {
    await history.clearAll()
    setClearing(false)
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <TabHeader title={t('lumi.chats.title')} controls={controls} />

      <div className={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain pb-28', SCROLL_FADE_TOP)}>
        <div className="px-5 pb-1 pt-3 text-[12px] leading-snug text-[#a69d98]">
          <p className="flex items-center gap-1.5">
            <StoreIcon aria-hidden className="h-3.5 w-3.5 shrink-0" />
            {t(`lumi.chats.${history.store}`)}
          </p>
          {!isAuthenticated ? (
            // Under the note, in line with its words.
            <p className="mt-1 pl-5">
              {t('lumi.chats.loginHint')}{' '}
              <Link
                to="/login"
                className="rounded font-medium text-[#f6f1ee] underline decoration-white/30 underline-offset-2 hover:text-[#e6297e] hover:decoration-[#e6297e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                {t('logIn')}
              </Link>
            </p>
          ) : null}
        </div>

        {!history.ready ? (
          <ChatsSkeleton label={t('lumi.loading')} />
        ) : !groups.length ? (
          <div className="flex flex-col items-center px-6 pt-14 text-center motion-safe:animate-lumi-fade">
            <LumiAvatar size={56} />
            <p className="mt-4 text-[16px] font-semibold text-[#f6f1ee]">{t('lumi.chats.empty')}</p>
            <p className="mt-1 max-w-[270px] text-[13px] leading-relaxed text-[#a69d98]">{t('lumi.chats.emptySub')}</p>
          </div>
        ) : (
          <>
            {groups.map((group) => (
              <section key={group.key} aria-label={group.title} className="mt-4">
                <h3 className={cn(SECTION_LABEL, 'mb-1 px-5')}>{group.title}</h3>
                <ul>
                  {group.chats.map((chat) => (
                    <ChatRow
                      key={chat.id}
                      chat={chat}
                      time={clockTime(chat.updatedAt, i18n.language)}
                      opening={opening === chat.id}
                      onOpen={() => void open(chat.id)}
                      onDelete={() => history.remove(chat.id)}
                    />
                  ))}
                </ul>
              </section>
            ))}

            <div className="mt-5 px-4">
              {clearing ? (
                <InlineConfirm question={t('lumi.chats.clearConfirm')} onConfirm={clearAll} onCancel={stopClearing} />
              ) : (
                <button
                  ref={clearRef}
                  type="button"
                  onClick={() => setClearing(true)}
                  className={cn(
                    FOCUS_RING,
                    'mx-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] text-[#a69d98] transition-colors hover:bg-white/[0.05] hover:text-[#f6f1ee] motion-reduce:transition-none',
                  )}
                >
                  <Trash2 aria-hidden className="h-3.5 w-3.5" />
                  {t('lumi.chats.clearAll')}
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* "Chat with Lumi" floats over the end of the list, as in the reference. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-[linear-gradient(to_top,#141110_35%,rgba(20,17,16,0))] pb-4 pt-12">
        <button
          type="button"
          onClick={() => nav.start({ kind: 'blank' })}
          className={cn(PRIMARY_BUTTON, FOCUS_RING, 'pointer-events-auto px-5 py-3 text-[13.5px] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.8)]')}
        >
          <SquarePen aria-hidden className="h-4 w-4" />
          {t('teaserCta')}
        </button>
      </div>
    </div>
  )
}

type ChatRowProps = {
  chat: LumiConversationSummary
  time: string
  opening: boolean
  onOpen: () => void
  onDelete: () => Promise<void>
}

/** One saved chat: Lumi's avatar, the title, the time and the last line; a bin deletes it after a confirm. */
function ChatRow({ chat, time, opening, onOpen, onDelete }: ChatRowProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const [confirming, setConfirming] = useState(false)
  const binRef = useRef<HTMLButtonElement>(null)
  /** Names the chat each bin deletes, for screen readers. */
  const titleId = useId()

  function cancel() {
    setConfirming(false)
    requestAnimationFrame(() => binRef.current?.focus())
  }

  return (
    <li className="group/row">
      <div className="mx-2 flex items-center rounded-xl transition-colors duration-150 hover:bg-white/[0.03] motion-reduce:transition-none">
        <button
          type="button"
          onClick={onOpen}
          aria-busy={opening || undefined}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl py-3 pl-3 pr-1 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
        >
          <LumiAvatar size={44} />
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline gap-2">
              <span id={titleId} className="truncate text-[14px] font-medium text-[#f6f1ee]">
                {chat.title || t('lumi.chats.untitled')}
              </span>
              <span className="ml-auto flex shrink-0 items-center gap-1 text-[12px] tabular-nums text-[#a69d98]">
                {opening ? <LoaderCircle aria-hidden className="h-3 w-3 animate-spin motion-reduce:animate-none" /> : null}
                {time}
              </span>
            </span>
            {chat.preview ? <span className="mt-0.5 block truncate text-[13px] text-[#a69d98]">{chat.preview}</span> : null}
          </span>
        </button>
        <button
          ref={binRef}
          type="button"
          onClick={() => setConfirming(true)}
          aria-label={t('lumi.chats.delete')}
          aria-describedby={titleId}
          aria-expanded={confirming}
          className={cn(ICON_BUTTON, FOCUS_RING, 'mr-1 h-8 w-8 text-[#6f6763]')}
        >
          <Trash2 aria-hidden className="h-4 w-4" />
        </button>
      </div>
      {confirming ? (
        <div className="px-4 pb-2">
          <InlineConfirm question={t('lumi.chats.deleteConfirm')} onConfirm={onDelete} onCancel={cancel} />
        </div>
      ) : null}
      <div aria-hidden className="ml-[76px] mr-5 h-px bg-white/[0.06] group-last/row:hidden" />
    </li>
  )
}

/** Placeholder rows while the saved chats load. */
function ChatsSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className="mt-4 flex flex-col">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex items-center gap-3 px-5 py-3 motion-safe:animate-pulse">
          <div className="h-11 w-11 shrink-0 rounded-full bg-white/[0.06]" />
          <div className="min-w-0 flex-1">
            <div className="h-3 w-2/3 rounded-full bg-white/[0.08]" />
            <div className="mt-2.5 h-2.5 w-11/12 rounded-full bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  )
}
