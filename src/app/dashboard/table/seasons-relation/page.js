'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllSeasonsRelations } from '@/utils/auth/admin/get/api';

const SeasonsRelationIndexPage = () => {
  const [relations, setRelations] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRelations = async () => {
      try {
        const result = await getAllSeasonsRelations();
        setRelations(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRelations();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Seasons Relations</h1>
      <button
        onClick={() => router.push('/dashboard/table/seasons-relation/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add New Operating Hour
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {relations.map((relation) => (
          <div key={relation.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold mb-2">Relation ID: {relation.id}</h2>
            <p className="text-gray-700 mb-4"><strong>Season ID:</strong> {relation.season_id}</p>
            <p className="text-gray-700 mb-4"><strong>Tourism Entity ID:</strong> {relation.tourism_entities_id}</p>
            <button
              onClick={() => router.push(`/dashboard/table/seasons-relation/edit/${relation.id}`)}
              className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonsRelationIndexPage;
