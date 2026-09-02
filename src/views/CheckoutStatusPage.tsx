'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, RotateCcw, ShoppingBag, XCircle } from 'lucide-react'
import { Link, useSearchParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { addCartItem, clearCartItems } from '../services/cartService'
import { getOrderById, verifyPaymentStatus } from '../services/orderService'
import { fetchCart } from '../store/cartSlice'
import type { PendingOrderStatus } from '../types/order'
import { useAppDispatch } from '../store/hooks'
import {
  clearCartRestoreSnapshot,
  clearPendingOrderStatus,
  clearSingleCheckoutDraft,
  getCartRestoreSnapshot,
  getPendingOrderStatus,
} from '../utils/checkoutStorage'
import { useTranslation } from 'react-i18next'

export default function CheckoutStatusPage() {
  const { t, i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const paymentResult = searchParams.get('payment') === 'cancel' ? 'cancel' : 'success'
  // Read after mount, never during render: this lives in browser storage, so
  // the server renders it as null and any render-time read makes the two HTMLs
  // disagree. `hasLoadedPendingOrder` also holds the sync effect until the
  // order it depends on is actually available.
  const [pendingOrder, setPendingOrder] = useState<PendingOrderStatus | null>(null)
  const [hasLoadedPendingOrder, setHasLoadedPendingOrder] = useState(false)

  useEffect(() => {
    setPendingOrder(getPendingOrderStatus())
    setHasLoadedPendingOrder(true)
  }, [])

  const [isSyncing, setIsSyncing] = useState(true)
  const [syncError, setSyncError] = useState('')

  useEffect(() => {
    if (!hasLoadedPendingOrder) {
      return
    }

    let isMounted = true

    async function syncCartAfterCheckout() {
      try {
        if (paymentResult === 'success' && pendingOrder?.paymentMethod === 'ONLINE' && pendingOrder?.orderId) {
          try {
            const order = await getOrderById(pendingOrder.orderId)

            if (order.sessionId && order.paymentStatus?.toLowerCase() === 'pending') {
              await verifyPaymentStatus(order.sessionId)
            }
          } catch {
            console.log('Payment verification sync in progress (webhook handling)')
          }
        }

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
          setSyncError(i18n.t('checkout.syncError'))
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
    // i18n is a stable instance: adding it satisfies the linter without
    // re-running this effect, which would re-verify the payment.
  }, [dispatch, paymentResult, pendingOrder?.source, hasLoadedPendingOrder, i18n])

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900 font-poppins">
      <Header />
      <main className="mx-auto max-w-[980px] px-4 py-10 lg:px-8">
        <section className="overflow-hidden border border-[#eadfd4] bg-white shadow-[0_24px_70px_rgba(55,31,10,0.08)]">
          <div className={`px-6 py-8 text-white sm:px-8 ${paymentResult === 'success' ? 'bg-[#17110d]' : 'bg-[#8a2638]'}`}>
            <div className="flex items-center gap-4">
              {paymentResult === 'success' ? <CheckCircle2 className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">{t('checkout.statusTitle')}</p>
                <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em]">
                  {paymentResult === 'success' ? t('checkout.successTitle') : t('checkout.failTitle')}
                </h1>
              </div>
            </div>
          </div>

          <div className="space-y-6 px-6 py-8 sm:px-8">
            <div className="border border-[#efe1d5] bg-[#fffdfa] p-5 text-sm leading-7 text-zinc-600">
              {pendingOrder?.orderNumber ? (
                <p>
                  {t('checkout.orderNumber')} <span className="font-bold text-[#17110d]">{pendingOrder.orderNumber}</span>
                </p>
              ) : null}
              <p>
                {paymentResult === 'success'
                  ? t('checkout.paymentCompleted')
                  : t('checkout.paymentFailed')}
              </p>
              {isSyncing ? <p className="mt-3 text-zinc-500">{t('checkout.syncing')}</p> : null}
              {syncError ? <p className="mt-3 text-rose-600">{syncError}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] !text-white transition hover:bg-[#2e221b]"
              >
                <ShoppingBag className="h-4 w-4" />
                {t('checkout.continueShopping')}
              </Link>

              <Link
                to={paymentResult === 'success' ? '/orders' : '/checkout'}
                className="inline-flex items-center justify-center gap-2 border border-[#dbc8b8] px-6 py-4 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:!text-white"
              >
                <RotateCcw className="h-4 w-4" />
                {paymentResult === 'success' ? t('checkout.viewOrders') : t('checkout.tryAgain')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}