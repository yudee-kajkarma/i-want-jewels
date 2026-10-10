'use client'

import { cn } from '@/lib/utils'
import { formatPrice, type CurrencyCode } from '../../../utils/price'
import type { LumiSizeOption } from '../contract'
import { onRadioKey } from './radioKeys'
import { localSizeLabel } from '../shop'
import { useTranslation } from 'react-i18next'

type SizePickerProps = {
  sizes: LumiSizeOption[]
  /** Index of the chosen size, or -1 when none can be chosen. */
  selected: number
  onSelect: (index: number) => void
  currency: CurrencyCode
  soldOutLabel: string
  /** Id of the visible "Size" label. */
  labelledBy: string
}

/**
 * A colour's sizes as chips, each with its own price; the chosen one is pink.
 * They behave like radio buttons: Tab reaches the chosen size, the arrow keys
 * move between the sizes in stock (Home and End jump to the ends), and
 * sold-out sizes stay visible, struck through, but can't be chosen.
 */
export function SizePicker({ sizes, selected, onSelect, currency, soldOutLabel, labelledBy }: SizePickerProps) {
  const { i18n } = useTranslation()
  const inStock = sizes.flatMap((size, i) => (size.inStock ? [i] : []))
  // The one chip Tab stops on: the chosen size, else the first in stock, else the first.
  const tabStop = selected >= 0 ? selected : (inStock[0] ?? 0)

  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className="flex flex-wrap gap-1.5">
      {sizes.map((size, i) => {
        const checked = i === selected
        return (
          <button
            key={`${i}-${size.label}`}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-disabled={size.inStock ? undefined : true}
            tabIndex={i === tabStop ? 0 : -1}
            onClick={() => {
              if (size.inStock) onSelect(i)
            }}
            onKeyDown={(event) => onRadioKey(event, i, inStock, onSelect)}
            className={cn(
              'min-w-[64px] rounded-xl border px-3 py-1.5 text-center outline-none transition-colors duration-150 motion-reduce:transition-none',
              'focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1a19]',
              checked
                ? 'border-transparent bg-[#e6297e] text-white'
                : size.inStock
                  ? 'border-white/[0.12] bg-[#231e1d] text-[#f6f1ee] hover:border-white/30'
                  : 'cursor-not-allowed border-dashed border-white/[0.14] text-[#6f6763]',
            )}
          >
            <span className={cn('block whitespace-nowrap text-[13px] font-semibold leading-tight', !size.inStock && 'line-through')}>
              {localSizeLabel(size.label, i18n.language)}
            </span>
            <span className={cn('mt-0.5 block whitespace-nowrap text-[11px] leading-tight', checked ? 'text-white/85' : size.inStock && 'text-[#a69d98]')}>
              {size.inStock ? formatPrice(size.price, currency) : soldOutLabel}
            </span>
          </button>
        )
      })}
    </div>
  )
}
