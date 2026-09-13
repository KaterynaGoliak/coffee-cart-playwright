import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
 
  await page.locator('[data-test="Cafe_Breve"]').click();
  await page.locator('[data-test="Espresso_Con Panna"]').click();
  await page.locator('[data-test="checkout"]').click();

  // перевірка товарів у кошику
  await expect(page.locator('.cart-preview')).toContainText('Cafe Breve');
  await expect(page.locator('.cart-preview')).toContainText('Espresso Con Panna');

  // ✅ заповнюємо форму
  await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  // ✅ тепер перевіряємо повідомлення
  await expect(page.locator('.snackbar.success'))
    .toContainText('Thanks for your purchase', { timeout: 10000 });
});


