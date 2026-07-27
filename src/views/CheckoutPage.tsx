'use client'

import { useEffect, useMemo, useState } from 'react'
import { CreditCard, MapPinHouse, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { Link, useLocation, useNavigate } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'
import { createOrder } from '../services/orderService'
import { validateGiftCard, type GiftCardValidation } from '../services/giftCardService'
import { addCartItem, clearCartItems } from '../services/cartService'
import { createUserAddress, getUserAddresses, updateUserAddress } from '../services/userService'
import { fetchCart } from '../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import type { CheckoutSource, PaymentMethod, SingleCheckoutDraft } from '../types/order'
import type { UserAddress, UserProfileAddressPayload } from '../types/profile'
import { getCountryName, getCountryOptions, getStateName, getStateOptions, isValidPostalCode } from '../utils/location'
import { formatPrice, getCurrencyIsoCode, getPriceAmount } from '../utils/price'
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

const EMPTY_ADDRESS_FORM: UserProfileAddressPayload = {
  houseNumber: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'IN',
  isDefault: false,
  addressType: 'home',
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
  const { currency, applyAddressCountry } = useCurrency()
  const cart = useAppSelector((state) => state.cart.cart)
  const cartStatus = useAppSelector((state) => state.cart.status)
  const cartMutationStatus = useAppSelector((state) => state.cart.mutationStatus)
  const locationState = (location.state as CheckoutLocationState | null) ?? null
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [addresses, setAddresses] = useState<UserAddress[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [isAddressLoading, setIsAddressLoading] = useState(true)
  const [isAddressSaving, setIsAddressSaving] = useState(false)
  const [addressError, setAddressError] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [addressForm, setAddressForm] = useState<UserProfileAddressPayload>(EMPTY_ADDRESS_FORM)

  useEffect(() => {
    if (locationState?.source === 'single' && locationState.draft) {
      setSingleCheckoutDraft(locationState.draft)
    }
  }, [locationState])

  const persistedDraft = useMemo(() => getSingleCheckoutDraft(), [location.key])
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const stateOptions = useMemo(() => getStateOptions(addressForm.country), [addressForm.country])
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const isSingleFromQuery = searchParams.get('source') === 'single'
  const checkoutSource: CheckoutSource = locationState?.source === 'single' || isSingleFromQuery ? 'single' : 'cart'
  const singleDraft = checkoutSource === 'single' ? (locationState?.draft ?? persistedDraft) : null
  const items = checkoutSource === 'single' ? (singleDraft ? [singleDraft.item] : []) : (cart?.items ?? [])
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + getPriceAmount(item.price, currency) * item.quantity, 0)
  const isCartLoading = cartStatus === 'loading' || cartMutationStatus === 'loading'
  const hasGiftCardItems = items.some((item) => item.isGiftCard)

  const [giftCodeInput, setGiftCodeInput] = useState('')
  const [giftValidation, setGiftValidation] = useState<GiftCardValidation | null>(null)
  const [giftCheckMessage, setGiftCheckMessage] = useState('')
  const [isCheckingGift, setIsCheckingGift] = useState(false)

  const appliedGiftDiscount =
    giftValidation?.valid && !hasGiftCardItems
      ? Math.min(giftValidation.redeemableAmount ?? 0, subtotal)
      : 0
  const payableTotal = Math.max(0, subtotal - appliedGiftDiscount)

  useEffect(() => {
    // Gift card purchases/redemptions are online-only.
    if ((hasGiftCardItems || (giftValidation?.valid ?? false)) && paymentMethod !== 'ONLINE') {
      setPaymentMethod('ONLINE')
    }
  }, [hasGiftCardItems, giftValidation, paymentMethod])

  async function handleApplyGiftCard() {
    const code = giftCodeInput.trim()
    if (!code) return
    if (hasGiftCardItems) {
      setGiftCheckMessage('A gift card cannot be used to pay for an order that contains gift cards.')
      return
    }
    setIsCheckingGift(true)
    setGiftCheckMessage('')
    try {
      const result = await validateGiftCard(code)
      setGiftValidation(result)
      setGiftCheckMessage(
        result.valid
          ? `Applied — ${formatPrice(result.redeemableAmount ?? 0, currency)} available.`
          : result.reason || 'This gift card cannot be applied.',
      )
    } catch {
      setGiftValidation(null)
      setGiftCheckMessage('Unable to validate this gift card right now.')
    } finally {
      setIsCheckingGift(false)
    }
  }

  function handleRemoveGiftCard() {
    setGiftValidation(null)
    setGiftCodeInput('')
    setGiftCheckMessage('')
  }

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

  useEffect(() => {
    let isMounted = true

    async function loadAddresses() {
      setIsAddressLoading(true)
      setAddressError('')

      try {
        const nextAddresses = await getUserAddresses()

        if (!isMounted) {
          return
        }

        setAddresses(nextAddresses)

        const preferredAddress = nextAddresses.find((address) => address.isDefault) ?? nextAddresses[0]
        setSelectedAddressId((currentAddressId) => currentAddressId || preferredAddress?.id || '')
      } catch {
        if (!isMounted) {
          return
        }

        setAddressError('Unable to load your addresses. Please refresh and try again.')
      } finally {
        if (isMounted) {
          setIsAddressLoading(false)
        }
      }
    }

    void loadAddresses()

    return () => {
      isMounted = false
    }
  }, [])

  const selectedAddress = useMemo(
    () => addresses.find((address) => address.id === selectedAddressId) ?? null,
    [addresses, selectedAddressId],
  )

  // Selecting (or defaulting to) a UK address switches the display to GBP,
  // unless the shopper has made an explicit manual currency choice.
  useEffect(() => {
    applyAddressCountry(selectedAddress?.country)
  }, [selectedAddress?.country, applyAddressCountry])

  function openAddAddressForm() {
    setAddressError('')
    setPostalCodeError('')
    setEditingAddressId(null)
    setAddressForm(EMPTY_ADDRESS_FORM)
    setIsAddressFormOpen(true)
  }

  function openEditAddressForm(address: UserAddress) {
    setAddressError('')
    setPostalCodeError('')
    setEditingAddressId(address.id)
    setAddressForm({
      houseNumber: address.houseNumber,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
      addressType: address.addressType,
    })
    setIsAddressFormOpen(true)
  }

  async function refreshAddresses(preferredAddressId?: string) {
    const nextAddresses = await getUserAddresses()
    setAddresses(nextAddresses)

    const preferredAddress =
      nextAddresses.find((address) => address.id === preferredAddressId) ??
      nextAddresses.find((address) => address.isDefault) ??
      nextAddresses[0] ??
      null

    setSelectedAddressId(preferredAddress?.id ?? '')
  }

  async function handleSaveAddress() {
    if (isAddressSaving) {
      return
    }

    const trimmedPayload: UserProfileAddressPayload = {
      houseNumber: addressForm.houseNumber?.trim() || '',
      street: addressForm.street.trim(),
      city: addressForm.city.trim(),
      state: addressForm.state.trim(),
      postalCode: addressForm.postalCode.trim(),
      country: addressForm.country.trim() || 'IN',
      isDefault: addressForm.isDefault,
      addressType: addressForm.addressType.trim() || 'home',
    }

    setPostalCodeError('')

    if (!trimmedPayload.street || !trimmedPayload.city || !trimmedPayload.state || !trimmedPayload.postalCode || !trimmedPayload.country) {
      setAddressError('Please complete all address fields before saving.')
      return
    }

    if (!isValidPostalCode(trimmedPayload.postalCode, trimmedPayload.country)) {
      setPostalCodeError('Please enter a valid postal code.')
      return
    }

    setIsAddressSaving(true)
    setAddressError('')

    try {
      if (editingAddressId) {
        await updateUserAddress(editingAddressId, trimmedPayload)
        await refreshAddresses(editingAddressId)
      } else {
        const createdAddress = await createUserAddress(trimmedPayload)
        await refreshAddresses(createdAddress.id)
      }

      setIsAddressFormOpen(false)
    } catch {
      setAddressError('Unable to save this address right now. Please try again.')
    } finally {
      setIsAddressSaving(false)
    }
  }

  async function restoreSingleCheckoutSnapshot() {
    const snapshot = getCartRestoreSnapshot()

    await clearCartItems()

    for (const item of snapshot?.items ?? []) {
      await addCartItem({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        ...(item.size !== undefined ? { size: item.size } : {}),
      })
    }

    clearCartRestoreSnapshot()
  }

  async function handlePlaceOrder() {
    if (items.length === 0 || isSubmitting) {
      return
    }

    if (!selectedAddressId) {
      setError('Please select a shipping address before placing your order.')
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
          ...(singleDraft!.item.size !== undefined ? { size: singleDraft!.item.size } : {}),
        })
      } else {
        clearCartRestoreSnapshot()
      }
      

      const effectivePaymentMethod: PaymentMethod =
        hasGiftCardItems || (giftValidation?.valid ?? false) ? 'ONLINE' : paymentMethod

      const result = await createOrder({
        addressId: selectedAddressId,
        paymentMethod: effectivePaymentMethod,
        currency: getCurrencyIsoCode(currency),
        successUrl: effectivePaymentMethod === 'ONLINE' ? buildReturnUrl('success', checkoutSource) : undefined,
        cancelUrl: effectivePaymentMethod === 'ONLINE' ? buildReturnUrl('cancel', checkoutSource) : undefined,
        giftCardCode:
          giftValidation?.valid && !hasGiftCardItems
            ? giftValidation.code ?? giftCodeInput.trim()
            : undefined,
      })

      setPendingOrderStatus({
        orderId: result.order.id,
        orderNumber: result.order.orderNumber,
        paymentMethod: effectivePaymentMethod,
        source: checkoutSource,
      })

      await dispatch(fetchCart()).unwrap()

      if (effectivePaymentMethod === 'ONLINE') {
        if (result.checkoutSession?.url) {
          window.location.assign(result.checkoutSession.url)
          return
        }

        // No Stripe session → order fully covered by the gift card (€0 due).
        navigate('/checkout/status?payment=success', { replace: true })
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
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Checkout</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">Review and place your order</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-500">
              Choose your payment method and confirm this order. Online payments redirect you to Stripe and return you back here after the payment step.
            </p>
          </div>
          <Link
            to={checkoutSource === 'single' ? (singleDraft?.returnPath ?? '/products') : '/cart'}
            className="border border-[#e2d1c3] px-5 py-3 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
          >
            {checkoutSource === 'single' ? 'BACK TO PRODUCT' : 'BACK TO CART'}
          </Link>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_380px]">
          <section className="space-y-6 border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            {checkoutSource === 'cart' && isCartLoading ? <p className="text-sm text-zinc-500">Loading checkout...</p> : null}

            {!isCartLoading && items.length === 0 ? (
              <div className="border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-[#17110d]">Nothing to checkout yet</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {checkoutSource === 'single'
                    ? 'Go back to the product page and choose Buy it now again.'
                    : 'Add products to your cart before placing an order.'}
                </p>
                <Link
                  to={checkoutSource === 'single' ? '/products' : '/cart'}
                  className="mt-6 inline-flex bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
                >
                  {checkoutSource === 'single' ? 'VIEW PRODUCTS' : 'RETURN TO CART'}
                </Link>
              </div>
            ) : null}

            {items.length > 0 ? (
              <>
                <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                  <div className="flex items-center gap-3 text-[#17110d]">
                    <PackageCheck className="h-5 w-5" />
                    <h2 className="text-xl font-bold">Order items</h2>
                  </div>
                  <div className="mt-5 space-y-4">
                    {items.map((item) => (
                      <article key={`${item.productId}-${item.variantId}`} className="grid gap-4 border border-[#efe1d5] bg-white p-4 sm:grid-cols-[92px_minmax(0,1fr)_auto] sm:items-center">
                        <div className="overflow-hidden bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-2">
                          <img src={item.thumbnail} alt={item.title} className="h-20 w-full object-contain" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#17110d]">{item.title}</h3>
                          <p className="mt-1 text-sm text-zinc-500">
                            {item.variantTitle || 'Default variant'}
                            {item.size !== undefined ? ` · Size ${item.size}${item.sizeMeasurement ? ` (${item.sizeMeasurement})` : ''}` : ''}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-lg font-bold text-[#17110d]">{formatPrice(getPriceAmount(item.price, currency) * item.quantity, currency)}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                  <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                    <div className="flex items-center gap-3 text-[#17110d]">
                      <MapPinHouse className="h-5 w-5" />
                      <h2 className="text-xl font-bold">Shipping address</h2>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={openAddAddressForm}
                        className="border border-[#e2d1c3] px-4 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
                      >
                        ADD ADDRESS
                      </button>
                    </div>

                    {isAddressLoading ? <p className="mt-4 text-sm text-zinc-500">Loading your addresses...</p> : null}

                    {!isAddressLoading && addresses.length > 0 ? (
                      <div className="mt-4 space-y-3">
                        {addresses.map((address) => {
                          const isSelected = selectedAddressId === address.id

                          return (
                            <label
                              key={address.id}
                              className={`flex cursor-pointer items-start gap-4 border px-4 py-4 transition ${
                                isSelected ? 'border-[#17110d] bg-white' : 'border-[#eadfd4] bg-white/70 hover:border-[#c4a68b]'
                              }`}
                            >
                              <input
                                type="radio"
                                name="shippingAddress"
                                value={address.id}
                                checked={isSelected}
                                onChange={() => setSelectedAddressId(address.id)}
                                className="mt-1 h-4 w-4 border-[#d8c8bb] text-[#17110d] focus:ring-[#b88a65]"
                              />

                              <div className="flex-1 text-sm leading-7 text-zinc-600">
                                <p className="font-semibold text-[#17110d]">{session?.firstName || session?.username}</p>
                                <p>{[address.houseNumber, address.street].filter(Boolean).join(' ') || address.street}</p>
                                <p>
                                  {address.city}, {getStateName(address.country, address.state)} {address.postalCode}
                                </p>
                                <p>{getCountryName(address.country)}</p>
                                <div className="mt-2 flex flex-wrap items-center gap-3">
                                  {address.isDefault ? (
                                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#8f2a60]">Default address</span>
                                  ) : null}
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.preventDefault()
                                      openEditAddressForm(address)
                                    }}
                                    className="border border-[#e2d1c3] px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
                                  >
                                    EDIT
                                  </button>
                                </div>
                              </div>
                            </label>
                          )
                        })}
                      </div>
                    ) : null}

                    {!isAddressLoading && addresses.length === 0 ? (
                      <div className="mt-5 border border-[#eadfd4] bg-white p-4 text-sm leading-7 text-zinc-600">
                        No addresses found. Add a shipping address to place your order.
                      </div>
                    ) : null}

                    {isAddressFormOpen ? (
                      <div className="mt-5 border border-[#eadfd4] bg-white p-4">
                        <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#17110d]">{editingAddressId ? 'Edit address' : 'Add address'}</h3>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <select
                            value={addressForm.country}
                            onChange={(event) => setAddressForm((currentValue) => ({
                              ...currentValue,
                              country: event.target.value,
                              state: '',
                            }))}
                            className="border border-[#eadfd4] px-3 py-2 text-sm outline-none focus:border-[#b88a65]"
                          >
                            <option value="">Select country</option>
                            {countryOptions.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          <select
                            value={addressForm.state}
                            onChange={(event) =>
                              setAddressForm((currentValue) => ({
                                ...currentValue,
                                state: event.target.value,
                              }))
                            }
                            className="border border-[#eadfd4] px-3 py-2 text-sm outline-none focus:border-[#b88a65]"
                          >
                            <option value="">Select state</option>
                            {stateOptions.map((state) => (
                              <option key={state.code} value={state.code}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          <input
                            value={addressForm.city}
                            onChange={(event) => setAddressForm((currentValue) => ({ ...currentValue, city: event.target.value }))}
                            placeholder="City"
                            className="border border-[#eadfd4] px-3 py-2 text-sm outline-none focus:border-[#b88a65]"
                          />
                          <input
                            value={addressForm.houseNumber ?? ''}
                            onChange={(event) => setAddressForm((currentValue) => ({ ...currentValue, houseNumber: event.target.value }))}
                            placeholder="House number"
                            className="border border-[#eadfd4] px-3 py-2 text-sm outline-none focus:border-[#b88a65]"
                          />
                          <input
                            value={addressForm.street}
                            onChange={(event) => setAddressForm((currentValue) => ({ ...currentValue, street: event.target.value }))}
                            placeholder="Street"
                            className="border border-[#eadfd4] px-3 py-2 text-sm outline-none focus:border-[#b88a65]"
                          />
                          <div>
                            <input
                              value={addressForm.postalCode}
                              onChange={(event) => {
                                if (postalCodeError) {
                                  setPostalCodeError('')
                                }

                                setAddressForm((currentValue) => ({ ...currentValue, postalCode: event.target.value }))
                              }}
                              placeholder="Postal code"
                              className="w-full border border-[#eadfd4] px-3 py-2 text-sm outline-none focus:border-[#b88a65]"
                            />
                            {postalCodeError ? <p className="mt-2 text-xs text-rose-700">{postalCodeError}</p> : null}
                          </div>
                          <input
                            value={addressForm.addressType}
                            onChange={(event) => setAddressForm((currentValue) => ({ ...currentValue, addressType: event.target.value }))}
                            placeholder="Address type (home/work)"
                            className="border border-[#eadfd4] px-3 py-2 text-sm outline-none focus:border-[#b88a65]"
                          />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => void handleSaveAddress()}
                            disabled={isAddressSaving}
                            className="bg-[#111111] px-4 py-2 text-xs font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                          >
                            {isAddressSaving ? 'SAVING...' : 'SAVE ADDRESS'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddressFormOpen(false)}
                            className="border border-[#e2d1c3] px-4 py-2 text-xs font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {addressError ? <p className="mt-4 text-sm text-rose-600">{addressError}</p> : null}

                    {!selectedAddress && !isAddressLoading ? (
                      <p className="mt-4 text-sm text-zinc-500">Select an address to continue checkout.</p>
                    ) : null}
                  </div>

                  <div className="border border-[#efe1d5] bg-[#fffdfa] p-5">
                    <div className="flex items-center gap-3 text-[#17110d]">
                      <CreditCard className="h-5 w-5" />
                      <h2 className="text-xl font-bold">Payment method</h2>
                    </div>
                    <div className="mt-5 space-y-3">
                      <label className={`flex cursor-pointer items-start gap-4 border px-4 py-4 transition ${paymentMethod === 'ONLINE' ? 'border-[#17110d] bg-white' : 'border-[#eadfd4] bg-white/70 hover:border-[#c4a68b]'}`}>
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
                          <p className="mt-1 text-sm leading-6 text-zinc-500">You'll be redirected to Stripe to complete payment securely, and brought back here once it's done.</p>
                        </div>
                      </label>

                      {/* COD option hidden
                      {!hasGiftCardItems ? (
                        <label className={`flex items-start gap-4 border px-4 py-4 transition ${
                          giftValidation?.valid
                            ? 'cursor-not-allowed border-[#eadfd4] bg-zinc-50 opacity-60'
                            : `cursor-pointer ${paymentMethod === 'COD' ? 'border-[#17110d] bg-white' : 'border-[#eadfd4] bg-white/70 hover:border-[#c4a68b]'}`
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="COD"
                            checked={paymentMethod === 'COD'}
                            disabled={giftValidation?.valid ?? false}
                            onChange={() => setPaymentMethod('COD')}
                            className="mt-1 h-4 w-4 border-[#d8c8bb] text-[#17110d] focus:ring-[#b88a65]"
                          />
                          <div>
                            <p className="font-bold text-[#17110d]">Cash on delivery</p>
                            <p className="mt-1 text-sm leading-6 text-zinc-500">
                              {giftValidation?.valid
                                ? 'Not available — a gift card discount has been applied.'
                                : 'Your order is placed immediately and payment is collected on delivery.'}
                            </p>
                          </div>
                        </label>
                      ) : null}
                      */}
                    </div>
                  </div>
                </div>

                {checkoutSource === 'single' ? (
                  <div className="border border-[#f0c4da] bg-[#fff7fb] p-4 text-sm leading-7 text-[#8f2a60]">
                    Buy it now uses a temporary one-item checkout so you can place this order directly from the product page.
                  </div>
                ) : null}

                {error ? <div className="border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{error}</div> : null}
              </>
            ) : null}
          </section>

          <aside className="border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
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
                <span className="font-semibold text-[#17110d]">{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#17110d]">Free</span>
              </div>
              {appliedGiftDiscount > 0 ? (
                <div className="flex items-center justify-between text-[#1f7a4d]">
                  <span>Gift card</span>
                  <span className="font-semibold">−{formatPrice(appliedGiftDiscount, currency)}</span>
                </div>
              ) : null}
            </div>

            {!hasGiftCardItems ? (
              <div className="mt-6 border-t border-[#efe1d5] pt-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Gift card</p>
                {giftValidation?.valid ? (
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-[#17110d]">{giftValidation.code}</span>
                    <button
                      type="button"
                      onClick={handleRemoveGiftCard}
                      className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a53b79] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={giftCodeInput}
                      onChange={(event) => setGiftCodeInput(event.target.value)}
                      placeholder="Enter gift card code"
                      className="h-11 flex-1 border border-[#e7d3c2] px-3 text-sm outline-none focus:border-[#17110d]"
                    />
                    <button
                      type="button"
                      onClick={() => void handleApplyGiftCard()}
                      disabled={isCheckingGift || !giftCodeInput.trim()}
                      className="h-11 border border-[#17110d] bg-[#17110d] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                      {isCheckingGift ? '...' : 'Apply'}
                    </button>
                  </div>
                )}
                {giftCheckMessage ? (
                  <p className={`mt-2 text-xs ${giftValidation?.valid ? 'text-[#1f7a4d]' : 'text-[#b3261e]'}`}>
                    {giftCheckMessage}
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6 border border-[#efe1d5] bg-[#fffdfa] p-4">
              <div className="flex items-start gap-3 text-sm leading-6 text-zinc-500">
                {paymentMethod === 'ONLINE' ? <ShieldCheck className="mt-0.5 h-4 w-4 text-[#17110d]" /> : <Truck className="mt-0.5 h-4 w-4 text-[#17110d]" />}
                <p>
                  {paymentMethod === 'ONLINE'
                    ? 'After order creation you are redirected to Stripe. Once payment succeeds, you return to this website automatically.'
                    : 'Cash on delivery places the order immediately with no external payment redirect.'}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-[#efe1d5] pt-6">
              <div className="flex items-center justify-between text-lg font-bold text-[#17110d]">
                <span>Total</span>
                <span>{formatPrice(payableTotal, currency)}</span>
              </div>
              <button
                type="button"
                onClick={() => void handlePlaceOrder()}
                disabled={items.length === 0 || isSubmitting}
                className="mt-6 w-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
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