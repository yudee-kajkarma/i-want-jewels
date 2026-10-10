'use client'

import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { LumiAvatar } from './LumiAvatar'
import { useReducedMotion } from './hooks'
import { FOCUS_RING, ICON_BUTTON, PRIMARY_BUTTON, WORDMARK } from './ui'

/**
 * Lumi's hello: once per visit (browser tab session) a small dark card fades
 * in above the button, waits a few seconds (longer while the pointer rests on
 * it) and fades away again.
 */

/** Not drawn → drawn, still hidden → shown → fading away. */
type Phase = 'off' | 'mount' | 'in' | 'out'
/** The pointer has never been on the card, is on it now, or has just left. */
type Hover = 'never' | 'now' | 'left'

/** Shown once per visit, not on every page change. */
const GREETED_KEY = 'iwj-chat-greeted'
const DELAY_MS = 1200
const HOLD_MS = 9000
const HOLD_AFTER_HOVER_MS = 1500
const FADE_MS = 200

type LumiTeaserProps = {
  onOpen: () => void
  /** The visitor closed the card themselves: focus should return to the launcher. */
  onDismiss: () => void
}

export function LumiTeaser({ onOpen, onDismiss }: LumiTeaserProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('off')
  const [hover, setHover] = useState<Hover>('never')

  const close = useCallback(() => setPhase((p) => (p === 'off' ? 'off' : 'out')), [])

  // Appear once per visit, a moment after the page loads.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(GREETED_KEY)) return
    } catch {
      return // storage blocked: skip the hello rather than repeat it on every page
    }
    let frame = 0
    const start = window.setTimeout(() => {
      try {
        sessionStorage.setItem(GREETED_KEY, '1')
      } catch {
        /* ignore */
      }
      setPhase('mount')
      // Draw it hidden first, then let it fade in on the next frame.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setPhase('in'))
      })
    }, DELAY_MS)
    return () => {
      window.clearTimeout(start)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Wait, then fade away (never while the pointer is on it).
  useEffect(() => {
    if (phase !== 'in' || hover === 'now') return
    const id = window.setTimeout(close, hover === 'left' ? HOLD_AFTER_HOVER_MS : HOLD_MS)
    return () => window.clearTimeout(id)
  }, [phase, hover, close])

  // Remove it once the fade has played.
  useEffect(() => {
    if (phase !== 'out') return
    const id = window.setTimeout(() => setPhase('off'), reducedMotion ? 0 : FADE_MS)
    return () => window.clearTimeout(id)
  }, [phase, reducedMotion])

  if (phase === 'off') return null
  const visible = phase === 'in'

  return (
    <div
      role="status"
      onMouseEnter={() => setHover('now')}
      onMouseLeave={() => setHover('left')}
      className={cn(
        // Above the button: centred over it on phones, by the corner on larger screens.
        'fixed bottom-[calc(max(16px,env(safe-area-inset-bottom))+64px)] left-1/2 z-50 w-[min(300px,calc(100vw-2rem))] -translate-x-1/2 origin-bottom font-poppins',
        'sm:bottom-[84px] sm:left-auto sm:right-4 sm:translate-x-0 sm:origin-bottom-right md:bottom-[88px] md:right-6',
        'transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <div className="relative rounded-[20px] border border-white/[0.08] bg-[#141110]/[0.98] p-4 text-[#f6f1ee] shadow-[0_20px_50px_-18px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => {
            close()
            onDismiss()
          }}
          aria-label={t('lumi.dismiss')}
          className={cn(ICON_BUTTON, FOCUS_RING, 'absolute right-2 top-2 h-8 w-8')}
        >
          <X aria-hidden className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5 pr-8">
          <LumiAvatar size={36} />
          <div className="min-w-0">
            <p className={cn(WORDMARK, 'text-[12.5px] leading-tight')}>{t('lumi.name')}</p>
            <p className="mt-1 flex items-center gap-1.5 text-[11.5px] leading-none text-[#a69d98]">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]" />
              <span className="truncate">{t('lumi.stylistOnline')}</span>
            </p>
          </div>
        </div>

        <p className="mt-3 text-[14px] leading-relaxed">{t('teaser')}</p>

        <button type="button" onClick={onOpen} className={cn(PRIMARY_BUTTON, FOCUS_RING, 'mt-3.5 px-4 py-2 text-[13px]')}>
          {t('teaserCta')}
        </button>
      </div>
    </div>
  )
}
