import braceletImage from "../assets/image/bracelet.jpeg";
import earringImage from "../assets/image/earing1.jpeg";
import necklaceImage from "../assets/image/nackwear.jpeg";
import ringImage from "../assets/image/ring.jpeg";

export type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    slug: string;
    image: string;
};

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "post-1",
        title: "Lab-Grown Diamonds: Styling and Care for Modern Women",
        excerpt:
            "Lab-grown diamonds bring the same brilliance with easier everyday care. Here is how to style and maintain them.",
        publishedAt: "2026-03-03",
        slug: "lab-grown-diamonds-styling-care",
        image: ringImage.src,
    },
    {
        id: "post-2",
        title: "The Women's Day Jewellery Guide You Actually Need",
        excerpt:
            "From office looks to dinner styling, discover combinations that feel polished and personal.",
        publishedAt: "2026-03-02",
        slug: "womens-day-jewellery-guide",
        image: necklaceImage.src,
    },
    {
        id: "post-3",
        title: "Gold vs Silver Jewellery: What Fits You Best",
        excerpt:
            "Learn how skin tone, wardrobe palette, and occasion can help you choose gold or silver quickly.",
        publishedAt: "2026-03-01",
        slug: "gold-vs-silver-jewellery-guide",
        image: braceletImage.src,
    },
    {
        id: "post-4",
        title: "The Everyday Necklace That Elevates Every Outfit",
        excerpt:
            "Simple necklace choices can transform casual looks into polished style with almost no effort.",
        publishedAt: "2026-02-27",
        slug: "everyday-necklace-guide",
        image: necklaceImage.src,
    },
    {
        id: "post-5",
        title: "Timeless Wristwear: Bracelet Types Explained",
        excerpt:
            "Cuffs, chains, bangles, and charm styles explained with practical pairings for daily wear.",
        publishedAt: "2026-02-25",
        slug: "bracelet-types-explained",
        image: braceletImage.src,
    },
    {
        id: "post-6",
        title: "How to Keep Jewellery Safe During Festival Season",
        excerpt:
            "Smart storage, quick cleaning, and practical styling tips to protect your jewellery while celebrating.",
        publishedAt: "2026-02-24",
        slug: "festival-jewellery-safety",
        image: earringImage.src,
    },
    {
        id: "post-7",
        title: "Floral vs Geometric Jewellery: Which Mood Are You",
        excerpt:
            "A simple style framework to help you pick statement pieces that match your mood and wardrobe.",
        publishedAt: "2026-02-21",
        slug: "floral-vs-geometric-jewellery",
        image: ringImage.src,
    },
    {
        id: "post-8",
        title: "How to Match Jewellery with Prints and Patterns",
        excerpt:
            "Balance loud prints with clean silhouettes and subtle sparkle using this easy matching method.",
        publishedAt: "2026-02-19",
        slug: "match-jewellery-with-prints",
        image: necklaceImage.src,
    },
    {
        id: "post-9",
        title: "Minimal Jewellery Styling for Every Occasion",
        excerpt:
            "Minimal pieces can still make impact. Build a repeatable stack for work, events, and weekends.",
        publishedAt: "2026-02-17",
        slug: "minimal-jewellery-styling",
        image: earringImage.src,
    },
    {
        id: "post-10",
        title: "Jewellery Care Tips That Actually Work",
        excerpt:
            "Avoid common mistakes and extend shine with simple weekly habits and no complicated products.",
        publishedAt: "2026-02-15",
        slug: "jewellery-care-tips",
        image: braceletImage.src,
    },
    {
        id: "post-11",
        title: "What Karat Gold Works Best for Daily Wear",
        excerpt:
            "Understand gold karats in plain language and pick the right balance of beauty and durability.",
        publishedAt: "2026-02-13",
        slug: "best-gold-karat-daily-wear",
        image: ringImage.src,
    },
    {
        id: "post-12",
        title: "Why Lab-Grown Diamonds Are Growing Fast",
        excerpt:
            "Sustainability, value, and design flexibility are changing how modern buyers approach diamonds.",
        publishedAt: "2026-02-11",
        slug: "why-lab-grown-diamonds",
        image: earringImage.src,
    },
    {
        id: "post-13",
        title: "Perfect Necklace Length for Every Neckline",
        excerpt:
            "Use this quick neckline chart to pair chains, pendants, and layered looks with confidence.",
        publishedAt: "2026-02-09",
        slug: "necklace-length-for-neckline",
        image: necklaceImage.src,
    },
    {
        id: "post-14",
        title: "Jewellery Layering Guide for Effortless Looks",
        excerpt:
            "Master spacing, proportions, and metal harmony to build layered stacks that feel intentional.",
        publishedAt: "2026-02-07",
        slug: "jewellery-layering-guide",
        image: braceletImage.src,
    },
    {
        id: "post-15",
        title: "Valentine Styling Guide with Fine Jewellery",
        excerpt:
            "Date-night combinations that pair romantic silhouettes with subtle sparkle and confidence.",
        publishedAt: "2026-02-05",
        slug: "valentine-jewellery-styling",
        image: ringImage.src,
    },
    {
        id: "post-16",
        title: "Top Jewellery Trends This Year",
        excerpt:
            "The key trends shaping modern jewellery: soft geometry, mixed textures, and elevated everyday sets.",
        publishedAt: "2026-02-01",
        slug: "jewellery-trends-this-year",
        image: earringImage.src,
    },
    {
        id: "post-17",
        title: "Choosing Earrings for Your Face Shape",
        excerpt:
            "A face-shape-first approach to earrings so every pair frames your features in the best way.",
        publishedAt: "2026-01-02",
        slug: "earrings-for-face-shape",
        image: earringImage.src,
    },
    {
        id: "post-18",
        title: "How to Style Bracelets Without Overdoing It",
        excerpt:
            "Build bracelet stacks with clean contrast and balanced spacing for an effortless finish.",
        publishedAt: "2025-12-24",
        slug: "bracelet-stacking-guide",
        image: braceletImage.src,
    },
];
