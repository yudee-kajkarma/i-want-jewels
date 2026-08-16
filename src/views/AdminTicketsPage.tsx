'use client'

import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, MessageSquareText, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { formatDateTime } from '../utils/formatDate'
import { toast } from 'react-hot-toast'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Pagination from '../components/sections/Pagination'
import {
  addAdminTicketMessage,
  escalateAdminTicket,
  getAdminTicketById,
  getAdminTickets,
  updateAdminTicketPriority,
  updateAdminTicketStatus,
} from '../services/ticketService'
import type { Ticket, TicketPriority, TicketsPagination, TicketStatus } from '../types/ticket'

function getStatusClass(status: TicketStatus) {
  return status === 'open'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : 'border-zinc-200 bg-zinc-100 text-zinc-700'
}

function getPriorityClass(priority: TicketPriority) {
  switch (priority) {
    case 'urgent':
      return 'border-rose-200 bg-rose-50 text-rose-700'
    case 'high':
      return 'border-orange-200 bg-orange-50 text-orange-700'
    case 'medium':
      return 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700'
    default:
      return 'border-sky-200 bg-sky-50 text-sky-700'
  }
}

function TicketListShimmer() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="animate-pulse border border-[#f0d7e7] bg-white p-5 shadow-[0_6px_18px_rgba(191,82,136,0.08)]">
          <div className="h-3 w-28 bg-[#f2d7e7]" />
          <div className="mt-3 h-5 w-56 bg-[#f4deeb]" />
          <div className="mt-3 flex gap-2">
            <div className="h-7 w-20 bg-[#f1cee2]" />
            <div className="h-7 w-20 bg-[#f4deeb]" />
          </div>
          <div className="mt-4 h-14 bg-[#fbf1f7]" />
        </div>
      ))}
    </div>
  )
}

function TicketDetailShimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-28 bg-[#f2d7e7]" />
      <div className="h-8 w-2/3 bg-[#f1cee2]" />
      <div className="h-24 bg-[#fbf1f7]" />
      <div className="h-24 bg-[#fbf1f7]" />
      <div className="h-36 bg-[#f7e6ef]" />
    </div>
  )
}

export default function AdminTicketsPage() {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'admin.tickets' })
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [pagination, setPagination] = useState<TicketsPagination | null>(null)
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedTicketId, setSelectedTicketId] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [isListLoading, setIsListLoading] = useState(true)
  const [isDetailLoading, setIsDetailLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    void loadTickets(1, statusFilter, true)
  }, [])

  const ticketSummary = useMemo(() => {
    return tickets.reduce(
      (accumulator, ticket) => {
        if (ticket.status === 'open') {
          accumulator.open += 1
        } else {
          accumulator.closed += 1
        }

        if (ticket.isEscalated) {
          accumulator.escalated += 1
        }

        return accumulator
      },
      { open: 0, closed: 0, escalated: 0 },
    )
  }, [tickets])

  async function loadTickets(page: number, status: TicketStatus | 'all', showLoader: boolean) {
    if (showLoader) {
      setIsListLoading(true)
    }

    try {
      const response = await getAdminTickets(status, page)
      setTickets(response.tickets)
      setPagination(response.pagination)
      setCurrentPage(page)
      setStatusFilter(status)
      setError('')

      const nextSelectedTicketId =
        selectedTicketId && response.tickets.some((ticket) => ticket.ticketId === selectedTicketId)
          ? selectedTicketId
          : response.tickets[0]?.ticketId ?? ''

      setSelectedTicketId(nextSelectedTicketId)

      if (nextSelectedTicketId) {
        await loadTicketDetail(nextSelectedTicketId)
      } else {
        setSelectedTicket(null)
      }
    } catch {
      setTickets([])
      setPagination(null)
      setSelectedTicket(null)
      setSelectedTicketId('')
      setError(t('errors.loadTickets'))
      toast.error(t('toast.loadTicketsError'))
    } finally {
      if (showLoader) {
        setIsListLoading(false)
      }
    }
  }

  async function loadTicketDetail(ticketId: string) {
    setIsDetailLoading(true)

    try {
      const response = await getAdminTicketById(ticketId)
      setSelectedTicket(response)
      setSelectedTicketId(ticketId)
    } catch {
      setSelectedTicket(null)
      toast.error(t('toast.loadDetailError'))
    } finally {
      setIsDetailLoading(false)
    }
  }

  async function refreshCurrentState() {
    await loadTickets(currentPage, statusFilter, false)
  }

  async function handleStatusChange(nextStatus: TicketStatus) {
    if (!selectedTicket) {
      return
    }

    setActionLoading('status')

    try {
      await updateAdminTicketStatus(selectedTicket.ticketId, { status: nextStatus })
      toast.success(t('toast.statusUpdated', { status: t(`status.${nextStatus}`) }))
      await refreshCurrentState()
    } catch {
      toast.error(t('toast.statusUpdateError'))
    } finally {
      setActionLoading(null)
    }
  }

  async function handlePriorityChange(nextPriority: TicketPriority) {
    if (!selectedTicket) {
      return
    }

    setActionLoading('priority')

    try {
      await updateAdminTicketPriority(selectedTicket.ticketId, { priority: nextPriority })
      toast.success(t('toast.priorityUpdated', { priority: t(`priority.${nextPriority}`) }))
      await refreshCurrentState()
    } catch {
      toast.error(t('toast.priorityUpdateError'))
    } finally {
      setActionLoading(null)
    }
  }

  async function handleEscalate() {
    if (!selectedTicket) {
      return
    }

    setActionLoading('escalate')

    try {
      await escalateAdminTicket(selectedTicket.ticketId)
      toast.success(t('toast.escalateSuccess'))
      await refreshCurrentState()
    } catch {
      toast.error(t('toast.escalateError'))
    } finally {
      setActionLoading(null)
    }
  }

  async function handleReplySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedTicket || !replyMessage.trim()) {
      toast.error(t('toast.replyRequired'))
      return
    }

    setActionLoading('reply')

    try {
      await addAdminTicketMessage(selectedTicket.ticketId, { message: replyMessage.trim() })
      setReplyMessage('')
      toast.success(t('toast.replySuccess'))
      await refreshCurrentState()
    } catch {
      toast.error(t('toast.replyError'))
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="font-poppins min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="border border-[#f1cde2] bg-white/90 p-6 shadow-[0_22px_62px_rgba(191,82,136,0.14)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf4f90]">{t('badge')}</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-[#3f1933]">{t('title')}</h1>
            </div>
            <p className="text-sm text-[#6f4f65]">{t('subtitle')}</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.open')}</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{ticketSummary.open}</p>
            </div>
            <div className="border border-[#f0d3e5] bg-[#fff9fd] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.closed')}</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{ticketSummary.closed}</p>
            </div>
            <div className="border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">{t('stats.escalated')}</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{ticketSummary.escalated}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(['all', 'open', 'closed'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => void loadTickets(1, status, true)}
                className={`border px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${
                  statusFilter === status
                    ? 'border-[#cc4f8f] bg-[#cc4f8f] text-white'
                    : 'border-[#e8c5db] bg-white text-[#7a3a61] hover:bg-[#fff2fa]'
                }`}
              >
                {t(`filters.${status}`)}
              </button>
            ))}
          </div>

          {error ? <div className="mt-6 border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div> : null}

          <div className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
            <section className="border border-[#f0d7e7] bg-[#fffafd] p-4 shadow-[0_10px_30px_rgba(191,82,136,0.08)]">
              {isListLoading ? <TicketListShimmer /> : null}

              {!isListLoading && tickets.length === 0 ? (
                <div className="border border-dashed border-[#ebcade] bg-white px-5 py-10 text-center text-sm text-[#8a667b]">
                  {t('empty.noTickets')}
                </div>
              ) : null}

              {!isListLoading && tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      type="button"
                      onClick={() => void loadTicketDetail(ticket.ticketId)}
                      className={`w-full border p-4 text-left transition ${
                        selectedTicketId === ticket.ticketId
                          ? 'border-[#cc4f8f] bg-[#fff0f8] shadow-[0_8px_24px_rgba(191,82,136,0.14)]'
                          : 'border-[#f0d7e7] bg-white hover:bg-[#fff7fb]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{ticket.ticketId}</p>
                          <h2 className="mt-2 text-base font-bold text-[#3f1933]">{ticket.subject}</h2>
                          <p className="mt-2 text-sm text-zinc-500">
                            {ticket.category} · {t('list.messagesCount', { count: ticket.messages.length })}
                          </p>
                        </div>
                        <Sparkles className="h-4 w-4 text-[#c65b96]" />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className={`inline-flex border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${getStatusClass(ticket.status)}`}>
                          {t(`status.${ticket.status}`)}
                        </span>
                        <span className={`inline-flex border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${getPriorityClass(ticket.priority)}`}>
                          {t(`priority.${ticket.priority}`)}
                        </span>
                        {ticket.isEscalated ? (
                          <span className="inline-flex border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-rose-700">
                            {t('list.escalated')}
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600">
                        {ticket.messages[0]?.message ?? t('list.noMessage')}
                      </p>
                    </button>
                  ))}
                </div>
              ) : null}

              {pagination ? (
                <div className="mt-6 border-t border-[#f0dbe8] pt-4">
                  <p className="text-sm text-zinc-500">
                    {t('list.pagination', {
                      current: pagination.currentPage,
                      total: pagination.totalPages,
                      records: pagination.totalRecords,
                    })}
                  </p>
                  <Pagination
                    pagination={pagination}
                    currentItemCount={tickets.length}
                    disabled={isListLoading || Boolean(actionLoading)}
                    onPageChange={(pageNumber) => {
                      void loadTickets(pageNumber, statusFilter, true)
                    }}
                  />
                </div>
              ) : null}
            </section>

            <section className="border border-[#f0d7e7] bg-white p-6 shadow-[0_12px_34px_rgba(191,82,136,0.10)]">
              {isDetailLoading ? <TicketDetailShimmer /> : null}

              {!isDetailLoading && !selectedTicket ? (
                <div className="border border-dashed border-[#ebcade] bg-[#fff7fb] px-6 py-12 text-center text-sm text-[#8a667b]">
                  {t('empty.selectTicket')}
                </div>
              ) : null}

              {!isDetailLoading && selectedTicket ? (
                <>
                  <div className="flex flex-col gap-4 border-b border-[#f0dbe8] pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{selectedTicket.ticketId}</p>
                      <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#3f1933]">{selectedTicket.subject}</h2>
                      <p className="mt-2 text-sm text-zinc-500">
                        {selectedTicket.category} · {t('detail.updated', { date: formatDateTime(selectedTicket.updatedAt, i18n.language) })}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getStatusClass(selectedTicket.status)}`}>
                        {t(`status.${selectedTicket.status}`)}
                      </span>
                      <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPriorityClass(selectedTicket.priority)}`}>
                        {t(`priority.${selectedTicket.priority}`)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
                    <div className="space-y-4">
                      {selectedTicket.messages.map((message, index) => (
                        <article key={`${message.createdAt}-${index}`} className="border border-[#f0dbe8] bg-[#fffafd] p-5">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{message.senderRole}</p>
                              <p className="mt-1 text-sm text-zinc-500">{message.sender}</p>
                            </div>
                            <p className="text-sm text-zinc-400">{formatDateTime(message.createdAt, i18n.language)}</p>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-zinc-600">{message.message}</p>
                        </article>
                      ))}
                    </div>

                    <aside className="space-y-4 border border-[#f0dbe8] bg-[#fff7fb] p-4">
                      <div className="border border-[#f0dbe8] bg-white p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a4a75]">{t('detail.status')}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={actionLoading === 'status' || selectedTicket.status === 'open'}
                            onClick={() => void handleStatusChange('open')}
                            className="border border-[#e8c5db] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            {t('detail.open')}
                          </button>
                          <button
                            type="button"
                            disabled={actionLoading === 'status' || selectedTicket.status === 'closed'}
                            onClick={() => void handleStatusChange('closed')}
                            className="border border-[#e8c5db] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            {t('detail.close')}
                          </button>
                        </div>
                      </div>

                      <div className="border border-[#f0dbe8] bg-white p-4">
                        <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a4a75]">
                          {t('detail.priority')}
                          <select
                            value={selectedTicket.priority}
                            disabled={actionLoading === 'priority'}
                            onChange={(event) => void handlePriorityChange(event.target.value as TicketPriority)}
                            className="mt-3 h-11 w-full border border-[#e7bfd7] bg-white px-4 text-sm text-[#3f1933] outline-none transition focus:border-[#cc4f8f]"
                          >
                            <option value="low">{t('detail.priorityLow')}</option>
                            <option value="medium">{t('detail.priorityMedium')}</option>
                            <option value="high">{t('detail.priorityHigh')}</option>
                            <option value="urgent">{t('detail.priorityUrgent')}</option>
                          </select>
                        </label>
                      </div>

                      <div className="border border-[#f0dbe8] bg-white p-4">
                        <button
                          type="button"
                          disabled={actionLoading === 'escalate' || selectedTicket.isEscalated}
                          onClick={() => void handleEscalate()}
                          className="inline-flex w-full items-center justify-center gap-2 bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-50"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          {selectedTicket.isEscalated ? t('detail.escalated') : t('detail.escalate')}
                        </button>
                      </div>

                      <form className="border border-[#f0dbe8] bg-white p-4" onSubmit={(event) => void handleReplySubmit(event)}>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a4a75]">{t('detail.reply')}</p>
                        <textarea
                          value={replyMessage}
                          onChange={(event) => setReplyMessage(event.target.value)}
                          rows={6}
                          className="mt-3 w-full border border-[#e7bfd7] px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-[#cc4f8f]"
                          placeholder={t('detail.replyPlaceholder')}
                        />
                        <button
                          type="submit"
                          disabled={actionLoading === 'reply'}
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-50"
                        >
                          <MessageSquareText className="h-4 w-4" />
                          {actionLoading === 'reply' ? t('detail.sending') : t('detail.sendReply')}
                        </button>
                      </form>
                    </aside>
                  </div>
                </>
              ) : null}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
