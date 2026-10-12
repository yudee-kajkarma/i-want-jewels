import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getAbsoluteLocalizedUrl, localizedAlternates, buildPageMetadata } from "@/i18n/metadata";
import { getProductSeoOverride } from "../../../../data/productSeo";
import { getCopy } from "../../../../data/collections";
import {
  getProductBySlug,
  getProductReviews,
  isProductNotFoundError,
} from "../../../../services/productService";
import ProductDetailPage from "../../../../views/ProductDetailPage";
import { formatPrice } from "../../../../utils/price";
import { productSchema, serializeJsonLd, SITE_URL } from "../../../../lib/structuredData";

export const dynamic = "force-dynamic";

/** Backend API path segments — not real product slugs. */
const RESERVED_PRODUCT_SLUGS = new Set(["random", "categories", "all-filters"]);

function assertProductSlug(slug: string) {
  if (RESERVED_PRODUCT_SLUGS.has(slug)) notFound();
}

// `locale` is part of the cache key: the same slug returns different copy per
// language, so caching on slug alone would serve one locale's text to all.
const getInitialProductData = cache(async (slug: string, locale: string) => {
  const product = await getProductBySlug(slug, locale);
  // A reviews hiccup must not take down a live product page.
  const reviewsData = await getProductReviews(product.id).catch(() => null);

  return { product, reviewsData };
});

type ProductPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  assertProductSlug(slug);

  try {
    const { product } = await getInitialProductData(slug, locale);
    const image = product.primaryImage || product.variants[0]?.thumbnail;
    const fallbackDescription = `${product.description.slice(0, 140)}${product.description.length > 140 ? "..." : ""}`;
    const seo = getProductSeoOverride(product.slug || slug, locale);
    const title = seo?.metaTitle || product.metaTitle || `${product.title} | I Want Jewels`;
    const description = seo?.metaDescription || product.metaDescription || fallbackDescription;

    return {
      // The navbar plan's title already ends in "| I Want Jewels"; keep the
      // layout's title template from adding it twice.
      title: seo ? { absolute: title } : title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        images: image ? [image] : undefined,
      },
      alternates: localizedAlternates(
        `/products/${product.slug || product.id}`,
        locale,
      ),
      keywords: [
        product.category,
        ...product.metals,
        product.vendor,
        formatPrice(product.minPrice, "eur"),
      ],
    };
  } catch (error) {
    if (isProductNotFoundError(error)) notFound();

    return buildPageMetadata(
      locale,
      "productDetailFallback",
      `/products/${slug}`,
    );
  }
}

export default async function Page({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  assertProductSlug(slug);

  let initialData: Awaited<ReturnType<typeof getInitialProductData>>;
  try {
    initialData = await getInitialProductData(slug, locale);
  } catch (error) {
    // Deleted or renamed products must answer with a real 404 status so
    // search engines drop the URL instead of indexing an empty shell.
    if (isProductNotFoundError(error)) notFound();
    throw error;
  }

  const { product } = initialData;
  const seo = getProductSeoOverride(product.slug || slug, locale);
  const baseSchema = productSchema(product);

  // Products in the navbar plan also get a WebPage + breadcrumb graph (Home ›
  // Shop › category › product) around the same Product node.
  let structuredData: unknown = baseSchema;
  if (seo) {
    const url = getAbsoluteLocalizedUrl(`/products/${product.slug || product.id}`, locale);
    const productNode: Record<string, unknown> = { ...baseSchema };
    delete productNode["@context"];
    structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: seo.h1,
          description: seo.metaDescription,
          inLanguage: locale,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          mainEntity: { "@id": productNode["@id"] },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            { name: getCopy(locale).crumbs.home, item: getAbsoluteLocalizedUrl("/", locale) },
            { name: getCopy(locale).crumbs.shop, item: getAbsoluteLocalizedUrl("/products", locale) },
            { name: seo.parent.name, item: getAbsoluteLocalizedUrl(`/category/${seo.parent.slug}`, locale) },
            { name: seo.h1, item: url },
          ].map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })),
        },
        { ...productNode, description: seo.metaDescription, material: seo.material },
      ],
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <ProductDetailPage
        initialProduct={product}
        initialReviewsData={initialData.reviewsData}
        headingOverride={seo?.h1}
      />
    </>
  );
}
