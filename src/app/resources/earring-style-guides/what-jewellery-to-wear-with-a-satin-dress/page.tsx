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
  title: 'What Jewellery to Wear with a Satin Dress',
  description:
    'Choose jewellery for a satin dress with earrings, gold, silver, diamonds, party looks, wedding guest outfits and evening styling ideas.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-84.jpg',
  title: 'What Jewellery to Wear with a Satin Dress:',
  subtitle: 'Earrings, Metals & Styling Guide',
  paragraphs: [
    'A satin dress already has shine, movement and a soft evening feel. That means the jewellery should add polish without fighting the fabric. The best jewellery for a satin dress usually depends on how simple the dress is, what neckline it has, and whether the occasion is a wedding, party, dinner, birthday or formal event.',
    'Drop earrings work beautifully with satin because they echo the movement of the fabric. Medium diamond studs are perfect when the satin dress already has a strong neckline or bold colour. Hoops can make satin feel more modern, while bold statement earrings work best when the satin dress is very simple.',
    'This resource helps shoppers choose jewellery for satin dresses by outfit colour, neckline, hairstyle, metal tone and occasion. It also connects each styling direction to IWantJewels products such as Orsola drop earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Pave Hoops, Lusso bold statement earrings, Concetta Short earrings, Concetta Long earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings and Amadea Huggie earrings.',
  ],
  shopLabel: 'Shop Earrings for Satin Dresses',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose the best earrings for a satin dress.',
    'Decide between studs, hoops, huggies, drops, butterfly earrings and bold statement earrings.',
    'Match jewellery to black, champagne, pink, green, navy, red and pastel satin dresses.',
    'Style satin dresses for weddings, parties, dinners, birthdays and formal events.',
    'Choose jewellery based on neckline and hairstyle.',
    'Decide whether gold, white/silver tone or rose gold works best with satin.',
    'Build satin dress ear stack combinations.',
    'Find IWantJewels product recommendations by satin dress style.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-85.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'Satin Dress Jewellery Selector',
    content: [
      {
        type: 'paragraph',
        text: 'Use this table near the top of the page as the main styling decision tool.',
      },
      {
        type: 'table',
        headers: ['Satin Dress Style', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Black satin dress', 'Drops, bold earrings or medium studs', 'Orsola, Lusso, Cadenza M'],
          ['Champagne satin dress', 'Gold drops, studs or soft earrings', 'Orsola, Cadenza M, Concetta Short'],
          ['Pink or blush satin dress', 'Rose gold, butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Orsola'],
          ['Green satin dress', 'Gold earrings, drops or hoops', 'Orsola, Pave Hoops, Cadenza M'],
          ['Navy satin dress', 'White/silver tone, studs or drops', 'Cadenza M, Orsola'],
          ['Red satin dress', 'Gold studs, drops or bold earrings', 'Cadenza M, Orsola, Lusso'],
          ['Satin slip dress', 'Drop earrings', 'Orsola, Concetta Long'],
          ['Satin high-neck dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Satin strapless dress', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Satin wedding guest dress', 'Drops, studs or soft romantic earrings', 'Orsola, Cadenza M, Farfalla'],
        ],
      },
    ],
  },

  // ── Section 1: Why Satin Needs Balanced Jewellery ───────────────────────────
  {
    heading: 'Why Satin Needs Balanced Jewellery',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-87.jpg',
        content: [
          {
            type: 'paragraph',
            text: 'Satin has a natural shine, so jewellery should be chosen carefully. The goal is not to add sparkle everywhere. The goal is to add the right amount of sparkle in the right place.',
          },
          {
            type: 'paragraph',
            text: 'A satin dress already catches light. If the jewellery is too heavy, the whole look can feel overdone. If the jewellery is too small, it may disappear against the shine of the fabric. The best choice usually sits in the middle: visible enough to frame the face, but balanced enough to let the satin stay elegant.',
          },
          {
            type: 'paragraph',
            text: 'Drop earrings are often the easiest choice because they add movement without needing a necklace. Medium studs are safer when the dress is colourful or detailed. Hoops are better for modern satin looks, while bold statement earrings are strongest with very simple satin dresses.',
          },
          { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
          
        ],
      },
    ],
  },

  // ── Section 2: Black Satin Dress ─────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Black Satin Dress',
    content: [
      {
        type: 'paragraph',
        text: 'A black satin dress is one of the strongest outfits for lab-grown diamond earrings because the dark fabric gives sparkle a clear background.',
      },
      {
        type: 'paragraph',
        text: 'If the dress is simple, choose Orsola drop earrings, Lusso bold statement earrings or Pave Hoops. If the dress already has detail, choose Cadenza M diamond stud earrings or Amadea Huggie earrings. If the dress is formal, Concetta Long earrings can create a refined evening line.',
      },
      {
        type: 'table',
        headers: ['Black Satin Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple black satin dress', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Satin slip dress', 'Drop earrings', 'Orsola, Concetta Long'],
          ['Black satin high-neck dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Black satin strapless dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Black satin party dress', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
          ['Detailed black satin dress', 'Studs or huggies', 'Cadenza M, Amadea'],
        ],
      },
      { type: 'see-also', text: 'What Jewellery to Wear with a Black Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
      { type: 'divider' },
    ],
  },

  // ── Section 3: Champagne Satin Dress ─────────────────────────────────────────
  {
    heading: 'Best Earrings for a Champagne Satin Dress',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-89.jpg',
        content: [
          {
            type: 'paragraph',
            text: 'Champagne satin feels warm, soft and elegant. Yellow gold jewellery usually works beautifully with champagne satin because both have warmth. Rose gold can also work if the look should feel romantic.',
          },
          {
            type: 'paragraph',
            text: 'Drop earrings are especially strong with champagne satin dresses because they add soft movement. Cadenza M diamond stud earrings work well if the neckline is already detailed. Concetta Short earrings can create a delicate wedding guest or bridesmaid look.',
          },
          { type: 'see-also', text: 'Wedding Guest Jewellery Guide', href: '/resources/occasion-jewellery-guides/lab-grown-diamond-earrings-for-weddings' },
         
        ],
      },
      {
        type: 'table',
        headers: ['Champagne Satin Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Champagne slip dress', 'Drop earrings', 'Orsola'],
          ['Champagne wedding guest dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Champagne bridesmaid dress', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Champagne high-neck dress', 'Studs', 'Cadenza M'],
          ['Champagne party dress', 'Drops or hoops', 'Orsola, Pave Hoops'],
          ['Soft romantic champagne dress', 'Butterfly earrings or soft drops', 'Farfalla, Orsola'],
        ],
      },
    ],
  },

  // ── Section 4: Pink / Blush Satin Dress ──────────────────────────────────────
  {
    heading: 'Best Earrings for a Pink or Blush Satin Dress',
    content: [
      {
        type: 'paragraph',
        text: 'Pink and blush satin dresses usually look best with soft jewellery. Rose gold, yellow gold, butterfly earrings, small studs and delicate drops work especially well.',
      },
      {
        type: 'paragraph',
        text: 'If the dress feels romantic, Farfalla butterfly earrings or Alidi Farfalla butterfly earrings can add meaning and softness. If the dress needs more polish, Orsola drop earrings or Cadenza M studs are safer. For bridesmaids, Cadenza S or Concetta Short can feel delicate and wearable.',
      },
      {
        type: 'table',
        headers: ['Pink / Blush Satin Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Blush satin wedding guest dress', 'Butterfly earrings or drops', 'Farfalla, Orsola'],
          ['Pink satin birthday dress', 'Butterfly earrings or medium studs', 'Alidi Farfalla, Cadenza M'],
          ['Pastel satin bridesmaid dress', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Romantic satin slip dress', 'Soft drops', 'Orsola, Concetta Short'],
          ['Pink satin party dress', 'Drops, hoops or butterfly earrings', 'Orsola, Pave Hoops, Farfalla'],
          ['Soft floral satin look', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
      { type: 'see-also', text: 'Wedding Guest Jewellery Guide', href: '/resources/occasion-jewellery-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 5: Green Satin Dress ─────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Green Satin Dress',
    content: [
      {
        type: 'paragraph',
        text: 'Green satin usually pairs beautifully with yellow gold and lab-grown diamond sparkle. The warmth of gold balances the richness of green, while diamonds add brightness.',
      },
      {
        type: 'paragraph',
        text: 'For a green satin dress, Orsola drop earrings are a strong choice because they add movement and polish. Pave Hoops work well for a modern look. Cadenza M is best if the dress already has a strong neckline or dramatic shape.',
      },
      {
        type: 'table',
        headers: ['Green Satin Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Emerald satin dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Green satin wedding guest dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Green satin slip dress', 'Drop earrings', 'Orsola'],
          ['Green satin party dress', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['High-neck green satin dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Soft sage satin dress', 'Studs, butterfly earrings or delicate drops', 'Cadenza S, Farfalla, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Green Dress', href: '#' },
    ],
  },

  // ── Section 6: Navy Satin Dress ──────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Navy Satin Dress',
    content: [
      {
        type: 'paragraph',
        text: 'Navy satin looks elegant with white/silver tones, yellow gold and lab-grown diamond sparkle. White or silver-tone earrings make the look feel crisp and formal. Yellow gold adds warmth.',
      },
      {
        type: 'paragraph',
        text: 'Cadenza M diamond stud earrings are a strong safe choice for navy satin because they keep the look clean. Orsola drop earrings work when the outfit needs movement. Pave Hoops can work for modern evening styling.',
      },
      {
        type: 'table',
        headers: ['Navy Satin Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Navy satin wedding guest dress', 'Studs or drops', 'Cadenza M, Orsola'],
          ['Navy satin evening dress', 'Drops or long drops', 'Orsola, Concetta Long'],
          ['Navy satin high-neck dress', 'Studs', 'Cadenza M'],
          ['Navy satin party dress', 'Hoops or drops', 'Pave Hoops, Orsola'],
          ['Navy satin formal dress', 'Refined drops or medium studs', 'Concetta Long, Cadenza M'],
          ['Minimal navy satin dress', 'One clean focal earring', 'Orsola, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },

  // ── Section 7: Red Satin Dress ───────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Red Satin Dress',
    content: [
      {
        type: 'paragraph',
        text: 'A red satin dress already feels strong, so jewellery should be chosen with balance. Yellow gold usually works beautifully because it adds warmth. White or silver-tone jewellery can make the look sharper and more formal.',
      },
      {
        type: 'paragraph',
        text: 'For red satin, Cadenza M diamond stud earrings are a safe polished choice. Orsola drop earrings add movement for dinners or weddings. Lusso bold statement earrings can work if the red satin dress is simple and the earrings are meant to create a strong party look.',
      },
      {
        type: 'table',
        headers: ['Red Satin Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple red satin dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Red satin dinner dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Red satin wedding guest dress', 'Drops or studs', 'Orsola, Cadenza M'],
          ['Red satin high-neck dress', 'Studs', 'Cadenza M'],
          ['Red satin party dress', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
          ['Red satin romantic look', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Red Dress', href: '#' },
    ],
  },

  // ── Section 8: By Neckline ───────────────────────────────────────────────────
  {
    heading: 'Jewellery for Satin Dress by Neckline',
    content: [
      {
        type: 'paragraph',
        text: 'The neckline is one of the easiest ways to choose jewellery for satin.',
      },
      {
        type: 'paragraph',
        text: 'Open necklines usually work beautifully with drop earrings. High necklines often look cleaner with studs or hoops. Strapless satin dresses can carry bold earrings because the neckline gives jewellery more space.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Satin Dress Neckline', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Strapless satin dress', 'Drops or bold earrings', 'Orsola, Lusso'],
              ['Sweetheart satin dress', 'Soft drops or butterfly earrings', 'Orsola, Farfalla'],
              ['V-neck satin dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Off-shoulder satin dress', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
              ['High-neck satin dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
              ['Halter satin dress', 'Studs or slim drops', 'Cadenza M, Concetta Long'],
              ['Cowl-neck satin dress', 'Studs or soft drops', 'Cadenza M, Orsola'],
              ['Square-neck satin dress', 'Hoops, drops or medium studs', 'Pave Hoops, Orsola, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery for V-Neck Dresses', href: '#' },
     
    ],
  },

  // ── Section 9: By Hairstyle ──────────────────────────────────────────────────
  {
    heading: 'Jewellery for Satin Dress by Hairstyle',
    content: [
      {
        type: 'paragraph',
        text: 'Hairstyle changes how visible earrings are. Satin often looks best with soft waves, sleek buns, ponytails or tucked hair, and each hairstyle changes the jewellery choice.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Hair down', 'Medium studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
              ['Soft waves', 'Drops, butterfly earrings or medium studs', 'Orsola, Farfalla, Cadenza M'],
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

  // ── Section 10: Metal Colour ─────────────────────────────────────────────────
  {
    heading: 'Gold vs Silver vs Rose Gold Jewellery with Satin',
    content: [
      {
        type: 'paragraph',
        text: 'Satin changes with light, so metal colour matters.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold makes satin feel warm, rich and classic. White or silver-tone jewellery makes satin feel clean, modern and formal. Rose gold softens satin and works especially well with blush, pink, champagne and romantic dress colours.',
      },
      {
        type: 'table',
        headers: ['Metal Colour', 'Feeling with Satin', 'Best Satin Dress Colours'],
        rows: [
          ['Yellow gold', 'Warm, rich and elegant', 'Black, champagne, green, red, cream'],
          ['White or silver tone', 'Clean, bright and formal', 'Navy, black, grey, silver, cool pastels'],
          ['Rose gold', 'Soft, romantic and feminine', 'Blush, pink, champagne, soft green'],
          ['Mixed metals', 'Modern and creative', 'Minimal satin outfits and ear stacks'],
        ],
      },
      {
        type: 'paragraph',
        text: 'For gifts or wedding guest looks, the safest metal colour is usually the one the wearer already owns and wears most often.',
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },

  // ── Section 11: Necklace ─────────────────────────────────────────────────────
  {
    heading: 'Necklace or No Necklace with a Satin Dress?',
    content: [
      {
        type: 'paragraph',
        text: 'Satin already reflects light, so the necklace should not compete with the fabric or earrings.',
      },
      {
        type: 'paragraph',
        text: 'If the earrings are bold or long, skip the necklace or choose a very delicate chain. If the earrings are small studs, a necklace can be more visible. If the dress has a cowl neckline, halter neckline or high neck, earrings are usually better than a necklace.',
      },
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
      {
        type: 'paragraph',
        text: 'For Orsola, Lusso or Concetta Long, the earrings usually give enough detail. For Cadenza S or Cadenza M, a simple necklace can work if the neckline allows it.',
      },
      { type: 'see-also', text: 'Bold Statement Earrings Guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
    ],
  },

  // ── Section 12: Ear Stack Ideas ──────────────────────────────────────────────
  {
    heading: 'Satin Dress Ear Stack Ideas',
    content: [
      {
        type: 'paragraph',
        text: 'A satin dress can work beautifully with ear stacks if the stack stays balanced.',
      },
      {
        type: 'paragraph',
        text: 'Because satin already has shine, the ear stack should usually have one main piece and one smaller support piece. If the main earring is a drop or bold earring, the support should be small.',
      },
      {
        type: 'table',
        headers: ['Satin Dress Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Elegant satin stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Bold satin stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Modern satin stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Classic satin stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
          ['Minimal satin stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic satin stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Formal satin stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
   
    ],
  },

  // ── Section 13: By Occasion ──────────────────────────────────────────────────
  {
    heading: 'Jewellery for Satin Dress by Occasion',
    content: [
      {
        type: 'paragraph',
        text: 'The occasion should decide how strong the jewellery should be.',
      },
      {
        type: 'paragraph',
        text: 'A wedding guest satin dress needs elegance. A birthday satin dress can feel softer or more playful. A party satin dress can carry stronger earrings. A formal dinner satin dress usually looks best with refined drops or classic studs.',
      },
      {
        type: 'table',
        headers: ['Occasion', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Wedding guest', 'Drops, studs or soft romantic earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Bridesmaid look', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Party', 'Bold earrings, hoops or drops', 'Lusso, Pave Hoops, Orsola'],
          ['Birthday dinner', 'Medium studs, butterfly earrings or drops', 'Cadenza M, Farfalla, Orsola'],
          ['Anniversary dinner', 'Drops or romantic earrings', 'Orsola, Alidi Farfalla'],
          ['Formal dinner', 'Refined drops or medium studs', 'Concetta Long, Orsola, Cadenza M'],
          ['Cocktail event', 'Hoops, drops or visible studs', 'Pave Hoops, Orsola, Cadenza M'],
          ['Work event', 'Studs, huggies or small hoops', 'Cadenza M, Amadea, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },

  // ── Section 14: Product Pathways ─────────────────────────────────────────────
  {
    heading: 'Product Pathways by Satin Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest Satin Dress Earrings' },
      {
        type: 'paragraph',
        text: 'Choose Cadenza M diamond stud earrings. They add visible sparkle without competing with satin shine.',
      },
      { type: 'subheading', text: 'For Elegant Satin Movement' },
      {
        type: 'paragraph',
        text: 'Choose Orsola drop earrings. They work beautifully with satin slip dresses, black satin dresses, champagne satin dresses and wedding guest outfits.',
      },
      { type: 'subheading', text: 'For Formal Satin Styling' },
      {
        type: 'paragraph',
        text: 'Choose Concetta Long earrings. They create a refined long line that works well with formal satin dresses and evening events.',
      },
      { type: 'subheading', text: 'For Soft Satin Styling' },
      {
        type: 'paragraph',
        text: 'Choose Concetta Short earrings, Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. These are best for blush, champagne, pastel or romantic satin looks.',
      },
      { type: 'subheading', text: 'For Modern Satin Shape' },
      {
        type: 'paragraph',
        text: 'Choose Pave Hoops. They work well with satin jumpsuits, high-neck dresses, black satin outfits and party looks.',
      },
      { type: 'subheading', text: 'For Bold Satin Party Looks' },
      {
        type: 'paragraph',
        text: 'Choose Lusso bold statement earrings when the satin dress is simple and the earrings should lead.',
      },
    ],
  },

  // ── Section 15: Product Recommendations ─────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Satin Dress Role', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Best overall satin dress earring', 'Adds movement and polish'],
          ['Cadenza M diamond stud earrings', 'Safest sparkle option', 'Works when satin already has shine or detail'],
          ['Cadenza S lab-grown diamond studs', 'Support piece', 'Balances drops, hoops and bold earrings'],
          ['Concetta Long earrings', 'Formal satin styling', 'Creates a refined long line'],
          ['Concetta Short earrings', 'Soft satin styling', 'Good for delicate wedding or bridesmaid looks'],
          ['Pave Hoops', 'Modern satin shape', 'Adds curve and visible shine'],
          ['Lusso bold statement earrings', 'Strongest party satin option', 'Best with simple satin dresses'],
          ['Farfalla butterfly earrings', 'Romantic satin styling', 'Adds softness and meaning'],
          ['Alidi Farfalla butterfly earrings', 'Gift-led romantic styling', 'Strong for birthdays and soft satin looks'],
          ['Amadea Huggie earrings', 'Modern support piece', 'Works with satin work events and ear stacks'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Useful with detailed satin outfits'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Choose satin dress jewellery by balance. Pick Orsola for movement, Cadenza M for clean sparkle, Pave Hoops for modern shape, Lusso for bold party styling and Farfalla or Concetta Short for softer romantic satin looks.',
      },
    ],
  },

  // ── Section 16: Mistakes ─────────────────────────────────────────────────────
  {
    heading: 'Common Satin Dress Jewellery Mistakes to Avoid',
    content: [
      {
        type: 'paragraph',
        text: 'One common mistake is adding too much shine to satin. Satin already reflects light, so jewellery should feel intentional, not excessive.',
      },
      {
        type: 'paragraph',
        text: 'Another mistake is wearing a heavy necklace with long drop earrings. If the earrings are already framing the face, the necklace can usually stay minimal or be skipped.',
      },
      {
        type: 'paragraph',
        text: 'A third mistake is choosing earrings that are too tiny for a satin party look. Satin can be visually strong, so very small earrings may disappear, especially with hair down.',
      },
      {
        type: 'paragraph',
        text: 'Another mistake is wearing bold statement earrings with a heavily draped or detailed satin dress. In that case, studs or huggies may look more polished.',
      },
      {
        type: 'paragraph',
        text: 'Finally, do not ignore neckline and hairstyle. The same satin dress can need different earrings depending on how the upper body is styled.',
      },
      { type: 'see-also', text: 'Party Earrings Guide', href: '/resources/earring-style-guides/party-earrings-guide' },
      { type: 'see-also', text: 'Bold Statement Earrings Guide', href: '/resources/earring-style-guides/bold-statement-earrings-guide' },
      { type: 'see-also', text: 'Minimalist Earrings Guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 17: Final Checklist ──────────────────────────────────────────────
  {
    heading: 'Final Satin Dress Jewellery Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing jewellery for a satin dress, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is the satin dress simple or detailed?',
          'Is the colour warm, cool, bold or pastel?',
          'Is the neckline strapless, cowl, V-neck, high-neck or off-shoulder?',
          'Does the dress already have shine, draping or detail?',
          'Will my hair hide or show the earrings?',
          'Do I want sparkle, movement, shape or softness?',
          'Should the earrings be the main jewellery moment?',
          'Am I wearing a necklace, or should I skip it?',
          'Does the metal colour work with the satin colour?',
          'Is the occasion a wedding, party, dinner or formal event?',
          'Are the earrings comfortable for the full event?',
          'Is the ear stack balanced with one main piece?',
        ],
      },
      {
        type: 'paragraph',
        text: 'If you are unsure, choose drop earrings for a simple satin dress and medium studs for a detailed satin dress.',
      },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What jewellery should I wear with a satin dress?',
    answer: 'The best jewellery for a satin dress depends on the dress style. Drop earrings work well with simple satin dresses, while studs are better for detailed satin outfits. Hoops and bold earrings work best with clean party satin looks.',
  },
  {
    question: 'What earrings look best with a satin dress?',
    answer: 'Drop earrings, medium diamond studs, hoops and soft butterfly earrings can all work with satin. Choose based on neckline, hairstyle and occasion.',
  },
  {
    question: 'Can I wear gold jewellery with a satin dress?',
    answer: 'Yes, gold jewellery works beautifully with warm satin colours such as champagne, green, red, cream and black.',
  },
  {
    question: 'Can I wear silver jewellery with a satin dress?',
    answer: 'Yes, white or silver-tone jewellery works well with navy, black, grey, silver and cool-toned satin dresses.',
  },
  {
    question: 'Is rose gold good with a satin dress?',
    answer: 'Rose gold works especially well with blush, pink, champagne and romantic satin dresses.',
  },
  {
    question: 'What earrings should I wear with a black satin dress?',
    answer: 'A black satin dress works well with Orsola drop earrings, Cadenza M diamond studs, Pave Hoops or Lusso bold statement earrings depending on how simple the dress is.',
  },
  {
    question: 'What earrings should I wear with a champagne satin dress?',
    answer: 'Champagne satin works beautifully with gold-tone drops, medium studs and delicate earrings such as Orsola, Cadenza M or Concetta Short.',
  },
  {
    question: 'Should I wear a necklace with a satin dress?',
    answer: 'If the earrings are bold or long, skip the necklace or choose a delicate chain. If the earrings are small studs, a necklace can be more visible.',
  },
  {
    question: 'What jewellery should wedding guests wear with satin dresses?',
    answer: 'Wedding guests can wear drop earrings, medium studs, butterfly earrings or delicate drops with satin dresses. The best choice depends on the dress colour and neckline.',
  },
  {
    question: 'What IWantJewels earrings are best with a satin dress?',
    answer: 'Orsola, Cadenza M, Pave Hoops, Lusso, Concetta Short, Concetta Long and Farfalla are strong satin dress options depending on whether you want movement, sparkle, shape, boldness or softness.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Satin dresses already have shine, so the jewellery should add balance. Choose drop earrings when the dress is simple, medium studs when the dress has detail, hoops when you want modern shape, and bold earrings when the satin outfit is clean enough to let the jewellery lead.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want satin dress jewellery with real diamond sparkle. Choose Orsola for elegant movement, Cadenza M for clean sparkle, Pave Hoops for shape, Lusso for bold party styling and Farfalla or Concetta Short for softer romantic satin looks.',
  primaryLabel: 'Shop Earrings for Satin Dresses',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Drop Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Party Earrings Guide',
  tertiaryHref: '/resources/earring-style-guides/party-earrings-guide',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'what-jewellery-to-wear-with-a-satin-dress')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'what-jewellery-to-wear-with-a-satin-dress', 3)
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
