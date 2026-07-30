"use client";

import ProductCard from "../components/sections/ProductCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import type { BlogDetail } from "../types/blog";
import type { Product } from "../types/product";
import { useTranslation } from "react-i18next";

type BlogDetailPageProps = {
    blogDetail: BlogDetail;
    relatedProducts: Product[];
};

function formatDate(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function BlogDetailPage({
    blogDetail,
    relatedProducts,
}: BlogDetailPageProps) {
    const { t } = useTranslation();
    const publishedLabel = formatDate(blogDetail.publishedAt);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-poppins">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1100px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            {t('blog.detail.breadcrumb')}
                        </p>
                        <h1 className="mt-3 text-[26px] font-medium leading-tight tracking-[-0.01em] text-zinc-900 sm:text-[34px] lg:text-[44px]">
                            {blogDetail.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.18em] text-zinc-500">
                            {publishedLabel ? (
                                <span>{t('blog.detail.published', { date: publishedLabel })}</span>
                            ) : null}
                            <span>{t('blog.detail.views', { count: blogDetail.views })}</span>
                            {blogDetail.author?.name ? (
                                <span>{t('blog.detail.byAuthor', { name: blogDetail.author.name })}</span>
                            ) : null}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1100px] px-6 py-12 lg:px-10 lg:py-16">
                    {blogDetail.coverImage ? (
                        <img
                            src={blogDetail.coverImage}
                            alt={blogDetail.title}
                            className="mb-12 block h-[320px] w-full object-cover md:h-[480px]"
                        />
                    ) : null}

                    <article
                        className="blog-rich-content text-[15px] leading-[1.78] text-zinc-700"
                        dangerouslySetInnerHTML={{
                            __html: blogDetail.content,
                        }}
                    />

                    {blogDetail.tags.length > 0 ? (
                        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-6">
                            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                                {t('blog.detail.tags')}
                            </span>
                            {blogDetail.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="border border-zinc-300 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-700"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </section>

                {relatedProducts.length > 0 ? (
                    <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
                        <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                            {t('blog.detail.relatedProducts')}
                        </h2>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                            {relatedProducts.slice(0, 4).map((product) => (
                                <ProductCard key={product.id} item={product} />
                            ))}
                        </div>
                    </section>
                ) : null}

                <style jsx>{`
                    .blog-rich-content :global(h1) {
                        margin-top: 2rem;
                        margin-bottom: 1rem;
                        font-size: 1.85rem;
                        line-height: 1.2;
                        color: #18181b;
                        letter-spacing: -0.01em;
                    }

                    .blog-rich-content :global(h2) {
                        margin-top: 2rem;
                        margin-bottom: 0.85rem;
                        font-size: 1.5rem;
                        line-height: 1.3;
                        color: #18181b;
                        letter-spacing: -0.01em;
                    }

                    .blog-rich-content :global(p) {
                        margin-top: 0.85rem;
                        margin-bottom: 0.85rem;
                    }

                    .blog-rich-content :global(ul),
                    .blog-rich-content :global(ol) {
                        margin: 0.75rem 0 0.75rem 1.35rem;
                    }

                    .blog-rich-content :global(li) {
                        margin: 0.4rem 0;
                    }

                    .blog-rich-content :global(blockquote) {
                        margin: 1.5rem 0;
                        border-left: 2px solid #ec4899;
                        padding-left: 1rem;
                        color: #52525b;
                        font-style: italic;
                    }
                `}</style>
            </main>

            <Footer />
        </div>
    );
}
