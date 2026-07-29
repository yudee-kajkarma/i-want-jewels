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
  title: 'What Jewellery to Wear with a Red Dress',
  description:
    'Choose jewellery for a red dress with gold, silver, rose gold, diamond earrings, party looks, wedding guest outfits and evening styling ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-95.jpg',
  title: 'What Jewellery to Wear with a Red Dress:',
  subtitle: 'Earrings, Metals & Styling Guide',
  paragraphs: [
    'A red dress already makes a strong statement, so the jewellery should add polish without fighting the outfit. The best jewellery for a red dress usually depends on the shade of red, the dress fabric, the neckline and the occasion.',
    'Gold jewellery is one of the strongest choices with a red dress because it adds warmth, richness and evening elegance. Diamond earrings also work beautifully because they brighten the outfit without changing the colour mood. White or silver-tone jewellery can make a red dress feel sharper and more formal, while rose gold works best with softer reds, blush-red tones and romantic styling.',
    'This resource helps shoppers choose jewellery for red dresses by colour shade, neckline, fabric, event type and hairstyle. It also connects each styling direction to IWantJewels products such as Orsola drop earrings, Lusso bold statement earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Pave Hoops, Concetta Long earrings, Concetta Short earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings.',
  ],
  shopLabel: 'Shop Earrings for Red Dresses',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose jewellery for red dresses.',
    'Decide whether gold, white/silver tone or rose gold works best with red.',
    'Match earrings to bright red, burgundy, wine, cherry red, satin red and soft red dresses.',
    'Style red dresses for parties, weddings, dinners, birthdays and formal events.',
    'Choose earrings based on neckline and hairstyle.',
    'Decide between studs, hoops, drops, butterfly earrings and bold statement earrings.',
    'Build red dress ear stack combinations.',
    'Find IWantJewels product recommendations by red dress style.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-97.jpg',
}

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'Red Dress Jewellery Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main styling decision tool.' },
      {
        type: 'table',
        headers: ['Red Dress Style', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Bright red dress', 'Gold studs, drops or bold earrings', 'Cadenza M, Orsola, Lusso'],
          ['Burgundy dress', 'Gold drops, long drops or medium studs', 'Orsola, Concetta Long, Cadenza M'],
          ['Wine red dress', 'Drops, studs or refined hoops', 'Orsola, Cadenza M, Pave Hoops'],
          ['Red satin dress', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['Red party dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Red wedding guest dress', 'Drops, studs or soft romantic earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Detailed red dress', 'Studs or clean huggies', 'Cadenza M, Cadenza S, Amadea'],
          ['Simple red dress', 'One strong jewellery focal point', 'Lusso, Orsola, Pave Hoops'],
          ['Romantic red dress', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Red ear stack', 'Main earring + small support', 'Orsola + Cadenza S, Lusso + Cadenza S'],
        ],
      },
    ],
  },

  // ── Section 1: Why Red Needs Balanced Jewellery ───────────────────────────────
  {
    heading: 'Why Red Dresses Need Balanced Jewellery',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-99.jpg',
        content: [
          { type: 'paragraph', text: 'A red dress is already powerful. It naturally draws attention, so the jewellery should complete the outfit rather than compete with it.' },
          { type: 'paragraph', text: 'If the red dress is simple, the jewellery can be stronger. Bold earrings, drops and hoops can all work beautifully. If the red dress has sequins, lace, embroidery, ruffles, metallic shine or a dramatic neckline, the jewellery should usually be cleaner.' },
          { type: 'paragraph', text: 'Red also changes depending on fabric. Red satin reflects light, so drop earrings or medium studs usually work better than too many shiny accessories. Matte red dresses can handle stronger jewellery. Burgundy and wine dresses feel richer and more formal, while bright red dresses feel energetic and party-ready.' },
          { type: 'paragraph', text: 'The main rule is simple: choose one clear jewellery focal point. If the earrings are bold, keep the necklace minimal or skip it. If the necklace is the main piece, choose cleaner earrings.' },
          { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
        ],
      },
    ],
  },

  // ── Section 2: Metal Colour ───────────────────────────────────────────────────
  {
    heading: 'Gold, Silver or Rose Gold with a Red Dress',
    content: [
      { type: 'paragraph', text: 'Gold is usually the easiest metal colour with a red dress because it adds warmth and richness. White or silver-tone jewellery can work when the look should feel modern, formal or sharper. Rose gold can work with softer red shades, romantic outfits or blush-red styling, but it is usually more delicate than yellow gold.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-101.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Feeling with Red Dresses', 'Best Red Dress Types'],
            rows: [
              ['Yellow gold', 'Warm, rich, classic and evening-ready', 'Bright red, burgundy, wine, red satin, red party dresses'],
              ['White or silver tone', 'Clean, sharp, bright and formal', 'Deep red, wine, cool red, formal red dresses'],
              ['Rose gold', 'Soft, romantic and feminine', 'Soft red, blush-red, romantic red, floral red dresses'],
              ['Mixed metals', 'Modern and creative', 'Minimal red dresses and ear stacks'],
            ],
          },
          { type: 'paragraph', text: 'For IWantJewels styling, yellow gold is strongest for Orsola, Lusso, Pave Hoops and Cadenza M with red dresses. White or silver-tone styling works well for Cadenza M, Laluce, Concetta Long and Orsola when the outfit should feel cleaner. Rose gold is better for Farfalla, Alidi Farfalla and Concetta Short when the look should feel romantic.' },
        ],
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings' },
    ],
  },

  // ── Section 3: Bright Red ─────────────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Bright Red Dress',
    content: [
      { type: 'paragraph', text: 'A bright red dress feels bold, confident and energetic. The jewellery should be polished but not chaotic.' },
      { type: 'paragraph', text: 'Gold earrings are usually the strongest choice because they match the warmth of the dress. Medium diamond studs are safest when the outfit is already strong. Drop earrings add elegance. Bold statement earrings can work if the dress is simple and the earrings are meant to lead.' },
      {
        type: 'table',
        headers: ['Bright Red Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple bright red dress', 'Bold earrings or drops', 'Lusso, Orsola'],
          ['Bright red party dress', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Bright red satin dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Bright red V-neck dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Bright red high-neck dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Detailed bright red dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Bright red birthday dress', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for V-Neck Dresses', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-v-neck-dress' },
    ],
  },

  // ── Section 4: Burgundy / Wine ────────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Burgundy or Wine Dress',
    content: [
      { type: 'paragraph', text: 'Burgundy and wine dresses feel deeper, richer and more formal than bright red. They usually work beautifully with yellow gold, white/silver tone and refined diamond earrings.' },
      { type: 'paragraph', text: 'Drop earrings are especially strong because they add polish and movement. Concetta Long can work well for formal wine-coloured dresses. Cadenza M is a safer option when the dress already has velvet, lace, satin or detail.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-103.jpg',
        content: [
          {
            type: 'table',
            headers: ['Burgundy / Wine Dress Style', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Simple burgundy dress', 'Drops or bold earrings', 'Orsola, Lusso'],
              ['Burgundy satin dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Wine evening dress', 'Long drops or refined studs', 'Concetta Long, Cadenza M'],
              ['Burgundy wedding guest dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Detailed burgundy dress', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Burgundy party dress', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Burgundy sweetheart dress', 'Drops or romantic earrings', 'Orsola, Farfalla'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery for Sweetheart Neckline', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-sweetheart-neckline' },
    ],
  },

  // ── Section 5: Red Satin ──────────────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Red Satin Dress',
    content: [
      { type: 'paragraph', text: 'Red satin already has shine and colour strength, so the jewellery should feel balanced.' },
      { type: 'paragraph', text: 'Drop earrings work beautifully with red satin because they add movement and elegance. Medium studs are safer when the dress has strong draping, shine or a dramatic neckline. Bold statement earrings work best only when the satin dress is simple and the earrings are meant to be the main feature.' },
      {
        type: 'table',
        headers: ['Red Satin Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple red satin dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Red satin slip dress', 'Drop earrings', 'Orsola'],
          ['Red satin high-neck dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Red satin V-neck dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Red satin party dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Red satin wedding guest dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Detailed red satin dress', 'Studs or huggies', 'Cadenza M, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 6: Red Party Dress ────────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Red Party Dress',
    content: [
      { type: 'paragraph', text: 'A red party dress can carry stronger earrings when the outfit is simple. The key is to avoid making the look too loud.' },
      { type: 'paragraph', text: 'Choose Lusso if the earrings should become the main jewellery feature. Choose Orsola if you want elegance and movement. Choose Pave Hoops if you want shape and sparkle. Choose Cadenza M if the dress already has detail and needs clean diamond polish.' },
      {
        type: 'table',
        headers: ['Red Party Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple red party dress', 'Bold earrings', 'Lusso'],
          ['Red cocktail dress', 'Hoops, drops or medium studs', 'Pave Hoops, Orsola, Cadenza M'],
          ['Red satin party dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Red sequin dress', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Red birthday dress', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Red jumpsuit', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Formal red party dress', 'Long drops or refined studs', 'Concetta Long, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Bold Statement Earrings Guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
    ],
  },

  // ── Section 7: Red Wedding Guest ──────────────────────────────────────────────
  {
    heading: 'Best Jewellery for a Red Wedding Guest Dress',
    content: [
      { type: 'paragraph', text: 'A red wedding guest dress should feel elegant and respectful, not too overpowering. The jewellery should soften and polish the outfit.' },
      { type: 'paragraph', text: 'Drop earrings are one of the best choices because they add movement and elegance. Medium studs are better when the dress is detailed or bright. Butterfly earrings can work if the red dress has a romantic or floral mood.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-105.jpg',
        content: [
          {
            type: 'table',
            headers: ['Red Wedding Guest Dress Style', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Simple red wedding guest dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Red satin wedding guest dress', 'Drop earrings', 'Orsola'],
              ['Burgundy wedding guest dress', 'Drops or refined studs', 'Orsola, Cadenza M'],
              ['Floral red wedding guest dress', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
              ['Lace red dress', 'Studs or delicate drops', 'Cadenza M, Concetta Short'],
              ['Detailed red wedding guest dress', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Romantic red wedding guest dress', 'Butterfly earrings or soft drops', 'Farfalla, Concetta Short'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 8: By Neckline ────────────────────────────────────────────────────
  {
    heading: 'Jewellery for Red Dresses by Neckline',
    content: [
      { type: 'paragraph', text: 'The neckline helps decide whether earrings, necklace or both should lead.' },
      { type: 'paragraph', text: 'Open necklines can carry drops or bold earrings. High necklines usually work better with studs or hoops. Sweetheart and off-shoulder red dresses can look beautiful with drops, romantic earrings or one bold focal piece.' },
      {
        type: 'table',
        headers: ['Red Dress Neckline', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['V-neck red dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Sweetheart red dress', 'Drops, butterfly earrings or bold earrings', 'Orsola, Farfalla, Lusso'],
          ['Off-shoulder red dress', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['High-neck red dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Halter red dress', 'Studs or slim drops', 'Cadenza M, Concetta Long'],
          ['Square-neck red dress', 'Hoops, drops or medium studs', 'Pave Hoops, Orsola, Cadenza M'],
          ['Strapless red dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Cowl-neck red dress', 'Studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Earrings for Off-Shoulder Dresses', href: '/resources/earring-style-guides/what-earrings-to-wear-with-an-off-shoulder-dress' },
    ],
  },

  // ── Section 9: By Hairstyle ───────────────────────────────────────────────────
  {
    heading: 'Jewellery for Red Dresses by Hairstyle',
    content: [
      { type: 'paragraph', text: 'Hairstyle changes how visible the jewellery looks, especially with a strong dress colour like red.' },
      { type: 'paragraph', text: 'If the hair is down, very small earrings can disappear. Medium studs, hoops and drops usually show better. If the hair is pulled back, drop earrings, hoops and bold statement earrings can frame the face beautifully.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-107.jpg',
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

  // ── Section 10: Necklace ──────────────────────────────────────────────────────
  {
    heading: 'Necklace or No Necklace with a Red Dress?',
    content: [
      { type: 'paragraph', text: 'The necklace decision depends on the neckline and the earrings.' },
      { type: 'paragraph', text: 'If the earrings are bold or long, skip the necklace or choose a very delicate chain. If the earrings are simple studs, a necklace can become more visible. If the red dress has a high neckline, earrings usually matter more than a necklace. If the dress has a deep V-neck, a delicate necklace can work with cleaner earrings.' },
      {
        type: 'table',
        headers: ['Earring Choice', 'Necklace Direction'],
        rows: [
          ['Bold statement earrings', 'No necklace or very delicate chain'],
          ['Long drop earrings', 'No necklace or simple pendant'],
          ['Hoop earrings', 'Delicate necklace or no necklace'],
          ['Medium studs', 'Necklace can be more visible'],
          ['Small studs', 'Necklace can lead the look'],
          ['Butterfly earrings', 'Soft delicate necklace if needed'],
          ['Huggies', 'Simple necklace can work'],
          ['Minimalist earrings', 'Necklace can become the focal point'],
        ],
      },
      { type: 'paragraph', text: 'For a red dress, avoid making both the earrings and necklace too strong. Red already has visual power, so one clear jewellery focal point usually looks more elegant.' },
      { type: 'see-also', text: 'Jewellery for V-Neck Dresses', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-v-neck-dress' },
    ],
  },

  // ── Section 11: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'Red Dress Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'A red dress can work beautifully with ear stacks when the stack stays controlled.' },
      { type: 'paragraph', text: 'For bright red and burgundy, gold-toned stacks feel warm and polished. For cooler red or wine shades, white/silver tone can also feel refined. The stack should have one main piece and one smaller support piece.' },
      {
        type: 'table',
        headers: ['Red Dress Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Elegant red dress stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Bold red party stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Modern red stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Classic red stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
          ['Minimal red stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic red stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Formal burgundy stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Delicate red wedding stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
     
    ],
  },

  // ── Section 12: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Red Dress Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest Red Dress Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They add visible sparkle without making a strong red outfit feel too busy.' },
      { type: 'subheading', text: 'For Elegant Red Dress Movement' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They work beautifully with red satin, burgundy, wedding guest and evening dresses.' },
      { type: 'subheading', text: 'For Bold Red Party Looks' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the red dress is simple and the earrings should lead.' },
      { type: 'subheading', text: 'For Modern Red Dress Shape' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They are strong for red party dresses, red jumpsuits, high-neck red dresses and simple red outfits.' },
      { type: 'subheading', text: 'For Formal Burgundy Styling' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings when the outfit needs a refined long line, especially with burgundy, wine or formal red evening dresses.' },
      { type: 'subheading', text: 'For Romantic Red Dress Styling' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings, Alidi Farfalla butterfly earrings or Concetta Short earrings. These work well with romantic, floral, soft red or wedding guest looks.' },
    ],
  },

  // ── Section 13: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Red Dress Role', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Best overall red dress earring', 'Adds movement and polish'],
          ['Lusso bold statement earrings', 'Strongest red party option', 'Best with simple red dresses'],
          ['Cadenza M diamond stud earrings', 'Safest sparkle option', 'Strong when the red dress already has detail'],
          ['Cadenza S lab-grown diamond studs', 'Support piece', 'Balances drops, hoops and bold earrings'],
          ['Pave Hoops', 'Best modern shape option', 'Works well with red party dresses and jumpsuits'],
          ['Concetta Long earrings', 'Formal red dress styling', 'Creates a refined evening line'],
          ['Concetta Short earrings', 'Delicate wedding guest styling', 'Works for romantic and softer red looks'],
          ['Farfalla butterfly earrings', 'Romantic red dress styling', 'Adds softness and meaning'],
          ['Alidi Farfalla butterfly earrings', 'Gift-led romantic option', 'Strong for birthdays and soft red outfits'],
          ['Amadea Huggie earrings', 'Modern support piece', 'Works with detailed dresses and ear stacks'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Useful with detailed red dresses'],
        ],
      },
      { type: 'paragraph', text: 'Choose red dress jewellery by intensity. Pick Orsola for elegant movement, Lusso for bold party sparkle, Cadenza M for clean diamond polish, Pave Hoops for modern shape, and Farfalla or Concetta Short for softer romantic red looks.' },
    ],
  },

  // ── Section 14: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Red Dress Jewellery Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is adding too many strong jewellery pieces to an already strong red dress. Red is powerful, so the styling usually looks better with one clear focal point.' },
      { type: 'paragraph', text: 'Another mistake is choosing earrings that are too tiny for a bright red or burgundy evening dress. Strong colours can overpower very small earrings, especially when hair is down.' },
      { type: 'paragraph', text: 'A third mistake is wearing bold earrings with a highly detailed red dress. If the dress has sequins, lace, embroidery, heavy draping or a dramatic neckline, studs or huggies may look more polished.' },
      { type: 'paragraph', text: 'Another mistake is choosing rose gold for every red dress. Rose gold works best with softer romantic reds, but yellow gold is usually stronger for bright red, burgundy and wine.' },
      { type: 'paragraph', text: 'Finally, do not ignore the fabric. Red satin needs balanced jewellery because the fabric already has shine, while matte red dresses can usually carry stronger earrings.' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 15: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Red Dress Jewellery Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing jewellery for a red dress, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the red shade bright red, burgundy, wine, cherry, soft red or rust red?',
          'Is the dress simple or detailed?',
          'Is the fabric satin, lace, sequin, floral, knit or plain?',
          'Will my hair hide or show the earrings?',
          'Do I want sparkle, movement, shape or softness?',
          'Should the earrings or necklace be the main jewellery moment?',
          'Am I wearing a necklace, or should I skip it?',
          'Does gold, white/silver tone or rose gold suit this red shade better?',
          'Is the occasion a wedding, party, dinner or formal event?',
          'Are the earrings comfortable for the full event?',
          'Is the ear stack balanced with one main piece?',
          'Can the jewellery be worn again with other outfits?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose gold drop earrings for a simple red or burgundy dress, medium studs for a detailed red dress, and bold earrings only when the outfit is clean enough to let the jewellery lead.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery should I wear with a red dress?', answer: 'The best jewellery for a red dress depends on the shade and dress detail. Gold jewellery, diamond earrings, drop earrings, hoops and medium studs all work well when styled with balance.' },
  { question: 'What earrings look best with a red dress?', answer: 'Drop earrings, medium diamond studs, hoops and bold statement earrings can all work with a red dress. Choose drops for elegance, studs for clean sparkle, hoops for shape and bold earrings for simple party dresses.' },
  { question: 'Does gold jewellery go with a red dress?', answer: 'Yes, gold jewellery is one of the best choices with a red dress because it adds warmth, richness and evening polish.' },
  { question: 'Does silver jewellery go with a red dress?', answer: 'Yes, white or silver-tone jewellery can work with red dresses when the look should feel sharper, cooler or more formal.' },
  { question: 'Does rose gold go with a red dress?', answer: 'Rose gold can work with softer red shades, blush-red outfits and romantic red dresses. Yellow gold is usually stronger for bright red, burgundy and wine.' },
  { question: 'What earrings should I wear with a red satin dress?', answer: 'A red satin dress works well with Orsola drop earrings or Cadenza M diamond studs. Drops add movement, while studs keep the look clean.' },
  { question: 'What jewellery should I wear with a burgundy dress?', answer: 'Burgundy dresses work beautifully with gold drop earrings, long drops, medium diamond studs and refined diamond jewellery.' },
  { question: 'What jewellery should wedding guests wear with a red dress?', answer: 'Wedding guests can wear drop earrings, medium studs, butterfly earrings or delicate drops with a red dress. The best choice depends on whether the dress is simple, satin, lace or detailed.' },
  { question: 'Should I wear a necklace with a red dress?', answer: 'You can, but if the earrings are bold or long, skip the necklace or keep it very delicate. Red dresses usually look better with one clear jewellery focal point.' },
  { question: 'What IWantJewels earrings are best with a red dress?', answer: 'Orsola, Lusso, Cadenza M, Pave Hoops, Concetta Long, Farfalla, Alidi Farfalla and Concetta Short are strong red dress options depending on whether you want movement, boldness, sparkle, shape or softness.' },
]

const cta: V2CTABlock = {
  heading: 'A red dress already has impact, so the jewellery should add balance. Choose gold drops for elegant movement, medium studs for clean sparkle, hoops for modern shape, and bold earrings when the dress is simple enough to let the jewellery lead.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want red dress jewellery with real diamond sparkle. Choose Orsola for elegant movement, Lusso for bold party styling, Cadenza M for clean sparkle, Pave Hoops for shape, Concetta Long for formal burgundy looks and Farfalla or Concetta Short for softer romantic styling.',
  primaryLabel: 'Shop Earrings for Red Dresses',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Party Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Party Earrings Guide',
  tertiaryHref: '/resources/earring-style-guides/party-earrings-guide',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'what-jewellery-to-wear-with-a-red-dress')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'what-jewellery-to-wear-with-a-red-dress', 3)
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
