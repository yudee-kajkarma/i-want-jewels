import type { MetadataRoute } from "next";
import { localizedLanguages } from "@/i18n/routing";

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

/** Legacy English prefix paths that 308-redirect to root. */
const LEGACY_ENGLISH_PREFIXES = ["/en", "/eng", "/english", "/en-us", "/en-gb"];

export default function robots(): MetadataRoute.Robots {
    const disallowRules = Array.from(
        new Set([
            ...PRIVATE_PATHS,
            ...PRIVATE_PATHS.flatMap((path) =>
                localizedLanguages.map((locale) => `/${locale}${path}`),
            ),
            ...LEGACY_ENGLISH_PREFIXES,
            ...LEGACY_ENGLISH_PREFIXES.flatMap((prefix) =>
                PRIVATE_PATHS.map((path) => `${prefix}${path}`),
            ),
        ]),
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
