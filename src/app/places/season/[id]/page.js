import React from 'react';
import Image from 'next/image';
import { getFetchTourismDataBySeason } from '@/utils/user/api'; // Adjust this import path as necessary

const Page = async ({ params }) => {
  const { id } = params;
  const tourismData = await getFetchTourismDataBySeason(id);

  if (!tourismData || tourismData.length === 0) {
    return <p>ไม่พบสถานที่ท่องเที่ยวในหมวดหมู่นี้</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">สถานที่ท่องเที่ยวตามฤดูกาล {tourismData[0]?.season_name || 'ไม่ทราบ'}</h1>
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
                <p>{place.operating_hours}</p>
              </div>
            )}

            {place.image_path && (
              <div className="image-path">
                <p><strong>รูปภาพ:</strong></p>
                <Image
                  width={500}height={300}
                  src={place.image_path}
                  alt={place.name}
                  className="w-full h-auto rounded-lg shadow-md mb-2"
                />
              </div>
            )}

            {place.district_name && (
              <p className="text-sm text-gray-500">
                <strong>อำเภอ:</strong> {place.district_name}
              </p>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
