'use client'

import type { ReactNode } from 'react'
import { ChevronDown, Maximize2, Minimize2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { FOCUS_RING, ICON_BUTTON } from './ui'

type PanelControlsProps = {
  expanded: boolean
  onExpand: () => void
  onClose: () => void
}

/**
 * The buttons at the top right of every screen: a larger or smaller panel
 * (large screens only) and close. On phones the sheet closes with a chevron
 * pointing down, the way it slides away.
 */
export function PanelControls({ expanded, onExpand, onClose }: PanelControlsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button
        type="button"
        onClick={onExpand}
        aria-pressed={expanded}
        aria-label={t('jules.expand')}
        title={t('jules.expand')}
        className={cn(ICON_BUTTON, FOCUS_RING, 'hidden md:flex')}
      >
        {expanded ? <Minimize2 aria-hidden className="h-4 w-4" /> : <Maximize2 aria-hidden className="h-4 w-4" />}
      </button>
      <button type="button" onClick={onClose} aria-label={t('close')} className={cn(ICON_BUTTON, FOCUS_RING)}>
        <ChevronDown aria-hidden className="h-5 w-5 sm:hidden" />
        <X aria-hidden className="hidden h-5 w-5 sm:block" />
      </button>
    </div>
  )
}

/**
 * The top of the Chats and Explore tabs: the title centred, the panel's
 * buttons on the right. Phones can pull the sheet down by it.
 */
export function TabHeader({ title, controls }: { title: string; controls: ReactNode }) {
  return (
    <header
      data-jules-grab
      className="grid shrink-0 touch-none grid-cols-[1fr_auto_1fr] items-center border-b border-white/[0.08] px-3 pb-2.5 pt-4 sm:pt-2.5"
    >
      <span aria-hidden />
      <h2 className="truncate px-2 text-center text-[16px] font-semibold text-[#f6f1ee]">{title}</h2>
      <div className="flex justify-end">{controls}</div>
    </header>
  )
}
