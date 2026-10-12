'use client'

import { useCallback, useEffect, useRef, type PointerEvent, type RefObject } from 'react'
import { PHONE_QUERY, prefersReducedMotion } from './hooks'

/** Pulled further than this (px), the sheet closes. */
const CLOSE_AFTER_PX = 110
/** A quick flick down closes it too (px per ms), once it has moved a little. */
const FLICK_SPEED = 0.55
const FLICK_MIN_PX = 24
const SETTLE_MS = 180

type Drag = { id: number; startY: number; lastY: number; lastTime: number; speed: number }

/**
 * Lets phones pull Jules's sheet down to close it, as bottom sheets work in
 * apps: by its handle or a header (anything marked `data-jules-grab`, styled
 * `touch-none`). Buttons in a header still work, and scrolling lists are never
 * grabbed. The sheet follows the finger; let go far or fast enough and it
 * slides away, otherwise it settles back.
 *
 * Returns pointer handlers for the sheet itself.
 */
export function useSheetDrag(sheetRef: RefObject<HTMLElement | null>, open: boolean, onClose: () => void) {
  const drag = useRef<Drag | null>(null)
  const settleTimer = useRef<number | undefined>(undefined)

  /** Hands the sheet back to its classes (after a drag, or when it opens again). */
  const release = useCallback(() => {
    window.clearTimeout(settleTimer.current)
    const sheet = sheetRef.current
    if (!sheet) return
    sheet.style.transform = ''
    sheet.style.transition = ''
  }, [sheetRef])

  // Opening again always starts from the sheet's own resting place.
  useEffect(() => {
    if (open) release()
  }, [open, release])

  useEffect(() => () => window.clearTimeout(settleTimer.current), [])

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0 || !event.isPrimary || !window.matchMedia(PHONE_QUERY).matches) return
    const target = event.target instanceof Element ? event.target : null
    if (!target?.closest('[data-jules-grab]') || target.closest('button, a, input, textarea, select, [role="menu"]')) return
    const sheet = sheetRef.current
    if (!sheet) return
    window.clearTimeout(settleTimer.current)
    drag.current = { id: event.pointerId, startY: event.clientY, lastY: event.clientY, lastTime: event.timeStamp, speed: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
    sheet.style.transition = 'none'
  }

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const current = drag.current
    const sheet = sheetRef.current
    if (!current || !sheet || event.pointerId !== current.id) return
    const elapsed = event.timeStamp - current.lastTime
    if (elapsed > 0) current.speed = (event.clientY - current.lastY) / elapsed
    current.lastY = event.clientY
    current.lastTime = event.timeStamp
    sheet.style.transform = `translateY(${Math.max(0, event.clientY - current.startY)}px)`
  }

  function onPointerEnd(event: PointerEvent<HTMLElement>) {
    const current = drag.current
    const sheet = sheetRef.current
    if (!current || event.pointerId !== current.id) return
    drag.current = null
    if (!sheet) return
    const moved = Math.max(0, event.clientY - current.startY)
    const close = event.type === 'pointerup' && (moved > CLOSE_AFTER_PX || (moved > FLICK_MIN_PX && current.speed > FLICK_SPEED))
    const ms = prefersReducedMotion() ? 0 : SETTLE_MS
    // Slide on (or back) from where the finger let go; the sheet's own fade
    // and hiding wait until the slide is over.
    sheet.style.transition = `transform ${ms}ms ease-out, opacity ${ms}ms ease-out, visibility 0s linear ${ms}ms`
    sheet.style.transform = close ? 'translateY(100%)' : ''
    if (close) onClose()
    settleTimer.current = window.setTimeout(release, ms + 40)
  }

  return { onPointerDown, onPointerMove, onPointerUp: onPointerEnd, onPointerCancel: onPointerEnd }
}
