import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { z } from 'zod'

export const citiesRouter = router({
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
})
