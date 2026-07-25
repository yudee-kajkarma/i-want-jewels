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
  title: 'Lab Grown Diamond Earrings for Gifts',
  description:
    'Choose lab grown diamond earrings as gifts for birthdays, anniversaries, bridesmaids, weddings, romantic gifts and everyday jewellery.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts',
  },
  openGraph: {
    title: 'Lab Grown Diamond Earrings for Gifts',
    description:
      'Choose lab grown diamond earrings as gifts for birthdays, anniversaries, bridesmaids, weddings, romantic gifts and everyday jewellery.',
    url: 'https://iwantjewels.com/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-103.jpg',
  title: 'Lab-Grown Diamond Earrings for Gifts:',
  subtitle: 'How to Choose the Right Pair',
  paragraphs: [
    'Lab-grown diamond earrings make strong gifts because they feel special, wearable and personal without being limited to one outfit. A good pair of earrings can be worn for birthdays, anniversaries, dinners, weddings, workwear, daily styling and future occasions, which makes them more useful than many one-time accessories.',
    'The best gift earring depends on the person receiving it. Diamond studs are the safest choice because they are classic and easy to wear. Huggies are better for someone who likes modern everyday jewellery. Butterfly earrings are ideal when the gift should feel meaningful or romantic. Drop earrings work well for someone who enjoys dresses, dinners and occasion styling. Hoops are best for someone who likes visible shape and party-ready jewellery.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Orsola drop earrings, Concetta Short earrings, Pave Hoops and Lusso bold statement earrings all serve different gift needs. This guide helps shoppers choose the right pair based on the recipient, occasion, style, outfit and level of sparkle.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings for Gifts',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose lab-grown diamond earrings as gifts',
    'Decide between studs, huggies, butterfly earrings, hoops, drops and minimalist earrings',
    'Pick earrings for birthdays, anniversaries, bridesmaids, weddings and romantic gifts',
    'Choose safe earrings when you do not know the recipient\'s exact style',
    'Match earrings to everyday wear, workwear, parties and occasion outfits',
    'Build giftable ear stack combinations',
    'Understand which earrings feel classic, romantic, modern, minimal or bold',
    'Choose the right metal colour for a jewellery gift',
    'Find IWantJewels product recommendations by gift type',
    'Plan image blocks, product modules, CTA sections and internal links for this page',
  ],
  image: '/blog-images/blog-image-105.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Lab-Grown Diamond Earring Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest diamond earring gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['First diamond earring gift', 'Small studs', 'Cadenza S'],
          ['Classic sparkle gift', 'Medium studs', 'Cadenza M'],
          ['Modern everyday gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Romantic gift', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Orsola'],
          ['Birthday gift', 'Studs, butterfly earrings or huggies', 'Cadenza M, Farfalla, Amadea'],
          ['Anniversary gift', 'Butterfly earrings or drop earrings', 'Alidi Farfalla, Orsola'],
          ['Bridesmaid gift', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Wedding guest gift', 'Drops, studs or romantic earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Party gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'Why Lab-Grown Diamond Earrings Make Good Gifts',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings make good gifts because they combine sparkle, meaning and wearability. They feel special enough for important occasions but can still be worn often.' },
      { type: 'paragraph', text: 'Unlike a highly specific necklace or ring, earrings are easier to choose because sizing is usually simpler. They can also fit different lifestyles. A person who likes classic jewellery can wear studs. Someone modern can wear huggies or hoops. Someone romantic can wear butterfly earrings. Someone who dresses up often can wear drops.' },
      {
        type: 'table',
        headers: ['Why They Work as Gifts', 'Why It Matters'],
        rows: [
          ['Easy to wear often', 'The gift does not stay unused'],
          ['No ring sizing issue', 'Easier than choosing rings'],
          ['Works across occasions', 'Good for birthdays, anniversaries, weddings and dinners'],
          ['Classic and emotional', 'Diamonds feel special, while style adds personality'],
          ['Easy to personalise', 'Choose studs, huggies, butterfly earrings, drops or hoops'],
          ['Works for ear stacks', 'Can become part of a larger jewellery wardrobe'],
          ['Good for many ages', 'Studs and huggies are especially versatile'],
          ['Strong conversion value', 'Gift shoppers often need clear product recommendations'],
        ],
      },
      { type: 'paragraph', text: 'At IWantJewels, the best gift approach is to guide shoppers by recipient style first, then occasion. This makes the page more useful and helps move users naturally toward the right product.' },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Safest Earrings to Gift',
    content: [
      { type: 'paragraph', text: 'The safest earrings to gift are usually diamond studs because they are classic, wearable and less style-specific.' },
      { type: 'paragraph', text: 'If you do not know the recipient\'s exact taste, choose Cadenza S or Cadenza M. Cadenza S is better for subtle everyday styling. Cadenza M is better when the gift should feel more visible and polished.' },
      { type: 'paragraph', text: 'Huggies are also a strong gift if the recipient likes modern jewellery. Minimalist earrings are good for someone with understated style. Butterfly earrings are meaningful but more personal, so they are best when you know the recipient likes soft or symbolic jewellery.' },
      {
        type: 'table',
        headers: ['Safe Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'First diamond gift, subtle daily wear', 'Cadenza S'],
          ['Medium diamond studs', 'Classic sparkle, safer special gift', 'Cadenza M'],
          ['Huggies', 'Modern everyday jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Ear stack gift', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift', 'Farfalla, Alidi Farfalla'],
          ['Drop earrings', 'Occasion jewellery lover', 'Orsola, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Birthday Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Birthday earrings should feel personal but still wearable. A birthday gift can be classic, romantic, modern or bold depending on the person.' },
      { type: 'paragraph', text: 'Studs are safest when you are unsure. Butterfly earrings are strong when the gift should feel meaningful. Huggies are ideal for someone who likes modern daily jewellery. Hoops or bold earrings are better for someone who enjoys party styling and visible jewellery.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-107.jpg',
        content: [
          {
            type: 'table',
            headers: ['Birthday Gift Style', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Safe birthday gift', 'Medium studs', 'Cadenza M'],
              ['First diamond birthday gift', 'Small studs', 'Cadenza S'],
              ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla'],
              ['Romantic birthday gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
              ['Modern birthday gift', 'Huggies', 'Amadea'],
              ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
              ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
              ['Birthday ear stack gift', 'Butterfly + small stud or stud + huggie', 'Farfalla + Cadenza S, Cadenza S + Amadea'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '#' },
    ],
  },
  {
    heading: 'Anniversary Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Anniversary earrings should feel thoughtful and romantic. This is where butterfly earrings, drop earrings and classic diamond studs are especially strong.' },
      { type: 'paragraph', text: 'Butterfly earrings work well because they can symbolise growth, transformation and a shared journey. Drop earrings work beautifully for anniversary dinners and date nights. Studs are safer when the person prefers classic jewellery.' },
      {
        type: 'table',
        headers: ['Anniversary Gift Mood', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Romantic anniversary gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Elegant dinner gift', 'Drop earrings', 'Orsola'],
          ['Classic diamond anniversary gift', 'Medium studs', 'Cadenza M'],
          ['Subtle anniversary gift', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Meaningful milestone gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Date night styling', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
          ['Anniversary ear stack gift', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Formal anniversary dinner', 'Long drops or medium studs', 'Concetta Long, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '#' },
    ],
  },
  {
    heading: 'Romantic Lab-Grown Diamond Earring Gifts',
    content: [
      { type: 'paragraph', text: 'Romantic earrings should feel personal, soft and intentional. They do not always need to be the biggest or most expensive-looking earrings. The best romantic gift is the one that feels connected to the recipient.' },
      { type: 'paragraph', text: 'Butterfly earrings are the strongest romantic direction because they carry meaning. Drop earrings are strong for date nights and dinners. Studs work well when the recipient prefers classic jewellery. Minimalist earrings are best when the gift should feel quiet and intimate.' },
      {
        type: 'table',
        headers: ['Romantic Gift Type', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Meaningful romantic gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Elegant romantic gift', 'Drop earrings', 'Orsola'],
          ['Classic romantic gift', 'Diamond studs', 'Cadenza M'],
          ['Soft romantic gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Minimal romantic gift', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Romantic ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Dinner-date gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Personal milestone gift', 'Butterfly earrings', 'Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Bridesmaid and Wedding Earring Gifts',
    content: [
      { type: 'paragraph', text: 'Bridesmaid earrings should be wearable, elegant and easy to match with dresses. The best choices are usually small studs, delicate drops or soft romantic earrings.' },
      { type: 'paragraph', text: 'Cadenza S is a safe bridesmaid gift because small studs can be worn again after the wedding. Concetta Short works well for delicate dress styling. Farfalla can work if the bridesmaid look is romantic and soft. Orsola is better for more polished wedding guest or occasion styling.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-23.jpg',
        content: [
          {
            type: 'table',
            headers: ['Wedding Gift Need', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Bridesmaid gift', 'Small studs', 'Cadenza S'],
              ['Delicate bridesmaid styling', 'Short drops', 'Concetta Short'],
              ['Romantic bridesmaid gift', 'Butterfly earrings', 'Farfalla'],
              ['Champagne dress styling', 'Drops or studs', 'Concetta Short, Cadenza S'],
              ['Blush dress styling', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['Sage dress styling', 'Small studs or soft drops', 'Cadenza S, Concetta Short'],
              ['Wedding guest gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Bridal party ear stack', 'Small stud + delicate drop', 'Cadenza S + Concetta Short'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Everyday Earring Gifts',
    content: [
      { type: 'paragraph', text: 'Everyday earrings are some of the best gifts because the recipient can actually use them often.' },
      { type: 'paragraph', text: 'The strongest everyday gift options are studs, huggies and minimalist earrings. They work with casual outfits, workwear, travel outfits and simple dinners. For someone who likes visible jewellery, hoops can also be a good everyday-to-weekend gift.' },
      {
        type: 'table',
        headers: ['Everyday Gift Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Safe everyday gift', 'Small studs', 'Cadenza S'],
          ['More polished everyday gift', 'Medium studs', 'Cadenza M'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist everyday gift', 'Minimalist earrings', 'Laluce'],
          ['Everyday ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Weekend everyday gift', 'Hoops', 'Pave Hoops'],
          ['Romantic everyday gift', 'Butterfly earrings', 'Farfalla'],
          ['Daily-to-dinner gift', 'Medium studs or drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Minimalist Earring Gifts',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings are strong gifts for someone who likes clean, quiet and wearable jewellery.' },
      { type: 'paragraph', text: 'If the recipient does not wear bold jewellery often, avoid heavy statement pieces. Choose small studs, huggies or minimalist earrings instead. These pieces are easier to style and less risky.' },
      {
        type: 'table',
        headers: ['Minimalist Gift Type', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Quiet diamond gift', 'Small studs', 'Cadenza S'],
          ['Clean sparkle gift', 'Medium studs', 'Cadenza M'],
          ['Minimalist detail gift', 'Minimalist earrings', 'Laluce'],
          ['Modern minimal gift', 'Huggies', 'Amadea'],
          ['Minimal ear stack gift', 'Stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Travel-friendly gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Subtle romantic gift', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Butterfly Earrings as Meaningful Gifts',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are ideal when the gift should carry meaning.' },
      { type: 'paragraph', text: 'A butterfly often represents transformation, growth, beauty, freedom and new beginnings. That makes butterfly earrings strong for birthdays, anniversaries, graduations, new jobs, life changes, romantic gifts and personal milestones.' },
      {
        type: 'table',
        headers: ['Meaningful Gift Moment', 'Why Butterfly Earrings Work', 'Product Direction'],
        rows: [
          ['Birthday', 'Symbolises growth and a new year', 'Farfalla'],
          ['Anniversary', 'Represents growth together', 'Alidi Farfalla'],
          ['Graduation', 'Symbolises transformation and new beginnings', 'Farfalla'],
          ['New job', 'Represents a new chapter', 'Farfalla'],
          ['Romantic gift', 'Feels soft and personal', 'Alidi Farfalla'],
          ['Bridesmaid gift', 'Soft and feminine', 'Farfalla'],
          ['Self-gift', 'Symbolises personal growth', 'Farfalla'],
          ['Encouragement gift', 'Represents hope and change', 'Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Studs vs Huggies vs Drops vs Hoops as Gifts',
    content: [
      { type: 'paragraph', text: 'Different earring styles send different messages.' },
      { type: 'paragraph', text: 'Studs feel classic and safe. Huggies feel modern and easy. Drops feel elegant and occasion-ready. Hoops feel confident and stylish. Butterfly earrings feel meaningful and romantic. Bold earrings feel expressive and party-led.' },
      {
        type: 'table',
        headers: ['Earring Type', 'Gift Feeling', 'Best For', 'Product Direction'],
        rows: [
          ['Studs', 'Classic and safe', 'First diamond gift, daily wear', 'Cadenza S, Cadenza M'],
          ['Huggies', 'Modern and wearable', 'Everyday jewellery lovers', 'Amadea'],
          ['Minimalist earrings', 'Quiet and understated', 'Minimal style recipients', 'Laluce'],
          ['Butterfly earrings', 'Meaningful and romantic', 'Birthdays, anniversaries, milestones', 'Farfalla, Alidi Farfalla'],
          ['Drop earrings', 'Elegant and occasion-ready', 'Dinners, weddings, anniversaries', 'Orsola, Concetta Short'],
          ['Hoops', 'Stylish and visible', 'Party-ready or modern recipients', 'Pave Hoops'],
          ['Bold earrings', 'Expressive and strong', 'Someone who loves standout jewellery', 'Lusso'],
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose studs. If the person likes modern jewellery, choose huggies. If the gift should feel emotional, choose butterfly earrings. If the person dresses up often, choose drops.' },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Gift Earrings by Recipient Style',
    content: [
      { type: 'paragraph', text: 'The recipient\'s personal style is more important than the occasion alone.' },
      { type: 'paragraph', text: 'A minimalist person may not wear bold earrings even for a big birthday. A romantic person may love butterfly earrings more than classic studs. A party dresser may prefer hoops or bold earrings.' },
      {
        type: 'table',
        headers: ['Recipient Style', 'Best Gift Direction', 'Product Direction'],
        rows: [
          ['Classic style', 'Diamond studs', 'Cadenza M, Cadenza S'],
          ['Minimalist style', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern style', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Romantic style', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Orsola'],
          ['Workwear-focused', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Party style', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Occasion dresser', 'Drop earrings', 'Orsola, Concetta Short, Concetta Long'],
          ['Ear stack lover', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['Safe gift recipient', 'Studs', 'Cadenza S, Cadenza M'],
        ],
      },
    ],
  },
  {
    heading: 'Gift Earrings by Occasion',
    content: [
      { type: 'paragraph', text: 'This table helps shoppers choose quickly by gift moment.' },
      {
        type: 'table',
        headers: ['Occasion', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Birthday', 'Studs, butterfly earrings or huggies', 'Cadenza M, Farfalla, Amadea'],
          ['Anniversary', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Bridesmaid gift', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Wedding guest gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Graduation', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
          ['New job', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Valentine-style romantic gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Mother\'s Day-style gift', 'Studs, butterfly earrings or drops', 'Cadenza M, Farfalla, Orsola'],
          ['Christmas-style gift', 'Studs, huggies or hoops', 'Cadenza M, Amadea, Pave Hoops'],
          ['Self-gift', 'Choose by style mood', 'Cadenza S, Farfalla, Orsola, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '#' },
    ],
  },
  {
    heading: 'Gift Earrings by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour can make or break a jewellery gift. The safest choice is usually the metal colour the recipient already wears.' },
      { type: 'paragraph', text: 'If they wear gold rings, gold bracelets or gold necklaces, choose yellow gold. If they wear silver-tone or white metal jewellery, choose white or silver tone. If they like soft romantic pieces, rose gold can work beautifully.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Gift Feeling', 'Best For'],
        rows: [
          ['Yellow gold', 'Warm, classic and rich', 'Everyday gifts, black dresses, green dresses, romantic gifts'],
          ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, formal styling, cool wardrobes'],
          ['Rose gold', 'Soft, romantic and feminine', 'Birthdays, anniversaries, blush outfits, butterfly earrings'],
          ['Mixed metals', 'Personal and creative', 'Ear stack lovers and trend-led recipients'],
        ],
      },
      { type: 'paragraph', text: 'For gifts, avoid guessing only by trend. Look at what the person already owns and wears most often.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Giftable Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts work well when the combination is easy to understand. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: 'The safest stack is a small stud with a huggie. The most romantic stack is a butterfly earring with a small stud. The best occasion stack is a drop earring with a small stud.' },
      {
        type: 'table',
        headers: ['Giftable Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest ear stack gift', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist stack gift', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic stack gift', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful gift stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Bridesmaid stack gift', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Wedding guest stack gift', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Party stack gift', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Hoop stack gift', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/earring-style-guides/diamond-ear-stack-ideas' },
    ],
  },
  {
    heading: 'Product Pathways by Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Lab-Grown Diamond Earring Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are the safest choice because they are classic, wearable and easy to style.' },
      { type: 'subheading', text: 'For a Modern Everyday Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are strong for someone who likes modern, close-fitting daily jewellery.' },
      { type: 'subheading', text: 'For a Minimalist Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Romantic Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. They feel meaningful and personal, especially for birthdays and anniversaries.' },
      { type: 'subheading', text: 'For an Anniversary Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for dinners, date nights and occasion outfits.' },
      { type: 'subheading', text: 'For a Bridesmaid Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S or Concetta Short earrings. Cadenza S is safest for repeat wear, while Concetta Short adds delicate occasion movement.' },
      { type: 'subheading', text: 'For a Party Jewellery Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops or Lusso bold statement earrings. Pave Hoops are easier to repeat, while Lusso is stronger for someone who loves bold sparkle.' },
      { type: 'subheading', text: 'For an Ear Stack Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea for the safest stack, or Farfalla with Cadenza S for a romantic stack.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first diamond gift', 'Small, safe, subtle and wearable'],
          ['Cadenza M diamond stud earrings', 'Best classic sparkle gift', 'More visible but still easy to style'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Quiet, clean and easy for minimal style'],
          ['Farfalla butterfly earrings', 'Best meaningful birthday gift', 'Symbolic, soft and romantic'],
          ['Alidi Farfalla butterfly earrings', 'Best romantic gift', 'Strong for anniversaries and personal moments'],
          ['Orsola drop earrings', 'Best elegant occasion gift', 'Great for dinners, weddings and satin outfits'],
          ['Concetta Short earrings', 'Best bridesmaid or delicate gift', 'Soft, wearable and occasion-friendly'],
          ['Concetta Long earrings', 'Best formal evening gift', 'Refined and polished for dressy occasions'],
          ['Pave Hoops', 'Best modern party gift', 'Adds shape and sparkle'],
          ['Lusso bold statement earrings', 'Best bold gift', 'Strong for someone who loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the gift by personality first. Pick Cadenza S or Cadenza M for safe sparkle, Amadea for modern everyday styling, Farfalla or Alidi Farfalla for meaningful gifts, Orsola for elegant occasions, Concetta Short for bridesmaids, Pave Hoops for shape and Lusso for bold party jewellery.' },
    ],
  },
  {
    heading: 'Common Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing the most dramatic earrings instead of the most wearable earrings. A gift should match the recipient\'s style, not only the occasion.' },
      { type: 'paragraph', text: 'Another mistake is guessing metal colour. If the person wears yellow gold every day, choose yellow gold. If they wear white or silver-tone jewellery, choose that direction.' },
      { type: 'paragraph', text: 'A third mistake is gifting bold earrings to someone who prefers minimalist jewellery. Studs, huggies or minimalist earrings are safer for understated style.' },
      { type: 'paragraph', text: 'Another mistake is choosing a symbolic piece when the recipient prefers classic jewellery. Butterfly earrings are meaningful, but diamond studs may be safer for someone very traditional.' },
      { type: 'paragraph', text: 'A fifth mistake is ignoring repeat wear. A good gift should be useful after the birthday, wedding or anniversary is over.' },
      { type: 'paragraph', text: 'Finally, do not forget care. Earrings that are worn often should be easy to clean, store and protect from showering, sleeping, swimming and heavy product exposure.' },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing lab-grown diamond earrings as a gift, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Does the recipient prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour do they already wear most often?',
          'Is this for a birthday, anniversary, wedding, bridesmaid gift or everyday gift?',
          'Do they wear earrings daily?',
          'Do they prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would they wear butterfly earrings, or are studs safer?',
          'Is the gift meant to feel practical or emotional?',
          'Can the earrings be worn with more than one outfit?',
          'Are the earrings comfortable for long wear?',
          'Can they work in an ear stack?',
          'Would a two-piece stack gift be better than one pair?',
          'Is the design easy to clean and store?',
          'Will the gift still feel wearable after the occasion?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose diamond studs. If you want meaning, choose butterfly earrings. If you want elegance, choose drops. If you want modern daily wear, choose huggies.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Are lab-grown diamond earrings good gifts?',
    answer: 'Yes, lab-grown diamond earrings are good gifts because they feel special, wearable and easier to choose than size-specific jewellery like rings.',
  },
  {
    question: 'What are the safest diamond earrings to gift?',
    answer: 'Diamond studs are the safest earrings to gift. They are classic, easy to wear and suitable for many styles.',
  },
  {
    question: 'Are lab-grown diamond studs good gifts?',
    answer: 'Yes, lab-grown diamond studs are one of the best gift choices because they work for everyday wear, workwear, dinners and future occasions.',
  },
  {
    question: 'What earrings should I gift for a birthday?',
    answer: 'For birthdays, choose diamond studs for a safe gift, butterfly earrings for a meaningful gift, huggies for modern daily wear, or hoops for someone who likes visible jewellery.',
  },
  {
    question: 'What earrings should I gift for an anniversary?',
    answer: 'For anniversaries, butterfly earrings and drop earrings work especially well because they feel romantic and thoughtful.',
  },
  {
    question: 'Are butterfly earrings good gifts?',
    answer: 'Yes, butterfly earrings are good gifts when the jewellery should feel meaningful. They can represent transformation, growth, beauty and new beginnings.',
  },
  {
    question: 'What earrings should I gift bridesmaids?',
    answer: 'Small studs and delicate drops are the safest bridesmaid earring gifts. Cadenza S and Concetta Short are strong directions.',
  },
  {
    question: 'Are hoop earrings good gifts?',
    answer: 'Hoop earrings are good gifts if the recipient already likes visible earrings or modern jewellery. If you are unsure, studs may be safer.',
  },
  {
    question: 'What metal colour should I choose for earring gifts?',
    answer: 'Choose the metal colour the recipient already wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels romantic.',
  },
  {
    question: 'What IWantJewels earrings are best for gifts?',
    answer: 'Cadenza S, Cadenza M, Amadea, Laluce, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Pave Hoops and Lusso are strong gift options depending on the recipient\'s style and occasion.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-grown diamond earrings make thoughtful gifts because they are wearable, personal and easy to style. Choose studs for the safest sparkle, huggies for modern everyday wear, butterfly earrings for meaning, drops for elegant occasions, hoops for visible shape and bold earrings for someone who loves standout jewellery.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a gift with real diamond sparkle. Choose Cadenza S for a safe first gift, Cadenza M for classic polish, Amadea for huggies, Laluce for minimalist styling, Farfalla or Alidi Farfalla for romantic meaning, Orsola for occasion elegance and Pave Hoops or Lusso for party-ready sparkle.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings for Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Butterfly Earrings Meaning Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'lab-grown-diamond-earrings-for-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'lab-grown-diamond-earrings-for-gifts', 3)
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
