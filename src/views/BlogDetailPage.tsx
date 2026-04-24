"use client";

import ProductCard from "../components/sections/ProductCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import type { BlogDetail } from "../types/blog";
import type { Product } from "../types/product";

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
    const publishedLabel = formatDate(blogDetail.publishedAt);

    return (
        <div className="min-h-screen bg-white text-zinc-900">
            <Header />

            <main className="relative z-0">
                <div className="min-h-screen pb-20">
                    <div className="mx-auto max-w-[900px] px-4 py-16">
                        <div className="w-full">
                            <h1 className="mb-6 max-w-[900px] text-[2.45rem] font-semibold leading-[1.1] text-[#1f2732] md:text-[3.1rem]">
                                {blogDetail.title}
                            </h1>

                            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                                {publishedLabel ? (
                                    <span>Published: {publishedLabel}</span>
                                ) : null}
                                <span>Views: {blogDetail.views}</span>
                                {blogDetail.author?.name ? (
                                    <span>Author: {blogDetail.author.name}</span>
                                ) : null}
                            </div>

                            {blogDetail.coverImage ? (
                                <img
                                    src={blogDetail.coverImage}
                                    alt={blogDetail.title}
                                    className="mb-10 h-[300px] w-full rounded-[10px] object-cover md:h-[420px]"
                                />
                            ) : null}

                            <div className="text-[1.1rem] leading-[1.72] text-[#334155]">
                                <article
                                    className="blog-rich-content"
                                    dangerouslySetInnerHTML={{
                                        __html: blogDetail.content,
                                    }}
                                />
                            </div>

                            {relatedProducts.length > 0 ? (
                                <section className="mt-14 border-t border-zinc-200 pt-8">
                                    <h2 className="text-3xl font-semibold text-[#1f2732]">
                                        Related Products
                                    </h2>

                                    <div className="mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                        {relatedProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                item={product}
                                            />
                                        ))}
                                    </div>
                                </section>
                            ) : null}

                            {blogDetail.tags.length > 0 ? (
                                <section className="mt-10 flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-6">
                                    <span className="text-sm font-semibold text-zinc-700">Tags:</span>
                                    {blogDetail.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium uppercase tracking-[0.05em] text-zinc-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </section>
                            ) : null}
                            <style jsx>{`
                                .blog-rich-content :global(h1) {
                                    margin-top: 2rem;
                                    margin-bottom: 1rem;
                                    font-size: 2.25rem;
                                    line-height: 1.2;
                                    color: #1f2732;
                                }

                                .blog-rich-content :global(h2) {
                                    margin-top: 2.2rem;
                                    margin-bottom: 1rem;
                                    font-size: 1.95rem;
                                    line-height: 1.25;
                                    color: #1f2732;
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
                                    border-left: 3px solid #c9a76b;
                                    padding-left: 1rem;
                                    color: #334155;
                                    font-style: italic;
                                }
                            `}</style>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
