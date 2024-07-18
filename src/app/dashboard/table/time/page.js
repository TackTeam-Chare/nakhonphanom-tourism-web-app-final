'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllOperatingHours } from '@/utils/auth/admin/get/api';
import { deleteOperatingHours } from '@/utils/auth/admin/delete/api';

const OperatingHoursPage = () => {
  const [operatingHours, setOperatingHours] = useState([]);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchOperatingHours = async () => {
      try {
        const result = await getAllOperatingHours();
        setOperatingHours(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOperatingHours();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this operating hour?')) {
      try {
        await deleteOperatingHours(id);
        setOperatingHours(operatingHours.filter(hour => hour.id !== id));
        setAlert({ type: 'success', message: 'Operating hour deleted successfully!' });
      } catch (error) {
        console.error(`Error deleting operating hour with ID ${id}:`, error);
        setError('Error deleting operating hour. Please try again.');
        setAlert({ type: 'error', message: 'Error deleting operating hour. Please try again.' });
      }
    }
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Operating Hours</h1>
      {alert.message && (
        <div
          className={`${
            alert.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'
          } border px-4 py-3 rounded relative mb-4`}
          role="alert"
        >
          <span className="block sm:inline">{alert.message}</span>
        </div>
      )}
      <button
        onClick={() => router.push('/dashboard/table/time/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add New Operating Hour
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Place ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Day of Week</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Opening Time</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Closing Time</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {operatingHours.map((hour) => (
              <tr key={hour.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{hour.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{hour.place_id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{hour.day_of_week}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{hour.opening_time}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{hour.closing_time}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-right">
                  <button
                    onClick={() => router.push(`/dashboard/table/time/edit/${hour.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hour.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Delete
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

export default OperatingHoursPage;
