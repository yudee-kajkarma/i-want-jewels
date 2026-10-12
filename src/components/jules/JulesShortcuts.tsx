'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { JulesChatApi } from './contract'
import { FOCUS_RING, NO_SCROLLBAR, QUICK_CHIP, ROW_FADE } from './ui'

type Shortcut = { id: 'giftIdeas' | 'track' | 'ringSize' | 'bag' | 'talk'; run: (chat: JulesChatApi) => void }

/** In the owner's order: the guided gift finder, orders, ring sizes, the bag and the team. */
const SHORTCUTS: Shortcut[] = [
  { id: 'giftIdeas', run: (chat) => chat.startGiftFinder() },
  { id: 'track', run: (chat) => void chat.quick('track') },
  { id: 'ringSize', run: (chat) => void chat.askSuggestion('ring-size') },
  { id: 'bag', run: (chat) => void chat.quick('bag') },
  { id: 'talk', run: (chat) => void chat.quick('person') },
]

/**
 * Shortcuts above the question box (Gift ideas · Track order · Ring size ·
 * My bag · Talk to us), in a row that scrolls sideways. Each continues the
 * chat on screen; they wait while Jules is answering.
 */
export function JulesShortcuts({ chat }: { chat: JulesChatApi }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules.chips' })
  return (
    <div role="group" aria-label={t('label')} className={cn('flex shrink-0 gap-2 overflow-x-auto px-4 pb-1 pt-2.5', NO_SCROLLBAR, ROW_FADE)}>
      {SHORTCUTS.map(({ id, run }) => (
        <button key={id} type="button" disabled={chat.busy} onClick={() => run(chat)} className={cn(QUICK_CHIP, FOCUS_RING)}>
          {t(id)}
        </button>
      ))}
    </div>
  )
}
