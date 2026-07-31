"use client";

import { Link } from "@/lib/router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import type { ResourceArticle, ResourceCategory } from "../data/resources";
import { resourceCategories, getArticleCount } from "../data/resources";
import { useTranslation } from "react-i18next";
import { useLocalizedArticle, useLocalizedCategory } from "@/hooks/useLocalizedContent";

type ResourceCategoryPageProps = {
    category: ResourceCategory;
    articles: ResourceArticle[];
};

function formatDate(value: string, slug?: string, locale = "en-GB"): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    let hash = 0;
    const str = slug || value;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const daysOffset = Math.abs(hash) % 4;

    const baseDate = new Date(2026, 5, 29); // 29 June 2026
    baseDate.setDate(baseDate.getDate() + daysOffset);

    return baseDate.toLocaleDateString(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function ClockIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="h-3.5 w-3.5"
            aria-hidden="true"
        >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6v4l2.5 2.5" strokeLinecap="round" />
        </svg>
    );
}

function ArrowRightIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path
                d="M4 10h12M11 5l5 5-5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArticleCard({ article }: { article: ResourceArticle }) {
    const { t, i18n } = useTranslation('common', { keyPrefix: 'resourceCategory' });
    const localized = useLocalizedArticle(article);
    const href = `/resources/${article.categorySlug}/${article.slug}`;
    const dateLocale = i18n.resolvedLanguage === 'en' ? 'en-GB' : i18n.resolvedLanguage ?? 'en-GB';
    return (
        <article className="group border border-[#eadfd4] bg-white transition duration-300 hover:border-[#d889ac] hover:shadow-[0_12px_32px_rgba(194,110,143,0.1)]">
            <Link to={href} className="block overflow-hidden">
                <div className="relative h-[220px] overflow-hidden bg-[#f6f0ea]">
                    <img
                        src={article.coverImage}
                        alt={localized.title}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                    />
                </div>
            </Link>
            <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    <span>{formatDate(article.publishedAt, article.slug, dateLocale)}</span>
                    <span className="flex items-center gap-1.5">
                        <ClockIcon />
                        {localized.readTime}
                    </span>
                </div>

                {/* Title */}
                <h2 className="mt-3 font-play text-[17px] font-semibold leading-snug text-zinc-900 transition group-hover:text-pink-500 sm:text-[18px]">
                    <Link to={href}>{localized.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="mt-2.5 text-[13px] leading-6 text-zinc-600 line-clamp-2">
                    {localized.excerpt}
                </p>

                {/* Tags */}
                {localized.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {localized.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="border border-zinc-200 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Read link */}
                <Link
                    to={href}
                    className="mt-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition group-hover:text-pink-500"
                >
                    <span>{t('readArticle')}</span>
                    <ArrowRightIcon />
                </Link>
            </div>
        </article>
    );
}

function OtherCategoryCard({ cat }: { cat: ResourceCategory }) {
    const { t } = useTranslation('common', { keyPrefix: 'resourceCategory' });
    const localized = useLocalizedCategory(cat);

    return (
        <Link
            to={cat.href}
            className="group flex flex-col gap-3 border border-[#eadfd4] bg-white p-5 transition hover:border-[#d889ac] hover:shadow-[0_8px_24px_rgba(194,110,143,0.1)]"
        >
            <div className="h-[100px] overflow-hidden bg-[#f6f0ea]">
                <img
                    src={cat.coverImage}
                    alt={localized.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
            </div>
            <p className="font-play text-[13px] font-semibold leading-snug text-zinc-900 transition group-hover:text-pink-500">
                {localized.title}
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
                {t('articlesCount', { count: getArticleCount(cat.slug) })}
            </p>
        </Link>
    );
}

export default function ResourceCategoryPage({
    category,
    articles,
}: ResourceCategoryPageProps) {
    const { t } = useTranslation('common', { keyPrefix: 'resourceCategory' });
    const localizedCategory = useLocalizedCategory(category);
    const otherCategories = resourceCategories.filter(
        (c) => c.slug !== category.slug,
    );

    return (
        <div className="min-h-screen bg-white font-poppins text-zinc-900">
            <Header />

            <main>
                {/* ── Breadcrumb & Hero ───────────────────────────────── */}
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            <Link
                                to="/"
                                className="transition hover:text-zinc-800"
                            >
                                {t('breadcrumbHome')}
                            </Link>{" "}
                            /{" "}
                            <Link
                                to="/resources"
                                className="transition hover:text-zinc-800"
                            >
                                {t('breadcrumbResources')}
                            </Link>{" "}
                            / {localizedCategory.title}
                        </p>
                        <h1 className="mt-3 text-[26px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[34px] lg:text-[42px]">
                            {localizedCategory.title}
                        </h1>
                        <p className="mt-4 max-w-2xl text-[14px] leading-7 text-zinc-600 sm:text-[15px]">
                            {localizedCategory.description}
                        </p>
                        <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-400">
                            {t('articlesCount', { count: articles.length })}
                        </p>
                    </div>
                </section>

                {/* ── Articles Grid ─────────────────────────────────────── */}
                <section className="mx-auto max-w-[1480px] px-6 py-14 lg:px-10 lg:py-20">
                    {articles.length > 0 ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article) => (
                                <ArticleCard
                                    key={article.slug}
                                    article={article}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed border-zinc-300 px-6 py-16 text-center">
                            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                                {t('empty')}
                            </p>
                        </div>
                    )}
                </section>

                {/* ── Other Categories ─────────────────────────────────── */}
                {otherCategories.length > 0 && (
                    <section className="border-t border-zinc-100 bg-[#fafafa] px-6 py-14 lg:px-10 lg:py-16">
                        <div className="mx-auto max-w-[1480px]">
                            <h2 className="font-play text-[20px] font-semibold text-zinc-900 sm:text-[22px]">
                                {t('exploreOther')}
                            </h2>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {otherCategories.map((cat) => (
                                    <OtherCategoryCard key={cat.slug} cat={cat} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
