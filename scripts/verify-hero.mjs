import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text())
})

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(3500)
await page.screenshot({ path: 'shots/hero-fixed.png' })

await page.setViewportSize({ width: 390, height: 844 })
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.screenshot({ path: 'shots/mobile-hero-fixed.png' })

console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'NO RUNTIME ERRORS')
await browser.close()
