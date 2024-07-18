'use client';

import { useForm } from 'react-hook-form';
import { createCategory } from '@/utils/auth/admin/add/api';
import { useState } from 'react';

export default function CreateCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await createCategory(data);
      setMessage(response.message);
    } catch (error) {
      setMessage('Error creating category');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Create Category</h1>
        {message && <p className="mb-4 text-green-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Category Name</label>
            <input
              type="text"
              {...register('name', { required: 'Category name is required' })}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 transition-all duration-300"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}
