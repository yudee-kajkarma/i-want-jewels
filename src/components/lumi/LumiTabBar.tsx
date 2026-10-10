'use client'

import { Compass, House, MessagesSquare, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { LumiTab } from './lumiView'

const TABS: Array<{ id: LumiTab; icon: LucideIcon }> = [
  { id: 'home', icon: House },
  { id: 'chats', icon: MessagesSquare },
  { id: 'explore', icon: Compass },
]

/** Home · Chats · Explore along the bottom: the chosen tab is white, with a small pink mark above it. */
export function LumiTabBar({ tab, onTab }: { tab: LumiTab; onTab: (tab: LumiTab) => void }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.lumi.tabs' })
  return (
    <nav aria-label={t('label')} className="flex shrink-0 border-t border-white/[0.08] px-2 pb-[env(safe-area-inset-bottom)]">
      {TABS.map(({ id, icon: Icon }) => {
        const active = tab === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTab(id)}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative flex flex-1 flex-col items-center gap-1 rounded-xl pb-2.5 pt-3 text-[11.5px] font-medium outline-none transition-colors duration-150 motion-reduce:transition-none',
              'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60',
              active ? 'text-[#f6f1ee]' : 'text-[#a69d98] hover:text-[#f6f1ee]',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute left-1/2 top-0 h-[2px] w-7 -translate-x-1/2 rounded-full bg-[#e6297e] transition-opacity duration-150 motion-reduce:transition-none',
                active ? 'opacity-100' : 'opacity-0',
              )}
            />
            <Icon aria-hidden className="h-5 w-5" strokeWidth={active ? 2.1 : 1.8} />
            {t(id)}
          </button>
        )
      })}
    </nav>
  )
}
