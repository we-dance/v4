const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I visit the events page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/events')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the list of dance events', async function () {
  // Check header
  const header = await this.page.getByRole('heading', { level: 1 })
  await expect(header).toBeVisible()

  // Wait for data to load
  await this.page.waitForTimeout(1000)

  // Check for event cards using specific structure
  const eventCards = this.page.locator('article.bg-background')
  const count = await eventCards.count()
  await expect(count).toBeGreaterThan(0)

  // Verify first card content
  const firstCard = eventCards.first()
  await expect(firstCard.locator('img.object-cover')).toBeVisible()
  await expect(firstCard.locator('div.font-bold')).toBeVisible()

  await this.cleanup()
})
