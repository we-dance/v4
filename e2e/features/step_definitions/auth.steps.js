const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

Given('I am on the login page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/login')
})

When('I enter my email {string}', async function (email) {
  await this.page.fill('input[type="email"]', email)
})

When('I enter my password {string}', async function (password) {
  await this.page.fill('input[type="password"]', password)
})

When('I submit a form', async function () {
    await this.page.click(`button[type=submit]`)
})

Then('I should see my profile menu', async function () {
  // Wait for profile menu to be visible
  expect(this.page.url()).toBe('http://localhost:3000/feed')
  const profileMenu = await this.page.isVisible('[data-test="profile-menu"]')
  expect(profileMenu).toBeTruthy()
})