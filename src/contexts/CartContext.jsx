import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart(parsed);
        console.log('[CartContext] Loaded cart from localStorage:', parsed);
      } catch (error) {
        console.error('[CartContext] Error loading cart from localStorage:', error);
        setCart([]);
      }
    } else {
      console.log('[CartContext] No cart found in localStorage, starting empty.');
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('[CartContext] Saved cart to localStorage:', cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        console.log('[CartContext] Updated quantity for product:', product.id, updated);
        return updated;
      }
      const newCart = [...prev, { ...product, quantity: 1 }];
      console.log('[CartContext] Added new product to cart:', product, newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const filtered = prev.filter((item) => item.id !== productId);
      console.log('[CartContext] Removed product from cart:', productId, filtered);
      return filtered;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      console.log('[CartContext] Updated quantity for product:', productId, quantity, updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    console.log('[CartContext] Cleared cart.');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 