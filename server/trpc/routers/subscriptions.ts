import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { getStripe } from '~/server/utils/stripe'

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
  cancel: publicProcedure
    .input(z.object({ subscriptionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { subscriptionId } = input

      const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
        include: {
          offer: {
            include: {
              course: {
                include: {
                  instructor: {
                    include: {
                      user: true,
                    },
                  },
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

      if (subscription.status === 'canceled') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Subscription is already canceled',
        })
      }

      let endAt: Date | undefined

      if (subscription.stripeSubscriptionId) {
        const stripeAccount =
          subscription.offer.course.instructor?.user?.stripeAccountId

        if (!stripeAccount) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Instructor has no Stripe account',
          })
        }

        const stripe = getStripe()

        const stripeSubscription = await stripe.subscriptions.cancel(
          subscription.stripeSubscriptionId,
          {
            stripeAccount,
          }
        )

        endAt = stripeSubscription.ended_at
          ? new Date(stripeSubscription.ended_at * 1000)
          : undefined
      }

      await prisma.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: 'canceled',
          canceledAt: new Date(),
          endAt,
          nextBillingDate: null,
        },
      })

      return {
        success: true,
      }
    }),
})
