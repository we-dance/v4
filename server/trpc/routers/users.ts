import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '~/server/prisma'
import { userSchema } from '~/schemas/user'

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
})
