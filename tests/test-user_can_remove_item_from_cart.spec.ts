import { test, expect } from '@playwright/test';

test('user_can_remove_item_from_cart', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');

  // Add products
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Espresso_Con Panna"]').click();

  // Confirm message
  await page.getByRole('button', { name: 'Yes, of course!' }).click();

  // Add two Americanos
  await page.locator('[data-test="Americano"]').click();
  await page.locator('[data-test="Americano"]').click();

  // Open cart
  await page.locator('[data-test="checkout"]').click();

  // Wait for cart preview
  const cartPreview = page.locator('.cart-preview');
  await expect(cartPreview).toBeVisible();

  // Find Americano row
  const americanoRow = cartPreview
    .locator('li')
    .filter({ hasText: 'Americano' });

  // Verify Americano quantity is 2
  await expect(americanoRow.locator('.unit-desc')).toHaveText(' x 2');

  // Find remove button
  const removeButton = americanoRow.getByRole('button', {
    name: 'Remove one Americano'
  });

  // Verify button exists
  await expect(removeButton).toHaveCount(1);

  // Click using JavaScript
  await removeButton.evaluate((button: HTMLElement) => {
    button.click();
  });

  // Verify quantity changed to 1
  await expect(americanoRow.locator('.unit-desc')).toHaveText(' x 1');
});