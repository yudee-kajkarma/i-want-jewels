import type { Metadata } from 'next'
import ResourceCategoryPage from '../../../views/ResourceCategoryPage'
import { getCategoryBySlug, getArticlesByCategory } from '../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Lab-Grown Diamond Guides | I Want Jewels Resources',
  description: 'Everything you need to know about lab-grown diamonds — how they are made, how they compare to mined diamonds, and why they are the smart, ethical choice.',
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const articles = getArticlesByCategory('lab-grown-diamond-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
