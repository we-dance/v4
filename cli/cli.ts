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
import { fetchEvent, importEvent } from './import-event/index'
import { PrismaClient } from '@prisma/client'

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
  try {
    console.log('Processing event with the id: ', eventId)
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })
    if (!event) {
      console.error('No event with the id: ', eventId)
      process.exit(1)
    }
    if (!event.sourceUrl) {
      console.error('No source url exists in this field')
      process.exit(1)
    }
    await importEvent(event.id)
    console.log('Succesfully processed event')
  } catch (error) {
    console.error('An Error happened while processing the event', error)
    process.exit(1)
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
