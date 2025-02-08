import React from 'react';
import { CartItem, CartTotals } from '../types/cart';
import { Trash2, ShoppingCart } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  totals: CartTotals;
  onRemoveItem?: (itemId: string) => Promise<void>;
}

export const Cart: React.FC<CartProps> = ({ items, totals, onRemoveItem }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingCart className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
      </div>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-colors"
              >
                <div>
                  <p className="font-medium capitalize text-gray-800">{item.product_name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium text-gray-800">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                  {onRemoveItem && (
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-300 p-2 rounded-lg"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p className="font-medium">${totals.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>Tax (12.5%)</p>
              <p className="font-medium">${totals.tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
              <p className="text-lg font-bold text-gray-800">Total</p>
              <p className="text-lg font-bold text-green-600">
                ${totals.total.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};