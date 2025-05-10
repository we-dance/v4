import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'

export const communitiesRouter = router({
  list: publicProcedure.query(async () => {
    const communities = await prisma.danceStyle.findMany({
      orderBy: {
        membersCount: 'desc',
      },
      select: {
        id: true,
        name: true,
        membersCount: true,
        hashtag: true,
      },
    })

    return communities
  }),
})
