import type { MetadataRoute } from "next";

const BASE_URL = "https://iwantjewels.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Keep private / non-indexable areas out of search results.
            disallow: [
                "/admin",
                "/cart",
                "/checkout",
                "/wishlist",
                "/profile",
                "/orders",
                "/tickets",
                "/login",
                "/register",
                "/reset-password",
                "/verify-otp",
                "/help",
            ],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
