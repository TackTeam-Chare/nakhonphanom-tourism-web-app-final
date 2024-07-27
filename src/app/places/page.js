"use client";
import React, { useEffect, useState } from 'react';
import { getAllFetchTourismData } from '@/utils/user/api'; // Ensure this path is correct
import Layout from '@/components/common/layout';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '@/components/actions/Pagination'; // Verify the path is correct

const TourismPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(6); // Adjust as per your design

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllFetchTourismData();
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = data.slice(indexOfFirstPlace, indexOfLastPlace);
  const totalPages = Math.ceil(data.length / placesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Tourism Data</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPlaces.map((place, index) => (
            <Link className="hover:no-underline" href={`/places/nearby/${place.id}`} key={index}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-500 ease-in-out">
                {place.image_path ? (
                  <Image
                    src={place.image_path}
                    alt={place.name}
                    width={500}
                    height={300}
                    priority
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
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
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </Layout>
  );
};

export default TourismPage;
