import { z } from 'zod'
import { publicProcedure, router } from '~/server/trpc/init'
import { prisma } from '~/server/prisma'
import Mux from '@mux/mux-node'

export const mediaRouter = router({
  videos: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query } = input

      const videos = await prisma.muxVideo.findMany({
        where: {
          userId: ctx.session?.user.id,
        },
      })

      return videos
    }),
  deleteVideo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      const mux = new Mux({
        tokenId: useRuntimeConfig().muxTokenId,
        tokenSecret: useRuntimeConfig().muxTokenSecret,
      })

      const video = await prisma.muxVideo.update({
        where: { id },
        data: {
          status: 'deleting',
        },
      })

      if (!video.assetId) {
        throw new Error('Video not found')
      }

      await mux.video.assets.delete(video.assetId)
    }),
  updateVideo: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, title } = input

      await prisma.muxVideo.update({ where: { id }, data: { title } })
    }),
})
