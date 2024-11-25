import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/main') || nextUrl.pathname.startsWith('/customer');
      const isOnAuthPage = nextUrl.pathname.startsWith('/auth')

      if (isOnDashboard) {
       
        if (isLoggedIn) return true
        //return Response.redirect(new URL('/', nextUrl))
      } else if (isOnAuthPage) {
        if (isLoggedIn && auth?.user.isCustomer ) {
          return Response.redirect(new URL('/customer', nextUrl))
        }else{
          return Response.redirect(new URL('/main', nextUrl))
        } 
      }
      return true
    },
  },
  providers: [], 
}