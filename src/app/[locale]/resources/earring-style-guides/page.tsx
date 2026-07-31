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
    "earringStyleGuides",
    "/resources/earring-style-guides",
  );
}

export default function Page() {
  const category = getCategoryBySlug("earring-style-guides");
  const articles = getArticlesByCategory("earring-style-guides");
  if (!category) notFound();
  return <ResourceCategoryPage category={category} articles={articles} />;
}
