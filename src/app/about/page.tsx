import type { Metadata } from 'next'
import AboutPage from '../../views/AboutPage'

export const metadata: Metadata = {
  title: 'About Us | I Want Jewels',
  description:
    'Learn about I Want Jewels and our mission to create sustainable, ethically crafted lab-grown diamond jewellery for everyday luxury.',
  alternates: {
    canonical: 'https://iwantjewels.com/about',
  },
  openGraph: {
    title: 'About Us | I Want Jewels',
    description:
      'Learn about I Want Jewels and our mission to create sustainable, ethically crafted lab-grown diamond jewellery for everyday luxury.',
    type: 'website',
    url: 'https://iwantjewels.com/about',
  },
}

export default function Page() {
  return <AboutPage />
}