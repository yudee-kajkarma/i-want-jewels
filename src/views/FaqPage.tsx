"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const faqData = [
    {
        category: "Orders & Shipping",
        items: [
            {
                question: "Where is I Want Jewels based?",
                answer:
                    "We're based in Belgium – land of waffles, fries, beer and stunning jewels.",
            },
            {
                question: "Where do you ship?",
                answer:
                    "We currently ship across Europe, the UK, and the US! Don't worry, other countries will get our love soon enough!\n\nHeads up: import duties or taxes (if any) are on you, darlin'.",
            },
            {
                question: "How long will my order take?",
                answer:
                    "Usually dispatched in 1–2 business days. During high demand or restocks, it may take up to 15–20 working days.\n\nShipping times vary by country – full info at checkout.",
            },
            {
                question: "How do I track my order?",
                answer:
                    "Once shipped, you'll get a tracking link via email (and maybe a little ping on WhatsApp/SMS if you gave us your digits).",
            },
            {
                question: "Can I cancel or change my order?",
                answer:
                    "If it hasn't shipped yet, drop us an email ASAP. We'll do our best, but once it's out the door, it's on its way!",
            },
            {
                question:
                    "What is the delivery timeline for UK orders?",
                answer:
                    "We provide seamless delivery across the UK, with orders arriving within 2–3 working days from dispatch.",
            },
        ],
    },
    {
        category: "Product & Quality",
        items: [
            {
                question: "Are your diamonds real?",
                answer:
                    "100% they're lab-grown, which means they're real AF – same sparkle, less guilt.",
            },
            {
                question: "What's your jewelry made of?",
                answer:
                    "Gorgeousness in 92.5 sterling silver – durable, hypoallergenic, and cute for everyday slay.",
            },
            {
                question: "Will it tarnish?",
                answer:
                    "Silver might dull over time, but our pieces are made for daily wear. Keep 'em dry and store them in their pouch to keep that shine alive.",
            },
            {
                question: "Can I shower/swim/sweat in it?",
                answer:
                    "You totally can! Our silver is rhodium or gold plated, so it's extra resistant to tarnish. Just give it a quick wipe after and you're good to glow.",
            },
            {
                question: "How do I clean my jewelry?",
                answer:
                    "Use a soft cloth and mild soap if needed. No harsh vibes (or chemicals) please.",
            },
        ],
    },
    {
        category: "Returns & Exchanges",
        items: [
            {
                question: "Can I return or exchange my order?",
                answer:
                    "Totally.\nReturns: Within 2 days of delivery.\nExchanges: Within 10 days (on eligible items).\nJust head to our Returns page to start.",
            },
            {
                question: "Are all items returnable?",
                answer:
                    "Nope. Discounted items, or anything marked final sale cannot be returned.",
            },
            {
                question: "When do I get my refund?",
                answer:
                    "Once we get your return and give it a once-over, refunds roll out in 7–10 working days.",
            },
            {
                question: "My item arrived damaged or wrong – what now?",
                answer:
                    "Take a pic and email us within 2 days. We got you covered.",
            },
        ],
    },
    {
        category: "Payments & Security",
        items: [
            {
                question: "How can I pay?",
                answer:
                    "All major credit/debit cards are accepted as well as PayPal. In Belgium, Bancontact is also possible.",
            },
            {
                question: "Is your site secure?",
                answer:
                    "Heck yeah! SSL encrypted and hacker-repellent. Your data's locked up tighter than your jewellery box.",
            },
            {
                question: "Will I have to pay import duties?",
                answer:
                    "If you're outside the EU (like in the UK or US), your country might charge VAT or customs duties when your order arrives. These are the buyer's responsibility.",
            },
        ],
    },
    {
        category: "Sizing & Gifting",
        items: [
            {
                question: "How do I find my ring size?",
                answer:
                    "Check out our size guide or use a ring sizer – or grab a string and measure like a DIY queen.",
            },
            {
                question:
                    "Do your necklaces/bracelets come in different lengths?",
                answer:
                    "Most do! Check each product page for size options and recommendations.",
            },
            {
                question: "Do you offer gift wrapping?",
                answer:
                    "Yup! You can add a cute gift note at checkout. Packaging is chic enough for you to post on Insta!",
            },
        ],
    },
    {
        category: "Ethics & Sustainability",
        items: [
            {
                question: "Is your jewellery sustainable?",
                answer:
                    "We're all about conscious sparkle. Lab-grown diamonds = less environmental impact, and our packaging is recyclable too.",
            },
        ],
    },
    {
        category: "Customer Support",
        items: [
            {
                question: "Need help?",
                answer: (
                    <>
                        Slide into our inbox at{" "}
                        <a
                            href="mailto:care@iwantjewels.com"
                            className="font-medium text-zinc-900 underline transition hover:text-pink-500"
                        >
                            care@iwantjewels.com
                        </a>{" "}
                        – we reply in 1–2 business days (faster if you&apos;re
                        nice).
                    </>
                ),
            },
        ],
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number | null) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    let count = 0;

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-parsi">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / FAQs
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            Frequently Asked Questions
                        </h1>
                    </div>
                </section>

                <section className="mx-auto max-w-[1100px] px-6 py-12 lg:px-10 lg:py-16">
                    {faqData.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-14">
                            <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                                {section.category}
                            </h2>

                            <div className="mt-6 border-t border-zinc-200">
                                {section.items.map((item, itemIndex) => {
                                    const currentIndex = count++;
                                    const isOpen = openIndex === currentIndex;

                                    return (
                                        <div
                                            key={itemIndex}
                                            className="border-b border-zinc-200"
                                        >
                                            <button
                                                onClick={() =>
                                                    toggleFAQ(currentIndex)
                                                }
                                                className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left transition hover:text-pink-500"
                                            >
                                                <span className="text-[14px] font-medium uppercase tracking-[0.08em] text-zinc-900 sm:text-[15px]">
                                                    {item.question}
                                                </span>

                                                {isOpen ? (
                                                    <Minus
                                                        size={20}
                                                        className="shrink-0"
                                                    />
                                                ) : (
                                                    <Plus
                                                        size={20}
                                                        className="shrink-0"
                                                    />
                                                )}
                                            </button>

                                            <div
                                                className={`grid transition-all duration-300 ease-in-out ${
                                                    isOpen
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <p className="whitespace-pre-line px-1 pb-5 text-[14px] leading-7 text-zinc-600">
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
