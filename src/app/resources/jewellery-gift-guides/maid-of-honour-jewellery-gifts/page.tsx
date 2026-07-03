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
  title: 'Maid of Honour Jewellery Gifts',
  description:
    'Choose maid of honour jewellery gifts with lab grown diamond earrings, studs, drops, huggies, butterfly earrings and wedding-ready gift ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-23.jpg',
  title: 'Maid of Honour Jewellery Gifts:',
  subtitle: 'Meaningful Earrings for the Wedding Day and After',
  paragraphs: [
    'A maid of honour jewellery gift should feel more personal than a general bridesmaid gift. She is usually the sister, best friend or closest person standing beside the bride, so the gift should carry appreciation, meaning and strong rewear value.',
    'The best maid of honour earrings should look beautiful on the wedding day and still feel useful after it. They should work for the ceremony, photos, reception, dinners, date nights, wedding guest outfits and everyday styling. Small studs are the safest choice. Drop earrings feel more elegant and occasion-ready. Butterfly earrings are strong when the gift should feel meaningful. Huggies are ideal for a modern maid of honour. Minimalist earrings work well for clean, understated style.',
    'At IWantJewels, Alidi Farfalla butterfly earrings, Farfalla butterfly earrings, Orsola drop earrings, Concetta Short earrings, Concetta Long earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Amadea Huggie earrings, Laluce minimalist diamond earrings and Pave Hoops all work for different maid of honour gift needs. Lusso can work only if the maid of honour loves bold styling and the wedding look is intentionally fashion-led.',
  ],
  shopLabel: 'Shop Maid of Honour Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery gifts for your maid of honour.',
    'Pick earrings she can wear on the wedding day and after.',
    'Decide between butterfly earrings, drops, studs, huggies, hoops and minimalist earrings.',
    'Choose a maid of honour proposal gift or thank-you gift.',
    'Match earrings to her dress colour, neckline and hairstyle.',
    'Choose jewellery based on whether she is your sister, best friend or close family member.',
    'Find meaningful maid of honour jewellery with symbolism.',
    'Build maid of honour ear stack gift ideas.',
  ],
  image: '/blog-images/blog-image-24.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Maid of Honour Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Maid of Honour Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Most meaningful maid of honour gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Best wedding-day elegant gift', 'Drop earrings', 'Orsola'],
          ['Safest maid of honour gift', 'Medium diamond studs', 'Cadenza M'],
          ['Subtle maid of honour gift', 'Small diamond studs', 'Cadenza S'],
          ['Modern maid of honour gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist maid of honour gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Maid of honour proposal gift', 'Butterfly earrings, studs or huggies', 'Farfalla, Cadenza S, Amadea'],
          ['Maid of honour thank-you gift', 'Drops, butterfly earrings or polished studs', 'Orsola, Alidi Farfalla, Cadenza M'],
          ['Sister maid of honour gift', 'Butterfly earrings, drops or studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Best friend maid of honour gift', 'Butterfly earrings, huggies or drops', 'Farfalla, Amadea, Orsola'],
          ['Formal wedding gift', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Soft romantic wedding gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Maid of honour ear stack', 'Butterfly + stud or drop + stud', 'Farfalla + Cadenza S, Orsola + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery a Good Maid of Honour Gift?',
    content: [
      { type: 'paragraph', text: 'A good maid of honour jewellery gift should feel personal, elevated and wearable. It should recognise that she is not just part of the bridal party — she is the person helping, supporting and standing closest to the bride.' },
      { type: 'paragraph', text: 'This is why the maid of honour gift can be slightly more special than the bridesmaid gifts. If bridesmaids receive small studs, the maid of honour can receive drop earrings, butterfly earrings or polished medium studs. If the bridal party receives huggies, the maid of honour can receive a meaningful butterfly pair or a two-piece ear stack.' },
      {
        type: 'table',
        headers: ['What Makes It a Strong Maid of Honour Gift', 'Why It Matters'],
        rows: [
          ['Personal meaning', 'The maid of honour role is emotional and important'],
          ['Wedding-day use', 'The gift can be worn during the ceremony or reception'],
          ['Rewear value', 'She should be able to use it after the wedding'],
          ['Slightly elevated feel', 'Maid of honour gifts can be more special than bridesmaid gifts'],
          ['Comfort', 'She will wear the earrings for many hours'],
          ['Dress and hairstyle match', 'Earrings should look good in wedding photos'],
          ['Metal colour consistency', 'Helps the wedding party look polished'],
          ['Gift-box presentation', 'Makes proposal boxes and thank-you gifts stronger'],
        ],
      },
      { type: 'see-also', text: 'Bridesmaid jewellery gifts', href: '/resources/jewellery-gift-guides/bridesmaid-jewellery-gifts' },
    ],
  },
  {
    heading: 'Safest Maid of Honour Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest maid of honour jewellery gifts are diamond studs, huggies and delicate drops. These styles work with many dress colours, hairstyles and wedding themes.' },
      { type: 'paragraph', text: 'Cadenza M is the strongest safe maid of honour gift because it feels polished and more elevated than a small everyday stud. Cadenza S is better when she prefers subtle jewellery or when the gift is part of a proposal box. Amadea works well for a modern maid of honour. Concetta Short is ideal for soft bridesmaid dresses and delicate wedding styling.' },
      {
        type: 'table',
        headers: ['Safe Maid of Honour Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Medium diamond studs', 'Safe polished gift', 'Cadenza M'],
          ['Small diamond studs', 'Subtle proposal gift', 'Cadenza S'],
          ['Huggies', 'Modern wedding-day and everyday gift', 'Amadea'],
          ['Minimalist earrings', 'Clean understated style', 'Laluce'],
          ['Short drops', 'Soft wedding-day styling', 'Concetta Short'],
          ['Drop earrings', 'Elegant ceremony and reception styling', 'Orsola'],
          ['Butterfly earrings', 'Meaningful gift if she likes symbolism', 'Farfalla, Alidi Farfalla'],
          ['Stud + huggie set', 'Wearable ear stack gift', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Meaningful Maid of Honour Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A maid of honour gift often carries more emotion than a normal party gift. It can represent friendship, sisterhood, support, shared memories, trust and appreciation.' },
      { type: 'paragraph', text: 'Butterfly earrings are especially strong for meaningful maid of honour gifts because a butterfly can symbolise growth, transformation, beauty and new beginnings. For a wedding, that meaning can connect to friendship, life changes and the bride\'s next chapter.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Maid of Honour Gift Idea', 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise growth and new beginnings', 'Farfalla'],
              ['Sentimental butterfly earrings', 'Feel more personal and elevated', 'Alidi Farfalla'],
              ['Butterfly + small stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
              ['Drop earrings', 'Elegant gift she can wear on the wedding day', 'Orsola'],
              ['Medium diamond studs', 'Classic thank-you gift', 'Cadenza M'],
              ['Huggies', 'Practical gift she can wear often', 'Amadea'],
              ['Minimalist earrings', 'Quiet and personal', 'Laluce'],
              ['Long drops', 'Formal milestone-style maid of honour gift', 'Concetta Long'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Maid of Honour Proposal Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A maid of honour proposal gift should feel special but not too difficult to wear. It should look beautiful in the proposal box and still be useful after the wedding.' },
      { type: 'paragraph', text: 'Small studs, huggies and butterfly earrings are the strongest proposal-box directions. Cadenza S is safest. Amadea feels modern. Farfalla feels meaningful. Alidi Farfalla works when the proposal gift should feel more emotional and elevated.' },
      {
        type: 'table',
        headers: ['Proposal Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest proposal box gift', 'Small studs', 'Cadenza S'],
          ['Modern proposal gift', 'Huggies', 'Amadea'],
          ['Meaningful proposal gift', 'Butterfly earrings', 'Farfalla'],
          ['Elevated proposal gift', 'Butterfly earrings or medium studs', 'Alidi Farfalla, Cadenza M'],
          ['Minimal proposal gift', 'Minimalist earrings', 'Laluce'],
          ['Soft wedding proposal gift', 'Short drops', 'Concetta Short'],
          ['Proposal ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['If unsure', 'Small diamond studs', 'Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for best friend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-best-friend' },
    ],
  },
  {
    heading: 'Maid of Honour Thank-You Gifts',
    content: [
      { type: 'paragraph', text: 'A maid of honour thank-you gift can be more elevated than a proposal gift because it recognises the time, support and effort she gave during the wedding.' },
      { type: 'paragraph', text: 'Orsola drop earrings are strong for a wedding-day or reception-ready thank-you gift. Alidi Farfalla works when the gift should feel more sentimental. Cadenza M is safest if she prefers classic jewellery. Concetta Long works for a more formal, milestone-style gift.' },
      {
        type: 'table',
        headers: ['Thank-You Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Elegant thank-you gift', 'Drop earrings', 'Orsola'],
          ['Sentimental thank-you gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Safe classic thank-you gift', 'Medium studs', 'Cadenza M'],
          ['Soft thank-you gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Modern thank-you gift', 'Huggies', 'Amadea'],
          ['Minimal thank-you gift', 'Minimalist earrings', 'Laluce'],
          ['Formal thank-you gift', 'Long drops', 'Concetta Long'],
          ['Thank-you ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for sister', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-sister' },
    ],
  },
  {
    heading: 'Maid of Honour Earrings by Relationship',
    content: [
      { type: 'paragraph', text: 'The best gift changes depending on whether the maid of honour is your sister, best friend, cousin, daughter or close family member.' },
      { type: 'paragraph', text: 'If she is your sister, butterfly earrings or polished drops can feel meaningful. If she is your best friend, huggies, butterfly earrings or drops can feel personal without being too formal. If she prefers classic jewellery, studs are safest.' },
      {
        type: 'table',
        headers: ['Maid of Honour Relationship', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Sister', 'Butterfly earrings, drops or medium studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Best friend', 'Butterfly earrings, huggies or drops', 'Farfalla, Amadea, Orsola'],
          ['Cousin', 'Studs, huggies or short drops', 'Cadenza M, Amadea, Concetta Short'],
          ['Daughter', 'Small studs, butterfly earrings or huggies', 'Cadenza S, Farfalla, Amadea'],
          ['Sister-in-law', 'Medium studs, huggies or delicate drops', 'Cadenza M, Amadea, Concetta Short'],
          ['Childhood friend', 'Butterfly earrings or huggies', 'Farfalla, Amadea'],
          ['Modern friend', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['If unsure', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Maid of Honour Earrings by Dress Colour',
    content: [
      { type: 'paragraph', text: 'The maid of honour may wear the same colour as the bridesmaids, a slightly different shade or a more elevated dress. The jewellery should complement the dress without overpowering it.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-95.jpg',
        content: [
          {
            type: 'table',
            headers: ['Maid of Honour Dress Colour', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Blush', 'Butterfly earrings, short drops or studs', 'Farfalla, Concetta Short, Cadenza M'],
              ['Champagne', 'Short drops, drops or butterfly earrings', 'Concetta Short, Orsola, Farfalla'],
              ['Sage green', 'Studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
              ['Emerald green', 'Gold drops, medium studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
              ['Navy', 'Medium studs, huggies or refined drops', 'Cadenza M, Amadea, Orsola'],
              ['Burgundy', 'Drops, long drops or medium studs', 'Orsola, Concetta Long, Cadenza M'],
              ['Black', 'Drops, studs, hoops or bold earrings if fashion-led', 'Orsola, Cadenza M, Pave Hoops, Lusso'],
              ['Dusty blue', 'Studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
              ['Silver or grey', 'White/silver tone studs or minimalist earrings', 'Cadenza S, Cadenza M, Laluce'],
              ['Pastel', 'Butterfly earrings, short drops or small studs', 'Farfalla, Concetta Short, Cadenza S'],
              ['Satin dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Floral dress', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery with satin dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },
  {
    heading: 'Maid of Honour Earrings by Neckline',
    content: [
      { type: 'paragraph', text: 'The neckline helps decide whether the maid of honour earrings should be simple, soft, long or more visible.' },
      {
        type: 'table',
        headers: ['Dress Neckline', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['V-neck', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Sweetheart neckline', 'Butterfly earrings, short drops or studs', 'Farfalla, Concetta Short, Cadenza M'],
          ['Off-shoulder dress', 'Drops, studs or huggies', 'Orsola, Cadenza M, Amadea'],
          ['Strapless dress', 'Drops, polished studs or bold earrings if simple', 'Orsola, Cadenza M, Lusso'],
          ['Square neckline', 'Studs, huggies or short drops', 'Cadenza S, Amadea, Concetta Short'],
          ['High-neck dress', 'Studs, huggies or hoops', 'Cadenza M, Amadea, Pave Hoops'],
          ['Halter dress', 'Studs or slim long drops', 'Cadenza M, Concetta Long'],
          ['Cowl neck', 'Studs or soft drops', 'Cadenza M, Orsola'],
          ['One-shoulder dress', 'Studs or clean drops', 'Cadenza M, Orsola'],
          ['Detailed neckline', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for sweetheart neckline', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },
    ],
  },
  {
    heading: 'Maid of Honour Earrings by Hairstyle',
    content: [
      { type: 'paragraph', text: 'The maid of honour is often highly visible in wedding photos, speeches and getting-ready moments, so the earrings should show enough without distracting from the bride.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-97.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Hair down', 'Medium studs, huggies or drops', 'Cadenza M, Amadea, Orsola'],
              ['Soft waves', 'Butterfly earrings, short drops or medium studs', 'Farfalla, Concetta Short, Cadenza M'],
              ['Half-up hair', 'Studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
              ['Low bun', 'Drops, butterfly earrings or long drops', 'Orsola, Farfalla, Concetta Long'],
              ['Sleek bun', 'Drops, studs or huggies', 'Orsola, Cadenza M, Amadea'],
              ['Ponytail', 'Huggies, drops, hoops or studs', 'Amadea, Orsola, Pave Hoops, Cadenza M'],
              ['Short hair', 'Studs, huggies, drops or hoops', 'Cadenza S, Amadea, Orsola, Pave Hoops'],
              ['Braided style', 'Studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
            ],
          },
        ],
      },
    ],
  },
  {
    heading: 'Drop Earrings for Maid of Honour Styling',
    content: [
      { type: 'paragraph', text: 'Drop earrings are one of the best maid of honour jewellery gifts because they feel more elevated than everyday studs but still wearable after the wedding.' },
      { type: 'paragraph', text: 'Orsola is the strongest all-round drop earring recommendation. It works for satin dresses, black dresses, champagne dresses, formal wedding looks and reception styling. Concetta Short is better for soft, delicate wedding styling. Concetta Long is best for black-tie weddings and formal maid of honour looks.' },
      {
        type: 'table',
        headers: ['Drop Earring Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Best all-round maid of honour drop', 'Drop earrings', 'Orsola'],
          ['Soft dress styling', 'Short drops', 'Concetta Short'],
          ['Formal wedding look', 'Long drops', 'Concetta Long'],
          ['Satin maid of honour dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Black maid of honour dress', 'Drops, medium studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
          ['Champagne dress', 'Short drops or drops', 'Concetta Short, Orsola'],
          ['Maid of honour thank-you gift', 'Drops', 'Orsola'],
          ['Drop ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Butterfly Earrings for Meaningful Maid of Honour Gifts',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings work beautifully for a maid of honour gift when the gift should feel personal, symbolic and emotional.' },
      { type: 'paragraph', text: 'They are especially strong when the maid of honour is a sister, best friend or someone who has supported the bride through many life stages. The butterfly meaning connects naturally to friendship, growth, change and a new chapter.' },
      {
        type: 'table',
        headers: ['Butterfly Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Most meaningful maid of honour gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Soft symbolic gift', 'Butterfly earrings', 'Farfalla'],
          ['Sister maid of honour gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Best friend maid of honour gift', 'Butterfly earrings', 'Farfalla'],
          ['Proposal box gift', 'Butterfly earrings', 'Farfalla'],
          ['Thank-you gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Butterfly ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['If she prefers classic jewellery', 'Studs instead', 'Cadenza M, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for best friend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-best-friend' },
    ],
  },
  {
    heading: 'Stud Earrings for Classic Maid of Honour Gifts',
    content: [
      { type: 'paragraph', text: 'Stud earrings are the safest maid of honour gift when you want something classic, polished and easy to wear after the wedding.' },
      { type: 'paragraph', text: 'Cadenza M is the strongest classic choice because it feels more elevated than a small stud. Cadenza S is better if she prefers subtle jewellery or if the gift is part of a proposal box. Studs also work well when the maid of honour dress has a high neckline, detailed neckline or strong embellishment.' },
      {
        type: 'table',
        headers: ['Stud Gift Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Safe classic gift', 'Cadenza M', 'Polished and timeless'],
          ['Subtle proposal gift', 'Cadenza S', 'Easy to package and rewear'],
          ['High-neck dress', 'Cadenza M or Cadenza S', 'Keeps styling clean'],
          ['Detailed dress', 'Cadenza S or Cadenza M', 'Avoids overdoing the look'],
          ['Wedding day + after', 'Cadenza M', 'Strong rewear value'],
          ['Ear stack support', 'Cadenza S', 'Works with drops, huggies and butterfly earrings'],
          ['If unsure', 'Cadenza M', 'Safest elevated direction'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Huggies and Minimalist Earrings for Modern Maid of Honour Gifts',
    content: [
      { type: 'paragraph', text: 'Huggies and minimalist earrings are ideal for a maid of honour who likes clean, modern and wearable jewellery.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are strong because they can be worn on the wedding day and after. Laluce minimalist diamond earrings are better when the gift should feel quieter and understated. Cadenza S pairs well with both for a giftable ear stack.' },
      {
        type: 'table',
        headers: ['Modern Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern maid of honour gift', 'Huggies', 'Amadea'],
          ['Minimal maid of honour gift', 'Minimalist earrings', 'Laluce'],
          ['Everyday rewear gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Proposal box gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Minimal ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Clean wedding styling', 'Minimalist earrings or studs', 'Laluce, Cadenza S'],
          ['If huggies feel too modern', 'Medium studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Minimalist jewellery styling guide', href: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },
    ],
  },
  {
    heading: 'Maid of Honour Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour should match both the wedding palette and her usual jewellery. If the earrings will be worn on the wedding day, choose a metal tone that works with the dress and bridal party styling. If the gift is more personal, choose the metal colour she already wears.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-99.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Maid of Honour Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, romantic and classic', 'Champagne, blush, green, burgundy, black and cream dresses'],
              ['White or silver tone', 'Clean, bright and timeless', 'Navy, silver, grey, dusty blue, black and cool-toned dresses'],
              ['Rose gold', 'Soft, feminine and sentimental', 'Blush, pink, champagne, floral and pastel dresses'],
              ['Mixed metals', 'Personal and modern', 'Ear stack lovers and trend-led styling'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For maid of honour gifts, yellow gold is strong for warm wedding palettes, white or silver tone is strong for cool palettes, and rose gold is strong for soft romantic styling.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Maid of Honour Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'A maid of honour ear stack can feel more thoughtful than a single pair when she has multiple piercings or likes layered jewellery.' },
      { type: 'paragraph', text: 'The most meaningful stack is a butterfly earring with a small stud. The best wedding-day stack is a drop earring with a small support stud. The safest everyday stack is a small stud with a huggie.' },
      {
        type: 'table',
        headers: ['Maid of Honour Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Meaningful maid of honour stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Sentimental stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Wedding-day elegant stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft wedding stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal maid of honour stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Safe everyday stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimal stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Modern stack', 'Huggie', 'Small stud', 'Amadea + Cadenza S'],
          ['Hoop stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Maid of Honour Gift Need',
    content: [
      { type: 'subheading', text: 'For the Most Meaningful Maid of Honour Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They are strongest when the gift should feel personal, symbolic and more elevated than a standard bridesmaid gift.' },
      { type: 'subheading', text: 'For a Soft Symbolic Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. They work well for sisters, best friends, proposal gifts and meaningful wedding thank-you gifts.' },
      { type: 'subheading', text: 'For an Elegant Wedding-Day Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and polish for the ceremony, reception and future occasion outfits.' },
      { type: 'subheading', text: 'For the Safest Classic Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They are polished, timeless and easy to wear with many outfits after the wedding.' },
      { type: 'subheading', text: 'For a Proposal Box Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Amadea Huggie earrings. They are easy to gift, wearable and suitable for many styles.' },
      { type: 'subheading', text: 'For a Minimalist Maid of Honour Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for a clean wedding style or a maid of honour who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Soft Dress or Romantic Wedding' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They work beautifully with blush, champagne, pastel, floral and soft satin dresses.' },
      { type: 'subheading', text: 'For a Formal Maid of Honour Gift' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings or Cadenza M. Concetta Long works for black-tie and formal weddings, while Cadenza M is safer and more universal.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Maid of Honour Gift Role', 'Why It Works'],
        rows: [
          ['Alidi Farfalla butterfly earrings', 'Best meaningful maid of honour gift', 'Personal, symbolic and elevated'],
          ['Farfalla butterfly earrings', 'Best soft symbolic gift', 'Strong for sisters, best friends and proposal boxes'],
          ['Orsola drop earrings', 'Best wedding-day elegant gift', 'Adds movement and polish'],
          ['Concetta Short earrings', 'Best soft dress gift', 'Delicate and feminine for romantic weddings'],
          ['Concetta Long earrings', 'Best formal gift', 'Refined for black-tie and formal weddings'],
          ['Cadenza M diamond stud earrings', 'Best safe classic gift', 'Polished, timeless and wearable'],
          ['Cadenza S lab-grown diamond studs', 'Best proposal box gift', 'Small, subtle and easy to rewear'],
          ['Amadea Huggie earrings', 'Best modern maid of honour gift', 'Close-fitting, wearable and stack-friendly'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Clean and quiet for minimal style'],
          ['Pave Hoops', 'Best modern shape gift', 'Works for fashion-led wedding styling'],
          ['Lusso bold statement earrings', 'Best bold option only if she loves standout jewellery', 'Strong but less universal'],
        ],
      },
      { type: 'paragraph', text: 'Choose maid of honour jewellery that feels personal and wearable. Pick Alidi Farfalla for meaning, Orsola for wedding-day elegance, Cadenza M for safe classic sparkle, Cadenza S for proposal boxes, Amadea for modern huggies, Concetta Short for soft dresses and Concetta Long for formal weddings.' },
    ],
  },
  {
    heading: 'Common Maid of Honour Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is gifting the maid of honour the exact same jewellery as every bridesmaid when you want her role to feel more recognised. Matching is fine, but a small upgrade can make the gift feel more thoughtful.' },
      { type: 'paragraph', text: 'Another mistake is choosing jewellery that only works for the wedding day. A strong maid of honour gift should be wearable after the ceremony too.' },
      { type: 'paragraph', text: 'A third mistake is choosing earrings that compete with the dress. If her dress has a detailed neckline, sequins, heavy lace or strong embellishment, studs or huggies may look better than long earrings.' },
      { type: 'paragraph', text: 'Another mistake is ignoring hairstyle. If her hair is down, tiny earrings may not show in photos. If her hair is in a bun, drops or butterfly earrings can look beautiful.' },
      { type: 'paragraph', text: 'A fifth mistake is choosing the wrong metal colour. The earrings should either match the wedding palette or the metal tone she normally wears.' },
      { type: 'paragraph', text: 'Finally, do not forget comfort. The maid of honour will be moving, helping, posing for photos, giving speeches and staying active throughout the day. The earrings should feel secure and easy to wear.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Maid of Honour Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing maid of honour jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the gift for a proposal box, wedding day or thank-you moment?',
          'Is she your sister, best friend, cousin, daughter or close family member?',
          'Should her gift be slightly more elevated than the bridesmaid gifts?',
          'Will she wear the earrings on the wedding day?',
          'What colour is her dress?',
          'What neckline does her dress have?',
          'What hairstyle will she wear?',
          'Is the wedding classic, modern, romantic, garden, city, beach or black-tie?',
          'What metal colour best suits the wedding palette?',
          'What metal colour does she usually wear?',
          'Would butterfly earrings feel meaningful to her?',
          'Would drop earrings suit the wedding-day look?',
          'Would diamond studs be safer?',
          'Does she have multiple piercings for an ear stack gift?',
          'Can she wear the earrings after the wedding?',
          'Are the earrings comfortable for long wear?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza M for a safe elevated gift. Choose Alidi Farfalla for meaning, Orsola for wedding-day elegance, Cadenza S for proposal boxes and Amadea for a modern wearable gift.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for a maid of honour gift?', answer: 'The best maid of honour jewellery gift is personal, wearable and slightly elevated. Butterfly earrings, drop earrings, diamond studs, huggies and minimalist earrings can all work depending on her style and the wedding look.' },
  { question: 'Are earrings a good maid of honour gift?', answer: 'Yes, earrings are a strong maid of honour gift because they are easy to choose, easy to wear on the wedding day and useful after the wedding.' },
  { question: 'Should the maid of honour jewellery match the bridesmaids?', answer: 'It can match, but the maid of honour gift can also be slightly upgraded. For example, bridesmaids can wear small studs while the maid of honour receives drops, butterfly earrings or medium studs.' },
  { question: 'What earrings should I gift my maid of honour?', answer: 'Choose diamond studs for the safest gift, drop earrings for wedding-day elegance, butterfly earrings for meaning, huggies for modern style and minimalist earrings for understated style.' },
  { question: 'Are butterfly earrings good maid of honour gifts?', answer: 'Yes, butterfly earrings can be meaningful maid of honour gifts because they can symbolise growth, beauty, transformation and new beginnings.' },
  { question: 'What should I put in a maid of honour proposal box?', answer: 'Small studs, huggies or butterfly earrings work well in a maid of honour proposal box because they feel special and wearable.' },
  { question: 'What jewellery should I buy for my sister as maid of honour?', answer: 'For a sister maid of honour, butterfly earrings, drop earrings or polished diamond studs are strong choices because they feel personal and elevated.' },
  { question: 'What jewellery should I buy for my best friend as maid of honour?', answer: 'For a best friend maid of honour, butterfly earrings, huggies, drop earrings or diamond studs can work well depending on her style.' },
  { question: 'What metal colour is best for maid of honour earrings?', answer: 'Choose the metal colour that matches the wedding palette or the metal tone she wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels soft and romantic.' },
  { question: 'What IWantJewels earrings are best for maid of honour gifts?', answer: 'Alidi Farfalla, Farfalla, Orsola, Concetta Short, Concetta Long, Cadenza M, Cadenza S, Amadea and Laluce are strong maid of honour gift options depending on her style and the wedding look.' },
]

const cta: V2CTABlock = {
  heading: 'Maid of honour jewellery should feel more personal than a standard bridesmaid gift. Choose butterfly earrings for meaning, drop earrings for wedding-day elegance, diamond studs for safe classic sparkle, huggies for modern wearability and minimalist earrings for clean understated style.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a maid of honour gift with real diamond sparkle. Choose Alidi Farfalla for meaning, Farfalla for symbolism, Orsola for elegant wedding-day movement, Cadenza M for polished classic sparkle, Cadenza S for proposal boxes, Amadea for huggies and Concetta Short for soft bridesmaid dresses.',
  primaryLabel: 'Shop Maid of Honour Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Bridesmaid Jewellery Gifts',
  secondaryHref: '/resources/jewellery-gift-guides/bridesmaid-jewellery-gifts',
  tertiaryLabel: 'Read the Bridesmaid Jewellery Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/bridesmaid-jewellery-gifts',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'maid-of-honour-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'maid-of-honour-jewellery-gifts', 3)
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
