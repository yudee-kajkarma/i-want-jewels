import type { Metadata } from 'next'
import { localizedAlternates } from '@/i18n/metadata'
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = {
  title: 'Minimalist Jewellery Styling Guide',
  description:
    'Learn how to style minimalist jewellery with earrings, studs, huggies, lab grown diamonds, workwear, gifts, weddings and everyday outfits.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/earring-style-guides/minimalist-jewellery-styling-guide', locale),
  }
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-97.jpg',
  title: 'Minimalist Jewellery Styling Guide:',
  subtitle: 'How to Style Simple Jewellery for Everyday, Work & Occasions',
  paragraphs: [
    'Minimalist jewellery is simple, polished and easy to wear often. It is not about wearing jewellery that disappears. It is about choosing clean pieces that add shape, sparkle and finish without making the outfit feel heavy.',
    'The best minimalist jewellery usually has one clear purpose. A small diamond stud adds subtle sparkle. A huggie adds shape. A minimalist earring adds quiet detail. A medium stud adds classic polish. A soft drop adds movement for dinners and weddings without becoming too bold.',
    'At IWantJewels, minimalist styling works especially well with lab-grown diamond earrings because even small pieces can feel elevated. Cadenza S, Cadenza M, Laluce, Amadea Huggie, Pave Hoops, Orsola, Concetta Short and Farfalla can all support different minimalist looks depending on the outfit and occasion.',
  ],
  shopLabel: 'Shop Minimalist Jewellery',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Understand how to style minimalist jewellery.',
    'Choose simple earrings for everyday wear.',
    'Build minimalist ear stacks with studs, huggies and small details.',
    'Style jewellery with shirts, blazers, black dresses, satin dresses and wedding guest outfits.',
    'Choose jewellery for workwear, travel, dinners and gifts.',
    'Decide when to wear studs, huggies, hoops or soft drops.',
    'Understand how metal colour changes minimalist styling.',
    'Find IWantJewels product recommendations by outfit and occasion.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-99.jpg',
}

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main styling decision tool.' },
      {
        type: 'table',
        headers: ['Styling Need', 'Best Minimalist Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Everyday jewellery', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['More polished everyday sparkle', 'Medium studs', 'Cadenza M'],
          ['Quiet minimalist styling', 'Minimalist diamond earrings', 'Laluce'],
          ['Minimal ear stack', 'Small stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear jewellery', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Travel jewellery', 'Secure studs or huggies', 'Cadenza S, Amadea'],
          ['Black dress styling', 'Medium studs, hoops or soft drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Satin dress styling', 'Medium studs or drop earrings', 'Cadenza M, Orsola'],
          ['Wedding guest styling', 'Studs, soft drops or butterfly earrings', 'Cadenza M, Concetta Short, Farfalla'],
          ['Minimal party styling', 'Medium studs, hoops or elegant drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Giftable minimalist jewellery', 'Studs, huggies or soft earrings', 'Cadenza S, Cadenza M, Laluce'],
          ['Romantic minimalist styling', 'Butterfly earrings or delicate drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
        ],
      },
    ],
  },

  // ── Section 1: What Is Minimalist Jewellery Styling ──────────────────────────
  {
    heading: 'What Is Minimalist Jewellery Styling?',
    content: [
      { type: 'paragraph', text: 'Minimalist jewellery styling means choosing jewellery that feels clean, balanced and wearable. The pieces are usually smaller, simpler or more refined, but they still add polish to the outfit.' },
      { type: 'paragraph', text: 'Minimalist jewellery can include lab-grown diamond studs, huggies, small hoops, minimalist earrings, delicate drops and soft symbolic pieces. The design should not feel heavy, crowded or too trend-led.' },
      { type: 'paragraph', text: 'A minimalist jewellery look usually has:' },
      {
        type: 'table',
        headers: ['Minimalist Styling Element', 'What It Means'],
        rows: [
          ['Clean shape', 'The jewellery has a simple, easy-to-read design'],
          ['Wearable size', 'The piece works for more than one outfit'],
          ['Subtle sparkle', 'The jewellery adds light without overpowering'],
          ['Balanced metal colour', 'The finish works with the rest of the outfit'],
          ['Comfortable feel', 'The jewellery can be worn for several hours'],
          ['Repeatable styling', 'The piece is not limited to one occasion'],
          ['One clear focus', 'The outfit does not have too many competing jewellery pieces'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, minimalist styling should not feel plain. The goal is to make small lab-grown diamond pieces feel intentional, premium and easy to wear often.' },
      { type: 'see-also', text: 'What Is Demi-Fine Jewellery?', href: '/resources/demi-fine-jewellery-guides/what-is-demi-fine-jewellery' },
    ],
  },

  // ── Section 2: Why Minimalist Works for Everyday Wear ────────────────────────
  {
    heading: 'Why Minimalist Jewellery Works for Everyday Wear',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-101.jpg',
        content: [
          { type: 'paragraph', text: 'Minimalist jewellery works for everyday wear because it does not demand a special outfit. It can be worn with shirts, jeans, blazers, knitwear, dresses, workwear, travel outfits and simple evening looks.' },
          { type: 'paragraph', text: 'Small lab-grown diamond earrings are especially useful because they add polish without making the look feel too formal. A tiny sparkle point can make a simple outfit feel finished.' },
          {
            type: 'table',
            headers: ['Everyday Styling Reason', 'Why Minimalist Jewellery Helps'],
            rows: [
              ['Easy to repeat', 'Works with many outfits'],
              ['Comfortable', 'Smaller earrings are easier for long wear'],
              ['Polished', 'Adds finish without looking heavy'],
              ['Work-friendly', 'Looks professional and clean'],
              ['Travel-friendly', 'Simple pieces are easier to style'],
              ['Stackable', 'Works with studs, huggies and small details'],
              ['Gift-friendly', 'Safer than very bold jewellery'],
              ['Timeless', 'Less dependent on short-term trends'],
            ],
          },
          { type: 'paragraph', text: 'Cadenza S, Laluce and Amadea are the strongest IWantJewels directions for daily minimalist styling. Cadenza M works when the shopper wants a cleaner look with more visible sparkle.' },
        ],
      },
      { type: 'see-also', text: 'Can You Wear Lab-Grown Diamond Earrings Every Day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },

  // ── Section 3: Minimalist Formula ────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery Formula',
    content: [
      { type: 'paragraph', text: 'The easiest minimalist jewellery formula is:' },
      { type: 'paragraph', text: 'One sparkle point + one shape detail + one clean finish' },
      { type: 'paragraph', text: 'The sparkle point can be a diamond stud. The shape detail can be a huggie or hoop. The clean finish comes from keeping the rest of the jewellery simple.' },
      {
        type: 'table',
        headers: ['Styling Role', 'What It Does', 'Best IWJ Direction'],
        rows: [
          ['Sparkle point', 'Adds light close to the face', 'Cadenza S, Cadenza M'],
          ['Shape detail', 'Adds curve and structure', 'Amadea, Pave Hoops'],
          ['Soft detail', 'Adds quiet interest', 'Laluce'],
          ['Romantic detail', 'Adds meaning and softness', 'Farfalla, Alidi Farfalla'],
          ['Occasion movement', 'Adds gentle length', 'Orsola, Concetta Short'],
          ['Formal movement', 'Adds refined length', 'Concetta Long'],
          ['Minimal support', 'Balances a larger piece', 'Cadenza S, Laluce'],
        ],
      },
      { type: 'paragraph', text: 'For daily styling, keep the formula simple. For an event, use one slightly stronger piece and keep the rest clean.' },
    ],
  },

  // ── Section 4: Everyday Outfits ───────────────────────────────────────────────
  {
    heading: 'Minimalist Earrings for Everyday Outfits',
    content: [
      { type: 'paragraph', text: 'Everyday minimalist earrings should be easy to wear with casual outfits, workwear, simple dresses and travel looks.' },
      { type: 'paragraph', text: 'The safest starting point is a small diamond stud. If the shopper wants a more styled look, add a huggie. If they prefer quiet detail, choose a minimalist earring. If they want more visible sparkle without moving into statement styling, choose a medium stud.' },
      {
        type: 'table',
        headers: ['Everyday Outfit', 'Best Minimalist Earring Direction', 'Product Direction'],
        rows: [
          ['White shirt and jeans', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Blazer and trousers', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Knitwear', 'Studs or small hoops', 'Cadenza S, Pave Hoops'],
          ['Casual dress', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Travel outfit', 'Secure studs or huggies', 'Cadenza S, Amadea'],
          ['Neutral outfit', 'Minimalist earrings or medium studs', 'Laluce, Cadenza M'],
          ['Weekend outfit', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Simple dinner outfit', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Stud vs Huggie Earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },

  // ── Section 5: Workwear ───────────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery for Workwear',
    content: [
      { type: 'paragraph', text: 'Minimalist jewellery is one of the best choices for workwear because it looks polished without being distracting.' },
      { type: 'paragraph', text: 'For work, choose pieces that sit close to the ear and do not pull, move too much or clash with professional outfits. Studs, huggies and minimalist earrings are strongest. Hoops can work if they are refined. Drops are better for day-to-dinner styling rather than everyday office wear.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-103.jpg',
        content: [
          {
            type: 'table',
            headers: ['Workwear Look', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Classic office outfit', 'Small or medium studs', 'Cadenza S, Cadenza M'],
              ['Modern office styling', 'Huggies', 'Amadea'],
              ['Minimal workwear', 'Minimalist earrings', 'Laluce'],
              ['Creative office look', 'Hoops or huggies', 'Pave Hoops, Amadea'],
              ['Blazer outfit', 'Medium studs or huggies', 'Cadenza M, Amadea'],
              ['Work event', 'Medium studs or refined hoops', 'Cadenza M, Pave Hoops'],
              ['Day-to-dinner outfit', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Stud vs Hoop Earrings', href: '/resources/earring-style-guides/stud-vs-hoop-earrings' },
    ],
  },

  // ── Section 6: Black Dresses ──────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery for Black Dresses',
    content: [
      { type: 'paragraph', text: 'A black dress can carry bold jewellery, but minimalist jewellery can make it feel clean, refined and expensive.' },
      { type: 'paragraph', text: 'For a detailed black dress, minimalist jewellery is usually the better choice. For a simple black dress, minimalist jewellery works when the shopper wants understated elegance instead of party impact.' },
      {
        type: 'table',
        headers: ['Black Dress Style', 'Best Minimalist Jewellery Direction', 'Product Direction'],
        rows: [
          ['Simple black dress', 'Medium studs, hoops or soft drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Detailed black dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Black satin dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['High-neck black dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Black work event dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Minimal black dress', 'One clean focal piece', 'Cadenza M, Orsola, Pave Hoops'],
          ['Black dinner dress', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'What Jewellery to Wear with a Black Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },

  // ── Section 7: Satin Dresses ──────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery for Satin Dresses',
    content: [
      { type: 'paragraph', text: 'Satin already has shine, so minimalist jewellery works especially well when the dress should stay elegant.' },
      { type: 'paragraph', text: 'Medium studs add sparkle without adding too much movement. Drop earrings add polish when the dress is simple. Huggies and minimalist earrings work when the satin outfit is more casual or work-event focused.' },
      {
        type: 'table',
        headers: ['Satin Dress Style', 'Best Minimalist Jewellery Direction', 'Product Direction'],
        rows: [
          ['Satin slip dress', 'Drop earrings', 'Orsola'],
          ['Satin high-neck dress', 'Medium studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Champagne satin dress', 'Soft drops or studs', 'Orsola, Cadenza M'],
          ['Blush satin dress', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Black satin dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Green satin dress', 'Drops or hoops', 'Orsola, Pave Hoops'],
          ['Detailed satin dress', 'Studs or huggies', 'Cadenza M, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 8: Wedding Guest ──────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery for Wedding Guest Outfits',
    content: [
      { type: 'paragraph', text: 'Minimalist jewellery works beautifully for wedding guests because it keeps the look elegant and respectful.' },
      { type: 'paragraph', text: 'A wedding guest outfit should not look too bridal or overly heavy. Studs, soft drops, butterfly earrings and delicate huggies are usually safer than very dramatic jewellery, especially if the dress already has lace, satin, print, embroidery or a strong neckline.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-105.jpg',
        content: [
          {
            type: 'table',
            headers: ['Wedding Guest Look', 'Best Minimalist Jewellery Direction', 'Product Direction'],
            rows: [
              ['Simple wedding guest dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
              ['Detailed wedding guest dress', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Satin wedding guest dress', 'Drop earrings', 'Orsola'],
              ['Floral dress', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
              ['Champagne dress', 'Soft drops or medium studs', 'Concetta Short, Cadenza M'],
              ['Sage or mint dress', 'Butterfly earrings or delicate drops', 'Farfalla, Concetta Short'],
              ['Black wedding guest dress', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
              ['Bridesmaid styling', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 9: Parties and Dinners ────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery for Parties and Dinners',
    content: [
      { type: 'paragraph', text: 'Minimalist party jewellery should still feel special. The difference is that it uses cleaner pieces instead of heavy statement jewellery.' },
      { type: 'paragraph', text: 'Medium studs, hoops and elegant drops are the strongest choices. If the outfit already has sequins, satin, red fabric, black satin or a dramatic neckline, minimalist jewellery may look more polished than bold earrings.' },
      {
        type: 'table',
        headers: ['Party or Dinner Look', 'Best Minimalist Jewellery Direction', 'Product Direction'],
        rows: [
          ['Dinner outfit', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
          ['Cocktail dress', 'Hoops or medium studs', 'Pave Hoops, Cadenza M'],
          ['Black party dress', 'Hoops, studs or drops', 'Pave Hoops, Cadenza M, Orsola'],
          ['Red dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Green dress', 'Drops, hoops or medium studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Satin party dress', 'Drops or studs', 'Orsola, Cadenza M'],
          ['Detailed party outfit', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Minimal party outfit', 'Hoops or drops', 'Pave Hoops, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },

  // ── Section 10: Gifts ─────────────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery for Gifts',
    content: [
      { type: 'paragraph', text: 'Minimalist jewellery makes strong gifts because it is easier to wear than very bold or highly specific designs.' },
      { type: 'paragraph', text: 'If you are unsure of the recipient\'s exact style, studs are usually safest. Huggies are good for someone who likes modern jewellery. Minimalist earrings are best for someone with understated taste. Butterfly earrings are stronger when the gift should feel meaningful or romantic.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Minimalist Jewellery Direction', 'Product Direction'],
        rows: [
          ['Safest gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['First diamond gift', 'Small studs', 'Cadenza S'],
          ['Classic sparkle gift', 'Medium studs', 'Cadenza M'],
          ['Modern gift', 'Huggies', 'Amadea'],
          ['Quiet luxury gift', 'Minimalist earrings', 'Laluce'],
          ['Romantic gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Bridesmaid gift', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Birthday gift', 'Studs, butterfly earrings or huggies', 'Cadenza M, Farfalla, Amadea'],
          ['Anniversary gift', 'Drops or butterfly earrings', 'Orsola, Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },

  // ── Section 11: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'Minimalist Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Minimalist ear stacks should feel clean and intentional.' },
      { type: 'paragraph', text: 'Use one small sparkle point, one shape piece and one quiet detail. Keep the metal colour consistent if the shopper wants the stack to look polished.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-107.jpg',
        content: [
          {
            type: 'table',
            headers: ['Minimalist Ear Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
            rows: [
              ['Simple daily stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
              ['Soft minimal stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
              ['Polished workwear stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
              ['Quiet luxury stack', 'Medium stud', 'Minimal detail', 'Cadenza M + Laluce'],
              ['Romantic minimal stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
              ['Wedding minimal stack', 'Soft drop', 'Small stud', 'Concetta Short + Cadenza S'],
              ['Evening minimal stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
              ['Hoop minimal stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
            ],
          },
        ],
      },

      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Ear Stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },

  // ── Section 12: By Outfit Type ────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery by Outfit Type',
    content: [
      { type: 'paragraph', text: 'This section should help shoppers choose jewellery based on what they are wearing.' },
      {
        type: 'table',
        headers: ['Outfit Type', 'Best Minimalist Jewellery Direction', 'Product Direction'],
        rows: [
          ['White shirt and jeans', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Blazer outfit', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Black dress', 'Medium studs, hoops or soft drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Satin dress', 'Medium studs or drop earrings', 'Cadenza M, Orsola'],
          ['V-neck dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Sweetheart neckline', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Off-shoulder dress', 'Drops, hoops or studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Green dress', 'Drops, hoops or soft romantic earrings', 'Orsola, Pave Hoops, Farfalla'],
          ['Red dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Workwear', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Wedding guest outfit', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Travel outfit', 'Secure studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Red Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-red-dress' },
    ],
  },

  // ── Section 13: Metal Colour ──────────────────────────────────────────────────
  {
    heading: 'Minimalist Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour can change the feeling of minimalist jewellery.' },
      { type: 'paragraph', text: 'Yellow gold feels warm and classic. White or silver tone feels clean and modern. Rose gold feels soft and romantic. For minimalist styling, the easiest choice is usually the metal colour the shopper already wears most often.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-102.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Minimalist Styling Mood', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and polished', 'Everyday wear, black dresses, green dresses, gifts'],
              ['White or silver tone', 'Clean, bright and modern', 'Workwear, minimal outfits, cool wardrobes'],
              ['Rose gold', 'Soft, romantic and feminine', 'Gifts, blush outfits, pastel dresses, romantic styling'],
              ['Mixed metals', 'Creative and trend-led', 'Ear stacks and casual styling'],
            ],
          },
          { type: 'paragraph', text: 'For minimalist ear stacks, one metal colour is usually safest. A yellow gold stack feels warm, a white/silver-tone stack feels clean, and a rose gold stack feels soft.' },
        ],
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings' },
    ],
  },

  // ── Section 14: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Styling Need',
    content: [
      { type: 'subheading', text: 'For the Best Everyday Minimalist Start' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are subtle, easy to wear and strong as a first minimalist diamond earring.' },
      { type: 'subheading', text: 'For More Visible Minimalist Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They keep the clean stud shape while adding more presence.' },
      { type: 'subheading', text: 'For Quiet Minimalist Detail' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings. They are best for shoppers who want understated styling.' },
      { type: 'subheading', text: 'For Modern Minimalist Styling' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They add shape while staying close to the ear and easy to style.' },
      { type: 'subheading', text: 'For Minimalist Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Laluce or Amadea. This creates a clean stack without making the ear look crowded.' },
      { type: 'subheading', text: 'For Minimalist Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings, Concetta Short earrings or Cadenza M depending on the dress detail.' },
      { type: 'subheading', text: 'For Romantic Minimalist Styling' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. These work well for gifts, soft dresses and meaningful styling.' },
      { type: 'subheading', text: 'For Minimalist Party Styling' },
      { type: 'paragraph', text: 'Choose Cadenza M, Pave Hoops or Orsola. These add enough evening polish without becoming too bold.' },
    ],
  },

  // ── Section 15: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Minimalist Styling Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first minimalist piece', 'Small, subtle and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'Best visible minimalist sparkle', 'Classic shape with more presence'],
          ['Laluce minimalist diamond earrings', 'Best quiet detail', 'Soft, understated and easy to style'],
          ['Amadea Huggie earrings', 'Best modern minimalist shape', 'Strong for daily wear and ear stacks'],
          ['Pave Hoops', 'Best minimal hoop direction', 'Adds shape while staying wearable'],
          ['Orsola drop earrings', 'Best minimalist occasion movement', 'Adds elegance for dinners and weddings'],
          ['Concetta Short earrings', 'Best delicate occasion piece', 'Good for bridesmaids and soft styling'],
          ['Concetta Long earrings', 'Best formal minimal line', 'Refined and evening-ready'],
          ['Farfalla butterfly earrings', 'Best romantic minimalist piece', 'Adds meaning without feeling heavy'],
          ['Alidi Farfalla butterfly earrings', 'Best gift-led romantic piece', 'Strong for birthdays and anniversaries'],
          ['Lusso bold statement earrings', 'Not minimalist, but useful contrast', 'Best only when the outfit needs one bold focal point'],
        ],
      },
      { type: 'paragraph', text: 'Minimalist jewellery should be easy to wear, easy to repeat and easy to style. Start with Cadenza S for subtle sparkle, Cadenza M for classic polish, Laluce for quiet detail, Amadea for modern shape and Orsola for soft occasion movement.' },
    ],
  },

  // ── Section 16: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Minimalist Styling Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is thinking minimalist jewellery has to be invisible. Minimalist jewellery can still sparkle and frame the face; it simply does not overpower the outfit.' },
      { type: 'paragraph', text: 'Another mistake is choosing pieces that are too tiny for the outfit. If the dress is dark, satin or visually strong, very small earrings may disappear.' },
      { type: 'paragraph', text: 'A third mistake is wearing too many small pieces without structure. Even minimalist jewellery can look crowded if there is no main piece or clear balance.' },
      { type: 'paragraph', text: 'Another mistake is mixing metals without intention. Mixed metals can look stylish, but one metal colour is usually easier for a polished minimalist look.' },
      { type: 'paragraph', text: 'A fifth mistake is using minimalist jewellery only for casual wear. Minimalist studs, drops and huggies can also work beautifully for weddings, dinners and parties.' },
      { type: 'paragraph', text: 'Finally, do not choose jewellery only because it is simple. It should still suit the outfit, neckline, hairstyle, occasion and wearer\'s personal style.' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 17: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Minimalist Jewellery Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing minimalist jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the outfit casual, workwear, wedding guest, dinner or party?',
          'Do I want sparkle, shape, movement or softness?',
          'Should the earrings or necklace be the main jewellery moment?',
          'Will my hairstyle show the earrings?',
          'Is the outfit simple or detailed?',
          'Does the metal colour match my usual jewellery?',
          'Can the piece be worn with more than one outfit?',
          'Is the jewellery comfortable enough for long wear?',
          'Can the earrings be used in an ear stack?',
          'Are the materials clearly explained?',
          'Is the design simple but still special?',
          'Will this jewellery still feel wearable after one season?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with small lab-grown diamond studs or huggies. They are the easiest minimalist jewellery pieces to wear often.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What is minimalist jewellery?', answer: 'Minimalist jewellery is simple, clean and wearable jewellery designed to add polish without overpowering the outfit. It can include studs, huggies, small hoops, minimalist earrings and delicate drops.' },
  { question: 'How do you style minimalist jewellery?', answer: 'Style minimalist jewellery by choosing one sparkle point, one shape detail and one clean finish. Keep the pieces balanced and avoid overcrowding the look.' },
  { question: 'Is minimalist jewellery good for everyday wear?', answer: 'Yes, minimalist jewellery is excellent for everyday wear because it works with many outfits and feels comfortable for regular use.' },
  { question: 'What earrings are best for minimalist styling?', answer: 'Small diamond studs, medium studs, huggies, minimalist earrings and soft drops are best for minimalist styling.' },
  { question: 'Can minimalist jewellery be worn to weddings?', answer: 'Yes, minimalist jewellery works beautifully for wedding guests, especially when the outfit already has lace, satin, embroidery or a strong neckline.' },
  { question: 'Can minimalist jewellery be worn to parties?', answer: 'Yes, minimalist jewellery can work for parties when you choose pieces with enough polish, such as medium studs, hoops or elegant drop earrings.' },
  { question: 'Is minimalist jewellery good for work?', answer: 'Yes, minimalist jewellery is ideal for work because it adds polish without being distracting.' },
  { question: 'What minimalist jewellery is best for gifts?', answer: 'Studs, huggies and minimalist diamond earrings are the safest gift choices because they are easy to wear and less risky than bold jewellery.' },
  { question: 'Can you build an ear stack with minimalist jewellery?', answer: 'Yes, minimalist jewellery is perfect for ear stacks. A small stud with a huggie or minimalist earring creates a clean everyday stack.' },
  { question: 'What IWantJewels products are best for minimalist styling?', answer: 'Cadenza S, Cadenza M, Laluce, Amadea Huggie, Pave Hoops, Orsola, Concetta Short and Farfalla are strong options depending on whether the look is everyday, workwear, wedding guest, romantic or party-focused.' },
]

const cta: V2CTABlock = {
  heading: 'Minimalist jewellery should feel simple, polished and easy to wear often. Choose studs for clean sparkle, huggies for modern shape, minimalist earrings for quiet detail, hoops for soft structure and drop earrings for elegant movement.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want minimalist jewellery with real diamond sparkle. Choose Cadenza S for subtle everyday shine, Cadenza M for classic polish, Laluce for quiet styling, Amadea for huggies, Pave Hoops for shape and Orsola for soft occasion movement.',
  primaryLabel: 'Shop Minimalist Jewellery',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Minimalist Earrings Guide',
  tertiaryHref: '/resources/earring-style-guides/minimalist-earrings-guide',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'minimalist-jewellery-styling-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'minimalist-jewellery-styling-guide', 3)
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
