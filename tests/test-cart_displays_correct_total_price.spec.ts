
import { test, expect } from '@playwright/test';

test('cart_displays_correct_total_price', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Flat_White"]').click();
  await page.locator('[data-test="Mocha"]').click();
  await page.locator('[data-test="checkout"]').click();

  // check total price
  await expect(page.locator('button.pay')).toContainText('$26');
});