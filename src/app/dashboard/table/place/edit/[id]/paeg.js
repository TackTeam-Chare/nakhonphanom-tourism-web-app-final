'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { getTouristEntityById } from '@/utils/auth/admin/get/api';
import { updateTouristEntity } from '@/utils/auth/admin/edit/api';

const EditPlacePage = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entity, districtsData, categoriesData] = await Promise.all([
          getTouristEntityById(id),
          getAllDistricts(),
          getAllCategories()
        ]);
        setValue('name', entity.name);
        setValue('description', entity.description);
        setValue('location', entity.location);
        setValue('latitude', entity.latitude);
        setValue('longitude', entity.longitude);
        setValue('district_id', entity.district_id);
        setValue('category_id', entity.category_id);
        setDistricts(districtsData);
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateTouristEntity(id, data);
      alert('Place updated successfully');
      router.push('/dashboard/table/place');
    } catch (error) {
      console.error('Error updating place:', error);
      alert('Error updating place');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Update Place</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              {...register('name', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              {...register('description', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">Description is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              {...register('location', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">Location is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              id="latitude"
              name="latitude"
              type="text"
              {...register('latitude', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.latitude && <p className="text-red-500 text-xs mt-1">Latitude is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              id="longitude"
              name="longitude"
              type="text"
              {...register('longitude', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.longitude && <p className="text-red-500 text-xs mt-1">Longitude is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="district_id" className="block text-sm font-medium text-gray-700">District</label>
            <select
              id="district_id"
              name="district_id"
              {...register('district_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {districts.map(district => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))}
            </select>
            {errors.district_id && <p className="text-red-500 text-xs mt-1">District is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category_id"
              name="category_id"
              {...register('category_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500 text-xs mt-1">Category is required.</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlacePage;
