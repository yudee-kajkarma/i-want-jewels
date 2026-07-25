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
  title: 'Jewellery Gifts for Her',
  description:
    'Choose jewellery gifts for her with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and romantic gift ideas.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/jewellery-gift-guides/jewellery-gifts-for-her',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/jewellery-gift-guides/jewellery-gifts-for-her',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-29.jpg',
  title: 'Jewellery Gifts for Her:',
  subtitle: 'How to Choose Earrings She Will Actually Wear',
  paragraphs: [
    'Jewellery gifts for her should feel thoughtful, wearable and personal. The best gift is not always the biggest or most expensive-looking piece. It is the piece that matches her style, fits into her real wardrobe and still feels special when she opens the box.',
    'Lab-grown diamond earrings are one of the strongest jewellery gifts because they are easier to choose than rings, more wearable than many occasion-only pieces and suitable for birthdays, anniversaries, romantic gifts, bridesmaid gifts, wedding guest styling, date nights and everyday jewellery. Diamond studs are the safest choice. Huggies are best for someone who likes modern everyday jewellery. Butterfly earrings are ideal when the gift should feel meaningful. Drop earrings work beautifully for dinners and romantic outfits. Hoops suit someone who likes visible shape and party-ready styling.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Orsola drop earrings, Concetta Short earrings, Concetta Long earrings, Pave Hoops and Lusso bold statement earrings all serve different gift needs. This guide helps shoppers choose the right jewellery gift based on who she is, what she wears and when she will use it.',
  ],
  shopLabel: 'Shop Jewellery Gifts for Her',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery gifts for her.',
    'Pick lab-grown diamond earrings as a gift.',
    'Decide between studs, huggies, butterfly earrings, drops, hoops, minimalist earrings and bold earrings.',
    'Choose jewellery for girlfriends, wives, partners, sisters, daughters, mothers, friends and bridesmaids.',
    'Pick gifts for birthdays, anniversaries, romantic moments, weddings, date nights and everyday wear.',
    'Choose safe jewellery gifts when you are unsure of her exact style.',
    'Match jewellery gifts to classic, minimalist, romantic, modern, bold and soft feminine styles.',
    'Build giftable ear stack combinations.',
  ],
  image: '/blog-images/blog-image-41.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Jewellery Gift Selector for Her',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest jewellery gift for her', 'Small or medium diamond studs', 'Cadenza S, Cadenza M'],
          ['First diamond gift', 'Small diamond studs', 'Cadenza S'],
          ['Classic gift for her', 'Medium diamond studs', 'Cadenza M'],
          ['Modern everyday gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Meaningful gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Romantic gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Birthday gift', 'Studs, butterfly earrings, huggies or hoops', 'Cadenza M, Farfalla, Amadea, Pave Hoops'],
          ['Anniversary gift', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Date night gift', 'Drops, butterfly earrings or medium studs', 'Orsola, Farfalla, Cadenza M'],
          ['Bridesmaid gift', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Party gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Giftable ear stack', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'Why Earrings Make Strong Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Earrings make strong jewellery gifts because they are personal but easier to choose than many other pieces. Rings need sizing. Necklaces depend heavily on chain length and neckline. Bracelets depend on wrist size and personal comfort. Earrings are usually simpler because the main choices are style, metal colour, size and occasion.' },
      { type: 'paragraph', text: 'Lab-grown diamond earrings also feel special while staying wearable. A good pair can be worn with workwear, casual outfits, date nights, wedding guest dresses, birthday outfits, anniversary dinners and future events. That repeat wear is what makes earrings a strong gift.' },
      {
        type: 'table',
        headers: ['Why Earrings Work as Gifts', 'Why It Matters'],
        rows: [
          ['Easier than rings', 'No ring sizing needed'],
          ['Wearable often', 'The gift does not stay in the box'],
          ['Works for many occasions', 'Birthdays, anniversaries, weddings and dinners'],
          ['Easy to personalise', 'Choose classic, romantic, modern, minimal or bold'],
          ['Strong emotional value', 'Diamond sparkle makes the gift feel special'],
          ['Good for different ages', 'Studs, huggies and drops can suit many styles'],
          ['Easy to pair with outfits', 'Earrings work with many necklines and dresses'],
          ['Strong for ear stacks', 'One gift can start or complete a jewellery stack'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, gift content should always move shoppers from "what should I buy her?" to "which earring style matches her?" This makes the page useful for search and stronger for conversion.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Safest Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'The safest jewellery gifts for her are usually diamond studs because they are classic, wearable and not too style-specific.' },
      { type: 'paragraph', text: 'If you do not know her exact style, choose Cadenza S or Cadenza M. Cadenza S is better for subtle everyday styling. Cadenza M is better when the gift should feel more polished and special. Huggies are also a safe option if she likes modern jewellery. Minimalist earrings are safest when she wears understated pieces.' },
      { type: 'paragraph', text: 'Butterfly earrings, drops, hoops and bold earrings can be excellent gifts, but they are more style-specific. Choose them when you know she likes romantic, dressy, modern or standout jewellery.' },
      {
        type: 'table',
        headers: ['Safe Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'First diamond gift, subtle daily wear', 'Cadenza S'],
          ['Medium diamond studs', 'Classic sparkle gift', 'Cadenza M'],
          ['Huggies', 'Modern everyday jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Ear stack gift', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift if she likes soft styling', 'Farfalla, Alidi Farfalla'],
          ['Drop earrings', 'Gift for someone who dresses up often', 'Orsola, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Relationship',
    content: [
      { type: 'paragraph', text: 'The relationship helps decide how personal, romantic or practical the gift should feel.' },
      { type: 'paragraph', text: 'For a wife or partner, butterfly earrings, drop earrings or polished diamond studs can feel romantic and thoughtful. For a girlfriend, huggies, butterfly earrings or small studs can work depending on the relationship stage. For a sister or friend, huggies, hoops or minimalist earrings can feel stylish without becoming too romantic. For a mother, classic studs or elegant drops are usually strong choices.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Jewellery Gift Direction', 'Product Direction'],
        rows: [
          ['Wife', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Girlfriend', 'Butterfly earrings, huggies, drops or small studs', 'Farfalla, Amadea, Orsola, Cadenza S'],
          ['Partner', 'Meaningful earrings or classic sparkle', 'Alidi Farfalla, Cadenza M'],
          ['Sister', 'Huggies, hoops, butterfly earrings or studs', 'Amadea, Pave Hoops, Farfalla, Cadenza S'],
          ['Daughter', 'Small studs or butterfly earrings', 'Cadenza S, Farfalla'],
          ['Mother', 'Classic studs or elegant drops', 'Cadenza M, Orsola'],
          ['Best friend', 'Huggies, hoops or minimalist earrings', 'Amadea, Pave Hoops, Laluce'],
          ['Bridesmaid', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Coworker / professional gift', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Self-gift', 'Choose by personal style', 'Cadenza S, Farfalla, Orsola, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Bridesmaid jewellery gifts', href: '/resources/jewellery-gift-guides/bridesmaid-jewellery-gifts' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Occasion',
    content: [
      { type: 'paragraph', text: 'The occasion gives the gift its mood. Birthday gifts can feel fun, meaningful or classic. Anniversary gifts should feel romantic. Bridesmaid gifts should feel wearable and coordinated. Date night gifts should feel elegant or personal. Everyday gifts should feel practical and repeatable.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-73.jpg',
        content: [
          {
            type: 'table',
            headers: ['Occasion', 'Best Jewellery Gift Direction', 'Product Direction'],
            rows: [
              ['Birthday', 'Studs, butterfly earrings, huggies or hoops', 'Cadenza M, Farfalla, Amadea, Pave Hoops'],
              ['Anniversary', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
              ['Romantic gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
              ['Date night', 'Drops, butterfly earrings or medium studs', 'Orsola, Farfalla, Cadenza M'],
              ['Bridesmaid gift', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
              ['Wedding guest gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Graduation or milestone', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
              ['New job', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
              ['Party gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
              ['Everyday gift', 'Studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Personal Style',
    content: [
      { type: 'paragraph', text: 'Personal style should matter more than the occasion alone. A minimalist person may not wear bold earrings even for a big birthday. A romantic person may love butterfly earrings more than classic studs. A modern dresser may prefer huggies or hoops.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-75.jpg',
        content: [
          {
            type: 'table',
            headers: ['Her Style', 'Best Gift Direction', 'Product Direction'],
            rows: [
              ['Classic', 'Diamond studs', 'Cadenza M, Cadenza S'],
              ['Minimalist', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
              ['Romantic', 'Butterfly earrings or drops', 'Alidi Farfalla, Farfalla, Orsola'],
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
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery should feel personal, useful and celebratory. The safest birthday gift is usually diamond studs. The most meaningful birthday gift is often butterfly earrings. The most modern birthday gift is huggies. The strongest party birthday gift is hoops or bold earrings.' },
      {
        type: 'table',
        headers: ['Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe birthday gift', 'Medium diamond studs', 'Cadenza M'],
          ['First diamond birthday gift', 'Small studs', 'Cadenza S'],
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla'],
          ['Romantic birthday gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Modern birthday gift', 'Huggies', 'Amadea'],
          ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Birthday ear stack', 'Butterfly + stud or stud + huggie', 'Farfalla + Cadenza S, Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Anniversary Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'Anniversary jewellery should feel romantic, thoughtful and wearable after the occasion.' },
      { type: 'paragraph', text: 'Butterfly earrings are strong because they can represent growth, transformation and a shared journey. Drop earrings work beautifully for anniversary dinners. Diamond studs are safest if she prefers classic jewellery.' },
      {
        type: 'table',
        headers: ['Anniversary Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Romantic anniversary gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Anniversary dinner gift', 'Drop earrings', 'Orsola'],
          ['Classic anniversary gift', 'Medium diamond studs', 'Cadenza M'],
          ['First anniversary gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Milestone anniversary gift', 'Long drops or classic studs', 'Concetta Long, Cadenza M'],
          ['Minimal anniversary gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Anniversary ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Formal anniversary dinner', 'Long drops or medium studs', 'Concetta Long, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Romantic Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'Romantic jewellery gifts should feel personal, not generic. The gift should match the relationship and her style.' },
      { type: 'paragraph', text: 'Butterfly earrings are the strongest romantic direction when the gift should carry meaning. Drop earrings are best for date nights and dinners. Studs are safest when she prefers classic jewellery. Huggies and minimalist earrings are best when she prefers everyday pieces.' },
      {
        type: 'table',
        headers: ['Romantic Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Most romantic gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Meaningful romantic gift', 'Butterfly earrings', 'Farfalla'],
          ['Romantic dinner gift', 'Drop earrings', 'Orsola'],
          ['Safe romantic sparkle', 'Medium studs', 'Cadenza M'],
          ['Subtle romantic gift', 'Small studs', 'Cadenza S'],
          ['Everyday romantic gift', 'Huggies', 'Amadea'],
          ['Minimal romantic gift', 'Minimalist earrings', 'Laluce'],
          ['Bold romantic evening gift', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Everyday Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'Everyday jewellery gifts are strong because she can actually wear them often. These gifts should be comfortable, easy to style and not too outfit-specific.' },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are the best everyday jewellery gifts. Hoops can also work for someone who likes visible daily jewellery. Drops and butterfly earrings work when her everyday style is more romantic or dressy.' },
      {
        type: 'table',
        headers: ['Everyday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest everyday gift', 'Small studs', 'Cadenza S'],
          ['More polished everyday sparkle', 'Medium studs', 'Cadenza M'],
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
    heading: 'Minimalist Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'Minimalist jewellery gifts are ideal when she likes simple, clean and understated pieces.' },
      { type: 'paragraph', text: 'If she rarely wears bold jewellery, avoid oversized earrings or very dramatic pieces. Choose small studs, minimalist earrings or huggies instead. These pieces feel thoughtful without forcing a style she may not wear.' },
      {
        type: 'table',
        headers: ['Minimalist Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Quiet diamond gift', 'Small studs', 'Cadenza S'],
          ['Clean classic sparkle', 'Medium studs', 'Cadenza M'],
          ['Minimalist detail gift', 'Minimalist earrings', 'Laluce'],
          ['Modern minimal gift', 'Huggies', 'Amadea'],
          ['Minimal ear stack gift', 'Stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear-friendly gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Travel-friendly gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Subtle romantic gift', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },
  {
    heading: 'Meaningful Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'A meaningful jewellery gift should carry a message. It may represent growth, love, a new chapter, confidence, celebration or a personal milestone.' },
      { type: 'paragraph', text: 'Butterfly earrings are especially strong for meaningful gifting because they can symbolise transformation, growth, beauty, freedom and new beginnings. They work well for birthdays, anniversaries, graduations, new jobs, personal milestones and romantic gifts.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-77.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Gift Moment', 'Why It Works', 'Product Direction'],
            rows: [
              ['Birthday', 'Symbolises growth and a new year', 'Farfalla'],
              ['Anniversary', 'Represents growth together', 'Alidi Farfalla'],
              ['Graduation', 'Symbolises transformation and new beginnings', 'Farfalla'],
              ['New job', 'Represents a new chapter', 'Farfalla'],
              ['Romantic milestone', 'Feels personal and symbolic', 'Alidi Farfalla'],
              ['Self-gift', 'Symbolises personal growth', 'Farfalla'],
              ['Encouragement gift', 'Represents hope and change', 'Alidi Farfalla'],
              ['Meaningful ear stack', 'Combines symbolism and sparkle', 'Farfalla + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Party Jewellery Gifts for Her',
    content: [
      { type: 'paragraph', text: 'Party jewellery gifts work best when she likes visible earrings, evening outfits and standout styling.' },
      { type: 'paragraph', text: 'Pave Hoops are strong for someone who likes modern shape. Lusso is best for someone who loves bold sparkle and statement styling. Orsola works when the gift should feel elegant instead of bold. Cadenza M is safer when the outfit style is unknown.' },
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
          ['Party ear stack', 'Bold/hoop/drop + small stud', 'Lusso + Cadenza S, Pave Hoops + Cadenza S, Orsola + Cadenza S'],
          ['If unsure', 'Medium studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the most important parts of choosing jewellery gifts. The safest choice is the metal colour she already wears.' },
      { type: 'paragraph', text: 'Yellow gold feels warm and classic. White or silver tone feels clean and modern. Rose gold feels soft and romantic. If you are unsure, look at her rings, bracelets, watch, necklace or everyday earrings before choosing.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-79.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and rich', 'Everyday gifts, romantic gifts, black dresses, green dresses'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, workwear, formal outfits'],
              ['Rose gold', 'Soft, romantic and feminine', 'Butterfly earrings, blush outfits, anniversary gifts'],
              ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For gifts, avoid choosing metal colour only because it is trending. Match what she already wears most often.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Giftable Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts feel thoughtful when she has multiple piercings or likes layered jewellery.' },
      { type: 'paragraph', text: 'A two-piece stack is usually safer than a three-piece stack. The safest stack is a small stud with a huggie. The most romantic stack is a butterfly earring with a small stud. The best dinner stack is a drop earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Giftable Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest ear stack gift', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist stack gift', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic stack gift', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful stack gift', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Dinner stack gift', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft occasion stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal stack gift', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
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
      { type: 'subheading', text: 'For the Safest Jewellery Gift for Her' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are classic, wearable and easy to style.' },
      { type: 'subheading', text: 'For a Modern Everyday Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are close-fitting, modern and strong for daily wear or ear stacks.' },
      { type: 'subheading', text: 'For a Minimalist Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Meaningful Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. They work well for birthdays, anniversaries, milestones and romantic gifts.' },
      { type: 'subheading', text: 'For a Romantic Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for date nights, anniversary dinners and satin outfits.' },
      { type: 'subheading', text: 'For a Soft Occasion Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They are delicate and strong for blush, champagne, pastel, bridesmaid and soft romantic styling.' },
      { type: 'subheading', text: 'For a Formal Gift' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings. They work best for dressier evenings, formal dinners and milestone celebrations.' },
      { type: 'subheading', text: 'For a Party Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops or Lusso bold statement earrings. Pave Hoops are easier to repeat, while Lusso is stronger for someone who loves standout jewellery.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first jewellery gift', 'Small, safe, subtle and wearable'],
          ['Cadenza M diamond stud earrings', 'Best classic sparkle gift', 'Polished, timeless and easy to style'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Quiet, clean and easy for minimal style'],
          ['Farfalla butterfly earrings', 'Best meaningful birthday gift', 'Symbolic, soft and connected to growth'],
          ['Alidi Farfalla butterfly earrings', 'Best romantic gift', 'Strong for anniversaries and personal moments'],
          ['Orsola drop earrings', 'Best date-night gift', 'Elegant movement for dinners and occasions'],
          ['Concetta Short earrings', 'Best soft occasion gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal evening gift', 'Refined and polished for dressy occasions'],
          ['Pave Hoops', 'Best modern party gift', 'Adds shape and sparkle'],
          ['Lusso bold statement earrings', 'Best bold gift', 'Strong for someone who loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the gift by her style first. Pick Cadenza S or Cadenza M for safe sparkle, Amadea for modern everyday styling, Laluce for minimal jewellery, Farfalla or Alidi Farfalla for meaning, Orsola for date nights, Pave Hoops for shape and Lusso for bold party jewellery.' },
    ],
  },
  {
    heading: 'Common Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery based only on what looks impressive in the box. A gift should match what she will actually wear.' },
      { type: 'paragraph', text: 'Another mistake is choosing bold earrings for someone who wears minimalist jewellery. If her everyday style is subtle, choose studs, huggies or minimalist earrings instead.' },
      { type: 'paragraph', text: 'A third mistake is guessing metal colour. Look at what she already wears. If most of her jewellery is gold, choose gold. If it is silver or white-tone, choose that direction.' },
      { type: 'paragraph', text: 'Another mistake is choosing a symbolic gift when she prefers classic pieces. Butterfly earrings are meaningful, but diamond studs may be safer for someone traditional.' },
      { type: 'paragraph', text: 'A fifth mistake is ignoring lifestyle. Someone who dresses casually may wear Cadenza S or Amadea more often than formal drop earrings. Someone who dresses up often may love Orsola or Concetta Long.' },
      { type: 'paragraph', text: 'Finally, do not forget repeat wear. The best jewellery gifts should still feel useful after the birthday, anniversary, date night or wedding is over.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Final Jewellery Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing jewellery gifts for her, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is the gift for a birthday, anniversary, romantic moment, wedding, date night or everyday wear?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would diamond studs be safer?',
          'Is the gift meant to feel practical, emotional or both?',
          'Can the earrings be worn with more than one outfit?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack gift be more thoughtful than one pair?',
          'Are the earrings comfortable for long wear?',
          'Is the design easy to clean and store?',
          'Will the gift still feel wearable after the occasion?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose diamond studs. If you want meaning, choose butterfly earrings. If she likes modern jewellery, choose huggies. If she dresses up often, choose drops or hoops.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What jewellery is best as a gift for her?',
    answer: 'The best jewellery gift for her is something wearable, personal and suited to her style. Diamond studs, huggies, butterfly earrings, drops, hoops and minimalist earrings can all work depending on what she wears most.',
  },
  {
    question: 'Are earrings a good jewellery gift for her?',
    answer: 'Yes, earrings are a good jewellery gift because they are easier to choose than rings, work with many outfits and can be worn often.',
  },
  {
    question: 'Are lab-grown diamond earrings good gifts?',
    answer: 'Yes, lab-grown diamond earrings are strong gifts because they feel special while still being wearable for everyday outfits, dinners, weddings and occasions.',
  },
  {
    question: 'What are the safest earrings to gift her?',
    answer: 'Diamond studs are the safest earrings to gift because they are classic, simple and easy to wear.',
  },
  {
    question: 'What jewellery should I buy for a romantic gift?',
    answer: 'Butterfly earrings and drop earrings are strong romantic jewellery gifts. Butterfly earrings feel meaningful, while drop earrings are elegant for dinners and date nights.',
  },
  {
    question: 'What jewellery should I buy for a birthday gift?',
    answer: 'For birthdays, choose diamond studs for a safe gift, butterfly earrings for meaning, huggies for modern daily wear, or hoops for someone who likes visible jewellery.',
  },
  {
    question: 'What jewellery should I buy for an anniversary gift?',
    answer: 'For anniversaries, butterfly earrings, drop earrings and classic diamond studs are strong choices depending on her style.',
  },
  {
    question: 'What jewellery should I buy if I do not know her style?',
    answer: 'Choose medium diamond studs or small diamond studs. They are safer than bold, highly personal or very trend-led jewellery.',
  },
  {
    question: 'What metal colour is best for jewellery gifts?',
    answer: 'Choose the metal colour she already wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels romantic.',
  },
  {
    question: 'What IWantJewels earrings are best as gifts for her?',
    answer: 'Cadenza S, Cadenza M, Amadea, Laluce, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Concetta Long, Pave Hoops and Lusso are strong gift options depending on her style and occasion.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Jewellery gifts for her should feel special, personal and wearable. Choose diamond studs for safe sparkle, huggies for modern everyday jewellery, butterfly earrings for meaning, drops for romantic dinners, hoops for visible shape and bold earrings for someone who loves standout styling.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a jewellery gift with real diamond sparkle. Choose Cadenza S for a safe first gift, Cadenza M for classic polish, Amadea for huggies, Laluce for minimalist style, Farfalla or Alidi Farfalla for meaning, Orsola for date nights and Pave Hoops or Lusso for party-ready sparkle.',
  primaryLabel: 'Shop Jewellery Gifts for Her',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings for Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'jewellery-gifts-for-her')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'jewellery-gifts-for-her', 3)
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
