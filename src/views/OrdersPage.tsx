'use client'

import { useEffect, useState } from 'react'
import { Clock3, Package, ReceiptText } from 'lucide-react'
import { Link } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { getOrders } from '../services/orderService'
import type { Order, OrdersPagination } from '../types/order'
import { formatIndianRupee } from '../utils/productUtils'

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
        setError('Unable to load orders right now.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadOrders()
  }, [])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Orders</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">Your order history</h1>
          </div>
          <p className="text-sm text-zinc-500">Track placed orders, payment status, and shipping details from one place.</p>
        </div>

        <section className="mt-8 rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
          {isLoading ? <p className="text-sm text-zinc-500">Loading orders...</p> : null}
          {!isLoading && error ? <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-8 text-sm text-rose-700">{error}</div> : null}

          {!isLoading && !error && orders.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#dbc8b8] text-[#17110d]">
                <ReceiptText className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-[#17110d]">No orders yet</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-500">Place your first order from the cart or buy directly from a product page.</p>
              <Link
                to="/products"
                className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
              >
                SHOP NOW
              </Link>
            </div>
          ) : null}

          {!isLoading && orders.length > 0 ? (
            <div className="space-y-5">
              {orders.map((order) => (
                <article key={order.id} className="rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{order.orderNumber}</p>
                      <Link to={`/orders/${order.id}`} className="mt-2 block text-xl font-bold text-[#17110d] transition hover:text-pink-500">
                        Order for {order.totalItems} item{order.totalItems === 1 ? '' : 's'}
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
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {order.items.slice(0, 4).map((item) => (
                      <div key={`${order.id}-${item.productId}-${item.variantId}`} className="rounded-[22px] border border-[#efe1d5] bg-white p-3">
                        <div className="overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-2">
                          <img src={item.thumbnail} alt={item.title} className="h-24 w-full object-contain" />
                        </div>
                        <p className="mt-3 text-sm font-bold text-[#17110d] line-clamp-2">{item.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">{item.variantName || 'Default variant'} · Qty {item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                    <span>Total {formatIndianRupee(order.totalAmount)}</span>
                    <Link to={`/orders/${order.id}`} className="font-bold text-[#17110d] transition hover:text-pink-500">
                      VIEW DETAILS
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {pagination ? (
            <div className="mt-6 border-t border-[#efe1d5] pt-4 text-sm text-zinc-500">
              Showing page {pagination.currentPage} of {pagination.totalPages} · {pagination.totalRecords} order{pagination.totalRecords === 1 ? '' : 's'}
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </div>
  )
}