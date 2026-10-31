'use client'

import type { Ref } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { JulesAvatar } from './JulesAvatar'

type JulesLauncherProps = {
  open: boolean
  onToggle: () => void
  buttonRef: Ref<HTMLButtonElement>
  /** Its visible part (the pill, or the round close button): where Jules's opening and closing motion starts and ends. */
  faceRef: Ref<HTMLSpanElement>
  /** Hidden while its moving copy flies to or from the panel (motion.ts). */
  away: boolean
}

/**
 * The button from the owner's mock: a dark "ASK JULES" pill with Jules's face
 * in its pink ring, in the bottom-right corner on every screen size (lifted
 * above the sticky action bar on pages that have one, see MobileStickyActions). While the panel is open (larger screens) it becomes a small
 * round button with a chevron that closes it; on phones the sheet covers it
 * and has its own. Opening, the pill glides to the panel's send button and
 * the panel opens out of it (motion.ts).
 */
export function JulesLauncher({ open, onToggle, buttonRef, faceRef, away }: JulesLauncherProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      aria-label={open ? t('close') : t('jules.askJules')}
      aria-expanded={open}
      className={cn(
        'group fixed bottom-[max(max(16px,env(safe-area-inset-bottom)),calc(var(--sticky-actions-height,0px)+12px))] right-[max(16px,env(safe-area-inset-right))] z-50 rounded-full font-poppins outline-none',
        'sm:bottom-[max(20px,calc(var(--sticky-actions-height,0px)+12px))] sm:right-4 md:bottom-6 md:right-6',
        'focus-visible:ring-2 focus-visible:ring-[#e6297e] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        // On phones the open sheet covers the corner and has its own close button.
        open && 'max-sm:invisible',
        away && 'invisible',
      )}
    >
      {open ? (
        <span ref={faceRef} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#141110] text-[#f6f1ee] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.55)] transition-colors duration-150 group-hover:bg-[#231e1d] motion-safe:animate-jules-arrive motion-reduce:transition-none">
          <ChevronDown aria-hidden className="h-5 w-5" />
        </span>
      ) : (
        <span ref={faceRef} className="flex h-[52px] items-center gap-3 rounded-full bg-[#141110] py-1.5 pl-1.5 pr-5 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.6)] transition-colors duration-150 group-hover:bg-[#231e1d] motion-reduce:transition-none">
          {/* The face rolls like a wheel when the pill closes up or opens out (motion.ts). */}
          <span data-jules-wheel className="inline-flex shrink-0">
            <JulesAvatar size={40} />
          </span>
          <span aria-hidden data-jules-label className="text-[12.5px] font-semibold uppercase tracking-[0.25em] text-white">
            {t('jules.askJules')}
          </span>
        </span>
      )}
    </button>
  )
}
