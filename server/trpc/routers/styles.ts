import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'

export const stylesRouter = router({
  list: publicProcedure.query(async () => {
    const styles = await prisma.danceStyle.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return styles
  }),
})
