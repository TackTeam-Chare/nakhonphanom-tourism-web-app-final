'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSeasons } from '@/utils/auth/admin/get/api';
import { deleteSeason } from '@/utils/auth/admin/delete/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeasonsPage = () => {
  const [seasons, setSeasons] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const result = await getSeasons();
        setSeasons(result);
      } catch (err) {
        setError(err.message);
        toast.error('Error fetching seasons');
      }
    };

    fetchSeasons();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this season?')) {
      try {
        await deleteSeason(id);
        setSeasons(seasons.filter(season => season.id !== id));
        toast.success('Season deleted successfully!');
      } catch (error) {
        console.error(`Error deleting season with ID ${id}:`, error);
        toast.error('Error deleting season. Please try again.');
      }
    }
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Seasons</h1>
      <button
        onClick={() => router.push('/dashboard/table/seasons/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Add New Season
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Start Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">End Date</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {seasons.map((season) => (
              <tr key={season.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{season.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{season.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{season.date_start}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{season.date_end}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-right">
                  <button
                    onClick={() => router.push(`/dashboard/table/seasons/edit/${season.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(season.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-red-700 transition duration-300 ease-in-out"
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

export default SeasonsPage;
