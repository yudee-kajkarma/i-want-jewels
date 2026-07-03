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
  title: 'Anniversary Jewellery Gifts for Her',
  description:
    'Choose anniversary jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, hoops and romantic gift ideas for her.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-63.jpg',
  title: 'Anniversary Jewellery Gifts for Her:',
  subtitle: 'Romantic Earrings She Will Actually Wear',
  paragraphs: [
    'Anniversary jewellery should feel romantic, thoughtful and wearable. The best anniversary gift is not only the piece that looks beautiful in the box. It is the piece she can connect with emotionally and wear again after the anniversary dinner is over.',
    'Lab-grown diamond earrings are strong anniversary gifts because they feel special without being limited to one occasion. Diamond studs are the safest classic option. Butterfly earrings are ideal when the gift should feel meaningful and personal. Drop earrings work beautifully for anniversary dinners, date nights and romantic outfits. Huggies and minimalist earrings are better for someone who prefers everyday jewellery. Hoops or bold earrings are stronger for someone who likes visible, party-ready styling.',
    'At IWantJewels, Alidi Farfalla butterfly earrings, Farfalla butterfly earrings, Orsola drop earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Concetta Short earrings, Concetta Long earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Pave Hoops and Lusso bold statement earrings all work for different anniversary gift needs. This guide helps shoppers choose the right anniversary jewellery by meaning, style, relationship and occasion.',
  ],
  shopLabel: 'Shop Anniversary Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose anniversary jewellery gifts for her',
    'Pick romantic lab-grown diamond earrings',
    'Decide between butterfly earrings, diamond studs, drops, huggies, hoops and minimalist earrings',
    'Choose jewellery for wives, girlfriends, partners and milestone anniversaries',
    'Find meaningful anniversary gifts with symbolism',
    'Pick earrings for anniversary dinners, date nights and romantic outfits',
    'Choose safe jewellery gifts when you are unsure of her exact style',
    'Build anniversary ear stack gift ideas',
    'Match anniversary jewellery with metal colour and outfit style',
    'Plan image blocks, product modules, CTA sections and internal links for this page',
  ],
  image: '/blog-images/blog-image-65.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Anniversary Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Anniversary Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Most romantic anniversary gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Safest anniversary gift', 'Medium diamond studs', 'Cadenza M'],
          ['First anniversary gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Meaningful anniversary gift', 'Butterfly earrings or butterfly stack', 'Alidi Farfalla, Farfalla + Cadenza S'],
          ['Anniversary dinner gift', 'Drop earrings', 'Orsola'],
          ['Formal anniversary dinner', 'Long drop earrings', 'Concetta Long'],
          ['Soft romantic gift', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Minimalist anniversary gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Everyday anniversary gift', 'Huggies or studs', 'Amadea, Cadenza M'],
          ['Modern anniversary gift', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Bold anniversary gift', 'Statement earrings', 'Lusso'],
          ['Anniversary ear stack gift', 'Butterfly + stud or stud + huggie', 'Farfalla + Cadenza S, Cadenza S + Amadea'],
        ],
      },
    ],
  },
  {
    heading: 'Why Earrings Make Strong Anniversary Gifts',
    content: [
      { type: 'paragraph', text: 'Earrings make strong anniversary gifts because they feel personal but are easier to choose than many other jewellery pieces. Rings need sizing and can feel too symbolic unless they are chosen carefully. Necklaces depend heavily on chain length and neckline. Earrings are usually easier to gift because the main choices are style, metal colour and how often she will wear them.' },
      { type: 'paragraph', text: 'Lab-grown diamond earrings also give the gift a special feeling while keeping it wearable. She can wear them for anniversary dinners, date nights, weddings, workwear, travel, parties and everyday outfits.' },
      {
        type: 'table',
        headers: ['Why Earrings Work for Anniversaries', 'Why It Matters'],
        rows: [
          ['Romantic but practical', 'The gift feels special and useful'],
          ['Easier than rings', 'No ring sizing needed'],
          ['Strong for date nights', 'Earrings frame the face beautifully'],
          ['Works after the occasion', 'Good earrings can be worn again'],
          ['Easy to personalise', 'Choose romantic, classic, modern, minimal or bold'],
          ['Good for milestones', 'Diamonds feel meaningful for important dates'],
          ['Works with outfits', 'Earrings can match dresses, dinners and events'],
          ['Can start an ear stack', 'A gift can become part of her daily jewellery wardrobe'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, anniversary gift content should guide shoppers by emotion first and product second. A buyer may search for "anniversary jewellery gift for her," but the page should help them understand whether she is a butterfly earring person, a diamond stud person, a drop earring person or a minimalist jewellery person.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Safest Anniversary Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest anniversary jewellery gift is usually a classic pair of diamond studs. Studs are easy to wear, easy to style and less risky than bold or highly personal designs.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are the strongest safe anniversary gift because they feel polished and special. Cadenza S is better for someone who prefers subtle jewellery or needs a smaller everyday piece. Amadea is strong for someone who likes modern daily jewellery. Laluce is best for someone who prefers understated styling.' },
      {
        type: 'table',
        headers: ['Safe Anniversary Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Medium diamond studs', 'Classic anniversary sparkle', 'Cadenza M'],
          ['Small diamond studs', 'Subtle first anniversary gift', 'Cadenza S'],
          ['Huggies', 'Modern everyday jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Practical ear stack gift', 'Cadenza S + Amadea'],
          ['Soft drops', 'Elegant dinner styling', 'Orsola, Concetta Short'],
          ['Butterfly earrings', 'Meaningful romantic gift', 'Alidi Farfalla, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Meaningful Anniversary Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A meaningful anniversary gift should connect to the relationship, not just the date.' },
      { type: 'paragraph', text: 'Butterfly earrings are one of the strongest meaningful choices because a butterfly can represent transformation, growth, beauty and new beginnings. For an anniversary, that symbolism can feel connected to growth together, shared memories and the next chapter.' },
      { type: 'paragraph', text: 'Drop earrings can also feel meaningful when the gift is tied to an anniversary dinner or special evening. Diamond studs can feel meaningful when they become her everyday reminder of the occasion.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-67.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Anniversary Gift Idea', 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise growth and transformation', 'Alidi Farfalla, Farfalla'],
              ['Butterfly + stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
              ['Drop earrings', 'Creates a romantic dinner-ready gift', 'Orsola'],
              ['Long drops', 'Strong for milestone dinners', 'Concetta Long'],
              ['Classic diamond studs', 'Timeless and easy to wear often', 'Cadenza M'],
              ['Small everyday studs', 'Subtle reminder of the anniversary', 'Cadenza S'],
              ['Minimalist diamond earrings', 'Quiet and intimate gift', 'Laluce'],
              ['Huggies', 'Practical romantic everyday gift', 'Amadea'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Romantic Butterfly Earrings for Anniversaries',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are especially strong for anniversaries because they feel romantic and symbolic. They are softer than classic studs and more personal than hoops.' },
      { type: 'paragraph', text: 'Alidi Farfalla butterfly earrings should be positioned as the strongest romantic anniversary product direction. Farfalla works well for soft romantic styling, meaningful gifts and anniversary ear stacks.' },
      {
        type: 'table',
        headers: ['Anniversary Butterfly Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Most romantic anniversary gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Meaningful anniversary gift', 'Butterfly earrings', 'Farfalla'],
          ['Soft dinner-date gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Romantic ear stack gift', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Minimal romantic gift', 'Butterfly + minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Anniversary gift for soft style', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Milestone anniversary meaning', 'Butterfly earrings', 'Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Diamond Studs for Anniversaries',
    content: [
      { type: 'paragraph', text: 'Diamond studs are the safest anniversary earrings because they are timeless, polished and wearable. They work especially well if she prefers classic jewellery or if you are unsure of her exact style.' },
      { type: 'paragraph', text: 'Cadenza M is the strongest anniversary stud because it gives more visible sparkle. Cadenza S is better for subtle daily wear, second piercings or ear stack support.' },
      {
        type: 'table',
        headers: ['Anniversary Stud Gift Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Classic anniversary gift', 'Cadenza M', 'Polished and timeless'],
          ['First anniversary diamond gift', 'Cadenza S', 'Subtle and easy to wear'],
          ['Safe gift if unsure', 'Cadenza M', 'Classic without being too bold'],
          ['Everyday anniversary reminder', 'Cadenza S', 'Wearable often'],
          ['Workwear anniversary gift', 'Cadenza M', 'Clean and professional'],
          ['Ear stack support gift', 'Cadenza S', 'Works with huggies, drops and butterfly earrings'],
          ['Minimalist anniversary gift', 'Cadenza S', 'Quiet and simple'],
        ],
      },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Drop Earrings for Anniversary Dinners',
    content: [
      { type: 'paragraph', text: 'Drop earrings are one of the best anniversary dinner gifts because they add movement and elegance. They feel special without needing to be too bold.' },
      { type: 'paragraph', text: 'Orsola drop earrings are the strongest all-round anniversary dinner option. Concetta Short is better for soft romantic dinners. Concetta Long works best for formal anniversary dinners, milestone celebrations and evening dresses.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-69.jpg',
        content: [
          {
            type: 'table',
            headers: ['Anniversary Dinner Look', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Romantic dinner outfit', 'Drop earrings', 'Orsola'],
              ['Satin dinner dress', 'Drop earrings', 'Orsola'],
              ['Black dinner dress', 'Drops or classic studs', 'Orsola, Cadenza M'],
              ['Formal anniversary dinner', 'Long drops', 'Concetta Long'],
              ['Soft date-night outfit', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Red dress dinner look', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Green dress dinner look', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
              ['Minimal dinner outfit', 'Drops or studs', 'Orsola, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Minimalist Anniversary Jewellery',
    content: [
      { type: 'paragraph', text: 'Minimalist anniversary jewellery is ideal when she prefers quiet, simple and wearable pieces.' },
      { type: 'paragraph', text: 'If she rarely wears large earrings, avoid bold pieces. Choose small studs, minimalist earrings or huggies instead. A minimalist gift can still feel romantic when it is chosen thoughtfully and matches her daily style.' },
      {
        type: 'table',
        headers: ['Minimalist Anniversary Gift Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Quiet diamond gift', 'Small studs', 'Cadenza S'],
          ['Clean classic sparkle', 'Medium studs', 'Cadenza M'],
          ['Minimalist detail gift', 'Minimalist earrings', 'Laluce'],
          ['Modern minimal gift', 'Huggies', 'Amadea'],
          ['Minimal ear stack gift', 'Stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear anniversary gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Travel-friendly anniversary gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Subtle romantic gift', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Modern Anniversary Huggies and Hoops',
    content: [
      { type: 'paragraph', text: 'Huggies and hoops are strong anniversary gifts for someone who likes modern jewellery rather than classic romantic pieces.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are better for everyday wear and ear stacks. Pave Hoops are better for visible shape, dinners, weekends and party styling. If she already wears hoops often, Pave Hoops can be a strong anniversary choice. If she prefers subtle pieces, Amadea is safer.' },
      {
        type: 'table',
        headers: ['Modern Anniversary Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Daily ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Workwear modern gift', 'Medium studs + huggie', 'Cadenza M + Amadea'],
          ['Weekend anniversary gift', 'Hoops', 'Pave Hoops'],
          ['Party anniversary gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Black dress anniversary look', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Safer hoop alternative', 'Huggies', 'Amadea'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond hoop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },
  {
    heading: 'Anniversary Jewellery by Relationship Stage',
    content: [
      { type: 'paragraph', text: 'The right anniversary gift can change depending on the relationship stage. Early anniversaries often need something thoughtful but not too overwhelming. Milestone anniversaries can carry more meaning or a more elevated design.' },
      {
        type: 'table',
        headers: ['Relationship Stage', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['First anniversary', 'Studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Early relationship', 'Safe sparkle or meaningful small earrings', 'Cadenza S, Farfalla'],
          ['Long-term partner', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Wife', 'Drops, butterfly earrings or classic studs', 'Orsola, Alidi Farfalla, Cadenza M'],
          ['Girlfriend', 'Butterfly earrings, huggies or drops', 'Farfalla, Amadea, Orsola'],
          ['Milestone anniversary', 'Long drops, classic studs or romantic butterfly earrings', 'Concetta Long, Cadenza M, Alidi Farfalla'],
          ['Simple yearly gift', 'Everyday studs or huggies', 'Cadenza S, Amadea'],
          ['Formal anniversary celebration', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '#' },
    ],
  },
  {
    heading: 'Anniversary Jewellery by Recipient Style',
    content: [
      { type: 'paragraph', text: 'The recipient\'s style should decide the gift more than the date itself.' },
      { type: 'paragraph', text: 'A classic jewellery wearer may love studs. A romantic person may prefer butterfly earrings or drops. A minimalist person may prefer Laluce or Cadenza S. A modern dresser may prefer Amadea or Pave Hoops. A bold dresser may prefer Lusso.' },
      {
        type: 'table',
        headers: ['Recipient Style', 'Best Anniversary Jewellery Direction', 'Product Direction'],
        rows: [
          ['Classic style', 'Diamond studs', 'Cadenza M, Cadenza S'],
          ['Minimalist style', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern style', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Romantic style', 'Butterfly earrings or drops', 'Alidi Farfalla, Farfalla, Orsola'],
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
    heading: 'Anniversary Jewellery by Outfit and Occasion',
    content: [
      { type: 'paragraph', text: 'Think about how she will wear the jewellery. If the gift is for a dinner date, drop earrings may be perfect. If it is meant for everyday wear, studs or huggies may be better.' },
      {
        type: 'table',
        headers: ['Outfit / Occasion', 'Best Anniversary Jewellery Direction', 'Product Direction'],
        rows: [
          ['Anniversary dinner', 'Drops or classic studs', 'Orsola, Cadenza M'],
          ['Satin dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['Black dress', 'Drops, studs, hoops or bold earrings', 'Orsola, Cadenza M, Pave Hoops, Lusso'],
          ['Red dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Green dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Romantic pastel outfit', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Workwear daily use', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Weekend casual wear', 'Huggies, hoops or studs', 'Amadea, Pave Hoops, Cadenza S'],
          ['Formal celebration', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Travel anniversary trip', 'Studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Anniversary Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the safest ways to personalise an anniversary gift.' },
      { type: 'paragraph', text: 'The best choice is usually the metal colour she already wears most often. Yellow gold feels warm and classic. White or silver tone feels clean and modern. Rose gold feels soft and romantic, especially for butterfly earrings and sentimental gifts.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Anniversary Gift Feeling', 'Best For'],
        rows: [
          ['Yellow gold', 'Warm, classic and rich', 'Romantic gifts, black dresses, green dresses, everyday jewellery'],
          ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, formal outfits, cool wardrobes'],
          ['Rose gold', 'Soft, romantic and feminine', 'Butterfly earrings, blush outfits, sentimental gifts'],
          ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
        ],
      },
      { type: 'paragraph', text: 'For romantic anniversary gifts, rose gold or yellow gold can feel especially strong. For safe classic gifts, match her existing jewellery colour.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Anniversary Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts work well when she has multiple piercings or enjoys layered jewellery.' },
      { type: 'paragraph', text: 'A two-piece stack is usually safer than a three-piece stack. The most romantic stack is a butterfly earring with a small stud. The safest stack is a small stud with a huggie. The best anniversary dinner stack is a drop earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Anniversary Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest anniversary stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist anniversary stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic anniversary stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful anniversary stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Dinner anniversary stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft anniversary stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal anniversary stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Party anniversary stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Hoop anniversary stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Anniversary Gift Need',
    content: [
      { type: 'subheading', text: 'For the Most Romantic Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They are strong for romantic, meaningful and personal anniversary gifting.' },
      { type: 'subheading', text: 'For a Meaningful Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. Butterfly earrings can represent growth, transformation and new beginnings, which makes them strong for anniversaries.' },
      { type: 'subheading', text: 'For the Safest Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They feel classic, polished and easy to wear with many outfits.' },
      { type: 'subheading', text: 'For a Subtle First Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are simple, wearable and strong for everyday use.' },
      { type: 'subheading', text: 'For an Anniversary Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add romantic movement and work beautifully with satin, black, red and green dinner outfits.' },
      { type: 'subheading', text: 'For a Formal Milestone Anniversary' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings. They create a refined long line for formal dinners and special celebrations.' },
      { type: 'subheading', text: 'For a Minimalist Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Amadea Huggie earrings. These are best for someone who prefers daily jewellery over occasion jewellery.' },
      { type: 'subheading', text: 'For a Modern Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops if she likes visible jewellery and modern styling.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Anniversary Gift Role', 'Why It Works'],
        rows: [
          ['Alidi Farfalla butterfly earrings', 'Best romantic anniversary gift', 'Soft, personal and meaningful'],
          ['Farfalla butterfly earrings', 'Best symbolic anniversary gift', 'Represents growth and transformation'],
          ['Orsola drop earrings', 'Best anniversary dinner gift', 'Adds movement and elegance'],
          ['Cadenza M diamond stud earrings', 'Best safe classic gift', 'Polished and easy to wear often'],
          ['Cadenza S lab-grown diamond studs', 'Best subtle first anniversary gift', 'Simple, wearable and stackable'],
          ['Concetta Short earrings', 'Best soft romantic gift', 'Delicate and occasion-friendly'],
          ['Concetta Long earrings', 'Best formal milestone gift', 'Refined and evening-ready'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Quiet, clean and easy for minimal style'],
          ['Pave Hoops', 'Best modern shape gift', 'Adds curve and sparkle'],
          ['Lusso bold statement earrings', 'Best bold anniversary gift', 'Strong for someone who loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose anniversary jewellery by emotion and wearability. Pick Alidi Farfalla for romance, Farfalla for meaning, Orsola for anniversary dinners, Cadenza M for safe classic sparkle, Cadenza S for subtle daily wear, Concetta Long for formal milestones, Amadea for modern everyday styling and Pave Hoops for visible shape.' },
    ],
  },
  {
    heading: 'Common Anniversary Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is buying jewellery that feels romantic to the buyer but does not match the wearer\'s style. If she wears simple studs every day, a very bold earring may not be the best anniversary gift.' },
      { type: 'paragraph', text: 'Another mistake is choosing symbolic jewellery for someone who prefers classic pieces. Butterfly earrings are meaningful, but Cadenza M may be safer for a traditional jewellery wearer.' },
      { type: 'paragraph', text: 'A third mistake is ignoring the anniversary plan. If the gift is for a dinner date, drop earrings can be perfect. If the gift is for daily wear, studs or huggies may be better.' },
      { type: 'paragraph', text: 'Another mistake is guessing the metal colour. Look at her usual jewellery first. Match yellow gold, white/silver tone or rose gold based on what she already wears.' },
      { type: 'paragraph', text: 'A fifth mistake is choosing earrings that only work for one night. The best anniversary jewellery should feel special on the day and useful after it.' },
      { type: 'paragraph', text: 'Finally, do not forget care. If she will wear the earrings often, she should remove them before sleeping, showering, swimming, heavy workouts and product-heavy routines.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Final Anniversary Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing anniversary jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is this for a first anniversary, yearly anniversary or milestone anniversary?',
          'Will she wear the earrings daily or mainly for occasions?',
          'Is the gift meant to feel emotional, practical or both?',
          'Would butterfly earrings feel meaningful to her?',
          'Would classic studs be safer?',
          'Is there an anniversary dinner outfit to consider?',
          'Does she wear satin dresses, black dresses, workwear or casual outfits often?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack gift feel more special?',
          'Are the earrings comfortable for long wear?',
          'Can the jewellery be worn after the anniversary?',
          'Is the design easy to care for and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose diamond studs. If you want meaning, choose butterfly earrings. If the gift is for a dinner date, choose drops. If she likes modern everyday jewellery, choose huggies.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for an anniversary gift?', answer: 'The best anniversary jewellery is romantic, wearable and matched to her style. Diamond studs, butterfly earrings, drop earrings, huggies and minimalist earrings can all work depending on what she wears most.' },
  { question: 'Are earrings a good anniversary gift?', answer: 'Yes, earrings are a good anniversary gift because they feel personal, are easier to choose than rings and can be worn often after the anniversary.' },
  { question: 'Are lab-grown diamond earrings good anniversary gifts?', answer: 'Yes, lab-grown diamond earrings are strong anniversary gifts because they feel special, elegant and wearable for dinners, daily outfits and future occasions.' },
  { question: 'What earrings should I buy for a romantic anniversary gift?', answer: 'Butterfly earrings and drop earrings are strong romantic anniversary gifts. Butterfly earrings feel meaningful, while drop earrings are elegant for dinners and date nights.' },
  { question: 'What are the safest earrings to gift for an anniversary?', answer: 'Diamond studs are the safest anniversary earrings because they are classic, easy to wear and suitable for many styles.' },
  { question: 'Are butterfly earrings good for anniversaries?', answer: 'Yes, butterfly earrings are strong anniversary gifts because they can symbolise growth, transformation and shared change over time.' },
  { question: 'What earrings should I buy for an anniversary dinner?', answer: 'Drop earrings are one of the best choices for an anniversary dinner. Orsola and Concetta Long are strong directions depending on how formal the dinner is.' },
  { question: 'What earrings should I buy for a first anniversary?', answer: 'For a first anniversary, small diamond studs, huggies or butterfly earrings are strong choices because they feel thoughtful without being too heavy.' },
  { question: 'What metal colour is best for anniversary jewellery?', answer: 'Choose the metal colour she already wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels romantic.' },
  { question: 'What IWantJewels earrings are best for anniversary gifts?', answer: 'Alidi Farfalla, Farfalla, Orsola, Cadenza M, Cadenza S, Concetta Short, Concetta Long, Amadea, Laluce and Pave Hoops are strong anniversary gift options depending on her style.' },
]

const cta: V2CTABlock = {
  heading: 'Anniversary jewellery should feel romantic, personal and wearable. Choose butterfly earrings for meaning, diamond studs for safe classic sparkle, drop earrings for dinner dates, huggies for modern daily wear, minimalist earrings for quiet style and hoops for visible shape.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want an anniversary gift with real diamond sparkle. Choose Alidi Farfalla for romance, Farfalla for symbolism, Orsola for anniversary dinners, Cadenza M for classic polish, Cadenza S for subtle daily wear, Concetta Long for formal milestones, Amadea for huggies and Pave Hoops for modern sparkle.',
  primaryLabel: 'Shop Anniversary Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Romantic Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Butterfly Earrings Meaning Guide',
  tertiaryHref: '#',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'anniversary-jewellery-gifts-for-her')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'anniversary-jewellery-gifts-for-her', 3)
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
