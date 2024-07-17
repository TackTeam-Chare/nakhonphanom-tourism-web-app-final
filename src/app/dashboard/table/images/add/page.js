"use client"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function UploadImages() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('tourism_entities_id', data.tourism_entities_id);
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('image_paths', imageFiles[i]);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/place/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading images:', error);
      setMessage('Error uploading images');
    }
  };

  const handleFileChange = (e) => {
    setImageFiles(e.target.files);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Upload Images</h1>
        <button
        onClick={() => router.push('/dashboard/table/images/add')}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Add New Images
      </button>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Tourism Entity ID</label>
            <input
              type="text"
              {...register('tourism_entities_id', { required: 'Tourism Entity ID is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.tourism_entities_id && (
              <p className="text-red-500 text-sm mt-1">{errors.tourism_entities_id.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
              type="file"
              {...register('image_paths', { required: 'Please select images' })}
              multiple
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.image_paths && (
              <p className="text-red-500 text-sm mt-1">{errors.image_paths.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
