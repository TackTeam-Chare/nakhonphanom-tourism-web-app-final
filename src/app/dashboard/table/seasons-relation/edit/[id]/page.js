'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { getSeasonsRelationById, getSeasons, getPlaceById } from '@/utils/auth/admin/get/api';
import { updateSeasonsRelation } from '@/utils/auth/admin/edit/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        setPlaceName(`ID: ${placeData.id} ${placeData.name}`);

        setSeasons(seasonsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching relation:', error);
        setIsLoading(false);
        toast.error('Error fetching relation');
      }
    };

    if (id) {
      fetchRelation();
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateSeasonsRelation(id, data);
      toast.success('Relation updated successfully');
      setTimeout(() => {
        router.push('/dashboard/table/seasons-relation');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error updating relation:', error);
      toast.error('Error updating relation');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl font-bold mb-5 text-center text-indigo-600">Update Seasons Relation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="season_id" className="block text-sm font-medium text-gray-700">Season</label>
            <select
              id="season_id"
              name="season_id"
              {...register('season_id', { required: 'Season is required' })}
              className="block mt-1 w-full py-2 px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Season</option>
              {seasons.map(season => (
                <option key={season.id} value={season.id}>{season.name}</option>
              ))}
            </select>
            {errors.season_id && <p className="text-red-500 text-xs mt-1">{errors.season_id.message}</p>}
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="tourism_entities_id" className="block text-sm font-medium text-gray-700">Tourism Entity</label>
            <input
              id="tourism_entities_id"
              name="tourism_entities_id"
              type="text"
              value={placeName}
              readOnly
              className="block mt-1 w-full py-2 px-3 bg-gray-200 border border-gray-300 rounded-md shadow-sm sm:text-sm cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Seasons Relation
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default EditSeasonsRelationPage;
