'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { getPlaceImagesById } from '@/utils/auth/admin/get/api';
import { updateTourismImages } from '@/utils/auth/admin/edit/api';

const EditImagesPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [message, setMessage] = useState('');
  const [placeName, setPlaceName] = useState('');

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const { tourism_entities_id, images } = await getPlaceImagesById(id);
        setValue('tourism_entities_id', tourism_entities_id);
        setExistingImages(images || []); // Initialize with empty array if images are undefined
        if (images.length > 0) {
          setPlaceName(images[0].tourism_entity_name);
        }
      } catch (error) {
        console.error('Error fetching entity:', error);
      }
    };

    fetchEntity();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('tourism_entities_id', data.tourism_entities_id);
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('image_paths', imageFiles[i]);
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

  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Images for {placeName}</h1>
        {message && <p className="mb-4 text-green-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <label className="block text-sm font-medium text-gray-700">Tourism Entity ID</label>
            <input
              type="text"
              {...register('tourism_entities_id')}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="block text-sm font-medium text-gray-700">Existing Images</label>
            <div className="grid grid-cols-2 gap-4">
              {existingImages.length > 0 ? (
                existingImages.map((image) => (
                  <Image
                    key={image.id}
                    src={image.image_url}
                    alt={image.image_path}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ))
              ) : (
                <p className="text-gray-500">No images available</p>
              )}
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label className="block text-sm font-medium text-gray-700">New Images</label>
            <input
              type="file"
              {...register('image_paths')}
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Images
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditImagesPage;
