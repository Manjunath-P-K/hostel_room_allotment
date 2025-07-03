import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Auth credentials
const AUTH_CREDENTIALS = {
  username: 'admin',
  password: 'hostel123'
};

// Add auth header for admin requests
api.interceptors.request.use((config) => {
  if (config.url?.includes('/admin/')) {
    const storedAuth = sessionStorage.getItem('adminAuth');
    if (storedAuth) {
      config.headers.Authorization = `Basic ${storedAuth}`;
    } else {
      // Fallback to hardcoded credentials if no session
      const token = btoa(`${AUTH_CREDENTIALS.username}:${AUTH_CREDENTIALS.password}`);
      config.headers.Authorization = `Basic ${token}`;
    }
  }
  return config;
});

// API endpoints
export const apiService = {
  // Public endpoints
  getApiInfo: () => api.get('/'),
  getPublicAllotmentData: () => api.get('/global/allotment-data'),
  getPublicRoomStatus: () => api.get('/global/room-status'),
  
  // Admin endpoints
  uploadExcel: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/admin/upload-excel', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  uploadFeePhotos: (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return api.post('/admin/upload-fee-photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getAllotmentData: () => api.get('/admin/allotment-data'),
  
  getRoomStatus: () => api.get('/admin/room-status'),
  
  resetAllotment: () => api.post('/admin/reset-allotment'),
  
  getUploadedFiles: () => api.get('/admin/uploads'),
};

const API_BASE = '';

function getAuthHeader() {
  const auth = sessionStorage.getItem('adminAuth');
  return auth ? { 'Authorization': 'Basic ' + auth } : {};
}

export async function fetchAdmin(endpoint, options = {}) {
  return fetch(API_BASE + endpoint, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...getAuthHeader(),
    },
  });
}

export default api;
