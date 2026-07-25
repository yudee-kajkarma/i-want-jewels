import type { Metadata } from 'next'
import ResourceCategoryPage from '../../../views/ResourceCategoryPage'
import { getCategoryBySlug, getArticlesByCategory } from '../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Jewellery Care Guides | I Want Jewels Resources',
  description: 'Keep your jewellery looking its best with our expert care guides covering cleaning, storage, and everyday wear tips for every metal and stone type.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/jewellery-care-guides',
  },
  openGraph: {
    title: 'Jewellery Care Guides | I Want Jewels Resources',
    description: 'Keep your jewellery looking its best with our expert care guides covering cleaning, storage, and everyday wear tips for every metal and stone type.',
    url: 'https://iwantjewels.com/resources/jewellery-care-guides',
  },
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-care-guides')
  const articles = getArticlesByCategory('jewellery-care-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
