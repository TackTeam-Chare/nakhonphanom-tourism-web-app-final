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
        const seasonsData = await getSeasons();
        const touristEntitiesData = await getPlaces();
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
      console.error('Error creating relation:', error);
      alert('Error creating relation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Add Seasons Relation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="season_id" className="block text-sm font-medium text-gray-700">Season</label>
            <select
              id="season_id"
              name="season_id"
              {...register('season_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a season</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}> (ID: {season.id}){season.name}</option>
              ))}
            </select>
            {errors.season_id && <p className="text-red-500 text-xs mt-1">Season is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="tourism_entities_id" className="block text-sm font-medium text-gray-700">Tourism Entity</label>
            <select
              id="tourism_entities_id"
              name="tourism_entities_id"
              {...register('tourism_entities_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a tourism entity</option>
              {touristEntities.map((entity) => (
                <option key={entity.id} value={entity.id}>{entity.name}</option>
              ))}
            </select>
            {errors.tourism_entities_id && <p className="text-red-500 text-xs mt-1">Tourism Entity is required.</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Relation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSeasonsRelationForm;
