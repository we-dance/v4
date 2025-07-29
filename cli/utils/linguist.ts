import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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

export async function getSuggestedStyles(description: string) {
  if (!description) {
    return {}
  }

  const stylesList = await prisma.danceStyle.findMany({
    where: {
      regexp: {
        gt: '',
      },
    },
  })
  const styles: any = {}

  for (const style of stylesList) {
    const words = (style.regexp as string).split(',').filter(Boolean)

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
