"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getAllFetchTourismData } from '../../utils/api';
import Pagination from '@/components/actions/Pagination'; // Adjust path based on your file structure

const TourismComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(6); // Adjust as per your design

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getAllFetchTourismData();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  // Pagination logic
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = data.slice(indexOfFirstPlace, indexOfLastPlace);
  const totalPages = Math.ceil(data.length / placesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Tourism Data</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPlaces.map((place, index) => (
            <Link className="hover:no-underline" key={index} href={`/tourism/nearby/${place.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-500 ease-in-out">
                  {place.image_path && (
                    <Image
                      src={place.image_path}
                      alt={place.name}
                      width={500}
                      height={300}
                      priority
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
                    <p className="text-gray-700 mb-2">
                      <strong>Location:</strong> {place.location}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Description:</strong> {place.description}
                    </p>
                    <p className="text-gray-700 mb-2">
                      <strong>Type:</strong> {place.category_name}
                    </p>
                    <p className="text-gray-700">
                      <strong>District:</strong> {place.district_name}
                    </p>
                  </div>
                </div>
            </Link>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

  );
};

export default TourismComponent;
