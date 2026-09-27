import { test, expect } from '@playwright/test';

test.describe('Coffee Cart: Shopping Cart & Order Total Calculation (CSS Selectors)', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Precondition: Navigate to Coffee Cart app', async () => {
      await page.goto('https://coffee-cart.app/');
    });
  });

  /**
   * TEST CASE 1: TC-01
   * Scenario: Verify correct total price calculation in cart
   */
  test('TC-01: Displays correct total price when multiple items are added ($18 + $8 = $26.00)', async ({ page }) => {
    await test.step('Step 1: Add Flat White ($18) and Mocha ($8) to cart', async () => {
      await page.locator('[data-test="Flat_White"]').click();
      await page.locator('[data-test="Mocha"]').click();
    });

    await test.step('Step 2: Open cart preview', async () => {
      await page.locator('[data-test="checkout"]').click();
    });

    await test.step('Step 3: Verify pay button is visible and displays total $26.00', async () => {
      const payButton = page.locator('button.pay');
      await expect(payButton, 'Payment button should be visible').toBeVisible();
      await expect(payButton, 'Total price should be $26.00').toHaveText('Total: $26.00');
    });
  });

  /**
   * TEST CASE 2: TC-02
   * Scenario: Added items are displayed in cart and user can submit order
   */
  test('TC-02: Added items are displayed in cart preview and order form can be submitted', async ({ page }) => {
    await test.step('Step 1: Add Cafe Breve and Espresso Con Panna to cart', async () => {
      await page.locator('[data-test="Cafe_Breve"]').click();
      await page.locator('[data-test="Espresso_Con Panna"]').click();
    });

    await test.step('Step 2: Open checkout modal and verify items in cart preview', async () => {
      await page.locator('[data-test="checkout"]').click();
      const cartPreview = page.locator('.cart-preview');
      await expect(cartPreview).toContainText('Cafe Breve');
      await expect(cartPreview).toContainText('Espresso Con Panna');
    });

    await test.step('Step 3: Fill checkout form using CSS ID selectors and submit', async () => {
      // Replaced getByRole with clean CSS ID selectors #name, #email, #submit-payment
      await page.locator('#name').fill('Test User');
      await page.locator('#email').fill('test@example.com');
      await page.locator('#submit-payment').click();
    });

    await test.step('Step 4: Verify success message', async () => {
      await expect(page.locator('.snackbar.success'))
        .toContainText('Thanks for your purchase', { timeout: 10000 });
    });
  });

  /**
   * TEST CASE 3: TC-03
   * Scenario: User can successfully submit order with user credentials
   */
  test('TC-03: User can successfully submit order', async ({ page }) => {
    await test.step('Step 1: Select Espresso Macchiato and Americano', async () => {
      await page.locator('[data-test="Espresso_Macchiato"]').click();
      await page.locator('[data-test="Americano"]').click();
    });

    await test.step('Step 2: Proceed to checkout', async () => {
      await page.locator('[data-test="checkout"]').click();
    });

    await test.step('Step 3: Fill payment credentials via CSS selectors and submit', async () => {
      await page.locator('#name').fill('test');
      await page.locator('#email').fill('test@gmail.com');
      await page.locator('#submit-payment').click();
    });

    await test.step('Step 4: Verify purchase success notification', async () => {
      await expect(page.locator('.snackbar.success'))
        .toContainText('Thanks for your purchase', { timeout: 10000 });
    });
  });

  /**
   * TEST CASE 4: TC-04
   * Scenario: Lucky Day discount promo modal is displayed after adding 3 coffees
   */
  test('TC-04: Lucky Day discount modal is displayed and discounted item added', async ({ page }) => {
    await test.step('Step 1: Add 3 drinks to trigger Lucky Day discount modal', async () => {
      await page.locator('[data-test="Espresso_Macchiato"]').click();
      await page.locator('[data-test="Cappuccino"]').click();
      await page.locator('[data-test="Espresso"]').click();
    });

    await test.step('Step 2: Confirm discount promo using CSS selector button.yes', async () => {
      // Replaced getByRole('button', { name: 'Yes, of course!' }) with CSS button.yes
      await page.locator('button.yes').click();
    });

    await test.step('Step 3: Verify discounted item is added to cart preview', async () => {
      await expect(page.locator('.cart-preview'))
        .toContainText('(Discounted) Mocha', { timeout: 5000 });
    });

    await test.step('Step 4: Complete checkout and verify success message', async () => {
      await page.locator('[data-test="checkout"]').click();
      await page.locator('#name').fill('Test User');
      await page.locator('#email').fill('test@example.com');
      await page.locator('#submit-payment').click();

      await expect(page.locator('.snackbar.success'))
        .toContainText('Thanks for your purchase', { timeout: 10000 });
    });
  });

  /**
   * TEST CASE 5: TC-05
   * Scenario: User can remove item from cart
   */
  test('TC-05: User can decrease/remove item quantity from cart', async ({ page }) => {
    await test.step('Step 1: Add coffee items including 2 Americanos', async () => {
      await page.locator('[data-test="Espresso"]').click();
      await page.locator('[data-test="Espresso_Macchiato"]').click();
      await page.locator('[data-test="Espresso_Con Panna"]').click();
      await page.locator('button.yes').click();

      await page.locator('[data-test="Americano"]').click();
      await page.locator('[data-test="Americano"]').click();
    });

    await test.step('Step 2: Hover over checkout button to display cart preview popup', async () => {
      // Hovering pay-container / checkout makes .cart-preview visible
      await page.locator('.pay-container').hover();
      const cartPreview = page.locator('.cart-preview');
      await expect(cartPreview).toBeVisible();

      // Find Americano item row in cart preview
      const americanoRow = cartPreview.locator('li').filter({ hasText: 'Americano' });
      await expect(americanoRow.locator('.unit-desc')).toHaveText(' x 2');

      // Click remove button using CSS attribute selector button[aria-label="Remove one Americano"]
      const removeButton = americanoRow.locator('button[aria-label="Remove one Americano"]');
      await expect(removeButton).toBeVisible();
      await removeButton.click();

      // Verify quantity decreased to 1
      await expect(americanoRow.locator('.unit-desc')).toHaveText(' x 1');
    });
  });

});