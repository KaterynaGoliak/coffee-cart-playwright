import { test, expect } from '@playwright/test';

test('added_items_are_displayed_in_cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
 
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.locator('[data-test="Espresso_Con Panna"]').click();
  await page.locator('[data-test="checkout"]').click();

  // check that the selected items are present in the cart preview
  await expect(page.locator('.cart-preview')).toContainText('Cafe Breve');
  await expect(page.locator('.cart-preview')).toContainText('Espresso Con Panna');

  // fill out checkout form
  await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  // check for success message after payment
  await expect(page.locator('.snackbar.success'))
    .toContainText('Thanks for your purchase', { timeout: 10000 });
});


