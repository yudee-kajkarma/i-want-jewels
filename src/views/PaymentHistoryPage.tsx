'use client'

import { useEffect, useState } from 'react'
import { Clock3, CreditCard, ReceiptText } from 'lucide-react'
import { Link } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { getPaymentHistory } from '../services/orderService'
import type { OrdersPagination, PaymentHistoryItem } from '../types/order'
import { formatPrice, isoToCurrencyCode } from '../utils/price'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
        setError(t('account.paymentHistory.loadError'))
      } finally {
        setIsLoading(false)
      }
    }

    void loadPaymentHistory()
  }, [])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('account.paymentHistory.breadcrumb')}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">{t('account.paymentHistory.title')}</h1>
          </div>
          <p className="text-sm text-zinc-500">{t('account.paymentHistory.subtitle')}</p>
        </div>

        <section className="mt-8 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isLoading ? <p className="text-sm text-zinc-500">{t('account.paymentHistory.loading')}</p> : null}
          {!isLoading && error ? <div className="border border-rose-200 bg-rose-50 px-6 py-8 text-sm text-rose-700">{error}</div> : null}

          {!isLoading && !error && payments.length === 0 ? (
            <div className="border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#dbc8b8] text-[#17110d]">
                <ReceiptText className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#17110d]">{t('account.paymentHistory.emptyTitle')}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-500">{t('account.paymentHistory.emptyDesc')}</p>
              <Link
                to="/products"
                className="mt-6 inline-flex bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
              >
                {t('account.paymentHistory.shopNow')}
              </Link>
            </div>
          ) : null}

          {!isLoading && payments.length > 0 ? (
            <div className="space-y-5">
              {payments.map((payment) => {
                const paymentCurrency = isoToCurrencyCode(payment.currency) ?? 'eur'

                return (
                <article key={`${payment.orderId}-${payment.sessionId}`} className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{payment.orderNumber}</p>
                      <Link to={`/orders/${payment.orderId}`} className="mt-2 block text-xl font-bold text-[#17110d] transition hover:text-pink-500">
                        {t('account.paymentHistory.paymentForOrder', { orderNumber: payment.orderNumber })}
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
                      <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(payment.paymentStatus)}`}>
                        {payment.paymentStatus}
                      </span>
                      <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(payment.orderStatus)}`}>
                        {payment.orderStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 border border-[#efe1d5] bg-white p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{t('account.paymentHistory.sessionId')}</p>
                      <p className="mt-2 break-all text-sm text-zinc-600">{payment.sessionId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{t('account.paymentHistory.transactionId')}</p>
                      <p className="mt-2 break-all text-sm text-zinc-600">{payment.transactionId ?? t('account.paymentHistory.notAvailableYet')}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>{t('account.paymentHistory.amount', { price: formatPrice(payment.amount, paymentCurrency) })}</span>
                    <div className="flex items-center gap-4">
                      <span>{t('account.paymentHistory.updated', { date: formatPaymentDate(payment.updatedAt) })}</span>
                      <Link to={`/orders/${payment.orderId}`} className="font-bold text-[#17110d] transition hover:text-pink-500">
                        {t('account.paymentHistory.viewOrder')}
                      </Link>
                    </div>
                  </div>
                </article>
                )
              })}
            </div>
          ) : null}

          {pagination ? (
            <div className="mt-6 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500">
              {t('account.paymentHistory.showingPage', { current: pagination.currentPage, total: pagination.totalPages, records: pagination.totalRecords, count: pagination.totalRecords })}
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  )
}