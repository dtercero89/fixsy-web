import type { DefaultSession, DefaultUser } from "next-auth"
import type { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      userCode: string
      userId: string,
      address?: string;
      phoneNumber?:string;
      address?: string;
      permissions?: string[];
      userName?:string;
      userId?:number;
      userCode?:string;
      creationDate:string;
      isCustomer:boolean;
      customerId:number;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    userCode: string
    userId: string
    userCode: string
    userId: string
    userName: string
    phoneNumber: string
    permissions: string[]
    creationDate: string
    isCustomer:boolean
    customerId:number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userCode: string
    userId: string
    id: string
    userId: string
    userCode: string
    userName: string
    phoneNumber: string
    permissions: string[]
    creationDate: string
    customerId:number
    isCustomer:boolean
  }
}