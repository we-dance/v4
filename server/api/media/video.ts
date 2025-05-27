import { defineEventHandler } from 'h3'
import { Mux } from '@mux/mux-node'
import { prisma } from '~/server/prisma'
import { getServerSession } from '#auth'

const mux = new Mux({
  tokenId: useRuntimeConfig().muxTokenId,
  tokenSecret: useRuntimeConfig().muxTokenSecret,
})

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (!session) {
    return {
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }
  }

  try {
    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policy: ['public'],
      },
      cors_origin: '*',
    })

    const muxVideo = await prisma.muxVideo.create({
      data: {
        userId: session.user.id,
        uploadId: upload.id,
        status: 'waiting',
      },
    })

    return { url: upload.url, id: muxVideo.id }
  } catch (error) {
    console.error('Error creating Mux upload URL:', error)
    return {
      statusCode: 500,
      statusMessage: 'Failed to create upload URL',
    }
  }
})
