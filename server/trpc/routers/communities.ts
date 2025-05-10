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
})
