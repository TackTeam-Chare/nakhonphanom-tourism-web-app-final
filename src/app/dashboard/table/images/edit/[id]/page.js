'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { getPlaceById } from '@/utils/auth/admin/get/api';
import { updateTourismImages } from '@/utils/auth/admin/edit/api';

const EditImagesPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const placeData = await getPlaceById(id);
        setPlace(placeData);
      } catch (error) {
        console.error('Error fetching place:', error);
      }
    };

    fetchPlace();
  }, [id]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('tourism_entities_id', id);
    for (let i = 0; i < data.image_paths.length; i++) {
      formData.append('image_paths', data.image_paths[i]);
    }

    try {
      await updateTourismImages(id, formData);
      setMessage('Images updated successfully');
      router.push('/dashboard/table/images');
    } catch (error) {
      console.error('Error updating images:', error);
      setMessage('Error updating images');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Edit Images</h1>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {place && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Tourism Entity</label>
              <input
                type="text"
                value={place.name}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Images</label>
              <input
                type="file"
                {...register('image_paths', { required: 'Please select images' })}
                multiple
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.image_paths && (
                <p className="text-red-500 text-sm mt-1">{errors.image_paths.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditImagesPage;
