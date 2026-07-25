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
  title: 'Graduation Jewellery Gifts',
  description:
    'Choose graduation jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, hoops and meaningful gift ideas.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/jewellery-gift-guides/graduation-jewellery-gifts',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/jewellery-gift-guides/graduation-jewellery-gifts',
  },
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-23.jpg',
  title: 'Graduation Jewellery Gifts:',
  subtitle: 'Meaningful Earrings for a New Chapter',
  paragraphs: [
    'Graduation jewellery should feel meaningful, grown-up and useful for the next stage of life. A good graduation gift should not be something that is worn once and forgotten. It should be a piece she can wear for graduation photos, dinner celebrations, university life, first job outfits, interviews, travel, birthdays, weddings, date nights and everyday styling.',
    'Lab-grown diamond earrings are one of the strongest graduation jewellery gifts because they feel special without being difficult to choose. Small diamond studs are the safest first diamond-style gift. Huggies are ideal for modern everyday wear. Butterfly earrings are especially meaningful because a butterfly can represent transformation, growth and a new beginning. Minimalist earrings work well for understated style. Hoops are strong for someone who likes modern visible jewellery. Drop earrings are better for graduation dinners, formal celebrations and occasion outfits.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Farfalla butterfly earrings, Alidi Farfalla butterfly earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings, Pave Hoops, Orsola drop earrings, Concetta Short earrings and Concetta Long earrings all work for different graduation gift needs.',
  ],
  shopLabel: 'Shop Graduation Jewellery Gifts',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose graduation jewellery gifts.',
    'Pick lab-grown diamond earrings for graduation.',
    'Find meaningful graduation jewellery with symbolism.',
    'Choose a first diamond-style gift.',
    'Decide between studs, huggies, butterfly earrings, hoops, minimalist earrings and drops.',
    'Choose jewellery for daughters, sisters, girlfriends, best friends and loved ones graduating.',
    'Match graduation earrings to personal style, outfit habits and metal colour.',
    'Build graduation ear stack gift ideas.',
  ],
  image: '/blog-images/blog-image-85.jpg',
}

const articleContent: V2ArticleSection[] = [
  {
    heading: 'Graduation Jewellery Gift Selector',
    content: [
      { type: 'paragraph', text: 'Use this table as the main gift decision tool.' },
      {
        type: 'table',
        headers: ['Graduation Gift Need', 'Best Jewellery Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest graduation gift', 'Small diamond studs', 'Cadenza S'],
          ['More polished graduation gift', 'Medium diamond studs', 'Cadenza M'],
          ['Most meaningful graduation gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['First diamond-style gift', 'Small diamond studs', 'Cadenza S'],
          ['Modern everyday gift', 'Huggies', 'Amadea Huggie'],
          ['Minimalist graduation gift', 'Minimalist earrings or small studs', 'Laluce, Cadenza S'],
          ['Graduation dinner gift', 'Drop earrings or medium studs', 'Orsola, Cadenza M'],
          ['First job gift', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['University graduation gift', 'Studs, butterfly earrings or huggies', 'Cadenza S, Farfalla, Amadea'],
          ['High school graduation gift', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Graduation party gift', 'Hoops, studs or butterfly earrings', 'Pave Hoops, Cadenza M, Farfalla'],
          ['Graduation ear stack', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
          ['If unsure of her style', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
    ],
  },
  {
    heading: 'What Makes Jewellery a Good Graduation Gift?',
    content: [
      { type: 'paragraph', text: 'A good graduation jewellery gift should feel connected to the achievement and useful for the next chapter. Graduation is not only a celebration of finishing school, college or university. It often marks a new beginning, a first job, a move, a new routine or a more grown-up personal style.' },
      { type: 'paragraph', text: 'That is why earrings work so well. They are easier to choose than rings, more wearable than many formal pieces and useful across many life moments. A pair of small diamond studs can become her daily jewellery. Butterfly earrings can carry meaning. Huggies can fit into a modern everyday wardrobe. Drops can be worn for graduation dinners, future weddings and formal events.' },
      {
        type: 'table',
        headers: ['What Makes It a Good Graduation Gift', 'Why It Matters'],
        rows: [
          ['Meaningful symbolism', 'Graduation is a life transition'],
          ['Wearability', 'The gift should be useful after the ceremony'],
          ['Age-appropriate style', 'The piece should suit her current life stage'],
          ['Easy styling', 'Earrings work with many outfits'],
          ['Comfort', 'Graduation gifts should be practical enough to repeat'],
          ['Future use', 'The jewellery should work for university, work, dinners and events'],
          ['Personal style match', 'The gift should feel chosen for her'],
          ['Timelessness', 'A graduation gift should not feel like a short trend'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for daughter', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-daughter' },
    ],
  },
  {
    heading: 'Safest Graduation Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'The safest graduation jewellery gifts are usually small diamond studs, huggies or minimalist earrings. These pieces are easy to wear, age-friendly and suitable for many future settings.' },
      { type: 'paragraph', text: 'Cadenza S is the safest graduation gift because it feels subtle, polished and useful for everyday wear. Cadenza M works better when the gift should feel more elevated. Amadea is ideal for a graduate who likes modern jewellery. Laluce is best if she prefers clean, understated pieces.' },
      {
        type: 'table',
        headers: ['Safe Graduation Gift Option', 'Best For', 'Product Direction'],
        rows: [
          ['Small diamond studs', 'Safest first diamond-style gift', 'Cadenza S'],
          ['Medium diamond studs', 'More polished graduation sparkle', 'Cadenza M'],
          ['Huggies', 'Modern everyday wear', 'Amadea'],
          ['Minimalist earrings', 'Understated style', 'Laluce'],
          ['Stud + huggie set', 'Practical ear stack gift', 'Cadenza S + Amadea'],
          ['Butterfly earrings', 'Meaningful gift if she likes soft styling', 'Farfalla, Alidi Farfalla'],
          ['Medium studs + small studs', 'Classic sparkle stack', 'Cadenza M + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for gifts', href: '/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },
  {
    heading: 'Meaningful Graduation Jewellery Gifts',
    content: [
      { type: 'paragraph', text: 'Graduation is one of the strongest moments for meaningful jewellery. The gift can represent growth, achievement, confidence, independence, transformation or a new beginning.' },
      { type: 'paragraph', text: 'Butterfly earrings are especially strong for graduation because the symbolism naturally fits the moment. A butterfly can represent transformation, growth and entering a new chapter. This makes Farfalla and Alidi Farfalla strong choices for graduation gifts that should feel emotional without being too heavy or overly formal.' },
      {
        type: 'table',
        headers: ['Meaningful Graduation Gift Idea', 'Why It Works', 'Product Direction'],
        rows: [
          ['Butterfly earrings', 'Symbolise growth and transformation', 'Farfalla'],
          ['Butterfly + small stud stack', 'Meaning plus everyday sparkle', 'Farfalla + Cadenza S'],
          ['Small diamond studs', 'First classic diamond-style gift', 'Cadenza S'],
          ['Medium diamond studs', 'Polished milestone sparkle', 'Cadenza M'],
          ['Huggies', 'Practical new chapter jewellery', 'Amadea'],
          ['Minimalist earrings', 'Quiet, grown-up and wearable', 'Laluce'],
          ['Drop earrings', 'Graduation dinner and formal events', 'Orsola'],
          ['Short drops', 'Soft occasion styling', 'Concetta Short'],
        ],
      },
      { type: 'see-also', text: 'Butterfly earrings meaning', href: '#' },
    ],
  },
  {
    heading: 'Butterfly Earrings for Graduation',
    content: [
      { type: 'paragraph', text: 'Butterfly earrings are one of the best graduation jewellery gifts when the gift should feel symbolic.' },
      { type: 'paragraph', text: 'A butterfly can represent transformation, growth, freedom, beauty and new beginnings. Graduation is exactly that kind of moment. It marks the end of one stage and the start of another, so butterfly earrings can feel more personal than a standard gift.' },
      { type: 'paragraph', text: 'Farfalla butterfly earrings are the strongest graduation direction when the gift is for a daughter, sister, best friend or loved one starting a new chapter. Alidi Farfalla works when the gift should feel more emotional, elegant or keepsake-led.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-87.jpg',
        content: [
          {
            type: 'table',
            headers: ['Graduation Butterfly Gift Need', 'Best Direction', 'Product Direction'],
            rows: [
              ['Most meaningful graduation gift', 'Butterfly earrings', 'Farfalla'],
              ['Sentimental graduation gift', 'Butterfly earrings', 'Alidi Farfalla'],
              ['Daughter graduation gift', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
              ['Sister graduation gift', 'Butterfly earrings or huggies', 'Farfalla, Amadea'],
              ['Best friend graduation gift', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
              ['Graduation ear stack', 'Butterfly + small stud', 'Farfalla + Cadenza S'],
              ['Soft graduation dinner look', 'Butterfly earrings or short drops', 'Farfalla, Concetta Short'],
              ['New chapter gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for daughter', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-daughter' },
    ],
  },
  {
    heading: 'Diamond Studs as Graduation Gifts',
    content: [
      { type: 'paragraph', text: 'Diamond studs are one of the safest and most timeless graduation jewellery gifts.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs are best for a first diamond-style gift because they are subtle, wearable and not overwhelming. Cadenza M diamond stud earrings are better when the gift should feel more polished and grown-up. Both can be worn after graduation with everyday outfits, workwear, interviews, dinners and future events.' },
      {
        type: 'table',
        headers: ['Graduation Stud Gift Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['First diamond-style gift', 'Cadenza S', 'Subtle, safe and wearable'],
          ['Classic graduation gift', 'Cadenza M', 'Polished and timeless'],
          ['Everyday graduation gift', 'Cadenza S', 'Easy to wear often'],
          ['First job jewellery', 'Cadenza M', 'Clean and professional'],
          ['Graduation dinner sparkle', 'Cadenza M', 'More visible but still classic'],
          ['Ear stack support', 'Cadenza S', 'Works with huggies, drops and butterfly earrings'],
          ['Safe gift when unsure', 'Cadenza S or Cadenza M', 'Works across many styles'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond stud earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-stud-earrings-guide' },
    ],
  },
  {
    heading: 'Huggies and Minimalist Earrings for New Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Huggies and minimalist earrings are excellent graduation gifts because they can become part of a new daily routine.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are strong for a graduate who likes modern, practical jewellery. They work with casual outfits, university looks, first-job outfits, travel and simple ear stacks. Laluce minimalist diamond earrings are best if she prefers quiet detail and understated style. Cadenza S pairs well with both as a support stud.' },
      {
        type: 'table',
        headers: ['Everyday Graduation Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimal everyday gift', 'Minimalist earrings', 'Laluce'],
          ['Subtle daily sparkle', 'Small studs', 'Cadenza S'],
          ['Polished daily sparkle', 'Medium studs', 'Cadenza M'],
          ['First job jewellery', 'Studs or huggies', 'Cadenza M, Amadea'],
          ['University daily jewellery', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Minimal ear stack gift', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Quiet milestone gift', 'Minimalist earrings or studs', 'Laluce, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Everyday lab-grown diamond earrings guide', href: '/resources/earring-style-guides/everyday-lab-grown-diamond-earrings-guide' },
    ],
  },
  {
    heading: 'Hoop Earrings for Modern Graduation Gifts',
    content: [
      { type: 'paragraph', text: 'Hoop earrings are strong graduation gifts for someone who likes modern jewellery, visible shape and stylish everyday-to-evening pieces.' },
      { type: 'paragraph', text: 'Pave Hoops work well for graduation parties, university-age gifts, first-job celebration looks, birthday-style graduation dinners and modern outfits. They are less universal than studs or huggies, but stronger if the graduate already likes hoops or visible earrings.' },
      {
        type: 'table',
        headers: ['Modern Graduation Gift Need', 'Best Direction', 'Product Direction'],
        rows: [
          ['Modern graduation gift', 'Hoops', 'Pave Hoops'],
          ['Graduation party gift', 'Hoops or studs', 'Pave Hoops, Cadenza M'],
          ['University-age jewellery gift', 'Hoops, huggies or small studs', 'Pave Hoops, Amadea, Cadenza S'],
          ['Modern ear stack', 'Hoop + small stud', 'Pave Hoops + Cadenza S'],
          ['First job social events', 'Hoops or medium studs', 'Pave Hoops, Cadenza M'],
          ['If hoops feel too visible', 'Huggies or studs', 'Amadea, Cadenza S'],
          ['Birthday + graduation gift', 'Hoops or butterfly earrings', 'Pave Hoops, Farfalla'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond hoop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },
  {
    heading: 'Drop Earrings for Graduation Dinners',
    content: [
      { type: 'paragraph', text: 'Drop earrings are best when the graduation gift is tied to a dinner, ceremony outfit, family celebration or formal event.' },
      { type: 'paragraph', text: 'Orsola drop earrings work well for graduation dinners because they add movement and elegance. Concetta Short is better for soft, delicate styling. Concetta Long is best for formal evening celebrations, milestone dinners and dressier outfits.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-89.jpg',
        content: [
          {
            type: 'table',
            headers: ['Graduation Dinner Gift Need', 'Best Drop Direction', 'Product Direction'],
            rows: [
              ['Graduation dinner earrings', 'Medium drops', 'Orsola'],
              ['Soft dinner outfit', 'Short drops', 'Concetta Short'],
              ['Formal graduation event', 'Long drops', 'Concetta Long'],
              ['Satin graduation dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Black graduation dinner dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
              ['Champagne or blush outfit', 'Short drops or butterfly earrings', 'Concetta Short, Farfalla'],
              ['Dinner ear stack', 'Drop + small stud', 'Orsola + Cadenza S'],
              ['Safer dinner gift', 'Medium studs', 'Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond drop earrings guide', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-drop-earrings-guide' },
    ],
  },
  {
    heading: 'Graduation Jewellery by Recipient',
    content: [
      { type: 'paragraph', text: 'The recipient matters because graduation gifts can be for a daughter, sister, girlfriend, best friend, niece or someone close. The safest gift depends on the relationship and how well you know her style.' },
      {
        type: 'table',
        headers: ['Recipient', 'Best Graduation Jewellery Direction', 'Product Direction'],
        rows: [
          ['Daughter', 'Small studs, butterfly earrings or huggies', 'Cadenza S, Farfalla, Amadea'],
          ['Sister', 'Huggies, studs, hoops or butterfly earrings', 'Amadea, Cadenza M, Pave Hoops, Farfalla'],
          ['Girlfriend', 'Butterfly earrings, studs or drops', 'Farfalla, Cadenza M, Orsola'],
          ['Best friend', 'Butterfly earrings, huggies or studs', 'Farfalla, Amadea, Cadenza S'],
          ['Niece', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['Friend', 'Studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
          ['Partner', 'Butterfly earrings, drops or classic studs', 'Alidi Farfalla, Orsola, Cadenza M'],
          ['If unsure', 'Diamond studs', 'Cadenza S, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for sister', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-sister' },
    ],
  },
  {
    heading: 'Graduation Jewellery by Personal Style',
    content: [
      { type: 'paragraph', text: 'The best graduation jewellery gift should match her personal style. A minimalist graduate may not wear bold earrings. A romantic graduate may love butterfly earrings. A modern dresser may prefer huggies or hoops. A classic dresser may prefer diamond studs.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Her Style', 'Best Graduation Gift Direction', 'Product Direction'],
            rows: [
              ['Classic', 'Diamond studs', 'Cadenza S, Cadenza M'],
              ['Minimalist', 'Small studs or minimalist earrings', 'Cadenza S, Laluce'],
              ['Romantic', 'Butterfly earrings or short drops', 'Farfalla, Alidi Farfalla, Concetta Short'],
              ['Modern', 'Huggies or hoops', 'Amadea, Pave Hoops'],
              ['Soft feminine', 'Butterfly earrings or delicate drops', 'Farfalla, Concetta Short'],
              ['Workwear-focused', 'Studs or huggies', 'Cadenza M, Amadea'],
              ['Party style', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
              ['Occasion dresser', 'Drop earrings', 'Orsola, Concetta Short, Concetta Long'],
              ['Ear stack lover', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
              ['Safe gift recipient', 'Studs', 'Cadenza S, Cadenza M'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for girlfriend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-girlfriend' },
    ],
  },
  {
    heading: 'Graduation Jewellery by Life Stage',
    content: [
      { type: 'paragraph', text: 'Graduation can mean different things depending on the stage of life. A high school graduate may need something subtle and wearable. A university graduate may enjoy something more polished. A graduate starting work may need earrings that fit professional outfits.' },
      {
        type: 'table',
        headers: ['Life Stage', 'Best Graduation Gift Direction', 'Product Direction'],
        rows: [
          ['High school graduation', 'Small studs, huggies or butterfly earrings', 'Cadenza S, Amadea, Farfalla'],
          ['University graduation', 'Studs, butterfly earrings, huggies or hoops', 'Cadenza M, Farfalla, Amadea, Pave Hoops'],
          ['Postgraduate graduation', 'Medium studs, drops or butterfly earrings', 'Cadenza M, Orsola, Farfalla'],
          ['First job after graduation', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Graduation dinner', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Moving away after graduation', 'Butterfly earrings or studs', 'Farfalla, Cadenza S'],
          ['New chapter gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Professional milestone gift', 'Medium studs or huggies', 'Cadenza M, Amadea'],
        ],
      },
      { type: 'see-also', text: 'Jewellery gifts for best friend', href: '/resources/jewellery-gift-guides/jewellery-gifts-for-best-friend' },
    ],
  },
  {
    heading: 'Graduation Jewellery by Outfit and Future Use',
    content: [
      { type: 'paragraph', text: 'Graduation jewellery should work beyond the ceremony. It should be useful for future outfits, not just one photo day.' },
      { type: 'paragraph', text: 'If she will wear the gift daily, choose studs, huggies or minimalist earrings. If she will wear it for dinners and events, choose drops or polished studs. If she loves meaningful pieces, choose butterfly earrings. If she likes modern styling, choose hoops or huggies.' },
      {
        type: 'table',
        headers: ['Future Use', 'Best Jewellery Gift Direction', 'Product Direction'],
        rows: [
          ['Daily outfits', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['University outfits', 'Small studs, huggies or hoops', 'Cadenza S, Amadea, Pave Hoops'],
          ['First job outfits', 'Medium studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Interviews', 'Studs or minimalist earrings', 'Cadenza S, Cadenza M, Laluce'],
          ['Graduation dinner', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Family celebrations', 'Butterfly earrings, drops or studs', 'Farfalla, Orsola, Cadenza M'],
          ['Wedding guest outfits', 'Drops, studs or butterfly earrings', 'Orsola, Cadenza M, Farfalla'],
          ['Party outfits', 'Hoops or bold earrings', 'Pave Hoops, Lusso'],
          ['Travel', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Ear stacks', 'Stud + huggie or butterfly + stud', 'Cadenza S + Amadea, Farfalla + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Wedding guest jewellery guide', href: '#' },
    ],
  },
  {
    heading: 'Graduation Jewellery by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour is one of the easiest ways to make the graduation gift feel right. The safest choice is the metal colour she already wears most often.' },
      { type: 'paragraph', text: 'Yellow gold feels warm, classic and celebratory. White or silver tone feels clean, bright and modern. Rose gold feels soft, feminine and meaningful. For butterfly earrings and sentimental graduation gifts, rose gold can be especially strong if she already wears that tone.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-93.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Graduation Gift Feeling', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and celebratory', 'Everyday gifts, graduation dinners, black or green outfits'],
              ['White or silver tone', 'Clean, bright and modern', 'Minimalist gifts, workwear, cool-toned wardrobes'],
              ['Rose gold', 'Soft, feminine and meaningful', 'Butterfly earrings, sentimental gifts, blush or pastel outfits'],
              ['Mixed metals', 'Creative and personal', 'Ear stack lovers and trend-led recipients'],
            ],
          },
        ],
      },
      { type: 'paragraph', text: 'For graduation gifts, avoid choosing metal colour only because it is trending. Match what she already wears first.' },
      { type: 'see-also', text: 'Gold vs white vs rose gold lab-grown diamond earrings', href: '/resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings' },
    ],
  },
  {
    heading: 'Graduation Ear Stack Gift Ideas',
    content: [
      { type: 'paragraph', text: 'Ear stack gifts are strong if she has multiple piercings or likes layered jewellery. A two-piece stack is usually safer than a three-piece stack.' },
      { type: 'paragraph', text: 'The safest graduation stack is a small stud with a huggie. The most meaningful graduation stack is a butterfly earring with a small stud. The best graduation dinner stack is a drop earring with a small support stud.' },
      {
        type: 'table',
        headers: ['Graduation Stack Type', 'Main Piece', 'Support Piece', 'Product Direction'],
        rows: [
          ['Safest graduation stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
          ['Classic sparkle stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
          ['Minimalist graduation stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
          ['Meaningful graduation stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
          ['Sentimental graduation stack', 'Butterfly earring', 'Minimalist detail', 'Alidi Farfalla + Laluce'],
          ['Graduation dinner stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
          ['Soft occasion stack', 'Short drop', 'Small stud', 'Concetta Short + Cadenza S'],
          ['Formal graduation stack', 'Long drop', 'Small stud', 'Concetta Long + Cadenza S'],
          ['Modern graduation stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
          ['Party graduation stack', 'Bold earring', 'Small stud', 'Lusso + Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-grown diamond earrings for ear stacks', href: '/resources/earring-style-guides/diamond-ear-stack-ideas' },
    ],
  },
  {
    heading: 'Product Pathways by Graduation Gift Need',
    content: [
      { type: 'subheading', text: 'For the Safest Graduation Jewellery Gift' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are subtle, classic and easy to wear through university, work, travel and everyday outfits.' },
      { type: 'subheading', text: 'For a More Polished Graduation Gift' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They add more visible sparkle while staying timeless and wearable.' },
      { type: 'subheading', text: 'For a Meaningful New Chapter Gift' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings. They are strong for graduation because butterfly symbolism naturally connects to growth and transformation.' },
      { type: 'subheading', text: 'For a Sentimental Graduation Gift' },
      { type: 'paragraph', text: 'Choose Alidi Farfalla butterfly earrings. They work well when the gift should feel emotional, personal and keepsake-led.' },
      { type: 'subheading', text: 'For a Modern Everyday Graduation Gift' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They are close-fitting, wearable and useful for daily styling or ear stacks.' },
      { type: 'subheading', text: 'For a Minimalist Graduation Gift' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings or Cadenza S. These are best for someone who prefers understated jewellery.' },
      { type: 'subheading', text: 'For a Graduation Dinner Gift' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings or Concetta Short earrings. Orsola gives elegant movement, while Concetta Short feels softer and more delicate.' },
      { type: 'subheading', text: 'For a Modern Party Graduation Gift' },
      { type: 'paragraph', text: 'Choose Pave Hoops if she likes modern visible jewellery. Choose Lusso bold statement earrings only if she loves standout party styling.' },
    ],
  },
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Graduation Gift Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best first diamond-style gift', 'Small, subtle, classic and wearable'],
          ['Cadenza M diamond stud earrings', 'Best polished graduation gift', 'More visible sparkle while staying timeless'],
          ['Farfalla butterfly earrings', 'Best meaningful graduation gift', 'Symbolic, soft and connected to growth'],
          ['Alidi Farfalla butterfly earrings', 'Best sentimental graduation gift', 'Strong for emotional new chapter gifting'],
          ['Amadea Huggie earrings', 'Best modern everyday gift', 'Close-fitting, stackable and wearable'],
          ['Laluce minimalist diamond earrings', 'Best understated graduation gift', 'Quiet, clean and easy for minimal style'],
          ['Pave Hoops', 'Best modern graduation party gift', 'Adds shape and sparkle'],
          ['Orsola drop earrings', 'Best graduation dinner gift', 'Elegant movement for dresses and events'],
          ['Concetta Short earrings', 'Best soft occasion gift', 'Delicate and feminine'],
          ['Concetta Long earrings', 'Best formal graduation gift', 'Refined and polished for dressy occasions'],
          ['Lusso bold statement earrings', 'Best bold party gift', 'Strong only if she loves standout jewellery'],
        ],
      },
      { type: 'paragraph', text: 'Choose the gift by what comes after graduation. Pick Cadenza S for a safe first diamond-style gift, Cadenza M for polished sparkle, Farfalla for meaning, Alidi Farfalla for sentimental gifting, Amadea for modern daily wear, Laluce for minimal style, Orsola for graduation dinners and Pave Hoops for modern celebration looks.' },
    ],
  },
  {
    heading: 'Common Graduation Jewellery Gift Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing jewellery that only works for the graduation day. A strong graduation gift should be useful after the ceremony too.' },
      { type: 'paragraph', text: 'Another mistake is choosing something too formal for someone who mostly wears casual or everyday outfits. If she is starting university, travelling or building a daily wardrobe, Cadenza S, Amadea or Laluce may be more useful than formal drops.' },
      { type: 'paragraph', text: 'A third mistake is choosing bold earrings when she usually wears simple jewellery. If her style is minimal, choose studs, huggies or minimalist earrings instead.' },
      { type: 'paragraph', text: 'Another mistake is ignoring the meaning of the moment. Graduation is a new chapter, so symbolic pieces such as butterfly earrings can feel more thoughtful than a generic gift.' },
      { type: 'paragraph', text: 'A fifth mistake is guessing the metal colour. Look at what she already wears. If most of her jewellery is gold, choose gold. If she wears silver or white-tone jewellery, choose that direction.' },
      { type: 'paragraph', text: 'Finally, do not forget comfort and repeat wear. Graduation jewellery should feel beautiful, but it should also be easy to wear, clean and store.' },
      { type: 'see-also', text: 'Gold-plated jewellery care guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },
  {
    heading: 'Final Graduation Gift Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing graduation jewellery, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Is this a first diamond-style gift?',
          'Does she prefer classic, minimalist, romantic, modern or bold jewellery?',
          'What metal colour does she already wear?',
          'Is the gift for high school, university, postgraduate, first job or another milestone?',
          'Should the gift feel meaningful, practical or both?',
          'Does she wear earrings daily?',
          'Does she prefer studs, huggies, hoops, drops or symbolic jewellery?',
          'Would butterfly earrings feel meaningful to her?',
          'Would small diamond studs be safer?',
          'Can the earrings be worn after graduation?',
          'Will the jewellery work for university, work, interviews, travel or everyday outfits?',
          'Does she have multiple piercings for an ear stack gift?',
          'Would a two-piece stack feel more thoughtful?',
          'Are the earrings comfortable for long wear?',
          'Is the design easy to clean and store?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, choose Cadenza S. If you want meaning, choose Farfalla. If the gift should feel more polished, choose Cadenza M. If she likes modern jewellery, choose Amadea or Pave Hoops. If the gift is for a graduation dinner, choose Orsola.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What jewellery is best for a graduation gift?', answer: 'The best graduation jewellery is meaningful, wearable and suited to the graduate\'s style. Small diamond studs, butterfly earrings, huggies, minimalist earrings, hoops and drop earrings can all work depending on the person.' },
  { question: 'Are earrings a good graduation gift?', answer: 'Yes, earrings are a good graduation gift because they are wearable, personal and easier to choose than rings.' },
  { question: 'Are lab-grown diamond earrings good graduation gifts?', answer: 'Yes, lab-grown diamond earrings are strong graduation gifts because they feel special while still being wearable for everyday outfits, first jobs, dinners and future occasions.' },
  { question: 'What are the safest earrings to gift for graduation?', answer: 'Small diamond studs are the safest graduation earrings because they are classic, simple and easy to wear with many outfits.' },
  { question: 'Are butterfly earrings a meaningful graduation gift?', answer: 'Yes, butterfly earrings are meaningful graduation gifts because they can symbolise growth, transformation and new beginnings.' },
  { question: 'What jewellery should I buy my daughter for graduation?', answer: 'Small diamond studs, butterfly earrings and huggies are strong graduation gifts for a daughter. Choose studs for safety, butterfly earrings for meaning and huggies for modern everyday wear.' },
  { question: 'What jewellery should I buy my sister for graduation?', answer: 'For a sister, huggies, studs, butterfly earrings or hoops can work well depending on her style.' },
  { question: 'What jewellery should I buy my best friend for graduation?', answer: 'For a best friend, butterfly earrings, huggies, small studs or hoops can feel stylish and meaningful without being too formal.' },
  { question: 'What should I buy as a first diamond-style graduation gift?', answer: 'Small lab-grown diamond studs are usually the safest first diamond-style graduation gift because they feel special, subtle and wearable.' },
  { question: 'What IWantJewels earrings are best for graduation gifts?', answer: 'Cadenza S, Cadenza M, Farfalla, Alidi Farfalla, Amadea, Laluce, Pave Hoops, Orsola and Concetta Short are strong graduation gift options depending on her style and the occasion.' },
]

const cta: V2CTABlock = {
  heading: 'Graduation jewellery should celebrate the achievement and still feel useful for the next chapter. Choose small diamond studs for a safe first diamond-style gift, butterfly earrings for meaning, huggies for modern everyday wear, minimalist earrings for quiet style, hoops for visible shape and drops for graduation dinners.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want a graduation gift with real diamond sparkle. Choose Cadenza S for a safe first gift, Cadenza M for polished sparkle, Farfalla for meaning, Alidi Farfalla for sentimental gifting, Amadea for huggies, Laluce for minimalist style, Orsola for dinners and Pave Hoops for modern celebration looks.',
  primaryLabel: 'Shop Graduation Jewellery Gifts',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Lab-Grown Diamond Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Jewellery Gifts for Daughter Guide',
  tertiaryHref: '/resources/jewellery-gift-guides/jewellery-gifts-for-daughter',
}

export default function Page() {
  const category = getCategoryBySlug('jewellery-gift-guides')
  const article = getArticleBySlug('jewellery-gift-guides', 'graduation-jewellery-gifts')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('jewellery-gift-guides', 'graduation-jewellery-gifts', 3)
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
