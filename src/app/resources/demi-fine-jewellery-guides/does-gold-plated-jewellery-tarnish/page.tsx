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
  title: 'Does Gold Plated Jewellery Tarnish?',
  description:
    'Learn whether gold-plated jewellery tarnishes, why it changes colour, how to protect it, and how to care for demi-fine gold-plated earrings.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-61.jpg',
  title: 'Does Gold-Plated Jewellery Tarnish?',
  subtitle: 'Care, Wear & Protection Guide',
  paragraphs: [
    'Gold-plated jewellery can change in appearance over time, especially if it is exposed to water, perfume, sweat, chlorine, lotions, harsh cleaners or rough storage. This does not mean all gold-plated jewellery is poor quality. It means the gold finish is a surface layer, so it needs proper care.',
    'At IWantJewels, pieces are made with 925 sterling silver, 14kt gold plating and lab-grown diamonds. This gives the jewellery a more elevated demi-fine foundation than basic fashion jewellery, but it still needs thoughtful handling to keep the gold finish looking bright and polished.',
    'This resource explains why gold-plated jewellery can tarnish or fade, what causes it, how to protect it, which styles are easiest to care for, and how shoppers can choose IWantJewels earrings for everyday wear, gifts, weddings, ear stacks and party styling.',
  ],
  shopLabel: 'Shop Gold-Plated Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Understand whether gold-plated jewellery tarnishes',
    'Learn why gold-plated jewellery can fade, dull or change colour',
    'Understand the difference between tarnish, fading and plating wear',
    'Know how 925 sterling silver and 14kt gold plating work together',
    'Learn how to protect gold-plated jewellery from water, sweat and chemicals',
    'Choose gold-plated demi-fine earrings for everyday wear and gifts',
    'Find IWantJewels product recommendations by care level and styling use',
    'Plan image blocks, product modules, CTAs and internal links for this page',
  ],
  image: '/blog-images/blog-image-39.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Does Gold-Plated Jewellery Tarnish?',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery can tarnish, fade or change in appearance over time depending on the base metal, plating quality, wear habits, storage and care routine.' },
      { type: 'paragraph', text: 'The important thing to understand is that gold plating is a surface finish. The jewellery has a layer of gold over another metal. At IWantJewels, that base metal is 925 sterling silver, with 14kt gold plating applied on top.' },
      { type: 'paragraph', text: 'Gold-plated jewellery can stay beautiful for longer when it is protected from harsh chemicals, moisture, perfume, lotion, chlorine, sweat buildup and rough friction. If it is worn in the shower, pool, gym or stored carelessly, the finish may change faster.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery is described as tarnish-proof and sweat-proof with care. That means the pieces are designed for real wear, but care is still part of the jewellery experience.' },
      { type: 'see-also', text: '14kt gold-plated jewellery guide', href: '/resources/demi-fine-jewellery-guides/14kt-gold-plated-jewellery-guide' },
    ],
  },
  {
    heading: 'Tarnish vs Fading vs Plating Wear',
    content: [
      { type: 'paragraph', text: 'Many shoppers use the word "tarnish" for any colour change, but there are a few different things that can happen to gold-plated jewellery.' },
      {
        type: 'table',
        headers: ['Change Type', 'What It Means', 'Why It Happens'],
        rows: [
          ['Tarnish', 'Darkening or dulling caused by reaction with air, moisture or chemicals', 'More common when silver or base metal reacts'],
          ['Fading', 'Gold colour becomes less bright or less warm', 'Can happen from friction, cleaning or repeated exposure'],
          ['Plating wear', 'Gold layer wears down in high-friction areas', 'Caused by rubbing, rough use or long-term wear'],
          ['Dullness', 'Jewellery loses shine but may not be damaged', 'Often caused by oil, lotion, makeup or product buildup'],
          ['Discolouration', 'Surface changes colour unevenly', 'Can happen from chemicals, chlorine or improper storage'],
        ],
      },
      { type: 'paragraph', text: 'This is why care language matters. Sometimes jewellery only needs gentle cleaning. Other times, the plating has been affected by wear or exposure. The best way to avoid problems is to protect the jewellery before visible changes happen.' },
    ],
  },
  {
    heading: 'Why Gold-Plated Jewellery Changes Colour',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery can change colour because the gold layer sits on the surface of the jewellery. That surface is exposed to everything the wearer does daily.' },
      { type: 'paragraph', text: 'Perfume, lotion, sweat, water, soap, shampoo, chlorine, salt water, makeup, hairspray and rough storage can all affect the finish over time. Even friction from other jewellery pieces can gradually wear the surface.' },
      { type: 'paragraph', text: 'This is especially important for earrings that are worn often. Studs and huggies sit close to the skin, so they may collect oil, skincare and hair products. Drop earrings and statement earrings may come into contact with perfume, hairspray and makeup during events.' },
      { type: 'paragraph', text: 'The best protection is simple: put jewellery on after beauty products, remove it before water exposure, wipe it after wearing and store it separately.' },
      { type: 'see-also', text: 'How to care for gold-plated jewellery', href: '#' },
    ],
  },
  {
    heading: 'What Affects Gold-Plated Jewellery Most?',
    content: [
      { type: 'paragraph', text: 'Some daily habits affect gold-plated jewellery more than others.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-75.jpg',
        content: [
          {
            type: 'table',
            headers: ['Exposure', 'Risk Level', 'Why It Matters'],
            rows: [
              ['Perfume', 'High', 'Contains chemicals that can affect the finish'],
              ['Lotion and skincare', 'Medium to high', 'Leaves residue and can dull shine'],
              ['Showering', 'High', 'Soap, shampoo and moisture affect the surface'],
              ['Swimming pool', 'High', 'Chlorine is harsh on jewellery finishes'],
              ['Sweat buildup', 'Medium to high', 'Can affect finish if not wiped off'],
              ['Hairspray', 'Medium', 'Can leave coating or residue'],
              ['Rough storage', 'High', 'Causes friction and scratches'],
              ['Sleeping in jewellery', 'Medium', 'Creates pressure and rubbing'],
              ['Harsh jewellery cleaners', 'High', 'Can damage plating'],
              ['Soft cloth cleaning', 'Low', 'Safe when done gently'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels earrings, the safest habit is to treat them as demi-fine jewellery: wearable, but not careless. They should be worn and enjoyed, then cleaned and stored properly.' },
    ],
  },
  {
    heading: 'Does 14kt Gold Plating Tarnish?',
    content: [
      { type: 'paragraph', text: '14kt gold plating can change in appearance over time if it is exposed to harsh conditions or friction.' },
      { type: 'paragraph', text: 'The gold layer itself gives the jewellery its warm finish, but because it is plating, it is not the same as solid gold throughout the piece. It should be protected from chemicals, water, chlorine and rough handling.' },
      { type: 'paragraph', text: 'This does not make 14kt gold-plated jewellery a bad choice. It simply means buyers should understand the category. Gold-plated jewellery is a strong demi-fine option when shoppers want the look of gold without solid gold pricing.' },
      { type: 'paragraph', text: 'At IWantJewels, 14kt gold plating is used over 925 sterling silver, which gives the piece a better base than many low-cost fashion jewellery metals.' },
      { type: 'see-also', text: 'Gold-plated vs solid gold jewellery', href: '/resources/demi-fine-jewellery-guides/gold-plated-vs-solid-gold-jewellery' },
    ],
  },
  {
    heading: 'Does 925 Sterling Silver Under Gold Plating Tarnish?',
    content: [
      { type: 'paragraph', text: '925 sterling silver can tarnish when exposed to air, moisture, chemicals or improper storage. If the gold plating is affected or worn down over time, the silver underneath may become more exposed.' },
      { type: 'paragraph', text: 'This is why the base metal and care routine both matter.' },
      { type: 'paragraph', text: 'A 925 sterling silver base is still a strong demi-fine material choice. It is more elevated than many unclear base metals used in low-cost fashion jewellery. But sterling silver is still a material that needs care.' },
      { type: 'paragraph', text: 'At IWantJewels, the jewellery story is: 925 sterling silver base, 14kt gold plating and lab-grown diamonds. The silver provides structure, the gold plating provides finish, and the lab-grown diamonds provide real diamond sparkle.' },
      { type: 'see-also', text: '925 sterling silver jewellery guide', href: '/resources/demi-fine-jewellery-guides/925-sterling-silver-jewellery-guide' },
    ],
  },
  {
    heading: 'Can You Wear Gold-Plated Jewellery Every Day?',
    content: [
      { type: 'paragraph', text: 'Yes, gold-plated jewellery can be worn regularly if the design is practical and the care routine is good.' },
      { type: 'paragraph', text: 'For everyday wear, choose jewellery that is simple, comfortable and easy to clean. Stud earrings, huggies, minimalist earrings and small hoops are usually better for daily use than long drops or bold statement earrings.' },
      {
        type: 'table',
        headers: ['Everyday Use', 'Best Gold-Plated Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Subtle daily sparkle', 'Small studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Medium studs', 'Cadenza M'],
          ['Modern daily styling', 'Huggies', 'Amadea Huggie'],
          ['Minimalist daily jewellery', 'Minimalist earrings', 'Laluce'],
          ['Hoop styling', 'Small hoops', 'Pave Hoops'],
          ['Day-to-night styling', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Is demi-fine jewellery good for everyday wear?', href: '/resources/demi-fine-jewellery-guides/is-demi-fine-jewellery-good-for-everyday-wear' },
    ],
  },
  {
    heading: 'Can Sweat Affect Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'Sweat can affect gold-plated jewellery if it sits on the surface for too long, especially when mixed with lotions, perfumes, sunscreen or skincare products.' },
      { type: 'paragraph', text: 'This does not mean gold-plated jewellery cannot be worn in real life. It means the wearer should avoid heavy workouts, swimming, long exposure to sweat and storing jewellery without wiping it first.' },
      { type: 'paragraph', text: 'At IWantJewels, jewellery is described as sweat-proof with care. This means the pieces can handle normal wear better when cared for properly, but they should not be treated like gym jewellery or waterproof sports accessories.' },
      { type: 'paragraph', text: 'Best habit: remove jewellery before intense workouts and wipe it gently after wearing.' },
      { type: 'see-also', text: 'Sweat-proof jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Can Water Affect Gold-Plated Jewellery?',
    content: [
      { type: 'paragraph', text: 'Yes, water can affect gold-plated jewellery over time, especially when combined with soap, shampoo, conditioner, chlorine, salt water or body wash.' },
      { type: 'paragraph', text: 'The biggest issue is not always plain water. It is the repeated exposure to moisture and products. Showering, swimming and washing with jewellery on can make the gold finish wear faster.' },
      { type: 'paragraph', text: 'For IWantJewels jewellery, the safest rule is:' },
      { type: 'paragraph', text: 'Remove gold-plated earrings before showering, swimming, bathing or using strong beauty products.' },
      { type: 'paragraph', text: 'This simple habit helps protect the 14kt gold plating and keeps the jewellery looking better for longer.' },
      { type: 'see-also', text: 'Can you shower with gold-plated jewellery?', href: '#' },
    ],
  },
  {
    heading: 'How to Stop Gold-Plated Jewellery from Tarnishing',
    content: [
      { type: 'paragraph', text: 'You cannot control every bit of natural wear, but you can slow down tarnish, fading and dullness with better habits.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-77.jpg',
        content: [
          {
            type: 'table',
            headers: ['Care Habit', 'Why It Helps'],
            rows: [
              ['Put jewellery on last', 'Avoids perfume, lotion and makeup exposure'],
              ['Take jewellery off before showering', 'Protects plating from water and products'],
              ['Remove before swimming', 'Avoids chlorine and salt water'],
              ['Wipe after wearing', 'Removes oil, sweat and residue'],
              ['Store separately', 'Prevents friction and scratching'],
              ['Use a soft cloth', 'Cleans without damaging the surface'],
              ['Avoid harsh cleaners', 'Protects gold plating'],
              ['Keep away from humidity', 'Helps reduce tarnish risk'],
              ['Do not sleep in jewellery', 'Reduces rubbing and pressure'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'Gold-plated jewellery care should feel simple, not stressful. The goal is to build easy habits that protect the finish.' },
    ],
  },
  {
    heading: 'Best Gold-Plated Earrings for Easier Care',
    content: [
      { type: 'paragraph', text: 'Some earring styles are easier to care for than others.' },
      { type: 'paragraph', text: 'Simple studs, huggies and minimalist earrings are usually easier to clean and store because they have fewer long or delicate parts. Drop earrings and bold statement earrings can still be cared for properly, but they need more careful storage.' },
      {
        type: 'table',
        headers: ['Earring Style', 'Care Ease', 'Best Use'],
        rows: [
          ['Stud earrings', 'Very easy', 'Everyday wear and gifts'],
          ['Huggies', 'Easy', 'Daily styling and ear stacks'],
          ['Minimalist earrings', 'Easy', 'Quiet everyday wear'],
          ['Small hoops', 'Easy to moderate', 'Casual styling and daily sparkle'],
          ['Butterfly earrings', 'Moderate', 'Gifts and feminine styling'],
          ['Drop earrings', 'Moderate', 'Weddings and occasions'],
          ['Bold statement earrings', 'More careful care needed', 'Parties and high-impact looks'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, Cadenza S, Cadenza M, Amadea Huggie and Laluce are the easiest everyday options. Orsola, Farfalla and Lusso are better when the jewellery is more occasion-led and stored carefully after use.' },
    ],
  },
  {
    heading: 'Gold-Plated Jewellery for Gifts',
    content: [
      { type: 'paragraph', text: 'Gold-plated demi-fine jewellery can be a strong gift choice because it looks polished, feels special and is more accessible than solid gold jewellery.' },
      { type: 'paragraph', text: 'The key is to choose a piece that the recipient will actually wear and care for. Studs are the safest gift because they are easy to wear and easy to maintain. Butterfly earrings are better for symbolic gifts. Huggies are strong for modern jewellery lovers. Drops work well for romantic or occasion-led gifts.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Gold-Plated Direction', 'Product Direction'],
        rows: [
          ['Safe birthday gift', 'Classic studs', 'Cadenza S, Cadenza M'],
          ['Meaningful gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Modern gift', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Romantic gift', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
          ['Bridesmaid gift', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Party-loving recipient', 'Bold earrings', 'Lusso'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Gold-Plated Jewellery for Weddings and Occasions',
    content: [
      { type: 'paragraph', text: 'Gold-plated lab-grown diamond earrings work well for weddings and events because they give warmth, sparkle and polish without needing every piece to be solid gold.' },
      { type: 'paragraph', text: 'Yellow gold tones work especially well with champagne, black, green, red, cream, ivory and warm-toned wedding outfits. Rose-toned finishes can feel softer for romantic looks, while white or silver tones feel cleaner and more modern.' },
      {
        type: 'table',
        headers: ['Occasion Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Wedding guest outfit', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Bridesmaid styling', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Romantic dress', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Orsola'],
          ['Evening reception', 'Drops or bold earrings', 'Orsola, Lusso'],
          ['Party styling', 'Hoops, drops or statement earrings', 'Pave Hoops, Lusso'],
          ['Day-to-night outfit', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for weddings', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-weddings' },
    ],
  },
  {
    heading: 'Gold-Plated Jewellery for Ear Stacks',
    content: [
      { type: 'paragraph', text: 'Gold-plated jewellery is useful for ear stacks because it lets shoppers create a warm, coordinated look across multiple piercings.' },
      { type: 'paragraph', text: 'The easiest way to make a gold-plated ear stack look polished is to keep the same metal direction across the stack. A simple stack can include a small stud and a huggie. A more visible stack can use a medium stud with a huggie or small hoop.' },
      {
        type: 'table',
        headers: ['Ear Stack Goal', 'Product Combination', 'Why It Works'],
        rows: [
          ['Simple daily stack', 'Cadenza S + Amadea Huggie', 'Clean and easy to wear'],
          ['More visible stack', 'Cadenza M + Amadea', 'Adds more sparkle'],
          ['Minimalist stack', 'Cadenza S + Laluce', 'Soft and balanced'],
          ['Hoop stack', 'Pave Hoops + Cadenza S', 'Adds shape and sparkle'],
          ['Romantic stack', 'Farfalla + Cadenza S', 'Adds meaning and softness'],
          ['Party stack', 'Lusso + Cadenza S', 'Lets one bold piece stand out'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Care and Styling Need',
    content: [
      { type: 'subheading', text: 'For Low-Maintenance Everyday Earrings' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Laluce minimalist diamond earrings. These are simple, easier to wipe and easy to store.' },
      { type: 'subheading', text: 'For Everyday Sparkle with More Presence' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They give more visible sparkle while still being easier to care for than long or bold earrings.' },
      { type: 'subheading', text: 'For Modern Daily Styling' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings or Pave Hoops. These work well for shoppers who like shaped earrings and ear stacks.' },
      { type: 'subheading', text: 'For Meaningful Gifts' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings. Store them carefully to protect the detailed shape and finish.' },
      { type: 'subheading', text: 'For Wedding Guest Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings for movement or Cadenza M studs if the outfit already has detail.' },
      { type: 'subheading', text: 'For Party Styling' },
      { type: 'paragraph', text: 'Choose Lusso bold statement earrings when the jewellery should stand out. Wipe after wearing and store separately to protect the finish.' },
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
          ['Laluce minimalist diamond earrings', 'Minimalist everyday jewellery', 'Easy-care daily option'],
          ['Pave Hoops', 'Hoop styling and casual sparkle', 'Store separately to avoid friction'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'Clean around detailed shape gently'],
          ['Alidi Farfalla butterfly earrings', 'Romantic or milestone gifts', 'Store carefully to protect finish'],
          ['Orsola drop earrings', 'Weddings and dinners', 'Store separately to protect movement'],
          ['Concetta Short earrings', 'Soft occasion styling', 'Wipe after events'],
          ['Concetta Long earrings', 'Formal evening looks', 'Avoid rough storage'],
          ['Lusso bold statement earrings', 'Party styling', 'Wipe after wear and store separately'],
        ],
      },
      { type: 'paragraph', text: 'Gold-plated jewellery can stay beautiful for longer when it is cared for properly. Choose studs and huggies for easier daily wear, butterfly earrings for meaningful gifts, drops for weddings and Lusso for bold occasions.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is assuming gold-plated jewellery can be worn exactly like solid gold. Gold plating is a surface finish and needs more care.' },
      { type: 'paragraph', text: 'Another mistake is showering or swimming with gold-plated jewellery. Water, soap, chlorine and salt can affect the finish over time.' },
      { type: 'paragraph', text: 'A third mistake is applying perfume after putting jewellery on. Jewellery should be the last thing you put on when getting ready.' },
      { type: 'paragraph', text: 'Another mistake is storing all jewellery together. Pieces can rub against each other and wear down the finish faster.' },
      { type: 'paragraph', text: 'A final mistake is using harsh cleaners or rough cloths. Gold-plated jewellery should be cleaned gently with a soft cloth.' },
      { type: 'see-also', text: 'Gold-plated vs solid gold jewellery', href: '/resources/demi-fine-jewellery-guides/gold-plated-vs-solid-gold-jewellery' },
    ],
  },
  {
    heading: 'Final Care Checklist',
    content: [
      { type: 'paragraph', text: 'Before wearing or storing gold-plated jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Have I applied perfume, lotion and hairspray before putting jewellery on?',
          'Will I remove the jewellery before showering or swimming?',
          'Will I avoid wearing it during heavy workouts?',
          'Will I wipe it gently after wearing?',
          'Will I store it separately?',
          'Am I avoiding harsh cleaners and rough cloths?',
          'Is the jewellery dry before storage?',
          'Am I keeping it away from chlorine and salt water?',
          'Am I treating it as demi-fine jewellery, not waterproof jewellery?',
          'Does the piece need extra care because it has detailed shapes or movement?',
        ],
      },
      { type: 'paragraph', text: 'If you follow these habits, gold-plated demi-fine jewellery can stay brighter and more polished for longer.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Does gold-plated jewellery tarnish?',
    answer: 'Gold-plated jewellery can tarnish, fade or change in appearance over time depending on the base metal, plating quality, wear habits and care routine.',
  },
  {
    question: 'Why does gold-plated jewellery tarnish?',
    answer: 'Gold-plated jewellery can change because of moisture, chemicals, sweat, perfume, lotion, chlorine, rough storage or friction.',
  },
  {
    question: 'Does 14kt gold-plated jewellery tarnish?',
    answer: '14kt gold plating can change in appearance over time if exposed to harsh conditions. Proper care helps protect the finish.',
  },
  {
    question: 'Does gold-plated sterling silver tarnish?',
    answer: 'Sterling silver can tarnish when exposed to air, moisture and chemicals. If the plating wears down, the silver underneath may become more exposed.',
  },
  {
    question: 'Can you wear gold-plated jewellery every day?',
    answer: 'Yes, gold-plated jewellery can be worn regularly with proper care. Studs, huggies and minimalist earrings are usually easiest for daily wear.',
  },
  {
    question: 'Can sweat ruin gold-plated jewellery?',
    answer: 'Sweat can affect the finish if it sits on the jewellery for too long, especially when mixed with lotions, perfume or sunscreen. Wipe jewellery after wearing.',
  },
  {
    question: 'Can water damage gold-plated jewellery?',
    answer: 'Water and shower products can affect gold-plated jewellery over time. It is best to remove it before showering, swimming or bathing.',
  },
  {
    question: 'How do you keep gold-plated jewellery from tarnishing?',
    answer: 'Avoid water, perfume, lotion, chlorine and harsh cleaners. Wipe jewellery after wearing and store it separately in a dry place.',
  },
  {
    question: 'Is gold-plated jewellery worth buying?',
    answer: 'Yes, gold-plated jewellery is worth buying if you want a polished gold look in a more accessible demi-fine format and are willing to care for it properly.',
  },
  {
    question: 'Is IWantJewels jewellery tarnish-proof?',
    answer: 'IWantJewels jewellery is described as tarnish-proof and sweat-proof with care. Proper care is still important to protect the finish and keep pieces looking beautiful.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Gold-plated jewellery can tarnish or change over time if it is not cared for properly, but the right habits can help protect the finish. Keep jewellery away from perfume, lotion, water, chlorine, harsh cleaners and rough storage, then wipe it after wearing and store it separately.',
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
  const article = getArticleBySlug('demi-fine-jewellery-guides', 'does-gold-plated-jewellery-tarnish')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('demi-fine-jewellery-guides', 'does-gold-plated-jewellery-tarnish', 3)
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
