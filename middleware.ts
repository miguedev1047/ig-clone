import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function middleware(request: NextRequest) {
  const PUBLIC_ROUTES = ['/']
  const DEFAULT_LOGIN_REDIRECT = '/feed'
  const DEFAULT_URL = '/'

  const { nextUrl } = request
  const sessionCookie = getSessionCookie(request)

  const isLoggedIn = !!sessionCookie
  const pathname = nextUrl.pathname

  const isOnPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
  const isOnAuthRoute = pathname.startsWith('/account')
  const isProtectedRoute = !isOnPublicRoute && !isOnAuthRoute

  if (isOnPublicRoute && isLoggedIn && pathname !== DEFAULT_LOGIN_REDIRECT) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
  }

  if (isOnAuthRoute && isLoggedIn && pathname !== DEFAULT_LOGIN_REDIRECT) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
  }

  if (isProtectedRoute && !isLoggedIn && pathname !== DEFAULT_URL) {
    return NextResponse.redirect(new URL(DEFAULT_URL, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
