'use client'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { createTicket, getTickets } from '../services/ticketService'
import type { CreateTicketPayload, Ticket, TicketsPagination } from '../types/ticket'
import { useTranslation } from 'react-i18next'
import { formatDateTime } from '../utils/formatDate'

const initialForm: CreateTicketPayload = {
  subject: '',
  category: 'delivery',
  priority: 'medium',
  message: '',
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

export default function TicketsPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [pagination, setPagination] = useState<TicketsPagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [submitFeedback, setSubmitFeedback] = useState('')
  const [form, setForm] = useState<CreateTicketPayload>(initialForm)

  async function loadTickets() {
    setIsLoading(true)

    try {
      const response = await getTickets()

      setTickets(response.tickets)
      setPagination(response.pagination)
      setError('')
    } catch {
      setTickets([])
      setPagination(null)
      setError(t('account.tickets.loadError'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadTickets()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.subject.trim() || !form.message.trim()) {
      setSubmitFeedback(t('account.tickets.submitRequired'))
      return
    }

    setIsSubmitting(true)
    setSubmitFeedback('')

    try {
      const createdTicket = await createTicket({
        subject: form.subject.trim(),
        category: form.category,
        priority: form.priority,
        message: form.message.trim(),
      })

      setForm(initialForm)
      setSubmitFeedback(t('account.tickets.submitSuccess'))
      await loadTickets()

      if (createdTicket?.ticketId) {
        navigate(`/tickets/${createdTicket.ticketId}`)
      }
    } catch {
      setSubmitFeedback(t('account.tickets.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('account.tickets.breadcrumb')}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">{t('account.tickets.title')}</h1>
          </div>
          <p className="text-sm text-zinc-500">{t('account.tickets.subtitle')}</p>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_420px]">
          <section className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            {isLoading ? <p className="text-sm text-zinc-500">{t('account.tickets.loading')}</p> : null}
            {!isLoading && error ? <div className="border border-rose-200 bg-rose-50 px-6 py-8 text-sm text-rose-700">{error}</div> : null}

            {!isLoading && !error && tickets.length === 0 ? (
              <div className="border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-[#17110d]">{t('account.tickets.emptyTitle')}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-500">{t('account.tickets.emptyDesc')}</p>
              </div>
            ) : null}

            {!isLoading && tickets.length > 0 ? (
              <div className="space-y-5">
                {tickets.map((ticket) => (
                  <article key={ticket.id} className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{ticket.ticketId}</p>
                        <Link to={`/tickets/${ticket.ticketId}`} className="mt-2 block text-xl font-bold text-[#17110d] transition hover:text-pink-500">
                          {ticket.subject}
                        </Link>
                        <p className="mt-2 text-sm text-zinc-500">{ticket.category} · {t('account.tickets.priority', { priority: ticket.priority })}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getStatusClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        {ticket.isEscalated ? (
                          <span className="inline-flex border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-rose-700">
                            {t('account.tickets.escalated')}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-2 text-sm leading-7 text-zinc-600">{ticket.messages[0]?.message ?? t('account.tickets.noMessage')}</p>

                    <div className="mt-4 flex flex-col gap-3 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                      <span>{t('account.tickets.messagesCount', { count: ticket.messages.length })}</span>
                      <span>{t('account.tickets.updated', { date: formatDateTime(ticket.updatedAt, i18n.language) })}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            {pagination ? (
              <div className="mt-6 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500">
                {t('account.tickets.showingPage', { current: pagination.currentPage, total: pagination.totalPages, records: pagination.totalRecords, count: pagination.totalRecords })}
              </div>
            ) : null}
          </section>

          <aside className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('account.tickets.createTitle')}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#17110d]">{t('account.tickets.createHeading')}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500">{t('account.tickets.createDesc')}</p>

            <form className="mt-6 grid gap-4" onSubmit={(event) => void handleSubmit(event)}>
              <label className="text-sm font-semibold text-[#17110d]">
                {t('account.tickets.subject')}
                <input
                  type="text"
                  value={form.subject}
                  onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
                  className="mt-2 h-12 w-full border border-[#dfd0c3] px-4 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
                  placeholder={t('account.tickets.subjectPlaceholder')}
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#17110d]">
                  {t('account.tickets.category')}
                  <select
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                    className="mt-2 h-12 w-full border border-[#dfd0c3] px-4 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
                  >
                    <option value="delivery">{t('account.tickets.categoryDelivery')}</option>
                    <option value="order">{t('account.tickets.categoryOrder')}</option>
                    <option value="payment">{t('account.tickets.categoryPayment')}</option>
                    <option value="product">{t('account.tickets.categoryProduct')}</option>
                    <option value="general">{t('account.tickets.categoryGeneral')}</option>
                  </select>
                </label>

                <label className="text-sm font-semibold text-[#17110d]">
                  {t('account.tickets.priorityLabel')}
                  <select
                    value={form.priority}
                    onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}
                    className="mt-2 h-12 w-full border border-[#dfd0c3] px-4 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
                  >
                    <option value="low">{t('account.tickets.priorityLow')}</option>
                    <option value="medium">{t('account.tickets.priorityMedium')}</option>
                    <option value="high">{t('account.tickets.priorityHigh')}</option>
                  </select>
                </label>
              </div>

              <label className="text-sm font-semibold text-[#17110d]">
                {t('account.tickets.message')}
                <textarea
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  rows={6}
                  className="mt-2 w-full border border-[#dfd0c3] px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
                  placeholder={t('account.tickets.messagePlaceholder')}
                />
              </label>

              {submitFeedback ? <p className="text-sm text-[#8b5f43]">{submitFeedback}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
              >
                {isSubmitting ? t('account.tickets.submitting') : t('account.tickets.submitTicket')}
              </button>
            </form>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}