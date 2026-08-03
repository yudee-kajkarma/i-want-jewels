import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localizedAlternates } from "@/i18n/metadata";
import ResourceArticleV2Page from "@/views/ResourceArticleV2Page";
import {
  getArticleBySlug,
  getCategoryBySlug,
  getRelatedArticles,
} from "@/data/resources";
import { loadResourceArticleContent } from "@/content/loadResourceArticle";

type PageParams = { locale: string; category: string; slug: string };

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const content = await loadResourceArticleContent(locale, category, slug);
  if (!content) return {};

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: localizedAlternates(`/resources/${category}/${slug}`, locale),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, category, slug } = await params;
  const categoryData = getCategoryBySlug(category);
  const article = getArticleBySlug(category, slug);
  const content = await loadResourceArticleContent(locale, category, slug);

  if (!categoryData || !article || !content) notFound();

  const relatedArticles = getRelatedArticles(category, slug, 3);

  return (
    <ResourceArticleV2Page
      category={categoryData}
      article={article}
      relatedArticles={relatedArticles}
      heroIntro={content.heroIntro}
      quickSummary={content.quickSummary}
      content={content.content}
      faq={content.faq}
      cta={content.cta}
    />
  );
}
