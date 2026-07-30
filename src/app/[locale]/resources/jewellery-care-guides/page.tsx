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
  title: 'Jewellery Care Guides | I Want Jewels Resources',
  description: 'Keep your jewellery looking its best with our expert care guides covering cleaning, storage, and everyday wear tips for every metal and stone type.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/jewellery-care-guides', locale),
  }
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-care-guides')
  const articles = getArticlesByCategory('jewellery-care-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
