// SEO copy for product pages the navbar plan links to directly, in every
// language (./collectionCopy/<locale>.json → products). Everything else on the
// page still comes from the product record.

import { getCopy, getCollection } from './collections'

export type ProductSeoOverride = {
  metaTitle: string
  metaDescription: string
  h1: string
  material: string
  /** Category page between Shop and the product in the breadcrumb trail. */
  parent: { name: string; slug: string }
}

/** Product slug → the category page it sits under in the breadcrumb. */
const productParents: Record<string, string> = {
  // Alessia Diamond Bangle — linked from the Bracelets column of the SHOP menu.
  iwjbn0001: 'bracelets',
}

export function getProductSeoOverride(slug: string, locale: string): ProductSeoOverride | undefined {
  const key = slug.trim().toLowerCase()
  const parentSlug = productParents[key]
  const copy = getCopy(locale).products[key] ?? getCopy('en').products[key]
  if (!parentSlug || !copy) return undefined

  return { ...copy, parent: { name: getCollection(parentSlug, locale)?.h1 ?? parentSlug, slug: parentSlug } }
}
