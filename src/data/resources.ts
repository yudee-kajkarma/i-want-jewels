// ─── Resource Category & Article Data ────────────────────────────────────────

export type ResourceCategory = {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  href: string;
};

export type ResourceArticle = {
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
};

// ─── Category Definitions ─────────────────────────────────────────────────────

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Guides",
    description:
      "Everything you need to know about lab-grown diamonds — how they are made, how they compare to mined diamonds, and why they are the smart, ethical choice.",
    coverImage: "/blog-images/blog-image-1.jpg",
    href: "/resources/lab-grown-diamond-guides",
  },
  {
    slug: "demi-fine-jewellery-guides",
    title: "Demi-Fine Jewellery Guides",
    description:
      "Explore the world of demi-fine jewellery — sterling silver, gold vermeil, and lab-grown stones that sit beautifully between costume and fine jewellery.",
    coverImage: "/blog-images/blog-image-10.jpg",
    href: "/resources/demi-fine-jewellery-guides",
  },
  {
    slug: "earring-style-guides",
    title: "Earring Styling Guides",
    description:
      "From ear stacking to choosing the right earring for your face shape, our earring guides help you wear your jewellery with confidence.",
    coverImage: "/blog-images/blog-image-20.jpg",
    href: "/resources/earring-style-guides",
  },
  {
    slug: "occasion-jewellery-guides",
    title: "Wedding & Occasion Jewellery",
    description:
      "Bridal jewellery advice, anniversary gift ideas, and how to choose the perfect piece for every milestone moment in life.",
    coverImage: "/blog-images/blog-image-30.jpg",
    href: "/resources/occasion-jewellery-guides",
  },
  {
    slug: "jewellery-care-guides",
    title: "Jewellery Care",
    description:
      "Keep your jewellery looking its best with our expert care guides covering cleaning, storage, and everyday wear tips for every metal and stone type.",
    coverImage: "/blog-images/blog-image-40.jpg",
    href: "/resources/jewellery-care-guides",
  },
  {
    slug: "jewellery-gift-guides",
    title: "Gift Guides",
    description:
      "Find the perfect jewellery gift for any occasion, budget, or personality — from first-time buyers to seasoned jewellery lovers.",
    coverImage: "/blog-images/blog-image-50.jpg",
    href: "/resources/jewellery-gift-guides",
  },
  // ─── Added 2026-10-09 with the new guides ───
  {
    slug: "necklace-guides",
    title: "Necklace Guides",
    description:
      "Necklace lengths, chains, clasps and pendants explained, so you can choose a necklace that fits, sits and suits you.",
    coverImage: "/blog-images/resource-guides/necklace-clasp-types.jpg",
    href: "/resources/necklace-guides",
  },
  {
    slug: "ring-guides",
    title: "Ring Guides",
    description:
      "Fashion ring styles, band widths and how to wear them: practical advice for choosing a ring you will love wearing.",
    coverImage: "/blog-images/resource-guides/types-of-fashion-rings.jpg",
    href: "/resources/ring-guides",
  },
  {
    slug: "bridal-jewellery-guides",
    title: "Bridal Jewellery Guides",
    description:
      "Choose wedding-day jewellery that suits your dress, neckline and personal style.",
    coverImage: "/blog-images/resource-guides/bridal-necklace-for-wedding-dress.jpg",
    href: "/resources/bridal-jewellery-guides",
  },
  {
    slug: "dress-colour-guides",
    title: "Dress Colour Guides",
    description:
      "Which jewellery finishes and pieces work best with each dress colour.",
    coverImage: "/blog-images/resource-guides/jewellery-for-champagne-and-beige-dresses.jpg",
    href: "/resources/dress-colour-guides",
  },
  {
    slug: "necklace-style-guides",
    title: "Necklace Styling Guides",
    description:
      "How to wear a necklace with different necklines and outfits.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-square-neck-dress.jpg",
    href: "/resources/necklace-style-guides",
  },
  {
    slug: "jewellery-care",
    title: "Jewellery Fixes",
    description:
      "Simple fixes for everyday jewellery problems: tangled chains, flipping pendants, sliding clasps and spinning rings.",
    coverImage: "/blog-images/resource-guides/how-to-untangle-a-fine-necklace.jpg",
    href: "/resources/jewellery-care",
  },
];

// ─── Articles per Category ────────────────────────────────────────────────────

export const resourceArticles: ResourceArticle[] = [
  // Lab-Grown Diamond Guides
  {
    slug: "are-lab-grown-diamonds-real",
    categorySlug: "lab-grown-diamond-guides",
    title: "Are Lab-Grown Diamonds Real Diamonds?",
    excerpt:
      "Yes, lab-grown diamonds are real diamonds. Learn how they compare to natural diamonds, fake diamonds, cubic zirconia and moissanite before buying.",
    coverImage: "/blog-images/blog-image-4.jpg",
    publishedAt: "2025-03-12",
    readTime: "7 min read",
    tags: ["lab-grown", "real diamonds", "education"],
  },
  {
    slug: "lab-grown-vs-natural-diamonds",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown vs Natural Diamonds: What Is the Difference?",
    excerpt:
      "Compare lab grown and natural diamonds in simple language. Learn the difference in origin, price, sparkle, value and jewellery use before buying.",
    coverImage: "/blog-images/blog-image-5.jpg",
    publishedAt: "2025-03-15",
    readTime: "8 min read",
    tags: ["comparison", "natural diamonds", "lab-grown"],
  },
  {
    slug: "are-lab-grown-diamonds-worth-it",
    categorySlug: "lab-grown-diamond-guides",
    title: "Are Lab-Grown Diamonds Worth It?",
    excerpt:
      "Find out if lab grown diamonds are worth buying, how they compare to natural diamonds, and when lab grown diamond jewellery makes sense.",
    coverImage: "/blog-images/blog-image-7.jpg",
    publishedAt: "2025-03-20",
    readTime: "8 min read",
    tags: ["worth it", "value", "lab-grown"],
  },
  {
    slug: "lab-grown-diamond-earrings-buying-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Earrings Buying Guide",
    excerpt:
      "Learn how to choose lab-grown diamond earrings by style, size, carat weight, metal, setting, closure, comfort and price.",
    coverImage: "/blog-images/blog-image-83.jpg",
    publishedAt: "2025-03-25",
    readTime: "12 min read",
    tags: ["buying guide", "earrings", "lab-grown", "settings", "closures"],
  },
  {
    slug: "lab-grown-diamond-earrings-price-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Earrings Price Guide",
    excerpt:
      "Learn how much lab grown diamond earrings cost, what affects the price, and how to choose studs, huggies, drops and gift earrings.",
    coverImage: "/blog-images/blog-image-59.jpg",
    publishedAt: "2025-04-01",
    readTime: "9 min read",
    tags: ["price guide", "earrings", "lab-grown"],
  },
  {
    slug: "lab-grown-diamond-stud-earrings-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Stud Earrings Guide",
    excerpt:
      "Learn how to choose lab grown diamond stud earrings for everyday wear, gifts, ear stacks, metal colour, size and styling.",
    coverImage: "/blog-images/blog-image-13.jpg",
    publishedAt: "2025-04-05",
    readTime: "9 min read",
    tags: ["stud earrings", "everyday wear", "lab-grown"],
  },
  {
    slug: "lab-grown-diamond-drop-earrings-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Drop Earrings Guide",
    excerpt:
      "Learn how to choose lab grown diamond drop earrings for weddings, parties, gifts, evening outfits and everyday occasion styling.",
    coverImage: "/blog-images/blog-image-98.jpg",
    publishedAt: "2025-04-08",
    readTime: "9 min read",
    tags: ["drop earrings", "occasion", "lab-grown"],
  },
  {
    slug: "lab-grown-diamond-hoop-earrings-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Hoop Earrings Guide",
    excerpt:
      "Learn how to choose lab grown diamond hoop earrings for everyday wear, ear stacks, gifts, parties and modern jewellery styling.",
    coverImage: "/blog-images/blog-image-17.jpg",
    publishedAt: "2025-04-10",
    readTime: "9 min read",
    tags: ["hoop earrings", "ear stacks", "lab-grown"],
  },
  {
    slug: "what-are-lab-grown-diamonds",
    categorySlug: "lab-grown-diamond-guides",
    title: "What Are Lab-Grown Diamonds? A Clear Guide",
    excerpt:
      "Learn what lab-grown diamonds are, how CVD and HPHT diamonds are created, how they compare with mined diamonds and what buyers should check.",
    coverImage: "/blog-images/blog-image-60.jpg",
    publishedAt: "2025-03-10",
    readTime: "13 min read",
    tags: ["lab-grown", "diamonds", "education", "HPHT", "CVD"],
  },
  {
    slug: "lab-grown-diamonds-vs-cubic-zirconia",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamonds vs Cubic Zirconia: What Is the Difference?",
    excerpt:
      "Compare lab-grown diamonds and cubic zirconia by material, sparkle, durability, price and everyday wear to decide which stone suits you.",
    coverImage: "/blog-images/blog-image-61.jpg",
    publishedAt: "2025-04-15",
    readTime: "12 min read",
    tags: ["lab-grown", "cubic zirconia", "comparison", "simulants"],
  },
  {
    slug: "lab-grown-diamonds-vs-moissanite",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamonds vs Moissanite: What Is the Difference?",
    excerpt:
      "Compare lab-grown diamonds and moissanite by material, sparkle, hardness, price and everyday wear to choose the right stone for you.",
    coverImage: "/blog-images/blog-image-81.jpg",
    publishedAt: "2025-04-20",
    readTime: "13 min read",
    tags: ["lab-grown", "moissanite", "comparison", "simulants"],
  },
  {
    slug: "how-to-clean-lab-grown-diamond-earrings",
    categorySlug: "lab-grown-diamond-guides",
    title: "How to Clean Lab-Grown Diamond Earrings",
    excerpt:
      "Learn how to clean lab grown diamond earrings safely, protect gold plating, avoid dullness, and keep your jewellery sparkling for longer.",
    coverImage: "/blog-images/blog-image-96.jpg",
    publishedAt: "2025-04-25",
    readTime: "11 min read",
    tags: ["care", "cleaning", "lab-grown", "earrings"],
  },
  {
    slug: "can-you-wear-lab-grown-diamond-earrings-every-day",
    categorySlug: "lab-grown-diamond-guides",
    title: "Can You Wear Lab-Grown Diamond Earrings Every Day?",
    excerpt:
      "Learn if lab grown diamond earrings are good for everyday wear, how to choose daily earrings, and how to care for studs, huggies and drops.",
    coverImage: "/blog-images/blog-image-103.jpg",
    publishedAt: "2025-04-28",
    readTime: "12 min read",
    tags: ["everyday wear", "earrings", "lab-grown", "care"],
  },
  {
    slug: "lab-grown-diamond-earring-size-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Earring Size Guide: Small, Medium & 1ct Styles",
    excerpt:
      "Compare lab grown diamond earring sizes, from small studs to 1ct styles. Learn what size is best for everyday wear, gifts and occasions.",
    coverImage: "/blog-images/blog-image-8.jpg",
    publishedAt: "2025-05-02",
    readTime: "13 min read",
    tags: ["size guide", "earrings", "lab-grown", "carat weight"],
  },
  {
    slug: "lab-grown-diamond-earrings-for-weddings",
    categorySlug: "lab-grown-diamond-guides",
    title: "Lab-Grown Diamond Earrings for Weddings",
    excerpt:
      "Choose lab-grown diamond wedding earrings for brides, bridesmaids and receptions. Compare studs, drops and hoops by dress, neckline and hairstyle.",
    coverImage: "/blog-images/blog-image-105.jpg",
    publishedAt: "2025-05-06",
    readTime: "14 min read",
    tags: ["weddings", "occasion", "earrings", "lab-grown", "bridesmaid"],
  },
  {
    slug: "are-lab-grown-diamond-earrings-worth-it",
    categorySlug: "lab-grown-diamond-guides",
    title: "Are Lab-Grown Diamond Earrings Worth It?",
    excerpt:
      "Find out if lab grown diamond earrings are worth buying for everyday wear, gifts, weddings, ear stacks and occasion jewellery.",
    coverImage: "/blog-images/blog-image-103.jpg",
    publishedAt: "2025-05-10",
    readTime: "13 min read",
    tags: ["worth it", "value", "earrings", "lab-grown"],
  },
  // ─── SEO-RETIRED R5 · /resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-gifts → /resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts · see src/data/retired-urls.ts ───
  // {
  //   slug: "lab-grown-diamond-earrings-for-gifts",
  //   categorySlug: "lab-grown-diamond-guides",
  //   title:
  //     "Lab-Grown Diamond Earrings for Gifts: Birthday, Anniversary & Bridesmaid Guide",
  //   excerpt:
  //     "Choose lab grown diamond earrings for birthday gifts, anniversary gifts, bridesmaids, romantic gifts and everyday jewellery gifts.",
  //   coverImage: "/blog-images/blog-image-60.jpg",
  //   publishedAt: "2025-05-14",
  //   readTime: "13 min read",
  //   tags: [
  //     "gifts",
  //     "birthday",
  //     "anniversary",
  //     "bridesmaid",
  //     "earrings",
  //     "lab-grown",
  //   ],
  // },
  // ─── SEO-RETIRED R4 · /resources/lab-grown-diamond-guides/lab-grown-diamond-earrings-for-ear-stacks → /resources/earring-style-guides/diamond-ear-stack-ideas · see src/data/retired-urls.ts ───
  // {
  //   slug: "lab-grown-diamond-earrings-for-ear-stacks",
  //   categorySlug: "lab-grown-diamond-guides",
  //   title:
  //     "Lab-Grown Diamond Earrings for Ear Stacks: Studs, Huggies & Styling Guide",
  //   excerpt:
  //     "Build a diamond ear stack with lab grown diamond studs, huggies, hoops and minimalist earrings for everyday styling and occasions.",
  //   coverImage: "/blog-images/blog-image-102.jpg",
  //   publishedAt: "2025-05-18",
  //   readTime: "13 min read",
  //   tags: [
  //     "ear stacks",
  //     "studs",
  //     "huggies",
  //     "earrings",
  //     "lab-grown",
  //     "styling",
  //   ],
  // },
  {
    slug: "gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings",
    categorySlug: "lab-grown-diamond-guides",
    title: "Yellow vs White vs Rose Gold Diamond Earrings",
    excerpt:
      "Compare yellow, white and rose-gold lab-grown diamond earrings. Understand colour, solid versus plated construction, styling and care before choosing.",
    coverImage: "/blog-images/blog-image-41.jpg",
    publishedAt: "2025-05-22",
    readTime: "13 min read",
    tags: [
      "metal colour",
      "gold",
      "rose gold",
      "white gold",
      "earrings",
      "lab-grown",
    ],
  },
  // Demi-Fine Jewellery Guides
  {
    slug: "what-is-demi-fine-jewellery",
    categorySlug: "demi-fine-jewellery-guides",
    title: "What Is Demi-Fine Jewellery? A Practical Jewellery Guide",
    excerpt:
      "Learn what demi fine jewellery means, how it compares to fine and fashion jewellery, and how to choose pieces for everyday wear and gifts.",
    coverImage: "/blog-images/blog-image-37.jpg",
    publishedAt: "2025-05-26",
    readTime: "12 min read",
    tags: ["demi-fine", "jewellery guide", "materials", "education"],
  },
  {
    slug: "demi-fine-vs-fine-jewellery-vs-fashion-jewellery",
    categorySlug: "demi-fine-jewellery-guides",
    title:
      "Demi-Fine vs Fine Jewellery vs Fashion Jewellery: What Is the Difference?",
    excerpt:
      "Compare demi fine, fine and fashion jewellery. Learn the difference in materials, price, quality, wearability and gifting value.",
    coverImage: "/blog-images/blog-image-39.jpg",
    publishedAt: "2025-05-30",
    readTime: "12 min read",
    tags: [
      "demi-fine",
      "fine jewellery",
      "fashion jewellery",
      "comparison",
      "education",
    ],
  },
  {
    slug: "is-demi-fine-jewellery-good-for-everyday-wear",
    categorySlug: "demi-fine-jewellery-guides",
    title: "Is Demi-Fine Jewellery Good for Everyday Wear?",
    excerpt:
      "Learn whether demi fine jewellery is good for everyday wear, how to choose daily pieces, and how to care for gold-plated and sterling silver jewellery.",
    coverImage: "/blog-images/blog-image-41.jpg",
    publishedAt: "2025-06-03",
    readTime: "12 min read",
    tags: [
      "everyday wear",
      "demi-fine",
      "care",
      "gold-plated",
      "sterling silver",
    ],
  },
  {
    slug: "925-sterling-silver-jewellery-guide",
    categorySlug: "demi-fine-jewellery-guides",
    title: "925 Sterling Silver Jewellery Guide: Meaning, Quality & Care",
    excerpt:
      "Learn what 925 sterling silver means, why it is used in demi fine jewellery, and how to care for sterling silver earrings and gold-plated jewellery.",
    coverImage: "/blog-images/blog-image-43.jpg",
    publishedAt: "2025-06-07",
    readTime: "11 min read",
    tags: [
      "925 sterling silver",
      "materials",
      "demi-fine",
      "care",
      "education",
    ],
  },
  {
    slug: "14kt-gold-plated-jewellery-guide",
    categorySlug: "demi-fine-jewellery-guides",
    title: "14kt Gold-Plated Jewellery Guide: Meaning, Quality & Care",
    excerpt:
      "Learn what 14kt gold-plated jewellery means, how it compares to solid gold, how to care for it, and whether it is good for everyday wear.",
    coverImage: "/blog-images/blog-image-45.jpg",
    publishedAt: "2025-06-11",
    readTime: "11 min read",
    tags: [
      "14kt gold plating",
      "gold-plated",
      "materials",
      "demi-fine",
      "care",
    ],
  },
  {
    slug: "gold-plated-vs-solid-gold-jewellery",
    categorySlug: "demi-fine-jewellery-guides",
    title: "Gold-Plated vs Solid Gold Jewellery: What Is the Difference?",
    excerpt:
      "Compare gold-plated and solid gold jewellery. Learn the difference in price, durability, care, everyday wear and gifting value.",
    coverImage: "/blog-images/blog-image-47.jpg",
    publishedAt: "2025-06-15",
    readTime: "12 min read",
    tags: ["gold-plated", "solid gold", "comparison", "demi-fine", "materials"],
  },
  {
    slug: "does-gold-plated-jewellery-tarnish",
    categorySlug: "demi-fine-jewellery-guides",
    title: "Does Gold-Plated Jewellery Tarnish? Care, Wear & Protection Guide",
    excerpt:
      "Learn whether gold-plated jewellery tarnishes, why it changes colour, how to protect it, and how to care for demi-fine gold-plated earrings.",
    coverImage: "/blog-images/blog-image-49.jpg",
    publishedAt: "2025-06-19",
    readTime: "11 min read",
    tags: ["tarnish", "gold-plated", "care", "demi-fine", "everyday wear"],
  },
  {
    slug: "how-to-care-for-gold-plated-jewellery",
    categorySlug: "demi-fine-jewellery-guides",
    title:
      "How to Care for Gold-Plated Jewellery: Cleaning, Storage & Daily Wear Guide",
    excerpt:
      "Learn how to care for gold-plated jewellery, protect 14kt gold plating, avoid tarnish, clean earrings safely and store demi-fine jewellery.",
    coverImage: "/blog-images/blog-image-51.jpg",
    publishedAt: "2025-06-23",
    readTime: "11 min read",
    tags: ["care", "gold-plated", "cleaning", "storage", "demi-fine"],
  },
  {
    slug: "can-you-shower-with-gold-plated-jewellery",
    categorySlug: "demi-fine-jewellery-guides",
    title:
      "Can You Shower with Gold-Plated Jewellery? Water, Care & Daily Wear Guide",
    excerpt:
      "Learn if you can shower with gold-plated jewellery, how water affects 14kt gold plating, and how to protect demi-fine earrings.",
    coverImage: "/blog-images/blog-image-53.jpg",
    publishedAt: "2025-06-27",
    readTime: "10 min read",
    tags: ["shower", "water", "gold-plated", "care", "demi-fine"],
  },
  {
    slug: "is-925-sterling-silver-hypoallergenic",
    categorySlug: "demi-fine-jewellery-guides",
    title:
      "Is 925 Sterling Silver Hypoallergenic? Sensitive Ears & Earrings Guide",
    excerpt:
      "Learn if 925 sterling silver is hypoallergenic, whether it is good for sensitive ears, and how to choose safe demi-fine earrings.",
    coverImage: "/blog-images/blog-image-97.jpg",
    publishedAt: "2025-07-01",
    readTime: "11 min read",
    tags: [
      "hypoallergenic",
      "925 sterling silver",
      "sensitive ears",
      "earrings",
      "demi-fine",
    ],
  },
  // Jewellery Gift Guides
  {
    slug: "lab-grown-diamond-earrings-for-gifts",
    categorySlug: "jewellery-gift-guides",
    title: "Lab-Grown Diamond Earrings for Gifts: How to Choose the Right Pair",
    excerpt:
      "Choose lab grown diamond earrings as gifts for birthdays, anniversaries, bridesmaids, weddings, romantic gifts and everyday jewellery.",
    coverImage: "/blog-images/blog-image-57.jpg",
    publishedAt: "2025-07-05",
    readTime: "15 min read",
    tags: [
      "gifts",
      "birthday",
      "anniversary",
      "bridesmaid",
      "earrings",
      "lab-grown",
    ],
  },
  {
    slug: "birthday-jewellery-gifts-for-her",
    categorySlug: "jewellery-gift-guides",
    title:
      "Birthday Jewellery Gifts for Her: How to Choose Earrings She Will Actually Wear",
    excerpt:
      "Choose birthday jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and meaningful gift ideas.",
    coverImage: "/blog-images/blog-image-59.jpg",
    publishedAt: "2025-07-09",
    readTime: "15 min read",
    tags: [
      "birthday gifts",
      "earrings",
      "lab-grown",
      "gifts",
      "studs",
      "butterfly earrings",
    ],
  },
  {
    slug: "anniversary-jewellery-gifts-for-her",
    categorySlug: "jewellery-gift-guides",
    title:
      "Anniversary Jewellery Gifts for Her: Romantic Earrings She Will Actually Wear",
    excerpt:
      "Choose anniversary jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, hoops and romantic gift ideas for her.",
    coverImage: "/blog-images/blog-image-61.jpg",
    publishedAt: "2025-07-13",
    readTime: "15 min read",
    tags: [
      "anniversary gifts",
      "romantic",
      "butterfly earrings",
      "lab-grown",
      "earrings",
    ],
  },
  {
    slug: "bridesmaid-jewellery-gifts",
    categorySlug: "jewellery-gift-guides",
    title:
      "Bridesmaid Jewellery Gifts: Earrings Your Bridal Party Can Wear on the Wedding Day and After",
    excerpt:
      "Choose bridesmaid jewellery gifts with lab grown diamond earrings, studs, drops, butterfly earrings, huggies and wedding-ready gift ideas.",
    coverImage: "/blog-images/blog-image-63.jpg",
    publishedAt: "2025-07-17",
    readTime: "15 min read",
    tags: [
      "bridesmaid gifts",
      "wedding",
      "earrings",
      "lab-grown",
      "studs",
      "drops",
    ],
  },
  {
    slug: "romantic-jewellery-gifts-for-her",
    categorySlug: "jewellery-gift-guides",
    title:
      "Romantic Jewellery Gifts for Her: Meaningful Earrings She Can Wear Again",
    excerpt:
      "Choose romantic jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and meaningful gift ideas for her.",
    coverImage: "/blog-images/blog-image-65.jpg",
    publishedAt: "2025-07-21",
    readTime: "15 min read",
    tags: [
      "romantic gifts",
      "butterfly earrings",
      "anniversary",
      "birthday",
      "earrings",
      "lab-grown",
    ],
  },
  {
    slug: "wedding-party-jewellery-gifts",
    categorySlug: "jewellery-gift-guides",
    title: "Wedding Party Jewellery Gifts: Earrings They Can Wear on the Day and After",
    excerpt:
      "Choose wedding party jewellery gifts with lab grown diamond earrings, studs, huggies, drops, butterfly earrings and wedding-ready gift ideas.",
    coverImage: "/blog-images/blog-image-91.jpg",
    publishedAt: "2025-09-11",
    readTime: "17 min read",
    tags: ["wedding party", "bridesmaid", "maid of honour", "wedding", "earrings", "lab-grown"],
  },
  {
    slug: "maid-of-honour-jewellery-gifts",
    categorySlug: "jewellery-gift-guides",
    title: "Maid of Honour Jewellery Gifts: Meaningful Earrings for the Wedding Day and After",
    excerpt:
      "Choose maid of honour jewellery gifts with lab grown diamond earrings, studs, drops, huggies, butterfly earrings and wedding-ready gift ideas.",
    coverImage: "/blog-images/blog-image-89.jpg",
    publishedAt: "2025-09-07",
    readTime: "16 min read",
    tags: ["maid of honour", "wedding", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
  // ─── SEO-RETIRED R10 · /resources/jewellery-gift-guides/anniversary-jewellery-gifts → /resources/jewellery-gift-guides/anniversary-jewellery-gifts-for-her · see src/data/retired-urls.ts ───
  // {
  //   slug: "anniversary-jewellery-gifts",
  //   categorySlug: "jewellery-gift-guides",
  //   title: "Anniversary Jewellery Gifts: Romantic Earrings She Will Actually Wear",
  //   excerpt:
  //     "Choose anniversary jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and romantic gift ideas.",
  //   coverImage: "/blog-images/blog-image-87.jpg",
  //   publishedAt: "2025-09-03",
  //   readTime: "16 min read",
  //   tags: ["anniversary gifts", "butterfly earrings", "romantic", "studs", "earrings", "lab-grown"],
  // },
  // ─── SEO-RETIRED R9 · /resources/jewellery-gift-guides/birthday-jewellery-gifts → /resources/jewellery-gift-guides/birthday-jewellery-gifts-for-her · see src/data/retired-urls.ts ───
  // {
  //   slug: "birthday-jewellery-gifts",
  //   categorySlug: "jewellery-gift-guides",
  //   title: "Birthday Jewellery Gifts: Earrings She Will Actually Wear After Her Birthday",
  //   excerpt:
  //     "Choose birthday jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and meaningful gift ideas.",
  //   coverImage: "/blog-images/blog-image-85.jpg",
  //   publishedAt: "2025-08-30",
  //   readTime: "16 min read",
  //   tags: ["birthday gifts", "butterfly earrings", "studs", "earrings", "meaningful", "lab-grown"],
  // },
  {
    slug: "graduation-jewellery-gifts",
    categorySlug: "jewellery-gift-guides",
    title: "Graduation Jewellery Gifts: Meaningful Earrings for a New Chapter",
    excerpt:
      "Choose graduation jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, hoops and meaningful gift ideas.",
    coverImage: "/blog-images/blog-image-83.jpg",
    publishedAt: "2025-08-26",
    readTime: "16 min read",
    tags: ["graduation gifts", "butterfly earrings", "studs", "milestone", "earrings", "lab-grown"],
  },
  {
    slug: "jewellery-gifts-for-best-friend",
    categorySlug: "jewellery-gift-guides",
    title: "Jewellery Gifts for Best Friend: Thoughtful Earrings She Will Actually Wear",
    excerpt:
      "Choose jewellery gifts for your best friend with lab grown diamond earrings, studs, huggies, butterfly earrings, hoops and meaningful gift ideas.",
    coverImage: "/blog-images/blog-image-81.jpg",
    publishedAt: "2025-08-22",
    readTime: "15 min read",
    tags: ["best friend gifts", "birthday", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
  {
    slug: "jewellery-gifts-for-daughter",
    categorySlug: "jewellery-gift-guides",
    title: "Jewellery Gifts for Daughter: Meaningful Earrings She Will Actually Wear",
    excerpt:
      "Choose jewellery gifts for your daughter with lab grown diamond earrings, studs, huggies, butterfly earrings, hoops and meaningful gift ideas.",
    coverImage: "/blog-images/blog-image-79.jpg",
    publishedAt: "2025-08-18",
    readTime: "15 min read",
    tags: ["daughter gifts", "birthday", "graduation", "butterfly earrings", "studs", "lab-grown"],
  },
  {
    slug: "jewellery-gifts-for-mum",
    categorySlug: "jewellery-gift-guides",
    title: "Jewellery Gifts for Mum: Thoughtful Earrings She Will Actually Wear",
    excerpt:
      "Choose jewellery gifts for mum with lab grown diamond earrings, studs, huggies, butterfly earrings, drops and meaningful gift ideas.",
    coverImage: "/blog-images/blog-image-77.jpg",
    publishedAt: "2025-08-14",
    readTime: "15 min read",
    tags: ["mum gifts", "birthday", "Mother's Day", "butterfly earrings", "studs", "lab-grown"],
  },
  {
    slug: "jewellery-gifts-for-sister",
    categorySlug: "jewellery-gift-guides",
    title: "Jewellery Gifts for Sister: Earrings She Will Actually Wear",
    excerpt:
      "Choose jewellery gifts for your sister with lab grown diamond earrings, studs, huggies, butterfly earrings, hoops, drops and birthday gift ideas.",
    coverImage: "/blog-images/blog-image-75.jpg",
    publishedAt: "2025-08-10",
    readTime: "15 min read",
    tags: ["sister gifts", "birthday", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
  {
    slug: "jewellery-gifts-for-wife",
    categorySlug: "jewellery-gift-guides",
    title: "Jewellery Gifts for Wife: Romantic, Meaningful Earrings She Will Actually Wear",
    excerpt:
      "Choose jewellery gifts for your wife with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and romantic gift ideas.",
    coverImage: "/blog-images/blog-image-73.jpg",
    publishedAt: "2025-08-06",
    readTime: "15 min read",
    tags: ["wife gifts", "romantic", "butterfly earrings", "anniversary", "earrings", "lab-grown"],
  },
  {
    slug: "jewellery-gifts-for-girlfriend",
    categorySlug: "jewellery-gift-guides",
    title: "Jewellery Gifts for Girlfriend: Romantic Earrings She Will Actually Wear",
    excerpt:
      "Choose jewellery gifts for your girlfriend with lab grown diamond earrings, studs, huggies, butterfly earrings, drops and romantic gift ideas.",
    coverImage: "/blog-images/blog-image-71.jpg",
    publishedAt: "2025-08-02",
    readTime: "15 min read",
    tags: ["girlfriend gifts", "romantic", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
  {
    slug: "jewellery-gifts-for-her",
    categorySlug: "jewellery-gift-guides",
    title: "Jewellery Gifts for Her: How to Choose Earrings She Will Actually Wear",
    excerpt:
      "Choose jewellery gifts for her with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and romantic gift ideas.",
    coverImage: "/blog-images/blog-image-69.jpg",
    publishedAt: "2025-07-29",
    readTime: "16 min read",
    tags: ["jewellery gifts", "earrings", "birthday", "anniversary", "romantic", "lab-grown"],
  },
  {
    slug: "date-night-jewellery-guide",
    categorySlug: "jewellery-gift-guides",
    title: "Date Night Earrings: What to Wear",
    excerpt:
      "Choose date night earrings for casual dinners, drinks, anniversary meals and formal evenings. Compare studs, hoops, drops and statement styles by outfit.",
    coverImage: "/blog-images/blog-image-67.jpg",
    publishedAt: "2025-07-25",
    readTime: "16 min read",
    tags: [
      "date night",
      "romantic",
      "drop earrings",
      "butterfly earrings",
      "earrings",
      "lab-grown",
    ],
  },
  // Earring Styling Guides
  {
    slug: "how-to-stack-earrings",
    categorySlug: "earring-style-guides",
    title: "How to Stack Earrings: Complete Ear Stack Guide",
    excerpt:
      "Learn how to stack earrings step by step: choose a focal piece, vary the scale, repeat one feature and check spacing across two or three piercings.",
    coverImage: "/blog-images/blog-image-96.jpg",
    publishedAt: "2025-07-21",
    readTime: "13 min read",
    tags: [
      "ear stacks",
      "earring styling",
      "studs",
      "huggies",
      "hoops",
      "lab-grown",
    ],
  },
  {
    slug: "diamond-ear-stack-ideas",
    categorySlug: "earring-style-guides",
    title: "Diamond Ear Stack Ideas: 15 Curated Looks",
    excerpt:
      "Fifteen diamond ear stack ideas for two and three piercings, covering minimalist, everyday, workwear, wedding guest and evening combinations.",
    coverImage: "/blog-images/blog-image-67.jpg",
    publishedAt: "2025-07-25",
    readTime: "12 min read",
    tags: [
      "diamond ear stacks",
      "ear stack ideas",
      "earring styling",
      "two piercings",
      "three piercings",
      "lab-grown",
    ],
  },
  {
    slug: "minimalist-earrings-guide",
    categorySlug: "earring-style-guides",
    title: "Minimalist Earrings Guide: Styles & Buying Tips",
    excerpt:
      "Learn how to choose minimalist earrings by style, size, metal, closure and sparkle. Compare studs, huggies, slim hoops and subtle diamond designs.",
    coverImage: "/blog-images/blog-image-69.jpg",
    publishedAt: "2025-07-29",
    readTime: "14 min read",
    tags: [
      "minimalist earrings",
      "buying guide",
      "earring sizes",
      "studs",
      "huggies",
      "lab-grown",
    ],
  },
  {
    slug: "stud-vs-huggie-earrings",
    categorySlug: "earring-style-guides",
    title: "Stud vs Huggie Earrings: Key Differences",
    excerpt:
      "Compare stud and huggie earrings by shape, fit, backing, movement and styling. Learn which design suits a single piercing, gift or ear stack.",
    coverImage: "/blog-images/blog-image-71.jpg",
    publishedAt: "2025-08-02",
    readTime: "11 min read",
    tags: [
      "stud earrings",
      "huggie earrings",
      "comparison",
      "earring styling",
      "lab-grown",
    ],
  },
  {
    slug: "hoop-vs-huggie-earrings",
    categorySlug: "earring-style-guides",
    title: "Hoop vs Huggie Earrings: Key Differences",
    excerpt:
      "Compare hoop and huggie earrings by diameter, fit, movement, closure and styling. Learn which design better suits your piercings and preferred look.",
    coverImage: "/blog-images/blog-image-13.jpg",
    publishedAt: "2025-08-06",
    readTime: "11 min read",
    tags: [
      "hoop earrings",
      "huggie earrings",
      "comparison",
      "earring styling",
      "lab-grown",
    ],
  },
  {
    slug: "stud-vs-hoop-earrings",
    categorySlug: "earring-style-guides",
    title: "Stud vs Hoop Earrings: Which Style Should You Choose?",
    excerpt:
      "Compare stud and hoop earrings for everyday wear, gifts, workwear, ear stacks, weddings, parties and lab grown diamond styling.",
    coverImage: "/blog-images/blog-image-17.jpg",
    publishedAt: "2025-08-10",
    readTime: "11 min read",
    tags: [
      "stud earrings",
      "hoop earrings",
      "comparison",
      "earring styling",
      "lab-grown",
    ],
  },
  {
    slug: "party-earrings-guide",
    categorySlug: "earring-style-guides",
    title: "Party Earrings Guide: What to Wear to Every Event",
    excerpt:
      "Choose earrings for cocktail parties, formal dinners, galas, birthdays and black-tie events. Compare studs, hoops, drops and bolder styles.",
    coverImage: "/blog-images/blog-image-77.jpg",
    publishedAt: "2025-08-14",
    readTime: "13 min read",
    tags: [
      "party earrings",
      "evening styling",
      "black dress",
      "satin",
      "lab-grown",
      "bold earrings",
    ],
  },
  {
    slug: "bold-statement-earrings-guide",
    categorySlug: "earring-style-guides",
    title: "Bold Statement Earrings: Styling Guide",
    excerpt:
      "Learn how to choose and style bold statement earrings by size, weight, neckline, hairstyle and outfit detail, without making your look feel crowded.",
    coverImage: "/blog-images/blog-image-79.jpg",
    publishedAt: "2025-08-18",
    readTime: "13 min read",
    tags: [
      "bold earrings",
      "statement earrings",
      "party styling",
      "evening",
      "lab-grown",
    ],
  },
  {
    slug: "what-jewellery-to-wear-with-a-black-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Black Dress",
    excerpt:
      "Choose earrings, necklaces and metal colours for a black dress by neckline, fabric and occasion. Compare studs, hoops, drops and statement designs.",
    coverImage: "/blog-images/blog-image-52.jpg",
    publishedAt: "2025-08-22",
    readTime: "16 min read",
    tags: [
      "black dress",
      "earring styling",
      "outfit styling",
      "party earrings",
      "bold earrings",
      "lab-grown",
    ],
  },
  {
    slug: "what-jewellery-to-wear-with-a-satin-dress",
    categorySlug: "earring-style-guides",
    title: "Jewellery to Wear with Satin & Silk Dresses",
    excerpt:
      "Learn what jewellery to wear with satin and silk dresses. Choose earrings, necklaces and metal colours by neckline, dress colour and occasion.",
    coverImage: "/blog-images/blog-image-83.jpg",
    publishedAt: "2025-08-26",
    readTime: "16 min read",
    tags: [
      "satin dress",
      "earring styling",
      "outfit styling",
      "wedding guest",
      "drop earrings",
      "lab-grown",
    ],
  },
  {
    slug: "what-jewellery-to-wear-with-a-v-neck-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a V-Neck Dress",
    excerpt:
      "Choose necklaces and earrings for V-neck dresses by neckline depth, pendant placement, fabric and occasion. Learn when to wear earrings, a necklace or both.",
    coverImage: "/blog-images/blog-image-85.jpg",
    publishedAt: "2025-08-30",
    readTime: "15 min read",
    tags: [
      "v-neck dress",
      "earring styling",
      "outfit styling",
      "necklace",
      "drop earrings",
      "lab-grown",
    ],
  },
  {
    slug: "what-jewellery-to-wear-with-a-sweetheart-neckline",
    categorySlug: "earring-style-guides",
    title: "Jewellery for a Sweetheart Neckline: Styling Guide",
    excerpt:
      "Choose jewellery for a sweetheart neckline. Compare earrings, necklaces and metal colours for wedding, party, satin and romantic dresses.",
    coverImage: "/blog-images/blog-image-87.jpg",
    publishedAt: "2025-09-03",
    readTime: "16 min read",
    tags: [
      "sweetheart neckline",
      "earring styling",
      "outfit styling",
      "butterfly earrings",
      "drop earrings",
      "lab-grown",
    ],
  },
  {
    slug: "what-earrings-to-wear-with-an-off-shoulder-dress",
    categorySlug: "earring-style-guides",
    title: "What Earrings to Wear with an Off-Shoulder Dress",
    excerpt:
      "Choose earrings for an off-shoulder dress by earring size, neckline width, hairstyle, fabric and occasion. Compare studs, hoops, drops and statement styles.",
    coverImage: "/blog-images/blog-image-89.jpg",
    publishedAt: "2025-09-07",
    readTime: "16 min read",
    tags: [
      "off-shoulder dress",
      "earring styling",
      "outfit styling",
      "drop earrings",
      "bold earrings",
      "lab-grown",
    ],
  },
  // ─── SEO-RETIRED R3 · /resources/earring-style-guides/gold-vs-white-vs-rose-gold-diamond-earrings → /resources/lab-grown-diamond-guides/gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings · see src/data/retired-urls.ts ───
  // {
  //   slug: "gold-vs-white-vs-rose-gold-diamond-earrings",
  //   categorySlug: "earring-style-guides",
  //   title:
  //     "Gold vs White vs Rose Gold Lab-Grown Diamond Earrings: Which Metal Colour Should You Choose?",
  //   excerpt:
  //     "Compare gold, white and rose gold lab grown diamond earrings for everyday wear, gifts, weddings, parties, skin tone and outfit styling.",
  //   coverImage: "/blog-images/blog-image-91.jpg",
  //   publishedAt: "2025-09-11",
  //   readTime: "15 min read",
  //   tags: [
  //     "metal colour",
  //     "gold",
  //     "white gold",
  //     "rose gold",
  //     "lab-grown diamond earrings",
  //     "earring styling",
  //   ],
  // },
  {
    slug: "what-jewellery-to-wear-with-a-green-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Green Dress",
    excerpt:
      "Choose jewellery for emerald, sage, olive, mint and forest-green dresses. Compare metal colours, earrings and necklaces by fabric and occasion.",
    coverImage: "/blog-images/blog-image-93.jpg",
    publishedAt: "2025-09-15",
    readTime: "16 min read",
    tags: [
      "green dress",
      "earring styling",
      "outfit styling",
      "gold jewellery",
      "drop earrings",
      "lab-grown",
    ],
  },
  {
    slug: "what-jewellery-to-wear-with-a-red-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Red Dress",
    excerpt:
      "Discover what jewellery to wear with a red dress, from gold and silver earrings to choices for satin dresses, weddings, parties and necklines.",
    coverImage: "/blog-images/blog-image-95.jpg",
    publishedAt: "2025-09-19",
    readTime: "16 min read",
    tags: [
      "red dress",
      "earring styling",
      "outfit styling",
      "gold jewellery",
      "drop earrings",
      "lab-grown",
    ],
  },
  {
    slug: "minimalist-jewellery-styling-guide",
    categorySlug: "earring-style-guides",
    title: "How to Style Minimalist Jewellery",
    excerpt:
      "Learn how to style minimalist jewellery with outfits, necklines and other pieces. Build a versatile capsule using earrings, necklaces, rings and bracelets.",
    coverImage: "/blog-images/blog-image-97.jpg",
    publishedAt: "2025-09-23",
    readTime: "15 min read",
    tags: [
      "minimalist jewellery",
      "jewellery capsule",
      "layering",
      "necklines",
      "styling",
      "lab-grown",
    ],
  },
  // ─── SEO-RETIRED R1 · /resources/earring-style-guides/lab-grown-diamond-hoop-earrings-guide → /resources/lab-grown-diamond-guides/lab-grown-diamond-hoop-earrings-guide · see src/data/retired-urls.ts ───
  // {
  //   slug: "lab-grown-diamond-hoop-earrings-guide",
  //   categorySlug: "earring-style-guides",
  //   title:
  //     "Lab-Grown Diamond Hoop Earrings Guide: How to Choose and Style Diamond Hoops",
  //   excerpt:
  //     "Learn how to choose lab grown diamond hoop earrings for everyday wear, parties, weddings, gifts, ear stacks and outfit styling.",
  //   coverImage: "/blog-images/blog-image-99.jpg",
  //   publishedAt: "2025-09-27",
  //   readTime: "14 min read",
  //   tags: [
  //     "hoop earrings",
  //     "lab-grown diamond earrings",
  //     "earring styling",
  //     "ear stacks",
  //     "everyday wear",
  //     "lab-grown",
  //   ],
  // },
  {
    slug: "everyday-lab-grown-diamond-earrings-guide",
    categorySlug: "earring-style-guides",
    title:
      "Everyday Lab-Grown Diamond Earrings: How to Choose Earrings You Can Wear Daily",
    excerpt:
      "Choose everyday lab grown diamond earrings for work, casual outfits, ear stacks, gifts, travel and daily jewellery styling.",
    coverImage: "/blog-images/blog-image-101.jpg",
    publishedAt: "2025-10-01",
    readTime: "15 min read",
    tags: [
      "everyday earrings",
      "lab-grown diamond earrings",
      "workwear",
      "ear stacks",
      "daily jewellery",
      "lab-grown",
    ],
  },
  // ─── SEO-RETIRED R2 · /resources/earring-style-guides/can-you-wear-lab-grown-diamond-earrings-every-day → /resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day · see src/data/retired-urls.ts ───
  // {
  //   slug: "can-you-wear-lab-grown-diamond-earrings-every-day",
  //   categorySlug: "earring-style-guides",
  //   title:
  //     "Can You Wear Lab-Grown Diamond Earrings Every Day? Daily Wear, Care & Styling Guide",
  //   excerpt:
  //     "Learn if lab grown diamond earrings are good for everyday wear, work, sleep, showering, sensitive ears, care, gifts and daily styling.",
  //   coverImage: "/blog-images/blog-image-103.jpg",
  //   publishedAt: "2025-10-05",
  //   readTime: "14 min read",
  //   tags: [
  //     "everyday earrings",
  //     "daily wear",
  //     "lab-grown diamond earrings",
  //     "earring care",
  //     "workwear",
  //     "lab-grown",
  //   ],
  // },
  {
    slug: "how-to-style-geometric-earrings",
    categorySlug: "earring-style-guides",
    title: "How to Style Geometric Earrings",
    excerpt:
      "Learn how to style geometric earrings with workwear, casual outfits, dresses and evening looks, including advice on size, necklines and other jewellery.",
    coverImage: "/blog-images/blog-image-62.jpg",
    publishedAt: "2025-10-20",
    readTime: "12 min read",
    tags: [
      "geometric earrings",
      "earring styling",
      "workwear",
      "necklines",
      "metal colours",
    ],
  },
  {
    slug: "how-to-style-butterfly-earrings",
    categorySlug: "earring-style-guides",
    title: "How to Style Butterfly Earrings",
    excerpt:
      "Learn how to style butterfly earrings with casual outfits, dresses, necklaces and ear stacks. Compare simple, diamond and pavé butterfly designs.",
    coverImage: "/blog-images/blog-image-68.jpg",
    publishedAt: "2025-10-18",
    readTime: "13 min read",
    tags: [
      "butterfly earrings",
      "earring styling",
      "motif jewellery",
      "necklines",
      "ear stacks",
    ],
  },
  {
    slug: "how-to-style-huggie-earrings",
    categorySlug: "earring-style-guides",
    title: "How to Style Huggie Earrings",
    excerpt:
      "Learn how to style huggie earrings alone, with studs and in balanced ear stacks. Match their size, metal and diamond detail to outfits and occasions.",
    coverImage: "/blog-images/blog-image-78.jpg",
    publishedAt: "2025-10-16",
    readTime: "12 min read",
    tags: [
      "huggie earrings",
      "earring styling",
      "ear stacks",
      "metal colours",
      "studs",
    ],
  },
  {
    slug: "what-are-huggie-earrings",
    categorySlug: "earring-style-guides",
    title: "What Are Huggie Earrings? Fit, Sizes and Buying Guide",
    excerpt:
      "Learn what huggie earrings are, how they differ from hoops and how to choose the right diameter, thickness, closure, material and fit for your ear.",
    coverImage: "/blog-images/blog-image-66.jpg",
    publishedAt: "2025-10-14",
    readTime: "13 min read",
    tags: [
      "huggie earrings",
      "earring sizes",
      "earring fit",
      "buying guide",
      "hoops",
    ],
  },
  {
    slug: "travel-jewellery-guide",
    categorySlug: "earring-style-guides",
    title: "Travel Jewellery Guide: What to Pack and How to Protect It",
    excerpt:
      "Learn what jewellery to pack for a holiday, how to prevent tangles and damage, what to keep in hand luggage, and how to care for pieces while travelling.",
    coverImage: "/blog-images/blog-image-84.jpg",
    publishedAt: "2025-10-12",
    readTime: "12 min read",
    tags: [
      "travel jewellery",
      "packing",
      "jewellery care",
      "earrings",
      "storage",
    ],
  },
  {
    slug: "what-earrings-to-wear-as-a-wedding-guest",
    categorySlug: "lab-grown-diamond-guides",
    title:
      "What Earrings to Wear as a Wedding Guest: Dress, Neckline & Styling Guide",
    excerpt:
      "Choose earrings to wear as a wedding guest with lab grown diamond studs, drops, hoops, butterfly earrings and styling ideas for every dress.",
    coverImage: "/blog-images/blog-image-105.jpg",
    publishedAt: "2025-10-09",
    readTime: "16 min read",
    tags: [
      "wedding guest",
      "earring styling",
      "wedding earrings",
      "drop earrings",
      "butterfly earrings",
      "lab-grown",
    ],
  },
  {
    slug: "valentines-day-jewellery-gifts",
    categorySlug: "jewellery-care-guides",
    title: "Valentine's Day Jewellery Gifts: Romantic Earrings She Will Actually Wear",
    excerpt:
      "Choose Valentine's Day jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and romantic gift ideas.",
    coverImage: "/blog-images/blog-image-13.jpg",
    publishedAt: "2025-10-05",
    readTime: "17 min read",
    tags: ["valentine's day", "romantic", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
  // ─── SEO-RETIRED R7 · /resources/jewellery-care-guides/new-year-jewellery-gifts → /resources/occasion-jewellery-guides/new-year-jewellery-gifts · see src/data/retired-urls.ts ───
  // {
  //   slug: "new-year-jewellery-gifts",
  //   categorySlug: "jewellery-care-guides",
  //   title: "New Year Jewellery Gifts: Earrings for a Fresh Start and Every Celebration After",
  //   excerpt:
  //     "Choose New Year jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and party-ready gift ideas.",
  //   coverImage: "/blog-images/blog-image-11.jpg",
  //   publishedAt: "2025-10-01",
  //   readTime: "17 min read",
  //   tags: ["new year gifts", "party jewellery", "butterfly earrings", "studs", "earrings", "lab-grown"],
  // },
  {
    slug: "new-year-jewellery-gifts",
    categorySlug: "occasion-jewellery-guides",
    title: "New Year Jewellery Gifts: Earrings for a Fresh Start and Every Celebration After",
    excerpt:
      "Choose New Year jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and party-ready gift ideas.",
    coverImage: "/blog-images/blog-image-9.jpg",
    publishedAt: "2025-10-01",
    readTime: "17 min read",
    tags: ["new year gifts", "party jewellery", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
  {
    slug: "christmas-jewellery-gifts",
    categorySlug: "occasion-jewellery-guides",
    title: "Christmas Jewellery Gifts: Earrings She Will Actually Wear Beyond the Holiday",
    excerpt:
      "Choose Christmas jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and elegant gift ideas.",
    coverImage: "/blog-images/blog-image-7.jpg",
    publishedAt: "2025-09-27",
    readTime: "17 min read",
    tags: ["christmas gifts", "holiday", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
  {
    slug: "wedding-thank-you-jewellery-gifts",
    categorySlug: "occasion-jewellery-guides",
    title: "Wedding Thank-You Jewellery Gifts: Earrings They Can Wear on the Day and After",
    excerpt:
      "Choose wedding thank-you jewellery gifts with lab grown diamond earrings, studs, huggies, drops, butterfly earrings and elegant gift ideas.",
    coverImage: "/blog-images/blog-image-5.jpg",
    publishedAt: "2025-09-23",
    readTime: "17 min read",
    tags: ["wedding thank-you", "bridesmaid", "maid of honour", "wedding", "earrings", "lab-grown"],
  },
  {
    slug: "mother-of-the-bride-jewellery-gifts",
    categorySlug: "occasion-jewellery-guides",
    title: "Mother of the Bride Jewellery Gifts: Elegant Earrings for the Wedding Day and After",
    excerpt:
      "Choose mother of the bride jewellery gifts with lab grown diamond earrings, studs, drops, huggies, butterfly earrings and elegant wedding gift ideas.",
    coverImage: "/blog-images/blog-image-1.jpg",
    publishedAt: "2025-09-15",
    readTime: "16 min read",
    tags: ["mother of the bride", "wedding", "studs", "drops", "butterfly earrings", "lab-grown"],
  },
  {
    slug: "mother-of-the-groom-jewellery-gifts",
    categorySlug: "occasion-jewellery-guides",
    title: "Mother of the Groom Jewellery Gifts: Elegant Earrings for the Wedding Day and After",
    excerpt:
      "Choose mother of the groom jewellery gifts with lab grown diamond earrings, studs, drops, huggies, butterfly earrings and elegant wedding gift ideas.",
    coverImage: "/blog-images/blog-image-3.jpg",
    publishedAt: "2025-09-19",
    readTime: "16 min read",
    tags: ["mother of the groom", "wedding", "studs", "drops", "butterfly earrings", "lab-grown"],
  },
  // ─── New guides added 2026-10-09 ───
  {
    slug: "bridal-necklace-for-wedding-dress",
    categorySlug: "bridal-jewellery-guides",
    title: "How to Choose a Bridal Necklace for Your Wedding Dress",
    excerpt:
      "Choose a bridal necklace by neckline, pendant shape and dress detail. Learn how to check chain placement and compare necklace styles with fitting photos.",
    coverImage: "/blog-images/resource-guides/bridal-necklace-for-wedding-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["bridal necklace guide", "wedding necklace by neckline", "necklace for wedding dress", "bridal pendant necklace", "wedding dress necklace length"],
  },
  {
    slug: "jewellery-for-orange-or-rust-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with an Orange or Rust Dress",
    excerpt:
      "Compare jewellery for bright orange and muted rust dresses. See how yellow-gold, white and rose-coloured finishes work for daytime, autumn and evening outfits.",
    coverImage: "/blog-images/resource-guides/jewellery-for-orange-or-rust-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "3 min read",
    tags: ["jewellery for orange dress", "jewellery for rust dress", "earrings for orange dress", "jewellery for burnt orange dress"],
  },
  {
    slug: "necklace-clasp-types",
    categorySlug: "necklace-guides",
    title: "Necklace Clasp Types: How They Work and What to Check Before Buying",
    excerpt:
      "Compare necklace clasp types, including lobster and spring ring clasps. See how they open and what to check for easy, secure fastening before you buy.",
    coverImage: "/blog-images/resource-guides/necklace-clasp-types.jpg",
    publishedAt: "2026-10-09",
    readTime: "8 min read",
    tags: ["necklace clasp types", "lobster clasp vs spring ring", "types of necklace fasteners", "necklace clasp guide", "how to fasten a necklace clasp"],
  },
  {
    slug: "diamond-jewellery-gifts-under-200-euros",
    categorySlug: "jewellery-gift-guides",
    title: "Lab-Grown Diamond Jewellery Gifts Under €200",
    excerpt:
      "Find affordable lab-grown diamond jewellery gifts under €200. Compare earrings, necklaces, rings and bracelets by style, recipient and budget.",
    coverImage: "/blog-images/resource-guides/diamond-jewellery-gifts-under-200-euros.jpg",
    publishedAt: "2026-10-09",
    readTime: "8 min read",
    tags: ["diamond jewellery gifts under €200", "affordable diamond gifts", "affordable lab-grown diamond jewellery", "diamond earrings under €200", "diamond necklaces under €200"],
  },
  {
    slug: "lab-grown-diamond-necklace-buying-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "How to Choose a Lab-Grown Diamond Necklace: Style, Length and Budget",
    excerpt:
      "Choose a lab-grown diamond necklace by style, chain length and budget. Compare solitaire, Y-shaped and symbolic pendants from I Want Jewels.",
    coverImage: "/blog-images/resource-guides/lab-grown-diamond-necklace-buying-guide.jpg",
    publishedAt: "2026-10-09",
    readTime: "8 min read",
    tags: ["lab grown diamond necklace buying guide", "how to choose a diamond necklace", "lab-grown diamond necklace", "diamond necklace styles", "diamond necklace length"],
  },
  {
    slug: "necklace-length-guide-40-45-50cm",
    categorySlug: "necklace-guides",
    title: "Necklace Length Guide: What 40, 45 and 50 cm Look Like When Worn",
    excerpt:
      "See how 40, 45 and 50 cm necklace lengths sit, how to measure your fit, and what to check before choosing a lab-grown diamond necklace.",
    coverImage: "/blog-images/resource-guides/necklace-length-guide-40-45-50cm.jpg",
    publishedAt: "2026-10-09",
    readTime: "9 min read",
    tags: ["necklace length guide", "40cm vs 45cm necklace", "45cm vs 50cm necklace", "what necklace length should i buy", "18 inch necklace in cm"],
  },
  {
    slug: "diamond-pendant-size-guide",
    categorySlug: "lab-grown-diamond-guides",
    title: "How Big Will a Diamond Pendant Look? Millimetres vs Carat Weight",
    excerpt:
      "Learn how diamond carat weight differs from pendant size in millimetres. See what to check in product details and compare lab-grown diamond necklaces.",
    coverImage: "/blog-images/resource-guides/diamond-pendant-size-guide.jpg",
    publishedAt: "2026-10-09",
    readTime: "7 min read",
    tags: ["diamond pendant size guide", "diamond necklace size", "diamond pendant dimensions", "millimetres vs carat weight", "how big will a diamond pendant look"],
  },
  {
    slug: "necklace-or-bracelet-gift",
    categorySlug: "jewellery-gift-guides",
    title: "Necklace or Bracelet: Which Makes the Better Jewellery Gift?",
    excerpt:
      "Choosing a jewellery gift for your girlfriend? Compare necklaces and bracelets by fit, everyday style, visibility and budget, with lab-grown diamond gift ideas.",
    coverImage: "/blog-images/resource-guides/necklace-or-bracelet-gift.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["necklace or bracelet gift", "jewellery gift for girlfriend", "necklace vs bracelet as a gift", "diamond necklace gift", "diamond bracelet gift"],
  },
  {
    slug: "types-of-necklace-chains",
    categorySlug: "necklace-guides",
    title: "Types of Necklace Chains: A Visual Guide to Their Differences",
    excerpt:
      "Learn how cable, curb, box, rope, snake and other necklace chains look and differ. Explore chain styles and lab-grown diamond necklaces from I Want Jewels.",
    coverImage: "/blog-images/resource-guides/types-of-necklace-chains.jpg",
    publishedAt: "2026-10-09",
    readTime: "8 min read",
    tags: ["types of necklace chains", "necklace chain styles", "different types of chains for necklaces", "necklace chain types and names", "best chain style for a pendant"],
  },
  {
    slug: "necklace-chain-thickness-guide",
    categorySlug: "necklace-guides",
    title: "Necklace Chain Thickness: Comparing Fine and More Substantial Chains",
    excerpt:
      "Compare fine and more substantial necklace chains by width, pendant fit and visual balance. Learn how to read millimetre measurements before buying.",
    coverImage: "/blog-images/resource-guides/necklace-chain-thickness-guide.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["necklace chain thickness guide", "necklace chain width", "necklace chain thickness", "fine chain vs thick chain", "chain width in mm"],
  },
  {
    slug: "how-to-use-a-necklace-extender",
    categorySlug: "necklace-guides",
    title: "How to Choose and Attach a Necklace Extender",
    excerpt:
      "Learn how to choose a necklace extender, check clasp compatibility and calculate the new length. Follow simple steps to attach it securely.",
    coverImage: "/blog-images/resource-guides/how-to-use-a-necklace-extender.jpg",
    publishedAt: "2026-10-09",
    readTime: "7 min read",
    tags: ["necklace extender guide", "how to extend a necklace", "necklace chain extender", "how to attach a necklace extender", "necklace extender length"],
  },
  {
    slug: "pendant-necklace-styles",
    categorySlug: "necklace-guides",
    title: "Pendant Shapes Compared: Solitaire, Circle, Star, Floral and Geometric",
    excerpt:
      "Compare solitaire, circle, star, floral and geometric pendant necklace styles. See how each silhouette looks and find a shape that suits your style.",
    coverImage: "/blog-images/resource-guides/pendant-necklace-styles.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["pendant necklace styles", "types of pendants", "pendant shapes", "solitaire pendant necklace", "floral pendant necklace"],
  },
  {
    slug: "pendant-and-chain-compatibility",
    categorySlug: "necklace-guides",
    title: "Will This Pendant Fit This Chain? A Compatibility Checklist",
    excerpt:
      "Check pendant bail size, chain width, clasp passage and whether the pendant is removable before pairing it with a chain. Use this checklist to confirm the fit.",
    coverImage: "/blog-images/resource-guides/pendant-and-chain-compatibility.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["choosing a chain for a pendant", "pendant bail size", "will this pendant fit this chain", "pendant chain compatibility", "chain width for pendant"],
  },
  {
    slug: "types-of-fashion-rings",
    categorySlug: "ring-guides",
    title: "Types of Fashion Rings: Diamond Bands, Open Rings, Motifs and Statement Designs",
    excerpt:
      "Compare fashion ring styles, from diamond bands and open rings to motif and statement designs. See how each profile looks and find a style that suits you.",
    coverImage: "/blog-images/resource-guides/types-of-fashion-rings.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["types of rings for women", "fashion ring styles", "diamond band ring", "open ring", "statement ring"],
  },
  {
    slug: "ring-band-width-guide",
    categorySlug: "ring-guides",
    title: "Ring Band Width: How Slim and Wide Designs Look on the Hand",
    excerpt:
      "Compare slim and wide ring bands by their look, finger coverage and fit. Learn what to check in product photos before choosing a ring.",
    coverImage: "/blog-images/resource-guides/ring-band-width-guide.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["ring band width guide", "thin vs thick rings", "ring band width", "slim ring bands", "wide ring bands"],
  },
  {
    slug: "rings-for-short-fingers-and-small-hands",
    categorySlug: "ring-guides",
    title: "How to Choose Rings for Short Fingers and Small Hands",
    excerpt:
      "Explore ring styles for short fingers and small hands, from slim bands to open and statement designs. Compare profiles and choose what feels right to you.",
    coverImage: "/blog-images/resource-guides/rings-for-short-fingers-and-small-hands.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["rings for short fingers", "rings for small hands", "ring styles for short fingers", "choosing rings for small hands"],
  },
  {
    slug: "which-finger-to-wear-a-fashion-ring",
    categorySlug: "ring-guides",
    title: "Which Finger Can You Wear a Fashion Ring On?",
    excerpt:
      "Learn how to style fashion rings on different fingers, with practical comfort tips and notes on cultural meanings. Choose the placement that feels right to you.",
    coverImage: "/blog-images/resource-guides/which-finger-to-wear-a-fashion-ring.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["which finger to wear a ring", "fashion ring finger", "which finger to wear a fashion ring", "how to style rings on different fingers"],
  },
  {
    slug: "diamond-band-vs-solitaire-ring",
    categorySlug: "ring-guides",
    title: "Diamond Band vs Solitaire Ring: Which Style Suits Everyday Wear?",
    excerpt:
      "Compare diamond bands and solitaire rings by shape, setting height, diamond placement and everyday style. See what to check before choosing.",
    coverImage: "/blog-images/resource-guides/diamond-band-vs-solitaire-ring.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["diamond band vs solitaire ring", "pavé ring vs solitaire", "diamond band ring", "solitaire ring", "diamond ring for everyday wear"],
  },
  {
    slug: "earrings-for-face-shape",
    categorySlug: "earring-style-guides",
    title: "How to Choose Earrings for Your Face Shape",
    excerpt:
      "Compare studs, hoops and drop earrings by face shape, hairstyle and personal style. Use these ideas as options to try, not fixed rules.",
    coverImage: "/blog-images/resource-guides/earrings-for-face-shape.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["earrings for face shape", "earrings for round face", "earrings for oval face", "earrings for square face", "earrings for heart-shaped face"],
  },
  {
    slug: "jewellery-for-pink-dress",
    categorySlug: "earring-style-guides",
    title: "Jewellery for a Pink Dress: Blush, Rose and Fuchsia Compared",
    excerpt:
      "Choose jewellery for blush, rose or fuchsia dresses. Compare yellow-gold, white and rose-coloured finishes with earring, necklace and bracelet ideas.",
    coverImage: "/blog-images/resource-guides/jewellery-for-pink-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["jewellery for pink dress", "earrings for blush pink dress", "jewellery for fuchsia dress", "jewellery for rose dress", "what jewellery to wear with pink"],
  },
  {
    slug: "jewellery-for-navy-blue-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Navy Blue Dress",
    excerpt:
      "Find jewellery for a navy blue dress, from understated daytime pieces to wedding-guest and evening looks. Compare yellow-gold, white and rose-coloured finishes.",
    coverImage: "/blog-images/resource-guides/jewellery-for-navy-blue-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["jewellery for navy blue dress", "earrings for navy dress", "what jewellery to wear with a navy dress", "gold or silver jewellery with navy"],
  },
  {
    slug: "jewellery-for-cobalt-blue-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Cobalt Blue Dress",
    excerpt:
      "Style jewellery with a cobalt blue dress. Compare yellow-gold, white and rose finishes, with earring, necklace and bracelet combinations.",
    coverImage: "/blog-images/resource-guides/jewellery-for-cobalt-blue-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "4 min read",
    tags: ["jewellery for cobalt blue dress", "earrings for cobalt blue dress", "what jewellery to wear with a blue dress"],
  },
  {
    slug: "gold-filled-vs-gold-plated-jewellery",
    categorySlug: "demi-fine-jewellery-guides",
    title: "Gold-Filled vs Gold-Plated Jewellery: How to Read the Description",
    excerpt:
      "Learn how gold-filled and gold-plated jewellery differ, what each label means and how to check the base metal. See how I Want Jewels describes its plated pieces.",
    coverImage: "/blog-images/resource-guides/gold-filled-vs-gold-plated-jewellery.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["gold filled vs gold plated", "gold filled jewellery meaning", "gold-plated jewellery", "gold-filled vs gold-plated", "14kt gold-plated sterling silver"],
  },
  {
    slug: "sterling-silver-vs-stainless-steel-jewellery",
    categorySlug: "demi-fine-jewellery-guides",
    title: "Sterling Silver vs Stainless Steel Jewellery: Which Should You Choose?",
    excerpt:
      "Compare sterling silver and stainless steel jewellery by composition, finish, care and price. See why I Want Jewels uses 925 sterling silver for its lab-grown diamond range.",
    coverImage: "/blog-images/resource-guides/sterling-silver-vs-stainless-steel-jewellery.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["925 sterling silver vs stainless steel", "silver or stainless steel jewellery", "sterling silver jewellery care"],
  },
  {
    slug: "rhodium-plated-sterling-silver",
    categorySlug: "jewellery-care-guides",
    title: "What Is Rhodium-Plated Sterling Silver? Finish, Wear and Care Explained",
    excerpt:
      "Learn what rhodium-plated sterling silver is, how the finish wears and how to care for it. See what to check on a jewellery product page.",
    coverImage: "/blog-images/resource-guides/rhodium-plated-sterling-silver.jpg",
    publishedAt: "2026-10-09",
    readTime: "4 min read",
    tags: ["rhodium plated sterling silver", "rhodium plated jewellery", "rhodium plating on silver", "rhodium finish jewellery", "how to care for rhodium-plated silver"],
  },
  {
    slug: "jewellery-for-purple-or-lilac-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Purple or Lilac Dress",
    excerpt:
      "Choose jewellery for a lilac or deep purple dress. Compare yellow-gold, white and rose-coloured finishes, earring scale and neckline styling.",
    coverImage: "/blog-images/resource-guides/jewellery-for-purple-or-lilac-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "4 min read",
    tags: ["jewellery for purple dress", "jewellery for lilac dress", "earrings for lilac dress", "what jewellery to wear with purple", "jewellery for lavender dress"],
  },
  {
    slug: "jewellery-for-chocolate-brown-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Chocolate Brown Dress",
    excerpt:
      "Style jewellery with a chocolate brown dress. Compare warm yellow-gold, white and rose-coloured finishes for autumn, daytime and evening outfits.",
    coverImage: "/blog-images/resource-guides/jewellery-for-chocolate-brown-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "4 min read",
    tags: ["jewellery for brown dress", "earrings for chocolate brown dress", "jewellery for chocolate brown dress", "gold or silver jewellery with brown"],
  },
  {
    slug: "jewellery-for-champagne-and-beige-dresses",
    categorySlug: "dress-colour-guides",
    title: "Jewellery for Champagne and Beige Dresses: How to Add Definition",
    excerpt:
      "Find jewellery for champagne and beige dresses. Compare yellow, rose and white finishes, choose earrings and necklaces, and create contrast against pale fabrics.",
    coverImage: "/blog-images/resource-guides/jewellery-for-champagne-and-beige-dresses.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["jewellery for champagne dress", "jewellery for beige dress", "earrings for champagne dress", "jewellery for beige outfit"],
  },
  {
    slug: "jewellery-for-a-gold-dress",
    categorySlug: "earring-style-guides",
    title: "Jewellery with a Metallic Gold Outfit: Matching Metals or Adding Contrast?",
    excerpt:
      "Choosing jewellery for a gold dress? Compare matching yellow-gold tones with rose and white finishes, then find earrings and necklaces to suit your outfit.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-gold-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["jewellery for gold dress", "earrings for metallic gold dress", "jewellery with a gold outfit", "what jewellery to wear with a gold dress", "earrings for a gold evening dress"],
  },
  {
    slug: "jewellery-for-a-square-neck-dress",
    categorySlug: "necklace-style-guides",
    title: "What Jewellery to Wear with a Square-Neck Dress",
    excerpt:
      "Find the right necklace for a square-neck dress. See where different pendant lengths sit, when to skip a necklace and which earrings complete the look.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-square-neck-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["jewellery for square neckline", "necklace for square neck dress", "earrings for square-neck dress", "pendant for square neckline", "jewellery for a square neckline"],
  },
  {
    slug: "jewellery-for-a-halter-neck-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Halter-Neck Dress",
    excerpt:
      "Find jewellery for a halter-neck dress. Compare open-centre and closed halters, choose earrings that clear the straps and decide whether a necklace will work.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-halter-neck-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["jewellery for halter neck dress", "earrings for halter dress", "necklace for halter-neck dress", "earrings for high halter dress", "what jewellery goes with a halter dress"],
  },
  {
    slug: "jewellery-for-a-boat-neck-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Boat-Neck Dress",
    excerpt:
      "Find jewellery for a boat-neck dress. Compare studs, short earrings and drops, and learn where a necklace should sit against a wide horizontal neckline.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-boat-neck-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["jewellery for boat neck dress", "necklace for boat neckline", "earrings for boat-neck dress", "necklace for bateau neckline", "short or drop earrings with a boat neck"],
  },
  {
    slug: "jewellery-for-a-one-shoulder-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a One-Shoulder Dress",
    excerpt:
      "Find jewellery for a one-shoulder dress. Balance the asymmetric neckline, choose earrings that clear the bare shoulder and decide when to skip a necklace.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-one-shoulder-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["jewellery for one shoulder dress", "earrings for asymmetric dress", "necklace for one-shoulder dress", "jewellery for asymmetrical neckline"],
  },
  {
    slug: "jewellery-for-a-jumpsuit",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Jumpsuit",
    excerpt:
      "Find jewellery for a jumpsuit with outfit ideas for tailored, strapless and halter styles. Compare earrings, necklaces and bracelets by neckline.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-jumpsuit.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["jewellery for jumpsuit", "earrings for jumpsuit", "what jewellery to wear with a jumpsuit", "necklace for a jumpsuit", "jewellery for strapless jumpsuit"],
  },
  {
    slug: "jewellery-for-a-floral-dress",
    categorySlug: "earring-style-guides",
    title: "How to Choose Jewellery for a Floral Dress",
    excerpt:
      "Choose jewellery for a floral dress by print size, colour and neckline. Compare earrings, necklaces and simple outfit combinations without overloading the look.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-floral-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["jewellery for floral dress", "earrings for floral dress", "necklace for a floral dress", "earrings for a floral print dress", "jewellery for a large floral print"],
  },
  {
    slug: "jewellery-for-a-denim-dress",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear with a Denim Dress",
    excerpt:
      "Find jewellery for a denim dress, from casual daytime styling to evening outfits. Compare earrings, necklaces and metal finishes, including tips for shirt collars.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-denim-dress.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["jewellery for denim dress", "earrings for denim dress", "necklace for denim shirt dress", "gold or silver jewellery with denim", "evening jewellery for a denim dress"],
  },
  {
    slug: "jewellery-for-a-job-interview",
    categorySlug: "earring-style-guides",
    title: "What Jewellery to Wear to a Job Interview",
    excerpt:
      "Choose interview jewellery that feels comfortable and suits the workplace. Compare earrings and pendants for different settings, including video interviews.",
    coverImage: "/blog-images/resource-guides/jewellery-for-a-job-interview.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["jewellery for job interview", "interview earrings", "what jewellery to wear to an interview", "earrings for a job interview", "necklace for interview outfit"],
  },
  {
    slug: "how-to-untangle-a-fine-necklace",
    categorySlug: "jewellery-care",
    title: "How to Untangle a Fine Necklace Without Damaging the Finish",
    excerpt:
      "Learn how to untangle a fine necklace gently. Follow safe steps for loose chains and knots, protect plated finishes and know when to stop.",
    coverImage: "/blog-images/resource-guides/how-to-untangle-a-fine-necklace.jpg",
    publishedAt: "2026-10-09",
    readTime: "4 min read",
    tags: ["how to untangle a necklace", "tangled necklace chain", "how to untangle a fine chain", "untangle a knotted necklace", "how to care for gold-plated necklace"],
  },
  {
    slug: "why-does-your-pendant-keep-flipping",
    categorySlug: "jewellery-care",
    title: "Why Does Your Pendant Keep Flipping Over?",
    excerpt:
      "Find out why a pendant turns over or hangs sideways. Check the chain, bail and pendant balance, and learn which fixes are safe to try.",
    coverImage: "/blog-images/resource-guides/why-does-your-pendant-keep-flipping.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["pendant keeps flipping", "necklace pendant turns over", "why does my necklace pendant flip", "pendant hangs backwards", "stop pendant turning on chain"],
  },
  {
    slug: "prom-jewellery",
    categorySlug: "occasion-jewellery-guides",
    title: "Prom Jewellery: Choosing Earrings, Necklaces and Bracelets for Your Dress",
    excerpt:
      "Choose prom jewellery by neckline, dress detail and budget. Compare earrings, necklaces and bracelets, with measured product examples and outfit ideas.",
    coverImage: "/blog-images/resource-guides/prom-jewellery.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["prom jewellery", "prom earrings", "prom necklace", "jewellery for prom dress", "prom bracelet"],
  },
  {
    slug: "engagement-party-jewellery",
    categorySlug: "occasion-jewellery-guides",
    title: "What Jewellery to Wear to an Engagement Party",
    excerpt:
      "Find engagement party jewellery for the couple and their guests. Choose earrings, necklaces and bracelets to suit the outfit without competing with the engagement ring.",
    coverImage: "/blog-images/resource-guides/engagement-party-jewellery.jpg",
    publishedAt: "2026-10-09",
    readTime: "6 min read",
    tags: ["engagement party jewellery", "engagement party earrings", "jewellery for engagement party outfit", "engagement party necklace", "engagement party jewellery for guests"],
  },
  {
    slug: "why-does-necklace-clasp-move-to-front",
    categorySlug: "jewellery-care",
    title: "Why Does Your Necklace Clasp Keep Moving to the Front?",
    excerpt:
      "Find out why a necklace clasp slides to the front. Check chain weight, necklace fit and movement, and learn which adjustments are safe to try.",
    coverImage: "/blog-images/resource-guides/why-does-necklace-clasp-move-to-front.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["necklace clasp keeps moving to front", "necklace clasp slides forward", "clasp moves to front of neck", "keep necklace clasp at the back", "necklace chain keeps turning"],
  },
  {
    slug: "why-does-your-ring-keep-spinning",
    categorySlug: "jewellery-care",
    title: "Why Does Your Ring Keep Spinning? Fit and Design Checks",
    excerpt:
      "Find out why a ring spins on your finger. Check the fit, setting and finger shape, and learn which solutions to discuss with a jeweller.",
    coverImage: "/blog-images/resource-guides/why-does-your-ring-keep-spinning.jpg",
    publishedAt: "2026-10-09",
    readTime: "5 min read",
    tags: ["ring keeps spinning", "how to stop ring spinning", "why does my ring turn around", "ring spins on finger", "top-heavy ring setting"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCategoryBySlug(slug: string): ResourceCategory | undefined {
  return resourceCategories.find((c) => c.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): ResourceArticle[] {
  return resourceArticles.filter((a) => a.categorySlug === categorySlug);
}

export function getArticleBySlug(
  categorySlug: string,
  articleSlug: string,
): ResourceArticle | undefined {
  return resourceArticles.find(
    (a) => a.categorySlug === categorySlug && a.slug === articleSlug,
  );
}

export function getRelatedArticles(
  categorySlug: string,
  currentSlug: string,
  count = 3,
): ResourceArticle[] {
  return resourceArticles
    .filter((a) => a.categorySlug === categorySlug && a.slug !== currentSlug)
    .slice(0, count);
}

export function getArticleCount(categorySlug: string): number {
  return resourceArticles.filter((a) => a.categorySlug === categorySlug).length;
}
