
"use client"
import React, { useState } from 'react';
import { getTourismDataByOperatingHours } from '@/utils/user/api';

const TouristEntitiesByTimeComponent = () => {
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [openingTime, setOpeningTime] = useState('12:00');
  const [closingTime, setClosingTime] = useState('18:00');
  const [tourismData, setTourismData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTourismDataByOperatingHours(dayOfWeek, openingTime, closingTime);
      setTourismData(data);
      setCurrentPage(1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tourismData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tourismData.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Tourism Entities by Operating Hours</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Day of Week:</label>
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300"
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Opening Time:</label>
          <input
            type="time"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Closing Time:</label>
          <input
            type="time"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="border rounded-md px-3 py-2 w-full focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-red-500 text-center">Error: {error.message}</p>}

      {currentItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {currentItems.map((entity) => (
            <div key={entity.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg">
              <img src={entity.image_url} alt={entity.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{entity.name}</h2>
                <p className="text-gray-700 mb-2">{entity.description}</p>
                <p className="text-gray-600 mb-2"><strong>Location:</strong> {entity.location}</p>
                <p className="text-gray-600 mb-2"><strong>District:</strong> {entity.district_name}</p>
                <p className="text-gray-600"><strong>Operating Hours:</strong> {entity.operating_hours}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === number + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {number + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TouristEntitiesByTimeComponent;
