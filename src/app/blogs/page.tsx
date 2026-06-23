import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { blogLinks } from "@/components/shared/blogList";

export const metadata: Metadata = {
    title: "Blog — Tennis Bracelet & Necklace Guides | I Want Jewels",
    description:
        "Expert guides on tennis bracelets and tennis necklaces — buying tips, pricing, styling, sizing, and care advice for 2026.",
    alternates: {
        canonical: "/blogs",
    },
};

const BlogsIndexPage = () => (
    <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-2 ">
            <section className="border-b border-zinc-200 bg-white px-6 py-7">
                <div className="mx-auto max-w-[1480px]">
                    <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                        Homepage / Blog
                    </p>
                    <h1 className="mt-3 font-play text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                        Blog
                    </h1>
                </div>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.href}
                        className="group flex flex-col justify-between gap-6 bg-[#f7f8fa] p-7 rounded-sm shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h2 className="text-2xl font-play font-medium text-[#1f2732] leading-snug group-hover:text-pink-500 transition-colors">
                            {link.title}
                        </h2>
                        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black">
                            Read article
                            <ArrowUpRight
                                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                strokeWidth={2}
                            />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
        <Footer />
    </div>
);

export default BlogsIndexPage;
