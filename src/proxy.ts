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
    return NextResponse.rewrite(new URL(`${internalPath}${search}`, request.url))
  }

  const localizedPath = getLocalizedPath(detectedLocale, pathnameWithoutLocale)
  return NextResponse.redirect(new URL(`${localizedPath}${search}`, request.url), 308)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
}
