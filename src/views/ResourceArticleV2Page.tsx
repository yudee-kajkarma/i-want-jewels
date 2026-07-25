"use client";

import { Fragment, useState } from "react";
import { Link } from "@/lib/router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ExploreOurStore from "@/components/shared/ExploreOurStore";
import shopPageBanner from "@/assets/banner/hero-banner-3.jpg";
import type { ResourceArticle, ResourceCategory } from "../data/resources";

// ─── Extended Content Types ───────────────────────────────────────────────────

export type V2ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "section-lead"; text: string }
    | { type: "subheading"; text: string }
    | { type: "bullet-list"; items: string[] }
    | { type: "numbered-list"; items: string[] }
    | { type: "table"; headers: string[]; rows: string[][] }
    | { type: "see-also"; text: string; href: string }
    | { type: "faq-item"; question: string; answer: string }
    | { type: "divider" }
    | {
          type: "grid-layout";
          image: string;
          imagePosition: "left" | "right";
          content: V2ContentBlock[];
      };

export type V2ArticleSection = {
    heading?: string;
    content: V2ContentBlock[];
};

// Hero intro block — image left, title + text + CTA right
export type V2HeroIntro = {
    image: string;
    title: string;
    subtitle: string;
    paragraphs: string[];
    shopLabel: string;
    shopHref: string;
};

// Quick summary block — bullets left, image right
export type V2QuickSummary = {
    items: string[];
    image: string;
};

// FAQ section — reusable accordion list
export type V2FAQItem = {
    question: string;
    answer: string;
};

// Final CTA block
export type V2CTABlock = {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    tertiaryLabel?: string;
    tertiaryHref?: string;
};

type Props = {
    category: ResourceCategory;
    article: ResourceArticle;
    relatedArticles: ResourceArticle[];
    heroIntro: V2HeroIntro;
    quickSummary: V2QuickSummary;
    content: V2ArticleSection[];
    faq?: V2FAQItem[];
    cta?: V2CTABlock;
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
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

function ArrowLeftIcon() {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-3.5 w-3.5"
            aria-hidden="true"
        >
            <path
                d="M16 10H4M9 5l-5 5 5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChevronDownIcon({ open }: { open: boolean }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
        >
            <path
                d="m5 7 5 5 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function InlineFAQItem({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="overflow-hidden border border-zinc-200 bg-white">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-zinc-50"
                aria-expanded={open}
            >
                <span className="font-poppins text-[16px] font-medium text-[#1f2732]">
                    {question}
                </span>
                <ChevronDownIcon open={open} />
            </button>
            {open && (
                <div className="border-t border-zinc-100 bg-[#fafaf8] px-5 py-4">
                    <p className="font-poppins text-[15px] leading-7 text-[#344256]">
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection({ cta }: { cta: V2CTABlock }) {
    return (
        <section className="border-t border-zinc-100 bg-[#fff7fb] px-6 py-14 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-[1480px] text-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-pink-500">
                    Ready to Shop?
                </p>
                <h2 className="mt-3 font-play text-[24px] font-semibold text-zinc-900 sm:text-[30px]">
                    {cta.heading}
                </h2>
                <p className="mx-auto mt-3 max-w-xl font-poppins text-[14px] leading-7 text-zinc-600">
                    {cta.body}
                </p>

                {/* Row 1: Primary + Secondary side by side */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        to={cta.primaryHref}
                        className="inline-flex items-center gap-2 bg-[#1f2732] px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-500"
                    >
                        {cta.primaryLabel}
                    </Link>
                    {cta.secondaryLabel && cta.secondaryHref && (
                        <Link
                            to={cta.secondaryHref}
                            className="inline-flex items-center border border-pink-400 bg-white px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-pink-500 transition hover:bg-pink-50"
                        >
                            {cta.secondaryLabel}
                        </Link>
                    )}
                </div>

                {/* Row 2: Tertiary text link — sits below both buttons */}
                {cta.tertiaryLabel && cta.tertiaryHref && (
                    <div className="mt-4">
                        <Link
                            to={cta.tertiaryHref}
                            className="font-poppins text-[13px] font-medium text-zinc-500 underline underline-offset-4 transition hover:text-pink-500"
                        >
                            {cta.tertiaryLabel}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

// ─── FAQ Section ─────────────────────────────────────────────────────────────

function FAQSection({ items }: { items: V2FAQItem[] }) {
    return (
        <section className="border-t border-zinc-100 px-5 py-14 lg:px-10 lg:py-16">
            <div className="mx-auto max-w-[1400px]">
                {/* Header */}
                <div className="mb-10 text-center">
                    <p className="text-[12px] font-medium uppercase tracking-[0.26em] text-pink-400">
                        Got Questions?
                    </p>
                    <h2 className="mt-2 font-play text-[28px] font-semibold text-[#1f2732] md:text-[32px]">
                        Frequently Asked Questions
                    </h2>
                    <div className="mx-auto mt-4 h-px w-16 bg-pink-400" />
                </div>

                {/* Accordion list */}
                <div className="mx-auto w-[90%] divide-y divide-zinc-100">
                    {items.map((item, i) => (
                        <InlineFAQItem
                            key={i}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Block Renderer ───────────────────────────────────────────────────────────

function RenderBlock({ block }: { block: V2ContentBlock }) {
    switch (block.type) {
        case "paragraph":
            return (
                <p className="font-poppins text-[15px] leading-[1.9] text-[#344256]">
                    {block.text}
                </p>
            );

        case "section-lead":
            return (
                <p className="text-center font-poppins text-[14px] leading-[1.8] text-[#344256]">
                    {block.text}
                </p>
            );

        case "subheading":
            return (
                <h3 className="mb-2 mt-8 border-l-2 border-pink-400 pl-3 font-poppins text-[16px] font-semibold text-[#1f2732] md:text-[17px]">
                    {block.text}
                </h3>
            );

        case "bullet-list":
            return (
                <ul className="space-y-2 pl-5">
                    {block.items.map((item, i) => (
                        <li
                            key={i}
                            className="relative font-poppins text-[15px] leading-[1.8] text-[#344256]
              before:absolute before:-left-4 before:top-[0.62em] before:h-[5px] before:w-[5px]
              before:rounded-full before:bg-pink-400 before:content-['']"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            );

        case "numbered-list":
            return (
                <ol className="list-decimal space-y-2 pl-5">
                    {block.items.map((item, i) => (
                        <li
                            key={i}
                            className="font-poppins text-[15px] leading-[1.8] text-[#344256] marker:font-semibold marker:text-[#bb923a]"
                        >
                            {item}
                        </li>
                    ))}
                </ol>
            );

        case "table":
            return (
                <div className="my-6 w-full overflow-x-auto overflow-hidden rounded-xl border border-pink-100 shadow-sm">
                    <table className="w-full border-collapse font-poppins text-[14px]">
                        <thead>
                            <tr>
                                {block.headers.map((h, i) => (
                                    <th
                                        key={i}
                                        className="border-b border-pink-100 bg-[#fef4f9] px-5 py-3.5 text-left font-play text-[14px] font-semibold text-[#1f2732]"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, r) => (
                                <tr
                                    key={r}
                                    className={
                                        r % 2 === 0
                                            ? "bg-white"
                                            : "bg-[#fdfaf7]"
                                    }
                                >
                                    {row.map((cell, c) => (
                                        <td
                                            key={c}
                                            className="border-t border-zinc-100 px-5 py-3.5 align-top font-poppins text-[14px] text-[#344256]"
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case "see-also":
            return (
                <div className="my-4 inline-block bg-[#fef4f9] px-4 py-2 font-poppins text-[13px]">
                    <span className="font-semibold text-[#1f2732]">
                        See also:{" "}
                    </span>
                    <Link
                        to={block.href}
                        className="font-medium text-pink-500 hover:underline"
                    >
                        {block.text}
                    </Link>
                </div>
            );

        case "faq-item":
            return (
                <InlineFAQItem
                    question={block.question}
                    answer={block.answer}
                />
            );

        case "divider":
            return <hr className="my-8 border-zinc-100" />;

        case "grid-layout": {
            // Find where the table is so we can split content:
            //  - blocks up to & including the table → inside the column (beside the image)
            //  - blocks AFTER the table → below BOTH image and table (full width)
            const tableIndex = block.content.findIndex(
                (b) => b.type === "table",
            );
            const hasTable = tableIndex !== -1;
            const inColumnBlocks = hasTable
                ? block.content.slice(0, tableIndex + 1)
                : block.content;
            const belowBlocks = hasTable
                ? block.content.slice(tableIndex + 1)
                : [];

            return (
                <div className="my-8">
                    {/* ── Side-by-side row: image | table (or full content when no table) ── */}
                    <div className="flex flex-col gap-0 md:flex-row md:items-stretch">
                        {block.imagePosition === "left" && (
                            <div
                                className={`relative w-full self-stretch flex-shrink-0 md:w-1/2 overflow-hidden ${
                                    !hasTable ? "min-h-[300px]" : ""
                                }`}
                                style={{
                                    minHeight: 0,
                                    marginTop: hasTable ? "2%" : 0,
                                    marginBottom: hasTable ? "2%" : 0,
                                }}
                            >
                                <img
                                    src={block.image}
                                    alt="Section illustrative visual"
                                    className="absolute inset-0 w-full  h-full object-cover"
                                    style={{ display: "block" }}
                                />
                            </div>
                        )}
                        <div
                            className={`flex w-full flex-col ${
                                hasTable ? "justify-start" : "justify-center"
                            } space-y-4 md:w-1/2 md:px-6 py-0`}
                        >
                            {inColumnBlocks.map((subBlock, sbi) => (
                                <RenderBlock
                                    key={subBlock.type + sbi}
                                    block={subBlock}
                                />
                            ))}
                        </div>
                        {block.imagePosition === "right" && (
                            <div
                                className={`relative w-full self-stretch flex-shrink-0 md:w-1/2 overflow-hidden ${
                                    !hasTable ? "min-h-[300px]" : ""
                                }`}
                                style={{
                                    minHeight: 0,
                                    marginTop: hasTable ? "2%" : 0,
                                    marginBottom: hasTable ? "2%" : 0,
                                }}
                            >
                                <img
                                    src={block.image}
                                    alt="Section illustrative visual"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{ display: "block" }}
                                />
                            </div>
                        )}
                    </div>

                    {/* ── Blocks after the table render BELOW both image and table ── */}
                    {belowBlocks.length > 0 && (
                        <div className="mt-6 space-y-4">
                            {belowBlocks.map((subBlock, sbi) => (
                                <RenderBlock
                                    key={subBlock.type + sbi}
                                    block={subBlock}
                                />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        default:
            return null;
    }
}

// ─── Section Renderer ─────────────────────────────────────────────────────────

function RenderSection({
    section,
    index,
}: {
    section: V2ArticleSection;
    index: number;
}) {
    return (
        <div
            className={index > 0 ? "mt-12 border-t border-zinc-100 pt-10" : ""}
        >
            {/* Heading */}
            {section.heading && (
                <h2
                    className={`mb-4 font-play text-[22px] font-semibold leading-snug text-[#1f2732] md:text-[24px] ${index === 0 ? "text-left" : "text-left"}`}
                >
                    {section.heading}
                </h2>
            )}
            {/* Content — left aligned, full width */}
            <div className="space-y-4 text-left">
                {section.content.map((block, bi) => (
                    <RenderBlock key={bi} block={block} />
                ))}
            </div>
        </div>
    );
}

// ─── Related Article Card ─────────────────────────────────────────────────────

function RelatedCard({ article }: { article: ResourceArticle }) {
    const href = `/resources/${article.categorySlug}/${article.slug}`;
    return (
        <article className="group">
            <Link to={href} className="block overflow-hidden">
                <img
                    src={article.coverImage}
                    alt={article.title}
                    className="h-[200px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
            </Link>
            <div className="pt-4">
                <h3 className="mt-1 font-play text-[16px] font-semibold leading-snug text-[#1f2732] transition-colors group-hover:text-pink-500 md:text-[17px]">
                    <Link to={href}>{article.title}</Link>
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-6 text-[#344256]">
                    {article.excerpt}
                </p>
            </div>
        </article>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResourceArticleV2Page({
    category,
    article,
    relatedArticles,
    heroIntro,
    quickSummary,
    content,
    faq,
    cta,
}: Props) {
    const categoryHref = `/resources/${category.slug}`;
    const canonicalUrl = `https://iwantjewels.com/resources/${category.slug}/${article.slug}`;

    const jsonLdSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl,
        },
        "headline": article.title,
        "description": article.excerpt,
        "image": article.coverImage.startsWith("http")
            ? article.coverImage
            : `https://iwantjewels.com${article.coverImage}`,
        "publisher": {
            "@type": "Organization",
            "name": "I Want Jewels",
            "url": "https://iwantjewels.com",
        },
    };

    return (
        <div className="min-h-screen bg-white font-poppins text-[#1f2732]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
            />
            <Header />

            <main>
                {/* ─── 1. Full-width banner: shared shop banner image + CTA ─── */}
                <div className="relative w-full overflow-hidden bg-[#f5ece3]">
                    <img
                        src={shopPageBanner.src}
                        alt="Shop the collection"
                        className="h-auto w-full"
                    />
                    {/* <div className="pointer-events-none absolute inset-x-0 bottom-4 left-[7%] px-4 md:top-[55%] md:bottom-auto md:left-[10.5%]">
                        <Link
                            to="/products"
                            className="iwj-hero-cta pointer-events-auto inline-block border border-zinc-200 bg-white px-5 py-2.5 font-poppins text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white sm:px-8 sm:py-3 sm:text-[12px] sm:tracking-[0.22em] md:px-6 md:py-2.5 md:text-[13px] lg:px-10 lg:py-3.5 lg:text-[14px]"
                        >
                            Explore Collection
                        </Link>
                    </div> */}
                </div>

                {/* ─── 2. Hero intro: image left | title + text + CTA right ────────── */}
                <section className="w-full bg-white px-5 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-0">
                            {/* Left — placeholder / product image */}
                            <div className="w-full self-stretch flex-shrink-0 md:w-1/2">
                                <img
                                    src={heroIntro.image}
                                    alt={heroIntro.title}
                                    className="h-full min-h-[320px] w-full object-cover"
                                    style={{ display: "block" }}
                                />
                            </div>

                            {/* Right — title, paragraphs, CTA */}
                            <div className="flex w-full flex-col justify-center px-0 md:w-1/2 md:px-10 lg:px-14">
                                <h1 className="font-play text-[26px] font-bold leading-tight text-[#1f2732] sm:text-[30px] lg:text-[34px]">
                                    {heroIntro.title}
                                </h1>
                                {heroIntro.subtitle && (
                                    <p className="mt-1 font-play text-[22px] font-bold leading-tight text-[#1f2732] sm:text-[26px] lg:text-[30px]">
                                        {heroIntro.subtitle}
                                    </p>
                                )}

                                <div className="mt-5 space-y-4">
                                    {heroIntro.paragraphs.map((para, i) => (
                                        <p
                                            key={i}
                                            className="font-poppins text-[14px] leading-[1.85] text-[#344256]"
                                        >
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                {/* Pink outlined shop CTA button */}
                                <div className="mt-7">
                                    <Link
                                        to={heroIntro.shopHref}
                                        className="inline-flex items-center gap-2 border border-pink-400 px-6 py-2.5 text-[12px] font-medium tracking-[0.06em] text-pink-500 transition hover:bg-pink-50"
                                    >
                                        {heroIntro.shopLabel}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── 3. Quick Summary: bullets left | image right ────────────────── */}
                <section className="w-full bg-white px-5 pb-14 lg:px-10 lg:pb-16">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:gap-0">
                            {/* Left — Quick Summary text */}
                            <div className="flex w-full flex-col justify-start px-0 md:w-1/2 md:pr-10 lg:pr-16">
                                <h2 className="font-play text-[20px] font-bold text-[#1f2732] lg:text-[22px]">
                                    Quick Summary
                                </h2>
                                <ul className="mt-5 space-y-3">
                                    {quickSummary.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2.5"
                                        >
                                            <span className="mt-[7px] h-[5px] w-[5px] flex-shrink-0 rounded-full bg-[#1f2732]" />
                                            <span className="font-poppins text-[14px] leading-[1.75] text-[#344256]">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right — placeholder image */}
                            <div className="w-full self-stretch flex-shrink-0 md:w-1/2">
                                <img
                                    src={quickSummary.image}
                                    alt="Quick summary jewellery"
                                    className="h-full min-h-[300px] w-full object-cover"
                                    style={{ display: "block" }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── Divider ─────────────────────────────────────────────────────── */}
                <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                    <hr className="border-zinc-200" />
                </div>

                {/* ─── 4. Article body — full width ────────────────────────────────── */}
                <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10 lg:py-16">
                    <div>
                        {content.map((section, i) => (
                            <Fragment key={i}>
                                <RenderSection section={section} index={i} />
                                {/* "Explore Our Store" row after the first couple of sections. */}
                                {i === Math.min(1, content.length - 1) && (
                                    <ExploreOurStore count={6} />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* ─── Explore Our Store — before the FAQ ──────────────────────── */}
                {faq && faq.length > 0 && (
                    <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                        <ExploreOurStore count={6} />
                    </div>
                )}

                {/* ─── 6. FAQ Section ───────────────────────────────────────────── */}
                {faq && faq.length > 0 && <FAQSection items={faq} />}

                {/* ─── 5. CTA Section ───────────────────────────────────────────── */}
                {cta && <CTASection cta={cta} />}

                {relatedArticles.length > 0 && (
                    <section className="border-t border-zinc-100 bg-[#fafaf8] px-5 py-14 lg:px-6 lg:py-16">
                        <div className="mx-auto max-w-[1200px]">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-pink-400">
                                        Continue Reading
                                    </p>
                                    <h2 className="mt-1.5 font-play text-[22px] font-semibold text-[#1f2732] md:text-[26px]">
                                        More From {category.title}
                                    </h2>
                                </div>
                                <Link
                                    to={categoryHref}
                                    className="hidden shrink-0 items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 transition hover:text-pink-500 sm:flex"
                                >
                                    View All
                                    <ArrowRightIcon />
                                </Link>
                            </div>

                            <div className="mb-8 mt-4 h-px bg-zinc-200">
                                <div className="h-full w-16 bg-pink-400" />
                            </div>

                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedArticles.map((rel) => (
                                    <RelatedCard key={rel.slug} article={rel} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}
