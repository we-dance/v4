import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'

export const subscriptionsRouter = router({
  view: publicProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { subscriptionId } = input
      const subscription = await prisma.subscription.findUnique({
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
  list: publicProcedure.query(async ({ ctx }) => {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      include: {
        offer: {
          include: {
            course: true,
          },
        },
      },
    })

    return subscriptions
  }),
})
