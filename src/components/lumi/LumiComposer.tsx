'use client'

import { useEffect, useId, useLayoutEffect, useRef, type FormEvent } from 'react'
import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { LUMI_INPUT_MAX_LINES, LUMI_MAX_QUESTION } from './contract'
import { FOCUS_RING, SEND_BUTTON } from './ui'

/** The counter shows once this few characters are left. */
const COUNTER_FROM = LUMI_MAX_QUESTION - 50

type LumiComposerProps = {
  value: string
  onChange: (value: string) => void
  onSend: (text: string) => void
  busy: boolean
  /** Bumped by the panel to put the cursor in the box. */
  focusRequest: number
}

/**
 * The question box under a conversation: one rounded field with the round
 * pink send button, as in the owner's mock. It grows with the text up to a
 * few lines, then scrolls. Enter sends, Shift+Enter starts a new line, and a
 * counter appears near the length limit.
 */
export function LumiComposer({ value, onChange, onSend, busy, focusRequest }: LumiComposerProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const boxRef = useRef<HTMLTextAreaElement>(null)
  const inputId = useId()
  const counterId = useId()
  const question = value.trim()
  const canSend = !busy && question.length > 0
  const nearLimit = value.length >= COUNTER_FROM

  useEffect(() => {
    if (focusRequest) boxRef.current?.focus({ preventScroll: true })
  }, [focusRequest])

  // Grow with the text, up to LUMI_INPUT_MAX_LINES lines, then scroll inside.
  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box) return
    const style = window.getComputedStyle(box)
    const line = parseFloat(style.lineHeight) || 22
    const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
    const max = line * LUMI_INPUT_MAX_LINES + padding
    box.style.height = 'auto'
    box.style.height = `${Math.min(box.scrollHeight, max)}px`
    box.style.overflowY = box.scrollHeight > max ? 'auto' : 'hidden'
  }, [value])

  function send(event?: FormEvent) {
    event?.preventDefault()
    if (canSend) onSend(question)
  }

  return (
    <form onSubmit={send} className="relative z-10 shrink-0 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-2">
      <div className="flex items-end gap-2 rounded-[26px] border border-white/[0.08] bg-[#231e1d] py-1.5 pl-[18px] pr-1.5 transition-colors duration-150 focus-within:border-white/20 motion-reduce:transition-none">
        <label htmlFor={inputId} className="sr-only">
          {t('placeholder')}
        </label>
        <textarea
          id={inputId}
          ref={boxRef}
          rows={1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            // Enter sends; Shift+Enter (or Enter while composing, e.g. Japanese input) does not.
            if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return
            event.preventDefault()
            send()
          }}
          maxLength={LUMI_MAX_QUESTION}
          placeholder={t('placeholder')}
          enterKeyHint="send"
          aria-describedby={nearLimit ? counterId : undefined}
          className="block min-w-0 flex-1 resize-none overflow-hidden bg-transparent py-2 text-[16px] leading-6 text-[#f6f1ee] outline-none placeholder:text-[#a69d98] sm:text-[14px] sm:leading-[22px]"
        />
        <button
          type="submit"
          disabled={busy}
          aria-disabled={!question || undefined}
          aria-label={t('send')}
          className={cn(SEND_BUTTON, FOCUS_RING, 'h-10 w-10 focus-visible:ring-offset-[#231e1d]')}
        >
          <ArrowUp aria-hidden className="h-[18px] w-[18px]" strokeWidth={2.4} />
        </button>
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-3 px-3">
        <p className="min-w-0 text-[11px] leading-snug text-[#8a817c]">{t('privacy')}</p>
        {nearLimit ? (
          <p
            id={counterId}
            className={cn(
              'shrink-0 text-[11px] font-medium tabular-nums',
              value.length >= LUMI_MAX_QUESTION ? 'text-[#f0b45a]' : 'text-[#a69d98]',
            )}
          >
            {t('lumi.thread.counter', { count: value.length, max: LUMI_MAX_QUESTION })}
          </p>
        ) : null}
      </div>
    </form>
  )
}
