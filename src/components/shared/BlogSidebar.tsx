"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import { ArrowUpRight } from "lucide-react";
import { blogLinks, type BlogLink } from "./blogList";
import { useTranslation } from "react-i18next";
import { useLocalizedBlogTitle } from "@/hooks/useLocalizedContent";

const SIDEBAR_BLOG_COUNT = 7;

const pickRandom = (list: BlogLink[], count: number): BlogLink[] => {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
};

const SidebarLink = ({ link }: { link: BlogLink }) => {
    const slug = link.href.replace("/blogs/", "");
    const title = useLocalizedBlogTitle(slug, link.title);

    return (
        <Link
            to={link.href}
            className="flex items-center justify-between gap-3 py-1 text-slate-700 transition-colors hover:text-[#bb923a] lg:py-1"
        >
            <div className="flex items-center gap-4">
                <span className="hidden h-2 w-2 shrink-0 rounded-full border border-current group-hover:border-[#bb923a] lg:block"></span>
                <span className="font-poppins text-lg underline underline-offset-4 lg:text-sm lg:font-sans lg:font-semibold lg:tracking-wide lg:no-underline">
                    {title}
                </span>
            </div>
            <ArrowUpRight
                className="hidden h-5 w-5 shrink-0 opacity-50 transition-all group-hover:text-[#bb923a] group-hover:opacity-100 lg:block"
                strokeWidth={1.5}
            />
        </Link>
    );
};

const BlogSidebar = ({
    className = "w-full lg:w-1/3",
    currentHref,
}: {
    className?: string;
    currentHref?: string;
}) => {
    const { t } = useTranslation("blogs-meta");
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
                <h3 className="mb-6 font-play text-4xl font-semibold text-[#0f172a] lg:text-3xl">
                    {t("sidebarMoreArticles")}
                </h3>
                <ul className="max-h-none space-y-3 lg:max-h-[70vh] lg:space-y-5 lg:overflow-y-auto lg:pr-2">
                    {links.map((link) => (
                        <li
                            key={link.href}
                            className="group border-b border-slate-200 pb-2 last:border-0 lg:border-0 lg:pb-0"
                        >
                            <SidebarLink link={link} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlogSidebar;
