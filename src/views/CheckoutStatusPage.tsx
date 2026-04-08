'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, RotateCcw, ShoppingBag, XCircle } from 'lucide-react'
import { Link, useSearchParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { addCartItem, clearCartItems } from '../services/cartService'
import { fetchCart } from '../store/cartSlice'
import { useAppDispatch } from '../store/hooks'
import {
  clearCartRestoreSnapshot,
  clearPendingOrderStatus,
  clearSingleCheckoutDraft,
  getCartRestoreSnapshot,
  getPendingOrderStatus,
} from '../utils/checkoutStorage'

export default function CheckoutStatusPage() {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const paymentResult = searchParams.get('payment') === 'cancel' ? 'cancel' : 'success'
  const pendingOrder = useMemo(() => getPendingOrderStatus(), [])
  const [isSyncing, setIsSyncing] = useState(true)
  const [syncError, setSyncError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function syncCartAfterCheckout() {
      try {
        if (pendingOrder?.source === 'single') {
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

          if (paymentResult === 'success') {
            clearSingleCheckoutDraft()
          }
        }

        await dispatch(fetchCart()).unwrap().catch(() => undefined)
      } catch {
        if (isMounted) {
          setSyncError('Order status was updated, but cart synchronization needs another refresh.')
        }
      } finally {
        clearPendingOrderStatus()

        if (isMounted) {
          setIsSyncing(false)
        }
      }
    }

    void syncCartAfterCheckout()

    return () => {
      isMounted = false
    }
  }, [dispatch, paymentResult, pendingOrder?.source])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[980px] px-4 py-10 lg:px-8">
        <section className="overflow-hidden rounded-[36px] border border-[#eadfd4] bg-white shadow-[0_24px_70px_rgba(55,31,10,0.08)]">
          <div className={`px-6 py-8 text-white sm:px-8 ${paymentResult === 'success' ? 'bg-[#17110d]' : 'bg-[#8a2638]'}`}>
            <div className="flex items-center gap-4">
              {paymentResult === 'success' ? <CheckCircle2 className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">Checkout status</p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">
                  {paymentResult === 'success' ? 'Your order was placed successfully' : 'Payment was not completed'}
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-6 py-8 sm:px-8">
            <div className="rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-5 text-sm leading-7 text-zinc-600">
              {pendingOrder?.orderNumber ? (
                <p>
                  Order number: <span className="font-bold text-[#17110d]">{pendingOrder.orderNumber}</span>
                </p>
              ) : null}
              <p>
                {paymentResult === 'success'
                  ? pendingOrder?.paymentMethod === 'ONLINE'
                    ? 'Payment completed and the website return flow finished successfully.'
                    : 'Cash on delivery order was created successfully.'
                  : 'You returned from the payment flow without completing payment. You can retry checkout when ready.'}
              </p>
              {isSyncing ? <p className="mt-3 text-zinc-500">Syncing your cart and checkout state...</p> : null}
              {syncError ? <p className="mt-3 text-rose-600">{syncError}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] !text-white transition hover:bg-[#2e221b]"
              >
                <ShoppingBag className="h-4 w-4" />
                CONTINUE SHOPPING
              </Link>

              <Link
                to={paymentResult === 'success' ? '/orders' : '/checkout'}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#dbc8b8] px-6 py-4 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:!text-white"
              >
                <RotateCcw className="h-4 w-4" />
                {paymentResult === 'success' ? 'VIEW ORDERS' : 'TRY CHECKOUT AGAIN'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}