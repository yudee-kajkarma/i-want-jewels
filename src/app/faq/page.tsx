import type { Metadata } from 'next'
import FAQPage from "@/views/FaqPage"

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | I Want Jewels',
  description:
    'Find answers to common questions about lab-grown diamond jewellery, shipping, returns, ring sizing, and product care at I Want Jewels.',
  alternates: {
    canonical: 'https://iwantjewels.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | I Want Jewels',
    description:
      'Find answers to common questions about lab-grown diamond jewellery, shipping, returns, ring sizing, and product care at I Want Jewels.',
    type: 'website',
    url: 'https://iwantjewels.com/faq',
  },
}

export default function Page() {
  return <FAQPage />
}