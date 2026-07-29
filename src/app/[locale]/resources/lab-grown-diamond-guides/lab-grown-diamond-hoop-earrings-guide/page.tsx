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
  title: 'Lab Grown Diamond Hoop Earrings Guide | I Want Jewels',
  description:
    'Learn how to choose lab grown diamond hoop earrings for everyday wear, ear stacks, gifts, parties and modern jewellery styling.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-17.jpg',
  title: 'Lab-Grown Diamond Hoop Earrings Guide',
  subtitle: 'How to Choose, Style and Gift the Perfect Pair',
  paragraphs: [
    'Lab-grown diamond hoop earrings are a strong choice if you want diamond sparkle in a shape that feels modern, wearable and easy to style. Unlike studs, hoops create more shape around the ear. Unlike drop earrings, they usually feel easier for everyday wear. Small hoops and huggies are especially useful for ear stacks, second piercings, casual outfits and polished daily styling.',
    'The best lab-grown diamond hoop earrings depend on how bold you want the look to be. Choose huggies if you want something close to the ear and easy to layer. Choose small hoops if you want everyday sparkle with a little more shape. Choose pavé hoops if you want a more noticeable diamond finish. For IWantJewels, Amadea Huggie earrings are a strong stacking piece, while Pave Hoops are better if you want a classic hoop shape with more visible sparkle.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Hoop Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamond hoop earrings are real diamond earrings when made with genuine lab-grown diamonds.',
    'Hoops create more shape than studs but are usually easier to wear than long drop earrings.',
    'Huggies are small hoops that sit close to the ear and work beautifully in ear stacks.',
    'Small diamond hoops are best for everyday wear, work outfits, dinners and casual styling.',
    'Pavé hoops are better when you want more visible sparkle.',
    'Hoops work well with studs, huggies and minimalist earrings in layered ear looks.',
    'Yellow gold feels warm and classic, white or silver tones feel clean and modern, and rose gold feels soft and romantic.',
    'If you want a first hoop-style piece, Amadea Huggie is the easiest starting point. If you want more sparkle, Pave Hoops are the stronger choice.',
  ],
  image: '/blog-images/blog-image-101.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Are Lab-Grown Diamond Hoop Earrings?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond hoop earrings are hoop-shaped earrings set with genuine lab-grown diamonds. The hoop can be small and close to the ear, like a huggie, or slightly larger and more visible. The diamonds may sit across the front, around part of the hoop or in a pavé-style setting.' },
      { type: 'paragraph', text: 'When the stones are genuine lab-grown diamonds, they are real diamonds created in a controlled laboratory environment instead of being mined from the earth. They are not cubic zirconia, glass or crystal. The word "lab-grown" explains the diamond\'s origin, not whether it is real.' },
      { type: 'paragraph', text: 'Hoops are popular because they add shape. Studs give sparkle in one small point, while hoops create a curved line around the ear. That makes them useful for everyday outfits, ear stacks, casual luxury styling and simple evening looks.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real' },
    ],
  },
  {
    heading: 'Why Choose Lab-Grown Diamond Hoops?',
    content: [
      { type: 'paragraph', text: 'Choose lab-grown diamond hoops if you want jewellery that feels polished but not too formal.' },
      { type: 'paragraph', text: 'Stud earrings are timeless, but they can feel very minimal. Drop earrings are elegant, but they can feel too dressed up for daily wear. Hoops sit in the middle. They give more presence than studs but still feel easy enough for regular styling.' },
      { type: 'paragraph', text: 'This makes them especially useful if you like jewellery that works across different outfits. A small diamond hoop can look good with a white shirt, blazer, knitwear, black dress, satin top or casual weekend outfit. Huggies can be worn alone or stacked with studs. Pavé hoops can add sparkle without needing a necklace.' },
      { type: 'paragraph', text: 'For IWantJewels shoppers, lab-grown diamond hoops are a good way to build a more styled jewellery wardrobe. They feel modern, wearable and easy to repeat.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Hoop Earrings vs Huggie Earrings',
    content: [
      { type: 'paragraph', text: 'Hoops and huggies are closely related, but they are not exactly the same.' },
      { type: 'paragraph', text: 'A hoop earring is usually a circular or curved earring that passes through the ear. A huggie is a smaller type of hoop that sits very close to the earlobe and "hugs" the ear.' },
      {
        type: 'table',
        headers: ['Feature', 'Hoop Earrings', 'Huggie Earrings'],
        rows: [
          ['Size', 'Can be small, medium or large', 'Usually small and close to the ear'],
          ['Style feeling', 'Classic, visible, shaped', 'Modern, neat, easy to layer'],
          ['Best for', 'Everyday outfits, dinners, party looks', 'Ear stacks, second piercings, daily wear'],
          ['Movement', 'Can have slight movement depending on size', 'Usually very little movement'],
          ['Best IWJ direction', 'Pave Hoops', 'Amadea Huggie earrings'],
        ],
      },
      { type: 'paragraph', text: 'Choose huggies if you want something easy, close-fitting and stack-friendly. Choose hoops if you want the earring shape to be more visible.' },
      { type: 'see-also', text: 'Hoop vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Hoop Earrings vs Stud Earrings',
    content: [
      { type: 'paragraph', text: 'Hoops and studs both work for everyday jewellery, but they create different effects.' },
      { type: 'paragraph', text: 'Studs are simple and classic. They sit close to the ear and are usually the safest first diamond earrings. Hoops add more shape and can make the ear look more styled.' },
      {
        type: 'table',
        headers: ['Feature', 'Hoop Earrings', 'Stud Earrings'],
        rows: [
          ['Shape', 'Curved or circular', 'Sits directly on the lobe'],
          ['Best for', 'Styled everyday looks, ear stacks, casual luxury', 'First diamond earrings, workwear, safe gifts'],
          ['Style feeling', 'Modern and shaped', 'Classic and timeless'],
          ['Visibility', 'More visible than small studs', 'Subtle to medium depending on size'],
          ['Best IWJ direction', 'Pave Hoops, Amadea Huggie', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'paragraph', text: 'Choose studs if you want the safest first pair. Choose hoops or huggies if you already own studs or want a more styled look.' },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Hoops Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond hoops can be excellent for everyday wear, especially if they are small, secure and comfortable.' },
      { type: 'paragraph', text: 'For daily wear, the best hoops are not too large or heavy. They should sit comfortably and match more than one outfit. Huggies are usually the easiest everyday option because they stay close to the ear and do not feel distracting.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are a strong everyday choice because they are easy to wear alone or with studs. Pave Hoops are better if you want a more classic hoop look with extra sparkle.' },
      { type: 'paragraph', text: 'For simple daily styling, wear huggies with a white shirt, blazer, knitwear, casual dress or soft evening top. If you want a slightly more polished look, pair diamond hoops with a bracelet or delicate necklace.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Hoops Good for Ear Stacks?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond hoops and huggies are excellent for ear stacks.' },
      { type: 'paragraph', text: 'A good ear stack usually needs a mix of shapes. If every earring is a stud, the ear can look too flat. If every earring is large, it can look crowded. Hoops and huggies add shape and balance.' },
      { type: 'paragraph', text: 'For a simple diamond ear stack, wear Cadenza S lab-grown diamond studs in the first piercing and Amadea Huggie earrings in the second. For a stronger look, use Pave Hoops as the main earring and Laluce minimalist diamond earrings or Cadenza S as the smaller supporting piece.' },
      { type: 'paragraph', text: 'The goal is to create balance. Let one earring be the main piece and keep the others softer.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Small Hoops vs Larger Hoops',
    content: [
      { type: 'paragraph', text: 'The best hoop size depends on how visible you want the earrings to be and how often you plan to wear them.' },
      { type: 'paragraph', text: 'Small hoops and huggies are best for everyday wear. They feel neat, comfortable and easy to repeat. Medium hoops add more shape and can work for dinners, workwear and smart-casual outfits. Larger hoops feel more expressive and are usually better for party styling or bold looks.' },
      {
        type: 'table',
        headers: ['Hoop Size', 'Best For', 'Style Feeling'],
        rows: [
          ['Huggies', 'Ear stacks, second piercings, daily wear', 'Neat, modern, close-fitting'],
          ['Small hoops', 'Everyday sparkle, casual styling, work outfits', 'Polished, easy, wearable'],
          ['Medium hoops', 'Dinners, smart-casual looks, simple dresses', 'More visible, balanced'],
          ['Large hoops', 'Parties and bold styling', 'Statement-making, confident'],
        ],
      },
      { type: 'paragraph', text: 'For a first hoop-style purchase, huggies or small hoops are usually safest. They are easier to wear often and less likely to feel too dramatic.' },
    ],
  },
  {
    heading: 'What Metal Colour Is Best for Diamond Hoops?',
    content: [
      { type: 'paragraph', text: 'Metal colour changes the entire mood of hoop earrings.' },
      { type: 'paragraph', text: 'Yellow gold hoops feel warm, classic and easy to wear. They pair well with cream, brown, black, green, red and warm-toned outfits. White or silver-tone hoops feel cleaner and more modern. They work well with black, navy, grey, white and minimalist wardrobes. Rose gold hoops feel softer and more romantic, making them a nice option for gifts or feminine styling.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Best For', 'Style Feeling'],
        rows: [
          ['Yellow gold', 'Everyday hoops, warm outfits, classic jewellery lovers', 'Warm, timeless, rich'],
          ['White or silver tone', 'Minimal outfits, cool tones, modern styling', 'Clean, bright, polished'],
          ['Rose gold', 'Romantic gifts, soft outfits, feminine looks', 'Gentle, warm, personal'],
        ],
      },
      { type: 'paragraph', text: 'For gifts, match the metal colour to what the person already wears. If they wear yellow gold daily, yellow gold hoops are usually safest. If they wear silver watches or white-toned jewellery, choose a white or silver finish.' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Hoops for Gifts',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond hoops can make a beautiful gift, especially for someone who already wears earrings often.' },
      { type: 'paragraph', text: 'Studs are the safest gift, but hoops can feel more stylish and personal. They are a good choice if the person likes modern jewellery, ear stacks, small hoops, or pieces that feel polished but not too formal.' },
      { type: 'paragraph', text: 'Huggies are especially gift-friendly because they are easy to wear and usually not too bold. Amadea Huggie earrings are a strong option for someone who likes subtle, modern jewellery. Pave Hoops are better if the person enjoys a little more sparkle and a classic hoop shape.' },
      { type: 'paragraph', text: 'If you are unsure of the person\'s style, choose huggies over larger hoops. They are easier to wear and more likely to suit different outfits.' },
      { type: 'see-also', text: 'Explore jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Hoops for Work and Daily Outfits',
    content: [
      { type: 'paragraph', text: 'Small diamond hoops and huggies can work beautifully for workwear.' },
      { type: 'paragraph', text: 'They feel a little more styled than studs but still polished enough for office outfits. The key is to keep the hoop size balanced. Very large hoops may feel too bold for some workplaces, but small hoops or huggies usually work well.' },
      { type: 'paragraph', text: 'Wear them with blazers, simple shirts, knit tops, dresses or soft tailoring. If your outfit is very minimal, diamond hoops can add just enough detail. If the outfit already has strong prints or a bold neckline, smaller huggies are safer.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are the easiest workwear option. Pave Hoops can work well if you want more visible sparkle while keeping the shape classic.' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Hoops for Parties',
    content: [
      { type: 'paragraph', text: 'For parties, diamond hoops can be a strong alternative to drop earrings.' },
      { type: 'paragraph', text: 'Hoops feel confident, modern and easy to wear. They are especially good with sleek outfits, black dresses, satin tops, jumpsuits and simple evening looks. A pavé hoop can add sparkle while still feeling less formal than a long drop earring.' },
      { type: 'paragraph', text: 'If you want the hoop to be the main jewellery detail, keep the necklace simple or skip it. Let the earrings frame the face and add movement.' },
      { type: 'paragraph', text: 'Pave Hoops are a strong party option if you want sparkle in a classic hoop shape. If you want something even more high-impact, Lusso bold statement earrings may be better.' },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Hoops Good for Wedding Guests?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond hoops can work for wedding guests, especially if the outfit is modern, minimal or slightly less formal.' },
      { type: 'paragraph', text: 'For very formal weddings, drop earrings may feel more elegant. For relaxed weddings, city weddings, evening receptions or stylish wedding guest outfits, diamond hoops can look beautiful.' },
      { type: 'paragraph', text: 'Small hoops or huggies are best when the outfit already has detail. Pavé hoops are better when the dress is simple and needs sparkle. If the dress is romantic, soft or very formal, drop earrings or butterfly earrings may be a better match.' },
      { type: 'paragraph', text: 'For wedding guest styling, Pave Hoops can work well with sleek dresses, jumpsuits and black outfits. Orsola drop earrings are better if the look needs more elegance and movement.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'How to Style Lab-Grown Diamond Hoops',
    content: [
      { type: 'paragraph', text: 'The easiest way to style diamond hoops is to match the hoop size to the outfit.' },
      { type: 'paragraph', text: 'Small hoops and huggies work with almost anything. They look good with simple tops, shirts, blazers, knitwear and everyday dresses. Medium hoops work better when the outfit is simple and you want the earrings to be more visible. Pavé hoops can dress up a casual outfit or complete an evening look.' },
      { type: 'paragraph', text: 'For a clean daytime look, wear Amadea Huggie earrings with a simple stud. For a stronger evening look, wear Pave Hoops with a black dress or satin top. For an ear stack, combine hoops with Cadenza S or Laluce minimalist diamond earrings.' },
      { type: 'see-also', text: 'Jewellery with black dress', href: '#' },
    ],
  },
  {
    heading: 'How Much Should You Spend on Lab-Grown Diamond Hoops?',
    content: [
      { type: 'paragraph', text: 'The right amount depends on how often you will wear them and how much sparkle you want.' },
      { type: 'paragraph', text: 'If you want daily earrings, it is better to choose small hoops or huggies that feel comfortable and easy to repeat. If you want occasion earrings, it may make sense to choose a more visible pavé hoop. If you are buying a gift, choose a style that matches the person\'s existing jewellery.' },
      { type: 'paragraph', text: 'Do not pay only for size. A smaller hoop that is comfortable and wearable can be more valuable than a larger hoop you rarely use.' },
      { type: 'paragraph', text: 'For many shoppers, huggies are the best starting point because they can be worn alone, stacked with studs, or styled casually. Pave Hoops are better if you want a more noticeable hoop look.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-price-guide' },
    ],
  },
  {
    heading: 'What Should You Check Before Buying Diamond Hoops?',
    content: [
      { type: 'paragraph', text: 'Before buying lab-grown diamond hoops, look at the full design.' },
      { type: 'paragraph', text: 'Check the size, closure, weight, diamond placement, metal colour and comfort. A hoop should feel secure and easy to wear. If it is too heavy, too large or too difficult to close, you may not reach for it often.' },
      {
        type: 'table',
        headers: ['What to Check', 'Why It Matters'],
        rows: [
          ['Hoop size', 'Affects how bold or wearable the earrings feel'],
          ['Closure', 'Helps the earrings feel secure'],
          ['Weight', 'Important for comfort'],
          ['Diamond placement', 'Affects sparkle and visibility'],
          ['Metal colour', 'Should match your existing jewellery'],
          ['Styling use', 'Daily wear, ear stack, gift or party styling'],
          ['Care instructions', 'Helps the earrings stay beautiful longer'],
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose small hoops or huggies first. They are usually easier to wear than larger hoops.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you are shopping for lab-grown diamond hoops or hoop-style earrings, these are the strongest starting points.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Amadea Huggie earrings', 'Ear stacks and everyday wear', 'Small, modern and easy to layer'],
          ['Pave Hoops', 'Classic hoop sparkle', 'Adds visible diamonds in a wearable hoop shape'],
          ['Cadenza S lab-grown diamond studs', 'Styling with hoops', 'Works well as a supporting stud'],
          ['Cadenza M diamond stud earrings', 'Stronger stud pairing', 'Adds more sparkle beside hoops'],
          ['Laluce minimalist diamond earrings', 'Minimal ear stacks', 'Keeps the stack soft and balanced'],
          ['Orsola drop earrings', 'Occasion alternative', 'Better when hoops feel too casual'],
          ['Lusso bold statement earrings', 'Party alternative', 'Better for a stronger jewellery moment'],
        ],
      },
      { type: 'paragraph', text: 'If you want diamond earrings that feel modern and easy to style, start with huggies or small hoops. Choose Amadea Huggie earrings for everyday stacking or Pave Hoops if you want more visible diamond sparkle.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing hoops that are too large for daily wear. Large hoops can look beautiful, but they may not feel practical if you want something easy to repeat.' },
      { type: 'paragraph', text: 'Another mistake is ignoring closure quality. A hoop needs to feel secure. If the closure feels difficult or loose, the earrings may not be comfortable for regular use.' },
      { type: 'paragraph', text: 'A third mistake is making every earring in an ear stack equally bold. If you are wearing hoops, keep the supporting earrings smaller or simpler.' },
      { type: 'paragraph', text: 'Finally, do not choose hoops only because they are trendy. Choose the size and sparkle level that match your actual wardrobe.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying Lab-Grown Diamond Hoops',
    content: [
      { type: 'paragraph', text: 'Before buying, ask yourself:' },
      { type: 'bullet-list', items: [
        'Do I want huggies, small hoops or more visible pavé hoops?',
        'Will I wear them daily, for parties, or in an ear stack?',
        'Are the earrings light enough for regular wear?',
        'Does the closure look secure?',
        'Does the metal colour match my usual jewellery?',
        'Are the stones genuine lab-grown diamonds?',
        'Will the hoops work with studs or other earrings I already own?',
        'Do I want subtle sparkle or a stronger jewellery moment?',
      ]},
      { type: 'paragraph', text: 'If you are unsure, start with huggies or small hoops. They are usually the most wearable and easiest to style.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What are lab-grown diamond hoop earrings?', answer: 'Lab-grown diamond hoop earrings are hoop-shaped earrings set with genuine lab-grown diamonds. They may be small huggies, classic hoops or pavé-style hoops.' },
  { question: 'Are lab-grown diamond hoops real diamonds?', answer: 'Yes, when made with genuine lab-grown diamonds, they are real diamond earrings. The diamonds are created in a laboratory instead of being mined from the earth.' },
  { question: 'What is the difference between hoops and huggies?', answer: 'Huggies are small hoops that sit close to the earlobe. Hoops can be small, medium or large and are usually more visible.' },
  { question: 'Are diamond hoops good for everyday wear?', answer: 'Yes, small diamond hoops and huggies can be excellent for everyday wear because they are comfortable, stylish and easy to repeat.' },
  { question: 'Are huggies good for ear stacks?', answer: 'Yes, huggies are one of the best earrings for ear stacks because they add shape without looking too heavy.' },
  { question: 'Are diamond hoops good gifts?', answer: 'Yes, diamond hoops can make a beautiful gift, especially for someone who likes modern jewellery or already wears earrings often.' },
  { question: 'Are diamond hoops better than studs?', answer: 'Hoops are better if you want more shape and a styled look. Studs are better if you want the safest, most classic everyday earring.' },
  { question: 'Can I wear diamond hoops to a wedding?', answer: 'Yes, diamond hoops can work for wedding guests, especially with modern or simple outfits. For very formal looks, drop earrings may feel more elegant.' },
  { question: 'What metal colour is best for diamond hoops?', answer: 'Yellow gold feels warm and classic, white or silver tones feel clean and modern, and rose gold feels soft and romantic.' },
  { question: 'What is the best first pair of diamond hoops?', answer: 'Small hoops or huggies are usually the best first pair because they are easy to wear, easy to style and useful in ear stacks.' },
]

const cta: V2CTABlock = {
  heading: 'Lab-Grown Diamond Hoops — Modern, Shaped and Easy to Style',
  body: 'Start with IWantJewels hoop-style earrings if you want real diamond sparkle in a demi-fine design. Choose Amadea Huggie earrings for everyday wear and ear stacks, or Pave Hoops if you want a more visible hoop look with extra sparkle.',
  primaryLabel: 'Shop Lab-Grown Diamond Hoop Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Huggie Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide',
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamond-hoop-earrings-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamond-hoop-earrings-guide', 3)
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
