import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { FirebaseScrypt } from 'firebase-scrypt'
import { NuxtAuthHandler } from '#auth'
import {
  defaultNotificationsSettings,
  getSlug,
  registerSchema,
} from '~/schemas/user'
import {
  defaultPrivacySettings,
  generateUniqueUsername,
} from '~/schemas/profile'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

const firebaseParameters = {
  memCost: 14,
  rounds: 8,
  saltSeparator: String(process.env.FIREBASE_SALT_SEPARATOR),
  signerKey: String(process.env.FIREBASE_SIGNER_KEY),
}

// @todo upgrade to https://auth.sidebase.io/ 0.10.0
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 3000,
  },
  // @ts-expect-error will figure out later
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    // @ts-expect-error will figure out later
    session: async ({ session }) => {
      const email = session.user.email

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return Promise.resolve({
          user: null,
          profile: null,
        })
      }

      const profile = await prisma.profile.findFirst({
        where: {
          userId: user.id,
        },
      })

      session.user.id = user.id
      return Promise.resolve({
        user,
        profile,
        expires: session.expires,
      })
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          return null
        }

        const scrypt = new FirebaseScrypt(firebaseParameters)

        const isValid = await scrypt.verify(
          credentials.password,
          user.salt,
          user.hash
        )

        if (!isValid) {
          return null
        }

        return user
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      id: 'register',
      name: 'Register',
      credentials: {
        firstName: { label: 'First Name', type: 'text' },
        lastName: { label: 'Last Name', type: 'text' },
        phone: { label: 'Phone', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
        emailConsent: { label: 'Email Consent', type: 'checkbox' },
      },
      async authorize(input: any) {
        const result = registerSchema.safeParse(input)

        if (!result.success) {
          const errorMessages = result.error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ')
          throw new Error(`Validation error: ${errorMessages}`)
        }

        const data = result.data
        const name = data.firstName + ' ' + data.lastName[0] + '.'
        const username = getSlug(
          data.firstName + '.' + data.lastName[0] + '.' + nanoid(5)
        )

        const scrypt = new FirebaseScrypt(firebaseParameters)
        const salt = Buffer.from(String(Math.random()).slice(7)).toString(
          'base64'
        )

        const hash = await scrypt.hash(data.password, salt)

        let user
        try {
          user = await prisma.user.create({
            data: {
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              email: data.email,
              emailConsent: data.emailConsent,
              emailConsentAt: new Date(),
              hash,
              salt,
              notificationSettings: defaultNotificationsSettings,
            },
          })
        } catch (error: any) {
          if (error.code === 'P2002') {
            throw new Error('Email already in use')
          }

          throw error
        }

        try {
          await prisma.profile.create({
            data: {
              username,
              name,
              type: 'dancer',
              claimed: true,
              user: {
                connect: {
                  id: user.id,
                },
              },
              privacySettings: defaultPrivacySettings,
            },
          })
        } catch (error: any) {
          throw error
        }

        return user
      },
    }),
  ],
})
