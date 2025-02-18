const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I visit the artists page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/artists')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the list of dance artists', async function () {
  // Check header
  const header = await this.page.getByRole('heading', { level: 1 })
  await expect(header).toBeVisible()

  // Wait for data to load
  await this.page.waitForTimeout(1000)

  // Check for artist cards using specific structure
  const artistCards = this.page.locator('div.rounded-lg:has(img.rounded-full)')
  const count = await artistCards.count()
  await expect(count).toBeGreaterThan(0)

  // Verify first card content
  const firstCard = artistCards.first()
  await expect(firstCard.locator('h3')).toBeVisible()
  await expect(firstCard.locator('img.rounded-full')).toBeVisible()

  await this.cleanup()
})
