import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Resolve API base URL from env or sensible defaults
// For physical device, set EXPO_PUBLIC_API_URL to http://YOUR_PC_IP:5000/api
const ENV_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const DEFAULT_ANDROID_EMULATOR_URL = 'http://10.0.2.2:5000/api';
const FALLBACK_URL = DEFAULT_ANDROID_EMULATOR_URL;

export const BASE_URL = ENV_BASE_URL || FALLBACK_URL;
export const BASE_ORIGIN = BASE_URL.replace(/\/?api\/?$/, '');

export const buildImageUrl = (maybeRelativeUrl) => {
  if (!maybeRelativeUrl) return undefined;
  if (/^https?:\/\//i.test(maybeRelativeUrl)) return maybeRelativeUrl;
  const normalizedPath = String(maybeRelativeUrl).replace(/^\//, '');
  return `${BASE_ORIGIN}/${normalizedPath}`;
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products', { params: { search: query } }),
  getByCategory: (category) => api.get('/products', { params: { category } }),
  create: (productData) => api.post('/products', productData),
  update: (id, productData) => api.put(`/products/${id}`, productData),
  delete: (id) => api.delete(`/products/${id}`),
  addReview: (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (itemData) => api.post('/cart', itemData),
  updateCartItem: (itemId, quantity) => api.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

// Orders API
export const ordersAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getUserOrders: () => api.get('/orders'),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getSellerOrders: () => api.get('/orders/seller/orders'),
  markAsPaid: (id) => api.put(`/orders/${id}/pay`),
  markAsDelivered: (id) => api.put(`/orders/${id}/deliver`),
};

// Upload API
export const uploadAPI = {
  uploadImage: (formData) => api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api;
