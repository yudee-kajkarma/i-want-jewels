"use client";

import type { ReactNode } from "react";
import { Link } from "@/lib/router";

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Text with links written as [label](href): internal paths use the site's
 * Link (keeps the visitor's language), external ones open in a new tab.
 * Text without links is returned unchanged.
 */
export default function InlineText({ text }: { text: string }) {
    if (!text.includes("](")) return <>{text}</>;
    const parts: ReactNode[] = [];
    let last = 0;
    for (const match of text.matchAll(INLINE_LINK)) {
        const [whole, label, href] = match;
        const start = match.index ?? 0;
        if (start > last) parts.push(text.slice(last, start));
        parts.push(
            href.startsWith("/") ? (
                <Link key={start} to={href} className="font-medium text-pink-500 underline-offset-2 hover:underline">
                    {label}
                </Link>
            ) : (
                <a key={start} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-pink-500 underline-offset-2 hover:underline">
                    {label}
                </a>
            ),
        );
        last = start + whole.length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return <>{parts}</>;
}
