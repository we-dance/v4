import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { prisma } from '~/server/prisma'
import { getServerSession } from '#auth'
import { privacySettingsSchema } from '~/schemas/profile'

const profileUpdateSchema = z.object({
  bio: z.string().optional(),
  name: z.string().optional(),
  username: z.string().optional(),
  photo: z.string().optional().nullable(),
  couchsurfing: z.string().optional(),
  linkedin: z.string().optional(),
  airbnb: z.string().optional(),
  blablacar: z.string().optional(),
  spotify: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  vk: z.string().optional(),
  whatsapp: z.string().optional(),
  telegram: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  threads: z.string().optional(),
  website: z.string().optional(),
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
  artistLocations: publicProcedure.query(async () => {
    const artistsWithCities = await prisma.profile.findMany({
      where: {
        type: 'Artist',
        city: {
          isNot: null,
        },
      },
      select: {
        city: {
          select: {
            name: true,
          },
        },
      },
      distinct: ['cityId'],
    })

    const locations = artistsWithCities
      .map((artist) => artist.city?.name)
      .filter(Boolean)
      .sort()

    return locations
  }),
  artistLanguages: publicProcedure.query(async () => {
    const artists = await prisma.profile.findMany({
      where: {
        type: 'Artist',
      },
      select: {
        locales: true,
      },
    })

    const languagesSet = new Set()

    artists.forEach((artist) => {
      if (artist.locales) {
        Object.entries(artist.locales as Record<string, boolean>).forEach(
          ([lang, isActive]) => {
            if (isActive === true) {
              languagesSet.add(lang)
            }
          }
        )
      }
    })

    return Array.from(languagesSet).sort()
  }),
  artists: publicProcedure
    .input(
      z
        .object({
          limit: z.number().default(10),
          page: z.number().default(1),
          role: z.string().optional(),
          location: z.string().optional(),
          language: z.string().optional(),
          query: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const limit = input?.limit || 10
      const page = input?.page || 1
      const skip = (page - 1) * limit

      type WhereConditions = {
        type: string
        roles?: {
          has: string
        }
        name?: {
          contains: string
          mode: 'insensitive'
        }
        city?: {
          name?: string
        }
        locales?: any
      }

      let whereConditions: WhereConditions = { type: 'Artist' }

      if (input?.role && input.role !== 'all') {
        whereConditions.roles = {
          has: input.role,
        }
      }

      if (input?.query) {
        whereConditions.name = {
          contains: input.query,
          mode: 'insensitive',
        }
      }

      if (input?.location && input.location !== 'all') {
        whereConditions.city = {
          name: input.location,
        }
      }

      if (input?.language && input.language !== 'all') {
        whereConditions.locales = {
          path: [input.language],
          equals: true,
        }
      }

      const totalCount = await prisma.profile.count({
        where: whereConditions,
      })

      const artists = await prisma.profile.findMany({
        where: whereConditions,
        include: {
          styles: {
            include: {
              style: true,
            },
          },
          city: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      })

      return {
        artists: artists,
        totalCount,
        hasMore: skip + artists.length < totalCount,
      }
    }),
  organisers: publicProcedure
    .input(
      z.object({
        limit: z.number().default(9),
        page: z.number().default(1),
      })
    )
    .query(async ({ input }) => {
      const { limit, page } = input
      const skip = (page - 1) * limit

      const where = {
        type: 'Organiser',
      }

      const totalCount = await prisma.profile.count({ where })

      const organizers = await prisma.profile.findMany({
        where,
        include: {
          city: true,
          styles: {
            include: {
              style: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      })

      const organizersWithMappedStyles = organizers.map((org) => {
        const mappedStyles = org.styles
          .map((s) => s.style?.name)
          .filter(Boolean) as string[]

        return {
          ...org,
          styles: mappedStyles,
        }
      })

      return {
        organizers: organizersWithMappedStyles,
        totalCount,
        hasMore: skip + organizers.length < totalCount,
      }
    }),
  organiserStyles: publicProcedure
    .input(z.object({ organizerId: z.string() }))
    .query(async ({ input }) => {
      const { organizerId } = input

      const organizer = await prisma.profile.findUnique({
        where: {
          id: organizerId,
          type: 'Organiser',
        },
        include: {
          styles: {
            include: {
              style: true,
            },
          },
        },
      })

      if (!organizer) {
        return []
      }

      const styleNames = organizer.styles.map((s) => s.style.name)

      return styleNames.sort()
    }),
})
