'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { getSeasonsRelationById, getSeasons, getPlaceById } from '@/utils/auth/admin/get/api';
import { updateSeasonsRelation } from '@/utils/auth/admin/edit/api';

const EditSeasonsRelationPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [seasons, setSeasons] = useState([]);
  const [placeName, setPlaceName] = useState("");

  useEffect(() => {
    const fetchRelation = async () => {
      try {
        const [relation, seasonsData] = await Promise.all([
          getSeasonsRelationById(id),
          getSeasons()
        ]);
        setValue('season_id', relation.season_id);
        setValue('tourism_entities_id', relation.tourism_entities_id);

        const placeData = await getPlaceById(relation.tourism_entities_id);
        setPlaceName(`ID: ${placeData.id} ${placeData.name} `);

        setSeasons(seasonsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching relation:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRelation();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateSeasonsRelation(id, data);
      alert('Relation updated successfully');
      router.push('/dashboard/table/seasons-relation');
    } catch (error) {
      console.error('Error updating relation:', error);
      alert('Error updating relation');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-5 text-center">Update Seasons Relation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="season_id" className="block text-sm font-medium text-gray-700">Season</label>
            <select
              id="season_id"
              name="season_id"
              {...register('season_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Season</option>
              {seasons.map(season => (
                <option key={season.id} value={season.id}>{season.name}</option>
              ))}
            </select>
            {errors.season_id && <p className="text-red-500 text-xs mt-1">Season is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="tourism_entities_id" className="block text-sm font-medium text-gray-700">Tourism Entity</label>
            <input
              id="tourism_entities_id"
              name="tourism_entities_id"
              type="text"
              value={placeName}
              readOnly
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Seasons Relation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSeasonsRelationPage;
