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
  groups: publicProcedure
    .input(
      z.object({
        limit: z.number().default(9),
        page: z.number().default(1),
        query: z.string().optional(),
        city: z.string().optional(),
        community: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, page, query, city, community } = input
      const skip = (page - 1) * limit

      const whereCondition: any = {
        type: 'Organiser',
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

      const groups = await prisma.profile.findMany({
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

      const hasMore = skip + groups.length < totalCount
      const nextPage = hasMore ? page + 1 : null

      return { groups, totalCount, hasMore, nextPage }
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
  venueLocations: publicProcedure.query(async () => {
    const citiesWithCount = await prisma.city.findMany({
      where: {
        profiles: {
          some: {
            type: 'Venue',
          },
        },
      },
      select: {
        id: true,
        name: true,
        country: {
          select: {
            name: true,
            code: true,
          },
        },
        _count: {
          select: {
            profiles: {
              where: {
                type: 'Venue',
              },
            },
          },
        },
      },
      orderBy: {
        profiles: {
          _count: 'desc',
        },
      },
    })

    const cities = citiesWithCount.map((city) => ({
      name: city.name,
      displayName: `${city.name}${city.country ? ` - ${city.country.name}` : ''}`,
      country: city.country ? city.country.name : null,
      countryCode: city.country ? city.country.code : null,
      count: city._count.profiles,
      type: 'city',
    }))

    return {
      cities: cities.sort((a, b) => b.count - a.count),
      regions: [],
    }
  }),
  artists: publicProcedure
    .input(
      z.object({
        limit: z.number().default(9),
        page: z.number().default(1),
        role: z.string().optional(),
        language: z.string().optional(),
        query: z.string().optional(),
        city: z.string().optional(),
        community: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      const limit = input.limit
      const page = input.page
      const skip = (page - 1) * limit

      let whereConditions: any = { type: 'Artist' }

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

      if (input?.city) {
        whereConditions.cityId = input.city
      }

      if (input?.community) {
        whereConditions.styles = {
          some: {
            styleId: input.community,
          },
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

      const hasMore = skip + artists.length < totalCount
      const nextPage = hasMore ? page + 1 : null

      return {
        artists,
        totalCount,
        hasMore,
        nextPage,
      }
    }),
  allVenuesStyles: publicProcedure.query(async () => {
    const styles = await prisma.danceStyle.findMany({
      select: {
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return styles.map((style) => style.name)
  }),
  venues: publicProcedure
    .input(
      z
        .object({
          limit: z.number().default(12),
          page: z.number().default(1),
          search: z.string().optional(),
          location: z.string().optional(),
          styles: z.array(z.string()).optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const limit = input?.limit || 12
      const page = input?.page || 1
      const skip = (page - 1) * limit
      const search = input?.search || ''
      const location = input?.location || ''
      const styles = input?.styles || []

      const whereCondition: any = {
        type: 'Venue',
      }

      if (search) {
        whereCondition.AND = whereCondition.AND || []
        whereCondition.AND.push({
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        })
      }

      if (location) {
        const cityName = location.split(' - ')[0].trim()

        whereCondition.AND = whereCondition.AND || []
        whereCondition.AND.push({
          city: {
            name: {
              equals: cityName,
              mode: 'insensitive',
            },
          },
        })
      }

      let venueIdsWithStyles: string[] = []

      if (styles.length > 0) {
        const eventsWithStyles = await prisma.event.findMany({
          where: {
            styles: {
              some: {
                name: {
                  in: styles,
                },
              },
            },
          },
          select: {
            venueId: true,
            organizerId: true,
          },
        })

        venueIdsWithStyles = Array.from(
          new Set([
            ...eventsWithStyles.map((e) => e.venueId).filter(Boolean),
            ...eventsWithStyles.map((e) => e.organizerId).filter(Boolean),
          ])
        ) as string[]

        if (venueIdsWithStyles.length > 0) {
          whereCondition.id = {
            in: venueIdsWithStyles,
          }
        } else if (styles.length > 0) {
          return {
            venues: [],
            totalCount: 0,
            hasMore: false,
          }
        }
      }

      const totalCount = await prisma.profile.count({
        where: whereCondition,
      })

      const venues = await prisma.profile.findMany({
        where: whereCondition,
        select: {
          id: true,
          name: true,
          username: true,
          bio: true,
          photo: true,
          formattedAddress: true,
          city: {
            select: {
              id: true,
              name: true,
            },
          },
          type: true,
          createdAt: true,
          updatedAt: true,
        },
        skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
      })

      const venueIds = venues.map((venue) => venue.id)

      const eventsForVenues = await prisma.event.findMany({
        where: {
          OR: [
            { venueId: { in: venueIds } },
            { organizerId: { in: venueIds } },
          ],
        },
        select: {
          venueId: true,
          organizerId: true,
          styles: {
            select: {
              name: true,
            },
          },
        },
      })

      const stylesByVenue = new Map<string, Set<string>>()

      eventsForVenues.forEach((event) => {
        const venueId = event.venueId || event.organizerId
        if (!venueId) return

        if (!stylesByVenue.has(venueId)) {
          stylesByVenue.set(venueId, new Set<string>())
        }

        const venueStyles = stylesByVenue.get(venueId)!
        event.styles.forEach((style) => {
          venueStyles.add(style.name)
        })
      })

      const venuesWithStyles = venues.map((venue) => {
        return {
          ...venue,
          danceStyles: Array.from(stylesByVenue.get(venue.id) || []),
        }
      })

      return {
        venues: venuesWithStyles,
        totalCount,
        hasMore: skip + venues.length < totalCount,
      }
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
