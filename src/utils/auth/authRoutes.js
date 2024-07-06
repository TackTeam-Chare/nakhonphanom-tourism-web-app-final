
import axios from 'axios';


const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Auth Admin

export const Login = async () => {
  try {
    const response = await auth.post('/auth/login');
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

export const Register = async () => {
  try {
    const response = await auth.post('/auth/register');
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await auth.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// Fetch tourism data
export const getAllFetchTourismData = async () => {
  try {
    const response = await auth.get('/admin/tourist-entities'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};


// Fetch tourism data by ID
export const getFetchTourismDataById = async (id) => {
  try {
    const response = await auth.get(`/admin/tourist-entities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};


export const getNearbyFetchTourismData = async () => {
  try {
    const response = await auth.get(`/admin/tourist-entities/${id}/nearby`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามหมวดหมู่
export const getFetchTourismDataByCategory = async () => {
  try {
    const response = await auth.get(`/admin/tourist-entities/category/:${categoryId}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามอำเภอ
export const getFetchTourismDataByDistrict = async () => {
  try {
    const response = await auth.get(`/admin/tourist-entities/district/:${districtId}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามฤดูกาล
export const getFetchTourismDataBySeason = async () => {
  try {
    const response = await auth.get( `/admin/tourist-entities/season/:${seasonId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};


