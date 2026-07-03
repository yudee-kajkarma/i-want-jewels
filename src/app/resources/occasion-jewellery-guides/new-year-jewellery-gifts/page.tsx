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
  title: 'New Year Jewellery Gifts for Her',
  description:
    'Choose New Year jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and party-ready gift ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-9.jpg',
  title: 'New Year Jewellery Gifts:',
  subtitle: 'Earrings for a Fresh Start and Every Celebration After',
  paragraphs: [
    'New Year jewellery should feel celebratory, meaningful and wearable beyond one night. The best New Year gift is not only something that sparkles for a New Year\'s Eve party. It should also feel like a fresh-start piece she can wear into the year ahead for dinners, work events, birthdays, holidays, date nights, weddings and everyday styling.',
    'Lab-grown diamond earrings are strong New Year jewellery gifts because they feel special without being hard to choose. Diamond studs are the safest option if you are unsure of her style. Huggies are ideal for someone who likes modern everyday jewellery. Butterfly earrings are especially strong for New Year gifting because they can symbolise growth, transformation and new beginnings. Drop earrings are perfect for New Year dinners, evening outfits and celebration looks. Hoops work well for someone who likes visible jewellery and party styling. Minimalist earrings are best for someone who prefers quiet, clean pieces.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Orsola drop earrings, Concetta Short earrings, Concetta Long earrings, Pave Hoops and Lusso bold statement earrings all work for different New Year gift needs.',
  ],
  shopLabel: 'Shop New Year Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose New Year jewellery gifts for her.',
    'Pick lab-grown diamond earrings as a New Year gift.',
    'Choose earrings for New Year\'s Eve parties, dinners and fresh-start gifting.',
    'Decide between studs, huggies, butterfly earrings, hoops, drops, minimalist earrings and bold earrings.',
    'Choose New Year gifts for girlfriend, wife, mum, sister, daughter and best friend.',
    'Find meaningful jewellery gifts connected to a new beginning.',
    'Match earrings to black dresses, satin outfits, metallic looks, winter outfits and party styling.',
    'Build New Year ear stack gift ideas.',
  ],
  image: '/blog-images/blog-image-11.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'New Year Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main New Year gift decision tool.' },
      {
        type: 'table',
        headers: ['New Year Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest New Year jewellery gift', 'Small or medium diamond studs', 'Cadenza S, Cadenza M'],
          ['New beginning gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ["New Year's Eve party gift", 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['New Year dinner gift', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['Modern everyday New Year gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist New Year gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Romantic New Year gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Luxury-feel New Year gift', 'Drops, butterfly earrings or polished studs', 'Orsola, Alidi Farfalla, Cadenza M'],
          ['Fresh-start jewellery gift', 'Butterfly earrings, studs or huggies', 'Farfalla, Cadenza S, Amadea'],
          ['New Year workwear gift', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['New Year ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['If unsure of her style', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery a Good New Year Gift?',
    content: [
      { type: 'paragraph', text: 'A good New Year jewellery gift should feel connected to the moment and still be useful after the celebration is over. New Year gifting often carries a fresh-start feeling. It can represent a new chapter, a personal milestone, a relationship moment, a celebration, a goal or simply the start of a more polished everyday style.' },
      { type: 'paragraph', text: 'Earrings work especially well because they are easier to gift than rings and can be worn immediately. A pair of hoops or bold earrings can finish a New Year\'s Eve outfit. Drop earrings can work for dinner or a formal celebration. Diamond studs can become everyday sparkle for the year ahead. Huggies can fit into a modern daily routine. Butterfly earrings can carry the strongest meaning because they naturally connect to transformation and new beginnings.' },
      {
        type: 'table',
        headers: ['What Makes It a Strong New Year Gift', 'Why It Matters'],
        rows: [
          ['Fresh-start meaning', 'New Year gifts often connect to change and new beginnings'],
          ['Wearable after New Year', 'The gift should not only work for one party'],
          ['Easy to size', 'Earrings are easier to gift than rings'],
          ['Party and everyday flexibility', 'The best gifts can work for celebrations and future outfits'],
          ['Personal style match', 'The gift should feel chosen for her'],
          ['Metal colour match', 'Helps the earrings fit her existing jewellery'],
          ['Comfort', 'Makes the piece easier to wear often'],
          ['Rewear value', 'Gives the gift long-term usefulness'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Safest New Year Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest New Year jewellery gifts are diamond studs, huggies and minimalist earrings. These pieces feel special enough for gifting but are still wearable after New Year\'s Eve.' },
      { type: 'paragraph', text: 'Cadenza S is the safest subtle gift because it is small, clean and easy to wear. Cadenza M is better when the gift should feel more polished. Amadea is ideal for someone who likes modern everyday jewellery. Laluce works well if she prefers understated styling.' },
      {
        type: 'table',
        headers: ['Safe New Year Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'Safest subtle New Year gift', 'Cadenza S'],
          ['Medium diamond studs', 'Classic New Year sparkle', 'Cadenza M'],
          ['Huggies', 'Modern everyday jewellery lover', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Practical New Year ear stack', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful fresh-start gift', 'Farfalla, Alidi Farfalla'],
          ['Short drops', 'Soft dinner or celebration gift', 'Concetta Short'],
          ['Drop earrings', 'Elegant New Year dinner gift', 'Orsola'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Meaningful New Year Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A meaningful New Year jewellery gift should feel connected to a fresh start. This can mean a new year, a new chapter, a personal change, a move, a new job, a graduation, a relationship milestone or simply a moment of encouragement.' },
      { type: 'paragraph', text: 'Butterfly earrings are one of the strongest meaningful New Year jewellery choices because a butterfly can symbolise growth, transformation, beauty, freedom and new beginnings. That symbolism naturally fits New Year gifting because the occasion is about stepping into what comes next.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-13.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful New Year Gift Idea', 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise transformation and new beginnings', 'Farfalla'],
              ['Sentimental butterfly earrings', 'Feel personal and keepsake-led', 'Alidi Farfalla'],
              ['Butterfly + small stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
              ['Small diamond studs', 'Safe daily sparkle for the year ahead', 'Cadenza S'],
              ['Medium diamond studs', 'Polished New Year sparkle', 'Cadenza M'],
              ['Drop earrings', 'Celebration dinner and evening styling', 'Orsola'],
              ['Huggies', 'Practical everyday gift for the new year', 'Amadea'],
              ['Minimalist earrings', 'Quiet fresh-start gift', 'Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'New Year Jewellery Gifts by Relationship',
    content: [
      { type: 'paragraph', text: 'The relationship helps decide whether the New Year gift should feel romantic, practical, meaningful, stylish or safe.' },
      { type: 'paragraph', text: 'For a girlfriend or wife, butterfly earrings, drops and classic studs can feel romantic. For mum, classic studs, elegant drops or meaningful butterfly earrings are safest. For a sister or best friend, huggies, hoops, studs and butterfly earrings can feel stylish and personal. For a daughter, small studs, huggies or butterfly earrings work well.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best New Year Jewellery Direction', 'Product Direction'],
        rows: [
          ['Girlfriend', 'Butterfly earrings, huggies, drops or studs', 'Farfalla, Amadea, Orsola, Cadenza M'],
          ['Wife', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Mum', 'Classic studs, huggies or elegant drops', 'Cadenza M, Amadea, Orsola'],
          ['Sister', 'Huggies, studs, hoops or butterfly earrings', 'Amadea, Cadenza M, Pave Hoops, Farfalla'],
          ['Daughter', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Best friend', 'Huggies, hoops, butterfly earrings or studs', 'Amadea, Pave Hoops, Farfalla, Cadenza S'],
          ['Partner', 'Butterfly earrings, drops or medium studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['If unsure', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts' },
    ],
  },
  {
    heading: 'New Year Jewellery Gifts for Girlfriend',
    content: [
      { type: 'paragraph', text: 'New Year jewellery for a girlfriend should feel thoughtful and appropriate for the relationship stage. If the relationship is newer, choose studs, huggies or minimalist earrings. If the relationship is more serious, butterfly earrings or drop earrings can feel more romantic.' },
      {
        type: 'table',
        headers: ['Girlfriend New Year Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe girlfriend New Year gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Romantic New Year gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['New Year dinner gift', 'Drop earrings', 'Orsola'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist gift', 'Minimalist earrings', 'Laluce'],
          ['Party-ready gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['First diamond-style New Year gift', 'Small studs', 'Cadenza S'],
          ['Fresh-start ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for girlfriend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-girlfriend' },
    ],
  },
  {
    heading: 'New Year Jewellery Gifts for Wife',
    content: [
      { type: 'paragraph', text: 'New Year jewellery for a wife can feel romantic, symbolic and polished. The gift can connect to the year ahead, the relationship, a shared celebration or simply a thoughtful new piece she can wear often.' },
      { type: 'paragraph', text: 'Butterfly earrings are strong for meaning. Drop earrings are ideal for New Year dinners and date nights. Diamond studs are safest for classic style. Huggies and minimalist earrings work well if she prefers everyday jewellery.' },
      {
        type: 'table',
        headers: ['Wife New Year Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Romantic New Year gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Classic New Year gift', 'Medium studs', 'Cadenza M'],
          ['New Year dinner gift', 'Drop earrings', 'Orsola'],
          ['Luxury-feel New Year gift', 'Long drops or classic studs', 'Concetta Long, Cadenza M'],
          ['Everyday New Year gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Minimalist New Year gift', 'Minimalist earrings', 'Laluce'],
          ['Soft fresh-start gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['New Year ear stack gift', 'Butterfly + stud or drop + stud', 'Farfalla + Cadenza S, Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for wife', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-wife' },
    ],
  },
  {
    heading: 'New Year Jewellery Gifts for Mum',
    content: [
      { type: 'paragraph', text: 'New Year jewellery for mum should feel thoughtful, elegant and comfortable. Classic studs are usually safest. Huggies work for modern daily wear. Butterfly earrings feel meaningful. Drops are ideal for New Year dinners, family celebrations and dressy winter outfits.' },
      {
        type: 'table',
        headers: ['Mum New Year Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe New Year gift for mum', 'Medium studs', 'Cadenza M'],
          ['Subtle New Year gift', 'Small studs', 'Cadenza S'],
          ['Meaningful New Year gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Elegant New Year dinner gift', 'Drop earrings', 'Orsola'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist gift', 'Minimalist earrings', 'Laluce'],
          ['Formal New Year gift', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Mum New Year ear stack', 'Stud + huggie', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for mum', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-mum' },
    ],
  },
  {
    heading: 'New Year Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'New Year jewellery for a sister should feel stylish, useful and matched to her personality. Huggies, hoops, studs and butterfly earrings are strong sister gift directions. Drops work if she enjoys dinners and occasion outfits.' },
      {
        type: 'table',
        headers: ['Sister New Year Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe New Year gift', 'Medium studs', 'Cadenza M'],
          ['Subtle New Year gift', 'Small studs', 'Cadenza S'],
          ['Meaningful New Year gift', 'Butterfly earrings', 'Farfalla'],
          ['Modern New Year gift', 'Huggies', 'Amadea'],
          ['Party New Year gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Minimalist New Year gift', 'Minimalist earrings', 'Laluce'],
          ['New Year dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Sister ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for sister', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-sister' },
    ],
  },
  {
    heading: 'New Year Jewellery Gifts for Daughter',
    content: [
      { type: 'paragraph', text: 'New Year jewellery for a daughter should match her age, style and lifestyle. For a first diamond-style New Year gift, small studs are safest. For meaning, butterfly earrings are strong. For modern daily wear, choose huggies or hoops.' },
      {
        type: 'table',
        headers: ['Daughter New Year Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['First diamond-style New Year gift', 'Small studs', 'Cadenza S'],
          ['More polished New Year gift', 'Medium studs', 'Cadenza M'],
          ['Meaningful New Year gift', 'Butterfly earrings', 'Farfalla'],
          ['Modern New Year gift', 'Huggies', 'Amadea'],
          ['Minimalist New Year gift', 'Minimalist earrings', 'Laluce'],
          ['Party New Year gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['New Year dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Daughter ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for daughter', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-daughter' },
    ],
  },
  {
    heading: 'New Year Jewellery Gifts for Best Friend',
    content: [
      { type: 'paragraph', text: 'New Year jewellery for a best friend should feel stylish and personal without becoming too formal or romantic. Huggies, hoops, studs and butterfly earrings are strong choices. Drops work if she likes dinners and occasion styling.' },
      {
        type: 'table',
        headers: ['Best Friend New Year Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe New Year gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Meaningful friendship gift', 'Butterfly earrings', 'Farfalla'],
          ['Modern New Year gift', 'Huggies', 'Amadea'],
          ['Party-ready New Year gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Minimalist New Year gift', 'Minimalist earrings', 'Laluce'],
          ['New Year dinner gift', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Stylish fresh-start gift', 'Hoops, huggies or butterfly earrings', 'Pave Hoops, Amadea, Farfalla'],
          ['Best friend ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for best friend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-best-friend' },
    ],
  },
  {
    heading: "New Year's Eve Party Jewellery Gifts",
    content: [
      { type: 'paragraph', text: "New Year's Eve party jewellery can be more visible than everyday jewellery, especially if the recipient likes black dresses, satin outfits, metallic looks, jumpsuits, velvet, sequins or bold styling." },
      { type: 'paragraph', text: 'Pave Hoops are strong for a modern party gift. Lusso works if she loves bold statement jewellery. Orsola is better for elegant party styling. Cadenza M is safer when her style is unknown.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-15.jpg',
        content: [
          {
            type: 'table',
            headers: ['New Year Party Gift Need', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Modern New Year party gift', 'Hoops', 'Pave Hoops'],
              ['Bold New Year party gift', 'Bold statement earrings', 'Lusso'],
              ['Elegant New Year party gift', 'Drop earrings', 'Orsola'],
              ['Safe party sparkle', 'Medium studs', 'Cadenza M'],
              ['Black dress New Year party', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Metallic outfit', 'Hoops, drops or studs', 'Pave Hoops, Orsola, Cadenza M'],
              ['Soft party look', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['If unsure', 'Medium studs', 'Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },
  {
    heading: 'New Year Dinner Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'New Year dinner gifts are strong because the jewellery can be worn immediately. If the gift is being opened before dinner, a family celebration, a date night or an elegant evening plan, drop earrings and polished studs are especially useful.' },
      { type: 'paragraph', text: 'Orsola is the strongest New Year dinner direction because it adds movement and elegance. Cadenza M is safest for classic sparkle. Concetta Short works for soft outfits, while Concetta Long works for more formal winter dinners.' },
      {
        type: 'table',
        headers: ['New Year Dinner Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Best New Year dinner earrings', 'Drop earrings', 'Orsola'],
          ['Safe dinner sparkle', 'Medium studs', 'Cadenza M'],
          ['Soft dinner outfit', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Formal New Year dinner', 'Long drops', 'Concetta Long'],
          ['Black dinner dress', 'Drops or studs', 'Orsola, Cadenza M'],
          ['Satin dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Champagne dinner outfit', 'Short drops, drops or studs', 'Concetta Short, Orsola, Cadenza M'],
          ['New Year dinner ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Date night jewellery guide', href: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
    ],
  },
  {
    heading: 'Fresh-Start Everyday Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Not every New Year gift needs to be party-led. Some of the best New Year jewellery gifts are pieces she can wear regularly in the year ahead.' },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are the strongest everyday gift directions. Hoops work if she likes visible daily jewellery. Butterfly earrings can work if her everyday style is soft or meaningful. Drops can work if she often dresses up for dinners or events.' },
      {
        type: 'table',
        headers: ['Everyday New Year Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest everyday New Year gift', 'Small studs', 'Cadenza S'],
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
    heading: 'New Year Jewellery by Outfit',
    content: [
      { type: 'paragraph', text: 'New Year outfits often use black, satin, metallics, velvet, sequins, champagne tones, white, silver or bold evening colours. The jewellery should support the outfit and the mood of the celebration.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-17.jpg',
        content: [
          {
            type: 'table',
            headers: ['New Year Outfit', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Black dress', 'Drops, hoops, studs or bold earrings', 'Orsola, Pave Hoops, Cadenza M, Lusso'],
              ['Satin dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
              ['Metallic outfit', 'Hoops, studs or drops', 'Pave Hoops, Cadenza M, Orsola'],
              ['Sequin outfit', 'Studs or clean drops', 'Cadenza M, Orsola'],
              ['Velvet outfit', 'Drops, medium studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
              ['Champagne dress', 'Short drops, butterfly earrings or studs', 'Concetta Short, Farfalla, Cadenza M'],
              ['White outfit', 'Studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
              ['Red outfit', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Green outfit', 'Gold drops, studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
              ['Minimal outfit', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
              ['Jumpsuit', 'Hoops, drops or huggies', 'Pave Hoops, Orsola, Amadea'],
              ['Winter knit outfit', 'Studs or huggies', 'Cadenza S, Amadea'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },
  {
    heading: 'New Year Jewellery by Personal Style',
    content: [
      { type: 'paragraph', text: 'Personal style should guide the New Year gift more than the celebration alone. A minimalist person may not wear bold earrings even for New Year\'s Eve. A romantic person may love butterfly earrings. A modern dresser may prefer huggies or hoops. A classic dresser may prefer diamond studs.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-19.jpg',
        content: [
          {
            type: 'table',
            headers: ['Her Style', 'Best New Year Gift Direction', 'Product Direction'],
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
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'New Year Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the easiest ways to make a New Year gift feel right. The safest choice is the metal colour she already wears most often.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, celebratory and classic. White or silver tone feels bright, clean and New Year-ready. Rose gold feels soft, feminine and meaningful. Mixed metals can work for someone who likes modern ear stacks.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'New Year Gift Feeling', 'Best For'],
        rows: [
          ['Yellow gold', 'Warm, classic and celebratory', 'Black dresses, green outfits, champagne outfits, winter styling'],
          ['White or silver tone', 'Bright, clean and modern', 'Minimalist gifts, metallic outfits, cool-toned wardrobes'],
          ['Rose gold', 'Soft, feminine and sentimental', 'Butterfly earrings, blush outfits, meaningful gifts'],
          ['Mixed metals', 'Creative and personal', 'Ear stack lovers and modern styling'],
        ],
      },
      { type: 'paragraph', text: 'For New Year gifts, avoid choosing metal colour only because it looks festive. Match what she already wears first.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'New Year Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts are strong when she has multiple piercings or likes layered jewellery. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: 'The safest New Year stack is a small stud with a huggie. The most meaningful New Year stack is a butterfly earring with a small stud. The best New Year dinner stack is a drop earring with a small support stud. The best party stack is a hoop or bold earring with a small stud.' },
      {
        type: 'table',
        headers: ['New Year Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest New Year stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist New Year stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Meaningful New Year stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Sentimental New Year stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['New Year dinner stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft evening stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal New Year stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Modern New Year stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Party New Year stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by New Year Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest New Year Jewellery Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are classic, wearable and safe when you are unsure of her exact style.' },
      { type: 'subheading', text: 'For a Meaningful New Beginning Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. They are strong for New Year because butterfly symbolism connects naturally to growth, transformation and a fresh start.' },
      { type: 'subheading', text: 'For a Sentimental New Year Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They work well when the gift should feel emotional, personal and keepsake-led.' },
      { type: 'subheading', text: 'For a New Year Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for dinner, date nights and special evening outfits.' },
      { type: 'subheading', text: 'For a Modern Everyday New Year Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are close-fitting, wearable and useful for daily styling or ear stacks.' },
      { type: 'subheading', text: 'For a Minimalist New Year Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Soft Evening Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They are delicate and work well for champagne, blush, pastel, soft satin and feminine styling.' },
      { type: 'subheading', text: "For a New Year's Eve Party Gift" },
      { type: 'paragraph', text: 'Choose Pave Hoops if she likes modern visible jewellery. Choose Lusso bold statement earrings only if she loves standout party styling.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best New Year Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best safe subtle New Year gift', 'Small, classic and wearable'],
          ['Cadenza M diamond stud earrings', 'Best classic New Year sparkle', 'Polished, timeless and easy to style'],
          ['Farfalla butterfly earrings', 'Best meaningful fresh-start gift', 'Symbolic, soft and connected to growth'],
          ['Alidi Farfalla butterfly earrings', 'Best sentimental New Year gift', 'Strong for emotional new-chapter gifting'],
          ['Amadea Huggie earrings', 'Best modern everyday New Year gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated New Year gift', 'Quiet, clean and easy for minimal style'],
          ['Orsola drop earrings', 'Best New Year dinner gift', 'Elegant movement for evening outfits'],
          ['Concetta Short earrings', 'Best soft evening gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal New Year gift', 'Refined and polished for dressy occasions'],
          ['Pave Hoops', 'Best New Year party gift', 'Adds modern shape and sparkle'],
          ['Lusso bold statement earrings', 'Best bold New Year party gift', 'Strong only if she loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the New Year gift by her style and the year ahead. Pick Cadenza S for a safe subtle gift, Cadenza M for classic sparkle, Farfalla for meaning, Alidi Farfalla for sentimental gifting, Amadea for modern daily wear, Laluce for minimal style, Orsola for New Year dinners and Pave Hoops or Lusso for party styling.' },
    ],
  },
  {
    heading: 'Common New Year Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: "One common mistake is choosing jewellery that only works for New Year's Eve. A strong New Year jewellery gift should still make sense after the party is over." },
      { type: 'paragraph', text: 'Another mistake is choosing bold earrings when she usually wears simple jewellery. If her style is minimal, choose studs, huggies or minimalist earrings instead.' },
      { type: 'paragraph', text: 'A third mistake is buying jewellery only because it looks sparkly. Sparkle matters, but the better question is whether she will actually wear the piece with her real outfits.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the meaning of New Year. If the gift is meant to feel symbolic, butterfly earrings may be stronger than a generic party piece.' },
      { type: 'paragraph', text: 'A fifth mistake is choosing the wrong metal colour. If she mostly wears gold, choose gold. If she usually wears white or silver tone, choose that direction. If she likes soft romantic pieces, rose gold can work beautifully.' },
      { type: 'paragraph', text: 'Finally, do not forget care and storage. New Year jewellery should be easy to clean, store and protect from showering, swimming, sleeping and heavy product exposure.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final New Year Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing New Year jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is this a safe gift, romantic gift, meaningful gift, dinner gift or party gift?',
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          "Will she wear the earrings for New Year's Eve, dinner, work or everyday outfits?",
          'Should the gift feel symbolic, practical or both?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would diamond studs be safer?',
          'Can the earrings be worn after New Year?',
          'Will the jewellery work for winter outfits, dinners, travel or future occasions?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack feel more thoughtful?',
          'Are the earrings comfortable for long wear?',
          'Is the design easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza S or Cadenza M. If you want meaning, choose Farfalla. If the gift should feel romantic, choose Alidi Farfalla or Orsola. If she likes modern jewellery, choose Amadea or Pave Hoops. If the gift is for a New Year dinner, choose Orsola.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for a New Year gift?', answer: 'The best New Year jewellery is wearable, personal and matched to her style. Diamond studs, butterfly earrings, huggies, hoops, drop earrings and minimalist earrings can all work depending on the recipient.' },
  { question: 'Are earrings a good New Year gift?', answer: 'Yes, earrings are a good New Year gift because they feel personal, are easy to choose and can be worn after the celebration.' },
  { question: 'Are lab-grown diamond earrings good New Year gifts?', answer: 'Yes, lab-grown diamond earrings are strong New Year gifts because they feel special while still being wearable for everyday outfits, dinners, parties and future occasions.' },
  { question: 'What are the safest earrings to gift for New Year?', answer: 'Diamond studs are the safest New Year earrings because they are classic, simple and easy to wear with many outfits.' },
  { question: 'Are butterfly earrings a meaningful New Year gift?', answer: 'Yes, butterfly earrings can be meaningful New Year gifts because they can symbolise growth, transformation, beauty and new beginnings.' },
  { question: 'What jewellery should I buy my girlfriend for New Year?', answer: 'For a girlfriend, choose diamond studs for a safe gift, butterfly earrings for meaning, drop earrings for date nights, huggies for everyday wear or hoops if she likes modern styling.' },
  { question: 'What jewellery should I buy my wife for New Year?', answer: 'For a wife, butterfly earrings, drop earrings and classic diamond studs are strong New Year choices depending on whether her style is romantic, elegant or classic.' },
  { question: "What earrings are best for New Year's Eve?", answer: "Hoops, drop earrings, bold earrings and polished studs are strong New Year's Eve choices depending on the outfit and personal style." },
  { question: 'What jewellery should I buy as a fresh-start gift?', answer: 'Butterfly earrings, small diamond studs and huggies are strong fresh-start gifts because they feel meaningful, wearable and suitable for the year ahead.' },
  { question: 'What IWantJewels earrings are best for New Year gifts?', answer: 'Cadenza S, Cadenza M, Farfalla, Alidi Farfalla, Amadea, Laluce, Orsola, Concetta Short, Concetta Long, Pave Hoops and Lusso are strong New Year gift options depending on her style and the occasion.' },
]

const cta: V2CTABlock = {
  heading: 'New Year jewellery should feel special in the moment and wearable for the year ahead. Choose diamond studs for safe sparkle, butterfly earrings for meaning, huggies for modern everyday wear, minimalist earrings for quiet style, hoops for visible shape, drops for dinners and bold earrings only if she loves standout styling.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a New Year gift with real diamond sparkle. Choose Cadenza S for a safe subtle gift, Cadenza M for classic polish, Farfalla for meaning, Alidi Farfalla for sentimental gifting, Amadea for huggies, Laluce for minimalist style, Orsola for New Year dinners and Pave Hoops or Lusso for party styling.',
  primaryLabel: 'Shop New Year Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Christmas Jewellery Gifts Guide',
  tertiaryHref: '/resources/occasion-jewellery-guides/christmas-jewellery-gifts',
}

export default function Page() {
  const category = getCategoryBySlug('occasion-jewellery-guides')
  const article = getArticleBySlug('occasion-jewellery-guides', 'new-year-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('occasion-jewellery-guides', 'new-year-jewellery-gifts', 3)
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
