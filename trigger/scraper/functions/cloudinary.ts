import { v2 as cloudinary } from 'cloudinary'

export async function getUploadedImage(url: string) {
  if (!url) {
    return ''
  }

  cloudinary.config({
    cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
    api_key: String(process.env.CLOUDINARY_API_KEY),
    api_secret: String(process.env.CLOUDINARY_API_SECRET),
  })

  const result = await cloudinary.uploader.upload(url)

  return result.secure_url
}
