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
  title: 'Jewellery Gifts for Girlfriend',
  description:
    'Choose jewellery gifts for your girlfriend with lab grown diamond earrings, studs, huggies, butterfly earrings, drops and romantic gift ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-11.jpg',
  title: 'Jewellery Gifts for Girlfriend:',
  subtitle: 'Romantic Earrings She Will Actually Wear',
  paragraphs: [
    'Choosing jewellery for your girlfriend can feel difficult because the gift needs to feel thoughtful without feeling too random, too generic or too much for the relationship stage. The best jewellery gift is the piece that matches her style and feels like it was chosen with her in mind.',
    'Lab-grown diamond earrings are one of the safest and most useful jewellery gifts for a girlfriend because they are easier to choose than rings and more wearable than many occasion-only pieces. Diamond studs are the safest option if you are unsure. Huggies are perfect if she likes modern everyday jewellery. Butterfly earrings are ideal when the gift should feel meaningful and romantic. Drop earrings work beautifully for dinners, date nights and anniversary moments. Hoops and bold earrings are better if she likes visible jewellery and party outfits.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Orsola drop earrings, Concetta Short earrings, Pave Hoops and Lusso bold statement earrings all work for different girlfriend gift needs.',
  ],
  shopLabel: 'Shop Jewellery Gifts for Girlfriend',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery gifts for your girlfriend.',
    'Pick lab-grown diamond earrings as a romantic gift.',
    'Decide between studs, huggies, butterfly earrings, drops, hoops, minimalist earrings and bold earrings.',
    'Choose gifts for birthdays, anniversaries, date nights, milestones and surprise moments.',
    'Find safe jewellery gifts when you are unsure of her style.',
    'Choose jewellery based on relationship stage.',
    'Match earrings to her personal style, outfits and metal colour.',
    'Build romantic ear stack gift ideas.',
  ],
  image: '/blog-images/blog-image-23.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Jewellery Gift Selector for Girlfriend',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Girlfriend Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest jewellery gift for girlfriend', 'Small or medium diamond studs', 'Cadenza S, Cadenza M'],
          ['First diamond gift for girlfriend', 'Small diamond studs', 'Cadenza S'],
          ['Classic romantic gift', 'Medium diamond studs', 'Cadenza M'],
          ['Meaningful romantic gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Most romantic earring gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Modern everyday gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Birthday gift for girlfriend', 'Butterfly earrings, studs, huggies or hoops', 'Farfalla, Cadenza M, Amadea, Pave Hoops'],
          ['Anniversary gift for girlfriend', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Date night gift', 'Drops, butterfly earrings or medium studs', 'Orsola, Farfalla, Cadenza M'],
          ['Party gift for girlfriend', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Giftable ear stack', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['If you are unsure of her style', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
    ],
  },
  {
    heading: 'What Jewellery Should You Buy for Your Girlfriend?',
    content: [
      { type: 'paragraph', text: 'The best jewellery to buy for your girlfriend is a piece that matches her style and the relationship stage. If you are early in the relationship, small studs, huggies or minimalist earrings are safer. If you are choosing a birthday or anniversary gift, butterfly earrings, drop earrings or medium diamond studs can feel more special. If she likes bold fashion, hoops or statement earrings may work better.' },
      { type: 'paragraph', text: 'Earrings are usually easier to gift than rings because they do not require ring sizing and do not carry the same proposal-like meaning. They are also easier to wear often because they can work with casual outfits, workwear, date nights, parties and wedding guest looks.' },
      {
        type: 'table',
        headers: ['What to Consider', 'Why It Matters'],
        rows: [
          ['Relationship stage', 'Helps decide how romantic or significant the gift should feel'],
          ['Her usual jewellery', 'Shows whether she likes studs, hoops, huggies, drops or bold pieces'],
          ['Metal colour', 'Helps avoid choosing a colour she does not wear'],
          ['Occasion', 'Birthday, anniversary, date night and surprise gifts need different moods'],
          ['Lifestyle', 'Daily jewellery should be comfortable and easy to repeat'],
          ['Personal style', 'Classic, romantic, minimalist, modern and bold styles need different products'],
          ['Gift meaning', 'Symbolic jewellery feels stronger for emotional moments'],
          ['Wearability', 'A good gift should be worn after the occasion too'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Safest Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'The safest jewellery gifts for your girlfriend are usually diamond studs, huggies or minimalist earrings. These styles are wearable, easy to repeat and less risky than very bold or highly personal designs.' },
      { type: 'paragraph', text: 'Cadenza S is the safest first diamond gift because it feels subtle and wearable. Cadenza M is better if the gift should feel more polished and special. Amadea is ideal if she likes modern everyday jewellery. Laluce is best if she wears simple and understated pieces.' },
      {
        type: 'table',
        headers: ['Safe Girlfriend Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'First diamond gift, subtle daily wear', 'Cadenza S'],
          ['Medium diamond studs', 'Classic romantic sparkle', 'Cadenza M'],
          ['Huggies', 'Modern everyday jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Simple ear stack gift', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift if she likes romantic styling', 'Farfalla, Alidi Farfalla'],
          ['Drop earrings', 'Date night or dinner gift', 'Orsola, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Romantic Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'Romantic jewellery should feel personal without feeling forced. The best romantic gift depends on whether she likes classic sparkle, soft symbolism, elegant dinner styling or everyday jewellery.' },
      { type: 'paragraph', text: 'Butterfly earrings are the strongest romantic direction when you want the gift to carry meaning. Drop earrings are best for dinner dates and anniversary moments. Diamond studs are safest when she prefers classic pieces. Huggies are better when she likes modern daily styling.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-75.jpg',
        content: [
          {
            type: 'table',
            headers: ['Romantic Gift Need', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Most romantic gift', 'Butterfly earrings', 'Alidi Farfalla'],
              ['Meaningful romantic gift', 'Butterfly earrings', 'Farfalla'],
              ['Romantic dinner gift', 'Drop earrings', 'Orsola'],
              ['Classic romantic gift', 'Medium studs', 'Cadenza M'],
              ['Subtle romantic gift', 'Small studs', 'Cadenza S'],
              ['Everyday romantic gift', 'Huggies', 'Amadea'],
              ['Minimal romantic gift', 'Minimalist earrings', 'Laluce'],
              ['Bold romantic evening gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Meaningful Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'A meaningful jewellery gift should carry a message. It could represent growth, a new chapter, love, confidence, celebration or a shared memory.' },
      { type: 'paragraph', text: 'Butterfly earrings are especially strong for meaningful girlfriend gifts because a butterfly can symbolise transformation, growth, beauty and new beginnings. This makes them useful for birthdays, anniversaries, relationship milestones, new jobs, graduations and personal moments.' },
      {
        type: 'table',
        headers: ['Meaningful Gift Moment', 'Why It Works', 'Product Direction'],
        rows: [
          ['Birthday', 'Symbolises growth and a new year', 'Farfalla'],
          ['Anniversary', 'Represents growth together', 'Alidi Farfalla'],
          ['New relationship milestone', 'Feels personal without being too heavy', 'Farfalla'],
          ['New job or life change', 'Represents a new chapter', 'Farfalla'],
          ['Romantic surprise', 'Feels soft and symbolic', 'Alidi Farfalla'],
          ['Graduation or milestone', 'Symbolises transformation', 'Farfalla'],
          ['Self-confidence gift', 'Represents beauty and growth', 'Alidi Farfalla'],
          ['Meaningful ear stack', 'Combines symbolism and daily sparkle', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for your girlfriend should feel personal and useful. It can be romantic, classic, modern or bold depending on her style.' },
      { type: 'paragraph', text: 'Diamond studs are safest. Butterfly earrings are meaningful. Huggies are modern and wearable. Drop earrings work well if the birthday includes dinner or a special plan. Hoops and bold earrings are better if she enjoys party styling.' },
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
          ['Birthday dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Birthday ear stack gift', 'Butterfly + stud or stud + huggie', 'Farfalla + Cadenza S, Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Anniversary Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'Anniversary jewellery should feel romantic and thoughtful. The gift should match the relationship stage and her actual style.' },
      { type: 'paragraph', text: 'Butterfly earrings are strong because they can represent growth and transformation. Drop earrings work beautifully for anniversary dinners. Diamond studs are safest if she prefers classic jewellery. Huggies are a good choice for an early anniversary or modern everyday gift.' },
      {
        type: 'table',
        headers: ['Anniversary Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Romantic anniversary gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Anniversary dinner gift', 'Drop earrings', 'Orsola'],
          ['Classic anniversary gift', 'Medium diamond studs', 'Cadenza M'],
          ['First anniversary gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Minimal anniversary gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Soft anniversary gift', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Anniversary ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Formal anniversary dinner', 'Long drops or medium studs', 'Concetta Long, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Date Night Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'Date night jewellery gifts are strongest when the gift can be worn immediately for the evening. This makes drop earrings, butterfly earrings, medium studs and hoops especially useful.' },
      { type: 'paragraph', text: 'Orsola is the best date-night product direction because it adds movement and elegance. Alidi Farfalla and Farfalla are better when the gift should feel more meaningful. Cadenza M is safest for classic sparkle. Pave Hoops are better for modern date night looks.' },
      {
        type: 'table',
        headers: ['Date Night Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Romantic dinner gift', 'Drop earrings', 'Orsola'],
          ['Meaningful date night gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Classic date sparkle', 'Medium studs', 'Cadenza M'],
          ['Modern dinner look', 'Hoops', 'Pave Hoops'],
          ['Minimal date night gift', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Casual dinner gift', 'Huggies', 'Amadea'],
          ['Formal date night gift', 'Long drops', 'Concetta Long'],
          ['Date night ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Date night jewellery guide', href: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
    ],
  },
  {
    heading: 'First Diamond Gift for Girlfriend',
    content: [
      { type: 'paragraph', text: 'A first diamond gift should feel special but not overwhelming. Earrings are usually safer than rings because they do not create confusion around proposal meaning.' },
      { type: 'paragraph', text: 'Cadenza S is the safest first diamond gift because it is subtle, wearable and easy to style. Cadenza M is better when the gift should feel more polished. If she likes romantic pieces, Farfalla can be a meaningful first diamond-style gift. If she likes modern jewellery, Amadea may feel more natural.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-77.jpg',
        content: [
          {
            type: 'table',
            headers: ['First Diamond Gift Need', 'Best Direction', 'Product Direction'],
            rows: [
              ['Safest first diamond gift', 'Small studs', 'Cadenza S'],
              ['More polished first diamond gift', 'Medium studs', 'Cadenza M'],
              ['First romantic diamond gift', 'Butterfly earrings', 'Farfalla'],
              ['First everyday diamond gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
              ['First minimalist gift', 'Minimalist earrings', 'Laluce'],
              ['First dinner gift', 'Drop earrings', 'Orsola'],
              ['First ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
              ['If unsure', 'Small studs', 'Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Everyday lab-grown diamond earrings guide', href: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Relationship Stage',
    content: [
      { type: 'paragraph', text: 'The relationship stage helps decide how romantic or significant the jewellery should feel.' },
      { type: 'paragraph', text: 'In a newer relationship, choose something wearable and not too intense. In a committed relationship, meaningful butterfly earrings, drop earrings or classic studs can feel stronger. For an anniversary, date night or milestone, the gift can carry more romance.' },
      {
        type: 'table',
        headers: ['Relationship Stage', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['New relationship', 'Small studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Early relationship birthday', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['First anniversary', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Serious relationship', 'Butterfly earrings, drops or medium studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Long-term girlfriend', 'Meaningful earrings or dinner drops', 'Alidi Farfalla, Orsola'],
          ['Milestone gift', 'Butterfly earrings, long drops or classic studs', 'Alidi Farfalla, Concetta Long, Cadenza M'],
          ['Surprise gift', 'Studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Date night gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Her Personal Style',
    content: [
      { type: 'paragraph', text: 'Her personal style matters more than the gift occasion. A girlfriend who wears minimalist jewellery may not wear bold earrings even for a birthday. A girlfriend who loves romantic styling may prefer butterfly earrings over classic studs.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-79.jpg',
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
    heading: 'Jewellery Gifts by Outfit and Lifestyle',
    content: [
      { type: 'paragraph', text: 'A strong jewellery gift should fit what she actually wears. If she dresses casually most days, studs or huggies may be better than formal drops. If she loves dinners and dresses, Orsola or Concetta Long may feel more useful.' },
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
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },
  {
    heading: 'Jewellery Gifts by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the easiest ways to make the gift feel right. The safest choice is the metal colour she already wears most often.' },
      { type: 'paragraph', text: 'If she wears gold rings, gold bracelets or gold necklaces, choose yellow gold. If she wears silver-tone jewellery, choose white or silver tone. If she likes soft romantic pieces, rose gold can work beautifully, especially for butterfly earrings and sentimental gifts.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-81.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and romantic', 'Everyday gifts, black dresses, green dresses, anniversary gifts'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, workwear, formal outfits'],
              ['Rose gold', 'Soft, romantic and feminine', 'Butterfly earrings, blush outfits, birthday gifts'],
              ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For girlfriend gifts, avoid choosing a metal colour only because it is trending. Match what she already wears first.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Giftable Ear Stack Ideas for Girlfriend',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts are useful if your girlfriend has multiple piercings or likes layered jewellery.' },
      { type: 'paragraph', text: 'A two-piece stack is usually safer than a three-piece stack. The safest stack is a small stud with a huggie. The most romantic stack is a butterfly earring with a small stud. The best dinner stack is a drop earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Giftable Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest girlfriend stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist stack gift', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic stack gift', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful stack gift', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Dinner stack gift', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft date stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal dinner stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Party stack gift', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Modern hoop stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Jewellery Gift for Your Girlfriend' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are classic, wearable and safer when you are unsure of her exact style.' },
      { type: 'subheading', text: 'For a First Diamond Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S. It feels delicate, easy to wear and not too overwhelming for an early relationship or first diamond-style gift.' },
      { type: 'subheading', text: 'For a Romantic Gift With Meaning' },
      { type: 'paragraph', text: 'Choose Farfalla or Alidi Farfalla butterfly earrings. They are ideal when you want the gift to feel personal, symbolic and soft.' },
      { type: 'subheading', text: 'For a Date Night Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for dinners, anniversary plans and romantic outfits.' },
      { type: 'subheading', text: 'For a Modern Everyday Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are close-fitting, wearable and useful for daily styling or ear stacks.' },
      { type: 'subheading', text: 'For a Minimalist Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Soft Romantic Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They are delicate and work well for blush, champagne, pastel, satin and date-night outfits.' },
      { type: 'subheading', text: 'For a Party Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops or Lusso bold statement earrings only if she likes visible jewellery. If you are unsure, Cadenza M is safer.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Girlfriend Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first jewellery gift', 'Small, safe, subtle and wearable'],
          ['Cadenza M diamond stud earrings', 'Best classic romantic gift', 'Polished, timeless and easy to style'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Quiet, clean and easy for minimal style'],
          ['Farfalla butterfly earrings', 'Best meaningful birthday gift', 'Symbolic, soft and connected to growth'],
          ['Alidi Farfalla butterfly earrings', 'Best romantic gift', 'Strong for anniversaries and personal moments'],
          ['Orsola drop earrings', 'Best date-night gift', 'Elegant movement for dinners and occasions'],
          ['Concetta Short earrings', 'Best soft romantic gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal evening gift', 'Refined and polished for dressy occasions'],
          ['Pave Hoops', 'Best modern party gift', 'Adds shape and sparkle'],
          ['Lusso bold statement earrings', 'Best bold gift', 'Strong for someone who loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the gift by her style and your relationship stage. Pick Cadenza S or Cadenza M for safe sparkle, Amadea for modern daily wear, Laluce for minimal jewellery, Farfalla or Alidi Farfalla for meaning, Orsola for date nights, Pave Hoops for shape and Lusso for bold party styling.' },
    ],
  },
  {
    heading: 'Common Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that feels impressive but does not match her style. If she wears small, simple pieces every day, bold statement earrings may not be the safest gift.' },
      { type: 'paragraph', text: 'Another mistake is buying jewellery that feels too serious for the relationship stage. In a newer relationship, small studs, huggies or minimalist earrings may feel more natural than a very dramatic romantic gift.' },
      { type: 'paragraph', text: 'A third mistake is guessing the metal colour. Look at the jewellery she already wears. If she wears gold most often, choose gold. If she wears white or silver-tone jewellery, choose that direction.' },
      { type: 'paragraph', text: 'Another mistake is choosing symbolic jewellery for someone who prefers classic pieces. Butterfly earrings are meaningful, but Cadenza M may be safer for someone traditional.' },
      { type: 'paragraph', text: 'A fifth mistake is ignoring lifestyle. If she dresses casually most days, she may wear Cadenza S or Amadea more often than formal evening drops.' },
      { type: 'paragraph', text: 'Finally, do not forget repeat wear. The best jewellery gift for your girlfriend should still feel useful after the birthday, anniversary, date night or surprise moment is over.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/earring-style-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Final Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing jewellery for your girlfriend, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is this for a birthday, anniversary, date night, milestone or surprise gift?',
          'Is the relationship new, early, serious or long-term?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would diamond studs be safer?',
          'Is the gift meant to feel practical, romantic or both?',
          'Can the earrings be worn with more than one outfit?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack gift feel more thoughtful than one pair?',
          'Are the earrings comfortable for long wear?',
          'Will the gift still feel wearable after the occasion?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose diamond studs. If you want meaning, choose butterfly earrings. If she likes modern jewellery, choose huggies. If the gift is tied to dinner or date night, choose drops.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery should I buy for my girlfriend?', answer: 'The best jewellery to buy for your girlfriend is something that matches her style and the relationship stage. Diamond studs are safest, butterfly earrings feel meaningful, huggies are modern and drop earrings are strong for date nights.' },
  { question: 'Are earrings a good gift for a girlfriend?', answer: 'Yes, earrings are a good gift for a girlfriend because they are easier to choose than rings, can be worn often and can feel romantic without being too difficult to size.' },
  { question: 'Are lab-grown diamond earrings a good gift for a girlfriend?', answer: 'Yes, lab-grown diamond earrings are a strong girlfriend gift because they feel special, wearable and suitable for birthdays, anniversaries, date nights and everyday styling.' },
  { question: 'What are the safest earrings to gift a girlfriend?', answer: 'Diamond studs are the safest earrings to gift a girlfriend because they are classic, simple and easy to wear with many outfits.' },
  { question: 'What should I buy my girlfriend for a first diamond gift?', answer: 'Small diamond studs are usually the safest first diamond gift. Cadenza S is a strong direction because it feels subtle and wearable.' },
  { question: 'Are butterfly earrings a romantic gift for a girlfriend?', answer: 'Yes, butterfly earrings can be a romantic gift because they are soft, feminine and symbolic. They can represent growth, beauty, transformation and new beginnings.' },
  { question: 'What jewellery should I buy for my girlfriend\'s birthday?', answer: 'For your girlfriend\'s birthday, choose diamond studs for a safe gift, butterfly earrings for meaning, huggies for modern daily wear, or hoops if she likes visible jewellery.' },
  { question: 'What jewellery should I buy for my girlfriend on an anniversary?', answer: 'For an anniversary, butterfly earrings, drop earrings and classic diamond studs are strong choices depending on whether her style is romantic, elegant or classic.' },
  { question: 'What metal colour should I choose for my girlfriend\'s jewellery gift?', answer: 'Choose the metal colour she already wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels romantic.' },
  { question: 'What IWantJewels earrings are best for girlfriend gifts?', answer: 'Cadenza S, Cadenza M, Amadea, Laluce, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Pave Hoops and Lusso are strong girlfriend gift options depending on her style and the occasion.' },
]

const cta: V2CTABlock = {
  heading: 'Jewellery gifts for your girlfriend should feel thoughtful, personal and wearable. Choose diamond studs for safe sparkle, huggies for modern everyday jewellery, butterfly earrings for meaning, drops for date-night elegance, hoops for visible shape and bold earrings only if she loves standout styling.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a jewellery gift with real diamond sparkle. Choose Cadenza S for a safe first gift, Cadenza M for classic polish, Amadea for huggies, Laluce for minimalist style, Farfalla or Alidi Farfalla for meaning, Orsola for date nights and Pave Hoops or Lusso for party-ready sparkle.',
  primaryLabel: 'Shop Jewellery Gifts for Girlfriend',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Romantic Jewellery Gifts',
  secondaryHref: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings for Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'jewellery-gifts-for-girlfriend')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'jewellery-gifts-for-girlfriend', 3)
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
