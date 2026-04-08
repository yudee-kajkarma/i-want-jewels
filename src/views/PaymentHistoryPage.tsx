'use client'

import { useEffect, useState } from 'react'
import { Clock3, CreditCard, ReceiptText } from 'lucide-react'
import { Link } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { getPaymentHistory } from '../services/orderService'
import type { OrdersPagination, PaymentHistoryItem } from '../types/order'
import { formatIndianRupee } from '../utils/productUtils'

function formatPaymentDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function getPaymentStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'failed':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200'
  }
}

function getOrderStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case 'confirmed':
    case 'delivered':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-zinc-100 text-zinc-700 border-zinc-200'
  }
}

export default function PaymentHistoryPage() {
  const [payments, setPayments] = useState<PaymentHistoryItem[]>([])
  const [pagination, setPagination] = useState<OrdersPagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPaymentHistory() {
      setIsLoading(true)

      try {
        const response = await getPaymentHistory()

        setPayments(response.payments)
        setPagination(response.pagination)
        setError('')
      } catch {
        setPayments([])
        setPagination(null)
        setError('Unable to load payment history right now.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadPaymentHistory()
  }, [])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Payments</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">Your payment history</h1>
          </div>
          <p className="text-sm text-zinc-500">Review Stripe sessions, payment status, and linked orders in one list.</p>
        </div>

        <section className="mt-8 rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isLoading ? <p className="text-sm text-zinc-500">Loading payment history...</p> : null}
          {!isLoading && error ? <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-8 text-sm text-rose-700">{error}</div> : null}

          {!isLoading && !error && payments.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#dbc8b8] text-[#17110d]">
                <ReceiptText className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#17110d]">No payment history yet</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-500">Online payment attempts and completed payments will appear here after checkout.</p>
              <Link
                to="/products"
                className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
              >
                SHOP NOW
              </Link>
            </div>
          ) : null}

          {!isLoading && payments.length > 0 ? (
            <div className="space-y-5">
              {payments.map((payment) => (
                <article key={`${payment.orderId}-${payment.sessionId}`} className="rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{payment.orderNumber}</p>
                      <Link to={`/orders/${payment.orderId}`} className="mt-2 block text-xl font-bold text-[#17110d] transition hover:text-pink-500">
                        Payment for order {payment.orderNumber}
                      </Link>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-4 w-4" />
                          {formatPaymentDate(payment.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          {payment.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(payment.paymentStatus)}`}>
                        {payment.paymentStatus}
                      </span>
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(payment.orderStatus)}`}>
                        {payment.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-[22px] border border-[#efe1d5] bg-white p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Session ID</p>
                      <p className="mt-2 break-all text-sm text-zinc-600">{payment.sessionId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Transaction ID</p>
                      <p className="mt-2 break-all text-sm text-zinc-600">{payment.transactionId ?? 'Not available yet'}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>Amount {formatIndianRupee(payment.amount)}</span>
                    <div className="flex items-center gap-4">
                      <span>Updated {formatPaymentDate(payment.updatedAt)}</span>
                      <Link to={`/orders/${payment.orderId}`} className="font-bold text-[#17110d] transition hover:text-pink-500">
                        VIEW ORDER
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {pagination ? (
            <div className="mt-6 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500">
              Showing page {pagination.currentPage} of {pagination.totalPages} · {pagination.totalRecords} payment record{pagination.totalRecords === 1 ? '' : 's'}
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  )
}