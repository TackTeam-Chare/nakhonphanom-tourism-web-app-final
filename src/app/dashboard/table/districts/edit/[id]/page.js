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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold mb-5 text-center">Edit District</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="name"
              name="name"
              type="text"
              {...register('name', { required: true })}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.name ? 'text-red-500' : ''
              }`}
            >
              District Name
            </label>
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
    </section>
  );
};

export default EditDistrictPage;
