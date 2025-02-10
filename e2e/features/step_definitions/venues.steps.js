const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I visit the venues page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/venues')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the venues container', async function () {
  const container = await this.page.locator('main')
  await expect(container).toBeVisible()
  await this.cleanup()
}) 