"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Pagination from "../components/sections/Pagination";
import ProductCard from "../components/sections/ProductCard";
import ProductsFilters from "../components/sections/ProductsFilters";
import { useCurrency } from "../context/CurrencyContext";
import { getProducts } from "../services/productService";
import type {
    ProductAllFilters,
    ProductsApiResult,
    ProductsFilterState,
} from "../types/product";
import { getCurrencyIsoCode, getPriceAmount } from "../utils/price";
import type { CurrencyCode } from "../utils/price";

const productsPerPage = 10;

type SortOption = "featured" | "title-asc" | "price-asc" | "price-desc";

function FilterIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
        </svg>
    );
}

function formatFilterLabel(value: string): string {
    return value
        .split(" ")
        .map((segment) =>
            segment ? segment[0].toUpperCase() + segment.slice(1) : segment,
        )
        .join(" ");
}

function buildDefaultFilterState(
    filterOptions: ProductAllFilters | null,
    currency: CurrencyCode,
): ProductsFilterState {
    return {
        page: 1,
        search: "",
        category: "",
        stoneType: "",
        color: "",
        shape: "",
        origin: "",
        treatment: "",
        certificate: "",
        measurement: "",
        vendor: "",
        tags: [],
        metal: [],
        priceMin: String(filterOptions?.priceRange.min?.[currency] ?? 0),
        priceMax: String(filterOptions?.priceRange.max?.[currency] ?? 0),
        carat: "",
    };
}

function buildFilterSearchParams(
    filters: ProductsFilterState,
    filterOptions: ProductAllFilters | null,
    currency: CurrencyCode,
): string {
    const searchParams = new URLSearchParams();
    const defaultMinimumPrice = String(
        filterOptions?.priceRange.min?.[currency] ?? 0,
    );
    const defaultMaximumPrice = String(
        filterOptions?.priceRange.max?.[currency] ?? 0,
    );

    if (filters.page > 1) {
        searchParams.set("page", String(filters.page));
    }

    if (filters.search.trim()) {
        searchParams.set("search", filters.search.trim());
    }

    if (filters.category) {
        searchParams.set("category", filters.category);
    }

    if (filters.stoneType) {
        searchParams.set("stoneType", filters.stoneType);
    }

    if (filters.color) {
        searchParams.set("color", filters.color);
    }

    if (filters.shape) {
        searchParams.set("shape", filters.shape);
    }

    if (filters.origin) {
        searchParams.set("origin", filters.origin);
    }

    if (filters.treatment) {
        searchParams.set("treatment", filters.treatment);
    }

    if (filters.certificate) {
        searchParams.set("certificate", filters.certificate);
    }

    if (filters.measurement) {
        searchParams.set("measurement", filters.measurement);
    }

    if (filters.vendor) {
        searchParams.set("vendor", filters.vendor);
    }

    if (filters.tags.length > 0) {
        searchParams.set("tags", filters.tags.join(","));
    }

    if (filters.metal.length > 0) {
        searchParams.set("metal", filters.metal.join(","));
    }

    if (filters.priceMin && filters.priceMin !== defaultMinimumPrice) {
        searchParams.set("price_min", filters.priceMin);
    }

    if (filters.priceMax && filters.priceMax !== defaultMaximumPrice) {
        searchParams.set("price_max", filters.priceMax);
    }

    if (filters.carat) {
        searchParams.set("carat", filters.carat);
    }

    return searchParams.toString();
}

type ProductsPageProps = {
    initialProductsData?: ProductsApiResult | null;
    initialFilterOptions?: ProductAllFilters | null;
    initialFilterState?: ProductsFilterState | null;
};

export default function ProductsPage({
    initialProductsData = null,
    initialFilterOptions = null,
    initialFilterState = null,
}: ProductsPageProps) {
    const pathname = usePathname();
    const { currency } = useCurrency();
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>("featured");
    const defaultFilterState = useMemo(
        () => buildDefaultFilterState(initialFilterOptions, currency),
        [initialFilterOptions, currency],
    );
    const [filters, setFilters] = useState<ProductsFilterState>(
        initialFilterState ?? defaultFilterState,
    );
    const [productsData, setProductsData] = useState<ProductsApiResult | null>(
        initialProductsData,
    );
    const topCategories = useMemo(
        () =>
            initialFilterOptions?.categories?.length
                ? initialFilterOptions.categories.slice(0, 5)
                : ["earrings", "rings", "bracelets", "necklace", "gift card"],
        [initialFilterOptions],
    );

    const products = productsData?.products ?? [];
    const pagination = productsData?.pagination ?? null;
    const appliedFilterKeys = productsData?.appliedFilters ?? [];
    const sortedProducts = useMemo(() => {
        const sortableProducts = [...products];

        switch (sortOption) {
            case "title-asc":
                return sortableProducts.sort((leftProduct, rightProduct) =>
                    leftProduct.title.localeCompare(rightProduct.title),
                );
            case "price-asc":
                return sortableProducts.sort(
                    (leftProduct, rightProduct) =>
                        getPriceAmount(leftProduct.minPrice, currency) -
                        getPriceAmount(rightProduct.minPrice, currency),
                );
            case "price-desc":
                return sortableProducts.sort(
                    (leftProduct, rightProduct) =>
                        getPriceAmount(rightProduct.minPrice, currency) -
                        getPriceAmount(leftProduct.minPrice, currency),
                );
            default:
                return sortableProducts;
        }
    }, [products, sortOption, currency]);

    useEffect(() => {
        setFilters(initialFilterState ?? defaultFilterState);
        setProductsData(initialProductsData);
    }, [defaultFilterState, initialFilterState]);

    const previousCurrencyRef = useRef(currency);

    useEffect(() => {
        if (previousCurrencyRef.current === currency) {
            return;
        }

        previousCurrencyRef.current = currency;

        const resyncedFilters: ProductsFilterState = {
            ...filters,
            priceMin: String(
                initialFilterOptions?.priceRange.min?.[currency] ?? 0,
            ),
            priceMax: String(
                initialFilterOptions?.priceRange.max?.[currency] ?? 0,
            ),
            page: 1,
        };

        setFilters(resyncedFilters);
        void fetchProducts(resyncedFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    function buildAppliedFilters(nextFilters: ProductsFilterState): string[] {
        const defaultMinimumPrice = String(
            initialFilterOptions?.priceRange.min?.[currency] ?? 0,
        );
        const defaultMaximumPrice = String(
            initialFilterOptions?.priceRange.max?.[currency] ?? 0,
        );

        return [
            ...(nextFilters.search.trim() ? ["search"] : []),
            ...(nextFilters.category ? ["category"] : []),
            ...(nextFilters.stoneType ? ["stoneType"] : []),
            ...(nextFilters.color ? ["color"] : []),
            ...(nextFilters.shape ? ["shape"] : []),
            ...(nextFilters.origin ? ["origin"] : []),
            ...(nextFilters.treatment ? ["treatment"] : []),
            ...(nextFilters.certificate ? ["certificate"] : []),
            ...(nextFilters.measurement ? ["measurement"] : []),
            ...(nextFilters.vendor ? ["vendor"] : []),
            ...(nextFilters.tags.length > 0 ? ["tags"] : []),
            ...(nextFilters.metal.length > 0 ? ["metal"] : []),
            ...(nextFilters.carat ? ["carat"] : []),
            ...(nextFilters.priceMin !== defaultMinimumPrice ||
            nextFilters.priceMax !== defaultMaximumPrice
                ? ["price"]
                : []),
        ];
    }

    async function fetchProducts(nextFilters: ProductsFilterState) {
        setIsLoading(true);

        try {
            const response = await getProducts({
                page: nextFilters.page,
                limit: productsPerPage,
                search: nextFilters.search.trim() || undefined,
                category: nextFilters.category || undefined,
                stoneType: nextFilters.stoneType || undefined,
                color: nextFilters.color || undefined,
                shape: nextFilters.shape || undefined,
                origin: nextFilters.origin || undefined,
                treatment: nextFilters.treatment || undefined,
                certificate: nextFilters.certificate || undefined,
                measurement: nextFilters.measurement || undefined,
                vendor: nextFilters.vendor || undefined,
                tags:
                    nextFilters.tags.length > 0 ? nextFilters.tags : undefined,
                metal:
                    nextFilters.metal.length > 0
                        ? nextFilters.metal
                        : undefined,
                priceMin: nextFilters.priceMin || undefined,
                priceMax: nextFilters.priceMax || undefined,
                carat: nextFilters.carat || undefined,
                currency: getCurrencyIsoCode(currency),
            });

            setProductsData({
                ...response,
                appliedFilters: Array.from(
                    new Set([
                        ...response.appliedFilters,
                        ...buildAppliedFilters(nextFilters),
                    ]),
                ),
            });
        } catch {
            setProductsData({
                products: [],
                pagination: {
                    currentPage: nextFilters.page,
                    totalPages: 1,
                    totalRecords: 0,
                    recordsPerPage: productsPerPage,
                    hasNextPage: false,
                    hasPrevPage: nextFilters.page > 1,
                },
                appliedFilters: buildAppliedFilters(nextFilters),
            });
        } finally {
            setIsLoading(false);
            if (typeof window !== "undefined") {
                const search = buildFilterSearchParams(
                    nextFilters,
                    initialFilterOptions,
                    currency,
                );
                window.history.replaceState(
                    null,
                    "",
                    search ? `${pathname}?${search}` : pathname,
                );
            }
        }
    }

    function applyFilters(nextFilters: ProductsFilterState = filters) {
        const normalizedFilters = {
            ...nextFilters,
            page: 1,
        };

        setFilters(normalizedFilters);
        void fetchProducts(normalizedFilters);
    }

    function changePage(pageNumber: number) {
        const nextFilters = {
            ...filters,
            page: pageNumber,
        };

        setFilters(nextFilters);
        void fetchProducts(nextFilters);
    }

    function resetFilters() {
        setFilters(defaultFilterState);
        void fetchProducts(defaultFilterState);
    }

    function applyQuickCategory(categoryLabel: string) {
        const normalizedCategory = (
            initialFilterOptions?.categories ?? []
        ).find(
            (option) => option.toLowerCase() === categoryLabel.toLowerCase(),
        );

        const nextFilters = {
            ...filters,
            page: 1,
            category: normalizedCategory ?? categoryLabel,
        };

        setFilters(nextFilters);
        void fetchProducts(nextFilters);
    }

    const appliedFilterPills = [
        filters.search ? `Search: ${filters.search}` : "",
        filters.category,
        filters.measurement,
        filters.carat ? `${filters.carat} ct` : "",
        ...filters.tags,
        ...filters.metal.map((metalValue) => formatFilterLabel(metalValue)),
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-parsi">
            <Header />
            <main className="pb-16">
                <section className=" bg-white px-6 pb-5 lg:px-10 ">
                    <div className="mx-auto max-w-[1480px]">
                        <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                            Homepage / Shop
                        </p>
                        <h1 className="mt-3 text-[28px] font-medium uppercase tracking-[0.06em] text-zinc-900 sm:text-[36px] lg:text-[44px]">
                            Shop
                        </h1>

                        <div className="mt-7 flex flex-wrap items-center gap-3">
                            {topCategories.map((categoryLabel) => {
                                const isActive =
                                    filters.category.toLowerCase() ===
                                    categoryLabel.toLowerCase();

                                return (
                                    <button
                                        key={categoryLabel}
                                        type="button"
                                        onClick={() =>
                                            applyQuickCategory(categoryLabel)
                                        }
                                        className={`px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] transition sm:px-6 sm:py-3 sm:text-[13px] ${
                                            isActive
                                                ? "bg-pink-500 text-white"
                                                : "border border-zinc-800 bg-white text-zinc-800 hover:bg-zinc-50"
                                        }`}
                                    >
                                        {formatFilterLabel(categoryLabel)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1480px] px-6  lg:px-10 ">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                setIsMobileFiltersOpen(
                                    (currentValue) => !currentValue,
                                )
                            }
                            className="inline-flex items-center gap-2 border border-zinc-800 bg-white px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-800 transition hover:bg-zinc-50 lg:hidden"
                        >
                            <FilterIcon />
                            Filter
                        </button>

                        <div className="ml-auto text-right">
                            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                                Showing
                            </p>
                            <p className="mt-1 text-[14px] font-medium uppercase tracking-[0.08em] text-zinc-900">
                                {productsData
                                    ? `${sortedProducts.length} of ${pagination?.totalRecords ?? sortedProducts.length} products`
                                    : "Unable to load products"}
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
                        <div
                            className={`${isMobileFiltersOpen ? "block" : "hidden"} lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto`}
                        >
                            <ProductsFilters
                                filterOptions={initialFilterOptions}
                                filters={filters}
                                setFilters={setFilters}
                                isLoading={isLoading}
                                onApplyFilters={applyFilters}
                                onResetFilters={resetFilters}
                                products={sortedProducts}
                            />
                        </div>

                        <div>
                            <div className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-5 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex flex-wrap items-center gap-5">
                                    <label className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-zinc-700">
                                        <input
                                            type="checkbox"
                                            checked={filters.tags.includes(
                                                "sale",
                                            )}
                                            onChange={(event) =>
                                                setFilters((currentValue) => ({
                                                    ...currentValue,
                                                    tags: event.target.checked
                                                        ? Array.from(
                                                              new Set([
                                                                  ...currentValue.tags,
                                                                  "sale",
                                                              ]),
                                                          )
                                                        : currentValue.tags.filter(
                                                              (tag) =>
                                                                  tag !==
                                                                  "sale",
                                                          ),
                                                }))
                                            }
                                            className="h-4 w-4 border-zinc-400 text-pink-500 focus:ring-pink-500"
                                        />
                                        Show only on sale
                                    </label>

                                    <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-900">
                                        {sortedProducts.length} Products
                                    </span>

                                    {appliedFilterKeys.length > 0 ? (
                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="border border-pink-500 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-pink-500 transition hover:bg-pink-500 hover:text-white"
                                        >
                                            Clear All
                                        </button>
                                    ) : null}
                                </div>

                                <label className="flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-zinc-700">
                                    <span>Sort By</span>
                                    <select
                                        value={sortOption}
                                        onChange={(event) =>
                                            setSortOption(
                                                event.target
                                                    .value as SortOption,
                                            )
                                        }
                                        className="h-10 min-w-[180px] border border-zinc-800 bg-white px-4 text-[12px] uppercase tracking-[0.14em] text-zinc-800 outline-none transition focus:border-pink-500"
                                    >
                                        <option value="featured">
                                            Featured
                                        </option>
                                        <option value="title-asc">
                                            Title A-Z
                                        </option>
                                        <option value="price-asc">
                                            Price Low to High
                                        </option>
                                        <option value="price-desc">
                                            Price High to Low
                                        </option>
                                    </select>
                                </label>
                            </div>

                            {!productsData ? (
                                <p className="mb-5 border border-rose-200 bg-rose-50 px-4 py-3 text-[12px] uppercase tracking-[0.16em] text-rose-700">
                                    Unable to load products right now.
                                </p>
                            ) : null}

                            {isLoading ? (
                                <p className="mb-5 border border-zinc-200 bg-zinc-50 px-4 py-3 text-[12px] uppercase tracking-[0.16em] text-zinc-700">
                                    Loading products...
                                </p>
                            ) : null}

                            {appliedFilterPills.length > 0 ? (
                                <div className="mb-6 flex flex-wrap gap-2">
                                    {appliedFilterPills.map((filterValue) => (
                                        <span
                                            key={filterValue}
                                            className="border border-zinc-300 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-700"
                                        >
                                            {filterValue}
                                        </span>
                                    ))}
                                </div>
                            ) : null}

                            <div className="grid gap-5 grid-cols-2 sm:gap-6 xl:grid-cols-3">
                                {sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        item={product}
                                        layout="grid"
                                        className="aspect-square md:aspect-auto h-[10rem] md:h-[30rem]"
                                    />
                                ))}
                            </div>

                            {productsData && products.length === 0 ? (
                                <div className="mt-8 border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
                                    <h3 className="text-[14px] font-medium uppercase tracking-[0.18em] text-zinc-800">
                                        No products match the selected filters
                                    </h3>
                                    <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-zinc-500">
                                        Adjust the selected filter options and
                                        apply again to see more pieces.
                                    </p>
                                </div>
                            ) : null}

                            {pagination ? (
                                <div className="mt-10">
                                    <Pagination
                                        pagination={pagination}
                                        currentItemCount={products.length}
                                        disabled={isLoading}
                                        onPageChange={changePage}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
