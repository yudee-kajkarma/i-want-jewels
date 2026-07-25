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
  title: 'Can You Wear Lab Grown Diamond Earrings Every Day?',
  description:
    'Learn if lab grown diamond earrings are good for everyday wear, how to choose daily earrings, and how to care for studs, huggies and drops.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day',
  },
  openGraph: {
    title: 'Can You Wear Lab Grown Diamond Earrings Every Day?',
    description:
      'Learn if lab grown diamond earrings are good for everyday wear, how to choose daily earrings, and how to care for studs, huggies and drops.',
    url: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-40.jpg',
  title: 'Can You Wear Lab-Grown Diamond Earrings Every Day?',
  subtitle: '',
  paragraphs: [
    'Yes, you can wear lab-grown diamond earrings every day, especially if the design is comfortable, secure and easy to style. Lab-grown diamonds are real diamonds, so the stones themselves are durable. The main thing to care for is the full jewellery piece, including the metal, plating, setting, backing and finish.',
    'For everyday wear, the best lab-grown diamond earrings are usually studs, huggies and minimalist earrings. They sit close to the ear, feel lighter, and work with more outfits than very long or dramatic earrings. Drop earrings and bold statement earrings can still be worn often, but they are usually better for dinners, weddings, parties and dressed-up looks.',
    'For IWantJewels, Cadenza S lab-grown diamond studs are the safest daily choice, Cadenza M diamond stud earrings are better for more visible everyday sparkle, Amadea Huggie earrings are ideal for ear stacks, and Laluce minimalist diamond earrings work well for quiet daily styling.',
  ],
  shopLabel: 'Shop Everyday Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamond earrings can be worn every day when the design is comfortable and secure.',
    'The diamonds are durable, but the metal finish, plating and setting still need care.',
    'Studs are the safest everyday earrings because they are simple, timeless and easy to repeat.',
    'Huggies are excellent for daily wear and ear stacks.',
    'Minimalist earrings are best for quiet everyday styling.',
    'Drop earrings are better for dinners, weddings and occasions rather than constant daily use.',
    'Avoid harsh chemicals, perfume, lotions, chlorine and rough storage.',
    'Put earrings on after beauty products and wipe them after wearing.',
    'Cadenza S, Cadenza M, Amadea Huggie and Laluce are the strongest IWantJewels everyday recommendations.',
  ],
  image: '/blog-images/blog-image-42.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Are Lab-Grown Diamond Earrings Suitable for Daily Wear?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond earrings are suitable for daily wear when the earring style is practical.' },
      { type: 'paragraph', text: 'The diamond itself is not usually the issue. Lab-grown diamonds are real diamonds, so they are strong and durable. What matters more for everyday wear is the full earring: the metal, plating, backing, setting, shape, weight and how the piece fits into your lifestyle.' },
      { type: 'paragraph', text: 'A pair of earrings can be beautiful but still not ideal for daily use. If they are too heavy, too long, too delicate or too difficult to style, you may only wear them occasionally. Everyday earrings should feel easy. They should be the kind of jewellery you can put on without planning your whole outfit around them.' },
      { type: 'paragraph', text: 'This is why studs and huggies are usually the best everyday choices. They are comfortable, secure and simple enough to wear with casual outfits, workwear, dinner looks and weekend styling.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '#' },
    ],
  },
  {
    heading: 'Why Lab-Grown Diamonds Work Well for Everyday Earrings',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds work well for everyday earrings because they offer real diamond sparkle in a more wearable and modern way.' },
      { type: 'paragraph', text: 'Natural diamond earrings can feel very formal or expensive for daily use, depending on the piece. Cubic zirconia or simple diamond-look earrings may be cheaper, but they do not carry the same diamond quality or long-term feeling. Lab-grown diamonds sit in a useful middle space: real diamond beauty, but often more accessible than comparable mined diamond pieces.' },
      { type: 'paragraph', text: 'For daily styling, this matters. You want jewellery that feels special enough to enjoy, but not so formal that you keep saving it for rare occasions.' },
      { type: 'paragraph', text: 'A small pair of lab-grown diamond studs can make a simple outfit feel more polished. A huggie can add detail to an ear stack. A minimalist earring can quietly finish a work outfit or casual look.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Best Types of Lab-Grown Diamond Earrings for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Not every earring style is equally practical for daily use. Some are easier to repeat than others.' },
      {
        type: 'table',
        headers: ['Earring Style', 'Good for Everyday Wear?', 'Best For', 'Recommended IWJ Direction'],
        rows: [
          ['Stud earrings', 'Yes', 'Daily wear, work, simple styling', 'Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings'],
          ['Huggie earrings', 'Yes', 'Ear stacks, second piercings, casual outfits', 'Amadea Huggie earrings'],
          ['Minimalist earrings', 'Yes', 'Quiet daily styling', 'Laluce minimalist diamond earrings'],
          ['Small hoops', 'Yes', 'Everyday shape and casual styling', 'Pave Hoops'],
          ['Drop earrings', 'Sometimes', 'Dinners, weddings, date nights', 'Orsola drop earrings, Concetta Short earrings'],
          ['Bold statement earrings', 'Not usually daily', 'Parties and high-impact outfits', 'Lusso bold statement earrings'],
          ['Butterfly earrings', 'Yes, depending on style', 'Gifts, soft daily looks, feminine styling', 'Farfalla butterfly earrings, Alidi Farfalla butterfly earrings'],
        ],
      },
      { type: 'paragraph', text: 'For everyday wear, start with the earrings that feel easiest to repeat. Studs, huggies and minimalist earrings are usually the strongest options.' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Studs for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond studs are the best everyday earring choice for most people.' },
      { type: 'paragraph', text: 'They sit close to the ear, do not move around much and work with almost every outfit. They are also easy to wear with other jewellery because they do not compete with necklaces, bracelets or rings.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are ideal if you want subtle daily sparkle. They are clean, simple and easy to wear repeatedly. Cadenza M diamond stud earrings are better if you want more visible sparkle while still keeping the look classic.' },
      { type: 'paragraph', text: 'Studs are also useful because they can move between different parts of your life. They work for office outfits, casual clothing, travel, dinners, family events, wedding guest looks and simple evening styling.' },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Huggies for Everyday Wear',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-44.jpg',
        content: [
          { type: 'paragraph', text: 'Huggies are excellent everyday earrings because they sit close to the ear and feel modern without being too bold.' },
          { type: 'paragraph', text: 'They are especially useful if you like ear stacks. A small huggie can be worn alone for a clean look or layered with studs for more detail. Because huggies do not usually hang low, they often feel easier for regular wear than drop earrings.' },
          { type: 'paragraph', text: 'Amadea Huggie earrings are a strong daily choice for shoppers who want something more styled than a stud but still easy to repeat. They work with casual outfits, workwear, second piercings and simple evening looks.' },
          { type: 'paragraph', text: 'For a clean everyday ear stack, pair Cadenza S lab-grown diamond studs with Amadea Huggie earrings. For a softer stack, add Laluce minimalist diamond earrings.' },
        ],
      },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Can You Wear Drop Earrings Every Day?',
    content: [
      { type: 'paragraph', text: 'You can wear some drop earrings often, but they are usually not the easiest everyday choice.' },
      { type: 'paragraph', text: 'Drop earrings hang below the earlobe, so they create more movement and attract more attention. That makes them beautiful for dinners, parties, weddings and date nights, but they may feel too dressed up for daily wear depending on the design.' },
      { type: 'paragraph', text: 'Shorter, lighter drops can work for smart-casual styling. Longer or more detailed drops are better for occasions.' },
      { type: 'paragraph', text: 'Orsola drop earrings are a strong option for wedding guest looks, dinners and evening styling. Concetta Short earrings may feel easier for softer occasions, while Concetta Long earrings are better when you want a more refined, elongated look.' },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Can You Wear Bold Diamond Earrings Every Day?',
    content: [
      { type: 'paragraph', text: 'Bold statement earrings are usually not meant for daily wear.' },
      { type: 'paragraph', text: 'They are designed to be noticed. That makes them perfect for parties, evening outfits, special dinners and occasions where you want the jewellery to become a main part of the look. But for everyday styling, they may feel too strong, too heavy or too outfit-specific.' },
      { type: 'paragraph', text: 'Lusso bold statement earrings are best for party looks and high-impact styling. They can make a simple black dress or evening outfit feel more complete, but they are not the first choice for daily wear.' },
      { type: 'paragraph', text: 'For everyday use, choose studs, huggies or minimalist earrings instead. Keep bold pieces for the moments when you want the jewellery to stand out.' },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'What Makes Earrings Comfortable Enough for Daily Wear?',
    content: [
      { type: 'paragraph', text: 'Comfort is one of the most important parts of everyday jewellery.' },
      { type: 'paragraph', text: 'A daily earring should not feel heavy, sharp or distracting. It should sit securely and not pull on the ear. It should also work with your hair, clothing and daily routine.' },
      {
        type: 'table',
        headers: ['Comfort Factor', 'Why It Matters'],
        rows: [
          ['Weight', 'Lighter earrings are easier to wear for long hours'],
          ['Backing or closure', 'Secure closures help you feel confident wearing them'],
          ['Shape', 'Smooth, simple shapes are easier for daily use'],
          ['Length', 'Shorter earrings are usually more practical'],
          ['Metal', 'Better materials can feel more comfortable on the ear'],
          ['Styling flexibility', 'Everyday earrings should match many outfits'],
          ['Maintenance', 'Easy-care designs are better for regular wear'],
        ],
      },
      { type: 'paragraph', text: 'For first-time buyers, studs are usually safest. Huggies are a good second choice if you want something more styled. Drops and bold earrings are better when you want occasion jewellery.' },
    ],
  },
  {
    heading: 'Can You Sleep in Lab-Grown Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'It is better not to sleep in lab-grown diamond earrings.' },
      { type: 'paragraph', text: 'Even if the diamonds are durable, sleeping in earrings can put pressure on the posts, backs, settings and metal. It may also feel uncomfortable, especially with huggies, drops or detailed earrings.' },
      { type: 'paragraph', text: 'For studs, some people may occasionally sleep in them, but it is still better to remove them before bed. This helps protect the earrings, keeps the backing secure and reduces unnecessary pressure on the ear.' },
      { type: 'paragraph', text: 'The safest habit is to remove earrings at night, wipe them gently and store them properly.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/how-to-clean-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Can You Shower with Lab-Grown Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'It is better not to shower with lab-grown diamond earrings, especially if they are gold-plated.' },
      { type: 'paragraph', text: 'Water alone may not damage the diamond, but shower products can affect the metal finish over time. Shampoo, conditioner, soap, body wash and moisture can leave buildup or reduce the beauty of the finish.' },
      { type: 'paragraph', text: 'This is especially important for demi-fine jewellery made with 925 sterling silver and 14kt gold plating. The diamond may stay strong, but the plating and metal finish need care.' },
      { type: 'paragraph', text: 'Remove earrings before showering, swimming or using strong beauty products. This simple habit can help the jewellery stay beautiful for longer.' },
      { type: 'see-also', text: 'Can you shower with lab-grown diamond earrings?', href: '#' },
    ],
  },
  {
    heading: 'Can You Work Out in Lab-Grown Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'It is better to avoid working out in lab-grown diamond earrings.' },
      { type: 'paragraph', text: 'Sweat, friction, movement and gym equipment can affect the full jewellery piece. The diamond itself may be durable, but the metal finish, plating and setting still deserve protection.' },
      { type: 'paragraph', text: 'If you are doing light activity, small studs may be less risky than hoops or drops. But for regular workouts, swimming, running, gym sessions or sports, it is better to remove earrings first.' },
      { type: 'paragraph', text: 'This helps prevent buildup, pressure, accidental pulling and unnecessary exposure to sweat.' },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '#' },
    ],
  },
  {
    heading: 'How to Care for Lab-Grown Diamond Earrings You Wear Every Day',
    content: [
      { type: 'paragraph', text: 'Daily earrings need simple daily care.' },
      { type: 'paragraph', text: 'You do not need to deep clean them every day, but you should wipe them after wearing. This removes oils, sweat, makeup, perfume and product buildup before it sits on the jewellery for too long.' },
      { type: 'subheading', text: 'To care for everyday earrings:' },
      {
        type: 'bullet-list',
        items: [
          'Put earrings on after perfume, lotion and hairspray',
          'Remove them before showering or swimming',
          'Wipe them with a soft cloth after wearing',
          'Store them separately in a pouch or box',
          'Avoid throwing them loose into a handbag',
          'Keep them away from harsh chemicals',
          'Deep clean only when they look dull or have buildup',
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels pieces with 925 sterling silver and 14kt gold plating, gentle care is especially important to keep the finish looking beautiful.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/how-to-clean-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Everyday Earrings for Work, Casual Outfits and Events',
    content: [
      { type: 'paragraph', text: 'The best everyday earrings can move between different parts of your day.' },
      { type: 'paragraph', text: 'For work, diamond studs are usually the safest choice. They look polished without being distracting. For casual outfits, huggies or small hoops can make the look feel more styled. For dinners or evening plans, medium studs or small drops can add a little more sparkle.' },
      {
        type: 'table',
        headers: ['Daily Situation', 'Best Earring Choice', 'Recommended IWJ Direction'],
        rows: [
          ['Office wear', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Casual outfits', 'Huggies or minimalist earrings', 'Amadea Huggie, Laluce'],
          ['Ear stacks', 'Studs and huggies', 'Cadenza S, Amadea, Laluce'],
          ['Dinner after work', 'Medium studs or short drops', 'Cadenza M, Orsola'],
          ['Travel', 'Simple studs or huggies', 'Cadenza S, Amadea'],
          ['Simple black dress', 'Medium studs, drops or bold earrings', 'Cadenza M, Orsola, Lusso'],
          ['Gift for daily wear', 'Classic studs', 'Cadenza S, Cadenza M'],
        ],
      },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Good for Sensitive Ears?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds themselves are not usually the issue for sensitive ears. Sensitivity is more often connected to the metal, post, plating, backing or low-quality base materials.' },
      { type: 'paragraph', text: 'For daily wear, this matters even more because the earrings stay on the ear for longer. Better materials and smoother designs can make a difference.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery direction includes 925 sterling silver with 14kt gold plating. This gives the jewellery a stronger demi-fine foundation than many low-quality fashion earrings.' },
      { type: 'paragraph', text: 'If you have known metal allergies or very sensitive ears, check the product details carefully before buying. Studs and huggies are often easier than heavier earrings, but the metal still matters.' },
      { type: 'see-also', text: 'Is 925 sterling silver good for earrings?', href: '#' },
    ],
  },
  {
    heading: 'Can Lab-Grown Diamond Earrings Tarnish with Daily Wear?',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-46.jpg',
        content: [
          { type: 'paragraph', text: 'The lab-grown diamond itself does not tarnish, but the metal around it can change in appearance depending on the material and care routine.' },
          { type: 'paragraph', text: 'With demi-fine jewellery, the finish matters. If earrings are made with 925 sterling silver and 14kt gold plating, daily habits can affect how long the finish stays bright. Perfume, lotion, sweat, chlorine, rough cloths and poor storage can all affect the metal over time.' },
          { type: 'paragraph', text: 'This does not mean you should be afraid to wear your jewellery. It simply means everyday jewellery should be cared for properly.' },
        ],
      },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '#' },
    ],
  },
  {
    heading: 'Best IWantJewels Earrings for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'If you want lab-grown diamond earrings you can wear regularly, start with designs that are comfortable, simple and easy to repeat.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First everyday diamond earrings', 'Small, clean and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'More visible daily sparkle', 'Classic with stronger presence'],
          ['Amadea Huggie earrings', 'Ear stacks and casual styling', 'Modern, close-fitting and easy to layer'],
          ['Laluce minimalist diamond earrings', 'Quiet everyday styling', 'Soft, simple and easy to match'],
          ['Pave Hoops', 'Everyday hoop sparkle', 'Adds shape without feeling too formal'],
          ['Farfalla butterfly earrings', 'Feminine daily styling or gifts', 'More personal than a basic stud'],
          ['Orsola drop earrings', 'Dinner and occasion styling', 'Better for days when you want more movement'],
        ],
      },
      { type: 'paragraph', text: 'For everyday wear, start with earrings that feel effortless. Choose Cadenza S for subtle daily sparkle, Cadenza M for more visible studs, Amadea Huggie for ear stacks or Laluce for minimalist styling.' },
    ],
  },
  {
    heading: 'Common Everyday Wear Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is wearing the same earrings every day without cleaning them. Daily earrings collect oil, sweat, makeup and product buildup, so they should be wiped regularly.' },
      { type: 'paragraph', text: 'Another mistake is showering or sleeping in earrings. Even if the diamonds are durable, the full jewellery piece needs protection.' },
      { type: 'paragraph', text: 'A third mistake is choosing earrings that are too dramatic for your lifestyle. If you want daily jewellery, choose pieces you can actually repeat.' },
      { type: 'paragraph', text: 'Another mistake is ignoring storage. Earrings thrown loose into bags or drawers can rub, bend or lose backs.' },
      { type: 'paragraph', text: 'Finally, do not assume all sparkly earrings are equal. Lab-grown diamonds are different from cubic zirconia, glass or crystal. Check what the stones actually are before buying.' },
      { type: 'see-also', text: 'Lab-grown diamonds vs cubic zirconia', href: '/resources/lab-grown-diamond-guides/lab-grown-diamonds-vs-cubic-zirconia' },
    ],
  },
  {
    heading: 'Final Checklist Before Wearing Lab-Grown Diamond Earrings Every Day',
    content: [
      { type: 'paragraph', text: 'Before choosing daily earrings, ask yourself:' },
      {
        type: 'bullet-list',
        items: [
          'Are they comfortable enough for long wear?',
          'Are they secure on the ear?',
          'Are they simple enough to match many outfits?',
          'Are they made with genuine lab-grown diamonds?',
          'Does the metal suit my skin and usual jewellery?',
          'Can I clean them easily?',
          'Will I remove them before showering, sleeping or workouts?',
          'Do they feel like jewellery I will actually reach for often?',
        ],
      },
      { type: 'paragraph', text: 'If the answer is yes, they are a good everyday choice.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Can you wear lab-grown diamond earrings every day?',
    answer: 'Yes, you can wear lab-grown diamond earrings every day if the design is comfortable, secure and cared for properly.',
  },
  {
    question: 'Are lab-grown diamonds durable enough for daily wear?',
    answer: 'Yes, lab-grown diamonds are real diamonds and are durable. The full earring, including metal, plating and setting, still needs proper care.',
  },
  {
    question: 'What type of lab-grown diamond earrings are best for everyday wear?',
    answer: 'Studs, huggies and minimalist earrings are usually best for everyday wear because they are comfortable and easy to style.',
  },
  {
    question: 'Can I sleep in lab-grown diamond earrings?',
    answer: 'It is better not to sleep in them. Sleeping in earrings can put pressure on the posts, backs, settings and metal.',
  },
  {
    question: 'Can I shower with lab-grown diamond earrings?',
    answer: 'It is better not to shower with them, especially if they are gold-plated. Shower products and moisture can affect the metal finish over time.',
  },
  {
    question: 'Can I work out in lab-grown diamond earrings?',
    answer: 'It is better to remove them before workouts. Sweat, friction and movement can affect the full jewellery piece.',
  },
  {
    question: 'Do lab-grown diamond earrings tarnish?',
    answer: 'The diamond itself does not tarnish, but the metal around it can change depending on the material and care routine.',
  },
  {
    question: 'Are lab-grown diamond studs good for daily wear?',
    answer: 'Yes, lab-grown diamond studs are one of the best daily earring choices because they are simple, timeless and comfortable.',
  },
  {
    question: 'Are huggies good for everyday wear?',
    answer: 'Yes, huggies are excellent for everyday wear and ear stacks because they sit close to the ear and feel easy to style.',
  },
  {
    question: 'How do I care for earrings I wear daily?',
    answer: 'Wipe them after wearing, avoid perfume and harsh products, remove them before showering or sleeping, and store them separately.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-grown diamond earrings can be worn every day when you choose the right style and care for them properly. The best daily earrings should feel comfortable, secure and easy to style with more than one outfit.',
  body: 'Start with IWantJewels everyday lab-grown diamond earrings if you want real diamond sparkle in wearable demi-fine designs. Choose Cadenza S for subtle daily shine, Cadenza M for more visible studs, Amadea Huggie for ear stacks, or Laluce for quiet minimalist styling.',
  primaryLabel: 'Shop Everyday Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Stud Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'can-you-wear-lab-grown-diamond-earrings-every-day')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'can-you-wear-lab-grown-diamond-earrings-every-day', 3)
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
