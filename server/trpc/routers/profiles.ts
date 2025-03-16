import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '~/server/prisma'
import { getServerSession } from '#auth'
import { privacySettingsSchema } from '~/schemas/profile'

// todo: move to profile schema
const profileUpdateSchema = z.object({
  bio: z.string().optional(),
  name: z.string().optional(),
  username: z.string().optional(),
  photo: z.string().optional().nullable(),
  // Add other fields as needed
})

export const profilesRouter = router({
  search: publicProcedure
    .input(z.object({ query: z.string().optional() }))
    .query(async ({ input }) => {
      const { query } = input

      return await prisma.profile.findMany({
        where: {
          OR: [
            {
              username: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              bio: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          followersCount: 'desc',
        },
        take: 5,
      })
    }),
  isUsernameAvailable: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input, ctx }) => {
      const { username } = input

      const session = await getServerSession(ctx.event)

      const profile = await prisma.profile.findFirst({
        where: {
          username: {
            equals: username,
            mode: 'insensitive',
          },
          id: {
            not: session?.profile?.id,
          },
        },
      })

      return !profile
    }),
  get: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input

      const profile = await prisma.profile.findFirst({
        where: {
          username: {
            equals: username,
            mode: 'insensitive',
          },
        },
      })

      if (!profile) {
        return null
      }

      const eventsAttended = await prisma.event.findMany({
        where: {
          guests: {
            some: {
              profileId: profile.id,
            },
          },
        },
        select: {
          id: true,
          guests: {
            select: {
              role: true,
              profileId: true,
            },
          },
        },
      })

      const events = await prisma.event.findMany({
        where: {
          OR: [
            { organizerId: profile?.id },
            { venueId: profile?.id },
            { id: { in: eventsAttended.map((event) => event.id) } },
          ],
        },
        include: {
          venue: {
            include: {
              city: true,
            },
          },
          organizer: true,
          styles: true,
        },
        orderBy: {
          startDate: 'desc',
        },
        take: 10,
      })

      const enrichedEvents = events.map((event) => {
        const isHosted = event.organizerId === profile.id
        const isVenue = event.venueId === profile.id
        const guestInfo = eventsAttended
          .find((event) => event.id === event.id)
          ?.guests.find((guest) => guest.profileId === profile.id)

        let role = null
        if (isHosted) {
          role = 'host'
        } else if (isVenue) {
          role = 'venue'
        } else if (guestInfo) {
          role = guestInfo.role
        }

        return {
          ...event,
          role,
        }
      })

      return {
        profile,
        events: enrichedEvents,
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: profileUpdateSchema,
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input
      return await prisma.profile.update({ where: { id }, data })
    }),
  updatePrivacySettings: publicProcedure
    .input(z.object({ id: z.string(), data: privacySettingsSchema }))
    .mutation(async ({ input }) => {
      const { id, data } = input
      console.log('trpc.profiles.updatePrivacySettings', data)
      return await prisma.profile.update({
        where: { id },
        data: {
          privacySettings: data,
        },
      })
    }),
  list: publicProcedure
    .input(
      z.object({ city: z.string().optional(), country: z.string().optional() })
    )
    .query(async ({ input }) => {
      const { city, country } = input

      const cityProfile = await prisma.city.findFirst({
        where: {
          slug: city,
          countryCode: country,
        },
      })

      const venues = await prisma.profile.findMany({
        where: {
          // id: {
          //   equals: "ChIJW8LuYO51nkcRZqoW2f9yn8c",
          // },
          // city: {
          //   slug: city,
          // },
        },
        include: {
          eventsHosted: {
            take: 1,
            include: {
              venue: true,
              organizer: true,
              styles: true,
            },
            where: {
              startDate: {
                gte: new Date(),
              },
            },
            orderBy: [
              {
                startDate: 'asc',
              },
            ],
          },
        },
        orderBy: {
          eventsHosted: {
            _count: 'desc',
          },
        },
        take: 5,
      })

      return {
        cityProfile,
        venues,
      }
    }),
  hosts: publicProcedure.query(async ({ input }) => {
    return await prisma.profile.findMany({
      where: {
        type: 'Organiser',
      },
      include: {
        city: {
          include: {
            country: true,
          },
        },
      },
      orderBy: {
        followersCount: 'desc',
      },
      take: 5,
    })
  }),
})
