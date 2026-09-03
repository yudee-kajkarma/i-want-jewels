/**
 * Brand facts used by both the rendered site and its structured data.
 *
 * Kept in one place so the schema can never drift from what visitors see —
 * a mismatch is exactly what search engines penalise.
 */
export const SITE_URL = "https://www.iwantjewels.com";
export const SITE_NAME = "I Want Jewels";

export const SITE_DESCRIPTION =
  "Everyday lab-grown diamond jewellery crafted in 14K gold and 925 sterling silver.";

/** Prices are stored in EUR; schema declares that base, not the viewer's display currency. */
export const PRICE_CURRENCY = "EUR";

export const PAYMENT_ACCEPTED = "Credit Card, PayPal, Apple Pay, Google Pay";

export const LOGO_PATH = "/logofooter.png";

/** Rendered in the footer and published as `sameAs`. One list, one truth. */
export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/iwantjewels/" },
  { name: "Facebook", href: "https://www.facebook.com/iwjewels/" },
  { name: "TikTok", href: "https://www.tiktok.com/@iwantjewelsofficial" },
];
