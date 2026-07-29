import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { fallbackLng, languages, cookieName } from './i18n/settings'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string {
  // Check cookie first
  if (request.cookies.has(cookieName)) {
    const cookie = request.cookies.get(cookieName)?.value
    if (cookie && languages.includes(cookie)) {
      return cookie
    }
  }

  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  const languagesList = [...languages]
  const negotiator = new Negotiator({ headers: negotiatorHeaders })
  const requestedLocales = negotiator.languages()

  try {
    return matchLocale(requestedLocales, languagesList, fallbackLng)
  } catch (e) {
    return fallbackLng
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Exclude static files, public folder, api routes, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(.*)$/) // Excludes all files with an extension (e.g., .svg, .png, .ico, etc.)
  ) {
    return NextResponse.next()
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${request.nextUrl.search}`, request.url),
      308
    )
  }

  // Add the locale to the response header so we can access it if needed
  const response = NextResponse.next()
  return response
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
}
