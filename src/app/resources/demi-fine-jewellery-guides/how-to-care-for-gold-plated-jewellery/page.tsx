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
  title: 'How to Care for Gold Plated Jewellery',
  description:
    'Learn how to care for gold-plated jewellery, protect 14kt gold plating, avoid tarnish, clean earrings safely and store demi-fine jewellery.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-49.jpg',
  title: 'How to Care for Gold-Plated Jewellery:',
  subtitle: 'Cleaning, Storage & Daily Wear Guide',
  paragraphs: [
    'Gold-plated jewellery can stay beautiful for longer when it is worn, cleaned and stored with care. The most important rule is simple: protect the gold finish from water, perfume, lotion, sweat buildup, chlorine, harsh cleaners and rough friction.',
    'At IWantJewels, jewellery is made with lab-grown diamonds, 925 sterling silver and 14kt gold plating. This gives the pieces a polished demi-fine finish, but the gold plating is still a surface layer, so it should be treated carefully. Good care habits help preserve the colour, shine and overall finish of the jewellery.',
    'This resource explains how to care for gold-plated earrings and demi-fine jewellery before wearing, after wearing, during cleaning, while travelling and during storage. It also helps shoppers choose IWantJewels pieces based on how easy they are to care for.',
  ],
  shopLabel: 'Shop Gold-Plated Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Learn how to care for gold-plated jewellery properly',
    'Understand what to avoid with 14kt gold plating',
    'Know how to clean gold-plated earrings safely',
    'Protect gold-plated jewellery from tarnish, fading and dullness',
    'Understand whether you can shower, swim or work out with gold-plated jewellery',
    'Learn how to store gold-plated earrings and demi-fine jewellery',
    'Choose easy-care IWantJewels products for everyday wear, gifts and occasions',
    'Plan image blocks, product modules, CTAs and internal links for this page',
  ],
  image: '/blog-images/blog-image-81.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Gold-Plated Jewellery Care Rules',
    content: [
      { type: 'paragraph', text: 'Use this section near the top as the main care tool.' },
      {
        type: 'table',
        headers: ['Care Rule', 'What to Do', 'Why It Matters'],
        rows: [
          ['Put jewellery on last', 'Wear jewellery after perfume, lotion, makeup and hairspray', 'Reduces chemical exposure'],
          ['Take jewellery off first', 'Remove jewellery before showering, sleeping or changing', 'Reduces friction and moisture'],
          ['Avoid water exposure', 'Remove before showering, swimming or bathing', 'Protects the gold finish'],
          ['Wipe after wearing', 'Use a soft, dry jewellery cloth', 'Removes oil, sweat and product buildup'],
          ['Store separately', 'Keep pieces in a pouch, box or organiser', 'Prevents rubbing and scratches'],
          ['Avoid harsh cleaners', 'Do not use bleach, alcohol cleaners, toothpaste or abrasive products', 'Protects the plating'],
          ['Keep away from chlorine', 'Remove before pools or hot tubs', 'Chlorine can affect jewellery finishes'],
          ['Handle detailed pieces gently', 'Be careful with drops, butterfly earrings and statement designs', 'Protects shape, setting and finish'],
        ],
      },
      { type: 'paragraph', text: 'At IWantJewels, pieces are described as tarnish-proof and sweat-proof with care. That means the jewellery is designed for real wear, but the care routine still matters.' },
    ],
  },
  {
    heading: 'What Should You Avoid with Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery should be kept away from anything that can affect the surface finish.' },
      { type: 'paragraph', text: 'The gold plating is the outer layer of the jewellery, so it is exposed to daily products and habits. Perfume, lotion, sweat, chlorine, salt water, soap, shampoo, makeup and rough storage can all make the finish dull faster.' },
      { type: 'subheading', text: 'Avoid:' },
      {
        type: 'bullet-list',
        items: [
          'Showering with jewellery',
          'Swimming with jewellery',
          'Wearing jewellery in hot tubs',
          'Spraying perfume directly on jewellery',
          'Applying lotion after jewellery is already on',
          'Sleeping in jewellery',
          'Exercising heavily in jewellery',
          'Using alcohol-based cleaners',
          'Using toothpaste or baking soda',
          'Scrubbing with rough cloths or hard brushes',
          'Storing earrings loose with other jewellery',
        ],
      },
      { type: 'paragraph', text: 'This does not mean gold-plated jewellery is difficult to own. It simply means it should be treated as demi-fine jewellery, not waterproof gym jewellery.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '/resources/demi-fine-jewellery-guides/does-gold-plated-jewellery-tarnish' },
    ],
  },
  {
    heading: 'How to Clean Gold-Plated Jewellery Safely',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery should be cleaned gently.' },
      { type: 'paragraph', text: 'For regular care, a soft, dry jewellery cloth is usually enough. Wipe the jewellery after wearing to remove oil, sweat, makeup and product residue. If the piece needs a deeper clean, use a very gentle approach and avoid soaking it for a long time.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-83.jpg',
        content: [
          {
            type: 'table',
            headers: ['Step', 'What to Do', 'Why'],
            rows: [
              ['1', 'Place jewellery on a soft cloth', 'Prevents scratching'],
              ['2', 'Wipe gently with a dry, lint-free cloth', 'Removes oils and buildup'],
              ['3', 'Use a slightly damp soft cloth only if needed', 'Helps remove light residue'],
              ['4', 'Dry fully with a clean soft cloth', 'Prevents moisture from sitting on the finish'],
              ['5', 'Store separately once dry', 'Protects the surface'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'Do not use harsh jewellery dips, ultrasonic cleaners, toothpaste, baking soda, bleach, alcohol cleaners or rough brushes on gold-plated jewellery unless the brand specifically says it is safe for that piece.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/how-to-clean-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'How Often Should You Clean Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery does not need deep cleaning often. It needs gentle regular wiping.' },
      { type: 'paragraph', text: 'Everyday earrings should be wiped more frequently because they sit close to the skin and collect natural oils, skincare, hair products and makeup. Occasion earrings may only need wiping after events.' },
      {
        type: 'table',
        headers: ['Jewellery Type', 'Cleaning Frequency'],
        rows: [
          ['Everyday studs', 'Wipe after each wear'],
          ['Huggies', 'Wipe after each wear, especially near hinge and closure'],
          ['Minimalist earrings', 'Wipe regularly if worn often'],
          ['Hoops', 'Wipe after wear and store separately'],
          ['Butterfly earrings', 'Wipe gently around detailed shapes after wearing'],
          ['Drop earrings', 'Wipe after events and store carefully'],
          ['Bold statement earrings', 'Wipe after wearing and store separately'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, everyday pieces like Cadenza S, Cadenza M, Amadea Huggie and Laluce should be wiped regularly. More detailed pieces like Farfalla, Orsola and Lusso should be cleaned gently and stored with extra care.' },
    ],
  },
  {
    heading: 'Can You Shower with Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'It is better not to shower with gold-plated jewellery.' },
      { type: 'paragraph', text: 'Shower products such as shampoo, conditioner, soap and body wash can affect the finish over time. Moisture can also sit around earring posts, hinges, settings and small design details if jewellery is not dried properly.' },
      { type: 'paragraph', text: 'The safest habit is to remove gold-plated jewellery before showering, bathing or washing your hair.' },
      { type: 'paragraph', text: 'This is especially important for 14kt gold-plated jewellery over 925 sterling silver. The jewellery can be worn and enjoyed, but repeated water exposure is not ideal for preserving the finish.' },
      { type: 'see-also', text: 'Can you shower with gold-plated jewellery?', href: '#' },
    ],
  },
  {
    heading: 'Can You Swim with Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'It is better not to swim with gold-plated jewellery.' },
      { type: 'paragraph', text: 'Pool water contains chlorine, and sea water contains salt. Both can be harsh on jewellery finishes. Swimming can also expose jewellery to sunscreen, sweat, friction and repeated moisture.' },
      { type: 'paragraph', text: 'Remove gold-plated jewellery before:' },
      {
        type: 'bullet-list',
        items: [
          'Swimming pools',
          'Hot tubs',
          'Beaches',
          'Saunas',
          'Steam rooms',
          'Long baths',
        ],
      },
      { type: 'paragraph', text: 'If jewellery accidentally gets wet, wipe it gently with a soft cloth and let it dry fully before storing.' },
      { type: 'see-also', text: 'Tarnish-proof jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Can Sweat Affect Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'Sweat can affect gold-plated jewellery if it sits on the surface for too long, especially when mixed with perfume, lotion, sunscreen or makeup.' },
      { type: 'paragraph', text: 'Normal wear is different from heavy workouts. Wearing earrings during a normal day is fine when they are wiped after use. Wearing jewellery during intense gym sessions, running, swimming or sports is not recommended.' },
      { type: 'paragraph', text: 'At IWantJewels, jewellery is described as sweat-proof with care. That means it is designed for real wear, but the wearer should still avoid heavy sweat exposure and clean the jewellery gently after wearing.' },
      { type: 'paragraph', text: 'Best habit: remove jewellery before heavy workouts and wipe it after normal daily wear.' },
      { type: 'see-also', text: 'Sweat-proof jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'How to Store Gold-Plated Jewellery',
    content: [
      { type: 'paragraph', text: 'Storage is one of the most important parts of caring for gold-plated jewellery.' },
      { type: 'paragraph', text: 'Even clean jewellery can lose its shine faster if it is thrown into a drawer, handbag or jewellery bowl with other pieces. Rubbing and friction can affect the gold finish.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-85.jpg',
        content: [
          {
            type: 'table',
            headers: ['Storage Rule', 'Why It Helps'],
            rows: [
              ['Store separately', 'Prevents pieces from rubbing together'],
              ['Use a soft pouch or jewellery box', 'Protects the finish'],
              ['Keep jewellery dry', 'Reduces moisture exposure'],
              ['Avoid humid spaces', 'Bathrooms are not ideal'],
              ['Keep earrings paired together', 'Prevents lost backs and scratches'],
              ['Do not travel with loose jewellery', 'Reduces bending, rubbing and tangling'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For earrings, use a soft pouch, jewellery box or organiser with separate sections. Make sure the jewellery is fully dry before storing it.' },
      { type: 'see-also', text: 'How to store earrings', href: '#' },
    ],
  },
  {
    heading: 'How to Care for Gold-Plated Stud Earrings',
    content: [
      { type: 'paragraph', text: 'Gold-plated stud earrings are usually the easiest earrings to care for because they are small and simple.' },
      { type: 'paragraph', text: 'Wipe the front, back, post and backing after wearing. Pay attention to the post and back because these areas sit close to the skin and can collect oil, sweat and product buildup.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are strong for everyday wear because they are subtle and easy to clean. Cadenza M diamond stud earrings are better if the shopper wants more visible sparkle while keeping the style classic.' },
      { type: 'see-also', text: 'Diamond stud earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'How to Care for Gold-Plated Huggies and Hoops',
    content: [
      { type: 'paragraph', text: 'Huggies and hoops need care around the hinge, curve and closure.' },
      { type: 'paragraph', text: 'Use a soft cloth to wipe both the outside and inside of the earring. If the huggie has a hinge, make sure the area is dry before storing. Avoid forcing the closure or cleaning roughly around moving parts.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are ideal for everyday styling and ear stacks, so they should be wiped regularly if worn often. Pave Hoops should be stored separately to avoid friction and protect the diamond details and gold finish.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'How to Care for Gold-Plated Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Gold-plated drop earrings need slightly more careful storage because they may have movement, length or delicate details.' },
      { type: 'paragraph', text: 'After wearing, wipe the earrings gently with a soft cloth. Avoid pulling on the drop section. Store them separately so they do not tangle, bend or rub against other jewellery.' },
      { type: 'paragraph', text: 'Orsola drop earrings, Concetta Short earrings and Concetta Long earrings are strong occasion pieces. They should be wiped after weddings, dinners or parties, then stored carefully in a pouch or jewellery box.' },
      { type: 'see-also', text: 'Drop earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'How to Care for Gold-Plated Butterfly Earrings',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings often have more detailed shapes, so they should be handled gently.' },
      { type: 'paragraph', text: 'Use a soft cloth to clean the front and back of the earring. If the design has small spaces, clean carefully without scrubbing. Store butterfly earrings separately so the wings or detailed areas do not rub against other pieces.' },
      { type: 'paragraph', text: 'Farfalla butterfly earrings and Alidi Farfalla butterfly earrings are especially strong for gifts and symbolic jewellery. Because they often carry emotional value, proper storage helps preserve their special feeling.' },
      { type: 'see-also', text: 'Butterfly earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'How to Care for Bold Gold-Plated Statement Earrings',
    content: [
      { type: 'paragraph', text: 'Bold statement earrings need more careful care because they are usually more detailed and more visible when worn.' },
      { type: 'paragraph', text: 'Wipe them after every event, especially if they were worn with perfume, hairspray, makeup or evening styling products. Store them separately in a soft pouch or protected box. Do not place heavy jewellery on top of them.' },
      { type: 'paragraph', text: 'Lusso bold statement earrings should be treated as occasion jewellery. They are designed to stand out, so protecting the finish and stone details matters.' },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Gold-Plated Jewellery Care While Travelling',
    content: [
      { type: 'paragraph', text: 'Travel can be rough on jewellery if pieces are packed loosely.' },
      { type: 'paragraph', text: 'Use a travel jewellery case, soft pouch or small organiser. Keep earrings separate from chains, rings and bracelets. Do not throw jewellery into a makeup bag, handbag or suitcase pocket without protection.' },
      {
        type: 'table',
        headers: ['Travel Situation', 'Best Care Step'],
        rows: [
          ['Weekend trip', 'Use a small jewellery pouch'],
          ['Long trip', 'Use a compartment jewellery case'],
          ['Wedding travel', 'Keep occasion earrings in a separate box'],
          ['Beach trip', 'Avoid wearing jewellery in water or sand'],
          ['Work trip', 'Pack simple studs and huggies'],
          ['Party trip', 'Store bold earrings separately'],
        ],
      },
      { type: 'paragraph', text: 'For travel, Cadenza S, Cadenza M and Amadea Huggie earrings are practical because they are easy to style and easier to store than larger statement pieces.' },
    ],
  },
  {
    heading: 'Product Pathways by Care Level',
    content: [
      { type: 'subheading', text: 'Easiest Gold-Plated Earrings to Care For' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Laluce minimalist diamond earrings. These are simple, easy to wipe and easy to store.' },
      { type: 'subheading', text: 'Best Everyday Gold-Plated Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings for visible daily sparkle or Amadea Huggie earrings for a modern everyday look.' },
      { type: 'subheading', text: 'Best Gold-Plated Earrings for Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea Huggie earrings. Add Laluce for a softer, minimalist stack.' },
      { type: 'subheading', text: 'Best Gold-Plated Earrings for Gifts' },
      { type: 'paragraph', text: 'Choose Cadenza M for a safe classic gift, Farfalla for a meaningful gift or Orsola for a romantic occasion gift.' },
      { type: 'subheading', text: 'Best Gold-Plated Earrings for Weddings' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings for elegant movement, Concetta Short for softer styling or Cadenza M for detailed outfits.' },
      { type: 'subheading', text: 'Best Gold-Plated Earrings for Parties' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings for high-impact styling. Wipe them after wearing and store separately.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Use', 'Care Note'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Everyday wear and first diamond earrings', 'Easy to wipe and store'],
          ['Cadenza M diamond stud earrings', 'Visible daily sparkle and gifts', 'Clean posts and backs gently'],
          ['Amadea Huggie earrings', 'Ear stacks and modern styling', 'Clean around hinge and closure'],
          ['Laluce minimalist diamond earrings', 'Minimalist everyday jewellery', 'Simple and easy to care for'],
          ['Pave Hoops', 'Hoop styling and casual sparkle', 'Store separately to avoid friction'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'Clean around detailed shape gently'],
          ['Alidi Farfalla butterfly earrings', 'Romantic or milestone gifts', 'Store carefully to protect shape'],
          ['Orsola drop earrings', 'Weddings and dinners', 'Store separately to protect movement'],
          ['Concetta Short earrings', 'Soft occasion styling', 'Wipe after events'],
          ['Concetta Long earrings', 'Formal evening looks', 'Avoid rough storage'],
          ['Lusso bold statement earrings', 'Party styling', 'Wipe after wear and store separately'],
        ],
      },
      { type: 'paragraph', text: 'Gold-plated jewellery care is simple when you build the right habits. Choose studs and minimalist earrings for easiest care, huggies for everyday stacking, butterfly earrings for meaningful gifts, drops for weddings and Lusso for bold occasions.' },
    ],
  },
  {
    heading: 'Common Gold-Plated Jewellery Care Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is showering with gold-plated jewellery. Shower products and moisture can affect the finish over time.' },
      { type: 'paragraph', text: 'Another mistake is applying perfume after jewellery is already on. Perfume should be applied first, then jewellery should be worn after the product has settled.' },
      { type: 'paragraph', text: 'A third mistake is storing earrings loose with other jewellery. Friction can affect the gold finish and cause scratches.' },
      { type: 'paragraph', text: 'Another mistake is using harsh cleaning methods. Toothpaste, baking soda, alcohol cleaners, bleach and rough brushes are not suitable for gold-plated jewellery.' },
      { type: 'paragraph', text: 'A final mistake is forgetting to wipe jewellery after wearing. A quick wipe removes oil, sweat and product buildup before it sits on the surface.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '/resources/demi-fine-jewellery-guides/does-gold-plated-jewellery-tarnish' },
    ],
  },
  {
    heading: 'Final Gold-Plated Jewellery Care Checklist',
    content: [
      { type: 'paragraph', text: 'Before wearing or storing gold-plated jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Have I applied perfume, lotion and hairspray before putting jewellery on?',
          'Am I avoiding showering or swimming with the jewellery?',
          'Will I remove it before heavy workouts?',
          'Will I wipe it after wearing?',
          'Is the jewellery fully dry before storage?',
          'Am I storing it separately?',
          'Am I avoiding rough cloths and harsh cleaners?',
          'Am I protecting detailed earrings from rubbing?',
          'Am I treating the piece as demi-fine jewellery, not waterproof jewellery?',
          'Do I have a pouch, box or organiser for storage?',
        ],
      },
      { type: 'paragraph', text: 'If these habits are followed, gold-plated jewellery can stay brighter, cleaner and more polished for longer.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'How do you care for gold-plated jewellery?',
    answer: 'Put gold-plated jewellery on after perfume and lotion, remove it before showering or swimming, wipe it after wearing, and store it separately in a dry pouch or jewellery box.',
  },
  {
    question: 'Can you wear gold-plated jewellery every day?',
    answer: 'Yes, gold-plated jewellery can be worn regularly with proper care. Studs, huggies and minimalist earrings are usually the easiest styles for daily wear.',
  },
  {
    question: 'Can you shower with gold-plated jewellery?',
    answer: 'It is better not to shower with gold-plated jewellery because water, soap, shampoo and moisture can affect the finish over time.',
  },
  {
    question: 'Can you swim with gold-plated jewellery?',
    answer: 'It is better not to swim with gold-plated jewellery. Chlorine, salt water and sunscreen can affect the gold finish.',
  },
  {
    question: 'Can sweat damage gold-plated jewellery?',
    answer: 'Sweat can affect gold-plated jewellery if it sits on the surface for too long, especially when mixed with perfume, lotion or sunscreen. Wipe jewellery after wearing.',
  },
  {
    question: 'How do you clean gold-plated earrings?',
    answer: 'Use a soft, dry jewellery cloth to wipe them gently. Avoid harsh cleaners, toothpaste, baking soda, alcohol-based products and rough brushes.',
  },
  {
    question: 'How often should I clean gold-plated jewellery?',
    answer: 'Wipe everyday pieces after each wear. Deep cleaning should be gentle and only done when needed.',
  },
  {
    question: 'How should I store gold-plated jewellery?',
    answer: 'Store it separately in a soft pouch, jewellery box or organiser. Keep it dry and away from humid spaces like bathrooms.',
  },
  {
    question: 'Does gold-plated jewellery tarnish?',
    answer: 'Gold-plated jewellery can tarnish, fade or change in appearance depending on exposure and care. Proper habits help protect the finish.',
  },
  {
    question: 'Is IWantJewels jewellery easy to care for?',
    answer: 'Yes, IWantJewels jewellery can be easy to care for when treated properly. Pieces are made with 925 sterling silver, 14kt gold plating and lab-grown diamonds, so gentle care helps preserve the finish.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Gold-plated jewellery care does not need to be complicated. The best habits are simple: put jewellery on last, remove it before water exposure, wipe it after wearing and store it separately. These small steps help protect the 14kt gold plating and keep demi-fine jewellery looking polished for longer.',
  body: 'Start with IWantJewels 14kt gold-plated lab-grown diamond earrings if you want real diamond sparkle in a wearable demi-fine finish. Choose Cadenza S for subtle daily shine, Cadenza M for classic gifts, Amadea for ear stacks, Farfalla for meaningful gifting, Orsola for wedding guest styling and Lusso for bold party looks.',
  primaryLabel: 'Shop Gold-Plated Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Demi-Fine Jewellery',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the 14kt Gold-Plated Jewellery Guide',
  tertiaryHref: '/resources/demi-fine-jewellery-guides/14kt-gold-plated-jewellery-guide',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const article = getArticleBySlug('demi-fine-jewellery-guides', 'how-to-care-for-gold-plated-jewellery')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('demi-fine-jewellery-guides', 'how-to-care-for-gold-plated-jewellery', 3)
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
