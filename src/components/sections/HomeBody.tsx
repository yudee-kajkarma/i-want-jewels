'use client'

import { useEffect, useMemo, useState } from 'react'
import { Gem, Gift, Link2, Phone, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { Link } from '@/lib/router'
import { getAllProductFilters, getProducts } from '../../services/productService'
import type { Product } from '../../types/product'
import braceletImage from '../../assets/image/bracelet.jpeg'
import braceletCloseupImage from '../../assets/image/bracelet1.jpeg'
import earringImage from '../../assets/image/earing.jpeg'
import earringProductImage from '../../assets/image/earing1.jpeg'
import necklaceImage from '../../assets/image/nackwear.jpeg'
import necklaceModelImage from '../../assets/image/nackwear1.jpeg'
import ringImage from '../../assets/image/ring.jpeg'
import ringModelImage from '../../assets/image/ring.jpeg'
import brandLogo from '../../assets/logo.svg'
import ProductCard from './ProductCard'
import InstagramGallerySection from './InstagramGallerySection'
import NewsletterSection from './NewsletterSection'
import ProductCardSkeleton from './ProductCardSkeleton'

const categorySkeletons = Array.from({ length: 4 }, (_, index) => index)
const productSkeletons = Array.from({ length: 5 }, (_, index) => index)

const defaultCollectionCard = {
  image: necklaceModelImage.src,
  imageClassName: 'h-full w-full object-cover object-center transition duration-500 group-hover:scale-105',
}

const fallbackCategoryLabels = ['All', 'Necklace', 'Bracelet', 'Ring', 'Earrings']

const budgetCollections = [
  {
    title: 'Under €200',
    eyebrow: 'Gift Picks',
    image: earringProductImage.src,
    href: '/products?price_max=200',
  },
  {
    title: 'Under €300',
    eyebrow: 'For Stacks',
    image: ringImage.src,
    href: '/products?price_max=300',
  },
  {
    title: 'Under €400',
    eyebrow: 'Best Value',
    image: necklaceImage.src,
    href: '/products?price_max=400',
  },
]

const serviceHighlights = [
  {
    title: 'Instant Delivery',
    description: 'Receive your gift card instantly via email.',
    Icon: Gift,
  },
  {
    title: 'Flexible Value',
    description: 'Choose denominations that fit your occasion.',
    Icon: Sparkles,
  },
  {
    title: 'Premium Craft',
    description: 'Lab-grown diamonds and elevated metal finishes.',
    Icon: Gem,
  },
  {
    title: 'Trusted Shipping',
    description: 'Carefully packed and delivered across India.',
    Icon: Truck,
  },
]

const qualityPoints = [
  'Brilliant lab-grown diamond jewellery',
  'Premium 925 sterling silver craftsmanship',
  'Elegant 14kt gold plated finishes',
]

const metalFilters = ['Gold', 'Rose Gold', 'Silver'] as const

function normalizeCategoryValue(value: string): string {
  return value.trim().toLowerCase().replace(/ies$/, 'y').replace(/s$/, '')
}

function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(' ')
}

function buildDynamicCategories(rawCategories: string[]): string[] {
  const uniqueCategoryMap = new Map<string, string>()

  rawCategories.forEach((category) => {
    const normalizedCategory = normalizeCategoryValue(category)

    if (!normalizedCategory || uniqueCategoryMap.has(normalizedCategory)) {
      return
    }

    uniqueCategoryMap.set(normalizedCategory, toTitleCase(category))
  })

  return Array.from(uniqueCategoryMap.values())
}

function matchesCategoryFilter(item: Product, activeCategory: string): boolean {
  if (activeCategory === 'All') {
    return true
  }

  const normalizedActiveCategory = normalizeCategoryValue(activeCategory)
  const normalizedCategory = normalizeCategoryValue(item.category)
  const normalizedTags = item.tags.map((tag) => normalizeCategoryValue(tag))

  return normalizedCategory === normalizedActiveCategory || normalizedTags.includes(normalizedActiveCategory)
}

function buildProductsFilterHref(category: string): string {
  if (category === 'All') {
    return '/products'
  }

  return `/products?category=${encodeURIComponent(category)}`
}

function getCollectionCardMedia(category: string) {
  const normalizedCategory = normalizeCategoryValue(category)

  if (normalizedCategory.includes('necklace') || normalizedCategory.includes('pendant') || normalizedCategory.includes('chain')) {
    return {
      image: necklaceModelImage.src,
      imageClassName: 'h-full w-full object-cover object-center transition duration-500 group-hover:scale-105',
    }
  }

  if (normalizedCategory.includes('bracelet') || normalizedCategory.includes('bangle')) {
    return {
      image: braceletImage.src,
      imageClassName: 'h-full w-full object-cover object-center transition duration-500 group-hover:scale-105',
    }
  }

  if (normalizedCategory.includes('ring')) {
    return {
      image: ringImage.src,
      imageClassName: 'h-full w-full object-contain object-center p-4 transition duration-500 group-hover:scale-105',
    }
  }

  if (normalizedCategory.includes('earring') || normalizedCategory.includes('ear')) {
    return {
      image: earringImage.src,
      imageClassName: 'h-full w-full object-cover object-center transition duration-500 group-hover:scale-105',
    }
  }

  return defaultCollectionCard
}

export default function HomeBody() {
  const [categories, setCategories] = useState<string[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeMetal, setActiveMetal] = useState<(typeof metalFilters)[number]>('Gold')
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [categoriesError, setCategoriesError] = useState('')
  const [productsError, setProductsError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCategories() {
      try {
        const filtersData = await getAllProductFilters()
        const dynamicCategories = buildDynamicCategories(filtersData.categories ?? [])

        if (!isMounted) {
          return
        }

        setCategories(dynamicCategories)
        setCategoriesError('')
      } catch {
        if (!isMounted) {
          return
        }

        setCategories([])
        setCategoriesError('Unable to load collections right now.')
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false)
        }
      }
    }

    async function loadProducts() {
      try {
        const response = await getProducts({ page: 1, limit: 8 })

        if (!isMounted) {
          return
        }

        setFeaturedProducts(response.products)
        setProductsError('')
      } catch {
        if (!isMounted) {
          return
        }

        setFeaturedProducts([])
        setProductsError('Unable to load the latest pieces right now.')
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false)
        }
      }
    }

    void loadCategories()
    void loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  const categoryTabs = categories.length > 0 ? ['All', ...categories.slice(0, 4)] : fallbackCategoryLabels
  const collectionCards = (categories.length > 0 ? categories.slice(0, 4) : fallbackCategoryLabels.slice(1)).map((label) => ({
    label,
    ...getCollectionCardMedia(label),
  }))
  const filteredLatestProducts = useMemo(
    () => featuredProducts.filter((item) => matchesCategoryFilter(item, activeCategory)),
    [activeCategory, featuredProducts],
  )
  const latestProducts = filteredLatestProducts.slice(0, 5)
  const metalProducts = featuredProducts.filter((item) => item.metals.some((metal) => metal.toLowerCase().includes(activeMetal.toLowerCase())))
  const visibleMetalProducts = (metalProducts.length > 0 ? metalProducts : featuredProducts).slice(0, 5)
  const newlyLaunched = featuredProducts.slice(0, 2)

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-semibold tracking-[-0.03em] text-[#1b140f]">Explore Our Jewellery Collections</h2>
        <div className="mx-auto mt-8 grid max-w-[1120px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoadingCategories
            ? categorySkeletons.map((item) => (
                <div key={item} className="animate-pulse overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-3 shadow-sm">
                  <div className="h-72 rounded-[22px] bg-zinc-200 sm:h-80 lg:h-[370px]" />
                </div>
              ))
            : collectionCards.map((item) => (
                <Link
                  key={item.label}
                  to={buildProductsFilterHref(item.label)}
                  className="group overflow-hidden rounded-[28px] border border-[#eedfd2] bg-white p-3 shadow-[0_18px_40px_rgba(89,61,42,0.08)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-72 overflow-hidden rounded-[22px] bg-[#f8f1ec] sm:h-80 lg:h-[370px]">
                    <img
                      src={item.image}
                      alt={item.label}
                      className={item.imageClassName}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(20,20,20,0.08),rgba(20,20,20,0.58))] px-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <div className="translate-y-6 text-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{item.label}</h3>
                        <span className="mt-3 inline-flex rounded-full bg-[#ff4fae] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_26px_rgba(229,87,176,0.4)]">
                          Collection
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/products"
            className="rounded-xl bg-[#1f1d1e] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black"
          >
            Browse All Collections
          </Link>
        </div>
        {/* {categoriesError ? <p className="mt-4 text-center text-sm text-rose-600">{categoriesError}</p> : null} */}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#1b140f]">Discover Our Latest Jewellery Pieces</h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {categoryTabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveCategory(item)}
                className={`rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                  activeCategory === item
                    ? 'border-[#1f1d1e] bg-[#1f1d1e] text-white'
                    : 'border-[#eadfd4] bg-white text-zinc-500 hover:border-[#1f1d1e] hover:text-[#1f1d1e]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {isLoadingProducts
            ? productSkeletons.map((item) => <ProductCardSkeleton key={item} />)
            : latestProducts.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>

        {!isLoadingProducts && latestProducts.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-dashed border-[#dbc8b8] bg-white px-6 py-10 text-center">
            <h3 className="text-lg font-semibold text-[#24160f]">No products found for {activeCategory}</h3>
            <p className="mt-2 text-sm text-zinc-500">Choose another tab or open the full products page to explore more results.</p>
          </div>
        ) : null}

        <div className="mt-10 flex justify-center">
          <Link
            to={buildProductsFilterHref(activeCategory)}
            className="rounded-xl bg-[#1f1d1e] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black"
          >
            View All New Pieces
          </Link>
        </div>
        {productsError ? <p className="mt-4 text-center text-sm text-rose-600">{productsError}</p> : null}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {budgetCollections.map((item) => (
            <article key={item.title} className="relative overflow-hidden rounded-[28px] p-6 text-white shadow-[0_20px_50px_rgba(138,78,95,0.22)]">
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,71,159,0.18),rgba(76,14,46,0.58))]" />
              <div className="relative z-10 flex min-h-[220px] flex-col justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">{item.eyebrow}</p>
                  <h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{item.title}</h3>
                </div>
                <Link
                  to={item.href}
                  className="inline-flex w-fit rounded-xl bg-[#1f1d1e] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black"
                >
                  Shop Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-[32px] bg-[#ecd6c4] shadow-[0_24px_60px_rgba(92,63,37,0.12)]">
            <img
              src={earringProductImage.src}
              alt="Woman wearing statement earrings"
              className="h-full min-h-[430px] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#c5528d]">Why Customers Choose I Want Jewels</p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#1b140f]">
              Modern pieces crafted to look polished every day.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
              Based in the historic diamond city of Antwerp, I Want Jewels creates refined jewellery with lab-grown diamonds,
              925 sterling silver, and elevated gold-plated finishes.
            </p>

            <div className="mt-8 space-y-4">
              {qualityPoints.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1f1d1e] text-white">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm font-medium text-zinc-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
{/* 
      <section className="mx-auto max-w-[1600px] px-4 py-14">
        <div className="relative overflow-hidden rounded-[40px] border border-[#f3d2de] bg-[radial-gradient(circle_at_top,#fff6fb_0%,#ffdbe8_34%,#f4b6cb_68%,#eca2bf_100%)] px-6 py-8 shadow-[0_30px_80px_rgba(180,90,130,0.2)] md:px-10 lg:px-16 lg:py-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(255,255,255,0.65),transparent_28%),radial-gradient(circle_at_68%_20%,rgba(255,255,255,0.45),transparent_22%),radial-gradient(circle_at_50%_78%,rgba(255,255,255,0.35),transparent_22%)]" />
          <div className="pointer-events-none absolute -left-16 top-12 h-64 w-64 rounded-full border-[22px] border-[#b56f8f]/25 blur-[1px]" />
          <div className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full border-[22px] border-[#b56f8f]/20 blur-[1px]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_72%)]" />

          <div className="relative flex flex-col gap-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <img src={brandLogo.src} alt="I Want Jewels" className="h-10 w-auto sm:h-12" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#24407c]">I Want Jewels</p>
              </div>

              <div className="flex items-center gap-2 self-start">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#24407c] text-white shadow-[0_12px_28px_rgba(36,64,124,0.24)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#24407c] text-white shadow-[0_12px_28px_rgba(36,64,124,0.24)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.7-1.6h1.2V4.8c-.2 0-.9-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.5V11H9v3h2.4v7h2.1Z" />
                  </svg>
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#24407c] text-white shadow-[0_12px_28px_rgba(36,64,124,0.24)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M18.9 7.2c.8-.1 1.5-.4 2.1-.8-.3.8-.9 1.4-1.5 1.8.7 0 1.3-.3 1.9-.5-.5.7-1 1.3-1.7 1.8v.5c0 5.4-4.1 11.7-11.7 11.7-2.3 0-4.5-.7-6.3-1.9.3 0 .7.1 1 .1 1.9 0 3.6-.6 5-1.8-1.8 0-3.2-1.2-3.7-2.8.3.1.5.1.8.1.4 0 .7 0 1-.1-1.8-.4-3.1-2-3.1-3.9v-.1c.5.3 1.1.5 1.8.5-1.1-.7-1.8-1.9-1.8-3.3 0-.7.2-1.4.5-2 .9 1.2 2.3 2.3 3.9 3 1.6.7 3.2 1.1 4.9 1.2-.1-.3-.1-.6-.1-.9 0-2.2 1.8-4 4-4 1.2 0 2.3.5 3 1.3Z" />
                  </svg>
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#24407c] text-white shadow-[0_12px_28px_rgba(36,64,124,0.24)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M20.5 11.8c0-4.6-3.8-8.3-8.5-8.3s-8.5 3.7-8.5 8.3c0 1.5.4 3 1.2 4.2L3.5 20.5l4.7-1.2c1.2.7 2.5 1 3.8 1 4.7 0 8.5-3.7 8.5-8.5Zm-8.5 7.1c-1.1 0-2.3-.3-3.2-.9l-.2-.1-2.8.7.8-2.7-.2-.3c-.7-1.1-1-2.4-1-3.7 0-3.9 3.1-7 6.9-7s6.9 3.1 6.9 7-3.1 7-7 7Zm3.8-5.2c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.4.1-.1.2-.6.7-.7.8-.1.1-.2.1-.4 0-.2-.1-.9-.3-1.7-1.1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4s-.4-1-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4c-.1 0-.3 0-.5.2-.2.2-.7.7-.7 1.6s.7 1.9.8 2c.1.1 1.4 2.1 3.4 2.9.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1 0-.2-.1-.4-.2Z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr_0.8fr]">
              <div className="max-w-[460px]">
                <p className="text-4xl font-medium leading-none text-[#b36c82] sm:text-5xl" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                  Best
                </p>
                <h2 className="mt-1 text-[4.4rem] leading-[0.82] tracking-[-0.08em] text-[#24407c] sm:text-[5.5rem] lg:text-[7rem]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                  Jewelry
                </h2>
                <p className="text-[3.4rem] leading-[0.85] tracking-[-0.07em] text-[#b36c82] sm:text-[4.2rem] lg:text-[5.3rem]" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                  Collection
                </p>
              </div>

              <div className="relative flex justify-center">
                <div className="absolute bottom-3 h-16 w-48 rounded-full bg-[#8f5f79]/20 blur-2xl" />
                <img
                  src={ringModelImage.src}
                  alt="Rose gold ring collection"
                  className="relative z-10 h-[260px] w-full max-w-[360px] object-contain drop-shadow-[0_28px_40px_rgba(126,71,94,0.28)] sm:h-[320px] lg:h-[380px]"
                />
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="flex h-48 w-48 rotate-[-7deg] flex-col items-center justify-center rounded-[44%] bg-[#24407c] text-center text-white shadow-[0_24px_50px_rgba(36,64,124,0.28)] sm:h-56 sm:w-56">
                  <p className="text-3xl font-semibold leading-none sm:text-4xl" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
                    Discount
                  </p>
                  <p className="mt-2 text-6xl font-bold leading-none sm:text-7xl">25%</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-6 pt-2 lg:flex-row lg:items-end">
              <div className="flex items-center gap-3 self-start text-[#24407c]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/65 shadow-[0_12px_24px_rgba(36,64,124,0.12)]">
                  <Link2 className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="text-xl font-medium uppercase tracking-[0.04em] sm:text-2xl">www.website.com</span>
              </div>

              <Link
                to="/products"
                className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#24407c] px-10 py-4 text-lg font-bold uppercase tracking-[0.18em] text-white shadow-[0_16px_30px_rgba(36,64,124,0.24)] transition hover:bg-[#1a2f5d]"
              >
                Buy Now
              </Link>

              <div className="flex items-center gap-3 self-end text-[#24407c] lg:self-auto">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/65 shadow-[0_12px_24px_rgba(36,64,124,0.12)]">
                  <Phone className="h-5 w-5" strokeWidth={2.2} />
                </span>
                <span className="text-xl font-medium tracking-[0.03em] sm:text-2xl">+000123456789</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#1b140f]">Shop Jewellery By Metal Type</h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {metalFilters.map((metal) => (
              <button
                key={metal}
                type="button"
                onClick={() => setActiveMetal(metal)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  activeMetal === metal
                    ? 'border-[#1f1d1e] bg-[#1f1d1e] text-white'
                    : 'border-[#eadfd4] bg-white text-zinc-500 hover:border-[#1f1d1e] hover:text-[#1f1d1e]'
                }`}
              >
                {metal}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {isLoadingProducts
            ? productSkeletons.map((item) => <ProductCardSkeleton key={`metal-${item}`} />)
            : visibleMetalProducts.map((item) => <ProductCard key={`metal-${item.id}`} item={item} />)}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="rounded-xl bg-[#1f1d1e] px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-black"
          >
            View All New Pieces
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 rounded-[34px] border border-[#f2e2d8] bg-[linear-gradient(180deg,#fffaf7_0%,#ffffff_100%)] p-8 shadow-[0_24px_60px_rgba(92,63,37,0.08)] lg:grid-cols-[1fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-1 text-[#ffb347]">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#1b140f]">Valentine&apos;s Gift Card</h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              Give the gift of choice. Last-minute pick? This jewellery gift card still feels considered, premium, and personal.
            </p>
            <div className="mt-6 space-y-3 text-sm text-zinc-700">
              <p>Flexible denominations from €500 to €4000</p>
              <p>Instant digital delivery</p>
              <p>Redeem on any jewellery collection</p>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-[28px] border border-[#f2d4bf] bg-[#fff4ef] p-6">
            <div className="w-full rounded-[24px] border border-[#efc6af] bg-white px-8 py-12 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#9c7359]">Valentine&apos;s</p>
              <p className="mt-2 text-5xl font-semibold tracking-[-0.05em] text-[#e35b97]">Gift Card</p>
              <p className="mt-4 text-sm leading-6 text-zinc-500">This gift card lets you choose a piece that feels just right.</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#e35b97]">I Want Jewels</p>
            </div>
          </div>

          <div className="space-y-5">
            {serviceHighlights.map(({ title, description, Icon }) => (
              <div key={title} className="flex items-start gap-4 rounded-[20px] bg-white p-4 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff1f7] text-[#ff4fae]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1b140f]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-center text-3xl font-semibold tracking-[-0.03em] text-[#1b140f]">Newly Launched Products</h2>
        <div className="mt-8 grid gap-6 rounded-[34px] bg-[#faf6f2] p-6 shadow-[0_22px_60px_rgba(92,63,37,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[28px]">
            <img
              src={braceletCloseupImage.src}
              alt="Jewellery styled on pink display blocks"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {isLoadingProducts
              ? productSkeletons.slice(0, 2).map((item) => <ProductCardSkeleton key={`launch-${item}`} />)
              : newlyLaunched.map((item) => <ProductCard key={`launch-${item.id}`} item={item} />)}
          </div>
        </div>
      </section>

      <NewsletterSection description="Subscribe to receive new jewellery releases, exclusive offers, and style inspiration directly to your inbox." />

      <InstagramGallerySection />
    </>
  )
}
