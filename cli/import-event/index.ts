import axios from 'axios'
import { getFacebookEvent } from './facebook_import'
import { getSchemaEvent } from './schema_import'
import { isFacebookEvent } from '../utils/linguist'

async function getRedirectedUrl(url: string): Promise<string> {
  try {
    const response = await axios.get(url)
    return response.request.res.responseUrl || url
  } catch (error) {
    return url
  }
}

export async function fetchEvent(sourceUrl: string) {
  if (isFacebookEvent(sourceUrl)) {
    const facebookUrl = await getRedirectedUrl(sourceUrl)
    return getFacebookEvent(facebookUrl)
  }
  return getSchemaEvent(sourceUrl)
}
