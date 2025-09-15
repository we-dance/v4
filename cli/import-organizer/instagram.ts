import { IgApiClient, IgCheckpointError } from 'instagram-private-api'
import { extractInstagramUsername } from './parse'

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

  const IG_USER = process.env.INSTAGRAM_USERNAME
  const IG_PASS = process.env.INSTAGRAM_PASSWORD
  if (!IG_USER || !IG_PASS) {
    throw new Error('INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD must be set')
  }

  instagram.state.generateDevice(IG_USER)
  await instagram.account.login(IG_USER, IG_PASS)
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
