'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSeasonsRelation } from '@/utils/auth/admin/add/api';
import { getSeasons, getPlaces } from '@/utils/auth/admin/get/api';

const AddSeasonsRelationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [seasons, setSeasons] = useState([]);
  const [touristEntities, setTouristEntities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [seasonsData, touristEntitiesData] = await Promise.all([
          getSeasons(),
          getPlaces()
        ]);
        setSeasons(seasonsData);
        setTouristEntities(touristEntitiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
        const response = await createSeasonsRelation(data);
        alert(`Relation created successfully with ID: ${response.id}`);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            alert(error.response.data.error);
        } else {
            console.error('Error creating relation:', error);
            alert('Error creating relation');
        }
    }
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold mb-5 text-center text-indigo-600">Add Seasons Relation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="season_id" className="block text-sm font-medium text-gray-700">Season</label>
            <select
              id="season_id"
              name="season_id"
              {...register('season_id', { required: 'Season is required' })}
              className="block mt-1 w-full py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a season</option>
              {seasons.map(season => (
                <option key={season.id} value={season.id}>
                  {season.name} (ID: {season.id})
                </option>
              ))}
            </select>
            {errors.season_id && <p className="text-red-500 text-xs mt-1">{errors.season_id.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="tourism_entities_id" className="block text-sm font-medium text-gray-700">Tourism Entity</label>
            <select
              id="tourism_entities_id"
              name="tourism_entities_id"
              {...register('tourism_entities_id', { required: 'Tourism Entity is required' })}
              className="block mt-1 w-full py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a tourism entity</option>
              {touristEntities.map(entity => (
                <option key={entity.id} value={entity.id}>{entity.name}</option>
              ))}
            </select>
            {errors.tourism_entities_id && <p className="text-red-500 text-xs mt-1">{errors.tourism_entities_id.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Relation
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddSeasonsRelationForm;
