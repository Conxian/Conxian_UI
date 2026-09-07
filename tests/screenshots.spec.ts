import { test } from '@playwright/test';

test('take screenshot of homepage', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'docs/images/homepage.png', fullPage: true });
});

test('take screenshot of swap page', async ({ page }) => {
  await page.goto('/swap');
  await page.screenshot({ path: 'docs/images/guide_02_swap_page.png', fullPage: true });
});

test('take screenshot of swap page filled', async ({ page }) => {
  await page.goto('/swap');
  const amountInput = page.locator('#from-amount');
  await amountInput.waitFor({ state: 'visible', timeout: 30000 });
  await amountInput.fill('10');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'docs/images/guide_03_swap_form_filled.png', fullPage: true });
});

test('take screenshot of add liquidity page', async ({ page }) => {
  await page.goto('/add-liquidity');
  await page.screenshot({ path: 'docs/images/add_liquidity_page.png', fullPage: true });
});

test('take screenshot of positions page', async ({ page }) => {
  await page.goto('/positions');
  await page.screenshot({ path: 'docs/images/positions_page.png', fullPage: true });
});

test('take screenshot of shielded page', async ({ page }) => {
  await page.goto('/shielded');
  await page.screenshot({ path: 'docs/images/shielded_page.png', fullPage: true });
});

test('take screenshot of launch page', async ({ page }) => {
  await page.goto('/launch');
  await page.screenshot({ path: 'docs/images/launch_page.png', fullPage: true });
});
