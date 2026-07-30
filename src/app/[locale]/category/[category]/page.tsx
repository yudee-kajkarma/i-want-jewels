import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { localizedAlternates } from '@/i18n/metadata'
import { getLocalizedPath } from '@/i18n/routing'
import { getProductCategories, getProducts } from '../../../../services/productService'
import { categoryDisplayName, categorySlug, resolveCategoryFromSlug } from '../../../../utils/categorySlug'
import { getCategoryContent } from '../../../../data/categoryContent'
import CategoryLandingPage from '../../../../views/CategoryLandingPage'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://www.iwantjewels.com'

type CategoryPageProps = {
  params: Promise<{
    locale: string
    category: string
  }>
}

// Resolve the slug against the live category list, so only categories that
// actually exist get a page; anything else is a real 404.
const resolveCategory = cache(async (slug: string) => {
  const categories = await getProductCategories()

  return resolveCategoryFromSlug(slug, categories)
})

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category: slug } = await params
  const categoryName = await resolveCategory(slug)

  if (!categoryName) {
    notFound()
  }

  const content = getCategoryContent(categorySlug(categoryName), categoryDisplayName(categoryName))
  const path = `/category/${categorySlug(categoryName)}`

  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: localizedAlternates(path, locale),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: 'website',
    },
  }
}

export default async function Page({ params }: CategoryPageProps) {
  const { category: slug } = await params
  const categoryName = await resolveCategory(slug)

  if (!categoryName) {
    notFound()
  }

  const canonicalSlug = categorySlug(categoryName)
  const content = getCategoryContent(canonicalSlug, categoryDisplayName(categoryName))
  const { products } = await getProducts({ category: categoryName, page: 1, limit: 100 })

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: content.heading,
          item: `${BASE_URL}/category/${canonicalSlug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: content.heading,
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: product.title,
        url: `${BASE_URL}/products/${product.slug || product.id}`,
      })),
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CategoryLandingPage
        categoryName={categoryName}
        content={content}
        products={products}
      />
    </>
  )
}
