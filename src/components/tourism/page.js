"use client"
import { useEffect, useState } from 'react';
import { getAllFetchTourismData } from '../../utils/api';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/common/layout';

const TourismComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Tourism Data</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((place, index) => (
            <Link  className="hover:no-underline" key={index} href={`/tourism/${place.id}`}>
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
      </div>
    </Layout>
  );
};

export default TourismComponent;
