const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I visit the groups page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/groups')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the page title', async function () {
  const header = await this.page.getByRole('heading', { level: 1 })
  await expect(header).toBeVisible()
})

Then('I should see the filter', async function () {
  const filter = await this.page.getByRole('button', { name: 'Filters' })
  await expect(filter).toBeVisible()
})

Then('I should see the list of dance groups', async function () {
  const organizerCard = await this.page.locator('div[class*="grid"] > div').first()
  await expect(organizerCard).toBeVisible()
  await this.cleanup()
})
