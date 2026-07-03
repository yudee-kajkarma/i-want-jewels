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
  title: 'Lab Grown Diamond Earrings for Weddings',
  description:
    'Choose lab grown diamond earrings for weddings, wedding guests, bridesmaids, receptions, dresses, necklines and elegant occasion styling.',
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-60.jpg',
  title: 'Lab-Grown Diamond Earrings for Weddings:',
  subtitle: 'Guest, Bridesmaid & Occasion Guide',
  paragraphs: [
    'Wedding jewellery should feel elegant, polished and appropriate for the moment. The right earrings can make a dress look more complete, frame the face beautifully in photos and add sparkle without overpowering the outfit.',
    'Lab-grown diamond earrings are a strong choice for weddings because they give the beauty of real diamond jewellery in a modern and wearable way. They work for wedding guests, bridesmaids, maid of honour outfits, evening receptions, engagement parties, rehearsal dinners and romantic gift moments.',
    'This resource helps shoppers choose the right lab-grown diamond earrings based on wedding role, outfit style, neckline, dress colour, hairstyle and how much sparkle feels right. It also guides users toward IWantJewels products such as Cadenza S, Cadenza M, Orsola, Farfalla, Alidi Farfalla, Concetta Short, Concetta Long, Amadea Huggie and Lusso bold statement earrings.',
  ],
  shopLabel: 'Shop Wedding Guest Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Choose earrings for wedding guests, bridesmaids and evening receptions',
    'Decide between studs, drops, huggies, butterfly earrings and bold statement earrings',
    'Match earrings to wedding dress codes and outfit styles',
    'Pick earrings for strapless, off-shoulder, V-neck, high-neck and sweetheart necklines',
    'Choose the right sparkle level without looking too bridal',
    'Find gift-friendly earrings for bridesmaids, maid of honour or wedding-related gifts',
    'Understand which IWantJewels products suit each wedding styling need',
    'Plan where to place images, CTAs and product recommendation blocks on the page',
  ],
  image: '/blog-images/blog-image-62.jpg',
}

// ─── Article Content ──────────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Wedding Earring Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main decision tool near the top of the page.' },
      {
        type: 'table',
        headers: ['Wedding Need', 'Best Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Simple wedding guest outfit', 'Medium studs or drop earrings', 'Cadenza M, Orsola'],
          ['Detailed or embellished dress', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['Romantic floral dress', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Black tie wedding', 'Elegant drops or bold sparkle', 'Orsola, Concetta Long, Lusso'],
          ['Bridesmaid jewellery', 'Simple studs or refined drops', 'Cadenza S, Cadenza M, Concetta Short'],
          ['Maid of honour styling', 'Medium studs or elegant drops', 'Cadenza M, Orsola'],
          ['Reception or after-party', 'Drops or bold statement earrings', 'Orsola, Lusso'],
          ['Minimal outfit', 'Drops, hoops or visible studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Soft pastel outfit', 'Butterfly earrings or rose-toned styles', 'Farfalla, Alidi Farfalla'],
          ['Ear stack styling', 'Studs with huggies', 'Cadenza S, Amadea, Laluce'],
        ],
      },
    ],
  },
  {
    heading: 'Best Lab-Grown Diamond Earrings for Wedding Guests',
    content: [
      { type: 'paragraph', text: 'Wedding guest earrings should feel elegant, but they should not overpower the outfit or look too bridal. The goal is to add polish, not steal attention.' },
      { type: 'paragraph', text: 'If the outfit is simple, drop earrings can add movement and sparkle. If the outfit already has lace, sequins, embroidery or a bold neckline, diamond studs are usually better. If the dress is soft, floral or romantic, butterfly earrings can feel more personal and feminine.' },
      { type: 'paragraph', text: 'For a safe wedding guest choice, Cadenza M diamond stud earrings work well because they add visible sparkle without looking too heavy. Orsola drop earrings are stronger when the outfit needs movement. Farfalla butterfly earrings work beautifully with romantic dresses. Lusso bold statement earrings are best for evening receptions or party-style wedding looks where the outfit is simple.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Best Earrings for Bridesmaids',
    content: [
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-64.jpg',
        content: [
          { type: 'paragraph', text: 'Bridesmaid earrings should look elegant in photos and feel wearable after the wedding. The safest choices are usually studs, small drops or delicate shapes that do not clash with the dress.' },
          { type: 'paragraph', text: 'If bridesmaids are wearing matching dresses, simple lab-grown diamond studs can create a clean, consistent look. If the dresses are soft and romantic, butterfly earrings can add a more personal touch. If the wedding is more formal, small or medium drop earrings can feel polished without being too dramatic.' },
          { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are ideal for a subtle bridesmaid look. Cadenza M diamond stud earrings are better if the earrings need to show more in photos. Concetta Short earrings can work well if the bride wants a soft drop shape. Farfalla or Alidi Farfalla butterfly earrings can feel meaningful if the earrings are also being given as bridesmaid gifts.' },
        ],
      },
      { type: 'see-also', text: 'Bridesmaid jewellery', href: '/products' },
    ],
  },
  {
    heading: 'Best Earrings for Maid of Honour',
    content: [
      { type: 'paragraph', text: 'Maid of honour jewellery can be slightly more noticeable than bridesmaid jewellery, but it should still feel balanced.' },
      { type: 'paragraph', text: 'The maid of honour often stands close to the bride in photos, so the earrings should look polished without feeling distracting. Medium studs, soft drops or elegant diamond earrings are usually the best direction.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are a strong choice if the outfit is detailed or the neckline is high. Orsola drop earrings work better with simple dresses, off-shoulder necklines and evening wedding styling. Concetta Long earrings can create a more refined look if the wedding is formal or black tie.' },
      { type: 'see-also', text: 'Jewellery for maid of honour', href: '#' },
    ],
  },
  {
    heading: 'Stud Earrings vs Drop Earrings for Weddings',
    content: [
      { type: 'paragraph', text: 'Studs and drops are both strong wedding choices, but they solve different styling needs.' },
      {
        type: 'table',
        headers: ['Wedding Styling Need', 'Choose Studs If', 'Choose Drops If'],
        rows: [
          ['Dress detail', 'The dress has lace, sequins, embroidery or print', 'The dress is simple or minimal'],
          ['Neckline', 'High neck, halter or detailed neckline', 'Strapless, sweetheart, V-neck or off-shoulder'],
          ['Hairstyle', 'Hair down or soft waves', 'Updo, tucked hair or pulled-back style'],
          ['Dress code', 'Day wedding or semi-formal wedding', 'Formal, evening or black tie wedding'],
          ['Jewellery balance', 'You are wearing a necklace', 'You are skipping a necklace'],
          ['Gift safety', 'You want the safest option', 'You know the person likes occasion jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Studs are usually the safest wedding earrings because they work with nearly everything. Drops are better when you want the earrings to shape the look.' },
      { type: 'paragraph', text: 'For IWantJewels, Cadenza S and Cadenza M cover the stud direction. Orsola, Concetta Short and Concetta Long cover the drop direction.' },
      { type: 'see-also', text: 'Stud vs drop earrings', href: '#' },
    ],
  },
  {
    heading: 'Earrings by Wedding Dress Code',
    content: [
      { type: 'paragraph', text: 'The wedding dress code can help decide how much sparkle is appropriate.' },
      {
        type: 'table',
        headers: ['Dress Code', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Casual wedding', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Garden wedding', 'Butterfly earrings, small studs or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Cocktail wedding', 'Medium studs, huggies or drops', 'Cadenza M, Amadea, Orsola'],
          ['Formal wedding', 'Medium studs or elegant drops', 'Cadenza M, Orsola, Concetta Long'],
          ['Black tie wedding', 'Drops or bold statement earrings', 'Concetta Long, Orsola, Lusso'],
          ['Evening reception', 'Drops, hoops or bold earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Beach wedding', 'Small studs, huggies or delicate drops', 'Cadenza S, Amadea, Concetta Short'],
        ],
      },
      { type: 'paragraph', text: 'For relaxed weddings, avoid earrings that feel too heavy. For formal or evening weddings, earrings can be more visible. For black tie styling, drop earrings or bold statement jewellery often works better than very small studs.' },
      { type: 'see-also', text: 'Party earrings guide', href: '#' },
    ],
  },
  {
    heading: 'Earrings by Wedding Neckline',
    content: [
      { type: 'paragraph', text: 'The neckline is one of the most important parts of choosing wedding earrings.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-66.jpg',
        content: [
          {
            type: 'table',
            headers: ['Neckline', 'Best Earring Choice', 'Why'],
            rows: [
              ['Strapless', 'Drop earrings or bold earrings', 'Frames the face and shoulders'],
              ['Sweetheart', 'Soft drops or butterfly earrings', 'Matches the romantic neckline'],
              ['V-neck', 'Medium drops or elegant studs', 'Follows the line of the neckline'],
              ['Off-shoulder', 'Drops or statement earrings', 'Balances open shoulders'],
              ['High neck', 'Studs or refined small drops', 'Keeps the look clean'],
              ['Halter neck', 'Studs or slim drops', 'Avoids crowding the neckline'],
              ['Square neck', 'Clean drops or medium studs', 'Adds polish without competing'],
              ['One-shoulder', 'Studs or one strong earring direction', 'Keeps balance with asymmetry'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For strapless and off-shoulder outfits, Orsola drop earrings or Concetta Long earrings can work beautifully. For sweetheart necklines, Farfalla butterfly earrings or Concetta Short earrings can feel softer. For high-neck dresses, Cadenza S or Cadenza M studs are usually cleaner.' },
      { type: 'see-also', text: 'Jewellery for strapless dresses', href: '#' },
    ],
  },
  {
    heading: 'Earrings by Wedding Outfit Colour',
    content: [
      { type: 'paragraph', text: 'Dress colour also affects what earring style looks best.' },
      {
        type: 'table',
        headers: ['Outfit Colour', 'Best Earring Direction', 'Styling Note'],
        rows: [
          ['Black', 'Diamond drops, medium studs or bold sparkle', 'Creates contrast and polish'],
          ['Navy', 'White/silver tones or clean diamond studs', 'Feels elegant and refined'],
          ['Red', 'Yellow gold or classic diamond studs', 'Keeps the look balanced'],
          ['Green', 'Yellow gold, rose gold or drops', 'Adds warmth and richness'],
          ['Pastel pink', 'Rose gold, butterfly earrings or delicate studs', 'Feels soft and romantic'],
          ['Champagne', 'Yellow gold or elegant drops', 'Works with warm tones'],
          ['Silver or grey', 'White/silver tones or clean studs', 'Keeps the look cool and polished'],
          ['Floral print', 'Small studs or butterfly earrings', 'Avoids overcomplicating the outfit'],
          ['Satin dress', 'Drops or visible studs', 'Adds movement and light'],
        ],
      },
      { type: 'paragraph', text: 'For black dresses, Orsola or Lusso can create a stronger jewellery moment. For pastel or romantic outfits, Farfalla and Alidi Farfalla are better. For printed dresses, Cadenza S or Cadenza M keeps the look clean.' },
      { type: 'see-also', text: 'What jewellery to wear with a black dress', href: '#' },
    ],
  },
  {
    heading: 'Earrings by Wedding Hairstyle',
    content: [
      { type: 'paragraph', text: 'Hair can change how visible earrings look.' },
      { type: 'paragraph', text: 'If your hair is worn down, smaller studs may disappear slightly, so medium studs or drops can work better. If your hair is pulled back, even small studs can look noticeable. If you are wearing a low bun or updo, drop earrings can frame the face beautifully.' },
      {
        type: 'table',
        headers: ['Hairstyle', 'Best Earring Choice'],
        rows: [
          ['Hair down', 'Medium studs, huggies or visible drops'],
          ['Soft waves', 'Studs, butterfly earrings or short drops'],
          ['Low bun', 'Drop earrings or bold statement earrings'],
          ['High bun', 'Drops, hoops or visible studs'],
          ['Half-up hairstyle', 'Medium studs, huggies or soft drops'],
          ['Sleek ponytail', 'Drops, hoops or bold earrings'],
          ['Short hair', 'Studs, huggies, drops or hoops all work well'],
        ],
      },
      { type: 'paragraph', text: 'For hair-down styling, Cadenza M or Orsola is stronger than very tiny studs. For a low bun, Concetta Long or Orsola can look elegant. For soft waves, Farfalla or Concetta Short can feel romantic.' },
    ],
  },
  {
    heading: 'Day Wedding vs Evening Reception Earrings',
    content: [
      { type: 'paragraph', text: 'Day weddings usually call for softer jewellery. Evening receptions allow more sparkle.' },
      { type: 'paragraph', text: 'For daytime weddings, small studs, medium studs, butterfly earrings and short drops usually feel appropriate. For evening receptions, drop earrings, hoops and bold statement earrings can work better, especially if the outfit is simple.' },
      {
        type: 'table',
        headers: ['Wedding Timing', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Day ceremony', 'Studs, huggies, butterfly earrings', 'Cadenza S, Cadenza M, Amadea, Farfalla'],
          ['Afternoon garden wedding', 'Butterfly earrings or soft drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
          ['Evening reception', 'Drops, hoops, bold statement earrings', 'Orsola, Pave Hoops, Lusso'],
          ['Black tie evening', 'Longer drops or stronger sparkle', 'Concetta Long, Orsola, Lusso'],
        ],
      },
      { type: 'paragraph', text: 'If the wedding has both ceremony and reception, choose earrings that can transition. Medium studs or elegant drops usually work best because they are not too casual for the evening or too heavy for the day.' },
    ],
  },
  {
    heading: 'Lab-Grown Diamond Earrings as Wedding Gifts',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamond earrings make strong wedding-related gifts because they feel special, wearable and easier to choose than rings.' },
      { type: 'paragraph', text: 'They can work as bridesmaid gifts, maid of honour gifts, anniversary gifts, bridal shower gifts or gifts for someone attending a special wedding event. Earrings are especially gift-friendly because sizing is easier than rings.' },
      {
        type: 'table',
        headers: ['Gift Purpose', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Bridesmaid gift', 'Simple studs or delicate drops', 'Cadenza S, Concetta Short'],
          ['Maid of honour gift', 'Medium studs or elegant drops', 'Cadenza M, Orsola'],
          ['Romantic wedding gift', 'Butterfly earrings or rose-toned styles', 'Farfalla, Alidi Farfalla'],
          ['Thank-you gift', 'Classic studs', 'Cadenza S, Cadenza M'],
          ['Reception-ready gift', 'Drops or bold sparkle', 'Orsola, Lusso'],
        ],
      },
      { type: 'paragraph', text: 'If the gift needs to be safe and classic, choose studs. If it needs to feel personal, choose butterfly earrings. If it is for someone who loves dressing up, choose drops.' },
      { type: 'see-also', text: 'Jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Product Pathways by Wedding Styling Need',
    content: [
      { type: 'paragraph', text: 'Use this section as a practical shopping guide.' },
      { type: 'subheading', text: 'For a Classic Wedding Guest Look' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings if you want sparkle that feels polished but not too bold. They work well with detailed dresses, satin outfits and classic wedding guest styling.' },
      { type: 'subheading', text: 'For a Romantic Wedding Outfit' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings if the outfit is floral, pastel, soft or feminine. The butterfly shape adds meaning and makes the jewellery feel more personal.' },
      { type: 'subheading', text: 'For a Simple Dress That Needs Movement' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add elegance, movement and light near the face, especially with strapless, off-shoulder or V-neck dresses.' },
      { type: 'subheading', text: 'For a Formal or Black Tie Wedding' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings or Lusso bold statement earrings. Concetta Long feels refined and elongated, while Lusso is better when the earrings are meant to be the main jewellery moment.' },
      { type: 'subheading', text: 'For Bridesmaid or Maid of Honour Gifts' },
      { type: 'paragraph', text: 'Choose Cadenza S for subtle matching earrings, Cadenza M for a more visible gift, or Concetta Short if you want a softer drop.' },
      { type: 'subheading', text: 'For Wedding Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea Huggie earrings for a clean, modern stack. Add Laluce minimalist diamond earrings if you want a softer layered look.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Wedding Use', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Bridesmaids, day weddings, subtle guest looks', 'Simple, clean and easy to wear again'],
          ['Cadenza M diamond stud earrings', 'Wedding guests, maid of honour, classic gifts', 'More visible sparkle while staying elegant'],
          ['Amadea Huggie earrings', 'Wedding ear stacks and modern guests', 'Adds shape without looking too heavy'],
          ['Laluce minimalist diamond earrings', 'Soft daily-to-wedding styling', 'Quiet, refined and easy to layer'],
          ['Farfalla butterfly earrings', 'Romantic outfits and meaningful gifts', 'Butterfly design feels personal and feminine'],
          ['Alidi Farfalla butterfly earrings', 'Bridesmaid or birthday wedding gifts', 'Soft, symbolic and memorable'],
          ['Orsola drop earrings', 'Wedding guests, dinners and receptions', 'Adds movement and polished sparkle'],
          ['Concetta Short earrings', 'Bridesmaids and softer occasion looks', 'A gentler drop option'],
          ['Concetta Long earrings', 'Formal weddings and evening outfits', 'Creates a refined elongated look'],
          ['Pave Hoops', 'Modern wedding guest styling', 'Adds shape and sparkle without a drop'],
          ['Lusso bold statement earrings', 'Receptions, black tie and party looks', 'Stronger sparkle for simple outfits'],
        ],
      },
      { type: 'paragraph', text: 'Choose earrings based on the wedding role and outfit. For classic guest styling, start with Cadenza M. For romantic looks, choose Farfalla. For simple dresses, choose Orsola. For black tie or reception styling, choose Concetta Long or Lusso.' },
    ],
  },
  {
    heading: 'Common Wedding Earring Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing earrings that compete with the outfit. If the dress already has heavy detail, large earrings can make the look feel crowded. Studs are often better in that case.' },
      { type: 'paragraph', text: 'Another mistake is wearing bridal-looking earrings as a guest. Wedding guest jewellery should feel elegant, but not like bridal jewellery.' },
      { type: 'paragraph', text: 'A third mistake is ignoring the neckline. Drop earrings usually look better with open necklines, while studs are cleaner with high necklines.' },
      { type: 'paragraph', text: 'Another mistake is buying earrings only for one wedding. Choose a pair that can be worn again for dinners, parties, anniversaries or future events.' },
      { type: 'paragraph', text: 'Finally, do not choose only by sparkle. Comfort matters, especially if the earrings will be worn for a full wedding day.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '#' },
    ],
  },
  {
    heading: 'Final Wedding Earring Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing lab-grown diamond earrings for a wedding, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Am I shopping for a guest, bridesmaid, maid of honour or gift?',
          'Is the wedding daytime, evening, formal or casual?',
          'Does the dress already have detail?',
          'What neckline will the outfit have?',
          'Will the hairstyle show the earrings clearly?',
          'Do I want studs, drops, huggies, hoops or butterfly earrings?',
          'Will the earrings be comfortable for several hours?',
          'Can the earrings be worn again after the wedding?',
          'Does the metal colour match the outfit and other jewellery?',
          'Are the stones genuine lab-grown diamonds?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose medium diamond studs for safety or elegant drop earrings for a simple dress.' },
    ],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'Are lab-grown diamond earrings good for weddings?',
    answer: 'Yes, lab-grown diamond earrings are excellent for weddings because they give real diamond sparkle in a modern and wearable way. They work for wedding guests, bridesmaids, receptions and wedding-related gifts.',
  },
  {
    question: 'What earrings should a wedding guest wear?',
    answer: 'Wedding guests should wear earrings that match the outfit without overpowering it. Studs are best for detailed dresses, while drop earrings work well with simple dresses and open necklines.',
  },
  {
    question: 'Are diamond studs good for wedding guests?',
    answer: 'Yes, diamond studs are one of the safest wedding guest choices. They add sparkle without looking too heavy or bridal.',
  },
  {
    question: 'Are drop earrings good for weddings?',
    answer: 'Yes, drop earrings are beautiful for weddings, especially with strapless, off-shoulder, V-neck and simple dresses. They add movement and elegance.',
  },
  {
    question: 'What earrings are best for bridesmaids?',
    answer: 'Simple studs, delicate drops or soft butterfly earrings work well for bridesmaids. They look elegant in photos and can be worn again after the wedding.',
  },
  {
    question: 'Can bridesmaids wear lab-grown diamond earrings?',
    answer: 'Yes, bridesmaids can wear lab-grown diamond earrings. They are a strong choice because they feel special, polished and giftable.',
  },
  {
    question: 'What earrings should I wear with a strapless wedding guest dress?',
    answer: 'Drop earrings or bold earrings usually work best with strapless dresses because they frame the face and shoulders.',
  },
  {
    question: 'What earrings should I wear with a high-neck dress?',
    answer: 'Studs or small refined drops usually work best with high-neck dresses because they keep the look clean.',
  },
  {
    question: 'Are butterfly earrings good for weddings?',
    answer: 'Yes, butterfly earrings can work beautifully for romantic wedding outfits, bridesmaid gifts and soft feminine styling.',
  },
  {
    question: 'What is the safest wedding earring choice?',
    answer: 'Medium lab-grown diamond studs are usually the safest choice because they work with many outfits, dress codes and hairstyles.',
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Wedding earrings should make the outfit feel finished, not overdone. The right pair depends on the dress, neckline, hairstyle, role and how much sparkle feels appropriate for the occasion.',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want real diamond sparkle in wearable demi-fine designs. Choose Cadenza M for classic wedding guest polish, Orsola for elegant drop styling, Farfalla for romantic outfits, Concetta Long for formal weddings or Lusso when you want a stronger reception look.',
  primaryLabel: 'Shop Wedding Guest Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '#',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'lab-grown-diamond-earrings-for-weddings')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'lab-grown-diamond-earrings-for-weddings', 3)
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
