"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CurrencyCode } from "../../utils/price";

type CurrencySelectorRowProps = {
    currency: CurrencyCode;
    setCurrency: (currency: CurrencyCode) => void;
    variant?: "mobile" | "desktop";
};

const CURRENCY_ITEMS: Array<{
    code: CurrencyCode;
    flag: string;
    label: string;
}> = [
    {
        code: "eur",
        flag: "https://flagcdn.com/w40/eu.png",
        label: "European Union (EUR €)",
    },
    {
        code: "pou",
        flag: "https://flagcdn.com/w40/gb.png",
        label: "United Kingdom (GBP £)",
    },
];

export default function CurrencySelectorRow({
    currency,
    setCurrency,
    variant = "mobile",
}: CurrencySelectorRowProps) {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const selectedCurrency = useMemo(
        () =>
            CURRENCY_ITEMS.find((item) => item.code === currency) ??
            CURRENCY_ITEMS[0],
        [currency]
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const buttonClassName =
        variant === "desktop"
            ? "inline-flex w-[200px] max-w-[220px] items-center justify-between gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-700 hover:border-zinc-400"
            : "inline-flex min-w-[230px] items-center justify-between gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 hover:border-zinc-400";

    const dropdownClassName =
        "absolute right-0 top-[calc(100%+8px)] z-50 min-w-[250px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl";

    const content = (
        <div ref={rootRef} className="relative">
            <button
                type="button"
                aria-label="Select currency"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className={buttonClassName}
            >
                <span className="flex items-center gap-2 truncate">
                    <img
                        src={selectedCurrency.flag}
                        alt={selectedCurrency.label}
                        className="h-5 w-5 rounded-full object-cover"
                    />
                    <span className="truncate">{selectedCurrency.label}</span>
                </span>

                <span className="text-[10px] text-zinc-500">▼</span>
            </button>

            {isOpen && (
                <div
                    className={dropdownClassName}
                    role="listbox"
                    aria-label="Currency options"
                >
                    {CURRENCY_ITEMS.map((item) => (
                        <button
                            key={item.code}
                            type="button"
                            onClick={() => {
                                setCurrency(item.code);
                                setIsOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm ${
                                item.code === currency
                                    ? "bg-zinc-100 text-zinc-900"
                                    : "hover:bg-zinc-50 text-zinc-700"
                            }`}
                        >
                            <img
                                src={item.flag}
                                alt={item.label}
                                className="h-5 w-5 rounded-full object-cover"
                            />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    if (variant === "desktop") return content;

    return (
        <label className="flex items-center justify-between gap-3 text-sm text-zinc-700">
            <span>Currency</span>
            {content}
        </label>
    );
}