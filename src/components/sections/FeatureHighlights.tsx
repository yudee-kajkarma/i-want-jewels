"use client";

import { useTranslation } from "react-i18next";

export default function FeatureHighlights() {
  const { t } = useTranslation();

  const features: Array<{
    icon: string;
    altKey: string;
    line1Key: string;
    line2Key: string;
  }> = [
    {
      icon: "/icons/14k-Gold.png",
      altKey: "featureHighlights.gold14k",
      line1Key: "featureHighlights.gold14kLine1",
      line2Key: "featureHighlights.gold14kLine2",
    },
    {
      icon: "/icons/925-Sterling-silver.png",
      altKey: "featureHighlights.sterlingSilver",
      line1Key: "featureHighlights.sterlingSilverLine1",
      line2Key: "featureHighlights.sterlingSilverLine2",
    },
    {
      icon: "/icons/lab-grown-diamond.png",
      altKey: "featureHighlights.labGrownDiamonds",
      line1Key: "featureHighlights.labGrownDiamondsLine1",
      line2Key: "featureHighlights.labGrownDiamondsLine2",
    },
    {
      icon: "/icons/sweat-&-Tarnish-proof.png",
      altKey: "featureHighlights.sweatTarnishProof",
      line1Key: "featureHighlights.sweatTarnishProofLine1",
      line2Key: "featureHighlights.sweatTarnishProofLine2",
    },
  ];

  return (
    <section className="mx-auto max-w-[1480px] px-6 py-10 font-play lg:px-10">
      <ul className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
        {features.map((feature) => (
          <li key={feature.altKey} className="flex justify-center">
            <div className="flex max-md:w-[160px] items-center gap-3  sm:gap-4">
              <img
                src={feature.icon}
                alt={t(feature.altKey)}
                className="h-9 w-9 flex-shrink-0 object-contain sm:h-10 sm:w-10"
              />
              <p className="text-[12px] font-medium uppercase leading-[1.35] tracking-[0.14em] text-Black sm:text-[13px]">
                <span className="block">{t(feature.line1Key)}</span>
                <span className="block">{t(feature.line2Key)}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
