import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { Mux } from '@mux/mux-node'

const mux = new Mux({
  tokenId: useRuntimeConfig().muxTokenId,
  tokenSecret: useRuntimeConfig().muxTokenSecret,
})

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)

    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No form data provided',
      })
    }

    const fileField = formData.find((f) => f.name === 'file')
    if (!fileField || !fileField.data) {
      throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
    }

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        playback_policy: ['public'],
      },
      cors_origin: '*',
    })

    return {
      success: true,
      videoId: upload.id,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Upload failed',
    }
  }
})
