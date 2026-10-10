import { useSyncExternalStore } from 'react'

/** Small browser hooks Lumi's screens share. */

const MINUTE = 60_000

function subscribeToMinutes(onTick: () => void) {
  const id = window.setInterval(onTick, MINUTE)
  return () => window.clearInterval(id)
}

const thisMinute = () => Math.floor(Date.now() / MINUTE) * MINUTE

/** The current time, refreshed once a minute, so "5 min ago" and "Today" stay true. */
export function useNow(): number {
  return useSyncExternalStore(subscribeToMinutes, thisMinute, thisMinute)
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeToMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/** True when the visitor asked their device for less motion. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
}

/** Phones get Lumi as a bottom sheet (Tailwind's `sm` breakpoint is 640px). */
export const PHONE_QUERY = '(max-width: 639px)'

/** Read without subscribing, e.g. at the start of a gesture. */
export const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches

/** A mouse or trackpad: safe to put the cursor in a text box without popping up a keyboard. */
export const isFinePointer = () => window.matchMedia('(pointer: fine)').matches
