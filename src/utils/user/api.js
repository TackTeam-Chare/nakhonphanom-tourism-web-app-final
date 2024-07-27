import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getAllFetchTourismData = async () => {
  try {
    const response = await api.get('/place');
    const data = Array.isArray(response.data) ? response.data : [];
    
    return data.map(place => ({
      ...place,
      image_path: place.image_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${place.image_path}` : null,
    }));
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

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

export const getNearbyFetchTourismData = async (id, radius = 5000) => {
  try {
    const response = await api.get(`/place/nearby/${id}?radius=${radius}`);
    const { entity, nearbyEntities } = response.data;

    if (entity.images) {
      entity.images = entity.images.map(img => ({
        ...img,
        image_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${img.image_path}`
      }));
    }

    nearbyEntities.forEach(ent => {
      if (ent.image_path) {
        ent.image_path = ent.image_path.map(img => ({
          ...img,
          image_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${img.image_path}`
        }));
      }
    });

    return { entity, nearbyEntities };
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};

export const getFetchTourismDataByCategory = async (id) => {
  try {
    const response = await api.get(`/categories/${id}/place`);
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
    const response = await api.get(`/seasons/${id}/place`);
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
