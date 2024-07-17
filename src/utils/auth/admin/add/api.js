// src/utils/auth/admin/api.js
import axios from 'axios';

const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Adding the token to the headers of every request
auth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to get token from localStorage
const getToken = () => localStorage.getItem('token');

export const createTouristEntity = async (data) => {
  try {
    const token = getToken();
    const response = await auth.post('/admin/place', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating tourist entity:', error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const token = getToken();
    const response = await auth.post('/admin/categories', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const createDistrict = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await auth.post('/admin/districts', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating district:', error);
    throw error;
  }
};

export const createSeason = async (data) => {
  try {
    const token = getToken();
    const response = await auth.post('/admin/seasons', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating season:', error);
    throw error;
  }
};

export const createSeasonsRelation = async (data) => {
  try {
    const token = getToken();
    const response = await auth.post('/admin/seasons-relation', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating relation:', error);
    throw error;
  }
};
export const createOperatingHours = async (data) => {
  try {
    const token = getToken();
    const response = await auth.post('/admin/time', data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating operating hours:', error);
    throw error;
  }
};


export default auth;