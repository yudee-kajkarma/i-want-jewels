import type { Metadata } from 'next'
import { localizedAlternates } from '@/i18n/metadata'
import HelpPage from '../../../views/HelpPage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
  title: 'Help | I Want Jewels',
  description: 'Help center is coming soon. Contact our team for support in the meantime.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/help', locale),
  }
}

export default function Page() {
  return <HelpPage />
}
