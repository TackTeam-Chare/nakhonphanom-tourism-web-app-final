import axios from 'axios';

const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const login = async (data) => {
  try {
    const response = await auth.post('/auth/login', data);
    // Save token to localStorage
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const verifyPassword = async (data, token) => {
  try {
    const response = await auth.post('/auth/verify-password', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};

// Fetch profile
export const getProfile = async (token) => {
  try {
    const response = await auth.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Update profile
export const updateProfile = async (data, token) => {
  try {
    const response = await auth.put('/auth/profile', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await auth.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};


export const logout = async (token) => {
  try {
    const response = await auth.post('/auth/logout', null, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};



// Fetch tourism data
export const getAllFetchTourismData = async () => {
  try {
    const response = await auth.get('/admin/place');
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

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
