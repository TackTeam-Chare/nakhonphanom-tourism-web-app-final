"use client"
import { useEffect, useState } from 'react';
import { getFetchTourismDataById, getNearbyFetchTourismData } from '@/utils/api';
import NearbyTourismListComponent from '@/components/tourism/nearby/NearbyTourismList'; // Adjust path as needed
import Layout from '@/components/common/layout';

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
          // กรองข้อมูลที่ซ้ำกันออก
          const uniqueNearbyEntities = data.nearbyEntities.filter(entity => entity.id !== id);
          setNearbyEntities(uniqueNearbyEntities);
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
    <Layout>
      <NearbyTourismListComponent tourismData={tourismData} nearbyEntities={nearbyEntities} />
    </Layout>
  );
};

export default Page;
