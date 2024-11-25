import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { fetchServer } from "@/lib/fetchHelper/fetchServer"
import { authConfig } from "./auth.config"

export const config = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.userId || !credentials?.password) {
          return null
        }
        
        try {
          const request = {
            email: credentials.userId,
            password: credentials.password
          }
          const user = await fetchServer.httpPost('/Users/log-in', request)
          
          if (user && !user.validationErrorMessage) {
            return {
              id: user.userId,
              userId: user.userId,
              userCode: user.userCode,
              userName: user.userName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              permissions: user.permissions,
              creationDate: user.creationDate || new Date().toISOString(),
              isCustomer: user.isCustomer,
              customerId: user.customerId
            }
          } else {
            return null
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ? String(user.id) : '0'
        token.userId = user.userId
        token.userCode = user.userCode
        token.userName = user.userName
        token.phoneNumber = user.phoneNumber
        token.permissions = user.permissions
        token.creationDate = user.creationDate
        token.isCustomer = user.isCustomer,
        token.customerId = user.customerId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.isCustomer = token.isCustomer
        session.user.userId = token.userId as string
        session.user.userCode = token.userCode as string
        session.user.userName = token.userName as string
        session.user.phoneNumber = token.phoneNumber as string
        session.user.permissions = token.permissions as string[]
        session.user.creationDate = token.creationDate as string
        session.user.customerId = token.customerId as number
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

export { config as authOptions }