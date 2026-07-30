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
  title: 'How to Stack Earrings: Ear Stack Guide',
  description:
    'Learn how to stack earrings with studs, huggies, hoops, drops and lab grown diamond earrings for everyday, wedding and party looks.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/earring-style-guides/how-to-stack-earrings', locale),
  }
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-63.jpg',
  title: 'How to Stack Earrings:',
  subtitle: 'A Complete Ear Stack Styling Guide',
  paragraphs: [
    'Stacking earrings is one of the easiest ways to make jewellery feel more personal. Instead of wearing one pair of earrings, you create a styled combination using studs, huggies, hoops, minimalist earrings, butterfly earrings, drops or one stronger statement piece.',
    'A good ear stack should feel balanced, not crowded. The best stacks usually have one main earring, one supporting earring and one softer detail. The main earring creates the focus, the supporting earring adds shape, and the smaller piece keeps the stack polished without making the ear feel heavy.',
    'This resource helps shoppers build earring stacks for everyday wear, work outfits, wedding guest looks, parties, gifts and modern demi-fine styling. It also guides users toward IWantJewels products such as Cadenza S, Cadenza M, Amadea Huggie, Laluce, Pave Hoops, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Concetta Long and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Ear Stack Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Learn how to stack earrings without making the ear look crowded',
    'Choose the right earrings for first, second and third piercings',
    'Mix studs, huggies, hoops, drops and minimalist earrings',
    'Build everyday, minimalist, wedding guest and party ear stacks',
    'Decide which earring should be the main piece',
    'Understand how to balance size, shape, sparkle and metal colour',
    'Find IWantJewels product combinations that work together',
    'Plan image blocks, product modules, CTA placements and internal links for this page',
  ],
  image: '/blog-images/blog-image-69.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Ear Stack Builder',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main decision tool.' },
      {
        type: 'table',
        headers: ['Ear Stack Goal', 'Main Earring', 'Supporting Earring', 'Best IWJ Direction'],
        rows: [
          ['Simple everyday stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea Huggie'],
          ['More visible daily stack', 'Medium stud', 'Huggie or minimalist earring', 'Cadenza M + Amadea or Laluce'],
          ['Minimalist stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Modern hoop stack', 'Hoop or huggie', 'Small stud', 'Pave Hoops or Amadea + Cadenza S'],
          ['Romantic stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Wedding guest stack', 'Drop or medium stud', 'Small stud or huggie', 'Orsola or Cadenza M + Amadea'],
          ['Party stack', 'Bold statement earring', 'Small stud or huggie', 'Lusso + Cadenza S or Amadea'],
          ['Giftable starter stack', 'Stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Soft occasion stack', 'Short drop', 'Minimal stud', 'Concetta Short + Cadenza S'],
          ['Formal evening stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'What Is an Ear Stack?',
    content: [
      { type: 'paragraph', text: 'An ear stack is a combination of earrings worn together across one or more piercings. It may be simple, like one stud with one huggie, or more detailed, like a stud, huggie, hoop and drop earring styled together.' },
      { type: 'paragraph', text: 'The best ear stacks do not look random. They have a clear structure. One piece usually leads the look, while the others support it.' },
      { type: 'paragraph', text: 'For example, if you wear a bold earring as the main piece, the rest of the stack should stay smaller. If you wear a small stud as the main piece, you can add a huggie or minimalist earring for shape. If you wear a drop earring, it should usually be the focus because it adds length and movement.' },
      { type: 'paragraph', text: 'Ear stacks work especially well with demi-fine jewellery because small pieces can still feel elevated. Lab-grown diamond studs, huggies and minimalist earrings add sparkle without making the ear look too heavy.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'The Simple Earring Stacking Formula',
    content: [
      { type: 'paragraph', text: 'The easiest way to build an ear stack is:' },
      { type: 'paragraph', text: 'Main piece + shape piece + soft detail' },
      { type: 'paragraph', text: 'The main piece is the earring people notice first. The shape piece adds structure, such as a huggie or hoop. The soft detail adds small sparkle or balance without competing.' },
      {
        type: 'table',
        headers: ['Stack Role', 'What It Does', 'Best IWJ Product Direction'],
        rows: [
          ['Main piece', 'Creates the focus', 'Cadenza M, Orsola, Pave Hoops, Lusso'],
          ['Shape piece', 'Adds curve or structure', 'Amadea Huggie, Pave Hoops'],
          ['Soft detail', 'Adds subtle sparkle', 'Cadenza S, Laluce'],
          ['Romantic detail', 'Adds meaning', 'Farfalla, Alidi Farfalla'],
          ['Occasion piece', 'Adds movement', 'Orsola, Concetta Short, Concetta Long'],
          ['Party piece', 'Adds impact', 'Lusso'],
        ],
      },
      { type: 'paragraph', text: 'For everyday wear, keep the main piece small or medium. For wedding guest looks, choose one elegant focal point. For parties, let one bold earring stand out and keep the supporting earrings simple.' },
    ],
  },
  {
    heading: 'First, Second and Third Piercing Guide',
    content: [
      { type: 'paragraph', text: 'Each piercing position has a different role in an ear stack.' },
      { type: 'paragraph', text: 'The first piercing usually carries the main earring. The second piercing supports the first. The third piercing or upper lobe should usually be smaller, softer and more minimal.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-71.jpg',
        content: [
          {
            type: 'table',
            headers: ['Piercing Position', 'Best Earring Type', 'IWJ Product Direction'],
            rows: [
              ['First piercing', 'Main stud, hoop, drop or statement earring', 'Cadenza M, Pave Hoops, Orsola, Lusso'],
              ['Second piercing', 'Small stud, huggie or minimalist earring', 'Cadenza S, Amadea, Laluce'],
              ['Third piercing', 'Small stud or subtle detail', 'Cadenza S, Laluce'],
              ['Single piercing', 'Medium stud, hoop or drop', 'Cadenza M, Pave Hoops, Orsola'],
              ['Multiple piercings', 'Mix of one main piece with smaller support', 'Cadenza S, Amadea, Laluce, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'If you only have one piercing, choose the earring style that gives the effect you want. If you have two or more piercings, avoid making every earring the same size. A stack looks better when there is a clear size difference.' },
    ],
  },
  {
    heading: 'How to Stack Stud Earrings',
    content: [
      { type: 'paragraph', text: 'Studs are the easiest earrings to stack because they sit close to the ear and do not take up much space.' },
      { type: 'paragraph', text: 'A small stud works well in second or third piercings. A medium stud can be the main earring in the first piercing. If you are new to earring stacking, start with studs before adding huggies, hoops or drops.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are useful because they can work as a main piece in a minimal stack or as a supporting piece in a more detailed stack. Cadenza M diamond stud earrings are better when you want the stud to be the main focus.' },
      {
        type: 'table',
        headers: ['Stud Stack Goal', 'Product Combination', 'Why It Works'],
        rows: [
          ['Simple stud stack', 'Cadenza S + Laluce', 'Soft and minimal'],
          ['Classic diamond stack', 'Cadenza M + Cadenza S', 'Visible sparkle with balance'],
          ['Everyday polished stack', 'Cadenza S + Amadea', 'Stud sparkle with huggie shape'],
          ['Giftable stud stack', 'Cadenza M + Laluce', 'Classic with soft detail'],
          ['Wedding guest stud stack', 'Cadenza M + Amadea', 'Sparkle plus structure'],
        ],
      },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'How to Stack Huggies and Hoops',
    content: [
      { type: 'paragraph', text: 'Huggies and hoops add shape to an ear stack.' },
      { type: 'paragraph', text: 'A huggie sits close to the ear and is usually easier to stack than a larger hoop. A hoop creates more visibility and can become the main piece. If you are stacking hoops and huggies, keep the rest of the ear simple so the shapes do not compete.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are strong for everyday stacks because they add shape without feeling heavy. Pave Hoops are better when you want the hoop shape to be more visible.' },
      {
        type: 'table',
        headers: ['Hoop / Huggie Stack Goal', 'Product Combination', 'Styling Note'],
        rows: [
          ['Daily huggie stack', 'Amadea + Cadenza S', 'Easy and wearable'],
          ['More visible hoop stack', 'Pave Hoops + Cadenza S', 'Hoop leads the look'],
          ['Minimal huggie stack', 'Amadea + Laluce', 'Soft and modern'],
          ['Party hoop stack', 'Pave Hoops + Cadenza M', 'More sparkle and shape'],
          ['Mixed shape stack', 'Amadea + Cadenza M + Laluce', 'Balanced if spacing allows'],
        ],
      },
      { type: 'see-also', text: 'Hoop vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'How to Stack Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Drop earrings can be used in an ear stack, but they should usually be the main piece.' },
      { type: 'paragraph', text: 'Because drop earrings add length and movement, they naturally draw attention. If you pair them with other large earrings, the stack can feel crowded. The best approach is to wear a drop earring in the first piercing and keep the second or third piercing simple.' },
      { type: 'paragraph', text: 'Orsola drop earrings are strong for wedding guest looks, dinners and evening outfits. Concetta Short earrings work well for softer occasion styling. Concetta Long earrings are better for formal or elongated evening looks.' },
      {
        type: 'table',
        headers: ['Drop Stack Goal', 'Main Earring', 'Support Earring'],
        rows: [
          ['Elegant wedding stack', 'Orsola', 'Cadenza S'],
          ['Soft occasion stack', 'Concetta Short', 'Laluce'],
          ['Formal evening stack', 'Concetta Long', 'Cadenza S'],
          ['Romantic stack', 'Orsola or Concetta Short', 'Farfalla or Cadenza S'],
          ['Minimal drop stack', 'Orsola', 'No extra earrings or one tiny stud'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'How to Stack Statement Earrings',
    content: [
      { type: 'paragraph', text: 'Statement earrings should usually lead the whole look.' },
      { type: 'paragraph', text: 'If a statement earring is bold, large or high-sparkle, the rest of the stack should stay very simple. This keeps the look intentional instead of overwhelming.' },
      { type: 'paragraph', text: 'Lusso bold statement earrings are best for parties, evening styling and simple outfits where the jewellery should stand out. Pair them with Cadenza S or Amadea Huggie earrings if you have multiple piercings. Avoid pairing them with another large hoop, long drop or detailed butterfly earring unless the styling is intentionally dramatic.' },
      {
        type: 'table',
        headers: ['Statement Stack Goal', 'Main Earring', 'Support Earring'],
        rows: [
          ['Party stack', 'Lusso', 'Cadenza S'],
          ['Bold evening stack', 'Lusso', 'Amadea'],
          ['Simple black dress stack', 'Lusso', 'Cadenza S or no extra earring'],
          ['Reception styling', 'Lusso', 'Laluce'],
          ['High-impact look', 'Lusso', 'Keep the rest minimal'],
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Everyday Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Everyday ear stacks should feel comfortable, light and easy to repeat.' },
      { type: 'paragraph', text: 'You do not need many earrings for a good daily stack. A small stud with a huggie can be enough. The stack should work with shirts, knitwear, casual dresses, blazers, travel outfits and weekend styling.' },
      {
        type: 'table',
        headers: ['Everyday Stack', 'Product Combination', 'Why It Works'],
        rows: [
          ['Simple daily stack', 'Cadenza S + Amadea', 'Clean, balanced and easy'],
          ['More visible daily stack', 'Cadenza M + Amadea', 'More sparkle while staying wearable'],
          ['Minimal daily stack', 'Cadenza S + Laluce', 'Soft and quiet'],
          ['Hoop daily stack', 'Pave Hoops + Cadenza S', 'Adds shape and sparkle'],
          ['Feminine daily stack', 'Farfalla + Cadenza S', 'Adds meaning without feeling heavy'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Minimalist Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Minimalist ear stacks should feel clean, soft and not over-decorated.' },
      { type: 'paragraph', text: 'Use smaller earrings, simple shapes and one metal colour. Avoid mixing too many strong designs. Minimal stacking works well for workwear, neutral outfits, quiet luxury styling and people who prefer subtle jewellery.' },
      { type: 'paragraph', text: 'A minimalist stack could include:' },
      {
        type: 'table',
        headers: ['Position', 'Earring Direction', 'Product Direction'],
        rows: [
          ['First piercing', 'Small diamond stud', 'Cadenza S'],
          ['Second piercing', 'Minimalist earring', 'Laluce'],
          ['Optional huggie', 'Small close-fitting huggie', 'Amadea'],
          ['Optional main upgrade', 'Medium stud', 'Cadenza M'],
        ],
      },
      { type: 'paragraph', text: 'Cadenza S with Laluce is the softest direction. Cadenza S with Amadea feels slightly more styled. Cadenza M with Laluce gives more visible sparkle while staying clean.' },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Wedding Guest Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Wedding guest ear stacks should feel elegant, not busy.' },
      { type: 'paragraph', text: 'The outfit should guide the stack. If the dress has detail, choose studs and small huggies. If the outfit is simple, a drop earring can become the main piece. If the look is romantic, butterfly earrings can add a softer feeling.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-73.jpg',
        content: [
          {
            type: 'table',
            headers: ['Wedding Guest Look', 'Ear Stack Direction', 'Product Combination'],
            rows: [
              ['Detailed dress', 'Stud + huggie', 'Cadenza M + Amadea'],
              ['Simple satin dress', 'Drop + small stud', 'Orsola + Cadenza S'],
              ['Romantic dress', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
              ['Black dress', 'Drop or bold earring + simple support', 'Orsola or Lusso + Cadenza S'],
              ['Modern jumpsuit', 'Hoop + stud', 'Pave Hoops + Cadenza S'],
              ['Soft pastel outfit', 'Butterfly + minimalist detail', 'Alidi Farfalla + Laluce'],
              ['Formal evening outfit', 'Long drop + small stud', 'Concetta Long + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Party Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Party ear stacks can be bolder than everyday stacks, but they still need balance.' },
      { type: 'paragraph', text: 'The easiest party rule is: choose one strong earring and keep the rest simple. This lets the main piece stand out without making the ear look messy.' },
      {
        type: 'table',
        headers: ['Party Stack Goal', 'Product Combination', 'Styling Note'],
        rows: [
          ['Bold sparkle stack', 'Lusso + Cadenza S', 'Let Lusso lead'],
          ['Elegant party stack', 'Orsola + Cadenza S', 'Adds movement without too much weight'],
          ['Modern hoop stack', 'Pave Hoops + Laluce', 'Good with sleek outfits'],
          ['Black dress stack', 'Lusso or Orsola + Cadenza S', 'Strong contrast'],
          ['Dinner-to-party stack', 'Cadenza M + Amadea', 'Polished but wearable'],
          ['Formal reception stack', 'Concetta Long + Cadenza S', 'Refined and elongated'],
        ],
      },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Giftable Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'An ear stack can be a thoughtful gift because it gives the recipient a ready-made styling combination.' },
      { type: 'paragraph', text: 'Instead of gifting only one pair of earrings, you can choose two pieces that work together. This is useful for birthdays, bridesmaids, anniversaries, milestone gifts and modern jewellery lovers.' },
      {
        type: 'table',
        headers: ['Gift Style', 'Ear Stack Combination', 'Best For'],
        rows: [
          ['Safe starter stack', 'Cadenza S + Amadea', 'First ear stack gift'],
          ['Classic sparkle stack', 'Cadenza M + Amadea', 'More visible diamond gift'],
          ['Minimalist gift stack', 'Cadenza S + Laluce', 'Quiet jewellery lovers'],
          ['Romantic gift stack', 'Farfalla + Cadenza S', 'Birthday or anniversary gift'],
          ['Bridesmaid stack', 'Cadenza S + Concetta Short', 'Wedding-related gift'],
          ['Party gift stack', 'Lusso + Cadenza S', 'Someone who loves dressing up'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Metal Colour and Balance Tips',
    content: [
      { type: 'paragraph', text: 'A polished ear stack usually looks best when the metal colour feels intentional.' },
      { type: 'paragraph', text: 'The easiest choice is to keep one metal colour across the whole stack. Yellow gold feels warm and classic. White or silver tones feel clean and modern. Rose gold feels soft and romantic. Mixed metals can work, but they should look planned.' },
      {
        type: 'table',
        headers: ['Metal Direction', 'Best For', 'Style Feeling'],
        rows: [
          ['Yellow gold stack', 'Everyday styling, warm outfits, classic jewellery lovers', 'Warm, polished, easy'],
          ['White or silver-tone stack', 'Minimal outfits, cool-toned wardrobes', 'Clean, modern, bright'],
          ['Rose gold stack', 'Romantic looks, gifts, soft outfits', 'Feminine, gentle, personal'],
          ['Mixed metal stack', 'Creative styling and trend-led looks', 'Modern and playful'],
        ],
      },
      { type: 'paragraph', text: 'Balance also depends on size. If one earring is large, the rest should be smaller. If all pieces are small, you can use shape variation to keep the stack interesting.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Product Pathways by Styling Goal',
    content: [
      { type: 'subheading', text: 'For a First Ear Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs with Amadea Huggie earrings. This creates a clean, balanced stack that is easy to wear.' },
      { type: 'subheading', text: 'For a Minimalist Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S with Laluce minimalist diamond earrings. Add Amadea if the wearer wants more shape.' },
      { type: 'subheading', text: 'For a More Visible Daily Stack' },
      { type: 'paragraph', text: 'Choose Cadenza M with Amadea Huggie earrings. This gives more sparkle while staying practical for everyday styling.' },
      { type: 'subheading', text: 'For a Romantic Stack' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings with Cadenza S. This works well for soft outfits, birthday gifts and symbolic styling.' },
      { type: 'subheading', text: 'For a Wedding Guest Stack' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings with Cadenza S if the outfit is simple. Choose Cadenza M with Amadea if the outfit already has detail.' },
      { type: 'subheading', text: 'For a Party Stack' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings with Cadenza S or Amadea. Keep the rest of the ear simple so Lusso can lead.' },
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
          ['Concetta Short earrings', 'Soft drop piece', 'Works for delicate occasion stacks'],
          ['Concetta Long earrings', 'Formal drop piece', 'Creates a refined longer line'],
          ['Lusso bold statement earrings', 'Party focal piece', 'Best when the rest of the stack is simple'],
        ],
      },
      { type: 'paragraph', text: 'Build your ear stack around one main piece. Start with Cadenza S and Amadea for a simple everyday stack, Cadenza M and Amadea for more visible sparkle, Farfalla and Cadenza S for a romantic stack, or Lusso and Cadenza S for party styling.' },
    ],
  },
  {
    heading: 'Common Earring Stacking Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is wearing too many large earrings together. A good stack needs one main piece, not three pieces fighting for attention.' },
      { type: 'paragraph', text: 'Another mistake is ignoring spacing. If the earrings are too close in size or shape, the stack can look crowded.' },
      { type: 'paragraph', text: 'A third mistake is mixing too many styles. A butterfly earring, hoop, long drop and bold statement earring together may feel confusing unless the look is intentionally dramatic.' },
      { type: 'paragraph', text: 'Another mistake is forgetting comfort. If the stack pulls, catches on hair or feels heavy, it will not become a regular look.' },
      { type: 'paragraph', text: 'Finally, do not choose earrings only because they look good separately. They should look good together.' },
      { type: 'see-also', text: 'Lab-grown diamond earring size guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earring-size-guide' },
    ],
  },
  {
    heading: 'Final Ear Stack Checklist',
    content: [
      { type: 'paragraph', text: 'Before building an ear stack, ask:' },
      {
        type: 'bullet-list',
        items: [
          'How many piercings do I have?',
          'Which earring is the main piece?',
          'Which earring adds shape?',
          'Which piece adds soft detail?',
          'Are the earrings balanced in size?',
          'Is the stack comfortable?',
          'Does the metal colour feel intentional?',
          'Will the stack work with my hairstyle?',
          'Is the look for everyday wear, a wedding, a party or a gift?',
          'Can I wear the stack with more than one outfit?',
          'Are the earrings easy to clean and store?',
          'Does the stack feel polished instead of crowded?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with one small stud and one huggie. That is the easiest earring stack to build.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  {
    question: 'How do you stack earrings?',
    answer: 'Start with one main earring, then add one supporting earring and one smaller detail if you have enough piercings. Keep the sizes balanced so the ear does not look crowded.',
  },
  {
    question: 'What earrings are best for stacking?',
    answer: 'Studs, huggies, small hoops and minimalist earrings are best for stacking. Drops and statement earrings can work, but they should usually be the main piece.',
  },
  {
    question: 'How do you stack earrings with two piercings?',
    answer: 'Use one main earring in the first piercing and a smaller stud or huggie in the second piercing. A simple combination is a diamond stud with a huggie.',
  },
  {
    question: 'How do you stack earrings with three piercings?',
    answer: 'Use the largest or most visible earring in the first piercing, a huggie or small stud in the second, and a tiny or minimalist earring in the third.',
  },
  {
    question: 'Can you stack drop earrings?',
    answer: 'Yes, but the drop earring should usually be the main piece. Keep the other earrings small so the stack does not look crowded.',
  },
  {
    question: 'Can you stack statement earrings?',
    answer: 'Yes, but keep the rest of the stack minimal. A statement earring should lead the look.',
  },
  {
    question: 'Are huggies good for ear stacks?',
    answer: 'Yes, huggies are one of the best earrings for stacking because they add shape and sit close to the ear.',
  },
  {
    question: 'Should all earrings in a stack match?',
    answer: 'They do not need to match exactly, but they should feel balanced. Matching metal colour is the easiest way to make a stack look polished.',
  },
  {
    question: 'What is the easiest everyday ear stack?',
    answer: 'A small diamond stud with a huggie is the easiest everyday ear stack because it is comfortable, balanced and easy to style.',
  },
  {
    question: 'Can I gift an ear stack set?',
    answer: 'Yes, an ear stack set can be a thoughtful gift. A stud and huggie combination is usually the safest starting point.',
  },
]

const cta: V2CTABlock = {
  heading: 'Stacking earrings is about balance. Choose one main piece, add a supporting shape, and keep the smallest details soft. The best ear stacks feel intentional, comfortable and easy to wear.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want stackable pieces with real diamond sparkle. Choose Cadenza S and Amadea for a simple everyday stack, Cadenza M for more visible shine, Laluce for minimalist detail, Farfalla for meaning, Orsola for occasions and Lusso for party impact.',
  primaryLabel: 'Shop Ear Stack Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Huggie Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read Lab-Grown Diamond Earrings for Ear Stacks',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'how-to-stack-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'how-to-stack-earrings', 3)
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
