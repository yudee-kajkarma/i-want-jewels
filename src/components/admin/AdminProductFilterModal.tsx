'use client'

import { useCurrency } from '../../context/CurrencyContext'
import type { ProductAllFilters } from '../../types/product'
import { getCurrencySymbol } from '../../utils/price'
import type { AdminFilters } from './adminProductHelpers'

type FilterChangeHandler = <Key extends keyof AdminFilters>(key: Key, value: AdminFilters[Key]) => void

type AdminProductFilterModalProps = {
  isOpen: boolean
  filters: AdminFilters
  filterOptions: ProductAllFilters | null
  onClose: () => void
  onFilterChange: FilterChangeHandler
  onReset: () => void
  onApply: () => void
}

export default function AdminProductFilterModal({
  isOpen,
  filters,
  filterOptions,
  onClose,
  onFilterChange,
  onReset,
  onApply,
}: AdminProductFilterModalProps) {
  const { currency } = useCurrency()
  const currencySymbol = getCurrencySymbol(currency)
  const priceRangeMin = filterOptions?.priceRange.min?.[currency] ?? 0
  const priceRangeMax = filterOptions?.priceRange.max?.[currency] ?? 0

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f0d25]/55 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#f0d8e8] bg-white shadow-[0_30px_80px_rgba(31,22,17,0.30)]">
        <div className="flex items-start justify-between border-b border-[#f0e4da] px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-[#3f1933]">Filter Products</h2>
            <p className="mt-1 text-sm text-zinc-500">Choose filter fields and apply them to the product list.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#e7bfd7] px-4 py-2 text-sm font-semibold text-[#7a3a61] transition hover:bg-[#fff2fa]"
          >
            Close
          </button>
        </div>

        <div className="max-h-[calc(92vh-96px)] overflow-y-auto px-6 py-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Category</span>
              <select
                value={filters.category}
                onChange={(event) => onFilterChange('category', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Categories</option>
                {(filterOptions?.categories ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Vendor</span>
              <select
                value={filters.vendor}
                onChange={(event) => onFilterChange('vendor', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Vendors</option>
                {(filterOptions?.vendors ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Stone Type</span>
              <select
                value={filters.stoneType}
                onChange={(event) => onFilterChange('stoneType', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Stone Types</option>
                {(filterOptions?.stoneTypes ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Color</span>
              <select
                value={filters.color}
                onChange={(event) => onFilterChange('color', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Colors</option>
                {(filterOptions?.colors ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Shape</span>
              <select
                value={filters.shape}
                onChange={(event) => onFilterChange('shape', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Shapes</option>
                {(filterOptions?.shapes ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Origin</span>
              <select
                value={filters.origin}
                onChange={(event) => onFilterChange('origin', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Origins</option>
                {(filterOptions?.origins ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Treatment</span>
              <select
                value={filters.treatment}
                onChange={(event) => onFilterChange('treatment', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Treatments</option>
                {(filterOptions?.treatments ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Certificate</span>
              <select
                value={filters.certificate}
                onChange={(event) => onFilterChange('certificate', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Certificates</option>
                {(filterOptions?.certificates ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Measurement</span>
              <select
                value={filters.measurement}
                onChange={(event) => onFilterChange('measurement', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Measurements</option>
                {(filterOptions?.measurements ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Availability</span>
              <select
                value={filters.availability}
                onChange={(event) => onFilterChange('availability', event.target.value as AdminFilters['availability'])}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="hidden">Hidden</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Tag</span>
              <select
                value={filters.tags}
                onChange={(event) => onFilterChange('tags', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Tags</option>
                {(filterOptions?.tags ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Metal</span>
              <select
                value={filters.metal}
                onChange={(event) => onFilterChange('metal', event.target.value)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] bg-white px-4 outline-none transition focus:border-[#a53b79]"
              >
                <option value="">All Metals</option>
                {(filterOptions?.metals ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Price Min ({currencySymbol})</span>
              <input
                type="number"
                min={priceRangeMin}
                value={filters.priceMin}
                onChange={(event) => onFilterChange('priceMin', event.target.value)}
                placeholder={String(priceRangeMin)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Price Max ({currencySymbol})</span>
              <input
                type="number"
                min={priceRangeMin}
                value={filters.priceMax}
                onChange={(event) => onFilterChange('priceMax', event.target.value)}
                placeholder={String(priceRangeMax)}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#3f1933]">Carat</span>
              <input
                type="number"
                min={filterOptions?.caratRange.min ?? 0}
                step="0.01"
                value={filters.carat}
                onChange={(event) => onFilterChange('carat', event.target.value)}
                placeholder={String(filterOptions?.caratRange.min ?? '')}
                className="h-12 w-full rounded-2xl border border-[#e7bfd7] px-4 outline-none transition focus:border-[#a53b79]"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-[#f0e4da] pt-5">
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-[#e7bfd7] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-[#7a3a61] transition hover:bg-[#fff2fa]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onApply}
              className="rounded-full bg-[#cc4f8f] px-5 py-3 text-sm font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ad3f78]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}