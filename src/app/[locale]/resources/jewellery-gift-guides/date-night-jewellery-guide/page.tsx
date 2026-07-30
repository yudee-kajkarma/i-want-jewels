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
  title: 'Date Night Jewellery Guide',
  description:
    'Choose date night jewellery with lab grown diamond earrings, studs, drops, hoops, butterfly earrings and romantic styling ideas.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/jewellery-gift-guides/date-night-jewellery-guide', locale),
  }
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-27.jpg',
  title: 'Date Night Jewellery Guide:',
  subtitle: 'What Earrings to Wear for Dinner, Drinks & Romantic Outfits',
  paragraphs: [
    'Date night jewellery should feel romantic, polished and comfortable. It should make the outfit feel intentional without making the jewellery look too heavy or overdone. The best date night earrings depend on where you are going, what you are wearing and whether the look should feel soft, elegant, modern or bold.',
    'For romantic dinners, drop earrings are one of the strongest choices because they add movement and frame the face beautifully. Butterfly earrings are ideal when the look should feel soft, feminine and meaningful. Diamond studs are safest when the outfit already has detail or when you want classic sparkle. Hoops work well for modern date night outfits, simple black dresses and jumpsuits. Huggies and minimalist earrings are best when the outfit is understated or when you want jewellery that feels effortless.',
    'At IWantJewels, Orsola drop earrings, Alidi Farfalla butterfly earrings, Farfalla butterfly earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Pave Hoops, Concetta Short earrings, Concetta Long earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings and Lusso bold statement earrings all support different date night styling needs.',
  ],
  shopLabel: 'Shop Date Night Jewellery',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery for date nights, dinner dates, drinks, anniversary dinners and romantic evenings.',
    'Decide between drop earrings, butterfly earrings, studs, hoops, huggies and bold earrings.',
    'Match earrings to black dresses, satin dresses, red dresses, green dresses, champagne outfits and soft romantic looks.',
    'Choose jewellery by neckline, hairstyle and date setting.',
    'Understand when to wear a necklace and when to let earrings lead.',
    'Build date night ear stack ideas.',
    'Choose romantic jewellery by metal colour.',
    'Find IWantJewels product recommendations by outfit and mood.',
  ],
  image: '/blog-images/blog-image-69.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Date Night Jewellery Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main styling decision tool.' },
      {
        type: 'table',
        headers: ['Date Night Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Romantic dinner jewellery', 'Drop earrings', 'Orsola'],
          ['Soft romantic look', 'Butterfly earrings or short drops', 'Alidi Farfalla, Farfalla, Concetta Short'],
          ['Classic date night sparkle', 'Medium diamond studs', 'Cadenza M'],
          ['Minimal date night jewellery', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern date night outfit', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Black dress date night', 'Drops, hoops, studs or bold earrings', 'Orsola, Pave Hoops, Cadenza M, Lusso'],
          ['Satin dress date night', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Red dress date night', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Green dress date night', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Champagne outfit', 'Soft drops, butterfly earrings or studs', 'Concetta Short, Farfalla, Cadenza M'],
          ['Anniversary dinner', 'Drops, butterfly earrings or classic studs', 'Orsola, Alidi Farfalla, Cadenza M'],
          ['Date night ear stack', 'Drop + small stud or butterfly + stud', 'Orsola + Cadenza S, Farfalla + Cadenza S'],
          ['Bold evening date', 'Bold earrings if outfit is simple', 'Lusso'],
        ],
      },
    ],
  },
  {
    heading: 'What Jewellery Should You Wear on a Date Night?',
    content: [
      { type: 'paragraph', text: 'Date night jewellery should match the mood of the evening. A quiet dinner may call for drop earrings or classic studs. A romantic anniversary dinner may suit butterfly earrings or elegant drops. A cocktail bar or evening date can carry hoops or bold earrings if the outfit is simple. A casual date can look polished with huggies, small studs or minimalist earrings.' },
      { type: 'paragraph', text: 'The easiest rule is to choose one main jewellery focus. If the earrings are drops, hoops, butterfly earrings or bold statement earrings, keep the necklace delicate or skip it. If the earrings are simple studs, a necklace can become slightly more visible.' },
      {
        type: 'table',
        headers: ['What to Check First', 'Why It Matters'],
        rows: [
          ['Date setting', 'Dinner, drinks, casual dates and formal dates need different jewellery'],
          ['Outfit colour', 'Helps choose gold, white/silver tone or rose gold'],
          ['Outfit fabric', 'Satin, lace, velvet and sequins need different balance'],
          ['Neckline', 'Decides if drops, studs, hoops or butterfly earrings work best'],
          ['Hairstyle', 'Earrings should be visible and flattering'],
          ['Comfort', 'Date night jewellery should feel easy for the full evening'],
          ['Necklace choice', 'Strong earrings usually need a quiet neckline'],
          ['Personal style', 'Romantic, classic, modern and minimal styles need different jewellery'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, the strongest date night pathway is to guide shoppers from mood to outfit, then from outfit to product.' },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Best Earrings for Date Night',
    content: [
      { type: 'paragraph', text: 'The best date night earrings are usually drop earrings, butterfly earrings, diamond studs, hoops, huggies or minimalist earrings.' },
      { type: 'paragraph', text: 'Drop earrings are best for romantic dinners because they add movement. Butterfly earrings are best for soft, meaningful styling. Studs are safest when the outfit is detailed or when the look should stay classic. Hoops feel modern. Huggies feel effortless. Bold earrings are best only when the outfit is simple enough to let them lead.' },
      {
        type: 'table',
        headers: ['Earring Type', 'Best Date Night Use', 'IWJ Product Direction'],
        rows: [
          ['Drop earrings', 'Romantic dinners, satin outfits, date-night dresses', 'Orsola'],
          ['Short drops', 'Soft, delicate dinner looks', 'Concetta Short'],
          ['Long drops', 'Formal dinner dates and anniversary evenings', 'Concetta Long'],
          ['Medium studs', 'Classic date night sparkle', 'Cadenza M'],
          ['Small studs', 'Minimal styling and ear stack support', 'Cadenza S'],
          ['Butterfly earrings', 'Romantic, symbolic and soft styling', 'Alidi Farfalla, Farfalla'],
          ['Hoops', 'Modern date night outfits and jumpsuits', 'Pave Hoops'],
          ['Huggies', 'Effortless and understated styling', 'Amadea'],
          ['Minimalist earrings', 'Quiet date night detail', 'Laluce'],
          ['Bold earrings', 'Simple evening outfits only', 'Lusso'],
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },
  {
    heading: 'Drop Earrings for Romantic Dinners',
    content: [
      { type: 'paragraph', text: 'Drop earrings are one of the best date night choices because they add movement and elegance without needing a heavy necklace.' },
      { type: 'paragraph', text: 'Orsola drop earrings are the strongest IWantJewels date night recommendation. They work with satin dresses, black dresses, red dresses, green dresses, champagne outfits, anniversary dinners and romantic evening looks. Concetta Short is better for soft, delicate styling. Concetta Long is better for formal dinner dates and dressier evening outfits.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-71.jpg',
        content: [
          {
            type: 'table',
            headers: ['Romantic Dinner Look', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Classic dinner date', 'Drop earrings', 'Orsola'],
              ['Satin dinner dress', 'Drop earrings', 'Orsola'],
              ['Black dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Red dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Green dinner dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
              ['Champagne dinner outfit', 'Drops or short drops', 'Orsola, Concetta Short'],
              ['Soft romantic dress', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Formal anniversary dinner', 'Long drops', 'Concetta Long'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Butterfly Earrings for Soft Romantic Looks',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are perfect when the date night look should feel soft, meaningful or feminine.' },
      { type: 'paragraph', text: 'A butterfly can symbolise transformation, growth, beauty and new beginnings, which gives the jewellery emotional value. This makes butterfly earrings especially strong for anniversary dinners, birthday dates, romantic gifts, soft satin looks, blush outfits, champagne dresses and floral styling.' },
      {
        type: 'table',
        headers: ['Soft Date Night Look', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Romantic dinner', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Anniversary date', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Birthday date', 'Butterfly earrings or studs', 'Farfalla, Cadenza M'],
          ['Blush outfit', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Champagne dress', 'Butterfly earrings or drops', 'Farfalla, Orsola'],
          ['Floral dress', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Soft satin look', 'Butterfly earrings or short drops', 'Alidi Farfalla, Concetta Short'],
          ['Romantic ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Diamond Studs for Classic Date Night Sparkle',
    content: [
      { type: 'paragraph', text: 'Diamond studs are the safest date night earrings when you want polish without too much movement or drama.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are best for classic date night sparkle. They work well with satin dresses, black dresses, red outfits, work-to-dinner looks and detailed outfits. Cadenza S is better for minimal looks, second piercings and ear stack support.' },
      {
        type: 'table',
        headers: ['Date Night Stud Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Classic date night sparkle', 'Cadenza M', 'Polished and versatile'],
          ['Minimal date night look', 'Cadenza S', 'Subtle and clean'],
          ['Work-to-dinner styling', 'Cadenza M', 'Easy to wear all day'],
          ['Detailed outfit styling', 'Cadenza M', 'Adds sparkle without crowding'],
          ['Ear stack support', 'Cadenza S', 'Works with drops, hoops and butterfly earrings'],
          ['First romantic diamond gift', 'Cadenza S', 'Delicate and wearable'],
          ['Safe date night gift', 'Cadenza M', 'Classic and reusable'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Hoop Earrings for Modern Date Night Outfits',
    content: [
      { type: 'paragraph', text: 'Hoop earrings work well for modern date night outfits because they add shape and confidence.' },
      { type: 'paragraph', text: 'Pave Hoops are strongest with simple black dresses, jumpsuits, high-neck outfits, green dresses, casual dinner looks and modern party outfits. They are a good choice when drops feel too romantic and studs feel too quiet.' },
      {
        type: 'table',
        headers: ['Modern Date Night Look', 'Best Direction', 'Product Direction'],
        rows: [
          ['Simple black dress', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Dinner jumpsuit', 'Hoops', 'Pave Hoops'],
          ['High-neck outfit', 'Hoops or studs', 'Pave Hoops, Cadenza M'],
          ['Green dress', 'Gold hoops or drops', 'Pave Hoops, Orsola'],
          ['Casual dinner outfit', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Hoop ear stack', 'Hoop + small stud', 'Pave Hoops + Cadenza S'],
          ['Modern birthday date', 'Hoops or butterfly earrings', 'Pave Hoops, Farfalla'],
          ['If hoops feel too visible', 'Huggies or studs', 'Amadea, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond hoop earrings guide', href: '/resources/earring-style-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },
  {
    heading: 'Huggies and Minimalist Earrings for Effortless Styling',
    content: [
      { type: 'paragraph', text: 'Huggies and minimalist earrings are best when the date night outfit should feel natural, relaxed or understated.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings work well for casual dinners, work-to-dinner looks, minimalist outfits and modern ear stacks. Laluce minimalist diamond earrings are best when the jewellery should feel quiet and delicate. These options are also strong for people who prefer everyday jewellery over occasion-only pieces.' },
      {
        type: 'table',
        headers: ['Effortless Date Night Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Casual dinner date', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Minimal date night look', 'Minimalist earrings', 'Laluce'],
          ['Work-to-dinner styling', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Detailed outfit', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Modern subtle look', 'Huggies', 'Amadea'],
          ['Minimal ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Quiet romantic gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Minimalist jewellery styling guide', href: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },
    ],
  },
  {
    heading: 'Bold Earrings for Evening Date Nights',
    content: [
      { type: 'paragraph', text: 'Bold earrings can work beautifully for evening date nights when the outfit is simple enough to let the earrings lead.' },
      { type: 'paragraph', text: 'Lusso bold statement earrings are best with simple black dresses, strapless dresses, off-shoulder outfits, sleek jumpsuits and minimal evening looks. If the outfit already has sequins, heavy satin, lace, metallic fabric or dramatic detail, choose Cadenza M, Orsola or Pave Hoops instead.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-73.jpg',
        content: [
          {
            type: 'table',
            headers: ['Bold Date Night Look', 'Best Direction', 'Product Direction'],
            rows: [
              ['Simple black dress', 'Bold earrings', 'Lusso'],
              ['Strapless evening dress', 'Bold earrings or drops', 'Lusso, Orsola'],
              ['Off-shoulder dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
              ['Sleek jumpsuit', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
              ['Birthday date night', 'Bold earrings, hoops or butterfly earrings', 'Lusso, Pave Hoops, Farfalla'],
              ['Detailed evening outfit', 'Studs or huggies instead', 'Cadenza M, Amadea'],
              ['Bold ear stack', 'Bold earring + small stud', 'Lusso + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Bold statement earrings guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
    ],
  },
  {
    heading: 'Date Night Jewellery by Outfit Colour',
    content: [
      { type: 'paragraph', text: 'Outfit colour is one of the easiest ways to choose date night jewellery.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-75.jpg',
        content: [
          {
            type: 'table',
            headers: ['Outfit Colour', 'Best Date Night Jewellery', 'Product Direction'],
            rows: [
              ['Black', 'Drops, hoops, studs or bold earrings', 'Orsola, Pave Hoops, Cadenza M, Lusso'],
              ['Red', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Burgundy', 'Drops, long drops or polished studs', 'Orsola, Concetta Long, Cadenza M'],
              ['Green', 'Gold drops, hoops or studs', 'Orsola, Pave Hoops, Cadenza M'],
              ['Emerald', 'Gold drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
              ['Champagne', 'Drops, short drops or butterfly earrings', 'Orsola, Concetta Short, Farfalla'],
              ['Blush', 'Butterfly earrings or short drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
              ['Navy', 'Studs, hoops or refined drops', 'Cadenza M, Pave Hoops, Concetta Long'],
              ['White', 'Hoops, studs or drops', 'Pave Hoops, Cadenza M, Orsola'],
              ['Cream', 'Butterfly earrings, drops or studs', 'Farfalla, Orsola, Cadenza M'],
              ['Floral', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
              ['Metallic', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },
  {
    heading: 'Date Night Jewellery by Outfit Fabric',
    content: [
      { type: 'paragraph', text: 'Fabric changes how much jewellery the outfit can carry.' },
      { type: 'paragraph', text: 'Satin reflects light, so drops or medium studs usually work best. Velvet can carry polished drops or studs. Lace and sequins usually need cleaner earrings. Plain fabrics can carry bold earrings, hoops or more visible drops.' },
      {
        type: 'table',
        headers: ['Outfit Fabric', 'Best Date Night Jewellery', 'Product Direction'],
        rows: [
          ['Satin', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Lace', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
          ['Velvet', 'Drops, long drops or studs', 'Orsola, Concetta Long, Cadenza M'],
          ['Sequin', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Metallic fabric', 'Studs or minimalist earrings', 'Cadenza M, Laluce'],
          ['Floral fabric', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Plain crepe', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Chiffon', 'Butterfly earrings, short drops or studs', 'Farfalla, Concetta Short, Cadenza S'],
          ['Knit outfit', 'Hoops, studs or huggies', 'Pave Hoops, Cadenza M, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with satin dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },
  {
    heading: 'Date Night Jewellery by Neckline',
    content: [
      { type: 'paragraph', text: 'The neckline helps decide whether earrings should be long, soft, simple or bold.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-77.jpg',
        content: [
          {
            type: 'table',
            headers: ['Neckline', 'Best Date Night Earrings', 'Product Direction'],
            rows: [
              ['V-neck dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Sweetheart neckline', 'Butterfly earrings, drops or bold earrings', 'Farfalla, Orsola, Lusso'],
              ['Off-shoulder dress', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
              ['Strapless dress', 'Bold earrings or drops', 'Lusso, Orsola'],
              ['High-neck dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
              ['Halter dress', 'Studs or slim drops', 'Cadenza M, Concetta Long'],
              ['Square-neck dress', 'Hoops, studs or soft drops', 'Pave Hoops, Cadenza M, Concetta Short'],
              ['Cowl-neck dress', 'Studs or soft drops', 'Cadenza M, Orsola'],
              ['Detailed neckline', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery for sweetheart neckline', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },
    ],
  },
  {
    heading: 'Date Night Jewellery by Hairstyle',
    content: [
      { type: 'paragraph', text: 'Hairstyle changes how visible the earrings are. If hair is down, tiny earrings may disappear. If hair is pulled back, drops, hoops, butterfly earrings and bold earrings can frame the face beautifully.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-79.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Date Night Earrings', 'Product Direction'],
            rows: [
              ['Hair down', 'Medium studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
              ['Soft waves', 'Drops, butterfly earrings or visible studs', 'Orsola, Farfalla, Cadenza M'],
              ['Half-up hair', 'Studs, huggies or butterfly earrings', 'Cadenza M, Amadea, Farfalla'],
              ['Sleek ponytail', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Low bun', 'Drops, butterfly earrings or long drops', 'Orsola, Farfalla, Concetta Long'],
              ['High bun', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Short hair', 'Studs, hoops, drops or bold earrings', 'Cadenza M, Pave Hoops, Orsola, Lusso'],
              ['Braided style', 'Studs, huggies or visible drops', 'Cadenza M, Amadea, Orsola'],
            ],
          },
        ],
      },
    ],
  },
  {
    heading: 'Date Night Jewellery by Date Setting',
    content: [
      { type: 'paragraph', text: 'Different date settings need different jewellery moods.' },
      {
        type: 'table',
        headers: ['Date Setting', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Casual coffee date', 'Small studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Casual dinner', 'Huggies, medium studs or hoops', 'Amadea, Cadenza M, Pave Hoops'],
          ['Romantic dinner', 'Drop earrings or butterfly earrings', 'Orsola, Alidi Farfalla'],
          ['Anniversary dinner', 'Drops, butterfly earrings or classic studs', 'Orsola, Farfalla, Cadenza M'],
          ['Cocktail bar', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Theatre or formal evening', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Birthday date night', 'Butterfly earrings, hoops or drops', 'Farfalla, Pave Hoops, Orsola'],
          ['Holiday dinner', 'Drops, studs or bold earrings', 'Orsola, Cadenza M, Lusso'],
          ['Weekend brunch date', 'Studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Night-out date', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Date Night Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Date night ear stacks should feel polished and not overcrowded. The best stack has one main earring and one small support piece.' },
      {
        type: 'table',
        headers: ['Date Night Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Romantic dinner stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft romantic stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful romantic stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Modern date stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Minimal date stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Soft drop stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal date stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Bold evening stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Necklace or No Necklace for Date Night?',
    content: [
      { type: 'paragraph', text: 'For date night, the necklace depends on the earrings and neckline. If the earrings are long, bold or very visible, the necklace should usually stay delicate or be skipped. If the earrings are simple studs or huggies, the necklace can become more noticeable.' },
      {
        type: 'table',
        headers: ['Earring Choice', 'Necklace Direction'],
        rows: [
          ['Drop earrings', 'Delicate necklace or no necklace'],
          ['Long drops', 'Usually skip the necklace'],
          ['Medium studs', 'Necklace can work'],
          ['Small studs', 'Necklace can lead the look'],
          ['Butterfly earrings', 'Soft delicate necklace if needed'],
          ['Hoops', 'Delicate necklace or no necklace'],
          ['Huggies', 'Simple necklace can work'],
          ['Bold earrings', 'Skip necklace or keep it very minimal'],
          ['Minimalist earrings', 'Necklace can become the focal point'],
        ],
      },
      { type: 'paragraph', text: 'A date night outfit usually looks best when there is one clear jewellery focus. If the earrings are doing the work, let them lead.' },
      { type: 'see-also', text: 'Jewellery for V-neck dresses', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-v-neck-dress' },
    ],
  },
  {
    heading: 'Date Night Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour changes the mood of date night jewellery.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, rich and romantic. White or silver tone feels clean, bright and modern. Rose gold feels soft, feminine and sentimental. Mixed metals can work for creative ear stacks, but one metal colour usually feels more polished.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-81.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Date Night Mood', 'Best Outfit Colours'],
            rows: [
              ['Yellow gold', 'Warm, romantic and polished', 'Black, red, green, champagne, burgundy, cream'],
              ['White or silver tone', 'Clean, bright and modern', 'Black, navy, silver, white, grey, cool tones'],
              ['Rose gold', 'Soft, romantic and feminine', 'Blush, pink, champagne, pastel outfits'],
              ['Mixed metals', 'Creative and trend-led', 'Minimal outfits and ear stacks'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For romantic gifts and date night styling, choose the metal colour the wearer already loves most.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Product Pathways by Date Night Styling Need',
    content: [
      { type: 'subheading', text: 'For the Best Romantic Dinner Earrings' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add elegant movement and work beautifully with satin dresses, black outfits, red dresses, green dresses and anniversary dinners.' },
      { type: 'subheading', text: 'For a Soft Romantic Date Night Look' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings or Farfalla butterfly earrings. They are strongest when the look should feel meaningful, feminine and personal.' },
      { type: 'subheading', text: 'For Safe Classic Date Night Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They are best when the outfit already has detail or when the look should stay timeless.' },
      { type: 'subheading', text: 'For a Minimal Date Night Look' },
      { type: 'paragraph', text: 'Choose Cadenza S, Laluce or Amadea. These are best for understated outfits, casual dates and work-to-dinner styling.' },
      { type: 'subheading', text: 'For a Modern Date Night Outfit' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They add shape and sparkle for simple black dresses, jumpsuits, high-neck outfits and modern dinner looks.' },
      { type: 'subheading', text: 'For a Formal Date Night' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings or Orsola. Concetta Long creates a refined line, while Orsola keeps the look elegant and versatile.' },
      { type: 'subheading', text: 'For a Bold Evening Date' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings only when the outfit is simple and the earrings should lead the look.' },
      { type: 'subheading', text: 'For Date Night Ear Stacks' },
      { type: 'paragraph', text: 'Choose Orsola with Cadenza S for dinner, Farfalla with Cadenza S for romance, or Pave Hoops with Cadenza S for a modern stack.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Date Night Role', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Best romantic dinner earring', 'Adds movement and elegance'],
          ['Alidi Farfalla butterfly earrings', 'Best romantic symbolic earring', 'Soft, personal and meaningful'],
          ['Farfalla butterfly earrings', 'Best soft romantic earring', 'Works for blush, champagne and floral looks'],
          ['Cadenza M diamond stud earrings', 'Best safe date night sparkle', 'Classic and polished'],
          ['Cadenza S lab-grown diamond studs', 'Best support stud', 'Strong for minimal looks and ear stacks'],
          ['Pave Hoops', 'Best modern date night shape', 'Adds curve and visible sparkle'],
          ['Concetta Short earrings', 'Best soft drop option', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal dinner earring', 'Creates a refined evening line'],
          ['Amadea Huggie earrings', 'Best effortless modern option', 'Works for casual dates and stacks'],
          ['Laluce minimalist diamond earrings', 'Best quiet detail', 'Useful for understated styling'],
          ['Lusso bold statement earrings', 'Best bold evening option', 'Strong when the outfit is simple'],
        ],
      },
      { type: 'paragraph', text: 'Choose date night jewellery by mood. Pick Orsola for romantic dinners, Alidi Farfalla for meaning, Cadenza M for safe sparkle, Pave Hoops for modern styling, Cadenza S for support, Amadea for effortless looks and Lusso when the outfit is simple enough for bold earrings.' },
    ],
  },
  {
    heading: 'Common Date Night Jewellery Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that competes with the outfit. If the dress has sequins, lace, heavy satin, embroidery or a dramatic neckline, simpler earrings usually look better.' },
      { type: 'paragraph', text: 'Another mistake is wearing too much jewellery at once. Date night styling usually looks more elegant when one piece leads and the rest stays quiet.' },
      { type: 'paragraph', text: 'A third mistake is choosing earrings that are too small for the hairstyle. If the hair is down, tiny earrings may disappear.' },
      { type: 'paragraph', text: 'Another mistake is choosing bold earrings for a casual date when huggies, studs or minimalist earrings would feel more natural.' },
      { type: 'paragraph', text: 'A fifth mistake is guessing the metal colour. Match the jewellery to the outfit and to the metal tone the wearer normally prefers.' },
      { type: 'paragraph', text: 'Finally, do not choose earrings that feel uncomfortable. Date night jewellery should feel easy for dinner, conversation, photos and the full evening.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/earring-style-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Final Date Night Jewellery Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing date night jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the date casual, romantic, formal or evening-led?',
          'Is the outfit simple or detailed?',
          'What colour is the outfit?',
          'Is the fabric satin, lace, velvet, sequin, floral or plain?',
          'What neckline does the outfit have?',
          'Will the hair be up, down or half-up?',
          'Do I want the look to feel romantic, classic, modern, minimal or bold?',
          'Should the earrings or necklace be the main jewellery focus?',
          'Does the metal colour match the outfit?',
          'Are the earrings comfortable for the full evening?',
          'Can the earrings be worn again after the date?',
          'Would an ear stack make the look more polished?',
          'Are the earrings too much for the date setting?',
          'Are the earrings visible enough for the hairstyle?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Orsola for romantic dinners, Cadenza M for classic sparkle, Alidi Farfalla for meaning, Pave Hoops for modern styling and Cadenza S or Amadea for minimal date night looks.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What jewellery should I wear on a date night?',
    answer: 'Wear jewellery that matches the outfit and date setting. Drop earrings work well for romantic dinners, studs are safest for classic sparkle, butterfly earrings feel soft and meaningful, and hoops suit modern date night outfits.',
  },
  {
    question: 'What earrings are best for a dinner date?',
    answer: 'Drop earrings are one of the best choices for a dinner date because they add movement and elegance near the face.',
  },
  {
    question: 'Are diamond studs good for date night?',
    answer: 'Yes, diamond studs are good for date night because they add polished sparkle without overpowering the outfit.',
  },
  {
    question: 'Are butterfly earrings good for date night?',
    answer: 'Yes, butterfly earrings work well for soft, romantic date night looks because they feel feminine, meaningful and personal.',
  },
  {
    question: 'Are hoop earrings good for date night?',
    answer: 'Yes, hoop earrings are good for modern date night outfits, simple black dresses, jumpsuits and casual dinner looks.',
  },
  {
    question: 'What earrings should I wear with a black date night dress?',
    answer: 'A black date night dress works well with drop earrings, hoops, medium studs or bold earrings if the dress is simple.',
  },
  {
    question: 'What earrings should I wear with a satin date night dress?',
    answer: 'Wear drop earrings or medium diamond studs with a satin date night dress. Drops add movement, while studs keep the look clean.',
  },
  {
    question: 'Should I wear a necklace on date night?',
    answer: 'You can wear a necklace, but if the earrings are long, bold or very visible, keep the necklace delicate or skip it.',
  },
  {
    question: 'What jewellery is best for an anniversary dinner?',
    answer: 'Drop earrings, butterfly earrings and classic diamond studs are strong anniversary dinner choices. Choose based on whether the look should feel elegant, meaningful or classic.',
  },
  {
    question: 'What IWantJewels earrings are best for date night?',
    answer: 'Orsola, Alidi Farfalla, Farfalla, Cadenza M, Cadenza S, Pave Hoops, Concetta Short, Concetta Long, Amadea, Laluce and Lusso are strong date night options depending on the outfit and mood.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Date night jewellery should feel romantic, polished and comfortable. Choose drop earrings for elegant movement, butterfly earrings for soft meaning, diamond studs for classic sparkle, hoops for modern shape, huggies for effortless styling and bold earrings only when the outfit is simple enough to let them lead.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want date night jewellery with real diamond sparkle. Choose Orsola for romantic dinners, Alidi Farfalla for meaning, Cadenza M for classic polish, Pave Hoops for modern styling, Amadea for effortless huggies and Cadenza S as the perfect support stud for date night ear stacks.',
  primaryLabel: 'Shop Date Night Jewellery',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Romantic Jewellery Gifts',
  secondaryHref: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her',
  tertiaryLabel: 'Read the Romantic Jewellery Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'date-night-jewellery-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'date-night-jewellery-guide', 3)
  return (
    <ResourceArticleV2Page
      category={category}
      article={article}
      relatedArticles={relatedArticles}
      heroIntro={heroIntro}
      quickSummary={quickSummary}
      content={articleContent}
      cta={cta}
      faq={faq}
    />
  )
}
