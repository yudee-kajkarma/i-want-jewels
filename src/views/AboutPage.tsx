"use client";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import InstagramGallerySection from "../components/sections/InstagramGallerySection";
import NewsletterSection from "../components/sections/NewsletterSection";
import aboutHeroImage from "../assets/about-us/aboutus1.jpeg";
import aboutGalleryImage1 from "../assets/about-us/under-about1.jpeg";
import aboutGalleryImage2 from "../assets/about-us/under-about2.jpeg";
import aboutGalleryImage3 from "../assets/about-us/under-about3.jpeg";
import { useTranslation } from "react-i18next";

const galleryImages = [
    aboutGalleryImage1.src,
    aboutGalleryImage2.src,
    aboutGalleryImage3.src,
];

const features = [
    {
        title: "Lab-Grown Diamonds",
        description:
            "Brilliant lab-grown diamonds offering the same sparkle and durability with a more responsible origin.",
        icon: "diamond",
    },
    {
        title: "925 Sterling Silver",
        description:
            "Premium 925 sterling silver crafted for lasting shine, durability, and everyday elegance.",
        icon: "silver",
    },
    {
        title: "14kt Gold Plating",
        description:
            "Luxurious 14kt gold plating that delivers rich color and a refined finish to every piece.",
        icon: "bag",
    },
    {
        title: "Made In Antwerp",
        description:
            "Inspired by Antwerp world-renowned diamond heritage and fine jewellery craftsmanship.",
        icon: "star",
    },
];

function MapPinIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path
                d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="9" r="2.5" />
        </svg>
    );
}

function ShieldCheckIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path
                d="M12 3 5 6v5.5c0 4.5 3.2 8.3 7 9.5 3.8-1.2 7-5 7-9.5V6l-7-3Z"
                strokeLinejoin="round"
            />
            <path
                d="m9.5 12 1.8 1.8L15 10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function FactoryIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M3 21V10l5 3V10l5 3V7l5 3v11H3Z" strokeLinejoin="round" />
            <path d="M7 17h2M11 17h2M15 17h2" strokeLinecap="round" />
        </svg>
    );
}

function CoinIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <circle cx="12" cy="12" r="8" />
            <path
                d="M12 7v10M9.5 9.5h3.25a1.5 1.5 0 0 1 0 3H10.5a1.5 1.5 0 0 0 0 3H14"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function DiamondGlyph({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M6 8.5 9 4h6l3 4.5L12 20 6 8.5Z" strokeLinejoin="round" />
            <path d="M6 8.5h12M9 4l3 4.5L15 4" strokeLinejoin="round" />
        </svg>
    );
}

function FeatureIcon({ icon }: { icon: string }) {
    const className = "h-7 w-7";

    switch (icon) {
        case "diamond":
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        d="M6 8.5 9 4h6l3 4.5L12 20 6 8.5Z"
                        strokeLinejoin="round"
                    />
                    <path d="M6 8.5h12M9 4l3 4.5L15 4" strokeLinejoin="round" />
                </svg>
            );
        case "silver":
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="12" cy="12" r="6.5" />
                    <path d="M12 5.5v13M5.5 12h13" strokeLinecap="round" />
                </svg>
            );
        case "bag":
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        d="M5 9.5h14l-1.1 10.5H6.1L5 9.5Z"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 9.5V8a3 3 0 1 1 6 0v1.5"
                        strokeLinecap="round"
                    />
                </svg>
            );
        default:
            return (
                <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className={className}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path
                        d="m12 4 2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8L12 4Z"
                        strokeLinejoin="round"
                    />
                </svg>
            );
    }
}

export default function AboutPage() {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-poppins">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            {t("about.breadcrumbs")}
                        </p>
                        <h1 className="mt-3 font-play text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            {t("about.title")}
                        </h1>
                    </div>
                </section>

                {/* Brand intro — story, pillars, materials, promise, CTA */}
                {/* <section className="border-b border-zinc-200 bg-white px-6 py-14 text-center lg:py-20">
                    <div className="mx-auto max-w-2xl">
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Our story
                        </p>
                        <h2 className="mt-4 font-play text-[40px] font-light leading-[1.1] tracking-[-0.01em] text-zinc-900 sm:text-[46px]">
                            I Want <em className="italic">Jewels</em>
                        </h2>
                        <p className="mt-3 text-[14px] font-light tracking-[0.08em] text-zinc-600">
                            Fine jewellery. For everyone.
                        </p>
                    </div>
                </section> */}

                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto grid max-w-[1480px] items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
                        <div className="max-w-2xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                            {t("about.whereItBegan")}
                        </p>
                        <p className="mt-5 border-l-[1.5px] border-zinc-400 pl-5 font-play text-[22px] font-light italic leading-[1.5] text-zinc-900 sm:text-[24px]">
                            {t("about.quote")}
                        </p>
                        <div className="mt-6 space-y-4 text-[15px] font-light leading-[1.8] text-zinc-600">
                            <p>
                                {t("about.story1")}
                            </p>
                            <p>
                                {t("about.story2")}
                            </p>
                            <p>
                                {t("about.story3")}
                            </p>
                        </div>
                        <div className="mt-7 flex items-start gap-3 bg-zinc-50 px-5 py-5">
                            <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-pink-500" />
                            <p className="text-[14px] font-light leading-[1.7] text-zinc-600">
                                {t("about.basedIn1")}
                                <strong className="font-medium text-zinc-900">
                                    {t("about.basedIn2")}
                                </strong>
                                {t("about.basedIn3")}
                            </p>
                        </div>
                        </div>
                        <img
                            src={aboutHeroImage.src}
                            alt="Woman wearing statement jewellery"
                            className="block h-[360px] w-full object-cover md:h-[460px] lg:h-[560px]"
                        />
                    </div>
                </section>

                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:py-16">
                    <div className="mx-auto max-w-5xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                            {t("about.whatWeStandFor")}
                        </p>
                        <div className="mt-6 grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
                            <div className="bg-white p-6 lg:p-7">
                                <ShieldCheckIcon className="h-6 w-6 text-pink-500" />
                                <h3 className="mt-3 font-play text-[18px] font-normal leading-tight text-zinc-900">
                                    {t("about.pillar1Title")}
                                </h3>
                                <p className="mt-2 text-[13px] font-light leading-[1.7] text-zinc-600">
                                    {t("about.pillar1Desc")}
                                </p>
                            </div>
                            <div className="bg-white p-6 lg:p-7">
                                <FactoryIcon className="h-6 w-6 text-pink-500" />
                                <h3 className="mt-3 font-play text-[18px] font-normal leading-tight text-zinc-900">
                                    {t("about.pillar2Title")}
                                </h3>
                                <p className="mt-2 text-[13px] font-light leading-[1.7] text-zinc-600">
                                    {t("about.pillar2Desc")}
                                </p>
                            </div>
                            <div className="bg-white p-6 lg:p-7">
                                <CoinIcon className="h-6 w-6 text-pink-500" />
                                <h3 className="mt-3 font-play text-[18px] font-normal leading-tight text-zinc-900">
                                    {t("about.pillar3Title")}
                                </h3>
                                <p className="mt-2 text-[13px] font-light leading-[1.7] text-zinc-600">
                                    {t("about.pillar3Desc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:py-16">
                    <div className="mx-auto max-w-5xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                            {t("about.materialsTitle")}
                        </p>
                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            <div className="bg-zinc-50 px-4 py-6 text-center">
                                <h3 className="font-play text-[17px] font-normal text-zinc-900">
                                    {t("about.material1Title")}
                                </h3>
                                <p className="mt-1 text-[12px] font-light leading-[1.5] text-zinc-600">
                                    {t("about.material1Desc")}
                                </p>
                            </div>
                            <div className="bg-zinc-50 px-4 py-6 text-center">
                                <h3 className="font-play text-[17px] font-normal text-zinc-900">
                                    {t("about.material2Title")}
                                </h3>
                                <p className="mt-1 text-[12px] font-light leading-[1.5] text-zinc-600">
                                    {t("about.material2Desc")}
                                </p>
                            </div>
                            <div className="bg-zinc-50 px-4 py-6 text-center">
                                <h3 className="font-play text-[17px] font-normal text-zinc-900">
                                    {t("about.material3Title")}
                                </h3>
                                <p className="mt-1 text-[12px] font-light leading-[1.5] text-zinc-600">
                                    {t("about.material3Desc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white px-6 pt-10 lg:pt-14">
                    <div className="mx-auto flex max-w-2xl items-center gap-4">
                        <div className="h-px flex-1 bg-zinc-200" />
                        <DiamondGlyph className="h-4 w-4 text-pink-500" />
                        <div className="h-px flex-1 bg-zinc-200" />
                    </div>
                </section>

                <section className="bg-white px-6 py-10 text-center lg:py-14">
                    <div className="mx-auto max-w-xl">
                        <h2 className="font-play text-[28px] font-light italic leading-[1.3] text-zinc-900 sm:text-[30px]">
                            {t("about.startCollection")}
                        </h2>
                        <p className="mt-4 text-[14px] font-light leading-[1.8] text-zinc-600">
                            {t("about.collectionDesc1")}
                        </p>
                        <p className="mt-4 text-[14px] font-light leading-[1.8] text-zinc-600">
                            {t("about.collectionDesc2")}
                        </p>
                    </div>
                </section>

                <section className="border-b border-zinc-200 bg-white px-6 pb-14 text-center">
                    <a
                        href="/products"
                        className="inline-block bg-pink-500 px-9 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-pink-600"
                    >
                        {t("about.shopCollectionBtn")}
                    </a>
                    <p className="mt-3 text-[12px] font-light tracking-[0.04em] text-zinc-400">
                        iwantjewels.com
                    </p>
                </section>

                <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
                    <div className="grid gap-4 md:grid-cols-3">
                        {galleryImages.map((image, index) => (
                            <img
                                key={image}
                                src={image}
                                alt={`About jewellery gallery ${index + 1}`}
                                className="block h-[380px] w-full object-cover md:h-[440px]"
                            />
                        ))}
                    </div>
                </section>

                {/* <section className="bg-zinc-50 px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                            What Sets Us Apart
                        </h2>
                        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature) => (
                                <div key={feature.title}>
                                    <div className="flex h-12 w-12 items-center justify-center bg-pink-500 text-white">
                                        <FeatureIcon icon={feature.icon} />
                                    </div>
                                    <h3 className="mt-5 text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-[13px] leading-6 text-zinc-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                <NewsletterSection />

                <InstagramGallerySection />
            </main>

            <Footer />
        </div>
    );
}
