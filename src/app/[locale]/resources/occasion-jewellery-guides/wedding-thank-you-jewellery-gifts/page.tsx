import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Wedding Thank-You Jewellery Gifts',
  description:
    'Choose wedding thank-you jewellery gifts with lab grown diamond earrings, studs, huggies, drops, butterfly earrings and elegant gift ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-5.jpg',
  title: 'Wedding Thank-You Jewellery Gifts:',
  subtitle: 'Earrings They Can Wear on the Day and After',
  paragraphs: [
    'Wedding thank-you jewellery should feel thoughtful, personal and wearable after the wedding is over. A good thank-you gift should not feel like a one-day accessory or something chosen only for the photos. It should feel like a genuine appreciation gift that the person can wear again for dinners, birthdays, holidays, wedding guest outfits, date nights, workwear and everyday styling.',
    'Earrings are one of the strongest wedding thank-you gifts because they are easy to choose, easy to package and easy to wear. Diamond studs are the safest option for almost everyone. Huggies are perfect for modern everyday jewellery lovers. Drop earrings feel more elegant for mothers, maid of honour and formal wedding roles. Butterfly earrings are ideal when the thank-you gift should feel meaningful and emotional. Minimalist earrings are best for someone who prefers understated jewellery.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Orsola drop earrings, Concetta Short earrings, Concetta Long earrings and Pave Hoops all work for different wedding thank-you gift needs. Lusso bold statement earrings can work only for someone who genuinely loves standout evening jewellery.',
  ],
  shopLabel: 'Shop Wedding Thank-You Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose wedding thank-you jewellery gifts.',
    'Pick earrings for bridesmaids, maid of honour, mothers, sisters, daughters, best friends and close family members.',
    'Choose thank-you gifts before the wedding, on the wedding morning or after the wedding.',
    'Decide between studs, huggies, butterfly earrings, drops, hoops and minimalist earrings.',
    'Match jewellery to each person\'s style and wedding role.',
    'Choose meaningful wedding appreciation gifts with symbolism.',
    'Build giftable thank-you ear stack ideas.',
    'Choose the right metal colour for the recipient.',
  ],
  image: '/blog-images/blog-image-7.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Wedding Thank-You Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Thank-You Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest wedding thank-you gift', 'Small or medium diamond studs', 'Cadenza S, Cadenza M'],
          ['Bridesmaid thank-you gift', 'Small studs, huggies or short drops', 'Cadenza S, Amadea, Concetta Short'],
          ['Maid of honour thank-you gift', 'Butterfly earrings, drops or polished studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Thank-you gift for mum', 'Classic studs, drops or butterfly earrings', 'Cadenza M, Orsola, Alidi Farfalla'],
          ['Thank-you gift for mother of groom', 'Classic studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
          ['Sister thank-you gift', 'Butterfly earrings, huggies or studs', 'Farfalla, Amadea, Cadenza M'],
          ['Best friend thank-you gift', 'Huggies, butterfly earrings or drops', 'Amadea, Farfalla, Orsola'],
          ['Meaningful thank-you gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Modern thank-you gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist thank-you gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Elegant wedding-day gift', 'Drop earrings', 'Orsola'],
          ['Formal thank-you gift', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Thank-you ear stack gift', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery a Good Wedding Thank-You Gift?',
    content: [
      { type: 'paragraph', text: 'A good wedding thank-you jewellery gift should feel appreciative and useful. It should recognise someone\'s support during the wedding without becoming a gift that only works for the wedding day.' },
      { type: 'paragraph', text: 'This is why earrings are so strong. They are easier to choose than rings, easier to package than many larger jewellery pieces and easier to wear again. A pair of studs can become everyday jewellery. A pair of huggies can fit into modern daily styling. A pair of drops can be worn for dinners and formal events. Butterfly earrings can carry a personal message.' },
      {
        type: 'table',
        headers: ['What Makes It a Strong Thank-You Gift', 'Why It Matters'],
        rows: [
          ['Personal appreciation', 'The gift should feel like a real thank-you'],
          ['Rewear value', 'The recipient should use it after the wedding'],
          ['Easy sizing', 'Earrings are simpler to gift than rings'],
          ['Role-appropriate', 'Bridesmaids, maid of honour and mothers may need different gift levels'],
          ['Meaning', 'Symbolic jewellery can feel more memorable'],
          ['Comfort', 'Wedding jewellery should be easy to wear for long hours'],
          ['Metal colour match', 'The gift should fit the recipient\'s usual jewellery'],
          ['Gift presentation', 'Jewellery works well in thank-you boxes and wedding morning gifts'],
        ],
      },
      { type: 'see-also', text: 'Wedding party jewellery gifts', href: '/resources/jewellery-gift-guides/wedding-party-jewellery-gifts' },
    ],
  },
  {
    heading: 'Safest Wedding Thank-You Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest wedding thank-you jewellery gifts are diamond studs, huggies and minimalist earrings. These pieces work for many recipients and do not require very specific styling preferences.' },
      { type: 'paragraph', text: 'Cadenza S is the safest small thank-you gift because it is subtle and easy to rewear. Cadenza M feels more polished and gift-worthy. Amadea works well for someone who likes modern everyday jewellery. Laluce is best for someone who prefers clean and understated styling.' },
      {
        type: 'table',
        headers: ['Safe Thank-You Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'Safest group thank-you gift', 'Cadenza S'],
          ['Medium diamond studs', 'Polished thank-you gift', 'Cadenza M'],
          ['Huggies', 'Modern everyday thank-you gift', 'Amadea'],
          ['Minimalist earrings', 'Understated thank-you gift', 'Laluce'],
          ['Stud + huggie set', 'Giftable everyday ear stack', 'Cadenza S + Amadea'],
          ['Short drops', 'Soft wedding thank-you gift', 'Concetta Short'],
          ['Drop earrings', 'Elegant thank-you gift', 'Orsola'],
          ['Butterfly earrings', 'Meaningful thank-you gift', 'Farfalla, Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Wedding Thank-You Gifts by Recipient',
    content: [
      { type: 'paragraph', text: 'The right thank-you gift depends on the person receiving it. A bridesmaid gift should usually be wearable and easy to repeat. A maid of honour gift can feel more elevated. A gift for mum can be more sentimental. A sister or best friend gift can feel personal and meaningful.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Bridesmaid', 'Small studs, huggies or short drops', 'Cadenza S, Amadea, Concetta Short'],
          ['Maid of honour', 'Butterfly earrings, drops or medium studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Mum', 'Classic studs, drops or meaningful earrings', 'Cadenza M, Orsola, Alidi Farfalla'],
          ['Mother of the groom', 'Classic studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
          ['Sister', 'Butterfly earrings, huggies or studs', 'Farfalla, Amadea, Cadenza M'],
          ['Best friend', 'Huggies, butterfly earrings or drops', 'Amadea, Farfalla, Orsola'],
          ['Daughter', 'Small studs, butterfly earrings or huggies', 'Cadenza S, Farfalla, Amadea'],
          ['Sister-in-law', 'Medium studs, huggies or delicate drops', 'Cadenza M, Amadea, Concetta Short'],
          ['Grandmother', 'Classic studs or elegant drops', 'Cadenza M, Orsola'],
          ['Mother figure', 'Butterfly earrings, studs or drops', 'Alidi Farfalla, Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for mum', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-mum' },
    ],
  },
  {
    heading: 'Thank-You Jewellery Gifts for Bridesmaids',
    content: [
      { type: 'paragraph', text: 'Bridesmaid thank-you jewellery should be easy to wear, easy to match and useful after the wedding. Small studs and huggies are the safest group gifts. Short drops work well if the bridesmaid dresses are soft, satin, pastel, champagne or romantic.' },
      {
        type: 'table',
        headers: ['Bridesmaid Thank-You Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest bridesmaid thank-you gift', 'Small studs', 'Cadenza S'],
          ['More polished bridesmaid gift', 'Medium studs', 'Cadenza M'],
          ['Modern bridesmaid thank-you gift', 'Huggies', 'Amadea'],
          ['Minimal bridesmaid gift', 'Minimalist earrings', 'Laluce'],
          ['Soft bridesmaid dress gift', 'Short drops', 'Concetta Short'],
          ['Meaningful bridesmaid gift', 'Butterfly earrings', 'Farfalla'],
          ['Bridesmaid ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['If bridesmaids have different styles', 'Small studs', 'Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Bridesmaid jewellery gifts', href: '/resources/jewellery-gift-guides/bridesmaid-jewellery-gifts' },
    ],
  },
  {
    heading: 'Thank-You Jewellery Gifts for Maid of Honour',
    content: [
      { type: 'paragraph', text: 'A maid of honour thank-you gift can be more personal and elevated than a standard bridesmaid gift. She has usually supported more of the planning, emotional work and wedding-day organisation, so the gift can carry more meaning.' },
      { type: 'paragraph', text: 'Alidi Farfalla is the strongest meaningful maid of honour thank-you gift. Orsola is best for wedding-day elegance. Cadenza M is safest if she prefers classic pieces. Concetta Long works for a formal gift.' },
      {
        type: 'table',
        headers: ['Maid of Honour Thank-You Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Most meaningful thank-you gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Soft symbolic gift', 'Butterfly earrings', 'Farfalla'],
          ['Elegant wedding-day thank-you gift', 'Drop earrings', 'Orsola'],
          ['Safe classic thank-you gift', 'Medium studs', 'Cadenza M'],
          ['Modern thank-you gift', 'Huggies', 'Amadea'],
          ['Minimal thank-you gift', 'Minimalist earrings', 'Laluce'],
          ['Formal thank-you gift', 'Long drops', 'Concetta Long'],
          ['Maid of honour ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Maid of honour jewellery gifts', href: '/resources/jewellery-gift-guides/maid-of-honour-jewellery-gifts' },
    ],
  },
  {
    heading: 'Thank-You Jewellery Gifts for Mum',
    content: [
      { type: 'paragraph', text: 'A wedding thank-you gift for mum should feel thoughtful, elegant and personal. It may be a wedding morning gift, a thank-you for support, or a keepsake she can wear on the day.' },
      { type: 'paragraph', text: 'Cadenza M is the safest classic gift. Orsola works beautifully if she enjoys elegant occasion outfits. Alidi Farfalla is strong if the gift should feel emotional and meaningful. Amadea or Laluce are better if she prefers modern everyday jewellery.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-9.jpg',
        content: [
          {
            type: 'table',
            headers: ['Mum Thank-You Need', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Safe classic thank-you gift', 'Medium studs', 'Cadenza M'],
              ['Subtle thank-you gift', 'Small studs', 'Cadenza S'],
              ['Elegant wedding-day gift', 'Drop earrings', 'Orsola'],
              ['Formal wedding gift', 'Long drops', 'Concetta Long'],
              ['Meaningful thank-you gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
              ['Modern everyday thank-you gift', 'Huggies', 'Amadea'],
              ['Minimal thank-you gift', 'Minimalist earrings', 'Laluce'],
              ['Soft dress gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Mother of the bride jewellery gifts', href: '/resources/occasion-jewellery-guides/mother-of-the-bride-jewellery-gifts' },
    ],
  },
  {
    heading: 'Thank-You Jewellery Gifts for Mother of the Groom',
    content: [
      { type: 'paragraph', text: 'A thank-you gift for the mother of the groom should feel respectful, elegant and wearable. It may be given by the couple, the groom or as a family appreciation gift.' },
      { type: 'paragraph', text: 'Classic studs and elegant drops are safest. Huggies work if she prefers modern jewellery. Butterfly earrings work if the gift should feel sentimental or connected to a new family chapter.' },
      {
        type: 'table',
        headers: ['Mother of Groom Thank-You Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe classic thank-you gift', 'Medium studs', 'Cadenza M'],
          ['Elegant wedding-day gift', 'Drop earrings', 'Orsola'],
          ['Formal gift', 'Long drops', 'Concetta Long'],
          ['Modern thank-you gift', 'Huggies', 'Amadea'],
          ['Minimal gift', 'Minimalist earrings', 'Laluce'],
          ['Meaningful family gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Subtle everyday gift', 'Small studs', 'Cadenza S'],
          ['If unsure', 'Medium studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Mother of the groom jewellery gifts', href: '/resources/occasion-jewellery-guides/mother-of-the-groom-jewellery-gifts' },
    ],
  },
  {
    heading: 'Thank-You Jewellery Gifts for Sister',
    content: [
      { type: 'paragraph', text: 'A sister thank-you gift can feel more personal than a general bridal party gift. If she helped with the wedding, stood beside you or supported the planning, jewellery with meaning can feel especially strong.' },
      { type: 'paragraph', text: 'Farfalla and Alidi Farfalla are strong if the gift should feel emotional. Amadea is best if she likes modern daily jewellery. Cadenza M is safest if she prefers classic sparkle. Orsola works if she enjoys dresses, dinners and occasion outfits.' },
      {
        type: 'table',
        headers: ['Sister Thank-You Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Meaningful sister thank-you gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Safe classic thank-you gift', 'Medium studs', 'Cadenza M'],
          ['Subtle thank-you gift', 'Small studs', 'Cadenza S'],
          ['Modern sister gift', 'Huggies', 'Amadea'],
          ['Minimal sister gift', 'Minimalist earrings', 'Laluce'],
          ['Wedding-day elegant gift', 'Drop earrings', 'Orsola'],
          ['Soft sister gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Sister ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for sister', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-sister' },
    ],
  },
  {
    heading: 'Thank-You Jewellery Gifts for Best Friend',
    content: [
      { type: 'paragraph', text: 'A best friend thank-you gift should feel stylish, personal and wearable without becoming too formal. Huggies, butterfly earrings, studs and drops are all strong depending on her style.' },
      { type: 'paragraph', text: 'Amadea is best for a modern best friend gift. Farfalla is strong for meaning. Orsola works if she likes elegant dinners and occasion outfits. Pave Hoops work if she likes visible modern jewellery.' },
      {
        type: 'table',
        headers: ['Best Friend Thank-You Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Modern thank-you gift', 'Huggies', 'Amadea'],
          ['Meaningful friendship gift', 'Butterfly earrings', 'Farfalla'],
          ['Safe classic gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Elegant thank-you gift', 'Drop earrings', 'Orsola'],
          ['Minimal gift', 'Minimalist earrings', 'Laluce'],
          ['Party-style gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Soft friendship gift', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Best friend ear stack', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for best friend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-best-friend' },
    ],
  },
  {
    heading: 'Meaningful Wedding Thank-You Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Meaningful wedding thank-you jewellery should carry emotion. It can represent appreciation, friendship, family support, shared memories, a new chapter or gratitude.' },
      { type: 'paragraph', text: 'Butterfly earrings are especially strong because a butterfly can symbolise growth, transformation, beauty and new beginnings. That meaning fits weddings naturally because the day marks a life transition and a new family chapter.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-11.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Thank-You Gift Need', 'Why It Works', 'Product Direction'],
            rows: [
              ['Bridesmaid thank-you gift', 'Personal and friendship-led', 'Farfalla'],
              ['Maid of honour thank-you gift', 'More elevated and emotional', 'Alidi Farfalla'],
              ['Sister thank-you gift', 'Symbolic and personal', 'Farfalla, Alidi Farfalla'],
              ['Best friend thank-you gift', 'Meaningful without being too romantic', 'Farfalla'],
              ['Mum thank-you gift', 'Sentimental and appreciative', 'Alidi Farfalla'],
              ['Mother of groom thank-you gift', 'New family chapter meaning', 'Alidi Farfalla, Farfalla'],
              ['Meaningful ear stack', 'Symbolism plus sparkle', 'Farfalla + Cadenza S'],
              ['If she prefers classic jewellery', 'Choose studs instead', 'Cadenza M, Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Wedding Morning Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Wedding morning jewellery gifts are usually given before the ceremony. These gifts can be worn during the wedding day or saved as keepsakes.' },
      { type: 'paragraph', text: 'For wedding morning gifts, keep the jewellery elegant and easy to wear. Cadenza M works well for classic sparkle. Orsola works if the recipient has a formal outfit. Alidi Farfalla works if the gift should feel emotional. Cadenza S and Amadea work well for proposal boxes or more subtle morning gifts.' },
      {
        type: 'table',
        headers: ['Wedding Morning Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Wedding morning gift for mum', 'Studs, drops or butterfly earrings', 'Cadenza M, Orsola, Alidi Farfalla'],
          ['Wedding morning gift for maid of honour', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Wedding morning gift for bridesmaids', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Wedding morning gift for sister', 'Butterfly earrings or huggies', 'Farfalla, Amadea'],
          ['Wedding morning gift for best friend', 'Huggies or butterfly earrings', 'Amadea, Farfalla'],
          ['Elegant morning gift', 'Drop earrings', 'Orsola'],
          ['Safe morning gift', 'Diamond studs', 'Cadenza S, Cadenza M'],
          ['Meaningful morning gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Maid of honour jewellery gifts', href: '/resources/jewellery-gift-guides/maid-of-honour-jewellery-gifts' },
    ],
  },
  {
    heading: 'After-Wedding Thank-You Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'After-wedding thank-you gifts do not need to match the wedding outfit. This gives you more freedom to choose based on the person\'s everyday style.' },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are very strong after-wedding gifts because they can be worn often. Butterfly earrings work when the gift should carry a message. Drops are better if the person enjoys dinners, events and dressy styling.' },
      {
        type: 'table',
        headers: ['After-Wedding Thank-You Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safe after-wedding gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Modern after-wedding gift', 'Huggies', 'Amadea'],
          ['Minimal after-wedding gift', 'Minimalist earrings', 'Laluce'],
          ['Meaningful after-wedding gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Elegant after-wedding gift', 'Drop earrings', 'Orsola'],
          ['Formal after-wedding gift', 'Long drops', 'Concetta Long'],
          ['Everyday after-wedding gift', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['If unsure', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Wedding Thank-You Jewellery by Personal Style',
    content: [
      { type: 'paragraph', text: "The recipient's personal style matters more than the wedding theme if the jewellery is meant to be worn after the wedding. A minimalist person may not wear bold earrings. A romantic person may love butterfly earrings. A classic dresser may prefer studs. A modern dresser may prefer huggies or hoops." },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-13.jpg',
        content: [
          {
            type: 'table',
            headers: ['Personal Style', 'Best Thank-You Gift Direction', 'Product Direction'],
            rows: [
              ['Classic', 'Diamond studs', 'Cadenza M, Cadenza S'],
              ['Minimalist', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
              ['Romantic', 'Butterfly earrings or drops', 'Farfalla, Alidi Farfalla, Orsola'],
              ['Modern', 'Huggies or hoops', 'Amadea, Pave Hoops'],
              ['Soft feminine', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['Workwear-focused', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Occasion dresser', 'Drop earrings', 'Orsola, Concetta Short, Concetta Long'],
              ['Party style', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
              ['Ear stack lover', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
              ['Safe gift recipient', 'Studs', 'Cadenza S, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Wedding Thank-You Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour should match the recipient\'s usual jewellery if the gift is personal. If the jewellery will be worn on the wedding day, it should also suit the wedding palette.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, classic and celebratory. White or silver tone feels clean and timeless. Rose gold feels soft, feminine and sentimental. Mixed metals can work for someone with a modern ear stack style.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Gift Feeling', 'Best For'],
        rows: [
          ['Yellow gold', 'Warm, classic and elegant', 'Champagne, green, burgundy, black, cream and warm outfits'],
          ['White or silver tone', 'Clean, bright and timeless', 'Navy, grey, silver, dusty blue, black and cool-toned outfits'],
          ['Rose gold', 'Soft, feminine and sentimental', 'Blush, pink, champagne, floral and pastel outfits'],
          ['Mixed metals', 'Personal and modern', 'Ear stack lovers and trend-led styling'],
        ],
      },
      { type: 'paragraph', text: 'For thank-you gifts, the safest choice is the metal colour the recipient already wears most often.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Wedding Thank-You Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts are strong when the recipient has multiple piercings or likes layered jewellery. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: 'The safest thank-you stack is a small stud with a huggie. The most meaningful stack is a butterfly earring with a small stud. The best elegant stack is a drop earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Thank-You Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest thank-you stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimal thank-you stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Meaningful thank-you stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Sentimental thank-you stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Elegant thank-you stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft thank-you stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal thank-you stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Modern thank-you stack', 'Huggie', 'Small stud', 'Amadea + Cadenza S'],
          ['Party thank-you stack', 'Hoop or bold earring', 'Small stud', 'Pave Hoops + Cadenza S, Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Thank-You Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Wedding Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Cadenza M diamond stud earrings. Studs are classic, wearable and safe for many recipients.' },
      { type: 'subheading', text: 'For a Bridesmaid Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S for the safest group gift, Amadea for modern bridesmaids or Concetta Short for soft bridesmaid dress styling.' },
      { type: 'subheading', text: 'For a Maid of Honour Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla for meaning, Orsola for wedding-day elegance or Cadenza M for classic sparkle.' },
      { type: 'subheading', text: 'For a Mum Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M for classic polish, Orsola for elegant movement or Alidi Farfalla for sentimental meaning.' },
      { type: 'subheading', text: 'For a Sister Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Farfalla for meaning, Amadea for modern wearability or Cadenza M for safe classic sparkle.' },
      { type: 'subheading', text: 'For a Best Friend Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Amadea for modern everyday wear, Farfalla for meaning, Orsola for elegance or Pave Hoops for modern shape.' },
      { type: 'subheading', text: 'For a Formal Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Concetta Long or Orsola. Concetta Long is better for formal styling, while Orsola is more versatile.' },
      { type: 'subheading', text: 'For a Minimalist Thank-You Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers clean and understated jewellery.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Thank-You Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best safe group gift', 'Small, subtle and easy to rewear'],
          ['Cadenza M diamond stud earrings', 'Best polished classic gift', 'Strong for mums, maid of honour and classic recipients'],
          ['Amadea Huggie earrings', 'Best modern thank-you gift', 'Close-fitting, wearable and stack-friendly'],
          ['Laluce minimalist diamond earrings', 'Best understated thank-you gift', 'Clean and quiet for minimal style'],
          ['Farfalla butterfly earrings', 'Best meaningful friendship gift', 'Symbolic, soft and personal'],
          ['Alidi Farfalla butterfly earrings', 'Best sentimental thank-you gift', 'Strong for mum, maid of honour and sister'],
          ['Orsola drop earrings', 'Best elegant thank-you gift', 'Adds movement and polish'],
          ['Concetta Short earrings', 'Best soft wedding thank-you gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal thank-you gift', 'Refined for formal occasions'],
          ['Pave Hoops', 'Best modern shape gift', 'Works for visible jewellery lovers'],
          ['Lusso bold statement earrings', 'Best bold gift only if she loves standout jewellery', 'Strong but less universal'],
        ],
      },
      { type: 'paragraph', text: 'Choose wedding thank-you jewellery by the person and the message behind the gift. Pick Cadenza S for safe group gifting, Cadenza M for classic polish, Amadea for modern wearability, Farfalla for meaning, Alidi Farfalla for sentimental appreciation, Orsola for elegance and Laluce for understated style.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that only works for the wedding day. A stronger thank-you gift should be wearable after the wedding too.' },
      { type: 'paragraph', text: 'Another mistake is giving every person the same gift when the roles are very different. Bridesmaids may receive Cadenza S or Amadea, while the maid of honour, mum or sister may receive Alidi Farfalla, Orsola or Cadenza M.' },
      { type: 'paragraph', text: 'A third mistake is choosing bold earrings for someone who prefers simple jewellery. If her everyday style is minimal, choose studs, huggies or minimalist earrings instead.' },
      { type: 'paragraph', text: "Another mistake is forgetting the recipient's usual metal colour. A gift feels more personal when it matches what she already wears." },
      { type: 'paragraph', text: 'A fifth mistake is choosing a piece that feels too formal for someone who mostly wears casual outfits. In that case, Amadea, Cadenza S or Laluce may be more useful than long drops.' },
      { type: 'paragraph', text: 'Finally, do not forget comfort and care. Thank-you jewellery should be easy to wear, easy to store and easy to maintain after the wedding.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing wedding thank-you jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Who is receiving the gift?',
          'Is the gift for a bridesmaid, maid of honour, mum, sister, best friend or mother of groom?',
          'Is this a wedding morning gift or after-wedding thank-you gift?',
          'Should the gift be worn on the wedding day?',
          'Should the gift feel safe, meaningful, elegant, modern or formal?',
          'What jewellery does the recipient usually wear?',
          'What metal colour does she wear most often?',
          'Would diamond studs be safest?',
          'Would butterfly earrings feel meaningful?',
          'Would huggies be more useful for everyday wear?',
          'Would drops suit her occasion style?',
          'Does she have multiple piercings for an ear stack gift?',
          'Should the maid of honour or mum receive a more elevated gift?',
          'Will the jewellery still be wearable after the wedding?',
          'Are the earrings comfortable for long wear?',
          'Are the earrings easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza S or Cadenza M. Choose Farfalla or Alidi Farfalla for meaning, Orsola for elegance, Amadea for modern everyday wear and Laluce for minimal style.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for wedding thank-you gifts?', answer: 'The best wedding thank-you jewellery is wearable, thoughtful and suited to the recipient. Diamond studs, huggies, butterfly earrings, drop earrings and minimalist earrings are all strong choices.' },
  { question: 'Are earrings good wedding thank-you gifts?', answer: 'Yes, earrings are good wedding thank-you gifts because they are easy to choose, easy to package and useful after the wedding.' },
  { question: 'What should I gift my bridesmaids as a thank-you?', answer: 'Small diamond studs, huggies, short drops or butterfly earrings are strong bridesmaid thank-you gifts because they can be worn on the wedding day and after.' },
  { question: 'What should I gift my maid of honour as a thank-you?', answer: 'For a maid of honour, choose something slightly more elevated, such as butterfly earrings, drop earrings or polished diamond studs.' },
  { question: 'What jewellery should I gift my mum on my wedding day?', answer: 'Classic diamond studs, elegant drop earrings or meaningful butterfly earrings are strong wedding-day gifts for mum.' },
  { question: 'What jewellery should I gift the mother of the groom?', answer: 'Medium diamond studs, drop earrings, huggies or butterfly earrings can work well for the mother of the groom depending on her style.' },
  { question: 'Are butterfly earrings good thank-you gifts?', answer: 'Yes, butterfly earrings can be meaningful thank-you gifts because they can symbolise growth, beauty, transformation and new beginnings.' },
  { question: 'What is the safest jewellery thank-you gift?', answer: 'Diamond studs are the safest jewellery thank-you gift because they are classic, simple and easy to wear with many outfits.' },
  { question: 'Should wedding thank-you jewellery match?', answer: 'It can match if the gifts are for a group, such as bridesmaids. For personal gifts, choose jewellery based on each recipient\'s style and metal colour.' },
  { question: 'What IWantJewels earrings are best for wedding thank-you gifts?', answer: 'Cadenza S, Cadenza M, Amadea, Laluce, Farfalla, Alidi Farfalla, Orsola, Concetta Short and Concetta Long are strong wedding thank-you gift options depending on the recipient and gift meaning.' },
]

const cta: V2CTABlock = {
  heading: 'Wedding thank-you jewellery should feel thoughtful, beautiful and useful after the wedding. Choose diamond studs for safe classic gifting, huggies for modern everyday wear, butterfly earrings for meaning, drop earrings for elegance, minimalist earrings for quiet style and long drops for formal thank-you gifts.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want thank-you gifts with real diamond sparkle. Choose Cadenza S for safe group gifting, Cadenza M for polished classic sparkle, Amadea for huggies, Laluce for minimal style, Farfalla for meaning, Alidi Farfalla for sentimental appreciation and Orsola for elegant movement.',
  primaryLabel: 'Shop Wedding Thank-You Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Wedding Party Jewellery Gifts',
  secondaryHref: '/resources/jewellery-gift-guides/wedding-party-jewellery-gifts',
  tertiaryLabel: 'Read the Bridesmaid Jewellery Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/bridesmaid-jewellery-gifts',
}

export default function Page() {
  const category = getCategoryBySlug('occasion-jewellery-guides')
  const article = getArticleBySlug('occasion-jewellery-guides', 'wedding-thank-you-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('occasion-jewellery-guides', 'wedding-thank-you-jewellery-gifts', 3)
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
