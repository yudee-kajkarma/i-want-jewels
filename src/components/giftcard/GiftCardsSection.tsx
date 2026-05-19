'use client'

import { useEffect, useState } from 'react'
import {
  getMyGiftCards,
  getTransferredGiftCards,
  transferGiftCard,
  type MyGiftCard,
} from '../../services/giftCardService'
import RecipientEmailPicker from './RecipientEmailPicker'

type GiftCardTab = 'mine' | 'transferred'

type GiftCardsSectionProps = {
  /** Optional anchor id so other pages can scroll to this section. */
  id?: string
  /** When true, omits the heading/intro (caller renders its own). */
  hideHeading?: boolean
}

export default function GiftCardsSection({ id, hideHeading }: GiftCardsSectionProps) {
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
      setFeedback('Enter the recipient email.')
      return
    }
    if (!recipientEmailValid) {
      setFeedback('Pick a recipient from the list — they must have a registered account.')
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
        'Unable to transfer this gift card.'
      setFeedback(msg)
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <section id={id}>
      {!hideHeading ? (
        <>
          <h2 className="text-2xl font-bold text-[#17110d]">My Gift Cards</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Gift cards linked to your email. Apply the code at checkout, or transfer a card to a friend.
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
          My Gift Cards
        </button>
        <button
          type="button"
          onClick={() => setTab('transferred')}
          className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
            tab === 'transferred' ? 'bg-[#17110d] text-white' : 'bg-white text-[#7a3a61] hover:bg-[#fff2fa]'
          }`}
        >
          Transferred
        </button>
      </div>

      {status === 'loading' ? (
        <p className="mt-6 text-sm text-zinc-500">Loading…</p>
      ) : status === 'error' ? (
        <p className="mt-6 text-sm text-rose-600">Unable to load your gift cards right now.</p>
      ) : cards.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">
          {tab === 'transferred'
            ? "You haven't transferred or gifted any cards yet."
            : "You don't have any gift cards yet."}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {cards.map((card) => {
            const canTransfer = tab === 'mine' && card.status === 'ACTIVE' && card.balance > 0
            const heldBy = card.currentOwnerEmail || card.recipientEmail
            return (
              <div key={card.id} className="border border-[#efe1d5] bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold tracking-[2px] text-[#17110d]">{card.code}</p>
                    {tab === 'transferred' && heldBy ? (
                      <p className="mt-1 text-xs text-[#a53b79]">Now with {heldBy}</p>
                    ) : null}
                    {card.senderName ? (
                      <p className="mt-1 text-xs text-zinc-500">From {card.senderName}</p>
                    ) : null}
                    {card.message ? (
                      <p className="mt-1 text-sm italic text-zinc-600">&ldquo;{card.message}&rdquo;</p>
                    ) : null}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#1f7a4d]">€{card.balance.toFixed(2)}</p>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">
                      of €{card.initialAmount.toFixed(2)} · {card.status}
                    </p>
                  </div>
                </div>

                {card.redemptions.length > 0 ? (
                  <p className="mt-3 text-xs text-zinc-500">Used on {card.redemptions.length} order(s).</p>
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
                        placeholder="Recipient email"
                        className="h-11 w-full border border-[#e7d3c2] px-3 text-sm outline-none focus:border-[#17110d]"
                      />
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(event) => setRecipientName(event.target.value)}
                        placeholder="Recipient name (optional)"
                        className="h-11 w-full border border-[#e7d3c2] px-3 text-sm outline-none focus:border-[#17110d]"
                      />
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Message (optional)"
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
                          {isTransferring ? 'Sending…' : 'Send'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setTransferFor(null)}
                          className="h-10 border border-[#e7d3c2] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a3a61]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openTransfer(card.code)}
                      className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#a53b79] hover:underline"
                    >
                      Transfer to a friend
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
