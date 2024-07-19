import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      name?: string | null
      email?: string | null
      image?: string | null
      labId?: number
    }
  }

  interface User {
    labId?: number
    // Add any other custom fields from your User model
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number
    labId?: number
    // Add any other custom fields you want in the JWT
  }
}