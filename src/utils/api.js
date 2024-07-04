// utils/api.js
import axios from 'axios';

// การกำหนดฐาน URL สำหรับ axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // ใช้ตัวแปรสภาพแวดล้อมที่ตั้งค่าไว้
});

// ฟังก์ชันสำหรับดึงข้อมูลจาก API ของ backend
export const fetchTourismData = async () => {
  try {
    const response = await api.get('/tourist-entities'); // สมมุติว่าเส้นทาง API ของคุณคือ /api/tourism
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};
