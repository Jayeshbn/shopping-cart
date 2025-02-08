import { expect, test, describe } from 'vitest';
import { CartItem } from '../types/cart';

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.ceil(subtotal * 0.125 * 100) / 100;
  const total = subtotal + tax;

  return {
    subtotal: Math.ceil(subtotal * 100) / 100,
    tax,
    total: Math.ceil(total * 100) / 100,
  };
};

describe('Cart Calculations', () => {
  test('calculates correct totals for example scenario', () => {
    const items: CartItem[] = [
      { id: '1', product_name: 'cornflakes', quantity: 2, price: 2.52 },
      { id: '2', product_name: 'weetabix', quantity: 1, price: 9.98 }
    ];

    const totals = calculateTotals(items);

    expect(totals.subtotal).toBe(15.02);
    expect(totals.tax).toBe(1.88);
    expect(totals.total).toBe(16.90);
  });

  test('handles empty cart', () => {
    const totals = calculateTotals([]);

    expect(totals.subtotal).toBe(0);
    expect(totals.tax).toBe(0);
    expect(totals.total).toBe(0);
  });

  test('rounds up totals correctly', () => {
    const items: CartItem[] = [
      { id: '1', product_name: 'cheerios', quantity: 1, price: 3.99 }
    ];

    const totals = calculateTotals(items);

    expect(totals.subtotal).toBe(3.99);
    expect(totals.tax).toBe(0.50); // 3.99 * 0.125 = 0.49875, rounds up to 0.50
    expect(totals.total).toBe(4.49);
  });
});