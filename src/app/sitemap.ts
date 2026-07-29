import type { MetadataRoute } from "next";
import { blogLinks } from "@/components/shared/blogList";
import { resourceArticles, resourceCategories } from "@/data/resources";
import { getAllProducts, getProductCategories } from "@/services/productService";
import { categorySlug } from "@/utils/categorySlug";
import { languages } from "@/i18n/settings";

const BASE_URL = "https://www.iwantjewels.com";

export const revalidate = 3600;

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
    { path: "/help", changeFrequency: "monthly", priority: 0.4 },
    { path: "/gift-cards", changeFrequency: "monthly", priority: 0.6 },
    { path: "/resources", changeFrequency: "weekly", priority: 0.8 },
];

function generateLocalizedEntries(basePath: string, lastModified: Date, changeFrequency: any, priority: number): MetadataRoute.Sitemap {
    return languages.map((locale) => {
        const path = basePath === "/" ? "" : basePath;
        const localePath = `/${locale}${path}`;
        
        const alternates = languages.reduce((acc, altLocale) => {
            acc[altLocale] = `${BASE_URL}/${altLocale}${path}`;
            return acc;
        }, {} as Record<string, string>);

        return {
            url: `${BASE_URL}${localePath}`,
            lastModified,
            changeFrequency,
            priority,
            alternates: {
                languages: alternates
            }
        };
    });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const lastModified = new Date();

    const staticEntries = STATIC_ROUTES.flatMap((route) => 
        generateLocalizedEntries(route.path, lastModified, route.changeFrequency, route.priority)
    );

    const blogEntries = blogLinks.flatMap((blog) => 
        generateLocalizedEntries(blog.href, lastModified, "monthly", 0.7)
    );

    const resourceCategoryEntries = resourceCategories.flatMap((category) => 
        generateLocalizedEntries(category.href, lastModified, "weekly", 0.7)
    );

    const resourceArticleEntries = resourceArticles.flatMap((article) => 
        generateLocalizedEntries(`/resources/${article.categorySlug}/${article.slug}`, lastModified, "monthly", 0.7)
    );

    let categoryEntries: MetadataRoute.Sitemap = [];
    try {
        const categories = await getProductCategories();
        categoryEntries = categories.flatMap((category) => 
            generateLocalizedEntries(`/category/${categorySlug(category)}`, lastModified, "weekly", 0.9)
        );
    } catch (error) {
        console.error("sitemap: failed to load categories", error);
    }

    let productEntries: MetadataRoute.Sitemap = [];
    try {
        const products = await getAllProducts();
        productEntries = products
            .filter((product) => Boolean(product.slug))
            .flatMap((product) => 
                generateLocalizedEntries(`/products/${product.slug}`, lastModified, "weekly", 0.8)
            );
    } catch (error) {
        console.error("sitemap: failed to load products", error);
    }

    return [
        ...staticEntries,
        ...categoryEntries,
        ...blogEntries,
        ...resourceCategoryEntries,
        ...resourceArticleEntries,
        ...productEntries,
    ];
}
