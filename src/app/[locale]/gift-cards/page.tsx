import { buildPageMetadata } from '@/i18n/metadata'
import GiftCardsLandingPage from '../../../views/GiftCardsLandingPage'

// Server component so generateMetadata can run; the view itself is 'use client'.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return buildPageMetadata(locale, 'giftCards', '/gift-cards')
}

export default function Page() {
  return <GiftCardsLandingPage />
}
