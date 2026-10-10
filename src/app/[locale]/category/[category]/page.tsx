import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { getAbsoluteLocalizedUrl, localizedAlternates } from '@/i18n/metadata'
import { getProductCategories, getProducts } from '../../../../services/productService'
import { categoryDisplayName, categorySlug, resolveCategoryFromSlug } from '../../../../utils/categorySlug'
import { getCategoryContent } from '../../../../data/categoryContent'
import { getCollection, getCopy, type Collection } from '../../../../data/collections'
import { collectionPageSchema, serializeJsonLd } from '../../../../lib/structuredData'
import type { Product } from '../../../../types/product'
import CategoryLandingPage, { type CategoryPageContent } from '../../../../views/CategoryLandingPage'

export const dynamic = 'force-dynamic'

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

// The whole catalogue (60 designs) fits in one page; curated collections and
// the parent pages' sections pick their products from it by code.
const getCatalogue = cache(async () => {
  const { products } = await getProducts({ page: 1, limit: 100 })
  return products
})

function pickByCodes(catalogue: Product[], codes: string[]): Product[] {
  return codes
    .map((code) => {
      const lower = code.toLowerCase()
      return (
        catalogue.find((product) => product.slug?.toLowerCase() === lower) ??
        catalogue.find((product) =>
          product.variants.some((variant) => variant.sku?.toLowerCase().startsWith(lower)),
        )
      )
    })
    .filter((product): product is Product => Boolean(product))
}

type ResolvedPage = {
  slug: string
  /** Backend category name, for parent pages ("View all & filter"). */
  categoryName?: string
  collection?: Collection
  metaTitle: string
  metaDescription: string
}

// A slug is a curated collection (fixed product list), or a backend category,
// optionally with the navbar plan's copy and sections (the four parents).
const resolvePage = cache(async (rawSlug: string, locale: string): Promise<ResolvedPage | null> => {
  const collection = getCollection(rawSlug, locale)
  if (collection?.codes) {
    return {
      slug: collection.slug,
      collection,
      metaTitle: collection.metaTitle,
      metaDescription: collection.metaDescription,
    }
  }

  const categoryName = await resolveCategory(rawSlug)
  if (!categoryName) return null

  const slug = categorySlug(categoryName)
  const parent = getCollection(slug, locale)
  if (parent) {
    return { slug, categoryName, collection: parent, metaTitle: parent.metaTitle, metaDescription: parent.metaDescription }
  }

  const content = getCategoryContent(slug, categoryDisplayName(categoryName))
  return { slug, categoryName, metaTitle: content.metaTitle, metaDescription: content.metaDescription }
})

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, category } = await params
  const page = await resolvePage(category, locale)

  if (!page) {
    notFound()
  }

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: localizedAlternates(`/category/${page.slug}`, locale),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: 'website',
    },
  }
}

export default async function Page({ params }: CategoryPageProps) {
  const { locale, category } = await params
  const page = await resolvePage(category, locale)

  if (!page) {
    notFound()
  }

  const { collection } = page
  const products = collection?.codes
    ? pickByCodes(await getCatalogue(), collection.codes)
    : (await getProducts({ category: page.categoryName, page: 1, limit: 100 })).products

  const catalogue = collection?.sections?.length ? await getCatalogue() : []
  // A section is only rendered (and described in JSON-LD) when it has products.
  const sections = (collection?.sections ?? [])
    .map((section) => ({ ...section, products: pickByCodes(catalogue, section.codes) }))
    .filter((section) => section.products.length > 0)

  const legacy = collection ? null : getCategoryContent(page.slug, categoryDisplayName(page.categoryName ?? page.slug))
  const heading = collection?.h1 ?? legacy?.heading ?? ''
  const content: CategoryPageContent = {
    heading,
    intro: collection?.intro ?? legacy?.intro ?? [],
    related: collection?.related ?? [],
    breadcrumbs: [
      ...(collection?.parent ? [{ name: collection.parent.name, to: `/category/${collection.parent.slug}` }] : []),
      { name: heading, to: `/category/${page.slug}` },
    ],
  }

  const absolute = (path: string) => getAbsoluteLocalizedUrl(path, locale)
  const listed = (items: Product[]) =>
    items.map((product) => ({ title: product.title, url: absolute(`/products/${product.slug || product.id}`) }))

  const structuredData = collectionPageSchema({
    url: absolute(`/category/${page.slug}`),
    name: heading,
    description: page.metaDescription,
    locale,
    breadcrumbs: [
      { name: getCopy(locale).crumbs.home, url: absolute('/') },
      { name: getCopy(locale).crumbs.shop, url: absolute('/products') },
      ...content.breadcrumbs.map((crumb) => ({ name: crumb.name, url: absolute(crumb.to) })),
    ],
    products: listed(products),
    sections: sections.map((section) => ({
      anchor: section.anchor,
      name: section.name,
      description: section.description,
      products: listed(section.products),
    })),
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
      <CategoryLandingPage
        filterHref={page.categoryName ? `/products?category=${encodeURIComponent(page.categoryName)}` : '/products'}
        content={content}
        products={products}
        sections={sections}
      />
    </>
  )
}
