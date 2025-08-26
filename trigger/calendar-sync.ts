import { task, logger, schedules } from '@trigger.dev/sdk/v3'
import { prisma } from '~/server/prisma'
import { syncCalendar } from '~/cli/calendars/ical_import'

export const syncSingleCalendar = task({
  id: 'sync-single-calendar',
  run: async (payload: { calendarId: string }) => {
    logger.log(`Syncing calendar: ${payload.calendarId}`)

    const { count } = await prisma.calendar.updateMany({
      where: { id: payload.calendarId, NOT: { state: 'processing' } },
      data: { state: 'processing' },
    })
    if (count === 0) {
      logger.log(
        `Calendar ${payload.calendarId} is already processing. Skipping duplicate run.`
      )
      return {
        calendarId: payload.calendarId,
        status: 'already-processing' as const,
      }
    }
    try {
      await syncCalendar(payload.calendarId)
      await prisma.calendar.update({
        where: { id: payload.calendarId },
        data: {
          state: 'processed',
          lastSyncedAt: new Date(),
        },
      })
    } catch (error) {
      logger.error(String(error))
      await prisma.calendar.update({
        where: { id: payload.calendarId },
        data: {
          state: 'failed',
        },
      })
      throw error
    }
    return { calendarId: payload.calendarId, status: 'processed' }
  },
})

//Sync Calendars (scheduled)
export const syncCalendars = schedules.task({
  id: 'sync-calendars',
  cron: '0 16 * * *',
  run: async () => {
    const calendars = await prisma.calendar.findMany({
      where: { NOT: { state: 'processing' } },
    })

    // Batch update for efficency
    if (calendars.length > 0) {
      await prisma.calendar.updateMany({
        where: { id: { in: calendars.map((c) => c.id) } },
        data: { state: 'pending' },
      })
    }
    // Fan out tasks for the filtered set
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
