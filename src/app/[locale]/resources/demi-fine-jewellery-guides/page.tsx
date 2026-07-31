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
    "demiFineJewelleryGuides",
    "/resources/demi-fine-jewellery-guides",
  );
}

export default function Page() {
  const category = getCategoryBySlug("demi-fine-jewellery-guides");
  const articles = getArticlesByCategory("demi-fine-jewellery-guides");
  if (!category) notFound();
  return <ResourceCategoryPage category={category} articles={articles} />;
}
