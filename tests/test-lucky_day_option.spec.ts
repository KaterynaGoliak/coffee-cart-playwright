import { test, expect } from '@playwright/test';

test.use({
  viewport: { height: 620, width: 1100 }
});

test('lucky_day_option', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Espresso"]').click();

  // confirm that the lucky day modal appears
  await page.getByRole('button', { name: 'Yes, of course!' }).click();

  // check that the discounted item is present in the cart preview
  await expect(page.locator('.cart-preview'))
    .toContainText('(Discounted) Mocha', { timeout: 5000 });

  // checkout
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  // check for success message after payment
  await expect(page.locator('.snackbar.success'))
    .toContainText('Thanks for your purchase', { timeout: 10000 });
});
