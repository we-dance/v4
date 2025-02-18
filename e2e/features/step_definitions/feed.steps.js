const { When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

// Feed
When('I visit the feed page', async function () {
  await this.init(this.parameters)
  await this.page.goto('http://localhost:3000/feed')
  await this.page.waitForLoadState('networkidle')
})

Then('I should see the latest posts', async function () {
  // Check header
  const header = await this.page.getByRole('heading', { level: 1 })
  await expect(header).toBeVisible()

  // Wait for data to load
  await this.page.waitForTimeout(1000)

  // Check for main content container
  const mainContent = this.page.locator('div.flex-1.max-w-xl')
  await expect(mainContent).toBeVisible()

  // Verify PostList component is present
  const postList = mainContent.locator('div:has(> div > div.flex-1)')
  const count = await postList.count()
  await expect(count).toBeGreaterThan(0)

  await this.cleanup()
})
