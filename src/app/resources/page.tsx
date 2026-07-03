import type { Metadata } from 'next'
import ResourcesPage from '../../views/ResourcesPage'

export const metadata: Metadata = {
  title: 'Jewellery Resources & Guides | I Want Jewels',
  description:
    'Expert jewellery guides covering lab-grown diamonds, demi-fine jewellery, earring styling, occasion jewellery, care tips, and gift ideas.',
}

export default function Page() {
  return <ResourcesPage />
}
