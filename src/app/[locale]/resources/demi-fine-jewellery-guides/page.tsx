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
  title: 'Demi-Fine Jewellery Guides | I Want Jewels Resources',
  description: 'Explore the world of demi-fine jewellery — sterling silver, gold vermeil, and lab-grown stones that sit beautifully between costume and fine jewellery.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/demi-fine-jewellery-guides', locale),
  }
}

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const articles = getArticlesByCategory('demi-fine-jewellery-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
