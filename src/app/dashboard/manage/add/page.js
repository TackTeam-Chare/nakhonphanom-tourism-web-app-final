"use client";
import { useState, useEffect } from "react";
import { createTouristEntity, getDistricts, getCategories } from "@/utils/auth/admin/api";

export default function CreateProject() {
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDistrictsAndCategories = async () => {
      try {
        const [districtsData, categoriesData] = await Promise.all([getDistricts(), getCategories()]);
        setDistricts(districtsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch districts and categories", error);
      }
    };

    fetchDistrictsAndCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "image_paths" ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "image_paths") {
          if (formData[key]) {
            for (let i = 0; i < formData[key].length; i++) {
              data.append(key, formData[key][i]);
            }
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      console.log('Sending Data:', formData);

      const response = await createTouristEntity(data);

      if (!response) {
        throw new Error("Failed to create project");
      }

      setFormData({
        name: "",
        description: "",
        location: "",
        latitude: "",
        longitude: "",
        district_name: "",
        category_name: "",
        image_paths: null,
      });
      setError("");
      alert("Project created successfully!");
    } catch (error) {
      console.error("Failed to create project", error);
      setError("Failed to create project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Create Project</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
            <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
            <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="district_name" className="block text-sm font-medium text-gray-700">District</label>
          <select id="district_name" name="district_name" value={formData.district_name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>{district.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category_name" name="category_name" value={formData.category_name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image_paths" className="block text-sm font-medium text-gray-700">Image Paths</label>
          <input type="file" id="image_paths" name="image_paths" multiple onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mt-6">
          <button type="submit" disabled={submitting} className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {submitting ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
