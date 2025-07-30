import { string, z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'

export const calendarsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    const profile = await prisma.profile.findUnique({
      where: { userId: ctx.user.id },
    })

    return await prisma.calendar.findMany({
      where: { profileId: profile?.id },
      include: { events: true },
      orderBy: { createdAt: 'asc' },
    })
  }),

  create: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const profile = await prisma.profile.findUnique({
        where: { userId: ctx.user.id },
      })

      return await prisma.profile.create({
        data: {
          url: input.url,
          profileId: profile!.id,
          state: 'pending',
        },
      })
    }),
  sync: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await prisma.calendar.update({
        where: { id: input.id },
        data: { state: 'pending' },
      })
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      return await prisma.calendar.delete({
        where: { id: input.id },
      })
    }),
})
