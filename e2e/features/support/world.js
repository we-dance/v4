const { setWorldConstructor } = require('@cucumber/cucumber')
const { chromium } = require('playwright')

class CustomWorld {
  async init(options = {}) {
    const { headless = false } = options
    this.browser = await chromium.launch({ headless })
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()
  }

  async cleanup() {
    await this.page?.close()
    await this.context?.close()
    await this.browser?.close()
  }
}

setWorldConstructor(CustomWorld)
