import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { z } from 'zod'
import { addCity } from '~/server/utils/city'

export const citiesRouter = router({
  popular: publicProcedure.query(async ({ ctx }) => {
    const cities = await prisma.city.findMany({
      include: {
        profiles: {
          where: {
            photo: {
              startsWith: 'https://',
            },
            userId: {
              not: null,
            },
          },
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        membersCount: 'desc',
      },
      take: 3,
    })
    return cities
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

      return await addCity(city)
    }),
})
