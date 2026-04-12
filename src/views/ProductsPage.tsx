'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Pagination from '../components/sections/Pagination'
import ProductCard from '../components/sections/ProductCard'
import ProductsFilters from '../components/sections/ProductsFilters'
import { getProducts } from '../services/productService'
import type { ProductAllFilters, ProductsApiResult, ProductsFilterState } from '../types/product'
import { formatIndianRupee } from '../utils/productUtils'

const productsPerPage = 10

type ViewMode = 'grid' | 'list'
type SortOption = 'featured' | 'title-asc' | 'price-asc' | 'price-desc'

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
    </svg>
  )
}

function GridViewIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="10" y="4" width="5" height="16" rx="1.5" />
      <rect x="17" y="4" width="4" height="16" rx="1.5" />
    </svg>
  )
}

function ListViewIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <rect x="4" y="5" width="16" height="3" rx="1.5" />
      <rect x="4" y="10.5" width="16" height="3" rx="1.5" />
      <rect x="4" y="16" width="16" height="3" rx="1.5" />
    </svg>
  )
}

function formatFilterLabel(value: string): string {
  return value
    .split(' ')
    .map((segment) => (segment ? segment[0].toUpperCase() + segment.slice(1) : segment))
    .join(' ')
}

function buildDefaultFilterState(filterOptions: ProductAllFilters | null): ProductsFilterState {
  return {
    page: 1,
    search: '',
    category: '',
    stoneType: '',
    color: '',
    shape: '',
    origin: '',
    treatment: '',
    certificate: '',
    measurement: '',
    vendor: '',
    tags: [],
    metal: [],
    priceMin: String(filterOptions?.priceRange.min ?? 0),
    priceMax: String(filterOptions?.priceRange.max ?? 0),
    carat: '',
  }
}

function buildFilterSearchParams(filters: ProductsFilterState, filterOptions: ProductAllFilters | null): string {
  const searchParams = new URLSearchParams()
  const defaultMinimumPrice = String(filterOptions?.priceRange.min ?? 0)
  const defaultMaximumPrice = String(filterOptions?.priceRange.max ?? 0)

  if (filters.page > 1) {
    searchParams.set('page', String(filters.page))
  }

  if (filters.search.trim()) {
    searchParams.set('search', filters.search.trim())
  }

  if (filters.category) {
    searchParams.set('category', filters.category)
  }

  if (filters.stoneType) {
    searchParams.set('stoneType', filters.stoneType)
  }

  if (filters.color) {
    searchParams.set('color', filters.color)
  }

  if (filters.shape) {
    searchParams.set('shape', filters.shape)
  }

  if (filters.origin) {
    searchParams.set('origin', filters.origin)
  }

  if (filters.treatment) {
    searchParams.set('treatment', filters.treatment)
  }

  if (filters.certificate) {
    searchParams.set('certificate', filters.certificate)
  }

  if (filters.measurement) {
    searchParams.set('measurement', filters.measurement)
  }

  if (filters.vendor) {
    searchParams.set('vendor', filters.vendor)
  }

  if (filters.tags.length > 0) {
    searchParams.set('tags', filters.tags.join(','))
  }

  if (filters.metal.length > 0) {
    searchParams.set('metal', filters.metal.join(','))
  }

  if (filters.priceMin && filters.priceMin !== defaultMinimumPrice) {
    searchParams.set('price_min', filters.priceMin)
  }

  if (filters.priceMax && filters.priceMax !== defaultMaximumPrice) {
    searchParams.set('price_max', filters.priceMax)
  }

  if (filters.carat) {
    searchParams.set('carat', filters.carat)
  }

  return searchParams.toString()
}

type ProductsPageProps = {
  initialProductsData?: ProductsApiResult | null
  initialFilterOptions?: ProductAllFilters | null
  initialFilterState?: ProductsFilterState | null
}

export default function ProductsPage({
  initialProductsData = null,
  initialFilterOptions = null,
  initialFilterState = null,
}: ProductsPageProps) {
  const pathname = usePathname()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [sortOption, setSortOption] = useState<SortOption>('featured')
  const defaultFilterState = useMemo(() => buildDefaultFilterState(initialFilterOptions), [initialFilterOptions])
  const [filters, setFilters] = useState<ProductsFilterState>(initialFilterState ?? defaultFilterState)
  const [productsData, setProductsData] = useState<ProductsApiResult | null>(initialProductsData)
  const topCategories = useMemo(
    () => (initialFilterOptions?.categories?.length ? initialFilterOptions.categories.slice(0, 5) : ['earrings', 'rings', 'bracelets', 'necklace', 'gift card']),
    [initialFilterOptions],
  )

  const products = productsData?.products ?? []
  const pagination = productsData?.pagination ?? null
  const appliedFilterKeys = productsData?.appliedFilters ?? []
  const sortedProducts = useMemo(() => {
    const sortableProducts = [...products]

    switch (sortOption) {
      case 'title-asc':
        return sortableProducts.sort((leftProduct, rightProduct) => leftProduct.title.localeCompare(rightProduct.title))
      case 'price-asc':
        return sortableProducts.sort((leftProduct, rightProduct) => leftProduct.minPrice - rightProduct.minPrice)
      case 'price-desc':
        return sortableProducts.sort((leftProduct, rightProduct) => rightProduct.minPrice - leftProduct.minPrice)
      default:
        return sortableProducts
    }
  }, [products, sortOption])

  useEffect(() => {
    setFilters(initialFilterState ?? defaultFilterState)
    setProductsData(initialProductsData)
  }, [defaultFilterState, initialFilterState])

  function buildAppliedFilters(nextFilters: ProductsFilterState): string[] {
    const defaultMinimumPrice = String(initialFilterOptions?.priceRange.min ?? 0)
    const defaultMaximumPrice = String(initialFilterOptions?.priceRange.max ?? 0)

    return [
      ...(nextFilters.search.trim() ? ['search'] : []),
      ...(nextFilters.category ? ['category'] : []),
      ...(nextFilters.stoneType ? ['stoneType'] : []),
      ...(nextFilters.color ? ['color'] : []),
      ...(nextFilters.shape ? ['shape'] : []),
      ...(nextFilters.origin ? ['origin'] : []),
      ...(nextFilters.treatment ? ['treatment'] : []),
      ...(nextFilters.certificate ? ['certificate'] : []),
      ...(nextFilters.measurement ? ['measurement'] : []),
      ...(nextFilters.vendor ? ['vendor'] : []),
      ...(nextFilters.tags.length > 0 ? ['tags'] : []),
      ...(nextFilters.metal.length > 0 ? ['metal'] : []),
      ...(nextFilters.carat ? ['carat'] : []),
      ...(nextFilters.priceMin !== defaultMinimumPrice || nextFilters.priceMax !== defaultMaximumPrice ? ['price'] : []),
    ]
  }

  async function fetchProducts(nextFilters: ProductsFilterState) {
    setIsLoading(true)

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
        tags: nextFilters.tags.length > 0 ? nextFilters.tags : undefined,
        metal: nextFilters.metal.length > 0 ? nextFilters.metal : undefined,
        priceMin: nextFilters.priceMin || undefined,
        priceMax: nextFilters.priceMax || undefined,
        carat: nextFilters.carat || undefined,
      })

      setProductsData({
        ...response,
        appliedFilters: Array.from(new Set([...response.appliedFilters, ...buildAppliedFilters(nextFilters)])),
      })
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
      })
    } finally {
      setIsLoading(false)
      if (typeof window !== 'undefined') {
        const search = buildFilterSearchParams(nextFilters, initialFilterOptions)
        window.history.replaceState(null, '', search ? `${pathname}?${search}` : pathname)
      }
    }
  }

  function applyFilters(nextFilters: ProductsFilterState = filters) {
    const normalizedFilters = {
      ...nextFilters,
      page: 1,
    }

    setFilters(normalizedFilters)
    void fetchProducts(normalizedFilters)
  }

  function changePage(pageNumber: number) {
    const nextFilters = {
      ...filters,
      page: pageNumber,
    }

    setFilters(nextFilters)
    void fetchProducts(nextFilters)
  }

  function resetFilters() {
    setFilters(defaultFilterState)
    void fetchProducts(defaultFilterState)
  }

  function applyQuickCategory(categoryLabel: string) {
    const normalizedCategory = (initialFilterOptions?.categories ?? []).find(
      (option) => option.toLowerCase() === categoryLabel.toLowerCase(),
    )

    const nextFilters = {
      ...filters,
      page: 1,
      category: normalizedCategory ?? categoryLabel,
    }

    setFilters(nextFilters)
    void fetchProducts(nextFilters)
  }

  const appliedFilterPills = [
    filters.search ? `Search: ${filters.search}` : '',
    filters.category,
    filters.measurement,
    filters.carat ? `${filters.carat} ct` : '',
    ...filters.tags,
    ...filters.metal.map((metalValue) => formatFilterLabel(metalValue)),
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-[#fffdfa] text-zinc-900">
      <Header />
      <main className="pb-16">
        <section className="bg-[linear-gradient(180deg,_#f6f1e8,_#fff_80%)] px-4 py-14 text-center md:py-20">
          <div className="mx-auto max-w-[1560px]">
            <h1 className="text-3xl font-semibold md:text-4xl">Shop</h1>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Homepage / Shop</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10">
              {topCategories.map((categoryLabel) => (
                <button
                  key={categoryLabel}
                  type="button"
                  onClick={() => applyQuickCategory(categoryLabel)}
                  className="text-sm font-semibold uppercase tracking-[0.08em] text-[#111827] transition hover:text-[#8b5f43]"
                >
                  {formatFilterLabel(categoryLabel)}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1560px] px-4 py-8 lg:px-8 bg-white">
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen((currentValue) => !currentValue)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#d8c8bb] bg-white px-4 py-2 text-sm font-semibold text-[#24160f] shadow-sm transition hover:bg-[#f8f2ec] lg:hidden"
            >
              <FilterIcon />
              Filter
            </button>

            <div className="ml-auto text-right">
              <p className="text-sm text-zinc-500">Showing</p>
              <p className="text-base font-semibold text-[#24160f]">
                {productsData ? `${sortedProducts.length} of ${pagination?.totalRecords ?? sortedProducts.length} products` : 'Unable to load products'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
            <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
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
              <div className="mb-6 flex flex-col gap-4  bg-white px-5 py-4 shadow-[0_12px_35px_rgba(92,63,37,0.04)] xl:flex-row xl:items-start xl:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex rounded-xl border border-[#e6dbd1] bg-[#fbf8f4] p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                        viewMode === 'grid' ? 'bg-[#1f1b18] text-white' : 'text-zinc-400 hover:bg-white hover:text-[#1f1b18]'
                      }`}
                    >
                      <GridViewIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                        viewMode === 'list' ? 'bg-[#1f1b18] text-white' : 'text-zinc-400 hover:bg-white hover:text-[#1f1b18]'
                      }`}
                    >
                      <ListViewIcon />
                    </button>
                  </div>

                  <label className="inline-flex items-center gap-2 text-sm text-zinc-500">
                    <input
                      type="checkbox"
                      checked={filters.tags.includes('sale')}
                      onChange={(event) =>
                        setFilters((currentValue) => ({
                          ...currentValue,
                          tags: event.target.checked
                            ? Array.from(new Set([...currentValue.tags, 'sale']))
                            : currentValue.tags.filter((tag) => tag !== 'sale'),
                        }))
                      }
                      className="h-4 w-4 rounded border-[#d8c8bb] text-[#111111] focus:ring-[#b88a65]"
                    />
                    Show only products on sale
                  </label>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                    <span className="font-medium text-[#24160f]">{sortedProducts.length} Products Found</span>
                    {appliedFilterKeys.length > 0 ? (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="rounded-full border border-[#ff8c83] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-[#ff5b50] transition hover:bg-[#fff2f1]"
                      >
                        Clear All
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <label className="flex items-center gap-3 text-sm text-[#24160f]">
                    <span>Sort By</span>
                    <select
                      value={sortOption}
                      onChange={(event) => setSortOption(event.target.value as SortOption)}
                      className="h-11 min-w-[180px] rounded-xl border border-[#dfd0c3] bg-white px-4 text-sm text-zinc-700 outline-none transition focus:border-[#b88a65]"
                    >
                      <option value="featured">Featured</option>
                      <option value="title-asc">Title A-Z</option>
                      <option value="price-asc">Price Low to High</option>
                      <option value="price-desc">Price High to Low</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* <div className="mb-5 flex flex-col gap-2 rounded-[28px] border border-[#eadfd4] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(92,63,37,0.04)] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-zinc-400">Current price window</p>
                  <p className="mt-1 text-lg font-semibold text-[#24160f]">
                    {formatIndianRupee(Number(filters.priceMin || initialFilterOptions?.priceRange.min || 0))} to{' '}
                    {formatIndianRupee(Number(filters.priceMax || initialFilterOptions?.priceRange.max || 0))}
                  </p>
                </div>
                <div className="text-right text-sm text-zinc-500">
                  <p>All product pricing is displayed in INR.</p>
                  {appliedFilterKeys.length > 0 ? <p className="mt-1">Applied filters: {appliedFilterKeys.join(', ')}</p> : null}
                </div>
              </div> */}

              {!productsData ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">Unable to load products right now.</p> : null}

              {isLoading ? <p className="mb-5 rounded-2xl bg-[#f7efe7] px-4 py-3 text-sm text-[#8b5f43]">Loading products...</p> : null}

              {appliedFilterPills.length > 0 ? (
                <div className="mb-5 flex flex-wrap gap-2">
                  {appliedFilterPills.map((filterValue) => (
                    <span key={filterValue} className="rounded-full bg-[#f7efe7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#8b5f43]">
                      {filterValue}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className={viewMode === 'grid' ? 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-1'}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} item={product} layout={viewMode} />
                ))}
              </div>

              {productsData && products.length === 0 ? (
                <div className="mt-6 rounded-[28px] border border-dashed border-[#dbc8b8] bg-white px-6 py-10 text-center">
                  <h3 className="text-xl font-semibold text-[#24160f]">No products match the selected filters</h3>
                  <p className="mt-2 text-sm text-zinc-500">Adjust the selected filter options and apply again to see more pieces.</p>
                </div>
              ) : null}

              {pagination ? (
                <Pagination
                  pagination={pagination}
                  currentItemCount={products.length}
                  disabled={isLoading}
                  onPageChange={changePage}
                />
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}