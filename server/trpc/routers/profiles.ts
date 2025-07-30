import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { getServerSession } from '#auth'
import { privacySettingsSchema } from '~/schemas/profile'

const profileUpdateSchema = z.object({
  bio: z.string().optional(),
  name: z.string().optional(),
  username: z.string().optional(),
  photo: z.string().optional().nullable(),
  couchsurfing: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  airbnb: z.string().optional().nullable(),
  blablacar: z.string().optional().nullable(),
  spotify: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  facebook: z.string().optional().nullable(),
  vk: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  telegram: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  tiktok: z.string().optional().nullable(),
  youtube: z.string().optional().nullable(),
  threads: z.string().optional().nullable(),
  website: z.string().optional().nullable(),
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
        where: {},
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
  grid: publicProcedure
    .input(
      z.object({
        limit: z.number().default(9),
        page: z.number().default(1),
        query: z.string().optional(),
        city: z.string().optional(),
        community: z.number().optional(),
        type: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, page, query, city, community, type } = input
      const skip = (page - 1) * limit

      const whereCondition: any = {
        type,
      }

      if (query) {
        whereCondition.name = {
          contains: query,
          mode: 'insensitive',
        }
      }

      if (city) {
        whereCondition.cityId = city
      }

      if (community) {
        whereCondition.styles = {
          some: {
            styleId: community,
          },
        }
      }

      const profiles = await prisma.profile.findMany({
        where: whereCondition,
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
        take: limit,
        skip,
      })

      const totalCount = await prisma.profile.count({
        where: whereCondition,
      })

      const hasMore = skip + profiles.length < totalCount
      const nextPage = hasMore ? page + 1 : null

      return { profiles, totalCount, hasMore, nextPage }
    }),
  findVenueOrCreate: publicProcedure
    .input(z.object({ placeId: z.string(), googleMapsPlace: z.any() }))
    .mutation(async ({ input }) => {
      const { placeId, googleMapsPlace } = input

      const existingVenue = await prisma.profile.findFirst({
        where: {
          placeId,
        },
      })

      if (existingVenue) {
        return existingVenue
      }

      throw new Error('Venue not found')
    }),
})
