import type { Metadata } from 'next'
import HelpPage from '../../views/HelpPage'

export const metadata: Metadata = {
  title: 'Help | I Want Jewels',
  description: 'Help center is coming soon. Contact our team for support in the meantime.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://iwantjewels.com/help',
  },
}

export default function Page() {
  return <HelpPage />
}
