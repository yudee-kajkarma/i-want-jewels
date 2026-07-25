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
  title: 'What Is Demi Fine Jewellery? Simple Guide',
  description:
    'Learn what demi fine jewellery means, how it compares to fine and fashion jewellery, and how to choose pieces for everyday wear and gifts.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/demi-fine-jewellery-guides/what-is-demi-fine-jewellery',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/demi-fine-jewellery-guides/what-is-demi-fine-jewellery',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-105.jpg',
  title: 'What Is Demi-Fine Jewellery?',
  subtitle: 'A Practical Jewellery Guide',
  paragraphs: [
    'Demi-fine jewellery sits between low-cost fashion jewellery and traditional fine jewellery. It is made to feel more elevated than costume jewellery, but more wearable and accessible than solid gold or platinum fine jewellery.',
    'For many shoppers, demi-fine jewellery is the sweet spot. It gives you jewellery that looks polished, feels special, and can be worn more often without feeling too formal or unreachable. This makes it especially useful for everyday earrings, gift jewellery, wedding guest styling, ear stacks, birthday gifts and occasion pieces.',
    'At IWantJewels, the demi-fine direction is built around lab-grown diamonds, 925 sterling silver and 14kt gold plating. The result is jewellery that has real diamond sparkle and a premium finish, while still being designed for modern everyday wear.',
  ],
  shopLabel: 'Shop Demi-Fine Jewellery',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Understand what demi-fine jewellery means',
    'Compare demi-fine, fine and fashion jewellery',
    'Know what materials are commonly used in demi-fine pieces',
    'Understand why lab-grown diamonds work well in demi-fine jewellery',
    'Decide whether demi-fine jewellery is right for everyday wear',
    'Choose demi-fine earrings for gifts, weddings, parties and ear stacks',
    'Understand IWantJewels product quality in simple language',
    'Find product recommendations based on how you plan to wear the jewellery',
  ],
  image: '/blog-images/blog-image-104.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Demi-Fine Jewellery Meaning',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery is jewellery that sits between fashion jewellery and fine jewellery.' },
      { type: 'paragraph', text: 'Fashion jewellery is usually made with lower-cost materials and is often designed for short-term trends. Fine jewellery is usually made with precious metals like solid gold or platinum and may use natural diamonds or high-value gemstones. Demi-fine jewellery sits in the middle by using better materials than fashion jewellery while remaining more accessible than traditional fine jewellery.' },
      { type: 'paragraph', text: 'The word "demi" means "half" or "partly," which explains the category well. Demi-fine jewellery is not costume jewellery, but it is also not always the same as traditional fine jewellery. It is made for people who want better quality, better finish and more lasting style, without always choosing solid gold or very high-priced pieces.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Demi-Fine vs Fine Jewellery vs Fashion Jewellery',
    content: [
      { type: 'paragraph', text: 'This comparison should sit near the top of the page because many shoppers are trying to understand the difference quickly.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-106.jpg',
        content: [
          {
            type: 'table',
            headers: ['Jewellery Type', 'What It Usually Means', 'Best For'],
            rows: [
              ['Fashion jewellery', 'Lower-cost trend jewellery, often made with base metals or imitation stones', 'Short-term styling and trend pieces'],
              ['Demi-fine jewellery', 'Better materials such as sterling silver, gold plating, vermeil or lab-grown diamonds', 'Everyday wear, gifts, modern styling and accessible luxury'],
              ['Fine jewellery', 'Solid gold, platinum, natural diamonds or high-value gemstones', 'Heirloom pieces, luxury gifts and traditional fine jewellery purchases'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'Demi-fine jewellery is ideal when you want jewellery that feels more special than fashion jewellery, but you do not necessarily want to pay for traditional fine jewellery.' },
      { type: 'paragraph', text: 'For IWantJewels, this is exactly where the product range fits. The pieces are designed to give shoppers real diamond sparkle, polished styling and a more premium jewellery feel, while still being practical for regular wear.' },
    ],
  },
  {
    heading: 'What Materials Are Used in Demi-Fine Jewellery?',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery can use different materials depending on the brand. Common materials include sterling silver, gold plating, gold vermeil, lab-grown diamonds, semi-precious stones and sometimes recycled metals.' },
      { type: 'paragraph', text: 'At IWantJewels, the main material story is simple:' },
      {
        type: 'table',
        headers: ['IWantJewels Material', 'Why It Matters'],
        rows: [
          ['Lab-grown diamonds', 'Adds real diamond sparkle in a modern format'],
          ['925 sterling silver', 'Gives the jewellery a stronger base than low-cost fashion metals'],
          ['14kt gold plating', 'Creates a warm, premium gold finish'],
          ['Controlled factory production', 'Helps keep design and quality consistent'],
          ['Tarnish-proof and sweat-proof with care', 'Designed for real wear when properly cared for'],
        ],
      },
      { type: 'paragraph', text: 'This combination helps position IWantJewels as more elevated than simple fashion jewellery, while still being more accessible than traditional solid gold diamond jewellery.' },
      { type: 'see-also', text: '925 sterling silver jewellery', href: '#' },
    ],
  },
  {
    heading: 'Why 925 Sterling Silver Matters',
    content: [
      { type: 'paragraph', text: '925 sterling silver is commonly used in demi-fine jewellery because it offers a better quality base than many low-cost fashion jewellery metals.' },
      { type: 'paragraph', text: 'The "925" means the metal is made mostly from silver, with a small percentage of other metals added for strength. Pure silver is too soft for most jewellery, so sterling silver is used to make the piece more practical.' },
      { type: 'paragraph', text: 'For earrings, this matters because the jewellery sits close to the skin and needs to feel comfortable, secure and well-made. A better base metal helps the jewellery feel more substantial than cheap costume pieces.' },
      { type: 'paragraph', text: 'At IWantJewels, 925 sterling silver is used as the foundation for many pieces before adding 14kt gold plating. This gives the jewellery a premium demi-fine feel while keeping it wearable.' },
      { type: 'see-also', text: 'Is 925 sterling silver good for earrings?', href: '#' },
    ],
  },
  {
    heading: 'What Does 14kt Gold Plating Mean?',
    content: [
      { type: 'paragraph', text: '14kt gold plating means a layer of 14kt gold is applied over the base metal. In IWantJewels pieces, the base is 925 sterling silver, with 14kt gold plating used to create the gold finish.' },
      { type: 'paragraph', text: 'Gold plating gives jewellery the look and warmth of gold while keeping it more accessible than solid gold jewellery. This is one of the reasons it is commonly used in demi-fine jewellery.' },
      { type: 'paragraph', text: 'The important thing to understand is that gold-plated jewellery still needs care. The gold layer is a surface finish, so it should be protected from harsh chemicals, rough handling, perfume, lotions, chlorine and unnecessary moisture.' },
      { type: 'paragraph', text: 'That does not mean you should be afraid to wear it. It simply means the jewellery should be treated properly so it stays beautiful for longer.' },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '#' },
    ],
  },
  {
    heading: 'Why Lab-Grown Diamonds Work Well in Demi-Fine Jewellery',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are a strong fit for demi-fine jewellery because they bring real diamond sparkle into designs that feel wearable and modern.' },
      { type: 'paragraph', text: 'Traditional diamond jewellery can sometimes feel too formal or expensive for daily use. Fashion jewellery may be easy to buy, but it often does not have the same lasting beauty or material value. Lab-grown diamond demi-fine jewellery sits in the middle by giving shoppers the feeling of real diamond jewellery in a more accessible format.' },
      { type: 'paragraph', text: 'This is especially useful for earrings. Studs, huggies, hoops, drops and butterfly earrings can all feel more elevated when they include lab-grown diamonds.' },
      { type: 'paragraph', text: 'For IWantJewels, this is a key advantage. Pieces like Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Farfalla butterfly earrings and Orsola drop earrings allow shoppers to enjoy diamond jewellery in everyday and occasion-friendly designs.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real' },
    ],
  },
  {
    heading: 'Is Demi-Fine Jewellery Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery can be excellent for everyday wear when the design is comfortable and the piece is cared for properly.' },
      { type: 'paragraph', text: 'The best everyday demi-fine pieces are usually simple, secure and easy to style. Stud earrings, huggies, minimalist earrings and small hoops are especially useful because they work with many outfits and do not feel too formal.' },
      {
        type: 'table',
        headers: ['Everyday Need', 'Best Demi-Fine Direction', 'Recommended IWJ Products'],
        rows: [
          ['Simple daily sparkle', 'Small studs', 'Cadenza S'],
          ['More visible everyday earrings', 'Medium studs', 'Cadenza M'],
          ['Ear stacks', 'Huggies and small studs', 'Amadea Huggie, Cadenza S'],
          ['Minimal styling', 'Clean minimalist earrings', 'Laluce'],
          ['Casual polished look', 'Small hoops or huggies', 'Pave Hoops, Amadea'],
          ['Day-to-night styling', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Is Demi-Fine Jewellery Good for Gifts?',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery is one of the strongest categories for gifts because it feels special without being too difficult to choose.' },
      { type: 'paragraph', text: 'It is more meaningful than a simple fashion accessory, but it does not always carry the pressure of traditional fine jewellery. That makes it useful for birthdays, anniversaries, bridesmaids, graduation gifts, romantic gifts and everyday luxury gifts.' },
      { type: 'paragraph', text: 'Earrings are especially gift-friendly because they do not require ring sizing. Studs are the safest gift, butterfly earrings feel more symbolic, huggies feel modern, and drop earrings feel more occasion-ready.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-88.jpg',
        content: [
          {
            type: 'table',
            headers: ['Gift Purpose', 'Best Demi-Fine Direction', 'Recommended IWJ Products'],
            rows: [
              ['Safe birthday gift', 'Classic studs', 'Cadenza S, Cadenza M'],
              ['Meaningful gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
              ['Modern gift', 'Huggies or hoops', 'Amadea, Pave Hoops'],
              ['Romantic gift', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
              ['Bridesmaid gift', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
              ['Party-loving recipient', 'Bold sparkle', 'Lusso'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Demi-Fine Jewellery by Occasion',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery works well across many occasions because it is polished without being too formal.' },
      {
        type: 'table',
        headers: ['Occasion', 'Best Jewellery Style', 'Product Direction'],
        rows: [
          ['Everyday wear', 'Studs, huggies, minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Workwear', 'Small studs or clean huggies', 'Cadenza S, Cadenza M, Amadea'],
          ['Wedding guest outfits', 'Drops, medium studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Bridesmaid styling', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Birthday gifts', 'Studs, butterflies or huggies', 'Cadenza M, Farfalla, Amadea'],
          ['Anniversary gifts', 'Drops, studs or romantic designs', 'Orsola, Cadenza M, Alidi Farfalla'],
          ['Party outfits', 'Drops, hoops or bold statement earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Ear stacks', 'Studs, huggies and minimalist earrings', 'Cadenza S, Amadea, Laluce'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Demi-Fine Jewellery vs Solid Gold Jewellery',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery and solid gold jewellery serve different purposes.' },
      { type: 'paragraph', text: 'Solid gold jewellery is usually more expensive and can be a strong choice for heirloom pieces or long-term fine jewellery purchases. Demi-fine jewellery is often better for shoppers who want a premium look and better materials, but still want pieces that feel wearable and accessible.' },
      {
        type: 'table',
        headers: ['Feature', 'Demi-Fine Jewellery', 'Solid Gold Fine Jewellery'],
        rows: [
          ['Price', 'More accessible', 'Usually higher'],
          ['Everyday use', 'Strong fit when cared for properly', 'Strong fit'],
          ['Gift appeal', 'Easy and thoughtful', 'More formal and premium'],
          ['Trend flexibility', 'Easier to experiment', 'More expensive to experiment'],
          ['Material', 'Often sterling silver, gold plating, vermeil, lab-grown stones', 'Solid gold, platinum, fine gemstones'],
          ['Best for', 'Everyday jewellery, gifts, styling variety', 'Heirloom jewellery and traditional luxury'],
        ],
      },
      { type: 'paragraph', text: 'Demi-fine jewellery is not trying to replace solid gold jewellery. It gives shoppers another option: jewellery that feels elevated, but still practical for modern wardrobes.' },
      { type: 'see-also', text: 'Gold-plated vs solid gold jewellery', href: '#' },
    ],
  },
  {
    heading: 'Demi-Fine Jewellery vs Fashion Jewellery',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery is usually a better choice than fashion jewellery when you want pieces that feel more polished and meaningful.' },
      { type: 'paragraph', text: 'Fashion jewellery is useful for trends and low-cost styling. But if you want jewellery that feels more premium, more giftable and more wearable over time, demi-fine jewellery is usually stronger.' },
      {
        type: 'table',
        headers: ['Feature', 'Demi-Fine Jewellery', 'Fashion Jewellery'],
        rows: [
          ['Materials', 'Better materials such as sterling silver, gold plating, lab-grown diamonds', 'Often base metals, imitation stones or low-cost finishes'],
          ['Style lifespan', 'Usually more timeless', 'Often trend-led'],
          ['Gift value', 'Stronger', 'Usually more casual'],
          ['Everyday wear', 'Better when cared for properly', 'Can wear out faster'],
          ['Jewellery feeling', 'Polished and elevated', 'Fun, temporary, trend-focused'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, the lab-grown diamond element helps create a clear difference from simple fashion jewellery. The pieces are not just sparkly accessories. They are designed to feel like modern diamond jewellery.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-cubic-zirconia' },
    ],
  },
  {
    heading: 'Product Pathways by Buyer Need',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical shopping guide.' },
      { type: 'subheading', text: 'For First-Time Demi-Fine Buyers' },
      { type: 'paragraph', text: 'Choose simple studs. Cadenza S lab-grown diamond studs are a strong first piece because they are easy to wear, simple to style and not too bold.' },
      { type: 'subheading', text: 'For Everyday Jewellery' },
      { type: 'paragraph', text: 'Choose Cadenza S, Cadenza M, Amadea Huggie earrings or Laluce minimalist diamond earrings. These styles are easy to repeat and work with many outfits.' },
      { type: 'subheading', text: 'For Gifts' },
      { type: 'paragraph', text: 'Choose Cadenza M for a safe diamond gift, Farfalla for a meaningful gift, Amadea for a modern gift or Orsola for a romantic occasion gift.' },
      { type: 'subheading', text: 'For Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings for simple dresses, Cadenza M for detailed outfits, or Farfalla butterfly earrings for soft romantic looks.' },
      { type: 'subheading', text: 'For Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea Huggie earrings for a clean everyday stack. Add Laluce minimalist diamond earrings if you want a softer layered look.' },
      { type: 'subheading', text: 'For Party Styling' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when you want the jewellery to stand out, or Orsola drop earrings if you want sparkle with more elegance.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Demi-Fine Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First demi-fine diamond earrings', 'Simple, subtle and wearable'],
          ['Cadenza M diamond stud earrings', 'Classic gift or daily sparkle', 'More visible without being too bold'],
          ['Amadea Huggie earrings', 'Modern everyday styling', 'Strong for ear stacks and second piercings'],
          ['Laluce minimalist diamond earrings', 'Minimalist daily jewellery', 'Clean, quiet and easy to style'],
          ['Pave Hoops', 'Hoop styling and casual sparkle', 'Adds shape while staying wearable'],
          ['Farfalla butterfly earrings', 'Meaningful gift jewellery', 'Symbolic and feminine'],
          ['Alidi Farfalla butterfly earrings', 'Personal milestone gifts', 'Soft, memorable and gift-friendly'],
          ['Orsola drop earrings', 'Wedding guest and dinner styling', 'Adds movement and polish'],
          ['Concetta Short earrings', 'Soft occasion jewellery', 'Delicate drop direction'],
          ['Concetta Long earrings', 'Formal evening looks', 'More refined and elongated'],
          ['Lusso bold statement earrings', 'Party styling', 'Strong sparkle and high impact'],
        ],
      },
      { type: 'paragraph', text: 'Demi-fine jewellery is ideal when you want something more elevated than fashion jewellery but easier to wear than traditional fine jewellery. Start with studs for everyday wear, huggies for stacking, butterfly earrings for gifts, drops for weddings and bold statement earrings for parties.' },
    ],
  },
  {
    heading: 'Common Demi-Fine Jewellery Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is assuming demi-fine jewellery is the same as cheap fashion jewellery. It is not. Demi-fine pieces usually use better materials and are made to feel more elevated.' },
      { type: 'paragraph', text: 'Another mistake is treating gold-plated jewellery like solid gold. Gold plating needs care, especially around perfume, lotion, water, chlorine and harsh cleaning products.' },
      { type: 'paragraph', text: 'A third mistake is buying only for one outfit. The best demi-fine jewellery should work across multiple looks.' },
      { type: 'paragraph', text: 'Another mistake is choosing jewellery without checking the metal. At IWantJewels, the 925 sterling silver base and 14kt gold plating are important parts of the product story.' },
      { type: 'paragraph', text: 'Finally, do not forget care. Demi-fine jewellery can stay beautiful for longer when it is cleaned gently and stored properly.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/how-to-clean-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before buying demi-fine jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is this for everyday wear, gifting or an occasion?',
          'Is the piece made with better materials than fashion jewellery?',
          'Does the metal suit the wearer\'s skin and style?',
          'Is the jewellery comfortable enough to wear often?',
          'Does the design match more than one outfit?',
          'Is it made with lab-grown diamonds or diamond-look stones?',
          'Is the piece gold-plated, vermeil, sterling silver or solid gold?',
          'Does the jewellery need special care?',
          'Will the recipient actually wear this style?',
          'Does the piece feel special enough for the purpose?',
        ],
      },
      { type: 'paragraph', text: 'If you want jewellery that feels polished, wearable and giftable, demi-fine jewellery is a strong category to start with.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What is demi-fine jewellery?',
    answer: 'Demi-fine jewellery is jewellery that sits between fashion jewellery and fine jewellery. It usually uses better materials than costume jewellery but is more accessible than traditional solid gold or platinum fine jewellery.',
  },
  {
    question: 'Is demi-fine jewellery good quality?',
    answer: 'Demi-fine jewellery can be good quality when it uses strong materials, careful finishing and proper construction. At IWantJewels, the focus is on lab-grown diamonds, 925 sterling silver and 14kt gold plating.',
  },
  {
    question: 'Is demi-fine jewellery real jewellery?',
    answer: 'Yes, demi-fine jewellery is real jewellery. It is not the same as low-cost costume jewellery, although it is usually more accessible than traditional fine jewellery.',
  },
  {
    question: 'Is demi-fine jewellery better than fashion jewellery?',
    answer: 'Demi-fine jewellery is usually better if you want pieces that feel more polished, giftable and wearable over time. Fashion jewellery is better for short-term trends and very low-cost styling.',
  },
  {
    question: 'Is demi-fine jewellery the same as fine jewellery?',
    answer: 'No. Fine jewellery usually uses solid gold, platinum and higher-value gemstones. Demi-fine jewellery uses better materials than fashion jewellery but may include sterling silver, gold plating, vermeil or lab-grown diamonds.',
  },
  {
    question: 'Can you wear demi-fine jewellery every day?',
    answer: 'Yes, many demi-fine pieces can be worn regularly when cared for properly. Studs, huggies and minimalist earrings are especially good for everyday wear.',
  },
  {
    question: 'Does demi-fine jewellery tarnish?',
    answer: 'The answer depends on the material and care routine. Gold-plated and sterling silver jewellery should be protected from harsh chemicals, moisture and rough storage.',
  },
  {
    question: 'Is 925 sterling silver good for demi-fine jewellery?',
    answer: 'Yes, 925 sterling silver is a strong base for demi-fine jewellery because it feels more elevated than many low-cost fashion metals.',
  },
  {
    question: 'Is gold-plated jewellery demi-fine?',
    answer: 'Gold-plated jewellery can be demi-fine when it uses a quality base metal and good finishing. IWantJewels uses 925 sterling silver with 14kt gold plating.',
  },
  {
    question: 'Is demi-fine jewellery good for gifts?',
    answer: 'Yes, demi-fine jewellery is excellent for gifts because it feels special, wearable and more elevated than basic fashion jewellery.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Demi-fine jewellery is a smart choice when you want jewellery that feels more elevated than fashion jewellery but more accessible than traditional fine jewellery. It is especially useful for everyday earrings, gifts, wedding guest styling, ear stacks and occasion looks.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond jewellery if you want real diamond sparkle in wearable designs. Choose Cadenza S for subtle everyday shine, Cadenza M for classic gifts, Amadea for ear stacks, Farfalla for meaningful gifting, Orsola for wedding guest styling and Lusso for bold party looks.',
  primaryLabel: 'Shop Demi-Fine Jewellery',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const article = getArticleBySlug('demi-fine-jewellery-guides', 'what-is-demi-fine-jewellery')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('demi-fine-jewellery-guides', 'what-is-demi-fine-jewellery', 3)
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
