// utils/api.js
import axios from 'axios';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// User ผู้ใช้ทั่วไป
// ดึงสถานที่ทั้งหมด
export const getAllFetchTourismData = async () => {
  try {
    const response = await api.get('/tourist-entities'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่เเต่ละไอดี
// Fetch tourism data by ID
export const getFetchTourismDataById = async (id) => {
  try {
    const response = await api.get(`/tourist-entities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// Fetch nearby tourism entities for a specific entity ID
export const getNearbyFetchTourismData = async (id, radius = 5000) => {
  try {
    const response = await api.get(`/tourist-entities/${id}/nearby?radius=${radius}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};




// ดึงสถานที่ตามหมวดหมู่
export const getFetchTourismDataByCategory = async (id) => {
  try {
    const response = await api.get(`/tourist-entities/category/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามอำเภอ
export const getFetchTourismDataByDistrict = async (id) => {
  try {
    const response = await api.get(`/tourist-entities/district/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามฤดูกาล
export const getFetchTourismDataBySeason = async () => {
  try {
    const response = await api.get( `/tourist-entities/season/${seasonId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};
