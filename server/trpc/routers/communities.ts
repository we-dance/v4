import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

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
  index: publicProcedure.input(z.void()).query(async ({ ctx }) => {
    const communities = await prisma.danceStyle.findMany({
      orderBy: { membersCount: 'desc' },
    })
    return communities
  }),
  find: publicProcedure
    .input(z.object({ hashtag: z.string(), citySlug: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { hashtag, citySlug } = input

      const community = await prisma.danceStyle.findFirst({
        where: {
          hashtag: {
            equals: hashtag,
            mode: 'insensitive',
          },
        },
        include: {
          _count: {
            select: {
              posts: true,
            },
          },
        },
      })

      let city = null

      const citySelect = {
        id: true,
        name: true,
        slug: true,
        country: true,
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
      }

      if (citySlug) {
        city = await prisma.city.findFirst({
          where: {
            slug: {
              equals: citySlug,
            },
          },
          select: citySelect,
        })
      }

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
        select: citySelect,
      })

      const sortedCities = cities.sort(
        (a, b) => b._count.profiles - a._count.profiles
      )

      const profileId = ctx.session?.profile?.id

      const isMember = await prisma.experience.findFirst({
        where: {
          profileId,
          styleId: community?.id,
        },
      })

      return {
        ...community,
        cities: sortedCities,
        isMember,
        city,
      }
    }),
  join: publicProcedure
    .input(z.object({ communityId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { communityId } = input
      const profileId = ctx.session?.profile?.id

      if (!profileId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }

      await prisma.experience.create({
        data: {
          profileId,
          styleId: communityId,
          level: 'beginner',
          highlighted: false,
        },
      })
    }),
  leave: publicProcedure
    .input(z.object({ communityId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { communityId } = input
      const profileId = ctx.session?.profile?.id

      if (!profileId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }

      await prisma.experience.delete({
        where: {
          profileId_styleId: {
            profileId,
            styleId: communityId,
          },
        },
      })
    }),
})
