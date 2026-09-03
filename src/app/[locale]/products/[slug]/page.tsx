import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { localizedAlternates, buildPageMetadata } from "@/i18n/metadata";
import {
  getProductBySlug,
  getProductReviews,
  isProductNotFoundError,
} from "../../../../services/productService";
import ProductDetailPage from "../../../../views/ProductDetailPage";
import { formatPrice } from "../../../../utils/price";
import { productSchema } from "../../../../lib/structuredData";

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
    const title = product.metaTitle || `${product.title} | I Want Jewels`;
    const description = product.metaDescription || fallbackDescription;

    return {
      title,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(initialData.product)),
        }}
      />
      <ProductDetailPage
        initialProduct={initialData.product}
        initialReviewsData={initialData.reviewsData}
      />
    </>
  );
}
