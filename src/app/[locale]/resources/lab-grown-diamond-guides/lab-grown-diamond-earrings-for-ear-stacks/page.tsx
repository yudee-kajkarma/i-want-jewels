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
  title: 'Lab Grown Diamond Earrings for Ear Stacks',
  description:
    'Build a diamond ear stack with lab grown diamond studs, huggies, hoops and minimalist earrings for everyday styling and occasions.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-101.jpg',
  title: 'Lab-Grown Diamond Earrings for Ear Stacks:',
  subtitle: 'Studs, Huggies & Styling Guide',
  paragraphs: [
    'An ear stack is one of the easiest ways to make diamond jewellery feel modern, personal and wearable. Instead of wearing one pair of earrings, you combine studs, huggies, hoops, minimalist earrings and small statement pieces across multiple piercings to create a layered look.',
    'Lab-grown diamond earrings work especially well for ear stacks because small diamonds add sparkle without making the ear look too heavy. The goal is not to wear the biggest earrings together. The goal is to create balance: one main piece, one supporting piece, and enough spacing so the whole ear looks intentional.',
    'This resource helps shoppers build lab-grown diamond ear stacks for everyday wear, work outfits, parties, wedding guest looks and gift styling. It also guides users toward IWantJewels pieces such as Cadenza S, Cadenza M, Amadea Huggie, Laluce, Pave Hoops, Farfalla, Orsola and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings for Ear Stacks',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Build a simple lab-grown diamond ear stack',
    'Choose between studs, huggies, hoops, drops and minimalist earrings',
    'Understand which earring should be the main piece',
    'Style earrings for first, second and third piercings',
    'Create everyday, minimal, party and wedding guest ear stacks',
    'Avoid making an ear stack look crowded or unbalanced',
    'Find IWantJewels product combinations that work together',
    'Plan image blocks, product modules, CTA placements and internal links for the page',
  ],
  image: '/blog-images/blog-image-46.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Ear Stack Builder',
    content: [
      { type: 'paragraph', text: 'Use this section near the top as the main visual decision tool.' },
      {
        type: 'table',
        headers: ['Ear Stack Goal', 'Main Earring', 'Supporting Earring', 'Recommended IWJ Direction'],
        rows: [
          ['Simple everyday stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea Huggie'],
          ['More visible daily stack', 'Medium stud', 'Huggie or minimalist earring', 'Cadenza M + Amadea or Laluce'],
          ['Minimalist stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Modern hoop stack', 'Small hoop or huggie', 'Stud', 'Pave Hoops or Amadea + Cadenza S'],
          ['Romantic stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Wedding guest stack', 'Medium stud or drop', 'Small stud or huggie', 'Cadenza M or Orsola + Amadea'],
          ['Party stack', 'Bold earring', 'Small stud or huggie', 'Lusso + Cadenza S or Amadea'],
        ],
      },
    ],
  },
  {
    heading: 'What Is an Ear Stack?',
    content: [
      { type: 'paragraph', text: 'An ear stack is a styled combination of earrings worn together across one or more piercings. It can be very simple, like a stud with a huggie, or more detailed, like a stud, huggie, hoop and small drop earring worn together.' },
      { type: 'paragraph', text: 'The best ear stacks do not look random. They usually have a clear balance of shape, size and sparkle. One earring acts as the main piece, while the others support it.' },
      { type: 'paragraph', text: 'For example, a small diamond stud with a huggie can look clean and polished. A medium diamond stud with a minimalist earring can feel more visible but still easy. A bold earring with small studs can create a party look without making the whole ear feel crowded.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Why Lab-Grown Diamond Earrings Work Well for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings are useful for ear stacks because they add sparkle in small, controlled ways.' },
      { type: 'paragraph', text: 'A good ear stack often needs small pieces. If every earring is large, the ear can look heavy. Lab-grown diamond studs, huggies and minimalist earrings bring light to the ear without overpowering the look.' },
      { type: 'paragraph', text: 'They also make the stack feel more elevated than a simple fashion jewellery mix. Even a small lab-grown diamond stud can make a casual outfit look more polished.' },
      { type: 'paragraph', text: 'For IWantJewels, this is a strong styling opportunity because the product range includes everyday studs, huggies, minimalist earrings, hoops, butterfly earrings, drops and bold pieces. That gives shoppers different ways to build an ear stack around their personal style.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'The Simple Ear Stack Formula',
    content: [
      { type: 'paragraph', text: 'A good ear stack usually follows a simple formula:' },
      { type: 'paragraph', text: 'One main earring + one supporting earring + one soft detail' },
      { type: 'paragraph', text: 'The main earring is the piece that gets the most attention. The supporting earring adds shape or sparkle. The soft detail keeps the stack from looking too empty.' },
      {
        type: 'table',
        headers: ['Stack Role', 'What It Does', 'IWJ Product Direction'],
        rows: [
          ['Main earring', 'Creates the focus', 'Cadenza M, Orsola, Pave Hoops, Lusso'],
          ['Supporting earring', 'Adds shape or balance', 'Amadea Huggie, Cadenza S'],
          ['Soft detail', 'Adds subtle sparkle', 'Laluce, Cadenza S'],
          ['Personal detail', 'Adds meaning or character', 'Farfalla, Alidi Farfalla'],
        ],
      },
      { type: 'paragraph', text: 'For everyday wear, keep the main earring small or medium. For parties, the main earring can be stronger. For romantic styling, the personal detail can become the focus.' },
    ],
  },
  {
    heading: 'Best Earrings for First, Second and Third Piercings',
    content: [
      { type: 'paragraph', text: 'Each piercing position has a different role in the stack.' },
      { type: 'paragraph', text: 'The first piercing usually carries the main earring. The second piercing usually supports the first. The third piercing or upper lobe should usually be softer, smaller and more minimal.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-43.jpg',
        content: [
          {
            type: 'table',
            headers: ['Piercing Position', 'Best Earring Type', 'Product Direction'],
            rows: [
              ['First piercing', 'Stud, huggie, hoop, drop or statement earring', 'Cadenza M, Pave Hoops, Orsola, Lusso'],
              ['Second piercing', 'Small stud, huggie or minimalist earring', 'Cadenza S, Amadea, Laluce'],
              ['Third piercing', 'Tiny stud or very subtle detail', 'Cadenza S or minimalist style'],
              ['Single piercing', 'Medium stud, hoop or drop', 'Cadenza M, Pave Hoops, Orsola'],
              ['Multiple piercings', 'Mix of studs, huggies and one main piece', 'Cadenza S, Amadea, Laluce, Pave Hoops'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'If you only have one piercing, choose one earring style that gives the look you want. If you have two or more, let one piece lead and keep the rest balanced.' },
    ],
  },
  {
    heading: 'Studs vs Huggies vs Hoops for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'Studs, huggies and hoops all work in ear stacks, but they create different effects.' },
      {
        type: 'table',
        headers: ['Earring Type', 'Stack Role', 'Best For'],
        rows: [
          ['Studs', 'Sparkle point', 'First diamond earrings, second piercings, minimal stacks'],
          ['Huggies', 'Shape and balance', 'Second piercings, everyday stacks, modern styling'],
          ['Hoops', 'More visible shape', 'First piercing, casual styling, party stacks'],
          ['Minimalist earrings', 'Soft filler', 'Subtle stacks and quiet styling'],
          ['Drop earrings', 'Main occasion piece', 'Weddings, dinners and evening looks'],
          ['Bold statement earrings', 'Main party piece', 'High-impact styling'],
        ],
      },
      { type: 'paragraph', text: 'Studs are the easiest starting point. Huggies make the stack feel more styled. Hoops add shape. Drops and bold earrings should usually be the main piece, not one of many large pieces.' },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Everyday Diamond Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Everyday ear stacks should feel comfortable, easy and repeatable.' },
      { type: 'paragraph', text: 'You do not need many earrings to create a good daily stack. A small stud and a huggie can be enough. The best everyday stack should work with workwear, casual outfits, simple dresses and weekend styling.' },
      {
        type: 'table',
        headers: ['Everyday Stack Style', 'Product Combination', 'Why It Works'],
        rows: [
          ['Simple daily stack', 'Cadenza S + Amadea Huggie', 'Clean, wearable and balanced'],
          ['Visible daily stack', 'Cadenza M + Amadea Huggie', 'More sparkle without feeling too formal'],
          ['Minimal daily stack', 'Cadenza S + Laluce', 'Quiet and easy to repeat'],
          ['Hoop daily stack', 'Pave Hoops + Cadenza S', 'Adds shape and sparkle'],
          ['Soft feminine stack', 'Farfalla + Cadenza S', 'Adds personality without being heavy'],
        ],
      },
      { type: 'see-also', text: 'Everyday lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Minimalist Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'A minimalist ear stack should look soft, clean and not overly decorated.' },
      { type: 'paragraph', text: 'Choose smaller earrings, simple shapes and controlled sparkle. Avoid mixing too many bold pieces at once. The goal is to create a quiet, polished ear look that works with almost any outfit.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are the strongest starting point for a minimalist stack. Laluce minimalist diamond earrings can add a soft second detail. Amadea Huggie earrings can give the stack more shape while still staying simple.' },
      { type: 'paragraph', text: 'A good minimalist stack could be:' },
      {
        type: 'bullet-list',
        items: [
          'First piercing: Cadenza S lab-grown diamond studs',
          'Second piercing: Laluce minimalist diamond earrings',
          'Optional huggie: Amadea Huggie earrings for more shape',
        ],
      },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Wedding Guest Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'A wedding guest ear stack should feel elegant, not crowded.' },
      { type: 'paragraph', text: 'The best combination depends on the outfit. If the dress is detailed, keep the stack simple with studs and huggies. If the outfit is minimal, one drop earring or more visible piece can lead the look.' },
      {
        type: 'table',
        headers: ['Wedding Guest Look', 'Ear Stack Direction', 'Product Combination'],
        rows: [
          ['Detailed dress', 'Stud + small huggie', 'Cadenza S or Cadenza M + Amadea'],
          ['Simple satin dress', 'Drop + subtle stud', 'Orsola + Cadenza S'],
          ['Romantic dress', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Black dress', 'Drop or bold earring + simple support', 'Orsola or Lusso + Cadenza S'],
          ['Modern jumpsuit', 'Hoop + stud', 'Pave Hoops + Cadenza S'],
          ['Soft pastel outfit', 'Butterfly + minimalist detail', 'Alidi Farfalla + Laluce'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Party Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Party ear stacks can be bolder than everyday stacks.' },
      { type: 'paragraph', text: 'For a party, it is fine to let one earring become the main jewellery moment. The key is not to make every piece equally loud. If Lusso bold statement earrings are the focus, keep the other earrings small. If Pave Hoops are the focus, use a small stud as support.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-96.jpg',
        content: [
          {
            type: 'table',
            headers: ['Party Stack Goal', 'Product Combination', 'Styling Note'],
            rows: [
              ['Bold sparkle', 'Lusso + Cadenza S', 'Let Lusso lead the look'],
              ['Elegant party look', 'Orsola + Cadenza S', 'Adds movement without too much weight'],
              ['Modern sparkle', 'Pave Hoops + Laluce', 'Good with sleek outfits'],
              ['Black dress stack', 'Lusso or Orsola + Cadenza S', 'Works well with simple outfits'],
              ['Dinner-to-party stack', 'Cadenza M + Amadea', 'Polished but still wearable'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Giftable Ear Stack Combinations',
    content: [
      { type: 'paragraph', text: 'Ear stacks can make excellent gifts if the pieces are easy to wear together.' },
      { type: 'paragraph', text: 'Instead of giving one pair of earrings, you can create a small styling set. This works well for birthdays, bridesmaids, anniversaries and personal milestone gifts.' },
      {
        type: 'table',
        headers: ['Gift Style', 'Ear Stack Combination', 'Best For'],
        rows: [
          ['Safe starter stack', 'Cadenza S + Amadea', 'First ear stack gift'],
          ['Classic sparkle stack', 'Cadenza M + Amadea', 'More visible diamond gift'],
          ['Minimalist stack', 'Cadenza S + Laluce', 'Quiet jewellery lovers'],
          ['Romantic stack', 'Farfalla + Cadenza S', 'Birthday or anniversary gift'],
          ['Bridesmaid stack', 'Cadenza S + Concetta Short', 'Wedding-related gift'],
          ['Party stack', 'Lusso + Cadenza S', 'Someone who loves dressing up'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Ear Stacks by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour changes the mood of an ear stack.' },
      { type: 'paragraph', text: 'A yellow gold stack feels warm and classic. A white or silver-tone stack feels clean and modern. A rose gold stack feels soft and romantic. Mixing metals can work, but it is usually easier to keep one metal direction if you want a polished look.' },
      {
        type: 'table',
        headers: ['Metal Direction', 'Best For', 'Style Feeling'],
        rows: [
          ['Yellow gold stack', 'Everyday styling, warm outfits, classic jewellery lovers', 'Warm, rich, easy'],
          ['White or silver stack', 'Minimal outfits, cool tones, modern styling', 'Clean, polished, bright'],
          ['Rose gold stack', 'Romantic looks, gifts, soft outfits', 'Feminine, warm, personal'],
          ['Mixed metal stack', 'Creative styling and trend-led looks', 'Modern, playful, less traditional'],
        ],
      },
      { type: 'paragraph', text: 'For gifts, choose the metal colour the recipient already wears. For your own stack, choose the finish that works with your daily wardrobe.' },
      { type: 'see-also', text: 'Gold lab-grown diamond earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Product Pathways by Ear Stack Goal',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical shopping guide.' },
      { type: 'subheading', text: 'For a First Ear Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs with Amadea Huggie earrings. This gives you one sparkle point and one shaped earring without making the ear look crowded.' },
      { type: 'subheading', text: 'For a More Visible Everyday Stack' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings with Amadea Huggie earrings. This gives more sparkle while still staying wearable.' },
      { type: 'subheading', text: 'For a Minimalist Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S with Laluce minimalist diamond earrings. This keeps the stack soft, simple and easy to wear every day.' },
      { type: 'subheading', text: 'For a Wedding Guest Stack' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings with Cadenza S if the outfit is simple. Choose Cadenza M with Amadea if the outfit already has detail.' },
      { type: 'subheading', text: 'For a Romantic Stack' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings with Cadenza S. This works well for soft outfits, birthday gifts and symbolic styling.' },
      { type: 'subheading', text: 'For a Party Stack' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings with Cadenza S or Amadea as the support. Keep the rest of the ear simple so the main earring can stand out.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Ear Stack Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Small sparkle point', 'Works in first, second or supporting piercings'],
          ['Cadenza M diamond stud earrings', 'Main stud', 'More visible sparkle for daily or occasion stacks'],
          ['Amadea Huggie earrings', 'Shape and balance', 'Strong huggie for stacking'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Keeps stacks clean and subtle'],
          ['Pave Hoops', 'Main hoop piece', 'Adds shape and sparkle'],
          ['Farfalla butterfly earrings', 'Personal focal piece', 'Adds meaning and feminine detail'],
          ['Alidi Farfalla butterfly earrings', 'Romantic focal piece', 'Strong for gifts and soft styling'],
          ['Orsola drop earrings', 'Occasion main piece', 'Adds movement for weddings and dinners'],
          ['Concetta Short earrings', 'Softer drop detail', 'Works for delicate occasion stacks'],
          ['Lusso bold statement earrings', 'Party focal piece', 'Best when the rest of the stack is simple'],
        ],
      },
      { type: 'paragraph', text: 'Build your ear stack around one main piece. Start with Cadenza S and Amadea for a simple everyday stack, Cadenza M and Amadea for more visible sparkle, Farfalla and Cadenza S for a romantic stack, or Lusso and Cadenza S for party styling.' },
    ],
  },
  {
    heading: 'Common Ear Stack Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is wearing too many large earrings together. An ear stack looks better when one earring leads and the rest support it.' },
      { type: 'paragraph', text: 'Another mistake is mixing too many styles without a clear plan. If you wear a butterfly earring, a hoop, a drop and a bold statement piece together, the ear may feel crowded.' },
      { type: 'paragraph', text: 'A third mistake is ignoring comfort. If the stack feels heavy or catches on hair, you may not wear it often.' },
      { type: 'paragraph', text: 'Another mistake is forgetting spacing. Smaller studs and huggies usually work better in upper piercings than heavy drops.' },
      { type: 'paragraph', text: 'Finally, do not choose earrings only because they look good separately. They should also look good together.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Final Ear Stack Checklist',
    content: [
      { type: 'paragraph', text: 'Before building your lab-grown diamond ear stack, ask:' },
      {
        type: 'bullet-list',
        items: [
          'How many piercings do I have?',
          'Which earring will be the main piece?',
          'Do I want a subtle, balanced or statement stack?',
          'Are the earrings comfortable enough together?',
          'Do the metal colours match or intentionally mix?',
          'Is the largest piece balanced with smaller pieces?',
          'Will the stack work with my hairstyle?',
          'Can I wear this stack with more than one outfit?',
          'Are the stones genuine lab-grown diamonds?',
          'Do I need studs, huggies, hoops or drops to complete the look?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with one small stud and one huggie. That is the easiest diamond ear stack to build.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What is an ear stack?',
    answer: 'An ear stack is a combination of earrings worn together across one or more piercings. It often includes studs, huggies, hoops and small statement earrings.',
  },
  {
    question: 'Are lab-grown diamond earrings good for ear stacks?',
    answer: 'Yes, lab-grown diamond earrings are excellent for ear stacks because small diamonds add sparkle without making the ear look too heavy.',
  },
  {
    question: 'What earrings do I need for a simple ear stack?',
    answer: 'Start with a small diamond stud and a huggie. This creates a clean, balanced stack that works for everyday wear.',
  },
  {
    question: 'Are huggies good for ear stacks?',
    answer: 'Yes, huggies are one of the best earrings for ear stacks because they add shape and sit close to the ear.',
  },
  {
    question: 'Should the biggest earring go in the first piercing?',
    answer: 'Usually yes. The first piercing often carries the main earring, while second and third piercings support the look with smaller pieces.',
  },
  {
    question: 'Can I wear drop earrings in an ear stack?',
    answer: 'Yes, but drop earrings should usually be the main piece. Keep the other earrings smaller so the stack does not look crowded.',
  },
  {
    question: 'Can I wear butterfly earrings in an ear stack?',
    answer: 'Yes, butterfly earrings can work beautifully as a personal focal piece. Pair them with small studs or minimalist earrings.',
  },
  {
    question: 'What is the best everyday ear stack?',
    answer: 'A small diamond stud with a huggie is usually the best everyday ear stack because it is simple, comfortable and easy to style.',
  },
  {
    question: 'What is the best party ear stack?',
    answer: 'Use one bold earring as the main piece, then add a small stud or huggie as support. Avoid making every earring large.',
  },
  {
    question: 'Can I gift an ear stack set?',
    answer: 'Yes, an ear stack set can be a thoughtful gift. A small stud and huggie combination is usually the safest starting point.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'A good ear stack should feel balanced, not crowded. The best lab-grown diamond ear stacks usually begin with a simple stud, then add a huggie, hoop, minimalist detail or one stronger focal earring depending on the look.',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in stackable demi-fine designs. Choose Cadenza S and Amadea for a simple everyday stack, Cadenza M for more visible sparkle, Laluce for soft detail, Farfalla for meaning, Orsola for occasions or Lusso for party impact.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings for Ear Stacks',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Huggie Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamond-earrings-for-ear-stacks')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamond-earrings-for-ear-stacks', 3)
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
