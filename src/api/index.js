const API_URL = import.meta.env.VITE_API_URL || 'https://cryptoapp-richard.onrender.com';

// Auth API calls
export const register = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, message: 'Server error. Is backend running?' };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    
    // Store token if login successful
    if (data.success && data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  } catch (error) {
    return { success: false, message: 'Server error. Is backend running?' };
  }
};

export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/api/auth/profile`, {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
  });
  return response.json();
};

// Crypto API calls
export const getAllCrypto = async () => {
  const response = await fetch(`${API_URL}/api/crypto`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
};

export const getGainers = async () => {
  const response = await fetch(`${API_URL}/api/crypto/gainers`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
};

export const getNewListings = async () => {
  const response = await fetch(`${API_URL}/api/crypto/new`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
};

export const addCrypto = async (cryptoData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/api/crypto`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include',
    body: JSON.stringify(cryptoData),
  });
  return response.json();
};
