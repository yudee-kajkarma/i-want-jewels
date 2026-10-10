'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '../hooks'
import { FOCUS_RING, NO_SCROLLBAR, ROW_FADE } from '../ui'

type SnapRowProps = {
  children: ReactNode
  /** Arrows on larger screens (phones swipe). */
  arrows: boolean
  /** Where the arrows sit, to centre them on the pictures. */
  arrowTop: string
}

/**
 * A row of cards that slides sideways and snaps to each card. On larger
 * screens round arrows appear at the ends that still have more to show.
 */
export function SnapRow({ children, arrows, arrowTop }: SnapRowProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.tools' })
  const reducedMotion = useReducedMotion()
  const rowRef = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const row = rowRef.current
    if (!row) return
    const start = row.scrollLeft <= 4
    const end = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4
    setEdge((e) => (e.start === start && e.end === end ? e : { start, end }))
  }, [])

  // Measured when drawn and whenever the panel changes size.
  useEffect(() => {
    const row = rowRef.current
    if (!row || !arrows) return
    const observer = new ResizeObserver(measure)
    observer.observe(row)
    return () => observer.disconnect()
  }, [arrows, measure])

  const slide = (direction: 1 | -1) => {
    const row = rowRef.current
    row?.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const arrowClass = cn(
    FOCUS_RING,
    'absolute z-10 hidden h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-[#282422] text-[#f6f1ee] shadow-[0_8px_20px_-8px_rgba(0,0,0,0.7)] transition-colors hover:bg-[#322c2a] motion-reduce:transition-none sm:flex',
    'disabled:pointer-events-none disabled:opacity-0',
    arrowTop,
  )

  return (
    <div className="relative">
      <ul
        ref={rowRef}
        onScroll={arrows ? measure : undefined}
        // Room around the cards (taken back by negative margins) so their focus rings aren't cut off;
        // the row slides out to the panel's edges while the cards rest in line with the text.
        className={cn('-mx-4 -my-1 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 py-1', NO_SCROLLBAR, ROW_FADE)}
      >
        {children}
      </ul>
      {arrows ? (
        <>
          <button type="button" onClick={() => slide(-1)} disabled={edge.start} aria-label={t('previous')} className={cn(arrowClass, '-left-2')}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => slide(1)} disabled={edge.end} aria-label={t('next')} className={cn(arrowClass, '-right-2')}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      ) : null}
    </div>
  )
}
