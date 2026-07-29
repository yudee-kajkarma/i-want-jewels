'use client'

import { useEffect, useState } from 'react'
import { Clock3, Package, ReceiptText } from 'lucide-react'
import { Link } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { getOrders } from '../services/orderService'
import type { Order, OrdersPagination } from '../types/order'
import { formatPrice, isoToCurrencyCode } from '../utils/price'
import { useTranslation } from 'react-i18next'

function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function getOrderStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case 'confirmed':
    case 'delivered':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'cancelled':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-amber-50 text-amber-700 border-amber-200'
  }
}

function getPaymentStatusClass(status: string) {
  switch (status.toLowerCase()) {
    case 'paid':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'failed':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-zinc-100 text-zinc-700 border-zinc-200'
  }
}

export default function OrdersPage() {
  const { t } = useTranslation()
  const [orders, setOrders] = useState<Order[]>([])
  const [pagination, setPagination] = useState<OrdersPagination | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true)

      try {
        const response = await getOrders()

        setOrders(response.orders)
        setPagination(response.pagination)
        setError('')
      } catch {
        setOrders([])
        setPagination(null)
        setError(t('account.orders.loadError'))
      } finally {
        setIsLoading(false)
      }
    }

    void loadOrders()
  }, [])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">{t('account.orders.breadcrumb')}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">{t('account.orders.title')}</h1>
          </div>
          <p className="text-sm text-zinc-500">{t('account.orders.subtitle')}</p>
        </div>

        <section className="mt-8 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isLoading ? <p className="text-sm text-zinc-500">{t('account.orders.loading')}</p> : null}
          {!isLoading && error ? <div className="border border-rose-200 bg-rose-50 px-6 py-8 text-sm text-rose-700">{error}</div> : null}

          {!isLoading && !error && orders.length === 0 ? (
            <div className="border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[#dbc8b8] text-[#17110d]">
                <ReceiptText className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#17110d]">{t('account.orders.emptyTitle')}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-500">{t('account.orders.emptyDesc')}</p>
              <Link
                to="/products"
                className="mt-6 inline-flex bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
              >
                {t('account.orders.shopNow')}
              </Link>
            </div>
          ) : null}

          {!isLoading && orders.length > 0 ? (
            <div className="space-y-5">
              {orders.map((order) => {
                const orderCurrency = isoToCurrencyCode(order.currency) ?? 'eur'

                return (
                <article key={order.id} className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{order.orderNumber}</p>
                      <Link to={`/orders/${order.id}`} className="mt-2 block text-xl font-bold text-[#17110d] transition hover:text-pink-500">
                        {t('account.orders.orderFor', { count: order.totalItems })}
                      </Link>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-4 w-4" />
                          {formatOrderDate(order.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                      <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {order.items.slice(0, 4).map((item) => (
                      <div key={`${order.id}-${item.productId}-${item.variantId}`} className="border border-[#efe1d5] bg-white p-3">
                        <div className="overflow-hidden bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-2">
                          <img src={item.thumbnail} alt={item.title} className="h-24 w-full object-contain" />
                        </div>
                        <p className="mt-3 text-sm font-bold text-[#17110d] line-clamp-2">{item.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">{item.variantName || t('account.orders.defaultVariant')} · {t('account.orders.qty', { count: item.quantity })}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>{t('account.orders.total', { price: formatPrice(order.totalAmount, orderCurrency) })}</span>
                    <Link to={`/orders/${order.id}`} className="font-bold text-[#17110d] transition hover:text-pink-500">
                      {t('account.orders.viewDetails')}
                    </Link>
                  </div>
                </article>
                )
              })}
            </div>
          ) : null}

          {pagination ? (
            <div className="mt-6 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500">
              {t('account.orders.showingPage', { current: pagination.currentPage, total: pagination.totalPages, records: pagination.totalRecords, count: pagination.totalRecords })}
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  )
}