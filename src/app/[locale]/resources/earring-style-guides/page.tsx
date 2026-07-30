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
  title: 'Earring Styling Guides | I Want Jewels Resources',
  description: 'From ear stacking to choosing the right earring for your face shape, our earring guides help you wear your jewellery with confidence.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/earring-style-guides', locale),
  }
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const articles = getArticlesByCategory('earring-style-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
