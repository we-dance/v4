const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// Helper functions
const generateUniqueUsername = () => `user_${Date.now()}`
const generateValidEmail = (username) => `${username}@example.com`
const validPassword = 'Password123!'
const shortPassword = 'pass'
const baseUrl = 'http://localhost:3000'

// Registration steps
When('I visit the register page', async function () {
  await this.init(this.parameters)
  await this.page.goto(`${baseUrl}/register`)
  await this.page.waitForLoadState('networkidle')
})

When('I fill in {string} with a unique username', async function (field) {
  this.username = generateUniqueUsername()
  await this.page.fill(`input[name="${field}"]`, this.username)
})

When('I fill in {string} with an existing username', async function (field) {
  // Using a known existing username from the mock data
  await this.page.fill(`input[name="${field}"]`, 'test')
})

When('I fill in {string} with a valid email', async function (field) {
  this.email = generateValidEmail(this.username || 'test')
  await this.page.fill(`input[name="${field}"]`, this.email)
})

When('I fill in {string} with an invalid email', async function (field) {
  await this.page.fill(`input[name="${field}"]`, 'invalid-email')
})

When('I fill in {string} with a valid password', async function (field) {
  this.password = validPassword
  await this.page.fill(`input[name="${field}"]`, this.password)
})

When('I fill in {string} with a short password', async function (field) {
  await this.page.fill(`input[name="${field}"]`, shortPassword)
})

When('I check the email consent checkbox', async function () {
  await this.page.check('input[name="emailConsent"]')
})

When('I click the {string} button', async function (buttonText) {
  await this.page.click(`button:has-text("${buttonText}")`)
  await this.page.waitForLoadState('networkidle')
})

Then('I should be redirected to the home page', async function () {
  await expect(this.page).toHaveURL(`${baseUrl}/`)
  await this.cleanup()
})

Then('I should be logged in', async function () {
  // Check for elements that indicate a logged-in state
  await expect(this.page.locator('button:has-text("Sign Out")')).toBeVisible({
    timeout: 5000,
  })
  await this.cleanup()
})

Then(
  'I should see an error message about the username being taken',
  async function () {
    await expect(
      this.page.locator('text=Username is already taken')
    ).toBeVisible()
    await this.cleanup()
  }
)

Then(
  'I should see an error message about the invalid email',
  async function () {
    await expect(this.page.locator('text=Invalid email')).toBeVisible()
    await this.cleanup()
  }
)

Then(
  'I should see an error message about the password being too short',
  async function () {
    await expect(
      this.page.locator('text=Password must be at least 8 characters')
    ).toBeVisible()
    await this.cleanup()
  }
)

Then(
  'I should see an error message about email consent being required',
  async function () {
    await expect(
      this.page.locator('text=We need your consent to send you emails')
    ).toBeVisible()
    await this.cleanup()
  }
)

// Login steps
Given('I am a registered user', async function () {
  // Store credentials for a registered user
  this.username = 'test'
  this.email = 'test@example.com'
  this.password = validPassword
})

When('I visit the login page', async function () {
  await this.init(this.parameters)
  await this.page.goto(`${baseUrl}/login`)
  await this.page.waitForLoadState('networkidle')
})

When('I fill in {string} with my email', async function (field) {
  await this.page.fill(`input[name="${field}"]`, this.email)
})

When('I fill in {string} with my password', async function (field) {
  await this.page.fill(`input[name="${field}"]`, this.password)
})

When('I fill in {string} with an incorrect password', async function (field) {
  await this.page.fill(`input[name="${field}"]`, 'WrongPassword123!')
})

Then(
  'I should see an error message about invalid credentials',
  async function () {
    await expect(
      this.page.locator(
        'text=Sign in failed. Check the details you provided are correct.'
      )
    ).toBeVisible()
    await this.cleanup()
  }
)

// Logout steps
Given('I am logged in', async function () {
  // First login
  await this.init(this.parameters)
  this.email = 'test@example.com'
  this.password = validPassword

  await this.page.goto(`${baseUrl}/login`)
  await this.page.waitForLoadState('networkidle')
  await this.page.fill('input[name="email"]', this.email)
  await this.page.fill('input[name="password"]', this.password)
  await this.page.click('button:has-text("Login")')
  await this.page.waitForLoadState('networkidle')

  // Verify logged in
  await expect(this.page.locator('button:has-text("Sign Out")')).toBeVisible({
    timeout: 5000,
  })
})

When('I click on the user menu', async function () {
  await this.page.click('button:has([name="lucide:user"])')
})

Then('I should be logged out', async function () {
  // Check for elements that indicate a logged-out state
  await expect(this.page.locator('a:has-text("Sign In")')).toBeVisible({
    timeout: 5000,
  })
  await this.cleanup()
})

Then('I should see the login button', async function () {
  await expect(this.page.locator('a:has-text("Sign In")')).toBeVisible()
  await this.cleanup()
})

// Protected page access
When('I try to visit a protected page', async function () {
  await this.init(this.parameters)
  await this.page.goto(`${baseUrl}/settings`)
  await this.page.waitForLoadState('networkidle')
})

When('I visit a protected page', async function () {
  // Assuming we're already logged in from the previous step
  await this.page.goto(`${baseUrl}/settings`)
  await this.page.waitForLoadState('networkidle')
})

Then('I should be redirected to the login page', async function () {
  await expect(this.page).toHaveURL(`${baseUrl}/login`)
  await this.cleanup()
})

Then('I should see the protected page content', async function () {
  await expect(this.page).toHaveURL(`${baseUrl}/settings`)
  await expect(this.page.locator('h1:has-text("Settings")')).toBeVisible()
  await this.cleanup()
})
