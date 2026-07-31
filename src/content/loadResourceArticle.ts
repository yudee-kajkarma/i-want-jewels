import type {
  V2ArticleSection,
  V2CTABlock,
  V2FAQItem,
  V2HeroIntro,
  V2QuickSummary,
} from '@/views/ResourceArticleV2Page';
import { fallbackLng, languages } from '@/i18n/settings';

export type ResourceArticleContent = {
  meta: { title: string; description: string };
  heroIntro: V2HeroIntro;
  quickSummary: V2QuickSummary;
  content: V2ArticleSection[];
  faq?: V2FAQItem[];
  cta?: V2CTABlock;
};

function isCorruptedTranslation(content: unknown) {
  return JSON.stringify(content).includes('MYMEMORY WARNING');
}

export async function loadResourceArticleContent(
  locale: string,
  category: string,
  slug: string,
): Promise<ResourceArticleContent | null> {
  const localesToTry = locale === fallbackLng ? [fallbackLng] : [locale, fallbackLng];

  for (const lng of localesToTry) {
    try {
      const mod = await import(`./resources/${lng}/${category}/${slug}.json`);
      const content = mod.default as ResourceArticleContent;
      if (lng !== fallbackLng && isCorruptedTranslation(content)) continue;
      return content;
    } catch {
      // try next locale
    }
  }

  return null;
}

export async function getAllResourceArticleParams() {
  const { resourceArticles } = await import('@/data/resources');
  return resourceArticles.map((article) => ({
    category: article.categorySlug,
    slug: article.slug,
  }));
}

export const resourceContentLocales = languages;
