import { Fragment, useEffect, useState, type ReactNode } from 'react'
import { withBold } from './richText'

/*
 * A new answer flows in letter by letter, as if Jules were writing it: every
 * animation frame a few more letters appear, and the newest ones fade in from
 * transparent, so the text spreads smoothly instead of jumping. The whole
 * answer is already here; this only paces it.
 */

/** Letters per second, at least (a calm reading pace)… */
const MIN_RATE = 45
/** …and faster for long answers, so none takes much longer than this. */
const MAX_SECONDS = 6
/** The newest letters fade in over this many letters (about half a second). */
const FADE = 24

export type Segment = { text: string; bold: boolean }

/** A text as the customer sees it: plain and **bold** parts, without the asterisks. */
export function segmentsOf(text: string): Segment[] {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
    .filter((segment) => segment.text)
}

/** The number of letters the customer sees in a text (the bold markers don't count). */
export const visibleLength = (text: string) => segmentsOf(text).reduce((sum, segment) => sum + segment.text.length, 0)

/**
 * Hands `shown` letters out to parts of `counts` letters each, in order: how
 * far into each part the answer has flowed (0 or less: not yet; past its
 * length: shown, its last letters still fading in). Undefined for every part
 * when the answer is all shown.
 */
export function shareLetters(counts: number[], shown: number | undefined): Array<number | undefined> {
  if (shown === undefined) return counts.map(() => undefined)
  let before = 0
  return counts.map((count) => {
    const share = shown - before
    before += count
    return share
  })
}

const clamp = (n: number, low: number, high: number) => Math.min(high, Math.max(low, n))

/**
 * A text flowing in: the letters before `shown` (fractional, as it moves every
 * frame), the newest of them fading in. The rest of the word being written is
 * kept in place, invisible, so a word never starts on one line and jumps to the
 * next. All of it, with **bold**, when `shown` is undefined.
 */
export function RevealText({ text, shown }: { text: string; shown?: number }): ReactNode {
  if (shown === undefined) return withBold(text)

  const out: ReactNode[] = []
  let start = 0
  /** After the cursor: still inside the word being written. */
  let inWord = true
  segmentsOf(text).forEach((segment, i) => {
    const { length } = segment.text
    const parts: ReactNode[] = []
    const solid = clamp(Math.floor(shown - FADE) - start, 0, length)
    const visible = clamp(Math.ceil(shown) - start, 0, length)
    if (solid > 0) parts.push(segment.text.slice(0, solid))
    for (let k = solid; k < visible; k++) {
      const opacity = clamp((shown - (start + k)) / FADE, 0, 1)
      parts.push(<span key={k} style={{ opacity }}>{segment.text[k]}</span>)
    }
    if (visible < length && inWord) {
      const rest = segment.text.slice(visible)
      const space = rest.search(/\s/)
      const held = space === -1 ? rest : rest.slice(0, space)
      if (space !== -1) inWord = false
      if (held) parts.push(<span key="held" aria-hidden className="opacity-0">{held}</span>)
    }
    start += length
    if (!parts.length) return
    out.push(segment.bold ? <strong key={i} className="font-semibold">{parts}</strong> : <Fragment key={i}>{parts}</Fragment>)
  })
  return out
}

/**
 * How far a new answer of `total` letters has flowed in: undefined once it is
 * all shown (or straight away when `active` is false), otherwise a fractional
 * number of letters that grows every frame. `onStep` runs after each frame,
 * `onDone` once at the end.
 */
export function useRevealedLetters(total: number, active: boolean, onStep?: () => void, onDone?: () => void): number | undefined {
  const [shown, setShown] = useState<number | undefined>(active ? 0 : undefined)

  useEffect(() => {
    if (!active) return
    const rate = Math.max(MIN_RATE, total / MAX_SECONDS)
    // Until the last letters have faded in too.
    const end = total > 0 ? total + FADE : 0
    const began = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const letters = ((now - began) / 1000) * rate
      if (letters >= end) {
        setShown(undefined)
        return
      }
      setShown(letters)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // Paced once, for the letters the answer arrived with.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  useEffect(() => {
    if (!active) return
    if (shown === undefined) onDone?.()
    else onStep?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, active])

  return shown
}
