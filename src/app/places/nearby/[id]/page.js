"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getNearbyFetchTourismData } from '@/utils/user/api';
import Layout from '@/components/common/layout';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [tourismData, setTourismData] = useState(null);
  const [nearbyEntities, setNearbyEntities] = useState([]);
  
  const handleSelect = (id) => {
    router.push(`/places/nearby/${id}`); 
  };

  useEffect(() => {
    const fetchTourismData = async () => {
      if (id) {
        try {
          const data = await getNearbyFetchTourismData(id);
          console.log('Tourism Data:', data); // ตรวจสอบค่าที่ได้รับจาก API
          setTourismData(data.entity);
          setNearbyEntities(data.nearbyEntities);
        } catch (error) {
          console.error('Error fetching tourism data:', error);
        }
      }
    };

    fetchTourismData();
  }, [id]);

  if (!tourismData) {
    return <Layout><p>Loading...</p></Layout>;
  }

  const renderImage = (images, altText, priority = false) => {
    if (!images || images.length === 0) {
      return (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      );
    }

    return images.map((image, index) => (
      <Image
        key={index}
        width={500}
        height={300}
        src={image.image_url}
        alt={altText}
        className="w-full h-auto rounded-lg shadow-md"
        priority={priority} // เพิ่ม priority property
      />
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{tourismData.name}</h1>
        <p className="mb-4">{tourismData.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {renderImage(tourismData.images, tourismData.name, true)} {/* ภาพหลักที่ต้องโหลดก่อน */}
          <div>
            <h2 className="text-xl font-semibold mb-2">รายละเอียด</h2>
            <p><strong>หมวดหมู่:</strong> {tourismData.category_name}</p>
            <p><strong>เขต:</strong> {tourismData.district_name}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">สถานที่ท่องเที่ยวใกล้เคียง</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nearbyEntities.map((entity) => (
            <div key={entity.id} onClick={() => handleSelect(entity.id)} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-start">
              {renderImage(entity.image_path, entity.name)}
              <h3 className="text-lg font-semibold mb-2">{entity.name}</h3>
              <p className="text-gray-700 mb-1"><strong>หมวดหมู่:</strong> {entity.category_name}</p>
              <p className="text-gray-700 mb-1"><strong>เขต:</strong> {entity.district_name}</p>
              <p className="text-gray-700 mb-1"><strong>ระยะทาง:</strong> {entity.distance} เมตร</p>
              <p className="text-gray-700 mb-1"><strong>เวลาทำการ:</strong> {entity.opening_times} - {entity.closing_times}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
