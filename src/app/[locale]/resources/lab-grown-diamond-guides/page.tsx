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
    "labGrownDiamondGuides",
    "/resources/lab-grown-diamond-guides",
  );
}

export default function Page() {
  const category = getCategoryBySlug("lab-grown-diamond-guides");
  const articles = getArticlesByCategory("lab-grown-diamond-guides");
  if (!category) notFound();
  return <ResourceCategoryPage category={category} articles={articles} />;
}
