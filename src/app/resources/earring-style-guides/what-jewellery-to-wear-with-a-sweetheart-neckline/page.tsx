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
  title: 'What Jewellery to Wear with a Sweetheart Neckline',
  description:
    'Choose jewellery for a sweetheart neckline dress with earrings, necklaces, diamonds, gold, wedding guest looks and party styling ideas.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-87.jpg',
  title: 'What Jewellery to Wear with a Sweetheart Neckline:',
  subtitle: 'Earrings, Necklaces & Styling Guide',
  paragraphs: [
    'A sweetheart neckline already has a soft, romantic shape. It frames the upper body beautifully, so the jewellery should add polish without making the neckline feel crowded. The best jewellery for a sweetheart neckline usually depends on how simple the dress is, how formal the occasion is, and whether you want the look to feel romantic, elegant, minimal or party-ready.',
    'Drop earrings are one of the easiest choices because they frame the face and add movement without crowding the neckline. Butterfly earrings work beautifully when the look should feel romantic or meaningful. Medium diamond studs are best when the dress already has lace, sequins, embroidery or strong detail. Bold statement earrings can work when the sweetheart neckline dress is simple and the earrings are meant to lead the look.',
    'This resource helps shoppers choose jewellery for sweetheart neckline dresses by dress type, occasion, hairstyle, necklace choice and metal colour. It also connects each styling direction to IWantJewels products such as Orsola drop earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Concetta Short earrings, Concetta Long earrings, Pave Hoops, Lusso bold statement earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings.',
  ],
  shopLabel: 'Shop Earrings for Sweetheart Necklines',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery for sweetheart neckline dresses.',
    'Decide between earrings, necklace or both.',
    'Match jewellery to romantic, satin, black, wedding guest and party sweetheart dresses.',
    'Choose earrings based on hairstyle and dress detail.',
    'Decide whether gold, white/silver tone or rose gold works best.',
    'Build sweetheart neckline ear stack combinations.',
    'Understand when to wear butterfly earrings, drops, studs, hoops or bold earrings.',
    'Find IWantJewels product recommendations by styling need.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-86.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'Sweetheart Neckline Jewellery Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main styling decision tool.' },
      {
        type: 'table',
        headers: ['Sweetheart Neckline Style', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Simple sweetheart dress', 'Drops, butterfly earrings or bold earrings', 'Orsola, Farfalla, Lusso'],
          ['Romantic sweetheart dress', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Satin sweetheart dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['Black sweetheart dress', 'Drops, bold earrings or hoops', 'Orsola, Lusso, Pave Hoops'],
          ['Wedding guest sweetheart dress', 'Drops, studs or romantic earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Detailed sweetheart dress', 'Studs or clean huggies', 'Cadenza M, Cadenza S, Amadea'],
          ['Strapless sweetheart dress', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Soft pastel sweetheart dress', 'Butterfly earrings or delicate drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Party sweetheart dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Sweetheart ear stack', 'Main earring + small support', 'Orsola + Cadenza S, Farfalla + Cadenza S'],
        ],
      },
    ],
  },

  // ── Section 1: Why Sweetheart Needs Soft Balance ─────────────────────────────
  {
    heading: 'Why Sweetheart Necklines Need Soft Balance',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'paragraph',
            text: 'A sweetheart neckline has a curved, romantic shape. It naturally draws attention to the collarbone, shoulders and face. Because the neckline is already decorative, the jewellery should support the shape rather than compete with it.',
          },
          {
            type: 'paragraph',
            text: 'If the dress is simple, earrings can become stronger. If the dress has lace, embroidery, crystals, sequins or heavy fabric detail, the earrings should stay cleaner. If the neckline is open, drop earrings or butterfly earrings can frame the face beautifully. If the dress already has a strong necklace-like detail, studs or huggies are usually better.',
          },
          {
            type: 'paragraph',
            text: 'The main rule is simple: keep one clear focal point. If the earrings are bold, keep the necklace minimal or skip it. If the necklace is the focal point, choose cleaner earrings.',
          },
          { type: 'see-also', text: 'Jewellery for V-Neck Dresses', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-v-neck-dress' },
          { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
          { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
        ],
      },
    ],
  },

  // ── Section 2: Best Earrings ──────────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Sweetheart Neckline',
    content: [
      {
        type: 'paragraph',
        text: 'The best earrings for a sweetheart neckline are usually drop earrings, butterfly earrings, medium studs or bold statement earrings, depending on the dress.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings work because they add length and movement without filling the neckline. Butterfly earrings work because they match the romantic shape of the dress. Medium studs are best when the outfit already has detail. Bold statement earrings are strongest when the dress is simple and the jewellery should lead.',
      },
      {
        type: 'table',
        headers: ['Styling Goal', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Elegant movement', 'Drop earrings', 'Orsola'],
          ['Romantic softness', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Delicate occasion styling', 'Short drops', 'Concetta Short'],
          ['Formal long line', 'Long drops', 'Concetta Long'],
          ['Classic sparkle', 'Medium studs', 'Cadenza M'],
          ['Subtle support', 'Small studs', 'Cadenza S'],
          ['Modern shape', 'Hoops', 'Pave Hoops'],
          ['Strong party look', 'Bold statement earrings', 'Lusso'],
        ],
      },
      { type: 'divider' },
    ],
  },

  // ── Section 3: Necklace or Earrings ──────────────────────────────────────────
  {
    heading: 'Necklace or Earrings with a Sweetheart Neckline?',
    content: [
      {
        type: 'paragraph',
        text: 'A sweetheart neckline can work with a necklace, earrings or both, but the styling should not feel crowded.',
      },
      {
        type: 'paragraph',
        text: 'If the earrings are bold or long, skip the necklace or choose a very delicate chain. If the earrings are simple studs, a necklace can become more visible. If the sweetheart neckline is strapless and plain, you can choose either a delicate necklace with studs or stronger earrings with no necklace.',
      },
      {
        type: 'table',
        headers: ['Jewellery Choice', 'Best When', 'Product Direction'],
        rows: [
          ['Drop earrings only', 'Dress is simple, romantic or evening-ready', 'Orsola, Concetta Long'],
          ['Butterfly earrings only', 'Look should feel soft and romantic', 'Farfalla, Alidi Farfalla'],
          ['Bold earrings only', 'Dress is minimal and party-ready', 'Lusso'],
          ['Medium studs + delicate necklace', 'Neckline needs subtle jewellery balance', 'Cadenza M'],
          ['Small studs + pendant', 'Dress is delicate or detailed', 'Cadenza S'],
          ['Hoops + no necklace', 'Look should feel modern', 'Pave Hoops'],
          ['Huggies + necklace', 'Workwear or casual sweetheart styling', 'Amadea'],
          ['Minimalist earrings + necklace', 'Necklace should lead the look', 'Laluce'],
        ],
      },
      { type: 'see-also', text: 'Bold Statement Earrings Guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
     
    ],
  },

  // ── Section 4: Romantic Sweetheart Dresses ────────────────────────────────────
  {
    heading: 'Jewellery for Romantic Sweetheart Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Romantic sweetheart dresses usually work best with soft, feminine jewellery.',
      },
      {
        type: 'paragraph',
        text: 'Butterfly earrings are especially strong because they add meaning and softness. Drop earrings also work beautifully if the dress needs movement. Medium studs are better when the dress already has lace, floral detail or embroidery.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Romantic Sweetheart Dress Style', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Blush sweetheart dress', 'Butterfly earrings or soft drops', 'Farfalla, Orsola'],
              ['Floral sweetheart dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
              ['Lace sweetheart dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
              ['Champagne sweetheart dress', 'Gold drops or medium studs', 'Orsola, Cadenza M'],
              ['Pastel sweetheart dress', 'Butterfly earrings or short drops', 'Alidi Farfalla, Concetta Short'],
              ['Soft wedding guest dress', 'Drops or romantic earrings', 'Orsola, Farfalla'],
              ['Birthday sweetheart dress', 'Butterfly earrings or medium studs', 'Alidi Farfalla, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
      { type: 'see-also', text: 'Wedding Guest Jewellery Guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 5: Satin Sweetheart Dresses ──────────────────────────────────────
  {
    heading: 'Jewellery for Satin Sweetheart Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Satin sweetheart dresses already have shine and softness, so the jewellery should add balance.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings are usually the strongest choice because they echo the movement of satin. Medium studs are safer when the satin dress has strong colour or draping. Bold earrings can work if the satin dress is simple and the earrings are meant to become the focal point.',
      },
      {
        type: 'table',
        headers: ['Satin Sweetheart Dress Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Black satin sweetheart dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Champagne satin sweetheart dress', 'Gold drops or studs', 'Orsola, Cadenza M'],
          ['Blush satin sweetheart dress', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Green satin sweetheart dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Red satin sweetheart dress', 'Medium studs, drops or bold earrings', 'Cadenza M, Orsola, Lusso'],
          ['Satin wedding guest sweetheart', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Satin party sweetheart', 'Bold earrings or drops', 'Lusso, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 6: Black Sweetheart Dresses ──────────────────────────────────────
  {
    heading: 'Jewellery for Black Sweetheart Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A black sweetheart dress gives jewellery a strong background and a romantic neckline at the same time. This makes it excellent for drops, bold earrings, hoops and classic diamond studs.',
      },
      {
        type: 'paragraph',
        text: 'If the dress is simple, choose Lusso, Orsola or Pave Hoops. If the dress is detailed, choose Cadenza M, Cadenza S or Amadea. If the black sweetheart dress is formal, Concetta Long can create a refined longer line.',
      },
      {
        type: 'table',
        headers: ['Black Sweetheart Dress Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Simple black sweetheart dress', 'Bold earrings or drops', 'Lusso, Orsola'],
          ['Black satin sweetheart dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Black party sweetheart dress', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
          ['Black wedding guest sweetheart', 'Drops or studs', 'Orsola, Cadenza M'],
          ['Detailed black sweetheart dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Formal black sweetheart dress', 'Long drops or classic studs', 'Concetta Long, Cadenza M'],
          ['Romantic black sweetheart look', 'Butterfly earrings or drops', 'Farfalla, Orsola'],
        ],
      },
      { type: 'see-also', text: 'What Jewellery to Wear with a Black Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },

  // ── Section 7: Wedding Guest Sweetheart ───────────────────────────────────────
  {
    heading: 'Jewellery for Wedding Guest Sweetheart Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A wedding guest sweetheart neckline should feel elegant and polished without becoming too bridal or too heavy.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings are one of the strongest choices because they frame the face and keep the neckline open. Medium studs are best if the dress already has lace, embroidery or print. Butterfly earrings work well for softer romantic wedding guest looks.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-95.jpg',
        content: [
          {
            type: 'table',
            headers: ['Wedding Guest Sweetheart Style', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Simple wedding guest sweetheart', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Satin wedding guest sweetheart', 'Drop earrings', 'Orsola'],
              ['Floral sweetheart dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
              ['Lace sweetheart dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
              ['Champagne sweetheart dress', 'Gold drops or studs', 'Orsola, Cadenza M'],
              ['Pastel sweetheart dress', 'Butterfly earrings or soft drops', 'Alidi Farfalla, Concetta Short'],
              ['Black sweetheart wedding guest dress', 'Drops or studs', 'Orsola, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
      { type: 'see-also', text: 'What Earrings to Wear as a Wedding Guest', href: '#' },
    ],
  },

  // ── Section 8: Party Sweetheart Dresses ──────────────────────────────────────
  {
    heading: 'Jewellery for Party Sweetheart Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A party sweetheart dress can carry more sparkle when the dress is simple.',
      },
      {
        type: 'paragraph',
        text: 'Choose Lusso if the earrings should lead. Choose Orsola if you want elegant movement. Choose Pave Hoops if you want modern shape. Choose Cadenza M if the dress already has detail and needs cleaner diamond sparkle.',
      },
      {
        type: 'table',
        headers: ['Party Sweetheart Dress Style', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Simple party sweetheart', 'Bold earrings', 'Lusso'],
          ['Satin party sweetheart', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Black party sweetheart', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Sequin sweetheart dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Cocktail sweetheart dress', 'Hoops, drops or medium studs', 'Pave Hoops, Orsola, Cadenza M'],
          ['Birthday sweetheart dress', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Formal party sweetheart', 'Long drops or bold earrings', 'Concetta Long, Lusso'],
        ],
      },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
      { type: 'see-also', text: 'Bold Statement Earrings Guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
    ],
  },

  // ── Section 9: Detailed Sweetheart Dresses ────────────────────────────────────
  {
    heading: 'Jewellery for Detailed Sweetheart Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'If a sweetheart neckline dress already has sequins, lace, embroidery, crystals, floral detail, ruffles or metallic fabric, the earrings should usually stay cleaner.',
      },
      {
        type: 'paragraph',
        text: 'Studs, huggies and minimalist earrings are the safest choices because they add polish without competing with the dress. If the dress needs a little movement, choose delicate drops rather than bold statement earrings.',
      },
      {
        type: 'table',
        headers: ['Detailed Sweetheart Dress Type', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Sequin sweetheart dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Lace sweetheart dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
          ['Embroidered sweetheart dress', 'Studs', 'Cadenza S, Cadenza M'],
          ['Metallic sweetheart dress', 'Minimalist earrings or studs', 'Laluce, Cadenza M'],
          ['Ruffled sweetheart dress', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Floral sweetheart dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
          ['Crystal-detail sweetheart dress', 'Studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Minimalist Earrings Guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
     
    ],
  },

  // ── Section 10: By Hairstyle ──────────────────────────────────────────────────
  {
    heading: 'Jewellery for Sweetheart Necklines by Hairstyle',
    content: [
      {
        type: 'paragraph',
        text: 'Hairstyle changes how visible the jewellery looks.',
      },
      {
        type: 'paragraph',
        text: 'Sweetheart necklines often look beautiful with soft waves, half-up hair, low buns and sleek ponytails. If the hair is down, choose earrings that are visible enough. If the hair is pulled back, drops, butterfly earrings and bold earrings can frame the face clearly.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-97.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Hair down', 'Medium studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
              ['Soft waves', 'Drops, butterfly earrings or visible studs', 'Orsola, Farfalla, Cadenza M'],
              ['Sleek ponytail', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Low bun', 'Drops, butterfly earrings or bold earrings', 'Orsola, Farfalla, Lusso'],
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
    heading: 'Gold vs Silver vs Rose Gold with Sweetheart Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Metal colour changes the mood of a sweetheart neckline dress.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold feels warm, classic and rich. White or silver tone feels clean, bright and modern. Rose gold feels soft, romantic and feminine, which can work especially well with sweetheart necklines.',
      },
      {
        type: 'table',
        headers: ['Metal Colour', 'Feeling with Sweetheart Dresses', 'Best Dress Colours'],
        rows: [
          ['Yellow gold', 'Warm, classic and polished', 'Black, champagne, green, red, cream'],
          ['White or silver tone', 'Clean, bright and formal', 'Navy, black, grey, silver, cool pastels'],
          ['Rose gold', 'Soft, romantic and feminine', 'Blush, pink, champagne, soft green'],
          ['Mixed metals', 'Creative and modern', 'Minimal sweetheart outfits and ear stacks'],
        ],
      },
      {
        type: 'paragraph',
        text: 'For romantic sweetheart dresses, rose gold or yellow gold can work beautifully. For formal sweetheart dresses, white/silver tone or yellow gold may feel more refined.',
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },

  // ── Section 12: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'Sweetheart Neckline Ear Stack Ideas',
    content: [
      {
        type: 'paragraph',
        text: 'A sweetheart neckline works well with ear stacks when the stack feels soft and balanced.',
      },
      {
        type: 'paragraph',
        text: 'If the main earring is a drop, butterfly earring or bold earring, keep the support piece small. If the main earring is a medium stud, you can add a huggie or minimalist earring.',
      },
      {
        type: 'table',
        headers: ['Sweetheart Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Elegant sweetheart stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Romantic sweetheart stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Soft pastel stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Bold sweetheart stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Modern sweetheart stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Classic sweetheart stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
          ['Formal sweetheart stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Delicate sweetheart stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    
    ],
  },

  // ── Section 13: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Sweetheart Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest Sweetheart Dress Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They add visible sparkle without making the neckline feel crowded.' },
      { type: 'subheading', text: 'For Elegant Movement' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They work beautifully with sweetheart necklines because they frame the face and keep the neckline open.' },
      { type: 'subheading', text: 'For Romantic Sweetheart Styling' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. These are best for blush, champagne, pastel, floral or romantic sweetheart dresses.' },
      { type: 'subheading', text: 'For Delicate Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They add soft movement without feeling too bold.' },
      { type: 'subheading', text: 'For Formal Sweetheart Styling' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings. They create a refined long line for formal sweetheart neckline dresses.' },
      { type: 'subheading', text: 'For Modern Sweetheart Shape' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They work well with black sweetheart dresses, satin sweetheart dresses and party looks.' },
      { type: 'subheading', text: 'For Bold Sweetheart Party Looks' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the sweetheart dress is simple and the earrings should lead.' },
    ],
  },

  // ── Section 14: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Sweetheart Neckline Role', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Best overall sweetheart earring', 'Adds movement while keeping the neckline open'],
          ['Farfalla butterfly earrings', 'Best romantic option', 'Matches the soft mood of sweetheart necklines'],
          ['Alidi Farfalla butterfly earrings', 'Gift-led romantic option', 'Strong for birthdays and soft sweetheart looks'],
          ['Cadenza M diamond stud earrings', 'Safest sparkle option', 'Works when the dress already has detail'],
          ['Cadenza S lab-grown diamond studs', 'Support piece', 'Balances drops, hoops and bold earrings'],
          ['Concetta Short earrings', 'Delicate occasion styling', 'Good for wedding guest and bridesmaid looks'],
          ['Concetta Long earrings', 'Formal sweetheart styling', 'Creates a refined longer line'],
          ['Pave Hoops', 'Modern sweetheart shape', 'Adds curve and visible shine'],
          ['Lusso bold statement earrings', 'Strongest party sweetheart option', 'Best with simple sweetheart dresses'],
          ['Amadea Huggie earrings', 'Modern support piece', 'Works with detailed dresses and ear stacks'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Useful with detailed sweetheart outfits'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Choose sweetheart neckline jewellery by mood. Pick Orsola for movement, Farfalla for romance, Cadenza M for clean sparkle, Concetta Short for delicate wedding guest styling, Pave Hoops for modern shape and Lusso for bold party looks.',
      },
    ],
  },

  // ── Section 15: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Sweetheart Neckline Jewellery Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is overcrowding the neckline. Sweetheart necklines already have a decorative shape, so heavy earrings and a heavy necklace together can feel too much.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the romantic mood of the neckline. Very harsh or overly geometric jewellery may not always suit a soft sweetheart dress unless the look is intentionally modern.' },
      { type: 'paragraph', text: 'A third mistake is choosing tiny earrings for a party sweetheart dress. If the hair is down or the dress is visually strong, very small earrings may disappear.' },
      { type: 'paragraph', text: 'Another mistake is wearing bold earrings with a heavily detailed sweetheart dress. In that case, studs or huggies may look more polished.' },
      { type: 'paragraph', text: 'Finally, do not choose jewellery only by sparkle. Think about dress detail, fabric, neckline openness, hairstyle, metal colour and comfort.' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 16: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Sweetheart Neckline Jewellery Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing jewellery for a sweetheart neckline, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the sweetheart dress simple or detailed?',
          'Is the look romantic, formal, minimal or party-ready?',
          'Is the fabric satin, lace, sequin, floral or plain?',
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
      { type: 'paragraph', text: 'If you are unsure, choose drop earrings for a simple sweetheart dress, butterfly earrings for a romantic sweetheart dress and medium studs for a detailed sweetheart dress.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What jewellery should I wear with a sweetheart neckline?',
    answer: 'The best jewellery for a sweetheart neckline depends on the dress style. Drop earrings, butterfly earrings, medium studs and delicate necklaces all work well, depending on how simple or detailed the dress is.',
  },
  {
    question: 'What earrings look best with a sweetheart neckline?',
    answer: 'Drop earrings, butterfly earrings, medium diamond studs and bold statement earrings can all work with a sweetheart neckline. Choose based on the occasion, hairstyle and dress detail.',
  },
  {
    question: 'Should I wear a necklace with a sweetheart neckline?',
    answer: 'Yes, a delicate necklace can work with a sweetheart neckline, especially if the earrings are simple. If the earrings are bold or long, skip the necklace or keep it very minimal.',
  },
  {
    question: 'What earrings should I wear with a romantic sweetheart dress?',
    answer: 'Butterfly earrings, soft drop earrings and delicate diamond studs work well with romantic sweetheart dresses.',
  },
  {
    question: 'What jewellery should I wear with a black sweetheart dress?',
    answer: 'A black sweetheart dress works well with Orsola drop earrings, Lusso bold statement earrings, Pave Hoops or Cadenza M diamond studs depending on how simple the dress is.',
  },
  {
    question: 'What jewellery should I wear with a satin sweetheart dress?',
    answer: 'Drop earrings or medium diamond studs work well with satin sweetheart dresses. Drops add movement, while studs keep the styling clean.',
  },
  {
    question: 'Can wedding guests wear bold earrings with a sweetheart neckline?',
    answer: 'Yes, if the dress is simple and the earrings do not overpower the look. If the dress has lace, sequins or embroidery, studs or delicate drops may be better.',
  },
  {
    question: 'Are butterfly earrings good with a sweetheart neckline?',
    answer: 'Yes, butterfly earrings work beautifully with sweetheart necklines because both have a soft, romantic feeling.',
  },
  {
    question: 'What metal colour works best with a sweetheart neckline?',
    answer: 'Yellow gold feels warm and classic, white or silver tone feels clean and formal, and rose gold feels soft and romantic. Choose based on dress colour and personal style.',
  },
  {
    question: 'What IWantJewels earrings are best with a sweetheart neckline?',
    answer: 'Orsola, Farfalla, Alidi Farfalla, Cadenza M, Concetta Short, Concetta Long, Pave Hoops and Lusso are strong sweetheart neckline options depending on whether you want movement, romance, sparkle, shape or boldness.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'A sweetheart neckline already has a soft, romantic shape, so the jewellery should keep the look balanced. Choose drop earrings when the dress is simple, butterfly earrings when the look should feel romantic, medium studs when the dress has detail, hoops when you want modern shape, and bold earrings when the outfit is clean enough to let the jewellery lead.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want sweetheart neckline jewellery with real diamond sparkle. Choose Orsola for elegant movement, Farfalla for romantic softness, Cadenza M for clean sparkle, Concetta Short for delicate occasion styling, Pave Hoops for shape and Lusso for bold party impact.',
  primaryLabel: 'Shop Earrings for Sweetheart Necklines',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Drop Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Wedding Guest Jewellery Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'what-jewellery-to-wear-with-a-sweetheart-neckline')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'what-jewellery-to-wear-with-a-sweetheart-neckline', 3)
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
