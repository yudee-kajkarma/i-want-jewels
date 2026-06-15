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
                    "I Want Jewels is based in Antwerp, Belgium — one of the world's most celebrated diamond cities and the heart of Europe's fine jewellery heritage.",
            },
            {
                question: "Where do you ship to?",
                answer:
                    "We currently ship across Europe, the United Kingdom, and the United States. Please note that import duties or customs charges for Europe and the UK are already paid for. Any import duties or customs charges applicable in the US are the responsibility of the buyer.",
            },
            {
                question: "How long does delivery take?",
                answer:
                    "Orders are typically dispatched within 1–2 business days. During periods of high demand or collection restocks, dispatch may take up to 15–20 working days. Estimated delivery times by country are shown at checkout. EU and UK customers can expect delivery within 1-2 working days and 2–3 working days from dispatch, respectively.",
            },
            {
                question: "How do I track my order?",
                answer:
                    "Once your order has been dispatched, you will receive a tracking link by email. If you provided a phone number at checkout, you may also receive updates via SMS or WhatsApp.",
            },
            {
                question: "Can I cancel or amend my order?",
                answer:
                    "If your order has not yet been dispatched, please contact us as soon as possible and we will do our best to assist you. Once an order has been shipped, it cannot be modified or cancelled.",
            },
        ],
    },
    {
        category: "Materials & Quality",
        items: [
            {
                question: "Are your diamonds real?",
                answer:
                    "Yes. I Want Jewels uses exclusively lab-grown diamonds — chemically, physically, and optically identical to mined diamonds. Lab-grown diamonds offer the same brilliance and durability with a significantly lower environmental impact.",
            },
            {
                question: "What materials are your jewellery pieces made from?",
                answer:
                    "Our collections are crafted in 925 sterling silver with rhodium or 14kt gold plating, and feature lab-grown diamonds. All materials are selected for their quality, durability, and hypoallergenic properties, making them suitable for everyday wear.",
            },
            {
                question: "Will my jewellery tarnish over time?",
                answer:
                    "Our pieces are designed and plated for long-term wear. To maintain their finish, we recommend keeping jewellery dry, avoiding direct contact with perfume or harsh chemicals, and storing pieces in their pouch when not in use.",
            },
            {
                question: "Can I wear my jewellery in water?",
                answer:
                    "Our rhodium and gold-plated pieces are resistant to tarnish and can withstand daily wear, including light exposure to water. We recommend gently drying your jewellery after contact with water to preserve its finish.",
            },
            {
                question: "How do I care for my jewellery?",
                answer:
                    "Clean with a soft cloth and, if needed, a small amount of mild soap diluted in water. Avoid abrasive materials or chemical cleaners. Store each piece individually in its pouch to prevent scratching.",
            },
        ],
    },
    {
        category: "Returns & Exchanges",
        items: [
            {
                question: "What is your return policy?",
                answer:
                    "We accept returns within 2 days of delivery and exchanges within 5 days of delivery on eligible items. To begin a return or exchange, please visit our Returns page or contact our customer care team.",
            },
            {
                question: "Are all items eligible for return?",
                answer:
                    "Items purchased at a discount or marked as final sale are not eligible for return or exchange.",
            },
            {
                question: "When will I receive my refund?",
                answer:
                    "Once your return has been received and inspected, refunds are processed within 7–10 working days to your original payment method.",
            },
            {
                question:
                    "My order arrived damaged or incorrect — what should I do?",
                answer:
                    "Please photograph the item and contact us within 2 days of delivery at care@iwantjewels.com. We will resolve the issue promptly.",
            },
        ],
    },
    {
        category: "Payments & Security",
        items: [
            {
                question: "What payment methods do you accept?",
                answer:
                    "We accept all major credit and debit cards, as well as PayPal. Customers based in Belgium can also pay via Bancontact.",
            },
            {
                question: "Is the I Want Jewels website secure?",
                answer:
                    "Yes. Our website uses SSL encryption to ensure that all personal and payment information is fully protected.",
            },
            {
                question: "Will I be charged import duties?",
                answer:
                    "Customers within the European Union, and those in the UK, will not be charged import duties. Customers from the US, may be subject to VAT or customs duties upon delivery. These charges are determined by your country's customs authority and are the buyer's responsibility.",
            },
        ],
    },
    {
        category: "Sizing & Gifting",
        items: [
            {
                question: "How do I find my ring size?",
                answer:
                    "We recommend using our size guide, available on each ring product page. You can also measure using a strip of paper or thin string around your finger and compare against a standard ring size chart.",
            },
            {
                question:
                    "Do necklaces and bracelets come in different lengths?",
                answer:
                    "Many of our pieces are available in multiple lengths. Our necklaces have loops at 16cm. 17cm and 18cm. Our bracelets also have an extra loop to shorten it. Please refer to the individual product page for available size options and fit guidance.",
            },
            {
                question: "Do you offer gift wrapping or gift notes?",
                answer:
                    "Yes. You can add a personalised gift note at checkout. Our packaging is designed to be gift-ready and is made from recyclable materials.",
            },
            {
                question: "Do you offer gift cards?",
                answer:
                    "Yes. I Want Jewels gift cards are available in flexible amounts, delivered instantly by email, and redeemable across our full jewellery collection — a thoughtful choice for any occasion.",
            },
        ],
    },
    {
        category: "Sustainability & Ethics",
        items: [
            {
                question: "Is I Want Jewels committed to sustainable practices?",
                answer:
                    "Sustainability is central to how we create. Our use of lab-grown diamonds reduces the environmental footprint associated with traditional diamond mining, and our packaging is made from recyclable materials. We are committed to offering fine jewellery that is both beautiful and responsibly made.",
            },
        ],
    },
    {
        category: "Customer Support",
        items: [
            {
                question: "How can I contact I Want Jewels?",
                answer: (
                    <>
                        Our customer care team is available at{" "}
                        <a
                            href="mailto:care@iwantjewels.com"
                            className="font-medium text-zinc-900 underline transition hover:text-pink-500"
                        >
                            care@iwantjewels.com
                        </a>
                        . We aim to respond to all enquiries within 1–2 business
                        days.
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
