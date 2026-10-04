import { test, expect } from '@playwright/test';
// import { getVotingMessage } from './if-else';

function getVotingMessage(age: number){
  if (age >= 18) {
    return "Ви можете голосувати.";
  } else {
    return "Ви ще не можете голосувати.";
  }
}
test.describe('Перевірка можливості голосування: getVotingMessage', () => {
  // Граничні значення (17, 18, 19)
  test('Граничне значення: 17 років (перед порогом)', () => {
    expect(getVotingMessage(17)).toBe('Ви ще не можете голосувати.');
  });

  test('Граничне значення: 18 років (поріг)', () => {
    expect(getVotingMessage(18)).toBe('Ви можете голосувати.');
  });

  test('Граничне значення: 19 років (після порога)', () => {
    expect(getVotingMessage(19)).toBe('Ви можете голосувати.');
  });

  // Значення всередині класів (10, 30)
  test('Всередині класу < 18: 10 років', () => {
    expect(getVotingMessage(10)).toBe('Ви ще не можете голосувати.');
  });

  test('Всередині класу >= 18: 30 років', () => {
    expect(getVotingMessage(30)).toBe('Ви можете голосувати.');
  });
});