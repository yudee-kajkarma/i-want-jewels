'use client'

import { useEffect, useMemo, useState } from 'react'
import { AlertTriangle, MessageSquareText, Sparkles } from 'lucide-react'
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

function formatTicketDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

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
        <div key={index} className="animate-pulse rounded-[24px] border border-[#f0d7e7] bg-white p-5 shadow-[0_6px_18px_rgba(191,82,136,0.08)]">
          <div className="h-3 w-28 rounded-full bg-[#f2d7e7]" />
          <div className="mt-3 h-5 w-56 rounded-full bg-[#f4deeb]" />
          <div className="mt-3 flex gap-2">
            <div className="h-7 w-20 rounded-full bg-[#f1cee2]" />
            <div className="h-7 w-20 rounded-full bg-[#f4deeb]" />
          </div>
          <div className="mt-4 h-14 rounded-2xl bg-[#fbf1f7]" />
        </div>
      ))}
    </div>
  )
}

function TicketDetailShimmer() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-28 rounded-full bg-[#f2d7e7]" />
      <div className="h-8 w-2/3 rounded-full bg-[#f1cee2]" />
      <div className="h-24 rounded-[24px] bg-[#fbf1f7]" />
      <div className="h-24 rounded-[24px] bg-[#fbf1f7]" />
      <div className="h-36 rounded-[24px] bg-[#f7e6ef]" />
    </div>
  )
}

export default function AdminTicketsPage() {
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
      setError('Unable to load admin tickets right now.')
      toast.error('Unable to load admin tickets right now.')
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
      toast.error('Unable to load ticket details right now.')
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
      toast.success(`Ticket marked as ${nextStatus}.`)
      await refreshCurrentState()
    } catch {
      toast.error('Unable to update ticket status right now.')
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
      toast.success(`Priority changed to ${nextPriority}.`)
      await refreshCurrentState()
    } catch {
      toast.error('Unable to update ticket priority right now.')
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
      toast.success('Ticket escalated successfully.')
      await refreshCurrentState()
    } catch {
      toast.error('Unable to escalate ticket right now.')
    } finally {
      setActionLoading(null)
    }
  }

  async function handleReplySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedTicket || !replyMessage.trim()) {
      toast.error('Reply message is required.')
      return
    }

    setActionLoading('reply')

    try {
      await addAdminTicketMessage(selectedTicket.ticketId, { message: replyMessage.trim() })
      setReplyMessage('')
      toast.success('Reply sent successfully.')
      await refreshCurrentState()
    } catch {
      toast.error('Unable to send reply right now.')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7fc_0%,#fffdfb_36%,#ffffff_100%)] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="rounded-[34px] border border-[#f1cde2] bg-white/90 p-6 shadow-[0_22px_62px_rgba(191,82,136,0.14)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bf4f90]">Admin Support</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-[#3f1933]">Ticket Desk</h1>
            </div>
            <p className="text-sm text-[#6f4f65]">Review, reply, escalate, and resolve customer support threads from one panel.</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Open</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{ticketSummary.open}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff9fd] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Closed</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{ticketSummary.closed}</p>
            </div>
            <div className="rounded-2xl border border-[#f0d3e5] bg-[#fff6fb] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8d5574]">Escalated</p>
              <p className="mt-2 text-2xl font-extrabold text-[#4f2040]">{ticketSummary.escalated}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(['all', 'open', 'closed'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => void loadTickets(1, status, true)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${
                  statusFilter === status
                    ? 'border-[#cc4f8f] bg-[#cc4f8f] text-white'
                    : 'border-[#e8c5db] bg-white text-[#7a3a61] hover:bg-[#fff2fa]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {error ? <div className="mt-6 rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div> : null}

          <div className="mt-6 grid gap-6 xl:grid-cols-[420px_1fr]">
            <section className="rounded-[28px] border border-[#f0d7e7] bg-[#fffafd] p-4 shadow-[0_10px_30px_rgba(191,82,136,0.08)]">
              {isListLoading ? <TicketListShimmer /> : null}

              {!isListLoading && tickets.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-[#ebcade] bg-white px-5 py-10 text-center text-sm text-[#8a667b]">
                  No tickets found for this filter.
                </div>
              ) : null}

              {!isListLoading && tickets.length > 0 ? (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      type="button"
                      onClick={() => void loadTicketDetail(ticket.ticketId)}
                      className={`w-full rounded-[24px] border p-4 text-left transition ${
                        selectedTicketId === ticket.ticketId
                          ? 'border-[#cc4f8f] bg-[#fff0f8] shadow-[0_8px_24px_rgba(191,82,136,0.14)]'
                          : 'border-[#f0d7e7] bg-white hover:bg-[#fff7fb]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{ticket.ticketId}</p>
                          <h2 className="mt-2 text-base font-bold text-[#3f1933]">{ticket.subject}</h2>
                          <p className="mt-2 text-sm text-zinc-500">{ticket.category} · {ticket.messages.length} messages</p>
                        </div>
                        <Sparkles className="h-4 w-4 text-[#c65b96]" />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${getStatusClass(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${getPriorityClass(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        {ticket.isEscalated ? (
                          <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-rose-700">
                            escalated
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600">{ticket.messages[0]?.message ?? 'No message available.'}</p>
                    </button>
                  ))}
                </div>
              ) : null}

              {pagination ? (
                <div className="mt-6 border-t border-[#f0dbe8] pt-4">
                  <p className="text-sm text-zinc-500">
                    Page {pagination.currentPage} of {pagination.totalPages} · {pagination.totalRecords} total tickets
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

            <section className="rounded-[28px] border border-[#f0d7e7] bg-white p-6 shadow-[0_12px_34px_rgba(191,82,136,0.10)]">
              {isDetailLoading ? <TicketDetailShimmer /> : null}

              {!isDetailLoading && !selectedTicket ? (
                <div className="rounded-[24px] border border-dashed border-[#ebcade] bg-[#fff7fb] px-6 py-12 text-center text-sm text-[#8a667b]">
                  Select a ticket to review the conversation and manage support actions.
                </div>
              ) : null}

              {!isDetailLoading && selectedTicket ? (
                <>
                  <div className="flex flex-col gap-4 border-b border-[#f0dbe8] pb-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{selectedTicket.ticketId}</p>
                      <h2 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#3f1933]">{selectedTicket.subject}</h2>
                      <p className="mt-2 text-sm text-zinc-500">{selectedTicket.category} · updated {formatTicketDate(selectedTicket.updatedAt)}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getStatusClass(selectedTicket.status)}`}>
                        {selectedTicket.status}
                      </span>
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPriorityClass(selectedTicket.priority)}`}>
                        {selectedTicket.priority}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
                    <div className="space-y-4">
                      {selectedTicket.messages.map((message, index) => (
                        <article key={`${message.createdAt}-${index}`} className="rounded-[24px] border border-[#f0dbe8] bg-[#fffafd] p-5">
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

                    <aside className="space-y-4 rounded-[24px] border border-[#f0dbe8] bg-[#fff7fb] p-4">
                      <div className="rounded-[20px] border border-[#f0dbe8] bg-white p-4">
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a4a75]">Status</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={actionLoading === 'status' || selectedTicket.status === 'open'}
                            onClick={() => void handleStatusChange('open')}
                            className="rounded-full border border-[#e8c5db] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            Open
                          </button>
                          <button
                            type="button"
                            disabled={actionLoading === 'status' || selectedTicket.status === 'closed'}
                            onClick={() => void handleStatusChange('closed')}
                            className="rounded-full border border-[#e8c5db] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa] disabled:opacity-50"
                          >
                            Close
                          </button>
                        </div>
                      </div>

                      <div className="rounded-[20px] border border-[#f0dbe8] bg-white p-4">
                        <label className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a4a75]">
                          Priority
                          <select
                            value={selectedTicket.priority}
                            disabled={actionLoading === 'priority'}
                            onChange={(event) => void handlePriorityChange(event.target.value as TicketPriority)}
                            className="mt-3 h-11 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 text-sm text-[#3f1933] outline-none transition focus:border-[#cc4f8f]"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                          </select>
                        </label>
                      </div>

                      <div className="rounded-[20px] border border-[#f0dbe8] bg-white p-4">
                        <button
                          type="button"
                          disabled={actionLoading === 'escalate' || selectedTicket.isEscalated}
                          onClick={() => void handleEscalate()}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-50"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          {selectedTicket.isEscalated ? 'Escalated' : 'Escalate'}
                        </button>
                      </div>

                      <form className="rounded-[20px] border border-[#f0dbe8] bg-white p-4" onSubmit={(event) => void handleReplySubmit(event)}>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#9a4a75]">Reply</p>
                        <textarea
                          value={replyMessage}
                          onChange={(event) => setReplyMessage(event.target.value)}
                          rows={6}
                          className="mt-3 w-full rounded-2xl border border-[#e7bfd7] px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-[#cc4f8f]"
                          placeholder="We're checking with our delivery partner. Will update you shortly."
                        />
                        <button
                          type="submit"
                          disabled={actionLoading === 'reply'}
                          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78] disabled:opacity-50"
                        >
                          <MessageSquareText className="h-4 w-4" />
                          {actionLoading === 'reply' ? 'Sending...' : 'Send Reply'}
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