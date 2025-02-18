const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I visit the venues page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/venues')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the list of dance venues', async function () {
  // Check header
  const header = await this.page.getByRole('heading', { level: 1 })
  await expect(header).toBeVisible()

  // Wait for data to load
  await this.page.waitForTimeout(1000)

  // Check for venue cards using specific structure
  const venueCards = this.page.locator('div.grid > a.group')
  const count = await venueCards.count()
  await expect(count).toBeGreaterThan(0)

  // Verify first card content
  const firstCard = venueCards.first()
  await expect(firstCard.locator('h3')).toBeVisible()
  await expect(firstCard.locator('img')).toBeVisible()

  await this.cleanup()
})
