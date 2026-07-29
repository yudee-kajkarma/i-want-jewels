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
  title: 'Gold vs White vs Rose Gold Diamond Earrings',
  description:
    'Compare gold, white and rose gold lab grown diamond earrings. Choose the best metal colour for everyday wear, gifts, weddings and styling.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-100.jpg',
  title: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings:',
  subtitle: 'Metal Colour Guide',
  paragraphs: [
    'The metal colour of your lab-grown diamond earrings changes the entire feeling of the jewellery. The same diamond earring design can look warm and classic in yellow gold, clean and modern in white or silver tones, and soft and romantic in rose gold.',
    'This resource helps shoppers choose the best metal colour for lab-grown diamond earrings based on personal style, skin tone, outfit colours, gifting purpose, wedding styling and everyday wear. It also guides users toward IWantJewels product directions such as Cadenza S, Cadenza M, Amadea Huggie, Laluce, Pave Hoops, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Concetta Long and Lusso bold statement earrings.',
    'For IWantJewels, this page is important because many shoppers do not only ask "which diamond earrings should I buy?" They ask "should I choose gold, silver, white gold or rose gold?" This guide helps answer that decision before sending them to product or collection pages.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Compare yellow gold, white/silver tone and rose gold lab-grown diamond earrings',
    'Choose the best metal colour for everyday wear',
    'Pick the right finish for gifts, birthdays, anniversaries and bridesmaids',
    'Match earrings to skin tone, wardrobe colours and existing jewellery',
    'Choose metal colour for wedding guest outfits and occasion styling',
    'Understand which metal colours feel classic, modern, romantic or bold',
    'Find IWantJewels product recommendations by metal colour and styling need',
    'Plan image blocks, product modules, CTA sections and internal links for the page',
  ],
  image: '/blog-images/blog-image-102.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Metal Colour Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main decision tool.' },
      {
        type: 'table',
        headers: ['If You Want', 'Best Metal Colour', 'Style Feeling', 'Product Direction'],
        rows: [
          ['Classic everyday earrings', 'Yellow gold', 'Warm, timeless, easy', 'Cadenza S, Cadenza M'],
          ['Clean modern sparkle', 'White or silver tone', 'Bright, polished, minimal', 'Cadenza S, Laluce'],
          ['Romantic gift earrings', 'Rose gold', 'Soft, personal, feminine', 'Farfalla, Alidi Farfalla'],
          ['Wedding guest earrings', 'Yellow gold or white/silver tone', 'Elegant and polished', 'Orsola, Concetta Long'],
          ['Minimalist jewellery', 'White/silver tone or yellow gold', 'Simple and refined', 'Laluce, Cadenza S'],
          ['Warm outfit styling', 'Yellow gold', 'Rich and classic', 'Cadenza M, Pave Hoops'],
          ['Soft pastel outfits', 'Rose gold', 'Gentle and romantic', 'Farfalla, Concetta Short'],
          ['Black dress styling', 'Yellow gold, white/silver tone or bold sparkle', 'Contrast and shine', 'Orsola, Lusso'],
          ['Ear stacks', 'Match existing metal colour', 'Balanced and intentional', 'Cadenza S, Amadea, Laluce'],
          ['Statement party styling', 'Yellow gold or white/silver tone', 'Strong and visible', 'Lusso, Orsola'],
        ],
      },
    ],
  },
  {
    heading: 'Yellow Gold Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Yellow gold lab-grown diamond earrings feel warm, classic and easy to wear. They are one of the safest choices for everyday jewellery because yellow gold works well with many wardrobes and skin tones.' },
      { type: 'paragraph', text: 'Yellow gold is especially strong if the wearer already owns gold jewellery. If someone wears a gold watch, gold rings, gold necklaces or warm-toned accessories, yellow gold earrings will usually feel natural in their collection.' },
      { type: 'paragraph', text: 'Yellow gold also pairs beautifully with black, cream, brown, green, red, champagne and warm neutral outfits. It can make diamond earrings feel richer and slightly more traditional without looking old-fashioned.' },
      { type: 'paragraph', text: 'For IWantJewels, yellow gold is a strong direction for Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Pave Hoops, Orsola drop earrings and Lusso bold statement earrings.' },
      { type: 'see-also', text: 'Gold lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'White or Silver-Tone Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'White or silver-tone lab-grown diamond earrings feel clean, bright and modern. They are a good choice for shoppers who prefer minimal styling, cool-toned outfits or jewellery that feels crisp rather than warm.' },
      { type: 'paragraph', text: 'This finish works especially well with black, white, navy, grey, silver, blue and cool pastel outfits. It also suits people who already wear silver watches, white-toned rings or cooler jewellery finishes.' },
      { type: 'paragraph', text: 'White or silver-tone earrings can make lab-grown diamonds look very bright because the metal does not add warmth around the stone. This can be useful for minimalist outfits, office styling, black dresses and clean evening looks.' },
      { type: 'paragraph', text: 'For IWantJewels, white or silver-tone styling can work well for Cadenza S, Cadenza M, Laluce minimalist diamond earrings, Pave Hoops and Orsola drop earrings depending on the available product finish.' },
      { type: 'see-also', text: 'Silver diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Rose Gold Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Rose gold lab-grown diamond earrings feel soft, romantic and personal. They are especially strong for gifts because rose gold often feels warmer and more emotional than white or silver tones.' },
      { type: 'paragraph', text: 'Rose gold works beautifully with blush, pink, cream, champagne, soft green, beige, floral prints and romantic outfits. It can also be a good choice for birthday gifts, anniversary gifts, bridesmaid gifts and meaningful jewellery moments.' },
      { type: 'paragraph', text: 'Rose gold is not always the safest option if the recipient never wears rose-toned jewellery. But when it suits the person\'s style, it can make the gift feel more thoughtful.' },
      { type: 'paragraph', text: 'For IWantJewels, rose gold styling is especially strong for butterfly earrings, romantic drop earrings and soft gift-led pieces. Farfalla butterfly earrings and Alidi Farfalla butterfly earrings are natural fits for this direction. Orsola drop earrings and Concetta Short earrings can also feel romantic in a rose-toned finish.' },
      { type: 'see-also', text: 'Rose gold lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Best Metal Colour for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'For everyday wear, the best metal colour is usually the one that matches the jewellery the person already wears most often.' },
      { type: 'paragraph', text: 'If they wear yellow gold daily, choose yellow gold lab-grown diamond earrings. If they wear silver or white-toned pieces daily, choose white or silver-tone earrings. If they like soft, romantic jewellery and often wear warm pink or blush tones, rose gold can work beautifully.' },
      {
        type: 'table',
        headers: ['Daily Style', 'Best Metal Colour', 'Product Direction'],
        rows: [
          ['Classic everyday style', 'Yellow gold', 'Cadenza S, Cadenza M'],
          ['Minimal everyday style', 'White/silver tone or yellow gold', 'Laluce, Cadenza S'],
          ['Modern ear stack style', 'Match existing earrings', 'Amadea, Cadenza S, Laluce'],
          ['Soft feminine style', 'Rose gold or yellow gold', 'Farfalla, Alidi Farfalla'],
          ['Workwear style', 'Yellow gold or white/silver tone', 'Cadenza S, Cadenza M, Amadea'],
          ['Casual luxury style', 'Yellow gold hoops or huggies', 'Pave Hoops, Amadea'],
        ],
      },
      { type: 'paragraph', text: 'Everyday earrings should not feel difficult to style. The safest daily choice is usually a metal colour that already fits the wearer\'s routine.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Best Metal Colour for Gifts',
    content: [
      { type: 'paragraph', text: 'For gifts, metal colour is very important because it shows whether you understand the recipient\'s style.' },
      { type: 'paragraph', text: 'The safest rule is to check what they already wear. If most of their jewellery is yellow gold, choose yellow gold. If they wear silver or white-toned jewellery, choose white or silver tone. If they like romantic, soft or feminine pieces, rose gold may be a thoughtful choice.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-104.jpg',
        content: [
          {
            type: 'table',
            headers: ['Gift Type', 'Best Metal Colour', 'Best Earring Direction'],
            rows: [
              ['Safe birthday gift', 'Yellow gold or white/silver tone', 'Cadenza S, Cadenza M'],
              ['Romantic gift', 'Rose gold or yellow gold', 'Farfalla, Orsola'],
              ['Anniversary gift', 'Yellow gold, rose gold or elegant white/silver tone', 'Cadenza M, Orsola, Farfalla'],
              ['Bridesmaid gift', 'Match dress and wedding palette', 'Cadenza S, Concetta Short'],
              ['Modern gift', 'White/silver tone or yellow gold', 'Amadea, Pave Hoops'],
              ['Meaningful gift', 'Rose gold or yellow gold', 'Farfalla, Alidi Farfalla'],
              ['Party-lover gift', 'Yellow gold or white/silver tone', 'Lusso, Orsola'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Best Metal Colour for Weddings',
    content: [
      { type: 'paragraph', text: 'Wedding jewellery should match the outfit, dress code and overall mood of the event.' },
      { type: 'paragraph', text: 'Yellow gold works beautifully for warm-toned outfits, champagne dresses, green dresses, red dresses and classic evening styling. White or silver-tone earrings work well with black, navy, silver, grey, white and cool-toned outfits. Rose gold is lovely for pastel, blush, floral and romantic dresses.' },
      {
        type: 'table',
        headers: ['Wedding Outfit', 'Best Metal Colour', 'Product Direction'],
        rows: [
          ['Black dress', 'Yellow gold or white/silver tone', 'Orsola, Lusso, Cadenza M'],
          ['Champagne dress', 'Yellow gold', 'Orsola, Concetta Long'],
          ['Pastel dress', 'Rose gold or yellow gold', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Green dress', 'Yellow gold or rose gold', 'Cadenza M, Orsola'],
          ['Navy dress', 'White/silver tone or yellow gold', 'Cadenza M, Orsola'],
          ['Red dress', 'Yellow gold', 'Cadenza M, Orsola'],
          ['Floral dress', 'Rose gold, yellow gold or simple studs', 'Farfalla, Cadenza S'],
          ['Silver or grey dress', 'White/silver tone', 'Laluce, Cadenza M'],
        ],
      },
      { type: 'paragraph', text: 'For wedding guests, the earrings should feel polished but not bridal. If the outfit is simple, choose drops or more visible sparkle. If the outfit is detailed, choose studs or smaller earrings.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Best Metal Colour by Outfit Colour',
    content: [
      { type: 'paragraph', text: 'This section helps shoppers match earrings to their wardrobe.' },
      {
        type: 'table',
        headers: ['Outfit Colour', 'Best Metal Colour', 'Styling Note'],
        rows: [
          ['Black', 'Yellow gold, white/silver tone or bold sparkle', 'All work; choose based on mood'],
          ['White', 'Yellow gold for warmth, white/silver tone for clean styling', 'Keep it polished'],
          ['Cream or ivory', 'Yellow gold or rose gold', 'Warmer metals feel softer'],
          ['Brown or beige', 'Yellow gold', 'Adds richness'],
          ['Navy', 'White/silver tone or yellow gold', 'Both feel elegant'],
          ['Grey', 'White/silver tone', 'Keeps the look cool and clean'],
          ['Red', 'Yellow gold', 'Balances warmth'],
          ['Green', 'Yellow gold or rose gold', 'Adds warmth and depth'],
          ['Pink or blush', 'Rose gold or yellow gold', 'Soft and romantic'],
          ['Champagne', 'Yellow gold', 'Matches the warmth beautifully'],
          ['Floral print', 'Small studs, rose gold or yellow gold', 'Avoid overcomplicating the look'],
          ['Satin outfit', 'Drops in gold or white/silver tone', 'Adds movement and shine'],
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Best Metal Colour by Jewellery Style',
    content: [
      { type: 'paragraph', text: 'Different earring styles can feel very different depending on the metal colour.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-106.jpg',
        content: [
          {
            type: 'table',
            headers: ['Earring Style', 'Yellow Gold', 'White / Silver Tone', 'Rose Gold'],
            rows: [
              ['Stud earrings', 'Classic and warm', 'Clean and bright', 'Soft and romantic'],
              ['Huggies', 'Everyday and stylish', 'Modern and minimal', 'Feminine and gentle'],
              ['Hoops', 'Rich and polished', 'Sleek and contemporary', 'Soft and playful'],
              ['Drop earrings', 'Elegant and warm', 'Refined and bright', 'Romantic and delicate'],
              ['Butterfly earrings', 'Meaningful and warm', 'More modern', 'Most romantic'],
              ['Bold statement earrings', 'Strong and glamorous', 'Crisp and high-impact', 'Softer statement look'],
              ['Minimalist earrings', 'Warm simplicity', 'Clean minimalism', 'Gentle softness'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For classic gifts, yellow gold or white/silver tone usually works best. For romantic gifts, rose gold and butterfly earrings are a strong combination. For party looks, yellow gold or white/silver tone can feel more dramatic.' },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Does Skin Tone Matter When Choosing Metal Colour?',
    content: [
      { type: 'paragraph', text: 'Skin tone can help, but it should not be the only rule.' },
      { type: 'paragraph', text: 'Yellow gold often looks beautiful on warm and neutral skin tones. White or silver tones often suit cool-toned styling. Rose gold can flatter many skin tones because it sits between warm and soft pink tones.' },
      { type: 'paragraph', text: 'But personal style matters more than strict rules. Someone with cool skin may still love yellow gold. Someone with warm skin may still prefer silver. The best clue is the jewellery they already wear.' },
      { type: 'paragraph', text: 'If buying for yourself, choose the metal colour that makes you feel most natural. If buying as a gift, choose the metal colour the person already owns.' },
    ],
  },
  {
    heading: 'Can You Mix Gold, White and Rose Gold Earrings?',
    content: [
      { type: 'paragraph', text: 'Yes, you can mix metals, especially in ear stacks, but it should look intentional.' },
      { type: 'paragraph', text: 'Mixing metals works best when the earring shapes are balanced. For example, a yellow gold stud with a white/silver huggie can look modern if the rest of the jewellery is simple. Rose gold can also be mixed softly with yellow gold, especially in romantic styling.' },
      { type: 'paragraph', text: 'However, for gifts, matching the recipient\'s usual metal colour is safer. Mixed metals are better for someone who already likes creative styling.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Product Pathways by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical shopping guide.' },
      { type: 'subheading', text: 'For Classic Yellow Gold Styling' },
      { type: 'paragraph', text: 'Choose Cadenza S for subtle everyday shine, Cadenza M for more visible classic sparkle, Pave Hoops for shape, or Orsola for occasion styling.' },
      { type: 'subheading', text: 'For Clean White or Silver-Tone Styling' },
      { type: 'paragraph', text: 'Choose Laluce for minimalist styling, Cadenza S for simple studs, Cadenza M for visible sparkle, or Orsola for a polished evening look.' },
      { type: 'subheading', text: 'For Romantic Rose Gold Styling' },
      { type: 'paragraph', text: 'Choose Farfalla or Alidi Farfalla for meaningful gifts, Concetta Short for soft occasion styling, or Orsola for romantic evening outfits.' },
      { type: 'subheading', text: 'For Ear Stacks' },
      { type: 'paragraph', text: 'Choose one metal direction for a cleaner look. Cadenza S with Amadea Huggie earrings is a strong everyday stack. Add Laluce for a softer finish.' },
      { type: 'subheading', text: 'For Gifts' },
      { type: 'paragraph', text: 'Choose Cadenza M for a classic diamond gift, Farfalla for a meaningful gift, Amadea for a modern gift, or Orsola for a romantic occasion gift.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Metal Colour Direction', 'Best For'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Yellow gold, white/silver tone', 'Everyday wear, first diamond earrings'],
          ['Cadenza M diamond stud earrings', 'Yellow gold, white/silver tone', 'Gifts, workwear, visible daily sparkle'],
          ['Amadea Huggie earrings', 'Yellow gold, white/silver tone', 'Ear stacks and modern styling'],
          ['Laluce minimalist diamond earrings', 'White/silver tone, yellow gold', 'Minimalist outfits and quiet daily jewellery'],
          ['Pave Hoops', 'Yellow gold, white/silver tone', 'Hoop styling, casual sparkle and parties'],
          ['Farfalla butterfly earrings', 'Rose gold, yellow gold', 'Meaningful gifts and romantic styling'],
          ['Alidi Farfalla butterfly earrings', 'Rose gold, yellow gold', 'Birthdays, anniversaries and symbolic gifts'],
          ['Orsola drop earrings', 'Yellow gold, white/silver tone, rose gold', 'Wedding guests, dinners and evening outfits'],
          ['Concetta Short earrings', 'Rose gold, yellow gold', 'Soft occasion styling'],
          ['Concetta Long earrings', 'Yellow gold, white/silver tone', 'Formal and refined evening looks'],
          ['Lusso bold statement earrings', 'Yellow gold, white/silver tone', 'Party looks and strong sparkle'],
        ],
      },
      { type: 'paragraph', text: 'Choose metal colour by the way the earrings will be worn. Pick yellow gold for classic warmth, white or silver tones for clean modern sparkle, and rose gold for romantic gifts or soft styling.' },
    ],
  },
  {
    heading: 'Common Metal Colour Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing a metal colour only because it looks good in a product photo. The better question is whether it matches the wearer\'s real jewellery and wardrobe.' },
      { type: 'paragraph', text: 'Another mistake is buying rose gold for someone who only wears yellow gold or silver. Rose gold can be beautiful, but it is more personal and less universally safe.' },
      { type: 'paragraph', text: 'A third mistake is mixing too many metal colours in an ear stack without a plan. Mixed metals can look stylish, but they should feel intentional.' },
      { type: 'paragraph', text: 'Another mistake is choosing white or silver tones when the person\'s entire wardrobe and jewellery collection is warm-toned. Yellow gold may be easier for them to wear.' },
      { type: 'paragraph', text: 'Finally, do not ignore the occasion. Everyday earrings, wedding earrings and romantic gifts may need different metal-colour choices.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Final Metal Colour Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing gold, white/silver tone or rose gold lab-grown diamond earrings, ask:' },
      {
        type: 'bullet-list',
        items: [
          'What metal colour does the person already wear most often?',
          'Is this for everyday wear, a gift, a wedding or a party?',
          'Does the outfit palette feel warm, cool or romantic?',
          'Should the earrings feel classic, modern or soft?',
          'Will the earrings be worn alone or in an ear stack?',
          'Does the metal colour match other jewellery?',
          'Is rose gold appropriate for the person\'s style?',
          'Would yellow gold be safer?',
          'Would white or silver tone feel cleaner?',
          'Are the stones genuine lab-grown diamonds?',
          'Does the design feel wearable beyond one outfit?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose the metal colour the person already wears. That is usually the safest and most useful choice.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Which is better for diamond earrings, gold or white gold?',
    answer: 'Neither is automatically better. Yellow gold feels warm and classic, while white or silver tones feel clean and modern. The best choice depends on the wearer\'s style and existing jewellery.',
  },
  {
    question: 'Are rose gold diamond earrings good for gifts?',
    answer: 'Yes, rose gold diamond earrings can be beautiful gifts because they feel soft, romantic and personal. They are especially strong for birthdays, anniversaries and meaningful gifts.',
  },
  {
    question: 'What metal colour is best for everyday diamond earrings?',
    answer: 'The best metal colour for everyday earrings is usually the one the person already wears most often. Yellow gold is classic, white or silver tone is modern, and rose gold is softer and more romantic.',
  },
  {
    question: 'What metal colour is best for wedding guest earrings?',
    answer: 'Yellow gold works well with warm outfits, champagne dresses and green dresses. White or silver tones work well with black, navy, grey and cool-toned outfits. Rose gold works well with pastel and romantic dresses.',
  },
  {
    question: 'Should I choose yellow gold or rose gold earrings?',
    answer: 'Choose yellow gold for a safer classic look. Choose rose gold if the person likes soft, romantic jewellery or already wears rose-toned pieces.',
  },
  {
    question: 'Do white or silver-tone earrings make diamonds look brighter?',
    answer: 'White or silver-tone settings can make diamonds look very clean and bright because the metal does not add warmth around the stone.',
  },
  {
    question: 'Can I mix gold and silver earrings in an ear stack?',
    answer: 'Yes, you can mix metals, especially in ear stacks, but it should look intentional. If buying as a gift, matching the person\'s usual metal colour is safer.',
  },
  {
    question: 'What metal colour is best for a black dress?',
    answer: 'Yellow gold, white/silver tone and bold diamond earrings can all work with a black dress. Yellow gold adds warmth, while white/silver tone creates a cleaner contrast.',
  },
  {
    question: 'What metal colour is best for butterfly earrings?',
    answer: 'Rose gold and yellow gold usually work beautifully for butterfly earrings because they support the soft, meaningful and feminine feeling of the design.',
  },
  {
    question: 'What is the safest metal colour for a jewellery gift?',
    answer: 'The safest metal colour is the one the recipient already wears. If you are unsure, yellow gold or classic white/silver tone is usually safer than rose gold.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Metal colour changes how lab-grown diamond earrings feel. Yellow gold is warm and classic, white or silver tones are clean and modern, and rose gold is soft and romantic. The best choice depends on the wearer\'s wardrobe, existing jewellery, outfit colours and gifting purpose.',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in wearable demi-fine designs. Choose Cadenza S or Cadenza M for classic everyday earrings, Amadea for modern stacking, Farfalla for romantic gifts, Orsola for wedding guest styling and Lusso for bold evening sparkle.',
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
  const article = getArticleBySlug('lab-grown-diamond-guides', 'gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings', 3)
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
