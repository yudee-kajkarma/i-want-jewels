'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BadgeCheck, Clock3, MapPinHouse, Package, User, CreditCard, Gift } from 'lucide-react'
import { Link, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useCurrency } from '../context/CurrencyContext'
import { getAdminOrderById, updateOrderShippingAddressForAdmin, verifyPaymentStatus } from '../services/orderService'
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
    const [isEditAddressOpen, setIsEditAddressOpen] = useState(false)
    const [isSavingAddress, setIsSavingAddress] = useState(false)
    const [addressForm, setAddressForm] = useState<AdminShippingAddressForm>(EMPTY_SHIPPING_ADDRESS_FORM)
    const [addressError, setAddressError] = useState('')
    const [postalCodeError, setPostalCodeError] = useState('')
    const [isVerifyingPayment, setIsVerifyingPayment] = useState(false)
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

    function canVerifyPayment(): boolean {
        if (!order) return false
        return (
            order.paymentMethod === 'ONLINE' &&
            order.paymentStatus?.toLowerCase() === 'pending' &&
            !!order.sessionId
        )
    }

    return (
        <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-parsi">
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

                            <div className="border border-[#efe1d5] bg-[#fffdfa] p-4 text-sm leading-7 text-zinc-600">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="inline-flex items-center gap-2 font-semibold text-[#17110d]"><MapPinHouse className="h-4 w-4" />Shipping Address</p>
                                    {canEditShippingAddress ? (
                                        <button
                                            type="button"
                                            onClick={openEditShippingAddress}
                                            className="border border-[#e5d7cc] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white"
                                        >
                                            Change Address
                                        </button>
                                    ) : null}
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

                            {isEditAddressOpen ? (
                                <div className="border border-[#efe1d5] bg-white p-4 text-sm">
                                    <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#17110d]">Edit Shipping Address</h3>
                                    <p className="mt-1 text-xs text-zinc-500">Allowed before shipment only.</p>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <label className="space-y-1">
                                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">Country</span>
                                            <select
                                                value={addressForm.country}
                                                onChange={(event) =>
                                                    setAddressForm((currentValue) => ({
                                                        ...currentValue,
                                                        country: event.target.value,
                                                        state: '',
                                                    }))
                                                }
                                                className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                                            >
                                                <option value="">Select country</option>
                                                {countryOptions.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="space-y-1">
                                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">State</span>
                                            <select
                                                value={addressForm.state}
                                                onChange={(event) =>
                                                    setAddressForm((currentValue) => ({
                                                        ...currentValue,
                                                        state: event.target.value,
                                                    }))
                                                }
                                                className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                                            >
                                                <option value="">Select state</option>
                                                {stateOptions.map((state) => (
                                                    <option key={state.code} value={state.code}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="space-y-1">
                                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">City</span>
                                            <input
                                                value={addressForm.city}
                                                onChange={(event) =>
                                                    setAddressForm((currentValue) => ({
                                                        ...currentValue,
                                                        city: event.target.value,
                                                    }))
                                                }
                                                placeholder="City"
                                                className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                                            />
                                        </label>

                                        <label className="space-y-1">
                                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">Postal Code</span>
                                            <input
                                                value={addressForm.postalCode}
                                                onChange={(event) => {
                                                    if (postalCodeError) {
                                                        setPostalCodeError('')
                                                    }

                                                    setAddressForm((currentValue) => ({
                                                        ...currentValue,
                                                        postalCode: event.target.value,
                                                    }))
                                                }}
                                                placeholder="Postal Code"
                                                className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                                            />
                                            {postalCodeError ? <p className="text-xs text-rose-700">{postalCodeError}</p> : null}
                                        </label>

                                        <label className="space-y-1 sm:col-span-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">Street</span>
                                            <input
                                                value={addressForm.street}
                                                onChange={(event) =>
                                                    setAddressForm((currentValue) => ({
                                                        ...currentValue,
                                                        street: event.target.value,
                                                    }))
                                                }
                                                placeholder="Street"
                                                className="w-full border border-[#e5d7cc] px-3 py-2.5 outline-none transition focus:border-[#b88a65]"
                                            />
                                        </label>
                                    </div>

                                    {addressError ? <p className="mt-3 bg-rose-50 px-3 py-2 text-xs text-rose-700">{addressError}</p> : null}

                                    <div className="mt-4 flex flex-wrap justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={closeEditShippingAddress}
                                            disabled={isSavingAddress}
                                            className="border border-[#e5d7cc] px-4 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => void handleUpdateShippingAddress()}
                                            disabled={isSavingAddress}
                                            className="bg-[#111111] px-4 py-2 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {isSavingAddress ? 'Updating...' : 'Update Address'}
                                        </button>
                                    </div>
                                </div>
                            ) : null}

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
                                                <p className="text-xs text-zinc-500">{item.variantName || 'Default'} · Qty {item.quantity}</p>
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
