import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuCategories } from './components/MenuCategories';
import { MenuGrid } from './components/MenuGrid';
import { Cart } from './components/Cart';
import { AuthModal } from './components/AuthModal';
import { OrderHistory } from './components/OrderHistory';
import { ChatBot } from './components/ChatBot';
import { CheckoutModal } from './components/CheckoutModal';
import { MessageCircle } from 'lucide-react';
import { menuItems, categories } from './data/menuData';
import { User, CartItem, Order, MenuItem } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('foodieUser');
    const savedCart = localStorage.getItem('foodieCart');
    const savedOrders = localStorage.getItem('foodieOrders');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodieCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('foodieOrders', JSON.stringify(orders));
  }, [orders]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('foodieUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodieUser');
    }
  }, [user]);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleLogin = (email: string, password: string) => {
    // Simulate login - in real app, this would call an API
    const newUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
    };
    setUser(newUser);
    setIsAuthOpen(false);
  };

  const handleSignup = (name: string, email: string, phone: string, password: string) => {
    // Simulate signup - in real app, this would call an API
    const newUser: User = {
      id: '1',
      name,
      email,
      phone,
    };
    setUser(newUser);
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setOrders([]);
    localStorage.removeItem('foodieUser');
    localStorage.removeItem('foodieCart');
    localStorage.removeItem('foodieOrders');
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = (orderDetails: any) => {
    if (!user) return;

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: user.id,
      items: cartItems,
      total: orderDetails.total,
      status: 'confirmed',
      orderDate: new Date(),
      deliveryAddress: orderDetails.deliveryAddress,
      paymentStatus: orderDetails.paymentMethod === 'razorpay' ? 'completed' : 'pending'
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    
    // Simulate order status updates
    setTimeout(() => {
      setOrders(prev => 
        prev.map(order => 
          order.id === newOrder.id ? { ...order, status: 'preparing' } : order
        )
      );
    }, 30000);

    setTimeout(() => {
      setOrders(prev => 
        prev.map(order => 
          order.id === newOrder.id ? { ...order, status: 'out-for-delivery' } : order
        )
      );
    }, 60000);
  };

  const handleOrderNow = () => {
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartItems={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <Hero onOrderNow={handleOrderNow} />

      <div id="menu-section">
        <MenuCategories
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />

        <MenuGrid
          items={filteredItems}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Show user's orders button */}
      {user && orders.length > 0 && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={() => setIsOrdersOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
          >
            My Orders ({orders.length})
          </button>
        </div>
      )}

      {/* Floating AI Chatbot */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <OrderHistory
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      <ChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartTotal}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}

export default App;