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
  title: 'What Earrings to Wear as a Wedding Guest',
  description:
    'Choose earrings to wear as a wedding guest with lab grown diamond studs, drops, hoops, butterfly earrings and styling ideas for every dress.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-105.jpg',
  title: 'What Earrings to Wear as a Wedding Guest:',
  subtitle: 'Dress, Neckline & Styling Guide',
  paragraphs: [
    'Choosing earrings as a wedding guest is about balance. The earrings should make the outfit feel polished, but they should not overpower the dress or look too bridal. The best choice depends on the dress colour, fabric, neckline, hairstyle and how formal the wedding feels.',
    'Drop earrings are usually best when the outfit needs movement and elegance. Diamond studs are safest when the dress already has detail. Butterfly earrings work beautifully with romantic, floral, blush, sage, mint and pastel outfits. Hoops suit modern wedding guest looks, simple dresses and jumpsuits. Huggies and minimalist earrings are ideal when the outfit is detailed or understated.',
    'At IWantJewels, Orsola drop earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Concetta Short earrings, Concetta Long earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Pave Hoops, Amadea Huggie earrings, Laluce minimalist diamond earrings and Lusso bold statement earrings all work for different wedding guest earring needs.',
  ],
  shopLabel: 'Shop Wedding Guest Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose earrings to wear as a wedding guest.',
    'Decide between studs, drops, hoops, butterfly earrings, huggies and minimalist earrings.',
    'Match earrings to satin, lace, floral, black, green, red, champagne, blush and pastel dresses.',
    'Choose earrings by neckline, hairstyle, dress code and season.',
    'Understand when earrings should be simple or more visible.',
    'Build wedding guest ear stack ideas.',
    'Choose earring metal colour for wedding outfits.',
    'Find IWantJewels product recommendations by dress type and event style.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-107.jpg',
}

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'Wedding Guest Earring Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main decision tool.' },
      {
        type: 'table',
        headers: ['Wedding Guest Need', 'Best Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest wedding guest earrings', 'Medium diamond studs', 'Cadenza M'],
          ['Minimal wedding guest earrings', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Elegant wedding guest earrings', 'Drop earrings', 'Orsola'],
          ['Soft romantic earrings', 'Butterfly earrings or short drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Formal wedding guest earrings', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Modern wedding guest earrings', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Satin dress earrings', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Floral dress earrings', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Black dress earrings', 'Drops, studs, hoops or bold earrings', 'Orsola, Cadenza M, Pave Hoops, Lusso'],
          ['Green dress earrings', 'Gold drops, hoops or studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Red dress earrings', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Champagne or blush dress earrings', 'Soft drops, butterfly earrings or studs', 'Concetta Short, Farfalla, Cadenza M'],
          ['Wedding guest ear stack', 'Drop + small stud or stud + huggie', 'Orsola + Cadenza S, Cadenza S + Amadea'],
        ],
      },
    ],
  },

  // ── Section 1: How to Choose ──────────────────────────────────────────────────
  {
    heading: 'How to Choose Earrings as a Wedding Guest',
    content: [
      { type: 'paragraph', text: 'The easiest way to choose wedding guest earrings is to start with the dress, not the jewellery. The dress decides how much sparkle, length, shape or softness the earrings should have.' },
      { type: 'paragraph', text: 'If the dress is simple, earrings can be more visible. If the dress has lace, sequins, embroidery, print or dramatic draping, the earrings should usually be cleaner. If the neckline is open, drop earrings can frame the face beautifully. If the neckline is high, studs, huggies or hoops often look better.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-45.jpg',
        content: [
          {
            type: 'table',
            headers: ['What to Check First', 'Why It Matters'],
            rows: [
              ['Dress colour', 'Helps choose gold, white/silver tone or rose gold'],
              ['Dress fabric', 'Satin, lace, floral and sequins need different earring balance'],
              ['Dress neckline', 'Decides if drops, studs or hoops look best'],
              ['Hairstyle', 'Earrings need to be visible'],
              ['Wedding formality', 'Formal weddings can carry more polished earrings'],
              ['Comfort', 'Wedding events often last for hours'],
              ['Necklace choice', 'Earrings and necklace should not compete'],
              ['Rewear value', 'Good earrings should work after the wedding too'],
            ],
          },
          { type: 'paragraph', text: 'For IWantJewels, the best wedding guest pathway is to guide shoppers from dress type to earring type, then from earring type to product.' },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 2: Best Earrings for Wedding Guests ───────────────────────────────
  {
    heading: 'Best Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'The best earrings for wedding guests are usually diamond studs, drop earrings, butterfly earrings, refined hoops, huggies or minimalist earrings.' },
      { type: 'paragraph', text: 'Studs are safest. Drops are most elegant. Butterfly earrings are most romantic. Hoops are modern. Huggies are understated. Minimalist earrings are best when the dress already has detail.' },
      {
        type: 'table',
        headers: ['Earring Type', 'Best Wedding Guest Use', 'IWJ Product Direction'],
        rows: [
          ['Medium studs', 'Safe sparkle for most dresses', 'Cadenza M'],
          ['Small studs', 'Minimal looks and ear stack support', 'Cadenza S'],
          ['Drop earrings', 'Satin dresses, open necklines and elegant outfits', 'Orsola'],
          ['Short drops', 'Soft and delicate wedding guest styling', 'Concetta Short'],
          ['Long drops', 'Formal wedding guest outfits', 'Concetta Long'],
          ['Butterfly earrings', 'Romantic, floral, blush, sage and pastel dresses', 'Farfalla, Alidi Farfalla'],
          ['Hoops', 'Modern dresses, jumpsuits and simple outfits', 'Pave Hoops'],
          ['Huggies', 'Detailed outfits and understated styling', 'Amadea'],
          ['Minimalist earrings', 'Quiet detail and clean styling', 'Laluce'],
          ['Bold earrings', 'Simple evening dresses only', 'Lusso'],
        ],
      },
      { type: 'divider' },
    ],
  },

  // ── Section 3: Studs ──────────────────────────────────────────────────────────
  {
    heading: 'Stud Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Stud earrings are the safest wedding guest choice because they add sparkle without competing with the dress.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are best when the outfit needs visible polish. Cadenza S lab-grown diamond studs are better for minimal outfits, second piercings or ear stack support. Studs are especially useful when the dress has lace, sequins, embroidery, floral prints, a high neckline or strong colour.' },
      {
        type: 'table',
        headers: ['Wedding Guest Stud Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Safest wedding guest sparkle', 'Cadenza M', 'Polished but not overpowering'],
          ['Minimal wedding guest look', 'Cadenza S', 'Subtle and clean'],
          ['Detailed dress styling', 'Cadenza M or Cadenza S', 'Keeps the outfit balanced'],
          ['Ear stack support', 'Cadenza S', 'Works with drops, hoops and butterfly earrings'],
          ['Formal but simple look', 'Cadenza M', 'Classic and elegant'],
          ['Work-to-wedding styling', 'Cadenza M', 'Easy to wear before and after the event'],
          ['Giftable wedding guest earrings', 'Cadenza M', 'Safe and reusable'],
        ],
      },
      { type: 'see-also', text: 'Can You Wear Lab-Grown Diamond Earrings Every Day?', href: '/resources/earring-style-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },

  // ── Section 4: Drop Earrings ──────────────────────────────────────────────────
  {
    heading: 'Drop Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Drop earrings are one of the strongest choices for wedding guests because they add movement and elegance near the face.' },
      { type: 'paragraph', text: 'Orsola is the strongest all-round wedding guest drop earring. Concetta Short is better for softer outfits and delicate styling. Concetta Long is better for formal evening weddings, black-tie outfits and long dresses.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-41.jpg',
        content: [
          {
            type: 'table',
            headers: ['Wedding Guest Drop Need', 'Best Drop Direction', 'Product Direction'],
            rows: [
              ['Best all-round wedding guest drop', 'Medium drop', 'Orsola'],
              ['Soft wedding guest styling', 'Short drop', 'Concetta Short'],
              ['Formal evening wedding', 'Long drop', 'Concetta Long'],
              ['Satin dress styling', 'Medium drop', 'Orsola'],
              ['V-neck dress styling', 'Drop earrings', 'Orsola'],
              ['Off-shoulder dress styling', 'Drop earrings', 'Orsola'],
              ['Champagne dress styling', 'Soft drops or medium drops', 'Concetta Short, Orsola'],
              ['Black dress styling', 'Drops or long drops', 'Orsola, Concetta Long'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 5: Butterfly Earrings ─────────────────────────────────────────────
  {
    heading: 'Butterfly Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are a beautiful wedding guest choice when the outfit feels soft, romantic or feminine.' },
      { type: 'paragraph', text: 'They work especially well with blush dresses, champagne dresses, sage dresses, mint dresses, floral prints, pastel colours, sweetheart necklines and soft hairstyles. Farfalla and Alidi Farfalla are the strongest product directions for this style.' },
      {
        type: 'table',
        headers: ['Butterfly Wedding Guest Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Romantic wedding guest outfit', 'Butterfly earrings', 'Farfalla'],
          ['Blush dress styling', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Sage dress styling', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Floral dress styling', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Pastel dress styling', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Soft wedding guest ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Meaningful wedding gift styling', 'Butterfly earrings', 'Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for Sweetheart Neckline', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },
    ],
  },

  // ── Section 6: Hoop Earrings ──────────────────────────────────────────────────
  {
    heading: 'Hoop Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Hoop earrings can work beautifully for wedding guests when the outfit is modern, simple or shape-led.' },
      { type: 'paragraph', text: 'Pave Hoops are strongest with black dresses, green dresses, jumpsuits, simple satin dresses and city wedding outfits. Hoops are usually better for modern styling than very romantic styling. If the dress is lace-heavy, floral or highly detailed, studs or butterfly earrings may work better.' },
      {
        type: 'table',
        headers: ['Hoop Wedding Guest Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern wedding guest outfit', 'Hoops', 'Pave Hoops'],
          ['Simple black dress', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Green dress', 'Gold-tone hoops or drops', 'Pave Hoops, Orsola'],
          ['Jumpsuit', 'Hoops', 'Pave Hoops'],
          ['High-neck dress', 'Hoops or studs', 'Pave Hoops, Cadenza M'],
          ['Hoop ear stack', 'Hoop + small stud', 'Pave Hoops + Cadenza S'],
          ['If hoops feel too visible', 'Huggies or studs', 'Amadea, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Hoop Earrings Guide', href: '/resources/earring-style-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },

  // ── Section 7: Huggies and Minimalist ────────────────────────────────────────
  {
    heading: 'Huggies and Minimalist Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Huggies and minimalist earrings work well when the dress already has detail or when the guest prefers understated styling.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are strong for modern minimal wedding guest looks. Laluce minimalist diamond earrings work when the look should stay quiet. These options are also useful for wedding guests who want earrings they can wear again every day.' },
      {
        type: 'table',
        headers: ['Minimal Wedding Guest Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Detailed wedding guest outfit', 'Huggies, studs or minimalist earrings', 'Amadea, Cadenza M, Laluce'],
          ['Minimalist wedding styling', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern understated look', 'Huggies', 'Amadea'],
          ['High-neck dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Workwear-to-wedding look', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Minimal ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Soft quiet detail', 'Minimalist earrings', 'Laluce'],
        ],
      },
      { type: 'see-also', text: 'Minimalist Jewellery Styling Guide', href: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },
    ],
  },

  // ── Section 8: By Dress Colour ────────────────────────────────────────────────
  {
    heading: 'Earrings by Wedding Guest Dress Colour',
    content: [
      { type: 'paragraph', text: 'Dress colour is one of the easiest ways to choose earrings.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Dress Colour', 'Best Earrings', 'Product Direction'],
            rows: [
              ['Black', 'Drops, studs, hoops or bold earrings', 'Orsola, Cadenza M, Pave Hoops, Lusso'],
              ['Green', 'Gold drops, hoops or studs', 'Orsola, Pave Hoops, Cadenza M'],
              ['Sage', 'Butterfly earrings, short drops or small studs', 'Farfalla, Concetta Short, Cadenza S'],
              ['Mint', 'Small studs or butterfly earrings', 'Cadenza S, Farfalla'],
              ['Red', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Burgundy', 'Drops, long drops or polished studs', 'Orsola, Concetta Long, Cadenza M'],
              ['Champagne', 'Gold drops, short drops or studs', 'Orsola, Concetta Short, Cadenza M'],
              ['Blush', 'Butterfly earrings or delicate drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
              ['Navy', 'Studs or refined drops', 'Cadenza M, Concetta Long'],
              ['Pastel', 'Butterfly earrings, small studs or short drops', 'Farfalla, Cadenza S, Concetta Short'],
              ['Silver', 'White/silver-tone studs or long drops', 'Cadenza M, Concetta Long'],
              ['Floral', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings' },
    ],
  },

  // ── Section 9: By Dress Fabric ────────────────────────────────────────────────
  {
    heading: 'Earrings by Wedding Guest Dress Fabric',
    content: [
      { type: 'paragraph', text: 'Fabric can decide whether earrings should be simple or more visible.' },
      { type: 'paragraph', text: 'Satin already reflects light, so drops or clean studs work best. Lace and sequins usually need simpler earrings. Floral fabrics work well with butterfly earrings or small studs. Plain dresses can carry stronger earrings.' },
      {
        type: 'table',
        headers: ['Dress Fabric', 'Best Earrings', 'Product Direction'],
        rows: [
          ['Satin', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Lace', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
          ['Chiffon', 'Butterfly earrings, soft drops or studs', 'Farfalla, Concetta Short, Cadenza S'],
          ['Velvet', 'Drops, studs or long drops', 'Orsola, Cadenza M, Concetta Long'],
          ['Sequin', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Floral', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Plain crepe', 'Drops, hoops or medium studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Metallic fabric', 'Studs or minimalist earrings', 'Cadenza M, Laluce'],
          ['Tulle', 'Soft studs or delicate drops', 'Cadenza S, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for V-Neck Dresses', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-v-neck-dress' },
    ],
  },

  // ── Section 10: By Neckline ───────────────────────────────────────────────────
  {
    heading: 'Earrings by Neckline',
    content: [
      { type: 'paragraph', text: 'The neckline helps decide whether earrings should be long, small, curved or romantic.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-107.jpg',
        content: [
          {
            type: 'table',
            headers: ['Neckline', 'Best Earrings', 'Product Direction'],
            rows: [
              ['V-neck dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
              ['Sweetheart neckline', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
              ['Off-shoulder dress', 'Drops, hoops or polished studs', 'Orsola, Pave Hoops, Cadenza M'],
              ['Strapless dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['High-neck dress', 'Studs, huggies or hoops', 'Cadenza M, Amadea, Pave Hoops'],
              ['Halter dress', 'Studs or slim drops', 'Cadenza M, Concetta Long'],
              ['Square-neck dress', 'Hoops, studs or soft drops', 'Pave Hoops, Cadenza M, Concetta Short'],
              ['Cowl-neck dress', 'Studs or soft drops', 'Cadenza M, Orsola'],
              ['Detailed neckline', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Earrings for Off-Shoulder Dresses', href: '/resources/earring-style-guides/what-earrings-to-wear-with-an-off-shoulder-dress' },
    ],
  },

  // ── Section 11: By Hairstyle ──────────────────────────────────────────────────
  {
    heading: 'Earrings by Hairstyle',
    content: [
      { type: 'paragraph', text: 'Hairstyle affects visibility. Tiny earrings can disappear when hair is down, while pulled-back hair makes earrings more noticeable.' },
      {
        type: 'table',
        headers: ['Hairstyle', 'Best Earrings', 'Product Direction'],
        rows: [
          ['Hair down', 'Medium studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Soft waves', 'Drops, butterfly earrings or visible studs', 'Orsola, Farfalla, Cadenza M'],
          ['Half-up hair', 'Studs, huggies or butterfly earrings', 'Cadenza M, Amadea, Farfalla'],
          ['Sleek ponytail', 'Drops, hoops or polished studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Low bun', 'Drops, butterfly earrings or long drops', 'Orsola, Farfalla, Concetta Long'],
          ['High bun', 'Hoops, drops or statement earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Short hair', 'Studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Braided style', 'Studs, huggies or visible drops', 'Cadenza M, Amadea, Orsola'],
        ],
      },
    ],
  },

  // ── Section 12: By Wedding Dress Code ─────────────────────────────────────────
  {
    heading: 'Earrings by Wedding Dress Code',
    content: [
      { type: 'paragraph', text: 'The dress code should guide how polished or bold the earrings can be.' },
      {
        type: 'table',
        headers: ['Wedding Dress Code', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Casual wedding', 'Studs, huggies or small hoops', 'Cadenza S, Amadea, Pave Hoops'],
          ['Garden wedding', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Cocktail wedding', 'Drops, hoops or medium studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Formal wedding', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Black-tie wedding', 'Long drops, elegant studs or refined statement earrings', 'Concetta Long, Cadenza M, Lusso'],
          ['Beach wedding', 'Small studs, huggies or soft earrings', 'Cadenza S, Amadea, Farfalla'],
          ['City wedding', 'Hoops, studs or drops', 'Pave Hoops, Cadenza M, Orsola'],
          ['Evening wedding', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Day wedding', 'Studs, short drops or butterfly earrings', 'Cadenza S, Concetta Short, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },

  // ── Section 13: By Season ─────────────────────────────────────────────────────
  {
    heading: 'Earrings by Season',
    content: [
      { type: 'paragraph', text: 'Season can change the colour, fabric and mood of wedding guest outfits.' },
      {
        type: 'table',
        headers: ['Wedding Season', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Spring wedding', 'Butterfly earrings, soft drops or studs', 'Farfalla, Concetta Short, Cadenza S'],
          ['Summer wedding', 'Studs, huggies, soft drops or hoops', 'Cadenza S, Amadea, Orsola, Pave Hoops'],
          ['Autumn wedding', 'Gold drops, hoops or medium studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Winter wedding', 'Long drops, polished studs or bold earrings', 'Concetta Long, Cadenza M, Lusso'],
          ['Destination wedding', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Evening seasonal wedding', 'Drops or hoops', 'Orsola, Pave Hoops'],
          ['Pastel spring wedding', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Velvet winter wedding', 'Drops, long drops or studs', 'Orsola, Concetta Long, Cadenza M'],
        ],
      },
    ],
  },

  // ── Section 14: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'Wedding Guest Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Wedding guest ear stacks should look polished and intentional. The best stack has one main piece and one small support piece.' },
      {
        type: 'table',
        headers: ['Wedding Guest Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest wedding guest stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Elegant stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Romantic stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Minimal stack', 'Small stud', 'Minimalist detail', 'Cadenza S + Laluce'],
          ['Modern stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Evening party stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },

  // ── Section 15: Necklace Pairing Rules ───────────────────────────────────────
  {
    heading: 'Earrings and Necklace Pairing Rules',
    content: [
      { type: 'paragraph', text: 'Wedding guest earrings and necklaces should not compete. If the earrings are strong, the necklace should be quiet. If the earrings are small, the necklace can be more visible.' },
      {
        type: 'table',
        headers: ['Earring Choice', 'Necklace Direction'],
        rows: [
          ['Drop earrings', 'No necklace or delicate chain'],
          ['Long drops', 'Usually skip the necklace'],
          ['Medium studs', 'Necklace can work'],
          ['Small studs', 'Necklace can lead the look'],
          ['Butterfly earrings', 'Soft delicate necklace if needed'],
          ['Hoops', 'Delicate necklace or no necklace'],
          ['Huggies', 'Simple necklace can work'],
          ['Bold earrings', 'Skip necklace or keep it minimal'],
          ['Minimalist earrings', 'Necklace can become the focal point'],
        ],
      },
      { type: 'paragraph', text: 'For most wedding guest outfits, one clear jewellery focus looks more elegant than earrings, necklace and bracelets all competing at once.' },
      { type: 'see-also', text: 'Jewellery for Sweetheart Neckline', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },
    ],
  },

  // ── Section 16: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Wedding Guest Need',
    content: [
      { type: 'subheading', text: 'For the Safest Wedding Guest Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They work with many dress colours, fabrics and necklines without overpowering the outfit.' },
      { type: 'subheading', text: 'For Minimal Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Cadenza S or Laluce. These are best for detailed dresses, high necklines and understated styling.' },
      { type: 'subheading', text: 'For Elegant Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They are strongest for satin dresses, V-neck dresses, off-shoulder dresses and simple wedding guest outfits.' },
      { type: 'subheading', text: 'For Soft Romantic Dresses' },
      { type: 'paragraph', text: 'Choose Farfalla, Alidi Farfalla or Concetta Short. These are strong for blush, champagne, sage, mint, floral and pastel wedding guest outfits.' },
      { type: 'subheading', text: 'For Formal Wedding Guest Outfits' },
      { type: 'paragraph', text: 'Choose Concetta Long or Cadenza M. Concetta Long creates a refined line, while Cadenza M keeps the look classic.' },
      { type: 'subheading', text: 'For Modern Wedding Guest Looks' },
      { type: 'paragraph', text: 'Choose Pave Hoops or Amadea. Pave Hoops add visible shape, while Amadea keeps the styling close-fitting and understated.' },
      { type: 'subheading', text: 'For Simple Evening Wedding Outfits' },
      { type: 'paragraph', text: 'Choose Lusso only when the dress is simple enough to let the earrings lead. If the dress is detailed, choose Cadenza M or Orsola instead.' },
    ],
  },

  // ── Section 17: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Wedding Guest Role', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Best overall wedding guest earring', 'Adds elegant movement and works with satin dresses'],
          ['Cadenza M diamond stud earrings', 'Safest wedding guest sparkle', 'Polished, classic and easy to style'],
          ['Cadenza S lab-grown diamond studs', 'Best minimal/support stud', 'Works for simple looks and ear stacks'],
          ['Concetta Short earrings', 'Best soft occasion drop', 'Strong for champagne, blush, sage and pastel dresses'],
          ['Concetta Long earrings', 'Best formal wedding guest earring', 'Creates a refined evening line'],
          ['Farfalla butterfly earrings', 'Best romantic wedding guest earring', 'Soft, meaningful and feminine'],
          ['Alidi Farfalla butterfly earrings', 'Best romantic gift-led option', 'Strong for sentimental styling'],
          ['Pave Hoops', 'Best modern wedding guest shape', 'Works with simple dresses and jumpsuits'],
          ['Amadea Huggie earrings', 'Best understated modern option', 'Good for detailed dresses and ear stacks'],
          ['Laluce minimalist diamond earrings', 'Best quiet detail', 'Useful for minimal and detailed outfits'],
          ['Lusso bold statement earrings', 'Best simple evening dress option', 'Works only when the outfit can carry bold sparkle'],
        ],
      },
      { type: 'paragraph', text: 'Choose wedding guest earrings by dress first. Pick Orsola for satin and open necklines, Cadenza M for safe sparkle, Concetta Short for soft romantic outfits, Farfalla for floral and pastel dresses, Pave Hoops for modern looks and Cadenza S or Amadea for clean ear stacks.' },
    ],
  },

  // ── Section 18: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Wedding Guest Earring Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing earrings before considering the dress. The dress colour, fabric and neckline should guide the earring choice.' },
      { type: 'paragraph', text: 'Another mistake is wearing earrings that compete with a detailed outfit. If the dress has lace, sequins, embroidery or heavy print, studs or minimalist earrings usually look better.' },
      { type: 'paragraph', text: 'A third mistake is wearing tiny earrings with hair down and a strong dress colour. The earrings may disappear, especially with black, green, red or burgundy outfits.' },
      { type: 'paragraph', text: 'Another mistake is wearing a heavy necklace with long drop earrings. If the earrings already frame the face, the necklace should usually be delicate or skipped.' },
      { type: 'paragraph', text: 'A fifth mistake is choosing earrings that feel too bridal. Wedding guest earrings should look elegant, but not like bridal jewellery.' },
      { type: 'paragraph', text: 'Finally, do not ignore comfort. Wedding guests often wear earrings for many hours, so the pair should feel secure and comfortable.' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 19: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Wedding Guest Earring Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing earrings as a wedding guest, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the dress simple or detailed?',
          'What colour is the dress?',
          'Is the fabric satin, lace, floral, sequin, velvet or plain?',
          'What neckline does the dress have?',
          'Will the hair be up, down or half-up?',
          'Is the wedding casual, garden, cocktail, formal or black-tie?',
          'Do I want sparkle, movement, shape or softness?',
          'Should the earrings or necklace be the main jewellery focus?',
          'Does the metal colour match the outfit?',
          'Are the earrings comfortable for the full event?',
          'Can the earrings be worn again after the wedding?',
          'Is the look elegant without feeling too bridal?',
          'Would an ear stack make the outfit feel more polished?',
          'Are the earrings balanced with the dress and hairstyle?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza M for safe sparkle, Orsola for elegant movement, Farfalla for romantic dresses, Pave Hoops for modern styling and Cadenza S for a minimal ear stack.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What earrings should I wear as a wedding guest?', answer: 'The best earrings to wear as a wedding guest depend on your dress. Drop earrings work well with satin and open necklines, studs are safest for detailed dresses, butterfly earrings suit romantic outfits and hoops work for modern simple looks.' },
  { question: 'Are diamond studs good for wedding guests?', answer: 'Yes, diamond studs are one of the safest wedding guest earring choices because they add sparkle without overpowering the outfit.' },
  { question: 'Are drop earrings good for wedding guests?', answer: 'Yes, drop earrings are excellent for wedding guests because they add movement and elegance, especially with satin, V-neck, sweetheart and off-shoulder dresses.' },
  { question: 'Can wedding guests wear hoop earrings?', answer: 'Yes, wedding guests can wear hoop earrings, especially with modern dresses, jumpsuits, simple outfits and city wedding looks.' },
  { question: 'Can wedding guests wear butterfly earrings?', answer: 'Yes, butterfly earrings work well for romantic wedding guest outfits, especially blush, champagne, sage, mint, floral and pastel dresses.' },
  { question: 'What earrings should I wear with a satin wedding guest dress?', answer: 'Wear drop earrings or medium diamond studs with a satin wedding guest dress. Drops add movement, while studs keep the look clean.' },
  { question: 'What earrings should I wear with a black wedding guest dress?', answer: 'A black wedding guest dress works well with drop earrings, medium studs, hoops or bold earrings if the dress is simple.' },
  { question: 'What earrings should I wear with a green wedding guest dress?', answer: 'Green wedding guest dresses work well with gold drops, hoops, medium studs or butterfly earrings depending on the shade.' },
  { question: 'Should wedding guest earrings match the necklace?', answer: 'They should feel balanced, but they do not need to match exactly. If the earrings are long or bold, keep the necklace delicate or skip it.' },
  { question: 'What IWantJewels earrings are best for wedding guests?', answer: 'Orsola, Cadenza M, Cadenza S, Concetta Short, Concetta Long, Farfalla, Alidi Farfalla, Pave Hoops, Amadea and Laluce are strong wedding guest earring options depending on the outfit.' },
]

const cta: V2CTABlock = {
  heading: 'Wedding guest earrings should complete your outfit without overpowering it. Choose studs for safe sparkle, drops for elegant movement, butterfly earrings for romantic styling, hoops for modern shape, huggies for understated looks and minimalist earrings for detailed dresses.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want wedding guest earrings with real diamond sparkle. Choose Orsola for satin and open necklines, Cadenza M for classic polish, Concetta Short for soft occasion styling, Farfalla for romantic dresses, Pave Hoops for shape and Cadenza S or Amadea for a clean wedding guest ear stack.',
  primaryLabel: 'Shop Wedding Guest Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Wedding Guest Jewellery Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings',
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'what-earrings-to-wear-as-a-wedding-guest')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'what-earrings-to-wear-as-a-wedding-guest', 3)
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
