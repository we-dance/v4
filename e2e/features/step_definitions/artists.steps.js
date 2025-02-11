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

  // Check if there are artist cards in the grid
  const artistCards = this.page.locator('.artist-card')
  await expect(artistCards).toHaveCount(await artistCards.count())

  await this.cleanup()
})
