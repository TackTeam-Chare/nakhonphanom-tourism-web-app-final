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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tables.map((table) => (
          <Link key={table.name} href={table.path} legacyBehavior>
            <a className="block bg-white rounded-lg shadow-lg overflow-hidden p-6 hover:bg-indigo-600 hover:text-white transition-colors duration-300">
              <h2 className="text-2xl font-bold mb-2 text-center">{table.name}</h2>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TableIndexPage;
