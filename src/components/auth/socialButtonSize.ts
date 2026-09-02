/**
 * Shared sizing for the Google and Facebook buttons.
 *
 * Google renders its button inside an iframe at a fixed 40px height and only
 * accepts a pixel width, capped at 400. To match the form's 56px primary
 * action it is scaled up, which also multiplies its width — so both buttons
 * must derive their final width from the same formula, or they end up
 * visibly different.
 */
export const TARGET_HEIGHT = 56
const GOOGLE_HEIGHT = 40
export const SCALE = TARGET_HEIGHT / GOOGLE_HEIGHT

/** Width to ask Google for, before scaling. Google clamps to 400. */
export function googleRequestWidth(containerWidth: number): number {
  return Math.min(Math.max(Math.round(containerWidth / SCALE), 200), 400)
}

/** The width both buttons actually end up occupying on screen. */
export function renderedWidth(containerWidth: number): number {
  return Math.round(googleRequestWidth(containerWidth) * SCALE)
}

/**
 * Google's button text is drawn at 14px inside its iframe and then scaled with
 * the rest of the button, so Facebook must use the scaled size to look like a
 * pair rather than two different typefaces.
 */
export const SOCIAL_FONT_SIZE = Math.round(14 * SCALE)
export const SOCIAL_ICON_SIZE = Math.round(18 * SCALE)
