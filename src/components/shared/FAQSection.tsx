"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQItem[];
    title?: string;
    className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
    faqs,
    title = "Frequently Asked Questions",
    className = "",
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`mb-12 ${className}`}>
            <h2 className="text-3xl md:text-4xl font-play font-semibold text-[#1f2732] mb-8">
                {title}
            </h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                        >
                            <span className="font-poppins text-lg font-medium text-[#1f2732]">
                                {faq.question}
                            </span>
                            <span className="ml-4 flex-shrink-0">
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-[#1f2732]" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-[#1f2732]" />
                                )}
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <div className="font-poppins text-base text-gray-700 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
