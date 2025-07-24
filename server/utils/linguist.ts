import { prisma } from '~/server/prisma'

export function slugify(str: string, limit = 0) {
  let $str = str
  $str = $str.replace(/^\s+|\s+$/g, '')

  // Make the string lowercase
  $str = $str.toLowerCase()

  // Remove accents, swap ñ for n, etc
  const from =
    'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  const to =
    'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa......'
  for (let i = 0, l = from.length; i < l; i++) {
    $str = $str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  // Remove invalid chars
  $str = $str
    .replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by .
    .replace(/\s+/g, '.')
    // Collapse dots
    .replace(/\.+/g, '.')

  if (limit) {
    $str = $str.substr(0, limit)
  }

  return $str
}

export function getSuggestedType(description: string) {
  let eventType = 'Party'

  const eventTypes = [
    'Course',
    'Workshop',
    'Party',
    'Festival',
    'Congress',
    'Concert',
  ]

  for (const e of eventTypes) {
    if (description.toLowerCase().includes(e.toLowerCase())) {
      eventType = e
    }
  }

  return eventType
}

export async function getStyles() {
  const styles = await prisma.danceStyle.findMany()
  return styles
}

export async function getSuggestedStyles(description: string) {
  if (!description) {
    return {}
  }

  const stylesList: any = await getStyles()
  const styles: any = {}

  for (const style of stylesList) {
    if (!style.regexp) {
      continue
    }

    let words

    if (style.regexp.includes(',')) {
      words = style.regexp.split(',')
    } else {
      words = [style.regexp]
    }

    for (const word of words) {
      if (description.toLowerCase().includes(word.toLowerCase())) {
        styles[style.hashtag] = {
          level: 'Interested',
          highlighted: false,
          selected: true,
        }
      }
    }
  }

  return styles
}

export function isFacebookEvent(url?: string): boolean {
  if (!url) {
    return false
  }

  return [
    'facebook.com/events/',
    'fb.me/e/',
    'fb.com/events',
    'facebook.com/share/',
  ].some((word) => url.includes(word))
}

export function getUrlContentId(url?: string): string {
  if (!url) {
    throw new Error('getUrlContentId: no url')
  }

  const result = url
    .replace(/(\?.*)/, '')
    .replace(/\/$/, '')
    .split('/')
    .pop()

  if (!result) {
    throw new Error('Invalid url')
  }

  return result
}

export function getUrlsFromText(text: string): string[] {
  const result = text.match(/(https?:\/\/[^\s"'<]+)/g)

  if (result) {
    return result
  }

  return []
}
