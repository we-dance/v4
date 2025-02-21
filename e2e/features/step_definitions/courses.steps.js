const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// Courses
When('I visit the courses page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/courses')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the list of dance courses', async function () {
  // Check header
  const header = await this.page.getByRole('heading', { level: 1 })
  await expect(header).toBeVisible()

  // Wait for data to load
  await this.page.waitForTimeout(1000)

  // Check for course cards using specific structure
  const courseCards = this.page.locator('div.grid > div.group')
  const count = await courseCards.count()
  await expect(count).toBeGreaterThan(0)

  // Verify first card content
  const firstCard = courseCards.first()
  await expect(firstCard.locator('div.aspect-video img')).toBeVisible()
  await expect(firstCard.locator('h3.text-xl')).toBeVisible()
  await expect(firstCard.locator('img.rounded-full')).toBeVisible()

  await this.cleanup()
})
// Yarima Course Journey
When('I click on {string} course', async function (courseName) {
  const courseCard = this.page.getByText(courseName).first()
  await courseCard.click()
  await this.page.waitForLoadState('networkidle')
})

Then('I should be redirected to the course details page', async function () {
  await this.page.waitForSelector('h1')
  const courseTitle = await this.page.getByText('Salsa Lady Styling')
  await expect(courseTitle).toBeVisible()
})

When('I click on {string} button', async function (buttonText) {
  const button = this.page.getByRole('button', { name: buttonText })
  await button.click()
})

Then('I should see a dialog with title {string}', async function (title) {
  const dialogTitle = this.page.getByRole('heading', { name: title })
  await expect(dialogTitle).toBeVisible()
})
