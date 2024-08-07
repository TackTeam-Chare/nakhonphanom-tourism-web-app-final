
"use client";
import React, { useState, useEffect } from "react";
import { getPlaces } from "@/utils/auth/admin/get/api";
import SearchBar from '@/components/actions/SearchBar';
import DropdownSearch from '@/components/actions/DropdownSearch';
const ManagePlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getPlaces();
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Manage Places</h1>
        <SearchBar />
        <DropdownSearch />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.map((place) => (
            <div key={place.id} className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-2">{place.name}</h2>
              <p className="text-gray-700">{place.description}</p>
              <button
                onClick={() => router.push(`/dashboard/table/place/edit/${place.id}`)}
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default ManagePlaces;
