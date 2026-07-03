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
  title: 'Birthday Jewellery Gifts for Her',
  description:
    'Choose birthday jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and meaningful gift ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-61.jpg',
  title: 'Birthday Jewellery Gifts for Her:',
  subtitle: 'How to Choose Earrings She Will Actually Wear',
  paragraphs: [
    'Birthday jewellery should feel thoughtful, wearable and personal. The best birthday gift is not always the biggest or boldest piece. It is the piece the recipient will actually wear again after the birthday is over.',
    'Lab-grown diamond earrings are strong birthday gifts because they feel special while still being practical. Diamond studs are the safest choice. Huggies are perfect for someone who likes modern everyday jewellery. Butterfly earrings are ideal when the birthday gift should feel meaningful. Drop earrings work well for someone who enjoys dinners, dresses and occasion styling. Hoops are better for someone who likes visible jewellery and party-ready outfits.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Orsola drop earrings, Concetta Short earrings, Pave Hoops and Lusso bold statement earrings all work for different birthday gift needs. This guide helps shoppers choose the right piece based on the person, the meaning, the style and how often the earrings can be worn.',
  ],
  shopLabel: 'Shop Birthday Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose birthday jewellery gifts for her',
    'Pick lab-grown diamond earrings as a birthday gift',
    'Decide between studs, huggies, butterfly earrings, hoops, drops and minimalist earrings',
    'Choose safe jewellery gifts when you are unsure of her style',
    'Find meaningful birthday gifts with symbolism',
    'Pick jewellery for girlfriends, wives, sisters, daughters, mothers, bridesmaids and friends',
    'Choose earrings based on classic, minimalist, romantic, modern or bold style',
    'Build birthday ear stack gift ideas',
    'Match birthday jewellery with metal colour and outfit style',
    'Plan image blocks, product modules, CTA sections and internal links for this page',
  ],
  image: '/blog-images/blog-image-63.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Birthday Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Birthday Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest birthday gift', 'Small or medium diamond studs', 'Cadenza S, Cadenza M'],
          ['First diamond birthday gift', 'Small studs', 'Cadenza S'],
          ['Classic birthday sparkle', 'Medium studs', 'Cadenza M'],
          ['Modern birthday gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist birthday gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Romantic birthday gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Birthday dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Soft birthday gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Birthday ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['Workwear birthday gift', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
        ],
      },
    ],
  },
  {
    heading: 'Why Earrings Make Strong Birthday Gifts',
    content: [
      { type: 'paragraph', text: 'Earrings make strong birthday gifts because they are personal but easier to choose than many other jewellery pieces. Rings need sizing. Necklaces depend heavily on neckline and chain length. Earrings are usually simpler to gift because the focus is style, comfort and metal colour.' },
      { type: 'paragraph', text: 'Lab-grown diamond earrings also feel special without being limited to one day. A good pair can be worn for work, birthdays, dinners, holidays, weddings, travel, parties and everyday outfits.' },
      {
        type: 'table',
        headers: ['Why Earrings Work for Birthdays', 'Why It Matters'],
        rows: [
          ['Easy to wear often', 'The gift is useful after the birthday'],
          ['Easier than rings', 'No ring sizing needed'],
          ['Personal but practical', 'Feels thoughtful without being too risky'],
          ['Works across styles', 'Studs, huggies, drops, hoops and butterfly earrings all suit different people'],
          ['Strong for milestones', 'Diamonds feel special for important birthdays'],
          ['Easy to style', 'Earrings can work with many outfits'],
          ['Good for ear stacks', 'One gift can start or complete a stack'],
          ['Suitable for many relationships', 'Works for partners, sisters, daughters, mothers and friends'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, birthday gift content should always move shoppers from "what should I buy?" to "which product fits her style?" This makes the page useful for search and strong for conversion.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Safest Birthday Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest birthday jewellery gifts are usually diamond studs because they are classic, wearable and not too style-specific.' },
      { type: 'paragraph', text: 'If the recipient wears jewellery often but you are not sure what she likes, choose Cadenza S or Cadenza M. Cadenza S is better for subtle daily wear. Cadenza M is better when the birthday gift should feel more special and visible.' },
      { type: 'paragraph', text: 'Huggies are a strong safe choice for someone who likes modern jewellery. Minimalist earrings are ideal for someone who wears simple pieces. Butterfly earrings are meaningful but more personal, so they are best when the recipient likes romantic or symbolic jewellery.' },
      {
        type: 'table',
        headers: ['Safe Birthday Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'First diamond gift, subtle everyday wear', 'Cadenza S'],
          ['Medium diamond studs', 'Classic birthday sparkle', 'Cadenza M'],
          ['Huggies', 'Modern daily jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Giftable ear stack', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful birthday gift', 'Farfalla, Alidi Farfalla'],
          ['Soft drops', 'Dinner or occasion styling', 'Orsola, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Meaningful Birthday Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A meaningful birthday gift should feel connected to the person, not just the date.' },
      { type: 'paragraph', text: 'Butterfly earrings are one of the strongest meaningful birthday gifts because the butterfly can represent transformation, growth, beauty, freedom and new beginnings. That meaning fits birthdays naturally because birthdays mark a new year of life.' },
      { type: 'paragraph', text: 'Drop earrings can feel meaningful when the gift is connected to a birthday dinner or special celebration. Studs can feel meaningful when they are the person\'s first diamond earrings. Huggies can feel meaningful when they become a daily piece she wears often.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-65.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Birthday Gift Idea', 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise growth and new beginnings', 'Farfalla, Alidi Farfalla'],
              ['First diamond studs', 'Feels classic and memorable', 'Cadenza S, Cadenza M'],
              ['Everyday huggies', 'Becomes a repeat-wear gift', 'Amadea'],
              ['Romantic drop earrings', 'Good for birthday dinner', 'Orsola'],
              ['Minimalist diamond earrings', 'Quiet but thoughtful', 'Laluce'],
              ['Birthday ear stack', 'Feels styled and personal', 'Cadenza S + Amadea'],
              ['Butterfly + stud stack', 'Combines meaning and sparkle', 'Farfalla + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Birthday Diamond Studs',
    content: [
      { type: 'paragraph', text: 'Diamond studs are the best birthday gift when the buyer wants something safe, classic and wearable.' },
      { type: 'paragraph', text: 'Cadenza S is ideal for someone who likes subtle jewellery or is receiving her first diamond earrings. Cadenza M is better when the birthday gift should feel more polished and visible.' },
      { type: 'paragraph', text: 'Studs are also strong because they work with many outfits. They can be worn with workwear, casual outfits, birthday dinners, satin dresses, black dresses, travel outfits and ear stacks.' },
      {
        type: 'table',
        headers: ['Birthday Stud Gift Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['First diamond earrings', 'Cadenza S', 'Small, safe and wearable'],
          ['Classic birthday sparkle', 'Cadenza M', 'More visible but still easy'],
          ['Workwear birthday gift', 'Cadenza M or Cadenza S', 'Clean and professional'],
          ['Minimalist birthday gift', 'Cadenza S', 'Subtle and simple'],
          ['Gift for daily wear', 'Cadenza S or Cadenza M', 'Easy to repeat'],
          ['Gift for ear stack lover', 'Cadenza S', 'Works as a support stud'],
          ['Birthday gift for unsure style', 'Cadenza M', 'Safest polished option'],
        ],
      },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Birthday Huggie Earrings',
    content: [
      { type: 'paragraph', text: 'Huggies are a strong birthday gift for someone who likes modern, easy, everyday jewellery.' },
      { type: 'paragraph', text: 'They feel more styled than studs but still close-fitting and wearable. They are also useful for ear stacks. A huggie can be worn alone or paired with a small stud for a simple daily stack.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are the strongest IWantJewels direction for birthday huggies. Pair them with Cadenza S if the buyer wants a two-piece stack gift.' },
      {
        type: 'table',
        headers: ['Birthday Huggie Gift Need', 'Product Combination', 'Best For'],
        rows: [
          ['Modern birthday gift', 'Amadea', 'Everyday shape'],
          ['Simple ear stack gift', 'Cadenza S + Amadea', 'Best starter stack'],
          ['Workwear birthday gift', 'Cadenza M + Amadea', 'Polished daily styling'],
          ['Minimal huggie gift', 'Laluce + Amadea', 'Soft and understated'],
          ['Travel-friendly birthday gift', 'Cadenza S + Amadea', 'Easy to repeat'],
          ['Gift for multiple piercings', 'Cadenza S + Amadea', 'Stack-friendly'],
          ['Daily birthday gift', 'Amadea', 'Modern and wearable'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Birthday Butterfly Earrings',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are ideal when the birthday gift should feel personal and symbolic.' },
      { type: 'paragraph', text: 'A butterfly can represent transformation, growth, beauty and new beginnings. For birthdays, this meaning feels very natural because each birthday marks a new chapter.' },
      { type: 'paragraph', text: 'Farfalla butterfly earrings are strong for a meaningful birthday gift. Alidi Farfalla butterfly earrings are strong for romantic or gift-led birthday styling. Pair either with Cadenza S if the shopper wants a butterfly ear stack gift.' },
      {
        type: 'table',
        headers: ['Birthday Butterfly Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla'],
          ['Romantic birthday gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Soft birthday outfit', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Birthday gift for growth/new chapter', 'Butterfly earrings', 'Farfalla'],
          ['Birthday ear stack gift', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Minimal romantic birthday gift', 'Butterfly + minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Birthday gift for pastel style', 'Butterfly earrings', 'Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Birthday Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Drop earrings are a beautiful birthday gift when the recipient enjoys dressing up, going to dinners, wearing satin dresses, attending events or styling occasion outfits.' },
      { type: 'paragraph', text: 'Orsola is the strongest all-round birthday drop earring because it adds movement and elegance. Concetta Short is better for delicate birthday styling. Concetta Long is better for formal birthday dinners or evening events.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-67.jpg',
        content: [
          {
            type: 'table',
            headers: ['Birthday Drop Gift Need', 'Best Drop Direction', 'Product Direction'],
            rows: [
              ['Birthday dinner gift', 'Medium drops', 'Orsola'],
              ['Soft birthday gift', 'Short drops', 'Concetta Short'],
              ['Formal birthday dinner', 'Long drops', 'Concetta Long'],
              ['Romantic birthday gift', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
              ['Satin dress birthday look', 'Drop earrings', 'Orsola'],
              ['Black dress birthday look', 'Drops or bold earrings', 'Orsola, Lusso'],
              ['Gift for occasion dresser', 'Drop earrings', 'Orsola, Concetta Short'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Birthday Hoop Earrings',
    content: [
      { type: 'paragraph', text: 'Hoop earrings are a good birthday gift when the recipient likes visible jewellery, modern styling or party outfits.' },
      { type: 'paragraph', text: 'Pave Hoops are stronger than studs when the buyer wants shape and sparkle. They work well for weekend outfits, black dresses, party looks, simple dresses and ear stacks. If the recipient prefers subtle jewellery, studs or huggies may be safer.' },
      {
        type: 'table',
        headers: ['Birthday Hoop Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern birthday gift', 'Hoops', 'Pave Hoops'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Weekend jewellery gift', 'Hoops', 'Pave Hoops'],
          ['Hoop ear stack gift', 'Hoop + small stud', 'Pave Hoops + Cadenza S'],
          ['Black dress birthday look', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Gift for visible jewellery lover', 'Hoops', 'Pave Hoops'],
          ['Safer hoop alternative', 'Huggies', 'Amadea'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond hoop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },
  {
    heading: 'Minimalist Birthday Jewellery',
    content: [
      { type: 'paragraph', text: 'Minimalist birthday jewellery is ideal for someone who wears clean, simple and understated pieces.' },
      { type: 'paragraph', text: 'If she does not wear bold jewellery, avoid oversized earrings. Choose small studs, minimalist earrings or huggies instead. These pieces feel thoughtful without forcing a style she may not wear.' },
      {
        type: 'table',
        headers: ['Minimalist Birthday Gift Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Quiet diamond gift', 'Small studs', 'Cadenza S'],
          ['Clean sparkle gift', 'Medium studs', 'Cadenza M'],
          ['Minimalist detail gift', 'Minimalist earrings', 'Laluce'],
          ['Modern minimal gift', 'Huggies', 'Amadea'],
          ['Minimal ear stack gift', 'Stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear birthday gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Travel-friendly birthday gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Soft romantic minimal gift', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Birthday Jewellery by Recipient Style',
    content: [
      { type: 'paragraph', text: 'The best birthday gift depends more on the recipient\'s style than the occasion.' },
      { type: 'paragraph', text: 'A classic jewellery wearer may love studs. A modern dresser may prefer huggies or hoops. A romantic person may love butterfly earrings. A minimalist person may prefer Laluce or Cadenza S. A bold dresser may prefer Lusso or Pave Hoops.' },
      {
        type: 'table',
        headers: ['Recipient Style', 'Best Birthday Jewellery Direction', 'Product Direction'],
        rows: [
          ['Classic style', 'Diamond studs', 'Cadenza M, Cadenza S'],
          ['Minimalist style', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern style', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Romantic style', 'Butterfly earrings or drops', 'Farfalla, Alidi Farfalla, Orsola'],
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
    heading: 'Birthday Jewellery by Relationship',
    content: [
      { type: 'paragraph', text: 'The relationship can also help decide the gift direction.' },
      { type: 'paragraph', text: 'A romantic partner may choose butterfly earrings or drops. A parent may choose classic studs. A friend may choose huggies or minimalist earrings. A bridesmaid-style gift may be delicate and wearable.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Birthday Jewellery Direction', 'Product Direction'],
        rows: [
          ['Girlfriend', 'Butterfly earrings, drops or studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Wife', 'Drops, butterfly earrings or classic studs', 'Orsola, Alidi Farfalla, Cadenza M'],
          ['Sister', 'Huggies, hoops or butterfly earrings', 'Amadea, Pave Hoops, Farfalla'],
          ['Daughter', 'Small studs or butterfly earrings', 'Cadenza S, Farfalla'],
          ['Mother', 'Classic studs or elegant drops', 'Cadenza M, Orsola'],
          ['Best friend', 'Huggies, minimalist earrings or hoops', 'Amadea, Laluce, Pave Hoops'],
          ['Bridesmaid / friend', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Self-gift', 'Choose by personal style', 'Cadenza S, Farfalla, Orsola, Pave Hoops'],
          ['Coworker / professional gift', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '#' },
    ],
  },
  {
    heading: 'Birthday Jewellery by Outfit and Lifestyle',
    content: [
      { type: 'paragraph', text: 'A good birthday gift should fit the recipient\'s real lifestyle.' },
      { type: 'paragraph', text: 'If she dresses up often, drops or hoops may work well. If she mostly wears workwear, studs and huggies are safer. If she likes soft dresses, butterfly earrings or short drops can be better. If she likes bold party outfits, Lusso or Pave Hoops may be stronger.' },
      {
        type: 'table',
        headers: ['Lifestyle / Outfit Habit', 'Best Birthday Jewellery Direction', 'Product Direction'],
        rows: [
          ['Wears jewellery daily', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Dresses for work often', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Likes romantic outfits', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Wears black dresses', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Likes satin dresses', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Goes to dinners often', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Likes parties', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Travels often', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Likes ear stacks', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Birthday Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the most important parts of choosing a birthday gift.' },
      { type: 'paragraph', text: 'The safest choice is the metal colour she already wears most often. If she wears gold rings, gold bracelets or gold necklaces, choose yellow gold. If she wears silver or white-tone jewellery, choose white/silver tone. If she likes soft romantic pieces, rose gold can work beautifully.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Birthday Gift Feeling', 'Best For'],
        rows: [
          ['Yellow gold', 'Warm, classic and rich', 'Everyday gifts, romantic gifts, black dresses, green dresses'],
          ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, workwear, cool wardrobes'],
          ['Rose gold', 'Soft, romantic and feminine', 'Butterfly earrings, blush outfits, romantic birthday gifts'],
          ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
        ],
      },
      { type: 'paragraph', text: 'For birthday gifts, avoid choosing a metal colour only because it is trending. Match what she already wears.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Birthday Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts are strong when the recipient has multiple piercings or likes layered jewellery.' },
      { type: 'paragraph', text: 'A two-piece stack is usually safer than a three-piece stack. The easiest stack is a small stud with a huggie. The most meaningful birthday stack is a butterfly earring with a small stud. The best party stack is a hoop or bold earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Birthday Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest birthday stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist birthday stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic birthday stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful birthday stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Dinner birthday stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft birthday stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Party birthday stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Hoop birthday stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Birthday Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Birthday Jewellery Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are the safest birthday choice because they are classic, wearable and easy to style.' },
      { type: 'subheading', text: 'For a Modern Birthday Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are strong for someone who likes modern, close-fitting everyday jewellery.' },
      { type: 'subheading', text: 'For a Minimalist Birthday Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Meaningful Birthday Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. They feel personal and symbolic because butterflies represent growth, transformation and new beginnings.' },
      { type: 'subheading', text: 'For a Birthday Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for dinners, satin dresses and occasion outfits.' },
      { type: 'subheading', text: 'For a Soft Birthday Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They are delicate, feminine and strong for soft birthday outfits, bridesmaid-style gifts and romantic styling.' },
      { type: 'subheading', text: 'For a Party Birthday Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops or Lusso bold statement earrings. Pave Hoops are easier to repeat, while Lusso is stronger for someone who loves standout jewellery.' },
      { type: 'subheading', text: 'For a Birthday Ear Stack Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea for the safest stack, or Farfalla with Cadenza S for a meaningful birthday stack.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Birthday Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first birthday diamond gift', 'Small, safe, subtle and wearable'],
          ['Cadenza M diamond stud earrings', 'Best classic birthday sparkle', 'More visible but still easy to style'],
          ['Amadea Huggie earrings', 'Best modern birthday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated birthday gift', 'Quiet, clean and easy for minimal style'],
          ['Farfalla butterfly earrings', 'Best meaningful birthday gift', 'Symbolic, soft and connected to growth'],
          ['Alidi Farfalla butterfly earrings', 'Best romantic birthday gift', 'Strong for personal and thoughtful gifts'],
          ['Orsola drop earrings', 'Best birthday dinner gift', 'Great for dinners, satin outfits and occasions'],
          ['Concetta Short earrings', 'Best soft birthday gift', 'Delicate and occasion-friendly'],
          ['Concetta Long earrings', 'Best formal birthday dinner gift', 'Refined and polished for dressy looks'],
          ['Pave Hoops', 'Best modern party birthday gift', 'Adds shape and sparkle'],
          ['Lusso bold statement earrings', 'Best bold birthday gift', 'Strong for someone who loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose birthday jewellery by her style first. Pick Cadenza S or Cadenza M for safe sparkle, Amadea for modern daily wear, Laluce for minimalist styling, Farfalla or Alidi Farfalla for meaning, Orsola for birthday dinners, Pave Hoops for shape and Lusso for bold party jewellery.' },
    ],
  },
  {
    heading: 'Common Birthday Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery based only on what looks impressive in the box. A birthday gift should match what she will actually wear.' },
      { type: 'paragraph', text: 'Another mistake is choosing bold earrings for someone who wears minimalist jewellery. If her everyday style is subtle, choose studs, huggies or minimalist earrings instead.' },
      { type: 'paragraph', text: 'A third mistake is guessing the metal colour. Look at what she already wears. If most of her jewellery is gold, choose gold. If it is silver or white-tone, choose that direction.' },
      { type: 'paragraph', text: 'Another mistake is choosing a symbolic gift when she prefers classic pieces. Butterfly earrings are meaningful, but diamond studs may be safer for someone traditional.' },
      { type: 'paragraph', text: 'A fifth mistake is ignoring lifestyle. Someone who works in an office may wear Cadenza M or Amadea more often than Lusso.' },
      { type: 'paragraph', text: 'Finally, do not forget repeat wear. The best birthday jewellery should still feel useful after the birthday celebration is over.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Final Birthday Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing birthday jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Will she wear the earrings every day or mainly for occasions?',
          'Does she like studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Is this a romantic gift, family gift, friend gift or self-gift?',
          'Does she have multiple piercings for an ear stack?',
          'Would a two-piece stack gift be better than one pair?',
          'Does she wear black dresses, satin outfits, workwear or casual outfits often?',
          'Are the earrings comfortable for long wear?',
          'Can the jewellery be worn after the birthday?',
          'Is the design easy to care for and store?',
          'Is the gift safe enough if you are unsure of her exact style?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose diamond studs. If you want meaning, choose butterfly earrings. If she likes modern jewellery, choose huggies. If she dresses up often, choose drops or hoops.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for a birthday gift?', answer: 'The best birthday jewellery is something wearable, personal and suited to the recipient\'s style. Diamond studs, huggies, butterfly earrings, drops and hoops can all work depending on the person.' },
  { question: 'Are earrings a good birthday gift?', answer: 'Yes, earrings are a good birthday gift because they are easier to choose than rings and can be worn with many outfits.' },
  { question: 'Are lab-grown diamond earrings good birthday gifts?', answer: 'Yes, lab-grown diamond earrings are strong birthday gifts because they feel special while still being wearable for everyday outfits and occasions.' },
  { question: 'What are the safest earrings to gift for a birthday?', answer: 'Diamond studs are the safest earrings to gift for a birthday because they are classic, simple and easy to wear.' },
  { question: 'What earrings should I buy for a meaningful birthday gift?', answer: 'Butterfly earrings are a strong meaningful birthday gift because they can symbolise transformation, growth and new beginnings.' },
  { question: 'What earrings should I buy for a romantic birthday gift?', answer: 'Butterfly earrings, drop earrings or classic diamond studs work well for romantic birthday gifts.' },
  { question: 'What earrings should I buy for someone who likes minimalist jewellery?', answer: 'Choose small studs, huggies or minimalist earrings. Cadenza S, Amadea and Laluce are strong directions.' },
  { question: 'What earrings should I buy for someone who likes parties?', answer: 'Choose hoops or bold statement earrings if the recipient likes visible jewellery. Pave Hoops and Lusso are strong choices.' },
  { question: 'What metal colour is best for birthday jewellery?', answer: 'Choose the metal colour she already wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels romantic.' },
  { question: 'What IWantJewels earrings are best for birthday gifts?', answer: 'Cadenza S, Cadenza M, Amadea, Laluce, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Pave Hoops and Lusso are strong birthday gift options depending on her style.' },
]

const cta: V2CTABlock = {
  heading: 'Birthday jewellery should feel special, personal and wearable. Choose studs for the safest sparkle, huggies for modern everyday jewellery, butterfly earrings for meaning, drops for birthday dinners, hoops for visible shape and bold earrings for someone who loves standout styling.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a birthday gift with real diamond sparkle. Choose Cadenza S for a safe first gift, Cadenza M for classic polish, Amadea for huggies, Laluce for minimalist style, Farfalla or Alidi Farfalla for meaning, Orsola for birthday dinners and Pave Hoops or Lusso for party-ready sparkle.',
  primaryLabel: 'Shop Birthday Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Butterfly Earrings Meaning Guide',
  tertiaryHref: '#',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'birthday-jewellery-gifts-for-her')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'birthday-jewellery-gifts-for-her', 3)
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
