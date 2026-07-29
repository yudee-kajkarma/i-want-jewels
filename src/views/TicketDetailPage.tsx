'use client'

import { useEffect, useState } from 'react'
import { Link, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { addTicketMessage, getTicketById } from '../services/ticketService'
import type { Ticket } from '../types/ticket'
import { useTranslation } from 'react-i18next'

function formatTicketDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function getStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case 'open':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'closed':
      return 'bg-zinc-100 text-zinc-700 border-zinc-200'
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200'
  }
}

export default function TicketDetailPage() {
  const { t } = useTranslation()
  const params = useParams<{ ticketId?: string | string[] }>()
  const ticketId = typeof params.ticketId === 'string' ? params.ticketId : ''
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reply, setReply] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [feedback, setFeedback] = useState('')

  async function loadTicket() {
    setIsLoading(true)

    try {
      const response = await getTicketById(ticketId)

      setTicket(response)
      setError('')
    } catch {
      setTicket(null)
      setError(t('account.ticketDetails.loadError'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!ticketId) {
      return
    }

    void loadTicket()
  }, [ticketId])

  async function handleReplySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!reply.trim()) {
      setFeedback(t('account.ticketDetails.replyRequired'))
      return
    }

    setIsSending(true)
    setFeedback('')

    try {
      await addTicketMessage(ticketId, { message: reply.trim() })
      setReply('')
      setFeedback(t('account.ticketDetails.sendSuccess'))
      await loadTicket()
    } catch {
      setFeedback(t('account.ticketDetails.sendError'))
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link to="/tickets" className="transition hover:text-zinc-900">{t('account.ticketDetails.breadcrumb')}</Link>
          {' / '}
          <span className="text-zinc-900">{ticketId}</span>
        </nav>

        {isLoading ? <p className="text-sm text-zinc-500">{t('account.ticketDetails.loading')}</p> : null}
        {!isLoading && error ? <div className="border border-rose-200 bg-rose-50 px-6 py-8 text-rose-700">{error}</div> : null}

        {!isLoading && ticket ? (
          <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
            <section className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <div className="flex flex-col gap-4 border-b border-[#efe1d5] pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{ticket.ticketId}</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#17110d]">{ticket.subject}</h1>
                  <p className="mt-3 text-sm text-zinc-500">{ticket.category} · {t('account.ticketDetails.priority', { priority: ticket.priority })}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  {ticket.isEscalated ? (
                    <span className="inline-flex border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-rose-700">
                      {t('account.ticketDetails.escalated')}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {ticket.messages.map((message, index) => (
                  <article key={`${message.createdAt}-${index}`} className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{message.senderRole}</p>
                        <p className="mt-1 text-sm text-zinc-500">{message.sender}</p>
                      </div>
                      <p className="text-sm text-zinc-400">{formatTicketDate(message.createdAt)}</p>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-zinc-600">{message.message}</p>
                  </article>
                ))}
              </div>
            </section>

            <aside className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('account.ticketDetails.replyLabel')}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#17110d]">{t('account.ticketDetails.sendMessage')}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-500">{t('account.ticketDetails.replyDesc')}</p>

              <form className="mt-6 grid gap-4" onSubmit={(event) => void handleReplySubmit(event)}>
                <label className="text-sm font-semibold text-[#17110d]">
                  {t('account.ticketDetails.message')}
                  <textarea
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    rows={8}
                    className="mt-2 w-full border border-[#dfd0c3] px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
                    placeholder={t('account.ticketDetails.replyPlaceholder')}
                  />
                </label>

                {feedback ? <p className="text-sm text-[#8b5f43]">{feedback}</p> : null}

                <button
                  type="submit"
                  disabled={isSending}
                  className="bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                >
                  {isSending ? t('account.ticketDetails.sending') : t('account.ticketDetails.sendReply')}
                </button>
              </form>

              <div className="mt-6 border-t border-[#efe1d5] pt-6 text-sm text-zinc-500">
                <p>{t('account.ticketDetails.created', { date: formatTicketDate(ticket.createdAt) })}</p>
                <p className="mt-2">{t('account.ticketDetails.lastUpdated', { date: formatTicketDate(ticket.updatedAt) })}</p>
              </div>
            </aside>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}