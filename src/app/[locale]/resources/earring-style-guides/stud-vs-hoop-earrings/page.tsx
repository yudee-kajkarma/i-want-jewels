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
  title: 'Stud vs Hoop Earrings: Which Is Better?',
  description:
    'Compare stud and hoop earrings for everyday wear, gifts, workwear, ear stacks, weddings, parties and lab grown diamond styling.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-77.jpg',
  title: 'Stud vs Hoop Earrings:',
  subtitle: 'Which Style Should You Choose?',
  paragraphs: [
    'Stud earrings and hoop earrings are two of the most useful earring styles in any jewellery collection, but they create very different looks. Studs sit close to the ear and give a clean point of sparkle. Hoops create shape, movement and a more visible outline around the ear.',
    'If you want the safest everyday earring, studs are usually the better choice. If you want earrings that feel more styled and noticeable, hoops may be better. The strongest jewellery wardrobe often includes both: studs for simple daily polish and hoops for outfits that need more shape.',
    'This resource helps shoppers compare studs and hoops by comfort, styling, gifting, workwear, ear stacking, wedding outfits, party looks and product use. It also guides users toward IWantJewels pieces such as Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Pave Hoops, Amadea Huggie earrings, Laluce minimalist diamond earrings, Orsola drop earrings and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Stud and Hoop Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Understand the difference between stud earrings and hoop earrings',
    'Decide which style is better for everyday wear',
    'Choose earrings for workwear, gifts, weddings, parties and ear stacks',
    'Learn when studs look better than hoops',
    'Learn when hoops look better than studs',
    'Build simple stud and hoop combinations',
    'Find IWantJewels product recommendations by styling need',
    'Plan image blocks, product modules, CTA placements and internal links for this page',
  ],
  image: '/blog-images/blog-image-19.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Stud vs Hoop Earrings Comparison',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main comparison tool.' },
      {
        type: 'table',
        headers: ['Feature', 'Stud Earrings', 'Hoop Earrings'],
        rows: [
          ['Shape', 'Sits close to the ear as one point of sparkle', 'Circular or curved shape around or below the ear'],
          ['Style feeling', 'Classic, simple, timeless', 'Stylish, visible, more shape-led'],
          ['Best for', 'Everyday wear, gifts, workwear, first diamond earrings', 'Casual styling, parties, simple outfits, modern jewellery looks'],
          ['Comfort', 'Usually very comfortable and lightweight', 'Depends on hoop size and weight'],
          ['Visibility', 'Small studs are subtle, medium studs are more visible', 'Hoops usually show more because of their shape'],
          ['Gift safety', 'Very safe', 'Good if the person already likes hoops'],
          ['Ear stack use', 'Works as main or support piece', 'Usually works best as the main shape piece'],
          ['Workwear use', 'Very strong', 'Strong if the hoop is small or refined'],
          ['Occasion use', 'Strong with detailed outfits and high necklines', 'Strong with simple outfits, black dresses and party looks'],
          ['Best IWJ direction', 'Cadenza S, Cadenza M', 'Pave Hoops'],
        ],
      },
      { type: 'paragraph', text: 'Studs are usually the safer first choice. Hoops are better when the outfit needs more shape, movement or visible styling.' },
    ],
  },
  {
    heading: 'What Are Stud Earrings?',
    content: [
      { type: 'paragraph', text: 'Stud earrings are earrings that sit directly on the earlobe without hanging below the ear. They usually have a post and backing, and the visible part of the earring stays close to the skin.' },
      { type: 'paragraph', text: 'Studs are one of the easiest earrings to wear because they are simple, comfortable and versatile. They work with workwear, casual outfits, dresses, high-neck tops, travel outfits, wedding guest looks and ear stacks.' },
      { type: 'paragraph', text: 'At IWantJewels, Cadenza S lab-grown diamond studs are ideal for subtle everyday sparkle. Cadenza M diamond stud earrings are better when the shopper wants the same classic stud feeling with more visible shine.' },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'What Are Hoop Earrings?',
    content: [
      { type: 'paragraph', text: 'Hoop earrings are circular or curved earrings that create a visible shape around or below the earlobe. They can be small and subtle, medium and polished, or bold and statement-making.' },
      { type: 'paragraph', text: 'Hoops are useful when shoppers want earrings that show more than studs. They can make a simple outfit feel styled, especially with slick hair, black dresses, blazers, satin outfits, weekend looks and party styling.' },
      { type: 'paragraph', text: 'At IWantJewels, Pave Hoops are the strongest hoop direction. They add shape and sparkle while staying within a demi-fine lab-grown diamond styling direction. They can be worn alone or paired with small studs like Cadenza S for a balanced ear stack.' },
      { type: 'see-also', text: 'Lab-grown diamond hoop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },
  {
    heading: 'Which Is Better for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Studs are usually better for the easiest everyday wear. Hoops are better when you want your daily earrings to feel more styled and visible.' },
      { type: 'paragraph', text: 'Small diamond studs can be worn with almost anything. They are low-effort, comfortable and simple. Hoops add more shape, so they can make a basic outfit look more intentional.' },
      {
        type: 'table',
        headers: ['Daily Wear Need', 'Better Choice', 'IWJ Product Direction'],
        rows: [
          ['First everyday earrings', 'Studs', 'Cadenza S'],
          ['Subtle daily sparkle', 'Studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Studs', 'Cadenza M'],
          ['Casual outfit polish', 'Hoops', 'Pave Hoops'],
          ['Modern daily styling', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Travel jewellery', 'Studs', 'Cadenza S'],
          ['Day-to-night styling', 'Medium studs or hoops', 'Cadenza M, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Which Is Better for Ear Stacks?',
    content: [
      { type: 'paragraph', text: 'Studs are easier to use in ear stacks because they take up less space. Hoops can still work beautifully, but they often become the main shape in the stack.' },
      { type: 'paragraph', text: 'A good stud and hoop stack usually uses the hoop as the main piece and the stud as the smaller support piece. If the hoop is visible, the supporting stud should stay simple.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-81.jpg',
        content: [
          {
            type: 'table',
            headers: ['Ear Stack Style', 'Stud Role', 'Hoop Role', 'Product Direction'],
            rows: [
              ['Simple daily stack', 'Main sparkle point', 'Optional shape', 'Cadenza S + Amadea'],
              ['Hoop-led stack', 'Support sparkle', 'Main shape', 'Pave Hoops + Cadenza S'],
              ['Minimal stack', 'Soft detail', 'Usually not needed', 'Cadenza S + Laluce'],
              ['Modern stack', 'Support piece', 'Shape piece', 'Pave Hoops + Cadenza S'],
              ['More visible stack', 'Medium sparkle', 'Shape support', 'Cadenza M + Pave Hoops'],
              ['Giftable stack', 'Safe diamond piece', 'Stylish second piece', 'Cadenza S + Pave Hoops'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Which Is Better for Workwear?',
    content: [
      { type: 'paragraph', text: 'Stud earrings are usually safer for workwear because they are clean, classic and not distracting. Hoops can also work for workwear when they are small, refined and not too heavy.' },
      { type: 'paragraph', text: 'For traditional office styling, choose studs. For modern or creative workwear, hoops can add personality while still feeling polished. If you want a work-to-dinner earring, Pave Hoops or Cadenza M can both work depending on the outfit.' },
      {
        type: 'table',
        headers: ['Workwear Style', 'Better Choice', 'Product Direction'],
        rows: [
          ['Classic office look', 'Studs', 'Cadenza S, Cadenza M'],
          ['Minimal workwear', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern office styling', 'Small hoops or huggies', 'Pave Hoops, Amadea'],
          ['Creative workwear', 'Hoops', 'Pave Hoops'],
          ['Blazer outfit', 'Studs or hoops', 'Cadenza M, Pave Hoops'],
          ['Day-to-dinner styling', 'Medium studs or hoops', 'Cadenza M, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },
  {
    heading: 'Which Is Better for Gifts?',
    content: [
      { type: 'paragraph', text: 'Stud earrings are usually safer for gifts. Hoop earrings are better when you know the recipient already likes hoops or more visible earrings.' },
      { type: 'paragraph', text: 'Studs work for many personal styles, which makes them less risky. They are especially strong for birthdays, first diamond gifts, bridesmaid gifts, workwear gifts and simple everyday jewellery gifts.' },
      { type: 'paragraph', text: 'Hoops feel more expressive and style-led. They are a good gift for someone who already wears hoops, likes shaped earrings or enjoys jewellery that shows more.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Better Choice', 'IWJ Product Direction'],
        rows: [
          ['Safest gift', 'Studs', 'Cadenza S, Cadenza M'],
          ['First diamond gift', 'Studs', 'Cadenza S'],
          ['Classic visible gift', 'Studs', 'Cadenza M'],
          ['Hoop lover gift', 'Hoops', 'Pave Hoops'],
          ['Modern gift', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Minimalist gift', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Bridesmaid gift', 'Studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Which Is Better for Sensitive Ears?',
    content: [
      { type: 'paragraph', text: 'For sensitive ears, the safer choice is usually the lighter, simpler and easier-to-clean earring.' },
      { type: 'paragraph', text: 'Studs are often the best starting point because they sit close to the ear, are usually lightweight and are easy to wipe. Hoops can also work, but larger hoops may move more, pull more or create more friction depending on their size and weight.' },
      { type: 'paragraph', text: 'At IWantJewels, earrings are made with 925 sterling silver, 14kt gold plating and lab-grown diamonds. This gives the jewellery a clearer demi-fine material direction than many low-cost fashion earrings, but sensitive-ear comfort still depends on the person, fit and care routine.' },
      {
        type: 'table',
        headers: ['Sensitive-Ear Need', 'Better Direction', 'Product Direction'],
        rows: [
          ['Safest start', 'Small studs', 'Cadenza S'],
          ['More visible but still simple', 'Medium studs', 'Cadenza M'],
          ['Lightweight shape', 'Small hoops or huggies', 'Pave Hoops, Amadea'],
          ['Minimalist comfort', 'Minimalist earrings', 'Laluce'],
          ['Ear stack for sensitive ears', 'Small stud + small shape', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Is 925 sterling silver hypoallergenic?', href: '/resources/demi-fine-jewellery-guides/is-925-sterling-silver-hypoallergenic' },
    ],
  },
  {
    heading: 'Which Is Better for Weddings and Occasions?',
    content: [
      { type: 'paragraph', text: 'Studs are better when the outfit already has detail. Hoops are better when the outfit is simple and needs more shape.' },
      { type: 'paragraph', text: 'For wedding guests, studs are a safe choice with lace, sequins, prints, high necklines and statement dresses. Hoops are better with simple satin dresses, black dresses, jumpsuits, sleek hairstyles and modern occasion outfits.' },
      { type: 'paragraph', text: 'If the outfit needs movement rather than shape, drop earrings may be better than both studs and hoops. In that case, Orsola or Concetta Short can lead the look.' },
      {
        type: 'table',
        headers: ['Occasion Look', 'Best Choice', 'Product Direction'],
        rows: [
          ['Detailed wedding guest dress', 'Studs', 'Cadenza M'],
          ['Simple wedding guest dress', 'Hoops or drops', 'Pave Hoops, Orsola'],
          ['Bridesmaid look', 'Studs', 'Cadenza S, Cadenza M'],
          ['Minimal occasion look', 'Studs or hoops', 'Cadenza S, Pave Hoops'],
          ['Modern party outfit', 'Hoops', 'Pave Hoops'],
          ['Black dress', 'Hoops, studs or bold sparkle', 'Pave Hoops, Cadenza M, Lusso'],
          ['Dinner outfit', 'Hoops or medium studs', 'Pave Hoops, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Studs and Hoops by Outfit',
    content: [
      { type: 'paragraph', text: 'Outfit style can help shoppers decide between studs and hoops.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-83.jpg',
        content: [
          {
            type: 'table',
            headers: ['Outfit', 'Choose Studs If', 'Choose Hoops If'],
            rows: [
              ['White shirt and jeans', 'You want simple sparkle', 'You want the outfit to feel more styled'],
              ['Blazer outfit', 'You want classic polish', 'You want a more creative office look'],
              ['Black dress', 'You want clean diamond sparkle', 'You want shape, shine or party energy'],
              ['Satin dress', 'The dress already has shine', 'You want more visible earrings'],
              ['Floral dress', 'You want the jewellery subtle', 'You want contrast and shape'],
              ['Knitwear', 'You want small sparkle', 'You want earrings to show more'],
              ['Wedding guest outfit', 'The outfit is detailed', 'The outfit is simple or modern'],
              ['Travel outfit', 'You want easiest comfort', 'You want one styled earring'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Studs and Hoops by Piercing Position',
    content: [
      { type: 'paragraph', text: 'Studs and hoops work differently depending on piercing position.' },
      {
        type: 'table',
        headers: ['Piercing Position', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['First piercing', 'Stud, hoop, huggie or drop', 'Cadenza M, Pave Hoops, Amadea, Orsola'],
          ['Second piercing', 'Small stud or huggie', 'Cadenza S, Amadea'],
          ['Third piercing', 'Small stud or minimalist detail', 'Cadenza S, Laluce'],
          ['Single piercing', 'Medium stud or hoop', 'Cadenza M, Pave Hoops'],
          ['Multiple piercings', 'Hoop as main, stud as support', 'Pave Hoops + Cadenza S'],
        ],
      },
      { type: 'paragraph', text: 'Hoops usually work best in the first piercing because they need space. Studs can work in almost any piercing position.' },
      { type: 'see-also', text: 'Diamond ear stack ideas', href: '/resources/earring-style-guides/diamond-ear-stack-ideas' },
    ],
  },
  {
    heading: 'Product Pathways by Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest First Pair' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are simple, subtle and easy to wear every day.' },
      { type: 'subheading', text: 'For More Visible Classic Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They keep the classic stud shape but add more presence.' },
      { type: 'subheading', text: 'For a More Visible Hoop Look' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They add shape and sparkle, making them strong for casual outfits, party looks and simple dresses.' },
      { type: 'subheading', text: 'For a Simple Stud and Hoop Stack' },
      { type: 'paragraph', text: 'Choose Pave Hoops with Cadenza S. The hoop leads the look while the small stud supports it.' },
      { type: 'subheading', text: 'For a Minimalist Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S with Laluce minimalist diamond earrings. Add Amadea Huggie earrings if the wearer wants more shape without moving into hoops.' },
      { type: 'subheading', text: 'For Gifts' },
      { type: 'paragraph', text: 'Choose Cadenza M if you want the safest classic diamond gift. Choose Pave Hoops if the recipient already likes hoops or more visible earrings.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first stud', 'Subtle, simple and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'Best visible stud', 'Classic with stronger sparkle'],
          ['Pave Hoops', 'Best hoop choice', 'Adds shape, shine and outfit impact'],
          ['Amadea Huggie earrings', 'Hoop alternative', 'Better when shoppers want close-fitting shape'],
          ['Laluce minimalist diamond earrings', 'Soft support detail', 'Good for minimalist stacks'],
          ['Farfalla butterfly earrings', 'Personal styling alternative', 'Better when the shopper wants meaning'],
          ['Orsola drop earrings', 'Occasion alternative', 'Better when the outfit needs movement'],
          ['Lusso bold statement earrings', 'Party alternative', 'Better when earrings should lead the full look'],
        ],
      },
      { type: 'paragraph', text: 'Choose studs if you want classic sparkle, easy gifting and simple daily wear. Choose hoops if you want more visible shape and outfit impact. For an easy IWantJewels combination, pair Pave Hoops with Cadenza S lab-grown diamond studs.' },
    ],
  },
  {
    heading: 'Common Stud vs Hoop Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing hoops when the shopper really wants subtle everyday jewellery. In that case, studs are usually easier to wear.' },
      { type: 'paragraph', text: 'Another mistake is choosing studs that are too small for a gift or event. If the earrings need to feel more special, Cadenza M may be better than a very small stud.' },
      { type: 'paragraph', text: 'A third mistake is wearing large hoops in multiple piercings without balance. Hoops usually need space, so one hoop should lead and smaller earrings should support.' },
      { type: 'paragraph', text: 'Another mistake is assuming hoops are not suitable for work. Small, refined hoops can work well with workwear if the styling is clean.' },
      { type: 'paragraph', text: 'Finally, do not choose only by shape. Comfort, size, material, metal colour, closure and care routine all matter.' },
      { type: 'see-also', text: 'Hoop vs huggie earrings', href: '/resources/earring-style-guides/hoop-vs-huggie-earrings' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing between studs and hoops, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Do I want classic sparkle or visible shape?',
          'Is this for everyday wear, workwear, gifts, parties or ear stacks?',
          'Do I want the safest first pair?',
          'Does the recipient already wear hoops?',
          'Will the earrings be worn alone or stacked?',
          'Do I want subtle jewellery or more outfit impact?',
          'Is comfort important for long wear?',
          'Does the metal colour match existing jewellery?',
          'Are the earrings easy to clean and store?',
          'Would studs and hoops together create a better stack?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with studs. If you already own studs and want more visible styling, add hoops.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What is the difference between stud and hoop earrings?', answer: 'Stud earrings sit close to the ear as one point of sparkle. Hoop earrings create a circular or curved shape around or below the earlobe.' },
  { question: 'Are studs or hoops better for everyday wear?', answer: 'Studs are usually easier for everyday wear because they are simple and comfortable. Hoops are better when you want more visible shape.' },
  { question: 'Are studs or hoops better for gifts?', answer: 'Studs are usually safer for gifts because they suit more styles. Hoops are good gifts when the recipient already likes hoop earrings.' },
  { question: 'Are hoops good for ear stacks?', answer: 'Yes, hoops can work well in ear stacks, but they usually work best as the main shape piece. Pair them with a small stud for balance.' },
  { question: 'Are studs better for workwear?', answer: 'Studs are usually the safest workwear earring because they are clean, classic and not distracting.' },
  { question: 'Can hoops be worn to work?', answer: 'Yes, small or refined hoops can work well for workwear, especially with blazers, shirts and simple outfits.' },
  { question: 'Are studs better for sensitive ears?', answer: 'Studs are often a safer starting point for sensitive ears because they are usually lightweight and easy to clean.' },
  { question: 'Can you wear studs and hoops together?', answer: 'Yes, studs and hoops work well together. A hoop in the first piercing with a small stud in the second piercing creates a balanced stack.' },
  { question: 'Are hoops better for parties?', answer: 'Hoops are often better for parties because they add more shape and visibility than small studs.' },
  { question: 'What IWantJewels products are best for studs and hoops?', answer: 'Cadenza S and Cadenza M are the strongest stud options, while Pave Hoops are the strongest hoop direction. Pair Pave Hoops with Cadenza S for a balanced ear stack.' },
]

const cta: V2CTABlock = {
  heading: 'Studs and hoops both have a place in a modern jewellery collection. Choose studs for classic sparkle, safe gifting and everyday ease. Choose hoops when you want more shape, visibility and outfit impact.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want wearable pieces with real diamond sparkle. Choose Cadenza S for subtle studs, Cadenza M for more visible sparkle and Pave Hoops for a clean hoop look that works with casual outfits, parties and ear stacks.',
  primaryLabel: 'Shop Stud and Hoop Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Stud Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read How to Stack Earrings',
  tertiaryHref: '/resources/earring-style-guides/how-to-stack-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'stud-vs-hoop-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'stud-vs-hoop-earrings', 3)
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
