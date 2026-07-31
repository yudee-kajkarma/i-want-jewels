import { buildPageMetadata } from "@/i18n/metadata";
import ResourceCategoryPage from "../../../../views/ResourceCategoryPage";
import {
  getCategoryBySlug,
  getArticlesByCategory,
} from "../../../../data/resources";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(
    locale,
    "jewelleryGiftGuides",
    "/resources/jewellery-gift-guides",
  );
}

export default function Page() {
  const category = getCategoryBySlug("jewellery-gift-guides");
  const articles = getArticlesByCategory("jewellery-gift-guides");
  if (!category) notFound();
  return <ResourceCategoryPage category={category} articles={articles} />;
}
