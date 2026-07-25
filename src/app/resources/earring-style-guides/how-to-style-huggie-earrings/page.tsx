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
  title: 'How to Style Huggie Earrings From Morning to Evening',
  description:
    'Discover how to style lab-grown diamond huggie earrings for the office, weekend casual outfits, ear stacks, and elegant evening dinners.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/earring-style-guides/how-to-style-huggie-earrings',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/earring-style-guides/how-to-style-huggie-earrings',
  },
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-47.jpg',
  title: 'How to Style Huggie Earrings:',
  subtitle: 'From Morning Coffee to Evening Cocktails',
  paragraphs: [
    'Huggie earrings are the ultimate versatile accessory. Because they sit so close to the earlobe, they offer a clean, polished look that never feels overdone, yet still provides enough detail to complete an outfit.',
    'Whether you are heading to a conservative office, running errands on the weekend, or dressing up for an anniversary dinner, huggies can adapt to the occasion. The key is in how you wear them: alone, stacked, or paired with a statement necklace.',
    'In this guide, we will show you how to maximize the wearability of your lab-grown diamond huggies across different times of day and dress codes.'
  ],
  shopLabel: 'Shop Huggie Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Learn why huggies are appropriate for strict office dress codes',
    'See how to dress down diamond huggies for casual weekends',
    'Master the art of the evening ear stack',
    'Pair huggies with necklaces without creating clutter',
    'Shop the Amadea Huggie for the perfect all-day earring'
  ],
  image: '/blog-images/blog-image-55.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Morning: Office and Workwear Styling',
    content: [
      { type: 'paragraph', text: 'In a professional setting, you want jewellery that looks intentional but not distracting. Huggies are perfect for this because they do not swing or make noise when you move your head.' },
      { type: 'bullet-list', items: [
        'The Look: A crisp white button-down or tailored blazer.',
        'The Styling: Wear a single pair of diamond huggies in your first lobe piercing. Keep your neck bare or wear a very delicate chain.',
        'The Vibe: Professional, put-together, and subtly luxurious.'
      ]}
    ],
  },
  {
    heading: 'Afternoon: Weekend Casual',
    content: [
      { type: 'paragraph', text: 'Diamonds aren\'t just for dresses. Lab-grown diamond huggies can instantly elevate a casual weekend outfit, making you look styled even when you are just grabbing coffee.' },
      { type: 'bullet-list', items: [
        'The Look: High-waisted denim, a simple t-shirt, and an oversized knit sweater.',
        'The Styling: Pair your huggies with a messy bun or casual ponytail to show them off. If you have multiple piercings, stack them with tiny plain gold or silver studs.',
        'The Vibe: Effortless "model off duty" chic.'
      ]}
    ],
  },
  {
    heading: 'Evening: Dinner and Drinks',
    content: [
      { type: 'paragraph', text: 'When the sun goes down, you might want a bit more impact. While you could swap your huggies for large hoops or drops, you can also just restyle the huggies you are already wearing.' },
      { type: 'bullet-list', items: [
        'The Look: A sleek black slip dress or a dramatic off-the-shoulder top.',
        'The Styling: This is where ear stacking shines. Move your huggies to your second piercing and put a larger lab-grown diamond stud (like Cadenza M) in your first piercing. Alternatively, keep the huggies in the first lobe and add a bold statement necklace.',
        'The Vibe: Modern, curated, and intentionally unbalanced.'
      ]},
      { type: 'see-also', text: 'Diamond Ear Stack Ideas', href: '/resources/earring-style-guides/diamond-ear-stack-ideas' }
    ],
  }
]

const faq: V2FAQItem[] = [
  { question: 'Do huggies look good with short hair?', answer: 'Yes! Huggies are incredibly flattering with short hair or updos. Because the neck and jawline are exposed, the close-fitting huggie adds a spark of light without overwhelming the face.' },
  { question: 'Can I wear huggies with a statement necklace?', answer: 'Absolutely. Because huggies are small and close to the ear, they are the perfect earring to wear when you want your necklace to be the star of the show. They provide balance without competing for attention.' }
]

const cta: V2CTABlock = {
  heading: 'One Earring. Endless Outfits.',
  body: 'The Amadea Huggie is designed to take you from your 9AM meeting to your 9PM dinner reservation without missing a beat.',
  primaryLabel: 'Shop Amadea Huggies',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Read What Are Huggies',
  secondaryHref: '/resources/earring-style-guides/what-are-huggie-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'how-to-style-huggie-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'how-to-style-huggie-earrings', 3)
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
