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
  title: 'Hoop vs Huggie Earrings: Which Is Better?',
  description:
    'Compare hoop and huggie earrings for everyday wear, ear stacks, gifts, workwear, parties and lab grown diamond styling.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-16.jpg',
  title: 'Hoop vs Huggie Earrings:',
  subtitle: 'Which Style Should You Choose?',
  paragraphs: [
    'Hoop earrings and huggie earrings both add shape to the ear, but they do not create the same look. Hoops are usually more visible and create a stronger circular shape, while huggies are smaller, closer-fitting earrings that hug the earlobe.',
    'If you want a clean everyday earring that feels modern and easy to stack, huggies are usually the safer choice. If you want more shape, movement and visibility, hoops may be better. Both styles can work beautifully with lab-grown diamond earrings, especially when they are balanced with studs or minimalist pieces.',
    'This resource helps shoppers compare hoops and huggies by size, comfort, styling, gifting, workwear, ear stacking, occasions and outfit use. It also guides users toward IWantJewels pieces such as Amadea Huggie earrings, Pave Hoops, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Laluce minimalist diamond earrings, Orsola drop earrings and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Hoop and Huggie Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Understand the difference between hoop earrings and huggie earrings',
    'Decide whether hoops or huggies are better for everyday wear',
    'Choose earrings for ear stacks, workwear, gifts, weddings and parties',
    'Learn when huggies look better than hoops',
    'Learn when hoops look better than huggies',
    'Build simple hoop, huggie and stud combinations',
    'Find IWantJewels product recommendations by styling need',
    'Plan image blocks, product modules, CTA sections and internal links for this page',
  ],
  image: '/blog-images/blog-image-77.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Hoop vs Huggie Earrings Comparison',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main comparison tool.' },
      {
        type: 'table',
        headers: ['Feature', 'Hoop Earrings', 'Huggie Earrings'],
        rows: [
          ['Shape', 'Circular or curved earring, often more visible', 'Small close-fitting hoop that hugs the earlobe'],
          ['Size feeling', 'Can be small, medium or bold', 'Usually small and close to the ear'],
          ['Style feeling', 'Classic, stylish, more noticeable', 'Modern, neat, easy and stackable'],
          ['Best for', 'Casual styling, parties, simple outfits, hoop-led looks', 'Everyday wear, ear stacks, second piercings, modern minimal styling'],
          ['Comfort', 'Depends on size and weight', 'Usually comfortable when fit is right'],
          ['Ear stack use', 'Works best as a main shape piece', 'Works well as a supporting shape piece'],
          ['Gift safety', 'Good if recipient likes hoops', 'Safer if recipient likes subtle modern jewellery'],
          ['Workwear use', 'Good if small/refined', 'Very strong if close-fitting'],
          ['Occasion use', 'Strong for parties and modern outfits', 'Strong for daily, modern and understated occasion looks'],
          ['Best IWJ direction', 'Pave Hoops', 'Amadea Huggie'],
        ],
      },
      { type: 'paragraph', text: 'Hoops are better when you want the earring shape to show. Huggies are better when you want a cleaner, closer and more stackable shape.' },
    ],
  },
  {
    heading: 'What Are Hoop Earrings?',
    content: [
      { type: 'paragraph', text: 'Hoop earrings are circular or curved earrings that create visible shape around or below the earlobe. They can be small and subtle, medium and polished, or large and bold depending on the design.' },
      { type: 'paragraph', text: 'Hoops are useful when shoppers want earrings that feel more styled than studs. They can make a simple outfit look more complete, especially with casual outfits, black dresses, blazers, slick hairstyles, weekend styling and party looks.' },
      { type: 'paragraph', text: 'At IWantJewels, Pave Hoops are the strongest hoop direction. They add shape and sparkle while still working with modern demi-fine styling. They can be worn alone as the main earring or paired with small studs like Cadenza S for a balanced ear stack.' },
      { type: 'see-also', text: 'Lab-grown diamond hoop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },
  {
    heading: 'What Are Huggie Earrings?',
    content: [
      { type: 'paragraph', text: 'Huggie earrings are small hoop-style earrings that sit close to the earlobe. They are called huggies because they appear to hug the ear.' },
      { type: 'paragraph', text: 'Huggies are usually easier to wear every day than larger hoops because they sit closer, feel neater and work well with other earrings. They are especially useful for second piercings, ear stacks and modern minimalist styling.' },
      { type: 'paragraph', text: 'At IWantJewels, Amadea Huggie earrings are the strongest huggie recommendation. They work alone for a clean daily look, or they can be paired with Cadenza S, Cadenza M or Laluce for a simple ear stack.' },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },
  {
    heading: 'Which Is Better for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Huggies are usually better for everyday wear if you want something close-fitting, comfortable and easy to repeat. Hoops are better if you want your daily earrings to feel more visible and shape-led.' },
      { type: 'paragraph', text: 'For daily use, the best choice depends on how much you want the earrings to show. If you want a subtle modern look, choose huggies. If you want your earrings to become part of the outfit, choose hoops.' },
      {
        type: 'table',
        headers: ['Daily Wear Need', 'Better Choice', 'IWJ Product Direction'],
        rows: [
          ['Simple daily styling', 'Huggies', 'Amadea Huggie'],
          ['Close-fitting comfort', 'Huggies', 'Amadea'],
          ['More visible shape', 'Hoops', 'Pave Hoops'],
          ['Ear stack styling', 'Huggies with studs', 'Amadea + Cadenza S'],
          ['Casual outfit polish', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Travel jewellery', 'Huggies or studs', 'Amadea, Cadenza S'],
          ['Work-to-weekend styling', 'Huggies or small hoops', 'Amadea, Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },
  {
    heading: 'Which Is Better for Ear Stacks?',
    content: [
      { type: 'paragraph', text: 'Huggies are usually easier to use in ear stacks because they sit close to the ear and do not take up too much space. Hoops can still work beautifully, but they often become the main shape in the stack.' },
      { type: 'paragraph', text: 'A good ear stack should usually have one main piece, one shape piece and one soft detail. Huggies are excellent shape pieces. Hoops can be the main piece when you want the circular shape to stand out.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-79.jpg',
        content: [
          {
            type: 'table',
            headers: ['Ear Stack Style', 'Hoop Role', 'Huggie Role', 'Product Direction'],
            rows: [
              ['Simple daily stack', 'Optional', 'Shape piece', 'Cadenza S + Amadea'],
              ['More visible stack', 'Main shape', 'Optional support', 'Pave Hoops + Cadenza S'],
              ['Minimal stack', 'Usually not needed', 'Soft shape', 'Amadea + Laluce'],
              ['Modern stack', 'Main or support', 'Strong support', 'Pave Hoops or Amadea + Cadenza S'],
              ['Party stack', 'Main shape', 'Support or optional', 'Pave Hoops + Cadenza M'],
              ['Giftable starter stack', 'Optional', 'Strong choice', 'Cadenza S + Amadea'],
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
      { type: 'paragraph', text: 'Huggies are usually safer for workwear because they sit close to the ear and look polished without feeling distracting. Small hoops can also work well if the outfit is simple and the hoop design is refined.' },
      { type: 'paragraph', text: 'For traditional office styling, choose huggies or studs. For creative office styling, hoops can add personality while still feeling polished. If the workplace look is minimal, Amadea Huggie earrings or Cadenza S studs are the safest direction.' },
      {
        type: 'table',
        headers: ['Workwear Style', 'Better Choice', 'Product Direction'],
        rows: [
          ['Classic office look', 'Huggies or studs', 'Amadea, Cadenza S'],
          ['Minimal workwear', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Modern office styling', 'Huggies', 'Amadea'],
          ['Creative workwear', 'Small hoops', 'Pave Hoops'],
          ['Blazer outfit', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Day-to-dinner styling', 'Hoops or medium studs', 'Pave Hoops, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Minimalist earrings guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },
  {
    heading: 'Which Is Better for Gifts?',
    content: [
      { type: 'paragraph', text: 'Huggies are usually safer than hoops if you are not fully sure of the recipient\'s style. Hoops are a better gift when you know the person already likes hoop earrings or slightly more visible jewellery.' },
      { type: 'paragraph', text: 'Huggies feel modern but still wearable. They are a strong gift for someone who likes ear stacks, small hoops or everyday jewellery. Hoops feel more expressive and are better for someone who likes earrings that show more.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Better Choice', 'IWJ Product Direction'],
        rows: [
          ['Safe modern gift', 'Huggies', 'Amadea Huggie'],
          ['First ear stack gift', 'Huggies + studs', 'Amadea + Cadenza S'],
          ['Hoop lover gift', 'Hoops', 'Pave Hoops'],
          ['Minimalist gift', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Birthday gift', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Bridesmaid gift', 'Huggies or studs', 'Amadea, Cadenza S'],
          ['Party-loving recipient', 'Hoops', 'Pave Hoops'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Which Is Better for Sensitive Ears?',
    content: [
      { type: 'paragraph', text: 'For sensitive ears, the better choice is the style that is lightweight, comfortable, easy to clean and not too tight.' },
      { type: 'paragraph', text: 'Huggies can be comfortable, but the closure and inner curve should be kept clean. Hoops can also work, but larger hoops may move more or pull slightly depending on weight. If the wearer is very sensitive, small studs may still be the safest starting point.' },
      { type: 'paragraph', text: 'At IWantJewels, the earrings use 925 sterling silver with 14kt gold plating and lab-grown diamonds. This gives a clearer demi-fine material direction than many low-cost fashion earrings, but comfort still depends on fit, skin sensitivity and care.' },
      {
        type: 'table',
        headers: ['Sensitive-Ear Need', 'Better Direction', 'Product Direction'],
        rows: [
          ['Safest start', 'Studs', 'Cadenza S'],
          ['Close-fitting modern shape', 'Huggies', 'Amadea'],
          ['Minimal daily wear', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['More visible shape', 'Small hoops', 'Pave Hoops'],
          ['Ear stack for sensitive ears', 'Small stud + huggie', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Is 925 sterling silver hypoallergenic?', href: '/resources/demi-fine-jewellery-guides/is-925-sterling-silver-hypoallergenic' },
    ],
  },
  {
    heading: 'Which Is Better for Weddings and Occasions?',
    content: [
      { type: 'paragraph', text: 'Hoops are often better when you want the earrings to be visible in the outfit. Huggies are better when the look should stay subtle, modern and close to the ear.' },
      { type: 'paragraph', text: 'For wedding guest outfits, hoops can work well with simple dresses, jumpsuits, black dresses and sleek hairstyles. Huggies work better when the outfit already has detail or when the jewellery should feel understated.' },
      { type: 'paragraph', text: 'If the outfit needs movement, drop earrings may be better than both hoops and huggies. In that case, Orsola or Concetta Short can lead the look.' },
      {
        type: 'table',
        headers: ['Occasion Look', 'Best Choice', 'Product Direction'],
        rows: [
          ['Simple wedding guest dress', 'Hoops or drops', 'Pave Hoops, Orsola'],
          ['Detailed wedding outfit', 'Huggies or studs', 'Amadea, Cadenza S'],
          ['Bridesmaid look', 'Huggies or studs', 'Amadea, Cadenza S'],
          ['Modern party outfit', 'Hoops', 'Pave Hoops'],
          ['Minimal occasion look', 'Huggies', 'Amadea'],
          ['Black dress', 'Hoops, drops or bold sparkle', 'Pave Hoops, Orsola, Lusso'],
          ['Dinner outfit', 'Hoops or huggies', 'Pave Hoops, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Hoops and Huggies by Outfit',
    content: [
      { type: 'paragraph', text: 'Outfit style can help shoppers decide whether hoops or huggies are better.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-81.jpg',
        content: [
          {
            type: 'table',
            headers: ['Outfit', 'Choose Hoops If', 'Choose Huggies If'],
            rows: [
              ['White shirt and jeans', 'You want the earrings to show more', 'You want a cleaner everyday look'],
              ['Blazer outfit', 'You want creative polish', 'You want a refined office look'],
              ['Black dress', 'You want shape or party sparkle', 'You want understated styling'],
              ['Satin dress', 'You want shine and shape', 'You want soft modern balance'],
              ['Floral dress', 'You want contrast', 'You want the outfit to stay soft'],
              ['Knitwear', 'You want earrings to stand out', 'You want simple daily shape'],
              ['Wedding guest outfit', 'The outfit is simple', 'The outfit already has detail'],
              ['Travel outfit', 'You want one styled earring', 'You want comfort and ease'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Hoops and Huggies by Piercing Position',
    content: [
      { type: 'paragraph', text: 'Hoops and huggies can both work in different piercing positions, but their role changes.' },
      {
        type: 'table',
        headers: ['Piercing Position', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['First piercing', 'Hoop, huggie, stud or drop', 'Pave Hoops, Amadea, Cadenza M, Orsola'],
          ['Second piercing', 'Huggie or small stud', 'Amadea, Cadenza S'],
          ['Third piercing', 'Small stud or minimalist detail', 'Cadenza S, Laluce'],
          ['Single piercing', 'Hoop or huggie depending on style', 'Pave Hoops or Amadea'],
          ['Multiple piercings', 'Hoop as main, huggie or stud as support', 'Pave Hoops + Cadenza S or Amadea'],
        ],
      },
      { type: 'paragraph', text: 'Huggies are usually easier for second piercings. Hoops usually work better in the first piercing because they need more visual space.' },
      { type: 'see-also', text: 'How to stack earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },
  {
    heading: 'Product Pathways by Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest Modern Everyday Earring' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They sit close to the ear, feel modern and work well alone or in an ear stack.' },
      { type: 'subheading', text: 'For a More Visible Hoop Look' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They give more shape and sparkle than a huggie, making them better for casual outfits, parties and simple dresses.' },
      { type: 'subheading', text: 'For a Simple Hoop or Huggie Ear Stack' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea for a close-fitting daily stack, or Cadenza S with Pave Hoops if you want the hoop to lead.' },
      { type: 'subheading', text: 'For a Minimalist Stack' },
      { type: 'paragraph', text: 'Choose Amadea with Laluce. This keeps the ear clean, soft and modern.' },
      { type: 'subheading', text: 'For Gifts' },
      { type: 'paragraph', text: 'Choose Amadea if you want a safer modern gift. Choose Pave Hoops if you know the recipient likes hoops or more visible earrings.' },
      { type: 'subheading', text: 'For Occasion Styling' },
      { type: 'paragraph', text: 'Choose Pave Hoops for modern party outfits, or Orsola drop earrings if the outfit needs more movement than hoops or huggies can provide.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Role', 'Why It Works'],
        rows: [
          ['Amadea Huggie earrings', 'Best huggie choice', 'Modern, close-fitting and stackable'],
          ['Pave Hoops', 'Best hoop choice', 'Adds shape and sparkle'],
          ['Cadenza S lab-grown diamond studs', 'Best support piece', 'Pairs well with huggies or hoops'],
          ['Cadenza M diamond stud earrings', 'More visible stud alternative', 'Good if shopper wants sparkle without hoop shape'],
          ['Laluce minimalist diamond earrings', 'Soft detail', 'Supports minimalist huggie stacks'],
          ['Farfalla butterfly earrings', 'Romantic alternative', 'Better when shopper wants meaning'],
          ['Orsola drop earrings', 'Occasion alternative', 'Better when outfit needs movement'],
          ['Lusso bold statement earrings', 'Party alternative', 'Better when earrings should lead the full look'],
        ],
      },
      { type: 'paragraph', text: 'Choose huggies if you want a close-fitting modern earring for everyday wear and ear stacks. Choose hoops if you want more shape, visibility and outfit impact. For the easiest IWantJewels stack, pair Amadea Huggie earrings with Cadenza S lab-grown diamond studs.' },
    ],
  },
  {
    heading: 'Common Hoop vs Huggie Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is thinking huggies and hoops are exactly the same. Huggies are usually smaller and sit closer to the earlobe, while hoops are often more visible.' },
      { type: 'paragraph', text: 'Another mistake is choosing hoops for someone who prefers very subtle jewellery. In that case, huggies or studs may be safer.' },
      { type: 'paragraph', text: 'A third mistake is wearing large hoops in every piercing. Hoops usually need space, so it is better to let one hoop lead and keep supporting earrings small.' },
      { type: 'paragraph', text: 'Another mistake is choosing huggies that are too tight. Huggies should sit close, but they should not pinch.' },
      { type: 'paragraph', text: 'Finally, do not choose only by shape. Comfort, closure, size, material, metal colour and care routine all matter.' },
      { type: 'see-also', text: 'Stud vs huggie earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },
  {
    heading: 'Final Buying Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing between hoops and huggies, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Do I want close-fitting shape or more visible shape?',
          'Is this for everyday wear, workwear, gifts, parties or ear stacks?',
          'Do I already own studs to pair with the earrings?',
          'Do I want the earring to be the main piece or a supporting piece?',
          'Does the recipient already wear hoops?',
          'Will the earring be comfortable for long wear?',
          'Is the closure secure and easy to use?',
          'Does the metal colour match existing jewellery?',
          'Are the earrings easy to clean and store?',
          'Would huggies and studs together be better than hoops alone?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose huggies first. If you already own huggies and want more visible shape, add hoops.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What is the difference between hoop and huggie earrings?', answer: 'Hoop earrings are circular or curved earrings that are usually more visible. Huggie earrings are small hoop-style earrings that sit close to the earlobe.' },
  { question: 'Are huggies the same as hoops?', answer: 'Huggies are a type of small hoop, but they sit much closer to the ear. They usually feel more subtle and easier to stack than larger hoops.' },
  { question: 'Are hoops or huggies better for everyday wear?', answer: 'Huggies are usually easier for everyday wear because they sit close to the ear. Hoops are better when you want more visible shape.' },
  { question: 'Are hoops or huggies better for ear stacks?', answer: 'Huggies are usually easier for ear stacks because they take up less space. Hoops can work well as the main shape piece.' },
  { question: 'Are huggies good for second piercings?', answer: 'Yes, huggies can work very well in second piercings, especially when paired with a stud in the first piercing.' },
  { question: 'Are hoops good for gifts?', answer: 'Hoops are good gifts if the recipient already likes hoops or visible earrings. If you are unsure, huggies or studs may be safer.' },
  { question: 'Are huggies good gifts?', answer: 'Yes, huggies are good gifts for someone who likes modern jewellery, ear stacks or close-fitting earrings.' },
  { question: 'Are huggies comfortable?', answer: 'Huggies can be comfortable when they fit well and have a secure closure. They should sit close without pinching.' },
  { question: 'Can you wear hoops and huggies together?', answer: 'Yes, hoops and huggies can be worn together if the sizes are balanced. Let one piece lead and keep the rest smaller.' },
  { question: 'What IWantJewels products are best for hoops and huggies?', answer: 'Amadea Huggie earrings are the strongest huggie option, while Pave Hoops are the strongest hoop direction. Pair either with Cadenza S for a balanced stack.' },
]

const cta: V2CTABlock = {
  heading: 'Hoops and huggies both add shape, but they serve different styling needs. Choose huggies for everyday wear, close-fitting comfort and ear stacks. Choose hoops when you want more visible shape, casual polish or party-ready sparkle.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want wearable pieces with real diamond sparkle. Choose Amadea Huggie earrings for a modern close-fitting shape, Pave Hoops for more visible sparkle, and Cadenza S studs to complete a balanced ear stack.',
  primaryLabel: 'Shop Hoop and Huggie Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Huggie Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read How to Stack Earrings',
  tertiaryHref: '/resources/earring-style-guides/how-to-stack-earrings',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'hoop-vs-huggie-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'hoop-vs-huggie-earrings', 3)
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
