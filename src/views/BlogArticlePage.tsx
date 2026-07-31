'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogSidebar from '@/components/shared/BlogSidebar';
import DynamicArticle, { type ArticleSection } from '@/components/shared/DynamicArticle';
import { useLocalizedBlogTitle } from '@/hooks/useLocalizedContent';

type BlogArticlePageProps = {
  slug: string;
  h1: string;
  coverImage: string;
  sections: ArticleSection[];
};

function isCorruptedTranslation(value: string) {
  return value.includes('MYMEMORY WARNING');
}

export default function BlogArticlePage({
  slug,
  h1,
  coverImage,
  sections,
}: BlogArticlePageProps) {
  const fallbackTitle = isCorruptedTranslation(h1) ? '' : h1;
  const title = useLocalizedBlogTitle(slug, fallbackTitle);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="relative mx-auto mb-20 flex max-w-7xl flex-col gap-12 px-4 py-16 lg:flex-row">
        <div className="w-full flex-1 lg:w-2/3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImage} alt="" className="mb-6 h-auto w-full" />
          <h1 className="mb-6 font-play text-4xl font-semibold text-[#1f2732] md:text-5xl">
            {title}
          </h1>
          <DynamicArticle sections={sections} />
        </div>
        <BlogSidebar
          className="h-fit w-full lg:sticky lg:top-24 lg:w-1/3"
          currentHref={`/blogs/${slug}`}
        />
      </div>
      <Footer />
    </div>
  );
}
