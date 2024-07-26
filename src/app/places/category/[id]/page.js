import React from 'react';
import Image from 'next/image';
import { getFetchTourismDataByCategory } from '@/utils/user/api'; // Ensure this import path is correct

export async function generateMetadata({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataByCategory(id);
  return { title: `สถานที่ท่องเที่ยวตามหมวดหมู่ ${tourismData[0]?.category_name || 'Unknown'}` };
}

const Page = async ({ params }) => {
  const { id } = params;
  const tourismData = await getFetchTourismDataByCategory(id);

  if (!tourismData || tourismData.length === 0) {
    return <p>ไม่พบสถานที่ท่องเที่ยวในหมวดหมู่นี้</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">สถานที่ท่องเที่ยวในหมวดหมู่ {tourismData[0]?.category_name || 'ไม่ทราบ'}</h1>
      <ul>
        {tourismData.map((place) => (
          <li key={place.id} className="mb-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{place.name}</h2>
            <p>{place.description}</p>
            <p><strong>Location:</strong> {place.location}</p>
            <p><strong>Category:</strong> {place.category_name}</p>

            {place.images && (
              <div className="image-gallery">
                <p><strong>Images:</strong></p>
                {place.images.split(',').map((image, index) => (
                  <Image
                    key={index}
                    width={500}height={300}
                    src={image}
                    alt={place.name}
                    className="w-full h-auto rounded-lg shadow-md mb-2"
                  />
                ))}
              </div>
            )}

            {place.seasons && (
              <p className="text-sm text-gray-500">
                <strong>ฤดูกาลที่เหมาะสม:</strong> {place.seasons.split(',').join(', ')}
              </p>
            )}

            {place.operating_hours && (
              <div className="operating-hours">
                <p><strong>เวลาทำการ:</strong></p>
                {place.operating_hours.map((hours, index) => (
                  <p key={index}>
                    {hours.day_of_week}: {hours.opening_time} - {hours.closing_time}
                  </p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
