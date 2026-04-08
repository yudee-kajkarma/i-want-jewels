'use client'

import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from '@/lib/router'
import { useAuth } from '../../context/AuthContext'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addToCart } from '../../store/cartSlice'
import { addToWishlist, removeWishlistItem } from '../../store/wishlistSlice'
import type { Product } from '../../types/product'
import {
  formatReviewCount,
  formatIndianRupee,
  getMetalToneClass,
  getProductCaption,
  getVariantGallery,
  getVariantImage,
} from '../../utils/productUtils'

type ProductCardProps = {
  item: Product
}

export default function ProductCard({ item }: ProductCardProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const wishlistItem = useAppSelector((state) => state.wishlist.wishlist?.items.find((wishlistEntry) => wishlistEntry.productId === item.id))
  const [selectedVariantId, setSelectedVariantId] = useState(() => item.variants[0]?.id ?? '')
  const [isAdding, setIsAdding] = useState(false)
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false)
  const [isWishlistWaveActive, setIsWishlistWaveActive] = useState(false)
  const wishlistWaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const selectedVariant = item.variants.find((variant) => variant.id === selectedVariantId) ?? item.variants[0]
  const primaryImage = selectedVariant ? getVariantImage(selectedVariant) : ''
  const variantGallery = selectedVariant ? getVariantGallery(selectedVariant) : []
  const hoverImage =
    selectedVariant?.previewImage && selectedVariant.previewImage !== primaryImage
      ? selectedVariant.previewImage
      : variantGallery.find((image) => image.src && image.src !== primaryImage)?.src ?? null
  const basePrice = selectedVariant?.price ?? item.minPrice
  const comparePrice = Math.round(basePrice * 1.1)
  const hasDiscount = comparePrice > basePrice
  const discountPercent = hasDiscount ? Math.round(((comparePrice - basePrice) / comparePrice) * 100) : 0
  const productDetailUrl = `/products/slug/${item.slug || item.id}`

  useEffect(() => {
    setSelectedVariantId(item.variants[0]?.id ?? '')
  }, [item.id, item.variants])

  useEffect(() => {
    return () => {
      if (wishlistWaveTimeoutRef.current) {
        clearTimeout(wishlistWaveTimeoutRef.current)
      }
    }
  }, [])

  async function handleWishlistClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    setIsUpdatingWishlist(true)

    try {
      if (wishlistItem) {
        await dispatch(removeWishlistItem(wishlistItem.id)).unwrap()
        return
      }

      await dispatch(addToWishlist(item.id)).unwrap()
      setIsWishlistWaveActive(true)

      if (wishlistWaveTimeoutRef.current) {
        clearTimeout(wishlistWaveTimeoutRef.current)
      }

      wishlistWaveTimeoutRef.current = setTimeout(() => {
        setIsWishlistWaveActive(false)
        wishlistWaveTimeoutRef.current = null
      }, 520)
    } finally {
      setIsUpdatingWishlist(false)
    }
  }

  async function handleAddToCart(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    const variant = selectedVariant ?? item.variants[0]

    if (!variant) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    setIsAdding(true)

    try {
      await dispatch(
        addToCart({
          productId: item.id,
          quantity: 1,
          variantId: variant.id,
        }),
      ).unwrap()
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#eadfd4] bg-white shadow-[0_18px_45px_rgba(92,63,37,0.08)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] p-5">
        {hasDiscount ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-[#e557b0] px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white">
            NEW
          </span>
        ) : null}

        <button
          type="button"
          onClick={(event) => void handleWishlistClick(event)}
          disabled={isUpdatingWishlist}
          aria-label={wishlistItem ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-white/95 text-sm shadow-sm backdrop-blur-sm transition-all duration-300 ${
            wishlistItem
              ? 'translate-x-0 border-pink-200 text-pink-500 opacity-100'
              : 'translate-x-4 border-[#eadfd4] text-zinc-500 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 hover:border-pink-200 hover:text-pink-500'
          } disabled:opacity-60`}
        >
          <span className={isWishlistWaveActive ? 'wishlist-wave' : ''}>{wishlistItem ? '♥' : '♡'}</span>
        </button>

        <Link
          to={productDetailUrl}
          className="absolute right-4 top-[3.35rem] z-10 flex h-9 w-9 translate-x-4 items-center justify-center rounded-full border border-[#eadfd4] bg-white/95 text-sm text-zinc-500 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
          aria-label="Quick view"
        >
          ◌
        </Link>

        <Link to={productDetailUrl} className="block">
          <div className="relative h-72 w-full">
            <img
              src={primaryImage}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-contain transition duration-500 ${
                hoverImage ? 'opacity-100 group-hover:opacity-0' : 'opacity-100 group-hover:scale-[1.03]'
              }`}
            />
            {hoverImage ? (
              <img
                src={hoverImage}
                alt={`${item.title} alternate view`}
                className="absolute inset-0 h-full w-full object-contain opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-2xl bg-black/20 p-2 backdrop-blur-[2px]">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.12em] text-white">{item.title}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 pointer-events-auto">
              <Link
                to={productDetailUrl}
                className="inline-flex h-8 items-center justify-center rounded-full bg-white px-3 text-[10px] font-bold tracking-[0.08em] text-zinc-900"
              >
                QUICK VIEW
              </Link>
              <button
                type="button"
                onClick={(event) => void handleAddToCart(event)}
                disabled={isAdding}
                className="inline-flex h-8 items-center justify-center rounded-full bg-white px-3 text-[10px] font-bold tracking-[0.08em] text-zinc-900 disabled:opacity-60"
              >
                {isAdding ? 'ADDING...' : 'QUICK SHOP'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-4">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-zinc-700">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#f6efe8] px-2 py-1 text-[#1f1a17]">
            <span aria-hidden="true">★</span>
            {item.rating.toFixed(1)}
          </span>
          <span className="rounded-full border border-[#e6ddd4] px-2 py-1 text-zinc-500">{formatReviewCount(item.reviewsCount)}</span>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">{getProductCaption(item)}</p>
        {/* <Link to={productDetailUrl} className="block">
          <h3 className="text-2xl font-medium leading-8 text-[#17110d] transition hover:text-pink-500">{item.title}</h3>
        </Link> */}
        <div className="flex items-center gap-1.5">
          {item.variants.map((variant) => {
            const metalLabel = variant.title.split('/')[0]?.trim() || variant.title
            const isActive = variant.id === selectedVariant?.id

            return (
              <button
                key={variant.id}
                type="button"
                title={variant.title}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`h-4 w-4 rounded-full border shadow-sm transition ${getMetalToneClass(metalLabel)} ${
                  isActive ? 'ring-2 ring-zinc-900 ring-offset-1' : 'ring-0'
                }`}
              />
            )
          })}
        </div>
        {/* <div className="flex items-start justify-between gap-3">
          <Link to={productDetailUrl} className="block">
            <h3 className="text-lg font-semibold text-[#17110d]">{item.title}</h3>
            <p className="mt-1 text-sm text-zinc-500">{item.category}</p>
          </Link>

          <div className="flex items-center gap-1.5 pt-1">
            {item.metals.slice(0, 3).map((metal) => (
              <span
                key={metal}
                title={metal}
                className={`h-3.5 w-3.5 rounded-full border border-white shadow-sm ${getMetalToneClass(metal)}`}
              />
            ))}
          </div>
        </div> */}

        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div className="space-y-1">
            <p className="text-xl font-bold text-[#17110d]">{formatIndianRupee(basePrice)}</p>
            {hasDiscount ? <p className="text-sm text-zinc-400 line-through">{formatIndianRupee(comparePrice)}</p> : null}
          </div>

          {/* <button
            type="button"
            onClick={(event) => void handleAddToCart(event)}
            disabled={isAdding}
            className="rounded-full border border-[#dbc8b8] px-4 py-2 text-xs font-semibold tracking-[0.1em] text-[#3c2b20] transition hover:border-[#111111] hover:bg-[#111111] hover:text-white disabled:opacity-60"
          >
            {isAdding ? 'ADDING...' : 'ADD TO CART'}
          </button> */}
        </div>
      </div>
    </article>
  )
}
