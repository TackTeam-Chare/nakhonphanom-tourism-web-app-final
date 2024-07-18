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

export const updateTouristEntity = async (id, data) => {
    try {
        const token = getToken();
        const response = await auth.put(`admin/place/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating tourist entity:', error);
        throw error;
    }
};

export const updateTourismImages = async (id, data) => {
    try {
        const token = getToken();
        const response = await auth.put(`/admin/place/images/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating tourism images:', error);
        throw error;
    }
};

export const updateCategory = async (id, data) => {
    try {
        const token = getToken();
        const response = await auth.put(`/admin/categories/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

export const updateDistrict = async (id, data) => {
    try {
        const token = getToken();
        const response = await auth.put(`/admin/districts/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating district:', error);
        throw error;
    }
};


export const updateSeason = async (id, data) => {
    try {
        const token = getToken();
        const response = await auth.put(`/admin/seasons/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating season:', error);
        throw error;
    }
};

export const updateOperatingHours = async (id, data) => {
    try {
        const token = getToken();
        const response = await auth.put(`/admin/time/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating operating hour:', error);
        throw error;
    }
};

export const updateSeasonsRelation = async (id, data) => {
    try {
        const token = getToken()
        const response = await auth.put(`/admin/seasons-relation/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating seasons relation:', error);
        throw error;
    }
};

export const updateTourismEntitiesImages = async (id, data) => {
    try {
        const token = getToken()
        const response = await auth.put(`/admin/place/images/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating seasons relation:', error);
        throw error;
    }
};