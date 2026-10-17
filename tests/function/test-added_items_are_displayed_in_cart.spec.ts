import { test, expect } from '@playwright/test';
import {
  openCoffeeCart,
  addCoffeeToCart,
  openCart,
  fillCheckoutForm,
  submitOrder,
} from './page-actions';

test('added_items_are_displayed_in_cart', async ({ page }) => {
  await openCoffeeCart(page);

  // Додаємо вибрані товари
  await addCoffeeToCart(page, 'Cafe_Breve');
  await addCoffeeToCart(page, 'Espresso_Con Panna');
  await openCart(page);

  // Перевірки залишаються в тесті
  await expect(page.locator('.cart-preview')).toContainText('Cafe Breve');
  await expect(page.locator('.cart-preview')).toContainText('Espresso Con Panna');

  // Заповнюємо форму та відправляємо замовлення
  await fillCheckoutForm(page, 'Test User', 'test@example.com');
  await submitOrder(page);

  // Перевірка фінального повідомлення
  await expect(page.locator('.snackbar.success'))
    .toContainText('Thanks for your purchase', { timeout: 10000 });
});