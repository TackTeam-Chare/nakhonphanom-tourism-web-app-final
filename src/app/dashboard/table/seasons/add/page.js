'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { createSeason } from '@/utils/auth/admin/add/api';

const AddSeasonForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createSeason(data);
      alert(`Season created successfully with ID: ${response.id}`);
    } catch (error) {
      console.error('Error creating season:', error);
      alert('Error creating season');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New Season</h2>
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
              Season Name
            </label>
            {errors.name && <p className="text-red-500 text-xs mt-1">Season name is required.</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="date_start"
              name="date_start"
              type="date"
              {...register('date_start', { required: true })}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="date_start"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.date_start ? 'text-red-500' : ''
              }`}
            >
              Start Date
            </label>
            {errors.date_start && <p className="text-red-500 text-xs mt-1">Start date is required.</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="date_end"
              name="date_end"
              type="date"
              {...register('date_end', { required: true })}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="date_end"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.date_end ? 'text-red-500' : ''
              }`}
            >
              End Date
            </label>
            {errors.date_end && <p className="text-red-500 text-xs mt-1">End date is required.</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Season
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddSeasonForm;
