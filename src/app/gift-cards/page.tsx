import type { Metadata } from 'next'
import GiftCardsLandingPage from '../../views/GiftCardsLandingPage'

export const metadata: Metadata = {
  title: 'Digital Gift Cards | I Want Jewels',
  description:
    'Give the gift of choice with an I Want Jewels digital gift card for lab-grown diamond earrings, necklaces, rings, and bracelets.',
  alternates: {
    canonical: 'https://iwantjewels.com/gift-cards',
  },
  openGraph: {
    title: 'Digital Gift Cards | I Want Jewels',
    description:
      'Give the gift of choice with an I Want Jewels digital gift card for lab-grown diamond earrings, necklaces, rings, and bracelets.',
    type: 'website',
    url: 'https://iwantjewels.com/gift-cards',
  },
}

export default function Page() {
  return <GiftCardsLandingPage />
}
