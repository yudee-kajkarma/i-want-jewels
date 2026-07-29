import type { Metadata } from 'next'
import HomePage from '../../views/HomePage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Lab-Grown Diamond Jewellery for Everyday | I Want Jewels' },
    description:
      'Discover lab-grown diamond jewellery from Antwerp, crafted in 925 sterling silver with 14kt gold plating. Shop earrings, necklaces, rings, bracelets and gifts.',
    alternates: {
      canonical: `/${locale}`,
    },
  }
}

export default function Page() {
  return <HomePage />
}
