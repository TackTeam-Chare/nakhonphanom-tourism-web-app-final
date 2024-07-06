// src/components/tourism/[id]/page.js
"use client"
// src/components/tourism/[id]/page.js

import { useEffect, useState } from 'react';
import { getFetchTourismDataById, getNearbyFetchTourismData } from '../../../utils/api';
import TourismDetailsByIdComponent from '@/components/tourism/[id]/TourismDetails'; // Adjust path as needed
import NearbyTourismDetails from '@/components/nearby/[id]/NearbyTourismDetails'; // Adjust path as needed

const Page = ({ params }) => {
  const { id } = params;

  const [tourismData, setTourismData] = useState(null);
  const [nearbyEntities, setNearbyEntities] = useState([]);

  useEffect(() => {
    const fetchTourismData = async () => {
      if (id) {
        try {
          const data = await getFetchTourismDataById(id);
          setTourismData(data);
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่ท่องเที่ยว:', error);
        }
      }
    };

    const fetchNearbyEntities = async () => {
      if (id) {
        try {
          const data = await getNearbyFetchTourismData(id);
          setNearbyEntities(data.nearbyEntities);
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่ท่องเที่ยวใกล้เคียง:', error);
        }
      }
    };

    fetchTourismData();
    fetchNearbyEntities();
  }, [id]);

  if (!tourismData) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  return (
    <>
      <TourismDetailsByIdComponent tourismData={tourismData} />
      <NearbyTourismDetails tourismData={tourismData} nearbyEntities={nearbyEntities} />
    </>
  );
};

export default Page;
