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
  title: 'Bridesmaid Jewellery Gifts for Her',
  description:
    'Choose bridesmaid jewellery gifts with lab grown diamond earrings, studs, drops, butterfly earrings, huggies and wedding-ready gift ideas.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/jewellery-gift-guides/bridesmaid-jewellery-gifts', locale),
  }
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-65.jpg',
  title: 'Bridesmaid Jewellery Gifts:',
  subtitle: 'Earrings Your Bridal Party Can Wear on the Wedding Day and After',
  paragraphs: [
    'Bridesmaid jewellery should feel special, but it should also be easy to wear again after the wedding. The best bridesmaid gift is not only something that looks beautiful in the wedding photos. It is a piece your bridesmaids can wear later with workwear, dinners, birthdays, holidays, wedding guest outfits and everyday styling.',
    'Lab-grown diamond earrings are strong bridesmaid gifts because they feel polished, thoughtful and wearable. Small diamond studs are the safest choice because they match almost every dress and can be worn again. Delicate drop earrings work beautifully with bridesmaid dresses that need soft movement. Butterfly earrings are ideal when the gift should feel meaningful, feminine and personal. Huggies and minimalist earrings work well for bridesmaids who prefer modern, simple jewellery.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Concetta Short earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Orsola drop earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings and Pave Hoops can all work for different bridesmaid gift needs. This guide helps shoppers choose jewellery by dress colour, wedding style, recipient style, metal colour and wearability.',
  ],
  shopLabel: 'Shop Bridesmaid Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose bridesmaid jewellery gifts',
    'Pick lab-grown diamond earrings for bridesmaids',
    'Decide between studs, drops, butterfly earrings, huggies, hoops and minimalist earrings',
    'Match bridesmaid jewellery to champagne, blush, sage, mint, black, green and satin dresses',
    'Choose jewellery that works on the wedding day and after',
    'Pick safe gifts when bridesmaids have different personal styles',
    'Build bridesmaid ear stack gift ideas',
    'Choose jewellery by metal colour and wedding palette',
    'Find IWantJewels product recommendations by bridesmaid gift need',
    'Plan image blocks, product modules, CTA sections and internal links for this page',
  ],
  image: '/blog-images/blog-image-53.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Bridesmaid Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Bridesmaid Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest bridesmaid gift', 'Small diamond studs', 'Cadenza S'],
          ['More polished bridesmaid gift', 'Medium diamond studs', 'Cadenza M'],
          ['Delicate bridesmaid styling', 'Short drop earrings', 'Concetta Short'],
          ['Romantic bridesmaid gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Satin bridesmaid dress', 'Drop earrings or studs', 'Orsola, Cadenza M'],
          ['Champagne bridesmaid dress', 'Gold drops or studs', 'Concetta Short, Cadenza S'],
          ['Blush bridesmaid dress', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Sage bridesmaid dress', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Modern bridesmaid gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist bridesmaid gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Bridesmaid ear stack gift', 'Small stud + huggie or drop + stud', 'Cadenza S + Amadea, Concetta Short + Cadenza S'],
          ['Wedding guest reuse gift', 'Studs, drops or butterfly earrings', 'Cadenza M, Orsola, Farfalla'],
        ],
      },
    ],
  },
  {
    heading: 'Why Earrings Make Good Bridesmaid Gifts',
    content: [
      { type: 'paragraph', text: 'Earrings make good bridesmaid gifts because they are practical, personal and easy to coordinate with wedding outfits. They do not require ring sizing, they are easier to match than necklaces, and they can be worn during the wedding without needing major styling changes.' },
      { type: 'paragraph', text: 'The strongest bridesmaid jewellery gifts are pieces that feel elegant for the wedding day but not too bridal for future wear. Small studs, delicate drops, huggies and butterfly earrings all work because they can be worn again with everyday outfits, date-night looks, workwear and wedding guest dresses.' },
      {
        type: 'table',
        headers: ['Why Earrings Work for Bridesmaids', 'Why It Matters'],
        rows: [
          ['Easy to match with dresses', 'Earrings work with many necklines and fabrics'],
          ['No ring sizing needed', 'Easier to gift to multiple people'],
          ['Useful after the wedding', 'Good earrings can be worn again'],
          ['Works for photos', 'Earrings frame the face beautifully'],
          ['Easy to personalise', 'Choose studs, drops, huggies or butterfly earrings'],
          ['Good for different styles', 'Classic, romantic, minimalist and modern options exist'],
          ['Strong thank-you gift', 'Feels thoughtful and wearable'],
          ['Easy to pair with hair styling', 'Works with buns, waves, ponytails and half-up hair'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, bridesmaid gift content should focus on repeat wear. The jewellery should look beautiful with the dress, but it should not feel like a one-day accessory.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Safest Bridesmaid Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest bridesmaid jewellery gifts are small diamond studs because they suit most dress colours, necklines and personal styles.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are the strongest safe bridesmaid gift. They are subtle enough for different bridesmaids, easy to wear after the wedding and useful for ear stacks. Cadenza M works better if the gift should feel more polished and visible.' },
      { type: 'paragraph', text: 'If your bridesmaids all have very different personal styles, choose studs. If the wedding style is soft and romantic, consider butterfly earrings or delicate drops. If the wedding is modern, huggies can work beautifully.' },
      {
        type: 'table',
        headers: ['Safe Bridesmaid Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'Safest bridal party gift', 'Cadenza S'],
          ['Medium diamond studs', 'More polished sparkle', 'Cadenza M'],
          ['Delicate short drops', 'Soft dress styling', 'Concetta Short'],
          ['Huggies', 'Modern bridesmaid gift', 'Amadea'],
          ['Minimalist earrings', 'Understated bridesmaid style', 'Laluce'],
          ['Butterfly earrings', 'Romantic bridal party gift', 'Farfalla'],
          ['Stud + huggie set', 'Giftable ear stack', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Bridesmaid Diamond Studs',
    content: [
      { type: 'paragraph', text: 'Diamond studs are the safest bridesmaid earrings because they work with almost every dress style and can be worn again easily.' },
      { type: 'paragraph', text: 'Cadenza S is best when the jewellery should feel subtle and coordinated across the bridal party. Cadenza M is better when the bridesmaid look needs more visible sparkle. Studs are also useful when the dresses already have satin shine, lace, embroidery, floral prints or detailed necklines.' },
      {
        type: 'table',
        headers: ['Bridesmaid Stud Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Safest bridesmaid gift', 'Cadenza S', 'Simple, subtle and wearable'],
          ['More visible wedding sparkle', 'Cadenza M', 'Polished but still classic'],
          ['Mixed bridesmaid styles', 'Cadenza S', 'Works across different personal tastes'],
          ['Detailed bridesmaid dresses', 'Cadenza S or Cadenza M', 'Keeps styling clean'],
          ['Bridesmaid ear stack support', 'Cadenza S', 'Works with drops, huggies and butterfly earrings'],
          ['Bridesmaid gift for repeat wear', 'Cadenza S', 'Useful after the wedding'],
          ['Classic bridal party gift', 'Cadenza M', 'Feels more elevated'],
        ],
      },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Bridesmaid Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Drop earrings are a beautiful bridesmaid jewellery choice when the dresses need soft movement.' },
      { type: 'paragraph', text: 'Short drops are usually better for bridesmaids than very long drops because they feel elegant without becoming too formal or distracting. Concetta Short is the strongest bridesmaid drop direction. Orsola can work when the dresses are simple, satin or more polished. Concetta Long is better for formal evening weddings or black-tie bridal party styling.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-69.jpg',
        content: [
          {
            type: 'table',
            headers: ['Bridesmaid Drop Need', 'Best Drop Direction', 'Product Direction'],
            rows: [
              ['Delicate bridesmaid styling', 'Short drops', 'Concetta Short'],
              ['Satin bridesmaid dress', 'Medium drops or studs', 'Orsola, Cadenza M'],
              ['Champagne bridesmaid dress', 'Soft gold drops', 'Concetta Short, Orsola'],
              ['Blush bridesmaid dress', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Sage bridesmaid dress', 'Small studs or short drops', 'Cadenza S, Concetta Short'],
              ['Formal bridesmaid look', 'Long drops', 'Concetta Long'],
              ['Simple bridesmaid dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Bridesmaid Butterfly Earrings',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are ideal when the bridesmaid gift should feel meaningful, feminine and personal.' },
      { type: 'paragraph', text: 'A butterfly can represent transformation, growth, beauty and new beginnings. That symbolism works beautifully for weddings because the day itself marks a new chapter. Butterfly earrings also feel soft and romantic, which makes them strong for blush, sage, mint, champagne, floral and pastel bridesmaid dresses.' },
      {
        type: 'table',
        headers: ['Bridesmaid Butterfly Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Meaningful bridesmaid gift', 'Butterfly earrings', 'Farfalla'],
          ['Romantic bridesmaid styling', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Blush bridesmaid dress', 'Butterfly earrings', 'Farfalla'],
          ['Sage bridesmaid dress', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Floral bridesmaid dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
          ['Pastel bridesmaid dress', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Butterfly ear stack gift', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Bridesmaid Huggies and Minimalist Earrings',
    content: [
      { type: 'paragraph', text: 'Huggies and minimalist earrings are strong bridesmaid gifts when the wedding look is modern, clean or understated.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings work well for bridesmaids who like everyday jewellery and ear stacks. Laluce minimalist diamond earrings are best when the jewellery should feel quiet and simple. These pieces are especially useful when bridesmaids have different styles because they are easier to wear after the wedding.' },
      {
        type: 'table',
        headers: ['Modern / Minimal Bridesmaid Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern bridesmaid gift', 'Huggies', 'Amadea'],
          ['Minimalist bridesmaid gift', 'Minimalist earrings', 'Laluce'],
          ['Everyday bridesmaid gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Bridesmaid ear stack', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Workwear-friendly gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Understated bridal party styling', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Travel-friendly wedding gift', 'Studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Minimalist jewellery styling guide', href: '#' },
    ],
  },
  {
    heading: 'Bridesmaid Jewellery by Dress Colour',
    content: [
      { type: 'paragraph', text: 'Dress colour is one of the easiest ways to choose bridesmaid jewellery.' },
      { type: 'paragraph', text: 'Champagne and blush dresses often look beautiful with gold, rose gold, soft drops and butterfly earrings. Sage and mint dresses work well with small studs, delicate drops and butterfly earrings. Black dresses can carry medium studs, drops or hoops. Satin dresses usually need balanced jewellery because the fabric already reflects light.' },
      {
        type: 'table',
        headers: ['Bridesmaid Dress Colour', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Champagne', 'Gold drops, small studs or medium studs', 'Concetta Short, Cadenza S, Cadenza M'],
          ['Blush', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Sage green', 'Small studs, butterfly earrings or delicate drops', 'Cadenza S, Farfalla, Concetta Short'],
          ['Mint green', 'Small studs or soft butterfly earrings', 'Cadenza S, Farfalla'],
          ['Dusty blue', 'White/silver-tone studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Black', 'Medium studs, drops or hoops', 'Cadenza M, Orsola, Pave Hoops'],
          ['Navy', 'Studs or refined drops', 'Cadenza M, Concetta Long'],
          ['Green', 'Gold drops, studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
          ['Red or burgundy', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Floral', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Bridesmaid Jewellery by Neckline',
    content: [
      { type: 'paragraph', text: 'The neckline helps decide whether studs, drops or butterfly earrings will look best.' },
      { type: 'paragraph', text: 'V-neck, sweetheart and off-shoulder dresses can carry drops beautifully. High-neck dresses usually work better with studs or huggies. Strapless dresses can carry drops or more visible earrings. Detailed necklines should be styled with cleaner earrings.' },
      {
        type: 'table',
        headers: ['Bridesmaid Dress Neckline', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['V-neck dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Sweetheart neckline', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Off-shoulder dress', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Strapless dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['High-neck dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Halter dress', 'Studs or slim drops', 'Cadenza M, Concetta Long'],
          ['Square-neck dress', 'Studs, hoops or soft drops', 'Cadenza M, Pave Hoops, Concetta Short'],
          ['Detailed neckline', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for V-neck dresses', href: '#' },
    ],
  },
  {
    heading: 'Bridesmaid Jewellery by Wedding Style',
    content: [
      { type: 'paragraph', text: 'The wedding style should influence the jewellery mood.' },
      { type: 'paragraph', text: 'A formal wedding can carry more polished studs or long drops. A romantic garden wedding may suit butterfly earrings or delicate drops. A modern city wedding may suit huggies or minimalist earrings. A beach or destination wedding usually needs lightweight, comfortable pieces.' },
      {
        type: 'table',
        headers: ['Wedding Style', 'Best Bridesmaid Jewellery Direction', 'Product Direction'],
        rows: [
          ['Romantic wedding', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Formal wedding', 'Medium studs or long drops', 'Cadenza M, Concetta Long'],
          ['Garden wedding', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Modern city wedding', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Destination wedding', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Black-tie wedding', 'Medium studs or refined drops', 'Cadenza M, Concetta Long'],
          ['Soft pastel wedding', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Minimal wedding', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Bridesmaid Jewellery by Recipient Style',
    content: [
      { type: 'paragraph', text: 'If bridesmaids have different tastes, choose jewellery that still feels wearable for each person.' },
      { type: 'paragraph', text: 'A classic bridesmaid may prefer studs. A romantic bridesmaid may love butterfly earrings. A minimalist bridesmaid may prefer Laluce or Cadenza S. A modern bridesmaid may like Amadea. An occasion dresser may prefer drops.' },
      {
        type: 'table',
        headers: ['Bridesmaid Style', 'Best Gift Direction', 'Product Direction'],
        rows: [
          ['Classic style', 'Diamond studs', 'Cadenza S, Cadenza M'],
          ['Minimalist style', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Romantic style', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Modern style', 'Huggies', 'Amadea'],
          ['Dressy style', 'Drop earrings', 'Orsola, Concetta Short'],
          ['Workwear-focused', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Ear stack lover', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['Safe gift recipient', 'Small studs', 'Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'Matching vs Individual Bridesmaid Jewellery',
    content: [
      { type: 'paragraph', text: 'You can either give every bridesmaid the same jewellery or choose individual pieces based on each person\'s style.' },
      { type: 'paragraph', text: 'Matching jewellery looks clean in photos and is easier to organise. Individual jewellery feels more personal and may be worn more often after the wedding. A good middle ground is to choose the same metal colour and similar sparkle level, but allow slight style differences.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-71.jpg',
        content: [
          {
            type: 'table',
            headers: ['Gift Approach', 'Best For', 'Product Direction'],
            rows: [
              ['Same earrings for everyone', 'Clean wedding photos and simple planning', 'Cadenza S, Cadenza M'],
              ['Same metal, different styles', 'Personalised but coordinated', 'Cadenza S, Farfalla, Concetta Short'],
              ['Same style, different metal colour', 'Matching design with personal metal preference', 'Cadenza S or Farfalla'],
              ['Individual gifts', 'Bridesmaids with very different styles', 'Cadenza S, Amadea, Farfalla, Laluce'],
              ['Stack gifts', 'Bridesmaids with multiple piercings', 'Cadenza S + Amadea'],
              ['Romantic matching gifts', 'Soft wedding theme', 'Farfalla'],
              ['Delicate matching gifts', 'Bridesmaid dresses with soft movement', 'Concetta Short'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For most bridal parties, Cadenza S is the safest matching gift. For a romantic wedding, Farfalla can be a meaningful matching gift. For a modern bridal party, Amadea or Cadenza S + Amadea can work well.' },
    ],
  },
  {
    heading: 'Bridesmaid Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour should match the wedding palette and the bridesmaids\' usual jewellery where possible.' },
      { type: 'paragraph', text: 'Yellow gold feels warm and classic. White or silver tone feels clean and modern. Rose gold feels soft and romantic. For bridesmaid gifts, choose one metal colour if you want the bridal party to look coordinated.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Bridesmaid Gift Feeling', 'Best Dress Colours'],
        rows: [
          ['Yellow gold', 'Warm, classic and elegant', 'Champagne, green, cream, black, burgundy'],
          ['White or silver tone', 'Clean, bright and formal', 'Navy, black, silver, dusty blue, cool pastels'],
          ['Rose gold', 'Soft, romantic and feminine', 'Blush, pink, champagne, sage, mint'],
          ['Mixed metals', 'Personal and modern', 'Individual bridesmaid gifts and ear stacks'],
        ],
      },
      { type: 'paragraph', text: 'If you are gifting the same earrings to all bridesmaids, yellow gold or white/silver tone is usually the safest. Rose gold can be beautiful for blush, champagne and romantic wedding palettes.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Bridesmaid Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts can feel more thoughtful when bridesmaids have multiple piercings.' },
      { type: 'paragraph', text: 'A two-piece stack is usually safer than a three-piece stack. The easiest bridesmaid stack is a small stud with a huggie. The most romantic stack is a butterfly earring with a small stud. The best delicate wedding stack is a short drop with a small stud.' },
      {
        type: 'table',
        headers: ['Bridesmaid Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest bridesmaid stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist bridesmaid stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic bridesmaid stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful bridesmaid stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Delicate bridesmaid stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Satin dress stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Modern bridesmaid stack', 'Huggie', 'Small stud', 'Amadea + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Bridesmaid Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Bridesmaid Jewellery Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are subtle, easy to match with multiple dresses and useful after the wedding.' },
      { type: 'subheading', text: 'For More Polished Bridesmaid Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They feel more visible while staying classic and wedding-appropriate.' },
      { type: 'subheading', text: 'For Delicate Bridesmaid Drop Earrings' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They add soft movement without becoming too bold.' },
      { type: 'subheading', text: 'For Romantic Bridesmaid Gifts' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. They work beautifully for soft, feminine and meaningful wedding gifting.' },
      { type: 'subheading', text: 'For Satin Bridesmaid Dresses' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings if the dresses are simple satin, or Cadenza M if the satin already has strong shine or detail.' },
      { type: 'subheading', text: 'For Modern Bridesmaid Gifts' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are close-fitting, wearable and easy to reuse after the wedding.' },
      { type: 'subheading', text: 'For Minimalist Bridesmaid Gifts' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for understated jewellery lovers.' },
      { type: 'subheading', text: 'For Bridesmaid Ear Stack Gifts' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea for the safest stack, or Concetta Short with Cadenza S for a delicate wedding-day stack.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Bridesmaid Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best safest bridesmaid gift', 'Small, subtle, repeatable and easy to match'],
          ['Cadenza M diamond stud earrings', 'Best polished bridesmaid sparkle', 'Classic with more visible shine'],
          ['Concetta Short earrings', 'Best delicate bridesmaid drop', 'Soft movement for wedding-day styling'],
          ['Farfalla butterfly earrings', 'Best romantic bridesmaid gift', 'Feminine, meaningful and soft'],
          ['Alidi Farfalla butterfly earrings', 'Best personal bridesmaid gift', 'Strong for meaningful bridal party gifting'],
          ['Orsola drop earrings', 'Best satin bridesmaid dress option', 'Adds elegant movement'],
          ['Amadea Huggie earrings', 'Best modern bridesmaid gift', 'Wearable after the wedding and stack-friendly'],
          ['Laluce minimalist diamond earrings', 'Best understated bridesmaid gift', 'Clean, quiet and easy to reuse'],
          ['Concetta Long earrings', 'Best formal bridesmaid styling', 'Works for black-tie or evening wedding looks'],
          ['Pave Hoops', 'Best modern shape option', 'Useful for simple bridesmaid dresses or after-wedding wear'],
          ['Lusso bold statement earrings', 'Not safest for bridesmaids', 'Better for party gifts or standout styling'],
        ],
      },
      { type: 'paragraph', text: 'Choose bridesmaid jewellery that looks elegant on the wedding day and wearable after it. Pick Cadenza S for the safest gift, Cadenza M for polished sparkle, Concetta Short for delicate drops, Farfalla for romantic meaning, Amadea for modern huggies and Laluce for minimalist style.' },
    ],
  },
  {
    heading: 'Common Bridesmaid Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that only works for the wedding day. Bridesmaid gifts should be useful after the wedding too.' },
      { type: 'paragraph', text: 'Another mistake is choosing earrings that are too bold for every bridesmaid. If your bridal party has different styles, small studs or huggies are usually safer than statement earrings.' },
      { type: 'paragraph', text: 'A third mistake is ignoring the dress neckline. High-neck dresses usually need studs or huggies, while V-neck, sweetheart and off-shoulder dresses can carry drops.' },
      { type: 'paragraph', text: 'Another mistake is choosing a metal colour that clashes with the wedding palette. Champagne, blush and sage often work well with gold or rose gold, while navy, black and silver can work well with white/silver tone.' },
      { type: 'paragraph', text: 'A fifth mistake is making all jewellery identical when bridesmaids have very different personal styles. Matching metal colour with slightly different earring styles can sometimes be more wearable.' },
      { type: 'paragraph', text: 'Finally, do not forget comfort. Bridesmaids may wear the earrings for several hours, through photos, ceremony, dinner and dancing.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Final Bridesmaid Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing bridesmaid jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Will the bridesmaids wear the jewellery after the wedding?',
          'Do the earrings match the dress colour?',
          'Do the earrings match the neckline?',
          'Is the wedding romantic, formal, modern, minimal or destination-style?',
          'Should all bridesmaids wear the same earrings?',
          'Would individual earring styles be more thoughtful?',
          'What metal colour works with the wedding palette?',
          'Are the earrings comfortable for long wear?',
          'Are the earrings safe enough for different personal styles?',
          'Do the bridesmaids have multiple piercings?',
          'Would an ear stack gift be useful?',
          'Should the gift feel classic, romantic, modern or minimal?',
          'Are the earrings easy to clean and store?',
          'Can the jewellery be worn with workwear, dinners and future events?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose small diamond studs. If you want soft wedding movement, choose delicate drops. If you want meaning, choose butterfly earrings. If you want modern repeat wear, choose huggies.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery should I gift bridesmaids?', answer: 'The best bridesmaid jewellery gifts are pieces they can wear on the wedding day and after. Small diamond studs, delicate drops, butterfly earrings, huggies and minimalist earrings are strong choices.' },
  { question: 'Are earrings a good bridesmaid gift?', answer: 'Yes, earrings are a good bridesmaid gift because they are easy to wear, easy to match with dresses and do not require ring sizing.' },
  { question: 'What are the safest bridesmaid earrings to gift?', answer: 'Small diamond studs are the safest bridesmaid earrings to gift because they work with most dress colours, necklines and personal styles.' },
  { question: 'Are lab-grown diamond earrings good bridesmaid gifts?', answer: 'Yes, lab-grown diamond earrings are strong bridesmaid gifts because they feel polished, special and wearable after the wedding.' },
  { question: 'What earrings should bridesmaids wear with satin dresses?', answer: 'Satin bridesmaid dresses work well with drop earrings or clean diamond studs. Orsola, Concetta Short and Cadenza M are strong directions.' },
  { question: 'What earrings should bridesmaids wear with blush dresses?', answer: 'Blush bridesmaid dresses work beautifully with butterfly earrings, short drops, rose gold styling or soft diamond studs.' },
  { question: 'What earrings should bridesmaids wear with sage green dresses?', answer: 'Sage green bridesmaid dresses work well with small studs, butterfly earrings or delicate short drops.' },
  { question: 'Should bridesmaid jewellery match?', answer: 'Bridesmaid jewellery can match, but it does not have to. Matching earrings look clean in photos, while individual styles can feel more personal and wearable.' },
  { question: 'What metal colour is best for bridesmaid jewellery?', answer: 'Choose based on the dress colour and wedding palette. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels soft and romantic.' },
  { question: 'What IWantJewels earrings are best for bridesmaid gifts?', answer: 'Cadenza S, Cadenza M, Concetta Short, Farfalla, Alidi Farfalla, Orsola, Amadea and Laluce are strong bridesmaid gift options depending on the dress, wedding style and recipient style.' },
]

const cta: V2CTABlock = {
  heading: 'Bridesmaid jewellery should feel elegant, thoughtful and reusable. Choose small diamond studs for the safest gift, delicate drops for soft wedding-day movement, butterfly earrings for romantic meaning, huggies for modern repeat wear and minimalist earrings for understated style.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want bridesmaid gifts with real diamond sparkle. Choose Cadenza S for safe bridesmaid gifting, Cadenza M for classic polish, Concetta Short for delicate drops, Farfalla or Alidi Farfalla for meaning, Orsola for satin dresses, Amadea for huggies and Laluce for minimalist styling.',
  primaryLabel: 'Shop Bridesmaid Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Wedding Guest Jewellery Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'bridesmaid-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'bridesmaid-jewellery-gifts', 3)
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
