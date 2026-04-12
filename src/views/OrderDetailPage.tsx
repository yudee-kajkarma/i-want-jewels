'use client'

import { useEffect, useRef, useState } from 'react'
import { Ban, CreditCard, MapPinHouse, Package } from 'lucide-react'
import { Link, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { cancelOrder, getOrderById, regenerateOrderPayment } from '../services/orderService'
import type { Order } from '../types/order'
import { formatEuro } from '../utils/productUtils'

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

function canCancelOrder(order: Order): boolean {
  const status = order.orderStatus.toLowerCase()

  return status !== 'cancelled' && status !== 'delivered'
}

function canRegeneratePayment(order: Order): boolean {
  const isOnlinePayment = order.paymentMethod === 'ONLINE'
  const isPendingOrder = order.orderStatus === 'PENDING'
  const isPaymentSettled = ['paid', 'refunded'].includes(order.paymentStatus.toLowerCase())

  return isOnlinePayment && isPendingOrder && !isPaymentSettled
}

export default function OrderDetailPage() {
  const params = useParams<{ orderId?: string | string[] }>()
  const orderId = typeof params.orderId === 'string' ? params.orderId : ''
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isRegeneratingPayment, setIsRegeneratingPayment] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const paymentStatusPollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  async function refreshOrder(currentOrderId: string, showLoader: boolean) {
    if (showLoader) {
      setIsLoading(true)
    }

    try {
      const response = await getOrderById(currentOrderId)

      setOrder(response)
      setError('')

      return response
    } catch {
      setOrder(null)
      setError('Unable to load this order right now.')
      return null
    } finally {
      if (showLoader) {
        setIsLoading(false)
      }
    }
  }

  function buildReturnUrl(paymentResult: 'success' | 'cancel'): string {
    if (typeof window === 'undefined') {
      return `/checkout/status?payment=${paymentResult}`
    }

    const url = new URL('/checkout/status', window.location.origin)
    url.searchParams.set('payment', paymentResult)

    return url.toString()
  }

  useEffect(() => {
    if (orderId) {
      void refreshOrder(orderId, true)
    }
  }, [orderId])

  useEffect(() => {
    return () => {
      if (paymentStatusPollRef.current) {
        clearInterval(paymentStatusPollRef.current)
        paymentStatusPollRef.current = null
      }
    }
  }, [])

  async function handleCancelOrder() {
    if (!order || !canCancelOrder(order)) {
      return
    }

    setIsCancelling(true)
    setFeedback('')

    try {
      const updatedOrder = await cancelOrder(order.id)

      setOrder(updatedOrder)
      setFeedback('Order cancelled successfully.')
    } catch {
      setFeedback('Unable to cancel this order right now.')
    } finally {
      setIsCancelling(false)
    }
  }

  async function handleRegeneratePayment() {
    if (!order || !canRegeneratePayment(order) || isRegeneratingPayment) {
      return
    }

    setIsRegeneratingPayment(true)
    setFeedback('')

    try {
      const result = await regenerateOrderPayment(order.id, {
        successUrl: buildReturnUrl('success'),
        cancelUrl: buildReturnUrl('cancel'),
      })

      if (result.order) {
        setOrder(result.order)
      }

      if (!result.checkoutSession?.url) {
        throw new Error('Missing checkout session URL.')
      }

      const checkoutWindow = window.open(
        result.checkoutSession.url,
        'iwjStripeCheckout',
        'popup=yes,width=540,height=760,noopener,noreferrer',
      )

      if (!checkoutWindow) {
        setFeedback('Popup was blocked by your browser. Please allow popups and try again.')
        return
      }

      if (paymentStatusPollRef.current) {
        clearInterval(paymentStatusPollRef.current)
      }

      paymentStatusPollRef.current = setInterval(() => {
        if (!checkoutWindow.closed) {
          return
        }

        if (paymentStatusPollRef.current) {
          clearInterval(paymentStatusPollRef.current)
          paymentStatusPollRef.current = null
        }

        void refreshOrder(order.id, false).then((updatedOrder) => {
          if (!updatedOrder) {
            return
          }

          const paymentStatus = updatedOrder.paymentStatus.toLowerCase()

          if (paymentStatus === 'paid') {
            setFeedback('Payment completed successfully. Order status has been updated.')
            return
          }

          setFeedback('Payment was not completed. You can retry payment or cancel this order.')
        })
      }, 1500)
    } catch {
      setFeedback('Unable to start payment right now. Please try again.')
    } finally {
      setIsRegeneratingPayment(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link to="/orders" className="transition hover:text-zinc-900">Orders</Link>
          {' / '}
          <span className="text-zinc-900">{order?.orderNumber || orderId}</span>
        </nav>

        {isLoading ? <p className="text-sm text-zinc-500">Loading order...</p> : null}
        {!isLoading && error ? <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-6 py-8 text-rose-700">{error}</div> : null}

        {!isLoading && order ? (
          <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
            <section className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <div className="flex flex-col gap-4 border-b border-[#efe1d5] pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{order.orderNumber}</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#17110d]">Order details</h1>
                  <p className="mt-3 text-sm text-zinc-500">Placed {formatOrderDate(order.createdAt)}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {order.items.map((item) => (
                  <article key={`${item.productId}-${item.variantId}`} className="grid gap-5 rounded-[24px] border border-[#efe1d5] bg-[#fffdfa] p-4 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center">
                    <div className="overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-3">
                      <img src={item.thumbnail} alt={item.title} className="h-24 w-full object-contain" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#17110d]">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-500">{item.variantName || 'Default variant'}</p>
                      <p className="mt-1 text-sm text-zinc-500">SKU: {item.sku || 'N/A'}</p>
                      <p className="mt-1 text-sm text-zinc-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-lg font-bold text-[#17110d]">{formatEuro(item.price * item.quantity)}</p>
                  </article>
                ))}
              </div>
            </section>

            <aside className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <div className="space-y-6">
                <div className="rounded-[26px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex items-center gap-3 text-[#17110d]">
                    <CreditCard className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Payment</h2>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-zinc-600">
                    <p>Method: <span className="font-semibold text-[#17110d]">{order.paymentMethod}</span></p>
                    <p>Status: <span className="font-semibold text-[#17110d]">{order.paymentStatus}</span></p>
                    <p>Total: <span className="font-semibold text-[#17110d]">{formatEuro(order.totalAmount)}</span></p>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex items-center gap-3 text-[#17110d]">
                    <MapPinHouse className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Shipping address</h2>
                  </div>
                  {order.shippingAddress ? (
                    <div className="mt-4 text-sm leading-7 text-zinc-600">
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-zinc-500">No shipping address available.</p>
                  )}
                </div>

                <div className="rounded-[26px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex items-center gap-3 text-[#17110d]">
                    <Package className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Order summary</h2>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-zinc-600">
                    <p>Items: <span className="font-semibold text-[#17110d]">{order.totalItems}</span></p>
                    <p>Updated: <span className="font-semibold text-[#17110d]">{formatOrderDate(order.updatedAt)}</span></p>
                  </div>
                </div>

                {feedback ? <p className="text-sm text-[#8b5f43]">{feedback}</p> : null}

                {canRegeneratePayment(order) ? (
                  <button
                    type="button"
                    onClick={() => void handleRegeneratePayment()}
                    disabled={isRegeneratingPayment || isCancelling}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#1b1210] bg-[#1b1210] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#342721] disabled:opacity-60"
                  >
                    <CreditCard className="h-4 w-4" />
                    {isRegeneratingPayment ? 'OPENING PAYMENT...' : 'REGENERATE PAYMENT'}
                  </button>
                ) : null}

                {canCancelOrder(order) ? (
                  <button
                    type="button"
                    onClick={() => void handleCancelOrder()}
                    disabled={isCancelling}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-200 px-6 py-4 text-sm font-bold tracking-[0.08em] text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
                  >
                    <Ban className="h-4 w-4" />
                    {isCancelling ? 'CANCELLING...' : 'CANCEL ORDER'}
                  </button>
                ) : null}
              </div>
            </aside>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}