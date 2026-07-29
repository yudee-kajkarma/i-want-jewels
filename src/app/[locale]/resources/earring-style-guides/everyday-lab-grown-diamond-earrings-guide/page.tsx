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
  title: 'Everyday Lab Grown Diamond Earrings Guide',
  description:
    'Choose everyday lab grown diamond earrings for work, casual outfits, ear stacks, gifts, travel and daily jewellery styling.',
}

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-101.jpg',
  title: 'Everyday Lab-Grown Diamond Earrings:',
  subtitle: 'How to Choose Earrings You Can Wear Daily',
  paragraphs: [
    'Everyday earrings should be easy to wear, comfortable, versatile and polished enough to make simple outfits feel complete. They should work with workwear, casual outfits, weekend styling, travel looks, dinner plans and simple ear stacks without feeling too heavy or too formal.',
    'Lab-grown diamond earrings are especially useful for everyday jewellery because they add real diamond sparkle in wearable designs. A small diamond stud can become the safest daily earring. A huggie can add close-fitting shape. A minimalist earring can add quiet detail. A medium stud can add more visible polish. A refined hoop can make a simple outfit look more styled.',
    'At IWantJewels, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings, Laluce minimalist diamond earrings and Pave Hoops are the strongest everyday earring directions. Orsola, Farfalla and Concetta Short can also work for softer daily-to-dinner or romantic everyday styling.',
  ],
  shopLabel: 'Shop Everyday Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

const quickSummary: V2QuickSummary = {
  items: [
    'Choose lab-grown diamond earrings for everyday wear.',
    'Decide between studs, huggies, hoops, minimalist earrings and soft drops.',
    'Build simple daily ear stacks.',
    'Style everyday earrings with workwear, casual outfits, travel outfits and dinner looks.',
    'Choose comfortable earrings for long wear.',
    'Pick everyday jewellery gifts.',
    'Match earrings with metal colour, hairstyle and outfit type.',
    'Find IWantJewels product recommendations by daily styling need.',
    'Plan image blocks, product modules, CTA sections and internal links for this page.',
  ],
  image: '/blog-images/blog-image-103.jpg',
}

const articleContent: V2ArticleSection[] = [
  // ── Section 0: Selector ──────────────────────────────────────────────────────
  {
    heading: 'Everyday Earring Selector',
    content: [
      { type: 'paragraph', text: 'Use this table near the top of the page as the main styling decision tool.' },
      {
        type: 'table',
        headers: ['Daily Wear Need', 'Best Earring Direction', 'Recommended IWJ Direction'],
        rows: [
          ['Safest everyday earrings', 'Small diamond studs', 'Cadenza S'],
          ['More visible daily sparkle', 'Medium diamond studs', 'Cadenza M'],
          ['Modern everyday shape', 'Huggies', 'Amadea Huggie'],
          ['Quiet minimalist styling', 'Minimalist earrings', 'Laluce'],
          ['Simple daily ear stack', 'Small stud + huggie', 'Cadenza S + Amadea'],
          ['Workwear polish', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Travel-friendly earrings', 'Secure studs or huggies', 'Cadenza S, Amadea'],
          ['Casual outfit styling', 'Huggies, studs or hoops', 'Amadea, Cadenza S, Pave Hoops'],
          ['Weekend styling', 'Hoops or medium studs', 'Pave Hoops, Cadenza M'],
          ['Daily-to-dinner styling', 'Medium studs, hoops or soft drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Romantic everyday jewellery', 'Butterfly earrings or small studs', 'Farfalla, Alidi Farfalla, Cadenza S'],
          ['Minimal daily gift', 'Studs, huggies or minimalist earrings', 'Cadenza S, Amadea, Laluce'],
        ],
      },
    ],
  },

  // ── Section 1: What Makes Earrings Good for Everyday Wear ────────────────────
  {
    heading: 'What Makes Earrings Good for Everyday Wear?',
    content: [
      { type: 'paragraph', text: 'Good everyday earrings should be easy to repeat. They should not depend on one outfit or one occasion. They should feel comfortable with a shirt in the morning, a blazer for work, knitwear in colder months, a simple dress on weekends and a dinner outfit in the evening.' },
      { type: 'paragraph', text: 'The best daily earrings usually have a clean shape, secure fit, wearable size and enough sparkle to feel special without becoming distracting.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-105.jpg',
        content: [
          {
            type: 'table',
            headers: ['Everyday Earring Quality', 'Why It Matters'],
            rows: [
              ['Comfortable fit', 'Daily earrings may be worn for many hours'],
              ['Wearable size', 'Smaller or refined pieces are easier to repeat'],
              ['Secure closure', 'Helps with work, travel and long wear'],
              ['Subtle sparkle', 'Adds polish without feeling too formal'],
              ['Easy styling', 'Works with more than one outfit'],
              ['Stackability', 'Can be paired with studs, huggies or minimalist pieces'],
              ['Simple care', 'Daily jewellery should be easy to clean and store'],
              ['Rewear value', 'The piece should not feel limited to one event'],
            ],
          },
          { type: 'paragraph', text: 'At IWantJewels, everyday styling should feel premium but not excessive. Cadenza S, Cadenza M, Amadea and Laluce are especially strong because they can be worn alone or combined into simple ear stacks.' },
        ],
      },
      { type: 'see-also', text: 'Can You Wear Lab-Grown Diamond Earrings Every Day?', href: '/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day' },
    ],
  },

  // ── Section 2: Best Everyday Earrings ────────────────────────────────────────
  {
    heading: 'Best Everyday Lab-Grown Diamond Earrings',
    content: [
      { type: 'paragraph', text: 'The best everyday lab-grown diamond earrings are usually studs, huggies, minimalist earrings and refined hoops. These styles are easy to wear repeatedly and can be dressed up or down.' },
      { type: 'paragraph', text: 'Studs are the safest first choice. Huggies are best for modern close-fitting shape. Minimalist earrings are best for quiet styling. Hoops are better when the shopper wants more visible shape. Soft drops are better for dinner or occasion styling rather than strict everyday use.' },
      {
        type: 'table',
        headers: ['Earring Style', 'Everyday Fit', 'Best IWJ Direction'],
        rows: [
          ['Small studs', 'Excellent', 'Cadenza S'],
          ['Medium studs', 'Excellent for visible daily sparkle', 'Cadenza M'],
          ['Huggies', 'Excellent', 'Amadea'],
          ['Minimalist earrings', 'Excellent', 'Laluce'],
          ['Refined hoops', 'Good for styled daily outfits', 'Pave Hoops'],
          ['Soft drops', 'Good for daily-to-dinner looks', 'Orsola, Concetta Short'],
          ['Butterfly earrings', 'Good for romantic everyday styling', 'Farfalla, Alidi Farfalla'],
          ['Bold statement earrings', 'Usually not daily', 'Lusso for party/evening looks'],
        ],
      },
      { type: 'divider' },
    ],
  },

  // ── Section 3: Studs for Everyday Wear ───────────────────────────────────────
  {
    heading: 'Studs for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Stud earrings are the easiest everyday diamond earrings because they sit close to the ear and work with almost every outfit.' },
      { type: 'paragraph', text: 'Small studs are subtle and low-effort. Medium studs are better when the shopper wants visible sparkle without moving into hoops or drops. Studs are also strong for workwear, travel, gifts and second piercings.' },
      { type: 'paragraph', text: 'Cadenza S lab-grown diamond studs should be positioned as the best everyday starter earring. Cadenza M diamond stud earrings should be positioned as the better choice for shoppers who want a classic daily stud with more presence.' },
      {
        type: 'table',
        headers: ['Stud Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['First everyday studs', 'Cadenza S', 'Simple, subtle and easy'],
          ['More visible daily sparkle', 'Cadenza M', 'Classic with stronger presence'],
          ['Workwear studs', 'Cadenza M or Cadenza S', 'Clean and professional'],
          ['Travel studs', 'Cadenza S', 'Easy and secure'],
          ['Ear stack support', 'Cadenza S', 'Works with huggies, hoops and drops'],
          ['Giftable studs', 'Cadenza M', 'Safe and polished'],
          ['Minimal styling', 'Cadenza S', 'Quiet and wearable'],
        ],
      },
      { type: 'see-also', text: 'Stud vs Hoop Earrings', href: '/resources/earring-style-guides/stud-vs-hoop-earrings' },
    ],
  },

  // ── Section 4: Huggies for Everyday Wear ─────────────────────────────────────
  {
    heading: 'Huggies for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Huggies are one of the best everyday earring styles because they sit close to the ear while still adding shape.' },
      { type: 'paragraph', text: 'They feel more styled than simple studs but less visible than hoops. This makes them ideal for shoppers who want earrings that feel modern and easy without becoming bold.' },
      { type: 'paragraph', text: 'Amadea Huggie earrings are the strongest IWantJewels daily huggie direction. They can be worn alone, paired with Cadenza S for a simple ear stack, or worn with Cadenza M for more visible sparkle.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-107.jpg',
        content: [
          {
            type: 'table',
            headers: ['Huggie Styling Need', 'Product Combination', 'Best For'],
            rows: [
              ['Simple huggie look', 'Amadea', 'Everyday shape'],
              ['Daily ear stack', 'Cadenza S + Amadea', 'Best starter stack'],
              ['Workwear huggie stack', 'Cadenza M + Amadea', 'Polished daily look'],
              ['Minimal huggie stack', 'Laluce + Amadea', 'Soft and clean'],
              ['Travel-friendly styling', 'Cadenza S + Amadea', 'Easy to repeat'],
              ['Weekend styling', 'Amadea + Pave Hoops if spacing allows', 'More shape'],
              ['Giftable huggie set', 'Cadenza S + Amadea', 'Safe two-piece stack'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Hoop vs Huggie Earrings', href: '/resources/earring-style-guides/hoop-vs-huggie-earrings' },
    ],
  },

  // ── Section 5: Minimalist Earrings for Everyday Wear ─────────────────────────
  {
    heading: 'Minimalist Earrings for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Minimalist earrings are ideal when the shopper wants quiet detail instead of obvious sparkle or shape.' },
      { type: 'paragraph', text: 'Laluce minimalist diamond earrings are the strongest direction here. They work for daily outfits, office styling, understated gifts and soft ear stacks. Minimalist earrings are especially useful when the outfit already has detail or when the wearer prefers jewellery that feels subtle.' },
      {
        type: 'table',
        headers: ['Minimalist Need', 'Best Product Direction', 'Why It Works'],
        rows: [
          ['Quiet daily detail', 'Laluce', 'Soft and understated'],
          ['Minimal ear stack', 'Cadenza S + Laluce', 'Clean and balanced'],
          ['Workwear minimal look', 'Laluce or Cadenza S', 'Professional and simple'],
          ['Gift for subtle style', 'Laluce', 'Less risky than bold designs'],
          ['Detailed outfit support', 'Laluce', 'Adds polish without competition'],
          ['Travel jewellery', 'Cadenza S or Laluce', 'Easy styling'],
          ['Soft romantic stack', 'Farfalla + Laluce', 'Meaningful but not heavy'],
        ],
      },
      { type: 'see-also', text: 'Minimalist Jewellery Styling Guide', href: '/resources/earring-style-guides/minimalist-jewellery-styling-guide' },
    ],
  },

  // ── Section 6: Hoops for Everyday Wear ───────────────────────────────────────
  {
    heading: 'Hoops for Everyday Wear',
    content: [
      { type: 'paragraph', text: 'Hoops can work for everyday wear when they are refined, comfortable and not too large.' },
      { type: 'paragraph', text: 'Diamond hoops are more visible than studs or huggies, so they are best for shoppers who want their daily earrings to show. They work well with casual outfits, weekend looks, simple dresses and modern workwear.' },
      { type: 'paragraph', text: 'Pave Hoops should be positioned as the everyday-to-party hoop option. They are not as quiet as studs, but they are useful when shoppers want shape and sparkle in one piece.' },
      {
        type: 'table',
        headers: ['Everyday Hoop Situation', 'Best Direction', 'Product Direction'],
        rows: [
          ['Casual daily outfit', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Weekend look', 'Hoops', 'Pave Hoops'],
          ['Simple dress', 'Hoops or medium studs', 'Pave Hoops, Cadenza M'],
          ['Work-to-dinner outfit', 'Hoops or soft drops', 'Pave Hoops, Orsola'],
          ['Hoop ear stack', 'Hoop + small stud', 'Pave Hoops + Cadenza S'],
          ['Minimal hoop look', 'Hoop + minimalist detail', 'Pave Hoops + Laluce'],
          ['If hoops feel too visible', 'Huggies or studs', 'Amadea, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Hoop Earrings Guide', href: '/resources/earring-style-guides/lab-grown-diamond-hoop-earrings-guide' },
    ],
  },

  // ── Section 7: Drop Earrings for Daily-to-Dinner ─────────────────────────────
  {
    heading: 'Drop Earrings for Daily-to-Dinner Styling',
    content: [
      { type: 'paragraph', text: 'Drop earrings are usually not the easiest daily earring for very casual wear, but they are excellent for daily-to-dinner styling.' },
      { type: 'paragraph', text: 'If the shopper wears simple dresses, satin shirts, dinner outfits, soft blouses or work-event looks, a delicate drop can add elegance without needing extra jewellery.' },
      { type: 'paragraph', text: 'Orsola is strongest for polished daily-to-dinner looks. Concetta Short is better for soft, delicate styling. Cadenza M may be better if the shopper wants everyday sparkle without movement.' },
      {
        type: 'table',
        headers: ['Daily-to-Dinner Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Dinner after work', 'Medium drops', 'Orsola'],
          ['Soft blouse outfit', 'Short drops or studs', 'Concetta Short, Cadenza M'],
          ['Satin shirt or dress', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Minimal evening look', 'Drops', 'Orsola'],
          ['Detailed outfit', 'Studs', 'Cadenza M'],
          ['Romantic day-to-night look', 'Butterfly earrings or drops', 'Farfalla, Orsola'],
          ['Formal daily event', 'Drops or medium studs', 'Orsola, Cadenza M'],
        ],
      },
      { type: 'see-also', text: 'Jewellery with Satin Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-satin-dress' },
    ],
  },

  // ── Section 8: Workwear ───────────────────────────────────────────────────────
  {
    heading: 'Everyday Earrings for Workwear',
    content: [
      { type: 'paragraph', text: 'Everyday work earrings should look polished but not distracting.' },
      { type: 'paragraph', text: 'Studs, huggies and minimalist earrings are the safest choices. Hoops can work if they are refined. Drops are better for work events or day-to-dinner outfits.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-91.jpg',
        content: [
          {
            type: 'table',
            headers: ['Workwear Style', 'Best Everyday Earring Direction', 'Product Direction'],
            rows: [
              ['Classic office outfit', 'Studs', 'Cadenza S, Cadenza M'],
              ['Modern office styling', 'Huggies', 'Amadea'],
              ['Minimal workwear', 'Minimalist earrings', 'Laluce'],
              ['Creative office outfit', 'Hoops or huggies', 'Pave Hoops, Amadea'],
              ['Blazer outfit', 'Medium studs or huggies', 'Cadenza M, Amadea'],
              ['Work event', 'Medium studs, hoops or soft drops', 'Cadenza M, Pave Hoops, Orsola'],
              ['Detailed work outfit', 'Studs or minimalist earrings', 'Cadenza S, Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'Stud vs Huggie Earrings', href: '/resources/earring-style-guides/stud-vs-huggie-earrings' },
    ],
  },

  // ── Section 9: Casual Outfits ─────────────────────────────────────────────────
  {
    heading: 'Everyday Earrings for Casual Outfits',
    content: [
      { type: 'paragraph', text: 'Casual outfits often need a small jewellery detail to feel finished.' },
      { type: 'paragraph', text: 'A white shirt and jeans can look polished with studs or huggies. Knitwear works well with studs or hoops. A simple casual dress can work with huggies, minimalist earrings or butterfly earrings. Weekend outfits can carry hoops more easily than office outfits.' },
      {
        type: 'table',
        headers: ['Casual Outfit', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['White shirt and jeans', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['T-shirt and blazer', 'Studs, huggies or hoops', 'Cadenza M, Amadea, Pave Hoops'],
          ['Knitwear', 'Studs or hoops', 'Cadenza S, Pave Hoops'],
          ['Simple casual dress', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Soft pastel outfit', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
          ['Weekend outfit', 'Hoops or huggies', 'Pave Hoops, Amadea'],
          ['Neutral outfit', 'Minimalist earrings or medium studs', 'Laluce, Cadenza M'],
          ['Casual dinner outfit', 'Medium studs or drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Minimalist Earrings Guide', href: '/resources/earring-style-guides/minimalist-earrings-guide' },
    ],
  },

  // ── Section 10: Travel ────────────────────────────────────────────────────────
  {
    heading: 'Everyday Earrings for Travel',
    content: [
      { type: 'paragraph', text: 'Travel earrings should be comfortable, secure and easy to style with many outfits.' },
      { type: 'paragraph', text: 'The safest travel choices are studs and huggies because they sit close to the ear and work with casual, work and dinner outfits. Hoops can work if the shopper wants one more visible option. Drops are better for planned evening outfits rather than full-day travel.' },
      {
        type: 'table',
        headers: ['Travel Need', 'Best Earring Direction', 'Product Direction'],
        rows: [
          ['Safest travel earrings', 'Small studs', 'Cadenza S'],
          ['Modern travel earrings', 'Huggies', 'Amadea'],
          ['Travel ear stack', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['More polished travel look', 'Medium studs', 'Cadenza M'],
          ['One styled travel earring', 'Hoops', 'Pave Hoops'],
          ['Travel dinner outfit', 'Drops or medium studs', 'Orsola, Cadenza M'],
          ['Minimal packing', 'One stud + one huggie pair', 'Cadenza S + Amadea'],
        ],
      },
      { type: 'see-also', text: 'Diamond Ear Stack Ideas', href: '/resources/earring-style-guides/diamond-ear-stack-ideas' },
    ],
  },

  // ── Section 11: Ear Stack Ideas ───────────────────────────────────────────────
  {
    heading: 'Everyday Ear Stack Ideas',
    content: [
      { type: 'paragraph', text: 'Everyday ear stacks should be comfortable, simple and balanced.' },
      { type: 'paragraph', text: 'The best daily stack usually has one sparkle point and one shape detail. If there are three piercings, add one soft minimalist detail. Avoid making every piece large or decorative.' },
      {
        type: 'grid-layout',
        imagePosition: 'left',
        image: '/blog-images/blog-image-32.jpg',
        content: [
          {
            type: 'table',
            headers: ['Everyday Stack Goal', 'Main Piece', 'Support Piece', 'Product Direction'],
            rows: [
              ['Easiest daily stack', 'Small stud', 'Huggie', 'Cadenza S + Amadea'],
              ['Classic daily stack', 'Medium stud', 'Small stud', 'Cadenza M + Cadenza S'],
              ['Minimal daily stack', 'Small stud', 'Minimalist earring', 'Cadenza S + Laluce'],
              ['Workwear stack', 'Medium stud', 'Huggie', 'Cadenza M + Amadea'],
              ['Weekend stack', 'Hoop', 'Small stud', 'Pave Hoops + Cadenza S'],
              ['Romantic daily stack', 'Butterfly earring', 'Small stud', 'Farfalla + Cadenza S'],
              ['Soft daily-to-dinner stack', 'Drop earring', 'Small stud', 'Orsola + Cadenza S'],
              ['Three-piece daily stack', 'Medium stud', 'Huggie + minimalist detail', 'Cadenza M + Amadea + Laluce'],
            ],
          },
        ],
      },
      { type: 'see-also', text: 'How to Stack Earrings', href: '/resources/earring-style-guides/how-to-stack-earrings' },
    ],
  },

  // ── Section 12: By Outfit Type ────────────────────────────────────────────────
  {
    heading: 'Everyday Earrings by Outfit Type',
    content: [
      { type: 'paragraph', text: 'This table should help shoppers choose earrings quickly based on what they are wearing.' },
      {
        type: 'table',
        headers: ['Outfit Type', 'Best Everyday Earring Direction', 'Product Direction'],
        rows: [
          ['White shirt', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Blazer', 'Medium studs or huggies', 'Cadenza M, Amadea'],
          ['Knitwear', 'Studs or hoops', 'Cadenza S, Pave Hoops'],
          ['Casual dress', 'Huggies or minimalist earrings', 'Amadea, Laluce'],
          ['Black dress', 'Medium studs, hoops or soft drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Satin dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Green dress', 'Drops, hoops or studs', 'Orsola, Pave Hoops, Cadenza M'],
          ['Red dress', 'Medium studs or drops', 'Cadenza M, Orsola'],
          ['Workwear', 'Studs, huggies or minimalist earrings', 'Cadenza M, Amadea, Laluce'],
          ['Travel outfit', 'Small studs or huggies', 'Cadenza S, Amadea'],
          ['Dinner outfit', 'Medium studs, hoops or drops', 'Cadenza M, Pave Hoops, Orsola'],
          ['Soft romantic outfit', 'Butterfly earrings or small studs', 'Farfalla, Cadenza S'],
        ],
      },
      { type: 'see-also', text: 'What Jewellery to Wear with a Black Dress', href: '/resources/earring-style-guides/what-jewellery-to-wear-with-a-black-dress' },
    ],
  },

  // ── Section 13: Metal Colour ──────────────────────────────────────────────────
  {
    heading: 'Everyday Earrings by Metal Colour',
    content: [
      { type: 'paragraph', text: 'Metal colour changes how everyday earrings feel.' },
      { type: 'paragraph', text: 'Yellow gold feels warm and classic. White or silver tone feels clean and modern. Rose gold feels soft and romantic. For everyday wear, the best metal colour is usually the one the shopper already wears most often.' },
      {
        type: 'grid-layout',
        imagePosition: 'right',
        image: '/blog-images/blog-image-103.jpg',
        content: [
          {
            type: 'table',
            headers: ['Metal Colour', 'Daily Styling Mood', 'Best For'],
            rows: [
              ['Yellow gold', 'Warm, classic and polished', 'Everyday wear, black outfits, green outfits, gifts'],
              ['White or silver tone', 'Clean, bright and modern', 'Workwear, minimal outfits, cool wardrobes'],
              ['Rose gold', 'Soft, romantic and feminine', 'Gifts, blush outfits, pastel styling'],
              ['Mixed metals', 'Creative and casual', 'Ear stacks and relaxed styling'],
            ],
          },
          { type: 'paragraph', text: 'For everyday ear stacks, using one metal colour is the easiest way to keep the stack polished. A yellow gold stack feels warm, a white/silver-tone stack feels clean, and a rose gold stack feels soft.' },
        ],
      },
      { type: 'see-also', text: 'Gold vs White vs Rose Gold Lab-Grown Diamond Earrings', href: '/resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings' },
    ],
  },

  // ── Section 14: Gifts ─────────────────────────────────────────────────────────
  {
    heading: 'Everyday Earrings as Gifts',
    content: [
      { type: 'paragraph', text: 'Everyday earrings are some of the safest jewellery gifts because they are useful, repeatable and easy to wear.' },
      { type: 'paragraph', text: 'Studs are the safest gift. Huggies are best for someone who likes modern jewellery. Minimalist earrings are strong for someone with understated taste. Medium studs are better when the gift should feel more special. Butterfly earrings work when the gift should feel meaningful.' },
      {
        type: 'table',
        headers: ['Gift Need', 'Best Everyday Earring Direction', 'Product Direction'],
        rows: [
          ['Safest gift', 'Small or medium studs', 'Cadenza S, Cadenza M'],
          ['First diamond earrings', 'Small studs', 'Cadenza S'],
          ['Classic sparkle gift', 'Medium studs', 'Cadenza M'],
          ['Modern everyday gift', 'Huggies', 'Amadea'],
          ['Minimalist gift', 'Minimalist earrings', 'Laluce'],
          ['Romantic daily gift', 'Butterfly earrings', 'Farfalla, Alidi Farfalla'],
          ['Travel-friendly gift', 'Studs or huggies', 'Cadenza S, Amadea'],
          ['Ear stack gift', 'Stud + huggie', 'Cadenza S + Amadea'],
          ['Daily-to-dinner gift', 'Medium studs or soft drops', 'Cadenza M, Orsola'],
        ],
      },
      { type: 'see-also', text: 'Lab-Grown Diamond Earrings for Gifts', href: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts' },
    ],
  },

  // ── Section 15: Product Pathways ──────────────────────────────────────────────
  {
    heading: 'Product Pathways by Daily Styling Need',
    content: [
      { type: 'subheading', text: 'For the Safest Everyday Earring' },
      { type: 'paragraph', text: 'Choose Cadenza S lab-grown diamond studs. They are simple, subtle and easy to wear daily.' },
      { type: 'subheading', text: 'For More Visible Everyday Sparkle' },
      { type: 'paragraph', text: 'Choose Cadenza M diamond stud earrings. They keep the classic everyday stud shape but add more presence.' },
      { type: 'subheading', text: 'For Modern Everyday Shape' },
      { type: 'paragraph', text: 'Choose Amadea Huggie earrings. They sit close to the ear and work beautifully in daily ear stacks.' },
      { type: 'subheading', text: 'For Quiet Minimalist Styling' },
      { type: 'paragraph', text: 'Choose Laluce minimalist diamond earrings. They are best for shoppers who want everyday detail that feels understated.' },
      { type: 'subheading', text: 'For Everyday Ear Stacks' },
      { type: 'paragraph', text: 'Choose Cadenza S with Amadea for the easiest daily stack. Add Laluce if the shopper has enough piercings and wants a soft third detail.' },
      { type: 'subheading', text: 'For Weekend Shape' },
      { type: 'paragraph', text: 'Choose Pave Hoops. They add more visible shape and sparkle than studs or huggies.' },
      { type: 'subheading', text: 'For Daily-to-Dinner Styling' },
      { type: 'paragraph', text: 'Choose Orsola drop earrings when the outfit needs movement and polish for dinner, events or satin looks.' },
      { type: 'subheading', text: 'For Romantic Everyday Styling' },
      { type: 'paragraph', text: 'Choose Farfalla butterfly earrings or Alidi Farfalla butterfly earrings when the look should feel soft, meaningful and personal.' },
    ],
  },

  // ── Section 16: Product Recommendations ──────────────────────────────────────
  {
    heading: 'Product Recommendations from IWantJewels',
    content: [
      {
        type: 'table',
        headers: ['Product', 'Best Everyday Role', 'Why It Works'],
        rows: [
          ['Cadenza S lab-grown diamond studs', 'Best everyday starter', 'Small, simple and easy to wear daily'],
          ['Cadenza M diamond stud earrings', 'Best visible everyday sparkle', 'Classic with more presence'],
          ['Amadea Huggie earrings', 'Best everyday shape', 'Close-fitting, modern and stackable'],
          ['Laluce minimalist diamond earrings', 'Best quiet daily detail', 'Soft and understated'],
          ['Pave Hoops', 'Best weekend/everyday shape', 'Adds curve and visible sparkle'],
          ['Orsola drop earrings', 'Best daily-to-dinner option', 'Adds movement and polish'],
          ['Concetta Short earrings', 'Best soft occasion option', 'Delicate enough for lighter styling'],
          ['Farfalla butterfly earrings', 'Best romantic everyday option', 'Adds meaning and softness'],
          ['Alidi Farfalla butterfly earrings', 'Best gift-led everyday option', 'Strong for personal gifts'],
          ['Lusso bold statement earrings', 'Not daily, but useful alternative', 'Best for parties and simple evening outfits'],
        ],
      },
      { type: 'paragraph', text: 'Everyday earrings should be comfortable, repeatable and easy to style. Start with Cadenza S for subtle sparkle, Cadenza M for more visible polish, Amadea for huggies, Laluce for minimalist detail and Pave Hoops when you want daily earrings with more shape.' },
    ],
  },

  // ── Section 17: Mistakes ──────────────────────────────────────────────────────
  {
    heading: 'Common Everyday Earring Mistakes to Avoid',
    content: [
      { type: 'paragraph', text: 'One common mistake is choosing earrings that are too bold for daily wear. Bold earrings can be beautiful, but they may not feel easy to repeat every day.' },
      { type: 'paragraph', text: 'Another mistake is choosing earrings that are too tiny for every outfit. If the outfit is dark, satin or visually strong, very small studs may disappear.' },
      { type: 'paragraph', text: 'A third mistake is ignoring comfort. Everyday earrings should feel secure and wearable for several hours.' },
      { type: 'paragraph', text: 'Another mistake is buying earrings that only work with one outfit. A strong everyday pair should work with workwear, casual outfits and simple evening looks.' },
      { type: 'paragraph', text: 'A fifth mistake is not thinking about ear stacks. Even if the shopper buys one pair first, it should be easy to pair later with studs, huggies or minimalist earrings.' },
      { type: 'paragraph', text: 'Finally, do not choose only by sparkle. Daily earrings should also match the wearer\'s metal colour, lifestyle, hairstyle and outfit habits.' },
      { type: 'see-also', text: 'Gold-Plated Jewellery Care Guide', href: '/resources/demi-fine-jewellery-guides/how-to-care-for-gold-plated-jewellery' },
    ],
  },

  // ── Section 18: Final Checklist ───────────────────────────────────────────────
  {
    heading: 'Final Everyday Earring Checklist',
    content: [
      { type: 'paragraph', text: 'Before choosing everyday lab-grown diamond earrings, ask:' },
      {
        type: 'bullet-list',
        items: [
          'Will I wear these earrings several times a week?',
          'Are they comfortable for long wear?',
          'Do they sit close enough for daily use?',
          'Do I want studs, huggies, minimalist earrings or hoops?',
          'Do I want subtle sparkle or visible sparkle?',
          'Can I wear them with workwear and casual outfits?',
          'Can they be used in an ear stack?',
          'Does the metal colour match my usual jewellery?',
          'Are they easy to clean and store?',
          'Will they work with my hairstyle?',
          'Can they be dressed up for dinner?',
          'Are they too bold for everyday use?',
          'Would a second support earring complete the look?',
        ],
      },
      { type: 'paragraph', text: 'If you are unsure, start with small lab-grown diamond studs or huggies. They are the easiest everyday earrings to wear often.' },
    ],
  },
]

const faq: V2FAQItem[] = [
  { question: 'What are the best lab-grown diamond earrings for everyday wear?', answer: 'Small diamond studs, medium studs, huggies and minimalist earrings are the best lab-grown diamond earrings for everyday wear. They are comfortable, versatile and easy to repeat.' },
  { question: 'Can you wear lab-grown diamond earrings every day?', answer: 'Yes, lab-grown diamond earrings can be worn every day when the design is comfortable, secure and easy to care for.' },
  { question: 'Are diamond studs good for everyday wear?', answer: 'Yes, diamond studs are one of the best everyday earring styles because they sit close to the ear and work with many outfits.' },
  { question: 'Are huggie earrings good for everyday wear?', answer: 'Yes, huggies are excellent for everyday wear because they are close-fitting, modern and easy to stack with studs.' },
  { question: 'Are hoop earrings good for everyday wear?', answer: 'Refined hoops can work for everyday wear if they are comfortable and not too large. Hoops are better when you want visible shape.' },
  { question: 'Are drop earrings good for everyday wear?', answer: 'Short or medium drops can work for polished daily-to-dinner outfits, but studs and huggies are usually easier for regular daily wear.' },
  { question: 'What earrings should I wear to work every day?', answer: 'Studs, huggies and minimalist earrings are best for daily workwear because they look polished without being distracting.' },
  { question: 'What everyday earrings are best for gifts?', answer: 'Studs are the safest everyday earring gift. Huggies and minimalist earrings are also strong if the recipient likes modern or subtle jewellery.' },
  { question: 'What is the easiest everyday ear stack?', answer: 'The easiest everyday ear stack is a small diamond stud with a huggie. For IWantJewels, Cadenza S with Amadea is the strongest starting point.' },
  { question: 'What IWantJewels products are best for everyday earrings?', answer: 'Cadenza S, Cadenza M, Amadea Huggie, Laluce and Pave Hoops are the strongest everyday earring options. Orsola and Farfalla can work for daily-to-dinner or romantic styling.' },
]

const cta: V2CTABlock = {
  heading: 'Everyday lab-grown diamond earrings should feel easy, polished and wearable. Choose studs for simple sparkle, huggies for modern shape, minimalist earrings for quiet detail, hoops for visible styling and soft drops for daily-to-dinner outfits.',
  body: 'Start with IWantJewels demi-fine lab-grown diamond earrings if you want everyday jewellery with real diamond sparkle. Choose Cadenza S for subtle daily shine, Cadenza M for classic polish, Amadea for huggies, Laluce for minimalist detail, Pave Hoops for shape and Orsola for soft evening movement.',
  primaryLabel: 'Shop Everyday Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Diamond Stud Earrings',
  secondaryHref: '/products?category=Earring',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings for Ear Stacks Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks',
}

export default function Page() {
  const category = getCategoryBySlug('earring-style-guides')
  const article = getArticleBySlug('earring-style-guides', 'everyday-lab-grown-diamond-earrings-guide')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('earring-style-guides', 'everyday-lab-grown-diamond-earrings-guide', 3)
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
