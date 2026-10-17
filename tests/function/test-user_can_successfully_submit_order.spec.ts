import { test, expect } from '@playwright/test';
import {
  openCoffeeCart,
  addCoffeeToCart,
  openCart,
  fillCheckoutForm,
  submitOrder,
} from './page-actions';

test('user_can_successfully_submit_order', async ({ page }) => {
  await openCoffeeCart(page);

  await addCoffeeToCart(page, 'Espresso_Macchiato');
  await addCoffeeToCart(page, 'Americano');
  await openCart(page);

  await fillCheckoutForm(page, 'test', 'test@gmail.com');
  await submitOrder(page);

  await expect(page.locator('.snackbar.success'))
    .toContainText('Thanks for your purchase', { timeout: 10000 });
});