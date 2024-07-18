// src/app/dashboard/table/images/page.js

'use client';
import React, { useEffect, useState } from 'react';
import { getPlaceImages } from '@/utils/auth/admin/get/api';

const ImagesIndexPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await getPlaceImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">All Images</h1>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="bg-gray-200 p-4 rounded-lg">
              <img src={image.image_path} alt={image.image_path} className="w-full h-48 object-cover rounded-lg" />
              <p className="mt-2 text-gray-700">{image.tourism_entities_id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesIndexPage;
