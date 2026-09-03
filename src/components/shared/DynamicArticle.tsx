import React from "react";
import Image from "next/image";
import FAQSection, { type FAQItem } from "@/components/shared/FAQSection";
import ExploreOurStore from "@/components/shared/ExploreOurStore";

export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "subheading"; text: string }
    | { type: "bullet-list"; items: string[] }
    | { type: "numbered-list"; items: string[] }
    | { type: "table"; headers: string[]; rows: string[][] }
    | { type: "faq"; title?: string; items: FAQItem[] }
    | {
        type: "image";
        src: string;
        alt: string;
        //   caption?: string;
        width?: number;
        height?: number;
    };

export type ArticleSection = {
    heading?: string;
    content: ContentBlock[];
};

interface DynamicArticleProps {
    sections: ArticleSection[];
}

const DynamicArticle: React.FC<DynamicArticleProps> = ({ sections }) => {
    // Anchor points for the "Explore Our Store" product rows: one before the
    // "Quick Answer" section and one before the FAQ section.
    const quickAnswerIdx = sections.findIndex((section) =>
        section.heading?.toLowerCase().includes("quick answer"),
    );
    const faqIdx = sections.findIndex((section) =>
        section.content.some((block) => block.type === "faq"),
    );

    return (
        <div className="text-slate-700 text-lg font-poppins leading-relaxed">
            {sections.map((section, idx) => (
                <React.Fragment key={idx}>
                    {idx === quickAnswerIdx && <ExploreOurStore count={6} />}
                    {idx === faqIdx && <ExploreOurStore count={6} />}
                    <div
                        className={idx > 0 && section.heading ? "mt-10" : ""}
                    >
                        {section.heading && (
                        <h2 className="text-3xl md:text-4xl font-play font-semibold text-[#1f2732] mb-6">
                            {section.heading}
                        </h2>
                    )}

                    <div className="space-y-4">
                        {section.content.map((block, bIdx) => {
                            if (block.type === "paragraph") {
                                return <p key={bIdx}>{block.text}</p>;
                            }
                            if (block.type === "subheading") {
                                return (
                                    <h3
                                        key={bIdx}
                                        className="text-xl md:text-2xl font-play font-semibold text-[#1f2732] mt-8 mb-3"
                                    >
                                        {block.text}
                                    </h3>
                                );
                            }
                            if (block.type === "bullet-list") {
                                return (
                                    <ul
                                        key={bIdx}
                                        className="list-disc ml-6 mt-2 space-y-2"
                                    >
                                        {block.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                );
                            }
                            if (block.type === "numbered-list") {
                                return (
                                    <ol
                                        key={bIdx}
                                        className="list-decimal ml-6 mt-2 space-y-2"
                                    >
                                        {block.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ol>
                                );
                            }
                            if (block.type === "table") {
                                return (
                                    <div
                                        key={bIdx}
                                        className="my-6 overflow-x-auto rounded-md border border-gray-200"
                                    >
                                        <table className="w-full border-collapse text-base font-poppins">
                                            <thead>
                                                <tr>
                                                    {block.headers.map(
                                                        (header, i) => (
                                                            <th
                                                                key={i}
                                                                className="border-b border-gray-200 bg-[#f7f8fa] px-4 py-3 text-left font-play text-lg font-semibold text-[#1f2732]"
                                                            >
                                                                {header}
                                                            </th>
                                                        ),
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {block.rows.map((row, r) => (
                                                    <tr
                                                        key={r}
                                                        className={
                                                            r % 2 === 1
                                                                ? "bg-[#faf9f7]"
                                                                : "bg-white"
                                                        }
                                                    >
                                                        {row.map((cell, c) => (
                                                            <td
                                                                key={c}
                                                                className="border-t border-gray-100 px-4 py-3 align-top text-slate-700"
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
                            }
                            if (block.type === "faq") {
                                if (!block.items || block.items.length === 0) return null;
                                return (
                                    <FAQSection
                                        key={bIdx}
                                        faqs={block.items}
                                        title={
                                            block.title ??
                                            "Frequently Asked Questions"
                                        }
                                        className="my-8"
                                    />
                                );
                            }
                            if (block.type === "image") {
                                return (
                                    <figure key={bIdx} className="my-8">
                                        <div className="relative w-full overflow-hidden rounded-md">
                                            <Image
                                                src={block.src}
                                                alt={block.alt}
                                                width={block.width ?? 1200}
                                                height={block.height ?? 750}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                        {/* {block.caption && (
                                            <figcaption className="text-sm text-slate-500 mt-3 text-center italic font-poppins">
                                                {block.caption}
                                            </figcaption>
                                        )} */}
                                    </figure>
                                );
                            }
                            return null;
                        })}
                    </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default DynamicArticle;
