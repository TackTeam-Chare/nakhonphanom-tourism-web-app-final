'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { createDistrict } from '@/utils/auth/admin/add/api';

const AddDistrictForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createDistrict(data);
      alert(`District created successfully with ID: ${response.id}`);
    } catch (error) {
      console.error('Error creating district:', error);
      alert('Error creating district');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New District</h2>
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
              Add District
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDistrictForm;
