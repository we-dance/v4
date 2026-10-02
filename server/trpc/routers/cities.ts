import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { z } from 'zod'
import { findOrCreateCity } from '~/server/utils/city'

export const citiesRouter = router({
  popular: publicProcedure.query(async ({ ctx }) => {
    // First, get the top cities by member count
    const cities = await prisma.city.findMany({
      orderBy: {
        membersCount: 'desc',
      },
      take: 3,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        membersCount: true,
      },
    })

    // Then, for each city, get one representative profile photo
    const citiesWithProfiles = await Promise.all(
      cities.map(async (city) => {
        const profile = await prisma.profile.findFirst({
          where: {
            cityId: city.id,
            photo: {
              startsWith: 'https://',
            },
            userId: {
              not: null,
            },
          },
          select: {
            photo: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        })

        return {
          ...city,
          profiles: profile ? [profile] : [],
        }
      })
    )

    return citiesWithProfiles
  }),
  bySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const city = await prisma.city.findUnique({
      where: { slug: input },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    })

    const communities = await prisma.danceStyle.findMany({
      where: {
        experiences: {
          some: {
            profile: {
              cityId: city?.id,
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            experiences: true,
          },
        },
      },
    })

    const sortedCommunities = communities
      .map((community) => ({
        ...community,
        membersCount: community._count.experiences,
      }))
      .sort((a, b) => b.membersCount - a.membersCount)

    return {
      ...city,
      communities: sortedCommunities,
    }
  }),
  create: publicProcedure
    .input(
      z.object({
        city: z.object({
          id: z.string(),
          name: z.string(),
          googleMapsPlace: z.any(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { city } = input

      return await findOrCreateCity(city.id)
    }),
})
