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
  title: 'Romantic Jewellery Gifts for Her',
  description:
    'Choose romantic jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and meaningful gift ideas for her.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-65.jpg',
  title: 'Romantic Jewellery Gifts for Her:',
  subtitle: 'Meaningful Earrings She Can Wear Again',
  paragraphs: [
    'Romantic jewellery should feel personal, thoughtful and wearable. The best romantic gift is not always the largest or boldest piece. It is the piece that feels connected to the person receiving it and still fits into her real wardrobe after the occasion is over.',
    'Lab-grown diamond earrings make strong romantic jewellery gifts because they combine sparkle with daily wearability. Butterfly earrings are ideal when the gift should feel symbolic and emotional. Drop earrings work beautifully for date nights, anniversary dinners and romantic outfits. Diamond studs are the safest classic choice. Huggies are perfect for someone who prefers modern everyday jewellery. Minimalist earrings work well when the gift should feel quiet, intimate and understated.',
    'At IWantJewels, Alidi Farfalla butterfly earrings, Farfalla butterfly earrings, Orsola drop earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Concetta Short earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings are the strongest romantic gift directions. Pave Hoops and Lusso can also work when the recipient prefers modern or bold evening styling.',
  ],
  shopLabel: 'Shop Romantic Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose romantic jewellery gifts for her.',
    'Pick lab-grown diamond earrings for girlfriends, wives and partners.',
    'Decide between butterfly earrings, diamond studs, drop earrings, huggies, hoops and minimalist earrings.',
    'Choose jewellery for anniversaries, birthdays, date nights, Valentine-style gifting and personal milestones.',
    'Find meaningful jewellery gifts with symbolism.',
    'Choose safe romantic gifts when you are unsure of her exact style.',
    'Build romantic ear stack gift ideas.',
    'Match romantic jewellery with metal colour and outfit style.',
  ],
  image: '/blog-images/blog-image-17.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Romantic Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Romantic Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Most romantic jewellery gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Meaningful romantic gift', 'Butterfly earrings or butterfly stack', 'Farfalla, Farfalla + Cadenza S'],
          ['Safe romantic gift', 'Medium diamond studs', 'Cadenza M'],
          ['First romantic diamond gift', 'Small diamond studs', 'Cadenza S'],
          ['Romantic dinner gift', 'Drop earrings', 'Orsola'],
          ['Soft romantic gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Everyday romantic gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Minimal romantic gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Anniversary romantic gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Birthday romantic gift', 'Butterfly earrings, studs or drops', 'Farfalla, Cadenza M, Orsola'],
          ['Date night jewellery gift', 'Drops, butterfly earrings or medium studs', 'Orsola, Farfalla, Cadenza M'],
          ['Romantic ear stack gift', 'Butterfly + stud or stud + huggie', 'Farfalla + Cadenza S, Cadenza S + Amadea'],
          ['Bold romantic evening gift', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery Romantic?',
    content: [
      { type: 'paragraph', text: 'Jewellery feels romantic when it carries thought, meaning and personal connection. It does not need to be oversized or dramatic. A small pair of diamond studs can feel romantic if they match her everyday style. Butterfly earrings can feel romantic because of their symbolism. Drop earrings can feel romantic because they are perfect for dinners and soft evening outfits.' },
      { type: 'paragraph', text: 'The best romantic jewellery gift usually does three things: it suits her style, it feels connected to the occasion, and it can be worn again.' },
      {
        type: 'table',
        headers: ['Romantic Jewellery Quality', 'Why It Matters'],
        rows: [
          ['Personal meaning', 'Makes the gift feel thoughtful'],
          ['Wearability', 'She can use it after the occasion'],
          ['Style match', 'The gift feels chosen for her, not generic'],
          ['Occasion fit', 'Works for anniversaries, birthdays or date nights'],
          ['Emotional detail', 'Symbolism can make the gift stronger'],
          ['Comfort', 'Romantic jewellery should not feel difficult to wear'],
          ['Timelessness', 'The gift should not feel like a one-night accessory'],
          ['Presentation', 'Gift-box styling can make the moment feel special'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, romantic jewellery should not be positioned only as "special occasion jewellery." The strongest message is that romantic earrings can be meaningful and still be wearable.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Safest Romantic Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest romantic jewellery gifts are usually diamond studs because they are classic, wearable and less risky than very bold or highly personal designs.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are the strongest safe romantic choice because they feel polished and gift-worthy. Cadenza S is better for someone who prefers subtle daily jewellery or is receiving her first diamond earrings. Amadea works well for someone who likes modern everyday pieces. Laluce is best for someone who prefers understated jewellery.' },
      {
        type: 'table',
        headers: ['Safe Romantic Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Medium diamond studs', 'Classic romantic sparkle', 'Cadenza M'],
          ['Small diamond studs', 'Subtle first diamond gift', 'Cadenza S'],
          ['Huggies', 'Modern everyday romantic gift', 'Amadea'],
          ['Minimalist earrings', 'Understated romantic style', 'Laluce'],
          ['Small stud + huggie', 'Practical romantic ear stack', 'Cadenza S + Amadea'],
          ['Soft drops', 'Dinner-date romantic styling', 'Orsola, Concetta Short'],
          ['Butterfly earrings', 'Meaningful romantic gift', 'Alidi Farfalla, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Meaningful Romantic Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A meaningful romantic gift should feel like it was chosen with the person in mind.' },
      { type: 'paragraph', text: 'Butterfly earrings are one of the strongest meaningful romantic jewellery choices because a butterfly can represent transformation, growth, beauty, freedom and new beginnings. That meaning works well for anniversaries, birthdays, relationship milestones and personal changes.' },
      { type: 'paragraph', text: 'Drop earrings can also feel meaningful when the gift is tied to a special dinner, a date night or an anniversary plan. Diamond studs can feel meaningful when they become her everyday reminder of the moment.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-69.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Romantic Gift Idea', 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise growth and transformation', 'Alidi Farfalla, Farfalla'],
              ['Butterfly + small stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
              ['Drop earrings', 'Perfect for romantic dinners', 'Orsola'],
              ['Soft short drops', 'Delicate and feminine', 'Concetta Short'],
              ['Classic diamond studs', 'Timeless and wearable', 'Cadenza M'],
              ['Small everyday studs', 'Subtle reminder of the gift', 'Cadenza S'],
              ['Minimalist earrings', 'Quiet and intimate', 'Laluce'],
              ['Huggies', 'Practical and modern', 'Amadea'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Butterfly Earrings as Romantic Gifts',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are one of the best romantic jewellery gifts when the buyer wants meaning, softness and symbolism.' },
      { type: 'paragraph', text: 'A butterfly can represent transformation, growth, beauty and a new chapter. In a romantic gift, this can suggest growth together, a shared journey or a meaningful moment in the relationship.' },
      { type: 'paragraph', text: 'Alidi Farfalla butterfly earrings should be positioned as the strongest romantic gift direction. Farfalla works well for birthdays, soft romantic styling, meaningful gifts and butterfly ear stacks.' },
      {
        type: 'table',
        headers: ['Romantic Butterfly Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Most romantic butterfly gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Meaningful romantic gift', 'Butterfly earrings', 'Farfalla'],
          ['Anniversary gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Birthday romantic gift', 'Butterfly earrings', 'Farfalla'],
          ['Soft date-night gift', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Romantic ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Minimal romantic stack', 'Butterfly + minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Gift for soft feminine style', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Drop Earrings for Romantic Dinners',
    content: [
      { type: 'paragraph', text: 'Drop earrings are perfect for romantic dinners because they add movement and elegance near the face.' },
      { type: 'paragraph', text: 'Orsola drop earrings are the strongest IWantJewels direction for date nights, anniversary dinners and romantic evening outfits. Concetta Short is better for soft and delicate outfits. Concetta Long works better for formal dinners, milestone anniversaries and evening dresses.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-71.jpg',
        content: [
          {
            type: 'table',
            headers: ['Romantic Dinner Look', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Anniversary dinner', 'Drop earrings', 'Orsola'],
              ['Date night dress', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
              ['Satin dinner dress', 'Drop earrings', 'Orsola'],
              ['Black dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Red dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Green dinner dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
              ['Soft blush outfit', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Formal romantic dinner', 'Long drops', 'Concetta Long'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Diamond Studs as Classic Romantic Gifts',
    content: [
      { type: 'paragraph', text: 'Diamond studs are a classic romantic gift because they are simple, timeless and easy to wear often.' },
      { type: 'paragraph', text: 'Cadenza M is the strongest classic romantic stud option because it has more visible sparkle while staying polished. Cadenza S is better for a subtle first diamond gift or someone who prefers delicate jewellery.' },
      { type: 'paragraph', text: 'Studs are also useful because they can become part of an ear stack later. A shopper can gift Cadenza M as the main classic piece or Cadenza S as a support stud with Farfalla, Orsola, Amadea or Pave Hoops.' },
      {
        type: 'table',
        headers: ['Romantic Stud Gift Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Safe romantic gift', 'Cadenza M', 'Classic and polished'],
          ['First diamond gift', 'Cadenza S', 'Subtle and easy to wear'],
          ['Everyday romantic reminder', 'Cadenza S', 'Simple and repeatable'],
          ['Classic anniversary gift', 'Cadenza M', 'Timeless sparkle'],
          ['Workwear-friendly gift', 'Cadenza M', 'Clean and professional'],
          ['Ear stack support gift', 'Cadenza S', 'Works with butterfly earrings, drops and huggies'],
          ['Minimal romantic gift', 'Cadenza S', 'Quiet and personal'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Huggies and Minimalist Earrings for Everyday Romance',
    content: [
      { type: 'paragraph', text: 'Not every romantic gift needs to be dressy. For someone who prefers everyday jewellery, huggies or minimalist earrings can feel more thoughtful than occasion-only pieces.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are strong for modern everyday romance because they can be worn often and styled in ear stacks. Laluce minimalist diamond earrings are best for someone who likes quiet, understated jewellery. Cadenza S can pair with both for a simple giftable stack.' },
      {
        type: 'table',
        headers: ['Everyday Romantic Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimal everyday gift', 'Minimalist earrings', 'Laluce'],
          ['Simple daily sparkle', 'Small studs', 'Cadenza S'],
          ['Polished daily sparkle', 'Medium studs', 'Cadenza M'],
          ['Everyday ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Minimal romantic stack', 'Small stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear romantic gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Travel-friendly romantic gift', 'Studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },
  {
    heading: 'Romantic Jewellery by Relationship',
    content: [
      { type: 'paragraph', text: 'The best romantic jewellery can change depending on the relationship.' },
      { type: 'paragraph', text: 'For a wife or long-term partner, butterfly earrings, drop earrings or polished studs can feel meaningful. For a girlfriend, butterfly earrings, huggies or drops may work well depending on her style. For early relationships, avoid going too dramatic unless her style clearly suits bold jewellery.' },
      {
        type: 'table',
        headers: ['Relationship', 'Best Romantic Jewellery Direction', 'Product Direction'],
        rows: [
          ['Wife', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Girlfriend', 'Butterfly earrings, huggies or drops', 'Farfalla, Amadea, Orsola'],
          ['Long-term partner', 'Meaningful earrings or dinner drops', 'Alidi Farfalla, Orsola'],
          ['New relationship', 'Small studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['First romantic diamond gift', 'Small studs', 'Cadenza S'],
          ['Milestone relationship gift', 'Butterfly earrings, long drops or classic studs', 'Alidi Farfalla, Concetta Long, Cadenza M'],
          ['Date-night surprise', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
          ['Self-gift with romantic meaning', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Romantic Jewellery by Occasion',
    content: [
      { type: 'paragraph', text: 'A romantic gift can be tied to many moments: anniversaries, birthdays, date nights, personal milestones, travel plans or simple surprise gifts.' },
      {
        type: 'table',
        headers: ['Occasion', 'Best Romantic Jewellery Direction', 'Product Direction'],
        rows: [
          ['Anniversary', 'Butterfly earrings or drops', 'Alidi Farfalla, Orsola'],
          ['Birthday', 'Butterfly earrings, studs or huggies', 'Farfalla, Cadenza M, Amadea'],
          ['Date night', 'Drops, butterfly earrings or medium studs', 'Orsola, Farfalla, Cadenza M'],
          ['First diamond gift', 'Small studs', 'Cadenza S'],
          ['Relationship milestone', 'Butterfly earrings or classic studs', 'Alidi Farfalla, Cadenza M'],
          ['Romantic dinner', 'Drop earrings', 'Orsola'],
          ['Holiday-style romantic gift', 'Studs, drops or butterfly earrings', 'Cadenza M, Orsola, Farfalla'],
          ['Travel surprise', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Personal new chapter', 'Butterfly earrings', 'Farfalla'],
          ['Formal evening', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Birthday jewellery gifts', href: '/resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Romantic Jewellery by Recipient Style',
    content: [
      { type: 'paragraph', text: 'The recipient\'s style should decide the gift more than the occasion alone.' },
      { type: 'paragraph', text: 'A romantic person may love butterfly earrings. A classic jewellery wearer may prefer studs. A modern dresser may prefer huggies or hoops. A minimalist person may prefer Laluce or Cadenza S. A dressy person may prefer Orsola or Concetta Long.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-73.jpg',
        content: [
          {
            type: 'table',
            headers: ['Recipient Style', 'Best Romantic Jewellery Direction', 'Product Direction'],
            rows: [
              ['Romantic style', 'Butterfly earrings or drops', 'Alidi Farfalla, Farfalla, Orsola'],
              ['Classic style', 'Diamond studs', 'Cadenza M, Cadenza S'],
              ['Minimalist style', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
              ['Modern style', 'Huggies or hoops', 'Amadea, Pave Hoops'],
              ['Workwear-focused', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Occasion dresser', 'Drop earrings', 'Orsola, Concetta Short, Concetta Long'],
              ['Soft feminine style', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['Bold style', 'Statement earrings or hoops', 'Lusso, Pave Hoops'],
              ['Ear stack lover', 'Butterfly + stud or stud + huggie', 'Farfalla + Cadenza S, Cadenza S + Amadea'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },
  {
    heading: 'Romantic Jewellery by Outfit Type',
    content: [
      { type: 'paragraph', text: 'Think about how she will wear the gift. If she loves dresses and dinners, drops may be perfect. If she wears simple everyday outfits, studs or huggies may be better. If she loves soft feminine styling, butterfly earrings may feel more personal.' },
      {
        type: 'table',
        headers: ['Outfit / Lifestyle', 'Best Romantic Jewellery Direction', 'Product Direction'],
        rows: [
          ['Satin dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['Black dress', 'Drops, studs, hoops or bold earrings', 'Orsola, Cadenza M, Pave Hoops, Lusso'],
          ['Red dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Green dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Blush dress', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Champagne dress', 'Drops, butterfly earrings or studs', 'Orsola, Farfalla, Cadenza M'],
          ['Floral dress', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Workwear', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Casual daily outfits', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Dinner outfits', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Minimal outfits', 'Minimalist earrings or studs', 'Laluce, Cadenza S'],
          ['Party outfits', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with satin dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },
  {
    heading: 'Romantic Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is very important for romantic jewellery gifts. The safest choice is the metal colour she already wears most often.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, classic and rich. White or silver tone feels clean and modern. Rose gold feels soft, romantic and feminine. For butterfly earrings and sentimental gifts, rose gold can be especially strong if it matches her style.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-75.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Romantic Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and rich', 'Anniversary gifts, black dresses, green dresses, everyday jewellery'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, formal outfits, cool wardrobes'],
              ['Rose gold', 'Soft, romantic and feminine', 'Butterfly earrings, blush outfits, sentimental gifts'],
              ['Mixed metals', 'Personal and creative', 'Ear stack lovers and trend-led recipients'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For romantic gifts, do not choose metal colour only by trend. Look at what she already wears and match that first.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Romantic Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts feel thoughtful when the recipient has multiple piercings or likes layered jewellery.' },
      { type: 'paragraph', text: 'A two-piece stack is usually safer than a three-piece stack. The most romantic stack is a butterfly earring with a small stud. The safest romantic stack is a small stud with a huggie. The best dinner stack is a drop earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Romantic Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Most romantic stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Meaningful romantic stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Safe romantic stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Dinner-date stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft romantic stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal romantic stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Modern romantic stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Bold romantic evening stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Romantic Gift Need',
    content: [
      { type: 'subheading', text: 'For the Most Romantic Jewellery Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They are the strongest direction when the gift should feel personal, soft and meaningful.' },
      { type: 'subheading', text: 'For a Meaningful Gift With Symbolism' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. Butterfly earrings can represent growth, transformation, beauty and new beginnings.' },
      { type: 'subheading', text: 'For a Romantic Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for date nights, anniversary dinners and satin outfits.' },
      { type: 'subheading', text: 'For a Safe Romantic Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They are classic, polished and easy to wear often.' },
      { type: 'subheading', text: 'For a Subtle First Romantic Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They feel delicate, wearable and not too overwhelming.' },
      { type: 'subheading', text: 'For a Minimal Romantic Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Amadea Huggie earrings. These are best for someone who prefers everyday jewellery over occasion-only pieces.' },
      { type: 'subheading', text: 'For a Soft Romantic Occasion Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They work well for blush, champagne, pastel, satin and delicate dinner outfits.' },
      { type: 'subheading', text: 'For a Bold Romantic Evening Gift' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings or Pave Hoops only if the recipient likes visible jewellery and standout styling.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Romantic Gift Role', 'Why It Works'],
        rows: [
          ['Alidi Farfalla butterfly earrings', 'Best romantic gift', 'Soft, personal and meaningful'],
          ['Farfalla butterfly earrings', 'Best symbolic gift', 'Represents growth, beauty and transformation'],
          ['Orsola drop earrings', 'Best date-night gift', 'Adds movement and elegance'],
          ['Cadenza M diamond stud earrings', 'Best safe classic gift', 'Polished, timeless and wearable'],
          ['Cadenza S lab-grown diamond studs', 'Best subtle first gift', 'Simple, delicate and stackable'],
          ['Concetta Short earrings', 'Best soft romantic drop', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal romantic gift', 'Refined and evening-ready'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, wearable and stackable'],
          ['Laluce minimalist diamond earrings', 'Best understated gift', 'Quiet, clean and intimate'],
          ['Pave Hoops', 'Best modern shape gift', 'Adds curve and sparkle'],
          ['Lusso bold statement earrings', 'Best bold romantic evening gift', 'Strong for someone who loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose romantic jewellery by her style and the meaning of the moment. Pick Alidi Farfalla for romance, Farfalla for symbolism, Orsola for date nights, Cadenza M for safe classic sparkle, Cadenza S for subtle daily wear, Amadea for modern everyday styling and Laluce for quiet understated gifts.' },
    ],
  },
  {
    heading: 'Common Romantic Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that feels romantic to the buyer but does not match the wearer\'s style. If she wears small studs every day, a very bold earring may not be the best romantic gift.' },
      { type: 'paragraph', text: 'Another mistake is thinking romantic jewellery must be dramatic. Simple diamond studs, huggies or minimalist earrings can feel very romantic when they suit her lifestyle.' },
      { type: 'paragraph', text: 'A third mistake is choosing symbolic jewellery for someone who prefers classic pieces. Butterfly earrings are meaningful, but Cadenza M may be safer for someone traditional.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the occasion. If the gift is for a dinner date, drop earrings may be perfect. If the gift is for daily wear, studs or huggies may be better.' },
      { type: 'paragraph', text: 'A fifth mistake is guessing the metal colour. Look at her usual jewellery first. Match yellow gold, white/silver tone or rose gold based on what she already wears.' },
      { type: 'paragraph', text: 'Finally, do not choose a gift that only works once. The best romantic jewellery should feel special in the moment and wearable after it.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Romantic Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing romantic jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Does she prefer classic, romantic, minimalist, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is this for an anniversary, birthday, date night, milestone or surprise gift?',
          'Should the gift feel emotional, practical or both?',
          'Would butterfly earrings feel meaningful to her?',
          'Would classic studs be safer?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, drops, hoops or symbolic jewellery?',
          'Is there a dinner outfit or occasion outfit to consider?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack gift feel more thoughtful?',
          'Are the earrings comfortable for long wear?',
          'Can the jewellery be worn after the occasion?',
          'Is the design easy to care for and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose diamond studs. If you want meaning, choose butterfly earrings. If the gift is for a dinner date, choose drops. If she likes modern everyday jewellery, choose huggies.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What jewellery is best for a romantic gift?',
    answer: 'The best romantic jewellery is personal, wearable and matched to her style. Butterfly earrings, diamond studs, drop earrings, huggies and minimalist earrings can all work depending on what she likes.',
  },
  {
    question: 'Are earrings a good romantic gift?',
    answer: 'Yes, earrings are a good romantic gift because they feel personal, frame the face beautifully and are easier to choose than rings.',
  },
  {
    question: 'Are lab-grown diamond earrings good romantic gifts?',
    answer: 'Yes, lab-grown diamond earrings are strong romantic gifts because they feel special while still being wearable for everyday outfits, dinners and occasions.',
  },
  {
    question: 'What earrings should I buy for a romantic gift?',
    answer: 'Butterfly earrings are best for meaning, drop earrings are best for date nights, diamond studs are safest, and huggies are best for modern everyday wear.',
  },
  {
    question: 'Are butterfly earrings romantic?',
    answer: 'Yes, butterfly earrings can feel very romantic because they are soft, feminine and symbolic. They can represent growth, beauty, transformation and new beginnings.',
  },
  {
    question: 'What earrings should I buy for my wife?',
    answer: 'For a wife, butterfly earrings, drop earrings or classic diamond studs are strong choices. Choose based on whether she prefers romantic, elegant or classic jewellery.',
  },
  {
    question: 'What earrings should I buy for my girlfriend?',
    answer: 'For a girlfriend, butterfly earrings, huggies, drop earrings or small diamond studs can work well depending on her style and the relationship stage.',
  },
  {
    question: 'What jewellery should I buy for a romantic dinner?',
    answer: 'Drop earrings are one of the best jewellery choices for a romantic dinner because they add movement and elegance.',
  },
  {
    question: 'What metal colour is best for romantic jewellery?',
    answer: 'Choose the metal colour she already wears most often. Yellow gold feels warm, white or silver tone feels clean, and rose gold feels soft and romantic.',
  },
  {
    question: 'What IWantJewels earrings are best for romantic gifts?',
    answer: 'Alidi Farfalla, Farfalla, Orsola, Cadenza M, Cadenza S, Concetta Short, Amadea and Laluce are strong romantic gift options depending on her style.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Romantic jewellery should feel thoughtful, personal and wearable. Choose butterfly earrings for meaning, drop earrings for date-night elegance, diamond studs for safe classic sparkle, huggies for modern daily wear and minimalist earrings for quiet understated style.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a romantic gift with real diamond sparkle. Choose Alidi Farfalla for romance, Farfalla for symbolism, Orsola for dinners, Cadenza M for classic polish, Cadenza S for subtle daily wear, Amadea for huggies and Laluce for minimalist styling.',
  primaryLabel: 'Shop Romantic Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Butterfly Earrings Meaning Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'romantic-jewellery-gifts-for-her')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'romantic-jewellery-gifts-for-her', 3)
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
