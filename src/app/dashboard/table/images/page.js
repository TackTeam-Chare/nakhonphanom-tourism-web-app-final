'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getPlaceImages } from '@/utils/auth/admin/get/api';
import { deletePlaceImage } from '@/utils/auth/admin/delete/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImagesIndexPage = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await getPlaceImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching images:', error);
        toast.error('Error fetching images');
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this place?')) {
      try {
        await deletePlaceImage(id);
        setImages(images.filter(image => image.id !== id));
        toast.success('Place deleted successfully!');
      } catch (error) {
        console.error(`Error deleting place with ID ${id}:`, error);
        toast.error('Error deleting place. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">All Images</h1>
        <button
          onClick={() => router.push('/dashboard/table/images/add')}
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
        >
          Add New ImagesPlace
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Tourism Entity ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {images.map((image) => (
                <tr key={image.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <Image src={image.image_url} alt={image.image_path} width={100} height={100} className="object-cover rounded-lg" />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{image.tourism_entities_id}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <button
                      onClick={() => router.push(`/dashboard/table/images/edit/${image.id}`)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
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
    </div>
  );
};

export default ImagesIndexPage;
