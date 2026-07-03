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
  image: '/blog-images/blog-image-85.jpg',
  title: 'Birthday Jewellery Gifts:',
  subtitle: 'Earrings She Will Actually Wear After Her Birthday',
  paragraphs: [
    'Birthday jewellery should feel personal, celebratory and wearable. The best birthday gift is not always the biggest or boldest piece. It is the piece that matches her style, feels thoughtful in the moment and still becomes something she reaches for after the birthday is over.',
    'Lab-grown diamond earrings are one of the strongest birthday jewellery gifts because they feel special without being difficult to choose. Diamond studs are the safest option if you are unsure of her style. Huggies are ideal for someone who likes modern everyday jewellery. Butterfly earrings are meaningful because they can symbolise growth, beauty and a new chapter. Drop earrings work beautifully when the birthday includes dinner or a special evening plan. Hoops are perfect for someone who likes visible jewellery and party styling. Minimalist earrings are best for someone who prefers quiet, clean pieces.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Pave Hoops, Orsola drop earrings, Concetta Short earrings, Concetta Long earrings and Lusso bold statement earrings all work for different birthday gift needs.',
  ],
  shopLabel: 'Shop Birthday Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose birthday jewellery gifts for her.',
    'Pick lab-grown diamond earrings as a birthday gift.',
    'Decide between studs, huggies, butterfly earrings, hoops, drops, minimalist earrings and bold earrings.',
    'Choose birthday gifts for girlfriend, wife, sister, mum, daughter and best friend.',
    'Find meaningful birthday jewellery gifts with symbolism.',
    'Choose safe birthday gifts when you are unsure of her exact style.',
    'Choose birthday jewellery for dinners, parties, milestone birthdays and everyday wear.',
    'Build birthday ear stack gift ideas.',
  ],
  image: '/blog-images/blog-image-87.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Birthday Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Birthday Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest birthday jewellery gift', 'Small or medium diamond studs', 'Cadenza S, Cadenza M'],
          ['First diamond-style birthday gift', 'Small diamond studs', 'Cadenza S'],
          ['Classic birthday gift', 'Medium diamond studs', 'Cadenza M'],
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Birthday dinner gift', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['Modern everyday birthday gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist birthday gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Birthday party gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Romantic birthday gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Soft feminine birthday gift', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Milestone birthday gift', 'Classic studs, butterfly earrings or long drops', 'Cadenza M, Alidi Farfalla, Concetta Long'],
          ['Birthday ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['If unsure of her style', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery a Good Birthday Gift?',
    content: [
      { type: 'paragraph', text: 'A good birthday jewellery gift should feel thoughtful, personal and useful after the celebration. It should not only look good in the box. It should match her real style, her lifestyle and the kind of outfits she actually wears.' },
      { type: 'paragraph', text: 'Earrings are especially strong birthday gifts because they are easier to choose than rings and can be worn with many outfits. A pair of studs can become her daily jewellery. Butterfly earrings can carry meaning. Huggies can fit into a modern everyday wardrobe. Drop earrings can be worn for birthday dinners, date nights, weddings and future occasions. Hoops and bold earrings can make a birthday party outfit feel complete.' },
      {
        type: 'table',
        headers: ['What Makes It a Strong Birthday Gift', 'Why It Matters'],
        rows: [
          ['Wearable after the birthday', 'The gift does not stay in the box'],
          ['Matched to her style', 'Makes the gift feel chosen for her'],
          ['Easy to size', 'Earrings are simpler to gift than rings'],
          ['Emotion or meaning', 'Makes the birthday gift feel personal'],
          ['Comfortable design', 'Helps her wear the jewellery often'],
          ['Occasion flexibility', 'Works for dinner, work, parties and everyday outfits'],
          ['Metal colour match', 'Helps the gift fit her existing jewellery'],
          ['Rewear value', 'Makes the gift feel more valuable over time'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Safest Birthday Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest birthday jewellery gifts are usually diamond studs, huggies or minimalist earrings. These pieces are wearable, easy to repeat and less risky than very bold or highly personal designs.' },
      { type: 'paragraph', text: 'Cadenza S is the safest subtle birthday gift because it is small, classic and easy to wear every day. Cadenza M is better when the birthday gift should feel more polished and special. Amadea is ideal for someone who likes modern everyday jewellery. Laluce works well if she prefers understated pieces.' },
      {
        type: 'table',
        headers: ['Safe Birthday Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'First diamond-style birthday gift', 'Cadenza S'],
          ['Medium diamond studs', 'Classic birthday sparkle', 'Cadenza M'],
          ['Huggies', 'Modern everyday jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Practical birthday ear stack', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift if she likes soft styling', 'Farfalla, Alidi Farfalla'],
          ['Short drops', 'Delicate occasion gift', 'Concetta Short'],
          ['Hoops', 'Modern birthday gift if she likes visible jewellery', 'Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Meaningful Birthday Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A meaningful birthday jewellery gift should carry a message. Birthdays naturally connect with growth, change, celebration and a new year of life. This makes butterfly earrings one of the strongest symbolic birthday gift directions.' },
      { type: 'paragraph', text: 'A butterfly can represent transformation, beauty, growth, freedom and new beginnings. Farfalla and Alidi Farfalla are therefore strong birthday gifts when the shopper wants something more emotional than a basic accessory.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-89.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Birthday Gift Idea', 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise growth and a new year', 'Farfalla'],
              ['Sentimental butterfly earrings', 'Feel personal and keepsake-led', 'Alidi Farfalla'],
              ['Butterfly + small stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
              ['Small diamond studs', 'First classic diamond-style gift', 'Cadenza S'],
              ['Medium diamond studs', 'Polished milestone sparkle', 'Cadenza M'],
              ['Drop earrings', 'Birthday dinner and date-night styling', 'Orsola'],
              ['Huggies', 'Practical new-year everyday jewellery', 'Amadea'],
              ['Minimalist earrings', 'Quiet and thoughtful gift', 'Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts by Relationship',
    content: [
      { type: 'paragraph', text: 'The relationship helps decide whether the birthday gift should feel romantic, practical, meaningful, stylish or safe.' },
      { type: 'paragraph', text: 'For a girlfriend or wife, butterfly earrings, drops or classic studs can feel romantic. For a sister or best friend, huggies, hoops, studs or butterfly earrings can feel stylish and personal without becoming too romantic. For mum, classic studs, drops or huggies are usually safe. For a daughter, small studs, huggies or butterfly earrings work well.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Birthday Jewellery Direction', 'Product Direction'],
        rows: [
          ['Girlfriend', 'Butterfly earrings, huggies, drops or studs', 'Farfalla, Amadea, Orsola, Cadenza M'],
          ['Wife', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Sister', 'Huggies, studs, hoops or butterfly earrings', 'Amadea, Cadenza M, Pave Hoops, Farfalla'],
          ['Mum', 'Classic studs, huggies or elegant drops', 'Cadenza M, Amadea, Orsola'],
          ['Daughter', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Best friend', 'Huggies, hoops, butterfly earrings or studs', 'Amadea, Pave Hoops, Farfalla, Cadenza S'],
          ['Partner', 'Butterfly earrings, drops or medium studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['If unsure', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for girlfriend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-girlfriend' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts by Age and Milestone',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery can change depending on the age and milestone. A first special jewellery gift should usually be simple. A milestone birthday can carry more polish or meaning. A party birthday gift can be more visible if the recipient enjoys bold styling.' },
      {
        type: 'table',
        headers: ['Birthday Stage', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['First special birthday jewellery gift', 'Small studs', 'Cadenza S'],
          ['18th birthday style gift', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['21st birthday gift', 'Hoops, huggies, butterfly earrings or studs', 'Pave Hoops, Amadea, Farfalla, Cadenza M'],
          ['25th birthday gift', 'Huggies, studs or drops', 'Amadea, Cadenza M, Orsola'],
          ['30th birthday gift', 'Classic studs, drops or butterfly earrings', 'Cadenza M, Orsola, Alidi Farfalla'],
          ['40th birthday gift', 'Polished studs, drops or long drops', 'Cadenza M, Orsola, Concetta Long'],
          ['50th birthday gift', 'Classic studs, elegant drops or butterfly earrings', 'Cadenza M, Orsola, Alidi Farfalla'],
          ['Milestone birthday', 'Butterfly earrings, long drops or classic studs', 'Alidi Farfalla, Concetta Long, Cadenza M'],
          ['Birthday dinner', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Birthday party', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
        ],
      },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts by Personal Style',
    content: [
      { type: 'paragraph', text: 'Personal style should guide the gift more than the birthday alone. A minimalist person may not wear bold earrings even on a milestone birthday. A romantic person may love butterfly earrings. A modern dresser may prefer huggies or hoops. A classic dresser may prefer diamond studs.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Her Style', 'Best Birthday Gift Direction', 'Product Direction'],
            rows: [
              ['Classic', 'Diamond studs', 'Cadenza S, Cadenza M'],
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
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for a girlfriend should feel thoughtful, romantic and appropriate for the relationship stage.' },
      { type: 'paragraph', text: 'If you are unsure, choose studs or huggies. If the relationship is more serious or the gift should feel meaningful, butterfly earrings are strong. If the birthday includes dinner, drop earrings are ideal. If she likes party outfits, hoops or bold earrings can work.' },
      {
        type: 'table',
        headers: ['Girlfriend Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe girlfriend birthday gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Romantic birthday gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Birthday dinner gift', 'Drop earrings', 'Orsola'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist gift', 'Minimalist earrings', 'Laluce'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['First diamond birthday gift', 'Small studs', 'Cadenza S'],
          ['Birthday ear stack gift', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for girlfriend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-girlfriend' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Wife',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for a wife can carry more romance, meaning and polish. The gift should feel personal and still be wearable after the birthday.' },
      { type: 'paragraph', text: 'Butterfly earrings are strong for meaning, drop earrings are ideal for a birthday dinner, and diamond studs are safest for classic style. Huggies or minimalist earrings work well if she prefers everyday jewellery.' },
      {
        type: 'table',
        headers: ['Wife Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Romantic birthday gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Classic birthday gift', 'Medium studs', 'Cadenza M'],
          ['Birthday dinner gift', 'Drop earrings', 'Orsola'],
          ['Milestone birthday gift', 'Long drops or classic studs', 'Concetta Long, Cadenza M'],
          ['Everyday birthday gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
          ['Soft birthday gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Birthday ear stack gift', 'Butterfly + stud or drop + stud', 'Farfalla + Cadenza S, Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for wife', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-wife' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for a sister should feel stylish, useful and matched to her personality.' },
      { type: 'paragraph', text: 'Huggies, hoops, studs and butterfly earrings are strong sister gift directions. Drops work if she enjoys dinners and occasion outfits. Minimalist earrings are best if her style is understated.' },
      {
        type: 'table',
        headers: ['Sister Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe birthday gift', 'Medium studs', 'Cadenza M'],
          ['Subtle birthday gift', 'Small studs', 'Cadenza S'],
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla'],
          ['Modern birthday gift', 'Huggies', 'Amadea'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
          ['Birthday dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Birthday ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for sister', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-sister' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Mum',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for mum should feel thoughtful, comfortable and elegant. Classic studs are safest. Huggies work for modern everyday styling. Butterfly earrings feel meaningful. Drops are ideal for dinners and family celebrations.' },
      {
        type: 'table',
        headers: ['Mum Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe birthday gift', 'Medium studs', 'Cadenza M'],
          ['Subtle birthday gift', 'Small studs', 'Cadenza S'],
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Elegant birthday dinner gift', 'Drop earrings', 'Orsola'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
          ['Formal birthday gift', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Birthday ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for mum', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-mum' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Daughter',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for a daughter should match her age, style and lifestyle. For a first diamond-style birthday gift, small studs are safest. For meaning, choose butterfly earrings. For modern daily wear, choose huggies or hoops.' },
      {
        type: 'table',
        headers: ['Daughter Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['First diamond-style birthday gift', 'Small studs', 'Cadenza S'],
          ['More polished birthday gift', 'Medium studs', 'Cadenza M'],
          ['Meaningful birthday gift', 'Butterfly earrings', 'Farfalla'],
          ['Modern birthday gift', 'Huggies', 'Amadea'],
          ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Birthday dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Birthday ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for daughter', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-daughter' },
    ],
  },
  {
    heading: 'Birthday Jewellery Gifts for Best Friend',
    content: [
      { type: 'paragraph', text: 'Birthday jewellery for a best friend should feel stylish and personal without becoming too romantic. Huggies, hoops, studs and butterfly earrings are strong choices. Drops work if she likes dinners and occasion styling.' },
      {
        type: 'table',
        headers: ['Best Friend Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe birthday gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Meaningful friendship gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Modern birthday gift', 'Huggies', 'Amadea'],
          ['Party birthday gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Minimalist birthday gift', 'Minimalist earrings', 'Laluce'],
          ['Birthday dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Bridesmaid best friend birthday gift', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Birthday ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for best friend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-best-friend' },
    ],
  },
  {
    heading: 'Birthday Dinner Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Birthday dinner gifts are strong because the jewellery can be worn immediately. If the birthday plan includes dinner, drinks, a romantic evening or a family celebration, drop earrings and polished studs are especially useful.' },
      { type: 'paragraph', text: 'Orsola is the strongest birthday dinner direction because it adds movement and elegance. Cadenza M is safest for classic sparkle. Concetta Short works for soft outfits, while Concetta Long works for more formal dinners.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Birthday Dinner Gift Need', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Best birthday dinner earrings', 'Drop earrings', 'Orsola'],
              ['Safe dinner sparkle', 'Medium studs', 'Cadenza M'],
              ['Soft dinner outfit', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Formal birthday dinner', 'Long drops', 'Concetta Long'],
              ['Black dinner dress', 'Drops or studs', 'Orsola, Cadenza M'],
              ['Satin dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Red dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Birthday dinner ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Date night jewellery guide', href: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
    ],
  },
  {
    heading: 'Birthday Party Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Birthday party jewellery can be more visible, especially if the recipient likes evening outfits, simple dresses, black dresses, jumpsuits or standout styling.' },
      { type: 'paragraph', text: 'Pave Hoops are strong for a modern birthday party gift. Lusso works if she loves bold statement jewellery. Orsola is better for elegant party styling. Cadenza M is safer when her style is unknown.' },
      {
        type: 'table',
        headers: ['Birthday Party Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Modern birthday party gift', 'Hoops', 'Pave Hoops'],
          ['Bold birthday party gift', 'Bold statement earrings', 'Lusso'],
          ['Elegant birthday party gift', 'Drop earrings', 'Orsola'],
          ['Safe party sparkle', 'Medium studs', 'Cadenza M'],
          ['Black dress birthday party', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Birthday party ear stack', 'Hoop/drop/bold + small stud', 'Pave Hoops + Cadenza S, Orsola + Cadenza S, Lusso + Cadenza S'],
          ['Soft birthday party look', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['If unsure', 'Medium studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },
  {
    heading: 'Everyday Birthday Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Everyday birthday jewellery gifts are often the most useful because she can wear them long after the birthday.' },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are the strongest everyday gift directions. Hoops work if she likes visible daily jewellery. Butterfly earrings can work if her everyday style is soft or meaningful. Drops can work if she often dresses up for dinners or events.' },
      {
        type: 'table',
        headers: ['Everyday Birthday Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest everyday birthday gift', 'Small studs', 'Cadenza S'],
          ['Polished everyday sparkle', 'Medium studs', 'Cadenza M'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist everyday gift', 'Minimalist earrings', 'Laluce'],
          ['Everyday ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Weekend everyday gift', 'Hoops', 'Pave Hoops'],
          ['Meaningful everyday gift', 'Butterfly earrings', 'Farfalla'],
          ['Daily-to-dinner gift', 'Medium studs or drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Everyday lab-grown diamond earrings guide', href: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
    ],
  },
  {
    heading: 'Birthday Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the easiest ways to make a birthday gift feel right. The safest choice is the metal colour she already wears most often.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, classic and celebratory. White or silver tone feels clean, bright and modern. Rose gold feels soft, feminine and meaningful. For butterfly earrings and sentimental birthday gifts, rose gold can be especially strong if she already wears that tone.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-95.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Birthday Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and celebratory', 'Everyday gifts, birthday dinners, black dresses, green dresses'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, workwear, cool-toned wardrobes'],
              ['Rose gold', 'Soft, feminine and meaningful', 'Butterfly earrings, sentimental gifts, blush or pastel outfits'],
              ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For birthday gifts, avoid choosing metal colour only because it is trending. Match what she already wears first.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Birthday Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts are strong when she has multiple piercings or likes layered jewellery. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: 'The safest birthday stack is a small stud with a huggie. The most meaningful birthday stack is a butterfly earring with a small stud. The best birthday dinner stack is a drop earring with a small support stud. The best birthday party stack is a hoop or bold earring with a small stud.' },
      {
        type: 'table',
        headers: ['Birthday Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest birthday stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist birthday stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Meaningful birthday stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Sentimental birthday stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Birthday dinner stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft birthday stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal birthday stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Modern birthday stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Party birthday stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Birthday Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Birthday Jewellery Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are classic, wearable and safe when you are unsure of her exact style.' },
      { type: 'subheading', text: 'For a Meaningful Birthday Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. They are strong for birthdays because butterfly symbolism connects naturally to growth, beauty and a new year.' },
      { type: 'subheading', text: 'For a Sentimental Birthday Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They work well when the gift should feel emotional, personal and keepsake-led.' },
      { type: 'subheading', text: 'For a Birthday Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for birthday dinners, date nights and special evening outfits.' },
      { type: 'subheading', text: 'For a Modern Everyday Birthday Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are close-fitting, wearable and useful for daily styling or ear stacks.' },
      { type: 'subheading', text: 'For a Minimalist Birthday Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Soft Birthday Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They are delicate and work well for blush, champagne, pastel, soft satin and feminine styling.' },
      { type: 'subheading', text: 'For a Formal Birthday Gift' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings or Cadenza M. Concetta Long works for dressier birthdays, while Cadenza M is safer and more classic.' },
      { type: 'subheading', text: 'For a Birthday Party Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops if she likes modern visible jewellery. Choose Lusso bold statement earrings only if she loves standout party styling.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Birthday Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best safe first birthday gift', 'Small, subtle, classic and wearable'],
          ['Cadenza M diamond stud earrings', 'Best classic birthday sparkle', 'Polished, timeless and easy to style'],
          ['Farfalla butterfly earrings', 'Best meaningful birthday gift', 'Symbolic, soft and connected to growth'],
          ['Alidi Farfalla butterfly earrings', 'Best sentimental birthday gift', 'Strong for emotional birthday gifting'],
          ['Amadea Huggie earrings', 'Best modern everyday birthday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated birthday gift', 'Quiet, clean and easy for minimal style'],
          ['Pave Hoops', 'Best modern birthday party gift', 'Adds shape and sparkle'],
          ['Orsola drop earrings', 'Best birthday dinner gift', 'Elegant movement for dresses and events'],
          ['Concetta Short earrings', 'Best soft birthday gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal birthday gift', 'Refined and polished for dressy occasions'],
          ['Lusso bold statement earrings', 'Best bold birthday party gift', 'Strong only if she loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the birthday gift by her style first. Pick Cadenza S for a safe first gift, Cadenza M for classic sparkle, Farfalla for meaning, Alidi Farfalla for sentimental gifting, Amadea for modern daily wear, Laluce for minimal style, Orsola for birthday dinners and Pave Hoops or Lusso for birthday party styling.' },
    ],
  },
  {
    heading: 'Common Birthday Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that only works for the birthday outfit. A strong birthday gift should be useful after the celebration too.' },
      { type: 'paragraph', text: 'Another mistake is choosing bold earrings when she usually wears simple jewellery. If her style is minimal, choose studs, huggies or minimalist earrings instead.' },
      { type: 'paragraph', text: 'A third mistake is making the gift too formal when she mostly wears casual or everyday outfits. If she wears simple daily jewellery, Cadenza S, Amadea or Laluce may be more useful than formal drops.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the meaning of the occasion. A birthday marks growth and a new year, so symbolic pieces such as butterfly earrings can feel more thoughtful than a generic gift.' },
      { type: 'paragraph', text: 'A fifth mistake is guessing the metal colour. Look at what she already wears. If most of her jewellery is gold, choose gold. If she wears silver or white-tone jewellery, choose that direction.' },
      { type: 'paragraph', text: 'Finally, do not forget comfort and repeat wear. Birthday jewellery should feel beautiful, but it should also be easy to wear, clean and store.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Birthday Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing birthday jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is this a safe gift, romantic gift, meaningful gift, dinner gift or party gift?',
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is the birthday a milestone birthday?',
          'Should the gift feel meaningful, practical or both?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would diamond studs be safer?',
          'Can the earrings be worn after the birthday?',
          'Will the jewellery work for everyday outfits, workwear, dinners, travel or parties?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack feel more thoughtful?',
          'Are the earrings comfortable for long wear?',
          'Is the design easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza S or Cadenza M. If you want meaning, choose Farfalla. If the gift should feel romantic, choose Alidi Farfalla or Orsola. If she likes modern jewellery, choose Amadea or Pave Hoops. If the gift is for a birthday dinner, choose Orsola.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for a birthday gift?', answer: 'The best birthday jewellery is wearable, personal and matched to her style. Diamond studs, butterfly earrings, huggies, hoops, drop earrings and minimalist earrings can all work depending on the recipient.' },
  { question: 'Are earrings a good birthday gift?', answer: 'Yes, earrings are a good birthday gift because they are personal, wearable and easier to choose than rings.' },
  { question: 'Are lab-grown diamond earrings good birthday gifts?', answer: 'Yes, lab-grown diamond earrings are strong birthday gifts because they feel special while still being wearable for everyday outfits, dinners, parties and future occasions.' },
  { question: 'What are the safest earrings to gift for a birthday?', answer: 'Diamond studs are the safest birthday earrings because they are classic, simple and easy to wear with many outfits.' },
  { question: 'Are butterfly earrings a meaningful birthday gift?', answer: 'Yes, butterfly earrings are meaningful birthday gifts because they can symbolise growth, transformation, beauty and a new chapter.' },
  { question: 'What jewellery should I buy my girlfriend for her birthday?', answer: 'For a girlfriend, choose diamond studs for a safe gift, butterfly earrings for meaning, drop earrings for date nights, huggies for everyday wear or hoops if she likes modern styling.' },
  { question: 'What jewellery should I buy my wife for her birthday?', answer: 'For a wife, butterfly earrings, drop earrings and classic diamond studs are strong choices depending on whether her style is romantic, elegant or classic.' },
  { question: 'What jewellery should I buy my sister for her birthday?', answer: 'For a sister, huggies, studs, butterfly earrings or hoops can work well depending on her style.' },
  { question: 'What jewellery should I buy my mum for her birthday?', answer: 'For mum, classic studs, huggies, butterfly earrings or elegant drops are strong birthday gift choices.' },
  { question: 'What IWantJewels earrings are best for birthday gifts?', answer: 'Cadenza S, Cadenza M, Farfalla, Alidi Farfalla, Amadea, Laluce, Pave Hoops, Orsola, Concetta Short, Concetta Long and Lusso are strong birthday gift options depending on her style and the occasion.' },
]

const cta: V2CTABlock = {
  heading: 'Birthday jewellery should celebrate the person and still feel useful after the day is over. Choose diamond studs for safe sparkle, butterfly earrings for meaning, huggies for modern everyday wear, minimalist earrings for quiet style, hoops for visible shape, drops for birthday dinners and bold earrings only if she loves standout styling.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a birthday gift with real diamond sparkle. Choose Cadenza S for a safe first gift, Cadenza M for classic polish, Farfalla for meaning, Alidi Farfalla for sentimental gifting, Amadea for huggies, Laluce for minimalist style, Orsola for dinners and Pave Hoops or Lusso for birthday party styling.',
  primaryLabel: 'Shop Birthday Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Jewellery Gifts for Her Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/jewellery-gifts-for-her',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'birthday-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'birthday-jewellery-gifts', 3)
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
