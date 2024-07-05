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
export const getFetchTourismDataById = async () => {
  try {
    const response = await api.get('/tourist-entities:id'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่เเต่ละไอดี
export const getNearbyFetchTourismData = async () => {
  try {
    const response = await api.get('/tourist-entities:id/nearby'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามหมวดหมู่
export const getFetchTourismDataByCategory = async () => {
  try {
    const response = await api.get('/tourist-entities/category/:categoryId'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};
// ดึงสถานที่ตามอำเภอ
export const getFetchTourismDataByDistrict = async () => {
  try {
    const response = await api.get('/tourist-entities/district/:districtId'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามอำเภอ
export const getFetchTourismDataBySeason = async () => {
  try {
    const response = await api.get('/tourist-entities/district/:districtId'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};
