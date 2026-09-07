import { test, expect } from '@playwright/test';

test('Swap page should render and allow token selection', async ({ page }) => {
  await page.goto('/swap');

  // Verify heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('SWAP');

  // Open token select
  const trigger = page.locator('[data-testid="token-select-trigger"]').first();
  await trigger.waitFor({ state: 'visible', timeout: 30000 });
  await trigger.click();

  // Verify token list is visible
  const listbox = page.locator('ul[role="listbox"]');
  await expect(listbox).toBeVisible({ timeout: 10000 });

  // Take a screenshot
  await page.screenshot({ path: 'swap-page.png' });
});
