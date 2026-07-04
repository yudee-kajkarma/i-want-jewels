"use client";

import { Link } from "@/lib/router";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { resourceCategories, getArticleCount } from "../data/resources";
import { blogLinks } from "@/components/shared/blogList";

function ArrowRightIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path
                d="M4 10h12M11 5l5 5-5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function BookOpenIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <path
                d="M2 6.5A2.5 2.5 0 0 1 4.5 4H12v16H4.5A2.5 2.5 0 0 1 2 17.5v-11Z"
                strokeLinejoin="round"
            />
            <path
                d="M22 6.5A2.5 2.5 0 0 0 19.5 4H12v16h7.5A2.5 2.5 0 0 0 22 17.5v-11Z"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-white font-poppins text-zinc-900">
            <Header />

            <main>
                {/* ── Breadcrumb & Hero ─────────────────────────────────── */}
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / Resources
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                             Resources
                        </h1>
                        <p className="mt-4 max-w-2xl text-[14px] leading-7 text-zinc-600 sm:text-[15px]">
                            Expert guides on everything from lab-grown diamonds
                            to jewellery care. Browse our resource library to
                            shop and style with confidence.
                        </p>
                    </div>
                </section>

                {/* ── Category Cards Grid ───────────────────────────────── */}
                <section className="mx-auto max-w-[1480px] px-6 py-14 lg:px-10 lg:py-20">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resourceCategories.map((category, index) => (
                            <Link
                                key={category.slug}
                                to={category.href}
                                className="group relative block overflow-hidden border border-[#eadfd4] bg-white transition duration-300 hover:border-[#d889ac] hover:shadow-[0_18px_40px_rgba(194,110,143,0.12)]"
                                style={{
                                    animationDelay: `${index * 80}ms`,
                                }}
                            >
                                {/* Cover image */}
                                <div className="relative h-[220px] overflow-hidden bg-[#f6f0ea]">
                                    <img
                                        src={category.coverImage}
                                        alt={category.title}
                                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                    {/* Article count badge */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white px-3 py-1.5">
                                        <BookOpenIcon />
                                        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-700">
                                            {getArticleCount(category.slug)} Articles
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="font-play text-[18px] font-semibold leading-snug text-zinc-900 sm:text-[20px]">
                                        {category.title}
                                    </h2>
                                    <p className="mt-2.5 text-[13px] leading-6 text-zinc-600 line-clamp-2">
                                        {category.description}
                                    </p>
                                    <div className="mt-5 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition group-hover:text-pink-500">
                                        <span>Browse Guides</span>
                                        <ArrowRightIcon />
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* ── Blog card → redirects to /blogs ───────────────── */}
                        <Link
                            to="/blogs"
                            className="group relative block overflow-hidden border border-[#eadfd4] bg-white transition duration-300 hover:border-[#d889ac] hover:shadow-[0_18px_40px_rgba(194,110,143,0.12)]"
                        >
                            {/* Cover image */}
                            <div className="relative h-[220px] overflow-hidden bg-[#f6f0ea]">
                                <img
                                    src="/blog-images/blog-image-60.jpg"
                                    alt="Blog"
                                    className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                {/* Article count badge */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white px-3 py-1.5">
                                    <BookOpenIcon />
                                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-700">
                                        {blogLinks.length} Articles
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h2 className="font-play text-[18px] font-semibold leading-snug text-zinc-900 sm:text-[20px]">
                                    Blog
                                </h2>
                                <p className="mt-2.5 text-[13px] leading-6 text-zinc-600 line-clamp-2">
                                    Styling inspiration, gift ideas, and expert
                                    tips on tennis bracelets, earrings, and
                                    everyday diamonds.
                                </p>
                                <div className="mt-5 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition group-hover:text-pink-500">
                                    <span>Read Articles</span>
                                    <ArrowRightIcon />
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* ── Bottom CTA Banner ─────────────────────────────────── */}
                <section className="border-t border-zinc-100 bg-[#fff7fb] px-6 py-14 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px] text-center">
                        <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-pink-500">
                            Need Help?
                        </p>
                        <h2 className="mt-3 font-play text-[24px] font-semibold text-zinc-900 sm:text-[30px]">
                            Can&apos;t Find What You&apos;re Looking For?
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-[14px] leading-7 text-zinc-600">
                            Our team of jewellery specialists are here to help.
                            Get in touch with any question — no matter how
                            simple or detailed.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-[#17110d] px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-black"
                            >
                                Contact Us
                            </Link>
                            <Link
                                to="/faq"
                                className="inline-flex items-center border border-zinc-800 bg-white px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white"
                            >
                                View FAQs
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
