'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const sampleData = [
  { id: 1, name: 'Project One', description: 'This is the first project', location: 'Location One', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Project Two', description: 'This is the second project', location: 'Location Two', imageUrl: 'https://via.placeholder.com/150' },
  // เพิ่มข้อมูลตัวอย่างตามที่ต้องการ
];

export default function ProjectTable() {
  const [data, setData] = useState(sampleData);
  const [selectedProject, setSelectedProject] = useState(null);
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/dashboard/manage/edit?id=${id}`);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const handleAdd = () => {
    router.push('/dashboard/manage/add');
  };

  const handleRowClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Project List</h1>
      <div className="flex justify-end mb-4">
        <button onClick={handleAdd} className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
          Add New Project
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Description</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Location</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} className="hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handleRowClick(item)}>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{item.id}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{item.name}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{item.description}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">{item.location}</td>
                <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                  <button onClick={(e) => { e.stopPropagation(); handleEdit(item.id); }} className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2">
                    Edit
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 relative">
            <button onClick={handleCloseModal} className="absolute top-1 right-1 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={selectedProject.imageUrl} alt={selectedProject.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{selectedProject.name}</h2>
            <p className="text-sm text-gray-700 mb-1"><strong>ID:</strong> {selectedProject.id}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Description:</strong> {selectedProject.description}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Location:</strong> {selectedProject.location}</p>
            {/* เพิ่มรายละเอียดเพิ่มเติมตามต้องการ */}
          </div>
        </div>
      )}
    </div>
  );
}
