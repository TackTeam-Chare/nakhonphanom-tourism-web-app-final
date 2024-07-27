'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { searchByCategory, searchByDistrict, searchBySeason, searchByTime, fetchCategories, fetchDistricts, fetchSeasons } from '@/utils/auth/admin/search/api';

const DropdownSearch = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      const districtsData = await fetchDistricts();
      const seasonsData = await fetchSeasons();

      setCategories(categoriesData);
      setDistricts(districtsData);
      setSeasons(seasonsData);
    };

    fetchData();
  }, []);

  const handleCategoryChange = async (e) => {
    setSelectedCategory(e.target.value);
    const results = await searchByCategory(e.target.value);
    setResults(results);
  };

  const handleDistrictChange = async (e) => {
    setSelectedDistrict(e.target.value);
    const results = await searchByDistrict(e.target.value);
    setResults(results);
  };

  const handleSeasonChange = async (e) => {
    setSelectedSeason(e.target.value);
    const results = await searchBySeason(e.target.value);
    setResults(results);
  };

  const handleTimeSearch = async () => {
    const results = await searchByTime(dayOfWeek, openingTime, closingTime);
    setResults(results);
  };

  const handleSelect = (id) => {
    router.push(`/dashboard/places/nearby/${id}`); 
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Search Tourist Entities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>{district.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="season" className="block text-sm font-medium text-gray-700">Season</label>
          <select
            id="season"
            value={selectedSeason}
            onChange={handleSeasonChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Season</option>
            {seasons.map(season => (
              <option key={season.id} value={season.id}>{season.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="day_of_week" className="block text-sm font-medium text-gray-700">Day of Week</label>
          <select
            id="day_of_week"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>
        <div>
          <label htmlFor="opening_time" className="block text-sm font-medium text-gray-700">Opening Time</label>
          <input
            type="time"
            id="opening_time"
            value={openingTime}
            onChange={(e) => setOpeningTime(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="closing_time" className="block text-sm font-medium text-gray-700">Closing Time</label>
          <input
            type="time"
            id="closing_time"
            value={closingTime}
            onChange={(e) => setClosingTime(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleTimeSearch}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Search by Time
        </button>
      </div>
      <div className="results grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {results.map(result => (
          <div key={result.id} className="result-item bg-gray-100 p-4 rounded-lg shadow-sm" onClick={() => handleSelect(result.id)}>
            <h3 className="text-lg font-semibold text-gray-800">{result.name}</h3>
            <p className="text-sm text-gray-600">{result.description}</p>
            <p className="text-sm text-gray-600">{result.district_name} - {result.category_name}</p>
            {result.image_url && (
              <Image  width={500}height={300} src={result.image_url} alt={result.name} className="w-full h-48 object-cover rounded mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownSearch;
