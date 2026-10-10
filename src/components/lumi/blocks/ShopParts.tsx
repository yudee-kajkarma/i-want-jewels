'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import { Gem, Heart, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@/lib/router'
import { cn } from '@/lib/utils'
import { clearSingleCheckoutDraft } from '../../../utils/checkoutStorage'
import type { LumiChatApi } from '../contract'
import { AS_TYPED, CARD, CARD_FOCUS_RING, OUTLINE_BUTTON, PHOTO_TILE, PRIMARY_BUTTON } from '../ui'
import { SmartLink } from './SmartLink'

/**
 * Small pieces the shop blocks share: a product photo on its light tile, the
 * wishlist heart, View bag / Checkout, and a calm empty state.
 */

/**
 * Photos the image service can resize: the shop's storage (https) and the site's own files. The
 * shop's originals are large PNGs (often over 1 MB), so a small tile gets a small copy.
 */
const RESIZABLE = /^(https:\/\/|\/(?![/\\]))/i

type ThumbProps = {
  src?: string
  /** How wide the tile is drawn, e.g. "84px": the size of the copy that is loaded. */
  sizes: string
  className?: string
}

/**
 * A product photo on the light tile; white photo backgrounds melt into it.
 * It fades in once loaded; a gem stands in when there is no photo or it
 * can't be loaded.
 */
export function Thumb({ src, sizes, className }: ThumbProps) {
  const [result, setResult] = useState<{ src: string; ok: boolean } | null>(null)
  const status = src && result?.src === src ? (result.ok ? 'loaded' : 'failed') : 'loading'
  return (
    <span className={cn('relative block shrink-0 overflow-hidden rounded-xl', PHOTO_TILE, className)}>
      {src && status !== 'failed' ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          unoptimized={!RESIZABLE.test(src)}
          onLoad={() => setResult({ src, ok: true })}
          onError={() => setResult({ src, ok: false })}
          className={cn(
            'object-cover mix-blend-multiply transition-opacity duration-200 motion-reduce:transition-none',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : (
        <Gem aria-hidden className="absolute inset-0 m-auto h-5 w-5 text-[#a69d98]" />
      )}
    </span>
  )
}

type WishlistHeartProps = {
  product: { productId: string; slug: string; title: string }
  actions: Pick<LumiChatApi, 'toggleWishlist' | 'isWishlisted'>
  /** Drawn on a photo's light tile, or on the dark card. */
  tone: 'photo' | 'card'
  className?: string
}

/**
 * The heart that saves a piece to the wishlist or takes it off again: an
 * outline, filled pink once saved. Whether it is saved comes from the shop's
 * own wishlist, so it always matches the heart on the product page.
 */
export function WishlistHeart({ product, actions, tone, className }: WishlistHeartProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.lumi.shop' })
  const [pending, setPending] = useState(false)
  // Chats saved before products carried their id can't be saved from here.
  if (!product.productId) return null
  const saved = actions.isWishlisted(product.productId)

  async function toggle() {
    if (pending) return
    setPending(true)
    try {
      await actions.toggleWishlist({ productId: product.productId, slug: product.slug })
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => void toggle()}
      aria-busy={pending || undefined}
      aria-label={t(saved ? 'wishlistRemove' : 'wishlistAdd', { title: product.title, ...AS_TYPED })}
      title={t(saved ? 'wishlistRemove' : 'wishlistAdd', { title: product.title, ...AS_TYPED })}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full outline-none transition-colors duration-150 motion-reduce:transition-none',
        tone === 'photo'
          ? 'h-8 w-8 bg-white/90 text-[#1b1715] shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:bg-white focus-visible:ring-2 focus-visible:ring-[#1b1715]/60'
          : cn(CARD_FOCUS_RING, 'h-10 w-10 border border-white/[0.16] text-[#f6f1ee] hover:border-white/30 hover:bg-white/[0.04]'),
        pending && 'opacity-60',
        className,
      )}
    >
      <Heart aria-hidden className={cn('h-4 w-4', saved && 'fill-[#e6297e] text-[#e6297e]')} strokeWidth={1.9} />
    </button>
  )
}

/**
 * View bag and Checkout, side by side. Checkout is for the whole bag, so a
 * "Buy now" left over from earlier must not take its place (as on the bag page).
 */
export function BagLinks({ className }: { className?: string }) {
  const { t } = useTranslation('common', { keyPrefix: 'chat.lumi.shop' })
  return (
    <div className={cn('grid grid-cols-2 gap-2', className)}>
      <SmartLink to="/cart" className={cn(OUTLINE_BUTTON, CARD_FOCUS_RING, 'h-10 px-3 text-[13px]')}>
        {t('viewBag')}
      </SmartLink>
      <Link to="/checkout" onClick={() => clearSingleCheckoutDraft()} className={cn(PRIMARY_BUTTON, CARD_FOCUS_RING, 'h-10 px-3 text-[13px]')}>
        {t('checkout')}
      </Link>
    </div>
  )
}

/** "Your bag is empty", with one way on under it. */
export function EmptyCard({ icon: Icon, text, action }: { icon: LucideIcon; text: string; action?: ReactNode }) {
  return (
    <div className={cn(CARD, 'flex gap-3 p-3.5')}>
      <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#282422] text-[#a69d98]">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1 self-center">
        <p className="text-[13px] leading-snug text-[#f6f1ee]">{text}</p>
        {action ? <div className="mt-2.5">{action}</div> : null}
      </div>
    </div>
  )
}

/** The light outline button used for an empty state's way on (Shop jewellery, Log in). */
export const EMPTY_ACTION = cn(OUTLINE_BUTTON, CARD_FOCUS_RING, 'h-9 px-3.5 text-[12.5px]')

/** Placeholder rows while the bag or wishlist loads. */
export function ShopSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-label={label} className={cn(CARD, 'flex flex-col gap-3 p-3.5')}>
      {[0, 1].map((row) => (
        <div key={row} className="flex items-center gap-3 motion-safe:animate-pulse">
          <div className="h-12 w-12 shrink-0 rounded-xl bg-white/[0.06]" />
          <div className="min-w-0 flex-1">
            <div className="h-3 w-2/3 rounded-full bg-white/[0.08]" />
            <div className="mt-2 h-2.5 w-1/3 rounded-full bg-white/[0.05]" />
          </div>
        </div>
      ))}
    </div>
  )
}
