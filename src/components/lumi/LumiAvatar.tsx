'use client'

import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

/**
 * Lumi's face: the owner's illustration (public/lumi/lumi-avatar.svg) in a
 * thin pink-to-blush ring with a dark gap, as in the owner's mock. The same
 * drawing is also inlined below and shows while the file loads (or if it
 * can't), so Lumi never shows a broken image. Swapping the file changes the
 * picture everywhere.
 */

const PHOTOS = ['/lumi/lumi-avatar.svg']

/** The ring around the avatar: the shop's pink fading to blush. */
export const LUMI_RING = 'bg-[linear-gradient(45deg,#e6297e_0%,#ec5a98_45%,#f4c0b4_100%)]'

export type LumiAvatarSize = 28 | 36 | 40 | 44 | 56

const BOX: Record<LumiAvatarSize, string> = {
  28: 'h-7 w-7 p-[1.5px]',
  36: 'h-9 w-9 p-[2px]',
  40: 'h-10 w-10 p-[2px]',
  44: 'h-11 w-11 p-[2px]',
  56: 'h-14 w-14 p-[2px]',
}

/** The dark gap between the ring and the picture. */
const GAP: Record<LumiAvatarSize, string> = {
  28: 'p-[1.5px]',
  36: 'p-[2px]',
  40: 'p-[2px]',
  44: 'p-[2px]',
  56: 'p-[2.5px]',
}

const DOT: Record<LumiAvatarSize, string> = {
  28: 'h-2 w-2 ring-[1.5px]',
  36: 'h-2.5 w-2.5 ring-2',
  40: 'h-2.5 w-2.5 ring-2',
  44: 'h-2.5 w-2.5 ring-2',
  56: 'h-3.5 w-3.5 ring-2',
}

/** The illustration drawn inline (the file's drawing without its small details). */
export function LumiSketch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <rect width="200" height="200" fill="#f8dde9" />
      <path d="M58 168 C54 128 52 96 60 72 C68 48 84 36 100 36 C116 36 132 48 140 72 C148 96 146 128 142 168 Z" fill="#2a1c19" />
      <path d="M88 118 H112 V156 Q100 162 88 156 Z" fill="#dfa982" />
      <path d="M30 210 C34 176 54 158 82 152 Q100 166 118 152 C146 158 166 176 170 210 Z" fill="#17121a" />
      <ellipse cx="100" cy="92" rx="28" ry="33" fill="#e8b896" />
      <path d="M71 104 C68 70 82 52 100 52 C118 52 132 68 129 104 C126 84 118 70 106 66 C96 70 82 80 71 104 Z" fill="#2a1c19" />
      <path d="M84 93 Q89 97 94 93 M106 93 Q111 97 116 93" fill="none" stroke="#3b2622" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M94 109 Q100 114 106 109" fill="none" stroke="#b25a57" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 156 Q100 174 122 156" fill="none" stroke="#d6a640" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

/** Lumi's picture filling its box (no ring): the file, or the inline drawing while it loads or if it can't. */
export function LumiFace({ className }: { className?: string }) {
  const [state, setState] = useState({ photo: 0, loaded: false })
  const { photo, loaded } = state

  /** Moves on to the next picture; ignores a late report about one already replaced. */
  const failed = useCallback((index: number) => {
    setState((s) => (s.photo === index ? { photo: index + 1, loaded: false } : s))
  }, [])
  const ready = useCallback((index: number) => {
    setState((s) => (s.photo === index && !s.loaded ? { ...s, loaded: true } : s))
  }, [])

  // A server-rendered picture can finish (or fail) before React listens for its
  // events, so look at it once it is on the page.
  const watch = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img?.complete) return
      if (img.naturalWidth > 0) ready(photo)
      else failed(photo)
    },
    [photo, ready, failed],
  )

  return (
    <span className={cn('relative block overflow-hidden rounded-full bg-[#f8dde9]', className)}>
      {!loaded ? <LumiSketch className="absolute inset-0 h-full w-full" /> : null}
      {photo < PHOTOS.length ? (
        <img
          key={PHOTOS[photo]}
          ref={watch}
          src={PHOTOS[photo]}
          alt=""
          draggable={false}
          decoding="async"
          onLoad={() => ready(photo)}
          onError={() => failed(photo)}
          className={cn('absolute inset-0 h-full w-full object-cover', loaded ? 'opacity-100' : 'opacity-0')}
        />
      ) : null}
    </span>
  )
}

type LumiAvatarProps = {
  size?: LumiAvatarSize
  /** Shows the green "online" dot. */
  online?: boolean
  /** Gives the picture a name for screen readers; leave off when "Lumi" is written next to it. */
  labelled?: boolean
  className?: string
}

/** Lumi's round avatar in its pink ring, in five sizes (28–56 px). */
export function LumiAvatar({ size = 36, online = false, labelled = false, className }: LumiAvatarProps) {
  const { t } = useTranslation('common', { keyPrefix: 'chat' })
  return (
    <span
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? t('lumi.avatarAlt') : undefined}
      aria-hidden={labelled ? undefined : true}
      className={cn('relative inline-block shrink-0 rounded-full', LUMI_RING, BOX[size], className)}
    >
      <span className={cn('block h-full w-full rounded-full bg-[#141110]', GAP[size])}>
        <LumiFace className="h-full w-full" />
      </span>
      {online ? <span className={cn('absolute bottom-0 right-0 rounded-full bg-[#4ade80] ring-[#141110]', DOT[size])} /> : null}
    </span>
  )
}
