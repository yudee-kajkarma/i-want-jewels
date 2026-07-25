import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { cache } from 'react'
import { getProductBySlug, getProductReviews } from '../../../services/productService'
import ProductDetailPage from '../../../views/ProductDetailPage'
import { formatPrice } from '../../../utils/price'

export const dynamic = 'force-dynamic'

const getInitialProductData = cache(async (slug: string) => {
  try {
    const product = await getProductBySlug(slug)
    const reviewsData = await getProductReviews(product.id)

    return { product, reviewsData }
  } catch {
    return null
  }
})

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await getInitialProductData(slug)

  if (!data?.product) {
    notFound()
  }

  const { product } = data
  const image = product.primaryImage || product.variants[0]?.thumbnail
  const fallbackDescription = `${product.description.slice(0, 140)}${product.description.length > 140 ? '...' : ''}`
  const title = product.metaTitle || `${product.title} | I Want Jewels`
  const description = product.metaDescription || fallbackDescription || 'Explore fine lab-grown diamond jewellery crafted for modern luxury.'
  const canonicalPath = `/products/${product.slug || product.id}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: `https://iwantjewels.com${canonicalPath}`,
    },
    keywords: [product.category, ...product.metals, product.vendor, formatPrice(product.minPrice, 'eur')],
  }
}

export default async function Page({ params }: ProductPageProps) {
  const { slug } = await params
  const initialData = await getInitialProductData(slug)
  const product = initialData?.product ?? null

  if (!product) {
    notFound()
  }

  if (product.slug && product.slug !== slug) {
    permanentRedirect(`/products/${product.slug}`)
  }

  return (
    <ProductDetailPage
      initialProduct={product}
      initialReviewsData={initialData?.reviewsData ?? null}
    />
  )
}