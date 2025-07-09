import { v2 as cloudinary } from 'cloudinary'

//interface for the required Cloudinary
interface CloudinaryConfig {
  cloud_name: string
  api_key: string
  api_secret: string
}

//uses dependency injection for the config
export async function getUploadedImage(url: string, config: CloudinaryConfig) {
  if (!url) {
    return ''
  }

  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
  })

  const result = await cloudinary.uploader.upload(url)

  return result.secure_url
}
