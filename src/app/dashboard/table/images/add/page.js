'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getPlaces } from '@/utils/auth/admin/get/api';
import { uploadTourismImages } from '@/utils/auth/admin/add/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadImagesPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesData = await getPlaces();
        setPlaces(placesData);
      } catch (error) {
        console.error('Error fetching places:', error);
        toast.error('Error fetching places');
      }
    };

    fetchPlaces();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('tourism_entities_id', data.tourism_entities_id);
    for (let i = 0; i < data.image_paths.length; i++) {
      formData.append('image_paths', data.image_paths[i]);
    }

    try {
      await uploadTourismImages(formData);
      toast.success('Images uploaded successfully');
      setTimeout(() => {
        router.push('/dashboard/table/images');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error uploading images');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Images</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <label className="block text-sm font-medium text-gray-700">Tourism Entity</label>
            <select
              {...register('tourism_entities_id', { required: 'Please select a place' })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Place</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>{place.name}</option>
              ))}
            </select>
            {errors.tourism_entities_id && (
              <p className="text-red-500 text-xs mt-1">{errors.tourism_entities_id.message}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              {...register('image_paths', { required: 'Please select images' })}
              multiple
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.image_paths && (
              <p className="text-red-500 text-xs mt-1">{errors.image_paths.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default UploadImagesPage;
