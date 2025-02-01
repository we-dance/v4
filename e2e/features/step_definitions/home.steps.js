const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I visit the home page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000')
})

Then('I should see the WeDance logo', async function () {
  const logo = await this.page.locator('#logo')
  await expect(logo).toBeVisible()
  await this.cleanup()
})
