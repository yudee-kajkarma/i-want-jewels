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
  title: 'Lab Grown Diamond Stud Earrings Guide | I Want Jewels',
  description:
    'Learn how to choose lab grown diamond stud earrings for everyday wear, gifts, ear stacks, metal colour, size and styling.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide', locale),
  }
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-13.jpg',
  title: 'Lab-Grown Diamond Stud Earrings Guide',
  subtitle: 'How to Choose, Style and Gift the Perfect Pair',
  paragraphs: [
    'Lab-grown diamond stud earrings are one of the best first diamond jewellery pieces to buy because they are simple, timeless and easy to wear almost every day. They give real diamond sparkle without feeling too formal, and they work well with casual outfits, workwear, wedding guest looks, dinner outfits and gifts.',
    'The best lab-grown diamond studs depend on how visible you want the sparkle to be. Smaller studs are better for quiet everyday wear, second piercings and minimalist styling. Medium studs are better if you want the earrings to be noticed while still keeping the look classic. For IWantJewels, Cadenza S lab-grown diamond studs are the safest everyday choice, while Cadenza M diamond stud earrings are better for a slightly stronger stud look.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Stud Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamond studs are real diamond earrings when made with genuine lab-grown diamonds.',
    'They are one of the easiest diamond jewellery pieces to wear every day.',
    'Small studs are best for subtle sparkle, second piercings and minimalist looks.',
    'Medium studs are better if you want a more visible but still classic earring.',
    'Stud earrings are easier to gift than rings because they do not need exact sizing.',
    'They work well with huggies, hoops and minimalist earrings in an ear stack.',
    'Yellow gold feels warm and classic, white or silver tones feel clean and modern, and rose gold feels soft and romantic.',
    'Cadenza S is best for simple daily wear, while Cadenza M is better for more noticeable everyday sparkle.',
  ],
  image: '/blog-images/blog-image-17.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Are Lab-Grown Diamond Stud Earrings?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond stud earrings are earrings with lab-grown diamonds set close to the ear. Unlike drop earrings or hoops, studs do not hang down or move much. They sit neatly on the earlobe, which makes them one of the easiest jewellery styles to wear regularly.' },
      { type: 'paragraph', text: 'The diamond itself is created in a controlled laboratory environment instead of being mined from the earth. When the stones are genuine lab-grown diamonds, they are real diamonds, not cubic zirconia, glass or crystal.' },
      { type: 'paragraph', text: 'Stud earrings are popular because they are simple but still elegant. They do not need a special outfit to look good. You can wear them with a white shirt, a black dress, a blazer, a casual jumper, a wedding guest dress or a party outfit. That is why they are often the first diamond earrings people buy.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real' },
    ],
  },
  {
    heading: 'Why Choose Lab-Grown Diamond Stud Earrings?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond studs are a strong choice because they give you the beauty of diamond jewellery in a very wearable style. They are polished enough for occasions but simple enough for daily outfits.' },
      { type: 'paragraph', text: 'Many people like studs because they do not feel intimidating. A diamond necklace or bold earring can sometimes feel too dressed up, but studs are easy. You can put them on in the morning and they will usually work with whatever you wear.' },
      { type: 'paragraph', text: 'They are also practical for gifting. Rings need sizing, bracelets need fit, and necklaces depend on neckline and chain preference. Stud earrings are much easier to choose because the shape is classic and the sizing is more forgiving.' },
      { type: 'paragraph', text: 'For IWantJewels shoppers, lab-grown diamond studs are especially useful because they sit at the meeting point between everyday jewellery and meaningful gifting. They feel special, but they do not have to stay in a box waiting for a rare occasion.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Studs vs Natural Diamond Studs',
    content: [
      { type: 'paragraph', text: 'Lab-grown and natural diamond studs can both be beautiful. The main difference is origin.' },
      { type: 'paragraph', text: 'Natural diamonds are formed underground, while lab-grown diamonds are created above ground in a controlled laboratory environment. Both can be real diamonds, but lab-grown diamond studs are usually more accessible in price than comparable natural diamond studs.' },
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamond Studs', 'Natural Diamond Studs'],
        rows: [
          ['Origin', 'Created in a laboratory', 'Formed naturally underground'],
          ['Are they real diamonds?', 'Yes, when genuine lab-grown diamonds are used', 'Yes'],
          ['Look', 'Can look like natural diamond studs to the eye', 'Classic mined diamond appearance'],
          ['Price', 'Usually more accessible', 'Usually more expensive'],
          ['Best for', 'Everyday wear, gifts, ear stacks and modern jewellery', 'Traditional fine jewellery and mined-origin buyers'],
          ['Main appeal', 'Wearability and diamond beauty', 'Rarity and tradition'],
        ],
      },
      { type: 'paragraph', text: 'For stud earrings, lab-grown diamonds often make practical sense because most people buy studs to wear, not to resell. The value comes from how often you use them and how easily they fit into your jewellery routine.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Stud Earrings Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond studs are one of the best everyday earring choices.' },
      { type: 'paragraph', text: 'They are small enough to feel comfortable, classic enough to match many outfits and sparkly enough to make even a simple look feel more polished. Unlike larger earrings, studs do not usually get in the way of scarves, collars, hair or busy necklines.' },
      { type: 'paragraph', text: 'For everyday wear, look for studs that feel secure and not too heavy. A smaller stud can be perfect for daily use because it gives enough sparkle without looking too formal. A medium stud is better if you want your earrings to be more noticeable.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are a strong daily choice because they are clean, simple and easy to repeat. Cadenza M diamond stud earrings are better if you want more presence while keeping the look timeless.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Small vs Medium Lab-Grown Diamond Stud Earrings',
    content: [
      { type: 'paragraph', text: 'Choosing between small and medium studs depends on how visible you want the earrings to be.' },
      { type: 'paragraph', text: 'Small studs are best for subtle sparkle. They are ideal for everyday wear, second piercings, minimalist outfits and people who prefer quiet jewellery. Medium studs are better when you want the earrings to be seen more clearly but still want a classic look.' },
      {
        type: 'table',
        headers: ['Stud Size Style', 'Best For', 'Style Feeling'],
        rows: [
          ['Small studs', 'Daily wear, minimalists, second piercings, work outfits', 'Subtle, clean, easy'],
          ['Medium studs', 'Everyday sparkle, gifting, dinners, simple dresses', 'Classic, polished, more visible'],
          ['Larger studs', 'More dressed-up looks or stronger sparkle', 'Bold, noticeable, occasion-friendly'],
        ],
      },
      { type: 'paragraph', text: 'For a first pair, small or medium studs are usually safer than very large studs. They are easier to wear repeatedly and more likely to match different outfits.' },
      { type: 'paragraph', text: 'Cadenza S is ideal for shoppers who want simple daily sparkle. Cadenza M works better for someone who wants the stud to stand out a little more.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings size guide', href: '#' },
    ],
  },
  {
    heading: 'What Metal Colour Is Best for Diamond Stud Earrings?',
    content: [
      { type: 'paragraph', text: 'The best metal colour depends on the person\'s existing jewellery, skin tone, wardrobe and personal style.' },
      { type: 'paragraph', text: 'Yellow gold gives diamond studs a warm, classic feeling. It works well with cream, black, brown, green, red and warm-toned outfits. White or silver tones feel cleaner and more modern. They work well with cool colours, minimal outfits and crisp styling. Rose gold feels softer and more romantic, making it a strong choice for gifts.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Best For', 'Style Feeling'],
        rows: [
          ['Yellow gold', 'Classic wardrobes, warm outfits, everyday styling', 'Warm, timeless, rich'],
          ['White or silver tone', 'Minimal outfits, cool tones, modern styling', 'Clean, bright, polished'],
          ['Rose gold', 'Romantic gifts, soft outfits, feminine styling', 'Gentle, warm, personal'],
        ],
      },
      { type: 'paragraph', text: 'For gifting, match the metal colour to what the person already wears. Someone who always wears yellow gold will usually prefer yellow gold studs. Someone who wears silver watches or white-toned jewellery may prefer a white or silver finish.' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Studs Good for Sensitive Ears?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds themselves are not usually the issue for sensitive ears. Sensitivity is more often connected to the metal, plating, earring post or low-quality base materials.' },
      { type: 'paragraph', text: 'When buying studs, check what the earring is made from. At IWantJewels, the jewellery direction includes 925 sterling silver with 14kt gold plating, which gives the piece a better demi-fine foundation than many low-quality fashion earrings.' },
      { type: 'paragraph', text: 'If someone has very sensitive ears or a known metal allergy, they should always check the product details before buying. Studs are often a good choice because they are lightweight and simple, but the metal still matters.' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Stud Earrings for Gifts',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond studs are one of the safest jewellery gifts.' },
      { type: 'paragraph', text: 'They feel special without being too personal in the way a ring can be. They do not need exact sizing, and they work for many styles. A simple pair of diamond studs can suit someone who dresses minimally, someone who works in an office, someone who wears jewellery every day or someone who only wears jewellery for special occasions.' },
      { type: 'paragraph', text: 'For birthday gifts, studs feel classic and useful. For anniversaries, they feel romantic without being too dramatic. For bridesmaids, they are elegant enough for the wedding day and wearable after the event. For a first diamond gift, they are usually safer than bold or unusual designs.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are best for a subtle gift. Cadenza M diamond stud earrings are better if you want the gift to feel a little more noticeable and special.' },
      { type: 'see-also', text: 'Explore jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Stud Earrings for Work and Office Wear',
    content: [
      { type: 'paragraph', text: 'Stud earrings are perfect for work because they look polished without being distracting.' },
      { type: 'paragraph', text: 'They pair well with blazers, shirts, knitwear, dresses and simple everyday outfits. A small diamond stud can make workwear feel more finished without looking too dressy. This is why studs are such a useful part of a jewellery collection.' },
      { type: 'paragraph', text: 'For office wear, choose studs that are comfortable enough to keep on for long hours. Smaller studs usually feel more natural for daily work outfits. Medium studs can also work well if the overall look is still clean and balanced.' },
      { type: 'paragraph', text: 'Cadenza S is the safest choice for workwear. Cadenza M is a better choice for someone who wants more visible sparkle but still wants to stay classic.' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Stud Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond studs are an excellent choice for wedding guests, especially when the outfit already has detail.' },
      { type: 'paragraph', text: 'If your dress has sequins, embroidery, a bold neckline, lace or strong colour, studs can be better than drop earrings. They add sparkle without competing with the outfit. They also keep the look elegant without feeling bridal.' },
      { type: 'paragraph', text: 'Studs work especially well with high-neck dresses, printed dresses, satin outfits, tailored jumpsuits and dresses with statement sleeves. They are also helpful when you want to wear a necklace, because studs will not fight with it.' },
      { type: 'paragraph', text: 'For wedding guest looks, Cadenza M diamond stud earrings are a strong option if you want visible sparkle. Cadenza S works better if the outfit is already detailed and you only want a small finishing touch.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Stud Earrings for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'Stud earrings are the foundation of a good ear stack.' },
      { type: 'paragraph', text: 'A clean diamond stud can act as the main earring or a supporting piece. It works well with huggies, small hoops, cuffs and minimalist earrings. The key is to avoid making every earring the same size or intensity.' },
      { type: 'paragraph', text: 'A simple stack could use Cadenza S lab-grown diamond studs in the first piercing and Amadea Huggie earrings in the second. For a slightly stronger look, use Cadenza M in the first piercing and Laluce minimalist diamond earrings as a softer supporting piece.' },
      { type: 'paragraph', text: 'This kind of stack looks polished because it mixes shape and size without becoming too busy.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Stud Earrings vs Huggies',
    content: [
      { type: 'paragraph', text: 'Studs and huggies are both good everyday earrings, but they create different looks.' },
      {
        type: 'table',
        headers: ['Feature', 'Stud Earrings', 'Huggie Earrings'],
        rows: [
          ['Shape', 'Sits directly on the lobe', 'Small hoop that hugs the ear'],
          ['Best for', 'Classic daily wear, first diamond earrings, gifting', 'Ear stacks, second piercings, modern styling'],
          ['Style feeling', 'Simple and timeless', 'Clean and contemporary'],
          ['Easy to gift?', 'Very easy', 'Good if the person likes modern jewellery'],
          ['Best IWJ direction', 'Cadenza S, Cadenza M', 'Amadea Huggie'],
        ],
      },
      { type: 'paragraph', text: 'Choose studs if you want the safest, most classic option. Choose huggies if the person likes layered styling or already wears multiple earrings.' },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Stud Earrings vs Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Studs and drops serve different purposes.' },
      { type: 'paragraph', text: 'Studs are easier for daily wear. They are subtle, comfortable and timeless. Drop earrings are more expressive. They add movement and work better for weddings, dinners, parties and evening outfits.' },
      {
        type: 'table',
        headers: ['Feature', 'Stud Earrings', 'Drop Earrings'],
        rows: [
          ['Best for', 'Everyday wear and classic gifts', 'Occasions and dressed-up looks'],
          ['Movement', 'No or very little movement', 'More movement'],
          ['Styling', 'Works with most outfits', 'Works best with selected necklines and dresses'],
          ['Gift safety', 'Very safe', 'Better when you know the person\'s style'],
          ['Best IWJ direction', 'Cadenza S, Cadenza M', 'Orsola Drop, Concetta Long'],
        ],
      },
      { type: 'paragraph', text: 'Choose studs when you want a piece the person can wear often. Choose drops when you want the earrings to feel more special for an event.' },
      { type: 'see-also', text: 'Stud vs drop earrings', href: '#' },
    ],
  },
  {
    heading: 'How to Style Lab-Grown Diamond Stud Earrings',
    content: [
      { type: 'paragraph', text: 'The best thing about diamond studs is how easy they are to style.' },
      { type: 'paragraph', text: 'For everyday outfits, wear small studs with a white shirt, knitwear, simple dress or blazer. For evening looks, choose slightly more visible studs and pair them with a bracelet or delicate necklace. For wedding guest outfits, use studs when the outfit already has strong detail.' },
      { type: 'paragraph', text: 'Diamond studs also work well when you want the rest of the jewellery to stand out. For example, if you are wearing a bold necklace, studs keep the ear simple. If you are wearing a high neckline, studs add sparkle without crowding the outfit.' },
      { type: 'paragraph', text: 'For a black dress, Cadenza M can add clean sparkle. For a minimalist outfit, Cadenza S or Laluce keeps the look soft and refined. For a layered ear look, pair studs with Amadea Huggie earrings.' },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'How Much Should You Spend on Lab-Grown Diamond Stud Earrings?',
    content: [
      { type: 'paragraph', text: 'The right amount depends on why you are buying the studs.' },
      { type: 'paragraph', text: 'For daily wear, it is worth choosing quality, comfort and a design you will repeat often. For a gift, choose a pair that feels special but still matches the person\'s style. For a wedding or occasion, choose a pair that works with the outfit but can also be worn again later.' },
      { type: 'paragraph', text: 'Do not choose only by size. A smaller pair of well-designed studs can be more valuable than larger earrings that feel too formal for everyday use.' },
      { type: 'paragraph', text: 'Cadenza S is a practical first pair because it is simple and wearable. Cadenza M is a better option if you want the studs to feel more gift-worthy or noticeable.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-price-guide' },
    ],
  },
  {
    heading: 'What Should You Check Before Buying Stud Earrings?',
    content: [
      { type: 'paragraph', text: 'Before buying lab-grown diamond studs, look at the full earring, not just the stone.' },
      { type: 'paragraph', text: 'Check the diamond type, metal, size, setting, backing, comfort and finish colour. Think about how often the earrings will be worn and whether they match the wearer\'s existing jewellery.' },
      {
        type: 'table',
        headers: ['What to Check', 'Why It Matters'],
        rows: [
          ['Diamond type', 'Confirms the stones are lab-grown diamonds, not simulants'],
          ['Size', 'Affects how visible or subtle the studs look'],
          ['Metal colour', 'Should match the wearer\'s existing jewellery style'],
          ['Setting', 'Affects how the diamond sits and catches light'],
          ['Backing', 'Helps with comfort and security'],
          ['Weight', 'Important for daily wear'],
          ['Care instructions', 'Helps the earrings stay beautiful longer'],
        ],
      },
      { type: 'paragraph', text: 'For first-time buyers, keep it simple. A classic stud is usually easier to wear than a design that is too bold or trend-led.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/jewellery-care-guides' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you are shopping for lab-grown diamond studs or stud-friendly styling, these are the best starting points.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First diamond studs', 'Small, clean and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'More visible everyday sparkle', 'Classic with stronger presence'],
          ['Laluce minimalist diamond earrings', 'Quiet styling', 'Good for simple outfits and soft looks'],
          ['Amadea Huggie earrings', 'Styling with studs', 'Works well in an ear stack'],
          ['Farfalla butterfly earrings', 'Gift alternative', 'More symbolic than a simple stud'],
          ['Orsola drop earrings', 'Occasion alternative', 'Better when studs feel too subtle'],
        ],
      },
      { type: 'paragraph', text: 'For your first pair of lab-grown diamond studs, choose Cadenza S if you want subtle everyday sparkle or Cadenza M if you want a more visible classic earring. For a styled ear look, pair studs with Amadea Huggie earrings.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing studs that are too large for daily wear. Larger studs can be beautiful, but they may feel too formal if you want something easy and repeatable.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the backing. A stud needs to feel secure. If it does not sit comfortably, you will not wear it often.' },
      { type: 'paragraph', text: 'A third mistake is buying a metal colour that does not match the person\'s usual jewellery. For gifts, always look at what they already wear.' },
      { type: 'paragraph', text: 'Finally, do not assume simple means boring. A clean diamond stud is one of the most useful jewellery pieces because it works with so many outfits.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying Lab-Grown Diamond Stud Earrings',
    content: [
      { type: 'paragraph', text: 'Before buying, ask yourself:' },
      { type: 'bullet-list', items: [
        'Is this for everyday wear, gifting, work or an occasion?',
        'Do I want subtle sparkle or a more visible stud?',
        'Does the metal colour match the wearer\'s usual jewellery?',
        'Is the stud comfortable enough to wear often?',
        'Are the stones genuine lab-grown diamonds?',
        'Does the backing look secure?',
        'Will the studs work with more than one outfit?',
        'Can they be styled with huggies or other earrings later?',
      ]},
      { type: 'paragraph', text: 'If you are unsure, start with a clean, classic pair. Diamond studs are meant to be easy.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'Are lab-grown diamond stud earrings real diamonds?', answer: 'Yes, lab-grown diamond stud earrings use real diamonds when the stones are genuine lab-grown diamonds. They are created in a laboratory instead of being mined from the earth.' },
  { question: 'Are lab-grown diamond studs good for everyday wear?', answer: 'Yes, lab-grown diamond studs are one of the best everyday earring choices because they are comfortable, classic and easy to style.' },
  { question: 'What size diamond studs should I buy?', answer: 'Small studs are best for subtle everyday wear, while medium studs are better if you want more visible sparkle. For a first pair, small or medium studs are usually safest.' },
  { question: 'Are lab-grown diamond studs good gifts?', answer: 'Yes, lab-grown diamond studs make excellent gifts because they feel special and are easy to wear. They are also easier to choose than rings because they do not require exact sizing.' },
  { question: 'Are lab-grown diamond studs better than huggies?', answer: 'Studs are better if you want a classic everyday earring. Huggies are better if you want a modern ear stack or second-piercing look.' },
  { question: 'Can I wear diamond studs with other earrings?', answer: 'Yes, diamond studs work very well in ear stacks. Pair them with huggies, small hoops or minimalist earrings for a layered look.' },
  { question: 'What metal colour is best for diamond studs?', answer: 'Yellow gold feels warm and classic, white or silver tones feel clean and modern, and rose gold feels soft and romantic. The best choice depends on the wearer\'s existing jewellery.' },
  { question: 'Are lab-grown diamond studs suitable for work?', answer: 'Yes, diamond studs are excellent for office wear because they look polished without being distracting.' },
  { question: 'How do I clean lab-grown diamond stud earrings?', answer: 'Clean them gently with a soft cloth and avoid harsh chemicals, perfume, lotions and strong cleaning products. Store them separately to protect the finish.' },
  { question: 'What is the best first pair of lab-grown diamond studs?', answer: 'A small or medium classic stud is usually the best first pair. For IWantJewels, Cadenza S is best for subtle daily wear, while Cadenza M gives more visible sparkle.' },
]

const cta: V2CTABlock = {
  heading: 'Lab-Grown Diamond Stud Earrings — Simple, Timeless and Easy to Wear',
  body: 'Start with IWantJewels lab-grown diamond studs if you want real diamond sparkle in a wearable demi-fine design. Choose Cadenza S for subtle everyday shine or Cadenza M for a more noticeable classic stud. For a styled ear look, pair your studs with Amadea Huggie earrings.',
  primaryLabel: 'Shop Lab-Grown Diamond Stud Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide',
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamond-stud-earrings-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamond-stud-earrings-guide', 3)
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
