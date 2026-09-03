/**
 * schema.org JSON-LD for search engines.
 *
 * Ported from the Shopify Liquid snippets supplied by SEO (Mayank, 3 Sep 2026).
 * Liquid cannot run here, so each schema is rebuilt from our own data; the
 * emitted JSON matches what those snippets would have produced.
 */
import type { ProductDetail } from "../types/product";

import {
  LOGO_PATH,
  PAYMENT_ACCEPTED,
  PRICE_CURRENCY,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "./siteProfile";

export { SITE_NAME, SITE_URL };

/** Site-wide. `@id` lets the other schemas reference this node. */
export function websiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        // We have no /search route — search runs through the products listing.
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Site-wide. */
export function jewelryStoreSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "JewelryStore",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${LOGO_PATH}`,
    },
    image: `${SITE_URL}${LOGO_PATH}`,
    description: SITE_DESCRIPTION,
    currenciesAccepted: PRICE_CURRENCY,
    paymentAccepted: PAYMENT_ACCEPTED,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

/** Product pages only. One Offer per variant, as in the Liquid original. */
export function productSchema(product: ProductDetail) {
  const productUrl = `${SITE_URL}/products/${product.slug || product.id}`;

  // The lead image is often also the first variant's thumbnail; repeating a
  // URL adds nothing and reads as padding.
  const images = Array.from(
    new Set(
      [
        product.primaryImage,
        ...product.variants.map((variant) => variant.thumbnail),
      ].filter(Boolean),
    ),
  ).slice(0, 5);

  const offers = product.variants.map((variant) => ({
    "@type": "Offer",
    url: productUrl,
    priceCurrency: PRICE_CURRENCY,
    price: variant.price.eur.toFixed(2),
    itemCondition: "https://schema.org/NewCondition",
    availability: variant.available
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    seller: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": productUrl,
    name: product.title,
    description: product.description
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .split(" ")
      .slice(0, 60)
      .join(" "),
    image: images,
    brand: {
      "@type": "Brand",
      name: product.vendor || SITE_NAME,
    },
    category: product.category || "Jewelry",
    sku: product.variants[0]?.sku || product.id,
    offers,
  };
}

/**
 * FAQ page only, built from the same translated copy the page renders — so it
 * stays correct in every language and cannot drift from the visible questions.
 */
export function faqPageSchema(
  t: (key: string) => string,
  maxQuestions = 40,
) {
  const mainEntity = [];

  // i18next echoes the key back when it is missing, which is how absence reads.
  const lookup = (key: string) => {
    const value = t(key);
    return value === key ? "" : value;
  };

  for (let index = 1; index <= maxQuestions; index += 1) {
    const question = lookup(`faq.q.q${index}`);

    // A few answers are split into parts because the page renders them with
    // links; join them back into the single string schema expects.
    let answer = lookup(`faq.q.a${index}`);
    if (!answer) {
      const parts = [];
      for (let part = 1; part <= 5; part += 1) {
        const value = lookup(`faq.q.a${index}_${part}`);
        if (value) parts.push(value);
      }
      answer = parts.join(" ");
    }

    if (!question || !answer) {
      continue;
    }

    mainEntity.push({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
