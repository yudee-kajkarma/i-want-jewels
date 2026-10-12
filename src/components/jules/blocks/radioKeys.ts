import type { KeyboardEvent } from 'react'

/**
 * Arrow keys for a row of radio buttons (colours, sizes): Right/Down and
 * Left/Up move to the next or previous choice that can be picked (wrapping
 * around), Home and End jump to the ends. Picks it and moves focus there.
 * `choices` are the indexes that can be picked, in order.
 */
export function onRadioKey(event: KeyboardEvent<HTMLElement>, index: number, choices: number[], pick: (index: number) => void) {
  if (!choices.length) return
  let next: number | undefined
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = choices.find((i) => i > index) ?? choices[0]
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = [...choices].reverse().find((i) => i < index) ?? choices[choices.length - 1]
  else if (event.key === 'Home') next = choices[0]
  else if (event.key === 'End') next = choices[choices.length - 1]
  if (next === undefined) return
  event.preventDefault()
  pick(next)
  const target = event.currentTarget.parentElement?.children[next]
  if (target instanceof HTMLElement) target.focus()
}
