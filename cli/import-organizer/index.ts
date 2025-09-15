import { getInstagramProfile } from './instagram'
import { isInstagramUrl, extractInstagramUsername } from './parse'

export { isInstagramUrl, extractInstagramUsername } from './parse'

export async function fetchOrganizer(sourceUrl: string) {
  if (!isInstagramUrl(sourceUrl)) return null

  // Additional validation: ensure we can extract a valid username
  const username = extractInstagramUsername(sourceUrl)
  if (!username) return null

  return getInstagramProfile(sourceUrl)
}
