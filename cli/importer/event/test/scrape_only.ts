import { getEventType } from '..'

async function main() {
  const sourceUrl = process.argv[2]

  if (!sourceUrl) {
    console.error('Proivde a url')
    console.log('Example: pnpm tsx cli/importer/event/test/scrape.ts <URL>')
    process.exit(1)
  }
  console.log('Scraping event data from:', sourceUrl)

  try {
    const eventData = await getEventType(sourceUrl)
    console.log('--------Scraped Data----------')
    console.log(JSON.stringify(eventData, null, 2))
    console.log('-------End Of Data----------')
  } catch (error) {
    console.error('error occured during scrape', error)
    process.exit(1)
  }
}
main()
