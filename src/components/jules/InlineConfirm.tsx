'use client'

import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { FOCUS_RING, LIGHT_BUTTON } from './ui'

type InlineConfirmProps = {
  question: string
  onConfirm: () => Promise<void>
  onCancel: () => void
}

/**
 * "Delete this chat?" asked right where the visitor tapped, instead of a
 * browser pop-up. Cancel gets the focus (the safe choice); Escape cancels.
 */
export function InlineConfirm({ question, onConfirm, onCancel }: InlineConfirmProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules.chats' })
  const [working, setWorking] = useState(false)

  async function confirm() {
    setWorking(true)
    try {
      await onConfirm()
    } catch {
      onCancel() // nothing was deleted; the row simply stays
    } finally {
      setWorking(false)
    }
  }

  return (
    <div
      role="group"
      aria-label={question}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        event.preventDefault() // the panel stays open
        onCancel()
      }}
      className="flex flex-wrap items-center gap-2 rounded-xl border border-white/[0.08] bg-[#231e1d] px-3 py-2.5 motion-safe:animate-jules-fade"
    >
      <p className="mr-auto text-[12.5px] font-medium leading-snug text-[#f6f1ee]">{question}</p>
      <div className="flex gap-1.5">
        <button
          type="button"
          autoFocus
          onClick={onCancel}
          disabled={working}
          className={cn(
            FOCUS_RING,
            'rounded-full px-3 py-1.5 text-[12.5px] font-medium text-[#a69d98] transition-colors hover:bg-white/[0.06] hover:text-[#f6f1ee] motion-reduce:transition-none',
          )}
        >
          {t('cancel')}
        </button>
        <button type="button" onClick={() => void confirm()} disabled={working} className={cn(LIGHT_BUTTON, FOCUS_RING, 'px-3.5 py-1.5 text-[12.5px]')}>
          {working ? <LoaderCircle aria-hidden className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" /> : null}
          {t('confirm')}
        </button>
      </div>
    </div>
  )
}
