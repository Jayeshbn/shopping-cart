import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CartItem, CartTotals } from '../types/cart';

const TAX_RATE = 0.125; // 12.5%

const calculateTotals = (items: CartItem[]): CartTotals => {
  // Calculate subtotal (sum of all items)
  const subtotal = Math.ceil(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
  ) / 100;

  // Calculate tax (12.5% of subtotal), rounded up
  const tax = Math.ceil(subtotal * TAX_RATE * 100) / 100;

  // Calculate total (subtotal + tax), rounded up
  const total = Math.ceil((subtotal + tax) * 100) / 100;

  return {
    subtotal,
    tax,
    total,
  };
};

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totals, setTotals] = useState<CartTotals>({ subtotal: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
  }, []);

  useEffect(() => {
    setTotals(calculateTotals(items));
  }, [items]);

  const loadCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productName: string, quantity: number) => {
    try {
      setLoading(true);
      
      // Get price from our static price list
      const PRODUCT_PRICES: Record<string, number> = {
        cheerios: 3.00,
        cornflakes: 2.50,
        frosties: 10.00,
        shreddies: 12.00,
        weetabix: 5.50
      };
      
      const price = PRODUCT_PRICES[productName];
      
      // Check for existing item
      const existingItem = items.find(item => item.product_name === productName);
      
      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            product_name: productName,
            quantity,
            price
          });

        if (error) throw error;
      }

      await loadCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await loadCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    totals,
    loading,
    addToCart,
    removeFromCart,
    refreshCart: loadCartItems,
  };
};