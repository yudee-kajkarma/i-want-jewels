import { formatDate, toDateLocale } from '../../utils/formatDate'

/**
 * Times in Jules, in the visitor's language: "5 minutes ago", "Today",
 * "Tuesday 6 October", "14:05". `now` comes from useNow(), never read during
 * render, so a screen re-renders only once a minute.
 */

const DAY = 24 * 60 * 60 * 1000

const time = (iso: string) => new Date(iso).getTime()

function startOfDay(at: number): number {
  const day = new Date(at)
  day.setHours(0, 0, 0, 0)
  return day.getTime()
}

/** Calendar days between the date and now: 0 today, 1 yesterday. */
export function daysAgo(iso: string, now: number): number {
  return Math.round((startOfDay(now) - startOfDay(time(iso))) / DAY)
}

/** "14:05" (or "2:05 pm", as the language writes it). */
export function clockTime(iso: string, language: string): string {
  return formatDate(iso, language, { hour: '2-digit', minute: '2-digit' })
}

/** "Tuesday 6 October", with the year when it isn't this year. */
export function longDay(iso: string, language: string, now: number): string {
  const sameYear = new Date(iso).getFullYear() === new Date(now).getFullYear()
  return formatDate(
    iso,
    language,
    sameYear ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: 'numeric', month: 'long', year: 'numeric' },
  )
}

/** "now", "5 minutes ago", "yesterday", "3 days ago", then the date. */
export function timeAgo(iso: string, language: string, now: number): string {
  const at = time(iso)
  if (Number.isNaN(at)) return ''
  // A time slightly ahead of ours (another device's clock) reads as "now".
  const seconds = Math.min(0, Math.round((at - now) / 1000))
  const words = new Intl.RelativeTimeFormat(toDateLocale(language), { numeric: 'auto', style: 'short' })
  if (seconds > -60) return words.format(0, 'second')
  if (seconds > -3600) return words.format(Math.round(seconds / 60), 'minute')
  if (seconds > -DAY / 1000) return words.format(Math.round(seconds / 3600), 'hour')
  const days = daysAgo(iso, now)
  if (days < 7) return words.format(-days, 'day')
  return formatDate(iso, language, { day: 'numeric', month: 'short' })
}

/**
 * The short form under a message, as chat apps write it: "now", "2m", "3h",
 * "2d", then the date ("6 Oct"). Units come from Intl, so each language gets
 * its own abbreviations ("2 Min.", "3 Std." in German).
 */
export function shortAgo(iso: string, language: string, now: number): string {
  const at = time(iso)
  if (Number.isNaN(at)) return ''
  const locale = toDateLocale(language)
  const seconds = Math.max(0, Math.round((now - at) / 1000))
  const unit = (count: number, name: 'minute' | 'hour' | 'day') =>
    new Intl.NumberFormat(locale, { style: 'unit', unit: name, unitDisplay: 'narrow' }).format(count)
  if (seconds < 60) return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(0, 'second')
  if (seconds < 3600) return unit(Math.floor(seconds / 60), 'minute')
  if (seconds < DAY / 1000) return unit(Math.floor(seconds / 3600), 'hour')
  const days = daysAgo(iso, now)
  if (days < 7) return unit(Math.max(1, days), 'day')
  return formatDate(iso, language, { day: 'numeric', month: 'short' })
}

/** True when the chat began longer ago than `limitMs`. */
export function olderThan(iso: string, now: number, limitMs: number): boolean {
  const at = time(iso)
  return !Number.isNaN(at) && now - at > limitMs
}
