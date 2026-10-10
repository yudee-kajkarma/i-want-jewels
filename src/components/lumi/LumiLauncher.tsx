'use client'

import type { Ref } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { LumiAvatar } from './LumiAvatar'

type LumiLauncherProps = {
  open: boolean
  onToggle: () => void
  buttonRef: Ref<HTMLButtonElement>
}

/**
 * The button from the owner's mock: a dark "ASK LUMI" pill with Lumi's face
 * in its pink ring, centred at the bottom on phones and in the corner on
 * larger screens. While the panel is open (larger screens) it becomes a small
 * round button with a chevron that closes it; on phones the sheet covers it
 * and has its own.
 */
export function LumiLauncher({ open, onToggle, buttonRef }: LumiLauncherProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onToggle}
      aria-label={open ? t('close') : t('lumi.askLumi')}
      aria-expanded={open}
      className={cn(
        'group fixed bottom-[max(16px,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 rounded-full font-poppins outline-none',
        'sm:bottom-5 sm:left-auto sm:right-4 sm:translate-x-0 md:bottom-6 md:right-6',
        'focus-visible:ring-2 focus-visible:ring-[#e6297e] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        // On phones the open sheet covers the corner and has its own close button.
        open && 'max-sm:invisible',
      )}
    >
      {open ? (
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#141110] text-[#f6f1ee] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.55)] transition-colors duration-150 group-hover:bg-[#231e1d] motion-reduce:transition-none">
          <ChevronDown aria-hidden className="h-5 w-5" />
        </span>
      ) : (
        <span className="flex h-[52px] items-center gap-3 rounded-full bg-[#141110] py-1.5 pl-1.5 pr-5 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.6)] transition-colors duration-150 group-hover:bg-[#231e1d] motion-reduce:transition-none">
          <LumiAvatar size={40} />
          <span aria-hidden className="text-[12.5px] font-semibold uppercase tracking-[0.25em] text-white">
            {t('lumi.askLumi')}
          </span>
        </span>
      )}
    </button>
  )
}
