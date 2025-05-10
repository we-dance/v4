import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { z } from 'zod'

export const communitiesRouter = router({
  list: publicProcedure.input(z.void()).query(async ({ ctx }) => {
    const profileId = ctx.session?.profile?.id

    const userExperiences = await prisma.experience.findMany({
      where: { profileId },
      select: { styleId: true },
    })
    const userStyleIds = new Set(userExperiences.map((e) => e.styleId))

    const communities = await prisma.danceStyle.findMany({
      orderBy: { membersCount: 'desc' },
      select: {
        id: true,
        name: true,
        membersCount: true,
        hashtag: true,
      },
    })

    return communities.map((c) => ({
      ...c,
      isMember: userStyleIds.has(c.id),
    }))
  }),
  byHashtag: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const community = await prisma.danceStyle.findUnique({
      where: { hashtag: input },
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    })

    const cities = await prisma.city.findMany({
      where: {
        profiles: {
          some: {
            styles: {
              some: {
                styleId: community?.id,
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            profiles: {
              where: {
                styles: {
                  some: {
                    styleId: community?.id,
                  },
                },
              },
            },
          },
        },
      },
    })

    const sortedCities = cities.sort(
      (a, b) => b._count.profiles - a._count.profiles
    )

    return {
      ...community,
      cities: sortedCities,
    }
  }),
})
