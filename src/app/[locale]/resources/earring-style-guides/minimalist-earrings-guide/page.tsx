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
  title: 'Minimalist Earrings Guide',
  description:
    'Learn how to choose minimalist earrings for everyday wear, work outfits, ear stacks, gifts and simple lab grown diamond styling.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/earring-style-guides/minimalist-earrings-guide', locale),
  }
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-69.jpg',
  title: 'Minimalist Earrings Guide:',
  subtitle: 'Simple Earrings for Everyday Styling',
  paragraphs: [
    'Minimalist earrings are simple, wearable and easy to style. They are designed to add polish without taking over the outfit. For many shoppers, minimalist earrings become the most-used pieces in their jewellery collection because they work with everyday clothes, office outfits, simple dresses, travel looks, ear stacks and quiet evening styling.',
    'The best minimalist earrings are not boring. They rely on clean shape, balanced size, subtle sparkle and good materials. A small lab-grown diamond stud, a close-fitting huggie, a soft minimalist earring or a simple hoop can make an outfit feel finished without looking heavy.',
    'This resource helps shoppers choose minimalist earrings by style, occasion, face-framing effect, metal colour, gifting purpose and ear stack use. It also connects each styling direction to IWantJewels pieces such as Cadenza S, Cadenza M, Amadea Huggie, Laluce, Pave Hoops, Farfalla and Orsola.',
  ],
  shopLabel: 'Shop Minimalist Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Understand what minimalist earrings are',
    'Choose minimalist earrings for everyday wear, workwear and travel',
    'Compare studs, huggies, hoops and minimalist diamond earrings',
    'Build simple ear stacks with minimalist pieces',
    'Choose minimalist earrings as gifts',
    'Style minimalist earrings with dresses, shirts, blazers and casual outfits',
    'Decide when to choose subtle sparkle and when to choose a more visible earring',
    'Find IWantJewels product recommendations by styling need',
    'Plan image blocks, product modules, CTAs and internal links for this page',
  ],
  image: '/blog-images/blog-image-78.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Minimalist Earring Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main decision tool.' },
      {
        type: 'table',
        headers: ['Styling Need', 'Best Minimalist Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['First everyday earrings', 'Small diamond studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Medium studs', 'Cadenza M'],
          ['Quiet minimalist styling', 'Simple minimalist earrings', 'Laluce'],
          ['Modern daily look', 'Huggies', 'Amadea Huggie'],
          ['Minimal ear stack', 'Small stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear jewellery', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Travel jewellery', 'Secure studs or huggies', 'Cadenza S, Amadea'],
          ['Simple dinner look', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
          ['Minimal wedding guest look', 'Medium studs or delicate drops', 'Cadenza M, Concetta Short'],
          ['Minimal gift', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
        ],
      },
    ],
  },
  {
    heading: 'What Are Minimalist Earrings?',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings are earrings with a clean, simple design. They usually avoid heavy detail, oversized shapes or overly dramatic styling. The focus is on balance, comfort and everyday wearability.' },
      { type: 'paragraph', text: 'Minimalist earrings can still include diamonds. A small lab-grown diamond stud, a delicate huggie or a simple diamond detail can feel minimalist when the design is refined and easy to wear.' },
      { type: 'paragraph', text: 'Common minimalist earring styles include:' },
      {
        type: 'table',
        headers: ['Minimalist Style', 'What It Looks Like', 'Best For'],
        rows: [
          ['Small studs', 'Simple sparkle close to the ear', 'Everyday wear and workwear'],
          ['Medium studs', 'Classic sparkle with more visibility', 'Gifts and polished daily outfits'],
          ['Huggies', 'Small hoops that sit close to the ear', 'Ear stacks and modern styling'],
          ['Minimalist diamond earrings', 'Quiet sparkle with clean shape', 'Subtle daily jewellery'],
          ['Small hoops', 'Simple curved shape', 'Casual outfits and weekend looks'],
          ['Short drops', 'Soft movement without heavy drama', 'Dinners and minimal occasion styling'],
        ],
      },
      { type: 'paragraph', text: 'Minimalist earrings are best when you want jewellery that can be worn often without needing a special outfit.' },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '/resources/demi-fine-jewellery-guides/what-is-demi-fine-jewellery' },
    ],
  },
  {
    heading: 'Why Minimalist Earrings Work for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings work for everyday wear because they are easy to repeat.' },
      { type: 'paragraph', text: 'They do not usually clash with outfits, necklines, hairstyles or other jewellery. They can be worn with a white shirt, blazer, knitwear, casual dress, black dress, travel outfit or simple evening look.' },
      { type: 'paragraph', text: 'For IWantJewels, minimalist everyday styling works especially well with lab-grown diamond earrings because even a small diamond detail can make the look feel more polished.' },
      {
        type: 'table',
        headers: ['Everyday Reason', 'Why Minimalist Earrings Help'],
        rows: [
          ['Easy to style', 'They match many outfits'],
          ['Comfortable', 'Smaller designs are easier for long wear'],
          ['Repeatable', 'They do not feel too occasion-specific'],
          ['Good for work', 'They add polish without distraction'],
          ['Good for ear stacks', 'They support larger pieces without crowding'],
          ['Gift-friendly', 'Simple designs are easier to choose'],
          ['Timeless', 'Less dependent on short-term trends'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Minimalist Stud Earrings',
    content: [
      { type: 'paragraph', text: 'Stud earrings are the most classic minimalist earring style.' },
      { type: 'paragraph', text: 'They sit close to the ear, feel secure and work with almost every outfit. Small diamond studs are especially useful because they add sparkle without looking too formal.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are the strongest minimalist stud direction for subtle daily wear. They are ideal for shoppers who want simple diamond sparkle that can be worn repeatedly.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are better for shoppers who still want a minimalist shape but prefer the sparkle to be more visible. They are also stronger for gifts because they feel more noticeable while staying classic.' },
      {
        type: 'table',
        headers: ['Stud Style', 'Best For', 'IWJ Direction'],
        rows: [
          ['Small studs', 'Everyday wear, workwear, first diamond earrings', 'Cadenza S'],
          ['Medium studs', 'Gifts, polished daily looks, simple dresses', 'Cadenza M'],
          ['Stud stack', 'Minimal ear stacks', 'Cadenza S + Laluce'],
          ['Workwear studs', 'Office outfits and daily jewellery', 'Cadenza S or Cadenza M'],
          ['Wedding guest studs', 'Detailed outfits and high necklines', 'Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Minimalist Huggie Earrings',
    content: [
      { type: 'paragraph', text: 'Huggies are ideal for minimalist styling because they sit close to the ear and add shape without feeling heavy.' },
      { type: 'paragraph', text: 'A huggie is especially useful when you want something more styled than a stud but still easy enough for daily wear. Huggies also work very well in ear stacks because they create structure while leaving room for studs or minimalist earrings.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are the strongest IWantJewels direction for minimalist huggie styling. They can be worn alone for a clean look or paired with Cadenza S for a simple diamond ear stack.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-75.jpg',
        content: [
          {
            type: 'table',
            headers: ['Huggie Styling Need', 'Best Combination', 'Why It Works'],
            rows: [
              ['Simple daily huggie look', 'Amadea alone', 'Clean and modern'],
              ['Minimal ear stack', 'Amadea + Cadenza S', 'Shape plus sparkle'],
              ['Workwear huggie stack', 'Amadea + Laluce', 'Polished and subtle'],
              ['Giftable huggie set', 'Amadea + Cadenza S', 'Easy two-piece gift'],
              ['Weekend styling', 'Amadea + Pave Hoops', 'More shape-led look'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Minimalist Hoop Earrings',
    content: [
      { type: 'paragraph', text: 'Minimalist hoops are simple, close-to-the-ear hoops or small hoop-style earrings that add shape without becoming too bold.' },
      { type: 'paragraph', text: 'They are useful for shoppers who want a little more presence than a stud but do not want a dramatic earring. Minimalist hoops work well with casual outfits, workwear, weekend looks and simple dresses.' },
      { type: 'paragraph', text: 'Pave Hoops can work as a more styled minimalist-adjacent option when the shopper wants sparkle with a clean hoop shape. If the hoop is more visible, the rest of the jewellery should stay simple.' },
      {
        type: 'table',
        headers: ['Hoop Styling Need', 'Product Direction', 'Styling Note'],
        rows: [
          ['Simple hoop look', 'Pave Hoops', 'Let the hoop shape lead'],
          ['Hoop ear stack', 'Pave Hoops + Cadenza S', 'Add a small sparkle point'],
          ['Casual outfit', 'Pave Hoops + Laluce', 'Keeps the look modern'],
          ['Party-minimal look', 'Pave Hoops + Cadenza M', 'Adds sparkle without full statement styling'],
          ['Workwear hoop look', 'Small hoop direction', 'Keep other jewellery subtle'],
        ],
      },
      { type: 'see-also', text: 'Hoop vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Minimalist Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Minimalist diamond earrings are ideal when you want real sparkle but not a heavy jewellery look.' },
      { type: 'paragraph', text: 'The key is to choose clean shapes and wearable proportions. A minimalist diamond earring should feel easy to wear, not overly formal. It should work with everyday outfits and still feel polished enough for dinner or a simple occasion.' },
      { type: 'paragraph', text: 'For IWantJewels, Laluce minimalist diamond earrings are the strongest product direction for this section. Cadenza S also works as a minimalist diamond stud. Amadea Huggie adds shape, while Cadenza M gives more visible sparkle without moving into bold styling.' },
      {
        type: 'table',
        headers: ['Minimalist Diamond Need', 'Best IWJ Direction'],
        rows: [
          ['Small everyday sparkle', 'Cadenza S'],
          ['Quiet minimalist detail', 'Laluce'],
          ['Modern minimal shape', 'Amadea Huggie'],
          ['More visible classic sparkle', 'Cadenza M'],
          ['Minimal occasion polish', 'Orsola or Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Minimalist Earrings for Workwear',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings are one of the best jewellery choices for workwear.' },
      { type: 'paragraph', text: 'They make an outfit feel polished without being distracting. They work with blazers, shirts, knitwear, dresses, neutral outfits and clean tailoring.' },
      { type: 'paragraph', text: 'For office styling, the best earrings are usually small studs, medium studs, huggies or minimalist earrings. Long drops and bold earrings can work for after-work dinners, but they are not usually the safest daily office choice.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-77.jpg',
        content: [
          {
            type: 'table',
            headers: ['Workwear Look', 'Best Earring Direction', 'IWJ Product Direction'],
            rows: [
              ['Classic office outfit', 'Small studs', 'Cadenza S'],
              ['Polished workwear', 'Medium studs', 'Cadenza M'],
              ['Modern office styling', 'Huggies', 'Amadea Huggie'],
              ['Minimalist office look', 'Minimalist earrings', 'Laluce'],
              ['Creative workwear', 'Hoops or huggies', 'Pave Hoops, Amadea'],
              ['Day-to-dinner outfit', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Minimalist Earrings for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings are essential for good ear stacks because they help balance stronger pieces.' },
      { type: 'paragraph', text: 'If every earring in a stack is large, the ear can look crowded. Minimalist earrings create space, softness and structure. They can support huggies, hoops, drops, butterfly earrings and bold pieces.' },
      {
        type: 'table',
        headers: ['Ear Stack Goal', 'Minimalist Combination', 'Why It Works'],
        rows: [
          ['Simple everyday stack', 'Cadenza S + Amadea', 'Stud sparkle and huggie shape'],
          ['Soft minimal stack', 'Cadenza S + Laluce', 'Clean and quiet'],
          ['Balanced three-piece stack', 'Cadenza M + Amadea + Laluce', 'Main stud, shape and soft detail'],
          ['Romantic stack', 'Farfalla + Cadenza S', 'Butterfly leads, stud supports'],
          ['Party stack', 'Lusso + Cadenza S', 'Bold earring leads, stud keeps balance'],
          ['Wedding stack', 'Orsola + Cadenza S', 'Drop leads, stud supports'],
        ],
      },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Minimalist Earrings for Gifts',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings make strong gifts because they are easier to choose than dramatic jewellery.' },
      { type: 'paragraph', text: 'If you do not know the recipient\'s exact style, minimalist studs or simple earrings are usually safer. They work for birthdays, bridesmaids, everyday gifts, first diamond gifts, workwear gifts and understated anniversary gifts.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Minimalist Direction', 'Recommended IWJ Products'],
        rows: [
          ['Safe birthday gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['First diamond gift', 'Small studs', 'Cadenza S'],
          ['Minimalist recipient', 'Minimalist earrings', 'Laluce'],
          ['Modern gift', 'Huggies', 'Amadea'],
          ['Bridesmaid gift', 'Studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Romantic but subtle gift', 'Soft drops or butterfly earrings', 'Orsola, Farfalla'],
          ['Workwear gift', 'Studs or huggies', 'Cadenza M, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Minimalist Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings can be perfect for wedding guests when the outfit already has detail.' },
      { type: 'paragraph', text: 'If the dress has embroidery, sequins, lace, a strong neckline or a bold print, minimalist earrings keep the look balanced. If the outfit is very simple, you may want a slightly more visible minimalist piece, such as medium studs or soft drops.' },
      {
        type: 'table',
        headers: ['Wedding Outfit', 'Best Minimalist Earring Direction', 'Product Direction'],
        rows: [
          ['Detailed dress', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Floral dress', 'Small studs or butterfly earrings', 'Cadenza S, Farfalla'],
          ['High-neck dress', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
          ['Satin dress', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
          ['Pastel outfit', 'Soft studs or butterfly earrings', 'Cadenza S, Alidi Farfalla'],
          ['Simple black dress', 'Medium studs or clean drops', 'Cadenza M, Orsola'],
          ['Bridesmaid look', 'Small studs or delicate drops', 'Cadenza S, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Minimalist Earrings by Outfit',
    content: [
      { type: 'paragraph', text: 'This section should help shoppers choose earrings based on what they are wearing.' },
      {
        type: 'table',
        headers: ['Outfit', 'Best Minimalist Earring Style', 'Product Direction'],
        rows: [
          ['White shirt and jeans', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Blazer outfit', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Black dress', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
          ['Satin dress', 'Soft drops or visible studs', 'Orsola, Cadenza M'],
          ['Floral dress', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Knitwear', 'Studs or small hoops', 'Cadenza S, Pave Hoops'],
          ['Minimal dress', 'Huggies, hoops or clean studs', 'Amadea, Pave Hoops, Cadenza M'],
          ['Wedding guest outfit', 'Studs, butterfly earrings or drops', 'Cadenza M, Farfalla, Orsola'],
          ['Travel outfit', 'Studs or huggies', 'Cadenza S, Amadea'],
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Metal Colour Tips for Minimalist Earrings',
    content: [
      { type: 'paragraph', text: 'Metal colour changes how minimalist earrings feel.' },
      { type: 'paragraph', text: 'Yellow gold feels warm and classic. White or silver tones feel clean and modern. Rose gold feels soft and romantic. For minimalist styling, it is usually best to choose the metal colour the wearer already uses most often.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Minimalist Feeling', 'Best For'],
        rows: [
          ['Yellow gold', 'Warm, classic, polished', 'Everyday wear, gifts, warm wardrobes'],
          ['White or silver tone', 'Clean, bright, modern', 'Workwear, minimal outfits, cool wardrobes'],
          ['Rose gold', 'Soft, romantic, feminine', 'Gifts, pastel outfits, romantic styling'],
          ['Mixed metals', 'Creative and modern', 'Trend-led styling and ear stacks'],
        ],
      },
      { type: 'paragraph', text: 'For gifts, do not guess too far from the recipient\'s existing jewellery. If they always wear yellow gold, choose yellow gold. If they wear silver watches or white-toned jewellery, choose white or silver tone.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Product Pathways by Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest Minimalist Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are subtle, simple and easy to wear every day.' },
      { type: 'subheading', text: 'For More Visible Minimalist Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They keep the clean stud shape but add more presence.' },
      { type: 'subheading', text: 'For Quiet Minimalist Styling' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings. They are the strongest product direction for shoppers who want soft, understated jewellery.' },
      { type: 'subheading', text: 'For Modern Minimalist Styling' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They give shape while still staying close to the ear and easy to style.' },
      { type: 'subheading', text: 'For Minimalist Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Laluce or Amadea. This creates a clean stack without making the ear look crowded.' },
      { type: 'subheading', text: 'For Minimalist Occasion Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings or Concetta Short earrings when the outfit needs a little movement but not a heavy statement.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Minimalist Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first minimalist earrings', 'Small, subtle and easy to repeat'],
          ['Cadenza M diamond stud earrings', 'More visible minimalist sparkle', 'Classic shape with stronger presence'],
          ['Laluce minimalist diamond earrings', 'Core minimalist piece', 'Soft, quiet and easy to style'],
          ['Amadea Huggie earrings', 'Modern minimalist shape', 'Strong for daily wear and stacking'],
          ['Pave Hoops', 'Minimal hoop direction', 'Adds shape while staying wearable'],
          ['Farfalla butterfly earrings', 'Soft personal detail', 'Romantic but still wearable'],
          ['Alidi Farfalla butterfly earrings', 'Meaningful gift direction', 'Feminine and symbolic'],
          ['Orsola drop earrings', 'Minimal occasion movement', 'Adds elegance for dinners and weddings'],
          ['Concetta Short earrings', 'Soft drop direction', 'Delicate occasion styling'],
          ['Concetta Long earrings', 'Formal minimal elegance', 'Best for refined evening looks'],
          ['Lusso bold statement earrings', 'Not minimalist, but useful contrast', 'Best only when the look needs a bold focal point'],
        ],
      },
      { type: 'paragraph', text: 'Minimalist earrings are best when they feel easy to wear often. Start with Cadenza S for subtle sparkle, Cadenza M for classic visible studs, Laluce for quiet styling, Amadea for huggies and Orsola for soft occasion looks.' },
    ],
  },
  {
    heading: 'Common Minimalist Earring Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is thinking minimalist means plain. A minimalist earring can still feel special when the shape, finish and sparkle are right.' },
      { type: 'paragraph', text: 'Another mistake is choosing earrings that are too small for the intended use. Very tiny earrings may disappear in photos or with hair down. If the earrings are for gifts or events, a medium stud may be better.' },
      { type: 'paragraph', text: 'A third mistake is mixing too many minimalist pieces without structure. Even small earrings can look crowded if the ear stack has no balance.' },
      { type: 'paragraph', text: 'Another mistake is ignoring metal colour. Minimalist jewellery looks best when the metal colour works with the rest of the outfit and jewellery.' },
      { type: 'paragraph', text: 'Finally, do not choose minimalist earrings only for one outfit. The best minimalist pieces should work across everyday wear, workwear, travel and simple occasions.' },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing minimalist earrings, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Will these earrings work with more than one outfit?',
          'Are they comfortable enough for regular wear?',
          'Are they subtle, visible or somewhere in between?',
          'Do I want studs, huggies, hoops or soft drops?',
          'Is this for everyday wear, workwear, gifts or occasions?',
          'Does the metal colour match my usual jewellery?',
          'Can the earrings be used in an ear stack?',
          'Are the stones genuine lab-grown diamonds?',
          'Is the material clearly explained?',
          'Are the earrings easy to clean and store?',
          'Will I still like this design beyond one season?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with simple lab-grown diamond studs or a small huggie. Those are the easiest minimalist earrings to wear often.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What are minimalist earrings?', answer: 'Minimalist earrings are simple, clean earrings designed for easy styling. They usually have balanced shapes, subtle sparkle and a wearable size.' },
  { question: 'Are minimalist earrings good for everyday wear?', answer: 'Yes, minimalist earrings are excellent for everyday wear because they are comfortable, easy to style and work with many outfits.' },
  { question: 'What type of minimalist earrings should I buy first?', answer: 'Small lab-grown diamond studs are usually the safest first minimalist earrings because they are timeless and easy to wear.' },
  { question: 'Are diamond studs minimalist?', answer: 'Diamond studs can be minimalist when the design is simple and the size is wearable. Small or medium studs work especially well.' },
  { question: 'Are huggies minimalist?', answer: 'Huggies can be minimalist when they sit close to the ear and have a clean design. They are also strong for ear stacks.' },
  { question: 'Are minimalist earrings good for work?', answer: 'Yes, minimalist earrings are ideal for work because they add polish without being distracting.' },
  { question: 'Are minimalist earrings good gifts?', answer: 'Yes, minimalist earrings make strong gifts because they are easy to wear and less risky than bold or highly specific styles.' },
  { question: 'Can minimalist earrings be worn to weddings?', answer: 'Yes, minimalist earrings can work beautifully for weddings, especially when the outfit already has detail or the wearer prefers subtle jewellery.' },
  { question: 'How do you style minimalist earrings?', answer: 'Wear them alone for a clean look, pair them with huggies for an ear stack, or use them to balance a simple dress or workwear outfit.' },
  { question: 'What IWantJewels earrings are best for minimalist styling?', answer: 'Cadenza S, Cadenza M, Laluce and Amadea Huggie are the strongest minimalist styling options from IWantJewels.' },
]

const cta: V2CTABlock = {
  heading: 'Minimalist earrings are the pieces you reach for again and again. They are easy to style, comfortable to wear and useful across everyday outfits, workwear, gifts, ear stacks and simple occasions.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want minimalist jewellery with real diamond sparkle. Choose Cadenza S for subtle daily shine, Cadenza M for more visible studs, Laluce for quiet styling, Amadea for huggies and Orsola for soft occasion movement.',
  primaryLabel: 'Shop Minimalist Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Stud Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read How to Stack Earrings',
  tertiaryHref: '/resources/earring-style-guides/how-to-stack-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'minimalist-earrings-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'minimalist-earrings-guide', 3)
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
