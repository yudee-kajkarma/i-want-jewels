import type { Metadata } from 'next'
import AboutPage from '../../../views/AboutPage'

export const metadata: Metadata = {
  title: { absolute: 'About I Want Jewels | Antwerp Jewellery Brand' },
  description:
    'Discover the story behind I Want Jewels, an Antwerp jewellery brand creating skin-friendly lab-grown diamond jewellery in its own factory.',
  alternates: {
    canonical: '/about',
  },
}

export default function Page() {
  return <AboutPage />
}
