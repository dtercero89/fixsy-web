import { NextResponse } from 'next/server'
import { auth } from "./auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth?.user
  const isApiRoute = nextUrl.pathname.startsWith('/api')
  const isRootPath = nextUrl.pathname === '/';

  const isPublicRoute = nextUrl.pathname.startsWith('/auth') || isRootPath
  const isCustomer = req.auth?.user?.isCustomer;
  
  const userPermissions = req.auth?.user?.permissions || [];
  const isAdmin = userPermissions.includes('Administrator');


  if (!isLoggedIn && !isPublicRoute && !isApiRoute) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl))
  }

  if (isLoggedIn && isCustomer && isRootPath) {
    return NextResponse.redirect(new URL('/customer', nextUrl))
  }

  if (isLoggedIn && isAdmin && isRootPath) {
    return NextResponse.redirect(new URL('/main', nextUrl))
  }

  if (nextUrl.pathname.startsWith('/main')) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', nextUrl))
    }
  }

  // if (isLoggedIn && isPublicRoute) {
  //   return NextResponse.redirect(new URL('/main', nextUrl))
  // }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|public|CategoriesImages|ProductImages|.*\\.).*)'],
}