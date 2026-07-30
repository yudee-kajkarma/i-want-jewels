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
  title: 'Gold vs White vs Rose Gold Diamond Earrings',
  description:
    'Compare gold, white and rose gold lab grown diamond earrings for everyday wear, gifts, weddings, parties, skin tone and outfit styling.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings', locale),
  }
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-93.jpg',
  title: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings:',
  subtitle: 'Which Metal Colour Should You Choose?',
  paragraphs: [
    'Gold, white and rose gold earrings can completely change the feeling of the same outfit. Yellow gold feels warm, classic and rich. White or silver-tone earrings feel clean, bright and modern. Rose gold feels soft, romantic and feminine.',
    'When choosing lab-grown diamond earrings, the diamond sparkle matters, but the metal colour matters just as much. The right metal colour can make the earrings feel more wearable, more flattering and easier to match with outfits the person already owns.',
    'At IWantJewels, many earring styles can be positioned across gold, white/silver and rose gold styling needs. This guide helps shoppers choose the best metal colour for everyday wear, gifts, wedding guest looks, parties, ear stacks and outfit styling. It also connects metal colour decisions to products such as Cadenza S, Cadenza M, Amadea Huggie, Laluce, Pave Hoops, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Concetta Long and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings by Metal Colour',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Compare yellow gold, white/silver tone and rose gold earrings.',
    'Choose the best metal colour for lab-grown diamond earrings.',
    'Pick earrings for warm, cool and neutral wardrobes.',
    'Match earrings to black, satin, green, red, champagne, blush and pastel outfits.',
    'Choose metal colour for wedding guest jewellery and party earrings.',
    'Pick the safest metal colour for gifts.',
    'Build ear stacks in one metal colour or mixed metals.',
    'Find IWantJewels product recommendations by metal colour and styling need.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-93.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Comparison Table ──────────────────────────────────────────────
  {
    heading: 'Gold vs White vs Rose Gold Earrings Comparison',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main comparison tool.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Style Feeling', 'Best For', 'Outfit Match'],
        rows: [
          ['Yellow gold', 'Warm, classic, rich and polished', 'Everyday wear, parties, warm outfits, traditional gifts', 'Black, green, red, champagne, cream, brown'],
          ['White or silver tone', 'Clean, bright, modern and crisp', 'Minimal outfits, formal looks, cool wardrobes, classic sparkle', 'Black, navy, white, grey, silver, cool pastels'],
          ['Rose gold', 'Soft, romantic, feminine and personal', 'Gifts, romantic outfits, blush dresses, soft styling', 'Pink, blush, champagne, cream, soft green, florals'],
          ['Mixed metals', 'Creative, modern and trend-led', 'Ear stacks and personal styling', 'Minimal outfits, casual styling, layered jewellery'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Yellow gold is usually the safest choice for warm and classic styling. White or silver tone is best when the look should feel clean and modern. Rose gold is strongest when the jewellery should feel soft, romantic or gift-led.',
      },
    ],
  },

  // ── Section 1: Yellow Gold ────────────────────────────────────────────────────
  {
    heading: 'What Yellow Gold Earrings Look Best With',
    content: [
      {
        type: 'paragraph',
        text: 'Yellow gold earrings feel warm, polished and classic. They are one of the easiest metal colours to wear with evening outfits, black dresses, warm-toned clothes and party looks.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold also works beautifully with lab-grown diamonds because the warmth of the metal contrasts with the brightness of the stones. This makes the earrings feel rich without needing the outfit to be complicated.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-95.jpg',
        content: [
          {
            type: 'table',
            headers: ['Best With Yellow Gold Earrings', 'Why It Works'],
            rows: [
              ['Black dresses', 'Gold creates strong contrast and warmth'],
              ['Green outfits', 'Gold complements rich and earthy green tones'],
              ['Red dresses', 'Gold adds warmth and evening polish'],
              ['Champagne satin', 'Gold matches the warmth of the fabric'],
              ['Cream and ivory outfits', 'Gold keeps the look soft and elegant'],
              ['Brown and neutral outfits', 'Gold feels natural and polished'],
              ['Party looks', 'Gold adds stronger evening energy'],
              ['Wedding guest outfits', 'Gold feels warm and celebratory'],
            ],
          },
          {
            type: 'paragraph',
            text: 'Yellow gold is a strong direction for pieces such as Orsola drop earrings, Pave Hoops, Cadenza M diamond stud earrings, Farfalla butterfly earrings and Lusso bold statement earrings, especially when the outfit is black, green, champagne, red or warm-toned.',
          },
        ],
      },
      { type: 'see-also', text: 'What Jewellery to Wear with a Black Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },

  // ── Section 2: White / Silver Tone ───────────────────────────────────────────
  {
    heading: 'What White or Silver-Tone Earrings Look Best With',
    content: [
      {
        type: 'paragraph',
        text: 'White or silver-tone earrings feel clean, bright and modern. They are especially good when the outfit already feels cool-toned, formal or minimal.',
      },
      {
        type: 'paragraph',
        text: 'This metal direction can make lab-grown diamonds look very crisp because the metal and diamond both feel bright. It is a strong choice for shoppers who prefer clean styling, white metal jewellery, cool wardrobes or formal looks.',
      },
      {
        type: 'table',
        headers: ['Best With White / Silver-Tone Earrings', 'Why It Works'],
        rows: [
          ['Navy dresses', 'Creates a crisp formal contrast'],
          ['Black dresses', 'Feels clean, sharp and modern'],
          ['White outfits', 'Keeps the look bright and minimal'],
          ['Grey outfits', 'Matches cool tones naturally'],
          ['Silver satin', 'Creates a clean evening look'],
          ['Cool pastel dresses', 'Keeps the styling soft and fresh'],
          ['Minimal outfits', 'Supports quiet, modern styling'],
          ['Formal evening looks', 'Feels polished and refined'],
        ],
      },
      {
        type: 'paragraph',
        text: 'White or silver-tone earrings are especially strong for Cadenza S, Cadenza M, Laluce, Amadea, Concetta Long and Orsola when the outfit is navy, black, grey, white or cool-toned.',
      },
      { type: 'see-also', text: 'Minimalist Earrings Guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },

  // ── Section 3: Rose Gold ──────────────────────────────────────────────────────
  {
    heading: 'What Rose Gold Earrings Look Best With',
    content: [
      {
        type: 'paragraph',
        text: 'Rose gold earrings feel soft, romantic and personal. They are especially strong for gifts, pastel outfits, blush satin, floral dresses and jewellery that should feel feminine or meaningful.',
      },
      {
        type: 'paragraph',
        text: 'Rose gold can soften the brightness of lab-grown diamonds. It is a good choice when yellow gold feels too warm and white tone feels too sharp.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-97.jpg',
        content: [
          {
            type: 'table',
            headers: ['Best With Rose Gold Earrings', 'Why It Works'],
            rows: [
              ['Blush dresses', 'Rose gold matches the soft romantic mood'],
              ['Pink satin', 'Keeps the look feminine and gentle'],
              ['Champagne outfits', 'Adds warmth without feeling too yellow'],
              ['Cream dresses', 'Feels soft and elegant'],
              ['Floral outfits', 'Supports romantic styling'],
              ['Soft green outfits', 'Creates a gentle colour contrast'],
              ['Birthday gifts', 'Feels personal and thoughtful'],
              ['Anniversary gifts', 'Feels romantic and warm'],
            ],
          },
          {
            type: 'paragraph',
            text: 'Rose gold is especially useful for Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Concetta Short earrings, Orsola drop earrings and Cadenza S when the look should feel soft, romantic or gift-focused.',
          },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },

  // ── Section 4: Best for Everyday Wear ────────────────────────────────────────
  {
    heading: 'Which Metal Colour Is Best for Everyday Wear?',
    content: [
      {
        type: 'paragraph',
        text: 'The best metal colour for everyday wear is usually the one the shopper already wears most often.',
      },
      {
        type: 'paragraph',
        text: 'If someone wears gold watches, gold rings and warm-toned jewellery, yellow gold earrings will feel easiest. If they wear silver watches, white gold rings or cool-toned jewellery, white or silver-tone earrings will feel more natural. If they like soft feminine styling, rose gold may be a better everyday choice.',
      },
      {
        type: 'table',
        headers: ['Everyday Style', 'Best Metal Colour', 'Product Direction'],
        rows: [
          ['Classic everyday jewellery', 'Yellow gold', 'Cadenza S, Cadenza M, Amadea'],
          ['Clean modern everyday jewellery', 'White or silver tone', 'Cadenza S, Laluce, Amadea'],
          ['Romantic everyday jewellery', 'Rose gold', 'Farfalla, Alidi Farfalla, Cadenza S'],
          ['Minimal workwear', 'White/silver tone or yellow gold', 'Laluce, Cadenza S, Amadea'],
          ['Warm casual outfits', 'Yellow gold', 'Cadenza M, Pave Hoops'],
          ['Soft casual outfits', 'Rose gold', 'Farfalla, Cadenza S'],
          ['Ear stack styling', 'One consistent metal colour', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Stud vs Huggie Earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },

  // ── Section 5: Best for Gifts ─────────────────────────────────────────────────
  {
    heading: 'Which Metal Colour Is Best for Gifts?',
    content: [
      {
        type: 'paragraph',
        text: 'For gifts, the safest metal colour is the one the recipient already wears.',
      },
      {
        type: 'paragraph',
        text: 'Do not guess based only on trend. Look at their usual rings, watch, bracelets and necklaces. If they wear mostly gold, choose yellow gold. If they wear silver or white-toned jewellery, choose white/silver tone. If they like soft, romantic jewellery, rose gold can be a thoughtful option.',
      },
      {
        type: 'table',
        headers: ['Gift Situation', 'Safest Metal Colour', 'Product Direction'],
        rows: [
          ['Safe classic gift', 'Yellow gold or white/silver tone', 'Cadenza M'],
          ['First diamond earrings', 'Match their current jewellery', 'Cadenza S'],
          ['Romantic gift', 'Rose gold or yellow gold', 'Farfalla, Alidi Farfalla, Orsola'],
          ['Birthday gift', 'Yellow gold, rose gold or their usual metal', 'Cadenza M, Farfalla'],
          ['Bridesmaid gift', 'Match dress colour or wedding palette', 'Cadenza S, Concetta Short'],
          ['Minimalist gift', 'White/silver tone or yellow gold', 'Laluce, Cadenza S'],
          ['Party-loving recipient', 'Yellow gold or white/silver tone', 'Lusso, Pave Hoops'],
          ['Ear stack gift', 'Keep both pieces same metal colour', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },

  // ── Section 6: Best for Weddings ─────────────────────────────────────────────
  {
    heading: 'Which Metal Colour Is Best for Weddings?',
    content: [
      {
        type: 'paragraph',
        text: 'Wedding guest jewellery should match the outfit, season and level of formality.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold is strong for warm wedding outfits, champagne dresses, green dresses, red dresses and black tie styling. White or silver tone is strong for navy, silver, grey, black and cool-toned formal outfits. Rose gold works beautifully with blush, pink, pastel, champagne and romantic wedding guest looks.',
      },
      {
        type: 'table',
        headers: ['Wedding Outfit', 'Best Metal Colour', 'Product Direction'],
        rows: [
          ['Champagne dress', 'Yellow gold or rose gold', 'Orsola, Concetta Short'],
          ['Black dress', 'Yellow gold or white/silver tone', 'Lusso, Orsola, Cadenza M'],
          ['Green dress', 'Yellow gold', 'Orsola, Pave Hoops'],
          ['Navy dress', 'White/silver tone or yellow gold', 'Cadenza M, Orsola'],
          ['Blush dress', 'Rose gold or yellow gold', 'Farfalla, Alidi Farfalla'],
          ['Red dress', 'Yellow gold', 'Orsola, Cadenza M'],
          ['Pastel dress', 'Rose gold or white/silver tone', 'Concetta Short, Farfalla'],
          ['Floral dress', 'Rose gold, yellow gold or soft white tone', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 7: Best for Parties ──────────────────────────────────────────────
  {
    heading: 'Which Metal Colour Is Best for Parties?',
    content: [
      {
        type: 'paragraph',
        text: 'Party jewellery can be stronger than everyday jewellery. The best metal colour depends on the outfit mood.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold feels warm, rich and evening-ready. White or silver tone feels sharp, clean and bright. Rose gold feels softer and more romantic, which can work beautifully for birthdays or feminine party looks.',
      },
      {
        type: 'table',
        headers: ['Party Outfit', 'Best Metal Colour', 'Product Direction'],
        rows: [
          ['Simple black dress', 'Yellow gold or white/silver tone', 'Lusso, Orsola, Pave Hoops'],
          ['Satin party dress', 'Match dress temperature', 'Orsola, Cadenza M'],
          ['Red party dress', 'Yellow gold', 'Lusso, Orsola'],
          ['Green party dress', 'Yellow gold', 'Pave Hoops, Orsola'],
          ['Silver party outfit', 'White/silver tone', 'Cadenza M, Concetta Long'],
          ['Blush birthday dress', 'Rose gold or yellow gold', 'Farfalla, Alidi Farfalla'],
          ['Minimal jumpsuit', 'Yellow gold or white/silver tone', 'Lusso, Pave Hoops'],
          ['Detailed party outfit', 'Keep metal clean and simple', 'Cadenza M, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },

  // ── Section 8: Metal Colour by Outfit Colour ──────────────────────────────────
  {
    heading: 'Metal Colour by Outfit Colour',
    content: [
      { type: 'paragraph', text: 'This table should work as a practical styling tool for shoppers.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-99.jpg',
        content: [
          {
            type: 'table',
            headers: ['Outfit Colour', 'Best Metal Colour', 'Best IWJ Direction'],
            rows: [
              ['Black', 'Yellow gold, white/silver tone', 'Lusso, Orsola, Pave Hoops, Cadenza M'],
              ['White', 'Yellow gold, white/silver tone, rose gold', 'Cadenza M, Orsola, Laluce'],
              ['Champagne', 'Yellow gold, rose gold', 'Orsola, Concetta Short, Cadenza M'],
              ['Blush or pink', 'Rose gold, yellow gold', 'Farfalla, Alidi Farfalla, Concetta Short'],
              ['Green', 'Yellow gold', 'Orsola, Pave Hoops, Cadenza M'],
              ['Red', 'Yellow gold', 'Orsola, Lusso, Cadenza M'],
              ['Navy', 'White/silver tone, yellow gold', 'Cadenza M, Orsola, Concetta Long'],
              ['Grey', 'White/silver tone', 'Laluce, Cadenza M'],
              ['Brown', 'Yellow gold', 'Cadenza M, Pave Hoops'],
              ['Pastel', 'Rose gold, white/silver tone', 'Farfalla, Concetta Short, Cadenza S'],
              ['Silver', 'White/silver tone', 'Cadenza M, Concetta Long'],
              ['Cream or ivory', 'Yellow gold, rose gold', 'Orsola, Farfalla, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 9: Metal Colour by Dress Style ────────────────────────────────────
  {
    heading: 'Metal Colour by Dress Style',
    content: [
      { type: 'paragraph', text: 'The dress style also matters, not only the colour.' },
      {
        type: 'table',
        headers: ['Dress Style', 'Best Metal Colour Direction', 'Best Earring Direction'],
        rows: [
          ['Satin dress', 'Match the warmth or coolness of the satin', 'Orsola, Cadenza M'],
          ['Black dress', 'Yellow gold or white/silver tone', 'Lusso, Orsola, Pave Hoops'],
          ['V-neck dress', 'Metal should match outfit colour', 'Orsola, Cadenza M'],
          ['Sweetheart dress', 'Rose gold, yellow gold or soft white tone', 'Farfalla, Orsola, Concetta Short'],
          ['Off-shoulder dress', 'Stronger metal colour can work', 'Orsola, Lusso, Pave Hoops'],
          ['Minimal dress', 'Any metal colour can work if intentional', 'Lusso, Orsola, Cadenza M'],
          ['Detailed dress', 'Keep metal colour simple', 'Cadenza M, Cadenza S, Amadea'],
          ['Party dress', 'Yellow gold or white/silver tone', 'Lusso, Pave Hoops, Orsola'],
          ['Wedding guest dress', 'Match dress colour and formality', 'Orsola, Cadenza M, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for Sweetheart Neckline', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },
    ],
  },

  // ── Section 10: Metal Colour by Skin Tone and Wardrobe ───────────────────────
  {
    heading: 'Metal Colour by Skin Tone and Wardrobe',
    content: [
      {
        type: 'paragraph',
        text: 'Many shoppers ask whether gold, white or rose gold is better for their skin tone. Skin tone can help, but wardrobe is often more practical.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold often looks warm and rich. White or silver tone looks crisp and bright. Rose gold can look soft and romantic. But the best everyday choice is usually the metal colour that matches the jewellery and clothes the person already wears most often.',
      },
      {
        type: 'table',
        headers: ['Style Clue', 'Metal Colour to Consider'],
        rows: [
          ['Mostly warm outfits', 'Yellow gold'],
          ['Mostly black, white, grey or navy outfits', 'White/silver tone or yellow gold'],
          ['Mostly blush, cream, pink or soft colours', 'Rose gold or yellow gold'],
          ['Mostly minimal outfits', 'White/silver tone or yellow gold'],
          ['Romantic wardrobe', 'Rose gold'],
          ['Classic wardrobe', 'Yellow gold or white/silver tone'],
          ['Bold party wardrobe', 'Yellow gold or white/silver tone'],
          ['Mixed jewellery collection', 'Mixed metals or choose by outfit'],
        ],
      },
      {
        type: 'paragraph',
        text: 'For product pages, avoid overpromising that one metal colour suits everyone. The more helpful advice is to choose based on the recipient\'s existing jewellery, wardrobe colours and personal style.',
      },
    ],
  },

  // ── Section 11: Metal Colour for Ear Stacks ───────────────────────────────────
  {
    heading: 'Metal Colour for Ear Stacks',
    content: [
      {
        type: 'paragraph',
        text: 'Ear stacks look easiest and most polished when the metal colour is consistent.',
      },
      {
        type: 'paragraph',
        text: 'A yellow gold stack feels warm and classic. A white or silver-tone stack feels clean and modern. A rose gold stack feels soft and romantic. Mixed metals can look stylish, but they need intention.',
      },
      {
        type: 'table',
        headers: ['Ear Stack Goal', 'Best Metal Colour Direction', 'Product Combination'],
        rows: [
          ['Simple everyday stack', 'One metal colour', 'Cadenza S + Amadea'],
          ['Minimalist stack', 'White/silver tone or yellow gold', 'Cadenza S + Laluce'],
          ['Romantic stack', 'Rose gold or yellow gold', 'Farfalla + Cadenza S'],
          ['Wedding stack', 'Match outfit colour', 'Orsola + Cadenza S'],
          ['Party stack', 'Yellow gold or white/silver tone', 'Lusso + Cadenza S'],
          ['Hoop stack', 'Match hoop and stud colour', 'Pave Hoops + Cadenza S'],
          ['Giftable stack', 'One consistent metal colour', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
     
    ],
  },

  // ── Section 12: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Metal Colour Need',
    content: [
      { type: 'subheading', text: 'For the Safest Classic Metal Choice' },
      { type: 'paragraph', text: 'Choose yellow gold lab-grown diamond earrings if the shopper wears warm jewellery often. Cadenza M, Orsola, Pave Hoops and Farfalla are strong yellow gold styling directions.' },
      { type: 'subheading', text: 'For Clean Modern Styling' },
      { type: 'paragraph', text: 'Choose white or silver-tone earrings when the shopper prefers clean, bright jewellery. Cadenza S, Cadenza M, Laluce, Amadea and Concetta Long are strong white/silver-tone styling directions.' },
      { type: 'subheading', text: 'For Romantic Gift Styling' },
      { type: 'paragraph', text: 'Choose rose gold earrings when the gift should feel softer and more personal. Farfalla, Alidi Farfalla, Concetta Short, Orsola and Cadenza S are strong rose gold styling directions.' },
      { type: 'subheading', text: 'For Wedding Guest Jewellery' },
      { type: 'paragraph', text: 'Choose metal colour based on the outfit. Gold for champagne, green, red and warm dresses; white/silver tone for navy, black and cool dresses; rose gold for blush, pastel and romantic dresses.' },
      { type: 'subheading', text: 'For Party Earrings' },
      { type: 'paragraph', text: 'Choose yellow gold or white/silver tone for stronger party styling. Lusso, Pave Hoops, Orsola and Cadenza M are strong party products.' },
      { type: 'subheading', text: 'For Ear Stacks' },
      { type: 'paragraph', text: 'Choose one metal colour across the stack first. Start with Cadenza S and Amadea, then add Laluce, Farfalla, Pave Hoops, Orsola or Lusso depending on the outfit.' },
    ],
  },

  // ── Section 13: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Metal Colour Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best starter earring in any metal colour', 'Simple, stackable and easy to gift'],
          ['Cadenza M diamond stud earrings', 'Best classic metal comparison product', 'Works in gold, white/silver tone or rose gold styling'],
          ['Amadea Huggie earrings', 'Best everyday stack shape', 'Strong when matched with studs in the same metal colour'],
          ['Laluce minimalist diamond earrings', 'Best clean metal styling piece', 'Strong for white/silver tone or minimal gold looks'],
          ['Pave Hoops', 'Best shape-led metal piece', 'Strong in gold or white/silver tone for parties and outfits'],
          ['Farfalla butterfly earrings', 'Best romantic metal choice', 'Strong in rose gold or yellow gold'],
          ['Alidi Farfalla butterfly earrings', 'Best gift-led romantic direction', 'Strong for rose gold and soft outfit styling'],
          ['Orsola drop earrings', 'Best occasion metal piece', 'Works with satin, wedding guest and evening looks'],
          ['Concetta Short earrings', 'Best delicate romantic drop', 'Strong for champagne, blush and bridesmaid looks'],
          ['Concetta Long earrings', 'Best formal metal styling piece', 'Strong for white/silver tone or refined gold styling'],
          ['Lusso bold statement earrings', 'Best bold metal statement', 'Strong for yellow gold or white/silver party styling'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Choose your metal colour by how you want the jewellery to feel. Pick yellow gold for warmth, white or silver tone for clean sparkle, and rose gold for romantic softness. For gifts, match the metal colour the recipient already wears most often.',
      },
    ],
  },

  // ── Section 14: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Metal Colour Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing a metal colour only because it is trending. The better choice is usually the metal colour that matches the wearer\'s wardrobe and existing jewellery.' },
      { type: 'paragraph', text: 'Another mistake is mixing metals in an ear stack without intention. Mixed metals can look stylish, but a single metal colour is easier to make polished.' },
      { type: 'paragraph', text: 'A third mistake is choosing rose gold when the recipient only wears yellow gold or white/silver tone. Rose gold is beautiful, but it is more personal and should match their style.' },
      { type: 'paragraph', text: 'Another mistake is choosing white/silver tone only for formal looks. White-tone earrings can also look very modern for everyday and minimalist outfits.' },
      { type: 'paragraph', text: 'Finally, do not choose metal colour separately from outfit colour. A black dress, satin dress, green dress, red dress or blush dress can all change which metal colour looks best.' },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 15: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Metal Colour Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing gold, white or rose gold earrings, ask:' },
      {
        type: 'bullet-list',
        items: [
          'What metal colour do I already wear most often?',
          'Is this for everyday wear, gifts, weddings or parties?',
          'What colour outfit will the earrings be worn with?',
          'Do I want the look to feel warm, clean or romantic?',
          'Is the recipient a yellow gold, silver-tone or rose gold person?',
          'Will the earrings be worn alone or in an ear stack?',
          'Should all earrings in the stack match?',
          'Does the dress colour feel warm, cool or soft?',
          'Does the occasion need classic, formal, romantic or bold styling?',
          'Can this metal colour work with more than one outfit?',
          'Are the earrings easy to care for and store?',
          'Does the metal colour support the lab-grown diamond sparkle?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose the metal colour the wearer already owns most. That is usually the safest answer.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Which is better, gold or white gold diamond earrings?',
    answer: 'Gold earrings feel warmer and more classic, while white or silver-tone earrings feel cleaner and more modern. The better choice depends on the wearer\'s usual jewellery and outfit colours.',
  },
  {
    question: 'Are rose gold diamond earrings still popular?',
    answer: 'Rose gold earrings are still a strong choice for romantic styling, gifts, blush outfits, champagne dresses and soft feminine looks.',
  },
  {
    question: 'What metal colour is best for everyday diamond earrings?',
    answer: 'The best everyday metal colour is usually the one the wearer already wears most often. Yellow gold feels classic, white/silver tone feels clean, and rose gold feels soft.',
  },
  {
    question: 'What metal colour is best for diamond earrings as a gift?',
    answer: 'For gifts, match the recipient\'s existing jewellery. If they wear mostly gold, choose yellow gold. If they wear silver or white-tone jewellery, choose white/silver tone. If they like soft romantic styles, rose gold can work well.',
  },
  {
    question: 'What metal colour looks best with a black dress?',
    answer: 'Yellow gold and white/silver tone both look excellent with a black dress. Yellow gold feels warmer, while white/silver tone feels cleaner and sharper.',
  },
  {
    question: 'What metal colour looks best with a satin dress?',
    answer: 'It depends on the satin colour. Yellow gold works well with champagne, green, red and black satin. White/silver tone works well with navy, grey and cool satin. Rose gold works well with blush and pink satin.',
  },
  {
    question: 'What metal colour is best for wedding guest earrings?',
    answer: 'Choose based on the outfit. Gold works well with warm dresses, white/silver tone works well with cool and formal dresses, and rose gold works well with blush or romantic dresses.',
  },
  {
    question: 'Can you mix gold, white and rose gold earrings?',
    answer: 'Yes, mixed metals can work, especially in ear stacks, but they should look intentional. A single metal colour is easier to style.',
  },
  {
    question: 'Are lab-grown diamonds better in white metal or gold?',
    answer: 'Lab-grown diamonds can look beautiful in any metal colour. White/silver tone gives a clean bright look, yellow gold gives warmth, and rose gold gives softness.',
  },
  {
    question: 'What IWantJewels earrings are best for comparing metal colours?',
    answer: 'Cadenza S, Cadenza M, Amadea, Orsola, Farfalla, Pave Hoops and Lusso are strong products to show across different metal colour styling needs.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Gold, white and rose gold earrings all work beautifully with lab-grown diamonds, but each one creates a different mood. Choose yellow gold for warmth, white or silver tone for clean sparkle, and rose gold for romantic softness.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want wearable diamond sparkle in the metal colour that matches your style. Choose Cadenza S for a safe everyday start, Cadenza M for classic sparkle, Amadea for ear stacks, Orsola for occasion styling, Farfalla for romantic gifts, Pave Hoops for shape and Lusso for bold party looks.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings by Metal Colour',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Everyday Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read Diamond Ear Stack Ideas',
  tertiaryHref: '/resources/earring-style-guides/diamond-ear-stack-ideas',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'gold-vs-white-vs-rose-gold-diamond-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'gold-vs-white-vs-rose-gold-diamond-earrings', 3)
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
