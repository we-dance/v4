import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: useRuntimeConfig().public.cloudinaryCloudName,
  api_key: useRuntimeConfig().cloudinaryApiKey,
  api_secret: useRuntimeConfig().cloudinaryApiSecret,
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

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
        if (error) reject(error)
        else resolve(result)
      })

      stream.end(fileField.data)
    })

    return {
      success: true,
      url: uploadResult.secure_url,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Upload failed',
    }
  }
})
