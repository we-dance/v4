import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const offersRouter = router({
  view: publicProcedure
    .input(z.object({ offerId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { offerId } = input
      const offer = await ctx.prisma.offer.findUnique({
        where: { id: offerId },
        include: {
          course: {
            include: {
              instructor: true,
            },
          },
        },
      })

      if (!offer) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Offer not found' })
      }

      return offer
    }),
})
