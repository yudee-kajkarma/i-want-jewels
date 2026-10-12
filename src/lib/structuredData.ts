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

type ListedProduct = { title: string; url: string };

export type CollectionGraphInput = {
  url: string;
  name: string;
  description: string;
  locale: string;
  breadcrumbs: Array<{ name: string; url: string }>;
  /** The product cards rendered in the page's main grid, in order. */
  products: ListedProduct[];
  /** In-page sections (parent pages), each with the cards it renders. */
  sections?: Array<{
    anchor: string;
    name: string;
    description: string;
    products: ListedProduct[];
  }>;
};

function productList(id: string, name: string, products: ListedProduct[]) {
  return {
    "@type": "ItemList",
    "@id": id,
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.title,
      url: product.url,
    })),
  };
}

/**
 * Category and collection pages: CollectionPage + BreadcrumbList + ItemList,
 * and a WebPageElement + ItemList per in-page section. Built from the same
 * product arrays the page renders, so counts and order always match the grid.
 */
export function collectionPageSchema(page: CollectionGraphInput) {
  const sections = page.sections ?? [];
  const pageNode: Record<string, unknown> = {
    "@type": "CollectionPage",
    "@id": `${page.url}#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    inLanguage: page.locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    breadcrumb: { "@id": `${page.url}#breadcrumb` },
    mainEntity: { "@id": `${page.url}#product-list` },
  };
  if (sections.length) {
    pageNode.hasPart = sections.map((section) => ({
      "@id": `${page.url}#${section.anchor}`,
    }));
  }

  const graph: unknown[] = [
    pageNode,
    {
      "@type": "BreadcrumbList",
      "@id": `${page.url}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    },
    productList(`${page.url}#product-list`, page.name, page.products),
  ];

  for (const section of sections) {
    const id = `${page.url}#${section.anchor}`;
    graph.push(
      {
        "@type": "WebPageElement",
        "@id": id,
        url: id,
        name: section.name,
        description: section.description,
        isPartOf: { "@id": `${page.url}#webpage` },
        mainEntity: { "@id": `${id}-products` },
      },
      productList(`${id}-products`, section.name, section.products),
    );
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** JSON for a server-rendered ld+json script tag (no `</script>` break-out). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
