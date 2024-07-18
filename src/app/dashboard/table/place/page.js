'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPlaces } from '@/utils/auth/admin/get/api';

const PlaceIndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const result = await getPlaces();
        setPlaces(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlaces();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Tourist Places</h1>
      <button
        onClick={() => router.push('/dashboard/table/place/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add New Place
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.map((place) => (
          <div key={place.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {place.image_url && (
              <img 
                src={place.image_url} 
                alt={place.name} 
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
              <p className="text-sm text-gray-500 mb-2">ID: {place.id}</p>
              <p className="mb-2">Description: {place.description}</p>
              <p className="mb-2">Location: {place.location}</p>
              <p className="mb-2">Latitude: {place.latitude}</p>
              <p className="mb-2">Longitude: {place.longitude}</p>
              <button
                onClick={() => router.push(`/dashboard/table/place/edit/${place.id}`)}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceIndexPage;
