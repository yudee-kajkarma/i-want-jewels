'use client'

import { useId, useState, type ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { JULES_MAX_QUESTION } from './contract'
import type { JulesNav } from './julesView'
import { TabHeader } from './PanelHeader'
import { SuggestionList } from './SuggestionRow'
import { JULES_CATEGORIES, JULES_SUGGESTIONS, type JulesCategory } from './suggestions'
import { AS_TYPED, FOCUS_RING, NO_SCROLLBAR, PRIMARY_BUTTON, QUICK_CHIP, ROW_FADE, SCROLL_FADE, SECTION_LABEL } from './ui'

type Filter = JulesCategory | 'all'
const FILTERS: Filter[] = ['all', ...JULES_CATEGORIES]

/** Lower case without accents, so "cafe" finds "café" and "ROSE" finds "rosé". */
const fold = (text: string) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * Every question in Jules's library, by topic, with a search box. Tapping a
 * question starts a new chat with it; when nothing matches, the typed words
 * can be asked instead.
 */
export function JulesExplore({ nav, controls }: { nav: JulesNav; controls: ReactNode }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const searchId = useId()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const typed = query.trim()
  const words = fold(typed).split(/\s+/).filter(Boolean)
  const matches = JULES_SUGGESTIONS.filter((suggestion) => {
    if (filter !== 'all' && suggestion.category !== filter) return false
    if (!words.length) return true
    const text = fold(`${t(`jules.suggestions.${suggestion.id}`)} ${t(`jules.categories.${suggestion.category}`)}`)
    return words.every((word) => text.includes(word))
  })
  const groups = JULES_CATEGORIES.map((category) => ({
    category,
    suggestions: matches.filter((suggestion) => suggestion.category === category),
  })).filter((group) => group.suggestions.length)

  const ask = (id: string) => nav.start({ kind: 'suggestion', id })

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TabHeader title={t('jules.explore.title')} controls={controls} />

      {/* Search and topics stay put above the questions, which scroll on their own. */}
      <div className="shrink-0 border-b border-white/[0.06] px-4 pb-2.5 pt-3">
        <p className="px-1 pb-3 text-[13px] leading-relaxed text-[#a69d98]">{t('jules.explore.subtitle')}</p>
        <div className="relative">
          <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a69d98]" />
          <label htmlFor={searchId} className="sr-only">
            {t('jules.explore.search')}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              // Escape clears the search first; a second Escape closes Jules.
              if (event.key !== 'Escape' || !query) return
              event.preventDefault()
              setQuery('')
            }}
            placeholder={t('jules.explore.search')}
            maxLength={JULES_MAX_QUESTION}
            autoComplete="off"
            enterKeyHint="search"
            className="w-full rounded-full border border-white/[0.08] bg-[#231e1d] py-2.5 pl-10 pr-10 text-[16px] text-[#f6f1ee] outline-none transition-colors placeholder:text-[#a69d98] focus:border-white/25 sm:text-[13.5px] [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={t('jules.explore.clear')}
              className={cn(
                FOCUS_RING,
                'absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#a69d98] transition-colors hover:bg-white/[0.06] hover:text-[#f6f1ee]',
              )}
            >
              <X aria-hidden className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div role="group" aria-label={t('jules.explore.topics')} className={cn('-mx-4 mt-2.5 flex gap-1.5 overflow-x-auto px-4 py-1', NO_SCROLLBAR, ROW_FADE)}>
          {FILTERS.map((id) => {
            const active = filter === id
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(id)}
                className={cn(
                  QUICK_CHIP,
                  FOCUS_RING,
                  'py-1.5 text-[12.5px]',
                  active && 'border-transparent bg-[#ebe5e1] font-medium text-[#1b1715] hover:bg-[#ebe5e1]',
                )}
              >
                {id === 'all' ? t('jules.explore.all') : t(`jules.categories.${id}`)}
              </button>
            )
          })}
        </div>
      </div>

      <div data-jules-stagger className={cn('min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6', NO_SCROLLBAR, SCROLL_FADE)}>
        <div className="px-4 pt-4">
          {groups.length ? (
            groups.map((group) => (
              <div key={group.category} className="mb-5 last:mb-0">
                {filter === 'all' ? <h3 className={cn(SECTION_LABEL, 'mb-2 px-1')}>{t(`jules.categories.${group.category}`)}</h3> : null}
                <SuggestionList suggestions={group.suggestions} onPick={ask} />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center px-2 pt-6 text-center motion-safe:animate-jules-fade">
              <p className="text-[13.5px] text-[#a69d98]">{t('jules.explore.noResults')}</p>
              {typed ? (
                <button
                  type="button"
                  onClick={() => nav.start({ kind: 'ask', text: typed })}
                  className={cn(PRIMARY_BUTTON, FOCUS_RING, 'mt-4 max-w-full px-4 py-2.5 text-[13px]')}
                >
                  <span className="truncate">{t('jules.explore.askInstead', { q: typed, ...AS_TYPED })}</span>
                </button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
