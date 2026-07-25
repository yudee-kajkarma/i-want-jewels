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
  title: 'What Jewellery to Wear with a V Neck Dress',
  description:
    'Choose jewellery for a V neck dress with earrings, necklaces, diamonds, gold, party looks, weddings and evening styling ideas.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/earring-style-guides/what-jewellery-to-wear-with-a-v-neck-dress',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/earring-style-guides/what-jewellery-to-wear-with-a-v-neck-dress',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-85.jpg',
  title: 'What Jewellery to Wear with a V-Neck Dress:',
  subtitle: 'Earrings, Necklaces & Styling Guide',
  paragraphs: [
    'A V-neck dress naturally draws the eye downward, so the jewellery should either follow that shape or balance it around the face. The easiest styling choice is usually drop earrings, medium diamond studs or a delicate necklace, depending on how deep the neckline is and how detailed the dress already looks.',
    'If the V-neck dress is simple, you can choose stronger earrings such as Orsola drop earrings, Concetta Long earrings, Pave Hoops or Lusso bold statement earrings. If the dress has lace, sequins, prints or heavy detail, cleaner earrings such as Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs or Amadea Huggie earrings will usually look more polished.',
    'This resource helps shoppers choose jewellery for V-neck dresses by neckline depth, dress colour, fabric, occasion and hairstyle. It also connects each styling direction to IWantJewels products such as Orsola, Concetta Long, Cadenza M, Cadenza S, Pave Hoops, Lusso, Farfalla, Alidi Farfalla, Concetta Short, Amadea and Laluce.',
  ],
  shopLabel: 'Shop Earrings for V-Neck Dresses',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery for V-neck dresses.',
    'Decide between earrings, necklace or both.',
    'Match earrings to deep V-neck, soft V-neck, wrap dresses and satin V-neck dresses.',
    'Style V-neck dresses for weddings, parties, dinners, birthdays and formal events.',
    'Choose jewellery based on hairstyle and dress detail.',
    'Decide whether gold, white/silver tone or rose gold works best.',
    'Build V-neck dress ear stack combinations.',
    'Find IWantJewels product recommendations by outfit and occasion.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-87.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'V-Neck Dress Jewellery Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main styling decision tool.' },
      {
        type: 'table',
        headers: ['V-Neck Dress Style', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Simple V-neck dress', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Deep V-neck dress', 'Drop earrings or delicate necklace with studs', 'Orsola, Cadenza M'],
          ['Soft V-neck dress', 'Medium studs, soft drops or butterfly earrings', 'Cadenza M, Concetta Short, Farfalla'],
          ['Satin V-neck dress', 'Drop earrings or visible studs', 'Orsola, Cadenza M'],
          ['Black V-neck dress', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Detailed V-neck dress', 'Studs or clean huggies', 'Cadenza M, Cadenza S, Amadea'],
          ['Wedding guest V-neck dress', 'Drops, studs or romantic earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Party V-neck dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Minimal V-neck dress', 'One clear jewellery focal point', 'Orsola, Lusso, Cadenza M'],
          ['V-neck ear stack', 'Main earring + small support', 'Orsola + Cadenza S, Cadenza M + Amadea'],
        ],
      },
    ],
  },

  // ── Section 1: Why V-Neck Needs Balanced Jewellery ───────────────────────────
  {
    heading: 'Why V-Neck Dresses Need Balanced Jewellery',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-89.jpg',
        content: [
          {
            type: 'paragraph',
            text: 'A V-neck dress already creates a strong shape on the body. The jewellery should support that shape rather than fight it.',
          },
          {
            type: 'paragraph',
            text: 'If the neckline is open and simple, drop earrings can echo the vertical line of the V-neck beautifully. If the neckline is deep, you may want either earrings that frame the face or a delicate necklace that follows the neckline. If the dress is detailed, clean studs or huggies will usually look more refined.',
          },
          {
            type: 'paragraph',
            text: 'The main rule is simple: do not overcrowd the neckline and the ears at the same time. If the earrings are bold, keep the necklace minimal or skip it. If the necklace is the focal point, choose cleaner earrings.',
          },
          { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
        ],
      },
    ],
  },

  // ── Section 2: Best Earrings for V-Neck ──────────────────────────────────────
  {
    heading: 'Best Earrings for a V-Neck Dress',
    content: [
      {
        type: 'paragraph',
        text: 'The best earrings for a V-neck dress are usually drop earrings, medium studs, hoops or bold statement earrings, depending on how simple the dress is.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings are the easiest match because they follow the vertical feeling of the neckline. Medium studs are better when the dress already has detail. Hoops work well when the outfit needs shape instead of length. Bold statement earrings work best when the V-neck dress is simple and the earrings should lead the look.',
      },
      {
        type: 'table',
        headers: ['Styling Goal', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Elegant movement', 'Drop earrings', 'Orsola'],
          ['Formal long line', 'Longer drops', 'Concetta Long'],
          ['Classic sparkle', 'Medium studs', 'Cadenza M'],
          ['Subtle support', 'Small studs', 'Cadenza S'],
          ['Modern shape', 'Hoops', 'Pave Hoops'],
          ['Strong party look', 'Bold statement earrings', 'Lusso'],
          ['Romantic softness', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Minimal stack', 'Stud + huggie', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'divider' },
    ],
  },

  // ── Section 3: Necklace or Earrings ──────────────────────────────────────────
  {
    heading: 'Necklace or Earrings with a V-Neck Dress?',
    content: [
      {
        type: 'paragraph',
        text: 'A V-neck dress can work with earrings, a necklace or both, but the balance matters.',
      },
      {
        type: 'paragraph',
        text: 'If you choose long drop earrings or bold statement earrings, the necklace should usually be very delicate or skipped. If you choose small studs, a necklace can become the main piece. If the dress has a deep V-neck, a delicate pendant can follow the neckline nicely, but the earrings should stay cleaner.',
      },
      {
        type: 'table',
        headers: ['Jewellery Choice', 'Best When', 'Product Direction'],
        rows: [
          ['Drop earrings only', 'Dress is simple or neckline is open', 'Orsola, Concetta Long'],
          ['Bold earrings only', 'Dress is minimal and party-ready', 'Lusso'],
          ['Medium studs + delicate necklace', 'Neckline needs a necklace focal point', 'Cadenza M'],
          ['Small studs + pendant', 'Deep V-neck or simple dress', 'Cadenza S'],
          ['Hoops + no necklace', 'Modern V-neck outfit', 'Pave Hoops'],
          ['Butterfly earrings + delicate necklace', 'Romantic V-neck look', 'Farfalla, Alidi Farfalla'],
          ['Huggies + necklace', 'Workwear or casual V-neck styling', 'Amadea'],
        ],
      },
      { type: 'see-also', text: 'Minimalist Earrings Guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },

  // ── Section 4: Deep V-Neck ────────────────────────────────────────────────────
  {
    heading: 'Jewellery for Deep V-Neck Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A deep V-neck dress creates more open space around the neckline, so jewellery should be chosen carefully.',
      },
      {
        type: 'paragraph',
        text: 'You can either keep the neckline clean and let the earrings frame the face, or add a delicate necklace that follows the V shape. Avoid wearing very heavy earrings and a heavy necklace together because both will compete for attention.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Deep V-Neck Styling Goal', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Elegant evening look', 'Drop earrings, no heavy necklace', 'Orsola'],
              ['Formal long line', 'Long drops', 'Concetta Long'],
              ['Classic sparkle', 'Medium studs + delicate necklace', 'Cadenza M'],
              ['Simple party look', 'Bold earrings, no necklace', 'Lusso'],
              ['Romantic look', 'Soft drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Minimal look', 'Small studs + fine necklace', 'Cadenza S'],
              ['Ear stack look', 'Drop + small stud', 'Orsola + Cadenza S'],
            ],
          },
        ],
      },
    ],
  },

  // ── Section 5: Soft V-Neck ────────────────────────────────────────────────────
  {
    heading: 'Jewellery for Soft V-Neck Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A soft V-neck dress is easier to style than a deep V-neck because the neckline is less dramatic.',
      },
      {
        type: 'paragraph',
        text: 'Medium studs, soft drops, butterfly earrings and small hoops all work well. If the dress feels romantic, choose butterfly earrings or delicate drops. If it feels modern, choose hoops or huggies. If it feels classic, choose diamond studs.',
      },
      {
        type: 'table',
        headers: ['Soft V-Neck Dress Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Everyday soft V-neck', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Romantic soft V-neck', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Wedding guest soft V-neck', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Party soft V-neck', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Minimal soft V-neck', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Gift-friendly soft look', 'Medium studs or butterfly earrings', 'Cadenza M, Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Wedding Guest Jewellery Guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 6: Satin V-Neck ───────────────────────────────────────────────────
  {
    heading: 'Jewellery for Satin V-Neck Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Satin V-neck dresses need jewellery that adds polish without creating too much shine.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings are usually the strongest choice because they add movement and match the softness of satin. Medium studs are safer if the satin dress already has strong colour, draping or detail. Hoops work well for a modern satin V-neck dress, while bold statement earrings work best with a very simple satin dress.',
      },
      {
        type: 'table',
        headers: ['Satin V-Neck Dress Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Satin slip dress', 'Drop earrings', 'Orsola'],
          ['Black satin V-neck dress', 'Drops, medium studs or bold earrings', 'Orsola, Cadenza M, Lusso'],
          ['Champagne satin V-neck', 'Gold drops or soft studs', 'Orsola, Cadenza M'],
          ['Blush satin V-neck', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Green satin V-neck', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Red satin V-neck', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Minimal satin V-neck', 'One focal earring', 'Orsola, Lusso'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 7: Black V-Neck ───────────────────────────────────────────────────
  {
    heading: 'Jewellery for Black V-Neck Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A black V-neck dress gives jewellery a strong background. Diamonds, gold and bold earrings all show well against black.',
      },
      {
        type: 'paragraph',
        text: 'If the dress is simple, choose Lusso, Orsola or Pave Hoops. If the dress has lace, sequins or neckline detail, choose Cadenza M, Cadenza S or Amadea. If the black V-neck dress is formal, Concetta Long can create a refined longer line.',
      },
      {
        type: 'table',
        headers: ['Black V-Neck Dress Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Simple black V-neck', 'Bold earrings or drops', 'Lusso, Orsola'],
          ['Black satin V-neck', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Black party V-neck', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
          ['Black wedding guest V-neck', 'Drops or studs', 'Orsola, Cadenza M'],
          ['Detailed black V-neck', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Formal black V-neck', 'Long drops or classic studs', 'Concetta Long, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'What Jewellery to Wear with a Black Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },

  // ── Section 8: Wedding Guest V-Neck ──────────────────────────────────────────
  {
    heading: 'Jewellery for Wedding Guest V-Neck Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A wedding guest V-neck dress should feel elegant, not overcrowded.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings work beautifully because they frame the face and match the vertical line of the neckline. Medium studs are better if the dress already has lace, embroidery, florals or a strong print. Butterfly earrings work well for softer romantic wedding guest looks.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Wedding Guest V-Neck Style', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Simple wedding guest V-neck', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Satin wedding guest V-neck', 'Drop earrings', 'Orsola'],
              ['Floral V-neck dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
              ['Lace V-neck dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
              ['Champagne V-neck dress', 'Gold drops or studs', 'Orsola, Cadenza M'],
              ['Pastel V-neck dress', 'Butterfly earrings or soft drops', 'Alidi Farfalla, Concetta Short'],
              ['Black wedding guest V-neck', 'Drops or studs', 'Orsola, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 9: Party V-Neck ───────────────────────────────────────────────────
  {
    heading: 'Jewellery for Party V-Neck Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Party V-neck dresses can carry more sparkle, especially if the dress is simple.',
      },
      {
        type: 'paragraph',
        text: 'Choose Lusso if the earrings should become the main feature. Choose Orsola if you want movement and elegance. Choose Pave Hoops if you want shape and shine. Choose Cadenza M if the dress already has detail and needs clean sparkle.',
      },
      {
        type: 'table',
        headers: ['Party V-Neck Dress Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Simple party V-neck', 'Bold earrings', 'Lusso'],
          ['Satin party V-neck', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Black party V-neck', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Sequin V-neck', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Cocktail V-neck', 'Hoops, drops or medium studs', 'Pave Hoops, Orsola, Cadenza M'],
          ['Birthday V-neck dress', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Bold Statement Earrings Guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
    ],
  },

  // ── Section 10: By Hairstyle ──────────────────────────────────────────────────
  {
    heading: 'Jewellery for V-Neck Dresses by Hairstyle',
    content: [
      {
        type: 'paragraph',
        text: 'Hairstyle changes how visible the jewellery looks.',
      },
      {
        type: 'paragraph',
        text: 'If hair is down, very small earrings can disappear. Medium studs, hoops and drops usually show better. If hair is pulled back, drop earrings and bold earrings become stronger because they frame the face more clearly.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-95.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Hair down', 'Medium studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
              ['Soft waves', 'Drops, butterfly earrings or visible studs', 'Orsola, Farfalla, Cadenza M'],
              ['Sleek ponytail', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Low bun', 'Drops or bold earrings', 'Orsola, Lusso'],
              ['High bun', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Half-up hair', 'Studs, huggies or soft drops', 'Cadenza M, Amadea, Concetta Short'],
              ['Short hair', 'Studs, hoops or bold earrings', 'Cadenza M, Pave Hoops, Lusso'],
            ],
          },
        ],
      },
    ],
  },

  // ── Section 11: Metal Colour ──────────────────────────────────────────────────
  {
    heading: 'Gold vs Silver vs Rose Gold with V-Neck Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Metal colour changes the feeling of a V-neck dress.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold adds warmth and works beautifully with black, champagne, green, red, cream and warm-toned V-neck dresses. White or silver tone feels clean and modern, especially with navy, black, grey, silver and cool-toned dresses. Rose gold feels soft and romantic, especially with blush, pink, champagne and pastel V-neck dresses.',
      },
      {
        type: 'table',
        headers: ['Metal Colour', 'Feeling with V-Neck Dresses', 'Best Dress Colours'],
        rows: [
          ['Yellow gold', 'Warm, classic and polished', 'Black, champagne, green, red, cream'],
          ['White or silver tone', 'Clean, bright and modern', 'Navy, black, grey, silver, cool pastels'],
          ['Rose gold', 'Soft, romantic and feminine', 'Blush, pink, champagne, soft green'],
          ['Mixed metals', 'Creative and modern', 'Minimal V-neck outfits and ear stacks'],
        ],
      },
      { type: 'paragraph', text: 'For gifts, choose the metal colour the wearer already owns and wears most often.' },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },

  // ── Section 12: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'V-Neck Dress Ear Stack Ideas',
    content: [
      {
        type: 'paragraph',
        text: 'A V-neck dress works well with ear stacks when the stack has one clear main piece.',
      },
      {
        type: 'paragraph',
        text: 'If the main earring is a drop, bold earring or hoop, keep the support earring small. If the main earring is a medium stud, you can add a huggie or minimalist earring.',
      },
      {
        type: 'table',
        headers: ['V-Neck Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Elegant V-neck stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Bold V-neck stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Modern V-neck stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Classic V-neck stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
          ['Minimal V-neck stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic V-neck stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Formal V-neck stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },

  // ── Section 13: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by V-Neck Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest V-Neck Dress Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They add visible sparkle without making the neckline feel busy.' },
      { type: 'subheading', text: 'For Elegant Movement' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They follow the vertical feeling of a V-neck dress and work beautifully for satin, black, wedding guest and evening looks.' },
      { type: 'subheading', text: 'For Formal V-Neck Styling' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings. They create a refined longer line that works well with formal V-neck dresses and evening events.' },
      { type: 'subheading', text: 'For Soft Romantic V-Neck Styling' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings, Alidi Farfalla butterfly earrings or Concetta Short earrings. These are best for blush, champagne, floral, pastel or romantic V-neck dresses.' },
      { type: 'subheading', text: 'For Modern V-Neck Shape' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They work well with V-neck jumpsuits, black V-neck dresses, high-shine outfits and party looks.' },
      { type: 'subheading', text: 'For Bold V-Neck Party Looks' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the V-neck dress is simple and the earrings should lead.' },
    ],
  },

  // ── Section 14: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best V-Neck Dress Role', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Best overall V-neck earring', 'Adds movement and follows the neckline direction'],
          ['Cadenza M diamond stud earrings', 'Safest sparkle option', 'Works when the neckline or dress already has detail'],
          ['Cadenza S lab-grown diamond studs', 'Support piece', 'Balances drops, hoops and bold earrings'],
          ['Concetta Long earrings', 'Formal V-neck styling', 'Creates a refined long line'],
          ['Concetta Short earrings', 'Soft V-neck styling', 'Good for romantic and delicate looks'],
          ['Pave Hoops', 'Modern V-neck shape', 'Adds curve and visible shine'],
          ['Lusso bold statement earrings', 'Strongest party V-neck option', 'Best with simple V-neck dresses'],
          ['Farfalla butterfly earrings', 'Romantic V-neck styling', 'Adds softness and meaning'],
          ['Alidi Farfalla butterfly earrings', 'Gift-led romantic styling', 'Strong for birthdays and soft V-neck looks'],
          ['Amadea Huggie earrings', 'Modern support piece', 'Works with V-neck work events and ear stacks'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Useful with detailed V-neck outfits'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Choose V-neck dress jewellery by balance. Pick Orsola for movement, Cadenza M for clean sparkle, Concetta Long for formal styling, Pave Hoops for modern shape, Lusso for bold party styling and Farfalla or Concetta Short for softer romantic looks.',
      },
    ],
  },

  // ── Section 15: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common V-Neck Jewellery Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is wearing a heavy necklace with long or bold earrings. A V-neck dress can carry jewellery well, but the neckline and earrings should not compete.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the depth of the V-neck. A deep V-neck often needs cleaner jewellery than a soft V-neck because the neckline already creates drama.' },
      { type: 'paragraph', text: 'A third mistake is choosing earrings that are too tiny for a party V-neck dress. If hair is down or the dress has strong fabric, very small earrings may disappear.' },
      { type: 'paragraph', text: 'Another mistake is wearing bold earrings with a very detailed V-neck dress. In that case, studs or huggies may look more polished.' },
      { type: 'paragraph', text: 'Finally, do not choose jewellery only by sparkle. Think about neckline depth, fabric, hairstyle, occasion, metal colour and comfort.' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 16: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final V-Neck Jewellery Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing jewellery for a V-neck dress, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the V-neck deep or soft?',
          'Is the dress simple or detailed?',
          'Is the fabric satin, lace, sequin, knit or plain?',
          'Will my hair hide or show the earrings?',
          'Do I want sparkle, movement, shape or softness?',
          'Should the earrings or necklace be the main jewellery moment?',
          'Am I wearing a necklace, or should I skip it?',
          'Does the metal colour work with the dress colour?',
          'Is the occasion a wedding, party, dinner or formal event?',
          'Are the earrings comfortable for the full event?',
          'Is the ear stack balanced with one main piece?',
          'Can the jewellery be worn again with other outfits?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose drop earrings for a simple V-neck dress and medium studs for a detailed V-neck dress.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What jewellery should I wear with a V-neck dress?',
    answer: 'The best jewellery for a V-neck dress depends on the neckline depth and dress detail. Drop earrings work well with simple V-neck dresses, while medium studs are better for detailed V-neck outfits.',
  },
  {
    question: 'What earrings look best with a V-neck dress?',
    answer: 'Drop earrings, medium diamond studs, hoops and soft butterfly earrings can all work with a V-neck dress. Choose based on neckline, hairstyle and occasion.',
  },
  {
    question: 'Should I wear a necklace with a V-neck dress?',
    answer: 'A delicate necklace can work well with a V-neck dress, especially if the earrings are simple. If the earrings are bold or long, skip the necklace or keep it very minimal.',
  },
  {
    question: 'What jewellery should I wear with a deep V-neck dress?',
    answer: 'For a deep V-neck dress, choose drop earrings with no heavy necklace, or medium studs with a delicate pendant. Avoid wearing too many strong jewellery pieces at once.',
  },
  {
    question: 'What earrings should I wear with a satin V-neck dress?',
    answer: 'Drop earrings or medium diamond studs work well with satin V-neck dresses. Drops add movement, while studs keep the styling clean.',
  },
  {
    question: 'What jewellery should I wear with a black V-neck dress?',
    answer: 'A black V-neck dress works well with Orsola drop earrings, Cadenza M diamond studs, Pave Hoops or Lusso bold statement earrings depending on how simple the dress is.',
  },
  {
    question: 'Can I wear hoop earrings with a V-neck dress?',
    answer: 'Yes, hoops work well with V-neck dresses when you want modern shape instead of long movement.',
  },
  {
    question: 'Can wedding guests wear drop earrings with a V-neck dress?',
    answer: 'Yes, drop earrings are one of the best choices for wedding guest V-neck dresses because they frame the face and follow the neckline direction.',
  },
  {
    question: 'What metal colour works best with a V-neck dress?',
    answer: 'Yellow gold feels warm and classic, white or silver tone feels clean and modern, and rose gold feels soft and romantic. Choose based on the dress colour and your usual jewellery.',
  },
  {
    question: 'What IWantJewels earrings are best with a V-neck dress?',
    answer: 'Orsola, Cadenza M, Concetta Long, Pave Hoops, Lusso, Farfalla and Concetta Short are strong V-neck dress options depending on whether you want movement, sparkle, shape, boldness or softness.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'A V-neck dress already creates a natural line, so the jewellery should support that shape. Choose drop earrings when the dress is simple, medium studs when the dress has detail, hoops when you want modern shape, and bold earrings when the V-neck outfit is clean enough to let the jewellery lead.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want V-neck dress jewellery with real diamond sparkle. Choose Orsola for elegant movement, Cadenza M for clean sparkle, Concetta Long for formal styling, Pave Hoops for shape, Lusso for bold party styling and Farfalla or Concetta Short for softer romantic looks.',
  primaryLabel: 'Shop Earrings for V-Neck Dresses',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Drop Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Party Earrings Guide',
  tertiaryHref: '/resources/earring-style-guides/party-earrings-guide',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'what-jewellery-to-wear-with-a-v-neck-dress')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'what-jewellery-to-wear-with-a-v-neck-dress', 3)
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
