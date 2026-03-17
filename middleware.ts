import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Define protected routes
  const isProtectedRoute = pathname.startsWith('/dashboard')
  
  // Define auth routes (where logged in users shouldn't go)
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')

  if (isProtectedRoute && !token) {
    // If trying to access dashboard without token, redirect to login
    const loginUrl = new URL('/login', request.url)
    // Optional: add the current path as a redirect parameter
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && token) {
    // If logged in and trying to access login/register, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
