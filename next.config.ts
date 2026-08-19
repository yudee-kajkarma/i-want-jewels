import type { NextConfig } from 'next'
import { buildRedirects } from './src/data/redirects'

const allowedDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? ['192.168.29.162']

const nextConfig: NextConfig = {
  output: 'standalone',
  // Required when opening the dev server via LAN IP (e.g. 192.168.x.x:3000).
  // Without this, Next.js 16 blocks HMR chunks and React never hydrates.
  allowedDevOrigins,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // SEO migration: permanent (308) redirects for retired blog and resource URLs.
  // Table lives in src/data/redirects.ts — see docs/seo-migration-tracker.md §2 and §3.
  async redirects() {
    return buildRedirects()
  },
}

export default nextConfig