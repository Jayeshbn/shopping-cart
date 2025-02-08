import React from 'react';
import { useCart } from './hooks/useCart';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { ShoppingBag, Github, Mail, Phone } from 'lucide-react';

function App() {
  const { items, totals, loading, addToCart, removeFromCart } = useCart();

  const handleAddToCart = async (productName: string, quantity: number) => {
    try {
      await addToCart(productName, quantity);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-white shadow-lg backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Shopping Cart
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              Available Products
            </h2>
            <ProductList onAddToCart={handleAddToCart} />
          </div>
          
          <div className="lg:col-span-1 lg:sticky lg:top-24 lg:h-fit">
            {loading ? (
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading cart...</p>
              </div>
            ) : (
              <Cart 
                items={items} 
                totals={totals} 
                onRemoveItem={handleRemoveFromCart}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-lg mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Jayesh BN</h3>
              <p className="text-gray-600 text-lg">Full Stack Developer</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a 
                href="tel:9148390903" 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              >
                <Phone size={20} />
                <span>+91 9148390903</span>
              </a>
              <a 
                href="mailto:jayeshbn10@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              >
                <Mail size={20} />
                <span>jayeshbn10@gmail.com</span>
              </a>
              <a 
                href="https://github.com/Jayeshbn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;