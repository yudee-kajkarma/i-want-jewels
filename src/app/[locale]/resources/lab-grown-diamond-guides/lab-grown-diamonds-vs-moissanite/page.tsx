import type { Metadata } from 'next'
import { localizedAlternates } from '@/i18n/metadata'
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
  title: 'Lab Grown Diamonds vs Moissanite',
  description:
    'Compare lab grown diamonds and moissanite in simple language. Learn the difference in sparkle, durability, price, value and jewellery use.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-moissanite', locale),
  }
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-20.jpg',
  title: 'Lab-Grown Diamonds vs Moissanite:',
  subtitle: 'What Is the Difference?',
  paragraphs: [
    'Lab-grown diamonds and moissanite are not the same. A lab-grown diamond is a real diamond created in a controlled laboratory environment, while moissanite is a different gemstone that is often used as a diamond alternative. Both can be beautiful, both can sparkle, and both can be used in jewellery, but they have different looks, meanings and buyer appeal.',
    'The biggest difference is the type of sparkle. Lab-grown diamonds have classic diamond brilliance, while moissanite often gives a stronger rainbow-like fire. Some people love that colourful sparkle, while others prefer the cleaner, more traditional look of diamond.',
    'For IWantJewels shoppers, lab-grown diamonds are the better choice if you specifically want real diamond jewellery in a modern demi-fine format. Moissanite can work for someone who likes alternative gemstones, but if your goal is diamond earrings, diamond gifts, wedding guest jewellery or everyday diamond sparkle, lab-grown diamonds are the stronger match.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds are real diamonds; moissanite is a different gemstone.',
    'Moissanite is not fake, but it is not diamond.',
    'Lab-grown diamonds give classic diamond sparkle.',
    'Moissanite often has a stronger rainbow-like sparkle.',
    'Both are durable, but they are different materials.',
    'Lab-grown diamonds are better if you specifically want diamond jewellery.',
    'Moissanite may suit buyers who like bold sparkle and gemstone alternatives.',
    'For earrings, gifts and demi-fine jewellery, lab-grown diamonds usually feel more classic and easier to position as real diamond jewellery.',
    'IWantJewels focuses on lab-grown diamonds because they offer real diamond beauty in wearable demi-fine designs.',
  ],
  image: '/blog-images/blog-image-22.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Is the Main Difference Between Lab-Grown Diamonds and Moissanite?',
    content: [
      { type: 'paragraph', text: 'The main difference is that lab-grown diamonds are diamonds, while moissanite is a different gemstone.' },
      { type: 'paragraph', text: 'A lab-grown diamond is created in a controlled laboratory environment using technology that grows diamond material. It has the same basic diamond identity people expect from diamond jewellery. Moissanite, on the other hand, is not diamond. It is its own gemstone and has a different chemical structure, different light performance and a different visual personality.' },
      { type: 'paragraph', text: 'That does not make moissanite bad. Moissanite can be beautiful, durable and very sparkly. The issue is simply that it should not be confused with diamond. If you want a diamond alternative, moissanite can be an option. If you want real diamond jewellery, lab-grown diamonds are the better choice.' },
      { type: 'paragraph', text: 'For earrings, this difference matters because many people are not only buying shine. They are buying the feeling of diamond jewellery. A lab-grown diamond stud or drop earring carries that diamond identity in a way moissanite does not.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Moissanite: Simple Comparison',
    content: [
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamond', 'Moissanite'],
        rows: [
          ['Is it a diamond?', 'Yes', 'No'],
          ['Stone type', 'Real diamond', 'Different gemstone'],
          ['Origin', 'Created in a controlled laboratory environment', 'Usually lab-created today'],
          ['Sparkle style', 'Classic diamond brilliance', 'Stronger rainbow-like fire'],
          ['Look', 'Clean, traditional diamond appearance', 'More colourful flashes in light'],
          ['Durability', 'Very durable', 'Also durable'],
          ['Price', 'Usually more than moissanite, less than many natural diamonds', 'Usually more accessible than diamond'],
          ['Best for', 'Real diamond jewellery, earrings, gifts, demi-fine pieces', 'Diamond alternative jewellery'],
          ['Buyer appeal', 'Classic, premium, diamond-focused', 'Bold sparkle, alternative gemstone appeal'],
        ],
      },
      { type: 'paragraph', text: 'The main thing to remember is that both stones can look beautiful, but they are not trying to be the same thing. Moissanite is not a bad stone. It is simply not diamond.' },
      { type: 'paragraph', text: 'If you want the classic diamond look, choose lab-grown diamonds. If you prefer a brighter rainbow sparkle and do not mind that it is not diamond, moissanite may suit you.' },
    ],
  },
  {
    heading: 'Is Moissanite a Fake Diamond?',
    content: [
      { type: 'paragraph', text: 'Moissanite is not a fake diamond, but it is also not a diamond.' },
      { type: 'paragraph', text: 'This can be confusing because moissanite is often marketed as a diamond alternative. It can look similar from a distance, and it can be very sparkly, but it is its own gemstone.' },
      { type: 'paragraph', text: 'A fake diamond usually means something that is being passed off as diamond when it is not. Moissanite should not be treated that way. It is a real gemstone, just not a diamond.' },
      { type: 'paragraph', text: 'The difference matters when buying jewellery. If the product is sold as moissanite, that is clear. If you want diamond jewellery, you should choose lab-grown diamonds or natural diamonds instead.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Fake Like Moissanite?',
    content: [
      { type: 'paragraph', text: 'No. Lab-grown diamonds are not fake diamonds, and moissanite is not a fake diamond either. They are simply different stones.' },
      { type: 'paragraph', text: 'A lab-grown diamond is a real diamond with a laboratory origin. Moissanite is a different gemstone that is often used as a diamond alternative. Both can be lab-created, but being created in a lab does not make them the same material.' },
      { type: 'paragraph', text: 'This is where many shoppers get confused. They hear "lab-created" and assume every lab-created stone is similar. That is not true. A lab-grown diamond is diamond. Lab-created moissanite is moissanite.' },
      { type: 'paragraph', text: 'So, if your goal is to buy real diamond earrings, lab-grown diamonds are the right direction. If your goal is to buy a bright alternative gemstone, moissanite can be considered.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-cubic-zirconia' },
    ],
  },
  {
    heading: 'Which Sparkles More: Lab-Grown Diamond or Moissanite?',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-24.jpg',
        content: [
          { type: 'paragraph', text: 'Moissanite often gives stronger rainbow-like sparkle, while lab-grown diamonds give classic diamond brilliance.' },
          { type: 'paragraph', text: 'This does not mean one is automatically better. It depends on the look you prefer. Some people love the extra fire of moissanite because it feels bold and eye-catching. Others find it too colourful and prefer the cleaner sparkle of diamond.' },
          { type: 'paragraph', text: 'For earrings, lab-grown diamonds usually feel more refined and timeless. They catch light beautifully without looking too flashy or artificial. Moissanite can look very bright, but in some lighting it may give more rainbow flashes than the wearer expects.' },
          { type: 'paragraph', text: 'If you want jewellery that feels classic, elegant and easy to wear across many outfits, lab-grown diamonds are usually the safer choice. If you want maximum sparkle and do not mind a more colourful effect, moissanite may appeal to you.' },
        ],
      },
    ],
  },
  {
    heading: 'Which Looks More Like a Natural Diamond?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds look more like natural diamonds because they are diamonds.' },
      { type: 'paragraph', text: 'Moissanite can look similar from a distance, especially in small sizes, but it has a different sparkle pattern. In certain lighting, moissanite may show more rainbow flashes, which can make it easier to notice that it is not diamond.' },
      { type: 'paragraph', text: 'This is especially important if the buyer specifically wants diamond jewellery. If someone wants diamond studs, diamond drop earrings or a diamond gift, lab-grown diamonds match that expectation better.' },
      { type: 'paragraph', text: 'With earrings, the difference may be subtle in small stones, but the jewellery feeling is still different. A lab-grown diamond earring is diamond jewellery. A moissanite earring is alternative gemstone jewellery.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '#' },
    ],
  },
  {
    heading: 'Which Lasts Longer: Lab-Grown Diamond or Moissanite?',
    content: [
      { type: 'paragraph', text: 'Both lab-grown diamonds and moissanite are durable stones suitable for jewellery, but diamond remains the classic benchmark for hardness.' },
      { type: 'paragraph', text: 'For everyday earrings, both can hold up well when cared for properly. However, the full jewellery piece matters just as much as the stone. The metal, plating, setting, backing and care routine all affect how long the earrings continue to look beautiful.' },
      { type: 'paragraph', text: 'At IWantJewels, the focus is on lab-grown diamonds because they give customers real diamond sparkle in demi-fine pieces made for regular wear. If you are choosing earrings to wear often, the diamond is only one part of the decision. Comfort, metal quality and design also matter.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '#' },
    ],
  },
  {
    heading: 'Why Is Moissanite Usually Cheaper Than Lab-Grown Diamond?',
    content: [
      { type: 'paragraph', text: 'Moissanite is usually more accessible in price because it is not diamond. It is a different gemstone with a different production and market value.' },
      { type: 'paragraph', text: 'Lab-grown diamonds usually cost more than moissanite because they are real diamonds. They carry diamond identity, diamond structure and diamond jewellery appeal.' },
      { type: 'paragraph', text: 'This does not mean moissanite is low quality. It simply means it sits in a different jewellery category. Moissanite is often chosen as an alternative to diamond. Lab-grown diamonds are chosen by people who still want diamond jewellery, but with a modern origin and often a more accessible price than mined diamonds.' },
      { type: 'paragraph', text: 'For IWantJewels, lab-grown diamonds are the better fit because the brand\'s value is built around real diamond jewellery in wearable demi-fine designs.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings vs Moissanite Earrings',
    content: [
      { type: 'paragraph', text: 'For earrings, lab-grown diamonds are usually better if you want a classic diamond look. Moissanite earrings are better if you like bold sparkle and do not mind that the stone is not diamond.' },
      {
        type: 'table',
        headers: ['Buyer Need', 'Better Choice', 'Why'],
        rows: [
          ['Real diamond jewellery', 'Lab-grown diamond', 'It is diamond'],
          ['Lowest price between the two', 'Moissanite', 'Usually more accessible'],
          ['Classic sparkle', 'Lab-grown diamond', 'Cleaner diamond brilliance'],
          ['Strong rainbow fire', 'Moissanite', 'More colourful sparkle'],
          ['Everyday diamond earrings', 'Lab-grown diamond', 'Feels more refined and timeless'],
          ['Alternative gemstone jewellery', 'Moissanite', 'Good if you do not need diamond'],
          ['Meaningful diamond gift', 'Lab-grown diamond', 'Carries diamond identity'],
          ['Demi-fine diamond jewellery', 'Lab-grown diamond', 'Better fit for premium everyday pieces'],
        ],
      },
      { type: 'paragraph', text: 'If you are buying earrings because you want the look and meaning of diamond jewellery, lab-grown diamonds are the stronger option. If you simply want bright sparkle at a lower price and are happy with an alternative gemstone, moissanite can work.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Worth More Than Moissanite Earrings?',
    content: [
      { type: 'paragraph', text: 'Usually, yes. Lab-grown diamond earrings are generally worth more than moissanite earrings because they use real diamonds.' },
      { type: 'paragraph', text: 'That does not mean every buyer needs lab-grown diamonds. If someone loves moissanite\'s sparkle and wants a diamond alternative, moissanite can be a good choice. But if the goal is to own diamond jewellery, lab-grown diamonds offer the clearer value.' },
      { type: 'paragraph', text: 'For earrings, this is especially important when buying gifts. A lab-grown diamond earring usually feels more special than a moissanite earring because it is still a diamond piece. That can matter for birthdays, anniversaries, bridesmaids and meaningful gifts.' },
      { type: 'see-also', text: 'Are lab-grown diamonds worth it?', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Moissanite for Everyday Earrings',
    content: [
      { type: 'paragraph', text: 'For everyday earrings, lab-grown diamonds are usually the better choice if you want a timeless look.' },
      { type: 'paragraph', text: 'Moissanite can be very bright, but its stronger rainbow fire may feel too noticeable for some everyday outfits. Lab-grown diamonds tend to feel cleaner and easier to wear with workwear, casual outfits, blazers, simple dresses and everyday jewellery stacks.' },
      { type: 'paragraph', text: 'For daily wear, choose earrings that are comfortable, secure and versatile. Studs and huggies are usually the easiest options.' },
      { type: 'paragraph', text: 'For IWantJewels shoppers, Cadenza S lab-grown diamond studs are a strong first pair, Cadenza M diamond stud earrings work well if you want more visible sparkle, Amadea Huggie earrings are ideal for ear stacks, and Laluce minimalist diamond earrings suit quiet everyday styling.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Moissanite for Gifts',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-26.jpg',
        content: [
          { type: 'paragraph', text: 'Lab-grown diamonds are usually the better choice for gifts if you want the jewellery to feel classic, meaningful and premium.' },
          { type: 'paragraph', text: 'Moissanite can still be a beautiful gift, especially for someone who likes alternative gemstones. But many people receiving jewellery hear "diamond" differently. A lab-grown diamond gift carries the feeling of diamond jewellery, while moissanite feels more like a diamond alternative.' },
          { type: 'paragraph', text: 'For safe gifting, lab-grown diamond studs are usually the easiest choice. They feel timeless and suit many styles. Butterfly earrings are better if you want something more symbolic. Drop earrings are better if the person enjoys dressing up.' },
          { type: 'paragraph', text: 'For IWantJewels, Cadenza S and Cadenza M are safe gift options, Farfalla butterfly earrings and Alidi Farfalla butterfly earrings feel more personal, and Orsola drop earrings are strong for someone who enjoys occasion styling.' },
        ],
      },
      { type: 'see-also', text: 'Explore Jewellery Gifts', href: '/products' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Moissanite for Wedding Guest Jewellery',
    content: [
      { type: 'paragraph', text: 'For wedding guest jewellery, lab-grown diamonds usually feel more refined and classic.' },
      { type: 'paragraph', text: 'Moissanite can be very sparkly, but the rainbow fire may feel too bright depending on the outfit. Lab-grown diamonds usually give a cleaner sparkle that works well with satin dresses, black dresses, pastel outfits, off-shoulder necklines and evening looks.' },
      { type: 'paragraph', text: 'If the outfit is already detailed, lab-grown diamond studs may be enough. If the dress is simple, drop earrings can add movement and polish. If the look is romantic, butterfly earrings can feel softer and more personal.' },
      { type: 'paragraph', text: 'For wedding guest styling, Orsola drop earrings are a strong recommendation. Cadenza M diamond stud earrings work well when the outfit has detail. Farfalla butterfly earrings suit feminine or romantic styling.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Moissanite for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'For ear stacks, lab-grown diamonds usually create a cleaner and more timeless look.' },
      { type: 'paragraph', text: 'Ear stacks often use small stones, so the sparkle should feel balanced. Moissanite can sometimes look very bright, especially when several stones are layered together. Lab-grown diamonds usually create a more refined sparkle, which works better for minimalist and demi-fine styling.' },
      { type: 'paragraph', text: 'A simple diamond ear stack could include Cadenza S lab-grown diamond studs with Amadea Huggie earrings. If you want a softer stack, add Laluce minimalist diamond earrings. This creates sparkle without making the ear look too busy.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Moissanite in Demi-Fine Jewellery',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery sits between costume jewellery and traditional fine jewellery. It should feel elevated, wearable and more premium than simple fashion jewellery.' },
      { type: 'paragraph', text: 'Lab-grown diamonds are a strong fit for demi-fine jewellery because they bring real diamond beauty into pieces that can be worn often. Moissanite can also be used in jewellery, but it changes the positioning. It becomes alternative gemstone jewellery rather than diamond jewellery.' },
      { type: 'paragraph', text: 'At IWantJewels, the brand direction is built around lab-grown diamonds, 925 sterling silver and 14kt gold plating. This combination gives shoppers real diamond sparkle in a more accessible demi-fine format.' },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '#' },
    ],
  },
  {
    heading: 'When Should You Choose Moissanite?',
    content: [
      { type: 'paragraph', text: 'Choose moissanite if you like bold rainbow sparkle, want a diamond alternative, or are looking for a lower-cost stone that still feels bright and durable.' },
      { type: 'paragraph', text: 'Moissanite can be a good option for people who do not need diamond jewellery and simply want a sparkling gemstone. It can also appeal to shoppers who prefer alternative stones and enjoy a more colourful light effect.' },
      { type: 'paragraph', text: 'The important thing is to choose it knowingly. Moissanite should not be bought because someone thinks it is the same as lab-grown diamond. It is its own gemstone.' },
    ],
  },
  {
    heading: 'When Should You Choose Lab-Grown Diamonds?',
    content: [
      { type: 'paragraph', text: 'Choose lab-grown diamonds if you want real diamond jewellery with a modern origin.' },
      { type: 'paragraph', text: 'They are especially worth choosing for:' },
      {
        type: 'bullet-list',
        items: [
          'Everyday diamond earrings',
          'Diamond stud earrings',
          'Wedding guest jewellery',
          'Bridesmaid jewellery',
          'Birthday and anniversary gifts',
          'Drop earrings for dinners and parties',
          'Ear stacks',
          'Demi-fine diamond jewellery',
          'Pieces you want to feel classic and wearable',
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, lab-grown diamonds are the better match because the products are designed to give real diamond beauty in wearable everyday and occasion jewellery.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you are choosing lab-grown diamonds instead of moissanite, start with earrings that match how you plan to wear them.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First real diamond earrings', 'Simple, clean and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'More visible everyday sparkle', 'Classic with stronger presence'],
          ['Amadea Huggie earrings', 'Ear stacks', 'Adds diamond shine in a modern way'],
          ['Laluce minimalist diamond earrings', 'Quiet everyday styling', 'Easy to pair with simple outfits'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'More personal than a basic sparkle earring'],
          ['Alidi Farfalla butterfly earrings', 'Feminine gift styling', 'Soft, symbolic and memorable'],
          ['Orsola drop earrings', 'Wedding guests and dinners', 'Refined sparkle for occasions'],
          ['Lusso bold statement earrings', 'Party looks', 'Strong sparkle with real diamond appeal'],
        ],
      },
      { type: 'paragraph', text: 'If you want real diamond jewellery rather than a diamond alternative, start with lab-grown diamond earrings. Choose studs for everyday wear, huggies for ear stacks, butterfly earrings for gifts or drop earrings for occasions.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is thinking moissanite and lab-grown diamonds are the same because both can be lab-created. They are not the same stone.' },
      { type: 'paragraph', text: 'Another mistake is assuming more sparkle always means better. Moissanite can have stronger rainbow fire, but some buyers prefer the cleaner look of diamond.' },
      { type: 'paragraph', text: 'A third mistake is choosing only by price. Moissanite may cost less, but if your goal is real diamond jewellery, lab-grown diamonds are the better match.' },
      { type: 'paragraph', text: 'Finally, do not buy a stone without understanding what it is. Always check whether the product is lab-grown diamond, natural diamond, moissanite, cubic zirconia or another simulant.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying',
    content: [
      { type: 'paragraph', text: 'Before choosing between lab-grown diamond and moissanite jewellery, ask yourself:' },
      {
        type: 'bullet-list',
        items: [
          'Do I specifically want diamond jewellery?',
          'Do I prefer classic sparkle or rainbow-like fire?',
          'Is this for everyday wear, gifting or an occasion?',
          'Will the jewellery be worn often?',
          'Does the person receiving it care whether it is diamond?',
          'Is price the main factor, or is material identity important?',
          'Does the jewellery match the person\'s style?',
          'Is the product clearly described as lab-grown diamond or moissanite?',
        ],
      },
      { type: 'paragraph', text: 'If you want real diamond jewellery, choose lab-grown diamonds. If you want a bright alternative gemstone and do not need diamond, moissanite can work.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Are lab-grown diamonds the same as moissanite?',
    answer: 'No, lab-grown diamonds and moissanite are not the same. Lab-grown diamonds are real diamonds, while moissanite is a different gemstone.',
  },
  {
    question: 'Is moissanite a fake diamond?',
    answer: 'Moissanite is not a fake diamond, but it is not a diamond either. It is a separate gemstone often used as a diamond alternative.',
  },
  {
    question: 'Are lab-grown diamonds real diamonds?',
    answer: 'Yes, lab-grown diamonds are real diamonds created in a controlled laboratory environment instead of being mined from the earth.',
  },
  {
    question: 'Which sparkles more, lab-grown diamond or moissanite?',
    answer: 'Moissanite often gives stronger rainbow-like sparkle, while lab-grown diamonds give classic diamond brilliance.',
  },
  {
    question: 'Which looks more like a natural diamond?',
    answer: 'Lab-grown diamonds look more like natural diamonds because they are diamonds. Moissanite has a different sparkle pattern.',
  },
  {
    question: 'Is moissanite cheaper than lab-grown diamond?',
    answer: 'Moissanite is usually more accessible in price than lab-grown diamond because it is not diamond.',
  },
  {
    question: 'Which is better for earrings?',
    answer: 'Lab-grown diamonds are better if you want classic real diamond earrings. Moissanite can work if you like alternative gemstones and stronger rainbow sparkle.',
  },
  {
    question: 'Which is better for gifts?',
    answer: 'Lab-grown diamond jewellery usually feels more classic and meaningful as a gift because it is real diamond jewellery. Moissanite can still be a good gift for someone who likes alternative gemstones.',
  },
  {
    question: 'Are lab-grown diamonds better for everyday wear?',
    answer: 'Lab-grown diamonds are a strong everyday choice because they give real diamond beauty in a classic, wearable way.',
  },
  {
    question: 'Should I choose lab-grown diamond or moissanite?',
    answer: 'Choose lab-grown diamond if you want real diamond jewellery. Choose moissanite if you want a bright alternative gemstone and do not need the jewellery to be diamond.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-grown diamonds and moissanite can both be beautiful, but they are not the same. Moissanite is a diamond alternative, while lab-grown diamonds are real diamonds created above ground.',
  body: 'If you want jewellery that feels classic, premium and genuinely diamond, lab-grown diamonds are the stronger choice. Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in a wearable demi-fine design. Choose studs for everyday polish, huggies for ear stacks, butterfly earrings for thoughtful gifts or drop earrings for weddings and evening outfits.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamonds-vs-moissanite')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamonds-vs-moissanite', 3)
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
