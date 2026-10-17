import {test, expect} from '@playwright/test';

test.describe('Sortable table-Interactions', () => {
    test.beforeEach(async ({ page }) => {
    // 1. Відкриваємо сторінку лабораторії
    await page.goto('http://104.168.59.50/laboratory/interactions');
  });

  test('Перевірка роботи з чекбоксами (збільшення кількості "Вибрано")', async ({ page }) => {
    // Перевіряємо присутність блоку таблиці виключно через XPath
    const tableHeader = page.locator('xpath=//h2[text()="Sortable table"]');
    await expect(tableHeader).toBeVisible();
    // Лічильник вибраних рядків (початково має бути "Вибрано: 0")
    const selectedCount = page.locator('xpath=//span[contains(text(), "Вибрано:")]');
    await expect(selectedCount).toHaveText('Вибрано: 0');
    // Обираємо 1-й чекбокс у таблиці
    const firstCheckbox = page.locator('xpath=(//table[@data-testid="interactions-table"]//tbody//input[@type="checkbox"])[1]');
    await firstCheckbox.check();
    // Перевіряємо, що лічильник збільшився до 1
    await expect(selectedCount).toHaveText('Вибрано: 1');
    // Обираємо 2-й чекбокс у таблиці
    const secondCheckbox = page.locator('xpath=(//table[@data-testid="interactions-table"]//tbody//input[@type="checkbox"])[2]');
    await secondCheckbox.check();
    // Перевіряємо, що лічильник збільшився до 2
    await expect(selectedCount).toHaveText('Вибрано: 2');
    // Знімаємо вибір з 1-го чекбокса і перевіряємо зменшення до 1
    await firstCheckbox.uncheck();
    await expect(selectedCount).toHaveText('Вибрано: 1');
  });
  
  test('Перевірка сортування колонок і зміни порядку рядків', async ({ page }) => {
    // Таблиця
    const table = page.locator('xpath=//table[@data-testid="interactions-table"]');
    await expect(table).toBeVisible();
    // Отримуємо всі клітинки з назвами тестів (2-й стовпчик у tbody)
    const testNameCells = page.locator('xpath=//table[@data-testid="interactions-table"]//tbody/tr/td[2]');
    // За замовчуванням колонка "Тест" відсортована за зростанням (А -> Я):
    await expect(testNameCells).toHaveText([
      'Авторизація',
      'Завантаження файлу',
      'Пошук за тегом',
      'Створення статті'
    ]);
    // Клікаємо кнопку сортування в колонці "Тест" через XPath
    const sortNameBtn = page.locator('xpath=//button[contains(., "Тест")]');
    await sortNameBtn.click();
    // Перевіряємо, що порядок змінився на спадання (Я -> А):
    await expect(testNameCells).toHaveText([
      'Створення статті',
      'Пошук за тегом',
      'Завантаження файлу',
      'Авторизація'
    ]);
    // Клікаємо кнопку сортування колонки "Тривалість"
    const sortDurationBtn = page.locator('xpath=//button[contains(., "Тривалість")]');
    await sortDurationBtn.click();
    // Отримуємо клітинки зі значеннями тривалості (4-й стовпчик у tbody)
    const durationCells = page.locator('xpath=//table[@data-testid="interactions-table"]//tbody/tr/td[4]');
    // Перевіряємо сортування тривалості за зростанням (від меншого до більшого):
    await expect(durationCells).toHaveText([
      '0.0 s',
      '5.7 s',
      '8.4 s',
      '12.1 s'
    ]);
    // Клікаємо ще раз по "Тривалість" для сортування за спаданням:
    await sortDurationBtn.click();
    // Перевіряємо сортування тривалості за спаданням (від більшого до меншого):
    await expect(durationCells).toHaveText([
      '12.1 s',
      '8.4 s',
      '5.7 s',
      '0.0 s'
    ]);
  });
});