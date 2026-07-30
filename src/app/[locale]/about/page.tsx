import type { Metadata } from 'next'
import { localizedAlternates } from '@/i18n/metadata'
import AboutPage from '../../../views/AboutPage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
  title: { absolute: 'About I Want Jewels | Antwerp Jewellery Brand' },
  description:
    'Discover the story behind I Want Jewels, an Antwerp jewellery brand creating skin-friendly lab-grown diamond jewellery in its own factory.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/about', locale),
  }
}

export default function Page() {
  return <AboutPage />
}
