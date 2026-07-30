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
  title: 'Lab-Grown Diamond Guides | I Want Jewels Resources',
  description: 'Everything you need to know about lab-grown diamonds — how they are made, how they compare to mined diamonds, and why they are the smart, ethical choice.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/lab-grown-diamond-guides', locale),
  }
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const articles = getArticlesByCategory('lab-grown-diamond-guides')
  if (!category) notFound()
  return <ResourceCategoryPage category={category} articles={articles} />
}
