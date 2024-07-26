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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New District</h2>
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
              Add District
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddDistrictForm;
