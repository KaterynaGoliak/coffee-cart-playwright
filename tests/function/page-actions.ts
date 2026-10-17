import { Page } from '@playwright/test';

/**
 * Відкрити головну сторінку магазину Coffee Cart
 */
export async function openCoffeeCart(page: Page) {
  await page.goto('https://coffee-cart.app/');
}

/**
 * Додати напій у кошик за його назвою (data-test)
 * @param coffeeName назва напою, наприклад: 'Cafe_Breve', 'Americano'
 */
export async function addCoffeeToCart(page: Page, coffeeName: string) {
  await page.locator(`[data-test="${coffeeName}"]`).click();
}

/**
 * Відкрити модальне вікно або сторінку Checkout
 */
export async function openCart(page: Page) {
  await page.locator('[data-test="checkout"]').click();
}

/**
 * Об'єднана дія: заповнення полів імені та email у формі чекауту
 */
export async function fillCheckoutForm(page: Page, name: string, email: string) {
  await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
}

/**
 * Підтвердити та відправити замовлення
 */
export async function submitOrder(page: Page) {
  await page.getByRole('button', { name: 'Submit' }).click();
}