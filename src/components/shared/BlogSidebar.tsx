"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogLinks, type BlogLink } from "./blogList";

const SIDEBAR_BLOG_COUNT = 7;

const pickRandom = (list: BlogLink[], count: number): BlogLink[] => {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
};

const BlogSidebar = ({
    className = "w-full lg:w-1/3",
    currentHref,
}: {
    className?: string;
    currentHref?: string;
}) => {
    const pool = currentHref
        ? blogLinks.filter((link) => link.href !== currentHref)
        : blogLinks;

    // Render a stable slice on the server / first paint to avoid a
    // hydration mismatch, then shuffle to a fresh random set on mount.
    const [links, setLinks] = useState<BlogLink[]>(() =>
        pool.slice(0, SIDEBAR_BLOG_COUNT),
    );

    useEffect(() => {
        setLinks(pickRandom(pool, SIDEBAR_BLOG_COUNT));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentHref]);

    return (
        <div className={className}>
            <div className="bg-[#f7f8fa] p-8 w-full shadow-sm rounded-sm lg:rounded-none">
                <h3 className="text-4xl lg:text-3xl font-semibold font-play mb-6 text-[#0f172a]">
                    More Articles
                </h3>
                <ul className="space-y-3 lg:space-y-5 max-h-none lg:max-h-[70vh] lg:overflow-y-auto lg:pr-2">
                    {links.map((link, idx) => (
                        <li
                            key={idx}
                            className="group lg:border-0 border-b border-slate-200 pb-2 lg:pb-0 last:border-0"
                        >
                            <Link
                                href={link.href}
                                className="flex items-center justify-between gap-3 text-slate-700 hover:text-[#bb923a] transition-colors py-1 lg:py-1"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="hidden lg:block w-2 h-2 rounded-full border border-current shrink-0 group-hover:border-[#bb923a]"></span>
                                    <span className="font-poppins text-lg lg:text-sm lg:font-sans lg:font-semibold lg:tracking-wide underline lg:no-underline underline-offset-4">
                                        {link.title}
                                    </span>
                                </div>
                                <ArrowUpRight
                                    className="hidden lg:block w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:text-[#bb923a] transition-all shrink-0"
                                    strokeWidth={1.5}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogSidebar;
