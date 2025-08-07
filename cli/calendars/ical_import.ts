import axios from 'axios'
import * as ical from 'ical'
import {
  getSuggestedStyles,
  getSuggestedType,
  getUrlsFromText,
  isFacebookEvent,
} from '../utils/linguist'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function getUrlParam(url: string, param: string) {
  const match = RegExp('[?&]' + param + '=([^&]*)').exec(url)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

function getUrlContentId(url?: string): string {
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

export async function syncCalendar(calendarId: string) {
  const calendar = await prisma.calendar.findUnique({
    where: { id: calendarId },
    include: { events: true },
  })
  if (!calendar) {
    throw new Error(`Calendar ${calendarId} not found`)
  }

  let url = calendar.url
  let pastCount = 0
  let newCount = 0
  let totalCount = 0
  let approvedCount = 0

  if (url.includes('calendar.google.com/calendar/u/0/embed')) {
    const icalId = getUrlParam(url, 'src')
    url = `https://calendar.google.com/calendar/ical/${icalId}/public/basic.ics`
  }

  if (url.includes('https://teamup.com/')) {
    const icalId = getUrlContentId(url)
    url = `https://ics.teamup.com/feed/${icalId}/0.ics`
  }

  let res
  try {
    res = await axios(url)
  } catch (e) {}

  const name = res?.data?.split('X-WR-CALNAME:')[1]?.split('\n')[0] || ''
  const ics = ical.parseICS(res?.data || '')
  const now = +new Date()

  if (res?.status !== 200 || !name) {
    await prisma.calendar.update({
      where: { id: calendarId },
      data: {
        state: 'failed',
        lastSyncedAt: new Date(now),
        name: name || calendar.name,
      },
    })
    return
  }

  const events: any[] = []
  for (const id in ics) {
    const vevent = ics[id]

    if (!vevent.uid) {
      continue
    }

    totalCount++

    const startDate = vevent.start ? +vevent.start : 0

    if (startDate < now) {
      pastCount++
      continue
    }

    const styles = await getSuggestedStyles(
      vevent.summary + ' ' + vevent.description
    )

    console.log('=== DEBUGGING STYLES ===')
    console.log('Event text:', vevent.summary + ' ' + vevent.description)
    console.log('Styles returned:', styles)
    console.log('Styles count:', Object.keys(styles).length)
    console.log('=========================')

    let approved = false
    let eventType = ''
    if (Object.keys(styles).length) {
      eventType = getSuggestedType(vevent.summary + ' ' + vevent.description)
      approved = true
      approvedCount++
    }

    let facebookId = ''

    if (vevent.uid?.includes('@facebook.com')) {
      facebookId = vevent.uid?.split('@')[0].replace('e', '') || ''
    }

    let isNew = false
    const existingEvent = calendar.events.find(
      (e: any) => e.providerItemId === vevent.uid
    )

    if (!existingEvent) {
      isNew = true
      newCount++
    }

    const urls = getUrlsFromText(vevent.description || '')

    let facebookUrl = vevent.url
    if (!facebookUrl?.includes('facebook.com/events/')) {
      facebookUrl = urls.find((u) => isFacebookEvent(u))
    }

    if (facebookUrl && !facebookId) {
      facebookId = getUrlContentId(facebookUrl)
    }

    const event: any = {
      isNew,
      facebookId,
      providerItemId: vevent.uid,
      name: vevent.summary,
      description: vevent.description || '',
      startDate: vevent.start ? +vevent.start : '',
      endDate: vevent.end ? +vevent.end : '',
      sourceUrl: facebookUrl || vevent.url || '',
      location: vevent.location || '',
      eventType,
      approved,
    }

    if (isNew && approved) {
      const styleHashtags = Object.keys(styles)
      await prisma.calendarEvent.create({
        data: {
          calendarId: calendarId,
          providerItemId: vevent.uid,
          name: vevent.summary || null,
          description: vevent.description || null,
          startDate: vevent.start ? new Date(vevent.start) : new Date(),
          endDate: vevent.end ? new Date(vevent.end) : new Date(),
          sourceUrl: facebookUrl || vevent.url || null,
          approved: approved,
          location: vevent.location || null,
          facebookId: facebookId || null,
          eventType: eventType,
          styles: {
            connect: styleHashtags.map((hashtag) => ({ hashtag })),
          },
        },
      })
      if (approved) {
        const newEvent = await prisma.event.create({
          data: {
            name: vevent.summary,
            description: vevent.description || '',
            startDate: vevent.start ? new Date(vevent.start) : new Date(),
            endDate: vevent.end ? new Date(vevent.end) : new Date(),
            sourceUrl: facebookUrl || vevent.url || '',
            creatorId: calendar.profileId,
            status: 'published',
          },
        })
        event.eventId = newEvent.id
      }
    } else {
      event.eventId = existingEvent?.id || null
    }

    events.push(event)
  }

  const upcomingCount = events.length
  const state = 'processed'

  await prisma.calendar.update({
    where: { id: calendarId },
    data: {
      name,
      state,
      lastSyncedAt: new Date(now),
      upcomingCount,
      approvedCount,
      newCount,
      pastCount,
      totalCount,
      url,
    },
  })
}
