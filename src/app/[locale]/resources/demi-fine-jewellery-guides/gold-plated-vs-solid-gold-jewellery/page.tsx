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
  title: 'Gold Plated vs Solid Gold Jewellery',
  description:
    'Compare gold-plated and solid gold jewellery. Learn the difference in price, durability, care, everyday wear and gifting value.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-63.jpg',
  title: 'Gold-Plated vs Solid Gold Jewellery:',
  subtitle: 'What Is the Difference?',
  paragraphs: [
    'Gold-plated jewellery and solid gold jewellery can both look beautiful, but they are not the same. The main difference is the material structure. Solid gold jewellery is made from gold alloy throughout the piece, while gold-plated jewellery has a layer of gold applied over another base metal.',
    'For IWantJewels, this distinction matters because the jewellery is designed as demi-fine jewellery. Pieces use 925 sterling silver as the base, 14kt gold plating for the gold finish, and lab-grown diamonds for real diamond sparkle. This gives shoppers a polished gold look and a premium jewellery feeling, while remaining more accessible than traditional solid gold diamond jewellery.',
    'This resource helps shoppers compare gold-plated and solid gold jewellery by price, durability, daily wear, gifting, care, tarnish, and best use cases.',
  ],
  shopLabel: 'Shop Gold-Plated Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Understand the difference between gold-plated and solid gold jewellery',
    'Learn what 14kt gold plating means',
    'Compare price, durability, care and everyday wear',
    'Understand where demi-fine jewellery fits between fashion and fine jewellery',
    'Decide when gold-plated jewellery makes sense',
    'Decide when solid gold jewellery is worth choosing',
    'Choose IWantJewels earrings for everyday wear, gifts, weddings, ear stacks and party looks',
    'Plan product blocks, image modules, CTAs and internal links for this page',
  ],
  image: '/blog-images/blog-image-65.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Gold-Plated vs Solid Gold Jewellery Comparison',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main decision tool.' },
      {
        type: 'table',
        headers: ['Feature', 'Gold-Plated Jewellery', 'Solid Gold Jewellery'],
        rows: [
          ['Material structure', 'Gold layer over another base metal', 'Gold alloy throughout the full piece'],
          ['Price', 'Usually more accessible', 'Usually more expensive'],
          ['Best for', 'Demi-fine jewellery, gifts, everyday styling, trend variety', 'Heirloom pieces, long-term fine jewellery, luxury gifts'],
          ['Durability', 'Depends on base metal, plating quality and care', 'Generally stronger for long-term metal wear'],
          ['Care needed', 'Needs more care to protect plating', 'Still needs care, but no surface plating to wear away'],
          ['Everyday wear', 'Good with proper care', 'Strong everyday option'],
          ['Gift value', 'Great for thoughtful accessible gifts', 'Great for milestone luxury gifts'],
          ['Style flexibility', 'Easier to build a jewellery wardrobe', 'More expensive to collect multiple styles'],
          ['IWantJewels fit', 'Core demi-fine category', 'Not the main IWJ material direction'],
        ],
      },
      { type: 'paragraph', text: 'Gold-plated jewellery is not "bad" and solid gold is not always necessary. The better choice depends on the purpose. If you want an heirloom piece, solid gold may be better. If you want wearable, giftable, modern demi-fine jewellery, gold-plated sterling silver can be a strong choice.' },
    ],
  },
  {
    heading: 'What Is Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery has a layer of gold applied over a base metal. The visible surface looks gold, but the full piece is not solid gold.' },
      { type: 'paragraph', text: 'The quality of gold-plated jewellery depends on the base metal, plating process, design, thickness of the layer, finishing and care instructions. A low-quality base metal with unclear plating is very different from a demi-fine piece made with 925 sterling silver and 14kt gold plating.' },
      { type: 'paragraph', text: 'At IWantJewels, the gold-plated jewellery direction is based on:' },
      {
        type: 'table',
        headers: ['IWJ Material Element', 'Role'],
        rows: [
          ['925 sterling silver', 'Forms the base of the jewellery'],
          ['14kt gold plating', 'Creates the gold colour and finish'],
          ['Lab-grown diamonds', 'Adds real diamond sparkle'],
          ['Care routine', 'Helps protect the finish over time'],
        ],
      },
      { type: 'paragraph', text: 'This places IWantJewels in the demi-fine jewellery category, not low-cost fashion jewellery.' },
      { type: 'see-also', text: '14kt gold-plated jewellery guide', href: '/resources/demi-fine-jewellery-guides/14kt-gold-plated-jewellery-guide' },
    ],
  },
  {
    heading: 'What Is Solid Gold Jewellery?',
    content: [
      { type: 'paragraph', text: 'Solid gold jewellery is made from gold alloy throughout the piece. It is not just gold on the surface.' },
      { type: 'paragraph', text: 'Solid gold is commonly used in fine jewellery because it has long-term metal value and can be more durable for everyday wear over time. It is often chosen for heirloom pieces, luxury gifts, engagement jewellery, wedding jewellery and milestone purchases.' },
      { type: 'paragraph', text: 'Solid gold jewellery is usually more expensive than gold-plated jewellery. That higher price can make sense for certain pieces, especially if the buyer wants long-term fine jewellery. But not every jewellery purchase needs to be solid gold.' },
      { type: 'paragraph', text: 'For shoppers who want multiple earrings, ear stacks, trend-led designs, gifts, wedding guest jewellery or party pieces, demi-fine gold-plated jewellery can be more practical and easier to collect.' },
      { type: 'see-also', text: 'Demi-fine vs fine jewellery vs fashion jewellery', href: '/resources/demi-fine-jewellery-guides/demi-fine-vs-fine-jewellery-vs-fashion-jewellery' },
    ],
  },
  {
    heading: 'Price Difference Between Gold-Plated and Solid Gold Jewellery',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery is usually more accessible than solid gold jewellery because only the surface layer is gold. Solid gold jewellery uses gold alloy throughout the whole piece, which usually makes it more expensive.' },
      {
        type: 'table',
        headers: ['Buyer Goal', 'Better Direction', 'Why'],
        rows: [
          ['Lower price with gold look', 'Gold-plated jewellery', 'More accessible than solid gold'],
          ['Heirloom jewellery', 'Solid gold jewellery', 'Stronger traditional long-term value'],
          ['Multiple everyday pieces', 'Gold-plated demi-fine jewellery', 'Easier to build a jewellery wardrobe'],
          ['Luxury milestone gift', 'Solid gold jewellery', 'More formal and premium'],
          ['Birthday or bridesmaid gift', 'Gold-plated demi-fine jewellery', 'Giftable and wearable'],
          ['Everyday diamond earrings', 'Gold-plated demi-fine or solid gold', 'Depends on budget and care preference'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels shoppers, gold-plated demi-fine jewellery gives the gold look, lab-grown diamond sparkle and wearable design without requiring every purchase to be a solid gold investment.' },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '/resources/demi-fine-jewellery-guides/what-is-demi-fine-jewellery' },
    ],
  },
  {
    heading: 'Durability Difference Between Gold-Plated and Solid Gold Jewellery',
    content: [
      { type: 'paragraph', text: 'Solid gold is generally more durable as a metal choice because the gold alloy runs through the entire piece. Gold-plated jewellery has a gold layer on the surface, so that layer needs protection.' },
      { type: 'paragraph', text: 'This does not mean gold-plated jewellery is weak or not worth buying. It means it should be worn and cared for properly. The base metal also matters. Gold plating over 925 sterling silver is a stronger demi-fine direction than unclear low-cost base metals.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-67.jpg',
        content: [
          {
            type: 'table',
            headers: ['Durability Factor', 'Gold-Plated Jewellery', 'Solid Gold Jewellery'],
            rows: [
              ['Surface finish', 'Can change with friction, chemicals and moisture', 'No plating layer to wear away'],
              ['Long-term metal value', 'Lower than solid gold', 'Higher'],
              ['Daily wear', 'Good with care', 'Strong'],
              ['Jewellery wardrobe building', 'Easier due to lower price', 'More expensive'],
              ['Care importance', 'Very important', 'Still important, but more forgiving'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'At IWantJewels, jewellery is described as tarnish-proof and sweat-proof with care. That means the pieces are designed for real wear, but they still need proper handling to protect the finish.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '#' },
    ],
  },
  {
    heading: 'Everyday Wear Comparison',
    content: [
      { type: 'paragraph', text: 'Both gold-plated and solid gold jewellery can be worn every day, but care expectations are different.' },
      { type: 'paragraph', text: 'Solid gold jewellery is usually easier for long-term daily wear because the metal is gold throughout. Gold-plated jewellery can still be worn regularly, but it should be protected from harsh chemicals, rough friction, chlorine, perfume, lotions, sweat buildup and repeated water exposure.' },
      { type: 'paragraph', text: 'For everyday gold-plated demi-fine jewellery, choose designs that are comfortable, secure and easy to clean. Studs, huggies, minimalist earrings and small hoops are usually the best options.' },
      {
        type: 'table',
        headers: ['Everyday Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Simple daily sparkle', 'Gold-plated demi-fine studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Medium diamond studs', 'Cadenza M'],
          ['Modern everyday styling', 'Huggies', 'Amadea Huggie'],
          ['Minimal daily jewellery', 'Minimalist earrings', 'Laluce'],
          ['Hoop styling', 'Small hoops', 'Pave Hoops'],
          ['Day-to-night looks', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Gift Comparison',
    content: [
      { type: 'paragraph', text: 'Gold-plated demi-fine jewellery and solid gold jewellery can both make good gifts, but they suit different gifting situations.' },
      { type: 'paragraph', text: 'Solid gold may be better for major milestone gifts, heirloom gifts or luxury purchases. Gold-plated demi-fine jewellery is often better for birthdays, bridesmaids, romantic gifts, anniversary gifts, modern everyday gifts and jewellery gifts where style and wearability matter.' },
      {
        type: 'table',
        headers: ['Gift Purpose', 'Better Direction', 'Why'],
        rows: [
          ['Casual birthday gift', 'Gold-plated demi-fine jewellery', 'Beautiful and accessible'],
          ['Bridesmaid gift', 'Gold-plated demi-fine jewellery', 'Easier to buy for multiple people'],
          ['Romantic everyday gift', 'Gold-plated demi-fine jewellery', 'Thoughtful and wearable'],
          ['Major anniversary gift', 'Solid gold or demi-fine', 'Depends on budget and style'],
          ['Milestone luxury gift', 'Solid gold jewellery', 'More traditional and premium'],
          ['Trend-led jewellery gift', 'Gold-plated demi-fine jewellery', 'Easier to experiment'],
          ['Meaningful symbolic gift', 'Gold-plated demi-fine jewellery', 'Butterfly and diamond designs work well'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, Cadenza M diamond stud earrings work well as a classic gift. Farfalla butterfly earrings and Alidi Farfalla butterfly earrings are stronger for symbolic gifts. Orsola drop earrings are better for romantic or occasion-led gifts.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Wedding and Occasion Comparison',
    content: [
      { type: 'paragraph', text: 'For weddings and occasions, gold-plated demi-fine jewellery can be a very practical choice.' },
      { type: 'paragraph', text: 'A wedding guest may want earrings that look polished, photograph well and match the outfit, but they may not want to buy solid gold jewellery for every event. Gold-plated lab-grown diamond earrings can create the right amount of sparkle while remaining wearable after the event.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-69.jpg',
        content: [
          {
            type: 'table',
            headers: ['Occasion Need', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Wedding guest outfit', 'Gold-plated demi-fine drops or studs', 'Orsola, Cadenza M'],
              ['Bridesmaid jewellery', 'Gold-plated studs or delicate drops', 'Cadenza S, Concetta Short'],
              ['Evening reception', 'Drops or bold statement earrings', 'Orsola, Lusso'],
              ['Black tie styling', 'Elegant drops or bold sparkle', 'Concetta Long, Lusso'],
              ['Party outfit', 'Hoops, drops or statement pieces', 'Pave Hoops, Orsola, Lusso'],
              ['Romantic dinner', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Ear Stack Comparison',
    content: [
      { type: 'paragraph', text: 'Gold-plated demi-fine jewellery is especially useful for ear stacks.' },
      { type: 'paragraph', text: 'Building an ear stack with solid gold jewellery can become expensive quickly. Gold-plated demi-fine jewellery lets shoppers create a polished layered look using studs, huggies, hoops and minimalist earrings in a more accessible way.' },
      {
        type: 'table',
        headers: ['Ear Stack Need', 'Better Direction', 'Why'],
        rows: [
          ['First ear stack', 'Gold-plated demi-fine jewellery', 'Accessible and polished'],
          ['Multiple earrings', 'Gold-plated demi-fine jewellery', 'Easier to build a set'],
          ['Heirloom ear stack', 'Solid gold jewellery', 'Better for long-term luxury'],
          ['Everyday stack', 'Gold-plated demi-fine or solid gold', 'Depends on budget and care'],
          ['Giftable ear stack', 'Gold-plated demi-fine jewellery', 'Easy to combine pieces'],
        ],
      },
      { type: 'paragraph', text: 'A simple IWantJewels stack could include Cadenza S lab-grown diamond studs with Amadea Huggie earrings. A softer stack could add Laluce minimalist diamond earrings. For a more visible stack, Cadenza M can become the main piece.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Care Comparison',
    content: [
      { type: 'paragraph', text: 'Care is one of the biggest differences between gold-plated and solid gold jewellery.' },
      { type: 'paragraph', text: 'Gold-plated jewellery needs more careful surface protection because the gold is a layer over another metal. Solid gold still needs cleaning and care, but there is no surface plating layer to protect in the same way.' },
      {
        type: 'table',
        headers: ['Care Question', 'Gold-Plated Jewellery', 'Solid Gold Jewellery'],
        rows: [
          ['Can you shower with it?', 'Better to remove', 'More durable, but still better to protect'],
          ['Can perfume affect it?', 'Yes, avoid direct exposure', 'Still best to avoid direct exposure'],
          ['Can chlorine affect it?', 'Yes, avoid', 'Yes, avoid'],
          ['Should it be stored separately?', 'Yes', 'Yes'],
          ['Should it be wiped after wear?', 'Yes', 'Yes'],
          ['Is rough cleaning okay?', 'No', 'No'],
          ['Is care very important?', 'Very important', 'Important'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels gold-plated jewellery, the safest routine is: put jewellery on last, take it off first, wipe after wearing, avoid showering or swimming in it, and store it separately.' },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '#' },
    ],
  },
  {
    heading: 'Tarnish and Finish Comparison',
    content: [
      { type: 'paragraph', text: 'Solid gold does not tarnish in the same way sterling silver or plated jewellery can, but it can still become dull from dirt, oils and product buildup.' },
      { type: 'paragraph', text: 'Gold-plated jewellery can change in appearance if the plating is exposed to rough conditions. This includes water, sweat, chlorine, perfume, lotion, hairspray, harsh cleaning products and friction.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery is described as tarnish-proof and sweat-proof with care. This means the pieces are designed to be worn, but care still matters. Gold-plated demi-fine jewellery should not be treated like waterproof gym jewellery or solid gold heirloom jewellery.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '#' },
    ],
  },
  {
    heading: 'When Should You Choose Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'Choose gold-plated jewellery when you want the warm look of gold, a more accessible price, and more flexibility to build a jewellery wardrobe.' },
      { type: 'paragraph', text: 'Gold-plated demi-fine jewellery is especially useful for:' },
      {
        type: 'bullet-list',
        items: [
          'Everyday earrings',
          'First diamond earrings',
          'Birthday gifts',
          'Bridesmaid gifts',
          'Ear stacks',
          'Wedding guest jewellery',
          'Party earrings',
          'Trend-friendly designs',
          'Multiple jewellery styles in one collection',
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, gold-plated jewellery makes sense because the products are designed to feel polished and wearable, not overly formal or unreachable.' },
    ],
  },
  {
    heading: 'When Should You Choose Solid Gold Jewellery?',
    content: [
      { type: 'paragraph', text: 'Choose solid gold jewellery when you want long-term metal value, heirloom potential or a major fine jewellery purchase.' },
      { type: 'paragraph', text: 'Solid gold may be better for:' },
      {
        type: 'bullet-list',
        items: [
          'Engagement jewellery',
          'Wedding bands',
          'Heirloom earrings',
          'Major milestone gifts',
          'Daily jewellery you never want to remove',
          'Luxury fine jewellery purchases',
          'Pieces intended to last for generations',
        ],
      },
      { type: 'paragraph', text: 'Solid gold is excellent, but it is not always necessary for every earring, gift or styling piece. For modern everyday jewellery and occasion styling, gold-plated demi-fine jewellery can be more practical.' },
    ],
  },
  {
    heading: 'Product Pathways by Buyer Need',
    content: [
      { type: 'subheading', text: 'For First Gold-Look Diamond Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are simple, wearable and easy to style with everyday outfits.' },
      { type: 'subheading', text: 'For Classic Gift Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They give more visible sparkle while staying timeless and easy to gift.' },
      { type: 'subheading', text: 'For Modern Everyday Styling' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings or Pave Hoops. These are strong for shoppers who like ear stacks, small hoops and shaped jewellery.' },
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
      { type: 'paragraph', text: 'Gold-plated jewellery is ideal when you want the warm look of gold in a demi-fine format. Choose studs for everyday wear, huggies for stacking, butterfly earrings for gifts, drops for weddings and bold statement earrings for parties.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is thinking gold-plated jewellery and solid gold jewellery are the same. They are different material types and should be priced, worn and cared for differently.' },
      { type: 'paragraph', text: 'Another mistake is assuming gold-plated jewellery is automatically low quality. The base metal matters. Gold plating over 925 sterling silver is a more elevated demi-fine direction than unclear base-metal fashion jewellery.' },
      { type: 'paragraph', text: 'A third mistake is showering or swimming in gold-plated jewellery. This can affect the finish over time.' },
      { type: 'paragraph', text: 'Another mistake is choosing solid gold for every style when the shopper really wants variety. Demi-fine jewellery can be better for building a larger jewellery wardrobe.' },
      { type: 'paragraph', text: 'Finally, do not choose only by metal type. Comfort, design, stone type, finish and wearability all matter.' },
      { type: 'see-also', text: '14kt gold-plated jewellery guide', href: '/resources/demi-fine-jewellery-guides/14kt-gold-plated-jewellery-guide' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing between gold-plated and solid gold jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is this for everyday wear, gifting, styling or heirloom value?',
          'Do I want the piece to be solid gold throughout?',
          'Is gold plating enough for the way I will wear it?',
          'Is the base metal clearly listed?',
          'Is the base 925 sterling silver?',
          'Will I care for the plating properly?',
          'Will I remove it before showering, swimming or heavy workouts?',
          'Am I buying one lifetime piece or building a jewellery wardrobe?',
          'Is the piece set with lab-grown diamonds or imitation stones?',
          'Does the jewellery feel right for the price and purpose?',
        ],
      },
      { type: 'paragraph', text: 'If you want a warm gold look in a more accessible demi-fine format, gold-plated jewellery over 925 sterling silver can be a strong choice. If you want heirloom metal value, solid gold may be better.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What is the difference between gold-plated and solid gold jewellery?',
    answer: 'Gold-plated jewellery has a layer of gold over another base metal. Solid gold jewellery is made from gold alloy throughout the full piece.',
  },
  {
    question: 'Is gold-plated jewellery real gold?',
    answer: 'The surface layer is real gold, but the full piece is not solid gold. At IWantJewels, the gold plating is 14kt gold over a 925 sterling silver base.',
  },
  {
    question: 'Is gold-plated jewellery good quality?',
    answer: 'It can be good quality when the base metal, plating and finishing are clear. Gold plating over 925 sterling silver is a stronger demi-fine direction than unclear base-metal fashion jewellery.',
  },
  {
    question: 'Is solid gold better than gold-plated jewellery?',
    answer: 'Solid gold is better for long-term metal value and heirloom pieces. Gold-plated jewellery is better when you want a gold look at a more accessible price and more style variety.',
  },
  {
    question: 'Can you wear gold-plated jewellery every day?',
    answer: 'Yes, gold-plated jewellery can be worn regularly with proper care. It should be removed before showering, swimming and heavy workouts.',
  },
  {
    question: 'Does gold-plated jewellery tarnish?',
    answer: 'Gold-plated jewellery can change in appearance depending on wear, care and exposure. Protect it from water, perfume, chlorine, sweat and harsh cleaners.',
  },
  {
    question: 'Can you shower with gold-plated jewellery?',
    answer: 'It is better not to shower with gold-plated jewellery because water, soap, shampoo and moisture can affect the finish over time.',
  },
  {
    question: 'Is gold-plated jewellery good for gifts?',
    answer: 'Yes, gold-plated demi-fine jewellery is good for gifts because it looks polished, feels thoughtful and is usually more accessible than solid gold.',
  },
  {
    question: 'Is gold-plated jewellery good for earrings?',
    answer: 'Yes, gold-plated earrings can be a strong choice when the base metal is clear and the design is comfortable. IWantJewels uses 925 sterling silver with 14kt gold plating.',
  },
  {
    question: 'Should I buy gold-plated or solid gold jewellery?',
    answer: 'Choose gold-plated jewellery for accessible demi-fine styling, gifts and variety. Choose solid gold for heirloom pieces, long-term metal value and major fine jewellery purchases.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Gold-plated and solid gold jewellery both have value, but they serve different purposes. Solid gold is best for heirloom and traditional fine jewellery, while gold-plated demi-fine jewellery is ideal when you want a polished gold look, real diamond sparkle and more styling flexibility.',
  body: 'Start with IWantJewels 14kt gold-plated lab-grown diamond earrings if you want wearable demi-fine jewellery with a gold finish. Choose Cadenza S for subtle daily shine, Cadenza M for classic gifts, Amadea for ear stacks, Farfalla for meaningful gifting, Orsola for wedding guest styling and Lusso for bold party looks.',
  primaryLabel: 'Shop Gold-Plated Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Demi-Fine Jewellery',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the 14kt Gold-Plated Jewellery Guide',
  tertiaryHref: '/resources/demi-fine-jewellery-guides/14kt-gold-plated-jewellery-guide',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const article = getArticleBySlug('demi-fine-jewellery-guides', 'gold-plated-vs-solid-gold-jewellery')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('demi-fine-jewellery-guides', 'gold-plated-vs-solid-gold-jewellery', 3)
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
