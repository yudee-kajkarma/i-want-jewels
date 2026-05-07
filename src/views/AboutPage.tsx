"use client";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import InstagramGallerySection from "../components/sections/InstagramGallerySection";
import NewsletterSection from "../components/sections/NewsletterSection";
import braceletCloseupImage from "../assets/image/bracelet.jpg";
import earringProductImage from "../assets/image/earing1.jpg";
import necklaceModelImage from "../assets/image/nackwear.jpg";
import ringModelImage from "../assets/image/ring1.jpg";

const aboutPoints = [
    "Brilliant lab-grown diamond jewellery",
    "Premium 925 sterling silver craftsmanship",
    "Elegant 14kt gold plated finishes",
];

const galleryImages = [
    necklaceModelImage.src,
    braceletCloseupImage.src,
    earringProductImage.src,
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
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-parsi">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / About Us
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            About Us
                        </h1>
                    </div>
                </section>

                <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
                    <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
                        <img
                            src={ringModelImage.src}
                            alt="Woman wearing statement jewellery"
                            className="block h-[360px] w-full object-cover md:h-[460px] lg:h-[520px]"
                        />

                        <div>
                            <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-[15px]">
                                Why Customers Choose
                            </h2>
                            <h3 className="mt-3 max-w-md text-[26px] font-medium leading-tight tracking-[-0.01em] text-zinc-900 sm:text-[32px]">
                                Modern pieces crafted to look polished every
                                day.
                            </h3>
                            <p className="mt-5 max-w-xl text-[14px] leading-7 text-zinc-600">
                                Based in the historic diamond city of Antwerp,
                                I Want Jewels creates modern jewellery crafted
                                with lab-grown diamonds, 925 sterling silver,
                                and 14kt gold plating. Our collections combine
                                responsible craftsmanship with timeless design,
                                offering elegant pieces made to elevate
                                everyday style.
                            </p>
                            <ul className="mt-7 space-y-3">
                                {aboutPoints.map((point) => (
                                    <li
                                        key={point}
                                        className="flex items-center gap-3 text-[13px] uppercase tracking-[0.14em] text-zinc-800"
                                    >
                                        <span className="h-1.5 w-1.5 bg-pink-500" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
                    <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                        Why Choose I Want Jewels
                    </h2>
                    <p className="mt-5 max-w-3xl text-[14px] leading-7 text-zinc-600">
                        At I Want Jewels, we combine Antwerp&apos;s renowned
                        jewellery heritage with modern craftsmanship to create
                        pieces that shine with elegance and quality. Our
                        collections feature lab-grown diamonds, 925 sterling
                        silver, and refined 14kt gold plating, offering the
                        brilliance of fine jewellery with responsible sourcing.
                        Each piece is thoughtfully designed to balance timeless
                        beauty with everyday wearability.
                    </p>

                    <div className="mt-10 grid gap-4 md:grid-cols-3">
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

                <section className="bg-zinc-50 px-6 py-12 lg:px-10 lg:py-16">
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
                </section>

                <NewsletterSection />

                <InstagramGallerySection />
            </main>

            <Footer />
        </div>
    );
}
