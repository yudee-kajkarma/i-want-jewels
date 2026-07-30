import type { NextConfig } from 'next'

const allowedDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean) ?? ['192.168.29.162']

const nextConfig: NextConfig = {
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
}

export default nextConfig