'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchPlaces } from '@/utils/auth/admin/search/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      try {
        const response = await searchPlaces(e.target.value);
        setResults(response);
      } catch (error) {
        console.error('Error searching:', error);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (id) => {
    router.push(`/tourism/${id}`);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for places, shops, restaurants..."
        className="w-full px-4 py-2 border rounded-md"
      />
      {results.length > 0 && (
        <div className="absolute mt-1 bg-white border rounded-md w-full z-10">
          {results.map((result) => (
            <div
              key={result.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(result.id)}
            >
              <p className="text-lg font-semibold">{result.name}</p>
              <p className="text-sm text-gray-500">{result.category_name} - {result.district_name}</p>
              {result.image_url && result.image_url.length > 0 && (
                <img src={result.image_url[0]} alt={result.name} className="w-16 h-16 object-cover rounded mt-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
