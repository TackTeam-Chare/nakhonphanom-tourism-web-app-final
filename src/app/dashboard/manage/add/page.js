 "use client"
import { useState } from 'react';


export default function CreateProject() {
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // นำ formData ไปส่งไปยัง backend หรือทำการจัดเก็บข้อมูลตามที่ต้องการ
      console.log(formData);
      // เพิ่มโค้ดส่วนการส่งข้อมูลไปยัง backend หรือทำการบันทึกข้อมูล
      // ตัวอย่างการใช้งาน fetch API สำหรับการส่งข้อมูลไปยัง backend
      const response = await fetch('/api/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      // การจัดการกับการส่งข้อมูลสำเร็จ
      // เช่น รีเซ็ตค่าในฟอร์มหรือแสดงข้อความสำเร็จ
      setFormData({
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
      setError('');
      alert('Project created successfully!');
    } catch (error) {
      // การจัดการข้อผิดพลาด
      console.error('Failed to create project', error);
      setError('Failed to create project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">Create Project</h1>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="mb-4">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
            <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">Opening Time</label>
              <input type="text" id="openingTime" name="openingTime" value={formData.openingTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">Closing Time</label>
              <input type="text" id="closingTime" name="closingTime" value={formData.closingTime} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
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
