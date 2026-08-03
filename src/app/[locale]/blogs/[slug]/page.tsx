import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localizedAlternates } from "@/i18n/metadata";
import BlogArticlePage from "@/views/BlogArticlePage";
import { loadBlogPostContent } from "@/content/loadBlogPost";

type PageParams = { locale: string; slug: string };

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
  const { locale, slug } = await params;
  const content = await loadBlogPostContent(locale, slug);
  if (!content) return {};

  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: localizedAlternates(`/blogs/${slug}`, locale),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  const content = await loadBlogPostContent(locale, slug);
  if (!content) notFound();

  return (
    <BlogArticlePage
      slug={slug}
      h1={content.h1}
      coverImage={content.coverImage}
      sections={content.sections}
    />
  );
}
