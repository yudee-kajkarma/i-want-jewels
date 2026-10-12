'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useCurrency } from '../../../context/CurrencyContext'
import { formatPrice } from '../../../utils/price'
import type { JulesChatApi, JulesProductCard } from '../contract'
import { AS_TYPED, CARD, CARD_FOCUS_RING, OUTLINE_BUTTON } from '../ui'
import { SmartLink } from './SmartLink'
import { SnapRow } from './SnapRow'
import { Thumb, WishlistHeart } from './ShopParts'

type CardActions = Pick<JulesChatApi, 'busy' | 'chooseOptions' | 'toggleWishlist' | 'isWishlisted'>

/** Products as a sliding row of cards. */
export function ProductsBlock({ products, actions }: { products: JulesProductCard[]; actions: CardActions }) {
  return (
    <SnapRow arrows={products.length > 2} arrowTop="top-[68px]">
      {products.map((product) => (
        <li key={product.slug} className="w-[168px] shrink-0 snap-start">
          <ProductCard product={product} actions={actions} />
        </li>
      ))}
    </SnapRow>
  )
}

/**
 * One piece in a row: its photo on the light tile and its name (both open
 * the product page), the price ("from" when sizes cost more), the heart, and
 * "Add", which shows its colours and sizes in the chat to choose from.
 * A sold-out piece says so instead of offering "Add".
 */
export function ProductCard({ product, actions }: { product: JulesProductCard; actions: CardActions }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.jules' })
  const { currency } = useCurrency()
  const price = formatPrice(product.price, currency)

  return (
    <article className={cn(CARD, 'flex h-full flex-col overflow-hidden')}>
      <div className="relative">
        {/* The title below is the link for keyboards and screen readers; the photo is a larger target for taps. */}
        <SmartLink to={product.url} tabIndex={-1} aria-hidden className="block">
          <Thumb src={product.image} sizes="168px" className="aspect-square w-full rounded-none" />
        </SmartLink>
        <WishlistHeart product={product} actions={actions} tone="photo" className="absolute right-2 top-2" />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5">
        <SmartLink
          to={product.url}
          className={cn(CARD_FOCUS_RING, 'line-clamp-2 rounded text-[13px] leading-snug text-[#f6f1ee] transition-colors hover:text-[#e6297e] motion-reduce:transition-none')}
        >
          {product.title}
        </SmartLink>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5">
          <span className="min-w-0 text-[13.5px] font-semibold leading-tight text-white">
            {product.fixedPrice ? price : t('product.from', { price })}
          </span>
          {product.inStock ? (
            <button
              type="button"
              disabled={actions.busy}
              onClick={() => void actions.chooseOptions(product.slug)}
              aria-label={t('shop.addLabel', { title: product.title, ...AS_TYPED })}
              // Outlined: a row of cards stays calm; the pink is kept for "Add to bag" once a size is chosen.
              className={cn(OUTLINE_BUTTON, CARD_FOCUS_RING, 'h-7 shrink-0 px-3 text-[12px]')}
            >
              {t('shop.add')}
            </button>
          ) : (
            <span className="shrink-0 rounded-full border border-white/[0.1] px-2 py-0.5 text-[11px] text-[#a69d98]">{t('product.soldOut')}</span>
          )}
        </div>
      </div>
    </article>
  )
}
