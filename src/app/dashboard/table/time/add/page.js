'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { createOperatingHours } from '@/utils/auth/admin/add/api';

const AddOperatingHoursForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createOperatingHours(data);
      alert(`Operating hours created successfully with ID: ${response.id}`);
    } catch (error) {
      console.error('Error creating operating hours:', error);
      alert('Error creating operating hours');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Add Operating Hours</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="place_id" className="block text-sm font-medium text-gray-700">Place ID</label>
            <input
              id="place_id"
              name="place_id"
              type="number"
              {...register('place_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.place_id && <p className="text-red-500 text-xs mt-1">Place ID is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="day_of_week" className="block text-sm font-medium text-gray-700">Day of the Week</label>
            <select
              id="day_of_week"
              name="day_of_week"
              {...register('day_of_week', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
            {errors.day_of_week && <p className="text-red-500 text-xs mt-1">Day of the week is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="opening_time" className="block text-sm font-medium text-gray-700">Opening Time</label>
            <input
              id="opening_time"
              name="opening_time"
              type="time"
              {...register('opening_time', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.opening_time && <p className="text-red-500 text-xs mt-1">Opening time is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="closing_time" className="block text-sm font-medium text-gray-700">Closing Time</label>
            <input
              id="closing_time"
              name="closing_time"
              type="time"
              {...register('closing_time', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.closing_time && <p className="text-red-500 text-xs mt-1">Closing time is required.</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Operating Hours
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOperatingHoursForm;
