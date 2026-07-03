import type { Metadata } from 'next'
import ResourceCategoryPage from '../../../views/ResourceCategoryPage'
import { getCategoryBySlug, getArticlesByCategory } from '../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Wedding & Occasion Jewellery Guides | I Want Jewels Resources',
  description: 'Bridal jewellery advice, anniversary gift ideas, and how to choose the perfect piece for every milestone moment in life.',
}

export default function Page() {
  const category = getCategoryBySlug('occasion-jewellery-guides')
  const articles = getArticlesByCategory('occasion-jewellery-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
