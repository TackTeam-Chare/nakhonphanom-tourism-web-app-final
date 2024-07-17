'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { getSeasonsRelationById } from '@/utils/auth/admin/get/api';
import { updateSeasonsRelation } from '@/utils/auth/admin/edit/api';

const EditSeasonsRelationPage = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelation = async () => {
      try {
        const relation = await getSeasonsRelationById(id);
        setValue('season_id', relation.season_id);
        setValue('tourism_entities_id', relation.tourism_entities_id);
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
            <label htmlFor="season_id" className="block text-sm font-medium text-gray-700">Season ID</label>
            <input
              id="season_id"
              name="season_id"
              type="text"
              {...register('season_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.season_id && <p className="text-red-500 text-xs mt-1">Season ID is required.</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="tourism_entities_id" className="block text-sm font-medium text-gray-700">Tourism Entities ID</label>
            <input
              id="tourism_entities_id"
              name="tourism_entities_id"
              type="text"
              {...register('tourism_entities_id', { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.tourism_entities_id && <p className="text-red-500 text-xs mt-1">Tourism Entities ID is required.</p>}
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
