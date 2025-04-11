import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { userSchema } from '~/schemas/user'
import { FirebaseScrypt } from 'firebase-scrypt'
import { getServerSession } from '#auth'
import { notificationSettingsSchema } from '~/schemas/user'

const firebaseParameters = {
  memCost: 14,
  rounds: 8,
  saltSeparator: String(process.env.FIREBASE_SALT_SEPARATOR),
  signerKey: String(process.env.FIREBASE_SIGNER_KEY),
}

export const usersRouter = router({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: userSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input

      return await prisma.user.update({
        where: {
          id,
        },
        data,
      })
    }),

  updateNotificationSettings: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: notificationSettingsSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input

      console.log('trpc.users.updateNotificationSettings', data)

      return await prisma.user.update({
        where: {
          id,
        },
        data: {
          notificationSettings: data,
        },
      })
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = input

      return await prisma.user.delete({
        where: {
          id,
        },
      })
    }),

  updatePassword: publicProcedure
    .input(
      z.object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
          .string()
          .min(8, 'Password must be at least 8 characters'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = await getServerSession(ctx.event)

      if (!session) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to update your password',
        })
      }

      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          id: true,
          hash: true,
          salt: true,
        },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      const scrypt = new FirebaseScrypt(firebaseParameters)
      const isValid = await scrypt.verify(
        input.currentPassword,
        user.salt,
        user.hash
      )

      if (!isValid) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Current password is incorrect',
        })
      }

      const salt = Buffer.from(String(Math.random()).slice(7)).toString(
        'base64'
      )
      const hash = await scrypt.hash(input.newPassword, salt)

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          hash,
          salt,
        },
      })

      return { success: true }
    }),

  connectStripe: publicProcedure.mutation(async ({ ctx }) => {
    const session = await getServerSession(ctx.event)

    if (!session) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to connect your Stripe account',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    const stripe = getStripe()

    const account = await stripe.accounts.create({
      type: 'express',
      country: 'DE',
      email: user.email,
    })

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        stripeAccountId: account.id,
      },
    })

    const appUrl = useRuntimeConfig().public.appUrl

    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${appUrl}/admin/integrations`,
      return_url: `${appUrl}/admin/integrations`,
      type: 'account_onboarding',
    })

    return { url: accountLink.url }
  }),
})
