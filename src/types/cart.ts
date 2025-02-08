export interface CartItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
}