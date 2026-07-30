import type { Metadata } from 'next'
import { localizedAlternates } from '@/i18n/metadata'
import ResourcesPage from '../../../views/ResourcesPage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
  title: 'Jewellery Resources & Guides | I Want Jewels',
  description:
    'Expert jewellery guides covering lab-grown diamonds, demi-fine jewellery, earring styling, occasion jewellery, care tips, and gift ideas.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources', locale),
  }
}

export default function Page() {
  return <ResourcesPage />
}
