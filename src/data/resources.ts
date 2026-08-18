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
      "Learn how to choose lab grown diamond earrings, including studs, huggies, drops, metal colours, sizes, gifts and everyday styling.",
    coverImage: "/blog-images/blog-image-17.jpg",
    publishedAt: "2025-03-25",
    readTime: "10 min read",
    tags: ["buying guide", "earrings", "lab-grown"],
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
    title:
      "Lab-Grown Diamond Earrings for Weddings: Guest, Bridesmaid & Occasion Guide",
    excerpt:
      "Choose lab grown diamond earrings for weddings, wedding guests, bridesmaids, receptions, dresses, necklines and elegant occasion styling.",
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
  {
    slug: "lab-grown-diamond-earrings-for-gifts",
    categorySlug: "lab-grown-diamond-guides",
    title:
      "Lab-Grown Diamond Earrings for Gifts: Birthday, Anniversary & Bridesmaid Guide",
    excerpt:
      "Choose lab grown diamond earrings for birthday gifts, anniversary gifts, bridesmaids, romantic gifts and everyday jewellery gifts.",
    coverImage: "/blog-images/blog-image-60.jpg",
    publishedAt: "2025-05-14",
    readTime: "13 min read",
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
    slug: "lab-grown-diamond-earrings-for-ear-stacks",
    categorySlug: "lab-grown-diamond-guides",
    title:
      "Lab-Grown Diamond Earrings for Ear Stacks: Studs, Huggies & Styling Guide",
    excerpt:
      "Build a diamond ear stack with lab grown diamond studs, huggies, hoops and minimalist earrings for everyday styling and occasions.",
    coverImage: "/blog-images/blog-image-102.jpg",
    publishedAt: "2025-05-18",
    readTime: "13 min read",
    tags: [
      "ear stacks",
      "studs",
      "huggies",
      "earrings",
      "lab-grown",
      "styling",
    ],
  },
  {
    slug: "gold-vs-white-vs-rose-gold-lab-grown-diamond-earrings",
    categorySlug: "lab-grown-diamond-guides",
    title:
      "Gold vs White vs Rose Gold Lab-Grown Diamond Earrings: Metal Colour Guide",
    excerpt:
      "Compare gold, white and rose gold lab grown diamond earrings. Choose the best metal colour for everyday wear, gifts, weddings and styling.",
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
  {
    slug: "anniversary-jewellery-gifts",
    categorySlug: "jewellery-gift-guides",
    title: "Anniversary Jewellery Gifts: Romantic Earrings She Will Actually Wear",
    excerpt:
      "Choose anniversary jewellery gifts with lab grown diamond earrings, butterfly earrings, studs, drops, huggies and romantic gift ideas.",
    coverImage: "/blog-images/blog-image-87.jpg",
    publishedAt: "2025-09-03",
    readTime: "16 min read",
    tags: ["anniversary gifts", "butterfly earrings", "romantic", "studs", "earrings", "lab-grown"],
  },
  {
    slug: "birthday-jewellery-gifts",
    categorySlug: "jewellery-gift-guides",
    title: "Birthday Jewellery Gifts: Earrings She Will Actually Wear After Her Birthday",
    excerpt:
      "Choose birthday jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and meaningful gift ideas.",
    coverImage: "/blog-images/blog-image-85.jpg",
    publishedAt: "2025-08-30",
    readTime: "16 min read",
    tags: ["birthday gifts", "butterfly earrings", "studs", "earrings", "meaningful", "lab-grown"],
  },
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
    title:
      "Date Night Jewellery Guide: What Earrings to Wear for Dinner, Drinks & Romantic Outfits",
    excerpt:
      "Choose date night jewellery with lab grown diamond earrings, studs, drops, hoops, butterfly earrings and romantic styling ideas.",
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
    title: "How to Stack Earrings: A Complete Ear Stack Styling Guide",
    excerpt:
      "Learn how to stack earrings with studs, huggies, hoops, drops and lab grown diamond earrings for everyday, wedding and party looks.",
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
    title:
      "Diamond Ear Stack Ideas: Everyday, Minimalist, Wedding & Party Looks",
    excerpt:
      "Explore diamond ear stack ideas with studs, huggies, hoops, drops and lab grown diamond earrings for everyday, wedding and party looks.",
    coverImage: "/blog-images/blog-image-67.jpg",
    publishedAt: "2025-07-25",
    readTime: "13 min read",
    tags: [
      "diamond ear stacks",
      "ear stack ideas",
      "earring styling",
      "studs",
      "huggies",
      "lab-grown",
    ],
  },
  {
    slug: "minimalist-earrings-guide",
    categorySlug: "earring-style-guides",
    title: "Minimalist Earrings Guide: Simple Earrings for Everyday Styling",
    excerpt:
      "Learn how to choose minimalist earrings for everyday wear, work outfits, ear stacks, gifts and simple lab grown diamond styling.",
    coverImage: "/blog-images/blog-image-69.jpg",
    publishedAt: "2025-07-29",
    readTime: "12 min read",
    tags: [
      "minimalist earrings",
      "everyday wear",
      "earring styling",
      "studs",
      "huggies",
      "lab-grown",
    ],
  },
  {
    slug: "stud-vs-huggie-earrings",
    categorySlug: "earring-style-guides",
    title: "Stud vs Huggie Earrings: Which Style Should You Choose?",
    excerpt:
      "Compare stud and huggie earrings for everyday wear, ear stacks, gifts, workwear and lab grown diamond styling.",
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
    title: "Hoop vs Huggie Earrings: Which Style Should You Choose?",
    excerpt:
      "Compare hoop and huggie earrings for everyday wear, ear stacks, gifts, workwear, parties and lab grown diamond styling.",
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
    title:
      "Party Earrings Guide: What Earrings to Wear for Evening Looks, Dinners & Celebrations",
    excerpt:
      "Choose party earrings for black dresses, satin outfits, dinners, weddings, birthdays and evening looks with lab grown diamond styling ideas.",
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
    title:
      "Bold Statement Earrings Guide: How to Style Strong Sparkle Without Overdoing It",
    excerpt:
      "Learn how to style bold statement earrings for parties, black dresses, weddings, dinners, birthdays and evening outfits.",
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
    title:
      "What Jewellery to Wear with a Black Dress: Earrings, Metals & Styling Guide",
    excerpt:
      "Choose jewellery for a black dress with earrings, diamonds, gold, silver, rose gold, party looks, weddings and evening outfit styling.",
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
    title:
      "What Jewellery to Wear with a Satin Dress: Earrings, Metals & Styling Guide",
    excerpt:
      "Choose jewellery for a satin dress with earrings, gold, silver, diamonds, party looks, wedding guest outfits and evening styling ideas.",
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
    title:
      "What Jewellery to Wear with a V-Neck Dress: Earrings, Necklaces & Styling Guide",
    excerpt:
      "Choose jewellery for a V neck dress with earrings, necklaces, diamonds, gold, party looks, weddings and evening styling ideas.",
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
    title:
      "What Jewellery to Wear with a Sweetheart Neckline: Earrings, Necklaces & Styling Guide",
    excerpt:
      "Choose jewellery for a sweetheart neckline dress with earrings, necklaces, diamonds, gold, wedding guest looks and party styling ideas.",
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
    title:
      "What Earrings to Wear with an Off-Shoulder Dress: Styling Guide for Weddings, Parties & Evening Looks",
    excerpt:
      "Choose earrings for an off shoulder dress with diamonds, drops, hoops, studs, gold, party looks, wedding guest outfits and evening styling ideas.",
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
  {
    slug: "gold-vs-white-vs-rose-gold-diamond-earrings",
    categorySlug: "earring-style-guides",
    title:
      "Gold vs White vs Rose Gold Lab-Grown Diamond Earrings: Which Metal Colour Should You Choose?",
    excerpt:
      "Compare gold, white and rose gold lab grown diamond earrings for everyday wear, gifts, weddings, parties, skin tone and outfit styling.",
    coverImage: "/blog-images/blog-image-91.jpg",
    publishedAt: "2025-09-11",
    readTime: "15 min read",
    tags: [
      "metal colour",
      "gold",
      "white gold",
      "rose gold",
      "lab-grown diamond earrings",
      "earring styling",
    ],
  },
  {
    slug: "what-jewellery-to-wear-with-a-green-dress",
    categorySlug: "earring-style-guides",
    title:
      "What Jewellery to Wear with a Green Dress: Earrings, Metals & Styling Guide",
    excerpt:
      "Choose jewellery for a green dress with gold, silver, rose gold, diamond earrings, wedding guest looks, party styling and outfit ideas.",
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
    title:
      "What Jewellery to Wear with a Red Dress: Earrings, Metals & Styling Guide",
    excerpt:
      "Choose jewellery for a red dress with gold, silver, rose gold, diamond earrings, party looks, wedding guest outfits and evening styling ideas.",
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
    title:
      "Minimalist Jewellery Styling Guide: How to Style Simple Jewellery for Everyday, Work & Occasions",
    excerpt:
      "Learn how to style minimalist jewellery with earrings, studs, huggies, lab grown diamonds, workwear, gifts, weddings and everyday outfits.",
    coverImage: "/blog-images/blog-image-97.jpg",
    publishedAt: "2025-09-23",
    readTime: "15 min read",
    tags: [
      "minimalist jewellery",
      "earring styling",
      "everyday wear",
      "workwear",
      "studs",
      "lab-grown",
    ],
  },
  {
    slug: "lab-grown-diamond-hoop-earrings-guide",
    categorySlug: "earring-style-guides",
    title:
      "Lab-Grown Diamond Hoop Earrings Guide: How to Choose and Style Diamond Hoops",
    excerpt:
      "Learn how to choose lab grown diamond hoop earrings for everyday wear, parties, weddings, gifts, ear stacks and outfit styling.",
    coverImage: "/blog-images/blog-image-99.jpg",
    publishedAt: "2025-09-27",
    readTime: "14 min read",
    tags: [
      "hoop earrings",
      "lab-grown diamond earrings",
      "earring styling",
      "ear stacks",
      "everyday wear",
      "lab-grown",
    ],
  },
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
  {
    slug: "can-you-wear-lab-grown-diamond-earrings-every-day",
    categorySlug: "earring-style-guides",
    title:
      "Can You Wear Lab-Grown Diamond Earrings Every Day? Daily Wear, Care & Styling Guide",
    excerpt:
      "Learn if lab grown diamond earrings are good for everyday wear, work, sleep, showering, sensitive ears, care, gifts and daily styling.",
    coverImage: "/blog-images/blog-image-103.jpg",
    publishedAt: "2025-10-05",
    readTime: "14 min read",
    tags: [
      "everyday earrings",
      "daily wear",
      "lab-grown diamond earrings",
      "earring care",
      "workwear",
      "lab-grown",
    ],
  },
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
  {
    slug: "new-year-jewellery-gifts",
    categorySlug: "jewellery-care-guides",
    title: "New Year Jewellery Gifts: Earrings for a Fresh Start and Every Celebration After",
    excerpt:
      "Choose New Year jewellery gifts with lab grown diamond earrings, studs, huggies, butterfly earrings, drops, hoops and party-ready gift ideas.",
    coverImage: "/blog-images/blog-image-11.jpg",
    publishedAt: "2025-10-01",
    readTime: "17 min read",
    tags: ["new year gifts", "party jewellery", "butterfly earrings", "studs", "earrings", "lab-grown"],
  },
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
