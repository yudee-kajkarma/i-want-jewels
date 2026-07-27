import type { Metadata } from 'next'
import ContactPage from '../../views/ContactPage'

export const metadata: Metadata = {
  title: { absolute: 'Contact I Want Jewels | Orders, Products & Support' },
  description:
    'Contact I Want Jewels for help with orders, returns, delivery or product questions. Our team is ready to assist with your jewellery purchase.',
  alternates: {
    canonical: '/contact',
  },
}

export default function Page() {
  return <ContactPage />
}
