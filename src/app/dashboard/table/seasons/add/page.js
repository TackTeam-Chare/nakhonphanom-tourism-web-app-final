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
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New Season</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Season Name</label>
            <input
              id="name"
              name="name"
              type="text"
              {...register('name', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Season name is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="date_start" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              id="date_start"
              name="date_start"
              type="date"
              {...register('date_start', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.date_start && <p className="text-red-500 text-xs mt-1">Start date is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="date_end" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              id="date_end"
              name="date_end"
              type="date"
              {...register('date_end', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
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
    </div>
  );
};

export default AddSeasonForm;
