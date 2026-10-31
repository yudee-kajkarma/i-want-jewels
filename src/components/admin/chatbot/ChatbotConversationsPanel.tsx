'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Headset, LoaderCircle, MessagesSquare, Search, ThumbsDown, ThumbsUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@/lib/router'
import {
  apiErrorMessage,
  listConversations,
  CONVERSATION_FILTERS,
  type ChatCustomer,
  type ConversationFilter,
  type ConversationPage,
} from '../../../services/chatbotAdminService'
import { formatDateTime } from '../../../utils/formatDate'

/*
 * Admin → Chatbot → Conversations: what customers asked Jules, newest first,
 * 25 a page. Read only. Refreshes by itself every 15 seconds while open.
 */

const AS_TYPED = { interpolation: { escapeValue: false } } as const
const REFRESH_MS = 15_000
const SEARCH_DELAY_MS = 350

export function customerName(customer: ChatCustomer): string {
  return customer.kind === 'account' ? customer.name || customer.email || customer.id : customer.label
}

export default function ChatbotConversationsPanel() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.chatbot.conversations' })
  const [typed, setTyped] = useState('')
  const [q, setQ] = useState('')
  const [show, setShow] = useState<ConversationFilter>('all')
  const [page, setPage] = useState(1)
  const [data, setData] = useState<ConversationPage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const asked = useRef(0)

  // Wait until the admin stops typing before searching.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQ(typed.trim())
      setPage(1)
    }, SEARCH_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [typed])

  const load = useCallback(async (quiet: boolean) => {
    const ticket = ++asked.current
    if (!quiet) setIsLoading(true)
    try {
      const next = await listConversations({ q, show, page })
      if (ticket !== asked.current) return // a newer search answered first
      setData(next)
      setError('')
    } catch (failure) {
      if (ticket === asked.current && !quiet) setError(apiErrorMessage(failure, t('errorLoad')))
    } finally {
      if (ticket === asked.current) setIsLoading(false)
    }
  }, [q, show, page, t])

  useEffect(() => {
    void load(false)
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void load(true)
    }, REFRESH_MS)
    return () => window.clearInterval(timer)
  }, [load])

  const pages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1

  return (
    <section className="mt-8 border border-[#eadfd4] bg-white p-4 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
      <div className="flex items-center gap-2">
        <MessagesSquare className="h-4 w-4 text-[#8f2a60]" />
        <h2 className="text-lg font-bold text-[#17110d]">{t('title')}</h2>
        {isLoading && data ? <LoaderCircle className="h-4 w-4 animate-spin text-zinc-400" /> : null}
      </div>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">{t('hint')}</p>

      <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">{t('search')}</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            maxLength={100}
            placeholder={t('searchPlaceholder')}
            className="w-full border border-[#eadfd4] bg-[#fffdfa] py-3 pl-9 pr-4 text-sm text-[#17110d] outline-none focus:border-[#8f2a60]"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label={t('filterLabel')}>
          {CONVERSATION_FILTERS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={show === id}
              onClick={() => {
                setShow(id)
                setPage(1)
              }}
              className={`inline-flex items-center gap-1.5 border px-3 py-2 text-xs font-bold transition ${show === id ? 'border-[#17110d] bg-[#17110d] text-white' : 'border-[#eadfd4] bg-white text-zinc-700 hover:border-[#8f2a60]'}`}
            >
              {id === 'up' ? <ThumbsUp className="h-3.5 w-3.5" /> : id === 'down' ? <ThumbsDown className="h-3.5 w-3.5" /> : id === 'person' ? <Headset className="h-3.5 w-3.5" /> : null}
              {t(`filters.${id}`)}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="mt-6 text-sm text-red-700">{error}</p> : null}

      {!data && isLoading ? (
        <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          {t('loading')}
        </div>
      ) : null}

      {data && data.rows.length === 0 ? <p className="mt-6 text-sm text-zinc-600">{q || show !== 'all' ? t('noneFound') : t('none')}</p> : null}

      {data && data.rows.length > 0 ? (
        <ul className="mt-6 divide-y divide-[#f3ece4] border-y border-[#f3ece4]">
          {data.rows.map((row) => (
            <li key={row.key}>
              <Link
                to={`/admin/chatbot/conversations/${row.key}`}
                prefetch={false}
                className="flex flex-col gap-2 px-1 py-4 transition hover:bg-[#fffdfa] sm:flex-row sm:items-center sm:gap-6 sm:px-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-bold text-[#17110d]">{customerName(row.customer)}</span>
                    {row.customer.kind === 'account' && row.customer.email && row.customer.name ? (
                      <span className="truncate text-xs text-zinc-500">{row.customer.email}</span>
                    ) : null}
                    <span className="border border-[#eadfd4] px-1.5 text-[10px] font-bold uppercase text-zinc-500">{row.locale}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-700">{row.firstQuestion}</p>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-3 text-xs text-zinc-500 sm:justify-end">
                  <span>{t('questions', { count: row.questions, ...AS_TYPED })}</span>
                  {row.ups ? <span className="inline-flex items-center gap-1 text-emerald-700"><ThumbsUp className="h-3.5 w-3.5" />{row.ups}</span> : null}
                  {row.downs ? <span className="inline-flex items-center gap-1 text-red-700"><ThumbsDown className="h-3.5 w-3.5" />{row.downs}</span> : null}
                  {row.askedForPerson ? <span className="inline-flex items-center gap-1 text-[#8f2a60]"><Headset className="h-3.5 w-3.5" />{t('person')}</span> : null}
                  <time dateTime={row.lastAt} className="whitespace-nowrap">{formatDateTime(row.lastAt, i18n.language)}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {data && data.total > data.pageSize ? (
        <div className="mt-5 flex items-center justify-between gap-3 text-sm">
          <span className="text-zinc-500">{t('page', { page: data.page, pages, total: data.total, ...AS_TYPED })}</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1 || isLoading}
              aria-label={t('previous')}
              className="inline-flex items-center border border-[#eadfd4] p-2 text-[#17110d] transition hover:border-[#8f2a60] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(pages, current + 1))}
              disabled={page >= pages || isLoading}
              aria-label={t('next')}
              className="inline-flex items-center border border-[#eadfd4] p-2 text-[#17110d] transition hover:border-[#8f2a60] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}
