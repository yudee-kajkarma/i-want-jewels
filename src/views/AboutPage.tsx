"use client";

import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import InstagramGallerySection from "../components/sections/InstagramGallerySection";
import NewsletterSection from "../components/sections/NewsletterSection";
import aboutHeroImage from "../assets/about-us/aboutus1.jpeg";
import aboutGalleryImage1 from "../assets/about-us/under-about1.jpeg";
import aboutGalleryImage2 from "../assets/about-us/under-about2.jpeg";
import aboutGalleryImage3 from "../assets/about-us/under-about3.jpeg";

const aboutPoints = [
    "Brilliant lab-grown diamond jewellery",
    "Premium 925 sterling silver craftsmanship",
    "Elegant 14kt gold plated finishes",
];

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
    return (
        <div className="min-h-screen bg-white text-zinc-900 font-raleway">
            <Header />

            <main>
                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / About Us
                        </p>
                        <h1 className="mt-3 font-parsi text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            About Us
                        </h1>
                    </div>
                </section>

                {/* Brand intro — story, pillars, materials, promise, CTA */}
                {/* <section className="border-b border-zinc-200 bg-white px-6 py-14 text-center lg:py-20">
                    <div className="mx-auto max-w-2xl">
                        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Our story
                        </p>
                        <h2 className="mt-4 font-parsi text-[40px] font-light leading-[1.1] tracking-[-0.01em] text-zinc-900 sm:text-[46px]">
                            I Want <em className="italic">Jewels</em>
                        </h2>
                        <p className="mt-3 text-[14px] font-light tracking-[0.08em] text-zinc-600">
                            Fine jewellery. For everyone.
                        </p>
                    </div>
                </section> */}

                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:py-16">
                    <div className="mx-auto max-w-2xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                            Where it began
                        </p>
                        <p className="mt-5 border-l-[1.5px] border-zinc-400 pl-5 font-parsi text-[22px] font-light italic leading-[1.5] text-zinc-900 sm:text-[24px]">
                            &ldquo;I never put on jewellery around my neck again
                            — and that changed everything.&rdquo;
                        </p>
                        <div className="mt-6 space-y-4 text-[15px] font-light leading-[1.8] text-zinc-600">
                            <p>
                                At 16, a severe allergic reaction to nickel
                                sulphate — triggered by a sentimental pendant —
                                left a lasting mark. Not just physically, but in
                                the way we thought about jewellery altogether.
                                If something so personal could cause so much
                                harm, it was time to do something about it.
                            </p>
                            <p>
                                That experience planted the seed for what would
                                eventually become I Want Jewels: a determination
                                to create pieces that are beautiful, wearable,
                                and safe — jewellery that never forces you to
                                choose between style and your skin.
                            </p>
                            <p>
                                With over 40 years in the diamond and jewellery
                                industry, we have the knowledge, the
                                relationships, and the craft to make it happen —
                                and we believe it&apos;s time to bring that
                                expertise directly to you.
                            </p>
                        </div>
                        <div className="mt-7 flex items-start gap-3 bg-zinc-50 px-5 py-5">
                            <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-pink-500" />
                            <p className="text-[14px] font-light leading-[1.7] text-zinc-600">
                                Based in{" "}
                                <strong className="font-medium text-zinc-900">
                                    Antwerp
                                </strong>{" "}
                                — the diamond capital of the world — we have
                                direct access to the finest stones and the
                                deepest industry expertise. It&apos;s an
                                advantage most jewellery brands simply
                                don&apos;t have, and one we pass on to every
                                customer.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:py-16">
                    <div className="mx-auto max-w-5xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                            What we stand for
                        </p>
                        <div className="mt-6 grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
                            <div className="bg-white p-6 lg:p-7">
                                <ShieldCheckIcon className="h-6 w-6 text-pink-500" />
                                <h3 className="mt-3 font-parsi text-[18px] font-normal leading-tight text-zinc-900">
                                    Hypoallergenic by design
                                </h3>
                                <p className="mt-2 text-[13px] font-light leading-[1.7] text-zinc-600">
                                    Every piece is crafted to be kind to your
                                    skin — free from nickel and the irritants
                                    that so many people quietly suffer from.
                                </p>
                            </div>
                            <div className="bg-white p-6 lg:p-7">
                                <FactoryIcon className="h-6 w-6 text-pink-500" />
                                <h3 className="mt-3 font-parsi text-[18px] font-normal leading-tight text-zinc-900">
                                    Made in our own factory
                                </h3>
                                <p className="mt-2 text-[13px] font-light leading-[1.7] text-zinc-600">
                                    Direct factory production means we control
                                    every step — quality, materials, and finish
                                    — without compromise or middlemen inflating
                                    the cost.
                                </p>
                            </div>
                            <div className="bg-white p-6 lg:p-7">
                                <CoinIcon className="h-6 w-6 text-pink-500" />
                                <h3 className="mt-3 font-parsi text-[18px] font-normal leading-tight text-zinc-900">
                                    Accessible luxury
                                </h3>
                                <p className="mt-2 text-[13px] font-light leading-[1.7] text-zinc-600">
                                    Fine jewellery shouldn&apos;t be a
                                    privilege. We&apos;ve built our model to
                                    bring real quality within reach — especially
                                    for the next generation of jewellery lovers.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:py-16">
                    <div className="mx-auto max-w-5xl">
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                            Our materials
                        </p>
                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            <div className="bg-zinc-50 px-4 py-6 text-center">
                                <h3 className="font-parsi text-[17px] font-normal text-zinc-900">
                                    Sterling silver base
                                </h3>
                                <p className="mt-1 text-[12px] font-light leading-[1.5] text-zinc-600">
                                    A solid, tarnish-resistant foundation
                                    that&apos;s gentle on skin and built to
                                    last.
                                </p>
                            </div>
                            <div className="bg-zinc-50 px-4 py-6 text-center">
                                <h3 className="font-parsi text-[17px] font-normal text-zinc-900">
                                    14kt gold plating
                                </h3>
                                <p className="mt-1 text-[12px] font-light leading-[1.5] text-zinc-600">
                                    A rich, warm finish that resists
                                    discolouration and stands the test of daily
                                    wear.
                                </p>
                            </div>
                            <div className="bg-zinc-50 px-4 py-6 text-center">
                                <h3 className="font-parsi text-[17px] font-normal text-zinc-900">
                                    Lab grown diamonds
                                </h3>
                                <p className="mt-1 text-[12px] font-light leading-[1.5] text-zinc-600">
                                    Ethically sourced by us — identical in
                                    quality to mined diamonds, at a fraction of
                                    the cost.
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
                        <h2 className="font-parsi text-[28px] font-light italic leading-[1.3] text-zinc-900 sm:text-[30px]">
                            Start your collection with us.
                        </h2>
                        <p className="mt-4 text-[14px] font-light leading-[1.8] text-zinc-600">
                            We want to change how people think about jewellery —
                            not just as something you wear, but as something you
                            invest in. Precious metals and lab grown diamonds
                            hold real value. We want to help a new generation
                            understand that, and to start building something
                            meaningful — one beautiful, affordable piece at a
                            time.
                        </p>
                        <p className="mt-4 text-[14px] font-light leading-[1.8] text-zinc-600">
                            This is why we built I Want Jewels. And this is
                            where your story begins.
                        </p>
                    </div>
                </section>

                <section className="border-b border-zinc-200 bg-white px-6 pb-14 text-center">
                    <a
                        href="/products"
                        className="inline-block bg-pink-500 px-9 py-3.5 text-[13px] font-medium uppercase tracking-[0.12em] text-white transition hover:bg-pink-600"
                    >
                        Shop the collection
                    </a>
                    <p className="mt-3 text-[12px] font-light tracking-[0.04em] text-zinc-400">
                        iwantjewels.com
                    </p>
                </section>

                <section className="mx-auto max-w-[1480px] px-6 py-12 lg:px-10 lg:py-16">
                    <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
                        <img
                            src={aboutHeroImage.src}
                            alt="Woman wearing statement jewellery"
                            className="block h-[360px] w-full object-cover md:h-[460px] lg:h-[520px]"
                        />

                        <div>
                            <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-[15px] font-parsi">
                                Why Customers Choose
                            </h2>
                            <h3 className="mt-3 max-w-md text-[26px] font-medium leading-tight tracking-[-0.01em] text-zinc-900 sm:text-[32px] font-parsi">
                                Modern pieces crafted to look polished every
                                day.
                            </h3>
                            <p className="mt-5 max-w-xl text-[14px] leading-7 text-zinc-600">
                                Based in the historic diamond city of Antwerp, I
                                Want Jewels creates modern jewellery crafted
                                with lab-grown diamonds, 925 sterling silver,
                                and 14kt gold plating. Our collections combine
                                responsible craftsmanship with timeless design,
                                offering elegant pieces made to elevate everyday
                                style.
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
                    <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl font-parsi">
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
