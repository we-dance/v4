import { IgApiClient, IgCheckpointError } from 'instagram-private-api'
import { extractInstagramUsername } from './index'

export type InstagramProfileData = {
  username: string
  fullName: string
  biography: string
  photoUrl?: string
  externalUrl?: string
  followerCount: number
  isVerified: boolean
}

export async function getInstagramProfile(
  instagramUrl: string
): Promise<InstagramProfileData> {
  const username = extractInstagramUsername(instagramUrl)
  console.log(`Fetching instagram profile for ${username}`)
  const instagram = new IgApiClient()

  instagram.state.generateDevice(process.env.INSTAGRAM_USERNAME!)

  await instagram.account.login(
    process.env.INSTAGRAM_USERNAME!,
    process.env.INSTAGRAM_PASSWORD!
  )
  const userInfo = await instagram.user.usernameinfo(username)
  console.log(`Successfully fetched data for @${username}`)
  return {
    username: userInfo.username,
    fullName: userInfo.full_name || username,
    biography: userInfo.biography || '',
    photoUrl: userInfo.profile_pic_url || '',
    externalUrl: userInfo.external_url || '',
    followerCount: userInfo.follower_count || 0,
    isVerified: userInfo.is_verified || false,
  }
}
