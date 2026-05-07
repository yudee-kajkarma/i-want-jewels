"use client";

import { useNavigate } from "@/lib/router";
import BlogCard from "../components/blog/BlogCard";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Pagination from "../components/sections/Pagination";
import type { BlogListItem, BlogPagination } from "../types/blog";

type BlogPageProps = {
    blogs: BlogListItem[];
    pagination: BlogPagination;
};

export default function BlogPage({ blogs, pagination }: BlogPageProps) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-parsi">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / Blog
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            Blog
                        </h1>
                    </div>
                </section>

                <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    {blogs.length === 0 ? (
                        <div className="border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
                            <h2 className="text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800">
                                No blogs found
                            </h2>
                            <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                                Please check again later.
                            </p>
                        </div>
                    ) : null}

                    <div className="mt-12 pt-6">
                        <Pagination
                            pagination={pagination}
                            currentItemCount={blogs.length}
                            onPageChange={(pageNumber) => {
                                navigate(`/blog?page=${pageNumber}`);
                            }}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
