import type { Metadata } from 'next'
import ResourceCategoryPage from '../../../views/ResourceCategoryPage'
import { getCategoryBySlug, getArticlesByCategory } from '../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Demi-Fine Jewellery Guides | I Want Jewels Resources',
  description: 'Explore the world of demi-fine jewellery — sterling silver, gold vermeil, and lab-grown stones that sit beautifully between costume and fine jewellery.',
}

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const articles = getArticlesByCategory('demi-fine-jewellery-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
