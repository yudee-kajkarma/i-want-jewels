'use client'

import { Link } from '@/lib/router'
import { Trash2 } from 'lucide-react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearWishlist, removeWishlistItem } from '../store/wishlistSlice'
import { formatIndianRupee } from '../utils/productUtils'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#f2b22f]">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true" className="text-base leading-none">
          {index < Math.round(rating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

export default function WishlistPage() {
  const dispatch = useAppDispatch()
  const wishlist = useAppSelector((state) => state.wishlist.wishlist)
  const isLoading = useAppSelector(
    (state) => state.wishlist.status === 'loading' || state.wishlist.mutationStatus === 'loading',
  )
  const error = useAppSelector((state) => state.wishlist.error)
  const itemCount = wishlist?.items.length ?? 0

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="mx-auto max-w-[1480px] px-4 py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Wishlist</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.05em] text-[#17110d]">Saved pieces you love</h1>
          </div>
          {wishlist && wishlist.items.length > 0 ? (
            <button
              type="button"
              onClick={() => void dispatch(clearWishlist())}
              className="rounded-full border border-[#e2d1c3] px-5 py-3 text-sm font-bold tracking-[0.08em] text-[#3c2b20] transition hover:bg-[#111111] hover:text-white"
            >
              CLEAR WISHLIST
            </button>
          ) : null}
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_360px]">
          <section className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            {isLoading ? <p className="text-sm text-zinc-500">Loading wishlist...</p> : null}

            {!isLoading && error ? (
              <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-6 py-8 text-sm text-rose-700">{error}</div>
            ) : null}

            {!isLoading && (!wishlist || wishlist.items.length === 0) ? (
              <div className="rounded-[28px] border border-dashed border-[#dbc8b8] bg-[#fffdfa] px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-[#17110d]">Your wishlist is empty</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-500">Save products from the listing or product detail page and they will appear here.</p>
                <Link
                  to="/products"
                  className="mt-6 inline-flex rounded-full bg-[#111111] px-6 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b]"
                >
                  BROWSE PRODUCTS
                </Link>
              </div>
            ) : null}

            {!isLoading && wishlist && wishlist.items.length > 0 ? (
              <div className="space-y-5">
                {wishlist.items.map((item) => (
                  
                  <article key={item.id} className="grid gap-5 rounded-[28px] border border-[#efe1d5] bg-[#fffdfa] p-4 sm:grid-cols-[120px_minmax(0,1fr)_auto] sm:items-center">
                    <Link to={`/products/slug/${item.slug || item.productId}`} className="overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#fff5ec_0%,#ffffff_100%)] p-3">
                      <img src={item.thumbnail} alt={item.title} className="h-28 w-full object-contain" />
                    </Link>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-zinc-500">{item.category || 'Jewellery'}</p>
                      <Link to={`/products/slug/${item.slug || item.productId}`} className="mt-1 block text-xl font-bold text-[#17110d] transition hover:text-pink-500">
                        {item.title}
                      </Link>
                      <div className="mt-3 flex items-center gap-3 text-sm text-zinc-500">
                        <StarRating rating={item.rating} />
                        <span>{item.rating.toFixed(1)} / 5</span>
                        <span>{item.reviewsCount} reviews</span>
                      </div>
                      <p className="mt-3 text-lg font-bold text-[#17110d]">{formatIndianRupee(item.price)}</p>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <Link
                        to={`/products/slug/${item.slug || item.productId}`}
                        className="rounded-full border border-[#dbc8b8] px-5 py-3 text-xs font-bold tracking-[0.1em] text-[#3c2b20] transition hover:bg-[#111111] hover:!text-white"
                      >
                        VIEW PRODUCT
                      </Link>
                      <button
                        type="button"
                        onClick={() => void dispatch(removeWishlistItem(item.id))}
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

          <aside className="rounded-[34px] border border-[#eadfd4] bg-white p-6 shadow-[0_20px_60px_rgba(55,31,10,0.06)] sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-zinc-400">Summary</p>
            <div className="mt-6 space-y-4 text-sm text-zinc-600">
              <div className="flex items-center justify-between">
                <span>Saved items</span>
                <span className="font-semibold text-[#17110d]">{itemCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ready to shop</span>
                <span className="font-semibold text-[#17110d]">{itemCount > 0 ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div className="mt-6 border-t border-[#efe1d5] pt-6">
              <p className="text-sm leading-7 text-zinc-500">Open any saved piece to choose its variant and add it to your cart.</p>
              <Link
                to="/products"
                className="mt-6 inline-flex w-full justify-center rounded-full bg-[#111111] px-6 py-4 text-sm font-bold tracking-[0.08em] !text-white transition hover:bg-[#2e221b]"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  )
}