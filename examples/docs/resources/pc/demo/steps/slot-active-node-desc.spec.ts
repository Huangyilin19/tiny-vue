import { test, expect } from '@playwright/test'

test('当前节点描述信息', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('http://localhost:7130/pc/steps/slot-active-node-desc')

  const steps = page.locator('#preview .tiny-steps')
  const nodes = steps.locator('.step-content')
  await expect(nodes.first().locator('.active-node-desc')).toBeVisible()
  await nodes.nth(1).click()
  await expect(nodes.nth(1).locator('.active-node-desc')).toBeVisible()
  await expect(nodes.first().locator('.active-node-desc')).not.toBeVisible()
})