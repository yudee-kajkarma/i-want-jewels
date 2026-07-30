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
  title: 'Jewellery Gifts for Sister',
  description:
    'Choose jewellery gifts for your sister with lab grown diamond earrings, studs, huggies, butterfly earrings, hoops, drops and birthday gift ideas.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/jewellery-gift-guides/jewellery-gifts-for-sister', locale),
  }
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-25.jpg',
  title: 'Jewellery Gifts for Sister:',
  subtitle: 'Earrings She Will Actually Wear',
  paragraphs: [
    'Jewellery for your sister should feel personal, stylish and wearable. The best gift is not only the piece that looks beautiful in the box. It is the piece that feels like her — something she can wear for birthdays, dinners, work, travel, parties, weddings, everyday outfits and special moments.',
    'Lab-grown diamond earrings are strong jewellery gifts for a sister because they feel special without being too formal or difficult to choose. Diamond studs are the safest option if you are unsure of her style. Huggies are perfect for a sister who likes modern everyday jewellery. Butterfly earrings are ideal when the gift should feel meaningful or symbolic. Hoops work well for a sister who likes visible jewellery and party styling. Drop earrings are best if she enjoys dinners, dresses and occasion outfits. Minimalist earrings are ideal if she prefers quiet, clean pieces.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Pave Hoops, Orsola drop earrings, Concetta Short earrings, Concetta Long earrings and Lusso bold statement earrings all work for different sister gift needs.',
  ],
  shopLabel: 'Shop Jewellery Gifts for Sister',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery gifts for your sister.',
    'Pick lab-grown diamond earrings as a birthday, milestone or everyday gift.',
    'Decide between studs, huggies, butterfly earrings, hoops, drops, minimalist earrings and bold earrings.',
    'Choose safe jewellery gifts when you are unsure of her style.',
    'Find meaningful jewellery gifts with symbolism.',
    'Match earrings to her personal style, lifestyle, outfits and metal colour.',
    'Choose jewellery for older sisters, younger sisters, sisters-in-law and best-friend sisters.',
    'Build giftable ear stack ideas.',
  ],
  image: '/blog-images/blog-image-77.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Jewellery Gift Selector for Sister',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Sister Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest jewellery gift for sister', 'Small or medium diamond studs', 'Cadenza S, Cadenza M'],
          ['First diamond-style gift', 'Small diamond studs', 'Cadenza S'],
          ['Classic birthday gift', 'Medium diamond studs', 'Cadenza M'],
          ['Meaningful gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Modern everyday gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Party gift for sister', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Dinner or occasion gift', 'Drop earrings', 'Orsola, Concetta Short'],
          ['Gift for older sister', 'Studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
          ['Gift for younger sister', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Gift for sister-in-law', 'Safe studs, huggies or delicate drops', 'Cadenza M, Amadea, Concetta Short'],
          ['Giftable ear stack', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['If you are unsure of her style', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
    ],
  },
  {
    heading: 'What Jewellery Should You Buy for Your Sister?',
    content: [
      { type: 'paragraph', text: 'The best jewellery to buy for your sister is jewellery that matches her real style. A sister gift can feel fun, meaningful, stylish or practical, but it should not feel like something she would never wear.' },
      { type: 'paragraph', text: 'If she wears jewellery every day, choose studs, huggies or minimalist earrings. If she loves dressing up, choose drops, hoops or bold earrings. If she likes soft and meaningful pieces, butterfly earrings are a strong choice. If you are unsure, diamond studs are the safest direction because they work with many outfits and occasions.' },
      {
        type: 'table',
        headers: ['What to Consider', 'Why It Matters'],
        rows: [
          ['Her usual jewellery', 'Shows whether she prefers studs, hoops, huggies, drops or bold earrings'],
          ['Occasion', 'Birthday, milestone, graduation, wedding or everyday gift needs a different mood'],
          ['Personal style', 'Classic, modern, romantic, minimalist and bold styles need different products'],
          ['Metal colour', 'Helps the gift match what she already wears'],
          ['Lifestyle', 'Daily jewellery should be comfortable and repeatable'],
          ['Outfit habits', 'Workwear, party outfits and casual clothes need different earrings'],
          ['Ear piercings', 'Multiple piercings make ear stack gifts stronger'],
          ['Rewear value', 'A strong gift should be useful after the occasion'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Safest Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'The safest jewellery gifts for a sister are usually studs, huggies or minimalist earrings because they are easy to wear and not too style-specific.' },
      { type: 'paragraph', text: 'Cadenza S is the safest subtle choice. Cadenza M is better when the gift should feel more polished. Amadea is best for a modern everyday jewellery lover. Laluce works well if she prefers understated styling.' },
      { type: 'paragraph', text: 'Butterfly earrings, hoops, drops and bold earrings can be excellent gifts too, but they depend more on her personality and wardrobe.' },
      {
        type: 'table',
        headers: ['Safe Sister Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'Safe first gift, subtle everyday sparkle', 'Cadenza S'],
          ['Medium diamond studs', 'Classic sparkle gift', 'Cadenza M'],
          ['Huggies', 'Modern everyday jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Simple ear stack gift', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift if she likes soft styling', 'Farfalla, Alidi Farfalla'],
          ['Short drops', 'Delicate occasion gift', 'Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for your sister should feel thoughtful, fun and wearable. It can be classic, modern, meaningful or bold depending on her style.' },
      { type: 'paragraph', text: 'Diamond studs are safest for a birthday gift. Butterfly earrings are meaningful when the gift should represent growth, beauty or a new chapter. Huggies are excellent for a sister who likes everyday jewellery. Hoops or bold earrings work well if she likes party looks. Drop earrings are stronger when she enjoys dinners, dresses and special occasions.' },
      {
        type: 'table',
        headers: ['Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe birthday gift', 'Medium diamond studs', 'Cadenza M'],
          ['Subtle birthday gift', 'Small studs', 'Cadenza S'],
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla'],
          ['Modern birthday gift', 'Huggies', 'Amadea'],
          ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
          ['Birthday dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Soft birthday gift', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Birthday ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Meaningful Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'A meaningful jewellery gift for a sister should feel connected to her life, personality or a moment she is going through.' },
      { type: 'paragraph', text: 'Butterfly earrings are especially strong for meaningful gifts because a butterfly can symbolise transformation, growth, beauty, freedom and new beginnings. This makes them useful for birthdays, graduations, new jobs, personal milestones, big moves and encouragement gifts.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-79.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Sister Gift Moment', 'Why It Works', 'Product Direction'],
            rows: [
              ['Birthday', 'Symbolises growth and a new year', 'Farfalla'],
              ['Graduation', 'Represents transformation and new beginnings', 'Farfalla'],
              ['New job', 'Symbolises a new chapter', 'Farfalla'],
              ['Moving city or travel milestone', 'Represents freedom and change', 'Alidi Farfalla'],
              ['Personal achievement', 'Feels thoughtful and symbolic', 'Farfalla'],
              ['Encouragement gift', 'Represents hope and beauty', 'Alidi Farfalla'],
              ['Sister bond gift', 'Soft, personal and memorable', 'Farfalla'],
              ['Meaningful ear stack', 'Combines symbolism and sparkle', 'Farfalla + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Everyday Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'Everyday jewellery gifts are strong because your sister can actually use them often. These gifts should be comfortable, easy to style and not too outfit-specific.' },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are the strongest everyday directions. Hoops can work if she likes more visible daily jewellery. Butterfly earrings can also work for everyday styling if her style is soft and feminine.' },
      {
        type: 'table',
        headers: ['Everyday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest everyday gift', 'Small studs', 'Cadenza S'],
          ['Polished everyday sparkle', 'Medium studs', 'Cadenza M'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist everyday gift', 'Minimalist earrings', 'Laluce'],
          ['Everyday ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Weekend everyday gift', 'Hoops', 'Pave Hoops'],
          ['Romantic everyday gift', 'Butterfly earrings', 'Farfalla'],
          ['Daily-to-dinner gift', 'Medium studs or drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Everyday lab-grown diamond earrings guide', href: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
    ],
  },
  {
    heading: 'Modern Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'Modern jewellery gifts work well for sisters who like clean styling, ear stacks, huggies, hoops and outfits that feel current without being too formal.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are one of the strongest modern sister gifts because they are wearable and stack-friendly. Pave Hoops are better for someone who likes more visible shape. Cadenza S works well as a support stud for modern stacks.' },
      {
        type: 'table',
        headers: ['Modern Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Modern party gift', 'Hoops', 'Pave Hoops'],
          ['Modern ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Workwear modern gift', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Casual modern styling', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Minimal modern gift', 'Minimalist earrings', 'Laluce'],
          ['Modern birthday gift', 'Huggies, hoops or studs', 'Amadea, Pave Hoops, Cadenza M'],
          ['Safer modern gift', 'Small studs', 'Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },
  {
    heading: 'Minimalist Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'Minimalist jewellery gifts are best when your sister prefers quiet, clean and easy-to-repeat pieces.' },
      { type: 'paragraph', text: 'If she rarely wears bold jewellery, avoid dramatic earrings. Choose small studs, huggies or minimalist earrings instead. These pieces can be worn with workwear, casual outfits, travel outfits and simple dresses.' },
      {
        type: 'table',
        headers: ['Minimalist Sister Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Quiet diamond gift', 'Small studs', 'Cadenza S'],
          ['Clean sparkle gift', 'Medium studs', 'Cadenza M'],
          ['Minimalist detail gift', 'Minimalist earrings', 'Laluce'],
          ['Modern minimal gift', 'Huggies', 'Amadea'],
          ['Minimal ear stack gift', 'Stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear-friendly gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Travel-friendly gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Subtle meaningful gift', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },
  {
    heading: 'Party Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'Party jewellery gifts work well if your sister enjoys birthdays, dinners, evenings out, wedding guest outfits or styling a simple outfit with visible jewellery.' },
      { type: 'paragraph', text: 'Pave Hoops are strong for a modern party gift. Lusso is best if she genuinely likes standout jewellery. Orsola works when the gift should feel elegant rather than bold. Cadenza M is safer when you are unsure.' },
      {
        type: 'table',
        headers: ['Party Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Modern party gift', 'Hoops', 'Pave Hoops'],
          ['Bold party gift', 'Bold statement earrings', 'Lusso'],
          ['Elegant party gift', 'Drop earrings', 'Orsola'],
          ['Safe party sparkle', 'Medium studs', 'Cadenza M'],
          ['Birthday party gift', 'Hoops, butterfly earrings or bold earrings', 'Pave Hoops, Farfalla, Lusso'],
          ['Black dress gift', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Party ear stack', 'Hoop/drop/bold + small stud', 'Pave Hoops + Cadenza S, Orsola + Cadenza S, Lusso + Cadenza S'],
          ['If unsure', 'Medium studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },
  {
    heading: 'Jewellery Gifts for Older Sister, Younger Sister and Sister-in-Law',
    content: [
      { type: 'paragraph', text: 'The best gift can change depending on the relationship and the style of the person receiving it.' },
      { type: 'paragraph', text: 'An older sister may appreciate classic studs, polished drops or modern huggies. A younger sister may prefer huggies, hoops, small studs or butterfly earrings. A sister-in-law gift should usually stay safe, wearable and not too personal unless you know her style well.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Gift Direction', 'Product Direction'],
        rows: [
          ['Older sister', 'Studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
          ['Younger sister', 'Small studs, huggies, hoops or butterfly earrings', 'Cadenza S, Amadea, Pave Hoops, Farfalla'],
          ['Sister-in-law', 'Safe studs, huggies or delicate drops', 'Cadenza M, Amadea, Concetta Short'],
          ['Best-friend sister', 'Hoops, huggies or butterfly earrings', 'Pave Hoops, Amadea, Farfalla'],
          ['Sister who works in office', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Sister who loves parties', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Sister who loves minimal style', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Sister who loves romantic pieces', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Her Personal Style',
    content: [
      { type: 'paragraph', text: 'Your sister\'s personal style should guide the gift more than the occasion alone. A sister who loves minimalist jewellery may not wear bold earrings even for a big birthday. A sister who loves romantic styling may prefer butterfly earrings over classic studs.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-81.jpg',
        content: [
          {
            type: 'table',
            headers: ['Her Style', 'Best Gift Direction', 'Product Direction'],
            rows: [
              ['Classic', 'Diamond studs', 'Cadenza M, Cadenza S'],
              ['Minimalist', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
              ['Romantic', 'Butterfly earrings or drops', 'Farfalla, Alidi Farfalla, Orsola'],
              ['Modern', 'Huggies or hoops', 'Amadea, Pave Hoops'],
              ['Soft feminine', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['Workwear-focused', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Party style', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
              ['Occasion dresser', 'Drop earrings', 'Orsola, Concetta Short, Concetta Long'],
              ['Ear stack lover', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
              ['Safe gift recipient', 'Studs', 'Cadenza S, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Hoop vs huggie earrings', href: '/resources/earring-style-guides/hoop-vs-huggie-earrings' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Outfit and Lifestyle',
    content: [
      { type: 'paragraph', text: 'A strong jewellery gift should fit what your sister actually wears. If she wears casual outfits and workwear often, studs or huggies may be the most useful. If she loves dinners and dresses, Orsola or Concetta Short may feel more special. If she loves parties, Pave Hoops or Lusso may be stronger.' },
      {
        type: 'table',
        headers: ['Outfit / Lifestyle', 'Best Jewellery Gift Direction', 'Product Direction'],
        rows: [
          ['Everyday casual outfits', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Workwear', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Romantic dresses', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Satin dresses', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Black dresses', 'Drops, hoops, studs or bold earrings', 'Orsola, Pave Hoops, Cadenza M, Lusso'],
          ['Red dresses', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Green dresses', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Party outfits', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Minimal outfits', 'Minimalist earrings or studs', 'Laluce, Cadenza S'],
          ['Travel-heavy lifestyle', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Ear stack wearer', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['Wedding guest outfits', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the easiest ways to make the gift feel right. The safest choice is the metal colour your sister already wears most often.' },
      { type: 'paragraph', text: 'If she wears gold rings, bracelets or necklaces, choose yellow gold. If she wears silver-tone jewellery, choose white or silver tone. If she likes soft romantic styling, rose gold can work beautifully, especially for butterfly earrings.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-83.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and stylish', 'Everyday gifts, birthday gifts, black dresses, green dresses'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, workwear, formal outfits'],
              ['Rose gold', 'Soft, feminine and romantic', 'Butterfly earrings, blush outfits, meaningful gifts'],
              ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For sister gifts, avoid choosing metal colour only because it is trending. Match what she already wears first.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Giftable Ear Stack Ideas for Sister',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts work well if your sister has multiple piercings or likes layered jewellery. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: 'The safest stack is a small stud with a huggie. The most meaningful stack is a butterfly earring with a small stud. The best party stack is a hoop or bold earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Giftable Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest sister stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist stack gift', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Meaningful stack gift', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Soft feminine stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Dinner stack gift', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft occasion stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal stack gift', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Party stack gift', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Hoop stack gift', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Jewellery Gift for Your Sister' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are classic, wearable and safer when you are unsure of her exact style.' },
      { type: 'subheading', text: 'For a Modern Everyday Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are close-fitting, wearable and useful for daily styling or ear stacks.' },
      { type: 'subheading', text: 'For a Minimalist Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for a sister who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Meaningful Gift' },
      { type: 'paragraph', text: 'Choose Farfalla or Alidi Farfalla butterfly earrings. They work well for birthdays, graduations, new chapters and sister bond gifts.' },
      { type: 'subheading', text: 'For a Birthday Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for dinners, birthday outings and dressier outfits.' },
      { type: 'subheading', text: 'For a Soft Occasion Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They are delicate and strong for blush, champagne, pastel, bridesmaid and wedding guest styling.' },
      { type: 'subheading', text: 'For a Party Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops or Lusso bold statement earrings only if your sister likes visible jewellery. If you are unsure, Cadenza M is safer.' },
      { type: 'subheading', text: 'For an Ear Stack Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea for the safest stack, Farfalla with Cadenza S for a meaningful stack, or Pave Hoops with Cadenza S for a modern party stack.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Sister Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best safe first gift', 'Small, subtle and wearable'],
          ['Cadenza M diamond stud earrings', 'Best classic sparkle gift', 'Polished, timeless and easy to style'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Quiet, clean and easy for minimal style'],
          ['Farfalla butterfly earrings', 'Best meaningful birthday gift', 'Symbolic, soft and connected to growth'],
          ['Alidi Farfalla butterfly earrings', 'Best meaningful sister gift', 'Strong for personal milestones and soft styling'],
          ['Pave Hoops', 'Best modern party gift', 'Adds shape and sparkle'],
          ['Orsola drop earrings', 'Best dinner or occasion gift', 'Elegant movement for dresses and events'],
          ['Concetta Short earrings', 'Best soft occasion gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal evening gift', 'Refined and polished for dressy occasions'],
          ['Lusso bold statement earrings', 'Best bold gift', 'Strong for a sister who loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the gift by her style first. Pick Cadenza S or Cadenza M for safe sparkle, Amadea for modern daily wear, Laluce for minimal jewellery, Farfalla for meaning, Pave Hoops for modern shape, Orsola for dinners and Lusso for bold party styling.' },
    ],
  },
  {
    heading: 'Common Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery based on your own style instead of your sister\'s. A gift should feel like something she would naturally wear.' },
      { type: 'paragraph', text: 'Another mistake is choosing bold earrings for someone who prefers minimalist jewellery. If her everyday style is simple, choose studs, huggies or minimalist earrings instead.' },
      { type: 'paragraph', text: 'A third mistake is guessing metal colour. Look at what she already wears. If most of her jewellery is gold, choose gold. If it is silver or white-tone, choose that direction.' },
      { type: 'paragraph', text: 'Another mistake is making the gift too formal when she mostly wears casual outfits. Everyday studs or huggies may be more useful than occasion-only earrings.' },
      { type: 'paragraph', text: 'A fifth mistake is choosing symbolic jewellery when she prefers classic pieces. Butterfly earrings are meaningful, but Cadenza M may be safer for someone traditional.' },
      { type: 'paragraph', text: 'Finally, do not forget repeat wear. The best jewellery gift for your sister should feel special and still be useful after the birthday, milestone or celebration is over.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing jewellery for your sister, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is this for a birthday, milestone, graduation, wedding, party or everyday gift?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would diamond studs be safer?',
          'Is the gift meant to feel stylish, emotional, practical or fun?',
          'Can the earrings be worn with more than one outfit?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack gift feel more thoughtful than one pair?',
          'Are the earrings comfortable for long wear?',
          'Will the gift still feel wearable after the occasion?',
          'Is the design easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose diamond studs. If you want meaning, choose butterfly earrings. If she likes modern jewellery, choose huggies or hoops. If she dresses up often, choose drops.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery should I buy for my sister?', answer: 'The best jewellery to buy for your sister is something that matches her style and lifestyle. Diamond studs are safest, huggies are modern, butterfly earrings feel meaningful, hoops are stylish, and drop earrings are strong for dinners and occasions.' },
  { question: 'Are earrings a good gift for a sister?', answer: 'Yes, earrings are a good gift for a sister because they are wearable, personal and easier to choose than rings.' },
  { question: 'Are lab-grown diamond earrings a good gift for a sister?', answer: 'Yes, lab-grown diamond earrings are strong sister gifts because they feel special while still being wearable for birthdays, everyday outfits, dinners and occasions.' },
  { question: 'What are the safest earrings to gift a sister?', answer: 'Diamond studs are the safest earrings to gift a sister because they are classic, simple and easy to wear with many outfits.' },
  { question: 'What jewellery should I buy my sister for her birthday?', answer: 'For your sister\'s birthday, choose diamond studs for safe sparkle, butterfly earrings for meaning, huggies for modern daily wear, or hoops if she likes visible jewellery.' },
  { question: 'Are butterfly earrings a meaningful gift for a sister?', answer: 'Yes, butterfly earrings can be a meaningful gift because they can symbolise growth, beauty, transformation and new beginnings.' },
  { question: 'What jewellery should I buy for my younger sister?', answer: 'Small studs, huggies, hoops or butterfly earrings can work well for a younger sister depending on her style.' },
  { question: 'What jewellery should I buy for my older sister?', answer: 'Medium studs, drop earrings or huggies are strong choices for an older sister because they feel polished and wearable.' },
  { question: 'What metal colour should I choose for my sister\'s jewellery gift?', answer: 'Choose the metal colour she already wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels soft and feminine.' },
  { question: 'What IWantJewels earrings are best for sister gifts?', answer: 'Cadenza S, Cadenza M, Amadea, Laluce, Farfalla, Alidi Farfalla, Pave Hoops, Orsola, Concetta Short and Lusso are strong sister gift options depending on her style and the occasion.' },
]

const cta: V2CTABlock = {
  heading: 'Jewellery gifts for your sister should feel stylish, thoughtful and wearable. Choose diamond studs for safe sparkle, huggies for modern everyday jewellery, butterfly earrings for meaning, hoops for visible shape, drops for dinners and bold earrings only if she loves standout styling.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a jewellery gift with real diamond sparkle. Choose Cadenza S for a safe first gift, Cadenza M for classic polish, Amadea for huggies, Laluce for minimalist style, Farfalla for meaning, Pave Hoops for modern styling, Orsola for dinners and Lusso for party-ready sparkle.',
  primaryLabel: 'Shop Jewellery Gifts for Sister',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts for Her',
  secondaryHref: '/resources/jewellery-gift-guides/jewellery-gifts-for-her',
  tertiaryLabel: 'Read the Birthday Jewellery Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'jewellery-gifts-for-sister')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'jewellery-gifts-for-sister', 3)
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
