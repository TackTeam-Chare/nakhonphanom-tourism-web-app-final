'use client';

import React, { useEffect, useState } from "react";
import Image from 'next/image';
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
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">Edit Place</h1>
        <div className="text-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Place ID: </span>
          <span className="text-lg font-semibold text-gray-700">{id}</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.name ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="description"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.description ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Description
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="location"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.location ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Location
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="latitude"
                className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  formData.latitude ? 'scale-75 -translate-y-6' : ''
                }`}
              >
                Latitude
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="longitude"
                className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  formData.longitude ? 'scale-75 -translate-y-6' : ''
                }`}
              >
                Longitude
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="district_name"
              name="district_name"
              value={formData.district_name}
              onChange={handleChange}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="district_name"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.district_name ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              District
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="category_name"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.category_name ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Category
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              id="image_paths"
              name="image_paths"
              multiple
              onChange={handleChange}
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            />
            <label
              htmlFor="image_paths"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.image_paths ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Images
            </label>
            {existingImages.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700">Existing Images:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative w-32 h-32">
                      {image.image_url && (
                        <Image
                          src={image.image_url}
                          fill
                          style={{ objectFit: 'cover' }}
                          alt={`Existing image ${index + 1}`}
                          className="rounded-md"
                          priority={index === 0} // Set priority for the first image
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white bg-indigo-600 rounded-md ${
              submitting ? 'bg-opacity-60 cursor-not-allowed' : 'hover:bg-indigo-700'
            }`}
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Update Place'}
          </button>
        </form>
      </div>
    </section>
  );
}
