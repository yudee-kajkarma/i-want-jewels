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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                {blogLinks.map((link, idx) => (
                    <Link
                        key={idx}
                        href={link.href}
                        className="group relative flex flex-col overflow-hidden border border-[#eadfd4] bg-white transition duration-300 hover:border-[#d889ac] hover:shadow-[0_18px_40px_rgba(194,110,143,0.12)]"
                    >
                        {/* Cover image */}
                        <div className="relative h-[220px] overflow-hidden bg-[#f6f0ea]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={link.coverImage}
                                alt={link.title}
                                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                            <h2 className="text-xl font-play font-medium text-[#1f2732] leading-snug group-hover:text-pink-500 transition-colors sm:text-2xl">
                                {link.title}
                            </h2>
                            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black">
                                Read article
                                <ArrowUpRight
                                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    strokeWidth={2}
                                />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        <Footer />
    </div>
);

export default BlogsIndexPage;
