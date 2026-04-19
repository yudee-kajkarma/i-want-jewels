import type { Metadata } from 'next'
import { cache } from 'react'
import { getProductBySlug, getProductReviews } from '../../../services/productService'
import ProductDetailPage from '../../../views/ProductDetailPage'
import { formatPrice } from '../../../utils/price'

export const dynamic = 'force-dynamic'

const getInitialProductData = cache(async (productId: string) => {
  const product = await getProductBySlug(productId)
  const reviewsData = await getProductReviews(product.id)

  return { product, reviewsData }
})

type ProductPageProps = {
  params: Promise<{
    productId: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = await params

  try {
    const { product } = await getInitialProductData(productId)
    const image = product.primaryImage || product.variants[0]?.thumbnail
    const description = `${product.description.slice(0, 140)}${product.description.length > 140 ? '...' : ''}`

    return {
      title: `${product.title} | I Want Jewels`,
      description,
      openGraph: {
        title: `${product.title} | I Want Jewels`,
        description,
        type: 'website',
        images: image ? [image] : undefined,
      },
      alternates: {
        canonical: `/products/slug/${product.slug || product.id}`,
      },
      keywords: [product.category, ...product.metals, product.vendor, formatPrice(product.minPrice, 'eur')],
    }
  } catch {
    return {
      title: 'Product Details | I Want Jewels',
      description: 'Server-rendered jewellery product details from I Want Jewels.',
    }
  }
}

export default async function Page({ params }: ProductPageProps) {
  const { productId } = await params
  const initialData = await getInitialProductData(productId).catch(() => null)

  return (
    <ProductDetailPage
      initialProduct={initialData?.product ?? null}
      initialReviewsData={initialData?.reviewsData ?? null}
    />
  )
}