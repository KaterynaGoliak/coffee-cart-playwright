import { test, expect } from '@playwright/test';

test.use({
  viewport: { height: 620, width: 1100 }
});

test('check_lucky_day', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Espresso"]').click();

  // підтвердження Lucky Day
  await page.getByRole('button', { name: 'Yes, of course!' }).click();

  // ✅ перевірка, що бонусний товар "(Discounted) Mocha" з’явився у кошику
  await expect(page.locator('.cart-preview'))
    .toContainText('(Discounted) Mocha', { timeout: 5000 });

  // checkout
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Test User');
  await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
  await page.getByRole('button', { name: 'Submit' }).click();

  // ✅ перевірка повідомлення про покупку
  await expect(page.locator('.snackbar.success'))
    .toContainText('Thanks for your purchase', { timeout: 10000 });
});
