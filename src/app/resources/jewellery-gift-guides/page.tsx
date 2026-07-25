import type { Metadata } from 'next'
import ResourceCategoryPage from '../../../views/ResourceCategoryPage'
import { getCategoryBySlug, getArticlesByCategory } from '../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Jewellery Gift Guides | I Want Jewels Resources',
  description: 'Find the perfect jewellery gift for any occasion, budget, or personality — from first-time buyers to seasoned jewellery lovers.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/jewellery-gift-guides',
  },
  openGraph: {
    title: 'Jewellery Gift Guides | I Want Jewels Resources',
    description: 'Find the perfect jewellery gift for any occasion, budget, or personality — from first-time buyers to seasoned jewellery lovers.',
    url: 'https://iwantjewels.com/resources/jewellery-gift-guides',
  },
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const articles = getArticlesByCategory('jewellery-gift-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
