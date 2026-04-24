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
    const totalPosts = pagination.totalRecords;
    const viewedCount = Math.min(
        pagination.currentPage * pagination.recordsPerPage,
        totalPosts,
    );

    return (
        <div className="min-h-screen bg-white text-zinc-900">
            <Header />

            <main>
                                <section className="bg-[linear-gradient(180deg,_#f6f1e8,_#fff_80%)] px-4 py-14 text-center md:py-20">
                    <h1 className="text-3xl font-semibold md:text-4xl">
                        BLOGS
                    </h1>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
                        Homepage / BLOGS
                    </p>
                </section>

                <section className="mx-auto max-w-[1250px] px-4 py-10 md:py-12">
                    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>

                    {blogs.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center">
                            <h2 className="text-xl font-semibold text-zinc-900">No blogs found</h2>
                            <p className="mt-2 text-sm text-zinc-600">
                                Please check again later.
                            </p>
                        </div>
                    ) : null}

                    <div className="mt-12 border-zinc-200 pt-6">
                        {/* <p className="text-center text-sm text-zinc-600">
                            You've viewed <span className="font-semibold text-zinc-900">{viewedCount}</span> of{" "}
                            <span className="font-semibold text-zinc-900">{totalPosts}</span> posts
                        </p>

                        <div className="mx-auto mt-3 h-2 w-full max-w-[540px] overflow-hidden rounded-full bg-zinc-200">
                            <div
                                className="h-full bg-zinc-900 transition-all duration-300"
                                style={{ width: `${(viewedCount / Math.max(totalPosts, 1)) * 100}%` }}
                            />
                        </div> */}

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
