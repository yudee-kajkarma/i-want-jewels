import type { ArticleSection } from '@/components/shared/DynamicArticle';
import { fallbackLng, languages } from '@/i18n/settings';

export type BlogPostContent = {
  meta: { title: string; description: string };
  h1: string;
  coverImage: string;
  sections: ArticleSection[];
};

function isCorruptedTranslation(content: unknown) {
  return JSON.stringify(content).includes('MYMEMORY WARNING');
}

export async function loadBlogPostContent(
  locale: string,
  slug: string,
): Promise<BlogPostContent | null> {
  const localesToTry = locale === fallbackLng ? [fallbackLng] : [locale, fallbackLng];

  for (const lng of localesToTry) {
    try {
      const mod = await import(`./blogs/${lng}/${slug}.json`);
      const content = mod.default as BlogPostContent;
      if (lng !== fallbackLng && isCorruptedTranslation(content)) continue;
      return content;
    } catch {
      // try next locale
    }
  }

  return null;
}

export async function getAllBlogSlugs() {
  const { blogLinks } = await import('@/components/shared/blogList');
  return blogLinks.map((link) => link.href.replace('/blogs/', ''));
}

export const blogContentLocales = languages;
