'use client';
import React, { useState } from 'react';
import { register } from '@/utils/auth/authRoutes';

export default function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ username, password, name });
      console.log('Register successful:', response);
      // Navigate to login or dashboard
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label
              htmlFor="username"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                username ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Username
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                password ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="name"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                name ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Name
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
