import { getInstagramProfile } from './instagram'

export async function fetchOrganizer(sourceUrl: string) {
  if (!isInstagramUrl(sourceUrl)) return null
  return getInstagramProfile(sourceUrl)
}

function isInstagramUrl(url: string): boolean {
  return url.includes('instagram.com/')
}

export function extractInstagramUsername(url: string): string {
  const s = url.replace(/https?:\/\/(www\.)?instagram\.com\//i, '')
  return s
    .split('?')[0]
    .split('#')[0]
    .replace(/\/$/, '')
    .split('/')[0]
    .replace(/^@/, '')
}
