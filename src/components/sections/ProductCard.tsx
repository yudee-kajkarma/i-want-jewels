'use client'

import { Eye, Heart, ShoppingBag } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from '@/lib/router'
import { useAuth } from '../../context/AuthContext'
import { useCurrency } from '../../context/CurrencyContext'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addToCart } from '../../store/cartSlice'
import { addToWishlist, removeWishlistItem } from '../../store/wishlistSlice'
import { setSingleCheckoutDraft } from '../../utils/checkoutStorage'
import type { Product } from '../../types/product'
import {
  getMetalToneClass,
  getVariantGallery,
  getVariantImage,
} from '../../utils/productUtils'
import { formatPrice, getPriceAmount } from '../../utils/price'

type ProductCardProps = {
  item: Product
  layout?: 'grid' | 'list'
}

function buildListSummary(item: Product): string {
  const categoryLabel = item.category ? item.category.toLowerCase() : 'jewellery'

  if (item.vendor) {
    return `Keep your look refined with this ${categoryLabel} design from ${item.vendor}, made for effortless everyday styling.`
  }

  return `Keep your look refined with this ${categoryLabel} design, made for effortless everyday styling.`
}

export default function ProductCard({ item, layout = 'grid' }: ProductCardProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const { currency } = useCurrency()
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
    (selectedVariant?.previewImage && selectedVariant.previewImage !== primaryImage ? selectedVariant.previewImage : null) ??
    variantGallery.find((image) => image.src && image.src !== primaryImage)?.src ??
    item.variants.find((variant) => variant.previewImage && variant.previewImage !== primaryImage)?.previewImage ??
    item.variants
      .flatMap((variant) => getVariantGallery(variant))
      .find((image) => image.src && image.src !== primaryImage)?.src ??
    null
  const basePrice = selectedVariant?.price ?? item.minPrice
  const basePriceAmount = getPriceAmount(basePrice, currency)
  const comparePriceAmount = Math.round(basePriceAmount / 0.8)
  const hasDiscount = comparePriceAmount > basePriceAmount
  const discountPercent = hasDiscount
    ? Math.round(((comparePriceAmount - basePriceAmount) / comparePriceAmount) * 100)
    : 0
  const productDetailUrl = `/products/slug/${item.slug || item.id}`
  const isNewArrival = item.tags.some((tag) => tag.toLowerCase().includes('new')) || hasDiscount
  const listSummary = buildListSummary(item)

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

  function handleBuyNow(event: React.MouseEvent<HTMLButtonElement>) {
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

    const draft = {
      item: {
        id: `${item.id}-${variant.id}`,
        productId: item.id,
        variantId: variant.id,
        title: item.title,
        variantTitle: variant.title,
        thumbnail: getVariantImage(variant),
        price: variant.price,
        quantity: 1,
      },
      returnPath: location.pathname,
    }

    setSingleCheckoutDraft(draft)
    navigate('/checkout?source=single', {
      state: {
        source: 'single',
        draft,
      },
    })
  }

  if (layout === 'list') {
    return (
      <article className="group grid items-center gap-6 border-b border-[#efe7de] py-8 lg:grid-cols-[300px_minmax(0,1fr)_180px] lg:gap-8">
        <Link to={productDetailUrl} className="relative block overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#fcfaf7_0%,#f6f0ea_100%)]">
          {isNewArrival ? (
            <span className="absolute left-4 top-4 z-20 rounded-full bg-[#f23ea9] px-3 py-1 text-[10px] font-bold leading-none text-white shadow-[0_10px_20px_rgba(242,62,169,0.22)]">
              NEW
            </span>
          ) : null}

          <div className="relative h-[20rem] w-full overflow-hidden">
            <img
              src={primaryImage}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                hoverImage ? 'opacity-100 group-hover:opacity-0' : 'opacity-100 group-hover:scale-[1.03]'
              }`}
            />
            {hoverImage ? (
              <img
                src={hoverImage}
                alt={`${item.title} alternate view`}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        <div className="min-w-0">
          <Link to={productDetailUrl} className="block">
            <h3 className="text-[0.9rem] font-semibold tracking-[-0.04em] text-[#201915] transition hover:text-[#f23ea9]">
              {item.title}
            </h3>
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[#26221f]">
            <p className="text-[1.9rem] font-semibold leading-none tracking-[-0.04em]">{formatPrice(basePrice, currency)}</p>
            {hasDiscount ? <p className="text-lg text-zinc-400 line-through">{formatPrice(comparePriceAmount, currency)}</p> : null}
            {hasDiscount ? (
              <span className="inline-flex rounded-full bg-[#f23ea9] px-3 py-1 text-[12px] font-bold leading-none text-white">
                -{discountPercent}%
              </span>
            ) : null}
          </div>

          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-500">{listSummary}</p>

          <div className="mt-5 flex items-center gap-2.5">
            {item.variants.map((variant) => {
              const metalLabel = variant.title.split('/')[0]?.trim() || variant.title
              const isActive = variant.id === selectedVariant?.id

              return (
                <button
                  key={variant.id}
                  type="button"
                  title={variant.title}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`h-5 w-5 rounded-full border-2 border-white shadow-sm transition ${getMetalToneClass(metalLabel)} ${
                    isActive ? 'ring-1 ring-[#3b342f] ring-offset-2' : 'ring-0'
                  }`}
                />
              )
            })}
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 lg:items-end">
          <button
            type="button"
            onClick={handleBuyNow}
            className="inline-flex h-12 min-w-[152px] items-center justify-center rounded-full border border-[#2c2622] px-6 text-sm font-semibold text-[#161311] transition hover:bg-[#161311] hover:text-white"
          >
            QUICK SHOP
          </button>

          <div className="flex items-center gap-5 text-[#2b2724]">
            <button
              type="button"
              onClick={(event) => void handleWishlistClick(event)}
              disabled={isUpdatingWishlist}
              aria-label={wishlistItem ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`transition hover:text-[#f23ea9] ${wishlistItem ? 'text-[#f23ea9]' : ''} disabled:opacity-60`}
            >
              <Heart className={`h-5 w-5 ${wishlistItem ? 'fill-current' : ''}`} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(event) => void handleAddToCart(event)}
              disabled={isAdding}
              aria-label="Add to cart"
              className="transition hover:text-[#f23ea9] disabled:opacity-60"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </button>

            <Link to={productDetailUrl} className="transition hover:text-[#f23ea9]" aria-label="Quick view">
              <Eye className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col bg-transparent transition-transform duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#fcfaf7_0%,#f6f0ea_100%)] pt-0">
        {isNewArrival ? (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-[#f23ea9] px-3 py-1 text-[10px] font-bold leading-none text-white shadow-[0_10px_20px_rgba(242,62,169,0.22)] ">
            NEW
          </span>
        ) : null}

        <div className="absolute right-4 top-4 z-20 flex translate-x-4 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={(event) => void handleWishlistClick(event)}
            disabled={isUpdatingWishlist}
            aria-label={wishlistItem ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2d2926] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition hover:text-[#f23ea9] ${
              wishlistItem ? 'text-[#f23ea9]' : ''
            } disabled:opacity-60`}
          >
            <span className={isWishlistWaveActive ? 'wishlist-wave' : ''}>
              <Heart className={`h-4 w-4 ${wishlistItem ? 'fill-current' : ''}`} aria-hidden="true" />
            </span>
          </button>

          <button
            type="button"
            onClick={(event) => void handleAddToCart(event)}
            disabled={isAdding}
            aria-label="Add to cart"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2d2926] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition hover:text-[#f23ea9] disabled:opacity-60"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </button>

          <Link
            to={productDetailUrl}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#2d2926] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition hover:text-[#f23ea9]"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>

        <Link to={productDetailUrl} className="block">
          <div className="relative h-[20rem] w-full overflow-hidden">
            <img
              src={primaryImage}
              alt={item.title}
              className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${
                hoverImage ? 'opacity-100 group-hover:opacity-0' : 'opacity-100 group-hover:scale-[1.03]'
              }`}
            />
            {hoverImage ? (
              <img
                src={hoverImage}
                alt={`${item.title} alternate view`}
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
              />
            ) : null}
          </div>
        </Link>

        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="grid grid-cols-2 gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={(event) => void handleAddToCart(event)}
              disabled={isAdding}
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-4 text-[12px] font-semibold text-[#22201d] shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition hover:bg-[#f4f1ee] disabled:opacity-60"
            >
              {isAdding ? 'ADDING...' : 'ADD CART'}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#151515] px-4 text-[12px] font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-black"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-4">
        <Link to={productDetailUrl} className="block">
          <h3 className="text-[0.9rem] font-medium leading-none tracking-[-0.03em] text-[#26221f] transition hover:text-[#f23ea9]">
            {item.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2.5 transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {item.variants.map((variant) => {
            const metalLabel = variant.title.split('/')[0]?.trim() || variant.title
            const isActive = variant.id === selectedVariant?.id

            return (
              <button
                key={variant.id}
                type="button"
                title={variant.title}
                onClick={() => setSelectedVariantId(variant.id)}
                className={`h-5 w-5 rounded-full border-2 border-white shadow-sm transition ${getMetalToneClass(metalLabel)} ${
                  isActive ? 'ring-1 ring-[#3b342f] ring-offset-2' : 'ring-0'
                }`}
              />
            )
          })}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[#26221f]">
          <p className="text-[1.5rem] font-semibold leading-none tracking-[-0.04em]">{formatPrice(basePrice, currency)}</p>
          {hasDiscount ? <p className="text-sm text-zinc-400 line-through">{formatPrice(comparePriceAmount, currency)}</p> : null}
          {hasDiscount ? (
            <span className="inline-flex rounded-full bg-[#f23ea9] px-3 py-1 text-[12px] font-bold leading-none text-white">
              -{discountPercent}%
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )
}
