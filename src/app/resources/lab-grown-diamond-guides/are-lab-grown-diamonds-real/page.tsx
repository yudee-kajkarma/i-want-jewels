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
  title: 'Are Lab Grown Diamonds Real? Simple Answer | I Want Jewels',
  description:
    'Yes, lab grown diamonds are real diamonds. Learn how they compare to natural diamonds, fake diamonds, cubic zirconia and moissanite before buying.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-64.jpg',
  title: 'Are Lab-Grown Diamonds Real Diamonds?',
  subtitle: 'Simple Answer Before You Buy',
  paragraphs: [
    'Yes, lab-grown diamonds are real diamonds. They are not fake diamonds, glass, crystal or cubic zirconia. A lab-grown diamond is created in a controlled laboratory environment, but it has the same basic diamond structure as a natural diamond. The main difference is origin: natural diamonds are formed underground, while lab-grown diamonds are grown above ground using advanced technology.',
    'For jewellery buyers, this means lab-grown diamonds can give you the look, sparkle and durability of diamond jewellery in a more modern and often more accessible way. They are especially popular for earrings, studs, huggies, drop earrings and gift jewellery because they let you enjoy diamond sparkle without feeling like the piece has to be saved only for rare formal occasions.',
    'If you are new to diamond jewellery, lab-grown diamond earrings are one of the easiest ways to start. They are simple to wear, easy to gift and can work beautifully for everyday outfits, wedding guest looks, birthdays, anniversaries and parties.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds are real diamonds, not fake stones.',
    'They are created in a laboratory instead of being mined from the earth.',
    'They are different from cubic zirconia, glass, crystal and other diamond-look stones.',
    'To the eye, a well-cut lab-grown diamond can look like a natural diamond.',
    'The biggest difference between lab-grown and natural diamonds is origin, not whether one is "real" and the other is not.',
    'Lab-grown diamonds are a strong choice for everyday jewellery, especially earrings.',
    'If you want your first diamond piece, studs or huggies are usually the easiest place to start.',
  ],
  image: '/blog-images/blog-image-20.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Does "Real Diamond" Actually Mean?',
    content: [
      { type: 'paragraph', text: 'When people ask, "Are lab-grown diamonds real?" they are usually asking one of three things. They may be asking if lab-grown diamonds are fake. They may be asking if they sparkle like natural diamonds. Or they may be asking if they are worth buying compared to mined diamonds.' },
      { type: 'paragraph', text: 'The simple answer is this: lab-grown diamonds are real diamonds, but they are not mined diamonds. They have a laboratory origin instead of a natural underground origin.' },
      { type: 'paragraph', text: 'That difference matters, but it does not make them fake. A fake diamond is usually something that only looks like a diamond but is made from a different material. Cubic zirconia, glass and crystal are examples of diamond-look stones. They can be pretty, but they are not diamonds.' },
      { type: 'paragraph', text: 'A lab-grown diamond is different. It is grown using technology that creates diamond material. That is why lab-grown diamonds are used in real jewellery, including earrings, rings, necklaces and bracelets.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Why Do People Think Lab-Grown Diamonds Are Fake?',
    content: [
      { type: 'paragraph', text: 'The confusion usually comes from the word "lab." Many shoppers hear "lab-grown" and imagine something artificial or plastic-looking. But in jewellery, "lab-grown" simply describes where the diamond was created. It does not mean the stone is glass, costume jewellery or imitation.' },
      { type: 'paragraph', text: 'The better way to think about it is: lab-grown diamonds are real diamonds with a laboratory origin. Natural diamonds are real diamonds with an underground origin.' },
      { type: 'paragraph', text: 'Both can be beautiful. Both can sparkle. Both can be used in real jewellery. The right choice depends on what matters most to the buyer: origin, price, tradition, design, size, sustainability concerns, or everyday wearability.' },
      { type: 'paragraph', text: 'For many modern jewellery shoppers, lab-grown diamonds feel like a practical choice because they make diamond jewellery easier to wear often. Instead of buying a diamond piece and keeping it for only special events, you can choose diamond studs, huggies or drops that feel suitable for real outfits and real occasions.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds vs Natural Diamonds vs Fake Diamonds',
    content: [
      { type: 'section-lead', text: 'This table explains the difference clearly.' },
      {
        type: 'table',
        headers: ['Type', 'Is It a Real Diamond?', 'Origin', 'Best For'],
        rows: [
          ['Lab-grown diamond', 'Yes', 'Created in a controlled laboratory environment', 'Real diamond jewellery with modern, accessible appeal'],
          ['Natural diamond', 'Yes', 'Formed underground over time', 'Traditional fine jewellery and mined-origin buyers'],
          ['Cubic zirconia', 'No', 'Man-made diamond simulant', 'Low-cost fashion jewellery'],
          ['Glass or crystal', 'No', 'Decorative material', 'Costume jewellery or temporary sparkle'],
          ['Moissanite', 'No, it is a different gemstone', 'Usually lab-created today', 'Buyers who like strong rainbow-like sparkle'],
        ],
      },
      { type: 'paragraph', text: 'The mistake many people make is putting lab-grown diamonds in the same group as cubic zirconia or glass. That is not accurate. Cubic zirconia and glass are diamond simulants. Lab-grown diamonds are diamonds.' },
      { type: 'paragraph', text: 'If your goal is a low-cost fashion piece for occasional wear, a simulant may be enough. But if your goal is real diamond jewellery that feels more premium, lab-grown diamonds are a stronger choice.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '#' },
    ],
  },
  {
    heading: 'Can You Tell If a Diamond Is Lab-Grown by Looking at It?',
    content: [
      { type: 'paragraph', text: 'Most people cannot tell whether a diamond is lab-grown or natural just by looking at it. A well-cut lab-grown diamond can look bright, clear and beautiful in jewellery. When someone sees a pair of earrings being worn, they usually notice the sparkle, design and how the piece suits the person. They do not see the diamond\'s origin.' },
      { type: 'paragraph', text: 'Specialists may use advanced testing equipment to identify whether a diamond is lab-grown or mined. But for everyday jewellery wear, the visual difference is not usually obvious to the eye.' },
      { type: 'paragraph', text: 'This is especially true with earrings. Earrings are worn on the ear and seen as part of your overall style. The setting, shape, size, metal colour and design all play a big role in how beautiful they look. That is why lab-grown diamonds work so well in demi-fine earrings. You get the diamond look people love, but in pieces that feel easier to wear regularly.' },
    ],
  },
  {
    heading: 'Do Lab-Grown Diamonds Sparkle Like Natural Diamonds?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds can sparkle like natural diamonds when they are well cut. Sparkle is not only about whether a diamond is lab-grown or mined. It depends heavily on the cut and the way the diamond is set in the jewellery. A beautifully cut lab-grown diamond can look brighter and more attractive than a poorly cut natural diamond.' },
      { type: 'paragraph', text: 'For earrings, sparkle is especially important because the diamonds sit close to the face. Even a small pair of studs can make the face look brighter and more polished when the stones catch the light well.' },
      { type: 'paragraph', text: 'If you want subtle everyday sparkle, diamond stud earrings are usually the best starting point. If you want more movement and shine for an outfit, drop earrings can feel more dressed up. If you like a modern layered look, huggies can work beautifully in an ear stack.' },
      { type: 'see-also', text: 'Shop diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Considered Fine Jewellery?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds can be used in fine jewellery, demi-fine jewellery and everyday jewellery. The diamond itself is real, but the final jewellery category also depends on the metal, setting and overall construction.' },
      { type: 'paragraph', text: 'For example, a lab-grown diamond set in solid gold may be considered fine jewellery. A lab-grown diamond set in 925 sterling silver with gold plating may sit more comfortably in the demi-fine jewellery category.' },
      { type: 'paragraph', text: 'At IWantJewels, lab-grown diamonds are used in a more wearable demi-fine direction. The jewellery is designed with 925 sterling silver, 14kt gold plating and lab-grown diamonds, giving customers real diamond sparkle in pieces that feel easier to style and gift.' },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '/resources/demi-fine-jewellery-guides' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Cheap?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are usually more accessible in price than comparable natural diamonds, but that does not mean they are cheap in quality. The word "cheap" can be misleading. A low-quality jewellery piece can be cheap because it uses poor materials or weak construction. Lab-grown diamonds are different. Their lower price is usually connected to the way they are produced and supplied, not because they are fake.' },
      { type: 'paragraph', text: 'For a jewellery buyer, the more useful question is not "Are lab-grown diamonds cheap?" The better question is, "Does this piece give me the quality, design and wearability I want for the price?"' },
      { type: 'paragraph', text: 'A simple pair of lab-grown diamond studs can be a smart purchase if you will wear them often. A butterfly earring may be worth choosing if you want a gift that feels more personal. A drop earring may be the better choice if you need something for weddings, dinners or evening outfits.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-price-guide' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Good for Earrings?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are one of the best choices for earrings. Earrings are usually bought for visible sparkle, face-framing beauty and everyday styling. Lab-grown diamonds fit this perfectly because they allow you to choose real diamond pieces that can feel more wearable than traditional high-priced diamond jewellery.' },
      {
        type: 'table',
        headers: ['Earring Style', 'Best For', 'Recommended IWJ Direction'],
        rows: [
          ['Stud earrings', 'Everyday wear, office outfits, first diamond earrings', 'Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings'],
          ['Huggie earrings', 'Ear stacks, second piercings, casual styling', 'Amadea Huggie earrings'],
          ['Drop earrings', 'Wedding guests, dinners, evening outfits', 'Orsola drop earrings'],
          ['Minimalist earrings', 'Simple daily outfits', 'Laluce minimalist diamond earrings'],
          ['Butterfly earrings', 'Gifts, birthdays, symbolic jewellery', 'Farfalla butterfly earrings, Alidi Farfalla butterfly earrings'],
          ['Bold statement jewellery', 'Party looks and stronger sparkle', 'Lusso bold statement earrings'],
        ],
      },
      { type: 'paragraph', text: 'The right earring depends on the person\'s style. Studs are safe, classic and easy to wear. Huggies feel a little more modern. Drops feel more elegant. Butterfly earrings feel more personal and giftable. Bold statement pieces work best when the jewellery is meant to be noticed.' },
      { type: 'see-also', text: 'Explore lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are suitable for everyday wear. The diamond itself is durable, but the full jewellery piece still needs proper care. For everyday use, the best choices are usually studs, huggies and minimalist earrings. These styles are easy to wear repeatedly and do not feel too heavy or distracting.' },
      { type: 'paragraph', text: 'If you like quiet sparkle, Cadenza S lab-grown diamond studs or Laluce minimalist diamond earrings are strong starting points. If you want something slightly more noticeable but still wearable, Cadenza M diamond stud earrings can work well. If you are building an ear stack, Amadea Huggie earrings are a practical choice.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Good for Gifts?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond jewellery makes a thoughtful gift. It feels more special than simple fashion jewellery, but it does not have to feel as formal or intimidating as traditional fine diamond jewellery. That balance makes it useful for birthdays, anniversaries, bridesmaids, graduation gifts, romantic gifts and everyday luxury gifts.' },
      { type: 'paragraph', text: 'Earrings are especially easy to gift because the sizing is simpler than rings. You do not need to know an exact finger size, and styles like studs, huggies and drops can suit many wardrobes.' },
      { type: 'paragraph', text: 'If the person likes classic jewellery, choose diamond studs. If they like feminine or symbolic pieces, butterfly earrings are a lovely choice. If they enjoy dressing up, drop earrings can feel more special. If they prefer modern styling, huggies are easier to layer.' },
      { type: 'see-also', text: 'Explore jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Will Lab-Grown Diamonds Last Forever?',
    content: [
      { type: 'paragraph', text: 'The lab-grown diamond itself is highly durable and can last for a very long time. But the full jewellery piece also depends on the metal, setting, plating and care routine. This is important for demi-fine jewellery. If your earrings are made with 925 sterling silver and 14kt gold plating, the diamonds can stay beautiful, but the metal finish should still be treated with care.' },
      { type: 'paragraph', text: 'To keep lab-grown diamond jewellery looking good, store it separately, avoid harsh chemicals, clean it gently and do not throw it loose into a bag. Perfume, lotion and cleaning products should be kept away from the jewellery where possible.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/jewellery-care-guides' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds the Same as Cubic Zirconia?',
    content: [
      { type: 'paragraph', text: 'No, lab-grown diamonds and cubic zirconia are not the same. This is one of the most important differences for shoppers to understand. Cubic zirconia is a diamond simulant. It is made to imitate the appearance of a diamond, but it is not a diamond. A lab-grown diamond is a diamond created in a laboratory.' },
      { type: 'paragraph', text: 'Cubic zirconia can look shiny at first, but it does not offer the same long-term diamond quality. It can also scratch or dull more easily than diamond. Lab-grown diamonds are more suitable for jewellery that you want to feel special, premium and long-lasting.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Better Than Natural Diamonds?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are not automatically "better" than natural diamonds. They are better for some buyers and not for others. If someone values mined origin, traditional rarity or heirloom-style fine jewellery, they may prefer natural diamonds. If someone wants real diamond beauty in a more modern, accessible and wearable way, lab-grown diamonds can be the better choice.' },
      { type: 'paragraph', text: 'For IWantJewels customers, the appeal is usually wearability. Lab-grown diamond jewellery can feel easier to buy, easier to gift and easier to wear often. That makes it a strong match for earrings, everyday pieces and occasion jewellery.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds' },
    ],
  },
  {
    heading: 'What Should You Check Before Buying Lab-Grown Diamond Jewellery?',
    content: [
      { type: 'paragraph', text: 'Before buying lab-grown diamond jewellery, look beyond the word "diamond." The full piece matters. Check whether the jewellery uses real lab-grown diamonds, what metal it is made from, how comfortable the design looks, whether the closure feels secure, and whether the style matches the way the person will actually wear it.' },
      {
        type: 'table',
        headers: ['What to Check', 'Why It Matters'],
        rows: [
          ['Diamond type', 'Confirms it is lab-grown diamond, not a diamond-look stone'],
          ['Metal', 'Affects comfort, finish, price and wearability'],
          ['Style', 'Studs, huggies and drops suit different uses'],
          ['Comfort', 'Important for everyday earrings'],
          ['Occasion', 'Helps you choose between simple, romantic or bold designs'],
          ['Care instructions', 'Helps the jewellery stay beautiful for longer'],
        ],
      },
      { type: 'paragraph', text: 'For a first purchase, simple earrings are usually safest. Cadenza S lab-grown diamond studs are a good example of a quiet everyday piece, while Orsola drop earrings work better for someone who wants occasion sparkle.' },
    ],
  },
  {
    heading: 'Best IWantJewels Pieces If You Want Real Diamond Jewellery',
    content: [
      { type: 'paragraph', text: 'If your main question is whether lab-grown diamonds are real, the next step is choosing a piece that feels right for your lifestyle.' },
      {
        type: 'table',
        headers: ['If You Want', 'Recommended Product', 'Why It Works'],
        rows: [
          ['Simple everyday sparkle', 'Cadenza S lab-grown diamond studs', 'Small, clean and easy to wear daily'],
          ['A stronger stud look', 'Cadenza M diamond stud earrings', 'More visible sparkle while staying classic'],
          ['A modern ear stack', 'Amadea Huggie earrings', 'Great for layering with studs'],
          ['Minimal everyday jewellery', 'Laluce minimalist diamond earrings', 'Clean and easy to pair with most outfits'],
          ['A symbolic gift', 'Farfalla butterfly earrings', 'Butterfly design adds meaning and personality'],
          ['Wedding guest styling', 'Orsola drop earrings', 'Elegant movement for occasion outfits'],
          ['Party sparkle', 'Lusso bold statement earrings', 'Stronger sparkle for evening looks'],
        ],
      },
    ],
  },
  {
    heading: 'Common Myths About Lab-Grown Diamonds',
    content: [
      { type: 'subheading', text: 'Myth 1: Lab-grown diamonds are fake' },
      { type: 'paragraph', text: 'This is not true. Lab-grown diamonds are real diamonds with a laboratory origin.' },
      { type: 'subheading', text: 'Myth 2: Lab-grown diamonds do not sparkle' },
      { type: 'paragraph', text: 'A well-cut lab-grown diamond can sparkle beautifully. Sparkle depends more on cut quality and setting than origin alone.' },
      { type: 'subheading', text: 'Myth 3: Lab-grown diamonds are the same as cubic zirconia' },
      { type: 'paragraph', text: 'They are not the same. Cubic zirconia is a diamond simulant. Lab-grown diamonds are diamonds.' },
      { type: 'subheading', text: 'Myth 4: Lab-grown diamonds are only for engagement rings' },
      { type: 'paragraph', text: 'Lab-grown diamonds work beautifully in earrings, necklaces, bracelets, rings and everyday jewellery.' },
      { type: 'subheading', text: 'Myth 5: Lab-grown diamonds are not good gifts' },
      { type: 'paragraph', text: 'Lab-grown diamond jewellery can be a lovely gift because it feels special, modern and wearable.' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying',
    content: [
      { type: 'paragraph', text: 'Before choosing lab-grown diamond jewellery, ask yourself:' },
      {
        type: 'bullet-list',
        items: [
          'Do I want real diamond jewellery or only a diamond-look piece?',
          'Will I wear this daily or only for occasions?',
          'Do I prefer studs, huggies, drops or a bolder design?',
          'Does the metal colour suit my wardrobe or the person I am gifting?',
          'Is the piece comfortable enough to wear often?',
          'Does the jewellery feel special without being too formal?',
          'Is there a care guide I can follow to keep it looking good?',
        ],
      },
      { type: 'paragraph', text: 'If you want a safe first choice, start with lab-grown diamond studs. If you want something more expressive, choose drops, huggies or butterfly earrings.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  { question: 'Are lab-grown diamonds real diamonds?', answer: 'Yes, lab-grown diamonds are real diamonds. They are created in a laboratory instead of being mined from the earth, but they are not fake diamonds or imitation stones.' },
  { question: 'Are lab-grown diamonds fake?', answer: 'No, lab-grown diamonds are not fake. Fake diamonds are usually stones such as cubic zirconia, glass or crystal that only look like diamonds. Lab-grown diamonds are actual diamonds with a laboratory origin.' },
  { question: 'Can people tell if diamonds are lab-grown?', answer: 'Most people cannot tell by looking at a diamond in jewellery. A trained specialist may use advanced equipment to identify whether a diamond is lab-grown or natural, but the visual difference is not usually obvious in everyday wear.' },
  { question: 'Do lab-grown diamonds sparkle like natural diamonds?', answer: 'Yes, a well-cut lab-grown diamond can sparkle beautifully. Sparkle depends heavily on cut quality and jewellery design.' },
  { question: 'Are lab-grown diamonds the same as cubic zirconia?', answer: 'No, they are not the same. Cubic zirconia is a diamond simulant. A lab-grown diamond is a real diamond created in a controlled laboratory environment.' },
  { question: 'Are lab-grown diamonds good for earrings?', answer: 'Yes, lab-grown diamonds are excellent for earrings. They work well in studs, huggies, drops, hoops and symbolic designs such as butterfly earrings.' },
  { question: 'Are lab-grown diamonds good for everyday wear?', answer: 'Yes, lab-grown diamonds are suitable for everyday wear. The diamond itself is durable, but the full jewellery piece should still be cared for properly, especially if it has gold plating.' },
  { question: 'Are lab-grown diamonds cheaper than natural diamonds?', answer: 'Lab-grown diamonds are usually more accessible in price than comparable natural diamonds. This makes them popular for everyday diamond jewellery and gift pieces.' },
  { question: 'Are lab-grown diamonds good gifts?', answer: 'Yes, lab-grown diamond jewellery makes a thoughtful gift. Earrings are especially easy to gift because they do not require ring sizing and can suit many personal styles.' },
  { question: 'What is the best lab-grown diamond jewellery to buy first?', answer: 'Lab-grown diamond stud earrings are usually the safest first choice. They are simple, timeless, easy to wear and easy to style with other jewellery.' },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-Grown Diamonds Are Real — Start With the Right Pair',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in a demi-fine design. Choose simple studs for everyday wear, huggies for ear stacks, butterfly earrings for meaningful gifts or drop earrings for weddings, dinners and evening outfits.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Lab-Grown vs Natural Diamonds Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'are-lab-grown-diamonds-real')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'are-lab-grown-diamonds-real', 3)
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
