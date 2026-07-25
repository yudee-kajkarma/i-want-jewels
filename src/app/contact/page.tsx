import type { Metadata } from 'next'
import ContactPage from '../../views/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us | I Want Jewels',
  description:
    'Get in touch with the I Want Jewels team for customer support, custom order inquiries, sizing advice, and product information.',
  alternates: {
    canonical: 'https://iwantjewels.com/contact',
  },
  openGraph: {
    title: 'Contact Us | I Want Jewels',
    description:
      'Get in touch with the I Want Jewels team for customer support, custom order inquiries, sizing advice, and product information.',
    type: 'website',
    url: 'https://iwantjewels.com/contact',
  },
}

export default function Page() {
  return <ContactPage />
}