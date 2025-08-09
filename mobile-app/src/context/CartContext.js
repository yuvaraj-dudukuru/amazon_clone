import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../services/api';
import Toast from 'react-native-toast-message';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true);
      const response = await cartAPI.addToCart({
        productId: product._id,
        quantity,
      });
      
      setCartItems(response.data.items || []);
      
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: `${product.name} has been added to your cart`,
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await cartAPI.updateCartItem(itemId, quantity);
      setCartItems(response.data.items || []);
      
      Toast.show({
        type: 'success',
        text1: 'Cart Updated',
        text2: 'Cart item quantity updated',
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true);
      const response = await cartAPI.removeFromCart(itemId);
      setCartItems(response.data.items || []);
      
      Toast.show({
        type: 'success',
        text1: 'Removed from Cart',
        text2: 'Item has been removed from your cart',
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove from cart';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartAPI.clearCart();
      setCartItems([]);
      
      Toast.show({
        type: 'success',
        text1: 'Cart Cleared',
        text2: 'Your cart has been cleared',
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
      });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartItemById = (productId) => {
    return cartItems.find(item => item.product._id === productId);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    getCartTotal,
    getCartItemCount,
    getCartItemById,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
