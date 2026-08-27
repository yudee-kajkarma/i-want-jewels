'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  /** Short plain-language explanation shown on hover/focus. */
  text: string
}

const WIDTH = 240
const GAP = 8
const EDGE = 8

/**
 * Small "?" badge that reveals a one-line explanation, mirroring the hints DHL
 * shows beside its own shipment fields.
 *
 * The bubble is rendered into `document.body` through a portal and positioned
 * with `fixed` coordinates. An in-flow absolute bubble gets clipped by the
 * modal's scroll container and by the commodities table's horizontal overflow,
 * and loses to sibling stacking contexts — a portal has neither problem.
 */
export default function FieldHelp({ text }: Props) {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number; below: boolean } | null>(null)

  const place = useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const r = el.getBoundingClientRect()

    // Keep the bubble inside the viewport horizontally.
    const half = WIDTH / 2
    const left = Math.min(
      Math.max(r.left + r.width / 2 - half, EDGE),
      window.innerWidth - WIDTH - EDGE,
    )

    // Flip below the badge when there isn't room above it.
    const below = r.top < 90
    const top = below ? r.bottom + GAP : r.top - GAP

    setCoords({ top, left, below })
  }, [])

  const show = useCallback(() => place(), [place])
  const hide = useCallback(() => setCoords(null), [])

  useEffect(() => {
    if (!coords) return
    // Any scroll or resize invalidates fixed coordinates, so close on both.
    window.addEventListener('scroll', hide, true)
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
    }
  }, [coords, hide])

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        aria-label={text}
        title={text}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={(e) => {
          e.preventDefault()
          // Tap support: no hover on touch devices.
          if (coords) hide()
          else show()
        }}
        className="ml-1 inline-flex h-3.5 w-3.5 shrink-0 cursor-help items-center justify-center rounded-full border border-[#d9b6cd] align-middle text-[9px] font-bold leading-none text-[#a86d92] transition hover:border-[#d24a90] hover:text-[#d24a90] focus:outline-none focus:ring-1 focus:ring-[#d24a90]"
      >
        ?
      </button>

      {coords && typeof document !== 'undefined'
        ? createPortal(
            <span
              role="tooltip"
              style={{
                position: 'fixed',
                top: coords.top,
                left: coords.left,
                width: WIDTH,
                transform: coords.below ? undefined : 'translateY(-100%)',
                zIndex: 2147483647,
              }}
              className="pointer-events-none rounded border border-[#e3bfd6] bg-white px-2.5 py-1.5 text-[11px] font-normal normal-case leading-relaxed tracking-normal text-[#4f2040] shadow-lg"
            >
              {text}
            </span>,
            document.body,
          )
        : null}
    </>
  )
}
