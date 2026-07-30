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
  title: 'Lab Grown Diamond Drop Earrings Guide | I Want Jewels',
  description:
    'Learn how to choose lab grown diamond drop earrings for weddings, parties, gifts, evening outfits and everyday occasion styling.'
} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide', locale),
  }
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-98.jpg',
  title: 'Lab-Grown Diamond Drop Earrings Guide',
  subtitle: 'How to Choose, Style and Gift the Perfect Pair',
  paragraphs: [
    'Lab-grown diamond drop earrings are earrings that hang slightly below the earlobe, adding movement, sparkle and elegance to an outfit. They are a strong choice for wedding guests, dinners, parties, date nights, bridesmaids and evening looks because they feel more dressed up than studs but are usually easier to wear than very large bold earrings.',
    'The best lab-grown diamond drop earrings depend on the outfit and occasion. Choose shorter drops for soft everyday elegance, longer drops for evening outfits, and more detailed designs when you want the earrings to be the main jewellery moment. For IWantJewels, Orsola drop earrings are a strong choice for wedding guest and evening styling, while Concetta Long earrings work well when you want a more elongated, polished look.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Drop Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamond drop earrings hang below the earlobe and add movement to the look.',
    'They are ideal for weddings, dinners, parties, date nights and evening outfits.',
    'Shorter drops feel softer and easier to wear; longer drops feel more dramatic and occasion-ready.',
    'Drop earrings work especially well with strapless, off-shoulder, V-neck, sweetheart and simple round necklines.',
    'If the outfit already has heavy detail, choose a simpler drop or diamond studs instead.',
    'Yellow gold feels warm and classic, white or silver tones feel clean and modern, and rose gold feels softer and more romantic.',
    'Orsola drop earrings are a strong wedding guest choice, while Concetta Long earrings are better for a longer evening look.',
    'Drop earrings are also good gifts when the person enjoys dressing up or wearing occasion jewellery.',
  ],
  image: '/blog-images/blog-image-102.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Are Lab-Grown Diamond Drop Earrings?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond drop earrings are earrings that extend below the earlobe and usually add a sense of movement. Unlike studs, which sit close to the ear, drop earrings hang down slightly. This makes them more noticeable and often more elegant.' },
      { type: 'paragraph', text: 'When made with genuine lab-grown diamonds, the stones are real diamonds created in a controlled laboratory environment instead of being mined from the earth. They are not cubic zirconia, glass or crystal. The difference is origin, not whether the diamond is real.' },
      { type: 'paragraph', text: 'Drop earrings are popular because they can change the feeling of an outfit quickly. A simple dress can feel more polished with the right pair of drops. A wedding guest outfit can look more finished. A dinner look can feel more intentional. They are the kind of earrings people choose when they want jewellery to be seen, but still feel elegant.' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real' },
    ],
  },
  {
    heading: 'Why Choose Lab-Grown Diamond Drop Earrings?',
    content: [
      { type: 'paragraph', text: 'Choose lab-grown diamond drop earrings when you want more movement and elegance than studs can give.' },
      { type: 'paragraph', text: 'Studs are perfect for daily wear, but they stay close to the ear. Drop earrings create a longer line and catch the light when you move. That makes them especially useful for occasions where you want the jewellery to feel more dressed up.' },
      { type: 'paragraph', text: 'They are also a practical alternative to heavy necklaces. If your outfit has a beautiful neckline, an open shoulder, or a detailed bodice, drop earrings can add sparkle without crowding the look. In many outfits, the right earrings are enough.' },
      { type: 'paragraph', text: 'For IWantJewels shoppers, lab-grown diamond drop earrings are useful because they give real diamond sparkle in a demi-fine format. They feel special, but they are still wearable for more than one event.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Drop Earrings vs Stud Earrings',
    content: [
      { type: 'paragraph', text: 'Drop earrings and stud earrings both have a place in a jewellery collection, but they serve different purposes.' },
      {
        type: 'table',
        headers: ['Feature', 'Drop Earrings', 'Stud Earrings'],
        rows: [
          ['Shape', 'Hangs below the earlobe', 'Sits close to the earlobe'],
          ['Best for', 'Weddings, dinners, parties, evening looks', 'Everyday wear, work, simple outfits'],
          ['Movement', 'More movement and light reflection', 'Little or no movement'],
          ['Style feeling', 'Elegant, dressed-up, noticeable', 'Classic, simple, timeless'],
          ['Gift safety', 'Good if the person likes occasion jewellery', 'Safest for almost anyone'],
          ['Best IWJ direction', 'Orsola Drop, Concetta Long, Concetta Short', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'paragraph', text: 'Choose studs if you want a safe everyday pair. Choose drops if you want something that feels more special, more outfit-led and more noticeable.' },
      { type: 'see-also', text: 'Stud vs drop earrings', href: '#' },
    ],
  },
  {
    heading: 'When Should You Wear Lab-Grown Diamond Drop Earrings?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond drop earrings work best when the outfit or occasion can handle a little more shine.' },
      { type: 'paragraph', text: 'They are perfect for wedding guest outfits, bridesmaid looks, evening dinners, birthday dinners, date nights, cocktail parties and festive events. They can also work for smart daytime looks if the drop is small and refined.' },
      { type: 'paragraph', text: 'The easiest rule is this: wear drop earrings when you want your jewellery to add shape, movement and polish. If your outfit feels too plain, drops can lift it. If your outfit already has a lot of detail, use simpler drops or choose studs instead.' },
      {
        type: 'table',
        headers: ['Occasion', 'Best Drop Earring Style', 'Why It Works'],
        rows: [
          ['Wedding guest', 'Elegant medium drops', 'Adds sparkle without looking bridal'],
          ['Bridesmaid', 'Soft, refined drops', 'Looks graceful in photos'],
          ['Dinner or date night', 'Short or medium drops', 'Feels dressed up without being too heavy'],
          ['Party outfit', 'Longer or bolder drops', 'Adds movement and stronger sparkle'],
          ['Black dress', 'Diamond drops or bold sparkle', 'Creates contrast and polish'],
          ['Minimal outfit', 'Clean drop earrings', 'Adds interest without needing a necklace'],
          ['Romantic outfit', 'Rose gold or butterfly-inspired styles', 'Feels softer and more feminine'],
        ],
      },
      { type: 'paragraph', text: 'For IWantJewels, Orsola drop earrings are a strong choice for weddings, dinners and softer evening looks. Concetta Long earrings work well when you want a more elongated shape.' },
    ],
  },
  {
    heading: 'Best Necklines for Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Drop earrings work beautifully when the neckline gives them space.' },
      { type: 'paragraph', text: 'They are especially good with strapless, sweetheart, V-neck, off-shoulder, square neck and simple round neck outfits. These necklines leave enough room around the neck and shoulders, so the earrings can stand out without making the outfit feel crowded.' },
      { type: 'paragraph', text: 'High-neck outfits can also work with drop earrings, but the drop should usually be cleaner and more refined. If the high neckline is already bold, a stud may be easier.' },
      {
        type: 'table',
        headers: ['Neckline', 'Best Earring Choice'],
        rows: [
          ['Strapless', 'Drop earrings or bold earrings'],
          ['Sweetheart', 'Romantic drop earrings'],
          ['V-neck', 'Medium or longer drops'],
          ['Off-shoulder', 'Drop earrings with movement'],
          ['Square neck', 'Clean, elegant drops'],
          ['High neck', 'Simple studs or refined drops'],
          ['Halter neck', 'Studs or slim drops'],
          ['Detailed neckline', 'Studs or very simple drops'],
        ],
      },
      { type: 'see-also', text: 'Earrings for off-shoulder dresses', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Drop Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond drop earrings are one of the best jewellery choices for wedding guests.' },
      { type: 'paragraph', text: 'They add polish without needing a heavy necklace. They also photograph well because they frame the face and add light near the cheek and jawline. This is especially helpful for satin dresses, black dresses, pastel dresses, off-shoulder outfits and simple evening gowns.' },
      { type: 'paragraph', text: 'The key is balance. Wedding guest jewellery should feel elegant, but not bridal. Avoid anything that feels too close to bridal styling if the outfit is already white, ivory or heavily embellished. A clean pair of diamond drops can look beautiful without competing with the bride.' },
      { type: 'paragraph', text: 'For wedding guest looks, Orsola drop earrings are a strong recommendation because they add movement and elegance. Concetta Short can work if you want a slightly softer drop, while Concetta Long is better for a more elongated evening look.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Drop Earrings for Parties',
    content: [
      { type: 'paragraph', text: 'For parties, drop earrings can become the main jewellery moment.' },
      { type: 'paragraph', text: 'If you are wearing a simple dress, jumpsuit or sleek evening outfit, a diamond drop earring can add enough sparkle without needing much else. This works especially well with black, navy, red, emerald, champagne, ivory or satin outfits.' },
      { type: 'paragraph', text: 'For a party look, you can go slightly stronger than you would for everyday wear. Longer drops, more visible stones and bolder silhouettes all make sense when the outfit is simple. If the dress already has sequins or shimmer, choose a cleaner drop or a classic stud.' },
      { type: 'paragraph', text: 'Orsola drop earrings are a good choice when you want elegant sparkle. Lusso bold statement earrings are better when you want the jewellery to feel more dramatic and high-impact.' },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Drop Earrings for Gifts',
    content: [
      { type: 'paragraph', text: 'Drop earrings make lovely gifts when the person enjoys dressing up or wearing occasion jewellery.' },
      { type: 'paragraph', text: 'They feel more special than everyday studs and can be a good choice for birthdays, anniversaries, bridesmaids, holiday gifts or romantic gifts. The only thing to keep in mind is personal style. Some people wear drops often, while others prefer simple studs.' },
      { type: 'paragraph', text: 'If you are not sure about the person\'s style, studs are safer. If you know they enjoy dresses, dinners, weddings or parties, drop earrings can feel more exciting.' },
      { type: 'paragraph', text: 'Orsola drop earrings are a strong gift choice for someone who likes elegant outfits. Concetta Short may feel easier to wear if the person prefers softer jewellery. Concetta Long is better for someone who likes a more refined evening look.' },
      { type: 'see-also', text: 'Explore jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Short Drop Earrings vs Long Drop Earrings',
    content: [
      { type: 'paragraph', text: 'The best drop length depends on the outfit and how dramatic you want the earrings to feel.' },
      { type: 'paragraph', text: 'Short drop earrings are easier to wear and usually feel softer. They are good for dinners, wedding guests, bridesmaids and people who do not wear bold jewellery often. Long drop earrings feel more elegant and dramatic. They work better for evening dresses, simple outfits and occasions where the earrings should stand out.' },
      {
        type: 'table',
        headers: ['Drop Length', 'Best For', 'Style Feeling'],
        rows: [
          ['Short drops', 'Dinners, subtle occasions, softer outfits', 'Elegant, easy, wearable'],
          ['Medium drops', 'Weddings, parties, date nights', 'Polished, balanced, noticeable'],
          ['Long drops', 'Evening gowns, simple dresses, formal outfits', 'Dramatic, refined, elongated'],
        ],
      },
      { type: 'paragraph', text: 'If you are buying your first pair of drop earrings, a short or medium drop is usually safer. It will feel easier to repeat across multiple outfits.' },
    ],
  },
  {
    heading: 'What Metal Colour Is Best for Drop Earrings?',
    content: [
      { type: 'paragraph', text: 'Metal colour changes the mood of drop earrings.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, classic and slightly richer. It works beautifully with black, cream, brown, red, green and warm-toned outfits. White or silver tones feel crisp and modern. They work well with cool-toned dresses, black outfits, navy, grey and minimal styling. Rose gold feels softer and more romantic, making it useful for gifts, pastel outfits and feminine dresses.' },
      {
        type: 'table',
        headers: ['Metal Colour', 'Best For', 'Style Feeling'],
        rows: [
          ['Yellow gold', 'Classic outfits, warm colours, evening looks', 'Warm, elegant, timeless'],
          ['White or silver tone', 'Modern outfits, cool tones, black dresses', 'Clean, bright, polished'],
          ['Rose gold', 'Romantic outfits, gifts, soft colours', 'Feminine, gentle, warm'],
        ],
      },
      { type: 'paragraph', text: 'For gifts, choose the metal colour the person already wears. If they usually wear yellow gold, stay with yellow gold. If they wear silver watches or white-toned jewellery, choose a white or silver finish. If the gift is romantic or soft, rose gold can feel more personal.' },
    ],
  },
  {
    heading: 'Are Drop Earrings Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Some drop earrings can be worn every day, but most are better for smart-casual or occasion styling.' },
      { type: 'paragraph', text: 'If the drop is small, lightweight and simple, it can work for daily outfits. But longer or more detailed drop earrings usually feel more dressed up. They are better for dinners, events, wedding guest outfits and days when you want your jewellery to be noticed.' },
      { type: 'paragraph', text: 'For everyday wear, studs and huggies are usually easier. For occasional elegance, drop earrings are stronger.' },
      { type: 'paragraph', text: 'If you want something more daily-friendly from IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Laluce minimalist diamond earrings or Amadea Huggie earrings may be better. If you want occasion sparkle, Orsola drop earrings or Concetta Long earrings make more sense.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'How to Style Lab-Grown Diamond Drop Earrings',
    content: [
      { type: 'paragraph', text: 'The simplest way to style drop earrings is to let them have space.' },
      { type: 'paragraph', text: 'Avoid crowding them with a heavy necklace unless the outfit needs it. Drop earrings often look best with clean necklines, pulled-back hair, soft waves, low buns or sleek evening styling. If your earrings are more detailed, keep the rest of the jewellery simple.' },
      { type: 'paragraph', text: 'For a black dress, drop earrings can add brightness and shape. For a satin dress, they add movement and polish. For a strapless dress, they help frame the face and shoulders. For an off-shoulder outfit, they draw attention upward without needing a necklace.' },
      { type: 'paragraph', text: 'For a simple outfit, choose Orsola drop earrings or Concetta Long. For a more dramatic party outfit, Lusso bold statement earrings can work better. For a softer romantic dress, butterfly earrings may feel more personal than classic drops.' },
      { type: 'see-also', text: 'Jewellery for strapless dresses', href: '#' },
    ],
  },
  {
    heading: 'How Much Should You Spend on Lab-Grown Diamond Drop Earrings?',
    content: [
      { type: 'paragraph', text: 'The right amount depends on how often you will wear them and why you are buying them.' },
      { type: 'paragraph', text: 'If you need earrings for one event, choose something that can be worn again later. If you often attend weddings, dinners or parties, it can make sense to choose a more polished pair. If you are buying a gift, think about the person\'s style and whether they actually wear drop earrings.' },
      { type: 'paragraph', text: 'Do not choose only by size or sparkle. A well-balanced drop earring that suits your face and outfit can look better than a larger pair that feels too heavy.' },
      { type: 'paragraph', text: 'For most shoppers, the best value comes from a drop earring that works for more than one occasion. Orsola is strong for this because it can suit weddings, dinners and evening looks. Concetta Long is better if you want something more elongated and refined.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings price guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-price-guide' },
    ],
  },
  {
    heading: 'What Should You Check Before Buying Drop Earrings?',
    content: [
      { type: 'paragraph', text: 'Before buying lab-grown diamond drop earrings, look at the full design.' },
      { type: 'paragraph', text: 'Check the length, weight, backing, movement, metal colour, diamond details and how the earrings will sit near the face. Drop earrings should feel elegant, not uncomfortable. If they are too heavy or too long for your style, you may not wear them often.' },
      {
        type: 'table',
        headers: ['What to Check', 'Why It Matters'],
        rows: [
          ['Drop length', 'Affects how dramatic the earrings look'],
          ['Weight', 'Important for comfort'],
          ['Movement', 'Adds elegance, but should not feel distracting'],
          ['Diamond type', 'Confirms the stones are lab-grown diamonds'],
          ['Metal colour', 'Should match the outfit and existing jewellery'],
          ['Backing or closure', 'Helps the earrings feel secure'],
          ['Occasion', 'Helps choose between subtle and bold styles'],
          ['Rewear potential', 'Makes the purchase more useful'],
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose a balanced medium drop. It is usually easier to style than something very long or very bold.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you are shopping for drop earrings or occasion-ready lab-grown diamond earrings, these are the strongest starting points.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Orsola drop earrings', 'Wedding guests, dinners and evening looks', 'Adds movement, elegance and sparkle'],
          ['Concetta Long earrings', 'Longer evening styling', 'Creates a refined, elongated look'],
          ['Concetta Short earrings', 'Softer occasion styling', 'Easier to wear than a long drop'],
          ['Lusso bold statement earrings', 'Parties and high-impact looks', 'Stronger sparkle for dressed-up outfits'],
          ['Cadenza M diamond stud earrings', 'Detailed outfits where drops may be too much', 'Classic sparkle without movement'],
          ['Farfalla butterfly earrings', 'Romantic gifts and soft dresses', 'Adds meaning and feminine detail'],
        ],
      },
      { type: 'paragraph', text: 'If you want elegant occasion jewellery, start with lab-grown diamond drop earrings. Choose Orsola for wedding guest styling, Concetta Long for a more refined evening look, or Lusso if you want stronger party sparkle.' },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing drop earrings that are too heavy. Even if they look beautiful, uncomfortable earrings will not be worn often.' },
      { type: 'paragraph', text: 'Another mistake is wearing large drop earrings with an already busy neckline. If the outfit has heavy detail, embroidery or a bold necklace, studs may be better.' },
      { type: 'paragraph', text: 'A third mistake is buying a pair that works for only one outfit. The best drop earrings should work for weddings, dinners, parties and future events.' },
      { type: 'paragraph', text: 'Finally, do not ignore hairstyle. Drop earrings often look best when the hair gives them space, such as with soft waves, tucked hair, a low bun or a sleek updo.' },
      { type: 'see-also', text: 'What earrings to wear as a wedding guest', href: '#' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying Lab-Grown Diamond Drop Earrings',
    content: [
      { type: 'paragraph', text: 'Before buying, ask yourself:' },
      { type: 'bullet-list', items: [
        'Am I buying these for a wedding, party, dinner, gift or everyday styling?',
        'Do I want a short, medium or long drop?',
        'Will the earrings feel comfortable enough to wear for several hours?',
        'Does the metal colour match my outfit or usual jewellery?',
        'Are the stones genuine lab-grown diamonds?',
        'Does the design suit my neckline?',
        'Can I wear the earrings again after the event?',
        'Do I need a subtle drop or a bolder jewellery moment?',
      ]},
      { type: 'paragraph', text: 'If you are unsure, choose a balanced, elegant drop rather than the most dramatic option. It will usually be easier to wear again.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What are lab-grown diamond drop earrings?', answer: 'Lab-grown diamond drop earrings are earrings that hang slightly below the earlobe and use genuine lab-grown diamonds. They add movement, sparkle and elegance to an outfit.' },
  { question: 'Are lab-grown diamond drop earrings real diamonds?', answer: 'Yes, when they use genuine lab-grown diamonds, they are real diamond earrings. The diamonds are created in a laboratory instead of being mined from the earth.' },
  { question: 'Are drop earrings good for wedding guests?', answer: 'Yes, drop earrings are excellent for wedding guests because they add polish and movement without needing a heavy necklace.' },
  { question: 'Are drop earrings better than studs?', answer: 'Drop earrings are better for occasions, dinners and dressed-up looks. Studs are better for everyday wear, work outfits and safer gifting.' },
  { question: 'What neckline looks best with drop earrings?', answer: 'Drop earrings work beautifully with strapless, sweetheart, V-neck, off-shoulder and simple round necklines.' },
  { question: 'Can I wear drop earrings every day?', answer: 'Short and lightweight drop earrings can work for everyday wear, but most drop earrings are better for smart-casual or occasion styling.' },
  { question: 'Are lab-grown diamond drop earrings good gifts?', answer: 'Yes, they are good gifts for someone who enjoys dressing up or wearing occasion jewellery. If you are unsure of the person\'s style, studs may be safer.' },
  { question: 'What metal colour should I choose for drop earrings?', answer: 'Yellow gold feels warm and classic, white or silver tones feel clean and modern, and rose gold feels soft and romantic.' },
  { question: 'How do I style drop earrings?', answer: 'Let the earrings have space. Pair them with clean necklines, simple necklaces, pulled-back hair or outfits where the earrings can be the main jewellery detail.' },
  { question: 'What is the best first pair of lab-grown diamond drop earrings?', answer: 'A balanced short or medium drop is usually the best first pair because it feels elegant but can still be worn for multiple occasions.' },
]

const cta: V2CTABlock = {
  heading: 'Lab-Grown Diamond Drop Earrings — Elegant, Polished and Occasion-Ready',
  body: 'Start with IWantJewels lab-grown diamond drop earrings if you want real diamond sparkle in a wearable demi-fine design. Choose Orsola for wedding guest looks, Concetta Long for refined evening styling or Lusso bold statement earrings when you want stronger party sparkle.',
  primaryLabel: 'Shop Lab-Grown Diamond Drop Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Wedding Guest Jewellery',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide',
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamond-drop-earrings-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamond-drop-earrings-guide', 3)
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
