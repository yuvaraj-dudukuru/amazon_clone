import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const initialState = {
  items: [],
  totalAmount: 0,
  loading: false,
  error: null
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'CART_SUCCESS':
      return {
        ...state,
        items: action.payload.items || [],
        totalAmount: action.payload.totalAmount || 0,
        loading: false,
        error: null
      };
    case 'CART_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        loading: false
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        loading: false
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        loading: false
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalAmount: 0,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated]);

  // Load cart from server
  const loadCart = async () => {
    if (!isAuthenticated) return;

    try {
      dispatch({ type: 'CART_START' });
      const response = await axios.get('/api/cart');
      
      dispatch({
        type: 'CART_SUCCESS',
        payload: {
          items: response.data.data.items,
          totalAmount: response.data.data.totalAmount
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to load cart';
      dispatch({
        type: 'CART_FAIL',
        payload: message
      });
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return { success: false };
    }

    try {
      dispatch({ type: 'CART_START' });
      const response = await axios.post('/api/cart', {
        productId,
        quantity
      });
      
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          items: response.data.data.items,
          totalAmount: response.data.data.totalAmount
        }
      });

      toast.success('Item added to cart!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add item to cart';
      dispatch({
        type: 'CART_FAIL',
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    if (!isAuthenticated) return { success: false };

    try {
      dispatch({ type: 'CART_START' });
      const response = await axios.put(`/api/cart/${itemId}`, {
        quantity
      });
      
      dispatch({
        type: 'UPDATE_CART_ITEM',
        payload: {
          items: response.data.data.items,
          totalAmount: response.data.data.totalAmount
        }
      });

      toast.success('Cart updated!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update cart';
      dispatch({
        type: 'CART_FAIL',
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return { success: false };

    try {
      dispatch({ type: 'CART_START' });
      const response = await axios.delete(`/api/cart/${itemId}`);
      
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: {
          items: response.data.data.items,
          totalAmount: response.data.data.totalAmount
        }
      });

      toast.success('Item removed from cart!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to remove item from cart';
      dispatch({
        type: 'CART_FAIL',
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!isAuthenticated) return { success: false };

    try {
      dispatch({ type: 'CART_START' });
      await axios.delete('/api/cart');
      
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to clear cart';
      dispatch({
        type: 'CART_FAIL',
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Get cart item count
  const getCartItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.product._id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    items: state.items,
    totalAmount: state.totalAmount,
    loading: state.loading,
    error: state.error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    getCartItemCount,
    isInCart,
    getItemQuantity,
    clearError
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 