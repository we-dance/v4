import NextAuth from 'next-auth'
import { User, Profile, City } from '@prisma/client'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User
    profile: Profile & {
      city: City
    }
    expires: Date
  }
}
