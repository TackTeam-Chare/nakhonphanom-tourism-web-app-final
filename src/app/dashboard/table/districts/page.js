'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDistricts } from '@/utils/auth/admin/get/api';
import { deleteDistrict } from '@/utils/auth/admin/delete/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this district?')) {
      try {
        await deleteDistrict(id);
        setDistricts(districts.filter(district => district.id !== id));
        toast.success('District deleted successfully!');
      } catch (error) {
        console.error(`Error deleting district with ID ${id}:`, error);
        toast.error('Error deleting district. Please try again.');
      }
    }
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Districts</h1>
      <button
        onClick={() => router.push('/dashboard/table/districts/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Add New District
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
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
                  <button
                    onClick={() => handleDelete(district.id)}
                    className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DistrictsPage;
