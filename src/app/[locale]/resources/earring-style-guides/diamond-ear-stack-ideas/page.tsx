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
  title: 'Diamond Ear Stack Ideas',
  description:
    'Explore diamond ear stack ideas with studs, huggies, hoops, drops and lab grown diamond earrings for everyday, wedding and party looks.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-69.jpg',
  title: 'Diamond Ear Stack Ideas:',
  subtitle: 'Everyday, Minimalist, Wedding & Party Looks',
  paragraphs: [
    'A diamond ear stack is a styled combination of diamond earrings worn together across one or more piercings. It can be soft and minimal with a small stud and huggie, or more noticeable with hoops, drops and one bold statement earring.',
    'The best diamond ear stack does not need to be complicated. It should feel balanced, comfortable and intentional. One earring should usually lead the look, while the others add shape, sparkle or softness.',
    'This resource gives practical diamond ear stack ideas for everyday wear, work outfits, minimalist styling, wedding guest looks, party outfits and gift sets. It also connects each styling direction to IWantJewels products such as Cadenza S, Cadenza M, Amadea Huggie, Laluce, Pave Hoops, Farfalla, Alidi Farfalla, Orsola, Concetta Short, Concetta Long and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Diamond Ear Stack Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Find diamond ear stack ideas by style and occasion',
    'Build simple, balanced and statement ear stacks',
    'Choose which earring should go in the first, second or third piercing',
    'Pair studs, huggies, hoops, drops, butterfly earrings and bold statement earrings',
    'Create everyday, minimalist, wedding guest, party and romantic ear stacks',
    'Choose stackable IWantJewels products that work together',
    'Plan image blocks, model visuals, product modules and CTA placements',
    'Build internal links between styling guides, product pages and shop categories',
  ],
  image: '/blog-images/blog-image-62.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Diamond Ear Stack Idea Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main styling tool.' },
      {
        type: 'table',
        headers: ['Stack Style', 'Main Piece', 'Supporting Piece', 'Best IWJ Direction'],
        rows: [
          ['Simple everyday stack', 'Small diamond stud', 'Huggie', 'Cadenza S + Amadea Huggie'],
          ['Minimalist stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Classic diamond stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Modern huggie stack', 'Huggie', 'Small stud', 'Amadea + Cadenza S'],
          ['Hoop stack', 'Pave hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Romantic stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Wedding guest stack', 'Drop earring', 'Small stud or huggie', 'Orsola + Cadenza S or Amadea'],
          ['Soft occasion stack', 'Short drop', 'Minimalist earring', 'Concetta Short + Laluce'],
          ['Formal evening stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Party stack', 'Bold statement earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'Simple Everyday Diamond Ear Stack',
    content: [
      { type: 'paragraph', text: 'A simple everyday diamond ear stack should feel easy, comfortable and repeatable. It should work with casual outfits, workwear, travel looks, simple dresses and weekend styling.' },
      { type: 'paragraph', text: 'The easiest everyday stack is a small diamond stud with a huggie. The stud adds sparkle, while the huggie adds shape. This combination feels styled without becoming too heavy.' },
      {
        type: 'table',
        headers: ['Position', 'Earring Direction', 'IWJ Product Direction'],
        rows: [
          ['First piercing', 'Small diamond stud', 'Cadenza S'],
          ['Second piercing', 'Huggie', 'Amadea Huggie'],
          ['Optional third piercing', 'Minimalist detail', 'Laluce'],
        ],
      },
      { type: 'paragraph', text: 'Cadenza S with Amadea Huggie is the cleanest everyday combination. If the wearer wants a softer finish, Laluce can be added as a small supporting detail.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Minimalist Diamond Ear Stack',
    content: [
      { type: 'paragraph', text: 'A minimalist diamond ear stack should look soft, clean and polished. It should not feel crowded or overly decorated.' },
      { type: 'paragraph', text: 'The best minimalist stacks usually use small earrings, simple shapes and one metal colour. Avoid mixing too many large pieces or several different design themes.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-73.jpg',
        content: [
          {
            type: 'table',
            headers: ['Minimalist Stack Idea', 'Product Combination', 'Why It Works'],
            rows: [
              ['Soft sparkle stack', 'Cadenza S + Laluce', 'Clean and quiet'],
              ['Minimal huggie stack', 'Cadenza S + Amadea', 'Adds shape without heaviness'],
              ['Tiny layered stack', 'Laluce + Cadenza S', 'Very subtle and wearable'],
              ['Minimal workwear stack', 'Cadenza S + Laluce + Amadea', 'Polished but not loud'],
              ['Simple gift stack', 'Cadenza S + Laluce', 'Safe for minimal jewellery lovers'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For minimalist styling, Cadenza S should usually be the starting point. Laluce adds softness, while Amadea adds a modern close-fitting shape.' },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Classic Diamond Stud Stack',
    content: [
      { type: 'paragraph', text: 'A classic diamond stud stack is built around studs rather than hoops or drops. It is one of the safest ear stack ideas because it feels timeless and easy to wear.' },
      { type: 'paragraph', text: 'The main rule is to place the more visible stud in the first piercing and the smaller stud in the second or third piercing. This creates a clean size gradient.' },
      {
        type: 'table',
        headers: ['Stud Stack Style', 'Product Combination', 'Best For'],
        rows: [
          ['Classic daily stud stack', 'Cadenza M + Cadenza S', 'More visible sparkle with balance'],
          ['Small stud stack', 'Cadenza S + Laluce', 'Subtle daily wear'],
          ['Giftable stud stack', 'Cadenza M + Laluce', 'Classic gift with soft detail'],
          ['Workwear stud stack', 'Cadenza S + Cadenza M', 'Polished office styling'],
          ['Wedding guest stud stack', 'Cadenza M + Cadenza S', 'Elegant but not too bold'],
        ],
      },
      { type: 'paragraph', text: 'Cadenza M works well as the main stud because it has more presence. Cadenza S works well as the smaller support piece.' },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Huggie and Stud Diamond Ear Stack',
    content: [
      { type: 'paragraph', text: 'A huggie and stud stack is one of the most wearable modern ear stack ideas.' },
      { type: 'paragraph', text: 'The stud brings diamond sparkle, and the huggie creates shape around the ear. This works well for everyday wear, second piercings, workwear, travel and casual styling.' },
      {
        type: 'table',
        headers: ['Huggie Stack Idea', 'Product Combination', 'Styling Note'],
        rows: [
          ['Simple huggie stack', 'Cadenza S + Amadea', 'Best everyday stack'],
          ['Visible huggie stack', 'Cadenza M + Amadea', 'More sparkle but still wearable'],
          ['Minimal huggie stack', 'Laluce + Amadea', 'Soft and modern'],
          ['Giftable huggie stack', 'Cadenza S + Amadea', 'Easy two-piece gift'],
          ['Wedding huggie stack', 'Cadenza M + Amadea', 'Good when outfit already has detail'],
        ],
      },
      { type: 'paragraph', text: 'Amadea Huggie earrings are the main huggie recommendation for this page. They can sit with a small stud for a light stack or with Cadenza M for more visible sparkle.' },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Hoop and Diamond Stud Stack',
    content: [
      { type: 'paragraph', text: 'A hoop and diamond stud stack gives more shape than a simple stud stack. It is good for shoppers who want the ear to look styled but still wearable.' },
      { type: 'paragraph', text: 'Pave Hoops can act as the main piece, while Cadenza S or Laluce can support the look. If the hoop is more visible, keep the other earrings smaller.' },
      {
        type: 'table',
        headers: ['Hoop Stack Idea', 'Product Combination', 'Best For'],
        rows: [
          ['Everyday hoop stack', 'Pave Hoops + Cadenza S', 'Casual sparkle'],
          ['Minimal hoop stack', 'Pave Hoops + Laluce', 'Clean and modern'],
          ['Party hoop stack', 'Pave Hoops + Cadenza M', 'More visible sparkle'],
          ['Weekend stack', 'Pave Hoops + Amadea', 'More shape-led styling'],
          ['Black dress stack', 'Pave Hoops + Cadenza S', 'Simple contrast and shine'],
        ],
      },
      { type: 'see-also', text: 'Hoop vs huggie earrings', href: '#' },
    ],
  },
  {
    heading: 'Romantic Butterfly Ear Stack',
    content: [
      { type: 'paragraph', text: 'A romantic ear stack uses softer shapes and more personal details. Butterfly earrings work well here because they add meaning, not just sparkle.' },
      { type: 'paragraph', text: 'Farfalla butterfly earrings or Alidi Farfalla butterfly earrings can become the focal point of the stack. Pair them with a small stud or minimalist earring so the butterfly design stays clear.' },
      {
        type: 'table',
        headers: ['Romantic Stack Idea', 'Product Combination', 'Best For'],
        rows: [
          ['Soft butterfly stack', 'Farfalla + Cadenza S', 'Everyday romantic styling'],
          ['Giftable butterfly stack', 'Alidi Farfalla + Cadenza S', 'Birthday or anniversary gift'],
          ['Minimal romantic stack', 'Farfalla + Laluce', 'Soft and subtle'],
          ['Pastel outfit stack', 'Alidi Farfalla + Laluce', 'Feminine styling'],
          ['Wedding romantic stack', 'Farfalla + Cadenza S or Concetta Short', 'Soft wedding guest look'],
        ],
      },
      { type: 'paragraph', text: 'Butterfly stacks are especially useful for birthdays, anniversaries, bridesmaid gifts, romantic gifts and outfits with soft colours, florals or satin.' },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Wedding Guest Diamond Ear Stack',
    content: [
      { type: 'paragraph', text: 'Wedding guest ear stacks should feel elegant, polished and balanced. They should not look too bridal or too crowded.' },
      { type: 'paragraph', text: 'If the outfit is detailed, use studs and huggies. If the outfit is simple, use a drop earring as the main piece. If the outfit is romantic, use butterfly earrings or a soft drop.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-75.jpg',
        content: [
          {
            type: 'table',
            headers: ['Wedding Guest Look', 'Product Combination', 'Why It Works'],
            rows: [
              ['Detailed dress', 'Cadenza M + Amadea', 'Sparkle without overcrowding'],
              ['Simple satin dress', 'Orsola + Cadenza S', 'Adds movement and polish'],
              ['Romantic floral dress', 'Farfalla + Cadenza S', 'Soft and feminine'],
              ['Black dress', 'Orsola or Lusso + Cadenza S', 'Strong contrast and sparkle'],
              ['Pastel dress', 'Alidi Farfalla + Laluce', 'Soft and romantic'],
              ['Formal outfit', 'Concetta Long + Cadenza S', 'Elongated and refined'],
              ['Bridesmaid look', 'Cadenza S + Concetta Short', 'Delicate and wearable'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Party Diamond Ear Stack',
    content: [
      { type: 'paragraph', text: 'A party diamond ear stack can be stronger, but it still needs balance.' },
      { type: 'paragraph', text: 'The best party stacks usually have one bold piece and one small support piece. If every earring is large, the stack can look messy. Let the main earring lead.' },
      {
        type: 'table',
        headers: ['Party Stack Idea', 'Product Combination', 'Styling Note'],
        rows: [
          ['Bold party stack', 'Lusso + Cadenza S', 'Let Lusso lead'],
          ['Elegant party stack', 'Orsola + Cadenza S', 'Adds movement without heaviness'],
          ['Hoop party stack', 'Pave Hoops + Cadenza M', 'More shape and sparkle'],
          ['Black dress stack', 'Lusso + Laluce', 'Strong but balanced'],
          ['Dinner-to-party stack', 'Cadenza M + Amadea', 'Polished and wearable'],
          ['Formal party stack', 'Concetta Long + Cadenza S', 'Refined and elongated'],
        ],
      },
      { type: 'paragraph', text: 'Lusso bold statement earrings should usually be the main piece. Pair with Cadenza S or Laluce so the ear does not look too crowded.' },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Workwear Diamond Ear Stack',
    content: [
      { type: 'paragraph', text: 'A workwear ear stack should feel polished, simple and not distracting.' },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are best for work because they sit close to the ear and feel comfortable for long hours. Avoid long drops or bold statement earrings unless the workplace styling allows more expressive jewellery.' },
      {
        type: 'table',
        headers: ['Workwear Stack Idea', 'Product Combination', 'Best For'],
        rows: [
          ['Classic office stack', 'Cadenza S + Laluce', 'Minimal workwear'],
          ['Polished office stack', 'Cadenza M + Amadea', 'More visible but still clean'],
          ['Modern office stack', 'Amadea + Cadenza S', 'Huggie-led styling'],
          ['Minimal office stack', 'Laluce + Cadenza S', 'Quiet, soft styling'],
          ['Day-to-dinner stack', 'Cadenza M + Orsola', 'For plans after work'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Giftable Diamond Ear Stack Set',
    content: [
      { type: 'paragraph', text: 'A diamond ear stack can make a thoughtful gift because it gives the recipient a ready-made styling combination.' },
      { type: 'paragraph', text: 'This works especially well if the recipient already has multiple piercings or likes modern jewellery. If you are not sure, start with a stud and huggie combination because it is the safest.' },
      {
        type: 'table',
        headers: ['Gift Type', 'Stack Combination', 'Best For'],
        rows: [
          ['Safe starter gift', 'Cadenza S + Amadea', 'First ear stack gift'],
          ['Classic diamond gift', 'Cadenza M + Cadenza S', 'Timeless sparkle'],
          ['Minimalist gift', 'Cadenza S + Laluce', 'Quiet jewellery lover'],
          ['Romantic gift', 'Farfalla + Cadenza S', 'Birthday or anniversary'],
          ['Modern gift', 'Amadea + Pave Hoops', 'Hoop and huggie lover'],
          ['Bridesmaid gift', 'Cadenza S + Concetta Short', 'Wedding-related gift'],
          ['Party gift', 'Lusso + Cadenza S', 'Bold jewellery lover'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Ear Stack Ideas by Piercing Count',
    content: [
      { type: 'paragraph', text: 'The number of piercings changes how much you can stack.' },
      {
        type: 'table',
        headers: ['Piercing Count', 'Best Stack Direction', 'Product Direction'],
        rows: [
          ['One piercing', 'Choose one strong piece', 'Cadenza M, Pave Hoops, Orsola'],
          ['Two piercings', 'Main piece + small support', 'Cadenza M + Cadenza S, Cadenza S + Amadea'],
          ['Three piercings', 'Main + shape + soft detail', 'Cadenza M + Amadea + Laluce'],
          ['Multiple piercings', 'One focal piece with smaller support', 'Orsola + Cadenza S + Laluce'],
          ['No second piercing', 'Use one earring style with strong design', 'Pave Hoops, Farfalla, Lusso'],
        ],
      },
      { type: 'paragraph', text: 'If you only have one piercing, you can still create a strong earring look. Choose a stud, hoop, butterfly earring, drop or bold statement earring based on the occasion.' },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Ear Stack Ideas by Outfit',
    content: [
      { type: 'paragraph', text: 'Outfit style should guide the ear stack.' },
      {
        type: 'table',
        headers: ['Outfit', 'Best Ear Stack Idea', 'Product Direction'],
        rows: [
          ['White shirt and jeans', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Blazer outfit', 'Medium stud + huggie', 'Cadenza M + Amadea'],
          ['Black dress', 'Drop or statement + small stud', 'Orsola or Lusso + Cadenza S'],
          ['Satin dress', 'Drop + minimal stud', 'Orsola + Laluce'],
          ['Floral dress', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Minimal dress', 'Hoop or drop + small detail', 'Pave Hoops or Orsola + Laluce'],
          ['Wedding guest outfit', 'Drop, stud or butterfly stack', 'Orsola, Cadenza M, Farfalla'],
          ['Party outfit', 'Bold earring + subtle support', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Metal Colour Tips for Diamond Ear Stacks',
    content: [
      { type: 'paragraph', text: 'A diamond ear stack usually looks more polished when the metal colour is consistent.' },
      { type: 'paragraph', text: 'Yellow gold gives a warm and classic look. White or silver tones feel clean and modern. Rose gold feels soft and romantic. Mixed metals can work, but they should look intentional.' },
      {
        type: 'table',
        headers: ['Metal Direction', 'Best For', 'Style Feeling'],
        rows: [
          ['Yellow gold stack', 'Everyday outfits, warm wardrobes, classic styling', 'Warm and polished'],
          ['White or silver stack', 'Minimal outfits, cool wardrobes, modern styling', 'Clean and bright'],
          ['Rose gold stack', 'Romantic outfits and gift styling', 'Soft and feminine'],
          ['Mixed metal stack', 'Creative styling', 'Modern and playful'],
        ],
      },
      { type: 'paragraph', text: 'For gifts, choose the metal colour the recipient already wears most often. For your own stack, choose the finish that fits your daily jewellery wardrobe.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Product Pathways by Stack Style',
    content: [
      { type: 'subheading', text: 'For a Simple Everyday Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs with Amadea Huggie earrings. This is the easiest diamond ear stack to wear daily.' },
      { type: 'subheading', text: 'For a Minimalist Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S with Laluce minimalist diamond earrings. This gives soft sparkle without making the ear feel busy.' },
      { type: 'subheading', text: 'For a Classic Diamond Stack' },
      { type: 'paragraph', text: 'Choose Cadenza M with Cadenza S. This creates a clean diamond stud stack with size balance.' },
      { type: 'subheading', text: 'For a Romantic Stack' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings with Cadenza S. This works well for soft outfits, birthdays and symbolic gifts.' },
      { type: 'subheading', text: 'For a Wedding Guest Stack' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings with Cadenza S for simple dresses, or Cadenza M with Amadea for detailed outfits.' },
      { type: 'subheading', text: 'For a Party Stack' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings with Cadenza S. Keep the supporting piece small so Lusso can lead the look.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Ear Stack Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Small sparkle point', 'Works in first, second or supporting piercings'],
          ['Cadenza M diamond stud earrings', 'Main stud', 'More visible diamond sparkle'],
          ['Amadea Huggie earrings', 'Shape piece', 'Strong for everyday stacks'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Keeps stacks clean and subtle'],
          ['Pave Hoops', 'Main hoop piece', 'Adds shape and sparkle'],
          ['Farfalla butterfly earrings', 'Romantic focal piece', 'Adds meaning and softness'],
          ['Alidi Farfalla butterfly earrings', 'Giftable romantic piece', 'Strong for birthdays and anniversaries'],
          ['Orsola drop earrings', 'Occasion focal piece', 'Adds movement for weddings and dinners'],
          ['Concetta Short earrings', 'Soft drop piece', 'Works for gentle occasion stacks'],
          ['Concetta Long earrings', 'Formal drop piece', 'Creates a refined evening line'],
          ['Lusso bold statement earrings', 'Party focal piece', 'Best when the rest of the stack is simple'],
        ],
      },
      { type: 'paragraph', text: 'Choose your ear stack by mood. Start with Cadenza S and Amadea for everyday styling, Cadenza S and Laluce for minimal looks, Farfalla and Cadenza S for romantic styling, Orsola and Cadenza S for weddings, or Lusso and Cadenza S for parties.' },
    ],
  },
  {
    heading: 'Common Diamond Ear Stack Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is making every earring the same size. A good ear stack needs size difference so the look feels balanced.' },
      { type: 'paragraph', text: 'Another mistake is using too many focal pieces. A bold earring, drop earring and large hoop together can make the ear look crowded.' },
      { type: 'paragraph', text: 'A third mistake is forgetting comfort. If the stack pulls, catches on hair or feels heavy, it will not be worn often.' },
      { type: 'paragraph', text: 'Another mistake is mixing metal colours without intention. Mixed metals can work, but matching metals is easier for a polished look.' },
      { type: 'paragraph', text: 'Finally, do not buy earrings only because they look good separately. They should also work together as a stack.' },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Final Diamond Ear Stack Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing a diamond ear stack, ask:' },
      {
        type: 'bullet-list',
        items: [
          'How many piercings do I have?',
          'Which earring is the main piece?',
          'Which earring adds shape?',
          'Which earring adds soft detail?',
          'Are the earring sizes balanced?',
          'Does the metal colour feel intentional?',
          'Is the stack comfortable for the occasion?',
          'Does it match my outfit?',
          'Is this for everyday wear, work, a wedding, party or gift?',
          'Can the earrings be worn separately too?',
          'Are the earrings easy to clean and store?',
          'Does the full stack feel polished instead of crowded?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with a small stud and huggie. That is the simplest diamond ear stack idea and the easiest to wear.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  {
    question: 'What is a diamond ear stack?',
    answer: 'A diamond ear stack is a combination of diamond earrings worn together across one or more piercings. It can include studs, huggies, hoops, drops and small statement earrings.',
  },
  {
    question: 'What earrings are best for a diamond ear stack?',
    answer: 'Studs, huggies, hoops and minimalist earrings are best for most diamond ear stacks. Drops and statement earrings can work when they are used as the main piece.',
  },
  {
    question: 'What is the easiest diamond ear stack?',
    answer: 'The easiest diamond ear stack is a small diamond stud with a huggie. It is comfortable, balanced and easy to wear every day.',
  },
  {
    question: 'How do you make an ear stack look balanced?',
    answer: 'Choose one main earring, one supporting shape and one smaller detail. Avoid making every earring large or equally bold.',
  },
  {
    question: 'Can you wear hoops in an ear stack?',
    answer: 'Yes, hoops work well in an ear stack. Pair a hoop with a smaller stud or minimalist earring so the hoop can lead the look.',
  },
  {
    question: 'Can you wear drop earrings in an ear stack?',
    answer: 'Yes, but the drop earring should usually be the main piece. Keep the other earrings smaller.',
  },
  {
    question: 'Can you wear butterfly earrings in an ear stack?',
    answer: 'Yes, butterfly earrings can be used as a romantic focal piece. Pair them with small studs or minimalist earrings.',
  },
  {
    question: 'What diamond ear stack is best for everyday wear?',
    answer: 'A small diamond stud with a huggie is best for everyday wear. Cadenza S with Amadea Huggie is a strong IWantJewels direction.',
  },
  {
    question: 'What diamond ear stack is best for weddings?',
    answer: 'For weddings, choose an elegant focal piece like Orsola drop earrings with a small stud, or Cadenza M with Amadea if the outfit already has detail.',
  },
  {
    question: 'Can a diamond ear stack be a gift?',
    answer: 'Yes, a diamond ear stack set can be a thoughtful gift, especially a stud and huggie combination or a butterfly earring with a small diamond stud.',
  },
]

const cta: V2CTABlock = {
  heading: 'Diamond ear stacks work best when they feel balanced, wearable and intentional. Start with one main earring, add one supporting shape, and keep the smallest detail soft. For everyday wear, choose studs and huggies. For weddings, choose drops with small support earrings. For parties, let one bold piece lead.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want stackable pieces with real diamond sparkle. Choose Cadenza S and Amadea for a simple daily stack, Cadenza S and Laluce for a minimalist stack, Farfalla and Cadenza S for a romantic stack, Orsola and Cadenza S for weddings, or Lusso and Cadenza S for party styling.',
  primaryLabel: 'Shop Diamond Ear Stack Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Huggie Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read How to Stack Earrings',
  tertiaryHref: '/resources/earring-style-guides/how-to-stack-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'diamond-ear-stack-ideas')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'diamond-ear-stack-ideas', 3)
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
