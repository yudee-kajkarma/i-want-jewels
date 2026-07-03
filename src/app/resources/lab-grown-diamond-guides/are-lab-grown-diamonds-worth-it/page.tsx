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
  title: 'Are Lab Grown Diamonds Worth It? Simple Guide | I Want Jewels',
  description:
    'Find out if lab grown diamonds are worth buying, how they compare to natural diamonds, and when lab grown diamond jewellery makes sense.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-7.jpg',
  title: 'Are Lab-Grown Diamonds Worth It?',
  subtitle: 'Simple Guide Before You Buy',
  paragraphs: [
    'Yes, lab-grown diamonds are worth it for many jewellery buyers, especially if you want real diamond sparkle in a more accessible and wearable way. They are real diamonds, not cubic zirconia or glass, and they can look beautiful in earrings, necklaces, rings and bracelets when they are well cut and well set.',
    'Lab-grown diamonds are especially worth considering for everyday jewellery, diamond earrings, gifts, wedding guest jewellery and demi-fine pieces. They usually cost less than comparable natural diamonds, which means you can focus more on design, style and wearability instead of paying mainly for mined origin.',
    'They may not be the best choice if your main goal is resale value, mined rarity or traditional heirloom investment. But if you want diamond jewellery you can actually wear, enjoy and gift, lab-grown diamonds can be a very smart choice.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds are worth it if you want real diamond jewellery at a more accessible price.',
    'They are real diamonds, not fake stones or cubic zirconia.',
    'They are usually not bought for strong resale value, but for beauty, wearability and everyday enjoyment.',
    'They are especially useful for earrings because earrings are usually bought for sparkle and style, not investment.',
    'Lab-grown diamonds can be a strong choice for birthdays, anniversaries, bridesmaids, wedding guests and daily jewellery.',
    'Natural diamonds may be better if you specifically want mined rarity, tradition or heirloom investment.',
    'For IWantJewels shoppers, lab-grown diamond earrings are one of the best starting points.',
  ],
  image: '/blog-images/blog-image-8.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'What Does "Worth It" Mean When Buying Diamonds?',
    content: [
      { type: 'paragraph', text: 'When people ask if lab-grown diamonds are worth it, they are usually asking a few different questions at once. They may want to know if lab-grown diamonds are real. They may want to know if they look as good as natural diamonds. They may be wondering if they are good quality, if they last, if they are suitable for everyday wear, or if they hold value.' },
      { type: 'paragraph', text: 'The honest answer is that lab-grown diamonds are worth it for the right reason. They are worth it if you are buying jewellery to wear, style and enjoy. They are worth it if you want diamond sparkle without paying the higher price often attached to mined diamonds. They are worth it if you want earrings, huggies, drops or gift jewellery that feels special but not too intimidating.' },
      { type: 'paragraph', text: 'They may not be worth it if your main goal is resale value or traditional rarity. Lab-grown diamonds are not rare in the same way natural diamonds are, and they usually do not have the same resale appeal. So the real question is not only "Are lab-grown diamonds worth it?" The better question is: "What do I want this jewellery to do for me?"' },
      { type: 'see-also', text: 'Are lab-grown diamonds real?', href: '/resources/lab-grown-diamond-guides/are-lab-grown-diamonds-real' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Real Enough to Be Worth Buying?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are real diamonds, and that is the main reason they are worth considering. A lab-grown diamond is not the same as cubic zirconia, glass, crystal or a diamond-look stone. It is created in a controlled laboratory environment, but it has the same basic diamond structure people expect from diamond jewellery.' },
      { type: 'paragraph', text: 'This matters because many shoppers want the feeling of real diamond jewellery, but they do not always want the price or formality of mined diamond pieces. Lab-grown diamonds help bridge that gap. For example, a pair of lab-grown diamond studs can feel polished enough for work, pretty enough for dinner and special enough to gift. That kind of versatility is where lab-grown diamonds become valuable in real life.' },
      { type: 'see-also', text: 'What are lab-grown diamonds?', href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds' },
    ],
  },
  {
    heading: 'Lab-Grown Diamonds: Worth It or Not?',
    content: [
      { type: 'section-lead', text: 'Here is the simple version.' },
      {
        type: 'table',
        headers: ['Buyer Goal', 'Are Lab-Grown Diamonds Worth It?', 'Why'],
        rows: [
          ['Everyday diamond jewellery', 'Yes', 'They offer real diamond sparkle in wearable designs'],
          ['Diamond earrings', 'Yes', 'Earrings are usually bought for beauty and style, not investment'],
          ['Gift jewellery', 'Yes', 'They feel special without being too formal or expensive'],
          ['Wedding guest jewellery', 'Yes', 'They add elegant sparkle without feeling bridal'],
          ['Ear stacks', 'Yes', 'Small studs and huggies work beautifully in lab-grown diamonds'],
          ['Resale value', 'Not usually', 'Lab-grown diamonds usually have weaker resale value'],
          ['Traditional rarity', 'Not usually', 'Natural diamonds are valued more for mined origin and rarity'],
          ['Heirloom investment', 'Depends', 'Some buyers may still prefer natural diamonds'],
        ],
      },
      { type: 'paragraph', text: 'For most IWantJewels customers, lab-grown diamonds are worth it because the jewellery is not being bought as an investment. It is being bought to wear, style, gift and enjoy.' },
    ],
  },
  {
    heading: 'Why Lab-Grown Diamonds Can Be a Smart Choice',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are a smart choice because they give you more flexibility. With natural diamonds, a large part of the price is connected to rarity, mining, tradition and the natural origin of the stone. With lab-grown diamonds, you can often get diamond beauty in a more accessible way. That can make it easier to choose jewellery based on your actual style rather than only your budget.' },
      { type: 'paragraph', text: 'This is especially helpful with earrings. You may want one pair of simple studs for daily wear, one huggie for an ear stack, one drop earring for occasions and one more expressive design for gifts or parties. Lab-grown diamonds make that kind of jewellery wardrobe feel more realistic. At IWantJewels, this is the main advantage. The jewellery is designed to feel premium but wearable, with lab-grown diamonds, 925 sterling silver and 14kt gold plating.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Worth It for Earrings?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are especially worth it for earrings. Earrings are one of the best categories for lab-grown diamonds because they are usually bought for visible sparkle, comfort and styling. Most people are not buying earrings for resale. They are buying them because they make an outfit feel more polished.' },
      { type: 'paragraph', text: 'A small pair of diamond studs can be worn almost every day. Huggies can be layered with other earrings. Drop earrings can make a simple dress feel more elegant. Butterfly earrings can make a gift feel more personal.' },
      {
        type: 'table',
        headers: ['Earring Style', 'Why Lab-Grown Diamonds Make Sense', 'Recommended IWJ Direction'],
        rows: [
          ['Stud earrings', 'Easy to wear often and simple to gift', 'Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings'],
          ['Huggie earrings', 'Great for ear stacks and modern daily styling', 'Amadea Huggie earrings'],
          ['Drop earrings', 'Adds movement and elegance for occasions', 'Orsola drop earrings'],
          ['Minimalist earrings', 'Works well for simple everyday outfits', 'Laluce minimalist diamond earrings'],
          ['Butterfly earrings', 'Adds meaning and softness to gifts', 'Farfalla butterfly earrings, Alidi Farfalla butterfly earrings'],
          ['Bold statement jewellery', 'Useful for party looks and stronger sparkle', 'Lusso bold statement earrings'],
        ],
      },
      { type: 'see-also', text: 'Explore lab-grown diamond earrings', href: '/products?category=Earring' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Worth It for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are worth it for everyday wear if the jewellery design is comfortable and the metal is suitable for regular use. The diamond itself is durable, but the full jewellery piece matters. A daily earring should feel secure, light and easy to style. It should not be so delicate or dramatic that you avoid wearing it.' },
      { type: 'paragraph', text: 'For everyday jewellery, small studs, huggies and minimalist earrings usually make the most sense. They add shine without taking over the outfit. Cadenza S lab-grown diamond studs are a strong first choice if you want something simple and clean. Cadenza M diamond stud earrings work better if you prefer more visible sparkle. Amadea Huggie earrings are useful for people who like ear stacks, while Laluce minimalist diamond earrings suit someone who prefers quiet daily jewellery.' },
      { type: 'see-also', text: 'Can you wear lab-grown diamond earrings every day?', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Worth It for Gifts?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond jewellery can be a very thoughtful gift. It feels more special than simple fashion jewellery, but it does not always carry the same pressure as a very expensive natural diamond piece. That balance makes it useful for birthdays, anniversaries, bridesmaids, graduations, romantic gifts and small luxury moments.' },
      { type: 'paragraph', text: 'Earrings are especially gift-friendly because you do not need to know an exact ring size. Studs are the safest option. Butterfly earrings feel more personal. Drop earrings work well for someone who enjoys dressing up. Huggies are a modern option for someone who likes layered jewellery.' },
      { type: 'paragraph', text: 'If you are gifting someone who prefers classic pieces, choose Cadenza S or Cadenza M. If you want the gift to feel symbolic, Farfalla butterfly earrings are a stronger choice. If the person loves wedding guest looks, dinners or party outfits, Orsola drop earrings or Lusso bold statement earrings may feel more exciting.' },
      { type: 'see-also', text: 'Explore jewellery gifts', href: '/products' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Worth It Compared to Natural Diamonds?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds are worth it compared to natural diamonds if you care more about appearance, design and wearability than mined origin. Natural diamonds are still valued for rarity, tradition and heirloom appeal. For some buyers, that matters deeply. A natural diamond may feel more meaningful if the buyer wants something formed by nature over time.' },
      {
        type: 'table',
        headers: ['If You Care Most About', 'Better Choice'],
        rows: [
          ['Mined origin', 'Natural diamonds'],
          ['Traditional rarity', 'Natural diamonds'],
          ['Heirloom investment', 'Natural diamonds may appeal more'],
          ['Everyday jewellery', 'Lab-grown diamonds'],
          ['Earrings and gifts', 'Lab-grown diamonds'],
          ['Bigger sparkle for budget', 'Lab-grown diamonds'],
          ['Modern demi-fine jewellery', 'Lab-grown diamonds'],
        ],
      },
      { type: 'paragraph', text: 'For earrings, lab-grown diamonds often make more practical sense. Earrings are usually chosen for style, not long-term asset value. If you want to wear them often, lab-grown diamonds are a strong option.' },
      { type: 'see-also', text: 'Lab-grown vs natural diamonds', href: '/resources/lab-grown-diamond-guides/lab-grown-vs-natural-diamonds' },
    ],
  },
  {
    heading: 'Do Lab-Grown Diamonds Hold Their Value?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds usually do not hold resale value in the same way natural diamonds may. This does not mean they are not worth buying. It means they should be bought for the right reason. If you are buying diamonds mainly as an investment or for resale, lab-grown diamonds may not be the strongest choice.' },
      { type: 'paragraph', text: 'But if you are buying jewellery because you love how it looks, because you want to wear it regularly, or because you want to give someone a beautiful gift, resale value may not be the most important factor. Most people do not buy earrings planning to sell them later. They buy earrings because they want to feel polished, elegant or special when they wear them. In that sense, lab-grown diamonds can be very worth it.' },
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Worth It in Demi-Fine Jewellery?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are very well suited to demi-fine jewellery. Demi-fine jewellery sits between costume jewellery and traditional fine jewellery. It is usually made with better materials than fashion jewellery, but it is more accessible than solid gold or platinum fine jewellery.' },
      { type: 'paragraph', text: 'At IWantJewels, lab-grown diamonds are used with 925 sterling silver and 14kt gold plating. This makes the pieces feel elevated without making them too formal for everyday styling. That is why lab-grown diamonds work beautifully in this category. They add real diamond sparkle to jewellery that can still be worn casually, styled for parties, given as gifts or used in ear stacks.' },
      { type: 'see-also', text: 'What is demi-fine jewellery?', href: '/resources/demi-fine-jewellery-guides' },
    ],
  },
  {
    heading: 'When Are Lab-Grown Diamonds Not Worth It?',
    content: [
      { type: 'paragraph', text: 'Lab-grown diamonds may not be worth it if your main goal is traditional rarity, mined origin or resale value. Some buyers love the idea that natural diamonds formed underground over a long period of time. Others want a traditional heirloom piece with mined diamond symbolism. For those buyers, natural diamonds may feel more emotionally valuable.' },
      { type: 'paragraph', text: 'Lab-grown diamonds may also not be the best choice if you are buying purely as an investment. They are generally better for wearing than reselling. But for most everyday jewellery buyers, this is not a problem. If you want earrings you will wear often, a meaningful gift, or stylish diamond jewellery that feels accessible, lab-grown diamonds can be a very good choice.' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamond Earrings Worth It for Wedding Guests?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamond earrings are worth it for wedding guests. Wedding guest jewellery needs to feel elegant without looking bridal. You want sparkle, but not something that competes with the bride or feels too heavy for the outfit. Lab-grown diamond earrings work well because they can add polish without feeling too formal.' },
      { type: 'paragraph', text: 'Studs work beautifully with printed dresses, satin dresses and simple gowns. Drop earrings are better for evening weddings, black dresses, off-shoulder necklines and more dressed-up looks. Butterfly earrings can work well for softer, romantic outfits.' },
      { type: 'paragraph', text: 'For wedding guest styling, Orsola drop earrings are a strong recommendation if you want movement and elegance. Cadenza M diamond stud earrings are better if the outfit already has a lot of detail. Farfalla butterfly earrings work well if the look is more feminine and romantic.' },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Are Lab-Grown Diamonds Worth It for Ear Stacks?',
    content: [
      { type: 'paragraph', text: 'Yes, lab-grown diamonds are worth it for ear stacks because small diamonds add brightness without making the ear look too heavy. A good ear stack usually needs balance. You do not want every piece to compete for attention. Lab-grown diamond studs and huggies work well because they add sparkle in a clean, controlled way.' },
      { type: 'paragraph', text: 'For a simple ear stack, start with Cadenza S lab-grown diamond studs in the first piercing and Amadea Huggie earrings in the second piercing. If you want a more polished look, add a small minimalist earring like Laluce. This kind of styling is where lab-grown diamonds feel very useful. You can create a diamond ear look without making it feel too formal or expensive.' },
      { type: 'see-also', text: 'How to stack earrings', href: '#' },
    ],
  },
  {
    heading: 'What Should You Check Before Buying?',
    content: [
      { type: 'paragraph', text: 'Before buying lab-grown diamond jewellery, look at the whole piece, not only the word "diamond." Check the style, metal, comfort, closure, finish and care instructions. Also think about how the person will actually wear it. A beautiful earring is only worth it if it suits real outfits and real occasions.' },
      {
        type: 'table',
        headers: ['What to Check', 'Why It Matters'],
        rows: [
          ['Diamond type', 'Confirms it is lab-grown diamond, not a diamond-look stone'],
          ['Metal', 'Affects durability, comfort and finish'],
          ['Style', 'Studs, huggies, drops and butterfly earrings suit different buyers'],
          ['Comfort', 'Important if the piece will be worn often'],
          ['Occasion', 'Helps match the design to the purpose'],
          ['Care instructions', 'Keeps the jewellery looking better for longer'],
        ],
      },
      { type: 'paragraph', text: 'For everyday wear, choose something simple. For gifts, choose something personal. For parties and weddings, choose something with more visible sparkle.' },
      { type: 'see-also', text: 'How to clean lab-grown diamond earrings', href: '/resources/jewellery-care-guides' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      { type: 'paragraph', text: 'If you are choosing lab-grown diamonds because you want jewellery that feels beautiful but wearable, these pieces are strong starting points.' },
      {
        type: 'table',
        headers: ['Product', 'Best For', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'First diamond earrings', 'Simple, clean and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'More visible everyday sparkle', 'Classic but slightly stronger on the ear'],
          ['Amadea Huggie earrings', 'Ear stacks and second piercings', 'Modern, wearable and easy to layer'],
          ['Laluce minimalist diamond earrings', 'Quiet everyday jewellery', 'Simple and easy to pair with most outfits'],
          ['Farfalla butterfly earrings', 'Meaningful gifts', 'Butterfly design adds softness and symbolism'],
          ['Orsola drop earrings', 'Wedding guest and evening looks', 'Adds elegance and movement'],
          ['Lusso bold statement earrings', 'Party styling', 'Stronger sparkle for nights out and dressed-up outfits'],
        ],
      },
    ],
  },
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      { type: 'bullet-list', items: [
        'Buying lab-grown diamonds while expecting them to behave like natural diamonds in resale — lab-grown diamonds are usually better for wearing than reselling.',
        'Thinking lower price means fake — lab-grown diamonds are not fake, they are usually more accessible because they are created differently.',
        'Choosing only by carat size — a bigger stone is not always better, a smaller diamond in a better design can look more elegant and wearable.',
        'Buying jewellery only because it looks good in a product photo — think about how often it will be worn, what outfits it will match and whether the style suits the person.',
      ]},
      { type: 'see-also', text: 'Lab-grown diamond earrings buying guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide' },
    ],
  },
  {
    heading: 'Final Checklist Before Buying',
    content: [
      { type: 'paragraph', text: 'Before choosing lab-grown diamonds, ask yourself:' },
      { type: 'bullet-list', items: [
        'Am I buying this for daily wear, a gift or a special occasion?',
        'Do I want real diamond jewellery or only a diamond-look piece?',
        'Is resale value important to me?',
        'Do I care more about mined origin or wearable design?',
        'Will this piece match more than one outfit?',
        'Is the jewellery comfortable enough to wear often?',
        'Does the metal colour suit the person\'s style?',
        'Does the design feel special without being too formal?',
      ]},
      { type: 'paragraph', text: 'If you are buying jewellery to wear and enjoy, lab-grown diamonds are usually worth considering. If you are buying mainly for rarity or resale, natural diamonds may be more suitable.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'Are lab-grown diamonds worth it?', answer: 'Yes, lab-grown diamonds are worth it if you want real diamond jewellery that feels modern, wearable and more accessible than many natural diamond options.' },
  { question: 'Are lab-grown diamonds real diamonds?', answer: 'Yes, lab-grown diamonds are real diamonds. They are created in a laboratory instead of being mined, but they are not fake stones.' },
  { question: 'Are lab-grown diamonds worth it for earrings?', answer: 'Yes, lab-grown diamonds are especially worth it for earrings because earrings are usually bought for sparkle, style and wearability rather than investment.' },
  { question: 'Are lab-grown diamonds worth it for everyday wear?', answer: 'Yes, lab-grown diamonds are suitable for everyday wear. The diamond itself is durable, but the full jewellery piece should still be cared for properly.' },
  { question: 'Are lab-grown diamonds good for gifts?', answer: 'Yes, lab-grown diamond jewellery makes a thoughtful gift. Earrings are especially easy to gift because they do not require ring sizing and suit many styles.' },
  { question: 'Do lab-grown diamonds hold value?', answer: 'Lab-grown diamonds usually do not hold resale value in the same way natural diamonds may. They are better bought for beauty, styling and everyday enjoyment.' },
  { question: 'Why are lab-grown diamonds cheaper?', answer: 'Lab-grown diamonds are usually more accessible because they are created differently and do not have the same natural rarity as mined diamonds.' },
  { question: 'Are lab-grown diamonds better than natural diamonds?', answer: 'They are better for some buyers, especially those who want real diamond sparkle in a more accessible and wearable way. Natural diamonds may be better for buyers who value mined origin and traditional rarity.' },
  { question: 'Should I buy lab-grown diamond earrings?', answer: 'Yes, if you want diamond earrings for everyday wear, gifting, ear stacks, wedding guest outfits or party styling, lab-grown diamond earrings are a strong choice.' },
  { question: 'What lab-grown diamond jewellery should I buy first?', answer: 'Start with lab-grown diamond stud earrings if you want a safe first piece. They are simple, timeless and easy to style with other jewellery.' },
]

const cta: V2CTABlock = {
  heading: 'Lab-Grown Diamonds Are Worth It — Start With the Right Pair',
  body: 'Start with IWantJewels lab-grown diamond earrings if you want diamond jewellery that feels modern, wearable and easy to enjoy. Choose simple studs for daily polish, huggies for ear stacks, butterfly earrings for gifts or drop earrings for weddings, dinners and parties.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-buying-guide',
}

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'are-lab-grown-diamonds-worth-it')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'are-lab-grown-diamonds-worth-it', 3)
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
