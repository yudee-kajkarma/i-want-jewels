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
  title: 'Wedding & Occasion Jewellery Guides | I Want Jewels Resources',
  description: 'Bridal jewellery advice, anniversary gift ideas, and how to choose the perfect piece for every milestone moment in life.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/occasion-jewellery-guides', locale),
  }
}

export default function Page() {
  const category = getCategoryBySlug('occasion-jewellery-guides')
  const articles = getArticlesByCategory('occasion-jewellery-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
