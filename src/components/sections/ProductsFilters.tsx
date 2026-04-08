'use client'

import type { Dispatch, SetStateAction } from 'react'
import type { ProductAllFilters, ProductsFilterState } from '../../types/product'

type ProductsFiltersProps = {
  filterOptions: ProductAllFilters | null
  filters: ProductsFilterState
  setFilters: Dispatch<SetStateAction<ProductsFilterState>>
  isLoading: boolean
  onApplyFilters: () => void
  onResetFilters: () => void
}

function formatFilterLabel(value: string): string {
  return value
    .split(' ')
    .map((segment) => (segment ? segment[0].toUpperCase() + segment.slice(1) : segment))
    .join(' ')
}

function SingleSelectDropdown({
  title,
  options,
  selectedValue,
  onChange,
}: {
  title: string
  options: string[]
  selectedValue: string
  onChange: (value: string) => void
}) {
  if (options.length === 0) {
    return null
  }

  return (
    <section>
      <label className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
        {title}
        <select
          value={selectedValue}
          onChange={(event) => onChange(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-[#dfd0c3] bg-white px-3 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
        >
          <option value="">All</option>
          {options.map((value) => (
            <option key={value} value={value}>
              {formatFilterLabel(value)}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}

function MultiSelectDropdown({
  title,
  options,
  selectedValues,
  onToggle,
}: {
  title: string
  options: string[]
  selectedValues: string[]
  onToggle: (value: string) => void
}) {
  if (options.length === 0) {
    return null
  }

  const selectedLabel =
    selectedValues.length === 0
      ? `Select ${title.toLowerCase()}`
      : `${selectedValues.length} selected`

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">{title}</p>
      <details className="mt-2 rounded-xl border border-[#dfd0c3] bg-white px-3 py-2">
        <summary className="cursor-pointer list-none text-sm font-medium text-zinc-800">{selectedLabel}</summary>
        <div className="mt-3 max-h-48 space-y-2 overflow-auto pr-1">
          {options.map((value) => (
            <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={selectedValues.includes(value)}
                onChange={() => onToggle(value)}
                className="h-4 w-4 rounded border-[#d8c8bb] text-[#3c2b20] focus:ring-[#b88a65]"
              />
              <span>{formatFilterLabel(value)}</span>
            </label>
          ))}
        </div>
      </details>
    </section>
  )
}

export default function ProductsFilters({
  filterOptions,
  filters,
  setFilters,
  isLoading,
  onApplyFilters,
  onResetFilters,
}: ProductsFiltersProps) {
  const showExtendedSections = {
    stoneTypes: (filterOptions?.stoneTypes.length ?? 0) > 1,
    colors: (filterOptions?.colors.length ?? 0) > 1,
    shapes: (filterOptions?.shapes.length ?? 0) > 1,
    origins: (filterOptions?.origins.length ?? 0) > 1,
    treatments: (filterOptions?.treatments.length ?? 0) > 1,
    certificates: (filterOptions?.certificates.length ?? 0) > 1,
    measurements: (filterOptions?.measurements.length ?? 0) > 1,
    vendors: (filterOptions?.vendors.length ?? 0) > 1,
  }

  function toggleValue(currentValues: string[], value: string): string[] {
    return currentValues.includes(value)
      ? currentValues.filter((currentValue) => currentValue !== value)
      : [...currentValues, value]
  }

  return (
    <aside className="rounded-[28px] border border-[#eadfd4] bg-white p-5 shadow-[0_12px_35px_rgba(92,63,37,0.06)]">
      <div className="flex items-center justify-between border-b border-[#efe4da] pb-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[#24160f]">Filter</h2>
        <button type="button" onClick={onResetFilters} className="text-sm font-semibold text-[#8b5f43] transition hover:text-[#24160f]">
          Reset
        </button>
      </div>

      <div className="space-y-6 pt-6">
        <SingleSelectDropdown
          title="Category"
          options={filterOptions?.categories ?? []}
          selectedValue={filters.category}
          onChange={(value) => setFilters((currentValue) => ({ ...currentValue, category: value }))}
        />

        <MultiSelectDropdown
          title="Tags"
          options={filterOptions?.tags ?? []}
          selectedValues={filters.tags}
          onToggle={(value) =>
            setFilters((currentValue) => ({
              ...currentValue,
              tags: toggleValue(currentValue.tags, value),
            }))
          }
        />

        <MultiSelectDropdown
          title="Metal"
          options={filterOptions?.metals ?? []}
          selectedValues={filters.metal}
          onToggle={(value) =>
            setFilters((currentValue) => ({
              ...currentValue,
              metal: toggleValue(currentValue.metal, value),
            }))
          }
        />

        <section>
          <h3 className="text-sm font-semibold text-[#24160f]">Carat</h3>
          <div className="mt-4">
            <input
              type="number"
              min={filterOptions?.caratRange.min ?? 0}
              max={filterOptions?.caratRange.max ?? 0}
              step="0.01"
              value={filters.carat}
              onChange={(event) =>
                setFilters((currentValue) => ({
                  ...currentValue,
                  carat: event.target.value,
                }))
              }
              className="h-11 w-full rounded-xl border border-[#dfd0c3] px-3 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
            />
          </div>
        </section>

        {showExtendedSections.measurements ? (
          <SingleSelectDropdown
            title="Measurement"
            options={filterOptions?.measurements ?? []}
            selectedValue={filters.measurement}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, measurement: value }))}
          />
        ) : null}

        {showExtendedSections.stoneTypes ? (
          <SingleSelectDropdown
            title="Stone Type"
            options={filterOptions?.stoneTypes ?? []}
            selectedValue={filters.stoneType}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, stoneType: value }))}
          />
        ) : null}

        {showExtendedSections.colors ? (
          <SingleSelectDropdown
            title="Color"
            options={filterOptions?.colors ?? []}
            selectedValue={filters.color}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, color: value }))}
          />
        ) : null}

        {showExtendedSections.shapes ? (
          <SingleSelectDropdown
            title="Shape"
            options={filterOptions?.shapes ?? []}
            selectedValue={filters.shape}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, shape: value }))}
          />
        ) : null}

        {showExtendedSections.origins ? (
          <SingleSelectDropdown
            title="Origin"
            options={filterOptions?.origins ?? []}
            selectedValue={filters.origin}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, origin: value }))}
          />
        ) : null}

        {showExtendedSections.treatments ? (
          <SingleSelectDropdown
            title="Treatment"
            options={filterOptions?.treatments ?? []}
            selectedValue={filters.treatment}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, treatment: value }))}
          />
        ) : null}

        {showExtendedSections.certificates ? (
          <SingleSelectDropdown
            title="Certificate"
            options={filterOptions?.certificates ?? []}
            selectedValue={filters.certificate}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, certificate: value }))}
          />
        ) : null}

        {showExtendedSections.vendors ? (
          <SingleSelectDropdown
            title="Vendor"
            options={filterOptions?.vendors ?? []}
            selectedValue={filters.vendor}
            onChange={(value) => setFilters((currentValue) => ({ ...currentValue, vendor: value }))}
          />
        ) : null}

        <section>
          <h3 className="text-sm font-semibold text-[#24160f]">Price</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              From
              <input
                type="number"
                min={filterOptions?.priceRange.min ?? 0}
                max={filterOptions?.priceRange.max ?? 0}
                value={filters.priceMin}
                onChange={(event) =>
                  setFilters((currentValue) => ({
                    ...currentValue,
                    priceMin: event.target.value,
                  }))
                }
                className="mt-2 h-11 w-full rounded-xl border border-[#dfd0c3] px-3 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
              To
              <input
                type="number"
                min={filterOptions?.priceRange.min ?? 0}
                max={filterOptions?.priceRange.max ?? 0}
                value={filters.priceMax}
                onChange={(event) =>
                  setFilters((currentValue) => ({
                    ...currentValue,
                    priceMax: event.target.value,
                  }))
                }
                className="mt-2 h-11 w-full rounded-xl border border-[#dfd0c3] px-3 text-sm text-zinc-800 outline-none transition focus:border-[#b88a65]"
              />
            </label>
          </div>
        </section>

        <button
          type="button"
          onClick={onApplyFilters}
          disabled={isLoading}
          className="w-full rounded-full bg-[#111111] px-5 py-3 text-sm font-bold tracking-[0.08em] text-white transition hover:bg-[#2e221b] disabled:opacity-60"
        >
          {isLoading ? 'APPLYING...' : 'APPLY FILTERS'}
        </button>
      </div>
    </aside>
  )
}
