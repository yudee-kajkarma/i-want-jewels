'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CircleHelp,
  Clock3,
  CreditCard,
  Eye,
  Heart,
  Headset,
  Package,
  PencilLine,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Truck,
  X,
} from 'lucide-react'
import { Link, useLocation, useNavigate, useParams } from '@/lib/router'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import ProductCard from '../components/sections/ProductCard'
import { useAuth } from '../context/AuthContext'
import { useCurrency } from '../context/CurrencyContext'
import {
  createProductReview,
  deleteProductReview,
  getProductBySlug,
  getProductReviews,
  updateProductReview,
} from '../services/productService'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addToCart } from '../store/cartSlice'
import { addToWishlist, removeWishlistItem } from '../store/wishlistSlice'
import type {
  ProductDetail,
  ProductImage,
  ProductReview,
  ProductReviewsPagination,
  ProductReviewsResult,
  ProductVariant,
  ReviewPayload,
} from '../types/product'
import {
  formatReviewCount,
  getMetalToneClass,
  getVariantGallery,
  getVariantImage,
} from '../utils/productUtils'
import { formatPrice, getPriceAmount } from '../utils/price'
import { setSingleCheckoutDraft } from '../utils/checkoutStorage'

const todayBenefits = [
  {
    title: 'Free Shipping',
    description: 'Free shipping on orders over $75.',
  },
  {
    title: 'Support Everyday',
    description: 'Support from 8:30 AM to 10:00 PM everyday',
  },
  {
    title: '100 Day Returns',
    description: 'Not impressed? Get a refund. You have 100 days to break our hearts.',
  },
]

const productFeatureItems = [
  {
    title: 'Shipping Faster',
    description: 'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
  },
  {
    title: 'Cost Material',
    description: 'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
  },
  {
    title: 'High Quality',
    description: 'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
  },
  {
    title: 'Highly Compatible',
    description: 'Use on walls, furniture, doors and many more surfaces. The possibilities are endless.',
  },
]

const aboutProductBullets = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Nulla luctus libero quis mauris vestibulum dapibus.',
  'Maecenas ullamcorper erat mi, vel consequat enim suscipit at.',
  'Quisque consectetur nibh ac urna molestie scelerisque.',
  'Mauris in nisl scelerisque massa consectetur pretium sed et mauris.',
]

const sizeGuideRows = [
  { size: 'XS', bust: '32', waist: '24-25', lowHip: '33-34' },
  { size: 'S', bust: '34-35', waist: '26-27', lowHip: '35-36' },
  { size: 'M', bust: '36-37', waist: '28-29', lowHip: '38-40' },
  { size: 'L', bust: '38-39', waist: '30-31', lowHip: '42-44' },
  { size: 'XL', bust: '40-41', waist: '32-33', lowHip: '45-47' },
  { size: '2XL', bust: '42-43', waist: '34-35', lowHip: '48-50' },
]

function getSuggestedSize(height: number, weight: number): string {
  if (height <= 155 || weight <= 45) {
    return 'XS'
  }

  if (height <= 165 || weight <= 55) {
    return 'S'
  }

  if (height <= 175 || weight <= 65) {
    return 'M'
  }

  if (height <= 185 || weight <= 75) {
    return 'L'
  }

  if (height <= 195 || weight <= 85) {
    return 'XL'
  }

  return '2XL'
}

function StarRating({ rating }: { rating: number }) {
  const filledStars = Math.round(rating)

  return (
    <div className="flex items-center gap-1 text-[#f2b22f]">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true" className="text-lg leading-none">
          {index < filledStars ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

function PaymentIcon({ type }: { type: 'visa' | 'mastercard' | 'rupay' | 'amex' | 'upi' | 'card' }) {
  if (type === 'visa') {
    return (
      <svg viewBox="0 0 72 40" className="h-8 w-full" role="img" aria-label="Visa">
        <rect x="1" y="1" width="70" height="38" rx="8" fill="#ffffff" stroke="#d8d8d8" />
        <text x="36" y="26" textAnchor="middle" fill="#1a4ec7" fontSize="16" fontWeight="700" fontStyle="italic">
          VISA
        </text>
      </svg>
    )
  }

  if (type === 'mastercard') {
    return (
      <svg viewBox="0 0 72 40" className="h-8 w-full" role="img" aria-label="MasterCard">
        <rect x="1" y="1" width="70" height="38" rx="8" fill="#ffffff" stroke="#d8d8d8" />
        <circle cx="30" cy="20" r="10" fill="#eb001b" />
        <circle cx="42" cy="20" r="10" fill="#f79e1b" fillOpacity="0.95" />
      </svg>
    )
  }

  if (type === 'rupay') {
    return (
      <svg viewBox="0 0 72 40" className="h-8 w-full" role="img" aria-label="RuPay">
        <rect x="1" y="1" width="70" height="38" rx="8" fill="#ffffff" stroke="#d8d8d8" />
        <polygon points="12,28 42,28 50,22 20,22" fill="#128b3d" />
        <polygon points="18,22 48,22 56,16 26,16" fill="#f08c23" />
        <text x="48" y="28" textAnchor="middle" fill="#1746a2" fontSize="10" fontWeight="700">
          RuPay
        </text>
      </svg>
    )
  }

  if (type === 'amex') {
    return (
      <svg viewBox="0 0 72 40" className="h-8 w-full" role="img" aria-label="Amex">
        <rect x="1" y="1" width="70" height="38" rx="8" fill="#ffffff" stroke="#d8d8d8" />
        <rect x="10" y="9" width="52" height="22" rx="4" fill="#1f7acb" />
        <text x="36" y="24" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700">
          AMEX
        </text>
      </svg>
    )
  }

  if (type === 'upi') {
    return (
      <svg viewBox="0 0 72 40" className="h-8 w-full" role="img" aria-label="UPI">
        <rect x="1" y="1" width="70" height="38" rx="8" fill="#ffffff" stroke="#d8d8d8" />
        <text x="28" y="25" textAnchor="middle" fill="#222222" fontSize="14" fontWeight="700">
          UPI
        </text>
        <polygon points="44,13 56,20 44,27" fill="#f08c23" />
        <polygon points="49,13 61,20 49,27" fill="#21a453" fillOpacity="0.95" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 72 40" className="h-8 w-full" role="img" aria-label="Card">
      <rect x="1" y="1" width="70" height="38" rx="8" fill="#ffffff" stroke="#d8d8d8" />
      <rect x="1" y="11" width="70" height="8" fill="#2d2d2d" />
      <rect x="10" y="24" width="14" height="7" rx="2" fill="#f0b45b" />
      <rect x="29" y="24" width="26" height="4" rx="2" fill="#8b8b8b" />
    </svg>
  )
}

function ProductFeatureGrid() {
  const featureIcons = [Truck, Package, ShieldCheck, Headset]

  return (
    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {productFeatureItems.map((item, index) => {
        const FeatureIcon = featureIcons[index] ?? ShieldCheck

        return (
          <article key={item.title} className="space-y-3">
            <span className="inline-flex h-10 w-10 items-center justify-center text-[#2a2a2a]">
              <FeatureIcon strokeWidth={1.7} className="h-6 w-6" />
            </span>
            <h4 className="text-[1.65rem] font-semibold tracking-[-0.04em] text-[#191919] sm:text-[1.35rem]">
              {item.title}
            </h4>
            <p className="max-w-[18rem] text-sm leading-7 text-[#6a6a6a]">{item.description}</p>
          </article>
        )
      })}
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1580px] px-4 py-10 lg:px-8">
      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)]">
          <div className="space-y-4">
            <div className="shimmer-surface h-28 rounded-[24px]" />
            <div className="shimmer-surface h-28 rounded-[24px]" />
          </div>
          <div className="shimmer-surface min-h-[520px] rounded-[32px]" />
        </div>
        <div className="space-y-5 rounded-[32px] border border-[#ecdcd0] bg-white p-8 shadow-[0_20px_60px_rgba(55,31,10,0.08)]">
          <div className="shimmer-surface h-8 w-1/2 rounded-full" />
          <div className="shimmer-surface h-5 w-1/3 rounded-full" />
          <div className="shimmer-surface h-10 w-32 rounded-full" />
          <div className="shimmer-surface h-5 w-40 rounded-full" />
          <div className="flex gap-2">
            <div className="shimmer-surface h-6 w-6 rounded-full" />
            <div className="shimmer-surface h-6 w-6 rounded-full" />
            <div className="shimmer-surface h-6 w-6 rounded-full" />
          </div>
          <div className="shimmer-surface h-32 rounded-[24px]" />
          <div className="shimmer-surface h-12 rounded-full" />
          <div className="shimmer-surface h-12 rounded-full" />
        </div>
      </div>
    </div>
  )
}

function formatReviewDate(value: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

function getReviewHeadline(comment: string): string {
  const trimmedComment = comment.trim()

  if (!trimmedComment) {
    return 'Customer Review'
  }

  return trimmedComment.length > 52 ? `${trimmedComment.slice(0, 52)}...` : trimmedComment
}

function getInitialVariantId(product: ProductDetail | null): string {
  return product?.variants[0]?.id ?? ''
}

function getInitialImageId(product: ProductDetail | null): string {
  const firstVariant = product?.variants[0]
  const firstImage = firstVariant ? getVariantGallery(firstVariant)[0] : undefined

  return firstImage?.id ?? ''
}

const initialReviewForm: ReviewPayload = {
  rating: 5,
  comment: '',
}

const reviewRatingOptions = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5]

type ProductDetailPageProps = {
  initialProduct?: ProductDetail | null
  initialReviewsData?: ProductReviewsResult | null
}

export default function ProductDetailPage({
  initialProduct = null,
  initialReviewsData = null,
}: ProductDetailPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<{ slug?: string | string[]; productId?: string | string[] }>()
  const slugParam = typeof params.slug === 'string' ? params.slug : ''
  const legacyProductIdParam = typeof params.productId === 'string' ? params.productId : ''
  const productIdentifier = slugParam || legacyProductIdParam
  const { isAuthenticated, session } = useAuth()
  const { currency } = useCurrency()
  const dispatch = useAppDispatch()
  const [product, setProduct] = useState<ProductDetail | null>(initialProduct)
  const resolvedProductId = product?.id ?? initialProduct?.id ?? ''
  const shouldSkipInitialFetchRef = useRef(
    Boolean(initialReviewsData) && Boolean(initialProduct) && (initialProduct?.slug === slugParam || initialProduct?.id === productIdentifier),
  )
  const wishlistItem = useAppSelector((state) =>
    state.wishlist.wishlist?.items.find((item) => item.productId === resolvedProductId),
  )
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviewsData?.reviews ?? [])
  const [reviewsPagination, setReviewsPagination] = useState<ProductReviewsPagination | null>(
    initialReviewsData?.pagination ?? null,
  )
  const [isLoading, setIsLoading] = useState(!initialProduct)
  const [error, setError] = useState('')
  const [selectedVariantId, setSelectedVariantId] = useState(getInitialVariantId(initialProduct))
  const [selectedImageId, setSelectedImageId] = useState(getInitialImageId(initialProduct))
  const [quantity, setQuantity] = useState(1)
  const [cartFeedback, setCartFeedback] = useState('')
  const [wishlistFeedback, setWishlistFeedback] = useState('')
  const [reviewFeedback, setReviewFeedback] = useState('')
  const [reviewForm, setReviewForm] = useState<ReviewPayload>(initialReviewForm)
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)
  const [activeInfoTab, setActiveInfoTab] = useState<'description' | 'specifications'>('description')
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)
  const [sizeGuideHeight, setSizeGuideHeight] = useState(200)
  const [sizeGuideWeight, setSizeGuideWeight] = useState(90)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  async function loadReviews(targetProductId: string) {
    const reviewsResponse = await getProductReviews(targetProductId)

    setReviews(reviewsResponse.reviews)
    setReviewsPagination(reviewsResponse.pagination)
  }

  useEffect(() => {
    let isMounted = true

    if (shouldSkipInitialFetchRef.current && (initialProduct?.slug === slugParam || initialProduct?.id === productIdentifier)) {
      shouldSkipInitialFetchRef.current = false
      return () => {
        isMounted = false
      }
    }

    async function loadProduct() {
      setIsLoading(true)

      try {
        const productResponse = await getProductBySlug(productIdentifier)
        const reviewsResponse = await getProductReviews(productResponse.id)

        if (!isMounted) {
          return
        }

        const firstVariant = productResponse.variants[0]
        const firstImage = firstVariant ? getVariantGallery(firstVariant)[0] : undefined

        setProduct(productResponse)
        setReviews(reviewsResponse.reviews)
        setReviewsPagination(reviewsResponse.pagination)
        setSelectedVariantId(firstVariant?.id ?? '')
        setSelectedImageId(firstImage?.id ?? '')
        setQuantity(1)
        setReviewForm(initialReviewForm)
        setActiveInfoTab('description')
        setReviewFeedback('')
        setIsReviewFormOpen(false)
        setError('')
      } catch {
        if (!isMounted) {
          return
        }

        setProduct(null)
        setReviews([])
        setReviewsPagination(null)
        setError('Unable to load this product right now.')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (productIdentifier) {
      void loadProduct()
    }

    return () => {
      isMounted = false
    }
  }, [initialProduct?.id, initialProduct?.slug, productIdentifier, slugParam])

  useEffect(() => {
    if (!isSizeGuideOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSizeGuideOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isSizeGuideOpen])

  const selectedVariant = useMemo<ProductVariant | undefined>(() => {
    if (!product) {
      return undefined
    }

    return product.variants.find((variant) => variant.id === selectedVariantId) ?? product.variants[0]
  }, [product, selectedVariantId])

  const galleryImages = useMemo<ProductImage[]>(() => {
    if (!selectedVariant) {
      return []
    }

    return getVariantGallery(selectedVariant)
  }, [selectedVariant])

  const selectedImage =
    galleryImages.find((image) => image.id === selectedImageId) ?? galleryImages[0]

  const currentUserReview = useMemo(() => {
    if (!session) {
      return undefined
    }

    return reviews.find(
      (review) =>
        review.isEditable ||
        review.userEmail === session.email ||
        review.reviewerEmail === session.email ||
        review.username === session.username,
    )
  }, [reviews, session])

  const totalReviewCount = reviewsPagination?.totalReviews ?? product?.reviewsCount ?? 0
  const averageReviewRating =
    reviews.length > 0 ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length : (product?.rating ?? 0)
  const suggestedSize = getSuggestedSize(sizeGuideHeight, sizeGuideWeight)
  const basePrice = selectedVariant?.price
  const basePriceAmount = getPriceAmount(basePrice, currency)
  const comparePriceAmount = Math.round(basePriceAmount / 0.625)
  const discountPercent = Math.max(
    1,
    Math.round(((comparePriceAmount - basePriceAmount) / Math.max(comparePriceAmount, 1)) * 100),
  )

  const reviewBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => Math.round(review.rating) === star).length
    const width = totalReviewCount > 0 ? (count / totalReviewCount) * 100 : 0

    return { star, count, width }
  })

  function handleVariantChange(variant: ProductVariant) {
    const nextGallery = getVariantGallery(variant)

    setSelectedVariantId(variant.id)
    setSelectedImageId(nextGallery[0]?.id ?? '')
  }

  async function handleAddToCart() {
    if (!product || !selectedVariant) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    setIsAddingToCart(true)
    setCartFeedback('')

    try {
      await dispatch(addToCart({
        productId: product.id,
        quantity,
        variantId: selectedVariant.id,
      })).unwrap()

      setCartFeedback('Item added to cart successfully.')
    } catch {
      setCartFeedback('Unable to add this item to cart right now.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  function handleBuyNow() {
    if (!product || !selectedVariant) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    const draft = {
      item: {
        id: `${product.id}-${selectedVariant.id}`,
        productId: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        variantTitle: selectedVariant.title,
        thumbnail: getVariantImage(selectedVariant),
        price: selectedVariant.price,
        quantity,
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

  async function handleWishlistAction() {
    if (!product) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    setIsUpdatingWishlist(true)
    setWishlistFeedback('')

    try {
      if (wishlistItem) {
        await dispatch(removeWishlistItem(wishlistItem.id)).unwrap()
        setWishlistFeedback('Item removed from wishlist.')
        return
      }

      await dispatch(addToWishlist(product.id)).unwrap()
      setWishlistFeedback('Item saved to wishlist.')
    } catch {
      setWishlistFeedback('Unable to update wishlist right now.')
    } finally {
      setIsUpdatingWishlist(false)
    }
  }

  function openReviewForm() {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    if (currentUserReview) {
      setReviewForm({
        rating: currentUserReview.rating,
        comment: currentUserReview.comment,
      })
    } else {
      setReviewForm(initialReviewForm)
    }

    setReviewFeedback('')
    setIsReviewFormOpen(true)
  }

  async function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!product) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    if (!reviewForm.comment.trim()) {
      setReviewFeedback('Review comment is required.')
      return
    }

    setIsSubmittingReview(true)
    setReviewFeedback('')

    try {
      if (currentUserReview) {
        await updateProductReview(currentUserReview.id, {
          rating: reviewForm.rating,
          comment: reviewForm.comment.trim(),
        })
        setReviewFeedback('Review updated successfully.')
      } else {
        await createProductReview(product.id, {
          rating: reviewForm.rating,
          comment: reviewForm.comment.trim(),
        })
        setReviewFeedback('Review added successfully.')
      }

      await loadReviews(product.id)
      setIsReviewFormOpen(false)
      setReviewForm(initialReviewForm)
    } catch {
      setReviewFeedback('Unable to save review right now.')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  async function handleDeleteReview() {
    if (!product || !currentUserReview) {
      return
    }

    setIsSubmittingReview(true)
    setReviewFeedback('')

    try {
      await deleteProductReview(currentUserReview.id)
      await loadReviews(product.id)
      setReviewForm(initialReviewForm)
      setIsReviewFormOpen(false)
      setReviewFeedback('Review deleted successfully. You can add a new review now.')
    } catch {
      setReviewFeedback('Unable to delete review right now.')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="pb-16">
        {isLoading ? <ProductDetailSkeleton /> : null}

        {!isLoading && error ? (
          <div className="mx-auto max-w-[1580px] px-4 py-10 lg:px-8">
            <div className="rounded-[32px] border border-rose-200 bg-rose-50 px-6 py-8 text-rose-700">{error}</div>
          </div>
        ) : null}

        {!isLoading && product && selectedVariant ? (
          <div className="mx-auto max-w-[1580px] px-4 py-8 lg:px-8">
            <nav className="mb-6 text-sm text-zinc-500">
              <Link to="/" className="transition hover:text-zinc-900">
                Home
              </Link>{' '}
              /{' '}
              <Link to="/products" className="transition hover:text-zinc-900">
                All Products
              </Link>{' '}
              / <span className="text-zinc-900">{product.title}</span>
            </nav>

            <section className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                <div className="grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)]">
                  <div className="order-2 flex gap-4 overflow-x-auto pb-2 lg:order-1 lg:flex-col lg:overflow-visible">
                    {galleryImages.map((image) => {
                      const isSelectedImage = selectedImage?.id === image.id

                      return (
                        <button
                          key={image.id}
                          type="button"
                          onClick={() => setSelectedImageId(image.id)}
                          className={`min-w-[132px] overflow-hidden rounded-[24px] border bg-white p-2 shadow-sm transition lg:min-w-0 ${
                            isSelectedImage ? 'border-[#111111]' : 'border-[#eadfd4] hover:border-[#8f6b52]'
                          }`}
                        >
                          <img src={image.src} alt={product.title} className="h-28 w-full object-cover" />
                        </button>
                      )
                    })}
                  </div>

                  <div className="order-1 overflow-hidden rounded-[34px] p-6 object-cover lg:order-2">
                    <img
                      src={selectedImage?.src ?? getVariantImage(selectedVariant)}
                      alt={product.title}
                      className="h-[540px] w-full object-contain"
                    />
                  </div>
                </div>

              </div>

              <div className="space-y-6 bg-white p-2 sm:p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">FASHION</p>
                    <h1 className="mt-1 text-[2.15rem] font-semibold tracking-[-0.05em] text-[#151515]">{product.title}</h1>
                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                      <StarRating rating={averageReviewRating} />
                      <span>({formatReviewCount(totalReviewCount)} reviews)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => void handleWishlistAction()}
                    disabled={isUpdatingWishlist}
                    className={`flex h-8 w-8 items-center justify-center rounded-md border transition disabled:opacity-60 ${
                      wishlistItem
                        ? 'border-[#111111] bg-[#111111] text-white'
                        : 'border-[#d9d9d9] text-zinc-600 hover:border-zinc-900 hover:text-zinc-900'
                    }`}
                    aria-label={wishlistItem ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlistItem ? 'fill-current' : ''}`}
                      strokeWidth={1.9}
                    />
                  </button>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-[2rem] font-semibold text-[#151515]">{formatPrice(basePrice, currency)}</p>
                    {/* <p className="text-base text-zinc-400 line-through">{formatPrice(comparePriceAmount, currency)}</p> */}
                    {/* <span className="rounded-full bg-[#ff48b2] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                      -{discountPercent}%
                    </span> */}
                  </div>
                  <p className="mt-4 max-w-[36rem] text-sm leading-7 text-zinc-500">{product.description}</p>
                </div>

                <div className="border-y border-[#ebebeb] py-4 text-sm text-zinc-700">
                  <p className="font-medium text-zinc-900">
                    Colors:
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleVariantChange(variant)}
                        title={variant.title}
                        className={`h-6 w-6 rounded-full border transition ${
                          selectedVariant.id === variant.id ? 'border-[#171717]' : 'border-transparent'
                        }`}
                      >
                        <span className={`block h-full w-full rounded-full ${getMetalToneClass(variant.title)}`} />
                      </button>
                    ))}
                  </div>

                  {/* <div className="mt-6 flex items-center justify-between text-sm">
                    <p className="font-medium text-zinc-900">Size:</p>
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[11px] font-medium text-[#c26b5d] underline underline-offset-2"
                    >
                      Size Guide
                    </button>
                  </div> */}

                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-zinc-900">Quantity:</p>
                    <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
                      <div className="inline-flex items-center rounded-md border border-[#d9d9d9]">
                        <button
                          type="button"
                          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                          className="flex h-9 w-9 items-center justify-center text-base text-zinc-700"
                        >
                          -
                        </button>
                        <span className="flex h-9 min-w-12 items-center justify-center border-x border-[#d9d9d9] px-3 text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((value) => value + 1)}
                          className="flex h-9 w-9 items-center justify-center text-base text-zinc-700"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => void handleAddToCart()}
                        disabled={isAddingToCart}
                        className="w-full rounded-xl border border-[#1a1a1a] px-4 py-3 text-xs font-bold tracking-[0.12em] text-[#1a1a1a] transition hover:bg-[#1a1a1a] hover:text-white disabled:opacity-60"
                      >
                        {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full rounded-xl bg-[#1a1a1a] px-4 py-3 text-xs font-bold tracking-[0.12em] text-white transition hover:bg-[#303030] disabled:opacity-60"
                  >
                    BUY IT NOW
                  </button>
                </div>

                {cartFeedback ? <p className="text-xs text-zinc-600">{cartFeedback}</p> : null}
                {wishlistFeedback ? <p className="text-xs text-zinc-600">{wishlistFeedback}</p> : null}

                <div className="space-y-2 pt-1 text-[13px] leading-6 text-zinc-700">
                  <div className="flex flex-wrap items-center gap-5">
                    <p className="inline-flex items-center gap-2 font-semibold text-zinc-900">
                      <RotateCcw strokeWidth={2.4} className="h-3.5 w-3.5" />
                      Delivery & Return
                    </p>
                    <p className="inline-flex items-center gap-2 font-semibold text-zinc-900">
                      <CircleHelp strokeWidth={2.4} className="h-3.5 w-3.5" />
                      Ask A Question
                    </p>
                  </div>
                  <div>
                  <p className="inline-flex items-center gap-2">
                    <Clock3 strokeWidth={2.4} className="h-3.5 w-3.5" />
                    <span className="font-semibold text-zinc-900">Estimated Delivery:</span>
                    <span className="text-zinc-500">14 January - 18 January</span>
                  </p>
                  </div>
                  <div>
                  {/* <p className="inline-flex items-center gap-2">
                    <Eye strokeWidth={2.4} className="h-3.5 w-3.5" />
                    <span className="font-semibold text-zinc-900">38</span>
                    <span>people viewing this product right now</span>
                  </p> */}
                  </div>
                  <p><span className="font-semibold text-zinc-900">SKU:</span> <span className="text-zinc-500">{selectedVariant.sku ?? 'N/A'}</span></p>
                  {/* <p><span className="font-semibold text-zinc-900">Categories:</span> <span className="text-zinc-500">{product.category}, {product.vendor}</span></p>
                  <p><span className="font-semibold text-zinc-900">Tag:</span> <span className="text-zinc-500">{product.tags[0] ?? 'new'}</span></p> */}
                </div>

                <div className="rounded-2xl border border-[#e9e5df] p-4">
                  <p className="text-center text-sm font-semibold text-zinc-900">Guaranteed Safe Checkout</p>
                  <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
                    <span className="flex items-center justify-center rounded-md bg-[#f8f8f8] p-1"><PaymentIcon type="visa" /></span>
                    <span className="flex items-center justify-center rounded-md bg-[#f8f8f8] p-1"><PaymentIcon type="mastercard" /></span>
                    <span className="flex items-center justify-center rounded-md bg-[#f8f8f8] p-1"><PaymentIcon type="rupay" /></span>
                    <span className="flex items-center justify-center rounded-md bg-[#f8f8f8] p-1"><PaymentIcon type="amex" /></span>
                    <span className="flex items-center justify-center rounded-md bg-[#f8f8f8] p-1"><PaymentIcon type="upi" /></span>
                    <span className="flex items-center justify-center rounded-md bg-[#f8f8f8] p-1"><PaymentIcon type="card" /></span>
                  </div>
                </div>
                {/* <div className="border-t border-[#ebebeb] pt-4">
                  <h3 className="text-sm font-semibold leading-none tracking-[-0.03em] text-[#111111]">Get It Today</h3>
                  <div className="mt-5 space-y-4">
                    {todayBenefits.map((item) => {
                      const ItemIcon = item.title === 'Free Shipping'
                        ? Truck
                        : item.title === 'Support Everyday'
                          ? Headset
                          : Package

                      return (
                        <div key={item.title} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center text-zinc-900">
                            <ItemIcon strokeWidth={1.9} className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold leading-none tracking-[-0.03em] text-[#111111]">{item.title}</p>
                            <p className="mt-1 text-sm leading-7 text-[#6b7280]">{item.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div> */}
              </div>
            </section>

            <section className="mx-auto mt-16 max-w-[1150px] border-t border-[#e7e7e7] pt-10">
              <div className="flex items-center justify-center gap-12 border-b border-[#e7e7e7]">
                <button
                  type="button"
                  onClick={() => setActiveInfoTab('description')}
                  className={`pb-3 text-[1.15rem] font-semibold transition ${
                    activeInfoTab === 'description' ? 'border-b-2 border-[#1a1a1a] text-[#1a1a1a]' : 'text-zinc-500'
                  }`}
                >
                  Description
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInfoTab('specifications')}
                  className={`pb-3 text-[1.15rem] font-semibold transition ${
                    activeInfoTab === 'specifications' ? 'border-b-2 border-[#1a1a1a] text-[#1a1a1a]' : 'text-zinc-500'
                  }`}
                >
                  Specifications
                </button>
              </div>

              {activeInfoTab === 'description' ? (
                <div className="grid gap-14 py-10 md:grid-cols-2">
                  <div>
                    <h3 className="text-[1.15rem] font-semibold text-[#1a1a1a]">Description</h3>
                    <p className="mt-3 text-base leading-8 text-zinc-600">{product.details || product.description}</p>
                  </div>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold text-[#1a1a1a]">About This Products</h3>
                    <ul className="mt-3 space-y-2 text-base leading-8 text-zinc-600">
                      {aboutProductBullets.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-3 block h-1 w-1 rounded-full bg-zinc-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-[620px] py-10">
                  <div className="overflow-hidden">
                    {[
                      ['Rating', `★★★★★ (${formatReviewCount(totalReviewCount)})`],
                      ['Outer Shell', product.stoneType || '100% polyester'],
                      ['Lining', product.certificate || '100% polyurethane'],
                      ['Size', 'S, M, L, XL'],
                      ['Colors', product.metals?.join(', ') || selectedVariant.title],
                      ['Care', '⊘  ⌫  ⌗'],
                    ].map(([label, value], index) => (
                      <div
                        key={label}
                        className={`grid grid-cols-[145px_minmax(0,1fr)] gap-4 px-8 py-4 text-sm ${
                          index < 5 ? 'mb-3 bg-[#f5f5f5]' : ''
                        }`}
                      >
                        <span className="font-medium text-[#1a1a1a]">{label}</span>
                        <span className={label === 'Rating' ? 'text-[#d29c1f]' : 'text-zinc-700'}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <ProductFeatureGrid />
            </section>

            <section className="mt-16 border border-[#e7e7e7] bg-white px-6 py-8 sm:px-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-[#171717]">Customer Review</h2>
                <button
                  type="button"
                  onClick={openReviewForm}
                  className="flex items-center gap-2 border border-[#191919] px-4 py-2 text-[11px] font-bold tracking-[0.12em] text-[#191919] transition hover:bg-[#191919] hover:text-white"
                >
                  <PencilLine className="h-4 w-4" />
                  {currentUserReview ? 'EDIT REVIEW' : 'WRITE REVIEW'}
                </button>
              </div>

              <div className="mt-6 grid gap-8 border-b border-[#ececec] pb-8 lg:grid-cols-[220px_minmax(0,1fr)]">
                <div>
                  <p className="text-5xl font-semibold leading-none text-[#191919]">{averageReviewRating.toFixed(1)}</p>
                  <div className="mt-2">
                    <StarRating rating={averageReviewRating} />
                  </div>
                  <p className="mt-2 text-xs text-zinc-500">({formatReviewCount(totalReviewCount)}) Rating</p>
                </div>

                <div className="space-y-2">
                  {reviewBreakdown.map((item) => (
                    <div key={item.star} className="grid grid-cols-[24px_1fr_36px] items-center gap-3 text-xs text-zinc-500">
                      <span>{item.star}</span>
                      <div className="h-2 overflow-hidden rounded-full bg-[#ececec]">
                        <div className="h-full bg-[#d29c1f]" style={{ width: `${item.width}%` }} />
                      </div>
                      <span>{item.count}</span>
                    </div>
                  ))}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Newest', '5 Star', '4 Star', '3 Star', '2 Star', '1 Star'].map((filter) => (
                      <span key={filter} className="rounded-full border border-[#dddddd] px-3 py-1 text-[11px] text-zinc-600">
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {isReviewFormOpen ? (
                <form onSubmit={(event) => void handleReviewSubmit(event)} className="mt-8 border border-[#ebebeb] bg-[#fcfcfc] p-6 text-left">
                  <div className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:items-start">
                    <label className="text-sm font-semibold text-[#17110d]">
                      Rating
                      <select
                        value={reviewForm.rating}
                        onChange={(event) => setReviewForm((current) => ({ ...current, rating: Number(event.target.value) }))}
                        className="mt-2 h-12 w-full border border-[#dfdfdf] bg-white px-4 text-sm text-zinc-800 outline-none transition focus:border-[#8f8f8f]"
                      >
                        {reviewRatingOptions.map((rating) => (
                          <option key={rating} value={rating}>
                            {rating} / 5
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="text-sm font-semibold text-[#17110d]">
                      Comment
                      <textarea
                        value={reviewForm.comment}
                        onChange={(event) => setReviewForm((current) => ({ ...current, comment: event.target.value }))}
                        rows={5}
                        className="mt-2 w-full border border-[#dfdfdf] bg-white px-4 py-3 text-sm text-zinc-800 outline-none transition focus:border-[#8f8f8f]"
                        placeholder="Share your experience with this product."
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="flex items-center gap-2 bg-[#111111] px-6 py-3 text-xs font-bold tracking-[0.12em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
                    >
                      <PencilLine className="h-4 w-4" />
                      {isSubmittingReview ? 'SAVING...' : currentUserReview ? 'UPDATE REVIEW' : 'SUBMIT REVIEW'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsReviewFormOpen(false)
                        setReviewFeedback('')
                        setReviewForm(initialReviewForm)
                      }}
                      className="border border-[#cfcfcf] px-6 py-3 text-xs font-bold tracking-[0.12em] text-zinc-700 transition hover:bg-[#111111] hover:text-white"
                    >
                      CANCEL
                    </button>
                    {currentUserReview ? (
                      <button
                        type="button"
                        onClick={() => void handleDeleteReview()}
                        disabled={isSubmittingReview}
                        className="flex items-center gap-2 border border-rose-300 px-6 py-3 text-xs font-bold tracking-[0.12em] text-rose-600 transition hover:bg-rose-600 hover:text-white disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        DELETE REVIEW
                      </button>
                    ) : null}
                  </div>
                </form>
              ) : null}

              {reviewFeedback ? <p className="mt-6 text-center text-sm text-zinc-600">{reviewFeedback}</p> : null}

              <div className="mt-8 space-y-6">
                {reviews.length === 0 ? (
                  <div className="border border-dashed border-[#dddddd] bg-[#fcfcfc] px-6 py-10 text-center">
                    <h3 className="text-xl font-semibold text-[#17110d]">No reviews yet</h3>
                    <p className="mt-2 text-sm text-zinc-500">Be the first to share feedback about this product.</p>
                  </div>
                ) : null}

                {reviews.map((review) => (
                  <article key={review.id} className="border-b border-[#ececec] pb-6 last:border-b-0 last:pb-0">
                    <div className="grid gap-4 sm:grid-cols-[72px_minmax(0,1fr)]">
                      <div className="space-y-2">
                        <div className="h-10 w-10 rounded bg-[#dedede]" />
                        <div className="h-3 w-10 rounded bg-[#dedede]" />
                        <div className="h-3 w-10 rounded bg-[#dedede]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-zinc-500">{formatReviewDate(review.createdAt)}</span>
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-[#171717]">{getReviewHeadline(review.comment)}</h3>
                        <p className="mt-2 text-sm leading-7 text-zinc-600">{review.comment}</p>
                        <p className="mt-2 text-xs text-zinc-500">By {review.reviewerName || review.username}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {product.recommendedProducts.length > 0 ? (
              <section className="mt-16">
                <div className="flex items-center justify-between gap-4">
                  <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d7d7d7] text-zinc-500">
                    {'<'}
                  </button>
                  <h2 className="text-center text-3xl font-semibold text-[#171717]">Related Products</h2>
                  <Link to="/products" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d7d7d7] text-zinc-500">
                    {'>'}
                  </Link>
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {product.recommendedProducts.map((recommendedProduct) => (
                    <ProductCard key={recommendedProduct.id} item={recommendedProduct} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        ) : null}
      </main>
      {isSizeGuideOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#000000]/55 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div
            className="relative w-full max-w-[1020px] rounded-[28px] bg-white px-8 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:px-10 sm:py-9 lg:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#9a9a9a] transition hover:bg-zinc-100 hover:text-zinc-700"
              aria-label="Close size guide"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>

            <h2 id="size-guide-title" className="text-[2.05rem] font-semibold tracking-[-0.04em] text-[#222222] sm:text-[2.2rem]">
              Size Guide
            </h2>

            <div className="mt-8 space-y-4 sm:space-y-5">
              <div className="grid gap-3 sm:grid-cols-[62px_74px_minmax(0,1fr)] sm:items-center sm:gap-6">
                <label htmlFor="size-guide-height" className="text-[1.02rem] font-normal text-[#3c3c3c]">
                  Height
                </label>
                <div className="flex h-9 items-center justify-center rounded-[8px] border border-[#e6e6e6] bg-white px-2 text-[0.95rem] text-[#666666] shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
                  {sizeGuideHeight} Cm
                </div>
                <input
                  id="size-guide-height"
                  type="range"
                  min={140}
                  max={200}
                  value={sizeGuideHeight}
                  onChange={(event) => setSizeGuideHeight(Number(event.target.value))}
                  className="size-guide-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-[#242424] accent-[#242424]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[62px_74px_minmax(0,1fr)] sm:items-center sm:gap-6">
                <label htmlFor="size-guide-weight" className="text-[1.02rem] font-normal text-[#3c3c3c]">
                  Weight
                </label>
                <div className="flex h-9 items-center justify-center rounded-[8px] border border-[#e6e6e6] bg-white px-2 text-[0.95rem] text-[#666666] shadow-[0_2px_4px_rgba(0,0,0,0.03)]">
                  {sizeGuideWeight} Kg
                </div>
                <input
                  id="size-guide-weight"
                  type="range"
                  min={40}
                  max={90}
                  value={sizeGuideWeight}
                  onChange={(event) => setSizeGuideWeight(Number(event.target.value))}
                  className="size-guide-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-[#242424] accent-[#242424]"
                />
              </div>
            </div>

            <div className="mt-8">
              <p className="text-[1.05rem] font-semibold text-[#262626]">Suggests For You:</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {sizeGuideRows.map((row) => (
                  <button
                    key={row.size}
                    type="button"
                    className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-[0.98rem] transition ${
                      suggestedSize === row.size
                        ? 'border-[#1f1f1f] text-[#1f1f1f] ring-1 ring-[#1f1f1f]/10'
                        : 'border-[#e1e1e1] text-[#303030] hover:border-[#b7b7b7]'
                    }`}
                  >
                    {row.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 overflow-x-auto border border-[#d8d8d8]">
              <table className="min-w-full border-collapse text-center text-[0.98rem] text-[#424242]">
                <thead>
                  <tr className="bg-white font-semibold text-[#2b2b2b]">
                    <th className="border-b border-r border-[#d8d8d8] px-4 py-3.5">Size</th>
                    <th className="border-b border-r border-[#d8d8d8] px-4 py-3.5">Bust</th>
                    <th className="border-b border-r border-[#d8d8d8] px-4 py-3.5">Waist</th>
                    <th className="border-b border-[#d8d8d8] px-4 py-3.5">Low Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeGuideRows.map((row, index) => (
                    <tr key={row.size} className={index % 2 === 0 ? 'bg-[#f1f1f1]' : 'bg-white'}>
                      <td className="border-r border-t border-[#d8d8d8] px-4 py-3.5">{row.size}</td>
                      <td className="border-r border-t border-[#d8d8d8] px-4 py-3.5">{row.bust}</td>
                      <td className="border-r border-t border-[#d8d8d8] px-4 py-3.5">{row.waist}</td>
                      <td className="border-t border-[#d8d8d8] px-4 py-3.5">{row.lowHip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <style jsx>{`
              .size-guide-slider::-webkit-slider-thumb {
                appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 9999px;
                background: #242424;
                cursor: pointer;
              }

              .size-guide-slider::-moz-range-thumb {
                width: 16px;
                height: 16px;
                border: 0;
                border-radius: 9999px;
                background: #242424;
                cursor: pointer;
              }
            `}</style>
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  )
}