"use client";
import { useEffect, useState } from 'react';
import { getNearbyFetchTourismData } from '@/utils/user/api';
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
          const data = await getNearbyFetchTourismData(id);
          setTourismData(data.entity); // Selected tourism entity data
          setNearbyEntities(data.nearbyEntities); // Nearby tourism entities data
        } catch (error) {
          console.error('Error fetching tourism data:', error);
        }
      }
    };

    fetchTourismData();
  }, [id]);

  if (!tourismData) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <NearbyTourismListComponent tourismData={tourismData} nearbyEntities={nearbyEntities} />
    </Layout>
  );
};

export default Page;
