import { task, logger, schedules } from '@trigger.dev/sdk/v3'
import { prisma } from '~/server/prisma'
import { syncCalendar } from '~/cli/calendars/ical_import'

//replaces onCalendarUpdate (event-based)
export const syncSingleCalendar = task({
  id: 'sync-single-calendar',
  run: async (payload: { calendarId: string }) => {
    logger.log(`Syncing calendar: ${payload.calendarId}`)

    await prisma.calendar.update({
      where: { id: payload.calendarId },
      data: { state: 'processing' },
    })
    try {
      await syncCalendar(payload.calendarId)
      await prisma.calendar.update({
        where: { id: payload.calendarId },
        data: { state: 'processed' },
      })
    } catch (error) {
      logger.error(String(error))
      await prisma.calendar.update({
        where: { id: payload.calendarId },
        data: { state: 'failed' },
      })
      throw error
    }
    return { calendarId: payload.calendarId, status: 'completed' }
  },
})

//Sync Calendars (scheduled)
export const syncCalendars = schedules.task({
  id: 'sync-calendars',
  cron: '0 16 * * *',
  run: async () => {
    const calendars = await prisma.calendar.findMany()

    // Update all states first
    await Promise.all(
      calendars.map((calendar) =>
        prisma.calendar.update({
          where: { id: calendar.id },
          data: {
            state: 'queued',
            lastSyncedAt: new Date(),
          },
        })
      )
    )

    // Then trigger all syncs
    await Promise.all(
      calendars.map((calendar) =>
        syncSingleCalendar.trigger({ calendarId: calendar.id })
      )
    )

    return {
      message: 'Daily sync initiated',
      calendarsQueued: calendars.length,
    }
  },
})
