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
  title: 'Lab Grown Diamond Earring Size Guide',
  description:
    'Compare lab grown diamond earring sizes, from small studs to 1ct styles. Learn what size is best for everyday wear, gifts and occasions.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-59.jpg',
  title: 'Lab-Grown Diamond Earring Size Guide:',
  subtitle: 'Small, Medium & 1ct Styles',
  paragraphs: [
    'Choosing the right lab-grown diamond earring size is not only about picking the biggest stone. The best size depends on how visible you want the earrings to look, how often you plan to wear them, whether you are buying for yourself or as a gift, and whether the carat weight is listed per earring or as total carat weight for the pair.',
    'This resource helps you understand common diamond earring sizes, compare subtle and more noticeable styles, and choose the right earring type for everyday wear, ear stacks, wedding guest outfits, parties and meaningful gifts.',
    'For IWantJewels shoppers, this guide is especially useful if you are comparing everyday studs like Cadenza S and Cadenza M with more styled options such as Amadea Huggie, Orsola drop earrings, Farfalla butterfly earrings or Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Everyday Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Understand what carat weight means in diamond earrings',
    'Learn the difference between total carat weight and per-ear carat weight',
    'Compare small, medium and 1ct-style earring looks',
    'Choose the best earring size for everyday wear',
    'Pick the right size for gifts, weddings, parties and ear stacks',
    'Decide whether studs, huggies, drops or bold statement earrings make more sense',
    'Find IWantJewels product recommendations based on how the earrings will be worn',
    'Know what image blocks and product modules should be added to the page',
  ],
  image: '/blog-images/blog-image-52.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Does Carat Weight Mean in Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'Carat weight measures the weight of the diamond, not the exact visible size. A higher carat weight usually means a larger diamond, but the final look also depends on the cut, shape, setting and how the stone sits in the earring.' },
      { type: 'paragraph', text: 'This is important because two earrings with similar carat weights can still look slightly different. One may appear larger because of the setting. Another may look more subtle because the diamond sits lower or is surrounded by more metal.' },
      { type: 'paragraph', text: 'For diamond earrings, carat weight should be used as a guide, not the only buying factor. The better question is not always "How big is the diamond?" The better question is "How will this earring look when worn?"' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Total Carat Weight vs Per-Earring Carat Weight',
    content: [
      { type: 'paragraph', text: 'This is one of the most important things to understand before buying diamond earrings.' },
      { type: 'paragraph', text: 'When a pair of earrings is described as 1ct, it may mean 1 carat total weight across both earrings, or it may mean 1 carat per earring. These are very different looks.' },
      {
        type: 'table',
        headers: ['Carat Description', 'What It Usually Means', 'How It Looks'],
        rows: [
          ['1ct total weight', 'Around 0.50ct per earring', 'Noticeable but still wearable'],
          ['1ct per earring', 'Around 2ct total for the pair', 'Much larger and bolder'],
          ['0.50ct total weight', 'Around 0.25ct per earring', 'Subtle and everyday-friendly'],
          ['0.25ct total weight', 'Around 0.125ct per earring', 'Very delicate and minimal'],
        ],
      },
      { type: 'paragraph', text: 'Before buying, always check whether the carat weight is total carat weight or per earring. If the page does not make it clear, the shopper may expect a different size than what arrives.' },
    ],
  },
  {
    heading: 'Small, Medium and 1ct Diamond Earring Size Comparison',
    content: [
      { type: 'paragraph', text: 'Instead of thinking only in numbers, it is easier to think in size categories.' },
      {
        type: 'table',
        headers: ['Size Category', 'Best For', 'Style Feeling'],
        rows: [
          ['Very small studs', 'Second piercings, minimal ear stacks, very subtle sparkle', 'Delicate, quiet, barely-there'],
          ['Small studs', 'Everyday wear, work outfits, first diamond earrings', 'Clean, wearable, easy'],
          ['Medium studs', 'Everyday sparkle, gifts, dinners, simple dresses', 'Classic, polished, visible'],
          ['1ct total weight styles', 'Stronger studs, meaningful gifts, occasion wear', 'Noticeable, gift-worthy, elegant'],
          ['1ct per ear styles', 'Bold diamond look, special occasions, stronger luxury styling', 'High-impact, dressed-up, statement-like'],
        ],
      },
      { type: 'paragraph', text: 'For most shoppers, small or medium studs are easier for everyday wear. A 1ct total weight pair can feel more special and visible without becoming too bold. A 1ct per-ear style is much more noticeable and should usually be chosen only if the person likes stronger diamond jewellery.' },
      { type: 'paragraph', text: 'If you are buying for daily wear, do not assume bigger is better. A smaller earring that you wear often can be more valuable than a large pair that stays in the box.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Best Lab-Grown Diamond Earring Size for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'For everyday wear, the best size is usually small to medium.' },
      { type: 'paragraph', text: 'Daily earrings should feel comfortable, easy to style and simple enough to repeat. If the earrings feel too big, too formal or too heavy, you may avoid wearing them regularly.' },
      { type: 'paragraph', text: 'Small lab-grown diamond studs are ideal if you want quiet sparkle. Medium studs are better if you want the earrings to be noticed while still staying classic. Huggies and small hoops are also good for daily wear because they add shape without feeling too dramatic.' },
      { type: 'paragraph', text: 'For IWantJewels, Cadenza S lab-grown diamond studs are the safest daily choice because they are clean and subtle. Cadenza M diamond stud earrings are better if you want more visible everyday sparkle. Amadea Huggie earrings are ideal if you prefer a slightly more styled daily look.' },
    ],
  },
  {
    heading: 'Best Lab-Grown Diamond Earring Size for Gifts',
    content: [
      { type: 'paragraph', text: 'For gifts, medium-sized earrings are usually the safest choice.' },
      { type: 'paragraph', text: 'Very small earrings may feel too subtle for an important gift. Very large earrings may feel too bold if you are not sure of the person\'s style. A medium diamond stud or a meaningful shaped earring usually feels balanced.' },
      {
        type: 'table',
        headers: ['Gift Type', 'Best Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safe birthday gift', 'Medium studs', 'Cadenza M diamond stud earrings'],
          ['First diamond gift', 'Small or medium studs', 'Cadenza S or Cadenza M'],
          ['Romantic gift', 'Rose gold, butterfly or soft drop styles', 'Farfalla butterfly earrings, Orsola drop earrings'],
          ['Bridesmaid gift', 'Simple studs or delicate drops', 'Cadenza S, Cadenza M, Concetta Short'],
          ['Statement gift', 'Larger drops or bold sparkle', 'Lusso bold statement earrings'],
          ['Symbolic gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose classic studs. If you want the gift to feel more personal, choose butterfly earrings. If the person enjoys dressing up, choose drop earrings or bold statement styles.' },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Best Lab-Grown Diamond Earring Size for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Wedding guest earrings should feel elegant, but not overpowering.' },
      { type: 'paragraph', text: 'The right size depends heavily on the outfit. If the dress is detailed, smaller or medium studs are usually better. If the outfit is simple, drop earrings or a more noticeable stud can add polish. If the outfit is romantic or soft, butterfly earrings can work beautifully.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-54.jpg',
        content: [
          {
            type: 'table',
            headers: ['Outfit Type', 'Best Earring Size / Style', 'Why'],
            rows: [
              ['Detailed dress', 'Small or medium studs', 'Adds sparkle without crowding the look'],
              ['Simple satin dress', 'Drops or medium studs', 'Adds movement and polish'],
              ['Black dress', 'Medium studs, drops or bold sparkle', 'Creates contrast and shine'],
              ['Off-shoulder dress', 'Drops or bold earrings', 'Frames the face and neckline'],
              ['High-neck dress', 'Studs or refined small drops', 'Keeps the look clean'],
              ['Romantic dress', 'Butterfly earrings or soft drops', 'Adds feminine detail'],
              ['Minimal jumpsuit', 'Hoops, huggies or drops', 'Adds shape and styling interest'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, Cadenza M diamond stud earrings work well when the outfit already has detail. Orsola drop earrings are stronger when the dress is simple and needs movement. Farfalla butterfly earrings work well for softer romantic looks. Lusso bold statement earrings are better for party-style wedding receptions where the outfit is simple and the earrings can stand out.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Best Lab-Grown Diamond Earring Size for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'For ear stacks, smaller earrings usually work best.' },
      { type: 'paragraph', text: 'A good ear stack needs balance. If every earring is large, the ear can look crowded. Smaller studs, huggies and minimalist earrings help create sparkle without making the stack feel heavy.' },
      { type: 'paragraph', text: 'A simple everyday diamond ear stack could use Cadenza S lab-grown diamond studs in the first piercing and Amadea Huggie earrings in the second. For a softer stack, add Laluce minimalist diamond earrings. For a more visible stack, use Cadenza M as the main stud and keep the other pieces smaller.' },
      {
        type: 'table',
        headers: ['Ear Stack Goal', 'Best Size Direction', 'Product Direction'],
        rows: [
          ['Minimal everyday stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['More visible diamond stack', 'Medium stud + huggie', 'Cadenza M + Amadea'],
          ['Soft minimalist stack', 'Small stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Party stack', 'Medium stud + hoop or bold earring', 'Cadenza M + Pave Hoops or Lusso'],
          ['Second piercing sparkle', 'Very small or small stud', 'Cadenza S or minimalist style'],
        ],
      },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Studs, Huggies, Drops and Hoops: How Size Changes the Look',
    content: [
      { type: 'paragraph', text: 'Carat size matters, but earring shape also changes how visible the jewellery looks.' },
      { type: 'paragraph', text: 'A small stud can look subtle because it sits in one place. A huggie may look more styled even if the diamonds are smaller because the shape wraps around the ear. A drop earring may look more noticeable because it adds length and movement. A bold statement earring may feel larger even if the individual stones are not huge.' },
      {
        type: 'table',
        headers: ['Earring Type', 'How Size Feels When Worn', 'Best Use'],
        rows: [
          ['Studs', 'Size is focused in one point of sparkle', 'Everyday wear, gifts, classic styling'],
          ['Huggies', 'Small diamonds look more styled because of the curved shape', 'Ear stacks, second piercings, daily wear'],
          ['Hoops', 'Shape makes the earring more visible even with smaller stones', 'Casual styling, parties, modern outfits'],
          ['Drops', 'Length and movement make the earring feel more noticeable', 'Weddings, dinners, occasions'],
          ['Bold statement earrings', 'Overall design creates impact beyond carat size', 'Parties and high-impact looks'],
          ['Butterfly earrings', 'Shape adds meaning and visual detail', 'Gifts and feminine styling'],
        ],
      },
      { type: 'paragraph', text: 'This is why shoppers should not choose by carat alone. The design can make the earrings feel bigger, softer, more elegant or more dramatic.' },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Does Face Shape Affect Diamond Earring Size?',
    content: [
      { type: 'paragraph', text: 'Face shape can help guide earring size, but it should not be treated like a strict rule.' },
      { type: 'paragraph', text: 'If someone has a smaller face or prefers subtle jewellery, small studs and huggies may feel more natural. If someone likes stronger styling or has a more dramatic wardrobe, medium studs, drops or bold statement earrings may work better.' },
      { type: 'paragraph', text: 'Longer drop earrings can help create a more elongated look. Studs keep the focus soft and classic. Hoops and huggies add shape around the ear. Butterfly earrings add visual detail without always needing a large diamond size.' },
      { type: 'paragraph', text: 'The most important thing is personal style. A person who loves minimal outfits may prefer Cadenza S or Laluce. A person who loves evening outfits may prefer Orsola or Lusso. A person who loves romantic gifts may prefer Farfalla or Alidi Farfalla.' },
    ],
  },
  {
    heading: 'Is 1ct Too Big for Diamond Earrings?',
    content: [
      { type: 'paragraph', text: '1ct is not automatically too big, but it depends on whether the listing means 1ct total weight or 1ct per earring.' },
      { type: 'paragraph', text: 'A 1ct total weight pair is often wearable and classic because the size is split across both earrings. A 1ct per-ear pair is much bolder and may feel too large for someone who prefers subtle everyday jewellery.' },
      { type: 'paragraph', text: 'For daily wear, many people prefer small or medium studs. For gifts, a more visible size can feel special. For parties or formal occasions, larger diamond looks can work beautifully.' },
      { type: 'paragraph', text: 'If you are unsure, choose a medium stud look rather than the largest option. It will usually be easier to wear more often.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '#' },
    ],
  },
  {
    heading: 'Should You Choose Smaller Earrings or Bigger Earrings?',
    content: [
      { type: 'paragraph', text: 'Choose smaller earrings if you want comfort, repeat wear and subtle styling. Choose bigger earrings if you want the jewellery to stand out.' },
      {
        type: 'table',
        headers: ['Choose Smaller If', 'Choose Bigger If'],
        rows: [
          ['You want daily earrings', 'You want the earrings to be noticed'],
          ['You prefer minimal jewellery', 'You are buying for an event'],
          ['You are buying for a second piercing', 'You want a stronger gift'],
          ['You wear jewellery casually', 'You wear dressy outfits often'],
          ['You want easy styling', 'You want the earrings to be the main detail'],
        ],
      },
      { type: 'paragraph', text: 'For most shoppers, the best first pair is not the biggest pair. It is the pair that will be worn most often.' },
    ],
  },
  {
    heading: 'Product Pathways by Earring Size and Purpose',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical product finder.' },
      { type: 'subheading', text: 'For Subtle Everyday Sparkle' },
      { type: 'paragraph', text: 'Choose small, clean earrings that feel easy to wear every day. Cadenza S lab-grown diamond studs are the strongest starting point because they are simple, polished and not too dramatic.' },
      { type: 'subheading', text: 'For More Visible Everyday Sparkle' },
      { type: 'paragraph', text: 'Choose medium studs if you want the diamond to be noticed without moving into party jewellery. Cadenza M diamond stud earrings are better for shoppers who want a more visible classic earring.' },
      { type: 'subheading', text: 'For Ear Stacks' },
      { type: 'paragraph', text: 'Choose smaller studs and huggies. Cadenza S with Amadea Huggie earrings creates a clean, balanced stack. Laluce minimalist diamond earrings can be added for a softer layered look.' },
      { type: 'subheading', text: 'For Wedding Guests' },
      { type: 'paragraph', text: 'Choose size based on the outfit. If the outfit has detail, choose Cadenza M. If the outfit is simple, choose Orsola drop earrings. If the look is soft and romantic, choose Farfalla butterfly earrings.' },
      { type: 'subheading', text: 'For Party Looks' },
      { type: 'paragraph', text: 'Choose earrings with more visual impact. Lusso bold statement earrings are better when you want the jewellery to stand out. Orsola drop earrings work if you want sparkle with more elegance.' },
      { type: 'subheading', text: 'For Meaningful Gifts' },
      { type: 'paragraph', text: 'Choose a size and style that feels personal. Cadenza M is a safe gift if the person likes classic jewellery. Farfalla and Alidi Farfalla are better if you want the gift to feel symbolic and feminine.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Size / Style Role', 'Best For'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Small everyday stud direction', 'First diamond earrings, workwear, subtle sparkle'],
          ['Cadenza M diamond stud earrings', 'Medium stud direction', 'More visible daily sparkle, gifts, simple dresses'],
          ['Amadea Huggie earrings', 'Small hoop / huggie direction', 'Ear stacks, second piercings, modern daily wear'],
          ['Laluce minimalist diamond earrings', 'Minimalist small earring direction', 'Quiet styling and soft daily outfits'],
          ['Pave Hoops', 'Hoop sparkle direction', 'Shape, casual styling and party-ready sparkle'],
          ['Farfalla butterfly earrings', 'Shaped gift direction', 'Symbolic gifts and feminine styling'],
          ['Alidi Farfalla butterfly earrings', 'Detailed butterfly gift direction', 'Birthdays, anniversaries and personal milestones'],
          ['Orsola drop earrings', 'Occasion drop direction', 'Wedding guests, dinners and evening outfits'],
          ['Concetta Short earrings', 'Softer drop direction', 'Subtle occasion styling'],
          ['Concetta Long earrings', 'Longer drop direction', 'Refined evening looks'],
          ['Lusso bold statement earrings', 'High-impact direction', 'Parties and bold evening jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Use size as a styling decision, not just a number. Choose Cadenza S for subtle daily sparkle, Cadenza M for a more visible stud, Amadea for ear stacks, Orsola for occasions and Lusso when you want the earrings to be the main jewellery moment.' },
    ],
  },
  {
    heading: 'Common Size Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is assuming 1ct always means the same thing. In earrings, it may mean total carat weight across the pair or 1ct per earring. Always check the wording.' },
      { type: 'paragraph', text: 'Another mistake is choosing the largest size without thinking about lifestyle. Bigger earrings can look beautiful, but they may not be the pair you wear most often.' },
      { type: 'paragraph', text: 'A third mistake is ignoring the earring style. A medium drop can look more dramatic than a medium stud because it adds length and movement.' },
      { type: 'paragraph', text: 'Another mistake is buying a gift based only on carat weight. A meaningful design, comfortable size and right metal colour can matter more than size alone.' },
      { type: 'paragraph', text: 'Finally, do not forget outfit use. Everyday earrings, wedding guest earrings and party earrings should not always be the same size.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Final Checklist Before Choosing a Diamond Earring Size',
    content: [
      { type: 'paragraph', text: 'Before buying, ask yourself:' },
      {
        type: 'bullet-list',
        items: [
          'Is the carat weight listed as total weight or per earring?',
          'Do I want subtle sparkle or visible sparkle?',
          'Will I wear these every day or only for occasions?',
          'Am I buying for myself or as a gift?',
          'Does the size match the person\'s jewellery style?',
          'Are studs, huggies, drops or bold earrings the better shape?',
          'Will the earrings match more than one outfit?',
          'Does the metal colour suit the wearer\'s existing jewellery?',
          'Are the stones genuine lab-grown diamonds?',
          'Is the design comfortable enough for the intended use?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose a smaller or medium everyday pair first. You can always add more noticeable occasion earrings later.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What does 1ct mean in diamond earrings?',
    answer: 'In earrings, 1ct may mean 1 carat total weight across both earrings or 1 carat per earring. Always check the product details because the visual difference is significant.',
  },
  {
    question: 'Is 1ct total weight good for diamond earrings?',
    answer: 'Yes, 1ct total weight can be a good choice if you want noticeable but still wearable diamond earrings. It is often more practical than 1ct per earring.',
  },
  {
    question: 'Is 1ct per earring too big?',
    answer: 'It depends on the person\'s style. 1ct per earring is much bolder and may feel more suitable for occasions than daily wear.',
  },
  {
    question: 'What size diamond earrings are best for everyday wear?',
    answer: 'Small or medium diamond studs are usually best for everyday wear because they are comfortable, classic and easy to style.',
  },
  {
    question: 'What size diamond earrings are best for gifts?',
    answer: 'Medium studs are usually the safest gift size because they feel special but not too bold. Butterfly earrings are also strong if you want a more personal gift.',
  },
  {
    question: 'Are smaller diamond earrings worth buying?',
    answer: 'Yes, smaller diamond earrings are worth buying if they are comfortable, wearable and easy to repeat. A smaller pair worn often can be more valuable than a larger pair worn rarely.',
  },
  {
    question: 'Do diamond huggies look smaller than studs?',
    answer: 'Huggies may use smaller stones, but the curved shape can make them look more styled than simple studs.',
  },
  {
    question: 'Are drop earrings better than studs for occasions?',
    answer: 'Drop earrings are often better for weddings, dinners and evening looks because they add movement. Studs are better when the outfit already has detail.',
  },
  {
    question: 'Should I choose diamond earrings by carat or style?',
    answer: 'Choose by both, but style should lead the decision. The earring shape, setting and how often you will wear them matter as much as carat weight.',
  },
  {
    question: 'What is the safest first pair of lab-grown diamond earrings?',
    answer: 'Small or medium lab-grown diamond studs are usually the safest first pair because they are timeless, wearable and easy to style.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'The right lab-grown diamond earring size should match how the jewellery will actually be worn. Small studs are best for everyday ease, medium studs are ideal for visible classic sparkle, huggies work beautifully in ear stacks, drops suit weddings and dinners, and bold statement earrings are best when you want the jewellery to stand out.',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in wearable demi-fine designs. Choose Cadenza S for subtle shine, Cadenza M for a stronger stud look, Amadea for stacking, Orsola for occasions or Lusso for bold evening sparkle.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Stud Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamond-earring-size-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamond-earring-size-guide', 3)
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
