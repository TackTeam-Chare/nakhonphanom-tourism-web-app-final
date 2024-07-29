'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createOperatingHours } from '@/utils/auth/admin/add/api';
import { getPlaces } from '@/utils/auth/admin/get/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddOperatingHoursForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesData = await getPlaces();
        setPlaces(placesData);
      } catch (error) {
        console.error('Error fetching places:', error);
        toast.error('Error fetching places');
      }
    };

    fetchPlaces();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await createOperatingHours(data);
      toast.success(`Operating hours created successfully with ID: ${response.id}`);
    } catch (error) {
      console.error('Error creating operating hours:', error);
      toast.error('Error creating operating hours');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-bold mb-5 text-center text-indigo-600">Add Operating Hours</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="place_id" className="block text-sm font-medium text-gray-700">Place</label>
            <select
              id="place_id"
              name="place_id"
              {...register('place_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a place</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  (ID: {place.id}) {place.name}
                </option>
              ))}
            </select>
            {errors.place_id && <p className="text-red-500 text-xs mt-1">Place is required.</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
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
          <div className="relative z-0 w-full mb-6 group">
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
          <div className="relative z-0 w-full mb-6 group">
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
      <ToastContainer />
    </section>
  );
};

export default AddOperatingHoursForm;
