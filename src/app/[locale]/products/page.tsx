import { buildPageMetadata } from "@/i18n/metadata";
import {
  getAllProductFilters,
  getProducts,
} from "../../../services/productService";
import type {
  Product,
  ProductAllFilters,
  ProductsApiResult,
  ProductsFilterState,
  ProductsPagination,
} from "../../../types/product";
import { DEFAULT_CURRENCY } from "../../../utils/price";
import ProductsPage from "../../../views/ProductsPage";

export const dynamic = "force-dynamic";

const productsPerPage = 9;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildPageMetadata(locale, "products", "/products");
}

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function readListValue(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => item.split(","))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parsePositiveNumber(value: string, fallbackValue: number): number {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallbackValue;
  }

  return parsedValue;
}

function normalizeCategoryToken(value: string): string {
  const normalizedValue = value
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");

  if (!normalizedValue) {
    return "";
  }

  if (normalizedValue.endsWith("ies")) {
    return normalizedValue.slice(0, -3) + "y";
  }

  if (normalizedValue.endsWith("es")) {
    return normalizedValue.slice(0, -2);
  }

  if (normalizedValue.endsWith("s")) {
    return normalizedValue.slice(0, -1);
  }

  return normalizedValue;
}

function resolveCategoryValue(
  categoryValue: string,
  filterOptions: ProductAllFilters,
): string {
  const rawCategory = categoryValue.trim();

  if (!rawCategory) {
    return "";
  }

  const exactMatch = filterOptions.categories.find(
    (categoryOption) =>
      categoryOption.toLowerCase() === rawCategory.toLowerCase(),
  );

  if (exactMatch) {
    return exactMatch;
  }

  const normalizedTarget = normalizeCategoryToken(rawCategory);
  const normalizedMatch = filterOptions.categories.find(
    (categoryOption) =>
      normalizeCategoryToken(categoryOption) === normalizedTarget,
  );

  return normalizedMatch ?? rawCategory;
}

function buildFilterState(
  searchParams: Record<string, string | string[] | undefined>,
  filterOptions: ProductAllFilters,
): ProductsFilterState {
  const rawCategory = readSingleValue(searchParams.category);

  return {
    page: parsePositiveNumber(readSingleValue(searchParams.page), 1),
    search: readSingleValue(searchParams.search),
    category: resolveCategoryValue(rawCategory, filterOptions),
    stoneType: readSingleValue(searchParams.stoneType),
    color: readSingleValue(searchParams.color),
    shape: readSingleValue(searchParams.shape),
    origin: readSingleValue(searchParams.origin),
    treatment: readSingleValue(searchParams.treatment),
    certificate: readSingleValue(searchParams.certificate),
    measurement: readSingleValue(searchParams.measurement),
    vendor: readSingleValue(searchParams.vendor),
    tags: readListValue(searchParams.tags),
    metal:
      readListValue(searchParams.metal).length > 0
        ? readListValue(searchParams.metal)
        : readListValue(searchParams.metals),
    collection:
      readListValue(searchParams.collection).length > 0
        ? readListValue(searchParams.collection)
        : readListValue(searchParams.collections),
    priceMin:
      readSingleValue(searchParams.price_min) ||
      readSingleValue(searchParams.minPrice) ||
      String(filterOptions.priceRange.min?.[DEFAULT_CURRENCY] ?? 0),
    priceMax:
      readSingleValue(searchParams.price_max) ||
      readSingleValue(searchParams.maxPrice) ||
      String(filterOptions.priceRange.max?.[DEFAULT_CURRENCY] ?? 0),
    carat: readSingleValue(searchParams.carat),
  };
}

function applyLocalFilters(
  products: Product[],
  filters: ProductsFilterState,
): Product[] {
  const minimumPrice = Number(filters.priceMin);
  const maximumPrice = Number(filters.priceMax);

  return products.filter((product) => {
    const normalizedMetals = product.metals.map((metal) => metal.toLowerCase());
    const matchesCategory =
      !filters.category ||
      product.category === filters.category ||
      product.tags.includes(filters.category) ||
      product.tags.includes(`${filters.category}s`);
    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.every((tag) => product.tags.includes(tag));
    const matchesMetal =
      filters.metal.length === 0 ||
      filters.metal.some((selectedMetal) =>
        normalizedMetals.includes(selectedMetal.toLowerCase()),
      );
    const matchesPrice =
      (!Number.isFinite(minimumPrice) ||
        product.minPrice.eur >= minimumPrice) &&
      (!Number.isFinite(maximumPrice) || product.minPrice.eur <= maximumPrice);
    const normalizedSearch = filters.search.trim().toLowerCase();
    const matchesSearch =
      !normalizedSearch ||
      product.title.toLowerCase().includes(normalizedSearch) ||
      product.vendor.toLowerCase().includes(normalizedSearch) ||
      product.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

    return (
      matchesCategory &&
      matchesTags &&
      matchesMetal &&
      matchesPrice &&
      matchesSearch
    );
  });
}

function buildPagination(
  totalRecords: number,
  currentPage: number,
): ProductsPagination {
  const totalPages = Math.max(1, Math.ceil(totalRecords / productsPerPage));
  const normalizedPage = Math.min(Math.max(1, currentPage), totalPages);

  return {
    currentPage: normalizedPage,
    totalPages,
    totalRecords,
    recordsPerPage: productsPerPage,
    hasNextPage: normalizedPage < totalPages,
    hasPrevPage: normalizedPage > 1,
  };
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const filterOptions = await getAllProductFilters().catch(() => null);

  if (!filterOptions) {
    return (
      <ProductsPage
        initialProductsData={null}
        initialFilterOptions={null}
        initialFilterState={null}
      />
    );
  }

  const filterState = buildFilterState(resolvedSearchParams, filterOptions);
  // Gift card prices (50/100/200) sit below the physical-product price floor
  // returned by /all-filters, so forwarding priceMin would hide them.
  const isGiftCardCategory =
    filterState.category.trim().toLowerCase() === "gift card";
  const productsResponse = await getProducts({
    page: filterState.page,
    limit: productsPerPage,
    search: filterState.search || undefined,
    category: filterState.category || undefined,
    stoneType: filterState.stoneType || undefined,
    color: filterState.color || undefined,
    shape: filterState.shape || undefined,
    origin: filterState.origin || undefined,
    treatment: filterState.treatment || undefined,
    certificate: filterState.certificate || undefined,
    measurement: filterState.measurement || undefined,
    vendor: filterState.vendor || undefined,
    tags: filterState.tags.length > 0 ? filterState.tags : undefined,
    metal: filterState.metal.length > 0 ? filterState.metal : undefined,
    collection:
      filterState.collection.length > 0 ? filterState.collection : undefined,
    priceMin: isGiftCardCategory
      ? undefined
      : filterState.priceMin || undefined,
    priceMax: isGiftCardCategory
      ? undefined
      : filterState.priceMax || undefined,
    carat: filterState.carat || undefined,
  }).catch(() => null);

  const initialProductsData: ProductsApiResult = {
    products: productsResponse?.products ?? [],
    pagination:
      productsResponse?.pagination ?? buildPagination(0, filterState.page),
    appliedFilters: [
      ...(productsResponse?.appliedFilters ?? []),
      ...(filterState.tags.length > 0 ? ["tags"] : []),
      ...(filterState.metal.length > 0 ? ["metal"] : []),
      ...(filterState.collection.length > 0 ? ["collection"] : []),
      ...(filterState.priceMin !==
        String(filterOptions.priceRange.min?.[DEFAULT_CURRENCY] ?? 0) ||
      filterState.priceMax !==
        String(filterOptions.priceRange.max?.[DEFAULT_CURRENCY] ?? 0)
        ? ["price"]
        : []),
      ...(filterState.carat ? ["carat"] : []),
    ],
  };

  return (
    <ProductsPage
      initialProductsData={initialProductsData}
      initialFilterOptions={filterOptions}
      initialFilterState={{
        ...filterState,
        page: initialProductsData.pagination.currentPage,
      }}
    />
  );
}
