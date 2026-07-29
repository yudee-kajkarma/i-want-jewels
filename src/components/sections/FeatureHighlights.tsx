"use client";

import { useTranslation } from "react-i18next";

export default function FeatureHighlights() {
    const { t } = useTranslation();

    const features: Array<{ icon: string; alt: string; lines: [string, string] }> =
        [
            {
                icon: "/icons/14k-Gold.png",
                alt: t("featureHighlights.gold14k"),
                lines: ["14K", "Gold"],
            },
            {
                icon: "/icons/925-Sterling-silver.png",
                alt: t("featureHighlights.sterlingSilver"),
                lines: ["925 Sterling", "Silver"],
            },
            {
                icon: "/icons/lab-grown-diamond.png",
                alt: t("featureHighlights.labGrownDiamonds"),
                lines: ["Lab-Grown", "Diamonds"],
            },
            {
                icon: "/icons/sweat-&-Tarnish-proof.png",
                alt: t("featureHighlights.sweatTarnishProof"),
                lines: ["Sweat & ", "Tarnish Proof"],
            },
        ];

    return (
        <section className="mx-auto max-w-[1480px] px-6 py-10 font-play lg:px-10">
            <ul className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
                {features.map((feature) => (
                    <li key={feature.alt} className="flex justify-center">
                        <div className="flex max-md:w-[160px] items-center gap-3  sm:gap-4">
                            <img
                                src={feature.icon}
                                alt={feature.alt}
                                className="h-9 w-9 flex-shrink-0 object-contain sm:h-10 sm:w-10"
                            />
                            <p className="text-[12px] font-medium uppercase leading-[1.35] tracking-[0.14em] text-Black sm:text-[13px]">
                                <span className="block">
                                    {feature.lines[0]}
                                </span>
                                <span className="block">
                                    {feature.lines[1]}
                                </span>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
