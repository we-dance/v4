import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '../trpc'

export const subscriptionsRouter = router({
  view: publicProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { subscriptionId } = input
      const subscription = await ctx.prisma.subscription.findUnique({
        where: { id: subscriptionId },
        include: {
          offer: {
            include: {
              course: {
                include: {
                  instructor: true,
                },
              },
            },
          },
        },
      })

      if (!subscription) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Subscription not found',
        })
      }

      return subscription
    }),
})
