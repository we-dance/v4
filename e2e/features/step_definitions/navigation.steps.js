const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

When('I click on {string} link', async function (linkText) {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000')
  await this.page.waitForLoadState('networkidle')

  const link = await this.page
    .getByRole('navigation')
    .getByRole('link', { name: linkText })
  await link.click()
})

Then('I should be on the feed page', async function () {
  await expect(this.page).toHaveURL('http://localhost:3000/feed')
  await this.cleanup()
})

Then('I should be on the events page', async function () {
  await expect(this.page).toHaveURL('http://localhost:3000/events')
  await this.cleanup()
})

Then('I should be on the groups page', async function () {
  await expect(this.page).toHaveURL('http://localhost:3000/groups')
  await this.cleanup()
})

Then('I should be on the artists page', async function () {
  await expect(this.page).toHaveURL('http://localhost:3000/artists')
  await this.cleanup()
})

Then('I should be on the venues page', async function () {
  await expect(this.page).toHaveURL('http://localhost:3000/venues')
  await this.cleanup()
})
