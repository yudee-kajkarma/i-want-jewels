'use client'

import { useEffect, useState } from 'react'
import { Ban, CreditCard, Gift, MapPinHouse, Package, Undo2 } from 'lucide-react'
import { Link, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import RecipientEmailPicker from '../components/giftcard/RecipientEmailPicker'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'
import { transferGiftCard } from '../services/giftCardService'
import { cancelOrder, cancelOrderReturnRequest, getOrderById, regenerateOrderPayment, requestOrderReturn } from '../services/orderService'
import type { Order } from '../types/order'
import { formatPrice, getPriceAmount } from '../utils/price'

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

function getReturnWindowInfo(order: Order): { canRequest: boolean; daysLeft: number; windowDays: number } {
  const windowDays = order.returnWindowDays || 7
  if (order.orderStatus !== 'DELIVERED' || !order.deliveredAt) {
    return { canRequest: false, daysLeft: 0, windowDays }
  }
  const ageMs = Date.now() - new Date(order.deliveredAt).getTime()
  const ageDays = ageMs / (1000 * 60 * 60 * 24)
  const daysLeft = Math.max(0, Math.ceil(windowDays - ageDays))
  const status = order.returnStatus || 'NONE'
  const canRequest = (status === 'NONE' || status === 'REJECTED') && ageDays <= windowDays
  return { canRequest, daysLeft, windowDays }
}

function getReturnStatusClass(status: string): string {
  switch (status) {
    case 'REQUESTED':
      return 'bg-amber-50 text-amber-700 border-amber-200'
    case 'APPROVED':
      return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'COMPLETED':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'REJECTED':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-zinc-100 text-zinc-700 border-zinc-200'
  }
}

export default function OrderDetailPage() {
  const params = useParams<{ orderId?: string | string[] }>()
  const { currency } = useCurrency()
  const { session } = useAuth()
  const orderId = typeof params.orderId === 'string' ? params.orderId : ''
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isRegeneratingPayment, setIsRegeneratingPayment] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showReturnForm, setShowReturnForm] = useState(false)
  const [returnReason, setReturnReason] = useState('')
  const [isSubmittingReturn, setIsSubmittingReturn] = useState(false)
  const [isCancellingReturn, setIsCancellingReturn] = useState(false)
  const [returnFeedback, setReturnFeedback] = useState('')
  const [transferFor, setTransferFor] = useState<string | null>(null)
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientEmailValid, setRecipientEmailValid] = useState(false)
  const [recipientName, setRecipientName] = useState('')
  const [transferMessage, setTransferMessage] = useState('')
  const [transferFeedback, setTransferFeedback] = useState('')
  const [isTransferring, setIsTransferring] = useState(false)

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

      window.location.assign(result.checkoutSession.url)
    } catch {
      setFeedback('Unable to start payment right now. Please try again.')
      setIsRegeneratingPayment(false)
    }
  }

  async function handleSubmitReturn() {
    if (!order) return
    if (!returnReason.trim()) {
      setReturnFeedback('Please tell us why you want to return this order.')
      return
    }
    setIsSubmittingReturn(true)
    setReturnFeedback('')
    try {
      await requestOrderReturn(order.id, returnReason.trim())
      setShowReturnForm(false)
      setReturnReason('')
      setFeedback('Return request received. Our team will reach out to you shortly.')
      await refreshOrder(order.id, false)
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Unable to submit return request right now.'
      setReturnFeedback(message)
    } finally {
      setIsSubmittingReturn(false)
    }
  }

  async function handleCancelReturn() {
    if (!order) return
    setIsCancellingReturn(true)
    setReturnFeedback('')
    try {
      await cancelOrderReturnRequest(order.id)
      setFeedback('Return request cancelled.')
      await refreshOrder(order.id, false)
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Unable to cancel return request right now.'
      setReturnFeedback(message)
    } finally {
      setIsCancellingReturn(false)
    }
  }

  function openTransfer(code: string) {
    setTransferFor(code)
    setRecipientEmail('')
    setRecipientEmailValid(false)
    setRecipientName('')
    setTransferMessage('')
    setTransferFeedback('')
  }

  async function handleTransferGiftCard(code: string) {
    if (!order) return
    if (!recipientEmail.trim()) {
      setTransferFeedback('Enter the recipient email.')
      return
    }
    if (!recipientEmailValid) {
      setTransferFeedback('Pick a recipient from the list. Gift cards can only be transferred to a registered account.')
      return
    }

    setIsTransferring(true)
    setTransferFeedback('')

    try {
      await transferGiftCard(code, {
        recipientEmail: recipientEmail.trim(),
        recipientName: recipientName.trim() || undefined,
        message: transferMessage.trim() || undefined,
      })
      setTransferFor(null)
      setFeedback('Gift card transferred successfully.')
      await refreshOrder(order.id, false)
    } catch (error) {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ||
        'Unable to transfer this gift card.'
      setTransferFeedback(message)
    } finally {
      setIsTransferring(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-parsi">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <nav className="mb-6 text-sm text-zinc-500">
          <Link to="/orders" className="transition hover:text-zinc-900">Orders</Link>
          {' / '}
          <span className="text-zinc-900">{order?.orderNumber || orderId}</span>
        </nav>

        {isLoading ? <p className="text-sm text-zinc-500">Loading order...</p> : null}
        {!isLoading && error ? <div className="border border-rose-200 bg-rose-50 px-6 py-8 text-rose-700">{error}</div> : null}

        {!isLoading && order ? (
          <div className="grid gap-8 xl:grid-cols-[1fr_380px]">
            <section className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <div className="flex flex-col gap-4 border-b border-[#efe1d5] pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">{order.orderNumber}</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-[#17110d]">Order details</h1>
                  <p className="mt-3 text-sm text-zinc-500">Placed {formatOrderDate(order.createdAt)}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {order.items.map((item, index) => (
                  <article key={`${item.productId}-${item.variantId}-${index}`} className="grid gap-5 border border-[#efe1d5] bg-[#fffdfa] p-4 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center">
                    <div className="overflow-hidden bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-3">
                      <img src={item.thumbnail} alt={item.title} className="h-24 w-full object-contain" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#17110d]">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-500">{item.variantName || 'Default variant'}</p>
                      {item.size !== undefined ? (
                        <p className="mt-1 text-sm text-zinc-500">Size: {item.size}{item.sizeMeasurement ? ` (${item.sizeMeasurement})` : ''}</p>
                      ) : null}
                      <p className="mt-1 text-sm text-zinc-500">SKU: {item.sku || 'N/A'}</p>
                      <p className="mt-1 text-sm text-zinc-500">Quantity: {item.quantity}</p>
                      {item.isGiftCard ? (
                        <p className="mt-2 text-sm text-[#8f2a60]">
                          {item.giftCard?.recipientEmail ? `To: ${item.giftCard.recipientEmail}` : 'Delivered to your account'}
                          {item.giftCard?.message ? ` · ${item.giftCard.message}` : ''}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-lg font-bold text-[#17110d]">{formatPrice(getPriceAmount(item.price, currency) * item.quantity, currency)}</p>
                  </article>
                ))}
              </div>

              {order.issuedGiftCards && order.issuedGiftCards.length > 0 ? (
                <div className="mt-8 border-t border-[#efe1d5] pt-6">
                  <div className="flex items-center gap-3 text-[#17110d]">
                    <Gift className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Gift card codes</h2>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {order.issuedGiftCards.map((card) => {
                      const canTransfer =
                        card.status === 'ACTIVE' &&
                        card.currentOwnerEmail.toLowerCase() === (session?.email || '').toLowerCase()

                      return (
                      <article key={card.id || card.code} className="border border-[#eadfd4] bg-[#fffdfa] p-4 text-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <p className="font-mono text-base font-bold text-[#17110d]">{card.code}</p>
                          {canTransfer && transferFor !== card.code ? (
                            <button
                              type="button"
                              onClick={() => openTransfer(card.code)}
                              className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a53b79] hover:underline"
                            >
                              Transfer
                            </button>
                          ) : null}
                        </div>
                        <div className="mt-3 space-y-1 text-zinc-600">
                          <p>Value: <span className="font-semibold text-[#17110d]">{formatPrice(card.initialAmount, currency)}</span></p>
                          <p>Owner: <span className="font-semibold text-[#17110d]">{card.currentOwnerEmail}</span></p>
                          {card.recipientName ? <p>Recipient: <span className="font-semibold text-[#17110d]">{card.recipientName}</span></p> : null}
                          {card.recipientEmail ? <p>Email: <span className="font-semibold text-[#17110d]">{card.recipientEmail}</span></p> : null}
                          {card.message ? <p>Message: <span className="font-semibold text-[#17110d]">{card.message}</span></p> : null}
                          <p>Status: <span className="font-semibold text-[#17110d]">{card.status}</span></p>
                        </div>
                        {canTransfer && transferFor === card.code ? (
                          <div className="mt-4 space-y-2 border-t border-[#eadfd4] pt-4">
                            <RecipientEmailPicker
                              value={recipientEmail}
                              onChange={(email, isValid) => {
                                setRecipientEmail(email)
                                setRecipientEmailValid(isValid)
                              }}
                              placeholder="Recipient email"
                              className="h-11 w-full border border-[#e7d3c2] px-3 text-sm outline-none focus:border-[#17110d]"
                            />
                            <input
                              type="text"
                              value={recipientName}
                              onChange={(event) => setRecipientName(event.target.value)}
                              placeholder="Recipient name (optional)"
                              className="h-11 w-full border border-[#e7d3c2] px-3 text-sm outline-none focus:border-[#17110d]"
                            />
                            <textarea
                              value={transferMessage}
                              onChange={(event) => setTransferMessage(event.target.value)}
                              placeholder="Message (optional)"
                              className="min-h-[70px] w-full border border-[#e7d3c2] px-3 py-2 text-sm outline-none focus:border-[#17110d]"
                            />
                            {transferFeedback ? <p className="text-xs text-rose-600">{transferFeedback}</p> : null}
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => void handleTransferGiftCard(card.code)}
                                disabled={isTransferring}
                                className="h-10 bg-[#17110d] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-50"
                              >
                                {isTransferring ? 'Sending...' : 'Send'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setTransferFor(null)}
                                disabled={isTransferring}
                                className="h-10 border border-[#e7d3c2] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a3a61] disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </article>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </section>

            <aside className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <div className="space-y-6">
                <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex items-center gap-3 text-[#17110d]">
                    <CreditCard className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Payment</h2>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-zinc-600">
                    <p>Method: <span className="font-semibold text-[#17110d]">{order.paymentMethod}</span></p>
                    <p>Status: <span className="font-semibold text-[#17110d]">{order.paymentStatus}</span></p>
                    <p>Total: <span className="font-semibold text-[#17110d]">{formatPrice(order.totalAmount, currency)}</span></p>
                    {order.giftCardDiscount && order.giftCardDiscount > 0 ? (
                      <>
                        <p>Gift card: <span className="font-semibold text-[#1f7a4d]">-{formatPrice(order.giftCardDiscount, currency)}</span></p>
                        {order.appliedGiftCardCode ? <p>Code: <span className="font-mono font-semibold text-[#17110d]">{order.appliedGiftCardCode}</span></p> : null}
                        <p>Paid: <span className="font-semibold text-[#17110d]">{formatPrice(order.payableAmount ?? order.totalAmount, currency)}</span></p>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
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

                <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
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
                    className="inline-flex w-full items-center justify-center gap-2 border border-[#1b1210] bg-[#1b1210] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#342721] disabled:opacity-60"
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
                    className="inline-flex w-full items-center justify-center gap-2 border border-rose-200 px-6 py-4 text-sm font-bold tracking-[0.08em] text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
                  >
                    <Ban className="h-4 w-4" />
                    {isCancelling ? 'CANCELLING...' : 'CANCEL ORDER'}
                  </button>
                ) : null}

                {order.orderStatus === 'DELIVERED' ? (() => {
                  const status = order.returnStatus || 'NONE'
                  const info = getReturnWindowInfo(order)
                  return (
                    <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                      <div className="flex items-center gap-3 text-[#17110d]">
                        <Undo2 className="h-5 w-5" />
                        <h2 className="text-xl font-bold">Return</h2>
                      </div>

                      {status !== 'NONE' ? (
                        <div className="mt-4 space-y-2 text-sm text-zinc-600">
                          <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getReturnStatusClass(status)}`}>
                            {status}
                          </span>
                          {order.returnRequestedAt ? (
                            <p>Requested: <span className="font-semibold text-[#17110d]">{formatOrderDate(order.returnRequestedAt)}</span></p>
                          ) : null}
                          {order.returnReason ? (
                            <p>Reason: <span className="font-semibold text-[#17110d]">{order.returnReason}</span></p>
                          ) : null}
                          {order.returnAdminNote ? (
                            <p>Note from us: <span className="font-semibold text-[#17110d]">{order.returnAdminNote}</span></p>
                          ) : null}
                        </div>
                      ) : (
                        <p className="mt-4 text-sm text-zinc-600">
                          {info.canRequest
                            ? `You have ${info.daysLeft} day${info.daysLeft === 1 ? '' : 's'} left to request a return.`
                            : 'The return window for this order has closed.'}
                        </p>
                      )}

                      {returnFeedback ? <p className="mt-3 text-xs text-rose-600">{returnFeedback}</p> : null}

                      {showReturnForm ? (
                        <div className="mt-4 space-y-3">
                          <textarea
                            value={returnReason}
                            onChange={(event) => setReturnReason(event.target.value)}
                            placeholder="Why do you want to return this order?"
                            className="min-h-[90px] w-full border border-[#e7d3c2] px-3 py-2 text-sm outline-none focus:border-[#17110d]"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => void handleSubmitReturn()}
                              disabled={isSubmittingReturn}
                              className="h-11 flex-1 bg-[#17110d] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white disabled:opacity-50"
                            >
                              {isSubmittingReturn ? 'SUBMITTING...' : 'SUBMIT RETURN'}
                            </button>
                            <button
                              type="button"
                              onClick={() => { setShowReturnForm(false); setReturnFeedback(''); }}
                              disabled={isSubmittingReturn}
                              className="h-11 border border-[#e7d3c2] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a3a61] disabled:opacity-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : status === 'REQUESTED' ? (
                        <button
                          type="button"
                          onClick={() => void handleCancelReturn()}
                          disabled={isCancellingReturn}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-rose-200 px-6 py-3 text-sm font-bold tracking-[0.08em] text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
                        >
                          <Ban className="h-4 w-4" />
                          {isCancellingReturn ? 'CANCELLING...' : 'CANCEL RETURN REQUEST'}
                        </button>
                      ) : info.canRequest ? (
                        <button
                          type="button"
                          onClick={() => { setShowReturnForm(true); setReturnFeedback(''); }}
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-[#1b1210] bg-[#1b1210] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#342721]"
                        >
                          <Undo2 className="h-4 w-4" />
                          REQUEST RETURN
                        </button>
                      ) : null}
                    </div>
                  )
                })() : null}
              </div>
            </aside>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
