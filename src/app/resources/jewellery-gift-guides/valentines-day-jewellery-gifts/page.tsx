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
  title: "Valentine's Day Jewellery Gifts for Her",
  description:
    "Choose Valentine's Day jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and romantic gift ideas.",
  alternates: {
    canonical: 'https://iwantjewels.com/resources/jewellery-gift-guides/valentines-day-jewellery-gifts',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/jewellery-gift-guides/valentines-day-jewellery-gifts',
  },
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-13.jpg',
  title: "Valentine's Day Jewellery Gifts:",
  subtitle: 'Romantic Earrings She Will Actually Wear',
  paragraphs: [
    "Valentine's Day jewellery should feel romantic, thoughtful and wearable beyond one evening. The best Valentine's Day gift is not only something that looks beautiful in the box. It should feel personal to her, match her real style and become something she can wear again for dinners, birthdays, weddings, date nights, holidays, work events and everyday styling.",
    "Lab-grown diamond earrings are one of the strongest Valentine's Day jewellery gifts because they feel special without being difficult to choose. Butterfly earrings are ideal when the gift should feel meaningful and symbolic. Drop earrings are perfect for Valentine's dinner, romantic date nights and evening outfits. Diamond studs are the safest classic gift. Huggies are best when she prefers modern everyday jewellery. Minimalist earrings work well when the gift should feel quiet, elegant and understated. Hoops and bold earrings can work if she enjoys visible jewellery and party styling.",
    "At IWantJewels, Alidi Farfalla butterfly earrings, Farfalla butterfly earrings, Orsola drop earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Concetta Short earrings, Concetta Long earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Pave Hoops and Lusso bold statement earrings all work for different Valentine's Day gift needs.",
  ],
  shopLabel: "Shop Valentine's Day Jewellery Gifts",
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    "Choose Valentine's Day jewellery gifts for her.",
    'Pick lab-grown diamond earrings as a romantic gift.',
    'Decide between butterfly earrings, drop earrings, studs, huggies, hoops, minimalist earrings and bold earrings.',
    "Choose Valentine's gifts for girlfriend, wife, fiancée, partner or someone you are newly dating.",
    "Find meaningful Valentine's jewellery gifts with symbolism.",
    "Choose safe romantic jewellery gifts when you are unsure of her exact style.",
    "Match earrings to Valentine's dinner outfits, red dresses, black dresses, satin outfits and date-night looks.",
    "Build romantic Valentine's ear stack gift ideas.",
  ],
  image: '/blog-images/blog-image-15.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: "Valentine's Day Jewellery Gift Selector",
    content: [
      { type: 'paragraph', text: "Use this table as the main Valentine's gift decision tool." },
      {
        type: 'table',
        headers: ["Valentine's Gift Need", 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ["Most romantic Valentine's gift", 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ["Meaningful Valentine's gift", 'Butterfly earrings or butterfly stack', 'Farfalla, Farfalla + Cadenza S'],
          ["Valentine's dinner gift", 'Drop earrings', 'Orsola'],
          ["Safest Valentine's jewellery gift", 'Medium diamond studs', 'Cadenza M'],
          ['Subtle romantic gift', 'Small diamond studs or huggies', 'Cadenza S, Amadea'],
          ['New relationship gift', 'Small studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Long-term relationship gift', 'Butterfly earrings, drops or polished studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ["Wife Valentine's gift", 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ["Girlfriend Valentine's gift", 'Butterfly earrings, huggies, drops or studs', 'Farfalla, Amadea, Orsola, Cadenza M'],
          ["Minimalist Valentine's gift", 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ["Valentine's party gift", 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Romantic ear stack gift', 'Butterfly + stud or drop + stud', 'Farfalla + Cadenza S, Orsola + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: "What Makes Jewellery a Good Valentine's Day Gift?",
    content: [
      { type: 'paragraph', text: "A good Valentine's Day jewellery gift should feel romantic without becoming difficult to wear. The strongest gift is usually not the loudest piece. It is the one that matches her style, suits the relationship stage and feels thoughtful enough to remember after Valentine's Day is over." },
      { type: 'paragraph', text: "Earrings work especially well because they are easier to choose than rings. A pair of butterfly earrings can feel romantic and symbolic. Drop earrings can be worn immediately for Valentine's dinner. Diamond studs can become her everyday sparkle. Huggies can fit into a modern daily wardrobe. Minimalist earrings can feel intimate and understated." },
      {
        type: 'table',
        headers: ["What Makes It a Strong Valentine's Gift", 'Why It Matters'],
        rows: [
          ['Romantic meaning', 'The gift should feel connected to the occasion'],
          ['Wearability', "She should be able to use it after Valentine's Day"],
          ['Relationship-appropriate', 'New dating, girlfriend, wife and fiancée gifts need different levels'],
          ['Easy sizing', 'Earrings are easier to gift than rings'],
          ['Date-night fit', 'The jewellery should work for dinner or evening plans'],
          ['Personal style match', 'The gift should feel chosen for her'],
          ['Metal colour match', 'Helps the earrings fit her existing jewellery'],
          ['Timelessness', 'Romantic jewellery should not feel like a short trend'],
        ],
      },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: "Safest Valentine's Day Jewellery Gifts",
    content: [
      { type: 'paragraph', text: "The safest Valentine's Day jewellery gifts are diamond studs, huggies and minimalist earrings. These pieces feel special without being too dramatic, which makes them strong choices when you are unsure of her exact jewellery style." },
      { type: 'paragraph', text: "Cadenza M is the strongest safe Valentine's gift because it feels polished, classic and gift-worthy. Cadenza S is better for a newer relationship, subtle style or a first diamond-style gift. Amadea is ideal if she likes modern everyday jewellery. Laluce is best if she prefers understated pieces." },
      {
        type: 'table',
        headers: ["Safe Valentine's Gift Option", 'Best For', 'Product Direction'],
        rows: [
          ['Medium diamond studs', 'Safe classic romantic gift', 'Cadenza M'],
          ['Small diamond studs', 'Subtle or new relationship gift', 'Cadenza S'],
          ['Huggies', 'Modern everyday romantic gift', 'Amadea'],
          ['Minimalist earrings', "Understated Valentine's gift", 'Laluce'],
          ['Stud + huggie set', 'Practical romantic ear stack', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift if she likes symbolism', 'Farfalla, Alidi Farfalla'],
          ['Short drops', 'Soft romantic dinner gift', 'Concetta Short'],
          ['Drop earrings', "Elegant Valentine's dinner gift", 'Orsola'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: "Meaningful Valentine's Day Jewellery Gifts",
    content: [
      { type: 'paragraph', text: "A meaningful Valentine's Day jewellery gift should carry a message. It can represent love, growth, a shared journey, a new chapter, appreciation or the feeling of choosing something personal instead of generic." },
      { type: 'paragraph', text: "Butterfly earrings are one of the strongest meaningful Valentine's jewellery choices because a butterfly can symbolise transformation, growth, beauty and new beginnings. For Valentine's Day, that meaning can feel romantic without being too obvious or overly traditional." },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-17.jpg',
        content: [
          {
            type: 'table',
            headers: ["Meaningful Valentine's Gift Idea", 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise growth, beauty and transformation', 'Farfalla'],
              ['Sentimental butterfly earrings', 'Feel more personal and keepsake-led', 'Alidi Farfalla'],
              ['Butterfly + small stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
              ['Drop earrings', 'Romantic dinner and date-night styling', 'Orsola'],
              ['Medium diamond studs', 'Classic romantic sparkle', 'Cadenza M'],
              ['Small diamond studs', 'Subtle daily reminder', 'Cadenza S'],
              ['Huggies', 'Practical everyday romantic gift', 'Amadea'],
              ['Minimalist earrings', 'Quiet and intimate', 'Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: "Romantic Valentine's Jewellery Gifts",
    content: [
      { type: 'paragraph', text: "Romantic jewellery does not always need to be large or dramatic. It should feel intentional. For some people, romantic means symbolic butterfly earrings. For others, it means elegant drops for dinner, polished studs for everyday wear or a small ear stack chosen with care." },
      { type: 'paragraph', text: "Alidi Farfalla should be positioned as the strongest romantic Valentine's gift when the shopper wants meaning and sentiment. Orsola should be positioned as the strongest dinner gift. Cadenza M is the safest romantic classic." },
      {
        type: 'table',
        headers: ['Romantic Gift Mood', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Deeply romantic gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Soft romantic gift', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Date-night romantic gift', 'Drop earrings', 'Orsola'],
          ['Classic romantic gift', 'Medium diamond studs', 'Cadenza M'],
          ['Subtle romantic gift', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Minimal romantic gift', 'Minimalist earrings', 'Laluce'],
          ['Romantic party gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Romantic ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Date night jewellery guide', href: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
    ],
  },
  {
    heading: "Valentine's Jewellery Gifts by Relationship Stage",
    content: [
      { type: 'paragraph', text: "The right Valentine's jewellery gift depends on the relationship stage. A new relationship needs something thoughtful but not too intense. A long-term partner or wife can receive something more symbolic, romantic or elevated." },
      {
        type: 'table',
        headers: ['Relationship Stage', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Newly dating', 'Small studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Early relationship', 'Small studs, huggies or soft butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Girlfriend', 'Butterfly earrings, drops, huggies or studs', 'Farfalla, Orsola, Amadea, Cadenza M'],
          ['Long-term girlfriend', 'Butterfly earrings, drops or polished studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Fiancée', 'Butterfly earrings, drops or formal earrings', 'Alidi Farfalla, Orsola, Concetta Long'],
          ['Wife', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Partner', 'Symbolic earrings or classic sparkle', 'Alidi Farfalla, Cadenza M'],
          ['If unsure', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Anniversary jewellery gifts', href: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts' },
    ],
  },
  {
    heading: "Valentine's Jewellery Gifts for Girlfriend",
    content: [
      { type: 'paragraph', text: "Valentine's jewellery for a girlfriend should feel thoughtful and personal without being mismatched to the relationship stage. If the relationship is newer, choose studs, huggies or minimalist earrings. If the relationship is more serious, butterfly earrings or drop earrings can feel more romantic." },
      {
        type: 'table',
        headers: ["Girlfriend Valentine's Gift Need", 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ["Safe girlfriend Valentine's gift", 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ["Romantic Valentine's gift", 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ["Valentine's dinner gift", 'Drop earrings', 'Orsola'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist gift', 'Minimalist earrings', 'Laluce'],
          ['Party-ready gift', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ["First diamond-style Valentine's gift", 'Small studs', 'Cadenza S'],
          ['Romantic ear stack gift', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for girlfriend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-girlfriend' },
    ],
  },
  {
    heading: "Valentine's Jewellery Gifts for Wife",
    content: [
      { type: 'paragraph', text: "Valentine's jewellery for a wife can carry more romance, polish and meaning. The gift should feel personal and still be wearable after Valentine's Day." },
      { type: 'paragraph', text: "Butterfly earrings are strong for symbolism, drop earrings are ideal for Valentine's dinner, and diamond studs are safest for classic style. Huggies or minimalist earrings work well if she prefers everyday jewellery." },
      {
        type: 'table',
        headers: ["Wife Valentine's Gift Need", 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ["Romantic Valentine's gift", 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ["Classic Valentine's gift", 'Medium studs', 'Cadenza M'],
          ["Valentine's dinner gift", 'Drop earrings', 'Orsola'],
          ["Luxury-feel Valentine's gift", 'Long drops or classic studs', 'Concetta Long, Cadenza M'],
          ['Everyday romantic gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ["Minimalist Valentine's gift", 'Minimalist earrings', 'Laluce'],
          ['Soft romantic gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Romantic ear stack gift', 'Butterfly + stud or drop + stud', 'Farfalla + Cadenza S, Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for wife', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-wife' },
    ],
  },
  {
    heading: "Valentine's Jewellery Gifts for Fiancée",
    content: [
      { type: 'paragraph', text: "Valentine's jewellery for a fiancée should feel romantic, polished and meaningful without competing with the engagement ring. Earrings are a strong choice because they complement the ring instead of trying to replace it." },
      { type: 'paragraph', text: "Alidi Farfalla is strong when the gift should feel symbolic. Orsola is ideal for a Valentine's dinner or engagement celebration. Cadenza M works well when the gift should feel classic and easy to repeat. Concetta Long can work for a formal dinner or special evening plan." },
      {
        type: 'table',
        headers: ["Fiancée Valentine's Gift Need", 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ["Meaningful Valentine's gift", 'Butterfly earrings', 'Alidi Farfalla'],
          ['Romantic dinner gift', 'Drop earrings', 'Orsola'],
          ['Classic polished gift', 'Medium diamond studs', 'Cadenza M'],
          ["Formal Valentine's gift", 'Long drops', 'Concetta Long'],
          ['Soft romantic gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Everyday romantic gift', 'Huggies or small studs', 'Amadea, Cadenza S'],
          ['Minimalist fiancée gift', 'Minimalist earrings', 'Laluce'],
          ['Fiancée ear stack gift', 'Butterfly + small stud or drop + stud', 'Farfalla + Cadenza S, Orsola + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: "Valentine's Jewellery Gifts for Someone Newly Dating",
    content: [
      { type: 'paragraph', text: "For someone you are newly dating, Valentine's jewellery should feel thoughtful but not too intense. Smaller, wearable earrings are safer than dramatic romantic designs." },
      { type: 'paragraph', text: "Cadenza S is the safest first jewellery gift. Amadea feels modern and easy to wear. Laluce works if she likes minimalist style. Farfalla can work if you know she likes butterfly jewellery or symbolic pieces, but for a newer relationship, studs and huggies are usually safer." },
      {
        type: 'table',
        headers: ['New Relationship Gift Need', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest new relationship gift', 'Small studs', 'Cadenza S'],
          ['Modern new relationship gift', 'Huggies', 'Amadea'],
          ['Minimal new relationship gift', 'Minimalist earrings', 'Laluce'],
          ['Slightly more polished gift', 'Medium studs', 'Cadenza M'],
          ['Soft meaningful gift', 'Butterfly earrings only if her style fits', 'Farfalla'],
          ['Casual date-night gift', 'Huggies or studs', 'Amadea, Cadenza S'],
          ['If unsure', 'Small diamond studs', 'Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for girlfriend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-girlfriend' },
    ],
  },
  {
    heading: "Valentine's Dinner Jewellery Gifts",
    content: [
      { type: 'paragraph', text: "Valentine's dinner gifts are strong because the jewellery can be worn immediately. If the gift is being opened before dinner, a date night or a romantic evening plan, drop earrings and polished studs are especially useful." },
      { type: 'paragraph', text: "Orsola is the strongest Valentine's dinner direction because it adds movement and elegance. Cadenza M is safest for classic sparkle. Concetta Short works for soft outfits, while Concetta Long works for more formal Valentine's dinners." },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-19.jpg',
        content: [
          {
            type: 'table',
            headers: ["Valentine's Dinner Gift Need", 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ["Best Valentine's dinner earrings", 'Drop earrings', 'Orsola'],
              ['Safe dinner sparkle', 'Medium studs', 'Cadenza M'],
              ['Soft dinner outfit', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ["Formal Valentine's dinner", 'Long drops', 'Concetta Long'],
              ['Black dinner dress', 'Drops or studs', 'Orsola, Cadenza M'],
              ['Satin dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ["Red Valentine's dress", 'Drops or medium studs', 'Orsola, Cadenza M'],
              ["Valentine's dinner ear stack", 'Drop + small stud', 'Orsola + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Date night jewellery guide', href: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
    ],
  },
  {
    heading: "Valentine's Party Jewellery Gifts",
    content: [
      { type: 'paragraph', text: "Valentine's party jewellery can be more visible, especially if the recipient likes evening outfits, black dresses, red dresses, satin, velvet, jumpsuits or standout styling." },
      { type: 'paragraph', text: "Pave Hoops are strong for a modern Valentine's party gift. Lusso works if she loves bold statement jewellery. Orsola is better for elegant party styling. Cadenza M is safer when her style is unknown." },
      {
        type: 'table',
        headers: ["Valentine's Party Gift Need", 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ["Modern Valentine's party gift", 'Hoops', 'Pave Hoops'],
          ["Bold Valentine's party gift", 'Bold statement earrings', 'Lusso'],
          ["Elegant Valentine's party gift", 'Drop earrings', 'Orsola'],
          ['Safe party sparkle', 'Medium studs', 'Cadenza M'],
          ["Black dress Valentine's party", 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Red outfit party', 'Drops, hoops or studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Soft party look', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['If unsure', 'Medium studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },
  {
    heading: "Everyday Valentine's Jewellery Gifts",
    content: [
      { type: 'paragraph', text: "Not every Valentine's gift needs to be dinner-led. Some of the best romantic jewellery gifts are pieces she can wear regularly." },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are the strongest everyday gift directions. Hoops work if she likes visible daily jewellery. Butterfly earrings can work if her everyday style is soft or meaningful.' },
      {
        type: 'table',
        headers: ["Everyday Valentine's Gift Need", 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ["Safest everyday Valentine's gift", 'Small studs', 'Cadenza S'],
          ['Polished everyday sparkle', 'Medium studs', 'Cadenza M'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist everyday gift', 'Minimalist earrings', 'Laluce'],
          ['Everyday romantic ear stack', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Weekend everyday gift', 'Hoops', 'Pave Hoops'],
          ['Meaningful everyday gift', 'Butterfly earrings', 'Farfalla'],
          ['Daily-to-dinner gift', 'Medium studs or drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Everyday lab-grown diamond earrings guide', href: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
    ],
  },
  {
    heading: "Valentine's Jewellery by Outfit",
    content: [
      { type: 'paragraph', text: "Valentine's outfits often include black dresses, red dresses, satin dresses, pink outfits, blush tones, champagne pieces, white outfits, velvet, date-night tops or jumpsuits. The jewellery should support the outfit without making it feel overdone." },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-21.jpg',
        content: [
          {
            type: 'table',
            headers: ["Valentine's Outfit", 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Black dress', 'Drops, hoops, studs or bold earrings', 'Orsola, Pave Hoops, Cadenza M, Lusso'],
              ['Red dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Satin dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
              ['Pink outfit', 'Butterfly earrings, short drops or studs', 'Farfalla, Concetta Short, Cadenza S'],
              ['Blush outfit', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['Champagne dress', 'Short drops, butterfly earrings or studs', 'Concetta Short, Farfalla, Cadenza M'],
              ['White outfit', 'Studs, drops or huggies', 'Cadenza M, Orsola, Amadea'],
              ['Velvet outfit', 'Drops, medium studs or hoops', 'Orsola, Cadenza M, Pave Hoops'],
              ['Jumpsuit', 'Hoops, drops or huggies', 'Pave Hoops, Orsola, Amadea'],
              ['Minimal outfit', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
              ['Soft floral outfit', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
              ['Casual dinner outfit', 'Studs or huggies', 'Cadenza S, Amadea'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },
  {
    heading: "Valentine's Jewellery by Personal Style",
    content: [
      { type: 'paragraph', text: "Personal style should guide the Valentine's gift more than the holiday alone. A minimalist person may not wear dramatic earrings even for a romantic dinner. A romantic person may love butterfly earrings. A modern dresser may prefer huggies or hoops. A classic dresser may prefer diamond studs." },
      {
        type: 'table',
        headers: ['Her Style', "Best Valentine's Gift Direction", 'Product Direction'],
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
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: "Valentine's Jewellery by Metal Colour",
    content: [
      { type: 'paragraph', text: "Metal colour is one of the easiest ways to make a Valentine's gift feel right. The safest choice is the metal colour she already wears most often." },
      { type: 'paragraph', text: "Yellow gold feels warm, romantic and classic. White or silver tone feels clean, bright and modern. Rose gold feels soft, feminine and sentimental. Mixed metals can work for someone who likes modern ear stacks." },
      {
        type: 'table',
        headers: ['Metal Colour', "Valentine's Gift Feeling", 'Best For'],
        rows: [
          ['Yellow gold', 'Warm, classic and romantic', 'Black dresses, red outfits, green outfits, champagne tones'],
          ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, cool-toned wardrobes, formal outfits'],
          ['Rose gold', 'Soft, feminine and sentimental', 'Butterfly earrings, blush outfits, romantic gifts'],
          ['Mixed metals', 'Creative and personal', 'Ear stack lovers and modern styling'],
        ],
      },
      { type: 'paragraph', text: "For Valentine's gifts, avoid choosing metal colour only because it feels romantic. Match what she already wears first." },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: "Valentine's Ear Stack Gift Ideas",
    content: [
      { type: 'paragraph', text: 'Ear stack gifts are strong when she has multiple piercings or likes layered jewellery. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: "The most romantic Valentine's stack is a butterfly earring with a small stud. The best Valentine's dinner stack is a drop earring with a small support stud. The safest everyday stack is a small stud with a huggie." },
      {
        type: 'table',
        headers: ["Valentine's Stack Type", 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ["Romantic Valentine's stack", 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ["Sentimental Valentine's stack", 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Safe everyday romantic stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ["Minimal Valentine's stack", 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ["Valentine's dinner stack", 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft romantic stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ["Formal Valentine's stack", 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ["Modern Valentine's stack", 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ["Party Valentine's stack", 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/earring-style-guides/diamond-ear-stack-ideas' },
    ],
  },
  {
    heading: "Product Pathways by Valentine's Gift Need",
    content: [
      { type: 'subheading', text: "For the Most Romantic Valentine's Gift" },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They are strongest when the gift should feel personal, symbolic and romantic.' },
      { type: 'subheading', text: "For a Meaningful Valentine's Gift" },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. Butterfly symbolism connects naturally to growth, beauty, transformation and shared moments.' },
      { type: 'subheading', text: "For a Valentine's Dinner Gift" },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for date nights, satin dresses and romantic dinner outfits.' },
      { type: 'subheading', text: "For the Safest Classic Valentine's Gift" },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They are polished, timeless and easy to wear with many outfits.' },
      { type: 'subheading', text: "For a Subtle Valentine's Gift" },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Amadea Huggie earrings. They feel wearable, modern and not overwhelming.' },
      { type: 'subheading', text: 'For a New Relationship Valentine\'s Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S, Amadea or Laluce. These feel thoughtful without becoming too intense for the relationship stage.' },
      { type: 'subheading', text: "For a Minimalist Valentine's Gift" },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These work well when she prefers understated jewellery.' },
      { type: 'subheading', text: "For a Valentine's Party Gift" },
      { type: 'paragraph', text: 'Choose Pave Hoops if she likes visible shape. Choose Lusso only if she loves bold evening jewellery.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', "Best Valentine's Gift Role", 'Why It Works'],
        rows: [
          ['Alidi Farfalla butterfly earrings', "Best romantic Valentine's gift", 'Personal, symbolic and sentimental'],
          ['Farfalla butterfly earrings', "Best meaningful Valentine's gift", 'Represents growth, beauty and transformation'],
          ['Orsola drop earrings', "Best Valentine's dinner gift", 'Adds elegant movement for date nights'],
          ['Cadenza M diamond stud earrings', "Best safe classic Valentine's gift", 'Polished, timeless and wearable'],
          ['Cadenza S lab-grown diamond studs', "Best subtle Valentine's gift", 'Simple, delicate and stackable'],
          ['Concetta Short earrings', 'Best soft romantic gift', 'Delicate and feminine'],
          ['Concetta Long earrings', "Best formal Valentine's gift", 'Refined for dressy evenings'],
          ['Amadea Huggie earrings', "Best modern everyday Valentine's gift", 'Close-fitting, wearable and stack-friendly'],
          ['Laluce minimalist diamond earrings', "Best understated Valentine's gift", 'Quiet, clean and easy for minimal style'],
          ['Pave Hoops', "Best modern Valentine's party gift", 'Adds shape and sparkle'],
          ['Lusso bold statement earrings', "Best bold Valentine's evening gift", 'Strong only if she loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: "Choose the Valentine's gift by her style and the relationship stage. Pick Alidi Farfalla for romance, Farfalla for meaning, Orsola for dinner, Cadenza M for safe classic sparkle, Cadenza S for subtle daily wear, Amadea for modern huggies, Laluce for minimal style and Concetta Long for formal Valentine's evenings." },
    ],
  },
  {
    heading: "Common Valentine's Jewellery Gift Mistakes to Avoid",
    content: [
      { type: 'paragraph', text: "One common mistake is choosing jewellery that looks romantic but does not match her style. If she wears small, simple pieces every day, very bold earrings may not be the safest Valentine's gift." },
      { type: 'paragraph', text: "Another mistake is choosing something that only works for one dinner. A strong Valentine's gift should feel special in the moment and still be wearable after it." },
      { type: 'paragraph', text: 'A third mistake is making the gift too intense for the relationship stage. For newer relationships, small studs, huggies or minimalist earrings are usually safer than very sentimental pieces.' },
      { type: 'paragraph', text: "Another mistake is ignoring the meaning of the occasion. Valentine's jewellery should feel chosen, not generic. Butterfly earrings, classic studs and dinner-ready drops can all feel romantic when they match her style." },
      { type: 'paragraph', text: 'A fifth mistake is guessing the metal colour. Look at what she already wears. If most of her jewellery is gold, choose gold. If she wears white or silver-tone jewellery, choose that direction.' },
      { type: 'paragraph', text: "Finally, do not forget comfort. Valentine's jewellery should feel easy enough for dinner, photos, date nights, travel, celebrations and future wear." },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: "Final Valentine's Gift Checklist",
    content: [
      { type: 'paragraph', text: "Before choosing Valentine's jewellery, ask:" },
      {
        type: 'bullet-list',
        items: [
          'Is this for someone newly dating, a girlfriend, wife, fiancée or long-term partner?',
          'Should the gift feel safe, romantic, meaningful, minimal, formal or party-ready?',
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is the gift tied to dinner, travel, a party, a proposal-style moment or everyday wear?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would diamond studs be safer?',
          "Can the earrings be worn after Valentine's Day?",
          'Will the jewellery work for everyday outfits, dinners, workwear or future occasions?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack feel more thoughtful?',
          'Are the earrings comfortable for long wear?',
          'Is the design easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: "If you are unsure, choose Cadenza M for safe classic sparkle. If you want meaning, choose Farfalla or Alidi Farfalla. If the gift is tied to dinner, choose Orsola. If she likes modern everyday jewellery, choose Amadea or Cadenza S." },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: "What jewellery is best for Valentine's Day?", answer: "The best Valentine's jewellery is romantic, wearable and matched to her style. Butterfly earrings, drop earrings, diamond studs, huggies, minimalist earrings and hoops can all work depending on the relationship and occasion." },
  { question: "Are earrings a good Valentine's Day gift?", answer: "Yes, earrings are a good Valentine's Day gift because they feel personal, can be worn often and are easier to choose than rings." },
  { question: "Are lab-grown diamond earrings good Valentine's Day gifts?", answer: "Yes, lab-grown diamond earrings are strong Valentine's Day gifts because they feel special while still being wearable for dinners, date nights, everyday outfits and future occasions." },
  { question: "What are the safest earrings to gift for Valentine's Day?", answer: "Diamond studs are the safest Valentine's earrings because they are classic, simple and easy to wear with many outfits." },
  { question: "Are butterfly earrings a meaningful Valentine's gift?", answer: "Yes, butterfly earrings are meaningful Valentine's gifts because they can symbolise growth, transformation, beauty and new beginnings." },
  { question: "What jewellery should I buy my girlfriend for Valentine's Day?", answer: "For a girlfriend, choose diamond studs for a safe gift, butterfly earrings for meaning, drop earrings for date nights, huggies for everyday wear or hoops if she likes modern styling." },
  { question: "What jewellery should I buy my wife for Valentine's Day?", answer: "For a wife, butterfly earrings, drop earrings and classic diamond studs are strong Valentine's choices depending on whether her style is romantic, elegant or classic." },
  { question: "What jewellery should I buy someone I just started dating?", answer: "For someone newly dating, choose small studs, huggies or minimalist earrings. These feel thoughtful without becoming too intense." },
  { question: "What earrings are best for a Valentine's dinner?", answer: "Drop earrings are one of the best Valentine's dinner choices because they add movement and elegance near the face. Medium diamond studs are safer if her style is classic." },
  { question: "What IWantJewels earrings are best for Valentine's Day gifts?", answer: "Alidi Farfalla, Farfalla, Orsola, Cadenza M, Cadenza S, Concetta Short, Concetta Long, Amadea, Laluce and Pave Hoops are strong Valentine's gift options depending on her style and the occasion." },
]

const cta: V2CTABlock = {
  heading: "Valentine's jewellery should feel romantic in the moment and wearable after the day is over. Choose butterfly earrings for meaning, drop earrings for Valentine's dinners, diamond studs for safe classic sparkle, huggies for modern everyday jewellery, minimalist earrings for quiet style and hoops or bold earrings only if she loves visible styling.",
  body: "Start with IWantJewels demi-fine lab-grown diamond earrings if you want a Valentine's gift with real diamond sparkle. Choose Alidi Farfalla for romance, Farfalla for symbolism, Orsola for dinners, Cadenza M for classic polish, Cadenza S for subtle daily wear, Amadea for huggies, Laluce for minimalist style and Concetta Long for formal Valentine's evenings.",
  primaryLabel: "Shop Valentine's Day Jewellery Gifts",
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Romantic Jewellery Gifts',
  secondaryHref: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her',
  tertiaryLabel: 'Read the Anniversary Jewellery Gifts Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/anniversary-jewellery-gifts',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'valentines-day-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'valentines-day-jewellery-gifts', 3)
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
