'use client';

import React from 'react';
import Link from 'next/link';

const TableIndexPage = () => {
  const tables = [
    { name: 'Categories', path: '/dashboard/table/categories' },
    { name: 'Districts', path: '/dashboard/table/districts' },
    { name: 'Images', path: '/dashboard/table/images' },
    { name: 'Place', path: '/dashboard/table/place' },
    { name: 'Seasons', path: '/dashboard/table/seasons' },
    { name: 'Seasons Relation', path: '/dashboard/table/seasons-relation' },
    { name: 'Time', path: '/dashboard/table/time' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">Dashboard Tables</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Table Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr key={index} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                  <td className="text-left py-3 px-4">{table.name}</td>
                  <td className="text-left py-3 px-4">
                    <Link className="text-indigo-600 hover:text-indigo-900 transition-colors duration-300" href={table.path}>
                    View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableIndexPage;
