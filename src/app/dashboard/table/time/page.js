'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllOperatingHours } from '@/utils/auth/admin/get/api';
import { deleteOperatingHours } from '@/utils/auth/admin/delete/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.error('Error fetching operating hours');
      }
    };

    fetchOperatingHours();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this operating hour?')) {
      try {
        await deleteOperatingHours(id);
        setOperatingHours(operatingHours.filter(hour => hour.id !== id));
        toast.success('Operating hour deleted successfully!');
      } catch (error) {
        console.error(`Error deleting operating hour with ID ${id}:`, error);
        toast.error('Error deleting operating hour. Please try again.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Operating Hours</h1>
      <button
        onClick={() => router.push('/dashboard/table/time/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
      >
        Add New Operating Hour
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Place ID</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Day of Week</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Opening Time</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">Closing Time</th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {operatingHours.map((hour) => (
              <tr key={hour.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hour.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hour.place_id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hour.day_of_week}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hour.opening_time}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{hour.closing_time}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-right">
                  <button
                    onClick={() => router.push(`/dashboard/table/time/edit/${hour.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hour.id)}
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

export default OperatingHoursPage;
