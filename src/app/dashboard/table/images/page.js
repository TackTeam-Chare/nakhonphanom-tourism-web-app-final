'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPlaceImages } from '@/utils/auth/admin/get/api';
import { deletePlaceImage } from '@/utils/auth/admin/delete/api';

const ImagesIndexPage = () => {
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const router = useRouter();

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

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this place?')) {
      try {
        await deletePlaceImage(id);
        setImages(images.filter(image => image.id !== id));
        setAlert({ type: 'success', message: 'Place deleted successfully!' });
      } catch (error) {
        console.error(`Error deleting place with ID ${id}:`, error);
        setAlert({ type: 'error', message: 'Error deleting place. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">All Images</h1>
        {alert.message && (
          <div
            className={`${
              alert.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'
            } border px-4 py-3 rounded relative mb-4`}
            role="alert"
          >
            <span className="block sm:inline">{alert.message}</span>
          </div>
        )}
         <button
        onClick={() => router.push('/dashboard/table/images/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add New ImagesPlace
      </button>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="bg-gray-200 p-4 rounded-lg">
              <img src={image.image_url} alt={image.image_path} className="w-full h-48 object-cover rounded-lg" />
              <p className="mt-2 text-gray-700">Tourism Entity ID: {image.tourism_entities_id}</p>
              <button
                onClick={() => router.push(`/dashboard/table/images/edit/${image.id}`)}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesIndexPage;
