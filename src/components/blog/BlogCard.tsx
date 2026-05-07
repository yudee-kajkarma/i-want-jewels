"use client";

import { Link } from "@/lib/router";
import type { BlogListItem } from "../../types/blog";

type BlogCardProps = {
    post: BlogListItem;
};

function formatDateParts(dateValue: string): { day: string; month: string } {
    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
        return { day: "--", month: "---" };
    }

    return {
        day: parsedDate.toLocaleDateString("en-US", { day: "2-digit" }),
        month: parsedDate.toLocaleDateString("en-US", { month: "short" }),
    };
}

export default function BlogCard({ post }: BlogCardProps) {
    const dateParts = formatDateParts(post.publishedAt);
    const postHref = `/blog/${post.slug}`;

    return (
        <article className="group font-parsi">
            <Link to={postHref} className="relative block overflow-hidden">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="block h-[360px] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute left-3 top-3 flex h-14 w-14 flex-col items-center justify-center bg-white text-zinc-900 shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
                    <span className="text-[15px] font-medium leading-none">
                        {dateParts.day}
                    </span>
                    <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {dateParts.month}
                    </span>
                </div>
            </Link>

            <div className="pt-5">
                <h2 className="text-[16px] font-medium leading-snug tracking-[-0.01em] text-zinc-900">
                    <Link
                        to={postHref}
                        className="transition hover:text-pink-500"
                    >
                        {post.title}
                    </Link>
                </h2>

                <p className="mt-2 text-[13px] leading-6 text-zinc-600">
                    {post.excerpt}
                </p>
            </div>
        </article>
    );
}
