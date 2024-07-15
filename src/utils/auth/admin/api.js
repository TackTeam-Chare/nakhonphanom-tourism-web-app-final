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


export const getAllFetchTourismData = async () => {
    try {
      const token = getToken();
      const response = await auth.get('/admin/place', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
export const getDistricts = async () => {
  try {
    const token = getToken();
    const response = await auth.get('/admin/districts', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const token = getToken();
    const response = await auth.get('/admin/categories', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ...other functions

  
  // Fetch tourism data by ID
  export const getFetchTourismDataById = async (id) => {
    try {
      const response = await auth.get(`/admin/place/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  
  // Fetch nearby tourism data
  export const getNearbyFetchTourismData = async (id) => {
    try {
      const response = await auth.get(`/admin/place/${id}/nearby`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  
  // Fetch tourism data by category
  export const getFetchTourismDataByCategory = async (categoryId) => {
    try {
      const response = await auth.get(`/admin/category/${categoryId}/place`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  
  // Fetch tourism data by district
  export const getFetchTourismDataByDistrict = async (districtId) => {
    try {
      const response = await auth.get(`/admin/district/${districtId}/place`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  
  // Fetch tourism data by season
  export const getFetchTourismDataBySeason = async (seasonId) => {
    try {
      const response = await auth.get(`/admin/season/${seasonId}/place`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  