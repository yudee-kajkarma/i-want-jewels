'use client'

import { useEffect, useMemo, useState } from 'react'
import { CreditCard, MapPinHouse, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { Link, useLocation, useNavigate } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../services/orderService'
import { addCartItem, clearCartItems } from '../services/cartService'
import { fetchCart } from '../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { CheckoutSource, PaymentMethod, ShippingAddress, SingleCheckoutDraft } from '../types/order'
import { formatEuro } from '../utils/productUtils'
import {
  clearSingleCheckoutDraft,
  clearCartRestoreSnapshot,
  clearPendingOrderStatus,
  getCartRestoreSnapshot,
  getSingleCheckoutDraft,
  setCartRestoreSnapshot,
  setPendingOrderStatus,
  setSingleCheckoutDraft,
} from '../utils/checkoutStorage'

type CheckoutLocationState = {
  source?: CheckoutSource
  draft?: SingleCheckoutDraft
}

function getStringValue(record: Record<string, unknown>, key: string): string {
  const value = record[key]

  return typeof value === 'string' ? value : ''
}

function getBooleanValue(record: Record<string, unknown>, key: string): boolean {
  return record[key] === true
}

function getRecordValue(record: Record<string, unknown>, key: string): Record<string, unknown> | null {
  const value = record[key]

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }

  return null
}

function getSessionAddress(raw: Record<string, unknown> | undefined): ShippingAddress | null {
  if (!raw) {
    return null
  }

  const userRecord = getRecordValue(raw, 'user') ?? getRecordValue(raw, 'data') ?? raw
  const address = getRecordValue(userRecord, 'address') ?? getRecordValue(raw, 'address')

  if (!address) {
    return null
  }

  return {
    street: getStringValue(address, 'street'),
    city: getStringValue(address, 'city'),
    state: getStringValue(address, 'state'),
    postalCode: getStringValue(address, 'postalCode'),
    country: getStringValue(address, 'country'),
    isDefault: getBooleanValue(address, 'isDefault'),
  }
}

function buildReturnUrl(result: 'success' | 'cancel', source: CheckoutSource): string {
  const url = new URL('/checkout/status', window.location.origin)

  url.searchParams.set('payment', result)
  url.searchParams.set('source', source)

  return url.toString()
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { session } = useAuth()
  const cart = useAppSelector((state) => state.cart.cart)
  const cartStatus = useAppSelector((state) => state.cart.status)
  const cartMutationStatus = useAppSelector((state) => state.cart.mutationStatus)
  const locationState = (location.state as CheckoutLocationState | null) ?? null
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (locationState?.source === 'single' && locationState.draft) {
      setSingleCheckoutDraft(locationState.draft)
    }
  }, [locationState])

  const persistedDraft = useMemo(() => getSingleCheckoutDraft(), [location.key])
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const isSingleFromQuery = searchParams.get('source') === 'single'
  const checkoutSource: CheckoutSource = locationState?.source === 'single' || isSingleFromQuery ? 'single' : 'cart'
  const singleDraft = checkoutSource === 'single' ? (locationState?.draft ?? persistedDraft) : null
  const items = checkoutSource === 'single' ? (singleDraft ? [singleDraft.item] : []) : (cart?.items ?? [])
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingAddress = getSessionAddress(session?.raw)
  const isCartLoading = cartStatus === 'loading' || cartMutationStatus === 'loading'

  useEffect(() => {
    if (checkoutSource === 'cart' && !cart && cartStatus === 'idle') {
      void dispatch(fetchCart())
    }
  }, [cart, cartStatus, checkoutSource, dispatch])

  useEffect(() => {
    if (checkoutSource === 'cart') {
      clearSingleCheckoutDraft()
    }
  }, [checkoutSource])

  async function restoreSingleCheckoutSnapshot() {
    const snapshot = getCartRestoreSnapshot()

    await clearCartItems()

    for (const item of snapshot?.items ?? []) {
      await addCartItem({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      })
    }

    clearCartRestoreSnapshot()
  }

  async function handlePlaceOrder() {
    if (items.length === 0 || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setError('')
    clearPendingOrderStatus()

    try {
      if (checkoutSource === 'single') {
        setCartRestoreSnapshot({ items: cart?.items ?? [] })
        await clearCartItems()
        await addCartItem({
          productId: singleDraft!.item.productId,
          variantId: singleDraft!.item.variantId,
          quantity: singleDraft!.item.quantity,
        })
      } else {
        clearCartRestoreSnapshot()
      }

      const result = await createOrder({
        paymentMethod,
        successUrl: paymentMethod === 'ONLINE' ? buildReturnUrl('success', checkoutSource) : undefined,
        cancelUrl: paymentMethod === 'ONLINE' ? buildReturnUrl('cancel', checkoutSource) : undefined,
      })

      setPendingOrderStatus({
        orderId: result.order.id,
        orderNumber: result.order.orderNumber,
        paymentMethod,
        source: checkoutSource,
      })

      await dispatch(fetchCart()).unwrap()

      if (paymentMethod === 'ONLINE') {
        if (!result.checkoutSession?.url) {
          throw new Error('Missing checkout session URL.')
        }

        const checkoutWindow = window.open(
          result.checkoutSession.url,
          'iwjStripeCheckout',
          'popup=yes,width=540,height=760,noopener,noreferrer',
        )

        if (!checkoutWindow) {
          setError('Popup was blocked by your browser. Please allow popups and try again.')
        }

        return
      }

      navigate('/checkout/status?payment=success', { replace: true })
    } catch {
      if (checkoutSource === 'single') {
        await restoreSingleCheckoutSnapshot().catch(() => undefined)
        await dispatch(fetchCart()).unwrap().catch(() => undefined)
      }

      setError('Unable to place this order right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Checkout</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">Review and place your order</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
              Choose your payment method and confirm this order. Online payments open Stripe in a popup window and return here after the payment step.
            </p>
          </div>
          <Link
            to={checkoutSource === 'single' ? (singleDraft?.returnPath ?? '/products') : '/cart'}
            className="rounded-full border border-[#e2d1c3] px-5 py-3 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
          >
            {checkoutSource === 'single' ? 'BACK TO PRODUCT' : 'BACK TO CART'}
          </Link>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_380px]">
          <section className="space-y-6 rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            {checkoutSource === 'cart' && isCartLoading ? <p className="text-sm text-zinc-500">Loading checkout...</p> : null}

            {!isCartLoading && items.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-[#17110d]">Nothing to checkout yet</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {checkoutSource === 'single'
                    ? 'Go back to the product page and choose Buy it now again.'
                    : 'Add products to your cart before placing an order.'}
                </p>
                <Link
                  to={checkoutSource === 'single' ? '/products' : '/cart'}
                  className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
                >
                  {checkoutSource === 'single' ? 'VIEW PRODUCTS' : 'RETURN TO CART'}
                </Link>
              </div>
            ) : null}

            {items.length > 0 ? (
              <>
                <div className="rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex items-center gap-3 text-[#17110d]">
                    <PackageCheck className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Order items</h2>
                  </div>
                  <div className="mt-5 space-y-4">
                    {items.map((item) => (
                      <article key={`${item.productId}-${item.variantId}`} className="grid gap-4 rounded-[24px] border border-[#efe1d5] bg-white p-4 sm:grid-cols-[92px_minmax(0,1fr)_auto] sm:items-center">
                        <div className="overflow-hidden rounded-[18px] bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-2">
                          <img src={item.thumbnail} alt={item.title} className="h-20 w-full object-contain" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#17110d]">{item.title}</h3>
                          <p className="mt-1 text-sm text-zinc-500">{item.variantTitle || 'Default variant'}</p>
                          <p className="mt-1 text-sm text-zinc-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-lg font-bold text-[#17110d]">{formatEuro(item.price * item.quantity)}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div className="rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                    <div className="flex items-center gap-3 text-[#17110d]">
                      <MapPinHouse className="h-5 w-5" />
                      <h2 className="text-xl font-bold">Shipping address</h2>
                    </div>

                    {shippingAddress ? (
                      <div className="mt-5 rounded-[22px] border border-[#eadfd4] bg-white p-4 text-sm leading-7 text-zinc-600">
                        <p className="font-semibold text-[#17110d]">{session?.firstName || session?.username}</p>
                        <p>{shippingAddress.street}</p>
                        <p>
                          {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                        </p>
                        <p>{shippingAddress.country}</p>
                        {shippingAddress.isDefault ? <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#8f2a60]">Default address</p> : null}
                      </div>
                    ) : (
                      <div className="mt-5 rounded-[22px] border border-dashed border-[#dbc8b8] bg-white px-4 py-5 text-sm leading-7 text-zinc-500">
                        No saved address was found in this session. The backend will use your default account address if one exists.
                      </div>
                    )}
                  </div>

                  <div className="rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-5">
                    <div className="flex items-center gap-3 text-[#17110d]">
                      <CreditCard className="h-5 w-5" />
                      <h2 className="text-xl font-bold">Payment method</h2>
                    </div>
                    <div className="mt-5 space-y-3">
                      <label className={`flex cursor-pointer items-start gap-4 rounded-[22px] border px-4 py-4 transition ${paymentMethod === 'ONLINE' ? 'border-[#17110d] bg-white' : 'border-[#eadfd4] bg-white/70 hover:border-[#c4a68b]'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="ONLINE"
                          checked={paymentMethod === 'ONLINE'}
                          onChange={() => setPaymentMethod('ONLINE')}
                          className="mt-1 h-4 w-4 border-[#d8c8bb] text-[#17110d] focus:ring-[#b88a65]"
                        />
                        <div>
                          <p className="font-bold text-[#17110d]">Online payment</p>
                          <p className="mt-1 text-sm leading-6 text-zinc-500">Stripe checkout opens in a popup window to complete payment securely.</p>
                        </div>
                      </label>

                      <label className={`flex cursor-pointer items-start gap-4 rounded-[22px] border px-4 py-4 transition ${paymentMethod === 'COD' ? 'border-[#17110d] bg-white' : 'border-[#eadfd4] bg-white/70 hover:border-[#c4a68b]'}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                          className="mt-1 h-4 w-4 border-[#d8c8bb] text-[#17110d] focus:ring-[#b88a65]"
                        />
                        <div>
                          <p className="font-bold text-[#17110d]">Cash on delivery</p>
                          <p className="mt-1 text-sm leading-6 text-zinc-500">Your order is placed immediately and payment is collected on delivery.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {checkoutSource === 'single' ? (
                  <div className="rounded-[26px] border border-[#f0c4da] bg-[#fff7fb] p-4 text-sm leading-7 text-[#8f2a60]">
                    Buy it now uses a temporary one-item checkout so you can place this order directly from the product page.
                  </div>
                ) : null}

                {error ? <div className="rounded-[24px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
              </>
            ) : null}
          </section>

          <aside className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Order summary</p>
            <div className="mt-6 space-y-4 text-sm text-zinc-600">
              <div className="flex items-center justify-between">
                <span>Checkout type</span>
                <span className="font-semibold text-[#17110d]">{checkoutSource === 'single' ? 'Buy it now' : 'Cart checkout'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span className="font-semibold text-[#17110d]">{totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#17110d]">{formatEuro(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#17110d]">Free</span>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] border border-[#efe1d5] bg-[#fffdfa] p-4">
              <div className="flex items-start gap-3 text-sm leading-6 text-zinc-500">
                {paymentMethod === 'ONLINE' ? <ShieldCheck className="mt-0.5 h-4 w-4 text-[#17110d]" /> : <Truck className="mt-0.5 h-4 w-4 text-[#17110d]" />}
                <p>
                  {paymentMethod === 'ONLINE'
                    ? 'Stripe checkout opens after order creation. Once payment succeeds, you return to this website automatically.'
                    : 'Cash on delivery places the order immediately with no external payment redirect.'}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-[#efe1d5] pt-6">
              <div className="flex items-center justify-between text-lg font-bold text-[#17110d]">
                <span>Total</span>
                <span>{formatEuro(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => void handlePlaceOrder()}
                disabled={items.length === 0 || isSubmitting}
                className="mt-6 w-full rounded-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
              >
                {isSubmitting ? 'PLACING ORDER...' : paymentMethod === 'ONLINE' ? 'PLACE ORDER AND PAY ONLINE' : 'PLACE COD ORDER'}
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}