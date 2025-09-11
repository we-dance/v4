import { IgApiClient } from 'instagram-private-api'
import { extractInstagramUsername } from './index'

export type InstagramProfileData = {
  username: string
  fullname: string
  biogrpahy: string
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

  try {
    await instagram.account.login(
      process.env.INSRAGRAM_USERNAME!,
      process.env.INSTAGRAM_PASSWORD!
    )
    console.log('Succesfully logged in')
    const userInfo = await instagram.user.usernameinfo(username)
    console.log('Successfully fetched data')

    return {
      username: userInfo.username,
      fullname: userInfo.full_name || username,
      biogrpahy: userInfo.biography || '',
      photoUrl: userInfo.hd_profile_pic_url_info?.url || '',
      externalUrl: userInfo.external_url || '',
      followerCount: userInfo.follower_count || 0,
      isVerified: userInfo.is_verified || false,
    }
  } catch (error) {
    console.log('Failed to fetch Instagram profile')
    throw new Error('Failed to fetch instagram profile')
  }
}
