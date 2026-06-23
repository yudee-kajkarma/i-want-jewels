'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BadgeCheck, Clock3, MapPinHouse, Package, User, CreditCard, Gift, Undo2, Check, X } from 'lucide-react'
import { Link, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useCurrency } from '../context/CurrencyContext'
import { approveOrderReturn, getAdminOrderById, rejectOrderReturn, updateOrderShippingAddressForAdmin, updateOrderStatusForAdmin, verifyPaymentStatus } from '../services/orderService'
import type { AdminOrderDetail } from '../types/order'
import { getCountryName, getCountryOptions, getStateName, getStateOptions, isValidPostalCode } from '../utils/location'
import { formatPrice } from '../utils/price'

type AdminShippingAddressForm = {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
}

const EMPTY_SHIPPING_ADDRESS_FORM: AdminShippingAddressForm = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN',
}

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
        case 'returned':
            return 'bg-violet-50 text-violet-700 border-violet-200'
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

function getReturnStatusClass(status: string) {
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

export default function AdminOrderDetailPage() {
    const params = useParams<{ orderId?: string | string[] }>()
    const { currency } = useCurrency()
    const orderId = typeof params.orderId === 'string' ? params.orderId : ''

    const [order, setOrder] = useState<AdminOrderDetail | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false)
    const [isSavingAddress, setIsSavingAddress] = useState(false)
    const [addressForm, setAddressForm] = useState<AdminShippingAddressForm>(EMPTY_SHIPPING_ADDRESS_FORM)
    const [addressError, setAddressError] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('')
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false)
    const [adminNote, setAdminNote] = useState('')
    const [isApprovingReturn, setIsApprovingReturn] = useState(false)
    const [isRejectingReturn, setIsRejectingReturn] = useState(false)
    const [returnActionError, setReturnActionError] = useState('')
    const [isMarkingReturned, setIsMarkingReturned] = useState(false)
    const countryOptions = useMemo(() => getCountryOptions(), [])
    const stateOptions = useMemo(() => getStateOptions(addressForm.country), [addressForm.country])
    const canEditShippingAddress = order?.orderStatus === 'PENDING' || order?.orderStatus === 'CONFIRMED'

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
                if (response.shippingAddress) {
                    setAddressForm({
                        street: response.shippingAddress.street,
                        city: response.shippingAddress.city,
                        state: response.shippingAddress.state,
                        postalCode: response.shippingAddress.postalCode,
                        country: response.shippingAddress.country,
                    })
                } else {
                    setAddressForm(EMPTY_SHIPPING_ADDRESS_FORM)
                }
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

    function openEditShippingAddress() {
        if (!order) {
            return
        }

        const currentAddress = order.shippingAddress

        setAddressError('')
        setPostalCodeError('')
        setAddressForm({
            street: currentAddress?.street ?? '',
            city: currentAddress?.city ?? '',
            state: currentAddress?.state ?? '',
            postalCode: currentAddress?.postalCode ?? '',
            country: currentAddress?.country ?? 'IN',
        })
        setIsEditAddressOpen(true)
    }

    function closeEditShippingAddress() {
        if (isSavingAddress) {
            return
        }

        setIsEditAddressOpen(false)
        setAddressError('')
        setPostalCodeError('')
    }

    async function handleUpdateShippingAddress() {
        if (!order || isSavingAddress) {
            return
        }

        const payload = {
            street: addressForm.street.trim(),
            city: addressForm.city.trim(),
            state: addressForm.state.trim(),
            postalCode: addressForm.postalCode.trim(),
            country: addressForm.country.trim(),
        }

        setAddressError('')
        setPostalCodeError('')

        if (!payload.street || !payload.city || !payload.state || !payload.postalCode || !payload.country) {
            setAddressError('Please complete all shipping address fields.')
            return
        }

        if (!isValidPostalCode(payload.postalCode, payload.country)) {
            setPostalCodeError('Please enter a valid postal code.')
            return
        }

        setIsSavingAddress(true)

        try {
            await updateOrderShippingAddressForAdmin(order.id, payload)
            const refreshedOrder = await getAdminOrderById(order.id)
            setOrder(refreshedOrder)
            setIsEditAddressOpen(false)
            toast.success('Shipping address updated successfully.')
        } catch {
            setAddressError('Unable to update shipping address right now. Please try again.')
            toast.error('Unable to update shipping address right now.')
        } finally {
            setIsSavingAddress(false)
        }
    }

    async function handleVerifyPayment() {
        if (!order || isVerifyingPayment || !order.sessionId) {
            return
        }

        setIsVerifyingPayment(true)

        try {
            await verifyPaymentStatus(order.sessionId)
            const refreshedOrder = await getAdminOrderById(order.id)
            setOrder(refreshedOrder)
            toast.success('Payment verified successfully.')
        } catch (error) {
            console.error('Payment verification failed:', error)
            const errorMessage = error instanceof Error ? error.message : 'Unable to verify payment. Please try again.'
            toast.error(errorMessage)
        } finally {
            setIsVerifyingPayment(false)
        }
    }

    async function handleApproveReturn() {
        if (!order) return
        setIsApprovingReturn(true)
        setReturnActionError('')
        try {
            await approveOrderReturn(order.id, adminNote.trim() || undefined)
            toast.success('Return approved and refund initiated')
            setAdminNote('')
            const refreshed = await getAdminOrderById(order.id)
            setOrder(refreshed)
        } catch (err) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                'Unable to approve return.'
            setReturnActionError(message)
            toast.error(message)
        } finally {
            setIsApprovingReturn(false)
        }
    }

    async function handleRejectReturn() {
        if (!order) return
        if (!adminNote.trim()) {
            setReturnActionError('A note is required to reject a return.')
            return
        }
        setIsRejectingReturn(true)
        setReturnActionError('')
        try {
            await rejectOrderReturn(order.id, adminNote.trim())
            toast.success('Return rejected')
            setAdminNote('')
            const refreshed = await getAdminOrderById(order.id)
            setOrder(refreshed)
        } catch (err) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                'Unable to reject return.'
            setReturnActionError(message)
            toast.error(message)
        } finally {
            setIsRejectingReturn(false)
        }
    }

    async function handleMarkAsReturned() {
        if (!order) return
        setIsMarkingReturned(true)
        try {
            await updateOrderStatusForAdmin(order.id, 'RETURNED')
            toast.success('Order marked as RETURNED')
            const refreshed = await getAdminOrderById(order.id)
            setOrder(refreshed)
        } catch (err) {
            const message =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
                'Unable to update order status.'
            toast.error(message)
        } finally {
            setIsMarkingReturned(false)
        }
    }

    function canVerifyPayment(): boolean {
        if (!order) return false
        return (
            order.paymentMethod === 'ONLINE' &&
            order.paymentStatus?.toLowerCase() === 'pending' &&
            !!order.sessionId
        )
    }

    return (
        <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
            <Header />
            <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
                <nav className="mb-6 text-sm text-zinc-500">
                    <Link to="/admin/orders" className="transition hover:text-zinc-900">Admin Orders</Link>
                    {' / '}
                    <span className="text-zinc-900">{order?.orderNumber || orderId}</span>
                </nav>

                {isLoading ? <p className="text-sm text-zinc-500">Loading order...</p> : null}
                {!isLoading && error ? (
                    <div className="border border-rose-200 bg-rose-50 px-5 py-6 text-sm text-rose-700">{error}</div>
                ) : null}

                {!isLoading && order ? (
                    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
                        <section className="space-y-6 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400">Order Number</p>
                                    <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[#17110d]">{order.orderNumber}</h1>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getOrderStatusClass(order.orderStatus)}`}>
                                        {order.orderStatus}
                                    </span>
                                    <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getPaymentStatusClass(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="border border-[#efe1d5] bg-[#fffdfa] p-4 text-sm leading-7 text-zinc-600">
                                    <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><Clock3 className="h-4 w-4" />Created</p>
                                    <p>{formatOrderDate(order.createdAt)}</p>
                                    <p className="mt-2 inline-flex items-center gap-2 font-semibold text-[#17110d]"><BadgeCheck className="h-4 w-4" />Updated</p>
                                    <p>{formatOrderDate(order.updatedAt)}</p>
                                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-500">Refund: {order.refundStatus}</p>
                                </div>

                                <div className="border border-[#efe1d5] bg-[#fffdfa] p-4 text-sm leading-7 text-zinc-600">
                                    <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><User className="h-4 w-4" />Customer</p>
                                    <p>{order.customer?.firstName} {order.customer?.lastName}</p>
                                    <p>{order.customer?.email}</p>
                                    <p>{order.customer?.phoneNumber || 'N/A'}</p>
                                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-500">Username: {order.customer?.username || 'N/A'}</p>
                                </div>
                            </div>

                            {order.returnStatus && order.returnStatus !== 'NONE' ? (
                                <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><Undo2 className="h-4 w-4" />Return Request</p>
                                        <span className={`inline-flex border px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] ${getReturnStatusClass(order.returnStatus)}`}>
                                            {order.returnStatus}
                                        </span>
                                    </div>
                                    <div className="mt-4 grid gap-2 text-sm text-zinc-600 md:grid-cols-2">
                                        {order.returnRequestedAt ? (
                                            <p>Requested: <span className="font-semibold text-[#17110d]">{formatOrderDate(order.returnRequestedAt)}</span></p>
                                        ) : null}
                                        {order.deliveredAt ? (
                                            <p>Delivered: <span className="font-semibold text-[#17110d]">{formatOrderDate(order.deliveredAt)}</span></p>
                                        ) : null}
                                        {order.returnReason ? (
                                            <p className="md:col-span-2">Reason: <span className="font-semibold text-[#17110d]">{order.returnReason}</span></p>
                                        ) : null}
                                        {order.returnAdminNote ? (
                                            <p className="md:col-span-2">Admin note: <span className="font-semibold text-[#17110d]">{order.returnAdminNote}</span></p>
                                        ) : null}
                                    </div>

                                    {(order.returnStatus === 'APPROVED' || order.returnStatus === 'COMPLETED') && order.orderStatus === 'DELIVERED' ? (
                                        <div className="mt-4 border-t border-[#efe1d5] pt-4">
                                            <p className="text-sm text-zinc-600">Once the item is physically back in your possession, mark the order as returned.</p>
                                            <button
                                                type="button"
                                                onClick={() => void handleMarkAsReturned()}
                                                disabled={isMarkingReturned}
                                                className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-violet-200 bg-violet-600 px-4 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-violet-700 disabled:opacity-60"
                                            >
                                                <Undo2 className="h-4 w-4" />
                                                {isMarkingReturned ? 'UPDATING...' : 'MARK ORDER AS RETURNED'}
                                            </button>
                                        </div>
                                    ) : null}

                                    {order.returnStatus === 'REQUESTED' ? (
                                        <div className="mt-4 space-y-3">
                                            <textarea
                                                value={adminNote}
                                                onChange={(event) => setAdminNote(event.target.value)}
                                                placeholder="Optional note (required for reject) — visible to the customer"
                                                className="min-h-[70px] w-full border border-[#e7d3c2] bg-white px-3 py-2 text-sm outline-none focus:border-[#17110d]"
                                            />
                                            {returnActionError ? <p className="text-xs text-rose-600">{returnActionError}</p> : null}
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => void handleApproveReturn()}
                                                    disabled={isApprovingReturn || isRejectingReturn}
                                                    className="inline-flex flex-1 items-center justify-center gap-2 border border-emerald-200 bg-emerald-600 px-4 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-emerald-700 disabled:opacity-60"
                                                >
                                                    <Check className="h-4 w-4" />
                                                    {isApprovingReturn ? 'APPROVING...' : 'APPROVE & REFUND'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => void handleRejectReturn()}
                                                    disabled={isApprovingReturn || isRejectingReturn}
                                                    className="inline-flex flex-1 items-center justify-center gap-2 border border-rose-200 px-4 py-3 text-sm font-bold tracking-[0.08em] text-rose-700 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
                                                >
                                                    <X className="h-4 w-4" />
                                                    {isRejectingReturn ? 'REJECTING...' : 'REJECT'}
                                                </button>
                                            </div>
                                            <p className="text-xs text-zinc-500">Approving auto-issues a Stripe refund (for ONLINE+PAID orders) and restores stock.</p>
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}

                            <div className="border border-[#efe1d5] bg-[#fffdfa] p-4 text-sm leading-7 text-zinc-600">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><MapPinHouse className="h-4 w-4" />Shipping Address</p>
                                </div>
                                {order.shippingAddress ? (
                                    <>
                                        <p>{order.shippingAddress.street}</p>
                                        <p>{order.shippingAddress.city}, {getStateName(order.shippingAddress.country, order.shippingAddress.state)} {order.shippingAddress.postalCode}</p>
                                        <p>{getCountryName(order.shippingAddress.country)}</p>
                                    </>
                                ) : (
                                    <p>No shipping address available.</p>
                                )}
                                {order.shippingCarrier ? <p className="mt-2 text-xs uppercase tracking-[0.1em] text-zinc-500">Carrier: {order.shippingCarrier}</p> : null}
                                {order.trackingNumber ? <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">Tracking: {order.trackingNumber}</p> : null}
                                {order.trackingUrl ? (
  <a
    href={order.trackingUrl}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center bg-[#8f2a60] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#74224f]"
  >
    Track Shipment
  </a>
) : null}
                            </div>


                            <div className="border border-[#efe1d5] bg-[#fffdfa] p-4">
                                <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><Package className="h-4 w-4" />Items</p>
                                <div className="mt-4 space-y-3">
                                    {order.items.map((item, index) => (
                                        <article key={`${item.productId}-${item.variantId}-${index}`} className="grid gap-3 border border-[#efe1d5] bg-white p-3 sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:items-center">
                                            <div className="overflow-hidden bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-1.5">
                                                <img src={item.thumbnail} alt={item.title} className="h-14 w-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#17110d]">{item.title}</p>
                                                <p className="text-xs text-zinc-500">
                                                    {item.variantName || 'Default'}
                                                    {item.size !== undefined ? ` · Size ${item.size}${item.sizeMeasurement ? ` (${item.sizeMeasurement})` : ''}` : ''}
                                                    {' · Qty '}{item.quantity}
                                                </p>
                                                {item.isGiftCard ? (
                                                    <p className="mt-1 text-xs text-[#8f2a60]">
                                                        {item.giftCard?.recipientEmail ? `To: ${item.giftCard.recipientEmail}` : 'Delivered to buyer'}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <p className="font-semibold text-[#17110d]">{formatPrice(item.price, currency)}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>

                            {order.issuedGiftCards && order.issuedGiftCards.length > 0 ? (
                                <div className="border border-[#efe1d5] bg-[#fffdfa] p-4">
                                    <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><Gift className="h-4 w-4" />Issued Gift Cards</p>
                                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                                        {order.issuedGiftCards.map((card) => (
                                            <article key={card.id || card.code} className="border border-[#efe1d5] bg-white p-3 text-sm">
                                                <p className="font-mono font-bold text-[#17110d]">{card.code}</p>
                                                <div className="mt-2 space-y-1 text-xs text-zinc-600">
                                                    <p>Value: <span className="font-semibold text-[#17110d]">{formatPrice(card.initialAmount, currency)}</span></p>
                                                    <p>Owner: <span className="font-semibold text-[#17110d]">{card.currentOwnerEmail}</span></p>
                                                    {card.recipientEmail ? <p>Recipient email: <span className="font-semibold text-[#17110d]">{card.recipientEmail}</span></p> : null}
                                                    {card.recipientName ? <p>Recipient: <span className="font-semibold text-[#17110d]">{card.recipientName}</span></p> : null}
                                                    {card.message ? <p>Message: <span className="font-semibold text-[#17110d]">{card.message}</span></p> : null}
                                                    <p>Status: <span className="font-semibold text-[#17110d]">{card.status}</span></p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </section>

                        <aside className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
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
                                {order.giftCardDiscount && order.giftCardDiscount > 0 ? (
                                    <>
                                        <div className="flex items-center justify-between text-[#1f7a4d]">
                                            <span>Gift Card</span>
                                            <span className="font-semibold">-{formatPrice(order.giftCardDiscount, currency)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Payable</span>
                                            <span className="font-semibold text-[#17110d]">{formatPrice(order.payableAmount ?? order.totalAmount, currency)}</span>
                                        </div>
                                        {order.appliedGiftCardCode ? (
                                            <div className="flex items-center justify-between gap-3">
                                                <span>Gift Card Code</span>
                                                <span className="break-all text-right font-mono font-semibold text-[#17110d]">{order.appliedGiftCardCode}</span>
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
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

                            {canVerifyPayment() ? (
                                <button
                                    type="button"
                                    onClick={() => void handleVerifyPayment()}
                                    disabled={isVerifyingPayment}
                                    className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-bold tracking-[0.08em] text-sky-700 transition hover:bg-sky-100 disabled:opacity-60"
                                >
                                    <CreditCard className="h-4 w-4" />
                                    {isVerifyingPayment ? 'VERIFYING...' : 'VERIFY PAYMENT MANUALLY'}
                                </button>
                            ) : null}
                        </aside>
                    </div>
                ) : null}
            </main>
            <Footer />
        </div>
    )
}
