'use client'

import { useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Product, ProductAllFilters, ProductsFilterState } from '../../types/product'

type ProductsFiltersProps = {
  filterOptions: ProductAllFilters | null
  filters: ProductsFilterState
  setFilters: Dispatch<SetStateAction<ProductsFilterState>>
  isLoading: boolean
  onApplyFilters: (nextFilters?: ProductsFilterState) => void
  onResetFilters: () => void
  products?: Product[]
}

const colorSwatchMap: Record<string, string> = {
  gold: '#ddb018',
  'yellow gold': '#ddb018',
  'rose gold': '#cd8b93',
  silver: '#d6d1d1',
  'white gold': '#d6d1d1',
  pink: '#f4c9c3',
  red: '#e54848',
  green: '#f23ea9',
  yellow: '#f3b312',
  purple: '#8a84dd',
  black: '#1f1f22',
  white: '#f3ecdd',
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
  products = [],
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

  const categoryCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((counts, product) => {
      const key = product.category.toLowerCase()
      counts[key] = (counts[key] ?? 0) + 1
      return counts
    }, {})
  }, [products])

  const availableCategories = filterOptions?.categories ?? []
  const availableColors = (filterOptions?.metals?.length ?? 0) > 0 ? filterOptions?.metals ?? [] : filterOptions?.colors ?? []
  const minimumPrice = filterOptions?.priceRange.min ?? 0
  const maximumPrice = filterOptions?.priceRange.max ?? 0
  const selectedMinimumPrice = Number(filters.priceMin || minimumPrice)
  const selectedMaximumPrice = Number(filters.priceMax || maximumPrice)

  const clampedMinimumPrice = Math.min(selectedMinimumPrice, selectedMaximumPrice)
  const clampedMaximumPrice = Math.max(selectedMinimumPrice, selectedMaximumPrice)
  const priceRangeSpan = Math.max(maximumPrice - minimumPrice, 1)
  const minimumOffset = ((clampedMinimumPrice - minimumPrice) / priceRangeSpan) * 100
  const maximumOffset = ((clampedMaximumPrice - minimumPrice) / priceRangeSpan) * 100

  function updatePrimaryFilter(nextFilters: ProductsFilterState) {
    setFilters(nextFilters)
    onApplyFilters(nextFilters)
  }

  function updatePriceFilter(nextMinimumPrice: number, nextMaximumPrice: number) {
    const normalizedMinimumPrice = Math.max(minimumPrice, Math.min(nextMinimumPrice, nextMaximumPrice))
    const normalizedMaximumPrice = Math.min(maximumPrice, Math.max(nextMaximumPrice, normalizedMinimumPrice))

    setFilters((currentValue) => ({
      ...currentValue,
      priceMin: String(normalizedMinimumPrice),
      priceMax: String(normalizedMaximumPrice),
    }))
  }

  function applyCurrentPriceRange() {
    onApplyFilters({
      ...filters,
      priceMin: String(clampedMinimumPrice),
      priceMax: String(clampedMaximumPrice),
    })
  }

  return (
    <aside className="bg-white px-3 py-2 lg:px-4">
      <section className="border-b border-[#e9e1d8] pb-8">
        <h2 className="text-[1.25rem] font-semibold tracking-[-0.03em] text-[#161311]">Products Type</h2>

        <div className="mt-7 space-y-4">
          {availableCategories.map((category) => {
            const isSelected = filters.category.toLowerCase() === category.toLowerCase()
            const categoryCount = filterOptions?.categoryCounts?.[category.toLowerCase()] ?? categoryCounts[category.toLowerCase()] ?? 0
            const nextFilters = {
              ...filters,
              category: isSelected ? '' : category,
            }

            return (
              <button
                key={category}
                type="button"
                onClick={() => updatePrimaryFilter(nextFilters)}
                className="flex w-full items-center justify-between text-left text-[1.05rem] text-zinc-500 transition hover:text-[#161311]"
              >
                <span className={isSelected ? 'font-medium text-[#161311] underline underline-offset-4' : ''}>{formatFilterLabel(category)}</span>
                <span className="text-zinc-400">{categoryCount}</span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="border-b border-[#e9e1d8] py-8">
        <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em] text-[#161311]">Price Range</h3>

        <div className="mt-7">
          <div className="relative h-7">
            <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#1f1f22]" />
            <div
              className="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#1f1f22]"
              style={{ left: `${minimumOffset}%`, right: `${100 - maximumOffset}%` }}
            />
            <input
              type="range"
              min={minimumPrice}
              max={maximumPrice}
              value={clampedMinimumPrice}
              onChange={(event) => updatePriceFilter(Number(event.target.value), clampedMaximumPrice)}
              onMouseUp={applyCurrentPriceRange}
              onTouchEnd={applyCurrentPriceRange}
              onKeyUp={applyCurrentPriceRange}
              className="absolute left-0 top-1/2 h-7 w-full -translate-y-1/2 appearance-none bg-transparent accent-[#1f1f22]"
            />
            <input
              type="range"
              min={minimumPrice}
              max={maximumPrice}
              value={clampedMaximumPrice}
              onChange={(event) => updatePriceFilter(clampedMinimumPrice, Number(event.target.value))}
              onMouseUp={applyCurrentPriceRange}
              onTouchEnd={applyCurrentPriceRange}
              onKeyUp={applyCurrentPriceRange}
              className="absolute left-0 top-1/2 h-7 w-full -translate-y-1/2 appearance-none bg-transparent accent-[#1f1f22]"
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-[1.05rem] text-[#161311]">
            <p>Min price: ${clampedMinimumPrice}</p>
            <p>Max price: ${clampedMaximumPrice}</p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e9e1d8] py-8">
        <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em] text-[#161311]">Colors</h3>

        <div className="mt-7 flex flex-wrap gap-3">
          {availableColors.map((colorValue) => {
            const useMetalFilter = (filterOptions?.metals?.length ?? 0) > 0
            const isSelected = useMetalFilter
              ? filters.metal.some((metalValue) => metalValue.toLowerCase() === colorValue.toLowerCase())
              : filters.color.toLowerCase() === colorValue.toLowerCase()
            const nextFilters = {
              ...filters,
              color: useMetalFilter ? filters.color : isSelected ? '' : colorValue,
              metal: useMetalFilter ? (isSelected ? [] : [colorValue]) : filters.metal,
            }

            return (
              <button
                key={colorValue}
                type="button"
                onClick={() => updatePrimaryFilter(nextFilters)}
                className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[1.05rem] transition ${
                  isSelected ? 'border-[#161311] text-[#161311]' : 'border-[#e3dad0] text-[#161311] hover:border-[#cfc1b4]'
                }`}
              >
                <span
                  className="h-6 w-6 rounded-full"
                  style={{ backgroundColor: colorSwatchMap[colorValue.toLowerCase()] ?? '#d4d4d8' }}
                />
                <span>{formatFilterLabel(colorValue)}</span>
              </button>
            )
          })}
        </div>
      </section>


    </aside>
  )
}
