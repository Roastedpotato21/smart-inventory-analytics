import { test, expect } from '@playwright/test'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
const manifest: Record<string, string> = JSON.parse(readFileSync('scripts/artifact-manifest.json', 'utf8'))

for (const width of [375, 430, 768, 1024, 1440]) {
  test(`responsive case study at ${width}px`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Smart inventory')
    for (const section of ['#overview', '#dashboard', '#analysis', '#insights', '#workflow', '#resources']) {
      await page.locator(section).scrollIntoViewIfNeeded()
      await expect(page.locator(section)).toBeVisible()
      const overflow = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }))
      expect(overflow.scroll).toBeLessThanOrEqual(overflow.client)
    }
    await expect(page.locator('.dashboard-preview img')).toHaveJSProperty('naturalWidth', 1917)
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true })
    expect(errors).toEqual([])
  })
}

test('dashboard lightbox supports keyboard, escape, and focus return', async ({ page }) => {
  await page.goto('/')
  const preview = page.getByRole('button', { name: 'Enlarge the original Power BI dashboard screenshot' })
  await preview.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Close dashboard preview' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(preview).toBeFocused()
})

test('mobile navigation opens, closes, and reaches a section', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: /^(Open|Close) navigation$/ })
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(toggle).toBeFocused()
  await toggle.click()
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Analysis', exact: true }).click()
  await expect(page).toHaveURL(/#analysis$/)
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
})

test('SQL controls show exact snippets from the downloadable file', async ({ page }) => {
  const sql = readFileSync('public/inventory_analysis.sql', 'utf8').replace(/\r/g, '')
  await page.goto('/')
  const buttons = page.getByRole('group', { name: 'SQL analysis previews' }).getByRole('button')
  for (const button of await buttons.all()) {
    await button.click()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    const snippet = await page.locator('#sql-preview pre').textContent()
    expect(sql).toContain(snippet!.replace(/\r/g, ''))
  }
})

test('published resources match original artifacts and PBIX downloads', async ({ page, request }) => {
  for (const [file, expected] of Object.entries(manifest)) {
    const response = await request.get(`/${file}`)
    expect(response.ok()).toBeTruthy()
    expect(createHash('sha256').update(await response.body()).digest('hex')).toBe(expected)
  }
  const response = await request.get('/inventory_analysis.sql')
  expect(response.ok()).toBeTruthy()
  expect(await response.text()).toContain('STR_TO_DATE')
  await page.goto('/')
  const downloadEvent = page.waitForEvent('download')
  await page.locator('.hero-actions').getByRole('link', { name: 'Download Power BI Report' }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toBe('smart_inventoryanalytics.pbix')
  expect(await download.failure()).toBeNull()
  await expect(page.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute('href', 'https://github.com/Roastedpotato21/smart-inventory-analytics')
})

test('reduced motion disables scroll animation and preserves real values', async ({ page }) => {
  await page.goto('/')
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBeTruthy()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto')
  await page.locator('.metrics-section').scrollIntoViewIfNeeded()
  await expect(page.locator('.metric-value').first().locator('[aria-hidden="true"]')).toHaveText('73,100')
  const scales = await page.locator('.chart-bar').evaluateAll(bars => bars.map(bar => getComputedStyle(bar).transform))
  expect(scales.every(scale => scale === 'none' || scale === 'matrix(1, 0, 0, 1, 0, 0)')).toBeTruthy()
})

test('normal motion reveals content and completes metric counters', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('.hero-copy')).toHaveCSS('opacity', '1')
  await page.screenshot({ path: 'test-results/hero-desktop.png' })
  await page.locator('.metrics-section').scrollIntoViewIfNeeded()
  await expect(page.locator('.metric-value').first().locator('[aria-hidden="true"]')).toHaveText('73,100')
  await page.setViewportSize({ width: 375, height: 1000 })
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.screenshot({ path: 'test-results/hero-mobile.png' })
})
