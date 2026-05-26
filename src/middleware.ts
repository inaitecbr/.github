import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redireciona /{locale}/studio/* para /studio/* (o Studio não tem i18n)
  const studioMatch = pathname.match(/^\/(pt|en|es)(\/studio(?:\/.*)?)$/)
  if (studioMatch) {
    return NextResponse.redirect(new URL(studioMatch[2], request.url))
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)'],
}
