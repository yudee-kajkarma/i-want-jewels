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
  title: 'Stud vs Huggie Earrings: Which Is Better?',
  description:
    'Compare stud and huggie earrings for everyday wear, ear stacks, gifts, workwear and lab grown diamond styling.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/earring-style-guides/stud-vs-huggie-earrings',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/earring-style-guides/stud-vs-huggie-earrings',
  },
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-18.jpg',
  title: 'Stud vs Huggie Earrings:',
  subtitle: 'Which Style Should You Choose?',
  paragraphs: [
    'Stud earrings and huggie earrings are two of the easiest earring styles to wear every day. Both are comfortable, versatile and useful in a modern jewellery collection, but they create different looks.',
    'Stud earrings sit close to the ear and usually create one clean point of sparkle. They are classic, safe and easy to gift. Huggie earrings are small hoops that sit close around the earlobe, giving the ear more shape and a slightly more styled feeling. They are especially useful for ear stacks and second piercings.',
    'This resource helps shoppers compare studs and huggies by comfort, styling, gifting, workwear, ear stacking, occasions and outfit use. It also guides users toward IWantJewels products such as Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings and Pave Hoops.',
  ],
  shopLabel: 'Shop Stud and Huggie Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Understand the difference between stud earrings and huggie earrings',
    'Decide which style is better for everyday wear',
    'Choose earrings for workwear, travel, gifts and ear stacks',
    'Learn when studs look better than huggies',
    'Learn when huggies look better than studs',
    'Build simple stud and huggie ear stack combinations',
    'Find IWantJewels product recommendations by styling need',
    'Plan image blocks, product modules, CTA placements and internal links for this page',
  ],
  image: '/blog-images/blog-image-15.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Stud vs Huggie Earrings Comparison',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main comparison tool.' },
      {
        type: 'table',
        headers: ['Feature', 'Stud Earrings', 'Huggie Earrings'],
        rows: [
          ['Shape', 'Sits close to the ear as one point of sparkle', 'Small hoop that hugs the earlobe'],
          ['Style feeling', 'Classic, simple, timeless', 'Modern, styled, slightly more casual'],
          ['Best for', 'Everyday wear, gifts, workwear, first diamond earrings', 'Ear stacks, second piercings, modern daily styling'],
          ['Comfort', 'Usually very comfortable and lightweight', 'Comfortable when the fit and closure are right'],
          ['Visibility', 'Depends on size; small studs are subtle, medium studs are more visible', 'Shape makes them look more styled even when small'],
          ['Gift safety', 'Very safe', 'Good if the person already likes hoops or ear stacks'],
          ['Ear stack use', 'Works as main or supporting piece', 'Excellent shape piece in stacks'],
          ['Workwear use', 'Very strong', 'Strong if the huggie is refined and close-fitting'],
          ['Occasion use', 'Strong with detailed outfits', 'Strong for modern and casual occasion looks'],
          ['Best IWJ direction', 'Cadenza S, Cadenza M', 'Amadea Huggie'],
        ],
      },
      { type: 'paragraph', text: 'Studs are usually the safest first choice. Huggies are better when you want a more styled look or want to build an ear stack.' },
    ],
  },
  {
    heading: 'What Are Stud Earrings?',
    content: [
      { type: 'paragraph', text: 'Stud earrings are earrings that sit directly on the earlobe without hanging below the ear. They usually have a post and backing, and the visible design sits close to the skin.' },
      { type: 'paragraph', text: 'Studs are one of the most classic earring styles because they are simple, comfortable and easy to wear. A small lab-grown diamond stud can work for everyday outfits, while a medium diamond stud can feel more polished and gift-worthy.' },
      { type: 'paragraph', text: 'At IWantJewels, Cadenza S lab-grown diamond studs are ideal for subtle everyday sparkle. Cadenza M diamond stud earrings are better when the shopper wants a more visible diamond look while still keeping the style classic.' },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'What Are Huggie Earrings?',
    content: [
      { type: 'paragraph', text: 'Huggie earrings are small hoop-style earrings that sit close to the earlobe. They are called huggies because they appear to hug the ear.' },
      { type: 'paragraph', text: 'Huggies are useful when shoppers want something more styled than a stud but not as large as a hoop. They add shape to the ear without feeling too dramatic. This makes them especially strong for everyday wear, second piercings and ear stacks.' },
      { type: 'paragraph', text: 'At IWantJewels, Amadea Huggie earrings are the strongest product direction for huggie styling. They can be worn alone for a clean modern look or paired with studs such as Cadenza S or Cadenza M for a more complete ear stack.' },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Which Is Better for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Both studs and huggies are good for everyday wear, but they suit different daily styles.' },
      { type: 'paragraph', text: 'Studs are better if you want the safest, simplest and most classic daily earring. They are easy to wear with almost anything and usually feel low-maintenance.' },
      { type: 'paragraph', text: 'Huggies are better if you want a slightly more styled everyday look. They add shape and can make a simple outfit feel more intentional, especially when paired with a small stud.' },
      {
        type: 'table',
        headers: ['Daily Wear Need', 'Better Choice', 'IWJ Product Direction'],
        rows: [
          ['First everyday earrings', 'Studs', 'Cadenza S'],
          ['Subtle daily sparkle', 'Studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Studs', 'Cadenza M'],
          ['Modern daily styling', 'Huggies', 'Amadea Huggie'],
          ['Daily ear stack', 'Both', 'Cadenza S + Amadea'],
          ['Casual outfit polish', 'Huggies or studs', 'Amadea, Cadenza M'],
          ['Travel jewellery', 'Studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Which Is Better for Ear Stacks?',
    content: [
      { type: 'paragraph', text: 'Huggies are often better for ear stacks because they add shape, but studs are still essential.' },
      { type: 'paragraph', text: 'A good ear stack usually needs both. The stud adds sparkle, while the huggie adds curve and structure. If you only use studs, the stack can feel very simple. If you only use huggies, the stack may lack a clean sparkle point.' },
      { type: 'paragraph', text: 'The easiest IWantJewels stack is Cadenza S with Amadea Huggie earrings. For more visible sparkle, use Cadenza M as the main stud and Amadea as the supporting shape. For a softer stack, add Laluce minimalist diamond earrings.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-77.jpg',
        content: [
          {
            type: 'table',
            headers: ['Ear Stack Style', 'Stud Role', 'Huggie Role', 'Product Direction'],
            rows: [
              ['Simple daily stack', 'Small sparkle point', 'Shape piece', 'Cadenza S + Amadea'],
              ['Visible stack', 'Main diamond sparkle', 'Shape support', 'Cadenza M + Amadea'],
              ['Minimal stack', 'Soft sparkle', 'Optional shape', 'Cadenza S + Laluce + Amadea'],
              ['Workwear stack', 'Polished sparkle', 'Close-fitting shape', 'Cadenza S + Amadea'],
              ['Gift stack', 'Safe diamond piece', 'Modern second piece', 'Cadenza M + Amadea'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Diamond ear stack ideas', href: '/resources/earring-style-guides/diamond-ear-stack-ideas' },
    ],
  },
  {
    heading: 'Which Is Better for Workwear?',
    content: [
      { type: 'paragraph', text: 'Stud earrings are usually the safest choice for workwear, but refined huggies can also work very well.' },
      { type: 'paragraph', text: 'Studs look clean and professional because they sit close to the ear and do not move. Huggies feel slightly more modern and can add personality without becoming distracting.' },
      { type: 'paragraph', text: 'For traditional office styling, Cadenza S or Cadenza M is strongest. For a more modern workwear look, Amadea Huggie earrings work well. If the office style is creative or fashion-forward, a stud and huggie stack can look polished without feeling too bold.' },
      {
        type: 'table',
        headers: ['Workwear Style', 'Better Choice', 'Product Direction'],
        rows: [
          ['Classic office look', 'Studs', 'Cadenza S, Cadenza M'],
          ['Minimal workwear', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Modern office styling', 'Huggies', 'Amadea'],
          ['Creative office styling', 'Stud + huggie stack', 'Cadenza S + Amadea'],
          ['Day-to-dinner work look', 'Medium studs', 'Cadenza M'],
          ['Travel workwear', 'Studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },
  {
    heading: 'Which Is Better for Gifts?',
    content: [
      { type: 'paragraph', text: 'Stud earrings are usually safer for gifts. Huggies are better when the recipient already likes modern jewellery or ear stacks.' },
      { type: 'paragraph', text: 'Studs are classic and less risky because they work for many styles, ages and occasions. They are especially strong for birthdays, first diamond gifts, bridesmaid gifts and everyday jewellery gifts.' },
      { type: 'paragraph', text: 'Huggies feel more personal and fashion-aware. They are a good gift for someone who already wears hoops, has multiple piercings or likes layered jewellery.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Better Choice', 'IWJ Product Direction'],
        rows: [
          ['Safest gift', 'Studs', 'Cadenza S, Cadenza M'],
          ['First diamond gift', 'Studs', 'Cadenza S'],
          ['More visible classic gift', 'Studs', 'Cadenza M'],
          ['Modern gift', 'Huggies', 'Amadea Huggie'],
          ['Ear stack gift', 'Both', 'Cadenza S + Amadea'],
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
      { type: 'paragraph', text: 'For sensitive ears, the better choice is usually the style that is simpler, lighter and easier to clean.' },
      { type: 'paragraph', text: 'Studs are often the safest starting point because they are small, lightweight and easy to wipe. Huggies can also work well, but the closure and inner curve should be cleaned properly.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery uses 925 sterling silver with 14kt gold plating and lab-grown diamonds. This gives the earrings a clearer demi-fine material story than many low-cost fashion earrings, but sensitive-ear comfort still depends on the person, the fit and the care routine.' },
      {
        type: 'table',
        headers: ['Sensitive-Ear Need', 'Better Direction', 'Product Direction'],
        rows: [
          ['Safest start', 'Small studs', 'Cadenza S'],
          ['More visible but still simple', 'Medium studs', 'Cadenza M'],
          ['Lightweight modern style', 'Huggies', 'Amadea'],
          ['Minimalist comfort', 'Minimalist earrings', 'Laluce'],
          ['Ear stack for sensitive ears', 'Small stud + huggie', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Is 925 sterling silver hypoallergenic?', href: '/resources/demi-fine-jewellery-guides/is-925-sterling-silver-hypoallergenic' },
    ],
  },
  {
    heading: 'Which Is Better for Weddings and Occasions?',
    content: [
      { type: 'paragraph', text: 'Studs are better when the outfit already has detail. Huggies are better when the outfit needs a modern, styled finish but not too much length.' },
      { type: 'paragraph', text: 'For weddings, studs are often safer because they do not compete with lace, sequins, embroidery or statement necklines. Huggies are useful for modern wedding guest looks, simple dresses, jumpsuits and ear stacks.' },
      { type: 'paragraph', text: 'If the outfit needs more movement, drop earrings may be better than both studs and huggies. In that case, Orsola or Concetta Short can lead the look, while Cadenza S or Amadea can support the stack.' },
      {
        type: 'table',
        headers: ['Occasion Look', 'Best Choice', 'Product Direction'],
        rows: [
          ['Detailed wedding guest dress', 'Studs', 'Cadenza M'],
          ['Simple wedding guest dress', 'Huggies, studs or drops', 'Amadea, Cadenza M, Orsola'],
          ['Bridesmaid jewellery', 'Studs', 'Cadenza S, Cadenza M'],
          ['Minimal occasion look', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Modern party outfit', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Black dress', 'Studs, huggies or stronger earrings', 'Cadenza M, Amadea, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Studs and Huggies by Outfit',
    content: [
      { type: 'paragraph', text: 'Outfit style can help shoppers decide between studs and huggies.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-79.jpg',
        content: [
          {
            type: 'table',
            headers: ['Outfit', 'Choose Studs If', 'Choose Huggies If'],
            rows: [
              ['White shirt and jeans', 'You want simple sparkle', 'You want a more styled casual look'],
              ['Blazer outfit', 'You want classic polish', 'You want modern office styling'],
              ['Black dress', 'You want clean diamond sparkle', 'You want shape without drops'],
              ['Satin dress', 'The dress already has shine', 'You want a soft modern finish'],
              ['Floral dress', 'You want the jewellery subtle', 'You want to add shape to a soft look'],
              ['Knitwear', 'You want small sparkle', 'You want earrings to show more'],
              ['Wedding guest outfit', 'The outfit is detailed', 'The outfit is simple or modern'],
              ['Travel outfit', 'You want easiest comfort', 'You want one piece to feel styled'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Studs and Huggies by Piercing Position',
    content: [
      { type: 'paragraph', text: 'Studs and huggies can be used differently depending on where they sit on the ear.' },
      {
        type: 'table',
        headers: ['Piercing Position', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['First piercing', 'Medium stud, small stud or huggie', 'Cadenza M, Cadenza S, Amadea'],
          ['Second piercing', 'Small stud or huggie', 'Cadenza S, Amadea, Laluce'],
          ['Third piercing', 'Small stud or minimalist detail', 'Cadenza S, Laluce'],
          ['Single piercing', 'Medium stud or huggie', 'Cadenza M, Amadea'],
          ['Multiple piercings', 'Stud + huggie combination', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'paragraph', text: 'If you only have one piercing, studs are safer and huggies feel more modern. If you have two or more piercings, studs and huggies work best together.' },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Product Pathways by Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest First Pair' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are simple, subtle and easy to wear every day.' },
      { type: 'subheading', text: 'For More Visible Classic Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They keep the classic stud look but add more presence.' },
      { type: 'subheading', text: 'For a Modern Everyday Look' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They give shape and style while staying close to the ear.' },
      { type: 'subheading', text: 'For a Simple Ear Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea Huggie earrings. This is the easiest stud and huggie combination.' },
      { type: 'subheading', text: 'For a Minimalist Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S with Laluce minimalist diamond earrings. Add Amadea if the wearer wants more shape.' },
      { type: 'subheading', text: 'For a Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M if you want the safest classic gift. Choose Amadea if the recipient already likes huggies or ear stacks.' },
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
          ['Amadea Huggie earrings', 'Best huggie', 'Modern, stackable and close-fitting'],
          ['Laluce minimalist diamond earrings', 'Best soft detail', 'Good for minimalist stacks'],
          ['Pave Hoops', 'Hoop alternative', 'Better when shoppers want more shape than huggies'],
          ['Farfalla butterfly earrings', 'Personal styling alternative', 'Better when the shopper wants meaning'],
          ['Orsola drop earrings', 'Occasion alternative', 'Better when the outfit needs movement'],
          ['Lusso bold statement earrings', 'Party alternative', 'Better when the earrings should lead the full look'],
        ],
      },
      { type: 'paragraph', text: 'Choose studs if you want classic sparkle, safe gifting and easy daily wear. Choose huggies if you want a more modern look, a better ear stack piece or shape around the ear. For the easiest IWantJewels combination, pair Cadenza S with Amadea Huggie earrings.' },
    ],
  },
  {
    heading: 'Common Stud vs Huggie Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is assuming huggies and hoops are the same. Huggies are usually smaller and sit closer to the ear, while hoops can be larger and more visible.' },
      { type: 'paragraph', text: 'Another mistake is choosing huggies as a gift for someone who only wears studs. Studs are usually safer if you do not know the recipient\'s style.' },
      { type: 'paragraph', text: 'A third mistake is wearing too many huggies without a sparkle point. Adding a stud can make the stack feel more balanced.' },
      { type: 'paragraph', text: 'Another mistake is choosing studs that are too subtle for an important gift. If the gift needs to feel more special, Cadenza M may be better than a very small stud.' },
      { type: 'paragraph', text: 'Finally, do not choose by style alone. Comfort, closure, size, material and care routine all matter.' },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing between studs and huggies, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Do I want classic sparkle or modern shape?',
          'Is this for everyday wear, workwear, gifts or ear stacks?',
          'Do I want the safest first pair?',
          'Does the recipient already wear hoops or huggies?',
          'Will the earrings be worn alone or stacked?',
          'Do I want subtle sparkle or more visible jewellery?',
          'Is comfort important for long wear?',
          'Does the metal match my existing jewellery?',
          'Are the earrings easy to clean and store?',
          'Would a stud and huggie combination be better than choosing only one?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with studs. If you already own studs and want a more styled look, add huggies.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What is the difference between stud and huggie earrings?', answer: 'Stud earrings sit close to the ear as one point of sparkle. Huggie earrings are small hoop-style earrings that hug the earlobe.' },
  { question: 'Are studs or huggies better for everyday wear?', answer: 'Both are good for everyday wear. Studs are more classic and simple, while huggies feel more modern and styled.' },
  { question: 'Are studs or huggies better for ear stacks?', answer: 'Both work well together. Studs add sparkle, and huggies add shape, making them one of the easiest ear stack combinations.' },
  { question: 'Are stud earrings better for gifts?', answer: 'Yes, studs are usually safer for gifts because they are classic, easy to wear and suit many styles.' },
  { question: 'Are huggie earrings good gifts?', answer: 'Yes, huggies are good gifts for someone who likes modern jewellery, hoops or ear stacks.' },
  { question: 'Are huggies comfortable?', answer: 'Huggies can be comfortable when they fit well and have a secure closure. They should not pinch or feel too tight.' },
  { question: 'Can you wear huggies in a second piercing?', answer: 'Yes, huggies can work well in a second piercing, especially when paired with a stud in the first piercing.' },
  { question: 'Are studs better for sensitive ears?', answer: 'Studs are often a safer starting point for sensitive ears because they are simple, lightweight and easy to clean.' },
  { question: 'Can you wear studs and huggies together?', answer: 'Yes, studs and huggies are one of the best earring combinations. A small diamond stud with a huggie creates a simple everyday ear stack.' },
  { question: 'What IWantJewels products are best for a stud and huggie stack?', answer: 'Cadenza S lab-grown diamond studs with Amadea Huggie earrings is the easiest IWantJewels stud and huggie stack.' },
]

const cta: V2CTABlock = {
  heading: 'Studs and huggies both deserve a place in a modern jewellery collection. Choose studs for classic sparkle, safe gifting and everyday simplicity. Choose huggies for modern styling, ear stacks and a more shaped look.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want wearable pieces with real diamond sparkle. Choose Cadenza S for subtle studs, Cadenza M for more visible sparkle and Amadea Huggie earrings for a clean, modern ear stack.',
  primaryLabel: 'Shop Stud and Huggie Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Stud Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read How to Stack Earrings',
  tertiaryHref: '/resources/earring-style-guides/how-to-stack-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'stud-vs-huggie-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'stud-vs-huggie-earrings', 3)
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
