'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllSeasonsRelations } from '@/utils/auth/admin/get/api';
import { deleteSeasonsRelations } from '@/utils/auth/admin/delete/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeasonsRelationIndexPage = () => {
  const [relations, setRelations] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRelations = async () => {
      try {
        const result = await getAllSeasonsRelations();
        setRelations(result);
      } catch (err) {
        setError(err.message);
        toast.error('Error fetching relations');
      }
    };

    fetchRelations();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this relation?')) {
      try {
        await deleteSeasonsRelations(id);
        setRelations(relations.filter(relation => relation.id !== id));
        toast.success('Relation deleted successfully!');
      } catch (error) {
        console.error(`Error deleting relation with ID ${id}:`, error);
        toast.error('Error deleting relation. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Seasons Relations</h1>
      <button
        onClick={() => router.push('/dashboard/table/seasons-relation/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Add New Operating Hour
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Season ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Tourism Entity ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {relations.map((relation) => (
              <tr key={relation.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{relation.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{relation.season_id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{relation.tourism_entities_id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                  <button
                    onClick={() => router.push(`/dashboard/table/seasons-relation/edit/${relation.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(relation.id)}
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

export default SeasonsRelationIndexPage;
