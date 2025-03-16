import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '~/server/prisma'
import { userSchema } from '~/schemas/user'
import { FirebaseScrypt } from 'firebase-scrypt'
import { getServerSession } from '#auth'
import { notificationSettingsSchema } from '~/schemas/user'
// Firebase parameters for password hashing
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
        throw new Error('You must be logged in to update your password')
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
        throw new Error('User not found')
      }

      // Verify the current password
      const scrypt = new FirebaseScrypt(firebaseParameters)
      const isValid = await scrypt.verify(
        input.currentPassword,
        user.salt,
        user.hash
      )

      if (!isValid) {
        throw new Error('Current password is incorrect')
      }

      // Generate a new salt and hash the new password
      const salt = Buffer.from(String(Math.random()).slice(7)).toString(
        'base64'
      )
      const hash = await scrypt.hash(input.newPassword, salt)

      // Update the user's password in the database
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
})
