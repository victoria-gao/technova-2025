import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API utility functions
export const apiService = {
  // User endpoints
  signup: async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/signup', userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  getUser: async (userId: string) => {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: string, profileData: any) => {
    const response = await api.put(`/user/${userId}/profile`, profileData);
    return response.data;
  },

  // Item endpoints
  createItem: async (itemData: any) => {
    const response = await api.post('/items', itemData);
    return response.data;
  },

  getItems: async (userId: string) => {
    const response = await api.get(`/items?user_id=${userId}`);
    return response.data;
  },

  getUserItems: async (userId: string) => {
    const response = await api.get(`/items/user/${userId}`);
    return response.data;
  },

  getItem: async (itemId: string) => {
    const response = await api.get(`/items/${itemId}`);
    return response.data;
  },

  likeItem: async (itemId: string, userId: string) => {
    const response = await api.post(`/items/${itemId}/like`, { user_id: userId });
    return response.data;
  },

  passItem: async (itemId: string, userId: string) => {
    const response = await api.post(`/items/${itemId}/pass`, { user_id: userId });
    return response.data;
  },

  getLikedItems: async (userId: string) => {
    const response = await api.get(`/items/liked/${userId}`);
    return response.data;
  },

  getMatches: async (userId: string) => {
    const response = await api.get(`/items/matches/${userId}`);
    return response.data;
  },

  // Image upload
  uploadImage: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post('/items/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Exchange endpoints
  getUserExchanges: async (userId: string) => {
    const response = await api.get(`/exchanges/user/${userId}`);
    return response.data;
  },

  createExchange: async (exchangeData: any) => {
    const response = await api.post('/exchanges', exchangeData);
    return response.data;
  },

  completeExchange: async (exchangeId: string) => {
    const response = await api.post(`/exchanges/${exchangeId}/complete`);
    return response.data;
  },
};

export default apiService;
