'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDistricts } from '@/utils/auth/admin/get/api';

const DistrictsPage = () => {
  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const result = await getDistricts();
        setDistricts(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDistricts();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Districts</h1>
      <button
        onClick={() => router.push('/dashboard/table/districts/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add New Districts
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {districts.map((district) => (
              <tr key={district.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{district.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{district.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    onClick={() => router.push(`/dashboard/table/districts/edit/${district.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictsPage;
