import { getInstagramProfile } from './instagram'
import { isInstagramUrl } from './parse'

export async function fetchOrganizer(sourceUrl: string) {
  if (!isInstagramUrl(sourceUrl)) return null
  return getInstagramProfile(sourceUrl)
}
