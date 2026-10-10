'use client'

import { useId, useState, type FormEvent } from 'react'
import { LoaderCircle, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useAuth } from '../../../context/AuthContext'
import { CARD, FOCUS_RING, INPUT, PRIMARY_BUTTON } from '../ui'
import { FormDone } from './FormDone'

/** Good enough to catch typos; the server checks properly. */
export const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const MIN_MESSAGE = 5
const MAX_MESSAGE = 2000

type MessageFormBlockProps = {
  messageId: string
  done?: boolean
  busy: boolean
  onSend: (messageId: string, input: { name: string; email: string; message: string }) => Promise<boolean>
}

/**
 * A message to the team: a support ticket for account holders, the contact
 * form for guests (who also give their name and email).
 */
export function MessageFormBlock({ messageId, done, busy, onSend }: MessageFormBlockProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const { isAuthenticated, session } = useAuth()
  const id = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')

  if (done || state === 'sent') return <FormDone text={t('lumi.forms.sent')} />

  const guest = !isAuthenticated
  const ready = message.trim().length >= MIN_MESSAGE && (!guest || (name.trim().length > 0 && looksLikeEmail(email)))

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!ready || state !== 'idle' || busy) return
    setState('sending')
    const sent = await onSend(messageId, {
      name: guest ? name.trim() : [session?.firstName, session?.lastName].filter(Boolean).join(' '),
      email: guest ? email.trim() : (session?.email ?? ''),
      message: message.trim(),
    }).catch(() => false)
    setState(sent ? 'sent' : 'idle')
  }

  return (
    <form
      onSubmit={submit}
      className={cn(CARD, 'flex flex-col gap-2 p-3.5')}
    >
      {guest ? (
        <>
          <label htmlFor={`${id}-name`} className="sr-only">
            {t('tools.name')}
          </label>
          <input
            id={`${id}-name`}
            className={INPUT}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('tools.name')}
            autoComplete="name"
            maxLength={100}
          />
          <label htmlFor={`${id}-email`} className="sr-only">
            {t('tools.email')}
          </label>
          <input
            id={`${id}-email`}
            className={INPUT}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t('tools.email')}
            maxLength={200}
          />
        </>
      ) : null}
      <label htmlFor={`${id}-message`} className="sr-only">
        {t('tools.message')}
      </label>
      <textarea
        id={`${id}-message`}
        className={cn(INPUT, 'min-h-[88px] resize-none leading-relaxed')}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={t('tools.message')}
        maxLength={MAX_MESSAGE}
        rows={3}
      />
      <button
        type="submit"
        disabled={!ready || state === 'sending' || busy}
        className={cn(PRIMARY_BUTTON, FOCUS_RING, 'mt-1 w-full py-2.5 text-[13px]')}
      >
        {state === 'sending' ? <LoaderCircle aria-hidden className="h-4 w-4 animate-spin motion-reduce:animate-none" /> : <Send aria-hidden className="h-4 w-4" />}
        {t('tools.sendMessage')}
      </button>
    </form>
  )
}
