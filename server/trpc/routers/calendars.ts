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
        events: true,
      },
      orderBy: { createdAt: 'asc' },
    })
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session?.profile?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      const calendar = await prisma.calendar.findFirst({
        where: {
          id: input.id,
          profileId: ctx.session.profile.id,
        },
        include: {
          events: true,
        },
        orderBy: { createdAt: 'asc' },
      })
      if (!calendar) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      return calendar
    }),

  create: publicProcedure
    .input(
      z.object({
        url: z
          .string()
          .trim()
          .transform((v) => v.replace(/^webcal:\/\//i, 'https://'))
          .pipe(z.string().url({ message: 'Invalid URL' })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.profile?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      // Check if this calendar already exists for the user
      const existingCalendar = await prisma.calendar.findFirst({
        where: {
          profileId: ctx.session.profile.id,
          url: input.url,
        },
        select: { id: true },
      })
      if (existingCalendar) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This calendar has already been added',
        })
      }

      // If it doesn't exist, create it
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
      // 1. Verify ownership and check the CURRENT state
      const calendar = await prisma.calendar.findFirst({
        where: { id: input.id, profileId: ctx.session?.profile?.id },
        select: { state: true },
      })
      if (!calendar) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      // 2. If it's already processing, do nothing and report back.
      if (calendar.state === 'processing') {
        return { success: true, message: 'Sync already in progress.' }
      }
      // 3. If it's not processing, set it to 'pending' and trigger the job.
      await prisma.calendar.update({
        where: { id: input.id },
        data: { state: 'pending' },
      })
      try {
        await syncSingleCalendar.trigger({ calendarId: input.id })
        return { success: true, message: 'Sync queued successfully.' }
      } catch (error) {
        //If trigger fails, revert the state
        await prisma.calendar.update({
          where: { id: input.id },
          data: { state: 'failed' },
        })
        console.error('Failed to trigger calendar sync job:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to sync calendar. Please try again later.',
        })
      }
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
