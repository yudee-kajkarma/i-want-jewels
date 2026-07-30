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
  title: 'What Jewellery to Wear with a Black Dress',
  description:
    'Choose jewellery for a black dress with earrings, diamonds, gold, silver, rose gold, party looks, weddings and evening outfit styling.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress', locale),
  }
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-53.jpg',
  title: 'What Jewellery to Wear with a Black Dress:',
  subtitle: 'Earrings, Metals & Styling Guide',
  paragraphs: [
    'A black dress is one of the easiest outfits to style with jewellery because it gives sparkle, metal colour and diamond details a clean background. The right earrings can make a black dress feel elegant, romantic, modern, minimal or party-ready.',
    'The best jewellery for a black dress depends on the dress style. A simple black dress can carry bold statement earrings, drop earrings or hoops. A detailed black dress usually looks better with studs or clean huggies. A satin black dress works beautifully with movement, while a high-neck black dress often suits studs or hoops better than long drops.',
    'This resource helps shoppers choose jewellery for a black dress by occasion, neckline, hairstyle, metal colour and sparkle level. It also connects each styling direction to IWantJewels products such as Lusso bold statement earrings, Orsola drop earrings, Pave Hoops, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Amadea Huggie earrings, Laluce minimalist diamond earrings, Farfalla butterfly earrings and Concetta Long earrings.',
  ],
  shopLabel: 'Shop Earrings for a Black Dress',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose the best jewellery for a black dress.',
    'Decide between studs, hoops, drops, huggies, butterfly earrings and bold statement earrings.',
    'Match earrings to black satin, simple black, high-neck, strapless and party dresses.',
    'Choose gold, white/silver tone or rose gold jewellery with a black dress.',
    'Style jewellery for parties, weddings, dinners, birthdays and evening events.',
    'Choose the right earrings based on neckline and hairstyle.',
    'Build black dress ear stack combinations.',
    'Find IWantJewels product recommendations by outfit and occasion.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-13.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ─────────────────────────────────────────────────────
  {
    heading: 'Black Dress Jewellery Selector',
    content: [
      {
        type: 'paragraph',
        text: 'Use this table near the top of the page as the main styling decision tool.',
      },
      {
        type: 'table',
        headers: ['Black Dress Style', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Simple black dress', 'Bold earrings, drops or hoops', 'Lusso, Orsola, Pave Hoops'],
          ['Satin black dress', 'Drop earrings or visible studs', 'Orsola, Cadenza M'],
          ['High-neck black dress', 'Studs, hoops or bold earrings', 'Cadenza M, Pave Hoops, Lusso'],
          ['Strapless black dress', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Off-shoulder black dress', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Detailed black dress', 'Studs or huggies', 'Cadenza M, Cadenza S, Amadea'],
          ['Black jumpsuit', 'Hoops, huggies or bold earrings', 'Pave Hoops, Amadea, Lusso'],
          ['Black dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Black party dress', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
          ['Minimal black dress', 'One strong jewellery focal point', 'Lusso, Orsola, Pave Hoops'],
        ],
      },
    ],
  },
  // ── Section 1: Why Black Dresses ──────────────────────────────────────────────
  {
    heading: 'Why Black Dresses Are Easy to Style with Jewellery',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-85.jpg',
        content: [
          {
            type: 'paragraph',
            text: 'Black dresses are easy to style because black gives jewellery contrast. Diamonds look brighter, gold looks warmer, silver tones look cleaner, and bold earrings can stand out without competing with the outfit.',
          },
          {
            type: 'paragraph',
            text: 'A black dress also lets you choose the mood of the look. Gold jewellery can make the outfit feel warm and classic. White or silver-tone jewellery can make it feel clean and modern. Rose gold can soften the look. Lab-grown diamond earrings can add sparkle without needing heavy accessories.',
          },
          {
            type: 'paragraph',
            text: 'The main rule is balance. If the black dress is simple, the jewellery can be stronger. If the dress has detail, the jewellery should be cleaner. If the neckline is open, drops or bold earrings can work beautifully. If the neckline is high, studs or hoops often feel more balanced.',
          },
          {
            type: 'see-also',
            text: 'Party Earrings Guide',
            href: '/resources/earring-style-guides/party-earrings-guide',
          },
          {
            type: 'see-also',
            text: 'Bold Statement Earrings Guide',
            href: '/resources/earring-style-guides/bold-statement-earrings-guide',
          },
        ],
      },
    ],
  },
  // ── Section 2: Simple Black Dress ─────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Simple Black Dress',
    content: [
      {
        type: 'paragraph',
        text: 'A simple black dress is the best outfit for stronger jewellery because the dress gives the earrings space to stand out.',
      },
      {
        type: 'paragraph',
        text: 'This is where Lusso bold statement earrings, Orsola drop earrings and Pave Hoops are strongest. If you want the earrings to become the main jewellery moment, choose Lusso. If you want movement and elegance, choose Orsola. If you want shape and modern polish, choose Pave Hoops.',
      },
      {
        type: 'table',
        headers: ['Styling Goal', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Strong party look', 'Bold statement earrings', 'Lusso'],
          ['Elegant evening look', 'Drop earrings', 'Orsola'],
          ['Modern shape', 'Hoops', 'Pave Hoops'],
          ['Classic sparkle', 'Medium studs', 'Cadenza M'],
          ['Minimal black dress styling', 'One focal earring', 'Lusso, Orsola, Pave Hoops'],
          ['Balanced ear stack', 'Main earring + small stud', 'Lusso + Cadenza S, Orsola + Cadenza S'],
        ],
      },
      { type: 'divider' },
    ],
  },
  // ── Section 3: Satin Black Dress ──────────────────────────────────────────────
  {
    heading: 'Best Earrings for a Satin Black Dress',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-87.jpg',
        content: [
          {
            type: 'paragraph',
            text: 'A satin black dress already has shine, so the jewellery should add polish without making the full look too heavy.',
          },
          {
            type: 'paragraph',
            text: 'Drop earrings work especially well with satin because they add movement and catch light naturally. Medium studs are better if the satin dress already has a dramatic neckline or strong shape. Bold statement earrings can work if the satin dress is simple and the rest of the jewellery is minimal.',
          },
          {
            type: 'see-also',
            text: 'Party Earrings Guide',
            href: '/resources/earring-style-guides/party-earrings-guide',
          },
        ],
      },
      {
        type: 'table',
        headers: ['Satin Black Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Satin slip dress', 'Drop earrings', 'Orsola'],
          ['Satin black midi dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Satin black high-neck dress', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Satin black strapless dress', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Satin black party dress', 'Bold earrings or drops', 'Lusso, Orsola'],
          ['Satin black jumpsuit', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
        ],
      },
    ],
  },
  // ── Section 4: High-Neck Black Dress ──────────────────────────────────────────
  {
    heading: 'Best Earrings for a High-Neck Black Dress',
    content: [
      {
        type: 'paragraph',
        text: 'A high-neck black dress usually works better with earrings that sit close to the ear or create shape without adding too much length.',
      },
      {
        type: 'paragraph',
        text: 'Studs, hoops and bold earrings can all work. Long drops can sometimes compete with the neckline, unless the dress is very simple and the drop is refined.',
      },
      {
        type: 'paragraph',
        text: 'Cadenza M diamond stud earrings are strong for a clean high-neck look. Pave Hoops add shape. Lusso bold statement earrings work if the dress is simple and the earrings are meant to lead the outfit.',
      },
      {
        type: 'table',
        headers: ['High-Neck Black Dress Style', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Simple high-neck dress', 'Bold earrings or hoops', 'Lusso, Pave Hoops'],
          ['Detailed high-neck dress', 'Studs', 'Cadenza M, Cadenza S'],
          ['Office-to-evening high neck', 'Medium studs', 'Cadenza M'],
          ['Minimal high-neck dress', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Formal high-neck dress', 'Studs or refined drops', 'Cadenza M, Concetta Long'],
          ['High-neck knit dress', 'Studs or hoops', 'Cadenza S, Pave Hoops'],
        ],
      },
      {
        type: 'see-also',
        text: 'Stud vs Hoop Earrings',
        href: '/resources/earring-style-guides/stud-vs-hoop-earrings',
      },
      {
        type: 'see-also',
        text: 'Minimalist Earrings Guide',
        href: '/resources/earring-style-guides/minimalist-earrings-guide',
      },
    ],
  },
  // ── Section 5: Strapless Black Dress ──────────────────────────────────────────
  {
    heading: 'Best Earrings for a Strapless Black Dress',
    content: [
      {
        type: 'paragraph',
        text: 'A strapless black dress gives earrings more space because the neckline is open. This makes it one of the best dress styles for drops, bold statement earrings and stronger sparkle.',
      },
      {
        type: 'paragraph',
        text: 'If you want a dramatic party look, choose Lusso. If you want elegant movement, choose Orsola. If you want a more refined formal look, Concetta Long can work beautifully. If you want a safer sparkle option, choose Cadenza M.',
      },
      {
        type: 'table',
        headers: ['Strapless Black Dress Look', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Party look', 'Bold statement earrings', 'Lusso'],
          ['Elegant dinner look', 'Drop earrings', 'Orsola'],
          ['Formal evening look', 'Long drops', 'Concetta Long'],
          ['Minimal sparkle', 'Medium studs', 'Cadenza M'],
          ['Romantic look', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
          ['Ear stack look', 'Drop or bold + small stud', 'Orsola + Cadenza S, Lusso + Cadenza S'],
        ],
      },
      {
        type: 'see-also',
        text: 'Party Earrings Guide',
        href: '/resources/earring-style-guides/party-earrings-guide',
      },
      {
        type: 'see-also',
        text: 'Bold Statement Earrings Guide',
        href: '/resources/earring-style-guides/bold-statement-earrings-guide',
      },
      {
        type: 'see-also',
        text: 'Lab-Grown Diamond Drop Earrings Guide',
        href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide',
      },
    ],
  },
  // ── Section 6: Detailed Black Dress ───────────────────────────────────────────
  {
    heading: 'Best Earrings for a Detailed Black Dress',
    content: [
      {
        type: 'paragraph',
        text: 'If a black dress already has sequins, lace, embroidery, ruffles, metallic details or a dramatic neckline, earrings should usually be cleaner.',
      },
      {
        type: 'paragraph',
        text: 'This is where studs, huggies and minimalist earrings are better than bold pieces. The goal is to let the dress stay the main visual detail while the jewellery adds polish.',
      },
      {
        type: 'table',
        headers: ['Detailed Black Dress Type', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Sequin black dress', 'Studs or clean huggies', 'Cadenza M, Amadea'],
          ['Lace black dress', 'Studs or soft drops', 'Cadenza M, Concetta Short'],
          ['Embroidered black dress', 'Studs', 'Cadenza S, Cadenza M'],
          ['Metallic black dress', 'Minimalist earrings or studs', 'Laluce, Cadenza M'],
          ['Ruffled black dress', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Printed black dress', 'Studs or small hoops', 'Cadenza S, Pave Hoops'],
        ],
      },
      {
        type: 'see-also',
        text: 'Minimalist Earrings Guide',
        href: '/resources/earring-style-guides/minimalist-earrings-guide',
      },
      {
        type: 'see-also',
        text: 'Stud vs Huggie Earrings',
        href: '/resources/earring-style-guides/stud-vs-huggie-earrings',
      },
      {
        type: 'see-also',
        text: 'Stud vs Hoop Earrings',
        href: '/resources/earring-style-guides/stud-vs-hoop-earrings',
      },
    ],
  },
  // ── Section 7: Metal Colour ────────────────────────────────────────────────────
  {
    heading: 'Gold vs Silver vs Rose Gold Jewellery with a Black Dress',
    content: [
      {
        type: 'paragraph',
        text: 'A black dress works with almost every metal colour, but each finish creates a different mood.',
      },
      {
        type: 'paragraph',
        text: 'Yellow gold adds warmth and richness. White or silver tones feel clean, sharp and modern. Rose gold softens the black dress and makes the look more romantic.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-89.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Feeling with a Black Dress', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, rich and classic', 'Parties, dinners, bold styling'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimal looks, formal styling, cool outfits'],
              ['Rose gold', 'Soft, romantic and feminine', 'Date nights, birthdays, softer styling'],
              ['Mixed metals', 'Modern and creative', 'Ear stacks and trend-led looks'],
            ],
          },
          {
            type: 'paragraph',
            text: 'For most black dress party looks, yellow gold or white/silver tone will feel strongest. Rose gold is better when the look should feel softer or more romantic.',
          },
        ],
      },
      {
        type: 'see-also',
        text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings',
        href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings',
      },
    ],
  },
  // ── Section 8: By Occasion ────────────────────────────────────────────────────
  {
    heading: 'Jewellery for a Black Dress by Occasion',
    content: [
      {
        type: 'paragraph',
        text: 'The occasion should guide how strong the jewellery should be.',
      },
      {
        type: 'paragraph',
        text: 'A birthday party can carry more sparkle. A wedding guest look should feel elegant and not too bridal. A dinner outfit may need polish rather than drama. A formal event may need refined drops or classic diamond studs.',
      },
      {
        type: 'table',
        headers: ['Occasion', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Party', 'Bold earrings, hoops or drops', 'Lusso, Pave Hoops, Orsola'],
          ['Birthday dinner', 'Medium studs, drops or butterfly earrings', 'Cadenza M, Orsola, Farfalla'],
          ['Wedding guest', 'Drops, studs or refined hoops', 'Orsola, Cadenza M, Pave Hoops'],
          ['Evening reception', 'Bold earrings or long drops', 'Lusso, Concetta Long'],
          ['Anniversary dinner', 'Drops or romantic earrings', 'Orsola, Farfalla'],
          ['Formal dinner', 'Refined drops or classic studs', 'Concetta Long, Orsola, Cadenza M'],
          ['Work event', 'Studs, huggies or small hoops', 'Cadenza M, Amadea, Pave Hoops'],
          ['Cocktail party', 'Hoops, drops or bold sparkle', 'Pave Hoops, Orsola, Lusso'],
        ],
      },
      {
        type: 'see-also',
        text: 'Lab-Grown Diamond Earrings for Weddings',
        href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings',
      },
    ],
  },
  // ── Section 9: By Hairstyle ───────────────────────────────────────────────────
  {
    heading: 'Jewellery for a Black Dress by Hairstyle',
    content: [
      {
        type: 'paragraph',
        text: 'Hairstyle changes how visible your jewellery looks.',
      },
      {
        type: 'paragraph',
        text: 'If your hair is down, very small earrings may disappear. Medium studs, hoops and drops usually show better. If your hair is pulled back, bold earrings, drops and hoops can frame the face beautifully.',
      },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Hairstyle', 'Best Jewellery Direction', 'Product Direction'],
            rows: [
              ['Hair down', 'Medium studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
              ['Soft waves', 'Drops, butterfly earrings or visible studs', 'Orsola, Farfalla, Cadenza M'],
              ['Sleek ponytail', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
              ['Low bun', 'Drops or bold earrings', 'Orsola, Lusso'],
              ['High bun', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
              ['Half-up hair', 'Studs, huggies or soft drops', 'Cadenza M, Amadea, Concetta Short'],
              ['Short hair', 'Studs, hoops or bold earrings', 'Cadenza M, Pave Hoops, Lusso'],
            ],
          },
        ],
      },
    ],
  },
  // ── Section 10: By Neckline ───────────────────────────────────────────────────
  {
    heading: 'Jewellery for a Black Dress by Neckline',
    content: [
      {
        type: 'paragraph',
        text: 'The neckline is one of the most important styling clues.',
      },
      {
        type: 'paragraph',
        text: 'Open necklines can carry drops and bold earrings. High necklines usually work better with studs or hoops. One-shoulder outfits often need one clear focal point so the jewellery does not fight the neckline.',
      },
      {
        type: 'table',
        headers: ['Neckline', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Strapless', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Sweetheart', 'Soft drops, butterfly earrings or bold sparkle', 'Orsola, Farfalla, Lusso'],
          ['V-neck', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Off-shoulder', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['High neck', 'Studs, hoops or bold earrings', 'Cadenza M, Pave Hoops, Lusso'],
          ['Halter', 'Studs or slim drops', 'Cadenza M, Concetta Long'],
          ['Square neck', 'Hoops, drops or medium studs', 'Pave Hoops, Orsola, Cadenza M'],
          ['One-shoulder', 'Studs, drops or one strong focal piece', 'Cadenza M, Orsola, Lusso'],
        ],
      },
      { type: 'see-also', text: 'Jewellery for V-Neck Dresses', href: '#' },
      { type: 'see-also', text: 'Jewellery for Sweetheart Neckline', href: '#' },
      { type: 'see-also', text: 'Earrings for Off-Shoulder Dresses', href: '#' },
    ],
  },
  // ── Section 11: Necklace ──────────────────────────────────────────────────────
  {
    heading: 'Necklace or No Necklace with a Black Dress?',
    content: [
      {
        type: 'paragraph',
        text: 'The necklace decision depends on the earrings and neckline.',
      },
      {
        type: 'paragraph',
        text: 'If the earrings are bold, the safest choice is usually no necklace or a very delicate necklace. If the earrings are simple studs, a necklace can become more visible. If the neckline is high, skip a necklace and use earrings instead. If the neckline is open, you can choose either a necklace or stronger earrings, but not always both.',
      },
      {
        type: 'table',
        headers: ['Earring Choice', 'Necklace Direction'],
        rows: [
          ['Bold statement earrings', 'No necklace or very delicate chain'],
          ['Long drop earrings', 'No necklace or simple pendant'],
          ['Hoop earrings', 'Delicate chain or no necklace'],
          ['Medium studs', 'Necklace can be more visible'],
          ['Small studs', 'Necklace can lead the look'],
          ['Butterfly earrings', 'Soft, delicate necklace if needed'],
          ['Huggies', 'Necklace can be simple or moderate'],
          ['Minimalist earrings', 'Necklace can become the focal point'],
        ],
      },
      {
        type: 'paragraph',
        text: 'For IWantJewels styling, if Lusso is the main earring, let Lusso lead. If Cadenza S or Cadenza M is the earring choice, the wearer can add a necklace more easily.',
      },
      {
        type: 'see-also',
        text: 'Bold Statement Earrings Guide',
        href: '/resources/earring-style-guides/bold-statement-earrings-guide',
      },
      {
        type: 'see-also',
        text: 'Party Earrings Guide',
        href: '/resources/earring-style-guides/party-earrings-guide',
      },
    ],
  },
  // ── Section 12: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'Black Dress Ear Stack Ideas',
    content: [
      {
        type: 'paragraph',
        text: 'A black dress works beautifully with ear stacks because the outfit is usually clean enough to let the stack show.',
      },
      {
        type: 'paragraph',
        text: 'The best approach is to choose one main earring and one smaller support piece. If the main piece is Lusso, Orsola or Pave Hoops, keep the support piece small. If the main piece is Cadenza M, you can add a huggie or minimalist detail.',
      },
      {
        type: 'table',
        headers: ['Black Dress Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Bold party stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Elegant black dress stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Modern hoop stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Classic sparkle stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
          ['Minimal black dress stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Romantic black dress stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Formal black dress stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
        ],
      },
      {
        type: 'see-also',
        text: 'How to Stack Earrings',
        href: '/resources/earring-style-guides/how-to-stack-earrings',
      },
      {
        type: 'see-also',
        text: 'Diamond Ear Stack Ideas',
        href: '/resources/earring-style-guides/diamond-ear-stack-ideas',
      },
      {
        type: 'see-also',
        text: 'Lab-Grown Diamond Earrings for Ear Stacks',
        href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks',
      },
    ],
  },
  // ── Section 13: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Black Dress Styling Need',
    content: [
      {
        type: 'subheading',
        text: 'For the Strongest Black Dress Look',
      },
      {
        type: 'paragraph',
        text: 'Choose Lusso bold statement earrings. They are best for a simple black dress, black party dress or minimal jumpsuit where the earrings should lead.',
      },
      {
        type: 'subheading',
        text: 'For Elegant Movement',
      },
      {
        type: 'paragraph',
        text: 'Choose Orsola drop earrings. They work beautifully with satin black dresses, strapless black dresses and dinner outfits.',
      },
      {
        type: 'subheading',
        text: 'For Modern Shape',
      },
      {
        type: 'paragraph',
        text: 'Choose Pave Hoops. They are strong for black jumpsuits, high-neck black dresses, casual party styling and sleek hairstyles.',
      },
      {
        type: 'subheading',
        text: 'For Classic Sparkle',
      },
      {
        type: 'paragraph',
        text: 'Choose Cadenza M diamond stud earrings. They are best when the black dress already has detail or when the wearer wants clean diamond polish.',
      },
      {
        type: 'subheading',
        text: 'For Subtle Support',
      },
      {
        type: 'paragraph',
        text: 'Choose Cadenza S lab-grown diamond studs. They are perfect as a supporting earring in black dress ear stacks.',
      },
      {
        type: 'subheading',
        text: 'For Romantic Black Dress Styling',
      },
      {
        type: 'paragraph',
        text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings if the look should feel softer and more personal.',
      },
    ],
  },
  // ── Section 14: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Black Dress Role', 'Why It Works'],
        rows: [
          ['Lusso bold statement earrings', 'Strongest black dress focal piece', 'Best for simple black dresses and party looks'],
          ['Orsola drop earrings', 'Elegant movement', 'Adds length, polish and evening sparkle'],
          ['Pave Hoops', 'Modern shape', 'Adds curve and visible shine'],
          ['Cadenza M diamond stud earrings', 'Classic sparkle', 'Best for detailed dresses or safer elegance'],
          ['Cadenza S lab-grown diamond studs', 'Support piece', 'Balances bold earrings, drops and hoops'],
          ['Amadea Huggie earrings', 'Modern support piece', 'Strong for work events and ear stacks'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Good for minimal stacks and detailed dresses'],
          ['Farfalla butterfly earrings', 'Romantic styling', 'Adds softness and meaning'],
          ['Alidi Farfalla butterfly earrings', 'Gift-led romantic styling', 'Good for birthdays and soft black dress looks'],
          ['Concetta Short earrings', 'Delicate occasion styling', 'Soft drop option'],
          ['Concetta Long earrings', 'Formal evening styling', 'Refined, elongated and polished'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Choose jewellery for a black dress based on the dress detail. Pick Lusso for bold sparkle, Orsola for movement, Pave Hoops for shape, Cadenza M for classic polish, and Cadenza S or Laluce as support pieces in an ear stack.',
      },
    ],
  },
  // ── Section 15: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Black Dress Jewellery Mistakes to Avoid',
    content: [
      {
        type: 'paragraph',
        text: 'One common mistake is wearing too many strong pieces at once. A black dress can carry bold jewellery, but the look should still have one clear focal point.',
      },
      {
        type: 'paragraph',
        text: 'Another mistake is pairing bold earrings with a heavy necklace. If the earrings are strong, the necklace should usually be minimal or skipped.',
      },
      {
        type: 'paragraph',
        text: 'A third mistake is choosing tiny earrings when the hair is down. If the earrings are too small, they may disappear.',
      },
      {
        type: 'paragraph',
        text: 'Another mistake is wearing bold earrings with a highly detailed black dress. In that case, studs or huggies may look more refined.',
      },
      {
        type: 'paragraph',
        text: 'Finally, do not choose jewellery only because it sparkles. Think about neckline, hairstyle, dress fabric, occasion and comfort.',
      },
      {
        type: 'see-also',
        text: 'Party Earrings Guide',
        href: '/resources/earring-style-guides/party-earrings-guide',
      },
      {
        type: 'see-also',
        text: 'Bold Statement Earrings Guide',
        href: '/resources/earring-style-guides/bold-statement-earrings-guide',
      },
      {
        type: 'see-also',
        text: 'Minimalist Earrings Guide',
        href: '/resources/earring-style-guides/minimalist-earrings-guide',
      },
      {
        type: 'see-also',
        text: 'Gold-Plated Jewellery Care Guide',
        href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery',
      },
    ],
  },
  // ── Section 16: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Black Dress Jewellery Checklist',
    content: [
      {
        type: 'paragraph',
        text: 'Before choosing jewellery for a black dress, ask:',
      },
      {
        type: 'bullet-list',
        items: [
          'Is the dress simple or detailed?',
          'Is the fabric satin, lace, sequin, knit or plain?',
          'Is the neckline strapless, high, V-neck, square or off-shoulder?',
          'Will my hair hide or show the earrings?',
          'Do I want sparkle, shape, movement or softness?',
          'Should the earrings be the main jewellery moment?',
          'Am I wearing a necklace, or should I skip it?',
          'Does the metal colour match the look?',
          'Is the occasion a party, wedding, dinner or work event?',
          'Are the earrings comfortable enough for the full event?',
          'Can the jewellery be worn again with other outfits?',
          'Is the ear stack balanced with one main piece?',
        ],
      },
      {
        type: 'paragraph',
        text: 'If the black dress is simple, choose stronger earrings. If the dress is detailed, choose cleaner earrings.',
      },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What jewellery should I wear with a black dress?',
    answer: 'The best jewellery for a black dress depends on the dress style. Simple black dresses work well with bold earrings, drops or hoops. Detailed black dresses usually look better with studs or clean huggies.',
  },
  {
    question: 'What earrings look best with a black dress?',
    answer: 'Drop earrings, hoops, medium diamond studs and bold statement earrings all work well with a black dress. Choose based on neckline, hairstyle and occasion.',
  },
  {
    question: 'Can I wear gold jewellery with a black dress?',
    answer: 'Yes, gold jewellery works beautifully with a black dress because it adds warmth and contrast.',
  },
  {
    question: 'Can I wear silver jewellery with a black dress?',
    answer: 'Yes, silver or white-tone jewellery works well with a black dress when you want a clean, modern and bright look.',
  },
  {
    question: 'Is rose gold good with a black dress?',
    answer: 'Rose gold can work with a black dress when the look should feel softer, romantic or feminine.',
  },
  {
    question: 'What earrings should I wear with a simple black dress?',
    answer: 'A simple black dress can carry bold statement earrings, drop earrings or hoops because the outfit gives the jewellery room to stand out.',
  },
  {
    question: 'What earrings should I wear with a detailed black dress?',
    answer: 'Choose studs, huggies or minimalist earrings if the black dress has sequins, lace, embroidery, ruffles or a dramatic neckline.',
  },
  {
    question: 'Should I wear a necklace with bold earrings and a black dress?',
    answer: 'Usually no, or only a very delicate necklace. Bold earrings look best when they are allowed to lead the look.',
  },
  {
    question: 'What jewellery should I wear with a black satin dress?',
    answer: 'Drop earrings or medium studs work well with a black satin dress. Drops add movement, while studs keep the styling clean.',
  },
  {
    question: 'What IWantJewels earrings are best with a black dress?',
    answer: 'Lusso, Orsola, Pave Hoops, Cadenza M and Concetta Long are strong black dress options depending on whether you want bold sparkle, movement, shape or classic polish.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'A black dress gives jewellery the perfect background. Choose bold statement earrings when the dress is simple, drop earrings when you want movement, hoops when you want shape, and studs when the dress already has detail.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want black dress jewellery with real diamond sparkle. Choose Lusso for bold evening impact, Orsola for elegant movement, Pave Hoops for modern shape, Cadenza M for classic polish and Cadenza S or Laluce as support pieces in an ear stack.',
  primaryLabel: 'Shop Earrings for a Black Dress',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Party Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Party Earrings Guide',
  tertiaryHref: '/resources/earring-style-guides/party-earrings-guide',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'what-jewellery-to-wear-with-a-black-dress')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'what-jewellery-to-wear-with-a-black-dress', 3)
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
