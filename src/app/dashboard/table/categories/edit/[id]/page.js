"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';  
import {  updateCategory } from '@/utils/auth/admin/edit/api';
import {  getCategoryById } from '@/utils/auth/admin/get/api';

const UpdateCategoryPage = ({ params }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const categoryId = params.id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await getCategoryById(categoryId);
        setValue('name', category.name);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching category:', error);
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateCategory(categoryId, data);
      alert('Category updated successfully');
      router.push('/dashboard/table/categories');
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Error updating category');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Update Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              id="name"
              name="name"
              type="text"
              {...register('name', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Category name is required.</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryPage;
