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
  title: 'Anniversary Jewellery Gifts for Her',
  description:
    'Choose anniversary jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and romantic gift ideas.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-22.jpg',
  title: 'Anniversary Jewellery Gifts:',
  subtitle: 'Romantic Earrings She Will Actually Wear',
  paragraphs: [
    'Anniversary jewellery should feel romantic, thoughtful and wearable. The best anniversary gift is not only the piece that looks impressive in the box. It is the piece that feels connected to the relationship, suits her style and becomes something she can wear again after the anniversary dinner, weekend trip or celebration is over.',
    'Lab-grown diamond earrings are one of the strongest anniversary jewellery gifts because they feel special without being difficult to choose. Butterfly earrings are ideal when the gift should feel meaningful and symbolic. Drop earrings are perfect for anniversary dinners, date nights and romantic evening outfits. Diamond studs are the safest classic gift. Huggies are best when she prefers modern everyday jewellery. Minimalist earrings work well when the gift should feel quiet and understated. Hoops and bold earrings can work if she enjoys visible jewellery and party styling.',
    'At IWantJewels, Alidi Farfalla butterfly earrings, Farfalla butterfly earrings, Orsola drop earrings, Cadenza M diamond stud earrings, Cadenza S lab-grown diamond studs, Concetta Short earrings, Concetta Long earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Pave Hoops and Lusso bold statement earrings all work for different anniversary gift needs.',
  ],
  shopLabel: 'Shop Anniversary Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose anniversary jewellery gifts for her.',
    'Pick lab-grown diamond earrings as an anniversary gift.',
    'Decide between butterfly earrings, drop earrings, studs, huggies, hoops, minimalist earrings and bold earrings.',
    'Choose gifts for wife, girlfriend, partner and milestone anniversaries.',
    'Find meaningful anniversary jewellery gifts with symbolism.',
    'Choose safe anniversary gifts when you are unsure of her exact style.',
    'Match earrings to anniversary dinner outfits, date nights and romantic plans.',
    'Build romantic anniversary ear stack gift ideas.',
  ],
  image: '/blog-images/blog-image-29.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Anniversary Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Anniversary Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Most romantic anniversary gift', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
          ['Meaningful anniversary gift', 'Butterfly earrings or butterfly stack', 'Farfalla, Farfalla + Cadenza S'],
          ['Anniversary dinner gift', 'Drop earrings', 'Orsola'],
          ['Classic anniversary gift', 'Medium diamond studs', 'Cadenza M'],
          ['Subtle first anniversary gift', 'Small diamond studs or huggies', 'Cadenza S, Amadea'],
          ['Milestone anniversary gift', 'Long drops, butterfly earrings or polished studs', 'Concetta Long, Alidi Farfalla, Cadenza M'],
          ['Minimal anniversary gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Modern anniversary gift', 'Huggies or hoops', 'Amadea, Pave Hoops'],
          ['Romantic date-night gift', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
          ['Formal anniversary dinner', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Soft anniversary gift', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
          ['Bold anniversary evening gift', 'Bold earrings or hoops if she likes visible jewellery', 'Lusso, Pave Hoops'],
          ['Anniversary ear stack gift', 'Butterfly + stud or drop + stud', 'Farfalla + Cadenza S, Orsola + Cadenza S'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery a Good Anniversary Gift?',
    content: [
      { type: 'paragraph', text: 'A good anniversary jewellery gift should feel connected to the relationship and still be practical enough to wear again. The strongest anniversary gifts usually balance emotion and wearability. They should not feel like a random accessory, but they also should not be so dramatic that she only wears them once.' },
      { type: 'paragraph', text: 'Earrings work especially well for anniversaries because they are easier to choose than rings and can be worn with many outfits. A pair of butterfly earrings can carry meaning. Drop earrings can be worn for anniversary dinners and date nights. Diamond studs can become a classic everyday reminder of the occasion. Huggies can fit into a modern daily wardrobe.' },
      {
        type: 'table',
        headers: ['What Makes It a Strong Anniversary Gift', 'Why It Matters'],
        rows: [
          ['Romantic meaning', 'Makes the gift feel connected to the relationship'],
          ['Wearability', 'The jewellery should be useful after the anniversary'],
          ['Personal style match', 'The gift feels chosen for her'],
          ['Dinner or occasion fit', 'Many anniversaries include a date night or celebration'],
          ['Comfort', 'Earrings should feel easy for the full evening'],
          ['Metal colour match', 'Helps the gift fit her existing jewellery'],
          ['Timelessness', 'Anniversary gifts should not feel too trend-led'],
          ['Emotional detail', 'Symbolism can make the gift more memorable'],
        ],
      },
      { type: 'see-also', text: 'Romantic jewellery gifts', href: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Safest Anniversary Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest anniversary jewellery gifts are usually diamond studs, huggies or minimalist earrings. These pieces are wearable, classic and less risky than very bold or highly style-specific designs.' },
      { type: 'paragraph', text: 'Cadenza M is the strongest safe anniversary gift because it feels polished and gift-worthy. Cadenza S is better for a first anniversary, early relationship or subtle daily jewellery. Amadea is ideal if she likes modern everyday earrings. Laluce is best if she prefers understated pieces.' },
      {
        type: 'table',
        headers: ['Safe Anniversary Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Medium diamond studs', 'Safe classic anniversary sparkle', 'Cadenza M'],
          ['Small diamond studs', 'Subtle first anniversary gift', 'Cadenza S'],
          ['Huggies', 'Modern everyday anniversary gift', 'Amadea'],
          ['Minimalist earrings', 'Understated anniversary style', 'Laluce'],
          ['Stud + huggie set', 'Practical anniversary ear stack', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift if she likes romantic styling', 'Farfalla, Alidi Farfalla'],
          ['Drop earrings', 'Dinner or date-night anniversary gift', 'Orsola, Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Meaningful Anniversary Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'A meaningful anniversary gift should carry a message. It can represent growth together, love, a shared journey, a new chapter or a milestone in the relationship.' },
      { type: 'paragraph', text: 'Butterfly earrings are one of the strongest meaningful anniversary jewellery choices because a butterfly can represent transformation, growth, beauty and new beginnings. That symbolism fits anniversaries naturally because the occasion is about remembering where the relationship started and celebrating how it has grown.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Meaningful Anniversary Gift Idea', 'Why It Works', 'Product Direction'],
            rows: [
              ['Butterfly earrings', 'Symbolise growth and transformation', 'Farfalla'],
              ['Sentimental butterfly earrings', 'Feel personal and keepsake-led', 'Alidi Farfalla'],
              ['Butterfly + small stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
              ['Drop earrings', 'Perfect for anniversary dinners', 'Orsola'],
              ['Long drops', 'Strong for milestone anniversary evenings', 'Concetta Long'],
              ['Medium studs', 'Classic anniversary sparkle', 'Cadenza M'],
              ['Small studs', 'Subtle daily reminder', 'Cadenza S'],
              ['Minimalist earrings', 'Quiet and intimate', 'Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Butterfly Earrings for Anniversary Gifts',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are one of the best anniversary jewellery gifts when the gift should feel romantic and meaningful.' },
      { type: 'paragraph', text: 'A butterfly can represent growth, transformation, beauty and new beginnings. For an anniversary, this can suggest growing together, changing together and celebrating the next chapter of the relationship.' },
      { type: 'paragraph', text: 'Alidi Farfalla butterfly earrings should be positioned as the strongest romantic anniversary gift direction. Farfalla works well for symbolic anniversary gifts, soft romantic styling and butterfly ear stack combinations.' },
      {
        type: 'table',
        headers: ['Anniversary Butterfly Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Most romantic anniversary gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Meaningful anniversary gift', 'Butterfly earrings', 'Farfalla'],
          ['First anniversary gift with meaning', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Milestone anniversary gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Soft anniversary dinner look', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Romantic ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
          ['Sentimental anniversary gift', 'Butterfly earrings', 'Alidi Farfalla'],
          ['Gift for wife or girlfriend', 'Butterfly earrings', 'Alidi Farfalla, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for wife', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-wife' },
    ],
  },
  {
    heading: 'Drop Earrings for Anniversary Dinners',
    content: [
      { type: 'paragraph', text: 'Drop earrings are one of the strongest anniversary dinner gifts because they can be worn immediately for the celebration.' },
      { type: 'paragraph', text: 'Orsola drop earrings are the best all-round anniversary dinner recommendation. They add movement, elegance and romantic polish without needing a heavy necklace. Concetta Short is better for soft, delicate outfits. Concetta Long is better for formal dinners, milestone anniversaries and dressier evening plans.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Anniversary Dinner Gift Need', 'Best Earring Direction', 'Product Direction'],
            rows: [
              ['Best anniversary dinner earrings', 'Drop earrings', 'Orsola'],
              ['Romantic date-night gift', 'Drops or butterfly earrings', 'Orsola, Farfalla'],
              ['Satin dinner dress', 'Drop earrings', 'Orsola'],
              ['Black anniversary dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Red anniversary dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Champagne or blush outfit', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Formal anniversary dinner', 'Long drops', 'Concetta Long'],
              ['Dinner ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Date night jewellery guide', href: '/resources/jewellery-gift-guides/date-night-jewellery-guide' },
    ],
  },
  {
    heading: 'Diamond Studs as Classic Anniversary Gifts',
    content: [
      { type: 'paragraph', text: 'Diamond studs are a classic anniversary gift because they are timeless, wearable and easy to style.' },
      { type: 'paragraph', text: 'Cadenza M diamond stud earrings are the strongest classic anniversary option because they feel polished and special without being risky. Cadenza S is better for subtle daily wear, first anniversaries or early relationship gifting. Studs are also strong because they can become part of an ear stack later.' },
      {
        type: 'table',
        headers: ['Anniversary Stud Gift Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Safe classic anniversary gift', 'Cadenza M', 'Polished and timeless'],
          ['Subtle first anniversary gift', 'Cadenza S', 'Simple and wearable'],
          ['Everyday anniversary reminder', 'Cadenza S', 'Easy to wear often'],
          ['Milestone classic gift', 'Cadenza M', 'More visible sparkle'],
          ['Work-to-dinner gift', 'Cadenza M', 'Clean and versatile'],
          ['Ear stack support', 'Cadenza S', 'Works with drops, huggies and butterfly earrings'],
          ['If unsure of her style', 'Cadenza M or Cadenza S', 'Safest direction'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Huggies and Minimalist Earrings for Everyday Anniversary Gifts',
    content: [
      { type: 'paragraph', text: 'Not every anniversary gift needs to be dressy. If she prefers everyday jewellery, huggies or minimalist earrings may be more useful than a formal occasion piece.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are strong for modern everyday anniversary gifting because they are close-fitting, wearable and stack-friendly. Laluce minimalist diamond earrings are best if she likes quiet detail. Cadenza S pairs well with both for a simple anniversary stack.' },
      {
        type: 'table',
        headers: ['Everyday Anniversary Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern everyday anniversary gift', 'Huggies', 'Amadea'],
          ['Minimal anniversary gift', 'Minimalist earrings', 'Laluce'],
          ['Subtle daily sparkle', 'Small studs', 'Cadenza S'],
          ['Polished daily sparkle', 'Medium studs', 'Cadenza M'],
          ['Everyday romantic stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Minimal romantic stack', 'Small stud + minimalist earring', 'Cadenza S + Laluce'],
          ['Workwear-friendly anniversary gift', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['Quiet romantic gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Everyday lab-grown diamond earrings guide', href: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
    ],
  },
  {
    heading: 'Anniversary Jewellery Gifts by Relationship',
    content: [
      { type: 'paragraph', text: 'The best anniversary gift depends on the relationship stage and how personal the gift should feel.' },
      { type: 'paragraph', text: 'For a wife, butterfly earrings, drop earrings or polished studs can feel romantic and thoughtful. For a girlfriend, the gift should match the relationship stage. For a newer relationship, small studs or huggies may feel safer. For a long-term partner, meaningful butterfly earrings or elegant drops can feel stronger.' },
      {
        type: 'table',
        headers: ['Relationship', 'Best Anniversary Jewellery Direction', 'Product Direction'],
        rows: [
          ['Wife', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['Girlfriend', 'Butterfly earrings, huggies, drops or studs', 'Farfalla, Amadea, Orsola, Cadenza M'],
          ['Partner', 'Meaningful earrings or classic sparkle', 'Alidi Farfalla, Cadenza M'],
          ['First anniversary', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Long-term relationship', 'Butterfly earrings or dinner drops', 'Alidi Farfalla, Orsola'],
          ['Milestone anniversary', 'Long drops, butterfly earrings or polished studs', 'Concetta Long, Alidi Farfalla, Cadenza M'],
          ['Surprise anniversary gift', 'Studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['If unsure', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for girlfriend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-girlfriend' },
    ],
  },
  {
    heading: 'Anniversary Jewellery Gifts by Milestone',
    content: [
      { type: 'paragraph', text: 'A first anniversary gift may be subtle and wearable. A milestone anniversary gift can carry more meaning, polish or formality. The best choice depends on her style and the way you are celebrating.' },
      {
        type: 'table',
        headers: ['Anniversary Stage', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['First anniversary', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Early anniversary', 'Studs, huggies or soft drops', 'Cadenza S, Amadea, Concetta Short'],
          ['5th anniversary', 'Butterfly earrings, drops or medium studs', 'Farfalla, Orsola, Cadenza M'],
          ['10th anniversary', 'Classic studs, butterfly earrings or long drops', 'Cadenza M, Alidi Farfalla, Concetta Long'],
          ['Milestone anniversary', 'Butterfly earrings, long drops or polished studs', 'Alidi Farfalla, Concetta Long, Cadenza M'],
          ['Anniversary dinner', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Anniversary trip', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Formal anniversary event', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Quiet anniversary gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Bold anniversary evening', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for her', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-her' },
    ],
  },
  {
    heading: 'Anniversary Jewellery by Her Personal Style',
    content: [
      { type: 'paragraph', text: 'Her personal style should guide the gift more than the anniversary number. A romantic person may love butterfly earrings. A classic dresser may prefer diamond studs. A modern dresser may use huggies or hoops more often. A minimalist person may prefer Laluce or Cadenza S.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-95.jpg',
        content: [
          {
            type: 'table',
            headers: ['Her Style', 'Best Anniversary Gift Direction', 'Product Direction'],
            rows: [
              ['Classic', 'Diamond studs', 'Cadenza M, Cadenza S'],
              ['Minimalist', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
              ['Romantic', 'Butterfly earrings or drops', 'Alidi Farfalla, Farfalla, Orsola'],
              ['Modern', 'Huggies or hoops', 'Amadea, Pave Hoops'],
              ['Soft feminine', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['Workwear-focused', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Occasion dresser', 'Drop earrings', 'Orsola, Concetta Short, Concetta Long'],
              ['Party style', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
              ['Ear stack lover', 'Butterfly + stud or stud + huggie', 'Farfalla + Cadenza S, Cadenza S + Amadea'],
              ['Safe gift recipient', 'Studs', 'Cadenza M, Cadenza S'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Anniversary Jewellery by Outfit and Dinner Plan',
    content: [
      { type: 'paragraph', text: 'Anniversary gifts often connect to a dinner, date night, weekend trip or celebration outfit. Choose jewellery that works with the plan.' },
      { type: 'paragraph', text: 'If the anniversary includes dinner, drops are strong. If the plan is casual or travel-led, studs or huggies may be better. If the outfit is soft, blush, champagne or floral, butterfly earrings or short drops can work beautifully. If the outfit is black or satin, Orsola or Cadenza M are strong choices.' },
      {
        type: 'table',
        headers: ['Anniversary Plan / Outfit', 'Best Jewellery Direction', 'Product Direction'],
        rows: [
          ['Romantic dinner', 'Drop earrings', 'Orsola'],
          ['Casual anniversary day', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Anniversary weekend trip', 'Studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Black dress', 'Drops, studs, hoops or bold earrings', 'Orsola, Cadenza M, Pave Hoops, Lusso'],
          ['Satin dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Red dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Green dress', 'Gold drops or hoops', 'Orsola, Pave Hoops'],
          ['Champagne dress', 'Short drops, butterfly earrings or studs', 'Concetta Short, Farfalla, Cadenza M'],
          ['Blush outfit', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
          ['Formal dinner', 'Long drops or polished studs', 'Concetta Long, Cadenza M'],
          ['Party anniversary', 'Hoops, drops or bold earrings', 'Pave Hoops, Orsola, Lusso'],
          ['Everyday anniversary gift', 'Studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with satin dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },
  {
    heading: 'Anniversary Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the easiest ways to make the anniversary gift feel right. The safest choice is the metal colour she already wears most often.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, romantic and classic. White or silver tone feels clean, bright and modern. Rose gold feels soft, feminine and sentimental. For butterfly earrings and romantic anniversary gifts, rose gold can be especially strong if she already wears that tone.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-97.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Anniversary Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and romantic', 'Black dresses, green dresses, anniversary dinners, everyday gifts'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, workwear, formal outfits, cool-toned wardrobes'],
              ['Rose gold', 'Soft, feminine and sentimental', 'Butterfly earrings, blush outfits, romantic gifts'],
              ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For anniversary gifts, avoid choosing metal colour only because it is trending. Match what she already wears first.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Anniversary Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Anniversary ear stacks can feel thoughtful when she has multiple piercings or likes layered jewellery. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: 'The most romantic anniversary stack is a butterfly earring with a small stud. The best dinner stack is a drop earring with a small support stud. The safest everyday stack is a small stud with a huggie.' },
      {
        type: 'table',
        headers: ['Anniversary Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Romantic anniversary stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Sentimental anniversary stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Safe everyday stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Anniversary dinner stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft anniversary stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal anniversary stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Modern anniversary stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Bold anniversary evening stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
          ['Minimal anniversary stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks' },
    ],
  },
  {
    heading: 'Product Pathways by Anniversary Gift Need',
    content: [
      { type: 'subheading', text: 'For the Most Romantic Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They are strongest when the gift should feel emotional, personal and meaningful.' },
      { type: 'subheading', text: 'For a Meaningful Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. Butterfly symbolism connects naturally to growth, transformation and a shared journey.' },
      { type: 'subheading', text: 'For an Anniversary Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings. They add movement and elegance for date nights, satin dresses and romantic dinner outfits.' },
      { type: 'subheading', text: 'For the Safest Classic Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They are polished, timeless and easy to wear with many outfits.' },
      { type: 'subheading', text: 'For a Subtle First Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs or Amadea Huggie earrings. They feel wearable, modern and not overwhelming.' },
      { type: 'subheading', text: 'For a Minimal Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These work well when she prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Soft Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Concetta Short earrings. They are delicate and strong for blush, champagne, pastel, soft satin and feminine styling.' },
      { type: 'subheading', text: 'For a Formal Milestone Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Concetta Long earrings or Cadenza M. Concetta Long works for dressier anniversaries, while Cadenza M is safer and more classic.' },
      { type: 'subheading', text: 'For a Modern Anniversary Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops if she likes visible shape. Choose Lusso only if she loves bold evening jewellery.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Anniversary Gift Role', 'Why It Works'],
        rows: [
          ['Alidi Farfalla butterfly earrings', 'Best romantic anniversary gift', 'Soft, personal and meaningful'],
          ['Farfalla butterfly earrings', 'Best symbolic anniversary gift', 'Represents growth, beauty and transformation'],
          ['Orsola drop earrings', 'Best anniversary dinner gift', 'Adds elegant movement for date nights'],
          ['Cadenza M diamond stud earrings', 'Best safe classic anniversary gift', 'Polished, timeless and wearable'],
          ['Cadenza S lab-grown diamond studs', 'Best subtle first anniversary gift', 'Simple, delicate and stackable'],
          ['Concetta Short earrings', 'Best soft anniversary gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal milestone anniversary gift', 'Refined and polished for dressy evenings'],
          ['Amadea Huggie earrings', 'Best modern everyday anniversary gift', 'Close-fitting, wearable and stack-friendly'],
          ['Laluce minimalist diamond earrings', 'Best understated anniversary gift', 'Quiet, clean and easy for minimal style'],
          ['Pave Hoops', 'Best modern anniversary gift', 'Adds shape and sparkle'],
          ['Lusso bold statement earrings', 'Best bold anniversary evening gift', 'Strong only if she loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the anniversary gift by her style and the celebration plan. Pick Alidi Farfalla for romance, Farfalla for symbolism, Orsola for dinner, Cadenza M for safe classic sparkle, Cadenza S for subtle daily wear, Amadea for modern huggies, Laluce for minimal style and Concetta Long for formal milestone anniversaries.' },
    ],
  },
  {
    heading: 'Common Anniversary Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that looks impressive but does not match her style. If she wears small, simple pieces every day, very bold earrings may not be the safest anniversary gift.' },
      { type: 'paragraph', text: 'Another mistake is choosing something that only works for one anniversary dinner. A strong anniversary gift should feel special in the moment and still be wearable after it.' },
      { type: 'paragraph', text: 'A third mistake is ignoring the meaning of the occasion. Anniversary jewellery should feel connected to the relationship, not like a generic accessory. Butterfly earrings, classic studs or dinner-ready drops can all carry meaning when chosen well.' },
      { type: 'paragraph', text: 'Another mistake is guessing the metal colour. Look at what she already wears. If most of her jewellery is gold, choose gold. If she wears white or silver-tone jewellery, choose that direction.' },
      { type: 'paragraph', text: 'A fifth mistake is choosing a dramatic gift too early in the relationship. For early anniversaries, small studs, huggies or minimalist earrings may feel more natural.' },
      { type: 'paragraph', text: 'Finally, do not forget comfort. Anniversary jewellery should feel easy enough for dinner, photos, travel, celebrations and future wear.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Anniversary Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing anniversary jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is this a first anniversary, early anniversary or milestone anniversary?',
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is the gift tied to a dinner, trip, party, formal evening or quiet celebration?',
          'Should the gift feel meaningful, practical or both?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would diamond studs be safer?',
          'Can the earrings be worn after the anniversary?',
          'Will the jewellery work for everyday outfits, dinners, workwear or future occasions?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack feel more thoughtful?',
          'Are the earrings comfortable for long wear?',
          'Is the design easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza M for safe classic sparkle. If you want meaning, choose Farfalla or Alidi Farfalla. If the gift is tied to dinner, choose Orsola. If she likes modern everyday jewellery, choose Amadea or Cadenza S.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for an anniversary gift?', answer: 'The best anniversary jewellery is romantic, wearable and suited to her style. Butterfly earrings, drop earrings, diamond studs, huggies, minimalist earrings and hoops can all work depending on the relationship and occasion.' },
  { question: 'Are earrings a good anniversary gift?', answer: 'Yes, earrings are a good anniversary gift because they feel personal, can be worn often and are easier to choose than rings.' },
  { question: 'Are lab-grown diamond earrings good anniversary gifts?', answer: 'Yes, lab-grown diamond earrings are strong anniversary gifts because they feel special while still being wearable for dinners, date nights, everyday outfits and future occasions.' },
  { question: 'What are the safest earrings to gift for an anniversary?', answer: 'Medium diamond studs are the safest anniversary earrings because they are classic, polished and easy to wear with many outfits.' },
  { question: 'Are butterfly earrings a meaningful anniversary gift?', answer: 'Yes, butterfly earrings are meaningful anniversary gifts because they can symbolise growth, transformation, beauty and new beginnings.' },
  { question: 'What jewellery should I buy my wife for an anniversary?', answer: 'For a wife, butterfly earrings, drop earrings and classic diamond studs are strong anniversary choices depending on whether her style is romantic, elegant or classic.' },
  { question: 'What jewellery should I buy my girlfriend for an anniversary?', answer: 'For a girlfriend, small studs, huggies, butterfly earrings or drop earrings can work well depending on the relationship stage and her style.' },
  { question: 'What earrings are best for an anniversary dinner?', answer: 'Drop earrings are one of the best anniversary dinner choices because they add movement and elegance near the face.' },
  { question: 'What metal colour is best for anniversary jewellery?', answer: 'Choose the metal colour she already wears most often. Yellow gold feels warm and romantic, white or silver tone feels clean and modern, and rose gold feels soft and sentimental.' },
  { question: 'What IWantJewels earrings are best for anniversary gifts?', answer: 'Alidi Farfalla, Farfalla, Orsola, Cadenza M, Cadenza S, Concetta Short, Concetta Long, Amadea, Laluce and Pave Hoops are strong anniversary gift options depending on her style and the occasion.' },
]

const cta: V2CTABlock = {
  heading: 'Anniversary jewellery should celebrate the relationship and still feel wearable after the occasion. Choose butterfly earrings for meaning, drop earrings for anniversary dinners, diamond studs for safe classic sparkle, huggies for modern everyday jewellery, minimalist earrings for quiet style and hoops or bold earrings only if she loves visible styling.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want an anniversary gift with real diamond sparkle. Choose Alidi Farfalla for romance, Farfalla for symbolism, Orsola for dinners, Cadenza M for classic polish, Cadenza S for subtle daily wear, Amadea for huggies, Laluce for minimalist style and Concetta Long for milestone anniversaries.',
  primaryLabel: 'Shop Anniversary Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Romantic Jewellery Gifts',
  secondaryHref: '/resources/jewellery-gift-guides/romantic-jewellery-gifts-for-her',
  tertiaryLabel: 'Read the Jewellery Gifts for Wife Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/jewellery-gifts-for-wife',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'anniversary-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'anniversary-jewellery-gifts', 3)
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
