import { useEffect, useState } from 'react'

/*
 * A new answer appears a few words at a time, from start to end, as if Jules
 * were writing it. The whole answer is already here; this only paces it.
 */

/** Time between steps. */
const STEP_MS = 35
/** Long answers take larger steps, so none takes much longer than this many steps (about 3 seconds). */
const MAX_STEPS = 90

/** The number of words in a text. */
export const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length

/**
 * The first `words` words of `text`, with its spacing kept. A **bold** part cut
 * in half is closed, so it shows bold rather than as asterisks.
 */
export function firstWords(text: string, words: number): string {
  if (words >= wordCount(text)) return text
  let seen = 0
  let out = ''
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue
    if (!/^\s+$/.test(part)) {
      if (seen === words) break
      seen++
    }
    out += part
  }
  out = out.trimEnd()
  return (out.match(/\*\*/g) ?? []).length % 2 ? `${out}**` : out
}

/**
 * Hands `shown` words out to parts of `counts` words each, in order: how many
 * words of each part to show (all of every part when `shown` is undefined).
 */
export function shareWords(counts: number[], shown: number | undefined): Array<number | undefined> {
  if (shown === undefined) return counts.map(() => undefined)
  const shares: number[] = []
  for (const count of counts) {
    const before = shares.length ? counts.slice(0, shares.length).reduce((a, b) => a + b, 0) : 0
    shares.push(Math.max(0, Math.min(count, shown - before)))
  }
  return shares
}

/**
 * How many of `total` words to show: all of them when `active` is false,
 * otherwise counting up from 0. `onStep` runs after each step, `onDone` once at the end.
 */
export function useRevealedWords(total: number, active: boolean, onStep?: () => void, onDone?: () => void): number {
  const [shown, setShown] = useState(active ? 0 : Number.POSITIVE_INFINITY)

  useEffect(() => {
    if (!active) return
    const step = Math.max(1, Math.ceil(total / MAX_STEPS))
    let count = 0
    const timer = window.setInterval(() => {
      count = Math.min(total, count + step)
      setShown(count)
      if (count >= total) {
        window.clearInterval(timer)
        setShown(Number.POSITIVE_INFINITY)
      }
    }, STEP_MS)
    return () => window.clearInterval(timer)
    // Paced once, for the words the answer arrived with.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const done = shown >= total
  useEffect(() => {
    if (!active) return
    if (done) onDone?.()
    else onStep?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown, done, active])

  return shown
}
