"use client"
import { useState, useEffect } from "react";
import { fetchRealTimeTouristAttractions } from "@/utils/auth/admin/get/api";

const RealTimePlaces = () => {
  const [touristAttractions, setTouristAttractions] = useState([]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const data = await fetchRealTimeTouristAttractions();
        setTouristAttractions(data);
      } catch (error) {
        console.error("Error fetching tourist attractions:", error);
      }
    };

    fetchAttractions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Real-Time Tourist Attractions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {touristAttractions.map((attraction) => (
            <div key={attraction.id} className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-2">{attraction.name}</h2>
              <p className="text-gray-700">{attraction.description}</p>
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${attraction.image_url}`} alt={attraction.name} className="mt-2 w-full h-48 object-cover"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimePlaces;
