import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// User ผู้ใช้ทั่วไป
// ดึงสถานที่ทั้งหมด
export const getAllFetchTourismData = async () => {
  try {
    const response = await api.get('/place');
    return Array.isArray(response.data) ? response.data : [];
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
    const tourismData = response.data;
    tourismData.image_path = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${tourismData.image_path}`;
    return tourismData;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

export const getNearbyFetchTourismData = async (id, radius = 1500) => {
  try {
    const response = await api.get(`/place/${id}/nearby?radius=${radius}`);
    const { entity, nearbyEntities } = response.data;

    // Update the image path for the main entity
    entity.image_path = entity.image_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${entity.image_path}` : '';

    // Update the image paths for nearby entities
    nearbyEntities.forEach(entity => {
      if (entity.image_path) {
        entity.image_path = entity.image_path.split(',').map(path => `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${path}`);
      }
    });

    return { entity, nearbyEntities };
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};
// ดึงสถานที่ตามหมวดหมู่
export const getFetchTourismDataByCategory = async (id) => {
  try {
    const response = await api.get(`/place/category/${id}`);
    return Array.isArray(response.data) ? response.data.map(entity => ({
      ...entity,
      image_path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${entity.image_path}`
    })) : [];
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามอำเภอ
export const getFetchTourismDataByDistrict = async (id) => {
  try {
    const response = await api.get(`/districts/${id}/place`);
    return Array.isArray(response.data) ? response.data.map(entity => ({
      ...entity,
      image_path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${entity.image_path}`
    })) : [];
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

// ดึงสถานที่ตามฤดูกาล
export const getFetchTourismDataBySeason = async (id) => {
  try {
    const response = await api.get(`/season/${id}/place`);
    return Array.isArray(response.data) ? response.data.map(entity => ({
      ...entity,
      image_path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${entity.image_path}`
    })) : [];
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

export const getTourismDataByOperatingHours = async (day_of_week, opening_time, closing_time) => {
  try {
    const response = await api.get(`/operating-hours/${day_of_week}/${opening_time}/${closing_time}`, {
      params: {
        day_of_week,
        opening_time,
        closing_time
      }
    });
    return Array.isArray(response.data) ? response.data.map(entity => ({
      ...entity,
      image_path: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${entity.image_path}`
    })) : [];
  } catch (error) {
    console.error('Error fetching tourism data by operating hours:', error);
    throw error;
  }
};
