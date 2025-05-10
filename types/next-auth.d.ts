import NextAuth from 'next-auth'
import { User, Profile } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: User
    profile: Profile
    expires: Date
  }
}
