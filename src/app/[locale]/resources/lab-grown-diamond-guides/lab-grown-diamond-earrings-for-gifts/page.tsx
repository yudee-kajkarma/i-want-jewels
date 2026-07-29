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
  title: 'Lab Grown Diamond Earrings for Gifts',
  description:
    'Choose lab grown diamond earrings for birthday gifts, anniversary gifts, bridesmaids, romantic gifts and everyday jewellery gifts.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-100.jpg',
  title: 'Lab-Grown Diamond Earrings for Gifts:',
  subtitle: 'Birthday, Anniversary & Bridesmaid Guide',
  paragraphs: [
    'Lab-grown diamond earrings make beautiful gifts because they feel special, wearable and easier to choose than many other jewellery pieces. Rings need sizing, necklaces depend on chain preference, and bracelets depend on wrist fit. Earrings are usually simpler to gift, especially when you choose classic studs, delicate huggies, elegant drops or meaningful butterfly designs.',
    'This resource helps shoppers choose the right lab-grown diamond earrings based on the occasion, the recipient\'s style, the level of sparkle, and how personal the gift should feel. It also guides users toward IWantJewels pieces such as Cadenza S, Cadenza M, Amadea Huggie, Laluce, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Concetta Long and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings for Gifts',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose lab-grown diamond earrings for birthdays, anniversaries, bridesmaids and romantic gifts',
    'Decide between studs, huggies, drops, butterfly earrings, hoops and bold statement earrings',
    'Pick a safe gift when you are unsure of someone\'s style',
    'Choose a more personal gift when the occasion needs meaning',
    'Match earrings to the recipient\'s wardrobe and jewellery habits',
    'Understand which earring styles feel classic, romantic, modern or bold',
    'Find IWantJewels product recommendations by gift type',
    'Plan image blocks, product modules, CTA sections and internal links for the page',
  ],
  image: '/blog-images/blog-image-82.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Lab-Grown Diamond Earring Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this section near the top as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safe birthday gift', 'Classic studs', 'Cadenza S, Cadenza M'],
          ['More special birthday gift', 'Butterfly earrings or visible studs', 'Farfalla, Alidi Farfalla, Cadenza M'],
          ['Anniversary gift', 'Romantic earrings, drops or butterfly styles', 'Orsola, Farfalla, Alidi Farfalla'],
          ['Bridesmaid gift', 'Simple studs or delicate drops', 'Cadenza S, Cadenza M, Concetta Short'],
          ['Maid of honour gift', 'Medium studs or elegant drops', 'Cadenza M, Orsola'],
          ['First diamond gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Modern jewellery gift', 'Huggies or hoops', 'Amadea Huggie, Pave Hoops'],
          ['Minimalist gift', 'Simple studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Party-loving recipient', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Symbolic gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
        ],
      },
    ],
  },
  {
    heading: 'Why Lab-Grown Diamond Earrings Make Good Gifts',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings are strong gift pieces because they feel meaningful without being too difficult to choose.' },
      { type: 'paragraph', text: 'Earrings are easier than rings because there is no exact size to guess. They are also more flexible than necklaces because they work with many necklines and outfits. A pair of diamond earrings can be worn casually, dressed up for dinner, styled for weddings or kept as a special everyday piece.' },
      { type: 'paragraph', text: 'The lab-grown diamond element also makes the gift feel more elevated than simple fashion jewellery. The recipient gets real diamond sparkle in a design that feels modern, wearable and thoughtful.' },
      { type: 'paragraph', text: 'For IWantJewels, the gift value comes from the mix of lab-grown diamonds, 925 sterling silver, 14kt gold plating and wearable demi-fine design. The jewellery feels special, but it is still made for real outfits and real moments.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'The Safest Lab-Grown Diamond Earrings to Gift',
    content: [
      { type: 'paragraph', text: 'The safest earrings to gift are usually classic studs.' },
      { type: 'paragraph', text: 'Stud earrings work for almost every jewellery style. They are simple enough for daily wear, polished enough for occasions and easy to pair with other pieces. If you do not know the recipient\'s exact taste, studs are usually safer than large hoops, dramatic drops or bold statement earrings.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are best when you want a subtle, everyday gift. Cadenza M diamond stud earrings are better when you want the gift to feel more visible and special without becoming too bold.' },
      { type: 'paragraph', text: 'If the recipient already owns simple studs, huggies or butterfly earrings may feel more personal. Amadea Huggie earrings work well for someone who likes ear stacks, while Farfalla butterfly earrings are stronger when the gift needs meaning.' },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings for Birthday Gifts',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery should feel personal, but still wearable.' },
      { type: 'paragraph', text: 'For a safe birthday gift, choose studs. They are easy to wear and do not require much styling confidence. For a more thoughtful birthday gift, butterfly earrings can work beautifully because the butterfly shape can suggest growth, beauty, change and new beginnings.' },
      { type: 'paragraph', text: 'If the recipient likes modern jewellery, huggies are a good birthday option. If they enjoy dressing up, drop earrings or bold statement earrings may feel more exciting.' },
      {
        type: 'table',
        headers: ['Recipient Style', 'Birthday Gift Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Classic style', 'Diamond studs', 'Cadenza S, Cadenza M'],
          ['Feminine style', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Minimalist style', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern style', 'Huggies or hoops', 'Amadea Huggie, Pave Hoops'],
          ['Occasion dresser', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['First diamond gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings for Anniversary Gifts',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-84.jpg',
        content: [
          { type: 'paragraph', text: 'Anniversary gifts should feel romantic, lasting and thoughtful.' },
          { type: 'paragraph', text: 'Diamond earrings work well because they feel classic without being as formal as an engagement-style purchase. They can be worn often, which makes the gift part of the recipient\'s real life rather than something saved only for special occasions.' },
          { type: 'paragraph', text: 'For anniversaries, Cadenza M diamond stud earrings are a safe and elegant choice. Orsola drop earrings feel more romantic and occasion-ready. Farfalla butterfly earrings or Alidi Farfalla butterfly earrings are stronger if you want the gift to feel symbolic and personal.' },
          { type: 'paragraph', text: 'If the recipient loves dressing up, Concetta Long earrings or Lusso bold statement earrings can make the gift feel more dramatic. If they prefer quiet jewellery, Cadenza S or Laluce may be better.' },
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings for Bridesmaid Gifts',
    content: [
      { type: 'paragraph', text: 'Bridesmaid gifts should be beautiful, wearable and not too difficult to match across different people.' },
      { type: 'paragraph', text: 'Stud earrings are the safest bridesmaid gift because they suit many face shapes, dress styles and personal wardrobes. They also look clean in wedding photos and can be worn after the wedding.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs work well if the bride wants subtle matching earrings. Cadenza M diamond stud earrings are better if the earrings need to show more in photos. Concetta Short earrings are a good option if the dresses are simple and the bride wants a delicate drop. Farfalla or Alidi Farfalla butterfly earrings can feel more personal if the gift is meant to carry meaning.' },
      {
        type: 'table',
        headers: ['Bridesmaid Gift Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Matching bridal party gift', 'Simple studs', 'Cadenza S'],
          ['More visible photo-friendly gift', 'Medium studs', 'Cadenza M'],
          ['Soft romantic wedding look', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Delicate drop earring gift', 'Short drops', 'Concetta Short'],
          ['Gift they can wear again', 'Studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings for Romantic Gifts',
    content: [
      { type: 'paragraph', text: 'Romantic jewellery does not always need to be dramatic. It should feel thoughtful and suited to the person.' },
      { type: 'paragraph', text: 'If the person prefers classic jewellery, diamond studs are usually best. If they like soft, meaningful pieces, butterfly earrings are more personal. If they enjoy dressing up, drop earrings feel more special. If they like modern everyday styling, huggies are a good choice.' },
      { type: 'paragraph', text: 'For romantic gifts, Farfalla butterfly earrings and Alidi Farfalla butterfly earrings are strong because the butterfly design carries emotional meaning. Orsola drop earrings work well for date nights and special dinners. Cadenza M diamond stud earrings are safer if you want a timeless diamond gift.' },
      { type: 'see-also', text: 'Butterfly earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Gifts by Recipient Style',
    content: [
      { type: 'paragraph', text: 'This section should help shoppers who do not know jewellery terms but know the person\'s style.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-86.jpg',
        content: [
          {
            type: 'table',
            headers: ['Recipient Style', 'Best Earring Type', 'Recommended IWJ Direction'],
            rows: [
              ['Minimalist', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
              ['Classic', 'Diamond studs', 'Cadenza S, Cadenza M'],
              ['Romantic', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Orsola'],
              ['Modern', 'Huggies or hoops', 'Amadea Huggie, Pave Hoops'],
              ['Glamorous', 'Drops or bold statement earrings', 'Orsola, Concetta Long, Lusso'],
              ['Everyday dresser', 'Studs or huggies', 'Cadenza S, Amadea'],
              ['Wedding/event lover', 'Drops or visible studs', 'Orsola, Cadenza M'],
              ['Ear-stack lover', 'Studs, huggies and minimalist earrings', 'Cadenza S, Amadea, Laluce'],
            ],
          },
        ],
      },
    ],
  },
  {
    heading: 'Studs vs Huggies vs Drops vs Butterfly Earrings for Gifts',
    content: [
      { type: 'paragraph', text: 'Each earring type gives a different gift feeling.' },
      {
        type: 'table',
        headers: ['Earring Type', 'Gift Feeling', 'Best For'],
        rows: [
          ['Stud earrings', 'Safe, classic, timeless', 'First diamond gift, birthdays, bridesmaids'],
          ['Huggie earrings', 'Modern, easy, stylish', 'Ear-stack lovers, everyday dressers'],
          ['Drop earrings', 'Elegant, occasion-ready', 'Anniversaries, dinners, wedding events'],
          ['Butterfly earrings', 'Personal, symbolic, feminine', 'Birthdays, milestones, romantic gifts'],
          ['Hoop earrings', 'Stylish, shaped, polished', 'Modern jewellery lovers'],
          ['Bold statement earrings', 'Dramatic, confident, party-ready', 'Someone who loves dressing up'],
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose studs. If you want the gift to feel more meaningful, choose butterfly earrings. If the person loves events and outfits, choose drops or bold statement earrings. If they already wear multiple earrings, choose huggies.' },
      { type: 'see-also', text: 'Stud vs drop earrings', href: '#' },
    ],
  },
  {
    heading: 'Gift Earrings by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour changes how the gift feels.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, classic and easy to gift. White or silver tones feel clean, bright and modern. Rose gold feels soft, romantic and personal.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Best Gift Use', 'Style Feeling'],
        rows: [
          ['Yellow gold', 'Classic gifts, birthdays, everyday jewellery', 'Warm, timeless, rich'],
          ['White or silver tone', 'Minimalist gifts, cool-toned wardrobes', 'Clean, polished, modern'],
          ['Rose gold', 'Romantic gifts, anniversaries, soft styling', 'Feminine, warm, personal'],
        ],
      },
      { type: 'paragraph', text: 'The safest way to choose metal colour is to look at what the recipient already wears. If they wear yellow gold daily, choose yellow gold. If they wear silver watches or white-toned jewellery, choose a white or silver finish. If the gift is romantic and their style is soft, rose gold may feel more thoughtful.' },
      { type: 'see-also', text: 'Gold lab-grown diamond earrings guide', href: '#' },
    ],
  },
  {
    heading: 'How Much Should You Spend on Lab-Grown Diamond Earring Gifts?',
    content: [
      { type: 'paragraph', text: 'The right amount depends on the relationship, occasion and how special the gift needs to feel.' },
      { type: 'paragraph', text: 'A birthday gift can be simple and personal. An anniversary gift may need to feel more romantic. Bridesmaid gifts should usually be beautiful but repeatable. A first diamond gift should feel classic and safe.' },
      { type: 'paragraph', text: 'Do not choose only by size or price. A smaller pair of earrings that perfectly matches the person\'s style can feel more valuable than a larger pair they rarely wear.' },
      { type: 'paragraph', text: 'For most gift buyers, the best approach is to match the product to the occasion:' },
      {
        type: 'table',
        headers: ['Gift Situation', 'Best Direction'],
        rows: [
          ['Safe everyday gift', 'Stud earrings'],
          ['More meaningful gift', 'Butterfly earrings'],
          ['More romantic gift', 'Drops or butterfly earrings'],
          ['More modern gift', 'Huggies'],
          ['More dramatic gift', 'Bold statement earrings'],
          ['Group bridesmaid gift', 'Simple studs or delicate drops'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '#' },
    ],
  },
  {
    heading: 'Product Pathways by Gift Need',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical shopping guide.' },
      { type: 'subheading', text: 'For a Safe Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs if you want something subtle and easy to wear. Choose Cadenza M diamond stud earrings if you want the gift to feel more visible and special.' },
      { type: 'subheading', text: 'For a Meaningful Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. The butterfly shape makes the gift feel more personal and symbolic.' },
      { type: 'subheading', text: 'For a Romantic Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings for elegance, Farfalla for symbolism, or Cadenza M for a timeless diamond gift.' },
      { type: 'subheading', text: 'For a Bridesmaid Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S for subtle matching earrings, Cadenza M for more visible sparkle, or Concetta Short for a delicate drop style.' },
      { type: 'subheading', text: 'For a Modern Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings or Pave Hoops. These are better for someone who likes layered jewellery, ear stacks or a more contemporary look.' },
      { type: 'subheading', text: 'For a Party-Lover Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings for elegant sparkle or Lusso bold statement earrings for a stronger jewellery moment.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Gift Type', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Safe first diamond gift', 'Simple, subtle and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'Classic visible gift', 'More sparkle while staying timeless'],
          ['Amadea Huggie earrings', 'Modern gift', 'Easy to style alone or in an ear stack'],
          ['Laluce minimalist diamond earrings', 'Minimalist gift', 'Soft, quiet and easy to pair with outfits'],
          ['Pave Hoops', 'Stylish everyday gift', 'Adds shape and sparkle without feeling too formal'],
          ['Farfalla butterfly earrings', 'Meaningful birthday or romantic gift', 'Symbolic, feminine and personal'],
          ['Alidi Farfalla butterfly earrings', 'Personal milestone gifts', 'Soft butterfly design with emotional appeal'],
          ['Orsola drop earrings', 'Anniversary or wedding-event gift', 'Elegant, polished and occasion-ready'],
          ['Concetta Short earrings', 'Bridesmaid or soft occasion gift', 'Delicate drop option'],
          ['Concetta Long earrings', 'Formal evening gift', 'Refined and elongated'],
          ['Lusso bold statement earrings', 'Party or statement gift', 'Strong sparkle for someone who loves dressing up'],
        ],
      },
      { type: 'paragraph', text: 'Choose the gift by personality, not only by price. Pick Cadenza S or Cadenza M for a safe diamond gift, Farfalla for meaning, Amadea for modern styling, Orsola for romance and Lusso for someone who loves bold sparkle.' },
    ],
  },
  {
    heading: 'Common Gift-Buying Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing earrings that match your taste instead of the recipient\'s. Look at what they already wear before choosing.' },
      { type: 'paragraph', text: 'Another mistake is buying the biggest or sparkliest option without thinking about lifestyle. Someone who wears simple jewellery may prefer studs over bold statement earrings.' },
      { type: 'paragraph', text: 'A third mistake is ignoring metal colour. If someone always wears yellow gold, a white or silver-tone gift may not fit their wardrobe.' },
      { type: 'paragraph', text: 'Another mistake is choosing a gift that feels too occasion-specific. A good jewellery gift should be wearable beyond one event.' },
      { type: 'paragraph', text: 'Finally, do not assume every sparkly earring is diamond. If you want real diamond jewellery, check that the piece uses lab-grown diamonds, not cubic zirconia or diamond-look stones.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-cubic-zirconia' },
    ],
  },
  {
    heading: 'Final Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing lab-grown diamond earrings as a gift, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is this for a birthday, anniversary, bridesmaid gift, romantic gift or everyday gift?',
          'Does the recipient prefer simple, romantic, modern or bold jewellery?',
          'Do they usually wear studs, hoops, huggies or drops?',
          'What metal colour do they already wear?',
          'Would they prefer a safe classic style or something symbolic?',
          'Will the earrings be wearable after the occasion?',
          'Are the stones genuine lab-grown diamonds?',
          'Does the design feel personal enough for the gift?',
          'Is the size comfortable and practical?',
          'Should the gift feel subtle, visible or statement-making?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose classic studs. If you want the gift to feel more personal, choose butterfly earrings. If the recipient loves events and outfits, choose drop earrings.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Are lab-grown diamond earrings good gifts?',
    answer: 'Yes, lab-grown diamond earrings make excellent gifts because they feel special, wearable and easier to choose than rings.',
  },
  {
    question: 'What type of diamond earrings are safest to gift?',
    answer: 'Stud earrings are usually the safest gift because they are classic, simple and easy to wear with many outfits.',
  },
  {
    question: 'Are lab-grown diamond earrings good birthday gifts?',
    answer: 'Yes, they are strong birthday gifts. Studs are safe, butterfly earrings feel personal, and huggies are good for someone with a modern style.',
  },
  {
    question: 'Are lab-grown diamond earrings good anniversary gifts?',
    answer: 'Yes, lab-grown diamond earrings can feel romantic and thoughtful. Drops, butterfly earrings and classic studs are all strong anniversary options.',
  },
  {
    question: 'Are diamond earrings good bridesmaid gifts?',
    answer: 'Yes, diamond earrings are excellent bridesmaid gifts because they can be worn on the wedding day and again afterwards.',
  },
  {
    question: 'What earrings should I gift if I do not know her style?',
    answer: 'Choose simple diamond studs. They are the safest and most versatile option.',
  },
  {
    question: 'Are butterfly earrings good gifts?',
    answer: 'Yes, butterfly earrings are good gifts because the butterfly can symbolise growth, beauty, transformation and new beginnings.',
  },
  {
    question: 'Are huggie earrings good gifts?',
    answer: 'Yes, huggies are good gifts for someone who likes modern jewellery, ear stacks or everyday styling.',
  },
  {
    question: 'What metal colour is best for a jewellery gift?',
    answer: 'Choose the metal colour the recipient already wears. Yellow gold is warm and classic, white or silver tones are clean and modern, and rose gold feels soft and romantic.',
  },
  {
    question: 'What is the best first diamond earring gift?',
    answer: 'A small or medium pair of lab-grown diamond studs is usually the best first diamond earring gift because it is timeless, wearable and easy to style.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-grown diamond earrings make strong gifts because they combine sparkle, meaning and wearability. The best pair depends on the recipient\'s style and the occasion. Choose studs for a safe classic gift, huggies for modern styling, butterfly earrings for meaning, drops for romance and bold statement earrings for someone who loves dressing up.',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want a gift that feels special but easy to wear. Choose Cadenza S for subtle sparkle, Cadenza M for a classic diamond gift, Farfalla for meaning, Amadea for ear stacks, Orsola for romance and Lusso for bold occasion styling.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings for Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamond-earrings-for-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamond-earrings-for-gifts', 3)
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
