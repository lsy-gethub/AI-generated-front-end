import { chromium } from 'playwright'

const run = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const errors = []
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text()}`)
  })

  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(3500)
  await page.screenshot({ path: 'shots/hero.png' })

  // 滚动经过各区段并截图
  const sections = ['#stats', '#features', '#product', '#tech', '#cases', '#cta', '#footer']
  for (const sel of sections) {
    await page.locator(sel).scrollIntoViewIfNeeded()
    await page.waitForTimeout(1200)
    await page.screenshot({ path: `shots/${sel.slice(1)}.png` })
  }

  await page.mouse.move(720, 450)
  await page.waitForTimeout(600)

  // 移动端视口
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: 'shots/mobile-hero.png' })

  console.log(errors.length ? `ERRORS:\n${errors.join('\n')}` : 'NO RUNTIME ERRORS')
  await browser.close()
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
