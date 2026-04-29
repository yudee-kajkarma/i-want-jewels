'use client'

import { Link, useNavigate } from '@/lib/router'
import { Trash2 } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useCurrency } from '../context/CurrencyContext'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { changeCartItemQuantity, clearCart, removeCartItem } from '../store/cartSlice'
import { formatPrice, getPriceAmount } from '../utils/price'
import { clearSingleCheckoutDraft } from '../utils/checkoutStorage'

const fallbackCartThumbnail =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22320%22 viewBox=%220 0 320 320%22%3E%3Crect width=%22320%22 height=%22320%22 fill=%22%23f7efe7%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%238b5f43%22 font-family=%22Arial%22 font-size=%2220%22%3ENo Image%3C/text%3E%3C/svg%3E'

export default function CartPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currency } = useCurrency()
  const cart = useAppSelector((state) => state.cart.cart)
  const isLoading = useAppSelector((state) => state.cart.status === 'loading' || state.cart.mutationStatus === 'loading')
  const itemCount = useAppSelector((state) => state.cart.cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0)
  const subtotal =
    cart?.items.reduce((total, item) => total + getPriceAmount(item.price, currency) * item.quantity, 0) ?? 0

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Cart</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">Your shopping bag</h1>
          </div>
          {cart && cart.items.length > 0 ? (
            <button
              type="button"
              onClick={() => void dispatch(clearCart())}
              className="rounded-full border border-[#e2d1c3] px-5 py-3 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
            >
              CLEAR CART
            </button>
          ) : null}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
          <section className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            {isLoading ? <p className="text-sm text-zinc-500">Loading cart...</p> : null}

            {!isLoading && (!cart || cart.items.length === 0) ? (
              // <div className="flex justify-center">
              <div className="rounded-[28px] border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-[#17110d]">Your cart is empty</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-500">Add a product from the product details page and it will appear here.</p>
                <Link
                  to="/products"
                  className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
              // </div>
            ) : null}

            {!isLoading && cart && cart.items.length > 0 ? (
              <div className="space-y-5">
                {cart.items.map((item) => (
                  <article key={item.id} className="grid gap-5 rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-4 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center">
                    <div className="overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-3">
                      <img
                        src={item.thumbnail?.trim() || fallbackCartThumbnail}
                        alt={item.title}
                        onError={(event) => {
                          event.currentTarget.src = fallbackCartThumbnail
                        }}
                        className="h-28 w-full object-contain"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-[#17110d]">{item.title}</h2>
                      <p className="mt-1 text-sm text-zinc-500">{item.variantTitle || 'Default variant'}</p>
                      <p className="mt-3 text-lg font-bold text-[#17110d]">{formatPrice(item.price, currency)}</p>
                    </div>

                    <div className="flex flex-col items-start gap-4 sm:items-end">
                      <div className="inline-flex items-center overflow-hidden rounded-full border border-[#d8c8bb]">
                        <button
                          type="button"
                          onClick={() => void dispatch(changeCartItemQuantity({ itemId: item.id || item.productId, quantity: Math.max(1, item.quantity - 1) }))}
                          className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-[#111111] hover:text-white"
                        >
                          -
                        </button>
                        <span className="flex h-10 min-w-10 items-center justify-center border-x border-[#d8c8bb] px-4 text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => void dispatch(changeCartItemQuantity({ itemId: item.id || item.productId, quantity: item.quantity + 1 }))}
                          className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-[#111111] hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          void dispatch(
                            removeCartItem({
                              productId: item.productId,
                              variantId: item.variantId,
                            }),
                          )
                        }
                        className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.08em] text-rose-600 transition hover:text-rose-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        REMOVE
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>

          { (!isLoading && cart && cart.items.length > 0) && (
            <aside className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Summary</p>
              <div className="mt-6 space-y-4 text-sm text-zinc-600">
                <div className="flex items-center justify-between">
                  <span>Total items</span>
                  <span className="font-semibold text-[#17110d]">{itemCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#17110d]">{formatPrice(subtotal, currency)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-semibold text-[#17110d]">Free</span>
              </div>
            </div>
            <div className="mt-6 border-t border-[#efe1d5] pt-6">
              <div className="flex items-center justify-between text-lg font-bold text-[#17110d]">
                <span>Total</span>
                <span>{formatPrice(subtotal, currency)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearSingleCheckoutDraft()
                  navigate('/checkout')
                }}
                className="mt-6 w-full rounded-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </aside>)}
        </div>
      </main>
      <Footer />
    </div>
  )
}