import type { Metadata } from 'next'
import HomePage from '../views/HomePage'

export const metadata: Metadata = {
  title: 'Lab-Grown Diamond Jewellery | I Want Jewels',
  description:
    'Shop modern lab-grown diamond jewellery for everyday luxury, including earrings, necklaces, rings and bracelets designed to shine.',
  alternates: {
    canonical: 'https://iwantjewels.com',
  },
  openGraph: {
    title: 'Lab-Grown Diamond Jewellery | I Want Jewels',
    description:
      'Shop modern lab-grown diamond jewellery for everyday luxury, including earrings, necklaces, rings and bracelets designed to shine.',
    type: 'website',
    url: 'https://iwantjewels.com',
  },
}

export default function Page() {
  return <HomePage />
}