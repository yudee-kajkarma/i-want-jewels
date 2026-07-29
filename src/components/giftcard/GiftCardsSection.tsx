'use client'

import { useEffect, useState } from 'react'
import {
  getMyGiftCards,
  getTransferredGiftCards,
  transferGiftCard,
  type MyGiftCard,
} from '../../services/giftCardService'
import RecipientEmailPicker from './RecipientEmailPicker'
import { useTranslation } from 'react-i18next'

type GiftCardTab = 'mine' | 'transferred'

type GiftCardsSectionProps = {
  /** Optional anchor id so other pages can scroll to this section. */
  id?: string
  /** When true, omits the heading/intro (caller renders its own). */
  hideHeading?: boolean
}

export default function GiftCardsSection({ id, hideHeading }: GiftCardsSectionProps) {
  const { t } = useTranslation('giftCardsSection')
  const [tab, setTab] = useState<GiftCardTab>('mine')
  const [cards, setCards] = useState<MyGiftCard[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [transferFor, setTransferFor] = useState<string | null>(null)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientEmailValid, setRecipientEmailValid] = useState(false)
  const [recipientName, setRecipientName] = useState('')
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)

  function load(activeTab: GiftCardTab = tab) {
    setStatus('loading')
    const request = activeTab === 'transferred' ? getTransferredGiftCards() : getMyGiftCards()
    request
      .then((data) => {
        setCards(data)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    load(tab)
    setTransferFor(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  function openTransfer(code: string) {
    setTransferFor(code)
    setRecipientEmail('')
    setRecipientEmailValid(false)
    setRecipientName('')
    setMessage('')
    setFeedback('')
  }

  async function submitTransfer(code: string) {
    if (!recipientEmail.trim()) {
      setFeedback(t('errorNoEmail'))
      return
    }
    if (!recipientEmailValid) {
      setFeedback(t('errorInvalidEmail'))
      return
    }
    setIsTransferring(true)
    setFeedback('')
    try {
      await transferGiftCard(code, {
        recipientEmail: recipientEmail.trim(),
        recipientName: recipientName.trim() || undefined,
        message: message.trim() || undefined,
      })
      setTransferFor(null)
      setFeedback('')
      load()
    } catch (error) {
      const msg =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ||
        t('errorTransferFailed')
      setFeedback(msg)
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <section id={id}>
      {!hideHeading ? (
        <>
          <h2 className="text-2xl font-bold text-[#17110d]">{t('title')}</h2>
          <p className="mt-2 text-sm text-zinc-500">
            {t('subtitle')}
          </p>
        </>
      ) : null}

      <div className="mt-5 inline-flex border border-[#e7d3c2]">
        <button
          type="button"
          onClick={() => setTab('mine')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
            tab === 'mine' ? 'bg-[#17110d] text-white' : 'bg-white text-[#7a3a61] hover:bg-[#fff2fa]'
          }`}
        >
          {t('tabMine')}
        </button>
        <button
          type="button"
          onClick={() => setTab('transferred')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
            tab === 'transferred' ? 'bg-[#17110d] text-white' : 'bg-white text-[#7a3a61] hover:bg-[#fff2fa]'
          }`}
        >
          {t('tabTransferred')}
        </button>
      </div>

      {status === 'loading' ? (
        <p className="mt-6 text-sm text-zinc-500">{t('loading')}</p>
      ) : status === 'error' ? (
        <p className="mt-6 text-sm text-rose-600">{t('error')}</p>
      ) : cards.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">
          {tab === 'transferred'
            ? t('emptyTransferred')
            : t('emptyMine')}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {cards.map((card) => {
            const canTransfer = tab === 'mine' && card.status === 'ACTIVE' && card.balance > 0
            const heldBy = card.currentOwnerEmail || card.recipientEmail
            const expiryInfo = (() => {
              if (!card.expiresAt) return { label: t('neverExpires'), tone: 'muted' as const }
              const expiry = new Date(card.expiresAt)
              const daysLeft = Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
              const formatted = expiry.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
              if (daysLeft <= 0) return { label: t('expiredOn', { date: formatted }), tone: 'expired' as const }
              if (daysLeft <= 7) {
                return { 
                  label: daysLeft === 1 ? t('expiresInDay', { date: formatted }) : t('expiresInDays', { days: daysLeft, date: formatted }), 
                  tone: 'urgent' as const 
                }
              }
              if (daysLeft <= 30) return { label: t('expiresOnDaysLeft', { date: formatted, days: daysLeft }), tone: 'warning' as const }
              return { label: t('expiresOn', { date: formatted }), tone: 'normal' as const }
            })()
            const expiryClass =
              expiryInfo.tone === 'urgent' || expiryInfo.tone === 'expired'
                ? 'text-rose-600 font-semibold'
                : expiryInfo.tone === 'warning'
                  ? 'text-amber-600'
                  : 'text-zinc-400'
            return (
              <div key={card.id} className="border border-[#efe1d5] bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold tracking-[2px] text-[#17110d]">{card.code}</p>
                    {tab === 'transferred' && heldBy ? (
                      <p className="mt-1 text-xs text-[#a53b79]">{t('nowWith', { email: heldBy })}</p>
                    ) : null}
                    {card.senderName ? (
                      <p className="mt-1 text-xs text-zinc-500">{t('fromSender', { name: card.senderName })}</p>
                    ) : null}
                    {card.createdAt ? (
                      <p className="mt-1 text-xs text-zinc-400">
                        {t('purchasedOn', { date: new Date(card.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) })}
                      </p>
                    ) : null}
                    <p className={`mt-1 text-xs ${expiryClass}`}>{expiryInfo.label}</p>
                    {card.message ? (
                      <p className="mt-1 text-sm italic text-zinc-600">&ldquo;{card.message}&rdquo;</p>
                    ) : null}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#1f7a4d]">€{card.balance.toFixed(2)}</p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                      {t('ofInitial', { amount: card.initialAmount.toFixed(2), status: card.status })}
                    </p>
                  </div>
                </div>

                {card.redemptions.length > 0 ? (
                  <p className="mt-3 text-xs text-zinc-500">{t('usedOnOrders', { count: card.redemptions.length })}</p>
                ) : null}

                {canTransfer ? (
                  transferFor === card.code ? (
                    <div className="mt-4 space-y-2 border-t border-[#efe1d5] pt-4">
                      <RecipientEmailPicker
                        value={recipientEmail}
                        onChange={(email, isValid) => {
                          setRecipientEmail(email)
                          setRecipientEmailValid(isValid)
                        }}
                        placeholder={t('recipientEmailPlaceholder')}
                        className="h-11 w-full border border-[#e7d3c2] px-3 text-sm outline-none focus:border-[#17110d]"
                      />
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(event) => setRecipientName(event.target.value)}
                        placeholder={t('recipientNamePlaceholder')}
                        className="h-11 w-full border border-[#e7d3c2] px-3 text-sm outline-none focus:border-[#17110d]"
                      />
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder={t('messagePlaceholder')}
                        className="min-h-[70px] w-full border border-[#e7d3c2] px-3 py-2 text-sm outline-none focus:border-[#17110d]"
                      />
                      {feedback ? <p className="text-xs text-rose-600">{feedback}</p> : null}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => void submitTransfer(card.code)}
                          disabled={isTransferring}
                          className="h-10 bg-[#17110d] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-50"
                        >
                          {isTransferring ? t('sending') : t('send')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setTransferFor(null)}
                          className="h-10 border border-[#e7d3c2] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a3a61]"
                        >
                          {t('cancel')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openTransfer(card.code)}
                      className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#a53b79] hover:underline"
                    >
                      {t('transferToFriend')}
                    </button>
                  )
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
