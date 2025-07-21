import { v2 as cloudinary } from 'cloudinary'

export async function getUploadedImage(url: string) {
  if (!url) {
    return ''
  }

  // For testing return original URL no cloudinary upload is made.
  if (process.env.TEST_MODE === 'true') {
    return url
  }

  cloudinary.config({
    cloud_name: String(process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
    api_key: String(process.env.NUXT_CLOUDINARY_API_KEY),
    api_secret: String(process.env.NUXT_CLOUDINARY_API_SECRET),
  })

  const result = await cloudinary.uploader.upload(url)

  return result.secure_url
}
