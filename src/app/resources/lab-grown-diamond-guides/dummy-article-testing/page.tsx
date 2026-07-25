import type { Metadata } from 'next'
import ResourceArticleV2Page from '../../../../views/ResourceArticleV2Page'
import type {
  V2ArticleSection,
  V2HeroIntro,
  V2QuickSummary,
  V2FAQItem,
} from '../../../../views/ResourceArticleV2Page'
import { getCategoryBySlug, getArticleBySlug, getRelatedArticles } from '../../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'What Are Lab-Grown Diamonds? A Simple Guide Before You Buy | I Want Jewels',
  description:
    'Lab-grown diamonds are real diamonds created in a controlled laboratory environment. Learn how they are made, how they compare to natural diamonds, and why they work beautifully in everyday jewellery.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/dummy-article-testing',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/dummy-article-testing',
  },
}

// ─── Section 1: Hero Intro ────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-2.jpg',
  title: 'What Are Lab-Grown Diamonds?',
  subtitle: 'A Simple Guide Before You Buy',
  paragraphs: [
    'Lab-grown diamonds are real diamonds created in a controlled laboratory environment instead of being mined from the earth. They have the same basic diamond structure as natural diamonds and can offer the same sparkle, hardness and beauty when they are well cut. The main difference is where they come from: natural diamonds form underground, while lab-grown diamonds are created above ground using advanced technology.',
    'For jewellery buyers, lab-grown diamonds have become popular because they make diamond jewellery feel more wearable. You can enjoy the look and feeling of real diamond jewellery without always needing to treat it like a once-in-a-lifetime purchase. They work beautifully in everyday earrings, studs, huggies, drop earrings, necklaces, bracelets and thoughtful gifts.',
    'If you are buying your first diamond piece, lab-grown diamond earrings are one of the easiest places to start. They are simple to wear, easy to style, and they bring sparkle close to the face without feeling too heavy or formal.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Section 2: Quick Summary ─────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds are real diamonds, not glass, crystal or cubic zirconia.',
    'They are created in a laboratory instead of being mined from the earth.',
    'A well-cut lab-grown diamond can sparkle beautifully and look just like a natural diamond to the eye.',
    'They are often more accessible in price than comparable natural diamonds.',
    'They are a strong choice for everyday earrings, wedding guest jewellery, gifts and modern demi-fine jewellery.',
    'The best jewellery choice depends on the design, metal, comfort, setting and how you plan to wear it.',
    'For a first purchase, lab-grown diamond studs or huggies are usually the easiest pieces to start with.',
  ],
  image: '/blog-images/blog-image-3.jpg',
}

// ─── Article Body Content ─────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Are Lab-Grown Diamonds?',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds are diamonds made in a laboratory using advanced technology. Instead of being mined from deep within the earth, they are grown in a controlled environment that recreates the conditions needed for diamond formation.',
      },
      {
        type: 'paragraph',
        text: 'You may also see them called lab-created diamonds, laboratory-grown diamonds, cultivated diamonds or man-made diamonds. These names can sound different, but they usually point to the same idea: a diamond that has been created above ground rather than mined.',
      },
      {
        type: 'paragraph',
        text: 'The most important thing to understand is that a lab-grown diamond is not a fake diamond. It is not cubic zirconia, glass, crystal or a simple diamond-look stone. A proper lab-grown diamond is still a diamond. It has the beauty, sparkle and durability that people expect from diamond jewellery.',
      },
      {
        type: 'paragraph',
        text: 'This is why lab-grown diamonds are such a good match for modern demi-fine jewellery. They let you enjoy diamond pieces more often, instead of saving them only for rare formal occasions. A small pair of diamond stud earrings can brighten a simple work outfit. Diamond drop earrings can make a wedding guest dress feel more finished. A delicate huggie can add just enough shine to an everyday ear stack.',
      },
      {
        type: 'see-also',
        text: 'Are lab-grown diamonds worth it?',
        href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-worth-it',
      },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Natural Diamonds',
    content: [
      {
        type: 'section-lead',
        text: 'The easiest way to understand lab-grown diamonds is to compare them with natural diamonds.',
      },
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamonds', 'Natural Diamonds'],
        rows: [
          ['Origin', 'Created in a controlled laboratory', 'Formed naturally underground'],
          ['Look', 'Can look identical to natural diamonds', 'Traditional mined diamond appearance'],
          ['Sparkle', 'Depends on cut quality', 'Depends on cut quality'],
          ['Durability', 'Very durable', 'Very durable'],
          ['Price', 'Usually more accessible', 'Usually more expensive'],
          ['Jewellery use', 'Excellent for everyday and occasion jewellery', 'Excellent for traditional fine jewellery'],
          [
            'Best for',
            'Buyers who want real diamond beauty in a more modern, accessible way',
            'Buyers who specifically want mined origin or traditional rarity',
          ],
        ],
      },
      {
        type: 'see-also',
        text: 'Lab-grown vs natural diamonds — full comparison',
        href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds',
      },
      {
        type: 'paragraph',
        text: "The beauty of a diamond is not only about where it comes from. A diamond's final look depends on its cut, clarity, colour, setting and design. A well-designed lab-grown diamond earring can look far more elegant than a poorly cut diamond that only has a higher price tag.",
      },
      {
        type: 'paragraph',
        text: 'This matters especially with earrings. Earrings are not viewed under a microscope in real life. They are seen as part of your face, outfit and overall style. The way they catch the light, sit on the ear and match your wardrobe often matters more than tiny technical details.',
      },
      {
        type: 'divider',
      },
      {
        type: 'subheading',
        text: 'Are Lab-Grown Diamonds Real Diamonds?',
      },
      {
        type: 'paragraph',
        text: 'Yes, lab-grown diamonds are real diamonds.',
      },
      {
        type: 'paragraph',
        text: 'This is one of the most common questions people ask before buying. The confusion usually comes from the word "lab." Some shoppers hear it and think the diamond must be artificial, fake or lower quality. That is not correct.',
      },
      {
        type: 'paragraph',
        text: 'A better way to think about it: lab-grown diamonds are not fake diamonds. They are diamonds with a laboratory origin instead of a mined origin.',
      },
      {
        type: 'paragraph',
        text: 'Many cheaper jewellery pieces use stones that only look like diamonds. Cubic zirconia, glass and crystals can look shiny at first, but they are not diamonds. A lab-grown diamond gives you a more genuine diamond jewellery experience while often being more accessible than a mined diamond.',
      },
    ],
  },
  {
    heading: 'How Are Lab-Grown Diamonds Made?',
    content: [
      {
        type: 'section-lead',
        text: 'Lab-grown diamonds are usually made using one of two methods: HPHT or CVD.',
      },
      {
        type: 'table',
        headers: ['Method', 'Full Name', 'Simple Explanation'],
        rows: [
          [
            'HPHT',
            'High Pressure High Temperature',
            'Recreates the intense pressure and heat involved in natural diamond formation',
          ],
          [
            'CVD',
            'Chemical Vapour Deposition',
            'Uses carbon-rich gas to grow diamond crystal layer by layer',
          ],
        ],
      },
      {
        type: 'paragraph',
        text: 'You do not need to become a diamond expert before buying jewellery. For most shoppers, the method is less important than how the final piece looks and feels when worn.',
      },
      {
        type: 'paragraph',
        text: 'When choosing lab-grown diamond jewellery, pay attention to the full piece, not only the stone. Ask yourself whether the jewellery feels comfortable, whether the design suits your lifestyle, whether the metal colour works with your wardrobe, and whether you will actually wear it more than once.',
      },
      {
        type: 'see-also',
        text: 'How lab-grown diamonds are made — HPHT vs CVD explained',
        href: '/resources/lab-grown-diamond-guides/how-lab-grown-diamonds-are-made',
      },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Good Quality?',
    content: [
      {
        type: 'grid-layout',
        image: '/blog-images/blog-image-6.jpg',
        imagePosition: 'left',
        content: [
          {
            type: 'paragraph',
            text: 'Lab-grown diamonds can be excellent quality, but not every lab-grown diamond is automatically beautiful. Just like natural diamonds, the final appearance depends on quality factors.',
          },
          {
            type: 'paragraph',
            text: 'The main quality factors are often called the 4 Cs: cut, colour, clarity and carat. For everyday jewellery, you do not always need to chase the highest possible grade in every category. What matters most is whether the diamond looks bright, clean and beautiful in the actual jewellery design.',
          },
          {
            type: 'paragraph',
            text: 'For earrings, cut and overall sparkle are especially important. Earrings are seen from a natural distance, so the way they reflect light often matters more than tiny internal details that only appear under magnification.',
          },
          {
            type: 'see-also',
            text: 'Understanding lab-grown diamond grading — the 4 Cs explained',
            href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-grading',
          },
        ],
      },
    ],
  },
  {
    heading: 'Why Are Lab-Grown Diamonds So Popular?',
    content: [
      {
        type: 'grid-layout',
        image: '/blog-images/blog-image-8.jpg',
        imagePosition: 'right',
        content: [
          {
            type: 'paragraph',
            text: 'Lab-grown diamonds are popular because they match how many people want to buy jewellery today. A lot of shoppers want something that feels special, but not intimidating. They want sparkle, but not a piece that feels too formal for everyday life.',
          },
          {
            type: 'bullet-list',
            items: [
              'Everyday earrings that add polish without looking overdone',
              'Wedding guest jewellery that feels elegant but not bridal',
              'Bridesmaid jewellery that looks beautiful in photos',
              'Birthday gifts that feel personal and thoughtful',
              'Anniversary gifts that feel romantic but modern',
              'Party jewellery that adds shine without feeling too heavy',
              'Ear stacks where small studs and huggies create a layered look',
            ],
          },
        ],
      },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds in Demi-Fine Jewellery',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds work especially well in demi-fine jewellery. Demi-fine sits between cheap fashion jewellery and traditional fine jewellery. It uses better materials than costume jewellery, while staying more accessible than solid gold or platinum fine jewellery.',
      },
      {
        type: 'table',
        headers: ['IWJ Jewellery Element', 'Why It Matters'],
        rows: [
          ['Lab-grown diamonds', 'Adds real diamond beauty to wearable jewellery'],
          ['925 sterling silver', 'A quality base metal for demi-fine pieces'],
          ['14K gold', 'Gives the jewellery a warm, premium gold finish'],
          ['Tarnish-proof and sweat-proof with care', 'Supports everyday wear when looked after properly'],
          ['Controlled production environment', 'Helps maintain consistency and quality'],
        ],
      },
      {
        type: 'paragraph',
        text: 'This combination makes the jewellery feel practical without losing its special feeling. You can choose simple studs for daily wear, a huggie for an ear stack, or drop earrings for a wedding guest outfit without feeling like the jewellery has to stay hidden away.',
      },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Are lab-grown diamonds real diamonds?',
    answer:
      'Yes. Lab-grown diamonds are real diamonds in every meaningful sense. They share the same chemical composition (pure carbon), the same crystal structure, the same hardness (10 on the Mohs scale) and the same optical brilliance as mined diamonds. The only difference is their origin — they are grown in a laboratory rather than extracted from the earth.',
  },
  {
    question: 'Can you tell the difference between a lab-grown diamond and a natural diamond?',
    answer:
      'Not with the naked eye. A well-cut lab-grown diamond looks identical to a mined diamond when worn. Even trained gemologists cannot distinguish them visually — specialised equipment is needed to detect trace differences in growth patterns. In everyday jewellery, you will not be able to tell them apart.',
  },
  {
    question: 'Why are lab-grown diamonds less expensive than natural diamonds?',
    answer:
      'The price difference comes from the supply chain, not the quality. Natural diamonds require large-scale mining operations, complex logistics and years of distribution. Lab-grown diamonds are produced in a controlled facility, which removes most of those costs. The diamond itself is the same — the saving comes from the shorter journey it takes to reach you.',
  },
  {
    question: 'Do lab-grown diamonds last as long as natural diamonds?',
    answer:
      'Yes. Because they have the same hardness and structure as natural diamonds, lab-grown diamonds are equally durable. They will not fade, scratch or change over time with normal wear. With basic care — avoiding harsh chemicals and storing pieces separately — lab-grown diamond jewellery can last a lifetime.',
  },
  {
    question: 'Are lab-grown diamonds a good choice for everyday jewellery?',
    answer:
      'They are an excellent choice for everyday wear. The durability of diamond makes it one of the most practical stones for jewellery you plan to wear regularly. Lab-grown diamonds also make it easier to enjoy diamond pieces in a more relaxed way — as everyday earrings, a necklace for work, or a gift you can actually wear rather than keep in a box.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'what-are-lab-grown-diamonds')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'what-are-lab-grown-diamonds', 3)
  return (
    <ResourceArticleV2Page
      category={category}
      article={article}
      relatedArticles={relatedArticles}
      heroIntro={heroIntro}
      quickSummary={quickSummary}
      content={articleContent}
      faq={faq}
    />
  )
}
