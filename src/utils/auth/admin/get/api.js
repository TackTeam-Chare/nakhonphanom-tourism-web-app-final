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

export const getPlaces = async () => {
    try {
        const token = getToken();
        const response = await auth.get('/admin/place', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = Array.isArray(response.data) ? response.data : [];

        return data.map(place => ({
            ...place,
            image_url: place.image_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${place.image_path}` : null,
        }));
    } catch (error) {
        console.error('Error fetching places:', error);
        throw error;
    }
};

export const getPlaceImages = async () => {
    try {
        const token = getToken();
        const response = await auth.get('/admin/images', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = Array.isArray(response.data) ? response.data : [];

        return data.map(place => ({
            ...place,
            image_url: place.image_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${place.image_path}` : null,
        }));
    } catch (error) {
        console.error('Error fetching places:', error);
        throw error;
    }
};

export const getPlaceById = async (id) => {
    try {
      const token = getToken();
      const response = await auth.get(`/admin/place/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const place = response.data;

      if (place && Array.isArray(place.images)) {
        place.images = place.images.map(image => ({
          ...image,
          image_url: image.image_path ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${image.image_path}` : null,
        }));
      }

      return place;
    } catch (error) {
      console.error('Error fetching tourist entity:', error);
      throw error;
    }
  };

export const getPlaceImagesById = async (id) => {
    try {
      const token = getToken();
      const response = await auth.get(`/admin/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tourist entity:', error);
      throw error;
    }
  };


export const getSeasons = async () => {
    try {
        const token = getToken();
        const response = await auth.get('/admin/seasons', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching seasons:', error);
        throw error;
    }
};

export const getSeasonById = async (id) => {
    try {
        const token = getToken();
        const response = await auth.get(`/admin/seasons/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching season by ID:', error);
        throw error;
    }
};

export const getAllSeasonsRelations = async () => {
    try {
        const token = getToken();
        const response = await auth.get('/admin/seasons-relation', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching seasons relations:', error);
        throw error;
    }
};

export const getSeasonsRelationById = async (id) => {
    try {
        const token = getToken();
        const response = await auth.get(`/admin/seasons-relation/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching seasons relation:', error);
        throw error;
    }
};

export const getDistricts = async () => {
    try {
        const token = getToken();
        const response = await auth.get('/admin/districts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
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
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tourism data:', error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const token = getToken();
        const response = await auth.get(`/admin/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
};

export const getDistrictById = async (id) => {
    try {
        const token = getToken();
        const response = await auth.get(`/admin/districts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching district by ID:', error);
        throw error;
    }
};

export const getAllOperatingHours = async () => {
    try {
        const token = getToken();
        const response = await auth.get('/admin/time', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching operating hours:', error);
        throw error;
    }
};

export const getOperatingHoursById = async (id) => {
    try {
        const token = getToken();
        const response = await auth.get(`/admin/time/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching operating hour:', error);
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

export const getFetchTourismDataById = async (id) => {
    try {
      const token = getToken();
      const response = await auth.get(`/admin/place/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };

  export const getNearbyFetchTourismData = async (id) => {
    try {
      const token = getToken();
      const response = await auth.get(`/admin/place/${id}/nearby`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  
  export const getFetchTourismDataByCategory = async (categoryId) => {
    try {
      const token = getToken();
      const response = await auth.get(`/admin/category/${categoryId}/place`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  

// Fetch tourism data by district
export const getFetchTourismDataByDistrict = async (districtId) => {
    try {
      const token = getToken();
      const response = await auth.get(`/admin/district/${districtId}/place`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };
  export const getFetchTourismDataBySeason = async (seasonId) => {
    try {
      const token = getToken();
      const response = await auth.get(`/admin/season/${seasonId}/place`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tourism data:', error);
      throw error;
    }
  };