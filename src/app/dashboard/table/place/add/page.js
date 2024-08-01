'use client';

import { useState, useEffect } from "react";
import { createTouristEntity } from "@/utils/auth/admin/add/api";
import { getDistricts, getCategories, getSeasons } from "@/utils/auth/admin/get/api";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    district_name: "",
    category_name: "",
    season_id: "",
    operating_hours: [],
    image_paths: null,
  });
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [operatingHour, setOperatingHour] = useState({
    day_of_week: "",
    opening_time: "",
    closing_time: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [districtsData, categoriesData, seasonsData] = await Promise.all([getDistricts(), getCategories(), getSeasons()]);
        setDistricts(districtsData);
        setCategories(categoriesData);
        setSeasons(seasonsData);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError("Failed to load data. Please try again.");
        toast.error("Failed to load data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "image_paths" ? files : value,
    }));
  };

  const handleOperatingHourChange = (e) => {
    const { name, value } = e.target;
    setOperatingHour((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addOperatingHour = () => {
    setFormData((prevState) => ({
      ...prevState,
      operating_hours: [...prevState.operating_hours, operatingHour]
    }));
    setOperatingHour({ day_of_week: "", opening_time: "", closing_time: "" });
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
        } else if (key === "operating_hours") {
          data.append(key, JSON.stringify(formData[key]));
        } else {
          data.append(key, formData[key]);
        }
      }

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
        season_id: "",
        operating_hours: [],
        image_paths: null,
      });
      setError("");
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Failed to create project", error);
      setError("Failed to create project. Please try again.");
      toast.error("Failed to create project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Project</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.name ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Project Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="description"
              id="description"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              value={formData.description}
              onChange={handleChange}
              rows="3"
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
              name="location"
              id="location"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              placeholder=" "
              value={formData.location}
              onChange={handleChange}
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
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="latitude"
                id="latitude"
                className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                placeholder=" "
                value={formData.latitude}
                onChange={handleChange}
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
                name="longitude"
                id="longitude"
                className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                placeholder=" "
                value={formData.longitude}
                onChange={handleChange}
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
              name="district_name"
              id="district_name"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              value={formData.district_name}
              onChange={handleChange}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
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
              name="category_name"
              id="category_name"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              value={formData.category_name}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
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
            <select
              name="season_id"
              id="season_id"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              value={formData.season_id}
              onChange={handleChange}
            >
              <option value="">Select Season</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="season_id"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.season_id ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Season
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="operating_hours"
              className="block text-sm font-medium text-gray-700"
            >
              Operating Hours
            </label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <select
                name="day_of_week"
                value={operatingHour.day_of_week}
                onChange={handleOperatingHourChange}
                className="block py-2 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              >
                <option value="">Day of Week</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
              <input
                type="time"
                name="opening_time"
                value={operatingHour.opening_time}
                onChange={handleOperatingHourChange}
                className="block py-2 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              />
              <input
                type="time"
                name="closing_time"
                value={operatingHour.closing_time}
                onChange={handleOperatingHourChange}
                className="block py-2 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              />
              <button
                type="button"
                onClick={addOperatingHour}
                className="col-span-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Operating Hour
              </button>
            </div>
            <div className="space-y-2">
              {formData.operating_hours.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    {hour.day_of_week}: {hour.opening_time} - {hour.closing_time}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              name="image_paths"
              id="image_paths"
              className="block py-2.5 px-4 w-full text-sm text-gray-900 bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
              multiple
              onChange={handleChange}
            />
            <label
              htmlFor="image_paths"
              className={`absolute text-sm text-gray-500 bg-white px-1 transform duration-300 -translate-y-6 scale-75 top-0 left-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                formData.image_paths ? 'scale-75 -translate-y-6' : ''
              }`}
            >
              Image Paths
            </label>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out ${
                submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}
