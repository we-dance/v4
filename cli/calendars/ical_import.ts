import axios from 'axios'
import * as ical from 'ical'
import {
  getSuggestedStyles,
  getSuggestedType,
  getUrlsFromText,
  getUrlContentId,
  isFacebookEvent,
} from '../utils/linguist'
import { PrismaClient } from '@prisma/client'
import { getSlug } from '../utils/slug'
import { getFacebookEvent } from '../import-event/facebook_import'

const prisma = new PrismaClient()

function getUrlParam(url: string, param: string) {
  const match = RegExp('[?&]' + param + '=([^&]*)').exec(url)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export async function syncCalendar(calendarId: string) {
  const calendar = await prisma.calendar.findUnique({
    where: { id: calendarId },
    include: { events: true },
  })
  if (!calendar) {
    throw new Error('Calendar Not Found')
  }
  const calendarData = await fetchCalendarData(calendar.url)
  await saveCalendarData(calendarId, calendarData, calendar)
}

export async function fetchCalendarData(url: string) {
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
    res = await axios.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'WeDance/CalendarSync (+https://we.dance)' },
    })
  } catch (e) {
    console.error('[calendar-sync] fetch failed:', e)
  }

  const now = +new Date()
  if (res?.status !== 200) {
    throw new Error(`HTTP ${res?.status}: Failed to fetch calendar from ${url}`)
  }
  const ics = ical.parseICS(res?.data || '')
  const nameCandidate =
    res?.data?.split('X-WR-CALNAME:')[1]?.split('\n')[0]?.trim() || ''

  const events: any[] = []
  for (const id in ics) {
    const vevent = ics[id]

    if (vevent?.type !== 'VEVENT' || !vevent.uid) {
      continue
    }

    totalCount++

    const startDate = vevent.start ? +vevent.start : 0

    if (startDate < now) {
      pastCount++
      continue
    }

    const text = `${vevent.summary || ''} ${vevent.description || ''}`.trim()
    const styles = await getSuggestedStyles(text)
    let approved = false
    let eventType = ''
    if (Object.keys(styles).length) {
      eventType = getSuggestedType(text)
      approved = true
      approvedCount++
    }

    const styleHashtags = Object.keys(styles)

    let facebookId = ''

    if (vevent.uid?.includes('@facebook.com')) {
      facebookId = vevent.uid?.split('@')[0].replace(/^e/, '') || ''
    }

    let isNew = approved
    if (isNew) {
      newCount++
    }

    const urls = getUrlsFromText(vevent.description || '')

    let facebookUrl = vevent.url
    if (!facebookUrl?.includes('facebook.com/events/')) {
      facebookUrl = urls.find((u) => isFacebookEvent(u))
    }

    if (facebookUrl && !facebookId) {
      try {
        facebookId = getUrlContentId(facebookUrl)
      } catch {}
    }

    const eventSlug = getSlug(vevent.summary || '')
    const eventStart = vevent.start ? new Date(vevent.start) : new Date()
    const startOfDay = new Date(eventStart)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(eventStart)
    endOfDay.setHours(23, 59, 59, 999)

    const event: any = {
      isNew,
      facebookId,
      providerItemId: vevent.uid,
      name: vevent.summary,
      description: vevent.description || null,
      startDate: vevent.start ? +vevent.start : null,
      endDate: vevent.end ? +vevent.end : null,
      sourceUrl: facebookUrl || vevent.url || null,
      location: vevent.location || null,
      eventType,
      approved,
      styleHashtags,
    }
    events.push(event)
  }
  return {
    nameCandidate,
    events,
    totalCount,
    pastCount,
    newCount: approvedCount, // Only approved events count as "new" for this function
    approvedCount,
    upcomingCount: events.length,
  }
}

export async function saveCalendarData(
  calendarId: string,
  calendarData: any,
  calendar: any
) {
  const now = +new Date()
  let newCount = 0
  const processedEvents: any[] = []

  for (const event of calendarData.events) {
    const existingEvent = calendar.events.find(
      (e: any) => e.providerItemId === event.providerItemId
    )

    let isNew = false
    const eventSlug = getSlug(event.name || null)
    const eventStart = event.startDate ? new Date(event.startDate) : new Date()
    const startOfDay = new Date(eventStart)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(eventStart)
    endOfDay.setHours(23, 59, 59, 999)

    const facebookUrl =
      event.sourceUrl && event.sourceUrl.includes('facebook.com')
        ? event.sourceUrl
        : null
    const facebookId = event.facebookId

    if (!existingEvent) {
      isNew = true
      newCount++
    }

    if (isNew && event.approved) {
      const styleHashtags = event.styleHashtags || []
      const createdCalendarEvent = await prisma.calendarEvent.upsert({
        where: {
          calendarId_providerItemId: {
            calendarId: calendarId,
            providerItemId: event.providerItemId,
          },
        },

        create: {
          calendarId,
          providerItemId: event.providerItemId,
          name: event.name || null,
          description: event.description || null,
          startDate: event.startDate ? new Date(event.startDate) : new Date(),
          endDate: event.endDate ? new Date(event.endDate) : new Date(),
          sourceUrl: event.sourceUrl || null,
          approved: event.approved,
          location: event.location || null,
          facebookId: event.facebookId || null,
          eventType: event.eventType,
          styles: {
            connect: styleHashtags.map((hashtag: string) => ({ hashtag })),
          },
        },
        update: {
          name: event.name || null,
          description: event.description || null,
          startDate: event.startDate ? new Date(event.startDate) : new Date(),
          endDate: event.endDate ? new Date(event.endDate) : new Date(),
          sourceUrl: event.sourceUrl || null,
          approved: event.approved,
          location: event.location || null,
          facebookId: event.facebookId || null,
          eventType: event.eventType,
          styles: {
            connect: styleHashtags.map((hashtag: string) => ({ hashtag })),
          },
        },
      })
      const existingByFb = event.facebookId
        ? await prisma.calendarEvent.findFirst({
            where: { facebookId, eventId: { not: null } },
            select: { eventId: true },
          })
        : null

      const existingBySlug = !existingByFb
        ? await prisma.event.findFirst({
            where: {
              slug: eventSlug,
              startDate: { gte: startOfDay, lte: endOfDay },
            },
            select: { id: true },
          })
        : null

      const matchedEventId = existingByFb?.eventId ?? existingBySlug?.id ?? null

      if (matchedEventId) {
        console.log(
          `[CALENDAR-SYNC] 🔗 Linking existing event: ${matchedEventId} to calendar event ${createdCalendarEvent.id}`
        )
        //event exists, just link existing event to the calendar
        await prisma.calendarEvent.update({
          where: { id: createdCalendarEvent.id },
          data: { eventId: matchedEventId },
        })
        event.eventId = matchedEventId
      } else if (facebookUrl && isFacebookEvent(facebookUrl)) {
        console.log(
          'Processing facebook event',
          facebookUrl,
          'id is:',
          facebookId
        )
        // Event doesn't exist + Facebook URL - create Facebook event with rich data (so we can add organizer, event photo, ticketUrl)
        const facebookEventData = await getFacebookEvent(facebookUrl)
        if (facebookEventData.status !== 'failed_import') {
          console.log('Facebook import succesfull', facebookEventData.name)
          const newEvent = await prisma.$transaction(async (tx) => {
            const event = await tx.event.create({
              data: {
                ...facebookEventData,
                creatorId: calendar.profileId,
                status: 'published',
                slug: eventSlug,
              },
            })
            await tx.calendarEvent.update({
              where: { id: createdCalendarEvent.id },
              data: { eventId: event.id },
            })
            return event
          })

          event.eventId = newEvent.id
          console.log('created facebook event in db with id: ', newEvent.id)
        }
      } else {
        //Event doesnt exist  and not facebook, create a basic event
        console.log(
          `[CALENDAR-SYNC] Creating basic event: ${event.name} (sourceUrl: ${facebookUrl || event.sourceUrl || 'none'})`
        )
        const newEvent = await prisma.$transaction(async (tx) => {
          const newEventRecord = await tx.event.create({
            data: {
              name: event.name,
              description: event.description || '',
              startDate: event.startDate
                ? new Date(event.startDate)
                : new Date(),
              endDate: event.endDate ? new Date(event.endDate) : new Date(),
              sourceUrl: facebookUrl || event.sourceUrl || '',
              creatorId: calendar.profileId,
              status: 'published',
              slug: eventSlug,
            },
          })
          await tx.calendarEvent.update({
            where: { id: createdCalendarEvent.id },
            data: { eventId: newEventRecord.id },
          })
          return newEventRecord
        })
        event.eventId = newEvent.id
        console.log(
          `[CALENDAR-SYNC] ✅ Created basic event with ID: ${newEvent.id}`
        )
      }
    } else {
      event.eventId = existingEvent?.eventId || null
    }
    processedEvents.push(event)
  }

  const upcomingCount = processedEvents.length
  const state = 'processed'

  await prisma.calendar.update({
    where: { id: calendarId },
    data: {
      name: calendarData.nameCandidate || calendar.name,
      state,
      lastSyncedAt: new Date(now),
      upcomingCount,
      approvedCount: calendarData.approvedCount,
      newCount,
      pastCount: calendarData.pastCount,
      totalCount: calendarData.totalCount,
      url: calendar.url,
    },
  })
}
