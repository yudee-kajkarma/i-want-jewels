import type { Metadata } from 'next'
import ResourceCategoryPage from '../../../views/ResourceCategoryPage'
import { getCategoryBySlug, getArticlesByCategory } from '../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Earring Styling Guides | I Want Jewels Resources',
  description: 'From ear stacking to choosing the right earring for your face shape, our earring guides help you wear your jewellery with confidence.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/earring-style-guides',
  },
  openGraph: {
    title: 'Earring Styling Guides | I Want Jewels Resources',
    description: 'From ear stacking to choosing the right earring for your face shape, our earring guides help you wear your jewellery with confidence.',
    url: 'https://iwantjewels.com/resources/earring-style-guides',
  },
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const articles = getArticlesByCategory('earring-style-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
