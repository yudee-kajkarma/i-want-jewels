import { prefersReducedMotion } from './hooks'

/*
 * Jules opening and closing, as the best-loved messengers do it: the panel
 * grows out of the "Ask Jules" button's corner on a soft spring, from a little
 * smaller and lower, settling with the slightest give; its first parts follow
 * in a gentle cascade. Closing draws it quickly back into that corner. The
 * button answers too (a spin into the close icon, a pop back into the pill:
 * JulesLauncher, tailwind.config.cjs). The same on phones and larger screens.
 *
 * The spring is real physics, sampled into a CSS linear() curve; browsers
 * without linear() get a close cubic-bezier. Only transform and opacity move,
 * and the panel's frosted blur is paused meanwhile, so it stays smooth on slow
 * computers (the panel is nearly opaque, so it looks the same).
 */

/** A damped spring (stiffness, damping, mass) sampled into a linear() easing, with how long it takes to settle. */
function spring(stiffness: number, damping: number, mass = 1): { easing: string; duration: number } {
  const step = 1 / 120
  const points: number[] = []
  let position = 0
  let velocity = 0
  let time = 0
  // Until it has settled: within 0.1% of its place, and barely moving.
  while (time < 2 && !(time > 0.1 && Math.abs(1 - position) < 0.001 && Math.abs(velocity) < 0.01)) {
    const force = -stiffness * (position - 1) - damping * velocity
    velocity += (force / mass) * step
    position += velocity * step
    points.push(position)
    time += step
  }
  const every = Math.max(1, Math.round(points.length / 40))
  const sampled = points.filter((_, i) => i % every === 0).map((p) => Number(p.toFixed(4)))
  sampled[sampled.length - 1] = 1
  return { easing: `linear(0, ${sampled.join(', ')})`, duration: Math.round(time * 1000) }
}

const supportsLinear = () => typeof CSS !== 'undefined' && CSS.supports('animation-timing-function', 'linear(0, 1)')

/** Soft and quick, with the slightest give at the end. */
const OPEN = (() => {
  const s = spring(260, 24)
  return { duration: Math.min(560, s.duration), easing: s.easing, fallback: 'cubic-bezier(.2,1.15,.35,1)' }
})()
const CLOSE_MS = 170

/** The corner the panel grows from: its bottom edge, above the button. */
function cornerOf(panel: HTMLElement, button: HTMLElement | null): string {
  const box = panel.getBoundingClientRect()
  const at = button?.getBoundingClientRect()
  const x = at ? Math.min(box.width, Math.max(0, at.left + at.width / 2 - box.left)) : box.width
  return `${x}px 100%`
}

/**
 * The panel's frosted blur is redrawn every frame while it moves, which slow
 * computers can't keep up with. Returns what brings it back.
 */
function pauseBlur(panel: HTMLElement): () => void {
  panel.style.backdropFilter = 'none'
  panel.style.setProperty('-webkit-backdrop-filter', 'none')
  panel.style.willChange = 'transform, opacity'
  return () => {
    panel.style.backdropFilter = ''
    panel.style.removeProperty('-webkit-backdrop-filter')
    panel.style.willChange = ''
  }
}

/** The panel's first parts (marked `data-jules-stagger` on their parent) follow in a gentle cascade. */
function cascade(panel: HTMLElement) {
  const items = [...panel.querySelectorAll('[data-jules-stagger] > *')].slice(0, 8)
  items.forEach((item, i) =>
    item.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], {
      duration: 380,
      delay: 90 + i * 40,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      fill: 'backwards',
    }),
  )
}

/** The panel grows out of the button's corner. Call once it is showing. */
export async function openPanelMotion(panel: HTMLElement, button: HTMLElement | null): Promise<void> {
  if (prefersReducedMotion()) return
  const resumeBlur = pauseBlur(panel)
  const origin = cornerOf(panel, button)
  panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140, easing: 'linear' })
  const grow = panel.animate(
    [
      { transform: 'translateY(16px) scale(.86)', transformOrigin: origin },
      { transform: 'translateY(0) scale(1)', transformOrigin: origin },
    ],
    { duration: OPEN.duration, easing: supportsLinear() ? OPEN.easing : OPEN.fallback },
  )
  cascade(panel)
  await grow.finished.catch(() => undefined)
  resumeBlur()
}

/** The panel draws back into the button's corner. Call before hiding it. */
export async function closePanelMotion(panel: HTMLElement, button: HTMLElement | null): Promise<void> {
  if (prefersReducedMotion()) return
  const resumeBlur = pauseBlur(panel)
  const origin = cornerOf(panel, button)
  const shrink = panel.animate(
    [
      { transform: 'translateY(0) scale(1)', opacity: 1, transformOrigin: origin },
      { transform: 'translateY(10px) scale(.9)', opacity: 0, transformOrigin: origin },
    ],
    { duration: CLOSE_MS, easing: 'cubic-bezier(.4,0,1,1)', fill: 'forwards' },
  )
  await shrink.finished.catch(() => undefined)
  resumeBlur()
}

/** Ends the closing motion's last frame (the panel is hidden now), so it opens normally next time. */
export const resetPanelMotion = (panel: HTMLElement) => panel.getAnimations().forEach((animation) => animation.cancel())
