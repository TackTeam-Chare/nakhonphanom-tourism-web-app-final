import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { searchPlaces } from '@/utils/auth/admin/search/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      try {
        const response = await searchPlaces(value.trim());
        if (response.length) {
          setResults(response);
        } else {
          setResults(['no-results']); // Using a special value to indicate no results
        }
      } catch (error) {
        console.error('Error searching:', error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  const handleSelect = (id) => {
    router.push(`/dashboard/places/nearby/${id}`);
    clearSearch();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for places, shops, restaurants..."
        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center text-gray-500"
          aria-label="Clear search"
          style={{ width: '2.5rem' }}
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.707 4.293a1 1 0 011.414 0L10 6.172l1.879-1.879a1 1 0 111.414 1.414L11.414 7.586l1.879 1.879a1 1 0 01-1.414 1.414L10 9.414l-1.879 1.879a1 1 0 01-1.414-1.414L8.586 7.586 6.707 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      {results.length > 0 && results[0] !== 'no-results' ? (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full z-50 max-h-60 overflow-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="flex items-start p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out"
              onClick={() => handleSelect(result.id)}
            >
              <Image width={500} height={300} src={result.image_url[0]} alt={result.name} className="w-16 h-16 object-cover rounded mr-4" />
              <div>
                <p className="text-lg font-semibold">{result.name}</p>
                <p className="text-sm text-gray-500">{result.category_name} - {result.district_name}</p>
              </div>
            </div>
          ))}
        </div>
      ) : results[0] === 'no-results' && (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-full z-50 p-4 text-gray-500">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
