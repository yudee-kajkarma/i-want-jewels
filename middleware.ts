import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CANONICAL_HOST = 'iwantjewels.com'

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('host') || request.nextUrl.host
  const hostname = hostHeader.split(':')[0].toLowerCase()

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return NextResponse.next()
  }

  if (hostname !== CANONICAL_HOST) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.hostname = CANONICAL_HOST
    return NextResponse.redirect(redirectUrl, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
