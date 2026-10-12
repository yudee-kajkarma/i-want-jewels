'use client'

import { Heart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../context/AuthContext'
import { useAppSelector } from '../../../store/hooks'
import type { JulesChatApi } from '../contract'
import { ProductCard } from './ProductsBlock'
import { EMPTY_ACTION, EmptyCard, ShopSkeleton } from './ShopParts'
import { SmartLink } from './SmartLink'
import { SnapRow } from './SnapRow'

type WishlistActions = Pick<JulesChatApi, 'busy' | 'chooseOptions' | 'toggleWishlist' | 'isWishlisted'>

/**
 * The wishlist, read live from the shop's store, as a row of cards: "Add"
 * shows a piece's colours and sizes to choose from, the filled heart takes it
 * off the list. The wishlist belongs to an account, so guests are asked to log in.
 */
export function WishlistBlock({ actions }: { actions: WishlistActions }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  const { isAuthenticated } = useAuth()
  const wishlist = useAppSelector((state) => state.wishlist.wishlist)
  const loading = useAppSelector((state) => state.wishlist.status === 'loading' && !state.wishlist.wishlist)
  const items = wishlist?.items ?? []

  if (!isAuthenticated) {
    return (
      <EmptyCard
        icon={Heart}
        text={t('jules.shop.wishlistLogin')}
        action={
          <SmartLink to="/login" className={EMPTY_ACTION}>
            {t('logIn')}
          </SmartLink>
        }
      />
    )
  }
  if (loading) return <ShopSkeleton label={t('jules.loading')} />
  if (!items.length) {
    return (
      <EmptyCard
        icon={Heart}
        text={t('jules.shop.emptyWishlist')}
        action={
          <SmartLink to="/products" className={EMPTY_ACTION}>
            {t('tools.shopNow')}
          </SmartLink>
        }
      />
    )
  }

  return (
    <section aria-label={t('jules.shop.wishlist')}>
      <p className="mb-2 px-1 text-[12px] text-[#a69d98]">
        {t('jules.shop.wishlist')} · {t('tools.items', { count: items.length })}
      </p>
      <SnapRow arrows={items.length > 2} arrowTop="top-[96px]">
        {items.map((item, i) => (
          <li key={item.id || `${i}-${item.productId}`} className="w-[168px] shrink-0 snap-start">
            <ProductCard
              product={{
                productId: item.productId,
                slug: item.slug,
                title: item.title,
                image: item.thumbnail?.trim() || undefined,
                price: item.price,
                // The wishlist keeps one price per piece; its sizes and stock show once "Add" is tapped.
                fixedPrice: true,
                url: `/products/${item.slug}`,
                inStock: true,
              }}
              actions={actions}
            />
          </li>
        ))}
      </SnapRow>
    </section>
  )
}
