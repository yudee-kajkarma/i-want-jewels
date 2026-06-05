"use client";

import { useEffect, useRef, useState } from "react";
import {
    Gem,
    Gift,
    Link2,
    Phone,
    ShieldCheck,
    Sparkles,
    Truck,
} from "lucide-react";
import { Link } from "@/lib/router";
import {
    getAllProductFilters,
    getProducts,
} from "../../services/productService";
import type { Product } from "../../types/product";
import braceletCloseupImage from "../../assets/image/bracelet.jpg";
import bannerGiftcardImage from "../../assets/image/Gift-card.png";
import concettaDesktopBanner from "../../assets/concetaa-shopiing-banner/D.Concetta-Collection.jpeg";
import concettaMobileBanner from "../../assets/concetaa-shopiing-banner/M.Concetta-Collection.png";
import earringImage from "../../assets/image/earing.jpeg";
import earringProductImage from "../../assets/image/earing.jpg";
import necklaceImage from "../../assets/image/nackwear.jpg";
import ringImage from "../../assets/image/ring.jpg";
import ringModelImage from "../../assets/image/ring.jpeg";
import brandLogo from "../../assets/logo.svg";
import earringsCategoryImage from "../../assets/categories/Earrings.jpg";
import necklaceCategoryImage from "../../assets/categories/Necklace.jpg";
import braceletCategoryImage from "../../assets/categories/Bracelet.jpg";
import ringsCategoryImage from "../../assets/categories/Rings.jpg";
import collectionsCategoryImage from "../../assets/about-us/collections.jpg.jpeg";
import ProductCard from "./ProductCard";
import ShopTheLookBanner from "./ShopTheLookBanner";
import InstagramGallerySection from "./InstagramGallerySection";
import NewsletterSection from "./NewsletterSection";
import ProductCardSkeleton from "./ProductCardSkeleton";
import {
    buildCollectionFilterHref,
    buildCollectionGroups,
    type UmbrellaCollectionGroup,
} from "../../utils/featuredCollections";

const productSkeletons = Array.from({ length: 5 }, (_, index) => index);

const categoryShowcase: Array<{ label: string; image: string; href: string }> =
    [
        {
            label: "Earrings",
            image: earringsCategoryImage.src,
            href: "/products?category=Earrings",
        },
        {
            label: "Necklaces",
            image: necklaceCategoryImage.src,
            href: "/products?category=Necklace",
        },
        {
            label: "Bracelet",
            image: braceletCategoryImage.src,
            href: "/products?category=Bracelets",
        },
        {
            label: "Rings",
            image: ringsCategoryImage.src,
            href: "/products?category=Rings",
        },
    ];

const fallbackCategoryLabels = [
    "All",
    "Necklace",
    "Bracelet",
    "Ring",
    "Earrings",
];

const budgetCollections = [
    {
        title: "Under €200",
        eyebrow: "Gift Picks",
        image: earringProductImage.src,
        href: "/products?price_max=200",
    },
    {
        title: "Under €300",
        eyebrow: "For Stacks",
        image: ringImage.src,
        href: "/products?price_max=300",
    },
    {
        title: "Under €400",
        eyebrow: "Best Value",
        image: necklaceImage.src,
        href: "/products?price_max=400",
    },
];

const qualityPoints = [
    "Brilliant lab-grown diamond jewellery",
    "Premium 925 sterling silver craftsmanship",
    "Elegant 14kt gold plated finishes",
];

type ConcettaHotspotPosition = {
    left: string;
    top: string;
    size: number;
};

type ConcettaHotspot = {
    label: string;
    href: string;
    desktop: ConcettaHotspotPosition;
    mobile: ConcettaHotspotPosition;
};

// Markers sit over each jewellery piece in the Concetta banner photos and
// deep-link to the matching product. Positions are percentages of the image,
// so they track the photo as it scales across breakpoints.
const concettaHotspots: ConcettaHotspot[] = [
    {
        label: "Earrings",
        href: "products/concetta-long-lab-grown-diamond-earrings-14kt-gold-plating-663613",
        desktop: { left: "55%", top: "21%", size: 60 },
        mobile: { left: "42%", top: "28%", size: 34 },
    },
    {
        label: "Pendant",
        href: "/products/aurora-spark-lab-grown-diamond-necklace-pendant-14kt-gold-639613",
        desktop: { left: "66.5%", top: "71%", size: 42 },
        mobile: { left: "59%", top: "59%", size: 26 },
    },
    {
        label: "Necklace",
        href: "/products/aurora-y-836221",
        desktop: { left: "68%", top: "87%", size: 78 },
        mobile: { left: "61%", top: "66%", size: 40 },
    },
    {
        label: "Bracelet",
        href: "/products/concetta-lab-grown-diamond-bracelet-classic-chain-14kt-gold-347645",
        desktop: { left: "83.5%", top: "88%", size: 64 },
        mobile: { left: "83%", top: "73%", size: 34 },
    },
];

function normalizeCategoryValue(value: string): string {
    return value.trim().toLowerCase().replace(/ies$/, "y").replace(/s$/, "");
}

function toTitleCase(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map((segment) => segment[0].toUpperCase() + segment.slice(1))
        .join(" ");
}

function buildDynamicCategories(rawCategories: string[]): string[] {
    const uniqueCategoryMap = new Map<string, string>();

    rawCategories.forEach((category) => {
        const normalizedCategory = normalizeCategoryValue(category);

        if (!normalizedCategory || uniqueCategoryMap.has(normalizedCategory)) {
            return;
        }

        uniqueCategoryMap.set(normalizedCategory, toTitleCase(category));
    });

    return Array.from(uniqueCategoryMap.values());
}

function buildCategoryQueryCandidates(category: string): string[] {
    const trimmedCategory = category.trim();

    if (!trimmedCategory || trimmedCategory === "All") {
        return [];
    }

    const normalizedCategory = normalizeCategoryValue(trimmedCategory);
    const singularTitle = toTitleCase(normalizedCategory);
    const pluralTitle = singularTitle.endsWith("s")
        ? singularTitle
        : `${singularTitle}s`;

    return Array.from(
        new Set(
            [
                trimmedCategory,
                toTitleCase(trimmedCategory),
                singularTitle,
                pluralTitle,
                normalizedCategory,
                `${normalizedCategory}s`,
            ].filter(Boolean),
        ),
    );
}

function buildProductsFilterHref(category: string): string {
    if (category === "All") {
        return "/products";
    }

    return `/products?category=${encodeURIComponent(category)}`;
}

export default function HomeBody() {
    const [categories, setCategories] = useState<string[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [collectionGroups, setCollectionGroups] = useState<
        UmbrellaCollectionGroup[]
    >([]);
    const [activeCollection, setActiveCollection] = useState<string>("");
    const [collectionProducts, setCollectionProducts] = useState<Product[]>([]);
    const [isLoadingCollection, setIsLoadingCollection] = useState(false);
    const [collectionError, setCollectionError] = useState("");
    const collectionCacheRef = useRef<Map<string, Product[]>>(new Map());
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [categoriesError, setCategoriesError] = useState("");
    const [productsError, setProductsError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadCategories() {
            try {
                const filtersData = await getAllProductFilters();
                const dynamicCategories = buildDynamicCategories(
                    filtersData.categories ?? [],
                );
                const groups = buildCollectionGroups(
                    (filtersData.collections ?? []).filter(Boolean),
                );

                if (!isMounted) {
                    return;
                }

                setCategories(dynamicCategories);
                setCollectionGroups(groups);
                if (groups.length > 0) {
                    setActiveCollection(
                        (current) => current || groups[0].label,
                    );
                }
                setCategoriesError("");
            } catch {
                if (!isMounted) {
                    return;
                }

                setCategories([]);
                setCollectionGroups([]);
                setCategoriesError("Unable to load collections right now.");
            }
        }

        void loadCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        let isMounted = true;

        async function loadProductsByCategory() {
            setIsLoadingProducts(true);

            try {
                let response = await getProducts({ page: 1, limit: 12 });

                if (activeCategory !== "All") {
                    const categoryCandidates =
                        buildCategoryQueryCandidates(activeCategory);
                    let matchedResponse = null as Awaited<
                        ReturnType<typeof getProducts>
                    > | null;

                    for (const categoryCandidate of categoryCandidates) {
                        const categoryResponse = await getProducts({
                            page: 1,
                            limit: 12,
                            category: categoryCandidate,
                        });

                        if (categoryResponse.products.length > 0) {
                            matchedResponse = categoryResponse;
                            break;
                        }
                    }

                    if (!matchedResponse) {
                        for (const tagCandidate of categoryCandidates) {
                            const tagResponse = await getProducts({
                                page: 1,
                                limit: 12,
                                tags: tagCandidate,
                            });

                            if (tagResponse.products.length > 0) {
                                matchedResponse = tagResponse;
                                break;
                            }
                        }
                    }

                    if (matchedResponse) {
                        response = matchedResponse;
                    } else {
                        response = { ...response, products: [] };
                    }
                }

                if (!isMounted) {
                    return;
                }

                setFeaturedProducts(response.products);
                setProductsError("");
            } catch {
                if (!isMounted) {
                    return;
                }

                setFeaturedProducts([]);
                setProductsError("Unable to load the latest pieces right now.");
            } finally {
                if (isMounted) {
                    setIsLoadingProducts(false);
                }
            }
        }

        void loadProductsByCategory();

        return () => {
            isMounted = false;
        };
    }, [activeCategory]);

    useEffect(() => {
        if (!activeCollection) {
            setCollectionProducts([]);
            return;
        }

        const activeGroup = collectionGroups.find(
            (group) => group.label === activeCollection,
        );

        if (!activeGroup || activeGroup.members.length === 0) {
            setCollectionProducts([]);
            setIsLoadingCollection(false);
            setCollectionError("");
            return;
        }

        const cached = collectionCacheRef.current.get(activeCollection);
        if (cached) {
            setCollectionProducts(cached);
            setIsLoadingCollection(false);
            setCollectionError("");
            return;
        }

        let isMounted = true;
        setIsLoadingCollection(true);
        setCollectionError("");

        (async () => {
            try {
                const response = await getProducts({
                    page: 1,
                    limit: 20,
                    collection: activeGroup.members,
                });

                if (!isMounted) {
                    return;
                }

                collectionCacheRef.current.set(
                    activeCollection,
                    response.products,
                );
                setCollectionProducts(response.products);
            } catch {
                if (!isMounted) {
                    return;
                }

                setCollectionProducts([]);
                setCollectionError("Unable to load this collection right now.");
            } finally {
                if (isMounted) {
                    setIsLoadingCollection(false);
                }
            }
        })();

        return () => {
            isMounted = false;
        };
    }, [activeCollection, collectionGroups]);

    const categoryTabs =
        categories.length > 0
            ? ["All", ...categories.slice(0, 4)]
            : fallbackCategoryLabels;
    const latestProducts = featuredProducts.slice(0, 5);
    const newlyLaunched = featuredProducts.slice(0, 2);
    const concettaGroup = collectionGroups.find(
        (group) => group.label === "Concetta",
    );
    const collectionCardHref = concettaGroup
        ? buildCollectionFilterHref(concettaGroup)
        : "/products?collection=Concetta";
    const categoryCards: Array<{ label: string; image: string; href: string }> =
        [
            ...categoryShowcase,
            {
                label: "Collection",
                image: collectionsCategoryImage.src,
                href: collectionCardHref,
            },
        ];

    return (
        <>
            <section className="mx-auto max-w-[1480px] px-6 py-16 font-parsi lg:px-10">
                <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                    Categories
                </h2>
                <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {categoryCards.map((item, index) => (
                        <Link
                            key={item.label}
                            to={item.href}
                            className="iwj-category-card group block w-[260px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
                            style={{
                                animationDelay: `${120 + index * 130}ms`,
                            }}
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.label}
                                    className="iwj-category-card-image block h-[420px] w-full object-cover object-center sm:h-[460px] lg:h-[500px]"
                                />
                            </div>
                            <p className="iwj-category-card-label mt-4 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-[13px]">
                                {item.label}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>
            {/* Discover Jewellery section */}
            <section className="mx-auto max-w-[1480px] px-6 py-12 font-parsi lg:px-10">
                <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                    Discover Our Latest Jewellery Pieces
                </h2>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                    {categoryTabs.map((item) => {
                        const isActive = activeCategory === item;

                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setActiveCategory(item)}
                                className={`px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] transition sm:px-6 sm:py-3 sm:text-[13px] ${
                                    isActive
                                        ? "bg-pink-500 text-white"
                                        : "border border-zinc-800 bg-white text-zinc-800 hover:bg-zinc-50"
                                }`}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-10 grid md:grid-cols-2 gap-5 sm:gap-6 grid-cols-2 lg:grid-cols-4">
                    {isLoadingProducts
                        ? productSkeletons
                              .slice(0, 4)
                              .map((item) => <ProductCardSkeleton key={item} />)
                        : latestProducts
                              .slice(0, 4)
                              .map((item) => (
                                  <ProductCard
                                      key={item.id}
                                      item={item}
                                      className="aspect-square md:aspect-auto h-[10rem]  md:h-[30rem]"
                                  />
                              ))}
                </div>

                {!isLoadingProducts && latestProducts.length === 0 ? (
                    <div className="mt-8 border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
                        <h3 className="text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800">
                            No products found for {activeCategory}
                        </h3>
                        <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                            Choose another tab or open the full products page to
                            explore more results.
                        </p>
                    </div>
                ) : null}

                <div className="mt-10 flex justify-start">
                    <Link
                        to={buildProductsFilterHref(activeCategory)}
                        className="border border-zinc-800 bg-white px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white sm:text-[13px]"
                    >
                        View All New Pieces
                    </Link>
                </div>
                {productsError ? (
                    <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-rose-600">
                        {productsError}
                    </p>
                ) : null}
            </section>

            {/* Banner Card — Concetta shoppable banner */}
            <section className="mx-auto max-w-[1480px] px-6 py-12 font-parsi lg:px-10">
                <div className="relative overflow-hidden">
                    {/* Desktop */}
                    <div className="relative hidden lg:block">
                        <img
                            src={concettaDesktopBanner.src}
                            alt="Crafted for modern elegance — the Concetta collection"
                            className="block h-auto w-full"
                        />

                        <div className="pointer-events-none absolute left-0 top-0 p-12 xl:p-16">
                            <h2 className="text-[34px] font-medium uppercase leading-[1.18] tracking-[0.16em] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.28)] xl:text-[42px]">
                                <span className="block">Crafted For</span>
                                <span className="block">Modern Elegance</span>
                            </h2>
                        </div>

                        <Link
                            to={collectionCardHref}
                            className="absolute bottom-12 left-12 inline-block border border-white px-8 py-3.5 text-[13px] font-medium uppercase tracking-[0.24em] text-white transition hover:bg-white hover:text-zinc-900 xl:left-16"
                        >
                            Shop Now
                        </Link>

                        {concettaHotspots.map((hotspot) => (
                            <Link
                                key={`concetta-desktop-${hotspot.label}`}
                                to={hotspot.href}
                                aria-label={`Shop ${hotspot.label}`}
                                style={{
                                    left: hotspot.desktop.left,
                                    top: hotspot.desktop.top,
                                    width: hotspot.desktop.size,
                                    height: hotspot.desktop.size,
                                }}
                                className="group/hot absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/90 bg-white/0 shadow-[0_0_18px_rgba(0,0,0,0.12)] transition duration-300 hover:scale-110 hover:border-white hover:bg-white/15"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.22)] transition group-hover/hot:scale-150" />
                                <span className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-800 opacity-0 shadow-md transition duration-300 group-hover/hot:opacity-100">
                                    {hotspot.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile */}
                    <div className="relative lg:hidden">
                        <img
                            src={concettaMobileBanner.src}
                            alt="Crafted for modern elegance — the Concetta collection"
                            className="block h-auto w-full"
                        />

                        <div className="absolute bottom-5 left-5">
                            <h2 className="text-[18px] font-medium uppercase leading-[1.22] tracking-[0.12em] text-[#2a211c]">
                                <span className="block">
                                    Crafted For Modern
                                </span>
                                <span className="block">Elegance</span>
                            </h2>
                            <Link
                                to={collectionCardHref}
                                className="mt-3 inline-block border border-[#2a211c] px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#2a211c] transition hover:bg-[#2a211c] hover:text-white"
                            >
                                Shop Now
                            </Link>
                        </div>

                        {concettaHotspots.map((hotspot) => (
                            <Link
                                key={`concetta-mobile-${hotspot.label}`}
                                to={hotspot.href}
                                aria-label={`Shop ${hotspot.label}`}
                                style={{
                                    left: hotspot.mobile.left,
                                    top: hotspot.mobile.top,
                                    width: hotspot.mobile.size,
                                    height: hotspot.mobile.size,
                                }}
                                className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/95 bg-white/0 shadow-[0_0_12px_rgba(0,0,0,0.18)] transition hover:bg-white/20"
                            >
                                <span className="h-1 w-1 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.22)]" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {/* Shop by Collection */}
            {collectionGroups.length > 0 ? (
                <section className="mx-auto max-w-[1480px] px-6 py-12 font-parsi lg:px-10">
                    <h2 className="text-[14px] font-medium uppercase tracking-[0.22em] text-zinc-600 sm:text-xl">
                        Shop By Collection
                    </h2>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                        {collectionGroups.map(({ label }) => {
                            const isActive = activeCollection === label;

                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => setActiveCollection(label)}
                                    className={`px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] transition sm:px-6 sm:py-3 sm:text-[13px] ${
                                        isActive
                                            ? "bg-pink-500 text-white"
                                            : "border border-zinc-800 bg-white text-zinc-800 hover:bg-zinc-50"
                                    }`}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {isLoadingCollection ? (
                            productSkeletons.slice(0, 6).map((item) => (
                                <div
                                    key={`collection-skeleton-${item}`}
                                    className="w-[260px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
                                >
                                    <ProductCardSkeleton />
                                </div>
                            ))
                        ) : collectionProducts.length > 0 ? (
                            collectionProducts.map((item) => (
                                <div
                                    key={`collection-${item.id}`}
                                    className="w-[260px] flex-shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
                                >
                                    <ProductCard
                                        item={item}
                                        className="h-[420px] sm:h-[460px] lg:h-[500px]"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                                No products in this collection yet.
                            </p>
                        )}
                    </div>

                    {collectionError ? (
                        <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-rose-600">
                            {collectionError}
                        </p>
                    ) : null}

                    <div className="mt-10 flex justify-start">
                        <Link
                            to={buildCollectionFilterHref(
                                collectionGroups.find(
                                    (group) => group.label === activeCollection,
                                ),
                            )}
                            className="border border-zinc-800 bg-white px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-800 transition hover:bg-zinc-900 hover:text-white sm:text-[13px]"
                        >
                            {activeCollection
                                ? `View All in ${activeCollection}`
                                : "View All New Pieces"}
                        </Link>
                    </div>
                </section>
            ) : null}

            {/* Shop Banner */}
            <ShopTheLookBanner />
            {/* Giftcard Banner section */}
            <section className="mx-auto max-w-[1480px] px-6 py-12 font-raleway lg:px-10">
                <div className="relative overflow-hidden">
                    <img
                        src={bannerGiftcardImage.src}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
                    />
                    <div className="relative flex items-center justify-center px-6 py-12 sm:px-10 lg:justify-start lg:px-14 lg:py-20">
                        <div className="w-full max-w-[440px] bg-black px-8 py-10 text-white sm:px-10 sm:py-12">
                            <h2 className="text-center text-[22px] font-medium uppercase leading-[1.15] tracking-[0.16em] sm:text-[26px] font-parsi">
                                <span className="block">The Perfect Gift,</span>
                                <span className="block">Every Time</span>
                            </h2>
                            <p className="mt-3 text-center text-[12px] tracking-wide text-white/90">
                                Give them the freedom to choose jewellery that
                                feels truly personal.
                            </p>

                            <ul className="mt-10 space-y-2 pl-2 text-[13px] text-white/95">
                                <li>• Delivered instantly by email</li>
                                <li>• Available in flexible amounts</li>
                                <li>• Redeemable across all jewellery</li>
                                <li>• Ideal for every special moment</li>
                            </ul>

                            <p className="mt-10 text-center text-[11px] tracking-wide text-white/80">
                                Simple. Personal. Always appreciated.
                            </p>

                            <Link
                                to="/products?category=Gift%20card"
                                className="mt-3 block w-full bg-pink-500 px-6 py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-pink-600 sm:text-[13px] font-parsi"
                            >
                                Shop Gift Cards
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterSection />

            <InstagramGallerySection />
        </>
    );
}
