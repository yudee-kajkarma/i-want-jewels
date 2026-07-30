import type { Metadata } from 'next'
import { localizedAlternates } from '@/i18n/metadata'
import ContactPage from '../../../views/ContactPage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
  title: { absolute: 'Contact I Want Jewels | Orders, Products & Support' },
  description:
    'Contact I Want Jewels for help with orders, returns, delivery or product questions. Our team is ready to assist with your jewellery purchase.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/contact', locale),
  }
}

export default function Page() {
  return <ContactPage />
}
