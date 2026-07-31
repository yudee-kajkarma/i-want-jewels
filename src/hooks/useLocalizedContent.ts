import { useTranslation } from 'react-i18next';
import type { ResourceArticle, ResourceCategory } from '@/data/resources';

export function useLocalizedCategory(category: ResourceCategory): ResourceCategory {
  const { t } = useTranslation('resources-meta');

  return {
    ...category,
    title: t(`categories.${category.slug}.title`, { defaultValue: category.title }),
    description: t(`categories.${category.slug}.description`, {
      defaultValue: category.description,
    }),
  };
}

export function useLocalizedArticle(article: ResourceArticle): ResourceArticle {
  const { t } = useTranslation('resources-meta');
  const key = `${article.categorySlug}/${article.slug}`;
  const meta = t(`articles.${key}`, { returnObjects: true, defaultValue: {} }) as {
    title?: string;
    excerpt?: string;
    readTime?: string;
    tags?: string[];
  };

  return {
    ...article,
    title: meta.title ?? article.title,
    excerpt: meta.excerpt ?? article.excerpt,
    readTime: meta.readTime ?? article.readTime,
    tags: Array.isArray(meta.tags) ? meta.tags : article.tags,
  };
}

export function useLocalizedBlogTitle(slug: string, fallback: string): string {
  const { t } = useTranslation('blogs-meta');
  return t(`posts.${slug}.title`, { defaultValue: fallback });
}
