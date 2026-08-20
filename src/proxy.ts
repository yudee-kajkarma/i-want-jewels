import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { fallbackLng, languages, cookieName } from './i18n/settings'
import {
  getInternalLocalePath,
  getLocalizedPath,
  isLegacyEnglishPrefix,
  localizedLanguages,
  parseLocalePathname,
} from './i18n/routing'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string {
  if (request.cookies.has(cookieName)) {
    const cookie = request.cookies.get(cookieName)?.value
    if (cookie && languages.includes(cookie)) {
      return cookie
    }
  }

  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languagesList = [...languages]
  const negotiator = new Negotiator({ headers: negotiatorHeaders })
  const requestedLocales = negotiator.languages()

  try {
    return matchLocale(requestedLocales, languagesList, fallbackLng)
  } catch {
    return fallbackLng
  }
}

function hasNonEnglishLocalePrefix(pathname: string): boolean {
  return localizedLanguages.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
}

/**
 * Mark a response as depending on the locale cookie.
 *
 * An unprefixed URL like `/` serves different content per visitor: English is
 * rewritten in place, every other locale is redirected. Without `Vary`, a cache
 * may store the English copy of `/` from a first, cookie-less visit and replay
 * it afterwards — the request never reaches this proxy, so the cookie is never
 * read and the visitor is stuck in English. Sub-paths appeared to work only
 * because they were not in the cache yet.
 *
 * Appended rather than assigned: Next.js adds its own `Vary` entries for RSC
 * navigation, and overwriting them would break client-side routing.
 */
function varyOnLocaleCookie(response: NextResponse): NextResponse {
  response.headers.append('Vary', 'Cookie')
  return response
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const search = request.nextUrl.search

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(.*)$/)
  ) {
    return NextResponse.next()
  }

  // 308 redirect legacy English prefixes (/en, /eng, …) to root URLs.
  if (isLegacyEnglishPrefix(pathname)) {
    const { pathnameWithoutLocale } = parseLocalePathname(pathname)
    const target = getLocalizedPath(fallbackLng, pathnameWithoutLocale)
    return NextResponse.redirect(new URL(`${target}${search}`, request.url), 308)
  }

  // Non-English locale prefix present — serve as-is.
  if (hasNonEnglishLocalePrefix(pathname)) {
    return NextResponse.next()
  }

  // No locale prefix: English stays at root (internal rewrite), others redirect.
  const detectedLocale = getLocale(request)
  const { pathnameWithoutLocale } = parseLocalePathname(pathname)

  if (detectedLocale === fallbackLng) {
    const internalPath = getInternalLocalePath(fallbackLng, pathnameWithoutLocale)
    return varyOnLocaleCookie(
      NextResponse.rewrite(new URL(`${internalPath}${search}`, request.url)),
    )
  }

  // 307, not 308: this redirect is derived from the request (cookie /
  // Accept-Language), so it is per-visitor and must never be cached. A 308 is
  // stored permanently by the browser, which would pin a visitor to whichever
  // locale they were first negotiated into — the language switcher could set
  // the cookie and navigate, but the cached redirect would fire before the
  // request ever reached the server. The legacy-English redirect above is a
  // genuinely permanent URL move and correctly stays 308.
  const localizedPath = getLocalizedPath(detectedLocale, pathnameWithoutLocale)
  return varyOnLocaleCookie(
    NextResponse.redirect(new URL(`${localizedPath}${search}`, request.url), 307),
  )
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
}
