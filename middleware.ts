import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT, DEFAULT_URL, PUBLIC_ROUTES } from '@/routes'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const isLoggedIn = await getServerSession()

  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (isLoggedIn) {
      const redirect = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
      return Response.redirect(redirect)
    }
    return NextResponse.next()
  }

  if (!isPublicRoute) {
    if (isLoggedIn) {
      const redirect = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
      return NextResponse.redirect(redirect)
    }

    const redirect = new URL(DEFAULT_URL, nextUrl)
    return NextResponse.redirect(redirect)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
