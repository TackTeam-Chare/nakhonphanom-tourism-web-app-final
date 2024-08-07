'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { addAdmin } from '@/utils/auth/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAdmin = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await addAdmin(data);
      toast.success('Admin added successfully');
      setTimeout(() => {
        router.push('/dashboard/table/admins');
      }, 2000);
    } catch (error) {
      console.error('Failed to add admin', error);
      toast.error('Failed to add admin. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold mb-5 text-center">Add Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="username"
              name="username"
              type="text"
              {...register('username', { required: 'Username is required' })}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.username ? 'text-red-500' : ''
              }`}
            >
              Username
            </label>
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="password"
              name="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.password ? 'text-red-500' : ''
              }`}
            >
              Password
            </label>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              id="name"
              name="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.name ? 'text-red-500' : ''
              }`}
            >
              Name
            </label>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="role"
              name="role"
              {...register('role', { required: 'Role is required' })}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
            <label
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.role ? 'text-red-500' : ''
              }`}
            >
              Role
            </label>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Add Admin'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default AddAdmin;
