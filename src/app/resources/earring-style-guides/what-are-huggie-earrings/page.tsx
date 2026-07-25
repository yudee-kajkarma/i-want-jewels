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
  title: 'What Are Huggie Earrings? The Ultimate Guide',
  description:
    'Learn what huggie earrings are, why they are so comfortable, and how to choose the best lab-grown diamond huggies for everyday wear and ear stacks.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/earring-style-guides/what-are-huggie-earrings',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/earring-style-guides/what-are-huggie-earrings',
  },
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-46.jpg',
  title: 'What Are Huggie Earrings?',
  subtitle: 'The Ultimate Guide to Comfort & Style',
  paragraphs: [
    'Huggie earrings are exactly what they sound like: small hoop-style earrings that sit so closely to the earlobe that they appear to "hug" it. They are one of the most popular earring styles for modern, minimalist jewellery lovers.',
    'Unlike larger hoops that dangle below the lobe and swing as you move, huggies are designed for a close, secure fit. This makes them incredibly comfortable for everyday wear, sleeping, and active lifestyles.',
    'In this guide, we will explore the different types of huggie earrings, how they compare to traditional hoops, how to measure your ear for the perfect fit, and the best lab-grown diamond huggies from the IWantJewels collection.'
  ],
  shopLabel: 'Shop Huggie Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Define what a huggie earring is and how it differs from a standard hoop',
    'Explore the comfort benefits of wearing huggies every day',
    'Learn how to choose the right inner diameter for your lobe',
    'Understand why huggies are essential for modern ear stacks',
    'Discover our bestselling lab-grown diamond Amadea huggies'
  ],
  image: '/blog-images/blog-image-45.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'The Anatomy of a Huggie Earring',
    content: [
      { type: 'paragraph', text: 'A huggie earring is characterized by its small diameter and its closure mechanism. Most huggies use a hinged back or a clicker style closure. Instead of a separate earring back, the post clicks securely into the back of the hoop itself.' },
      { type: 'paragraph', text: 'This seamless closure is a major reason why huggies are so comfortable. Without a standard butterfly back poking into your neck, huggies are much more comfortable to sleep in or wear while talking on the phone.' }
    ],
  },
  {
    heading: 'Huggies vs Standard Hoops',
    content: [
      {
        type: 'table',
        headers: ['Feature', 'Huggie Earring', 'Standard Hoop'],
        rows: [
          ['Fit', 'Sits flush against the earlobe', 'Dangles below the earlobe'],
          ['Movement', 'Stationary, no swinging', 'Swings with head movement'],
          ['Everyday Comfort', 'Extremely high', 'Varies by size and weight'],
          ['Ear Stacking', 'Excellent for 1st, 2nd, or 3rd lobe piercings', 'Usually reserved for the 1st lobe piercing']
        ],
      },
      { type: 'see-also', text: 'Hoop vs Huggie Earrings', href: '/resources/earring-style-guides/hoop-vs-huggie-earrings' }
    ],
  },
  {
    heading: 'How to Choose the Right Size',
    content: [
      { type: 'paragraph', text: 'Not all earlobes are the same size! To ensure a huggie actually hugs your ear without pinching, you need to check the inner diameter of the earring.' },
      { type: 'bullet-list', items: [
        'For high lobe or cartilage piercings: 5mm - 6mm',
        'For average first lobe piercings: 7mm - 9mm',
        'For slightly lower or thicker earlobes: 10mm - 12mm'
      ]},
      { type: 'paragraph', text: 'At IWantJewels, our Amadea Huggie is designed with a versatile inner diameter that comfortably fits most standard first and second lobe piercings.' }
    ],
  }
]

const faq: V2FAQItem[] = [
  { question: 'Can you sleep in huggie earrings?', answer: 'Yes, huggies are widely considered the best earrings to sleep in because they lack a sharp post or bulky butterfly back. The smooth, continuous loop is very comfortable against a pillow.' },
  { question: 'Are huggies hard to put on?', answer: 'They can take a little practice if you are used to butterfly backs, but once you learn how to click them into place, they are very easy and incredibly secure.' },
  { question: 'Do huggies look good on everyone?', answer: 'Absolutely. Huggies offer a clean, tailored look that flatters all face shapes and fits perfectly into minimalist and maximalist wardrobes alike.' }
]

const cta: V2CTABlock = {
  heading: 'Find Your Perfect Huggies',
  body: 'Discover the comfort and effortless style of our lab-grown diamond huggie earrings, crafted in demi-fine sterling silver and gold vermeil.',
  primaryLabel: 'Shop Amadea Huggies',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Read Studs vs Huggies',
  secondaryHref: '/resources/earring-style-guides/stud-vs-huggie-earrings',
  tertiaryLabel: 'Read How to Stack Earrings',
  tertiaryHref: '/resources/earring-style-guides/how-to-stack-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'what-are-huggie-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'what-are-huggie-earrings', 3)
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
