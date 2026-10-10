'use client'

import { useEffect, useId, useState } from 'react'
import { Check, LoaderCircle, ShoppingBag } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useCurrency } from '../../../context/CurrencyContext'
import { formatPrice, getPriceAmount } from '../../../utils/price'
import type { LumiBagSelection, LumiColourKey, LumiProductDetail, LumiSizeOption, LumiVariant } from '../contract'
import { CARD, CARD_FOCUS_RING, OUTLINE_BUTTON, PRIMARY_BUTTON } from '../ui'
import type { LumiBlockActions } from './BlockList'
import { onRadioKey } from './radioKeys'
import { Thumb, WishlistHeart } from './ShopParts'
import { SizePicker } from './SizePicker'
import { SmartLink } from './SmartLink'

/** Metal colours as small polished discs. */
const SWATCH: Record<LumiColourKey, string> = {
  yellow: 'bg-[linear-gradient(135deg,#f6e27a,#d4a937)]',
  rose: 'bg-[linear-gradient(135deg,#f7c6b3,#d98f7a)]',
  white: 'bg-[linear-gradient(135deg,#f5f5f5,#c9c9cf)]',
}
/** A colour the shop hasn't tagged as a metal. */
const PLAIN_SWATCH = 'bg-[linear-gradient(135deg,#ece7e4,#a8a29e)]'
const SWATCH_SHINE = 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.75),0_1px_2px_rgba(0,0,0,0.4)]'

/** How long the button says "Added" after adding. */
const ADDED_MS = 2400

/** A colour that can still be bought: one of its sizes is in stock (or the colour itself, without sizes). */
const available = (variant: LumiVariant) => (variant.sizes.length ? variant.sizes.some((size) => size.inStock) : variant.inStock)
const firstInStock = (sizes: LumiSizeOption[]) => sizes.findIndex((size) => size.inStock)

/** Indexes of the chosen colour and size (-1: no size can be chosen). */
type Choice = { variant: number; size: number }

/** The first colour that can be bought, with its first size in stock. */
function firstChoice(variants: LumiVariant[]): Choice {
  if (!variants.length) return { variant: -1, size: -1 }
  const variant = Math.max(0, variants.findIndex(available))
  return { variant, size: firstInStock(variants[variant].sizes) }
}

type ProductDetailCardProps = {
  product: LumiProductDetail
  actions: LumiBlockActions
  /** The narrower card used side by side when comparing. */
  compact?: boolean
}

/**
 * One product in full: picture, name, the price of the current choice, stock,
 * its colours (each the shop's own variant, with its own sizes, prices and
 * stock), material and sizes, then Add to bag, Buy now and the heart. The
 * first colour and size in stock start chosen; sold-out sizes can't be
 * picked, and nothing sold out can be added. Every fact comes from the
 * shop's database, never from the AI.
 */
export function ProductDetailCard({ product, actions, compact = false }: ProductDetailCardProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.lumi' })
  const { currency } = useCurrency()
  const colourLabelId = useId()
  const sizeLabelId = useId()
  // Always at least one colour (the chat's reader drops products without); without, only the link is offered.
  const variants = product.variants ?? []
  const [choice, setChoice] = useState<Choice>(() => firstChoice(variants))
  const [adding, setAdding] = useState<'idle' | 'adding' | 'added'>('idle')

  /** The colour's name in the reply's language when the shop tagged its metal, else as the shop names it. */
  const colourName = (option: LumiVariant) =>
    (option.colour && product.colours?.find((colour) => colour.key === option.colour)?.name) || option.title

  const variant = choice.variant >= 0 ? variants[choice.variant] : undefined
  const sizes = variant?.sizes ?? []
  const size = choice.size >= 0 ? sizes[choice.size] : undefined

  const lowest = formatPrice(product.price, currency)
  const isRange = !product.fixedPrice && getPriceAmount(product.price, currency) !== getPriceAmount(product.priceHigh, currency)
  const price = size
    ? formatPrice(size.price, currency)
    : variant
      ? formatPrice(variant.price, currency)
      : isRange
        ? t('product.from', { price: lowest })
        : lowest
  const inStock = size ? size.inStock : variant ? available(variant) : product.inStock
  const image = variant?.image ?? product.image

  /** The exact choice for the bag, or null while it can't be bought (sold out, or no size picked). */
  const selection: LumiBagSelection | null =
    variant && product.productId && inStock && (!sizes.length || size)
      ? {
          productId: product.productId,
          slug: product.slug,
          variantId: variant.id,
          ...(size ? { size: size.size, sizeLabel: size.label } : {}),
          quantity: 1,
          title: product.title,
          variantTitle: variant.title,
          ...(image ? { image } : {}),
          price: size?.price ?? variant.price,
        }
      : null

  // "Added" shows for a moment, then the button can add another.
  useEffect(() => {
    if (adding !== 'added') return
    const id = window.setTimeout(() => setAdding('idle'), ADDED_MS)
    return () => window.clearTimeout(id)
  }, [adding])

  function pickVariant(index: number) {
    const next = variants[index]
    if (!next) return
    setChoice((current) => {
      // Keep the same size when the new colour has it in stock.
      const before = variants[current.variant]?.sizes[current.size]
      const same = before ? next.sizes.findIndex((option) => option.size === before.size && option.inStock) : -1
      return { variant: index, size: same >= 0 ? same : firstInStock(next.sizes) }
    })
    setAdding('idle')
  }

  function pickSize(index: number) {
    setChoice((current) => ({ ...current, size: index }))
    setAdding('idle')
  }

  async function add() {
    if (!selection || adding === 'adding') return
    setAdding('adding')
    const added = await actions.addToBag(selection).catch(() => false)
    setAdding(added ? 'added' : 'idle')
  }

  return (
    <article className={cn(CARD, 'flex h-full flex-col', compact ? 'p-3' : 'p-3.5')}>
      <div className="flex gap-3">
        <SmartLink to={product.url} tabIndex={-1} aria-hidden className="shrink-0">
          <Thumb key={image} src={image} sizes={compact ? '64px' : '84px'} className={compact ? 'h-16 w-16' : 'h-[84px] w-[84px]'} />
        </SmartLink>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-[14.5px] font-semibold leading-snug text-[#f6f1ee]">{product.title}</h3>
          <p aria-live="polite" className="mt-1">
            <span key={price} className="inline-block text-[16px] font-semibold tracking-tight text-white motion-safe:animate-lumi-fade">
              {price}
            </span>
          </p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-[#282422] px-2 py-0.5 text-[11px] font-medium text-[#f6f1ee]">
            <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', inStock ? 'bg-[#4ade80]' : 'bg-[#6f6763]')} />
            {inStock ? t('product.inStock') : t('product.soldOut')}
          </span>
        </div>
      </div>

      {variants.length > 1 && variant ? (
        <div className="mt-3.5">
          <p id={colourLabelId} className="mb-2 text-[12px] text-[#a69d98]">
            {t('product.labelled', { label: t('product.colour') })} <span className="inline-block text-[#f6f1ee] first-letter:uppercase">{colourName(variant)}</span>
          </p>
          <div role="radiogroup" aria-labelledby={colourLabelId} className="flex flex-wrap gap-1.5">
            {variants.map((option, i) => {
              const checked = i === choice.variant
              const soldOut = !available(option)
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  onClick={() => pickVariant(i)}
                  onKeyDown={(event) => onRadioKey(event, i, variants.map((_, index) => index), pickVariant)}
                  className={cn(
                    CARD_FOCUS_RING,
                    'flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-[12.5px] transition-colors duration-150 motion-reduce:transition-none',
                    checked ? 'border-[#e6297e] text-[#f6f1ee]' : 'border-white/[0.12] text-[#a69d98] hover:border-white/30 hover:text-[#f6f1ee]',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'h-5 w-5 shrink-0 rounded-full',
                      SWATCH_SHINE,
                      option.colour ? SWATCH[option.colour] : PLAIN_SWATCH,
                      checked && 'ring-[1.5px] ring-white/90',
                      soldOut && 'opacity-50',
                    )}
                  />
                  <span className={cn('inline-block first-letter:uppercase', soldOut && 'line-through decoration-white/40')}>{colourName(option)}</span>
                </button>
              )
            })}
          </div>
        </div>
      ) : variant ? (
        // The only colour: shown, nothing to choose.
        <p className="mt-3 flex items-center gap-1.5 text-[12px] text-[#f6f1ee]">
          <span aria-hidden className={cn('h-4 w-4 shrink-0 rounded-full', SWATCH_SHINE, variant.colour ? SWATCH[variant.colour] : PLAIN_SWATCH)} />
          <span className="sr-only">{t('product.labelled', { label: t('product.colour') })} </span>
          <span className="inline-block first-letter:uppercase">{colourName(variant)}</span>
        </p>
      ) : null}

      {product.material ? (
        <p className="mt-2.5 text-[12px] leading-relaxed text-[#a69d98]">
          <span className="font-medium text-[#f6f1ee]">{t('product.labelled', { label: t('product.material') })}</span> {product.material}
        </p>
      ) : null}

      <div className="mt-3 border-t border-white/[0.08] pt-3">
        <p id={sizeLabelId} className="mb-2 text-[12px] text-[#a69d98]">
          {t('product.size')}
        </p>
        {sizes.length ? (
          <SizePicker
            sizes={sizes}
            selected={choice.size}
            onSelect={pickSize}
            currency={currency}
            soldOutLabel={t('product.soldOut')}
            labelledBy={sizeLabelId}
          />
        ) : (
          <span className="inline-flex rounded-xl border border-white/[0.12] bg-[#231e1d] px-3 py-1.5 text-[12.5px] font-medium text-[#f6f1ee]">
            {t('product.oneSize')}
          </span>
        )}
      </div>

      {/* Pushed to the bottom, so compared cards line their buttons up. */}
      <div className="mt-auto pt-3.5">
        {variant ? (
          <>
            <button
              type="button"
              onClick={() => void add()}
              disabled={!selection || adding === 'adding' || actions.busy}
              className={cn(
                PRIMARY_BUTTON,
                CARD_FOCUS_RING,
                'h-11 w-full text-[13.5px]',
                // Added: a quiet confirmation; the pink moves on to Checkout in the message below.
                adding === 'added' && 'bg-[#282422] text-[#f6f1ee] hover:bg-[#2e2927]',
              )}
            >
              {adding === 'adding' ? (
                <LoaderCircle aria-hidden className="h-4 w-4 animate-spin motion-reduce:animate-none" />
              ) : adding === 'added' ? (
                <Check aria-hidden className="h-4 w-4 text-[#4ade80]" strokeWidth={2.6} />
              ) : (
                <ShoppingBag aria-hidden className="h-4 w-4" />
              )}
              {adding === 'adding' ? t('shop.adding') : adding === 'added' ? t('shop.added') : t('shop.addToBag')}
            </button>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (selection) actions.buyNow(selection)
                }}
                disabled={!selection}
                className={cn(OUTLINE_BUTTON, CARD_FOCUS_RING, 'h-10 flex-1 text-[13px]')}
              >
                {t('shop.buyNow')}
              </button>
              <WishlistHeart product={product} actions={actions} tone="card" />
            </div>
            <SmartLink
              to={product.url}
              className={cn(
                CARD_FOCUS_RING,
                'mx-auto mt-2.5 block w-fit rounded px-1 text-center text-[12.5px] text-[#a69d98] underline-offset-4 transition-colors hover:text-[#e6297e] hover:underline motion-reduce:transition-none',
              )}
            >
              {t('product.view')}
            </SmartLink>
          </>
        ) : (
          <SmartLink to={product.url} className={cn(PRIMARY_BUTTON, CARD_FOCUS_RING, 'h-11 w-full text-[13.5px]')}>
            {t('product.view')}
          </SmartLink>
        )}
      </div>
    </article>
  )
}
