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
  title: 'What Earrings to Wear with an Off Shoulder Dress',
  description:
    'Choose earrings for an off shoulder dress with diamonds, drops, hoops, studs, gold, party looks, wedding guest outfits and evening styling ideas.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-89.jpg',
  title: 'What Earrings to Wear with an Off-Shoulder Dress:',
  subtitle: 'Styling Guide for Weddings, Parties & Evening Looks',
  paragraphs: [
    'An off-shoulder dress naturally opens the neckline and draws attention to the shoulders, collarbone and face. Because the neckline is already open, earrings become one of the most important jewellery choices. The right pair can make the outfit feel elegant, romantic, modern or party-ready without needing heavy jewellery around the neck.',
    'Drop earrings are one of the strongest choices for off-shoulder dresses because they frame the face and add movement. Bold statement earrings work beautifully when the dress is simple and the earrings should lead the look. Hoops add modern shape, while medium diamond studs keep the styling clean when the dress already has detail. Butterfly earrings are especially strong for romantic off-shoulder dresses, wedding guest outfits and soft evening looks.',
    'This resource helps shoppers choose earrings for off-shoulder dresses by dress style, occasion, hairstyle, fabric, metal colour and sparkle level. It also connects each styling direction to IWantJewels products such as Orsola drop earrings, Lusso bold statement earrings, Pave Hoops, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Concetta Short earrings, Concetta Long earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings.',
  ],
  shopLabel: 'Shop Earrings for Off-Shoulder Dresses',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose earrings for off-shoulder dresses.',
    'Decide between drops, hoops, studs, butterfly earrings and bold statement earrings.',
    'Style off-shoulder dresses for weddings, parties, dinners, birthdays and formal events.',
    'Match earrings to black, satin, romantic, detailed and simple off-shoulder dresses.',
    'Choose earrings based on hairstyle and neckline openness.',
    'Decide whether to wear a necklace with an off-shoulder dress.',
    'Choose gold, white/silver tone or rose gold jewellery.',
    'Build off-shoulder dress ear stack combinations.',
    'Find IWantJewels product recommendations by styling need.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-84.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'Off-Shoulder Dress Earring Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main styling decision tool.' },
      {
        type: 'table',
        headers: ['Off-Shoulder Dress Style', 'Best Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Simple off-shoulder dress', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Black off-shoulder dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Satin off-shoulder dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['Romantic off-shoulder dress', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Wedding guest off-shoulder dress', 'Drops, studs or romantic earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Party off-shoulder dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Detailed off-shoulder dress', 'Studs or clean huggies', 'Cadenza M, Cadenza S, Amadea'],
          ['Formal off-shoulder dress', 'Long drops or refined studs', 'Concetta Long, Cadenza M'],
          ['Minimal off-shoulder dress', 'One strong jewellery focal point', 'Lusso, Orsola, Pave Hoops'],
          ['Off-shoulder ear stack', 'Main earring + small support', 'Orsola + Cadenza S, Lusso + Cadenza S'],
        ],
      },
    ],
  },

  // ── Section 1: Why Off-Shoulder Works So Well ─────────────────────────────────
  {
    heading: 'Why Off-Shoulder Dresses Work So Well with Earrings',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'paragraph',
            text: 'Off-shoulder dresses leave the neckline open, so the jewellery around the face becomes more important. Earrings help fill the styling space without covering the collarbone or competing with the dress shape.',
          },
          {
            type: 'paragraph',
            text: 'This neckline is especially good for drop earrings, statement earrings and hoops because there is visual room around the shoulders. A drop earring can add elegance and movement. A bold earring can become the main jewellery feature. Hoops can add modern shape. Studs can keep the look clean if the dress already has detail.',
          },
          {
            type: 'paragraph',
            text: 'The main rule is balance. If the dress is simple, the earrings can be stronger. If the dress has lace, sequins, embroidery, ruffles or strong fabric detail, choose cleaner earrings. If the earrings are bold, keep the necklace minimal or skip it.',
          },
          { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
        ],
      },
    ],
  },

  // ── Section 2: Best Earrings ──────────────────────────────────────────────────
  {
    heading: 'Best Earrings for an Off-Shoulder Dress',
    content: [
      {
        type: 'paragraph',
        text: 'The best earrings for an off-shoulder dress are usually drop earrings, bold statement earrings, hoops, medium studs or butterfly earrings.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings work because they frame the face and add length. Bold statement earrings work because the open neckline gives them space. Hoops work when the look should feel modern. Medium studs work when the dress is detailed. Butterfly earrings work when the outfit should feel soft, romantic or meaningful.',
      },
      {
        type: 'table',
        headers: ['Styling Goal', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Elegant movement', 'Drop earrings', 'Orsola'],
          ['Formal long line', 'Long drops', 'Concetta Long'],
          ['Strong party look', 'Bold statement earrings', 'Lusso'],
          ['Modern shape', 'Hoops', 'Pave Hoops'],
          ['Classic sparkle', 'Medium studs', 'Cadenza M'],
          ['Subtle support', 'Small studs', 'Cadenza S'],
          ['Romantic softness', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Minimal ear stack', 'Stud + huggie', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'divider' },
    ],
  },

  // ── Section 3: Necklace or Earrings ──────────────────────────────────────────
  {
    heading: 'Necklace or Earrings with an Off-Shoulder Dress?',
    content: [
      {
        type: 'paragraph',
        text: 'An off-shoulder dress can work with a necklace, earrings or both, but earrings are usually the safer focal point.',
      },
      {
        type: 'paragraph',
        text: 'Because the neckline already shows the collarbone and shoulders, heavy necklaces can sometimes make the look feel crowded. If you choose bold earrings or long drops, skip the necklace or choose a very delicate chain. If you choose small studs, a necklace can become more visible.',
      },
      {
        type: 'table',
        headers: ['Jewellery Choice', 'Best When', 'Product Direction'],
        rows: [
          ['Drop earrings only', 'Dress is simple, satin or evening-ready', 'Orsola, Concetta Long'],
          ['Bold earrings only', 'Dress is minimal and party-ready', 'Lusso'],
          ['Hoops only', 'Look should feel modern', 'Pave Hoops'],
          ['Medium studs + delicate necklace', 'Dress is detailed or neckline needs soft balance', 'Cadenza M'],
          ['Small studs + necklace', 'Necklace should lead the look', 'Cadenza S'],
          ['Butterfly earrings only', 'Look should feel romantic', 'Farfalla, Alidi Farfalla'],
          ['Huggies + necklace', 'Casual or work-event styling', 'Amadea'],
          ['Minimalist earrings + necklace', 'Clean, understated look', 'Laluce'],
        ],
      },
      { type: 'see-also', text: 'Minimalist Earrings Guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },

  // ── Section 4: Simple Off-Shoulder ───────────────────────────────────────────
  {
    heading: 'Earrings for Simple Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Simple off-shoulder dresses are the easiest to style because they give jewellery space to stand out.',
      },
      {
        type: 'paragraph',
        text: 'This is where Orsola, Lusso and Pave Hoops are strongest. Choose Orsola for movement, Lusso for a bold party look, and Pave Hoops for modern shape. If the dress is simple but the wearer prefers clean sparkle, Cadenza M is a safer choice.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-95.jpg',
        content: [
          {
            type: 'table',
            headers: ['Simple Off-Shoulder Dress Style', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Plain black off-shoulder dress', 'Bold earrings or drops', 'Lusso, Orsola'],
              ['Minimal white off-shoulder dress', 'Drops or hoops', 'Orsola, Pave Hoops'],
              ['Simple satin off-shoulder dress', 'Drops or bold earrings', 'Orsola, Lusso'],
              ['Minimal cocktail dress', 'Bold earrings, hoops or drops', 'Lusso, Pave Hoops, Orsola'],
              ['Simple evening dress', 'Long drops or medium studs', 'Concetta Long, Cadenza M'],
              ['Plain party dress', 'Bold statement earrings', 'Lusso'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Bold Statement Earrings Guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
    ],
  },

  // ── Section 5: Black Off-Shoulder ────────────────────────────────────────────
  {
    heading: 'Earrings for Black Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A black off-shoulder dress is one of the strongest outfits for statement jewellery because it combines an open neckline with a dark background.',
      },
      {
        type: 'paragraph',
        text: 'If the dress is simple, Lusso bold statement earrings can become the main jewellery moment. Orsola drop earrings are better for elegant movement. Pave Hoops work well for a modern party look. Cadenza M is better if the dress has detail or the wearer wants classic sparkle.',
      },
      {
        type: 'table',
        headers: ['Black Off-Shoulder Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple black off-shoulder dress', 'Bold earrings or drops', 'Lusso, Orsola'],
          ['Black satin off-shoulder dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Black party off-shoulder dress', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
          ['Black wedding guest off-shoulder dress', 'Drops or studs', 'Orsola, Cadenza M'],
          ['Detailed black off-shoulder dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Formal black off-shoulder dress', 'Long drops or classic studs', 'Concetta Long, Cadenza M'],
          ['Romantic black off-shoulder look', 'Butterfly earrings or drops', 'Farfalla, Orsola'],
        ],
      },
      { type: 'see-also', text: 'What Jewellery to Wear with a Black Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },

  // ── Section 6: Satin Off-Shoulder ────────────────────────────────────────────
  {
    heading: 'Earrings for Satin Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Satin off-shoulder dresses already have shine, so the earrings should add polish without making the look too heavy.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings are usually the strongest option because they add movement and follow the soft feeling of satin. Medium studs are better when the satin dress has strong colour, draping or detail. Bold earrings can work if the satin dress is simple and the jewellery should lead.',
      },
      {
        type: 'table',
        headers: ['Satin Off-Shoulder Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Black satin off-shoulder dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Champagne satin off-shoulder dress', 'Gold drops or studs', 'Orsola, Cadenza M'],
          ['Blush satin off-shoulder dress', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
          ['Green satin off-shoulder dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Red satin off-shoulder dress', 'Medium studs, drops or bold earrings', 'Cadenza M, Orsola, Lusso'],
          ['Satin wedding guest off-shoulder dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Satin party off-shoulder dress', 'Bold earrings or drops', 'Lusso, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 7: Romantic Off-Shoulder ─────────────────────────────────────────
  {
    heading: 'Earrings for Romantic Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Romantic off-shoulder dresses usually work best with soft, feminine jewellery.',
      },
      {
        type: 'paragraph',
        text: 'Butterfly earrings are especially strong because they add meaning and softness. Soft drops work well when the dress needs gentle movement. Medium studs are better when the dress already has floral detail, lace, embroidery or a strong colour.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-97.jpg',
        content: [
          {
            type: 'table',
            headers: ['Romantic Off-Shoulder Dress Style', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Blush off-shoulder dress', 'Butterfly earrings or soft drops', 'Farfalla, Orsola'],
              ['Floral off-shoulder dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
              ['Lace off-shoulder dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
              ['Champagne off-shoulder dress', 'Gold drops or medium studs', 'Orsola, Cadenza M'],
              ['Pastel off-shoulder dress', 'Butterfly earrings or short drops', 'Alidi Farfalla, Concetta Short'],
              ['Soft wedding guest dress', 'Drops or romantic earrings', 'Orsola, Farfalla'],
              ['Birthday off-shoulder dress', 'Butterfly earrings or medium studs', 'Alidi Farfalla, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },

  // ── Section 8: Wedding Guest Off-Shoulder ────────────────────────────────────
  {
    heading: 'Earrings for Wedding Guest Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Wedding guest off-shoulder dresses should feel elegant, polished and comfortable for long wear.',
      },
      {
        type: 'paragraph',
        text: 'Drop earrings are one of the strongest choices because they frame the face while keeping the neckline open. Medium studs are better if the dress already has lace, embroidery, florals or prints. Butterfly earrings work well for romantic wedding guest looks, especially with soft colours.',
      },
      {
        type: 'table',
        headers: ['Wedding Guest Off-Shoulder Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple wedding guest off-shoulder', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Satin wedding guest off-shoulder', 'Drop earrings', 'Orsola'],
          ['Floral off-shoulder dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
          ['Lace off-shoulder dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
          ['Champagne off-shoulder dress', 'Gold drops or studs', 'Orsola, Cadenza M'],
          ['Pastel off-shoulder dress', 'Butterfly earrings or soft drops', 'Alidi Farfalla, Concetta Short'],
          ['Black off-shoulder wedding guest dress', 'Drops or studs', 'Orsola, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 9: Party Off-Shoulder ────────────────────────────────────────────
  {
    heading: 'Earrings for Party Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'A party off-shoulder dress can carry stronger earrings because the neckline gives jewellery room to stand out.',
      },
      {
        type: 'paragraph',
        text: 'Choose Lusso if the earrings should become the main feature. Choose Orsola for movement and elegance. Choose Pave Hoops for shape and shine. Choose Cadenza M if the dress already has detail and needs clean sparkle.',
      },
      {
        type: 'table',
        headers: ['Party Off-Shoulder Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple party off-shoulder', 'Bold earrings', 'Lusso'],
          ['Satin party off-shoulder', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Black party off-shoulder', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Sequin off-shoulder dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Cocktail off-shoulder dress', 'Hoops, drops or medium studs', 'Pave Hoops, Orsola, Cadenza M'],
          ['Birthday off-shoulder dress', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Formal party off-shoulder', 'Long drops or bold earrings', 'Concetta Long, Lusso'],
        ],
      },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },

  // ── Section 10: Detailed Off-Shoulder ────────────────────────────────────────
  {
    heading: 'Earrings for Detailed Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'If an off-shoulder dress already has sequins, lace, embroidery, crystals, floral detail, ruffles or metallic fabric, the earrings should usually stay cleaner.',
      },
      {
        type: 'paragraph',
        text: 'Studs, huggies and minimalist earrings are the safest choices because they add polish without competing with the dress. If the dress needs a little movement, choose delicate drops rather than bold statement earrings.',
      },
      {
        type: 'table',
        headers: ['Detailed Off-Shoulder Dress Type', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Sequin off-shoulder dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Lace off-shoulder dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
          ['Embroidered off-shoulder dress', 'Studs', 'Cadenza S, Cadenza M'],
          ['Metallic off-shoulder dress', 'Minimalist earrings or studs', 'Laluce, Cadenza M'],
          ['Ruffled off-shoulder dress', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Floral off-shoulder dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
          ['Crystal-detail off-shoulder dress', 'Studs', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Stud vs Huggie Earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },

  // ── Section 11: By Hairstyle ──────────────────────────────────────────────────
  {
    heading: 'Earrings for Off-Shoulder Dresses by Hairstyle',
    content: [
      {
        type: 'paragraph',
        text: 'Hairstyle is very important with an off-shoulder dress because the neckline leaves the face and shoulders open.',
      },
      {
        type: 'paragraph',
        text: 'If the hair is down, choose earrings visible enough to show. Medium studs, hoops and drops usually work better than tiny earrings. If the hair is pulled back, drops, bold earrings and hoops can frame the face beautifully.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-99.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Earring Direction', 'Product Direction'],
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

  // ── Section 12: Metal Colour ──────────────────────────────────────────────────
  {
    heading: 'Gold vs Silver vs Rose Gold with Off-Shoulder Dresses',
    content: [
      {
        type: 'paragraph',
        text: 'Metal colour changes the mood of an off-shoulder dress.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold feels warm, classic and polished. White or silver tone feels clean, bright and modern. Rose gold feels soft, romantic and feminine. Because off-shoulder dresses expose more skin and neckline space, the metal colour can strongly affect the full look.',
      },
      {
        type: 'table',
        headers: ['Metal Colour', 'Feeling with Off-Shoulder Dresses', 'Best Dress Colours'],
        rows: [
          ['Yellow gold', 'Warm, classic and rich', 'Black, champagne, green, red, cream'],
          ['White or silver tone', 'Clean, bright and formal', 'Navy, black, grey, silver, cool pastels'],
          ['Rose gold', 'Soft, romantic and feminine', 'Blush, pink, champagne, soft green'],
          ['Mixed metals', 'Creative and modern', 'Minimal off-shoulder outfits and ear stacks'],
        ],
      },
      {
        type: 'paragraph',
        text: 'For romantic off-shoulder dresses, rose gold or yellow gold can work beautifully. For formal off-shoulder dresses, white/silver tone or yellow gold usually feels more refined.',
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },

  // ── Section 13: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'Off-Shoulder Dress Ear Stack Ideas',
    content: [
      {
        type: 'paragraph',
        text: 'An off-shoulder dress works well with ear stacks because the neckline gives earrings space to show.',
      },
      {
        type: 'paragraph',
        text: 'The best stack has one clear main piece and one smaller support piece. If the main earring is a drop, hoop or bold statement earring, keep the support earring small. If the main earring is a medium stud, you can add a huggie or minimalist earring.',
      },
      {
        type: 'table',
        headers: ['Off-Shoulder Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Elegant off-shoulder stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Bold off-shoulder stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Modern off-shoulder stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Classic off-shoulder stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
          ['Minimal off-shoulder stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic off-shoulder stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Formal off-shoulder stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Delicate off-shoulder stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
     
    ],
  },

  // ── Section 14: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Off-Shoulder Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest Off-Shoulder Dress Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They add visible sparkle without making the neckline feel crowded.' },
      { type: 'subheading', text: 'For Elegant Movement' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They work beautifully with off-shoulder dresses because they frame the face and keep the neckline open.' },
      { type: 'subheading', text: 'For Romantic Off-Shoulder Styling' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. These are best for blush, champagne, pastel, floral or romantic off-shoulder dresses.' },
      { type: 'subheading', text: 'For Delicate Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They add soft movement without feeling too bold.' },
      { type: 'subheading', text: 'For Formal Off-Shoulder Styling' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings. They create a refined long line for formal off-shoulder dresses and evening events.' },
      { type: 'subheading', text: 'For Modern Off-Shoulder Shape' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They work well with black off-shoulder dresses, satin off-shoulder dresses, jumpsuits and party looks.' },
      { type: 'subheading', text: 'For Bold Off-Shoulder Party Looks' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the off-shoulder dress is simple and the earrings should lead.' },
    ],
  },

  // ── Section 15: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Off-Shoulder Dress Role', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Best overall off-shoulder earring', 'Adds movement while keeping the neckline open'],
          ['Lusso bold statement earrings', 'Strongest party off-shoulder option', 'Best with simple off-shoulder dresses'],
          ['Pave Hoops', 'Modern off-shoulder shape', 'Adds curve and visible shine'],
          ['Cadenza M diamond stud earrings', 'Safest sparkle option', 'Works when the dress already has detail'],
          ['Cadenza S lab-grown diamond studs', 'Support piece', 'Balances drops, hoops and bold earrings'],
          ['Farfalla butterfly earrings', 'Romantic off-shoulder styling', 'Adds softness and meaning'],
          ['Alidi Farfalla butterfly earrings', 'Gift-led romantic option', 'Strong for birthdays and soft off-shoulder looks'],
          ['Concetta Short earrings', 'Delicate occasion styling', 'Good for wedding guest and bridesmaid looks'],
          ['Concetta Long earrings', 'Formal off-shoulder styling', 'Creates a refined longer line'],
          ['Amadea Huggie earrings', 'Modern support piece', 'Works with detailed dresses and ear stacks'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Useful with detailed off-shoulder outfits'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Choose off-shoulder dress earrings by mood. Pick Orsola for movement, Lusso for bold party sparkle, Pave Hoops for modern shape, Cadenza M for clean sparkle, Farfalla for romance and Concetta Short for delicate wedding guest styling.',
      },
    ],
  },

  // ── Section 16: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Off-Shoulder Jewellery Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is overcrowding the neckline. Off-shoulder dresses already create an open neckline, so heavy earrings and a heavy necklace together can feel too much.' },
      { type: 'paragraph', text: 'Another mistake is choosing earrings that are too tiny for the hairstyle. If hair is down or thick, very small earrings may disappear.' },
      { type: 'paragraph', text: 'A third mistake is wearing bold earrings with a heavily detailed off-shoulder dress. In that case, studs, huggies or delicate drops may look more polished.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the shoulder line. Earrings should frame the face and complement the openness of the dress, not compete with it.' },
      { type: 'paragraph', text: 'Finally, do not choose jewellery only by sparkle. Think about dress detail, fabric, hairstyle, metal colour, occasion and comfort.' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 17: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Off-Shoulder Earring Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing earrings for an off-shoulder dress, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the off-shoulder dress simple or detailed?',
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
      { type: 'paragraph', text: 'If you are unsure, choose drop earrings for a simple off-shoulder dress, medium studs for a detailed off-shoulder dress and butterfly earrings for a romantic off-shoulder look.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What earrings should I wear with an off-shoulder dress?',
    answer: 'Drop earrings, hoops, bold statement earrings, medium studs and butterfly earrings can all work with an off-shoulder dress. Choose based on dress detail, hairstyle and occasion.',
  },
  {
    question: 'Are drop earrings good with an off-shoulder dress?',
    answer: 'Yes, drop earrings are one of the best choices for off-shoulder dresses because they frame the face and keep the neckline open.',
  },
  {
    question: 'Can I wear bold earrings with an off-shoulder dress?',
    answer: 'Yes, bold earrings work beautifully with a simple off-shoulder dress. If the dress has heavy detail, studs or huggies may be better.',
  },
  {
    question: 'Should I wear a necklace with an off-shoulder dress?',
    answer: 'You can, but if the earrings are bold or long, it is usually better to skip the necklace or wear a very delicate chain.',
  },
  {
    question: 'What earrings should I wear with a black off-shoulder dress?',
    answer: 'A black off-shoulder dress works well with Lusso bold statement earrings, Orsola drop earrings, Pave Hoops or Cadenza M diamond studs depending on the dress detail.',
  },
  {
    question: 'What earrings should I wear with a satin off-shoulder dress?',
    answer: 'Drop earrings or medium diamond studs work well with satin off-shoulder dresses. Drops add movement, while studs keep the styling clean.',
  },
  {
    question: 'What earrings should wedding guests wear with an off-shoulder dress?',
    answer: 'Wedding guests can wear drop earrings, medium studs, butterfly earrings or delicate drops with off-shoulder dresses. The best choice depends on dress colour and detail.',
  },
  {
    question: 'Are butterfly earrings good with an off-shoulder dress?',
    answer: 'Yes, butterfly earrings work well with romantic off-shoulder dresses, especially blush, champagne, pastel, floral and soft wedding guest looks.',
  },
  {
    question: 'What hairstyle works best with earrings and an off-shoulder dress?',
    answer: 'Sleek ponytails, low buns, half-up hair and soft waves all work well. If hair is down, choose earrings visible enough to show.',
  },
  {
    question: 'What IWantJewels earrings are best with an off-shoulder dress?',
    answer: 'Orsola, Lusso, Pave Hoops, Cadenza M, Farfalla, Alidi Farfalla, Concetta Short and Concetta Long are strong off-shoulder dress options depending on whether you want movement, bold sparkle, shape, romance or clean sparkle.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'An off-shoulder dress gives earrings space to shine. Choose drop earrings when you want movement, bold statement earrings when the dress is simple, hoops when you want modern shape, medium studs when the outfit has detail, and butterfly earrings when the look should feel romantic.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want off-shoulder dress jewellery with real diamond sparkle. Choose Orsola for elegant movement, Lusso for bold evening impact, Pave Hoops for shape, Cadenza M for clean sparkle, Farfalla for romantic softness and Concetta Short for delicate occasion styling.',
  primaryLabel: 'Shop Earrings for Off-Shoulder Dresses',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Drop Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Party Earrings Guide',
  tertiaryHref: '/resources/earring-style-guides/party-earrings-guide',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'what-earrings-to-wear-with-an-off-shoulder-dress')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'what-earrings-to-wear-with-an-off-shoulder-dress', 3)
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
