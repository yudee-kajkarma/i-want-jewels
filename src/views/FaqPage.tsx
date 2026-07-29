"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslation } from "react-i18next";

export default function FAQPage() {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number | null) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            category: t("faq.categories.orders"),
            items: [
                {
                    question: t("faq.q.q1"),
                    answer: t("faq.q.a1"),
                },
                {
                    question: t("faq.q.q2"),
                    answer: t("faq.q.a2"),
                },
                {
                    question: t("faq.q.q3"),
                    answer: t("faq.q.a3"),
                },
                {
                    question: t("faq.q.q4"),
                    answer: t("faq.q.a4"),
                },
                {
                    question: t("faq.q.q5"),
                    answer: t("faq.q.a5"),
                },
            ],
        },
        {
            category: t("faq.categories.materials"),
            items: [
                {
                    question: t("faq.q.q6"),
                    answer: t("faq.q.a6"),
                },
                {
                    question: t("faq.q.q7"),
                    answer: t("faq.q.a7"),
                },
                {
                    question: t("faq.q.q8"),
                    answer: t("faq.q.a8"),
                },
                {
                    question: t("faq.q.q9"),
                    answer: t("faq.q.a9"),
                },
                {
                    question: t("faq.q.q10"),
                    answer: t("faq.q.a10"),
                },
            ],
        },
        {
            category: t("faq.categories.returns"),
            items: [
                {
                    question: t("faq.q.q11"),
                    answer: t("faq.q.a11"),
                },
                {
                    question: t("faq.q.q12"),
                    answer: t("faq.q.a12"),
                },
                {
                    question: t("faq.q.q13"),
                    answer: t("faq.q.a13"),
                },
                {
                    question: t("faq.q.q14"),
                    answer: t("faq.q.a14"),
                },
            ],
        },
        {
            category: t("faq.categories.payments"),
            items: [
                {
                    question: t("faq.q.q15"),
                    answer: t("faq.q.a15"),
                },
                {
                    question: t("faq.q.q16"),
                    answer: t("faq.q.a16"),
                },
                {
                    question: t("faq.q.q17"),
                    answer: t("faq.q.a17"),
                },
            ],
        },
        {
            category: t("faq.categories.sizing"),
            items: [
                {
                    question: t("faq.q.q18"),
                    answer: t("faq.q.a18"),
                },
                {
                    question: t("faq.q.q19"),
                    answer: t("faq.q.a19"),
                },
                {
                    question: t("faq.q.q20"),
                    answer: t("faq.q.a20"),
                },
                {
                    question: t("faq.q.q21"),
                    answer: t("faq.q.a21"),
                },
            ],
        },
        {
            category: t("faq.categories.sustainability"),
            items: [
                {
                    question: t("faq.q.q22"),
                    answer: t("faq.q.a22"),
                },
            ],
        },
        {
            category: t("faq.categories.support"),
            items: [
                {
                    question: t("faq.q.q23"),
                    answer: (
                        <>
                            {t("faq.q.a23_1")}
                            <a
                                href="mailto:care@iwantjewels.com"
                                className="font-medium text-zinc-900 underline transition hover:text-pink-500"
                            >
                                care@iwantjewels.com
                            </a>
                            {t("faq.q.a23_2")}
                        </>
                    ),
                },
            ],
        },
    ];

    let count = 0;

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-poppins">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            {t("faq.breadcrumbs")}
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            {t("faq.title")}
                        </h1>
                    </div>
                </section>

                <section className="mx-auto max-w-[1100px] px-6 py-12 lg:px-10 lg:py-16">
                    {faqData.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-12 last:mb-0">
                            <h2 className="mb-6 text-xl font-medium tracking-[0.02em] text-zinc-900 sm:text-2xl">
                                {section.category}
                            </h2>
                            <div className="divide-y divide-zinc-200 border-t border-zinc-200">
                                {section.items.map((item, itemIndex) => {
                                    const currentIndex = count++;
                                    const isOpen = openIndex === currentIndex;

                                    return (
                                        <div key={itemIndex} className="group">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleFAQ(currentIndex)
                                                }
                                                className="flex w-full items-center justify-between py-6 text-left transition hover:text-[#b63f80]"
                                                aria-expanded={isOpen}
                                            >
                                                <span className="pr-8 text-base font-medium leading-relaxed sm:text-lg">
                                                    {item.question}
                                                </span>
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition group-hover:bg-[#fff3fa] group-hover:text-[#b63f80]">
                                                    {isOpen ? (
                                                        <Minus className="h-4 w-4" />
                                                    ) : (
                                                        <Plus className="h-4 w-4" />
                                                    )}
                                                </span>
                                            </button>
                                            <div
                                                className={`grid transition-all duration-300 ease-in-out ${
                                                    isOpen
                                                        ? "grid-rows-[1fr] pb-6 opacity-100"
                                                        : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <p className="max-w-3xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <Footer />
        </div>
    );
}
