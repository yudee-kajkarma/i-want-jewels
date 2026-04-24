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
        <article className="group">
            <Link
                to={postHref}
                className="relative block overflow-hidden rounded-[6px]"
            >
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-[340px] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />

                <div className="absolute left-3 top-3 flex h-[56px] w-[56px] flex-col items-center justify-center rounded-[6px] bg-white/95 text-[#171717] shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
                    <span className="text-base font-semibold leading-none">
                        {dateParts.day}
                    </span>
                    <span className="mt-1 text-[11px] uppercase tracking-[0.08em] text-zinc-600">
                        {dateParts.month}
                    </span>
                </div>
            </Link>

            <div className="pt-4">
                <h2 className="text-[1.05rem] font-semibold leading-7 text-[#151515]">
                    <Link
                        to={postHref}
                        className="transition hover:text-pink-500"
                    >
                        {post.title}
                    </Link>
                </h2>

                <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {post.excerpt}
                </p>
            </div>
        </article>
    );
}
