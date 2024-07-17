'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { getDistrictById } from '@/utils/auth/admin/get/api';
import { updateDistrict } from '@/utils/auth/admin/edit/api';

const EditDistrictPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        const district = await getDistrictById(id);
        setValue('name', district.name);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching district details');
        setIsLoading(false);
      }
    };

    fetchDistrict();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateDistrict(id, data);
      alert('District updated successfully');
      router.push('/dashboard/table/districts');
    } catch (error) {
      setError('Error updating district');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Edit District</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">District Name</label>
            <input
              id="name"
              name="name"
              type="text"
              {...register('name', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">District name is required.</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update District
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDistrictPage;
