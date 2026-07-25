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
  title: 'Are Lab Grown Diamond Earrings Worth It?',
  description:
    'Find out if lab grown diamond earrings are worth buying for everyday wear, gifts, weddings, ear stacks and occasion jewellery.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/are-lab-grown-diamond-earrings-worth-it',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/are-lab-grown-diamond-earrings-worth-it',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-104.jpg',
  title: 'Are Lab-Grown Diamond Earrings Worth It?',
  subtitle: '',
  paragraphs: [
    'Lab-grown diamond earrings are worth considering if you want real diamond sparkle in jewellery that feels wearable, modern and easier to buy than many comparable natural diamond pieces. But whether they are "worth it" depends on why you are buying them.',
    'If you want earrings for everyday wear, gifting, wedding guest outfits, ear stacks or party styling, lab-grown diamonds can be a very strong choice. If your main goal is resale value or mined rarity, natural diamonds may feel more suitable. For most IWantJewels shoppers, the value is not about resale. It is about choosing earrings that look beautiful, feel special, and can actually be worn.',
    'This resource helps you decide when lab-grown diamond earrings are worth buying, which styles give the best value, and which IWantJewels products make the most sense for everyday wear, gifts, weddings and occasions.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Decide if lab-grown diamond earrings are worth buying',
    'Understand when lab-grown earrings make more sense than natural diamond earrings',
    'Compare value by earring type: studs, huggies, drops, hoops, butterfly earrings and bold statement pieces',
    'Choose earrings for everyday wear, gifts, weddings, parties and ear stacks',
    'Understand when resale value matters and when it does not',
    'Avoid common buying mistakes',
    'Find IWantJewels product recommendations by purpose',
    'Plan product links, shop links, image blocks and CTA placements',
  ],
  image: '/blog-images/blog-image-101.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Makes Lab-Grown Diamond Earrings Worth It?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings are worth it when they give you the right balance of beauty, wearability, quality and price.' },
      { type: 'paragraph', text: 'The value does not come only from the diamond. It comes from the full piece: the design, metal, comfort, setting, finish, styling flexibility and how often you will wear the earrings.' },
      { type: 'paragraph', text: 'A pair of earrings can be "worth it" even if they are not the largest diamonds. If they are comfortable, easy to style and worn often, they may give better value than a larger pair that stays in a box.' },
      { type: 'paragraph', text: 'For IWantJewels, lab-grown diamond earrings are especially useful because they bring real diamond sparkle into demi-fine jewellery. Pieces are designed with lab-grown diamonds, 925 sterling silver and 14kt gold plating, which makes them feel premium without being too formal for everyday styling.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'When Are Lab-Grown Diamond Earrings Worth Buying?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings are worth buying when your goal is to wear and enjoy the jewellery.' },
      { type: 'paragraph', text: 'They are especially strong for people who want diamond earrings for real-life use, not only for rare formal events. They work well for everyday outfits, office looks, dinners, wedding guest styling, birthday gifts, anniversary gifts and ear stacks.' },
      {
        type: 'table',
        headers: ['Buying Purpose', 'Are Lab-Grown Diamond Earrings Worth It?', 'Why'],
        rows: [
          ['Everyday wear', 'Yes', 'Real diamond sparkle in wearable styles'],
          ['First diamond earrings', 'Yes', 'Easier entry point than many natural diamond earrings'],
          ['Gift jewellery', 'Yes', 'Feels special and thoughtful'],
          ['Wedding guest jewellery', 'Yes', 'Elegant sparkle without needing mined diamonds'],
          ['Ear stacks', 'Yes', 'Small studs and huggies add lasting shine'],
          ['Party styling', 'Yes', 'Lets you choose stronger sparkle and design'],
          ['Resale value', 'Not usually the main reason', 'Better bought for wearing than reselling'],
          ['Mined rarity', 'Natural diamonds may suit better', 'Lab-grown diamonds are not valued for natural rarity'],
        ],
      },
      { type: 'paragraph', text: 'The strongest reason to buy lab-grown diamond earrings is simple: you want diamond jewellery you will actually use.' },
    ],
  },
  {
    heading: 'When Are Lab-Grown Diamond Earrings Not the Right Choice?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings may not be the right choice if your main goal is resale value, mined origin or traditional rarity.' },
      { type: 'paragraph', text: 'Some buyers specifically want natural diamonds because they value geological formation, rarity and traditional fine jewellery symbolism. That is a valid preference. If that is the most important part of the purchase, natural diamonds may feel more meaningful.' },
      { type: 'paragraph', text: 'Lab-grown diamond earrings are also not the same as buying jewellery as an investment. They are usually better for wearing, gifting and styling than for resale.' },
      { type: 'paragraph', text: 'So, if you are buying earrings because you want real diamond beauty in a more modern, accessible and wearable form, lab-grown diamonds make sense. If you are buying primarily for investment or mined rarity, they may not be the best fit.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings vs Natural Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Lab-grown and natural diamond earrings can both be beautiful. The difference is mainly origin, price and buyer priority.' },
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamond Earrings', 'Natural Diamond Earrings'],
        rows: [
          ['Diamond type', 'Real diamonds created in a lab', 'Real diamonds formed underground'],
          ['Price', 'Usually more accessible', 'Usually more expensive'],
          ['Everyday use', 'Strong fit', 'Can feel more formal or precious'],
          ['Gift appeal', 'Modern and thoughtful', 'Traditional and classic'],
          ['Resale focus', 'Usually weaker resale appeal', 'Often stronger traditional resale market'],
          ['Best for', 'Wearing, styling, gifting, modern jewellery', 'Rarity, tradition, heirloom appeal'],
        ],
      },
      { type: 'paragraph', text: 'For earrings, lab-grown diamonds often make practical sense because earrings are usually bought for sparkle, design and wearability. Most shoppers are not buying earrings because they plan to resell them. They are buying them because they want to look polished, feel confident or give someone a beautiful gift.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings vs Cubic Zirconia Earrings',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings and cubic zirconia earrings are not the same.' },
      { type: 'paragraph', text: 'Cubic zirconia is a diamond simulant. It can look shiny, but it is not diamond. Lab-grown diamonds are real diamonds created in a controlled laboratory environment.' },
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamond Earrings', 'Cubic Zirconia Earrings'],
        rows: [
          ['Is it diamond?', 'Yes', 'No'],
          ['Jewellery feeling', 'Premium and diamond-focused', 'Fashion or costume-style'],
          ['Durability', 'Stronger', 'Less durable than diamond'],
          ['Long-term sparkle', 'Better lasting diamond beauty', 'May scratch or dull more easily'],
          ['Gift value', 'More meaningful', 'More budget-led'],
          ['Best for', 'Real diamond earrings', 'Short-term fashion jewellery'],
        ],
      },
      { type: 'paragraph', text: 'If you only want a low-cost accessory for one outfit, cubic zirconia can work. But if you want earrings that feel more special, durable and gift-worthy, lab-grown diamonds are the better choice.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-cubic-zirconia' },
    ],
  },
  {
    heading: 'Best Value by Earring Style',
    content: [
      { type: 'paragraph', text: 'Not every earring style gives value in the same way. Some are valuable because they are worn often. Some are valuable because they make a gift feel personal. Others are valuable because they complete occasion outfits.' },
      {
        type: 'table',
        headers: ['Earring Style', 'Value Comes From', 'Best IWJ Direction'],
        rows: [
          ['Stud earrings', 'Repeat wear and timeless styling', 'Cadenza S, Cadenza M'],
          ['Huggie earrings', 'Ear stacking and daily versatility', 'Amadea Huggie'],
          ['Minimalist earrings', 'Simple styling and quiet polish', 'Laluce'],
          ['Hoop earrings', 'Shape, sparkle and easy styling', 'Pave Hoops'],
          ['Drop earrings', 'Occasion elegance and movement', 'Orsola, Concetta Short, Concetta Long'],
          ['Butterfly earrings', 'Symbolism and gift emotion', 'Farfalla, Alidi Farfalla'],
          ['Bold statement earrings', 'Party impact and high-sparkle styling', 'Lusso'],
        ],
      },
      { type: 'paragraph', text: 'The best value depends on what the buyer needs. If the earrings will be worn every week, studs or huggies may offer the best value. If the earrings are for a special dress or event, drops or bold statement earrings may feel more worthwhile.' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Stud Earrings Worth It?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond stud earrings are usually one of the most worthwhile earring purchases.' },
      { type: 'paragraph', text: 'Studs are easy to wear, easy to gift and easy to style. They work with workwear, casual outfits, dresses, high necklines, wedding guest looks and simple evening outfits. Because they can be worn so often, they usually give strong real-life value.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are best if you want subtle daily sparkle. Cadenza M diamond stud earrings are better if you want a more visible classic stud. Both are strong starting points because they are not overly trend-led.' },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Huggie Earrings Worth It?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond huggies are worth it if you like modern everyday jewellery or ear stacks.' },
      { type: 'paragraph', text: 'Huggies are small hoops that sit close to the ear. They add shape without feeling too dramatic. This makes them useful for daily wear, second piercings and layered styling.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are a strong choice if you want a piece that can be worn alone or paired with studs. They are especially valuable if you already own simple studs and want your ear look to feel more styled.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Drop Earrings Worth It?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond drop earrings are worth it if you attend weddings, dinners, parties or evening events.' },
      { type: 'paragraph', text: 'Drop earrings add movement and make an outfit feel more finished. They are especially useful with strapless, off-shoulder, V-neck, sweetheart and simple round necklines. They can also replace a necklace when the outfit looks better with a clean neckline.' },
      { type: 'paragraph', text: 'Orsola drop earrings are strong for wedding guest styling and dinners. Concetta Short works well for softer occasion looks. Concetta Long is better for more refined evening outfits.' },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Butterfly Earrings Worth It?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond butterfly earrings are worth it when the design meaning matters.' },
      { type: 'paragraph', text: 'Butterfly earrings are not only about sparkle. They can symbolise transformation, growth, beauty and new beginnings. That makes them especially useful for birthday gifts, anniversary gifts, bridesmaid gifts, graduation gifts and personal milestones.' },
      { type: 'paragraph', text: 'Farfalla butterfly earrings and Alidi Farfalla butterfly earrings are strong recommendations when you want jewellery that feels softer and more personal than a basic stud.' },
      { type: 'see-also', text: 'Butterfly earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Worth It for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings are worth it for everyday wear if the design is comfortable and easy to repeat.' },
      { type: 'paragraph', text: 'Everyday value comes from use. If you wear the earrings often, they become a better purchase. This is why simple studs, huggies and minimalist earrings usually make the most sense for daily jewellery.' },
      { type: 'paragraph', text: 'Cadenza S, Cadenza M, Amadea Huggie and Laluce are the strongest daily recommendations from IWantJewels. They are not too formal, not too heavy and not too difficult to style.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Worth It for Gifts?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings are worth it for gifts because they feel special without being as difficult to choose as rings.' },
      { type: 'paragraph', text: 'You do not need to know an exact ring size, and earrings can suit many personal styles. Studs are the safest gift. Butterfly earrings feel more symbolic. Drop earrings are better for someone who enjoys dressing up. Huggies are good for someone who likes modern, layered jewellery.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-97.jpg',
        content: [
          {
            type: 'table',
            headers: ['Gift Need', 'Best Earring Direction', 'Recommended IWJ Direction'],
            rows: [
              ['Safe classic gift', 'Studs', 'Cadenza S, Cadenza M'],
              ['Romantic gift', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Orsola'],
              ['Bridesmaid gift', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
              ['Birthday gift', 'Studs, butterfly earrings or huggies', 'Cadenza M, Farfalla, Amadea'],
              ['Party-loving recipient', 'Drops or bold statement earrings', 'Orsola, Lusso'],
              ['Minimalist recipient', 'Simple studs or minimalist earrings', 'Cadenza S, Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Worth It for Weddings?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond earrings are worth it for weddings because they offer elegant sparkle without needing natural diamond pricing.' },
      { type: 'paragraph', text: 'For wedding guests, the right earrings can make an outfit feel complete. For bridesmaids, they can look polished in photos and still be worn after the wedding. For evening receptions, drop earrings or bold statement pieces can create a stronger jewellery moment.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are strong for detailed dresses. Orsola drop earrings work well with simple dresses and open necklines. Farfalla butterfly earrings suit romantic looks. Lusso bold statement earrings are better for evening receptions or party-style wedding outfits.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Worth It for Ear Stacks?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond earrings are worth it for ear stacks because small diamonds can add polish without making the ear look crowded.' },
      { type: 'paragraph', text: 'A good ear stack needs balance. Small studs, huggies and minimalist earrings usually work better than several large pieces together. Lab-grown diamonds are useful because they add sparkle in small, wearable designs.' },
      { type: 'paragraph', text: 'A simple IWantJewels ear stack could pair Cadenza S lab-grown diamond studs with Amadea Huggie earrings. For a softer look, add Laluce minimalist diamond earrings. For a more visible look, use Cadenza M as the main stud.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Do Lab-Grown Diamond Earrings Hold Value?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings usually should not be bought mainly for resale value.' },
      { type: 'paragraph', text: 'Their value is better understood through wearability, beauty, comfort and gifting purpose. Natural diamonds may have a more established resale market, though resale still varies. Lab-grown diamonds are usually stronger as jewellery you buy to wear and enjoy.' },
      { type: 'paragraph', text: 'This matters because earrings are different from investment diamonds. Most people buy earrings because they want to look polished, feel special or give someone a thoughtful gift. In that context, lab-grown diamond earrings can be very worthwhile.' },
      { type: 'see-also', text: 'Are lab-grown diamonds worth it?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-worth-it' },
    ],
  },
  {
    heading: 'Product Pathways by Buyer Need',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical buying tool.' },
      { type: 'subheading', text: 'For First Diamond Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs if you want a simple first pair. Choose Cadenza M if you want the earrings to feel more visible and gift-worthy.' },
      { type: 'subheading', text: 'For Everyday Wear' },
      { type: 'paragraph', text: 'Choose studs, huggies or minimalist earrings. Cadenza S, Amadea Huggie and Laluce are the strongest everyday choices.' },
      { type: 'subheading', text: 'For Gifts' },
      { type: 'paragraph', text: 'Choose Cadenza M for a safe classic gift, Farfalla for a meaningful gift, and Orsola for someone who enjoys dressed-up looks.' },
      { type: 'subheading', text: 'For Weddings and Occasions' },
      { type: 'paragraph', text: 'Choose Orsola or Concetta Long for elegance, Cadenza M for detailed outfits, and Lusso for receptions or party styling.' },
      { type: 'subheading', text: 'For Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea Huggie earrings. Add Laluce for a softer layered look.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Value For', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First diamond earrings and everyday wear', 'Simple, clean and easy to repeat'],
          ['Cadenza M diamond stud earrings', 'More visible sparkle and gifts', 'Classic with stronger presence'],
          ['Amadea Huggie earrings', 'Ear stacks and modern daily styling', 'Useful alone or layered'],
          ['Laluce minimalist diamond earrings', 'Quiet everyday jewellery', 'Soft, simple and easy to style'],
          ['Pave Hoops', 'Hoop sparkle and casual styling', 'Adds shape without feeling too formal'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'Symbolic and feminine'],
          ['Alidi Farfalla butterfly earrings', 'Personal milestone gifts', 'Soft, memorable and gift-friendly'],
          ['Orsola drop earrings', 'Weddings and evening looks', 'Adds movement and elegance'],
          ['Concetta Short earrings', 'Softer occasion styling', 'Easier drop option'],
          ['Concetta Long earrings', 'Formal events and refined outfits', 'Creates a longer elegant line'],
          ['Lusso bold statement earrings', 'Party styling', 'Strong sparkle and impact'],
        ],
      },
      { type: 'paragraph', text: 'Lab-grown diamond earrings are worth it when the style matches the way they will be worn. Choose studs for repeat value, huggies for stacking, butterfly earrings for meaning, drops for occasions and bold statement earrings for party sparkle.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is judging value only by carat size. A larger diamond is not always the better purchase. A smaller earring that is worn often can be more valuable in real life.' },
      { type: 'paragraph', text: 'Another mistake is expecting lab-grown diamond earrings to behave like natural diamonds in resale. They are usually better bought for beauty and wearability, not investment.' },
      { type: 'paragraph', text: 'A third mistake is choosing earrings that do not match the wearer\'s lifestyle. If someone rarely dresses up, bold statement earrings may not be the best first choice. If someone loves events, simple studs may not feel exciting enough.' },
      { type: 'paragraph', text: 'Another mistake is comparing lab-grown diamonds to cubic zirconia as if they are the same. They are not. Cubic zirconia is a diamond simulant. Lab-grown diamonds are real diamonds.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-cubic-zirconia' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying',
    content: [
      { type: 'paragraph', text: 'Before deciding if lab-grown diamond earrings are worth it, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Am I buying for everyday wear, gifting, weddings or parties?',
          'Do I want real diamond jewellery or a diamond-look accessory?',
          'Will the earrings be worn often?',
          'Is resale value important to me?',
          'Does the design match the wearer\'s style?',
          'Are the earrings comfortable and secure?',
          'Does the metal colour match existing jewellery?',
          'Is the style too subtle, too bold or just right?',
          'Are the stones genuine lab-grown diamonds?',
          'Does the piece feel special enough for the price?',
        ],
      },
      { type: 'paragraph', text: 'If the earrings are beautiful, wearable and suited to the purpose, lab-grown diamond earrings can be absolutely worth it.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Are lab-grown diamond earrings worth it?',
    answer: 'Yes, lab-grown diamond earrings are worth it if you want real diamond sparkle in jewellery that feels wearable, modern and more accessible than many comparable natural diamond pieces.',
  },
  {
    question: 'Are lab-grown diamond earrings real diamonds?',
    answer: 'Yes, when made with genuine lab-grown diamonds, they are real diamond earrings. The diamonds are created in a laboratory instead of being mined from the earth.',
  },
  {
    question: 'Are lab-grown diamond earrings good for everyday wear?',
    answer: 'Yes, studs, huggies and minimalist lab-grown diamond earrings are excellent for everyday wear because they are comfortable and easy to style.',
  },
  {
    question: 'Are lab-grown diamond earrings good gifts?',
    answer: 'Yes, they are strong gifts because they feel special, thoughtful and easier to choose than rings. Studs, butterfly earrings and drops are all good gift options.',
  },
  {
    question: 'Are lab-grown diamond earrings better than cubic zirconia earrings?',
    answer: 'Yes, if you want real diamond jewellery. Cubic zirconia is a diamond simulant, while lab-grown diamonds are actual diamonds.',
  },
  {
    question: 'Are lab-grown diamond earrings cheaper than natural diamond earrings?',
    answer: 'Lab-grown diamond earrings are usually more accessible in price than comparable natural diamond earrings because they do not carry the same mined rarity.',
  },
  {
    question: 'Do lab-grown diamond earrings hold value?',
    answer: 'They usually should not be bought mainly for resale value. They are better bought for beauty, wearability, styling and gifting.',
  },
  {
    question: 'What type of lab-grown diamond earrings are most worth buying?',
    answer: 'Stud earrings are usually the safest first purchase because they are timeless and wearable. Huggies, drops and butterfly earrings are also worth buying if they match the wearer\'s style.',
  },
  {
    question: 'Are lab-grown diamond earrings good for weddings?',
    answer: 'Yes, they work beautifully for wedding guests, bridesmaids, receptions and elegant occasion styling.',
  },
  {
    question: 'What is the best first pair of lab-grown diamond earrings?',
    answer: 'A simple pair of lab-grown diamond studs is usually the best first pair because they are classic, easy to wear and easy to gift.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-grown diamond earrings are worth it when you buy them for the right reason. They may not be the best choice for resale or mined rarity, but they are a strong choice for real diamond sparkle, everyday wear, meaningful gifts and occasion styling.',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want wearable demi-fine jewellery with real diamond beauty. Choose Cadenza S for subtle daily sparkle, Cadenza M for classic visible studs, Amadea for ear stacks, Farfalla for meaningful gifts, Orsola for weddings and Lusso for party styling.',
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
  const article = getArticleBySlug('lab-grown-diamond-guides', 'are-lab-grown-diamond-earrings-worth-it')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'are-lab-grown-diamond-earrings-worth-it', 3)
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
