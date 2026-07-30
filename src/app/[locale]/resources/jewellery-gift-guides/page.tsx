import type { Metadata } from 'next'
import { localizedAlternates } from '@/i18n/metadata'
import ResourceCategoryPage from '../../../../views/ResourceCategoryPage'
import { getCategoryBySlug, getArticlesByCategory } from '../../../../data/resources'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
  title: 'Jewellery Gift Guides | I Want Jewels Resources',
  description: 'Find the perfect jewellery gift for any occasion, budget, or personality — from first-time buyers to seasoned jewellery lovers.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/jewellery-gift-guides', locale),
  }
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const articles = getArticlesByCategory('jewellery-gift-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
