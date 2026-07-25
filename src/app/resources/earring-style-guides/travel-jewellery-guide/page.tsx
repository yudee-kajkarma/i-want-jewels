import type { Metadata } from 'next'
import ResourceArticleV2Page from '../../../../views/ResourceArticleV2Page'
import type {
  V2ArticleSection,
  V2HeroIntro,
  V2QuickSummary,
  V2FAQItem,
  V2CTABlock,
} from '../../../../views/ResourceArticleV2Page'
import { getCategoryBySlug, getArticleBySlug, getRelatedArticles } from '../../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Travel Jewellery Guide: Best Earrings for Travel',
  description:
    'Discover the best travel-friendly jewellery, including lab-grown diamond stud earrings, huggies, and versatile pieces you can wear all day on vacation.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/earring-style-guides/travel-jewellery-guide',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/earring-style-guides/travel-jewellery-guide',
  },
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-41.jpg',
  title: 'Travel Jewellery Guide:',
  subtitle: 'The Best Earrings You Can Wear All Day',
  paragraphs: [
    'When traveling, the best jewellery is versatile, secure, and comfortable. You want pieces that can seamlessly transition from a morning city walk to an elegant dinner without needing a complete wardrobe change.',
    'For earrings, this usually means opting for secure closures, low-profile designs, and classic shapes that match any outfit. Huggie earrings and classic diamond studs are the absolute best choices for a travel jewellery capsule.',
    'This guide covers how to choose travel-friendly earrings, how to style them for different vacation activities, and how to keep them safe on the road, highlighting our most versatile demi-fine lab-grown diamond pieces.'
  ],
  shopLabel: 'Shop Travel Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Learn why huggies and studs are the best earrings for travel',
    'Build a versatile minimalist travel jewellery capsule wardrobe',
    'Choose earrings that easily transition from day to night',
    'Understand secure earring closures for active vacations',
    'Find the best IWantJewels pieces for city breaks and beach holidays'
  ],
  image: '/blog-images/blog-image-19.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Why Huggies and Studs Are Perfect for Travel',
    content: [
      { type: 'paragraph', text: 'When you travel, comfort and versatility are key. You do not want heavy, oversized earrings getting caught on scarves, luggage straps, or airplane pillows.' },
      { type: 'paragraph', text: 'Huggies sit close to the earlobe, making them practically snag-proof. Classic studs (especially those with secure friction backs) are lightweight and can be slept in if necessary. Both styles pair effortlessly with a simple t-shirt during the day and a nice dress at night.' },
      { type: 'see-also', text: 'Everyday Lab-Grown Diamond Earrings Guide', href: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' }
    ],
  },
  {
    heading: 'Building Your Travel Jewellery Capsule',
    content: [
      { type: 'paragraph', text: 'Instead of packing a different pair of earrings for every outfit, build a simple capsule that mixes and matches.' },
      {
        type: 'bullet-list',
        items: [
          'The Everyday Base: A pair of diamond huggies (like Amadea) that you can put in and leave in.',
          'The Classic Sparkle: A pair of lab-grown diamond studs (like Cadenza M) for dinners or events.',
          'The Evening Statement: A pair of small hoops (like Pave Hoops) when you want slightly more volume without heavy weight.'
        ],
      }
    ],
  },
  {
    heading: 'Product Recommendations',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works for Travel'],
        rows: [
          ['Amadea Huggie', 'Daily Sightseeing', 'Close-fitting, very secure, won\'t catch on clothes'],
          ['Cadenza S Studs', 'Second Piercings', 'Tiny, brilliant sparkle that you can sleep in safely'],
          ['Pave Hoops', 'Dinner & Drinks', 'Elevates a simple outfit instantly, lightweight'],
          ['Laluce Minimalist', 'Minimalist Packers', 'Extremely subtle but elegant enough for photos']
        ],
      }
    ],
  }
]

const faq: V2FAQItem[] = [
  { question: 'What are the best earrings for airplane travel?', answer: 'Small huggies or flat-backed studs are best for airplanes as they will not poke your neck if you try to sleep on a travel pillow.' },
  { question: 'Should I take fine jewellery on vacation?', answer: 'Many people prefer travelling with demi-fine jewellery (like sterling silver with lab-grown diamonds) rather than their most expensive heirlooms. It offers the same brilliant look with less anxiety.' },
  { question: 'How should I pack my earrings?', answer: 'Use a padded travel jewellery case with dedicated earring holes or a soft pouch. Never throw earrings loosely into a makeup bag, as the posts can bend.' }
]

const cta: V2CTABlock = {
  heading: 'Ready for your next trip?',
  body: 'Pack smart with our collection of travel-friendly, comfortable, and beautifully versatile lab-grown diamond earrings.',
  primaryLabel: 'Shop Travel Essentials',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Read Minimalist Guide',
  secondaryHref: '/resources/earring-style-guides/minimalist-jewellery-styling-guide',
  tertiaryLabel: 'Read Huggies vs Hoops',
  tertiaryHref: '/resources/earring-style-guides/hoop-vs-huggie-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'travel-jewellery-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'travel-jewellery-guide', 3)
  return (
    <ResourceArticleV2Page
      category={category}
      article={article}
      relatedArticles={relatedArticles}
      heroIntro={heroIntro}
      quickSummary={quickSummary}
      content={articleContent}
      faq={faq}
      cta={cta}
    />
  )
}
