'use client'

import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { JulesSuggestion } from './suggestions'
import { CARD } from './ui'

/** Rows sit inside a card, so their focus ring is drawn inside the row. */
const ROW_FOCUS = 'outline-none focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60'

/** A library question as a clean row; tapping it asks Jules. */
export function SuggestionRow({ suggestion, onPick }: { suggestion: JulesSuggestion; onPick: (id: string) => void }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  return (
    <button
      type="button"
      onClick={() => onPick(suggestion.id)}
      className={cn(ROW_FOCUS, 'group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-white/[0.03] motion-reduce:transition-none')}
    >
      <span className="min-w-0 flex-1 text-[13.5px] leading-snug text-[#f6f1ee]">{t(`jules.suggestions.${suggestion.id}`)}</span>
      <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-[#6f6763] transition-colors group-hover:text-[#a69d98] motion-reduce:transition-none" />
    </button>
  )
}

type SuggestionListProps = {
  suggestions: JulesSuggestion[]
  onPick: (id: string) => void
  /** Written inside the card, above the rows (Home's "Popular questions"). */
  title?: string
  /** A last row, e.g. "Browse all questions". */
  footer?: ReactNode
}

/** Questions as rows in one card, divided by hairlines. */
export function SuggestionList({ suggestions, onPick, title, footer }: SuggestionListProps) {
  return (
    <section aria-label={title} className={cn(CARD, 'overflow-hidden')}>
      {title ? <h3 className="px-4 pb-1 pt-3.5 text-[14px] font-semibold text-[#f6f1ee]">{title}</h3> : null}
      <ul className="divide-y divide-white/[0.06]">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <SuggestionRow suggestion={suggestion} onPick={onPick} />
          </li>
        ))}
      </ul>
      {footer}
    </section>
  )
}

/** The footer row of a SuggestionList: a quiet link-like button. */
export function ListFooterButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        ROW_FOCUS,
        'group flex w-full items-center justify-between gap-3 border-t border-white/[0.06] px-4 py-3 text-left text-[13px] text-[#a69d98] transition-colors duration-150 hover:bg-white/[0.03] hover:text-[#f6f1ee] motion-reduce:transition-none',
      )}
    >
      {children}
      <ChevronRight aria-hidden className="h-4 w-4 shrink-0 text-[#6f6763] transition-colors group-hover:text-[#a69d98] motion-reduce:transition-none" />
    </button>
  )
}
