import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { localizedAlternates } from "@/i18n/metadata";
import BlogArticlePage from "@/views/BlogArticlePage";
import { getLocalizedStaticParams } from "@/i18n/settings";
import { getAllBlogSlugs, loadBlogPostContent } from "@/content/loadBlogPost";

type PageParams = { locale: string; slug: string };

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return getLocalizedStaticParams().flatMap(({ locale }) =>
    slugs.map((slug) => ({ locale, slug })),
  );
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
