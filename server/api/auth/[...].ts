import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { FirebaseScrypt } from 'firebase-scrypt'
import { NuxtAuthHandler } from '#auth'
import { registerSchema } from '~/schemas/user'
import { generateUniqueUsername } from '~/schemas/profile'

const prisma = new PrismaClient()

const firebaseParameters = {
  memCost: 14,
  rounds: 8,
  saltSeparator: String(process.env.FIREBASE_SALT_SEPARATOR),
  signerKey: String(process.env.FIREBASE_SIGNER_KEY),
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 3000,
  },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/signin',
  },
  callbacks: {
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
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
        },
        profile,
      })
    },
  },
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
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
        const username = generateUniqueUsername()

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
              username: username,
              name: username,
              type: 'dancer',
              claimed: true,
              user: {
                connect: {
                  id: user.id,
                },
              },
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
