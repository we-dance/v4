import { prisma } from '~/server/prisma'
import { readBody, getHeaders, readRawBody } from 'h3'
import Mux from '@mux/mux-node'

export default eventHandler(async (event) => {
  const rawBodyBuffer = await readRawBody(event)
  if (!rawBodyBuffer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing request body',
    })
  }
  const rawBody = rawBodyBuffer.toString()

  const body = await readBody(event)
  const headers = getHeaders(event)
  const secret = useRuntimeConfig().muxWebhookSecret

  const mux = new Mux({
    tokenId: useRuntimeConfig().muxTokenId,
    tokenSecret: useRuntimeConfig().muxTokenSecret,
  })
  mux.webhooks.verifySignature(rawBody, headers, secret)

  if (body.type === 'video.asset.created') {
    await prisma.muxVideo.updateMany({
      where: {
        uploadId: body.data.upload_id,
      },
      data: {
        status: body.data.status,
        playbackId: body.data.playback_ids[0].id,
        assetId: body.data.id,
      },
    })
  }

  if (body.type === 'video.asset.ready') {
    await prisma.muxVideo.updateMany({
      where: {
        uploadId: body.data.upload_id,
      },
      data: {
        status: body.data.status,
        playbackId: body.data.playback_ids[0].id,
        duration: body.data.duration,
        aspectRatio: body.data.aspect_ratio,
      },
    })
  }

  if (body.type === 'video.asset.deleted') {
    await prisma.muxVideo.deleteMany({
      where: {
        assetId: body.data.id,
      },
    })
  }

  return { received: true }
})
