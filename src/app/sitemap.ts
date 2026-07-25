import type { MetadataRoute } from "next";
import { blogLinks } from "@/components/shared/blogList";
import { resourceArticles, resourceCategories } from "@/data/resources";
import { getAllProducts } from "@/services/productService";

const BASE_URL = "https://iwantjewels.com";

const CANONICAL_RESOURCE_ARTICLES = new Map<string, string>([
    [
        "can-you-wear-lab-grown-diamond-earrings-every-day",
        "/resources/lab-grown-diamond-guides/can-you-wear-lab-grown-diamond-earrings-every-day",
    ],
    [
        "lab-grown-diamond-earrings-for-gifts",
        "/resources/jewellery-gift-guides/lab-grown-diamond-earrings-for-gifts",
    ],
    [
        "new-year-jewellery-gifts",
        "/resources/occasion-jewellery-guides/new-year-jewellery-gifts",
    ],
    [
        "valentines-day-jewellery-gifts",
        "/resources/jewellery-gift-guides/valentines-day-jewellery-gifts",
    ],
]);

// Regenerate the sitemap at most once per hour so newly added products and
// blogs appear without a full redeploy.
export const revalidate = 3600;

// Public, indexable static routes. Account/auth/checkout/admin pages are
// intentionally excluded since they are private or non-indexable.
const STATIC_ROUTES: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
}> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/products", changeFrequency: "daily", priority: 0.9 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.5 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
    { path: "/gift-cards", changeFrequency: "monthly", priority: 0.6 },
    { path: "/resources", changeFrequency: "weekly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();

    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
        url: `${BASE_URL}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    const blogEntries: MetadataRoute.Sitemap = blogLinks.map((blog) => ({
        url: `${BASE_URL}${blog.href}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    const resourceCategoryEntries: MetadataRoute.Sitemap =
        resourceCategories.map((category) => ({
            url: `${BASE_URL}${category.href}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
        }));

    const resourceArticleEntries: MetadataRoute.Sitemap = resourceArticles
        .filter((article) => {
            const articlePath = `/resources/${article.categorySlug}/${article.slug}`;
            const canonicalPath = CANONICAL_RESOURCE_ARTICLES.get(article.slug);
            return !canonicalPath || canonicalPath === articlePath;
        })
        .map((article) => ({
            url: `${BASE_URL}/resources/${article.categorySlug}/${article.slug}`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.7,
        }));

    let productEntries: MetadataRoute.Sitemap = [];

    if (process.env.NEXT_PUBLIC_API_BASE_URL?.trim()) {
        try {
            const products = await getAllProducts();

            productEntries = products
                .filter((product) => Boolean(product.slug))
                .map((product) => ({
                    url: `${BASE_URL}/products/${product.slug}`,
                    lastModified,
                    changeFrequency: "weekly",
                    priority: 0.8,
                }));
        } catch (error) {
            // If the API is unreachable at build/request time, still emit a valid
            // sitemap with the static and blog routes rather than failing.
            console.error("sitemap: failed to load products", error);
        }
    }

    return [
        ...staticEntries,
        ...blogEntries,
        ...resourceCategoryEntries,
        ...resourceArticleEntries,
        ...productEntries,
    ];
}
