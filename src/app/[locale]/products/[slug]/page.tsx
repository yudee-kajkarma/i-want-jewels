import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getProductBySlug, getProductReviews, isProductNotFoundError } from '../../../../services/productService'
import ProductDetailPage from '../../../../views/ProductDetailPage'
import { formatPrice } from '../../../../utils/price'

export const dynamic = 'force-dynamic'

const getInitialProductData = cache(async (slug: string) => {
  const product = await getProductBySlug(slug)
  // A reviews hiccup must not take down a live product page.
  const reviewsData = await getProductReviews(product.id).catch(() => null)

  return { product, reviewsData }
})

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const { product } = await getInitialProductData(slug)
    const image = product.primaryImage || product.variants[0]?.thumbnail
    const fallbackDescription = `${product.description.slice(0, 140)}${product.description.length > 140 ? '...' : ''}`
    const title = product.metaTitle || `${product.title} | I Want Jewels`
    const description = product.metaDescription || fallbackDescription

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
        canonical: `/products/${product.slug || product.id}`,
      },
      keywords: [product.category, ...product.metals, product.vendor, formatPrice(product.minPrice, 'eur')],
    }
  } catch (error) {
    if (isProductNotFoundError(error)) notFound()

    return {
      title: 'Product Details | I Want Jewels',
      description: 'Server-rendered jewellery product details from I Want Jewels.',
    }
  }
}

export default async function Page({ params }: ProductPageProps) {
  const { slug } = await params

  let initialData: Awaited<ReturnType<typeof getInitialProductData>>
  try {
    initialData = await getInitialProductData(slug)
  } catch (error) {
    // Deleted or renamed products must answer with a real 404 status so
    // search engines drop the URL instead of indexing an empty shell.
    if (isProductNotFoundError(error)) notFound()
    throw error
  }

  return (
    <ProductDetailPage
      initialProduct={initialData.product}
      initialReviewsData={initialData.reviewsData}
    />
  )
}