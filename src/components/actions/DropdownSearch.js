'use client';

import React, { useEffect, useState } from 'react';
import { searchByCategory, searchByDistrict, searchBySeason, fetchCategories, fetchDistricts, fetchSeasons } from '@/utils/auth/admin/search/api';

const DropdownSearch = () => {
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

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
      <div className="results grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(result => (
          <div key={result.id} className="result-item p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-lg font-bold text-gray-800">{result.name}</h3>
            <p className="text-gray-600">{result.description}</p>
            <p className="text-sm text-gray-500">{result.district_name} - {result.category_name}</p>
            {result.image_url && (
              <img src={result.image_url[0]} alt={result.name} className="w-full h-32 object-cover rounded mt-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownSearch;
