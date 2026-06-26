import React from "react";
import Image from "next/image";
import FAQSection, { type FAQItem } from "@/components/shared/FAQSection";

export type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "bullet-list"; items: string[] }
    | { type: "numbered-list"; items: string[] }
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
    return (
        <div className="text-slate-700 text-lg font-poppins leading-relaxed">
            {sections.map((section, idx) => (
                <div
                    key={idx}
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
                            if (block.type === "faq") {
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
            ))}
        </div>
    );
};

export default DynamicArticle;
