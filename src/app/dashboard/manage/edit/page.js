 "use client"
import { useState, useEffect } from 'react';

export default function EditProject({ initialData }) {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    location: '',
    latitude: '',
    longitude: '',
    district: '',
    category: '',
    createdBy: '',
    season: '',
    openingTime: '',
    closingTime: ''
  });

  // Update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        projectName: initialData.projectName || '',
        description: initialData.description || '',
        location: initialData.location || '',
        latitude: initialData.latitude || '',
        longitude: initialData.longitude || '',
        district: initialData.district || '',
        category: initialData.category || '',
        createdBy: initialData.createdBy || '',
        season: initialData.season || '',
        openingTime: initialData.openingTime || '',
        closingTime: initialData.closingTime || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Implement your save logic here
  };

  // Render loading state if initialData is not yet available
  // if (!initialData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            <div className="p-6 sm:px-10 bg-white">
              <h1 className="text-3xl font-semibold mb-4 text-center">Edit Project</h1>
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="mb-4">
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} rows="3" className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                  <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Created By</label>
                  <input type="text" id="createdBy" name="createdBy" value={formData.createdBy} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                  <label htmlFor="season" className="block text-sm font-medium text-gray-700">Season</label>
                  <input type="text" id="season" name="season" value={formData.season} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">Opening Time</label>
                    <input type="text" id="openingTime" name="openingTime" value={formData.openingTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">Closing Time</label>
                    <input type="text" id="closingTime" name="closingTime" value={formData.closingTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                  </div>
                </div>
                <div className="mt-6">
                  <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
