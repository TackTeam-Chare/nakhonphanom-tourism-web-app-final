'use client';

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import { getPlaceById, getDistricts, getCategories } from "@/utils/auth/admin/get/api";
import { updateTouristEntity } from "@/utils/auth/admin/edit/api";

export default function EditPlace() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    district_name: "",
    category_name: "",
    image_paths: null,
  });
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [districtsData, categoriesData, placeData] = await Promise.all([
          getDistricts(),
          getCategories(),
          getPlaceById(id)
        ]);
        setDistricts(districtsData);
        setCategories(categoriesData);
        setFormData({
          name: placeData.name,
          description: placeData.description,
          location: placeData.location,
          latitude: placeData.latitude,
          longitude: placeData.longitude,
          district_name: placeData.district_name || "",
          category_name: placeData.category_name || "",
          image_paths: null,
        });
        setExistingImages(placeData.images || []);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'image_paths' ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === "image_paths" && formData[key]) {
          for (let i = 0; i < formData[key].length; i++) {
            formDataToSend.append(key, formData[key][i]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await updateTouristEntity(id, formDataToSend);
      if (!response) {
        throw new Error("Failed to update place");
      }

      setError("");
      alert("Place updated successfully!");
      router.push('/dashboard/table/place');
    } catch (error) {
      console.error("Failed to update place", error);
      setError("Failed to update place. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Edit Place</h1>
      <div className="text-center mb-4">
        <span className="text-lg font-semibold text-gray-700">Place ID: </span>
        <span className="text-lg font-semibold text-gray-700">{id}</span>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="district_name" className="block text-sm font-medium text-gray-700">District</label>
          <select
            id="district_name"
            name="district_name"
            value={formData.district_name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>{district.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category_name"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Existing Images</label>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((image, index) => (
              <img key={index} src={image.image_url} alt={image.image_path} className="w-20 h-20 object-cover rounded-md" />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="image_paths" className="block text-sm font-medium text-gray-700">Upload New Images</label>
          <input
            type="file"
            id="image_paths"
            name="image_paths"
            multiple
            onChange={handleChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mt-6">
          <button type="submit" disabled={submitting} className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {submitting ? 'Updating...' : 'Update Place'}
          </button>
        </div>
      </form>
    </div>
  );
}
