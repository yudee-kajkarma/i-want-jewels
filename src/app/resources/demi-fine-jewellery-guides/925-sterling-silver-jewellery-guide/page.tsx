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
  title: '925 Sterling Silver Jewellery Guide',
  description:
    'Learn what 925 sterling silver means, why it is used in demi fine jewellery, and how to care for sterling silver earrings and gold-plated jewellery.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-45.jpg',
  title: '925 Sterling Silver Jewellery Guide:',
  subtitle: 'Meaning, Quality & Care',
  paragraphs: [
    '925 sterling silver is one of the most common materials used in demi-fine jewellery because it gives jewellery a stronger and more premium base than many low-cost fashion metals. It is especially useful for earrings because the jewellery sits close to the skin and needs to feel comfortable, secure and well made.',
    'At IWantJewels, 925 sterling silver is used as the foundation for pieces finished with 14kt gold plating and set with lab-grown diamonds. This combination helps create jewellery that feels elevated, giftable and wearable while staying more accessible than traditional solid gold diamond jewellery.',
    'This resource explains what 925 sterling silver means, why it matters, how it compares to cheaper metals, how it works with gold plating, and how shoppers should care for sterling silver demi-fine jewellery.',
  ],
  shopLabel: 'Shop 925 Sterling Silver Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Understand what 925 sterling silver means',
    'Learn why sterling silver is used in demi-fine jewellery',
    'Compare sterling silver with base metals and solid gold',
    'Understand how 925 sterling silver works with 14kt gold plating',
    'Know whether sterling silver is suitable for earrings',
    'Learn how to care for sterling silver and gold-plated jewellery',
    'Understand tarnish, sweat, water and daily wear concerns',
    'Find IWantJewels product recommendations made with a demi-fine material direction',
    'Plan product blocks, image modules, CTAs and internal links for this page',
  ],
  image: '/blog-images/blog-image-47.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Does 925 Sterling Silver Mean?',
    content: [
      { type: 'paragraph', text: '925 sterling silver means the jewellery is made from 92.5% silver, with the remaining 7.5% usually made from other metals added for strength. Pure silver is naturally soft, so it is not always practical for jewellery that needs to hold shape, support stones or be worn regularly.' },
      { type: 'paragraph', text: 'The number "925" is important because it tells shoppers the jewellery uses a recognised sterling silver standard rather than an unclear low-cost base metal.' },
      { type: 'paragraph', text: 'For earrings, this matters because the piece needs to sit well on the ear, hold the setting securely and feel more comfortable than cheap fashion jewellery. A sterling silver base gives demi-fine jewellery a stronger material story and a more elevated feel.' },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '/resources/demi-fine-jewellery-guides/what-is-demi-fine-jewellery' },
    ],
  },
  {
    heading: 'Why 925 Sterling Silver Is Used in Demi-Fine Jewellery',
    content: [
      { type: 'paragraph', text: '925 sterling silver is widely used in demi-fine jewellery because it balances quality, wearability and accessibility.' },
      { type: 'paragraph', text: 'Fine jewellery often uses solid gold or platinum, which can be expensive. Fashion jewellery often uses base metals, which may feel less premium and may not be as suitable for regular wear. Sterling silver sits between these two directions. It is more elevated than many fashion jewellery metals, but more accessible than solid gold.' },
      { type: 'paragraph', text: 'For IWantJewels, 925 sterling silver is used as the base for lab-grown diamond earrings with 14kt gold plating. This gives the jewellery a more premium foundation while keeping the pieces wearable for everyday use, gifts, weddings and ear stacks.' },
      {
        type: 'table',
        headers: ['Why It Matters', 'Benefit for Shoppers'],
        rows: [
          ['Better than many base metals', 'Feels more elevated than low-cost fashion jewellery'],
          ['Stronger than pure silver', 'Helps jewellery hold shape better'],
          ['Suitable for demi-fine jewellery', 'Supports a premium but accessible product category'],
          ['Works with gold plating', 'Creates a gold finish without solid gold pricing'],
          ['Good for earrings', 'Useful for pieces worn close to the skin'],
        ],
      },
    ],
  },
  {
    heading: '925 Sterling Silver vs Base Metals vs Solid Gold',
    content: [
      { type: 'paragraph', text: 'Many shoppers compare jewellery by appearance, but the material underneath matters.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-49.jpg',
        content: [
          {
            type: 'table',
            headers: ['Material Type', 'What It Usually Means', 'Best For', 'Main Limitation'],
            rows: [
              ['Base metals', 'Lower-cost metals often used in fashion jewellery', 'Trend pieces and short-term styling', 'May feel less premium and may not suit everyone'],
              ['925 sterling silver', '92.5% silver with added metals for strength', 'Demi-fine jewellery, earrings, gifts, daily pieces', 'Needs care to avoid tarnish or finish changes'],
              ['925 sterling silver with gold plating', 'Sterling silver base with a layer of gold finish', 'Demi-fine gold-look jewellery', 'Plating needs care and protection'],
              ['Solid gold', 'Gold alloy throughout the entire piece', 'Fine jewellery and heirloom pieces', 'Usually more expensive'],
              ['Platinum', 'Premium precious metal used in fine jewellery', 'Luxury jewellery and heirloom pieces', 'Usually high cost'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'IWantJewels sits in the demi-fine space by using 925 sterling silver with 14kt gold plating and lab-grown diamonds. This is different from simple fashion jewellery, but also more accessible than solid gold diamond jewellery.' },
      { type: 'see-also', text: 'Demi-fine vs fine jewellery vs fashion jewellery', href: '/resources/demi-fine-jewellery-guides/demi-fine-vs-fine-jewellery-vs-fashion-jewellery' },
    ],
  },
  {
    heading: 'Is 925 Sterling Silver Good for Earrings?',
    content: [
      { type: 'paragraph', text: 'Yes, 925 sterling silver is a strong material choice for earrings, especially in demi-fine jewellery.' },
      { type: 'paragraph', text: 'Earrings need to be lightweight enough for comfort, strong enough to hold their shape and suitable for regular styling. Sterling silver works well because it gives the piece a better-quality base than many low-cost fashion metals.' },
      { type: 'paragraph', text: 'For everyday earrings, 925 sterling silver can be especially useful in studs, huggies, minimalist earrings and small hoops. These are pieces shoppers may wear often, so the base material matters.' },
      { type: 'paragraph', text: 'At IWantJewels, products such as Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings and Pave Hoops are strong everyday directions because they combine wearable shapes with the brand\'s demi-fine material story.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Is 925 Sterling Silver Good for Sensitive Ears?',
    content: [
      { type: 'paragraph', text: '925 sterling silver can be a better choice than many low-quality fashion jewellery metals, but sensitivity depends on the person and the full metal mix.' },
      { type: 'paragraph', text: 'Some people react to certain metals more easily than others. The earring post, plating, finish and any added metals can all matter. If someone has known metal allergies, they should always check product details carefully before buying.' },
      { type: 'paragraph', text: 'For many shoppers, choosing demi-fine jewellery with a 925 sterling silver base can feel more reassuring than choosing unclear base-metal fashion earrings. This is especially important for everyday earrings because they sit close to the skin for longer periods.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery is designed with a 925 sterling silver base and 14kt gold plating. This creates a more elevated demi-fine foundation than simple fashion earrings.' },
      { type: 'see-also', text: 'Is 925 sterling silver hypoallergenic?', href: '#' },
    ],
  },
  {
    heading: 'How 925 Sterling Silver Works with 14kt Gold Plating',
    content: [
      { type: 'paragraph', text: 'At IWantJewels, 925 sterling silver is used as the base metal, and 14kt gold plating is applied to create a warm gold finish.' },
      { type: 'paragraph', text: 'This gives shoppers the look of gold jewellery while keeping the piece more accessible than solid gold. It is one of the reasons this material combination works well for demi-fine jewellery.' },
      { type: 'paragraph', text: 'The key thing to understand is that gold plating is a surface finish. It should be cared for properly. Harsh chemicals, rough handling, chlorine, perfume, lotions and excessive moisture can affect the finish over time.' },
      {
        type: 'table',
        headers: ['Material Layer', 'Role in the Jewellery'],
        rows: [
          ['925 sterling silver', 'Gives the jewellery a stronger base'],
          ['14kt gold plating', 'Adds the gold colour and finish'],
          ['Lab-grown diamonds', 'Adds real diamond sparkle'],
          ['Care routine', 'Helps preserve the finish and shine'],
        ],
      },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '#' },
    ],
  },
  {
    heading: 'Does 925 Sterling Silver Tarnish?',
    content: [
      { type: 'paragraph', text: '925 sterling silver can tarnish over time depending on exposure, storage and care.' },
      { type: 'paragraph', text: 'Tarnish usually happens when silver reacts with air, moisture, chemicals or other elements. This is normal for silver-based jewellery, but proper care can reduce how quickly it happens.' },
      { type: 'paragraph', text: 'If the jewellery is also gold-plated, the surface finish needs extra care. The plating should be protected from perfume, lotion, chlorine, sweat, rough cloths and harsh cleaners.' },
      { type: 'paragraph', text: 'At IWantJewels, jewellery is described as tarnish-proof and sweat-proof with care. The care part is important. The jewellery is made for real wear, but it should still be treated properly to keep the finish looking beautiful.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '#' },
    ],
  },
  {
    heading: 'Can You Wear 925 Sterling Silver Jewellery Every Day?',
    content: [
      { type: 'paragraph', text: 'Yes, 925 sterling silver jewellery can be worn regularly when it is designed well and cared for properly.' },
      { type: 'paragraph', text: 'For everyday wear, the best pieces are usually simple, secure and easy to clean. Studs, huggies, minimalist earrings and small hoops are stronger daily choices than very delicate or dramatic designs.' },
      {
        type: 'table',
        headers: ['Everyday Style', 'Best Sterling Silver Jewellery Direction', 'IWJ Product Direction'],
        rows: [
          ['Simple daily sparkle', 'Small studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Medium studs', 'Cadenza M'],
          ['Modern daily jewellery', 'Huggies', 'Amadea Huggie'],
          ['Minimalist styling', 'Minimalist earrings', 'Laluce'],
          ['Hoop styling', 'Small hoops', 'Pave Hoops'],
          ['Day-to-night looks', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Can You Shower with 925 Sterling Silver Jewellery?',
    content: [
      { type: 'paragraph', text: 'It is better not to shower with 925 sterling silver jewellery, especially if it is gold-plated.' },
      { type: 'paragraph', text: 'Water alone may not be the only issue. Shower products, shampoo, conditioner, soap and moisture can affect the jewellery finish over time. If the piece has 14kt gold plating, repeated exposure to water and products is not ideal.' },
      { type: 'paragraph', text: 'The safest habit is to remove jewellery before showering, swimming, using strong beauty products or doing heavy workouts. This helps protect the finish and keeps the jewellery looking better for longer.' },
      { type: 'see-also', text: 'Can you shower with gold-plated jewellery?', href: '#' },
    ],
  },
  {
    heading: '925 Sterling Silver in Demi-Fine Jewellery',
    content: [
      { type: 'paragraph', text: '925 sterling silver is one of the key reasons demi-fine jewellery feels different from low-cost fashion jewellery.' },
      { type: 'paragraph', text: 'It gives the piece a better foundation, supports more refined finishing, and works well with lab-grown diamonds and gold plating. This makes it useful for jewellery that is meant to feel polished, giftable and wearable.' },
      { type: 'paragraph', text: 'At IWantJewels, 925 sterling silver supports the full demi-fine direction. It allows the brand to create pieces that feel more elevated than costume jewellery while still being more accessible than solid gold diamond jewellery.' },
      { type: 'paragraph', text: 'This is especially important for earrings because shoppers often want multiple styles: studs for everyday wear, huggies for stacking, drops for weddings, butterfly earrings for gifts, and bold statement earrings for parties.' },
      { type: 'see-also', text: 'Demi-fine vs fine jewellery vs fashion jewellery', href: '/resources/demi-fine-jewellery-guides/demi-fine-vs-fine-jewellery-vs-fashion-jewellery' },
    ],
  },
  {
    heading: 'Product Pathways by Jewellery Need',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical shopping guide.' },
      { type: 'subheading', text: 'For Everyday 925 Sterling Silver Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs for subtle daily sparkle, Cadenza M for more visible shine, Amadea Huggie earrings for modern styling, or Laluce for minimalist looks.' },
      { type: 'subheading', text: 'For Gift Jewellery' },
      { type: 'paragraph', text: 'Choose Cadenza M for a safe classic gift, Farfalla for a meaningful gift, Alidi Farfalla for a personal milestone gift, or Orsola for a romantic occasion gift.' },
      { type: 'subheading', text: 'For Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea Huggie earrings for a clean everyday stack. Add Laluce if the wearer prefers soft minimalist styling.' },
      { type: 'subheading', text: 'For Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Cadenza M for detailed outfits, Orsola drop earrings for simple dresses, or Farfalla butterfly earrings for romantic wedding guest looks.' },
      { type: 'subheading', text: 'For Party Styling' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the jewellery should stand out, or Pave Hoops when the wearer wants shaped sparkle with a modern feel.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Material-Trust Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Everyday sterling silver-based studs', 'Simple, subtle and easy to wear'],
          ['Cadenza M diamond stud earrings', 'Classic gift earrings', 'More visible sparkle with a demi-fine base'],
          ['Amadea Huggie earrings', 'Sterling silver-based huggies', 'Strong for everyday stacking'],
          ['Laluce minimalist diamond earrings', 'Minimalist demi-fine earrings', 'Clean, soft and easy to style'],
          ['Pave Hoops', 'Demi-fine hoop styling', 'Adds shape and sparkle'],
          ['Farfalla butterfly earrings', 'Meaningful gift jewellery', 'Symbolic and feminine'],
          ['Alidi Farfalla butterfly earrings', 'Personal gift jewellery', 'Soft and memorable'],
          ['Orsola drop earrings', 'Occasion demi-fine earrings', 'Adds movement and polish'],
          ['Concetta Short earrings', 'Delicate drop direction', 'Good for softer occasion styling'],
          ['Concetta Long earrings', 'Formal drop direction', 'Refined and elongated'],
          ['Lusso bold statement earrings', 'Party demi-fine earrings', 'Strong sparkle and high impact'],
        ],
      },
      { type: 'paragraph', text: '925 sterling silver gives demi-fine jewellery a stronger base than many low-cost fashion metals. Start with studs for everyday wear, huggies for stacking, butterfly earrings for gifts, drops for weddings and bold statement earrings for parties.' },
    ],
  },
  {
    heading: 'Common Material Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is assuming all silver-coloured jewellery is sterling silver. It is not. Look for 925 sterling silver when material quality matters.' },
      { type: 'paragraph', text: 'Another mistake is treating gold-plated sterling silver like solid gold. The base may be sterling silver, but the gold plating is still a surface finish and needs care.' },
      { type: 'paragraph', text: 'A third mistake is showering, swimming or working out heavily in jewellery and expecting the finish to stay unchanged. Moisture, sweat, chlorine and products can affect jewellery over time.' },
      { type: 'paragraph', text: 'Another mistake is buying earrings without checking the base metal. For earrings, the material matters because the jewellery sits close to the skin.' },
      { type: 'paragraph', text: 'Finally, do not choose only by sparkle. The diamond, metal, plating, comfort and care routine all matter.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/how-to-clean-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before buying 925 sterling silver jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the jewellery clearly described as 925 sterling silver?',
          'Is it plated with gold or another finish?',
          'Does the piece use lab-grown diamonds or imitation stones?',
          'Is the design suitable for everyday wear, gifting or occasions?',
          'Will the wearer remove it before showering or swimming?',
          'Does the metal colour match their existing jewellery?',
          'Is the piece comfortable enough for regular use?',
          'Does it need special care because of plating?',
          'Will the jewellery be stored separately?',
          'Does the product feel more elevated than fashion jewellery?',
        ],
      },
      { type: 'paragraph', text: 'If you want jewellery that feels more premium than fashion jewellery but more accessible than solid gold fine jewellery, 925 sterling silver demi-fine jewellery is a strong place to start.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What does 925 sterling silver mean?',
    answer: '925 sterling silver means the jewellery contains 92.5% silver, with the remaining 7.5% usually made from other metals added for strength.',
  },
  {
    question: 'Is 925 sterling silver real silver?',
    answer: 'Yes, 925 sterling silver is real silver. It is not pure silver, but it is a recognised silver standard used in jewellery.',
  },
  {
    question: 'Is 925 sterling silver good for jewellery?',
    answer: 'Yes, 925 sterling silver is good for jewellery because it offers a strong and more premium base than many low-cost fashion metals.',
  },
  {
    question: 'Is 925 sterling silver good for earrings?',
    answer: 'Yes, 925 sterling silver is a strong material choice for earrings, especially in demi-fine jewellery. It works well for studs, huggies, hoops and other wearable designs.',
  },
  {
    question: 'Is 925 sterling silver good for sensitive ears?',
    answer: 'It can be better than many unclear base metals, but sensitivity depends on the person and the full metal mix. People with known allergies should always check product details.',
  },
  {
    question: 'Does 925 sterling silver tarnish?',
    answer: 'Yes, sterling silver can tarnish over time depending on exposure and care. Proper storage and gentle cleaning can help reduce tarnish.',
  },
  {
    question: 'Can you wear 925 sterling silver every day?',
    answer: 'Yes, you can wear 925 sterling silver regularly when the jewellery is cared for properly and removed before showering, swimming or heavy workouts.',
  },
  {
    question: 'Can you shower with 925 sterling silver?',
    answer: 'It is better not to shower with 925 sterling silver jewellery, especially if it is gold-plated. Shower products and moisture can affect the finish.',
  },
  {
    question: 'What is better, sterling silver or base metal?',
    answer: 'Sterling silver is usually more elevated than many base metals and is a stronger choice for demi-fine jewellery.',
  },
  {
    question: 'Why does IWantJewels use 925 sterling silver?',
    answer: 'IWantJewels uses 925 sterling silver because it provides a stronger base for demi-fine jewellery, supports 14kt gold plating, and works well with lab-grown diamond designs.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: '925 sterling silver is an important part of demi-fine jewellery because it gives the piece a stronger, more premium base than many low-cost fashion metals. When combined with 14kt gold plating and lab-grown diamonds, it creates jewellery that feels polished, giftable and wearable.',
  body: 'Start with IWantJewels 925 sterling silver lab-grown diamond earrings if you want real diamond sparkle in demi-fine designs. Choose Cadenza S for subtle everyday shine, Cadenza M for classic gifts, Amadea for ear stacks, Farfalla for meaningful gifting, Orsola for wedding guest styling and Lusso for bold party looks.',
  primaryLabel: 'Shop 925 Sterling Silver Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Demi-Fine Jewellery',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read What Is Demi-Fine Jewellery?',
  tertiaryHref: '/resources/demi-fine-jewellery-guides/what-is-demi-fine-jewellery',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const article = getArticleBySlug('demi-fine-jewellery-guides', '925-sterling-silver-jewellery-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('demi-fine-jewellery-guides', '925-sterling-silver-jewellery-guide', 3)
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
