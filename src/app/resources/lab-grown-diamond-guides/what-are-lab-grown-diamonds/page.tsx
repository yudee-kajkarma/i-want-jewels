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
  title: 'What Are Lab Grown Diamonds? Simple Guide | I Want Jewels',
  description:
    'Learn what lab grown diamonds are, if they are real, how they compare to natural diamonds, and how to choose lab grown diamond jewellery.',
  alternates: {
    canonical: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds',
  },
  openGraph: {
    url: 'https://iwantjewels.com/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds',
  },
}

// ─── Hero Intro ───────────────────────────────────────────────────────────────

const heroIntro: V2HeroIntro = {
  image: '/blog-images/blog-image-2.jpg',
  title: 'What Are Lab-Grown Diamonds?',
  subtitle: 'A Simple Guide Before You Buy',
  paragraphs: [
    'Lab-grown diamonds are real diamonds created in a controlled laboratory environment instead of being mined from the earth. They have the same basic diamond structure as natural diamonds and can offer the same sparkle, hardness and beauty when they are well cut. The main difference is where they come from: natural diamonds form underground, while lab-grown diamonds are created above ground using advanced technology.',
    'For jewellery buyers, lab-grown diamonds have become popular because they make diamond jewellery feel more wearable. You can enjoy the look and feeling of real diamond jewellery without always needing to treat it like a once-in-a-lifetime purchase. They work beautifully in everyday earrings, studs, huggies, drop earrings, necklaces, bracelets and thoughtful gifts.',
    'If you are buying your first diamond piece, lab-grown diamond earrings are one of the easiest places to start. They are simple to wear, easy to style, and they bring sparkle close to the face without feeling too heavy or formal.',
  ],
  shopLabel: 'Shop Lab-Grown Diamond Earrings',
  shopHref: '/products?category=Earring',
}

// ─── Quick Summary ────────────────────────────────────────────────────────────

const quickSummary: V2QuickSummary = {
  items: [
    'Lab-grown diamonds are real diamonds, not glass, crystal or cubic zirconia.',
    'They are created in a laboratory instead of being mined from the earth.',
    'A well-cut lab-grown diamond can sparkle beautifully and look just like a natural diamond to the eye.',
    'They are often more accessible in price than comparable natural diamonds.',
    'They are a strong choice for everyday earrings, wedding guest jewellery, gifts and modern demi-fine jewellery.',
    'The best jewellery choice depends on the design, metal, comfort, setting and how you plan to wear it.',
    'For a first purchase, lab-grown diamond studs or huggies are usually the easiest pieces to start with.',
  ],
  image: '/blog-images/blog-image-3.jpg',
}

// ─── Article Body Content ─────────────────────────────────────────────────────

const articleContent: V2ArticleSection[] = [
  // ── Section 1 ──────────────────────────────────────────────────────────────
  {
    heading: 'What Are Lab-Grown Diamonds?',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds are diamonds made in a laboratory using advanced technology. Instead of being mined from deep within the earth, they are grown in a controlled environment that recreates the conditions needed for diamond formation.',
      },
      {
        type: 'paragraph',
        text: 'You may also see them called lab-created diamonds, laboratory-grown diamonds, cultivated diamonds or man-made diamonds. These names can sound different, but they usually point to the same idea: a diamond that has been created above ground rather than mined.',
      },
      {
        type: 'paragraph',
        text: 'The most important thing to understand is that a lab-grown diamond is not a fake diamond. It is not cubic zirconia, glass, crystal or a simple diamond-look stone. A proper lab-grown diamond is still a diamond. It has the beauty, sparkle and durability that people expect from diamond jewellery.',
      },
      {
        type: 'paragraph',
        text: 'This is why lab-grown diamonds are such a good match for modern demi-fine jewellery. They let you enjoy diamond pieces more often, instead of saving them only for rare formal occasions. A small pair of diamond stud earrings can brighten a simple work outfit. Diamond drop earrings can make a wedding guest dress feel more finished. A delicate huggie can add just enough shine to an everyday ear stack.',
      },
      {
        type: 'see-also',
        text: 'Are lab-grown diamonds real?',
        href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds#are-lab-grown-diamonds-real',
      },
    ],
  },
  // ── Section 2 ──────────────────────────────────────────────────────────────
  {
    heading: 'Lab-Grown Diamonds vs Natural Diamonds',
    content: [
      {
        type: 'section-lead',
        text: 'The easiest way to understand lab-grown diamonds is to compare them with natural diamonds.',
      },
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamonds', 'Natural Diamonds'],
        rows: [
          ['Origin', 'Created in a controlled laboratory', 'Formed naturally underground'],
          ['Look', 'Can look identical to natural diamonds', 'Traditional mined diamond appearance'],
          ['Sparkle', 'Depends on cut quality', 'Depends on cut quality'],
          ['Durability', 'Very durable', 'Very durable'],
          ['Price', 'Usually more accessible', 'Usually more expensive'],
          ['Jewellery use', 'Excellent for everyday and occasion jewellery', 'Excellent for traditional fine jewellery'],
          ['Best for', 'Buyers who want real diamond beauty in a more modern, accessible way', 'Buyers who specifically want mined origin or traditional rarity'],
        ],
      },
      {
        type: 'see-also',
        text: 'Lab-grown vs natural diamonds — full comparison',
        href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds',
      },
      {
        type: 'paragraph',
        text: "The beauty of a diamond is not only about where it comes from. A diamond's final look depends on its cut, clarity, colour, setting and design. A well-designed lab-grown diamond earring can look far more elegant than a poorly cut diamond that only has a higher price tag.",
      },
      {
        type: 'paragraph',
        text: 'This matters especially with earrings. Earrings are not viewed under a microscope in real life. They are seen as part of your face, outfit and overall style. The way they catch the light, sit on the ear and match your wardrobe often matters more than tiny technical details.',
      },
      {
        type: 'divider',
      },
      {
        type: 'subheading',
        text: 'Are Lab-Grown Diamonds Real Diamonds?',
      },
      {
        type: 'paragraph',
        text: 'Yes, lab-grown diamonds are real diamonds.',
      },
      {
        type: 'paragraph',
        text: 'This is one of the most common questions people ask before buying. The confusion usually comes from the word "lab." Some shoppers hear it and think the diamond must be artificial, fake or lower quality. That is not correct.',
      },
      {
        type: 'paragraph',
        text: 'A better way to think about it is this: lab-grown diamonds are not fake diamonds. They are diamonds with a laboratory origin instead of a mined origin.',
      },
      {
        type: 'paragraph',
        text: 'Many cheaper jewellery pieces use stones that only look like diamonds. Cubic zirconia, glass and crystals can look shiny at first, but they are not diamonds. A lab-grown diamond gives you a more genuine diamond jewellery experience while often being more accessible than a mined diamond.',
      },
      {
        type: 'paragraph',
        text: 'So, if your goal is to wear real diamond jewellery rather than only a diamond-look piece, lab-grown diamonds are a strong choice.',
      },
      {
        type: 'see-also',
        text: 'Lab-grown diamonds vs cubic zirconia',
        href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds',
      },
    ],
  },
  // ── Section 3 ──────────────────────────────────────────────────────────────
  {
    heading: 'How Are Lab-Grown Diamonds Made?',
    content: [
      {
        type: 'section-lead',
        text: 'Lab-grown diamonds are usually made using one of two methods: HPHT or CVD.',
      },
      {
        type: 'table',
        headers: ['Method', 'Full Name', 'Simple Explanation'],
        rows: [
          ['HPHT', 'High Pressure High Temperature', 'Recreates the intense pressure and heat involved in natural diamond formation'],
          ['CVD', 'Chemical Vapour Deposition', 'Uses carbon-rich gas to grow diamond crystal layer by layer'],
        ],
      },
      {
        type: 'paragraph',
        text: 'You do not need to become a diamond expert before buying jewellery. For most shoppers, the method is less important than how the final piece looks and feels when worn.',
      },
      {
        type: 'paragraph',
        text: 'When choosing lab-grown diamond jewellery, pay attention to the full piece, not only the stone. Ask yourself whether the jewellery feels comfortable, whether the design suits your lifestyle, whether the metal colour works with your wardrobe, and whether you will actually wear it more than once.',
      },
      {
        type: 'see-also',
        text: 'How lab-grown diamonds are made — HPHT vs CVD explained',
        href: '/resources/lab-grown-diamond-guides/what-are-lab-grown-diamonds',
      },
    ],
  },
  // ── Section 4 ──────────────────────────────────────────────────────────────
  {
    heading: 'Are Lab-Grown Diamonds Good Quality?',
    content: [
      {
        type: 'grid-layout',
        image: '/blog-images/blog-image-6.jpg',
        imagePosition: 'left',
        content: [
          {
            type: 'paragraph',
            text: 'Lab-grown diamonds can be excellent quality, but not every lab-grown diamond is automatically beautiful. Just like natural diamonds, the final appearance depends on quality factors.',
          },
          {
            type: 'paragraph',
            text: 'The main quality factors are often called the 4Cs: cut, colour, clarity and carat. For everyday jewellery, you do not always need to chase the highest possible grade in every category. What matters most is whether the diamond looks bright, clean and beautiful in the actual jewellery design.',
          },
          {
            type: 'paragraph',
            text: 'For earrings, cut and overall sparkle are especially important. Earrings are seen from a natural distance, so the way they reflect light often matters more than tiny internal details that only appear under magnification.',
          },
          {
            type: 'paragraph',
            text: 'That is one of the reasons lab-grown diamonds work so well in demi-fine jewellery. They can bring real diamond beauty into pieces that feel wearable, stylish and easy to enjoy regularly.',
          },
          {
            type: 'see-also',
            text: 'Lab-grown diamond earrings buying guide',
            href: '/products?category=Earring',
          },
        ],
      },
    ],
  },
  // ── Section 5 ──────────────────────────────────────────────────────────────
  {
    heading: 'Why Are Lab-Grown Diamonds So Popular?',
    content: [
      {
        type: 'grid-layout',
        image: '/blog-images/blog-image-8.jpg',
        imagePosition: 'right',
        content: [
          {
            type: 'paragraph',
            text: 'Lab-grown diamonds are popular because they match how many people want to buy jewellery today. A lot of shoppers want something that feels special, but not intimidating. They want sparkle, but not a piece that feels too formal for everyday life.',
          },
          {
            type: 'paragraph',
            text: 'They are especially useful for:',
          },
          {
            type: 'bullet-list',
            items: [
              'Everyday earrings that add polish without looking overdone',
              'Wedding guest jewellery that feels elegant but not bridal',
              'Bridesmaid jewellery that looks beautiful in photos',
              'Birthday gifts that feel personal and thoughtful',
              'Anniversary gifts that feel romantic but modern',
              'Party jewellery that adds shine without feeling too heavy',
              'Ear stacks where small studs and huggies create a layered look',
            ],
          },
          {
            type: 'paragraph',
            text: 'At IWantJewels, lab-grown diamond jewellery is designed to feel like something you can actually wear. The idea is not only to own diamond jewellery, but to enjoy it in real outfits and real moments.',
          },
        ],
      },
    ],
  },
  // ── Section 6 ──────────────────────────────────────────────────────────────
  {
    heading: 'Lab-Grown Diamonds in Demi-Fine Jewellery',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds work especially well in demi-fine jewellery. Demi-fine jewellery sits between cheap fashion jewellery and traditional fine jewellery. It usually uses better materials than costume jewellery, while staying more accessible than solid gold or platinum fine jewellery.',
      },
      {
        type: 'paragraph',
        text: 'At IWantJewels, the jewellery direction is built around lab-grown diamonds, 925 sterling silver and 14kt gold plating. This gives the jewellery a premium look while keeping the pieces suitable for everyday styling, occasions and gifting.',
      },
      {
        type: 'table',
        headers: ['IWJ Jewellery Element', 'Why It Matters'],
        rows: [
          ['Lab-grown diamonds', 'Adds real diamond beauty to wearable jewellery'],
          ['925 sterling silver', 'A quality base metal for demi-fine pieces'],
          ['14kt gold plating', 'Gives the jewellery a warm, premium gold finish'],
          ['Tarnish-proof and sweat-proof with care', 'Supports everyday wear when the jewellery is cared for properly'],
          ['Controlled production environment', 'Helps maintain consistency and quality'],
        ],
      },
      {
        type: 'paragraph',
        text: 'This combination makes the jewellery feel practical without losing its special feeling. You can choose simple studs for daily wear, a huggie for an ear stack, or drop earrings for a wedding guest outfit without feeling like the jewellery has to stay hidden away.',
      },
      {
        type: 'see-also',
        text: 'What is demi-fine jewellery?',
        href: '/resources/demi-fine-jewellery-guides',
      },
    ],
  },
  // ── Section 7 ──────────────────────────────────────────────────────────────
  {
    heading: 'Lab-Grown Diamonds vs Cubic Zirconia',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds and cubic zirconia are not the same thing. Cubic zirconia is a diamond simulant. It is made to look like a diamond, but it is not a diamond. A lab-grown diamond is an actual diamond created in a laboratory environment.',
      },
      {
        type: 'table',
        headers: ['Feature', 'Lab-Grown Diamond', 'Cubic Zirconia'],
        rows: [
          ['Is it a real diamond?', 'Yes', 'No'],
          ['Sparkle', 'Classic diamond sparkle', 'Can look glassier or more artificial'],
          ['Durability', 'Very durable', 'Less durable than diamond'],
          ['Long-term look', 'Better for long-term jewellery', 'Can dull or scratch more easily'],
          ['Best for', 'Real diamond jewellery', 'Budget fashion jewellery'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Cubic zirconia can work if someone wants a low-cost fashion piece for short-term wear. But if the goal is real diamond jewellery with a more premium feel, lab-grown diamonds are the better choice.',
      },
      {
        type: 'paragraph',
        text: 'This is one reason IWantJewels focuses on lab-grown diamond jewellery rather than simple diamond-look pieces. The jewellery is still accessible, but the stone choice gives it more substance.',
      },
    ],
  },
  // ── Section 8 ──────────────────────────────────────────────────────────────
  {
    heading: 'Lab-Grown Diamonds vs Moissanite',
    content: [
      {
        type: 'paragraph',
        text: 'Moissanite is another popular diamond alternative. It is beautiful, durable and very sparkly, but it is not a diamond. Lab-grown diamonds are diamonds.',
      },
      {
        type: 'paragraph',
        text: 'Moissanite often has a stronger rainbow-like sparkle, which some people love. Lab-grown diamonds have the classic brilliance people usually expect from diamond jewellery. Neither option is automatically wrong, but they suit different buyers.',
      },
      {
        type: 'paragraph',
        text: 'Choose lab-grown diamonds if you specifically want diamond jewellery. Choose moissanite if you like the look of a diamond alternative and enjoy a more colourful sparkle in direct light.',
      },
    ],
  },
  // ── Section 9 ──────────────────────────────────────────────────────────────
  {
    heading: 'Are Lab-Grown Diamonds Good for Earrings?',
    content: [
      {
        type: 'paragraph',
        text: 'Yes, lab-grown diamonds are excellent for earrings. Earrings are one of the best jewellery types for lab-grown diamonds because they bring sparkle close to the face. A small diamond stud can make a simple outfit look more polished. A huggie can add detail to an ear stack. A drop earring can make a dress feel more elegant without needing much else.',
      },
      {
        type: 'table',
        headers: ['Earring Style', 'Best For', 'Recommended IWJ Direction'],
        rows: [
          ['Stud earrings', 'Everyday wear, office looks, simple styling', 'Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings'],
          ['Huggie earrings', 'Ear stacks, casual luxury, second piercings', 'Amadea Huggie earrings'],
          ['Drop earrings', 'Weddings, dinners, parties, evening looks', 'Orsola drop earrings'],
          ['Butterfly earrings', 'Meaningful gifts, feminine styling, symbolic jewellery', 'Farfalla butterfly earrings, Alidi Farfalla butterfly earrings'],
          ['Minimalist earrings', 'Simple outfits and daily sparkle', 'Laluce minimalist diamond earrings'],
          ['Bold statement jewellery', 'Evening looks and party styling', 'Lusso bold statement earrings'],
        ],
      },
      {
        type: 'paragraph',
        text: 'The best style depends on how the person will wear it. Studs are the safest choice for everyday use. Huggies feel modern and easy to layer. Drops are better when you want movement, elegance and a more dressed-up finish.',
      },
      {
        type: 'see-also',
        text: 'Explore lab-grown diamond earrings',
        href: '/products?category=Earring',
      },
    ],
  },
  // ── Section 10 ─────────────────────────────────────────────────────────────
  {
    heading: 'Best IWantJewels Lab-Grown Diamond Pieces to Start With',
    content: [
      {
        type: 'paragraph',
        text: 'If you are buying lab-grown diamond jewellery for the first time, earrings are usually the safest starting point. They are easy to wear, easy to gift and easy to style across many outfits.',
      },
      {
        type: 'table',
        headers: ['If You Want', 'Recommended Product', 'Why It Works'],
        rows: [
          ['Simple everyday sparkle', 'Cadenza S lab-grown diamond studs', 'Small, clean and easy to wear daily'],
          ['A stronger stud look', 'Cadenza M diamond stud earrings', 'More visible sparkle while staying classic'],
          ['A modern ear stack', 'Amadea Huggie earrings', 'Great for layering with studs'],
          ['Minimal everyday jewellery', 'Laluce minimalist diamond earrings', 'Clean and easy to pair with most outfits'],
          ['A symbolic gift', 'Farfalla butterfly earrings', 'Butterfly design adds meaning and personality'],
          ['Wedding guest styling', 'Orsola drop earrings', 'Elegant movement for occasion outfits'],
          ['Party sparkle', 'Lusso bold statement earrings', 'Stronger sparkle for evening looks'],
        ],
      },
      {
        type: 'paragraph',
        text: 'These recommendations should feel like a guide, not a rule. Someone who dresses minimally may love Cadenza S or Laluce. Someone who enjoys occasion outfits may prefer Orsola. Someone buying a gift may find Farfalla more personal because the butterfly design carries meaning.',
      },
      {
        type: 'see-also',
        text: 'Shop all lab-grown diamond earrings',
        href: '/products?category=Earring',
      },
    ],
  },
  // ── Section 11 ─────────────────────────────────────────────────────────────
  {
    heading: 'Are Lab-Grown Diamonds Good for Everyday Wear?',
    content: [
      {
        type: 'paragraph',
        text: 'Yes, lab-grown diamonds are suitable for everyday wear. They are durable, beautiful and versatile.',
      },
      {
        type: 'paragraph',
        text: 'The bigger question is not whether the diamond can handle everyday wear. The bigger question is whether the full jewellery piece is made for your lifestyle. The setting, closure, metal, plating and care routine all matter.',
      },
      {
        type: 'paragraph',
        text: 'For daily earrings, look for pieces that feel comfortable and secure. They should not be too heavy, too sharp, or too difficult to style. The best everyday jewellery is the kind you reach for without thinking too much.',
      },
      {
        type: 'paragraph',
        text: 'Stud earrings and huggies are usually the easiest everyday choices. Drop earrings and bolder pieces are better for occasions, dinners, parties and outfits where you want the jewellery to be noticed.',
      },
      {
        type: 'paragraph',
        text: 'For daily wear, Cadenza S lab-grown diamond studs, Cadenza M diamond stud earrings, Amadea Huggie earrings and Laluce minimalist diamond earrings are the strongest product recommendations.',
      },
    ],
  },
  // ── Section 12 ─────────────────────────────────────────────────────────────
  {
    heading: 'Do Lab-Grown Diamonds Last?',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds are very durable and can last for a very long time when properly cared for. The diamond itself is not usually the weak part of the jewellery. The setting, plating, metal finish and how the piece is worn all matter.',
      },
      {
        type: 'paragraph',
        text: 'This is especially important with demi-fine jewellery. If your lab-grown diamond earrings are made with 925 sterling silver and 14kt gold plating, the diamonds can remain beautiful, but the metal finish still deserves care.',
      },
      {
        type: 'paragraph',
        text: 'To keep jewellery looking better for longer, store pieces separately, avoid harsh chemicals, clean gently with a soft cloth and do not throw earrings loose into handbags or travel cases. Perfume, lotions and strong cleaning products should also be kept away from the jewellery when possible.',
      },
      {
        type: 'see-also',
        text: 'How to clean lab-grown diamond earrings',
        href: '/resources/jewellery-care-guides',
      },
    ],
  },
  // ── Section 13 ─────────────────────────────────────────────────────────────
  {
    heading: 'Do Lab-Grown Diamonds Lose Their Sparkle?',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds do not lose their diamond nature, but any jewellery can look dull when it collects oil, dust, lotion, perfume or makeup.',
      },
      {
        type: 'paragraph',
        text: 'Earrings are especially likely to collect buildup because they sit close to the hair, skin and face. This does not mean the diamond has lost quality. It usually means the jewellery needs gentle cleaning.',
      },
      {
        type: 'paragraph',
        text: 'A soft jewellery cloth and careful storage can help maintain sparkle. If your earrings are gold-plated, be gentle and avoid harsh scrubbing. The goal is to clean the jewellery without damaging the finish.',
      },
    ],
  },
  // ── Section 14 ─────────────────────────────────────────────────────────────
  {
    heading: 'How Much Do Lab-Grown Diamonds Cost?',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds are usually more accessible in price than comparable natural diamonds. The exact price depends on diamond size, cut, clarity, colour, metal, setting and design.',
      },
      {
        type: 'table',
        headers: ['Price Factor', 'Why It Changes the Price'],
        rows: [
          ['Diamond size', 'Larger diamonds usually cost more'],
          ['Number of stones', 'More stones add more sparkle and cost'],
          ['Metal type', 'Solid gold costs more than plated sterling silver'],
          ['Design complexity', 'More detailed designs take more work'],
          ['Finish colour', 'Yellow, white and rose finishes can vary'],
          ['Brand positioning', 'Design, packaging and quality control affect price'],
        ],
      },
      {
        type: 'paragraph',
        text: 'For IWantJewels, the advantage is that shoppers can enjoy lab-grown diamond beauty in a demi-fine format. This makes diamond jewellery feel more accessible than traditional fine diamond jewellery while still feeling special enough to gift or wear for important moments.',
      },
    ],
  },
  // ── Section 15 ─────────────────────────────────────────────────────────────
  {
    heading: 'Who Should Buy Lab-Grown Diamond Jewellery?',
    content: [
      {
        type: 'grid-layout',
        image: '/blog-images/blog-image-10.jpg',
        imagePosition: 'right',
        content: [
          {
            type: 'paragraph',
            text: 'Lab-grown diamond jewellery is ideal for someone who wants real diamond sparkle in a modern, wearable and more accessible way.',
          },
          {
            type: 'paragraph',
            text: 'It is especially good for someone buying their first diamond earrings, building a small jewellery collection, choosing a birthday or anniversary gift, or looking for occasion jewellery that does not feel too traditional.',
          },
          {
            type: 'paragraph',
            text: 'If the person loves simple outfits, a small stud or minimalist earring usually works best. If they like styling outfits for dinners, weddings or parties, a drop earring or bolder design may feel more exciting. If the gift needs to feel more personal, butterfly earrings can add a softer, more symbolic touch.',
          },
        ],
      },
    ],
  },
  // ── Section 16 ─────────────────────────────────────────────────────────────
  {
    heading: 'Lab-Grown Diamond Jewellery for Different Occasions',
    content: [
      {
        type: 'table',
        headers: ['Occasion', 'Best Jewellery Style', 'Why It Works'],
        rows: [
          ['Everyday wear', 'Studs, huggies, minimalist earrings', 'Easy to wear repeatedly'],
          ['Office looks', 'Small studs or clean huggies', 'Polished but not distracting'],
          ['Wedding guest outfits', 'Drops, butterflies, elegant studs', 'Adds occasion sparkle'],
          ['Bridesmaid styling', 'Matching studs or delicate drops', 'Looks elegant in photos'],
          ['Birthday gifts', 'Butterfly earrings, rose gold earrings, studs', 'Feels personal and special'],
          ['Anniversary gifts', 'Diamond studs, drops, romantic designs', 'Classic but modern'],
          ['Party outfits', 'Drop earrings, bold statement jewellery', 'Adds visible sparkle'],
          ['Date night', 'Rose gold, huggies or drops', 'Soft, romantic styling'],
        ],
      },
      {
        type: 'see-also',
        text: 'Find jewellery for your occasion',
        href: '/products',
      },
    ],
  },
  // ── Section 17 ─────────────────────────────────────────────────────────────
  {
    heading: 'Are Lab-Grown Diamonds Ethical?',
    content: [
      {
        type: 'paragraph',
        text: 'Many people choose lab-grown diamonds because they want a modern alternative to mined diamonds. Since lab-grown diamonds are created above ground, they avoid some of the mining-related concerns that shoppers may have with natural diamonds.',
      },
      {
        type: 'paragraph',
        text: 'However, the word "ethical" should be used carefully. A responsible jewellery buyer should still look at the full brand, production standards, materials, transparency and quality control.',
      },
      {
        type: 'paragraph',
        text: 'For IWantJewels, the strongest message is simple: lab-grown diamonds allow customers to enjoy real diamond jewellery in a more modern, accessible and conscious way. That makes them especially suitable for everyday jewellery, gift jewellery and demi-fine pieces that are meant to be worn often.',
      },
    ],
  },
  // ── Section 18 ─────────────────────────────────────────────────────────────
  {
    heading: 'Are Lab-Grown Diamonds Sustainable?',
    content: [
      {
        type: 'paragraph',
        text: 'Lab-grown diamonds are often promoted as a more sustainable alternative to mined diamonds, but sustainability depends on how they are produced, what energy is used and how the full jewellery supply chain is managed.',
      },
      {
        type: 'paragraph',
        text: 'A balanced way to understand it is this: lab-grown diamonds reduce the need for diamond mining, but they still require technology, energy and production resources.',
      },
      {
        type: 'paragraph',
        text: 'For jewellery buyers, the practical benefit is that lab-grown diamonds offer a modern route to diamond jewellery. They give real diamond beauty in a format that can feel more accessible, wearable and suitable for everyday styling. If you are choosing jewellery for daily wear rather than traditional investment, lab-grown diamond earrings are one of the strongest places to start.',
      },
    ],
  },
  // ── Section 19 ─────────────────────────────────────────────────────────────
  {
    heading: 'What Should You Look for When Buying Lab-Grown Diamond Jewellery?',
    content: [
      {
        type: 'paragraph',
        text: 'When buying lab-grown diamond jewellery, look at the full piece, not only the stone. A beautiful earring needs the right diamond, metal, design, comfort and finish. The jewellery should suit your lifestyle and your outfit needs.',
      },
      {
        type: 'paragraph',
        text: 'Check whether the jewellery uses real lab-grown diamonds, not only diamond-look stones. Look at the metal, the closure, the comfort, the finish colour and the care instructions.',
      },
      {
        type: 'bullet-list',
        items: [
          'Yellow gold feels warm and classic',
          'White or silver tones feel clean and modern',
          'Rose gold feels soft and romantic',
        ],
      },
      {
        type: 'paragraph',
        text: 'For first-time buyers, diamond stud earrings are usually the safest choice. They are timeless, simple and easy to wear with almost anything.',
      },
      {
        type: 'see-also',
        text: 'Shop diamond stud earrings',
        href: '/products?category=Earring',
      },
    ],
  },
  // ── Section 20 ─────────────────────────────────────────────────────────────
  {
    heading: 'Common Mistakes to Avoid',
    content: [
      {
        type: 'bullet-list',
        items: [
          'Thinking every sparkly stone is a diamond — always check whether the jewellery uses lab-grown diamonds or only diamond-look stones.',
          'Choosing only by carat size — a bigger stone is not always better. A smaller diamond in a better design can look more elegant and wearable.',
          'Forgetting to think about metal colour — yellow gold feels warm, white or silver tones feel clean, rose gold feels soft. The best choice depends on the wearer\'s style.',
          'Buying only for one outfit — the best lab-grown diamond jewellery should work across many looks, especially if it is a gift.',
        ],
      },
    ],
  },
  // ── Section 21 ─────────────────────────────────────────────────────────────
  {
    heading: 'Final Checklist Before Buying Lab-Grown Diamond Jewellery',
    content: [
      {
        type: 'paragraph',
        text: 'Before buying, ask yourself:',
      },
      {
        type: 'bullet-list',
        items: [
          'Do I want everyday jewellery or occasion jewellery?',
          'Do I prefer studs, huggies, drops or hoops?',
          'Do I want yellow gold, white/silver or rose gold?',
          'Is the piece easy to style with my wardrobe?',
          'Is it made with real lab-grown diamonds?',
          'Is the metal suitable for regular wear?',
          'Will it work as a gift?',
          'Does the design feel timeless enough to wear again?',
        ],
      },
      {
        type: 'paragraph',
        text: 'If the answer is yes, lab-grown diamond jewellery is a strong choice.',
      },
    ],
  },
  // ── Section 22 ─────────────────────────────────────────────────────────────
  {
    heading: 'Best Starting Point: Lab-Grown Diamond Earrings',
    content: [
      {
        type: 'paragraph',
        text: 'If you are new to lab-grown diamond jewellery, earrings are the best place to start. They are easy to style, easy to gift and suitable for many ages and occasions. They also let the sparkle sit close to the face, which makes even a small diamond feel noticeable.',
      },
      {
        type: 'paragraph',
        text: 'If you want a simple everyday pair, choose Cadenza S lab-grown diamond studs. If you want a slightly stronger stud look, choose Cadenza M diamond stud earrings. If you are building an ear stack, Amadea Huggie earrings are a practical choice. For a feminine gift, Farfalla butterfly earrings add more meaning. For a wedding guest outfit, Orsola drop earrings bring movement and elegance. For a clean minimalist look, Laluce minimalist diamond earrings are easy to style.',
      },
      {
        type: 'see-also',
        text: 'Shop Lab-Grown Diamond Earrings',
        href: '/products?category=Earring',
      },
    ],
  },
]

// ─── CTA ──────────────────────────────────────────────────────────────────────

const cta: V2CTABlock = {
  heading: 'Ready to Start with Lab-Grown Diamond Jewellery?',
  body: 'Discover IWantJewels lab-grown diamond earrings made for everyday sparkle, occasion styling and meaningful gifting. Choose from timeless studs, modern huggies, elegant drops, butterfly designs and bold statement pieces in wearable demi-fine finishes.',
  primaryLabel: 'Shop Lab-Grown Diamond Earrings',
  primaryHref: '/products?category=Earring',
  secondaryLabel: 'Explore Jewellery Gifts',
  secondaryHref: '/products?category=Gift',
  tertiaryLabel: 'Read the Lab-Grown Diamond Earrings Buying Guide',
  tertiaryHref: '/resources/lab-grown-diamond-guides',
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq: V2FAQItem[] = [
  {
    question: 'What are lab-grown diamonds?',
    answer:
      'Lab-grown diamonds are real diamonds created in a controlled laboratory environment instead of being mined from the earth. They can offer the same sparkle, beauty and durability people expect from diamond jewellery.',
  },
  {
    question: 'Are lab-grown diamonds fake?',
    answer:
      'No, lab-grown diamonds are not fake diamonds. They are different from cubic zirconia, glass or crystal. A lab-grown diamond is a real diamond with a laboratory origin.',
  },
  {
    question: 'Are lab-grown diamonds good for earrings?',
    answer:
      'Yes, lab-grown diamonds are excellent for earrings. They work well in studs, huggies, hoops, drops and symbolic designs like butterfly earrings.',
  },
  {
    question: 'Do lab-grown diamonds sparkle?',
    answer:
      'Yes, lab-grown diamonds can sparkle beautifully. Their sparkle depends mainly on cut quality and jewellery design.',
  },
  {
    question: 'Are lab-grown diamonds cheaper than natural diamonds?',
    answer:
      'Lab-grown diamonds are usually more accessible in price than comparable natural diamonds. This makes them popular for everyday diamond jewellery and gift pieces.',
  },
  {
    question: 'Can I wear lab-grown diamond earrings every day?',
    answer:
      'Yes, lab-grown diamond earrings can be worn every day, especially when the design is comfortable and the jewellery is cared for properly. Start with simple studs or huggies if you want daily wear.',
  },
  {
    question: 'Do lab-grown diamonds last?',
    answer:
      'Yes, lab-grown diamonds are durable and can last for a very long time. The full jewellery piece should still be cared for properly, especially if it has gold plating or a delicate finish.',
  },
  {
    question: 'Are lab-grown diamonds better than cubic zirconia?',
    answer:
      'If you want real diamond jewellery, lab-grown diamonds are better than cubic zirconia. Cubic zirconia is a diamond simulant, while lab-grown diamonds are actual diamonds.',
  },
  {
    question: 'Are lab-grown diamonds good gifts?',
    answer:
      'Yes, lab-grown diamond jewellery makes a strong gift because it feels special, sparkly and modern. Earrings are especially easy to gift for birthdays, anniversaries, bridesmaids, wedding guests and everyday wear.',
  },
  {
    question: 'What is the best lab-grown diamond jewellery to buy first?',
    answer:
      'Lab-grown diamond stud earrings are usually the best first piece. They are simple, timeless, easy to wear and easy to style with other jewellery.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const category = getCategoryBySlug('lab-grown-diamond-guides')
  const article = getArticleBySlug('lab-grown-diamond-guides', 'what-are-lab-grown-diamonds')
  if (!category || !article) notFound()
  const relatedArticles = getRelatedArticles('lab-grown-diamond-guides', 'what-are-lab-grown-diamonds', 3)
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
