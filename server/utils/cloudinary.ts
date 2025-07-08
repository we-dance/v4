import { v2 as cloudinary } from 'cloudinary'

export async function getUploadedImage(url: string) {
  if (!url) {
    return ''
  }

  const config = useRuntimeConfig()

  cloudinary.config({
    cloud_name: config.public.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  })

  const result = await cloudinary.uploader.upload(url)

  return result.secure_url
}
