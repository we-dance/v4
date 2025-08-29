import { Command } from 'commander'
import {
  importAccounts,
  importEvents,
  importProfiles,
  importCities,
  importSubscribers,
  importDanceStyles,
  importPosts,
  importCourses,
} from './importer'
import { getUniqueUsername } from './importer/profile'
import { logger } from './utils/logger'
import * as cliProgress from 'cli-progress'
import { exportAccounts, reindex } from './importer/account'
import { getPreview } from './importer/post'
import { fetchEvent } from './import-event/index'
import { PrismaClient } from '@prisma/client'
import { fetchCalendarData, saveCalendarData } from './calendars/ical_import'

function getLogLevel(verbosity: number) {
  switch (verbosity) {
    case 0:
      return ''
    case 1:
      return 'warning'
    case 2:
      return 'info'
    default:
      return 'debug'
  }
}

const program = new Command()

program
  .name('prisma-import')
  .option(
    '-v, --verbose',
    'increase verbosity',
    (value, previous) => previous + 1,
    0
  )

program.command('username <name>').action(async (name) => {
  const result = await getUniqueUsername(name)
  console.log(result)
})

program.command('export').action(async (name) => {
  const result = await exportAccounts()
  console.log(result)
})

program.command('test').action(async (name) => {
  const preview = await getPreview(
    'https://chat.whatsapp.com/KruMwGxjiPYA1h0mrHzA8D'
  )
  console.log(preview)
})

program.command('reindex').action(async (name) => {
  const result = await reindex()
  console.log(result)
})

program.command('event:import:debug <url>').action(async (sourceUrl) => {
  console.log('Scraping event data from:', sourceUrl)

  try {
    const eventData = await fetchEvent(sourceUrl)
    console.log('--------Scraped Data----------')
    console.log(JSON.stringify(eventData, null, 2))
    console.log('-------End Of Data----------')
  } catch (error) {
    console.error('error occured during scrape', error)
    process.exit(1)
  }
})

program.command('event:import <id>').action(async (eventId) => {
  const prisma = new PrismaClient()
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { sourceUrl: true },
  })

  if (!event || !event.sourceUrl) {
    throw new Error('Event not found or has no sourceUrl')
  }
  console.log('Found event to be updated in database')

  const scrappedData = await fetchEvent(event.sourceUrl)

  await prisma.event.update({
    where: { id: eventId },
    data: scrappedData,
  })
  console.log('Scrape was successful', eventId)
})

program.command('calendar:fetch:debug <url>').action(async (url) => {
  console.log('Testing calendar fetch')

  try {
    const calendarData = await fetchCalendarData(url)

    console.log('--------Parse Results----------')
    console.log(`Total events found: ${calendarData.totalCount}`)
    console.log(`Past events (skipped): ${calendarData.pastCount}`)
    console.log(`Upcoming events: ${calendarData.upcomingCount}`)
    console.log(`Approved events: ${calendarData.approvedCount}`)
    console.log(`Calendar name: ${calendarData.nameCandidate || 'Unknown'}`)

    console.log('--------Event Details----------')
    calendarData.events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`)
      console.log(`   Start: ${new Date(event.startDate)}`)
      console.log(`   Approved: ${event.approved}`)
      console.log(`   Type: ${event.eventType || 'unknown'}`)
      console.log(`   Location: ${event.location || 'none'}`)
      console.log(`   Facebook ID: ${event.facebookId || 'none'}`)
      console.log(`   Styles: ${event.styleHashtags?.join(', ') || 'none'}`)
      console.log('---')
    })
  } catch (error) {
    console.error('error occured while fetching calendar details ', error)
  }
})

program
  .command('calendar:sync <url> <profileId>')
  .option('--cleanup', 'Delete the test calendar after sync')
  .action(async (url, profileId, options) => {
    const prisma = new PrismaClient()
    console.log('Creating test calendar wirh URL: ', url)
    console.log('Profile ID:', profileId)

    const testCalendar = await prisma.calendar.create({
      data: {
        url: url,
        profileId: profileId,
        name: `Test Calendar ${Date.now()}`,
        state: 'pending',
      },
    })
    console.log('Created the test calendar with ID: ', testCalendar.id)

    const calendarData = await fetchCalendarData(url)
    console.log(`Fetched ${calendarData.events.length} events`)

    const calendarWithEvents = await prisma.calendar.findUnique({
      where: { id: testCalendar.id },
      include: { events: true },
    })

    await saveCalendarData(testCalendar.id, calendarData, calendarWithEvents)

    const results = await prisma.calendar.findUnique({
      where: { id: testCalendar.id },
      include: { events: true },
    })
    console.log('--------Sync Complete----------')
    console.log(`Calendar: ${results.name}`)
    console.log(`Total events: ${results.totalCount}`)
    console.log(`Calendar events created: ${results.events.length}`)
    console.log(`Approved: ${results.approvedCount}`)

    if (options.cleanup) {
      await prisma.calendarEvent.deleteMany({
        where: { calendarId: testCalendar.id },
      })
      await prisma.calendar.delete({ where: { id: testCalendar.id } })
      console.log('Cleaned up test calendar')
    } else {
      console.log(`Test calendar id: ${testCalendar.id}`)
    }
  })

program
  .command('import')
  .option('--all', 'Import everything')
  .option('-d, --dance-styles', 'Import dance styles')
  .option('-a, --accounts', 'Import accounts')
  .option('-c, --cities', 'Import cities')
  .option('-p, --profiles', 'Import profiles')
  .option('-b, --posts', 'Import blog posts')
  .option('-e, --events', 'Import events')
  .option('-s, --subscribers', 'Import subscribers')
  .option('-o, --courses', 'Import video courses')
  .action(async (options) => {
    const {
      all,
      accounts,
      profiles,
      events,
      cities,
      subscribers,
      danceStyles,
      posts,
      courses,
    } = options
    logger.level = getLogLevel(program.opts().verbose)

    logger.info('Starting import', {
      level: logger.level,
      all,
      accounts,
      profiles,
      events,
      posts,
      cities,
      subscribers,
      danceStyles,
      courses,
    })

    const multibar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      format: ` {bar} | {collection} | {eta_formatted} | {value}/{total} | {failed} failed, {created} created, {ignored} ignored, {updated} updated`,
    })

    if (all || danceStyles) {
      await importDanceStyles(multibar)
    }

    if (all || accounts) {
      await importAccounts(multibar)
    }

    if (all || cities) {
      await importCities(multibar)
    }

    if (all || profiles) {
      await importProfiles(multibar)
    }

    if (all || events) {
      await importEvents(multibar)
    }

    if (all || subscribers) {
      await importSubscribers(multibar)
    }

    if (all || posts) {
      await importPosts(multibar)
    }

    if (all || courses) {
      await importCourses(multibar)
    }

    multibar.stop()

    logger.info('Finish import')
  })

program.parse(process.argv)
