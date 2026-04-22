'use client'

import { useEffect, useState } from 'react'
import { BadgeCheck, Clock3, MapPinHouse, Package, User } from 'lucide-react'
import { Link, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useCurrency } from '../context/CurrencyContext'
import { getAdminOrderById } from '../services/orderService'
import type { AdminOrderDetail } from '../types/order'
import { formatPrice } from '../utils/price'

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
    case 'shipped':
      return 'bg-sky-50 text-sky-700 border-sky-200'
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

export default function AdminOrderDetailPage() {
  const params = useParams<{ orderId?: string | string[] }>()
  const { currency } = useCurrency()
  const orderId = typeof params.orderId === 'string' ? params.orderId : ''

  const [order, setOrder] = useState<AdminOrderDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadOrder() {
      setIsLoading(true)

      try {
        const response = await getAdminOrderById(orderId)

        if (!mounted) {
          return
        }

        setOrder(response)
        setError('')
      } catch {
        if (!mounted) {
          return
        }

        setOrder(null)
        setError('Unable to load this admin order detail right now.')
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    if (orderId) {
      void loadOrder()
    }

    return () => {
      mounted = false
    }
  }, [orderId])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link to="/admin/orders" className="transition hover:text-zinc-900">Admin Orders</Link>
          {' / '}
          <span className="text-zinc-900">{order?.orderNumber || orderId}</span>
        </nav>

        {isLoading ? <p className="text-sm text-zinc-500">Loading order...</p> : null}
        {!isLoading && error ? (
          <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div>
        ) : null}

        {!isLoading && order ? (
          <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
            <section className="space-y-6 rounded-[30px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Order Number</p>
                  <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#17110d]">{order.orderNumber}</h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[20px] border border-[#efe1d5] bg-[#fffdfa] p-4 text-sm leading-7 text-zinc-600">
                  <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><Clock3 className="h-4 w-4" />Created</p>
                  <p>{formatOrderDate(order.createdAt)}</p>
                  <p className="mt-2 inline-flex items-center gap-2 font-semibold text-[#17110d]"><BadgeCheck className="h-4 w-4" />Updated</p>
                  <p>{formatOrderDate(order.updatedAt)}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-500">Refund: {order.refundStatus}</p>
                </div>

                <div className="rounded-[20px] border border-[#efe1d5] bg-[#fffdfa] p-4 text-sm leading-7 text-zinc-600">
                  <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><User className="h-4 w-4" />Customer</p>
                  <p>{order.customer?.firstName} {order.customer?.lastName}</p>
                  <p>{order.customer?.email}</p>
                  <p>{order.customer?.phoneNumber || 'N/A'}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-500">Username: {order.customer?.username || 'N/A'}</p>
                </div>
              </div>

              <div className="rounded-[20px] border border-[#efe1d5] bg-[#fffdfa] p-4 text-sm leading-7 text-zinc-600">
                <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><MapPinHouse className="h-4 w-4" />Shipping Address</p>
                {order.shippingAddress ? (
                  <>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </>
                ) : (
                  <p>No shipping address available.</p>
                )}
                {order.shippingCarrier ? <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-500">Carrier: {order.shippingCarrier}</p> : null}
                {order.trackingNumber ? <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">Tracking: {order.trackingNumber}</p> : null}
                {order.trackingUrl ? <a href={order.trackingUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#8f2a60] underline">Track shipment</a> : null}
              </div>

              <div className="rounded-[20px] border border-[#efe1d5] bg-[#fffdfa] p-4">
                <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><Package className="h-4 w-4" />Items</p>
                <div className="mt-4 space-y-3">
                  {order.items.map((item, index) => (
                    <article key={`${item.productId}-${item.variantId}-${index}`} className="grid gap-3 rounded-[16px] border border-[#efe1d5] bg-white p-3 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-center">
                      <div className="overflow-hidden rounded-[12px] bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-1.5">
                        <img src={item.thumbnail} alt={item.title} className="h-14 w-full object-contain" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#17110d]">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.variantName || 'Default'} · Qty {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[#17110d]">{formatPrice(item.price, currency)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <aside className="rounded-[30px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <h2 className="text-xl font-bold text-[#17110d]">Summary</h2>
              <div className="mt-5 space-y-3 text-sm text-zinc-600">
                <div className="flex items-center justify-between">
                  <span>Total Items</span>
                  <span className="font-semibold text-[#17110d]">{order.totalItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Order Total</span>
                  <span className="font-semibold text-[#17110d]">{formatPrice(order.totalAmount, currency)}</span>
                </div>
                {typeof order.shippingCost === 'number' ? (
                  <div className="flex items-center justify-between">
                    <span>Shipping Cost</span>
                    <span className="font-semibold text-[#17110d]">{formatPrice(order.shippingCost, currency)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between">
                  <span>Payment Method</span>
                  <span className="font-semibold text-[#17110d]">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <span className="font-semibold text-[#17110d]">{order.isActive ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </aside>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
