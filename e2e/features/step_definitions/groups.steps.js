const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I visit the groups page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/groups')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the groups container', async function () {
  // Check header
  const header = await this.page.getByRole('heading', { level: 1 })
  await expect(header).toBeVisible()

  // Check filter
  const filter = await this.page.getByRole('search')
  await expect(filter).toBeVisible()

  // Check first card
  const firstCard = await this.page.locator('.group-card').first()
  await expect(firstCard).toBeVisible()

  await this.cleanup()
})
