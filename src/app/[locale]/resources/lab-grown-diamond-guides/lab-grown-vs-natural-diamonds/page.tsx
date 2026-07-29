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
  title: 'Lab Grown vs Natural Diamonds: Simple Guide | I Want Jewels',
  description:
    'Compare lab grown and natural diamonds in simple language. Learn the difference in origin, price, sparkle, value and jewellery use before buying.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-10.jpg',
  title: 'Lab-Grown vs Natural Diamonds',
  subtitle: 'What Is the Difference?',
  paragraphs: [
    'The main difference between lab-grown and natural diamonds is their origin. Natural diamonds are formed underground over a very long period of time, while lab-grown diamonds are created above ground in a controlled laboratory environment. Both can be real diamonds, both can sparkle beautifully, and both can be used in fine and demi-fine jewellery.',
    'For most jewellery buyers, the decision comes down to what matters more: traditional mined origin or modern wearability and accessibility. Natural diamonds are often chosen for their rarity and traditional value, while lab-grown diamonds are popular because they offer real diamond beauty in a way that can feel more approachable for everyday jewellery, earrings, gifts and occasion styling.',
    'If you are choosing earrings, lab-grown diamonds can be a very smart option. Earrings are usually bought for sparkle, design and wearability, not investment value. That makes lab-grown diamond studs, huggies, drops and butterfly earrings especially practical for modern jewellery wardrobes.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds and natural diamonds can both be real diamonds.',
    'The biggest difference is origin: lab-grown diamonds are created in a lab, natural diamonds are mined from the earth.',
    'A well-cut lab-grown diamond can look just as bright and beautiful to the eye as a natural diamond.',
    'Natural diamonds are usually more expensive because of rarity, mining, supply and traditional market value.',
    'Lab-grown diamonds are often more accessible in price, making them useful for earrings, gifts and everyday jewellery.',
    'For engagement rings or heirloom purchases, some buyers may still prefer natural diamonds.',
    'For everyday earrings, wedding guest jewellery, party looks and demi-fine pieces, lab-grown diamonds are often the more practical choice.',
  ],
  image: '/blog-images/blog-image-6.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Is the Main Difference Between Lab-Grown and Natural Diamonds?',
    content: [
      { type: 'paragraph', text: 'The main difference between lab-grown and natural diamonds is where they come from. Natural diamonds are formed deep underground through natural geological processes. Lab-grown diamonds are created in a controlled laboratory environment using advanced technology that grows diamond material above ground.' },
      { type: 'paragraph', text: 'That difference in origin is important, but it does not mean lab-grown diamonds are fake. A lab-grown diamond is not cubic zirconia, glass or crystal. It is not just a diamond-look stone. It is created differently, but it can still be a real diamond.' },
      { type: 'paragraph', text: 'For jewellery shoppers, this matters because the final buying decision is not only about science. It is also about lifestyle, budget, meaning, design and how often you will actually wear the jewellery. If you are buying a once-in-a-lifetime heirloom piece, natural diamonds may feel more traditional. If you want diamond earrings you can wear often, gift easily and style with different outfits, lab-grown diamonds can make more sense.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Natural Diamonds: Simple Comparison',
    content: [
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamonds', 'Natural Diamonds'],
        rows: [
          ['Origin', 'Created in a controlled laboratory environment', 'Formed naturally underground'],
          ['Are they real diamonds?', 'Yes, when they are genuine lab-grown diamonds', 'Yes'],
          ['Look', 'Can look identical to natural diamonds to the eye', 'Classic mined diamond appearance'],
          ['Sparkle', 'Depends on cut quality', 'Depends on cut quality'],
          ['Price', 'Usually more accessible', 'Usually more expensive'],
          ['Rarity', 'Not rare in the same way as mined diamonds', 'Valued for natural rarity'],
          ['Best for', 'Everyday jewellery, earrings, gifts, modern demi-fine jewellery', 'Traditional fine jewellery, heirloom pieces, mined-origin buyers'],
          ['Buyer appeal', 'Modern, wearable, accessible', 'Traditional, rare, established'],
        ],
      },
      { type: 'paragraph', text: 'This table gives a simple overview, but the real decision depends on what you are buying. The right diamond for an engagement ring may not be the same as the right diamond for everyday earrings. For earrings, many people care most about sparkle, comfort, design and price. That is where lab-grown diamonds become very attractive.' },
    ],
  },
  {
    heading: 'Do Lab-Grown and Natural Diamonds Look the Same?',
    content: [
      { type: 'paragraph', text: 'To most people, yes, a well-cut lab-grown diamond and a well-cut natural diamond can look the same when worn in jewellery. The visible beauty of a diamond depends heavily on its cut, setting and design. If the diamond is poorly cut, it may not sparkle well, whether it is lab-grown or natural. If it is well cut and set beautifully, it can look bright, clear and elegant.' },
      { type: 'paragraph', text: 'This is especially true with earrings. When someone sees diamond earrings being worn, they usually notice how they catch the light, how they frame the face and how they match the outfit. They are not usually asking whether the diamond was grown underground or above ground.' },
      { type: 'paragraph', text: 'For that reason, lab-grown diamond earrings are a strong choice for people who want visible sparkle without paying mainly for mined origin.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real' },
    ],
  },
  {
    heading: 'Which Sparkles More: Lab-Grown or Natural Diamonds?',
    content: [
      { type: 'paragraph', text: 'Neither lab-grown nor natural diamonds automatically sparkle more. Sparkle depends mainly on the cut. A well-cut lab-grown diamond can sparkle beautifully. A poorly cut natural diamond may look dull. In the same way, a well-cut natural diamond can look stunning, while a badly cut lab-grown diamond may not show its best potential.' },
      { type: 'paragraph', text: 'So, instead of asking which origin sparkles more, it is better to ask whether the diamond has been cut and set well. For jewellery buyers, the setting also matters. A small stud earring needs clean sparkle and balance. A drop earring needs movement and light reflection. A huggie needs diamonds that add shine without making the earring uncomfortable. Good design makes the diamond feel more beautiful.' },
      { type: 'see-also', text: 'Shop diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Why Are Natural Diamonds Usually More Expensive?',
    content: [
      { type: 'paragraph', text: 'Natural diamonds are usually more expensive because of their mined origin, rarity, supply chain, tradition and market positioning. They take a very long time to form naturally and require mining, sorting, cutting, grading and distribution. Their price is also connected to the long history of natural diamonds being used for engagement rings, fine jewellery and heirloom pieces.' },
      { type: 'paragraph', text: 'That does not automatically mean a natural diamond will look better. It means the price reflects more than just appearance. It also reflects origin, rarity and traditional value. This is why lab-grown diamonds are attractive for everyday jewellery. If you are buying earrings mainly for beauty and wearability, you may not want to pay a large premium only for mined origin.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-price-guide' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Cheaper Because They Are Fake?',
    content: [
      { type: 'paragraph', text: 'No. Lab-grown diamonds are not cheaper because they are fake. They are usually more accessible because they are created differently and do not have the same natural rarity as mined diamonds. That is very different from being fake or low quality.' },
      { type: 'paragraph', text: 'A fake diamond is usually a diamond-look stone such as cubic zirconia, glass or crystal. These may look shiny, but they are not diamonds. Lab-grown diamonds are a different category. They are created in a laboratory, but they can still be real diamonds.' },
      { type: 'paragraph', text: 'The better way to understand pricing is this: natural diamonds carry the value of mined rarity, while lab-grown diamonds offer diamond beauty with a more modern production route.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Natural Diamonds for Earrings',
    content: [
      { type: 'paragraph', text: 'For earrings, lab-grown diamonds are often the more practical choice. Earrings are usually chosen for how they look when worn. They sit close to the face, catch light naturally and complete an outfit. Most people are not buying earrings as an investment. They are buying them because they want sparkle, polish and beauty.' },
      {
        type: 'table',
        headers: ['Earring Need', 'Better Choice for Most Buyers', 'Why'],
        rows: [
          ['Everyday studs', 'Lab-grown diamonds', 'More accessible and easy to wear often'],
          ['Wedding guest earrings', 'Lab-grown diamonds', 'Elegant sparkle without feeling too formal'],
          ['Gift earrings', 'Lab-grown diamonds', 'Feels special and thoughtful'],
          ['Heirloom fine jewellery', 'Natural diamonds may appeal more', 'Traditional mined-origin value'],
          ['Party earrings', 'Lab-grown diamonds', 'Lets you choose stronger sparkle and design'],
          ['Ear stacks', 'Lab-grown diamonds', 'Practical for small studs and huggies'],
        ],
      },
      { type: 'paragraph', text: 'At IWantJewels, lab-grown diamond earrings are designed for this exact reason. They give you the beauty of diamond jewellery in styles that feel wearable for real life.' },
      { type: 'see-also', text: 'Explore lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Natural Diamonds for Gifts',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are a strong choice for gifts because they feel special without being too intimidating. Natural diamond gifts can feel very formal, expensive or symbolic. That can be beautiful in the right context, but not every jewellery gift needs that level of pressure.' },
      { type: 'paragraph', text: 'Earrings are especially good for gifting because you do not need to know a ring size. Studs are safe and classic. Huggies feel modern. Butterfly earrings feel symbolic and personal. Drop earrings feel more dressed up for someone who loves occasions.' },
      {
        type: 'table',
        headers: ['Gift Type', 'Recommended Product', 'Why It Works'],
        rows: [
          ['Simple everyday gift', 'Cadenza S lab-grown diamond studs', 'Clean, classic and easy to wear daily'],
          ['Slightly stronger stud gift', 'Cadenza M diamond stud earrings', 'More presence while staying timeless'],
          ['Symbolic or meaningful gift', 'Farfalla butterfly earrings', 'Butterfly adds softness and meaning'],
          ['Elegant occasion gift', 'Orsola drop earrings', 'Adds movement and polish for special outfits'],
        ],
      },
      { type: 'see-also', text: 'Explore jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Natural Diamonds for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'For everyday jewellery, lab-grown diamonds are often easier to justify. A natural diamond piece can feel too precious for daily use, especially if it was expensive or bought for a major milestone. Lab-grown diamond jewellery can feel more relaxed while still looking beautiful. That makes it easier to wear more often.' },
      { type: 'paragraph', text: 'For everyday earrings, comfort matters as much as sparkle. The best daily pieces are light, secure, easy to pair with outfits and not too dramatic. Studs, huggies and minimalist earrings usually work best. Cadenza S lab-grown diamond studs are a good everyday starting point because they are simple and clean. Laluce minimalist diamond earrings work well for someone who prefers quiet styling. Amadea Huggie earrings are useful for a modern ear stack or second piercing look.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Better Than Natural Diamonds?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are better than natural diamonds for some shoppers, but not for everyone.' },
      { type: 'paragraph', text: 'They are often better if you want: real diamond sparkle at a more accessible price, jewellery you can wear more often, earrings, huggies or drops that do not feel too formal, a modern alternative to mined diamonds, gift jewellery that feels special but not intimidating, or more design flexibility for your budget.' },
      { type: 'paragraph', text: 'Natural diamonds may be better if you want: mined origin, traditional rarity, a higher emotional connection to natural formation, an heirloom-style investment piece, or a very traditional fine jewellery purchase.' },
      { type: 'paragraph', text: 'For IWantJewels customers, the lab-grown option makes sense because the jewellery is designed to be worn, styled and gifted regularly.' },
    ],
  },
  {
    heading: 'Do Lab-Grown Diamonds Hold Value Like Natural Diamonds?',
    content: [
      { type: 'paragraph', text: 'Lab-grown and natural diamonds do not behave the same in resale value. Natural diamonds have a longer traditional resale market, though resale prices can still vary widely. Lab-grown diamonds usually have weaker resale value because they are not rare in the same way and can be produced more consistently.' },
      { type: 'paragraph', text: 'For earrings and demi-fine jewellery, resale value is usually not the main reason to buy. Most people buy earrings because they want to wear them, gift them or style them with outfits. So, if you are buying jewellery mainly as an investment, natural diamonds may be more relevant. If you are buying jewellery for beauty, wearability and everyday enjoyment, lab-grown diamonds can make more sense.' },
      { type: 'see-also', text: 'Are lab-grown diamonds worth it?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-worth-it' },
    ],
  },
  {
    heading: 'Lab-Grown vs Natural Diamonds in Demi-Fine Jewellery',
    content: [
      { type: 'paragraph', text: 'Demi-fine jewellery is one of the strongest spaces for lab-grown diamonds. Demi-fine jewellery sits between costume jewellery and traditional fine jewellery. It gives shoppers a more premium feel than fashion jewellery, but it is usually more accessible than solid gold and platinum fine jewellery.' },
      { type: 'paragraph', text: 'At IWantJewels, lab-grown diamonds are paired with 925 sterling silver and 14kt gold plating. This creates jewellery that feels elevated but still wearable. It is especially useful for earrings because you can build a small collection of studs, huggies, drops and statement pieces without treating each pair like a rare investment.' },
      {
        type: 'table',
        headers: ['Jewellery Type', 'Natural Diamonds', 'Lab-Grown Diamonds'],
        rows: [
          ['Traditional fine jewellery', 'Very common', 'Also used'],
          ['Demi-fine jewellery', 'Less common at accessible prices', 'Very strong fit'],
          ['Everyday earrings', 'Can be expensive', 'Practical and wearable'],
          ['Gift jewellery', 'Beautiful but often pricier', 'Thoughtful and accessible'],
          ['Trend-led designs', 'Less flexible due to cost', 'Easier to experiment with'],
        ],
      },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '/resources/demi-fine-jewellery-guides' },
    ],
  },
  {
    heading: 'Which Should You Choose?',
    content: [
      { type: 'paragraph', text: 'Choose natural diamonds if mined origin, traditional rarity and long-term heirloom value matter most to you. Choose lab-grown diamonds if you want real diamond beauty in jewellery that feels easier to wear, easier to gift and easier to style regularly.' },
      { type: 'paragraph', text: 'For many IWantJewels shoppers, lab-grown diamonds are the better match because the pieces are designed for everyday sparkle, occasions, gifting and modern styling. They let you enjoy diamond jewellery without feeling like it has to be locked away for only the most formal moments.' },
      { type: 'paragraph', text: 'If you are unsure where to start, start with earrings. A pair of lab-grown diamond studs or huggies is simple, wearable and easy to style. If you want something more expressive, choose drop earrings or butterfly earrings.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you are choosing lab-grown diamonds because you want jewellery you will actually wear, these are good starting points.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First diamond earrings', 'Simple, clean and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'More visible everyday sparkle', 'Classic but slightly stronger on the ear'],
          ['Amadea Huggie earrings', 'Ear stacks and modern styling', 'Works well with studs and second piercings'],
          ['Laluce minimalist diamond earrings', 'Quiet everyday jewellery', 'Easy to pair with simple outfits'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'The butterfly shape adds symbolism'],
          ['Orsola drop earrings', 'Wedding guest and evening looks', 'Adds movement and elegance'],
          ['Lusso bold statement earrings', 'Party styling', 'Creates a stronger jewellery moment'],
        ],
      },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'bullet-list', items: [
        'Thinking lab-grown diamonds are fake because they are not mined — they are not fake, their origin is different but they can still be real diamonds.',
        'Assuming natural diamonds always look better — a diamond\'s beauty depends on cut, design and setting.',
        'Choosing based only on price — always look at the full jewellery piece: metal, comfort, finish and design all matter.',
        'Buying earrings only for one outfit — the best pair should work across multiple occasions.',
      ]},
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying',
    content: [
      { type: 'paragraph', text: 'Before choosing between lab-grown and natural diamonds, ask yourself:' },
      { type: 'bullet-list', items: [
        'Do I care more about mined origin or wearable design?',
        'Am I buying for tradition, investment, daily wear or gifting?',
        'Do I want earrings, a ring, a necklace or a bracelet?',
        'Will I wear this piece often?',
        'Does the jewellery feel comfortable and easy to style?',
        'Is the stone actually a diamond, or only a diamond-look simulant?',
        'Does the metal suit my skin tone and wardrobe?',
        'Does the piece feel special without being too formal?',
      ]},
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What is the main difference between lab-grown and natural diamonds?', answer: 'The main difference is origin. Lab-grown diamonds are created in a controlled laboratory environment, while natural diamonds are formed underground. Both can be real diamonds.' },
  { question: 'Are lab-grown diamonds real diamonds?', answer: 'Yes, lab-grown diamonds are real diamonds. They are not cubic zirconia, glass or crystal. They are diamonds with a laboratory origin.' },
  { question: 'Can you tell the difference between lab-grown and natural diamonds?', answer: 'Most people cannot tell the difference by looking at jewellery. Specialists may use advanced equipment, but visually, a well-cut lab-grown diamond can look like a natural diamond.' },
  { question: 'Do lab-grown diamonds sparkle like natural diamonds?', answer: 'Yes, lab-grown diamonds can sparkle beautifully. Sparkle depends mainly on cut quality, setting and design, not origin alone.' },
  { question: 'Are natural diamonds better than lab-grown diamonds?', answer: 'Natural diamonds are better for buyers who value mined origin, rarity and traditional heirloom appeal. Lab-grown diamonds are better for buyers who want real diamond beauty in a more accessible and wearable way.' },
  { question: 'Are lab-grown diamonds better for earrings?', answer: 'For many buyers, yes. Earrings are usually bought for sparkle, style and wearability, so lab-grown diamonds are a practical choice for studs, huggies, drops and gift earrings.' },
  { question: 'Are lab-grown diamonds cheaper than natural diamonds?', answer: 'Lab-grown diamonds are usually more accessible in price than comparable natural diamonds. This makes them popular for everyday diamond jewellery and gift pieces.' },
  { question: 'Do lab-grown diamonds hold value?', answer: 'Lab-grown diamonds usually do not hold resale value in the same way as natural diamonds. They are often better bought for wearability, beauty and styling rather than investment.' },
  { question: 'Are lab-grown diamonds good for gifts?', answer: 'Yes, lab-grown diamond jewellery can make a thoughtful gift. Earrings are especially easy to gift because they do not require ring sizing and can suit many personal styles.' },
  { question: 'Should I buy lab-grown or natural diamonds?', answer: 'Choose natural diamonds if mined origin and rarity matter most. Choose lab-grown diamonds if you want real diamond beauty in jewellery that feels modern, wearable and more accessible.' },
]

const cta: V2CTABlock = {
  heading: 'Ready to Choose Lab-Grown Diamond Jewellery?',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want diamond jewellery that feels modern, wearable and made for real occasions. Choose studs for everyday polish, huggies for ear stacks, butterfly earrings for gifts or drop earrings for wedding guest and evening outfits.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide',
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-vs-natural-diamonds')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-vs-natural-diamonds', 3)
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
