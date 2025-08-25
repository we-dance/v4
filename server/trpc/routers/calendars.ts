import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { syncSingleCalendar } from '~/trigger/calendar-sync'

export const calendarsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.profile?.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return await prisma.calendar.findMany({
      where: { profileId: ctx.session.profile.id },
      include: {
        events: {
          include: {
            styles: true,
          },
        },
      },
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
      if (!ctx.session?.profile?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      return await prisma.calendar.create({
        data: {
          url: input.url,
          profileId: ctx.session.profile.id,
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
      const calendar = await prisma.calendar.findUnique({
        where: { id: input.id },
        select: { profileId: true },
      })
      if (!calendar || calendar.profileId !== ctx.session?.profile?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      await prisma.calendar.update({
        where: { id: input.id },
        data: { state: 'pending' },
      })

      await syncSingleCalendar.trigger({ calendarId: input.id })
      return { success: true, message: 'Sync Pending' }
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const calendar = await prisma.calendar.findUnique({
        where: { id: input.id },
        select: { profileId: true },
      })
      if (!calendar || calendar.profileId !== ctx.session?.profile?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      return await prisma.calendar.delete({
        where: { id: input.id },
      })
    }),
})
