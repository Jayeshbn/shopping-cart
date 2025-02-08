import React from 'react';
import { ShoppingCart } from 'lucide-react';

const AVAILABLE_PRODUCTS = ['cheerios', 'cornflakes', 'frosties', 'shreddies', 'weetabix'];

const PRODUCT_PRICES: Record<string, number> = {
  cheerios: 3.00,
  cornflakes: 2.50,
  frosties: 10.00,
  shreddies: 12.00,
  weetabix: 5.50
};

const PRODUCT_IMAGES: Record<string, string> = {
  cheerios: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&w=600&q=80',
  cornflakes: 'https://images.unsplash.com/photo-1614961234274-f204d01c115e?auto=format&fit=crop&w=600&q=80',
  frosties: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?auto=format&fit=crop&w=600&q=80',
  shreddies: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&q=80',
  weetabix: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&w=600&q=80'
};

interface ProductListProps {
  onAddToCart: (productName: string, quantity: number) => Promise<void>;
}

export const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {AVAILABLE_PRODUCTS.map((product) => (
        <div 
          key={product} 
          className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
        >
          <div className="aspect-w-16 aspect-h-9 relative h-48 overflow-hidden">
            <img
              src={PRODUCT_IMAGES[product]}
              alt={product}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold capitalize text-gray-800">{product}</h3>
              <span className="text-2xl font-bold text-green-600">
                ${PRODUCT_PRICES[product].toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => onAddToCart(product, 1)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              <ShoppingCart size={20} />
              <span className="font-medium">Add to Cart</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};