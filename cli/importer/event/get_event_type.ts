import { getFacebookEvent } from './facebook_import'
import { getSchemaEvent } from './schema_import'
import { isFacebookEvent } from './linguist'
import { getRedirectedUrl } from './url'

export async function getEventType(sourceUrl: string) {
  if (isFacebookEvent(sourceUrl)) {
    const facebookUrl = await getRedirectedUrl(sourceUrl)
    return getFacebookEvent(facebookUrl)
  }
  return getSchemaEvent(sourceUrl)
}
