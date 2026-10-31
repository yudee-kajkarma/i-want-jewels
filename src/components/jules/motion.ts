import { prefersReducedMotion } from './hooks'

/*
 * Jules opening and closing, the same on phones and larger screens. The "Ask
 * Jules" pill first closes up where it is: Jules's face rolls like a wheel to
 * its right end, the pill closing behind it as its name fades, so a round face
 * is left in the corner. That circle rises to the panel's pink send button,
 * turning into it on the way (the face gives way to the arrow), and the panel
 * opens out of it in a growing circle, its first parts rising in one after
 * another. Screens with no send button (Chats, Explore) open out of the corner
 * circle itself. Closing folds the panel back into where it opened from; the
 * circle glides home as Jules's face and rolls back to the left, the pill
 * opening behind it as its name returns.
 *
 * Built to stay smooth on slow computers: only transform, opacity and
 * clip-path move (the graphics card draws them, nothing is laid out again),
 * the moving copy keeps one size from start to end, and the panel's frosted
 * blur is paused while it opens or closes. The page's own elements never move.
 */

/** The face rolling along the pill as it closes up, or back as it opens out. */
const ROLL_MS = 300
/** The circle rising to the send button, or gliding home. */
const GLIDE_MS = 340
/** The panel opening out of the button, or folding back into it. */
const REVEAL_MS = 380
const FOLD_MS = 300
const EASE = 'cubic-bezier(.4,0,.2,1)'
/** Above the panel (z-60) and the launcher (z-50). */
const COPY_Z = '70'
/** Marks the pill's name and the face that rolls over it (JulesLauncher). */
const LABEL = '[data-jules-label]'
const WHEEL = '[data-jules-wheel]'

/**
 * How an element looks right now: where it is, a copy of what's inside it, its
 * background, its lettering, and (the pill) the radius of the face that rolls.
 */
export type Face = {
  rect: DOMRect
  content: HTMLElement
  background: string
  /** The font and colour its words inherit from around it: the copy lives outside the button, so it takes them along. */
  type: Partial<CSSStyleDeclaration>
  wheelRadius: number
}

/** The look of `element` (the visible part of a button: the pill, the send button). */
export function faceOf(element: HTMLElement): Face {
  const style = getComputedStyle(element)
  const content = element.cloneNode(true) as HTMLElement
  content.removeAttribute('id')
  content.setAttribute('aria-hidden', 'true')
  const rect = element.getBoundingClientRect()
  return {
    rect,
    content,
    background: style.backgroundImage !== 'none' ? style.backgroundImage : style.backgroundColor,
    type: {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      color: style.color,
    },
    // offsetWidth: its own size, whatever turn it is drawn at.
    wheelRadius: (element.querySelector<HTMLElement>(WHEEL)?.offsetWidth ?? 0) / 2 || rect.height / 2,
  }
}

const center = (rect: DOMRect) => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
const px = (value: number) => `${value}px`

/** How far the pill closes up: from its full width to a circle as tall as it, at its right end. */
const rollDistance = (pill: Face) => Math.max(0, pill.rect.width - pill.rect.height)
/** The pill closed up: that circle, in the corner. */
const discOf = (pill: Face) => new DOMRect(pill.rect.right - pill.rect.height, pill.rect.top, pill.rect.height, pill.rect.height)
/** The pill's shape, closed up from the left by `cut` pixels. */
const clipAt = (pill: Face, cut: number) => `inset(0px 0px 0px ${px(cut)} round ${px(pill.rect.height / 2)})`
/** The face after rolling `distance` pixels: moved, and turned as a wheel would. */
const wheelAt = (pill: Face, distance: number) =>
  `translateX(${px(distance)}) rotate(${(distance / pill.wheelRadius) * (180 / Math.PI)}deg)`

/** The radius that reaches every corner of `box` from point (x, y). */
function coverRadius(box: DOMRect, x: number, y: number): number {
  return Math.max(
    Math.hypot(x - box.left, y - box.top),
    Math.hypot(x - box.right, y - box.top),
    Math.hypot(x - box.left, y - box.bottom),
    Math.hypot(x - box.right, y - box.bottom),
  )
}

function span(style: Partial<CSSStyleDeclaration>): HTMLSpanElement {
  const element = document.createElement('span')
  Object.assign(element.style, style)
  return element
}

/** A face's content, as a layer: at its real size and lettering, without its own background or motion. */
function contentOf(face: Face, style: Partial<CSSStyleDeclaration>): HTMLElement {
  const content = face.content.cloneNode(true) as HTMLElement
  Object.assign(content.style, {
    ...face.type,
    position: 'absolute',
    margin: '0',
    width: px(face.rect.width),
    height: px(face.rect.height),
    background: 'transparent',
    boxShadow: 'none',
    border: 'none',
    transition: 'none',
    animation: 'none',
    ...style,
  })
  return content
}

/**
 * The moving copy: the pill, at its place and size for the whole motion (only
 * its clip and transform change). Its right end is the corner circle, in which
 * the send button (or the corner button) appears while gliding.
 */
type Copy = { root: HTMLSpanElement; look: HTMLSpanElement; content: HTMLElement; pill: Face }

function copyOf(pill: Face, rolledUp: boolean): Copy {
  const { rect } = pill
  const distance = rollDistance(pill)
  const root = span({
    position: 'fixed',
    zIndex: COPY_Z,
    left: px(rect.left),
    top: px(rect.top),
    width: px(rect.width),
    height: px(rect.height),
    pointerEvents: 'none',
    clipPath: clipAt(pill, rolledUp ? distance : 0),
    // Scaled around the corner circle's centre while gliding.
    transformOrigin: `${px(distance + rect.height / 2)} ${px(rect.height / 2)}`,
    willChange: 'transform, clip-path',
  })
  root.setAttribute('aria-hidden', 'true')
  const look = span({ position: 'absolute', inset: '0', borderRadius: '9999px', background: pill.background })
  const content = contentOf(pill, { left: '0', top: '0' })
  const wheel = content.querySelector<HTMLElement>(WHEEL)
  if (wheel) {
    wheel.style.willChange = 'transform'
    if (rolledUp) wheel.style.transform = wheelAt(pill, distance)
  }
  if (rolledUp) content.querySelectorAll<HTMLElement>(LABEL).forEach((label) => (label.style.opacity = '0'))
  root.append(look, content)
  document.body.appendChild(root)
  return { root, look, content, pill }
}

/** The pill rolls up into its corner circle (`closing`), or back out: the face turns, the clip edge follows it, the name fades. */
function roll(copy: Copy, closing: boolean): Promise<unknown> {
  const { pill } = copy
  const distance = rollDistance(pill)
  if (!distance) return Promise.resolve()
  const [from, to] = closing ? [0, distance] : [distance, 0]
  const timing = { duration: ROLL_MS, easing: EASE, fill: 'forwards' as const }
  copy.content.querySelector(WHEEL)?.animate([{ transform: wheelAt(pill, from) }, { transform: wheelAt(pill, to) }], timing)
  // The name goes in the first third, before the face reaches it; it returns in the last third, once the face has passed.
  copy.content.querySelectorAll(LABEL).forEach((label) =>
    label.animate(
      [{ opacity: closing ? 1 : 0 }, { opacity: closing ? 0 : 1 }],
      closing
        ? { duration: ROLL_MS * 0.35, easing: 'ease-out', fill: 'forwards' }
        : { duration: ROLL_MS * 0.4, delay: ROLL_MS * 0.6, easing: 'ease-in', fill: 'both' },
    ),
  )
  return copy.root.animate([{ clipPath: clipAt(pill, from) }, { clipPath: clipAt(pill, to) }], timing).finished
}

/** Where the corner circle must move, and how much it must grow, to sit exactly on `rect`. */
function placeOn(copy: Copy, rect: DOMRect) {
  const disc = discOf(copy.pill)
  const scale = rect.width / disc.width
  const { x, y } = center(rect)
  const { x: dx, y: dy } = center(disc)
  return { scale, transform: `translate(${px(x - dx)}, ${px(y - dy)}) scale(${scale})` }
}

/**
 * Another face (the send button, or the corner button) drawn in the corner
 * circle, so that once the copy sits on it (placeOn) it shows at its real
 * size: its look fills the circle, its content is shrunk back by the scale.
 */
function faceInCircle(copy: Copy, face: Face, scale: number): HTMLSpanElement[] {
  const size = copy.pill.rect.height
  const left = px(rollDistance(copy.pill))
  const look = span({ position: 'absolute', left, top: '0', width: px(size), height: px(size), borderRadius: '9999px', background: face.background })
  const holder = span({ position: 'absolute', left, top: '0', width: px(size), height: px(size), display: 'flex', alignItems: 'center', justifyContent: 'center' })
  holder.append(contentOf(face, { position: 'relative', flexShrink: '0', transform: `scale(${1 / scale})` }))
  copy.root.append(look, holder)
  return [look, holder]
}

/** One face fades out over the first half of the glide; the other fades in over the second. */
function crossfade(out: Element[], into: Element[]) {
  for (const layer of out) layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: GLIDE_MS * 0.5, easing: 'ease-out', fill: 'forwards' })
  for (const layer of into) layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: GLIDE_MS * 0.6, delay: GLIDE_MS * 0.3, easing: 'ease-in', fill: 'both' })
}

/** The panel's first parts (marked `data-jules-stagger` on their parent) rise in one after another. */
function stagger(panel: HTMLElement) {
  const items = [...panel.querySelectorAll('[data-jules-stagger] > *')].slice(0, 8)
  items.forEach((item, i) =>
    item.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], {
      duration: 260,
      delay: 60 + i * 30,
      easing: 'cubic-bezier(.2,.8,.2,1)',
      fill: 'backwards',
    }),
  )
}

/** A short rise and fade: for reduced motion (at once), and when there's nothing to open from. */
function fadeIn(panel: HTMLElement) {
  panel.animate([{ opacity: 0, transform: 'translateY(12px) scale(.98)' }, { opacity: 1, transform: 'none' }], {
    duration: prefersReducedMotion() ? 1 : 220,
    easing: 'cubic-bezier(.2,.8,.2,1)',
  })
}

/**
 * The panel's frosted blur is redrawn every frame while its shape changes,
 * which slow computers can't keep up with; the panel is nearly opaque, so
 * pausing the blur meanwhile looks the same. Returns what brings it back.
 */
function pauseBlur(panel: HTMLElement): () => void {
  panel.style.backdropFilter = 'none'
  panel.style.setProperty('-webkit-backdrop-filter', 'none')
  panel.style.willChange = 'clip-path'
  return () => {
    panel.style.backdropFilter = ''
    panel.style.removeProperty('-webkit-backdrop-filter')
    panel.style.willChange = ''
  }
}

/** The send button on the panel's screen, if it has one (Home and a conversation do). */
export const sendButtonIn = (panel: HTMLElement | null) => panel?.querySelector<HTMLElement>('[data-jules-send]') ?? null

export async function flyOpen(options: {
  /** The pill, measured before the launcher changes to "open". */
  from: Face | null
  /** The panel, laid out but still hidden. */
  panel: HTMLElement
  /** Shows the panel and the launcher's "open" look; called once the copy has arrived. */
  show: () => void
}): Promise<void> {
  const { from, panel } = options
  const target = sendButtonIn(panel)
  if (!from || prefersReducedMotion()) {
    options.show()
    fadeIn(panel)
    return
  }

  // The pill rolls up where it is, then rises to the send button as a circle
  // (or, on a screen without one, the panel opens from the corner circle).
  const copy = copyOf(from, false)
  await roll(copy, true)
  let opensFrom = discOf(from)
  if (target) {
    const button = faceOf(target)
    const { scale, transform } = placeOn(copy, button.rect)
    const arrived = faceInCircle(copy, button, scale)
    crossfade([copy.look, copy.content], arrived)
    await copy.root.animate([{ transform: 'none' }, { transform }], { duration: GLIDE_MS, easing: EASE, fill: 'forwards' }).finished
    opensFrom = button.rect
  }

  // The panel opens out of it. Measured again: a phone's toolbar can change
  // the screen's height while the copy was moving.
  options.show()
  const resumeBlur = pauseBlur(panel)
  const real = target ? (sendButtonIn(panel) ?? target).getBoundingClientRect() : opensFrom
  const point = center(real)
  const box = panel.getBoundingClientRect()
  const at = `${px(point.x - box.left)} ${px(point.y - box.top)}`
  // Only the panel itself shows as it opens: its shadow would reach outside
  // the growing circle, so it waits until the circle has filled the panel.
  const shadow = getComputedStyle(panel).boxShadow
  const reveal = panel.animate(
    [
      { clipPath: `circle(${px(real.width / 2)} at ${at})`, boxShadow: 'none' },
      { clipPath: `circle(${px(coverRadius(box, point.x, point.y))} at ${at})`, boxShadow: 'none' },
    ],
    { duration: REVEAL_MS, easing: 'cubic-bezier(.25,.8,.25,1)' },
  )
  stagger(panel)
  // The real button is now showing, exactly under the copy.
  void copy.root
    .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, fill: 'forwards' })
    .finished.then(() => copy.root.remove())
  await reveal.finished.catch(() => undefined)
  resumeBlur()
  panel.animate([{ boxShadow: 'none' }, { boxShadow: shadow }], { duration: 180, easing: 'ease-out' })
}

export async function flyClose(options: {
  panel: HTMLElement
  /** Hides the panel; called once it has folded away. */
  hide: () => void
  /** The launcher's visible part as it looks now (measured before and after hide). */
  home: () => HTMLElement | null
}): Promise<void> {
  if (prefersReducedMotion()) {
    options.hide()
    return
  }
  const { panel } = options
  const box = panel.getBoundingClientRect()
  const button = sendButtonIn(panel)
  const cornerElement = options.home()
  // What the panel folds into: its send button, or else the corner button.
  const into = button ? faceOf(button) : cornerElement ? faceOf(cornerElement) : null
  const point = into ? center(into.rect) : { x: box.right, y: box.bottom }
  const at = `${px(point.x - box.left)} ${px(point.y - box.top)}`
  const resumeBlur = pauseBlur(panel)
  // The shadow goes first, so only the panel itself folds away.
  const shadow = getComputedStyle(panel).boxShadow
  panel.animate([{ boxShadow: shadow }, { boxShadow: 'none' }], { duration: 100, easing: 'ease-in', fill: 'forwards' })
  await panel.animate(
    [
      { clipPath: `circle(${px(coverRadius(box, point.x, point.y))} at ${at})` },
      { clipPath: `circle(${px((into?.rect.width ?? 0) / 2)} at ${at})` },
    ],
    { duration: FOLD_MS, easing: 'cubic-bezier(.55,0,.2,1)', fill: 'forwards' },
  ).finished

  // The panel goes and the pill is laid out again, still invisible. The copy
  // appears in the same frame, as what the panel folded into, glides home as
  // Jules's round face and rolls back out into the pill.
  options.hide()
  panel.getAnimations().forEach((animation) => animation.cancel())
  resumeBlur()
  const homeElement = options.home()
  if (!into || !homeElement) return
  const copy = copyOf(faceOf(homeElement), true)
  const { scale, transform } = placeOn(copy, into.rect)
  const leaving = faceInCircle(copy, into, scale)
  copy.root.style.transform = transform
  crossfade(leaving, [copy.look, copy.content])
  await copy.root.animate([{ transform }, { transform: 'none' }], { duration: GLIDE_MS, easing: EASE, fill: 'forwards' }).finished
  await roll(copy, false)
  // The real pill shows again in the same frame (JulesWidget), under the copy.
  window.setTimeout(() => copy.root.remove(), 60)
}
