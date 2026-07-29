import type { Metadata } from 'next'
import ResourceArticleV2Page from '../../../../../views/ResourceArticleV2Page'
import type {
  V2ArticleSection,
  V2HeroIntro,
  V2QuickSummary,
  V2FAQItem,
  V2CTABlock,
} from '../../../../../views/ResourceArticleV2Page'
import { getCategoryBySlug, getArticleBySlug, getRelatedArticles } from '../../../../../data/resources'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: '14kt Gold Plated Jewellery Guide',
  description:
    'Learn what 14kt gold-plated jewellery means, how it compares to solid gold, how to care for it, and whether it is good for everyday wear.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-35.jpg',
  title: '14kt Gold-Plated Jewellery Guide:',
  subtitle: 'Meaning, Quality & Care',
  paragraphs: [
    '14kt gold-plated jewellery gives shoppers the warm look of gold in a more accessible format than solid gold jewellery. It is commonly used in demi-fine jewellery because it allows pieces to feel polished, giftable and stylish without requiring every item to be made from solid gold.',
    'At IWantJewels, the jewellery direction uses 925 sterling silver as the base with 14kt gold plating and lab-grown diamonds. This creates a demi-fine jewellery piece that feels more elevated than basic fashion jewellery, while still being wearable for everyday styling, gifts, weddings, ear stacks and party looks.',
    'This resource explains what 14kt gold plating means, how it compares with solid gold and vermeil, how to care for it, whether it is good for everyday wear, and which IWantJewels pieces make the most sense for different styling needs.',
  ],
  shopLabel: 'Shop 14kt Gold-Plated Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Understand what 14kt gold-plated jewellery means',
    'Learn how gold plating works over 925 sterling silver',
    'Compare gold-plated jewellery with solid gold and gold vermeil',
    'Understand whether gold-plated jewellery is good for everyday wear',
    'Learn how to protect gold plating from tarnish, water, sweat and chemicals',
    'Choose gold-plated lab-grown diamond earrings for gifts, weddings and ear stacks',
    'Find IWantJewels product recommendations by styling purpose',
    'Plan product blocks, image modules, CTAs and internal links for this page',
  ],
  image: '/blog-images/blog-image-57.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Does 14kt Gold-Plated Jewellery Mean?',
    content: [
      { type: 'paragraph', text: '14kt gold-plated jewellery means a layer of 14kt gold is applied over another base metal. In IWantJewels pieces, that base is 925 sterling silver.' },
      { type: 'paragraph', text: 'This gives the jewellery a gold finish and warm colour, while keeping the piece more accessible than solid gold jewellery. The gold is on the surface of the jewellery, so it should be cared for properly to keep the finish looking beautiful.' },
      { type: 'paragraph', text: 'The phrase "14kt" refers to the purity of the gold used in the plating. It does not mean the full piece is solid 14kt gold. That distinction matters because shoppers should understand what they are buying clearly.' },
      {
        type: 'table',
        headers: ['Term', 'Meaning'],
        rows: [
          ['14kt gold-plated', 'A layer of 14kt gold applied over a base metal'],
          ['925 sterling silver base', 'The main foundation of the jewellery piece'],
          ['Solid 14kt gold', 'The full piece is made from 14kt gold alloy'],
          ['Gold finish', 'The visible gold tone on the jewellery surface'],
        ],
      },
      { type: 'see-also', text: '925 sterling silver jewellery', href: '/resources/demi-fine-jewellery-guides/925-sterling-silver-jewellery-guide' },
    ],
  },
  {
    heading: 'Why 14kt Gold Plating Is Used in Demi-Fine Jewellery',
    content: [
      { type: 'paragraph', text: '14kt gold plating is used in demi-fine jewellery because it gives shoppers the warm look of gold while keeping the piece more wearable and accessible.' },
      { type: 'paragraph', text: 'Solid gold jewellery can be beautiful, but it is usually much more expensive. Low-cost fashion jewellery can be affordable, but it may not feel as premium or giftable. Gold-plated demi-fine jewellery sits between these two categories.' },
      { type: 'paragraph', text: 'At IWantJewels, the combination of lab-grown diamonds, 925 sterling silver and 14kt gold plating creates jewellery that feels elevated without being overly formal or unreachable.' },
      {
        type: 'table',
        headers: ['Why It Matters', 'Shopper Benefit'],
        rows: [
          ['Gold appearance', 'Gives the jewellery a warm and polished look'],
          ['925 sterling silver base', 'More elevated than many base-metal fashion pieces'],
          ['More accessible than solid gold', 'Easier to buy for everyday wear and gifts'],
          ['Works well with lab-grown diamonds', 'Creates a modern demi-fine jewellery feel'],
          ['Supports style variety', 'Makes it easier to build a jewellery wardrobe'],
        ],
      },
    ],
  },
  {
    heading: '14kt Gold-Plated vs Solid Gold vs Gold Vermeil',
    content: [
      { type: 'paragraph', text: 'Gold-plated, solid gold and gold vermeil jewellery are not the same. This table should help shoppers understand the difference quickly.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-59.jpg',
        content: [
          {
            type: 'table',
            headers: ['Jewellery Type', 'What It Means', 'Best For', 'Main Care Point'],
            rows: [
              ['14kt gold-plated jewellery', 'A layer of 14kt gold over a base metal such as sterling silver', 'Demi-fine jewellery, gifts, everyday styling with care', 'Protect plating from chemicals, water and rough friction'],
              ['Gold vermeil', 'A thicker gold layer over sterling silver, depending on standard and region', 'Higher-end demi-fine jewellery', 'Still needs care because the gold is a surface layer'],
              ['Solid 14kt gold', 'The entire piece is made from 14kt gold alloy', 'Fine jewellery and long-term pieces', 'More durable metal value but still needs care'],
              ['Gold-tone fashion jewellery', 'Gold-coloured finish over lower-cost material', 'Trend pieces and short-term styling', 'May wear faster depending on quality'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'At IWantJewels, the key point is that the jewellery is not simple gold-tone fashion jewellery. It uses 925 sterling silver as the base with 14kt gold plating and lab-grown diamonds, placing it in the demi-fine category.' },
      { type: 'see-also', text: 'Gold-plated vs solid gold jewellery', href: '#' },
    ],
  },
  {
    heading: 'How Gold Plating Works Over 925 Sterling Silver',
    content: [
      { type: 'paragraph', text: 'When gold plating is applied over 925 sterling silver, the sterling silver gives the jewellery its main structure, while the gold plating gives the visible gold colour and finish.' },
      { type: 'paragraph', text: 'This is useful in earrings because the jewellery can feel more premium than lower-cost base-metal fashion earrings while still being more accessible than solid gold diamond earrings.' },
      { type: 'paragraph', text: 'For IWantJewels, the structure is:' },
      {
        type: 'table',
        headers: ['Layer / Element', 'Role'],
        rows: [
          ['Lab-grown diamonds', 'Adds real diamond sparkle'],
          ['14kt gold plating', 'Creates the warm gold finish'],
          ['925 sterling silver', 'Forms the main base of the jewellery'],
          ['Proper care', 'Helps preserve the finish over time'],
        ],
      },
      { type: 'paragraph', text: 'This material story should be explained clearly on product pages because it helps shoppers understand the difference between demi-fine jewellery and basic fashion jewellery.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Is 14kt Gold-Plated Jewellery Good Quality?',
    content: [
      { type: 'paragraph', text: '14kt gold-plated jewellery can be good quality when the base metal, plating quality, design and care instructions are clear.' },
      { type: 'paragraph', text: 'Not all gold-plated jewellery is the same. A low-cost base metal with unclear plating is different from a demi-fine piece using 925 sterling silver as the base. This is why material transparency matters.' },
      { type: 'paragraph', text: 'At IWantJewels, the quality story should be communicated as:' },
      {
        type: 'table',
        headers: ['Quality Element', 'Why It Helps'],
        rows: [
          ['925 sterling silver base', 'Gives a stronger demi-fine foundation'],
          ['14kt gold plating', 'Creates a warm, polished gold finish'],
          ['Lab-grown diamonds', 'Adds real diamond sparkle'],
          ['Own factory production', 'Supports consistency and quality control'],
          ['Care guidance', 'Helps shoppers protect the jewellery properly'],
        ],
      },
      { type: 'paragraph', text: 'Gold-plated jewellery is not the same as solid gold, but it can still be a strong demi-fine choice when made well and cared for properly.' },
    ],
  },
  {
    heading: 'Is Gold-Plated Jewellery Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery can be good for everyday wear if the design is comfortable and the piece is cared for correctly.' },
      { type: 'paragraph', text: 'For daily use, the best gold-plated pieces are usually studs, huggies, minimalist earrings and small hoops. These styles are easy to repeat and less likely to catch on clothing or hair.' },
      {
        type: 'table',
        headers: ['Everyday Need', 'Best Gold-Plated Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Simple daily sparkle', 'Small studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Medium studs', 'Cadenza M'],
          ['Ear stacks', 'Huggies and small studs', 'Amadea Huggie, Cadenza S'],
          ['Minimal styling', 'Minimalist earrings', 'Laluce'],
          ['Casual hoop styling', 'Small hoops', 'Pave Hoops'],
          ['Day-to-night outfits', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Does 14kt Gold-Plated Jewellery Tarnish?',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery can change in appearance over time depending on how it is worn, stored and cleaned. The gold layer itself is a surface finish, so it should be protected from unnecessary exposure.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery is described as tarnish-proof and sweat-proof with care. This means the pieces are designed for real wear, but they still need proper handling.' },
      { type: 'paragraph', text: 'Common things that can affect gold-plated jewellery include:' },
      {
        type: 'bullet-list',
        items: [
          'Perfume',
          'Lotion',
          'Hairspray',
          'Sweat',
          'Chlorine',
          'Salt water',
          'Harsh cleaners',
          'Rough cloths',
          'Humid storage',
          'Friction from other jewellery',
        ],
      },
      { type: 'paragraph', text: 'The best way to protect gold plating is to keep the jewellery dry, wipe it after wearing, and store it separately.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '#' },
    ],
  },
  {
    heading: 'Can You Shower with Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'It is better not to shower with gold-plated jewellery.' },
      { type: 'paragraph', text: 'Water itself is not the only concern. Shampoo, conditioner, soap, body wash and moisture can affect the finish over time. If jewellery is worn in the shower repeatedly, the gold plating may not stay as fresh as it would with proper care.' },
      { type: 'paragraph', text: 'The safest habit is simple: remove gold-plated jewellery before showering, swimming, heavy workouts or applying strong beauty products.' },
      { type: 'paragraph', text: 'This is especially important for earrings that are worn regularly. The lab-grown diamond may be durable, but the metal finish still needs protection.' },
      { type: 'see-also', text: 'Can you shower with gold-plated jewellery?', href: '#' },
    ],
  },
  {
    heading: 'How to Care for 14kt Gold-Plated Jewellery',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery needs gentle care.' },
      { type: 'paragraph', text: 'The goal is to protect the surface finish from chemicals, moisture and friction. You do not need a complicated routine, but small habits make a big difference.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-61.jpg',
        content: [
          {
            type: 'table',
            headers: ['Care Step', 'Why It Helps'],
            rows: [
              ['Put jewellery on after perfume and lotion', 'Reduces chemical exposure'],
              ['Remove before showering or swimming', 'Protects the plating'],
              ['Wipe after wearing', 'Removes oil, sweat and product buildup'],
              ['Store separately', 'Prevents rubbing and scratching'],
              ['Avoid harsh cleaners', 'Protects the gold finish'],
              ['Use a soft cloth', 'Avoids abrasive friction'],
              ['Keep away from chlorine', 'Helps preserve the surface'],
              ['Avoid sleeping in jewellery', 'Reduces pressure and rubbing'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels lab-grown diamond earrings, these care habits help protect both the gold finish and the overall jewellery piece.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/how-to-clean-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Gold-Plated Jewellery for Gifts',
    content: [
      { type: 'paragraph', text: 'Gold-plated demi-fine jewellery works well for gifts because it looks polished and special while staying more accessible than solid gold jewellery.' },
      { type: 'paragraph', text: 'For gifts, the safest styles are usually studs, huggies, butterfly earrings and soft drops. Studs feel classic, huggies feel modern, butterfly earrings feel meaningful, and drops feel romantic or occasion-ready.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Gold-Plated Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safe birthday gift', 'Classic studs', 'Cadenza S, Cadenza M'],
          ['Romantic gift', 'Butterfly earrings or drops', 'Farfalla, Orsola'],
          ['Bridesmaid gift', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Modern gift', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Meaningful gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Party-loving recipient', 'Bold earrings', 'Lusso'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Gold-Plated Jewellery for Weddings and Occasions',
    content: [
      { type: 'paragraph', text: 'Gold-plated lab-grown diamond earrings can work beautifully for weddings and occasions because the gold finish adds warmth while the diamonds add sparkle.' },
      { type: 'paragraph', text: 'For wedding guest styling, yellow gold pairs especially well with champagne, green, red, cream, brown, black and warm-toned outfits. It can make a simple dress feel more polished and can add softness to romantic styling.' },
      {
        type: 'table',
        headers: ['Occasion Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Wedding guest outfit', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Bridesmaid styling', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Evening reception', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Romantic dinner', 'Butterfly earrings or drops', 'Farfalla, Orsola'],
          ['Party outfit', 'Hoops, drops or bold earrings', 'Pave Hoops, Lusso'],
          ['Day-to-night styling', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Gold-Plated Jewellery for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery is especially useful for ear stacks because it creates a warm, cohesive look when multiple earrings are worn together.' },
      { type: 'paragraph', text: 'The easiest approach is to keep the whole ear stack in the same metal colour. For example, choose gold-plated studs with gold-plated huggies for a clean and balanced finish.' },
      { type: 'paragraph', text: 'A simple IWantJewels gold-tone ear stack could include Cadenza S lab-grown diamond studs with Amadea Huggie earrings. For a softer stack, add Laluce minimalist diamond earrings. For a more visible stack, use Cadenza M as the main stud.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Jewellery Need',
    content: [
      { type: 'subheading', text: 'For First Gold-Plated Diamond Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are simple, wearable and easy to style with everyday outfits.' },
      { type: 'subheading', text: 'For More Visible Everyday Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They give more presence than smaller studs while still feeling classic.' },
      { type: 'subheading', text: 'For Modern Gold-Plated Styling' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings or Pave Hoops. These are strong for shoppers who like ear stacks, small hoops and modern daily jewellery.' },
      { type: 'subheading', text: 'For Meaningful Gifts' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. The butterfly design adds symbolism and makes the gift feel more personal.' },
      { type: 'subheading', text: 'For Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings for elegant movement, Cadenza M for detailed outfits or Concetta Short for a softer drop.' },
      { type: 'subheading', text: 'For Party Styling' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the jewellery should become the main feature of the outfit.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Gold-Plated Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First everyday gold-plated earrings', 'Simple, subtle and easy to repeat'],
          ['Cadenza M diamond stud earrings', 'Classic gift or daily sparkle', 'More visible while staying timeless'],
          ['Amadea Huggie earrings', 'Modern gold-plated huggies', 'Strong for ear stacks and everyday styling'],
          ['Laluce minimalist diamond earrings', 'Minimalist gold-plated styling', 'Quiet and easy to pair with outfits'],
          ['Pave Hoops', 'Gold-plated hoop styling', 'Adds shape and sparkle'],
          ['Farfalla butterfly earrings', 'Meaningful gold-plated gift', 'Symbolic and feminine'],
          ['Alidi Farfalla butterfly earrings', 'Romantic gift direction', 'Soft, personal and memorable'],
          ['Orsola drop earrings', 'Wedding guest and dinner styling', 'Adds movement and polish'],
          ['Concetta Short earrings', 'Soft occasion styling', 'Delicate drop direction'],
          ['Concetta Long earrings', 'Formal evening styling', 'Refined and elongated'],
          ['Lusso bold statement earrings', 'Gold-plated party styling', 'Strong sparkle and high impact'],
        ],
      },
      { type: 'paragraph', text: '14kt gold-plated jewellery is ideal when you want the warm look of gold in a demi-fine format. Start with studs for everyday wear, huggies for stacking, butterfly earrings for gifts, drops for weddings and bold statement earrings for parties.' },
    ],
  },
  {
    heading: 'Common Gold-Plated Jewellery Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is thinking gold-plated jewellery is the same as solid gold. Gold plating is a surface layer, so it needs more careful handling.' },
      { type: 'paragraph', text: 'Another mistake is showering, swimming or working out heavily in gold-plated jewellery. Moisture, chlorine, sweat and products can affect the finish over time.' },
      { type: 'paragraph', text: 'A third mistake is using harsh cleaning products. Gold-plated jewellery should be cleaned gently with a soft cloth, not abrasive cleaners.' },
      { type: 'paragraph', text: 'Another mistake is storing pieces together loosely. Earrings can rub against each other and affect the finish.' },
      { type: 'paragraph', text: 'Finally, do not buy gold-plated jewellery without checking the base metal. A 925 sterling silver base is more reassuring than an unclear low-cost base metal.' },
      { type: 'see-also', text: '925 sterling silver jewellery guide', href: '/resources/demi-fine-jewellery-guides/925-sterling-silver-jewellery-guide' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before buying 14kt gold-plated jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the base metal clearly listed?',
          'Is the jewellery made with 925 sterling silver?',
          'Is the gold finish 14kt gold plating?',
          'Is the piece suitable for everyday wear, gifts or occasions?',
          'Will the wearer care for it properly?',
          'Will it be removed before showering or swimming?',
          'Does the gold colour match the wearer\'s usual jewellery?',
          'Are the stones lab-grown diamonds or imitation stones?',
          'Does the design feel wearable beyond one outfit?',
          'Does the product feel more elevated than fashion jewellery?',
        ],
      },
      { type: 'paragraph', text: 'If you want a warm gold look with a demi-fine jewellery feel, 14kt gold-plated jewellery over 925 sterling silver is a strong direction.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What does 14kt gold-plated jewellery mean?',
    answer: '14kt gold-plated jewellery means a layer of 14kt gold is applied over another base metal. At IWantJewels, the base is 925 sterling silver.',
  },
  {
    question: 'Is 14kt gold-plated jewellery real gold?',
    answer: 'The surface layer is real 14kt gold, but the entire piece is not solid gold. The gold is applied as a plating over the base metal.',
  },
  {
    question: 'Is 14kt gold-plated jewellery good quality?',
    answer: 'It can be good quality when the base metal is strong, the finish is clear, and the jewellery is cared for properly. IWantJewels uses 925 sterling silver with 14kt gold plating.',
  },
  {
    question: 'Is gold-plated jewellery good for everyday wear?',
    answer: 'Yes, gold-plated jewellery can be worn regularly with proper care. It should be removed before showering, swimming and heavy workouts.',
  },
  {
    question: 'Does 14kt gold-plated jewellery tarnish?',
    answer: 'Gold-plated jewellery can change in appearance over time depending on exposure and care. Protect it from moisture, perfume, chlorine, sweat and harsh cleaners.',
  },
  {
    question: 'Can you shower with gold-plated jewellery?',
    answer: 'It is better not to shower with gold-plated jewellery because water, shampoo, soap and moisture can affect the finish over time.',
  },
  {
    question: 'Is 14kt gold-plated jewellery better than fashion jewellery?',
    answer: 'It can be more elevated than basic fashion jewellery, especially when plated over a 925 sterling silver base and set with lab-grown diamonds.',
  },
  {
    question: 'Is gold-plated jewellery the same as gold vermeil?',
    answer: 'No. Gold vermeil usually refers to a specific type of gold layer over sterling silver, often with thickness standards depending on region. Gold-plated jewellery is a broader term.',
  },
  {
    question: 'Is gold-plated jewellery the same as solid gold?',
    answer: 'No. Solid gold means the entire piece is made from gold alloy. Gold-plated jewellery has a gold layer over another base metal.',
  },
  {
    question: 'How do you care for 14kt gold-plated jewellery?',
    answer: 'Wipe it after wearing, store it separately, avoid harsh chemicals, remove it before showering or swimming, and clean it gently with a soft cloth.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: '14kt gold-plated jewellery is a strong demi-fine choice when you want the warm look of gold without choosing solid gold for every piece. When combined with 925 sterling silver and lab-grown diamonds, it creates jewellery that feels polished, giftable and wearable.',
  body: 'Start with IWantJewels 14kt gold-plated lab-grown diamond earrings if you want real diamond sparkle in a demi-fine gold finish. Choose Cadenza S for subtle daily shine, Cadenza M for classic gifts, Amadea for ear stacks, Farfalla for meaningful gifting, Orsola for wedding guest styling and Lusso for bold party looks.',
  primaryLabel: 'Shop 14kt Gold-Plated Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Demi-Fine Jewellery',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the 925 Sterling Silver Jewellery Guide',
  tertiaryHref: '/resources/demi-fine-jewellery-guides/925-sterling-silver-jewellery-guide',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const article = getArticleBySlug('demi-fine-jewellery-guides', '14kt-gold-plated-jewellery-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('demi-fine-jewellery-guides', '14kt-gold-plated-jewellery-guide', 3)
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
