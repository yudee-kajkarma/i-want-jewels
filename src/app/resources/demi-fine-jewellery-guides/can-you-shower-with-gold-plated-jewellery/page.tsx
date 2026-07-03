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
  title: 'Can You Shower with Gold Plated Jewellery?',
  description:
    'Learn if you can shower with gold-plated jewellery, how water affects 14kt gold plating, and how to protect demi-fine earrings.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-87.jpg',
  title: 'Can You Shower with Gold-Plated Jewellery?',
  subtitle: 'Water, Care & Daily Wear Guide',
  paragraphs: [
    'It is better not to shower with gold-plated jewellery. Water alone is not always the only problem. Shower products such as shampoo, conditioner, soap, body wash, face wash and hair treatments can affect the gold finish over time, especially when the jewellery is worn in the shower regularly.',
    'At IWantJewels, pieces are made with lab-grown diamonds, 925 sterling silver and 14kt gold plating. This gives the jewellery a polished demi-fine finish, but the gold plating is still a surface layer, so it should be protected from repeated water exposure and harsh products.',
    'This resource explains why showering with gold-plated jewellery is not recommended, what happens if earrings get wet, how to dry them safely, what to avoid, and which IWantJewels styles are easiest to care for.',
  ],
  shopLabel: 'Shop Gold-Plated Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Understand whether gold-plated jewellery can be worn in the shower',
    'Learn how water, soap and shampoo affect gold plating',
    'Know what to do if gold-plated earrings accidentally get wet',
    'Understand the difference between normal wear and repeated water exposure',
    'Learn whether you can swim, work out or sleep in gold-plated jewellery',
    'Choose easier-care gold-plated earrings for everyday wear',
    'Find IWantJewels product recommendations by care level and styling use',
    'Plan image blocks, product modules, CTAs and internal links for this page',
  ],
  image: '/blog-images/blog-image-53.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Showering with Gold-Plated Jewellery: Simple Rule',
    content: [
      { type: 'paragraph', text: 'The safest rule is: remove gold-plated jewellery before showering.' },
      { type: 'paragraph', text: 'Gold-plated jewellery has a gold layer on the surface. In IWantJewels pieces, that layer is 14kt gold plating over 925 sterling silver. The jewellery is made to be worn and enjoyed, but repeated exposure to shower water and products can affect the finish over time.' },
      {
        type: 'table',
        headers: ['Situation', 'Safe for Gold-Plated Jewellery?', 'Best Action'],
        rows: [
          ['Quick daily wear', 'Yes, with care', 'Wipe after wearing'],
          ['Showering', 'Not recommended', 'Remove before showering'],
          ['Swimming pool', 'Not recommended', 'Remove before swimming'],
          ['Sea water', 'Not recommended', 'Remove before beach or swimming'],
          ['Heavy workout', 'Not recommended', 'Remove before exercise'],
          ['Light daily sweat', 'Manageable with care', 'Wipe after wearing'],
          ['Accidental water splash', 'Usually okay if handled quickly', 'Dry gently and store properly'],
          ['Sleeping', 'Not recommended', 'Remove before bed'],
        ],
      },
      { type: 'paragraph', text: 'At IWantJewels, jewellery is described as tarnish-proof and sweat-proof with care. That care includes avoiding repeated water exposure.' },
    ],
  },
  {
    heading: 'What Happens If Gold-Plated Jewellery Gets Wet?',
    content: [
      { type: 'paragraph', text: 'If gold-plated jewellery gets wet once by accident, it does not automatically mean the jewellery is ruined. The problem is repeated exposure, moisture sitting on the surface, and contact with products like soap, shampoo, chlorine or salt water.' },
      { type: 'paragraph', text: 'When jewellery gets wet often, the gold finish may start to look dull, fade faster or change in appearance. Moisture can also sit around earring posts, hinges, backs, small stones or detailed shapes if the piece is not dried properly.' },
      { type: 'paragraph', text: 'If your jewellery gets wet, gently pat it dry with a soft cloth. Do not rub aggressively. Let it air dry fully before storing it in a pouch or jewellery box.' },
      { type: 'see-also', text: 'Does gold-plated jewellery tarnish?', href: '/resources/demi-fine-jewellery-guides/does-gold-plated-jewellery-tarnish' },
    ],
  },
  {
    heading: 'Water vs Soap vs Chlorine vs Sweat',
    content: [
      { type: 'paragraph', text: 'Not all exposure is the same. Some things are more harmful to gold-plated jewellery than others.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Exposure Type', 'Risk Level', 'Why It Matters'],
            rows: [
              ['Plain water splash', 'Low to medium', 'Usually okay if dried quickly'],
              ['Shower water', 'Medium to high', 'Repeated moisture affects finish'],
              ['Soap and body wash', 'High', 'Can leave residue and affect plating'],
              ['Shampoo and conditioner', 'High', 'Can coat jewellery and dull shine'],
              ['Chlorine', 'Very high', 'Harsh on jewellery finishes'],
              ['Sea water', 'High', 'Salt can affect the surface'],
              ['Sweat', 'Medium', 'Can affect finish if left sitting'],
              ['Perfume and lotion', 'High', 'Chemicals can dull or damage the finish'],
              ['Hairspray', 'Medium to high', 'Can create buildup on earrings'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For daily wear, the goal is not to avoid life completely. The goal is to avoid repeated harsh exposure and clean the jewellery gently after wearing.' },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Is 14kt Gold Plating Waterproof?',
    content: [
      { type: 'paragraph', text: '14kt gold-plated jewellery should not be treated as waterproof jewellery.' },
      { type: 'paragraph', text: 'The gold plating is a surface layer. Even if the jewellery is made with a better base like 925 sterling silver, the gold finish still needs protection. Regular showering, swimming or soaking can affect the finish over time.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery is designed as demi-fine jewellery, not waterproof sports jewellery. It can be worn for everyday styling, gifting and occasions, but it should be removed before water exposure whenever possible.' },
      { type: 'see-also', text: '14kt gold-plated jewellery guide', href: '/resources/demi-fine-jewellery-guides/14kt-gold-plated-jewellery-guide' },
    ],
  },
  {
    heading: 'What Should You Do If Gold-Plated Jewellery Gets Wet?',
    content: [
      { type: 'paragraph', text: 'If your gold-plated jewellery gets wet, handle it gently and dry it quickly.' },
      {
        type: 'table',
        headers: ['Step', 'What to Do', 'Why It Helps'],
        rows: [
          ['1', 'Remove the jewellery', 'Stops further exposure'],
          ['2', 'Pat dry with a soft cloth', 'Removes moisture without scratching'],
          ['3', 'Avoid rubbing hard', 'Protects the gold finish'],
          ['4', 'Let it air dry fully', 'Prevents moisture from staying near posts or hinges'],
          ['5', 'Store separately once dry', 'Prevents friction and scratches'],
          ['6', 'Do not use heat', 'Avoids unnecessary stress on the finish'],
          ['7', 'Do not use harsh cleaners', 'Protects the plating'],
        ],
      },
      { type: 'paragraph', text: 'If the jewellery was exposed to soap, shampoo, chlorine or salt water, wipe it more carefully with a soft damp cloth, then dry fully. Avoid soaking the piece or scrubbing it.' },
    ],
  },
  {
    heading: 'Can You Wash Your Hands with Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'For earrings, this usually does not matter. But for gold-plated rings or bracelets, it is better to remove them before frequent handwashing if possible.' },
      { type: 'paragraph', text: 'Soap and water can affect gold-plated jewellery over time, especially with repeated exposure. If a gold-plated piece gets wet during handwashing, dry it gently afterwards.' },
      { type: 'paragraph', text: 'For IWantJewels earrings, the bigger concern is showering, swimming, heavy sweating and beauty products rather than handwashing. Still, the same care rule applies: keep gold-plated jewellery as dry and clean as possible.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Can You Swim with Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'No, it is better not to swim with gold-plated jewellery.' },
      { type: 'paragraph', text: 'Swimming pools contain chlorine, which can be harsh on jewellery finishes. Sea water contains salt, which can also affect the surface. Swimming also usually involves sunscreen, sweat, towel friction and long moisture exposure.' },
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
      { type: 'paragraph', text: 'If earrings accidentally get wet at the beach or pool, dry them as soon as possible and store them separately once fully dry.' },
      { type: 'see-also', text: 'Tarnish-proof jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Can You Work Out with Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'It is better not to work out with gold-plated jewellery.' },
      { type: 'paragraph', text: 'Sweat, friction, movement and gym equipment can affect the finish or put pressure on earrings. Light daily sweat is different from a heavy workout. If jewellery is worn on a normal day, wipe it afterwards. If you are doing intense exercise, remove it first.' },
      { type: 'paragraph', text: 'Studs and huggies are less risky than long drops or bold earrings, but the safest option is still to remove jewellery before workouts.' },
      { type: 'paragraph', text: 'At IWantJewels, jewellery is described as sweat-proof with care. That means it is designed for real-life wear when handled properly, not for heavy gym or swim use.' },
      { type: 'see-also', text: 'Sweat-proof jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Can You Sleep in Gold-Plated Earrings?',
    content: [
      { type: 'paragraph', text: 'It is better not to sleep in gold-plated earrings.' },
      { type: 'paragraph', text: 'Sleeping in earrings can cause pressure, friction and bending. It can also make earrings rub against pillows, hair or other jewellery. Over time, this can affect both the finish and the shape of the piece.' },
      { type: 'paragraph', text: 'This is especially important for huggies, hoops, drop earrings, butterfly earrings and statement earrings. Studs may feel easier to sleep in, but removing them at night is still the safest care habit.' },
      { type: 'paragraph', text: 'The best routine is: remove earrings before bed, wipe gently if needed, and store them separately.' },
      { type: 'see-also', text: 'How to store earrings', href: '#' },
    ],
  },
  {
    heading: 'Best Gold-Plated Earrings for Easier Daily Care',
    content: [
      { type: 'paragraph', text: 'Some earring styles are easier to care for than others.' },
      { type: 'paragraph', text: 'Simple studs and minimalist earrings are usually easiest because they have fewer moving parts and less surface area. Huggies are also good for daily wear, but you should clean around the hinge and closure. Drops, butterfly earrings and bold statement pieces need more careful storage.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Earring Style', 'Care Level', 'Best Use'],
            rows: [
              ['Stud earrings', 'Easiest', 'Everyday wear, gifts, workwear'],
              ['Minimalist earrings', 'Easy', 'Daily styling and subtle looks'],
              ['Huggies', 'Easy to moderate', 'Ear stacks and modern daily wear'],
              ['Small hoops', 'Moderate', 'Casual styling and shaped sparkle'],
              ['Butterfly earrings', 'Moderate', 'Gifts and romantic styling'],
              ['Drop earrings', 'Moderate', 'Weddings, dinners and occasions'],
              ['Bold statement earrings', 'More careful care needed', 'Parties and high-impact looks'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, Cadenza S, Cadenza M, Laluce and Amadea Huggie are the easiest everyday choices. Orsola, Farfalla, Concetta and Lusso are better for occasions or more styled looks where the jewellery will be stored carefully afterwards.' },
    ],
  },
  {
    heading: 'Product Pathways by Care Need',
    content: [
      { type: 'subheading', text: 'For Easiest Everyday Care' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Laluce minimalist diamond earrings. These are simple, easy to wipe and easy to store.' },
      { type: 'subheading', text: 'For Daily Wear with More Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They give more visible sparkle while staying easy to care for.' },
      { type: 'subheading', text: 'For Modern Daily Styling' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They work well for ear stacks and daily styling, but the hinge and closure should be kept clean and dry.' },
      { type: 'subheading', text: 'For Gift Jewellery' },
      { type: 'paragraph', text: 'Choose Cadenza M for a safe gift, Farfalla for a meaningful gift or Orsola for a romantic occasion gift. Add care instructions with the gift so the recipient knows how to protect the finish.' },
      { type: 'subheading', text: 'For Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings for movement, Concetta Short for softer styling or Cadenza M for a more classic look. These should be wiped after the event and stored separately.' },
      { type: 'subheading', text: 'For Party Styling' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the earrings should stand out. Remove before sleeping, wipe after wearing and store separately.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Use', 'Water-Care Note'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Everyday wear and first diamond earrings', 'Remove before showering and wipe after wear'],
          ['Cadenza M diamond stud earrings', 'Visible daily sparkle and gifts', 'Keep posts and backs dry'],
          ['Amadea Huggie earrings', 'Ear stacks and modern styling', 'Dry around hinge and closure if wet'],
          ['Laluce minimalist diamond earrings', 'Minimalist everyday jewellery', 'Easy to wipe and store'],
          ['Pave Hoops', 'Hoop styling and casual sparkle', 'Store separately to avoid friction'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'Keep detailed shape dry and clean'],
          ['Alidi Farfalla butterfly earrings', 'Romantic or milestone gifts', 'Store carefully after wearing'],
          ['Orsola drop earrings', 'Weddings and dinners', 'Avoid water exposure and store separately'],
          ['Concetta Short earrings', 'Soft occasion styling', 'Wipe after events'],
          ['Concetta Long earrings', 'Formal evening looks', 'Avoid showering or sleeping in them'],
          ['Lusso bold statement earrings', 'Party styling', 'Remove before bed and store separately'],
        ],
      },
      { type: 'paragraph', text: 'Gold-plated earrings should be removed before showering, swimming or heavy workouts. Choose studs and minimalist earrings for easiest daily care, huggies for modern styling, butterfly earrings for gifts, drops for weddings and Lusso for bold party looks.' },
    ],
  },
  {
    heading: 'Common Water-Care Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is thinking one shower will always ruin gold-plated jewellery. Accidental water exposure is usually manageable if the jewellery is dried quickly. The bigger issue is repeated showering and product exposure.' },
      { type: 'paragraph', text: 'Another mistake is drying jewellery roughly. Gold-plated jewellery should be patted dry with a soft cloth, not rubbed aggressively.' },
      { type: 'paragraph', text: 'A third mistake is storing jewellery while damp. Moisture should not sit around posts, hinges, backs or detailed shapes.' },
      { type: 'paragraph', text: 'Another mistake is wearing jewellery in pools or hot tubs. Chlorine is much harsher than plain water.' },
      { type: 'paragraph', text: 'A final mistake is treating gold-plated jewellery like solid gold. Gold plating needs more surface protection.' },
      { type: 'see-also', text: 'Gold-plated vs solid gold jewellery', href: '/resources/demi-fine-jewellery-guides/gold-plated-vs-solid-gold-jewellery' },
    ],
  },
  {
    heading: 'Final Water-Care Checklist',
    content: [
      { type: 'paragraph', text: 'Before wearing gold-plated jewellery near water, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Am I about to shower, swim or bathe?',
          'Have I removed jewellery before applying shampoo, soap or body wash?',
          'Will this jewellery be exposed to chlorine or salt water?',
          'Am I doing a heavy workout?',
          'If the jewellery gets wet, can I dry it properly?',
          'Is the jewellery fully dry before storage?',
          'Am I using a soft cloth instead of rubbing hard?',
          'Is the piece detailed, hinged or delicate?',
          'Am I storing it separately after drying?',
          'Am I treating it as demi-fine jewellery, not waterproof jewellery?',
        ],
      },
      { type: 'paragraph', text: 'If water exposure can be avoided, remove the jewellery first. That is the easiest way to protect the finish.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Can you shower with gold-plated jewellery?',
    answer: 'It is better not to shower with gold-plated jewellery. Water, soap, shampoo and moisture can affect the gold finish over time.',
  },
  {
    question: 'What happens if gold-plated jewellery gets wet?',
    answer: 'If it gets wet once, dry it gently with a soft cloth and let it air dry fully before storing. Repeated water exposure is the bigger concern.',
  },
  {
    question: 'Is 14kt gold-plated jewellery waterproof?',
    answer: 'No, 14kt gold-plated jewellery should not be treated as waterproof. The gold plating is a surface layer and should be protected.',
  },
  {
    question: 'Can you swim with gold-plated jewellery?',
    answer: 'No, it is better to remove gold-plated jewellery before swimming. Chlorine, salt water and sunscreen can affect the finish.',
  },
  {
    question: 'Can you work out with gold-plated jewellery?',
    answer: 'It is better to remove gold-plated jewellery before heavy workouts. Sweat and friction can affect the finish if left on the jewellery.',
  },
  {
    question: 'Can you sleep in gold-plated earrings?',
    answer: 'It is better not to sleep in gold-plated earrings because friction and pressure can affect the finish, posts and shape.',
  },
  {
    question: 'Can I wash my hair with gold-plated earrings in?',
    answer: 'It is better to remove gold-plated earrings before washing your hair. Shampoo, conditioner and moisture can affect the finish over time.',
  },
  {
    question: 'How do you dry gold-plated jewellery?',
    answer: 'Pat it dry gently with a soft cloth, let it air dry fully, then store it separately in a pouch or jewellery box.',
  },
  {
    question: 'Does water make gold-plated jewellery tarnish?',
    answer: 'Water can contribute to tarnish, fading or dullness, especially when combined with soap, chlorine, salt or beauty products.',
  },
  {
    question: 'Is IWantJewels jewellery safe for everyday wear?',
    answer: 'Yes, IWantJewels jewellery is made for real wear with care. Pieces are made with lab-grown diamonds, 925 sterling silver and 14kt gold plating, so proper care helps protect the finish.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Gold-plated jewellery should not be worn in the shower if you want to protect the finish for longer. The safest care habit is simple: remove before water, wipe after wear and store dry.',
  body: 'Start with IWantJewels 14kt gold-plated lab-grown diamond earrings if you want real diamond sparkle in a wearable demi-fine finish. Choose Cadenza S for subtle daily shine, Cadenza M for classic gifts, Amadea for ear stacks, Farfalla for meaningful gifting, Orsola for wedding guest styling and Lusso for bold party looks.',
  primaryLabel: 'Shop Gold-Plated Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Demi-Fine Jewellery',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Gold-Plated Jewellery Care Guide',
  tertiaryHref: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('demi-fine-jewellery-guides')
  const article = getArticleBySlug('demi-fine-jewellery-guides', 'can-you-shower-with-gold-plated-jewellery')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('demi-fine-jewellery-guides', 'can-you-shower-with-gold-plated-jewellery', 3)
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
