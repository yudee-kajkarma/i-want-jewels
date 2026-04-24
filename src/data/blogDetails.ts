import ringImage from "../assets/image/ring.jpeg";
import { BLOG_POSTS, type BlogPost } from "./blogPosts";

export type BlogDetailSection = {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
};

export type BlogDetail = BlogPost & {
    heroTitle: string;
    sections: BlogDetailSection[];
};

const labGrownBelgiumSections: BlogDetailSection[] = [
    {
        heading: "Introduction",
        paragraphs: [
            "Belgium is one of the most trusted countries in the world for diamonds. For hundreds of years, buyers, traders, and jewellers have come to Belgium to buy high-quality stones.",
            "Today, a modern option is growing fast: lab-grown diamonds in Belgium. They are real diamonds, often more affordable, and now preferred by many customers for ethical and sustainability reasons.",
            "This guide explains in simple language why Belgium remains one of the best places to buy lab-grown diamonds.",
        ],
    },
    {
        heading: "What Are Lab-Grown Diamonds?",
        paragraphs: [
            "Lab-grown diamonds are real diamonds created in a controlled environment using advanced technology that replicates natural formation.",
            "They have the same hardness, sparkle, chemical structure, and physical properties as natural diamonds.",
            "Like natural stones, they are graded with the 4Cs.",
        ],
        bullets: ["Cut", "Color", "Clarity", "Carat"],
    },
    {
        heading: "Why They Are Popular in Belgium",
        paragraphs: [
            "Price advantage: Lab-grown stones usually cost less than natural diamonds at similar quality, giving buyers more flexibility.",
            "Ethical value: They reduce mining impact and align with responsible purchasing priorities.",
            "Trusted grading: Buyers in Belgium commonly choose stones certified by IGI for quality assurance.",
        ],
    },
    {
        heading: "Why Antwerp Matters",
        paragraphs: [
            "Antwerp has been the center of global diamond expertise for centuries. Its network of traders, cutters, and certified suppliers creates a reliable buying environment.",
            "Buying from Antwerp gives access to strong expertise, transparent quality standards, and competitive market options.",
        ],
    },
    {
        heading: "Frequently Asked Question",
        paragraphs: [
            "Are lab-grown diamonds a good investment? They are best viewed as a value and design choice for jewellery, rather than a traditional investment asset.",
            "Which country makes the best lab-grown diamonds? Quality depends more on production and certification standards than country of origin. Always prioritize credible grading reports.",
        ],
    },
    {
        heading: "Conclusion",
        paragraphs: [
            "Demand for lab-grown diamonds in Belgium continues to rise as buyers seek transparency, value, and modern luxury.",
            "For customers who want trusted quality and clear guidance, Antwerp remains one of the strongest places to buy with confidence.",
        ],
    },
];

const blogDetailOverrides: Record<string, Partial<BlogDetail>> = {
    "lab-grown-diamonds-styling-care": {
        heroTitle:
            "Lab Grown Diamonds in Belgium - A Complete Guide by I Want Jewels",
        sections: labGrownBelgiumSections,
        image: ringImage.src,
    },
};

function buildFallbackSections(post: BlogPost): BlogDetailSection[] {
    return [
        {
            heading: "Overview",
            paragraphs: [
                post.excerpt,
                "This article is currently using editable placeholder content so your team can quickly switch to API data later.",
            ],
        },
        {
            heading: "Key Takeaways",
            paragraphs: [
                "Use this section to add practical advice and product relevance.",
                "You can structure long-form content with headings, bullets, and FAQ entries.",
            ],
            bullets: [
                "Simple and readable content blocks",
                "Mobile-first spacing and typography",
                "Easy API replacement path",
            ],
        },
        {
            heading: "Conclusion",
            paragraphs: [
                "Update this conclusion with a clear summary and a practical next step for customers.",
            ],
        },
    ];
}

export function getBlogDetailBySlug(slug: string): BlogDetail | null {
    const post = BLOG_POSTS.find((entry) => entry.slug === slug);

    if (!post) {
        return null;
    }

    const override = blogDetailOverrides[slug];

    return {
        ...post,
        heroTitle: override?.heroTitle ?? post.title,
        sections: override?.sections ?? buildFallbackSections(post),
        image: override?.image ?? post.image,
    };
}

export function getMoreTopics(currentSlug: string, limit = 8): BlogPost[] {
    return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
