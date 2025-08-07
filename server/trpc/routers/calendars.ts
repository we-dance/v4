import { string, z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { tasks } from '@trigger.dev/sdk/v3'
import { syncSingleCalendar } from '~/trigger/calendar-sync'

export const calendarsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.profile?.id) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    const profile = await prisma.profile.findUnique({
      where: { userId: ctx.session.profile.id },
    })

    return await prisma.calendar.findMany({
      where: { profileId: ctx.session.profile.id },
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
      await syncSingleCalendar.trigger({ calendarId: input.id })
      return { success: true, message: 'Sync Queued' }
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.profile?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      return await prisma.calendar.delete({
        where: { id: input.id },
      })
    }),
})
