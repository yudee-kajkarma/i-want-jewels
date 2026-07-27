import type { Metadata } from 'next'
import HomePage from '../views/HomePage'

export const metadata: Metadata = {
  title: { absolute: 'Lab-Grown Diamond Jewellery for Everyday | I Want Jewels' },
  description:
    'Discover lab-grown diamond jewellery from Antwerp, crafted in 925 sterling silver with 14kt gold plating. Shop earrings, necklaces, rings, bracelets and gifts.',
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  return <HomePage />
}
