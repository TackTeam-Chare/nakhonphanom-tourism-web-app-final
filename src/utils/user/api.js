// utils/api.js
import axios from 'axios';


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// User ผู้ใช้ทั่วไป
// ดึงสถานที่ทั้งหมด
export const getAllFetchTourismData = async () => {
  try {
    const response = await api.get('/place'); 
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
    const response = await api.get(`/place/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// Fetch nearby tourism entities for a specific entity ID
export const getNearbyFetchTourismData = async (id, radius = 1500) => {
  try {
    const response = await api.get(`/place/${id}/nearby?radius=${radius}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};




// ดึงสถานที่ตามหมวดหมู่
export const getFetchTourismDataByCategory = async (id) => {
  try {
    const response = await api.get(`/place/category/${id}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามอำเภอ
export const getFetchTourismDataByDistrict = async (id) => {
  try {
    const response = await api.get(`/districts/${id}/place`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามฤดูกาล
export const getFetchTourismDataBySeason = async (id) => {
  try {
    const response = await api.get( `/season/${id}/place`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};


export  const getTourismDataByOperatingHours = async (day_of_week, opening_time, closing_time) => {
  try {
    const response = await api.get(`/operating-hours/${day_of_week}/${opening_time}/${closing_time}`, {
      params: {
        day_of_week,
        opening_time,
        closing_time
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data by operating hours:', error);
    throw error;
  }
};
