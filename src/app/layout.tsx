import type { Metadata } from 'next'
import '../index.css'
import './app.css'
import Providers from '../components/app/Providers'


export const metadata: Metadata = {
  title: 'I Want Jewels',
  description: 'Jewellery storefront migrated to Next.js',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}