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
  title: 'How to Clean Lab Grown Diamond Earrings',
  description:
    'Learn how to clean lab grown diamond earrings safely, protect gold plating, avoid dullness, and keep your jewellery sparkling for longer.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-96.jpg',
  title: 'How to Clean Lab-Grown Diamond Earrings',
  subtitle: '',
  paragraphs: [
    'To clean lab-grown diamond earrings, gently wipe them with a soft, lint-free jewellery cloth after wearing. If they need a deeper clean, use lukewarm water with a small amount of mild soap, then clean carefully with a soft cloth or very soft brush. Always dry the earrings fully before storing them.',
    'Lab-grown diamonds are durable, but the full jewellery piece still needs care. If your earrings are made with 925 sterling silver and 14kt gold plating, avoid harsh chemicals, strong cleaners, rough scrubbing, perfume, lotions, chlorine and abrasive cloths. These can affect the metal finish even if the diamond itself remains strong.',
    'For everyday pieces like Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings, gentle regular care is enough to keep them looking bright. For more detailed earrings like Farfalla butterfly earrings, Orsola drop earrings or Lusso bold statement earrings, clean carefully around the setting and store them separately.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds are durable, but the earring setting, plating and metal finish need gentle care.',
    'Wipe earrings with a soft jewellery cloth after wearing.',
    'Use lukewarm water and mild soap only when deeper cleaning is needed.',
    'Avoid harsh chemicals, bleach, chlorine, alcohol-based cleaners and abrasive cloths.',
    'Keep earrings away from perfume, lotion, hairspray and strong cleaning products.',
    'Dry earrings fully before storing them.',
    'Store each pair separately to avoid scratching, rubbing or tangling.',
    'Be extra gentle with 14kt gold-plated jewellery so the finish stays beautiful for longer.',
    'Clean everyday studs and huggies more often than occasional drop earrings.',
  ],
  image: '/blog-images/blog-image-100.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Why Do Lab-Grown Diamond Earrings Need Cleaning?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings can lose some of their sparkle when they collect everyday buildup. This does not mean the diamonds have lost quality. It usually means the surface has picked up oil, dust, makeup, skincare, perfume, hair products or natural skin residue.' },
      { type: 'paragraph', text: 'Earrings sit close to the face and hair, so they are exposed to more than people realise. Even a beautiful pair of diamond studs can look dull if product buildup sits on the stone or around the setting.' },
      { type: 'paragraph', text: 'Cleaning helps restore brightness and keeps the jewellery feeling fresh. The goal is not to aggressively scrub the earrings. The goal is to gently remove buildup while protecting the full piece, including the metal, plating, posts, backs and settings.' },
      { type: 'paragraph', text: 'This is especially important for demi-fine jewellery. At IWantJewels, the jewellery direction includes lab-grown diamonds, 925 sterling silver and 14kt gold plating. The diamonds are durable, but the finish should still be treated with care.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Easy to Clean?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are easy to clean when you use gentle methods.' },
      { type: 'paragraph', text: 'The diamond itself is not usually the difficult part. The more delicate part is the jewellery setting and metal finish. If the earrings have gold plating, detailed shapes or small stones, you should avoid harsh cleaning methods that may damage the finish or loosen the setting over time.' },
      { type: 'paragraph', text: 'For most earrings, a soft cloth after wearing is enough. A deeper clean with mild soap and lukewarm water can be used occasionally when the earrings look dull or have visible buildup.' },
      { type: 'paragraph', text: 'The safest rule is simple: clean gently, dry fully and store properly.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '#' },
    ],
  },
  {
    heading: 'What You Need to Clean Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'You do not need complicated tools to clean lab-grown diamond earrings at home. In fact, simple is usually safer.' },
      {
        type: 'table',
        headers: ['Cleaning Item', 'Why It Helps'],
        rows: [
          ['Soft lint-free jewellery cloth', 'Removes oils and light buildup gently'],
          ['Lukewarm water', 'Helps loosen dirt without shocking the jewellery'],
          ['Mild soap', 'Helps remove light residue when needed'],
          ['Soft bowl', 'Safer than cleaning over a sink'],
          ['Very soft brush or cotton bud', 'Helps clean around settings carefully'],
          ['Dry soft cloth', 'Removes moisture before storage'],
          ['Jewellery pouch or box', 'Keeps earrings protected after cleaning'],
        ],
      },
      { type: 'paragraph', text: 'Avoid using rough towels, paper tissues, hard brushes or strong cleaning products. These may seem harmless, but they can be too abrasive for plated finishes or delicate settings.' },
    ],
  },
  {
    heading: 'Step-by-Step: How to Clean Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Use this simple method for most lab-grown diamond earrings.' },
      {
        type: 'table',
        headers: ['Step', 'What to Do', 'Why It Matters'],
        rows: [
          ['1', 'Place earrings in a small bowl, not directly over a sink', 'Prevents losing earrings or backs'],
          ['2', 'Add lukewarm water and a tiny amount of mild soap', 'Helps loosen oil and buildup'],
          ['3', 'Let the earrings sit briefly if needed', 'Softens residue without harsh scrubbing'],
          ['4', 'Gently wipe with a soft cloth or clean carefully with a very soft brush', 'Removes buildup around the stone and setting'],
          ['5', 'Rinse carefully with clean lukewarm water if soap was used', 'Removes leftover soap'],
          ['6', 'Dry fully with a soft cloth', 'Prevents moisture from sitting on the metal'],
          ['7', 'Store separately in a pouch or jewellery box', 'Protects the finish and stones'],
        ],
      },
      { type: 'paragraph', text: 'Do not use hot water, boiling water, bleach, strong jewellery dips or abrasive cleaners. If the earrings are gold-plated, rough cleaning can affect the finish even if the diamond itself is fine.' },
    ],
  },
  {
    heading: 'How Often Should You Clean Lab-Grown Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'How often you clean your earrings depends on how often you wear them.' },
      { type: 'paragraph', text: 'Everyday earrings need more frequent care than occasion earrings. Studs and huggies usually sit close to the skin and are worn more often, so they may collect oil and product buildup faster. Drop earrings or party earrings may only need cleaning after events.' },
      {
        type: 'table',
        headers: ['Earring Type', 'Cleaning Frequency'],
        rows: [
          ['Everyday studs', 'Wipe after each wear; deeper clean when dull'],
          ['Huggies', 'Wipe after each wear, especially if worn in stacks'],
          ['Minimalist earrings', 'Wipe regularly if worn often'],
          ['Drop earrings', 'Clean after events or when needed'],
          ['Butterfly earrings', 'Clean gently after wear, especially around details'],
          ['Bold statement earrings', 'Wipe after use and store carefully'],
        ],
      },
      { type: 'paragraph', text: 'For daily pieces like Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings, a quick wipe after wearing is a good habit.' },
    ],
  },
  {
    heading: 'What Should You Avoid When Cleaning Lab-Grown Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'Avoid anything harsh, abrasive or chemical-heavy.' },
      { type: 'paragraph', text: 'Lab-grown diamonds are durable, but the full earring can include metal finishes, posts, backs, settings and plating. These parts need more careful handling.' },
      { type: 'subheading', text: 'Avoid:' },
      {
        type: 'bullet-list',
        items: [
          'Bleach',
          'Chlorine',
          'Harsh jewellery dips',
          'Alcohol-based cleaners',
          'Toothpaste',
          'Baking soda scrubs',
          'Boiling water',
          'Hard toothbrushes',
          'Rough towels',
          'Ultrasonic cleaners unless the brand says they are safe',
          'Cleaning over an open sink',
          'Scrubbing plated areas aggressively',
        ],
      },
      { type: 'paragraph', text: 'A common mistake is treating the diamond as if it is the only part of the earring that matters. The metal and setting matter too. If the finish is damaged, the whole piece can lose its beauty.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Can You Use Soap and Water on Lab-Grown Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'Yes, you can usually use lukewarm water and a small amount of mild soap for a gentle clean.' },
      { type: 'paragraph', text: 'The key is to keep it mild. You do not need strong detergent or heavy cleaning products. Use a small bowl, clean carefully and dry the earrings fully afterwards.' },
      { type: 'paragraph', text: 'If your earrings are gold-plated, avoid soaking them for too long. A short, gentle clean is better. Plated jewellery should not be treated roughly, because the finish needs care.' },
      { type: 'paragraph', text: 'For most IWantJewels pieces, a soft cloth is enough for regular cleaning. Use soap and water only when the earrings need a deeper refresh.' },
    ],
  },
  {
    heading: 'Can You Use an Ultrasonic Cleaner?',
    content: [
      { type: 'paragraph', text: 'It is better to be careful with ultrasonic cleaners.' },
      { type: 'paragraph', text: 'Ultrasonic cleaners can be useful for some jewellery, but they are not always suitable for every earring. They may be too intense for delicate settings, gold-plated jewellery, pavé details or pieces with more complex construction.' },
      { type: 'paragraph', text: 'If the jewellery brand does not clearly say ultrasonic cleaning is safe for that specific piece, avoid it. A gentle hand-cleaning method is safer for most demi-fine earrings.' },
      { type: 'paragraph', text: 'This is especially important for detailed earrings like butterfly designs, drop earrings, pavé hoops or bold statement pieces. These designs may have more areas where stones and settings need careful handling.' },
    ],
  },
  {
    heading: 'How to Clean Lab-Grown Diamond Stud Earrings',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-13.jpg',
        content: [
          { type: 'paragraph', text: 'Lab-grown diamond studs are usually the easiest earrings to clean because they are simple and sit close to the ear.' },
          { type: 'paragraph', text: 'Start by wiping the front and back of the studs with a soft jewellery cloth. Pay attention to the area around the setting and the post, because this is where oil and skin residue can collect.' },
          { type: 'paragraph', text: 'If the studs look dull, use lukewarm water with a tiny amount of mild soap. Clean gently around the stone, rinse carefully if needed and dry fully before storage.' },
          { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs and Cadenza M diamond stud earrings are good examples of everyday pieces that benefit from regular gentle care. Because studs are often worn frequently, they should be wiped more often than occasional earrings.' },
        ],
      },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'How to Clean Lab-Grown Diamond Huggie Earrings',
    content: [
      { type: 'paragraph', text: 'Huggies can collect buildup around the hinge, curve and closure, so they need slightly more attention than simple studs.' },
      { type: 'paragraph', text: 'Use a soft cloth to wipe the outside and inside of the huggie. If there is buildup around the hinge or closure, use a cotton bud or very soft brush carefully. Do not force the hinge or scrub too hard.' },
      { type: 'paragraph', text: 'If you use mild soap and water, make sure the huggies are dried properly before closing and storing them. Moisture sitting around the hinge is not ideal.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are ideal for everyday styling and ear stacks, so they should be cleaned regularly if worn often.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'How to Clean Lab-Grown Diamond Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Drop earrings should be cleaned carefully because they may have more movement, length or detail than studs.' },
      { type: 'paragraph', text: 'Hold the earring gently and avoid pulling on delicate parts. Wipe the stones, metal and lower sections with a soft cloth. If the design has small spaces, use a soft brush or cotton bud carefully.' },
      { type: 'paragraph', text: 'After cleaning, lay the earrings on a soft cloth and let them dry fully before storing. Do not store drop earrings while damp, and do not throw them loosely into a jewellery box where they can rub against other pieces.' },
      { type: 'paragraph', text: 'Orsola drop earrings, Concetta Long earrings and Concetta Short earrings should be stored separately to protect the shape and finish.' },
      { type: 'see-also', text: 'Drop earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'How to Clean Butterfly Earrings',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings often have more shape and detail, so they should be cleaned gently.' },
      { type: 'paragraph', text: 'The wing design may have small spaces where dust, oil or product residue can sit. Use a soft cloth for the main surface and a cotton bud for delicate areas. Avoid aggressive scrubbing because detailed shapes should be handled carefully.' },
      { type: 'paragraph', text: 'Butterfly earrings are often bought as gifts, so keeping them bright and well stored helps preserve that special feeling.' },
      { type: 'paragraph', text: 'Farfalla butterfly earrings and Alidi Farfalla butterfly earrings should be kept separately in a pouch or box, especially if they are not worn every day.' },
      { type: 'see-also', text: 'Butterfly earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'How to Clean Bold Statement Earrings',
    content: [
      { type: 'paragraph', text: 'Bold statement earrings need careful cleaning because they are often more detailed and more noticeable when worn.' },
      { type: 'paragraph', text: 'Use a soft cloth after every wear to remove makeup, perfume or skin oils. If the design has multiple stones or small spaces, clean around them gently. Do not soak the earrings for too long and do not use harsh cleaners.' },
      { type: 'paragraph', text: 'Because statement earrings are often worn for parties, dinners or special events, they may come into contact with hairspray, makeup and perfume. Try to put the earrings on after applying beauty products and wipe them before storing.' },
      { type: 'paragraph', text: 'Lusso bold statement earrings should be stored carefully so the stones and finish are protected between wears.' },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'How to Protect Gold-Plated Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Gold-plated lab-grown diamond earrings need gentle care because the plating is part of the surface finish.' },
      { type: 'paragraph', text: 'At IWantJewels, pieces are designed with 925 sterling silver and 14kt gold plating. This gives the jewellery a premium demi-fine look, but it still needs proper care to stay beautiful for longer.' },
      { type: 'subheading', text: 'To protect gold-plated earrings:' },
      {
        type: 'bullet-list',
        items: [
          'Put jewellery on after perfume, lotion and hairspray',
          'Avoid swimming or showering with earrings',
          'Wipe after wearing',
          'Store separately',
          'Avoid rough cloths and hard brushes',
          'Keep away from strong cleaning products',
          'Do not leave jewellery in humid areas for long periods',
        ],
      },
      { type: 'paragraph', text: 'The goal is to reduce unnecessary friction and chemical exposure. This helps the finish stay cleaner and brighter.' },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '#' },
    ],
  },
  {
    heading: 'Should You Clean Earrings Before or After Wearing?',
    content: [
      { type: 'paragraph', text: 'It is best to wipe earrings after wearing them.' },
      { type: 'paragraph', text: 'This removes oil, sweat, perfume and product buildup before it sits on the jewellery for too long. You do not need a deep clean every time. A quick wipe with a soft cloth is usually enough.' },
      { type: 'paragraph', text: 'Before wearing, make sure the earrings are dry and clean. If they have been stored properly, they should not need much cleaning before use.' },
      { type: 'paragraph', text: 'A good habit is simple: put earrings on last when getting ready, and wipe them before putting them away.' },
    ],
  },
  {
    heading: 'How to Store Lab-Grown Diamond Earrings After Cleaning',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-59.jpg',
        content: [
          { type: 'paragraph', text: 'Storage is just as important as cleaning.' },
          { type: 'paragraph', text: 'Even clean earrings can become scratched or dull-looking if they are thrown into a bag or mixed with other jewellery. Earrings should be stored separately so they do not rub against rings, chains, bracelets or other earrings.' },
          { type: 'paragraph', text: 'Use a jewellery pouch, box or divided organiser. Keep pairs together, but avoid letting detailed earrings press against each other. Make sure everything is fully dry before storing.' },
        ],
      },
      {
        type: 'table',
        headers: ['Storage Tip', 'Why It Helps'],
        rows: [
          ['Store earrings separately', 'Prevents rubbing and scratching'],
          ['Use a soft pouch or box', 'Protects the finish'],
          ['Keep away from moisture', 'Helps preserve the metal finish'],
          ['Avoid loose handbag storage', 'Prevents bending, rubbing and losing backs'],
          ['Keep pairs together', 'Makes earrings easier to find and protects small pieces'],
        ],
      },
      { type: 'see-also', text: 'How to store earrings', href: '#' },
    ],
  },
  {
    heading: 'Can Lab-Grown Diamond Earrings Tarnish?',
    content: [
      { type: 'paragraph', text: 'The lab-grown diamond itself does not tarnish, but the metal around the diamond can change in appearance depending on the material and how it is cared for.' },
      { type: 'paragraph', text: 'With demi-fine jewellery, the metal finish matters. If earrings are made with 925 sterling silver and 14kt gold plating, proper care helps preserve the look. Exposure to chemicals, moisture, perfume, sweat, chlorine and rough handling can affect the finish over time.' },
      { type: 'paragraph', text: 'This is why care instructions are important. The diamonds may stay bright, but the full earring needs thoughtful handling.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '#' },
    ],
  },
  {
    heading: 'Can You Shower with Lab-Grown Diamond Earrings?',
    content: [
      { type: 'paragraph', text: 'It is better not to shower with lab-grown diamond earrings, especially if they are gold-plated.' },
      { type: 'paragraph', text: 'Water alone may not ruin the diamond, but shower products, shampoo, conditioner, soaps and moisture can affect the metal finish over time. If the earrings have 14kt gold plating, repeated showering is not ideal.' },
      { type: 'paragraph', text: 'The safest habit is to remove earrings before showering, swimming, exercising heavily or using strong beauty products. This helps the jewellery stay cleaner and reduces unnecessary exposure.' },
      { type: 'see-also', text: 'Can you shower with lab-grown diamond earrings?', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings Care by Earring Type',
    content: [
      { type: 'paragraph', text: 'Different earring styles need slightly different care.' },
      {
        type: 'table',
        headers: ['Earring Type', 'Care Tip'],
        rows: [
          ['Stud earrings', 'Wipe posts and backs regularly because they sit close to the skin'],
          ['Huggies', 'Clean around the hinge and closure gently'],
          ['Drop earrings', 'Store separately to protect shape and movement'],
          ['Butterfly earrings', 'Clean around detailed wing shapes carefully'],
          ['Pavé hoops', 'Avoid harsh scrubbing around small stones'],
          ['Bold statement earrings', 'Wipe after events and store in a protected space'],
        ],
      },
      { type: 'paragraph', text: 'The more detailed the design, the more carefully it should be cleaned and stored.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you want lab-grown diamond earrings that are easy to care for and style, these are strong starting points.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Care Note'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Everyday wear', 'Wipe after regular use and store separately'],
          ['Cadenza M diamond stud earrings', 'Everyday sparkle', 'Clean posts and backs gently'],
          ['Amadea Huggie earrings', 'Ear stacks', 'Clean around the hinge and closure'],
          ['Laluce minimalist diamond earrings', 'Simple styling', 'Easy to wipe and store'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'Clean detailed areas gently'],
          ['Alidi Farfalla butterfly earrings', 'Feminine gifts', 'Store carefully to protect the shape'],
          ['Orsola drop earrings', 'Wedding guests and dinners', 'Store separately to protect movement'],
          ['Lusso bold statement earrings', 'Party styling', 'Wipe after events and avoid harsh products'],
        ],
      },
      { type: 'paragraph', text: 'If you want jewellery that is beautiful and easy to enjoy, start with lab-grown diamond earrings you can care for properly. Choose studs for everyday wear, huggies for stacking, butterfly earrings for gifts or drop earrings for occasions.' },
    ],
  },
  {
    heading: 'Common Cleaning Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is using harsh cleaning products. Lab-grown diamonds are durable, but the metal finish and setting still need gentle care.' },
      { type: 'paragraph', text: 'Another mistake is cleaning earrings over an open sink. Small studs, backs and huggies can easily slip away. Always use a bowl or clean surface.' },
      { type: 'paragraph', text: 'A third mistake is storing earrings while they are still damp. Moisture is not ideal for jewellery storage, especially with plated finishes.' },
      { type: 'paragraph', text: 'Another mistake is using toothpaste or baking soda because they are popular home-cleaning tricks. These can be too abrasive for jewellery.' },
      { type: 'paragraph', text: 'Finally, do not forget the backs and posts. Earrings sit close to the skin, so these areas need cleaning too.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Final Checklist for Cleaning Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'Before cleaning, ask yourself:' },
      {
        type: 'bullet-list',
        items: [
          'Are the earrings simple or detailed?',
          'Are they gold-plated?',
          'Do they have small stones, hinges or delicate shapes?',
          'Am I using a soft cloth instead of something abrasive?',
          'Am I avoiding harsh chemicals?',
          'Am I cleaning over a safe surface?',
          'Have I dried the earrings fully?',
          'Will I store them separately after cleaning?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, keep the cleaning method gentle. A soft cloth, mild soap when needed and careful storage are enough for most earrings.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'How do you clean lab-grown diamond earrings?',
    answer: 'Wipe them with a soft jewellery cloth after wearing. For deeper cleaning, use lukewarm water with a small amount of mild soap, clean gently, rinse carefully if needed and dry fully before storing.',
  },
  {
    question: 'Can I clean lab-grown diamond earrings with soap and water?',
    answer: 'Yes, mild soap and lukewarm water can be used carefully. Avoid harsh detergents, strong chemicals and long soaking, especially if the earrings are gold-plated.',
  },
  {
    question: 'Can I use toothpaste to clean diamond earrings?',
    answer: 'No, toothpaste is not recommended. It can be too abrasive for jewellery, especially plated finishes and delicate settings.',
  },
  {
    question: 'Can I shower with lab-grown diamond earrings?',
    answer: 'It is better not to shower with them, especially if they are gold-plated. Shampoo, soap, conditioner and moisture can affect the metal finish over time.',
  },
  {
    question: 'Do lab-grown diamond earrings tarnish?',
    answer: 'The diamond does not tarnish, but the metal around it can change in appearance depending on the material and care routine.',
  },
  {
    question: 'How often should I clean lab-grown diamond earrings?',
    answer: 'Wipe everyday earrings after wearing. Deep clean only when they look dull or have visible buildup.',
  },
  {
    question: 'Can I use an ultrasonic cleaner?',
    answer: 'Only use an ultrasonic cleaner if the brand says it is safe for that specific piece. For demi-fine and gold-plated jewellery, gentle hand cleaning is usually safer.',
  },
  {
    question: 'How do I clean diamond stud earrings?',
    answer: 'Wipe the front, back, post and backing with a soft cloth. If needed, use lukewarm water and mild soap, then dry fully before storing.',
  },
  {
    question: 'How should I store lab-grown diamond earrings?',
    answer: 'Store them separately in a pouch, jewellery box or organiser. Make sure they are dry before storing and avoid letting them rub against other jewellery.',
  },
  {
    question: 'How do I keep lab-grown diamond earrings sparkling?',
    answer: 'Wipe them after wearing, avoid perfume and harsh products, clean gently when needed, dry fully and store them separately.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Lab-grown diamond earrings are easy to care for when you treat the full piece gently. The diamonds are durable, but the setting, metal finish and plating still need protection from chemicals, moisture, rough handling and poor storage.',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in wearable demi-fine designs. Choose studs for everyday wear, huggies for ear stacks, butterfly earrings for thoughtful gifts or drop earrings for weddings and evening outfits. With simple care, your jewellery can stay bright, polished and ready to wear.',
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
  const article = getArticleBySlug('lab-grown-diamond-guides', 'how-to-clean-lab-grown-diamond-earrings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'how-to-clean-lab-grown-diamond-earrings', 3)
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
