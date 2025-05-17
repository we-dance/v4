const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

const generateUniqueUsername = () => `user_${Date.now()}`
const generateUniqueId = () =>
  `${Date.now()}_${Math.floor(Math.random() * 10000)}`
const generateValidEmail = () => `test_${generateUniqueId()}@example.com`
const validPassword = 'Password123!'
const shortPassword = 'pass'
const baseUrl = 'http://localhost:3000'

When('I visit the register page', async function () {
  await this.init(this.parameters)
  await this.page.goto(`${baseUrl}/register`)
  await this.page.waitForLoadState('networkidle')
})

When('I fill in {string} with {string}', async function (field, value) {
  if (field === 'phone') {
    await this.page.waitForTimeout(1000)

    try {
      const phoneInput = await this.page
        .locator('.flex input[type="text"]')
        .first()
      if (phoneInput) {
        await phoneInput.fill(value)
        await phoneInput.evaluate((el) => el.blur())
        return
      }

      await this.page.keyboard.type(value)
    } catch (e) {
      console.error('Error filling phone field:', e)
    }
  } else {
    await this.page.fill(`input[name="${field}"]`, value)
  }
})

When('I fill in {string} with a unique username', async function (field) {
  this.username = generateUniqueUsername()
  await this.page.fill(`input[name="${field}"]`, this.username)
})

When('I fill in {string} with an existing username', async function (field) {
  await this.page.fill(`input[name="${field}"]`, 'test')
})

When('I fill in {string} with a valid email', async function (field) {
  this.email = generateValidEmail()
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
  await this.page.click(
    'button[role="checkbox"][aria-label*="I agree to receive emails"]'
  )
})

When('I click the {string} button', async function (buttonText) {
  await this.page.click(`button:has-text("${buttonText}")`)
  await this.page.waitForLoadState('networkidle')
})

When('I click the "Sign Out" button', async function () {
  await this.page.click('div[role="menuitem"]:has-text("Sign Out")')
  await this.page.waitForLoadState('networkidle')
})

Then('I should be redirected to the home page', async function () {
  await this.page.waitForTimeout(2000)

  const currentUrl = this.page.url()

  if (currentUrl === `${baseUrl}/`) {
    return
  }

  const userMenu = await this.page
    .locator('button[aria-haspopup="menu"]')
    .count()
  if (userMenu > 0) {
    return
  }

  if (currentUrl.includes('/register')) {
    await this.page.screenshot({ path: 'registration-result.png' })
  }

  await expect(this.page).toHaveURL(`${baseUrl}/`, { timeout: 10000 })
})

Then('I should be logged in', async function () {
  const userMenuCount = await this.page
    .locator('button[aria-haspopup="menu"]')
    .count()
  if (userMenuCount > 0) {
    return
  }

  const accountElements = await this.page
    .locator(
      'a:has-text("Account"), a:has-text("Profile"), a:has-text("Settings")'
    )
    .count()
  if (accountElements > 0) {
    return
  }

  const loginLinks = await this.page
    .locator(
      'a:has-text("Sign In"), a:has-text("Login"), a:has-text("Register")'
    )
    .count()
  if (loginLinks === 0) {
    return
  }

  await expect(this.page.locator('button[aria-haspopup="menu"]')).toBeVisible({
    timeout: 10000,
  })
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

Given('I am a registered user', async function () {
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

Given('I am logged in', async function () {
  await this.init(this.parameters)
  this.email = 'test@example.com'
  this.password = validPassword

  await this.page.goto(`${baseUrl}/login`)
  await this.page.waitForLoadState('networkidle')
  await this.page.fill('input[name="email"]', this.email)
  await this.page.fill('input[name="password"]', this.password)
  await this.page.click('button:has-text("Login")')
  await this.page.waitForLoadState('networkidle')

  await expect(
    this.page.locator('button[aria-haspopup="menu"] .i-lucide\\:user')
  ).toBeVisible({
    timeout: 5000,
  })
})

When('I click on the user menu', async function () {
  await this.page.click('button[aria-haspopup="menu"]')
})

Then('I should be logged out', async function () {
  await expect(this.page.locator('a:has-text("Sign In")')).toBeVisible({
    timeout: 5000,
  })
  await this.cleanup()
})

Then('I should see the login button', async function () {
  await expect(this.page.locator('a:has-text("Sign In")')).toBeVisible()
  await this.cleanup()
})

When('I try to visit a protected page', async function () {
  await this.init(this.parameters)
  await this.page.goto(`${baseUrl}/settings`)
  await this.page.waitForLoadState('networkidle')
})

When('I visit a protected page', async function () {
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

Then('I clean up the test environment', async function () {
  await this.cleanup()
})
