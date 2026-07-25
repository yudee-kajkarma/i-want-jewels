import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // 1. Diamond Stud & Diamond Hoop URLs to Retire
      {
        source: '/blogs/the-first-diamond-stud-earrings-2026',
        destination: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/the-best-first-diamond-earrings-2026',
        destination: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide',
        permanent: true,
      },
      {
        source: '/resources/earring-style-guides/lab-grown-diamond-hoop-earrings-guide',
        destination: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/the-best-pave-hoop-earrings-everyday-luxury-2026',
        destination: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide',
        permanent: true,
      },
      // 2. Everyday & Work Earrings URLs to Retire
      {
        source: '/blogs/the-everyday-diamond-earrings-for-work-in-2026',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/best-everyday-earrings-for-women-2026',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/everyday-office-earrings-in-2026',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/best-office-to-dinner-earrings-2026',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/best-diamond-earrings-for-office',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-style-diamond-studs-everyday-in-2026',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-style-medium-diamond-studs-from-day-to-night-in-the-2026',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-make-classic-diamond-studs-look-more-modern-in-2026',
        destination: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide',
        permanent: true,
      },
      // 3. Duplicate Daily Wear Resource
      {
        source:
          '/resources/earring-style-guides/can-you-wear-lab-grown-diamond-earrings-every-day',
        destination:
          '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day',
        permanent: true,
      },
      // 5. Ear Stacking URLs to Retire
      {
        source: '/blogs/how-to-style-huggie-earrings-in-theear-stack',
        destination: '/resources/earring-style-guides/how-to-stack-earrings',
        permanent: true,
      },
      {
        source: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks',
        destination: '/resources/earring-style-guides/diamond-ear-stack-ideas',
        permanent: true,
      },
      // 6. Minimalist Jewellery URLs to Retire
      {
        source: '/blogs/minimalist-jewellery-capsule-wardrobe',
        destination: '/resources/earring-style-guides/minimalist-jewellery-styling-guide',
        permanent: true,
      },
      {
        source: '/blogs/the-minimalist-jewellery-gifts-for-women',
        destination: '/resources/earring-style-guides/minimalist-jewellery-styling-guide',
        permanent: true,
      },
      {
        source: '/blogs/the-minimalist-huggie-earrings-quiet-luxury-2026',
        destination: '/resources/earring-style-guides/minimalist-jewellery-styling-guide',
        permanent: true,
      },
      // 8. Hoop vs Huggie Blog
      {
        source: '/blogs/huggie-earrings-vs-hoop-earrings-in-2026',
        destination: '/resources/earring-style-guides/hoop-vs-huggie-earrings',
        permanent: true,
      },
      // 9. Stud vs Huggie Blog
      {
        source: '/blogs/the-huggie-earrings-vs-stud-earrings-2026',
        destination: '/resources/earring-style-guides/stud-vs-huggie-earrings',
        permanent: true,
      },
      // Travel Blogs
      {
        source: '/blogs/the-travel-jewellery-for-the-women',
        destination: '/resources/earring-style-guides/travel-jewellery-guide',
        permanent: true,
      },
      {
        source: '/blogs/the-best-travel-friendly-diamond-earrings-in-2026',
        destination: '/resources/earring-style-guides/travel-jewellery-guide',
        permanent: true,
      },
      {
        source: '/blogs/the-travel-friendly-diamond-earrings-in-2026',
        destination: '/resources/earring-style-guides/travel-jewellery-guide',
        permanent: true,
      },
      {
        source: '/blogs/the-travel-jewellery-earrings-you-can-wear-all-day',
        destination: '/resources/earring-style-guides/travel-jewellery-guide',
        permanent: true,
      },
      // Huggie Definition Blogs
      {
        source: '/blogs/what-are-huggie-earrings-and-are-they-comfortable-in-2026',
        destination: '/resources/earring-style-guides/what-are-huggie-earrings',
        permanent: true,
      },
      {
        source: '/blogs/the-best-huggie-earrings-for-everyday-wear-in-2026',
        destination: '/resources/earring-style-guides/what-are-huggie-earrings',
        permanent: true,
      },
      // Huggie Styling Blog
      {
        source: '/blogs/how-to-style-diamond-huggies-from-morning-to-evening-2026',
        destination: '/resources/earring-style-guides/how-to-style-huggie-earrings',
        permanent: true,
      },
      // Existing Resource Redirects
      {
        source:
          '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts',
        destination:
          '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts',
        permanent: true,
      },
      {
        source:
          '/resources/jewellery-care-guides/new-year-jewellery-gifts',
        destination:
          '/resources/occasion-jewellery-guides/new-year-jewellery-gifts',
        permanent: true,
      },
      {
        source:
          '/resources/jewellery-care-guides/valentines-day-jewellery-gifts',
        destination:
          '/resources/jewellery-gift-guides/valentines-day-jewellery-gifts',
        permanent: true,
      },
    ]
  },
}

export default nextConfig