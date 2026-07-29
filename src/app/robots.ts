import type { MetadataRoute } from "next";
import { languages } from "@/i18n/settings";

const BASE_URL = "https://www.iwantjewels.com";

const PRIVATE_PATHS = [
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
    "/account",
    "/payments",
];

export default function robots(): MetadataRoute.Robots {
    const disallowRules = Array.from(
        new Set([
            ...PRIVATE_PATHS,
            ...PRIVATE_PATHS.map((path) => `/*${path}`),
            ...PRIVATE_PATHS.flatMap((path) =>
                languages.map((locale) => `/${locale}${path}`)
            ),
        ])
    );

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: disallowRules,
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
