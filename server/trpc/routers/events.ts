import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { nanoid } from 'nanoid'
import { getSlug } from '~/utils/slug'
import { getStripe, createOrUpdateStripeProduct } from '~/server/utils/stripe'
import { tasks } from '@trigger.dev/sdk/v3'

export const eventsRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        city: z.string().optional(),
        community: z.number().optional(),
        startDate: z.string().optional().nullable(),
        type: z.string().optional().nullable(),
        page: z.number().default(0),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input
      const offset = page * limit

      // If startDate is provided, filter from that date onwards, otherwise show future events
      const dateFilter = input.startDate
        ? { gte: new Date(input.startDate) }
        : { gte: new Date() }

      const commonWhere = {
        startDate: dateFilter,
        venue: { cityId: input.city ?? undefined },
        styles: { some: { id: input.community ?? undefined } },
        ...(input.type && input.type !== 'all' && { type: input.type }),
        ...(input.query && {
          OR: [
            { name: { contains: input.query, mode: 'insensitive' as const } },
            {
              description: {
                contains: input.query,
                mode: 'insensitive' as const,
              },
            },
          ],
        }),
      }

      const [events, totalCount] = await Promise.all([
        prisma.event.findMany({
          where: commonWhere,
          include: {
            venue: { include: { city: true } },
            organizer: true,
          },
          orderBy: { startDate: 'asc' },
          skip: offset,
          take: limit,
        }),
        prisma.event.count({
          where: commonWhere,
        }),
      ])

      const hasNextPage = offset + limit < totalCount
      const nextPage = hasNextPage ? page + 1 : null

      return {
        events,
        nextPage,
        totalCount,
        hasNextPage,
      }
    }),

  myList: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const events = await prisma.event.findMany({
        where: {
          AND: [
            {
              OR: [
                { organizerId: ctx.session?.profile?.id },
                { creatorId: ctx.session?.profile?.id },
              ],
            },
            {
              OR: [
                {
                  name: {
                    contains: input.query,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: input.query,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          ],
        },
        take: 10,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          venue: {
            include: {
              city: true,
            },
          },
          organizer: true,
          _count: {
            select: {
              guests: true,
            },
          },
        },
      })

      return { events }
    }),

  byId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
      include: {
        venue: {
          include: {
            city: {
              include: {
                country: true,
              },
            },
          },
        },
        styles: true,
        organizer: true,
        creator: true,
        guests: {
          include: {
            profile: true,
          },
        },
        tickets: true,
        ticketPurchases: ctx.session?.user?.id
          ? {
              where: {
                userId: ctx.session.user.id,
                status: 'completed',
              },
              include: {
                ticket: true,
              },
            }
          : undefined,
      },
    })

    if (!event) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Event not found',
      })
    }

    return event
  }),

  feed: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
      include: {
        venue: {
          include: {
            city: {
              include: {
                country: true,
              },
            },
          },
        },
        styles: true,
        organizer: true,
        creator: true,
        guests: {
          include: {
            profile: true,
          },
        },
        posts: {
          include: {
            author: true,
            style: true,
            city: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    return event
  }),

  guests: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const event = await prisma.event.findUnique({
      where: { id: input },
      include: {
        venue: true,
        styles: true,
        organizer: true,
        creator: true,
        guests: {
          include: {
            profile: {
              include: {
                user: true,
              },
            },
            ticketPurchases: {
              include: {
                ticket: true,
              },
            },
          },
        },
      },
    })

    if (!event) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Event not found',
      })
    }

    return event
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1),
        description: z.string().optional(),
        cover: z.string().optional(),
        status: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        type: z.string().optional(),
        venue: z
          .object({
            id: z.string().optional(),
          })
          .optional()
          .nullable(),
        organizer: z
          .object({
            id: z.string().optional(),
          })
          .optional()
          .nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, venue, organizer, ...data } = input
      const event = await prisma.event.update({
        where: { id },
        data: {
          ...data,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          endDate: data.endDate ? new Date(data.endDate) : undefined,
          venueId: venue?.id,
          organizerId: organizer?.id,
        },
      })
      return event
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input
      const slug = getSlug(name)
      const event = await prisma.event.create({
        data: {
          name,
          slug,
          shortId: nanoid(5),
          creatorId: ctx.session?.profile?.id,
          organizerId: ctx.session?.profile?.id,
          status: 'draft',
        },
      })
      return event
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      const event = await prisma.event.delete({
        where: { id },
      })
      return event
    }),
  rsvp: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
        status: z.enum(['registered', 'interested', 'cancelled']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, status } = input
      const profileId = ctx.session?.profile?.id

      if (!profileId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to RSVP',
        })
      }

      const event = await prisma.guest.upsert({
        where: {
          profileId_eventId: {
            profileId,
            eventId,
          },
        },
        update: {
          status,
        },
        create: {
          eventId,
          profileId,
          status,
          role: 'attendee',
        },
      })

      return event
    }),

  updateTicket: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
        ticketId: z.string().optional().nullable(),
        name: z.string().min(1),
        price: z.number().min(0),
        currency: z.string().min(1),
        items: z.string().default(''),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, ticketId, ...ticketData } = input

      if (ticketId) {
        const ticket = await prisma.ticket.findUnique({
          where: { id: ticketId },
          include: {
            event: {
              include: {
                organizer: {
                  select: {
                    user: {
                      select: {
                        stripeAccountId: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })

        if (!ticket) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Ticket not found',
          })
        }

        const stripeAccountId = ticket.event?.organizer?.user?.stripeAccountId

        if (!stripeAccountId) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Instructor has no Stripe account',
          })
        }

        const stripe = getStripe(stripeAccountId)
        const stripeProduct = await createOrUpdateStripeProduct(
          stripe,
          ticketData
        )
        return await prisma.ticket.update({
          where: { id: ticketId },
          data: {
            ...ticketData,
            stripeProductId: stripeProduct.stripeProductId,
            stripePriceId: stripeProduct.stripePriceId,
          },
        })
      } else {
        const stripe = getStripe(ctx.session?.user.stripeAccountId)
        const stripeProduct = await createOrUpdateStripeProduct(
          stripe,
          ticketData
        )

        return await prisma.ticket.create({
          data: {
            ...ticketData,
            eventId,
            stripeProductId: stripeProduct.stripeProductId,
            stripePriceId: stripeProduct.stripePriceId,
          },
        })
      }
    }),

  deleteTicket: publicProcedure
    .input(z.object({ ticketId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { ticketId } = input

      const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          event: {
            include: {
              organizer: {
                select: {
                  user: {
                    select: {
                      stripeAccountId: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      if (!ticket) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Ticket not found' })
      }

      const stripeAccountId = ticket.event?.organizer?.user?.stripeAccountId

      if (!stripeAccountId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Instructor has no Stripe account',
        })
      }

      const stripe = getStripe(stripeAccountId)

      const ticketPurchases = await prisma.ticketPurchase.findMany({
        where: { ticketId },
      })

      if (ticketPurchases.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Ticket has purchases',
        })
      }

      try {
        if (ticket.stripePriceId) {
          await stripe.prices.update(ticket.stripePriceId, {
            active: false,
          })
        }

        if (ticket.stripeProductId) {
          await stripe.products.update(ticket.stripeProductId, {
            active: false,
          })
        }
      } catch (error) {
        console.error(error)
      }

      await prisma.ticket.delete({
        where: { id: ticketId },
      })

      return { success: true }
    }),

  checkInGuest: publicProcedure
    .input(
      z.object({
        guestId: z.string(),
        checkedIn: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { guestId, checkedIn } = input

      const updateData: any = {
        checkedInAt: checkedIn ? new Date() : null,
      }

      const guest = await prisma.guest.update({
        where: { id: guestId },
        data: updateData,
      })

      return guest
    }),
  import: publicProcedure
    .input(
      z.object({
        sourceUrl: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { sourceUrl } = input

      // a placeholder row until scraping is done
      const event = await prisma.event.create({
        data: {
          status: 'import_event',
          sourceUrl,
          creatorId: ctx.session?.profile?.id,
          shortId: nanoid(5),
        },
      })
      await tasks.trigger('import-event', {
        eventId: event.id,
      })
      return { eventId: event.id }
    }),
})
