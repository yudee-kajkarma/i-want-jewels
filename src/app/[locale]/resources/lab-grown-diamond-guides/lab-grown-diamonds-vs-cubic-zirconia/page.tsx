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
  title: 'Lab Grown Diamonds vs Cubic Zirconia',
  description:
    'Learn the difference between lab grown diamonds and cubic zirconia, including sparkle, durability, price, value and jewellery use.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-cubic-zirconia', locale),
  }
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-115.png',
  title: 'Lab-Grown Diamonds vs Cubic Zirconia:',
  subtitle: 'What Is the Difference?',
  paragraphs: [
    'Lab-grown diamonds and cubic zirconia are not the same. A lab-grown diamond is a real diamond created in a controlled laboratory environment, while cubic zirconia is a diamond simulant made to look like a diamond. Cubic zirconia can be shiny and affordable, but it is not a diamond.',
    'The main difference is material, durability and long-term appearance. Lab-grown diamonds have the beauty, hardness and structure of diamond jewellery. Cubic zirconia is a lower-cost alternative that can look sparkly at first, but it is more likely to scratch, dull or look glassy over time.',
    'For earrings, lab-grown diamonds are the better choice if you want real diamond sparkle, better durability and a more premium jewellery feeling. Cubic zirconia can work for short-term fashion jewellery, but it does not give the same value or meaning as genuine lab-grown diamond earrings.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds are real diamonds; cubic zirconia is not.',
    'Cubic zirconia is a diamond simulant, meaning it is made to imitate the look of a diamond.',
    'Lab-grown diamonds are more durable than cubic zirconia.',
    'Cubic zirconia can look shiny, but it may scratch, dull or look glassier over time.',
    'Lab-grown diamonds are usually more expensive than cubic zirconia, but they offer real diamond value.',
    'Cubic zirconia is better for very low-cost fashion jewellery.',
    'Lab-grown diamonds are better for earrings, gifts, demi-fine jewellery and pieces you want to wear often.',
    'For IWantJewels, lab-grown diamond earrings are positioned as real diamond jewellery, not simple diamond-look accessories.',
  ],
  image: '/blog-images/blog-image-113.png',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Is the Main Difference Between Lab-Grown Diamonds and Cubic Zirconia?',
    content: [
      { type: 'paragraph', text: 'The main difference is that lab-grown diamonds are diamonds, while cubic zirconia is not.' },
      { type: 'paragraph', text: 'A lab-grown diamond is created in a laboratory using technology that grows diamond material. It has the basic structure and durability people expect from diamond jewellery. Cubic zirconia, often shortened to CZ, is a diamond simulant. It is made to look like a diamond, but it is a different material.' },
      { type: 'paragraph', text: 'This difference matters because many shoppers see a sparkly earring and assume all shine is the same. It is not. A cubic zirconia earring can look bright in a photo or under store lighting, but it does not have the same diamond identity, durability or long-term jewellery value as a lab-grown diamond.' },
      { type: 'paragraph', text: 'For someone buying jewellery just for a temporary trend, cubic zirconia may be enough. But for someone who wants real diamond earrings that feel more premium and meaningful, lab-grown diamonds are the stronger choice.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Cubic Zirconia: Simple Comparison',
    content: [
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamond', 'Cubic Zirconia'],
        rows: [
          ['Is it a real diamond?', 'Yes', 'No'],
          ['Material', 'Diamond', 'Diamond simulant'],
          ['Origin', 'Created in a controlled laboratory environment', 'Man-made stone created to imitate diamond'],
          ['Sparkle', 'Classic diamond brilliance', 'Very sparkly, sometimes glassier or more artificial'],
          ['Durability', 'Very durable', 'Less durable than diamond'],
          ['Long-term look', 'Holds its diamond beauty better', 'Can scratch, dull or lose polish more easily'],
          ['Price', 'Usually more expensive than CZ', 'Usually much cheaper'],
          ['Best for', 'Real diamond jewellery, gifts, earrings, demi-fine pieces', 'Low-cost fashion jewellery'],
          ['Buyer feeling', 'Premium, meaningful, long-term', 'Budget-friendly, temporary, trend-led'],
        ],
      },
      { type: 'paragraph', text: 'The most important point is simple: both can sparkle, but only one is diamond. If your priority is the lowest possible price, cubic zirconia may be enough. If your priority is real diamond jewellery, lab-grown diamonds are the better option.' },
    ],
  },
  {
    heading: 'Is Cubic Zirconia Fake Diamond?',
    content: [
      { type: 'paragraph', text: 'Cubic zirconia is not a diamond. It is a diamond simulant.' },
      { type: 'paragraph', text: 'That does not mean cubic zirconia is always bad. It can be useful for low-cost jewellery, costume jewellery or trend pieces that you do not expect to wear for years. It can also look bright and shiny when new.' },
      { type: 'paragraph', text: 'The issue is that cubic zirconia is sometimes confused with lab-grown diamond, and that confusion can lead shoppers to think both are the same. They are not. Cubic zirconia is made to imitate the appearance of a diamond. A lab-grown diamond is a diamond with a laboratory origin.' },
      { type: 'paragraph', text: 'For buyers who want jewellery with more meaning, durability and long-term beauty, lab-grown diamond earrings are usually a better choice than CZ earrings.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Fake Like Cubic Zirconia?',
    content: [
      { type: 'paragraph', text: 'No, lab-grown diamonds are not fake like cubic zirconia.' },
      { type: 'paragraph', text: 'This is one of the biggest misunderstandings in jewellery shopping. Some people hear "lab-grown" and think it means imitation. But lab-grown diamonds are not diamond-look stones. They are created differently from natural diamonds, but they are still diamonds.' },
      { type: 'paragraph', text: 'Cubic zirconia is different. It is not diamond material. It is made to look similar to a diamond, but it is a separate stone.' },
      { type: 'paragraph', text: 'A better way to think about it is this:' },
      { type: 'paragraph', text: 'Lab-grown diamond = real diamond with a laboratory origin. Cubic zirconia = diamond-look stone made from a different material.' },
      { type: 'paragraph', text: 'This is why lab-grown diamonds are a much stronger choice for people who want genuine diamond jewellery without choosing mined diamonds.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '#' },
    ],
  },
  {
    heading: 'Which Looks Better: Lab-Grown Diamond or Cubic Zirconia?',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-12.jpg',
        content: [
          { type: 'paragraph', text: 'At first glance, both can look sparkly. But over time, lab-grown diamonds usually offer a more premium and lasting look.' },
          { type: 'paragraph', text: 'Cubic zirconia can sometimes look very bright, but it may also appear glassier or more artificial, especially in certain lighting. It can show more rainbow-like flashes and may not have the same depth as a diamond. It can also scratch and dull more easily, which affects how it looks after regular wear.' },
          { type: 'paragraph', text: 'A well-cut lab-grown diamond has classic diamond brilliance. It can look clean, bright and refined in jewellery, especially in earrings where the stones sit close to the face.' },
        ],
      },
      { type: 'paragraph', text: 'For everyday earrings, this matters. You want the jewellery to continue looking polished after repeated wear, not only in the first product photo.' },
    ],
  },
  {
    heading: 'Which Lasts Longer: Lab-Grown Diamond or Cubic Zirconia?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds last longer than cubic zirconia.' },
      { type: 'paragraph', text: 'Diamond is one of the hardest materials used in jewellery. Cubic zirconia is less durable and more likely to show wear over time. It can scratch, lose polish and become dull more easily than diamond.' },
      { type: 'paragraph', text: 'This is especially important for earrings you plan to wear often. Earrings come into contact with skin, hair products, perfume, makeup, storage pouches and travel cases. A stone that is less durable may lose its fresh sparkle faster.' },
      { type: 'paragraph', text: 'If you only need jewellery for one event or a short-term trend, cubic zirconia may be fine. If you want earrings that feel more premium and can stay beautiful with proper care, lab-grown diamonds are the stronger option.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '#' },
    ],
  },
  {
    heading: 'Why Is Cubic Zirconia Cheaper Than Lab-Grown Diamond?',
    content: [
      { type: 'paragraph', text: 'Cubic zirconia is cheaper because it is not diamond.' },
      { type: 'paragraph', text: 'It is easier and less costly to produce than lab-grown diamonds. It does not carry the same material value, durability or diamond identity. That is why cubic zirconia jewellery is often found in low-cost fashion jewellery, costume jewellery and trend-led pieces.' },
      { type: 'paragraph', text: 'Lab-grown diamonds cost more because they are real diamonds created through a more advanced process. They also offer better durability and a more premium jewellery experience.' },
      { type: 'paragraph', text: 'The lower price of cubic zirconia can be attractive, but price should not be the only factor. A very cheap earring that loses shine quickly may not be good value if you wanted something long-lasting. A lab-grown diamond earring may cost more upfront, but it can feel more worthwhile if you wear it often.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings vs Cubic Zirconia Earrings',
    content: [
      { type: 'paragraph', text: 'For earrings, the choice depends on what you want from the jewellery.' },
      { type: 'paragraph', text: 'If you want a very affordable fashion earring for a one-time outfit, cubic zirconia can work. But if you want earrings that feel more special, more durable and closer to fine jewellery, lab-grown diamonds are the better option.' },
      {
        type: 'table',
        headers: ['Buyer Need', 'Better Choice', 'Why'],
        rows: [
          ['Lowest possible price', 'Cubic zirconia', 'It is usually much cheaper'],
          ['Real diamond jewellery', 'Lab-grown diamond', 'It is actual diamond'],
          ['Everyday earrings', 'Lab-grown diamond', 'More durable and premium'],
          ['Short-term fashion trend', 'Cubic zirconia', 'Good for temporary styling'],
          ['Meaningful gift', 'Lab-grown diamond', 'Feels more special and lasting'],
          ['Wedding guest jewellery', 'Lab-grown diamond', 'Looks more refined and elegant'],
          ['Ear stacks', 'Lab-grown diamond', 'Small diamonds add lasting sparkle'],
          ['Demi-fine jewellery', 'Lab-grown diamond', 'Better fit for premium everyday pieces'],
        ],
      },
      { type: 'paragraph', text: 'At IWantJewels, lab-grown diamond earrings are designed for people who want real diamond sparkle in wearable demi-fine designs. They are not meant to compete with the cheapest costume jewellery. They are made for shoppers who want better materials, better feeling and more lasting beauty.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Worth More Than Cubic Zirconia Earrings?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond earrings are generally worth more than cubic zirconia earrings because they use real diamonds.' },
      { type: 'paragraph', text: 'That does not mean every shopper needs lab-grown diamonds for every purchase. For a costume party, trend-led look or very short-term accessory, cubic zirconia may be enough. But for jewellery you want to wear often, gift meaningfully or keep in your regular collection, lab-grown diamonds make more sense.' },
      { type: 'paragraph', text: 'The extra value is not only about the stone. It is about how the jewellery feels when you wear it. A real diamond earring can feel more polished and special. It can also hold up better to repeated use when properly cared for.' },
      { type: 'see-also', text: 'Are lab-grown diamonds worth it?', href: '#' },
    ],
  },
  {
    heading: 'Are Cubic Zirconia Earrings Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Cubic zirconia earrings can be worn every day, but they are not the best choice if you want long-term durability and a premium look.' },
      { type: 'paragraph', text: 'Because CZ is less durable than diamond, it may show wear faster. It can also lose some of its original shine with regular use, especially if it is exposed to makeup, perfume, lotion, sweat, hair products or rough storage.' },
      { type: 'paragraph', text: 'For everyday jewellery, lab-grown diamonds are usually a better choice because they offer real diamond durability and a more refined appearance.' },
      { type: 'paragraph', text: 'For IWantJewels customers, pieces like Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings are better everyday options than CZ earrings because they are designed as wearable demi-fine jewellery with genuine lab-grown diamonds.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Cubic Zirconia for Gifts',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are usually better than cubic zirconia for meaningful gifts.' },
      { type: 'paragraph', text: 'A gift does not always need to be expensive, but it should feel thoughtful. Lab-grown diamond jewellery feels more special because it uses real diamonds. Cubic zirconia can look pretty, but it may feel more like fashion jewellery than a lasting gift.' },
      { type: 'paragraph', text: 'For birthdays, anniversaries, bridesmaids, graduations and romantic gifts, lab-grown diamond earrings are usually the stronger choice. They feel more personal, more premium and more memorable.' },
      { type: 'paragraph', text: 'If you want a safe gift, choose Cadenza S or Cadenza M lab-grown diamond studs. If you want a symbolic gift, Farfalla butterfly earrings or Alidi Farfalla butterfly earrings can feel more personal. If the person enjoys dressing up, Orsola drop earrings or Lusso bold statement earrings may feel more exciting.' },
      { type: 'see-also', text: 'Explore Jewellery Gifts', href: '/products' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Cubic Zirconia for Wedding Guest Jewellery',
    content: [
      { type: 'paragraph', text: 'For wedding guest jewellery, lab-grown diamonds usually look more refined than cubic zirconia.' },
      { type: 'paragraph', text: 'Wedding guest jewellery should feel polished, elegant and appropriate for the occasion. Cubic zirconia can look bright, but it may sometimes feel too costume-like, especially if the stones are large or overly flashy. Lab-grown diamonds give a cleaner and more premium sparkle.' },
      { type: 'paragraph', text: 'For a wedding guest outfit, you do not always need the biggest earrings. The right balance matters more. Studs work well with detailed dresses. Drop earrings work beautifully with simple dresses, satin outfits, strapless necklines and evening looks. Butterfly earrings can suit softer romantic outfits.' },
      { type: 'paragraph', text: 'For IWantJewels, Orsola drop earrings are a strong wedding guest recommendation. Cadenza M diamond stud earrings work well if the outfit is already detailed. Farfalla butterfly earrings are a lovely option for softer looks.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Cubic Zirconia for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'For ear stacks, lab-grown diamonds are usually better if you want a polished and lasting look.' },
      { type: 'paragraph', text: 'Ear stacks depend on small details. A tiny stud, huggie or minimalist earring may be small, but it still affects the whole look. Cubic zirconia can work for trend-led stacks, but lab-grown diamonds give the ear stack a cleaner, more premium finish.' },
      { type: 'paragraph', text: 'A simple diamond ear stack could include Cadenza S lab-grown diamond studs with Amadea Huggie earrings. For a softer look, add Laluce minimalist diamond earrings. This creates sparkle without making the ear feel crowded.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond vs Cubic Zirconia in Demi-Fine Jewellery',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery sits between costume jewellery and traditional fine jewellery. It should feel more elevated than low-cost fashion jewellery, but more accessible than solid gold or platinum fine jewellery.' },
      { type: 'paragraph', text: 'Lab-grown diamonds are a strong fit for demi-fine jewellery because they add real diamond beauty without making the jewellery feel too formal or unreachable. Cubic zirconia can be used in fashion jewellery, but it does not carry the same premium feeling.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery direction is built around lab-grown diamonds, 925 sterling silver and 14kt gold plating. This combination gives the pieces a more meaningful material story than simple CZ fashion jewellery.' },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '#' },
    ],
  },
  {
    heading: 'When Should You Choose Cubic Zirconia?',
    content: [
      { type: 'paragraph', text: 'Cubic zirconia can make sense in some situations.' },
      { type: 'paragraph', text: 'Choose cubic zirconia if you want the lowest possible price, need jewellery for one outfit, are buying a trend piece you do not expect to wear often, or want costume-style jewellery for temporary use.' },
      { type: 'paragraph', text: 'There is nothing wrong with that when the purpose is clear. The problem happens when shoppers think cubic zirconia and lab-grown diamonds are the same. They are not.' },
      { type: 'paragraph', text: 'If you want a fashion accessory, cubic zirconia can work. If you want real diamond jewellery, lab-grown diamonds are the better choice.' },
    ],
  },
  {
    heading: 'When Should You Choose Lab-Grown Diamonds?',
    content: [
      { type: 'paragraph', text: 'Choose lab-grown diamonds if you want jewellery that feels more premium, more durable and more meaningful than diamond-look fashion jewellery.' },
      { type: 'paragraph', text: 'They are especially worth choosing for:' },
      {
        type: 'bullet-list',
        items: [
          'Everyday diamond earrings',
          'Birthday or anniversary gifts',
          'Wedding guest jewellery',
          'Bridesmaid jewellery',
          'Ear stacks',
          'Drop earrings for dinners and parties',
          'Demi-fine jewellery collections',
          'Pieces you want to wear more than once',
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, lab-grown diamonds are the stronger choice because the brand is built around real diamond sparkle in wearable demi-fine designs. The goal is not just to create jewellery that looks shiny for a short time, but jewellery that feels beautiful, useful and giftable.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you are choosing lab-grown diamonds instead of cubic zirconia, start with earrings you can actually wear often.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First real diamond earrings', 'Simple, clean and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'More visible everyday sparkle', 'Classic with stronger presence'],
          ['Amadea Huggie earrings', 'Ear stacks', 'Adds diamond shine in a modern way'],
          ['Laluce minimalist diamond earrings', 'Quiet everyday styling', 'Easy to pair with simple outfits'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'More personal than basic fashion jewellery'],
          ['Alidi Farfalla butterfly earrings', 'Feminine gift styling', 'Soft, symbolic and memorable'],
          ['Orsola drop earrings', 'Wedding guests and dinners', 'More refined than CZ occasion earrings'],
          ['Lusso bold statement earrings', 'Party looks', 'Strong sparkle with real diamond appeal'],
        ],
      },
      { type: 'paragraph', text: 'If you want jewellery that feels more special than diamond-look accessories, start with lab-grown diamond earrings. Choose studs for everyday wear, huggies for ear stacks, butterfly earrings for gifts or drop earrings for occasions.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is assuming that all sparkly stones are diamonds. They are not. Always check whether the jewellery uses lab-grown diamonds, natural diamonds, cubic zirconia or another simulant.' },
      { type: 'paragraph', text: 'Another mistake is buying cubic zirconia while expecting it to age like diamond. CZ can look pretty, but it is not as durable as diamond.' },
      { type: 'paragraph', text: 'A third mistake is choosing only by price. The cheapest option is not always the best value if the jewellery dulls quickly or does not feel special enough to wear often.' },
      { type: 'paragraph', text: 'Finally, do not assume lab-grown means fake. Lab-grown diamonds are real diamonds with a laboratory origin.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying',
    content: [
      { type: 'paragraph', text: 'Before choosing between lab-grown diamonds and cubic zirconia, ask yourself:' },
      {
        type: 'bullet-list',
        items: [
          'Do I want real diamond jewellery or a diamond-look accessory?',
          'Will I wear this piece often?',
          'Is this for a meaningful gift?',
          'Do I care about long-term sparkle and durability?',
          'Am I buying for everyday wear, a wedding, a party or one outfit?',
          'Does the product clearly say lab-grown diamond or cubic zirconia?',
          'Is the metal suitable for regular wear?',
          'Does the jewellery feel special enough for the purpose?',
        ],
      },
      { type: 'paragraph', text: 'If you want the lowest possible price for temporary styling, cubic zirconia may be enough. If you want real diamond jewellery that feels more premium and wearable, lab-grown diamonds are the better choice.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  { question: 'Are lab-grown diamonds the same as cubic zirconia?', answer: 'No, lab-grown diamonds and cubic zirconia are not the same. Lab-grown diamonds are real diamonds, while cubic zirconia is a diamond simulant.' },
  { question: 'Is cubic zirconia a real diamond?', answer: 'No, cubic zirconia is not a real diamond. It is made to look like a diamond, but it is a different material.' },
  { question: 'Are lab-grown diamonds fake?', answer: 'No, lab-grown diamonds are not fake. They are real diamonds created in a controlled laboratory environment.' },
  { question: 'Which is better, lab-grown diamond or cubic zirconia?', answer: 'Lab-grown diamonds are better if you want real diamond jewellery, durability and a more premium feel. Cubic zirconia is better if you want a very low-cost fashion accessory.' },
  { question: 'Does cubic zirconia sparkle like a diamond?', answer: 'Cubic zirconia can sparkle, but its sparkle can look glassier or more artificial. It may also dull or scratch more easily over time.' },
  { question: 'Do lab-grown diamonds last longer than cubic zirconia?', answer: 'Yes, lab-grown diamonds are more durable and generally last longer than cubic zirconia when properly cared for.' },
  { question: 'Are lab-grown diamonds more expensive than cubic zirconia?', answer: 'Yes, lab-grown diamonds are usually more expensive than cubic zirconia because they are real diamonds, not simulants.' },
  { question: 'Are cubic zirconia earrings good for everyday wear?', answer: 'Cubic zirconia earrings can be worn daily, but they may scratch or dull faster than lab-grown diamond earrings.' },
  { question: 'Are lab-grown diamond earrings good gifts?', answer: 'Yes, lab-grown diamond earrings make thoughtful gifts because they feel more special and lasting than diamond-look fashion jewellery.' },
  { question: 'Should I buy lab-grown diamond earrings or cubic zirconia earrings?', answer: 'Choose lab-grown diamond earrings if you want real diamond jewellery for everyday wear, gifts or occasions. Choose cubic zirconia if you only need a low-cost accessory for temporary use.' },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-grown diamonds and cubic zirconia can both sparkle, but they are not the same. Cubic zirconia is a diamond-look stone, while lab-grown diamonds are real diamonds created above ground.',
  body: 'If you want jewellery that feels more premium, meaningful and wearable, lab-grown diamonds are the stronger choice. Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in a demi-fine design. Choose studs for everyday polish, huggies for ear stacks, butterfly earrings for thoughtful gifts or drop earrings for weddings and evening outfits.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamonds-vs-cubic-zirconia')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamonds-vs-cubic-zirconia', 3)
  return (
    <ResourceArticleV2Page
      category={category}
      article={article}
      relatedArticles={relatedArticles}
      heroIntro={heroIntro}
      quickSummary={quickSummary}
      content={articleContent}
      cta={cta}
      faq={faq}
    />
  )
}