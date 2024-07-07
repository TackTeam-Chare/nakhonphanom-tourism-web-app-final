"use client"
import React, { useState } from 'react';
import { getTourismDataByOperatingHours } from '@/utils/api';

const TouristEntitiesByTimeComponent = () => {
  const [dayOfWeek, setDayOfWeek] = useState('Monday');
  const [openingTime, setOpeningTime] = useState('09:00:00');
  const [closingTime, setClosingTime] = useState('18:00:00');
  const [tourismData, setTourismData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTourismDataByOperatingHours(dayOfWeek, openingTime, closingTime);
      setTourismData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tourism Entities by Operating Hours</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Day of Week:</label>
        <select
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
          className="border rounded-md px-2 py-1 w-full"
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Opening Time:</label>
        <input
          type="time"
          value={openingTime}
          onChange={(e) => setOpeningTime(e.target.value)}
          className="border rounded-md px-2 py-1 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Closing Time:</label>
        <input
          type="time"
          value={closingTime}
          onChange={(e) => setClosingTime(e.target.value)}
          className="border rounded-md px-2 py-1 w-full"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Search
      </button>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}

      {tourismData.length > 0 && (
        <ul className="mt-4">
          {tourismData.map((entity) => (
            <li key={entity.id} className="border-b py-2">
              <h2 className="text-xl font-semibold">{entity.name}</h2>
              <p>{entity.description}</p>
              <p>Location: {entity.location}</p>
              <p>Operating Hours: {entity.operating_hours}</p>
              <p>district_name: {entity.district_name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TouristEntitiesByTimeComponent;
