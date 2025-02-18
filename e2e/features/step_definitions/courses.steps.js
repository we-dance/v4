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
