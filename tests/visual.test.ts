import { test, expect } from '@playwright/test';

test('visual regression test for homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', { fullPage: true });

  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      throw new Error(`Console ${msg.type()}: ${msg.text()}`);
    }
  });

  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.tagName);
  expect(focused).not.toBeUndefined();
});
