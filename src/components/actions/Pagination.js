import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Pagination = ({ initialPage, totalPages, onPageChange }) => {
  // Local state to manage the current page
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Update the currentPage when initialPage changes
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  // Function to get page numbers with ellipses
  const getPagination = () => {
    const delta = 2; // Number of pages to show around the current page
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pages = getPagination();

  // Handle page change and stay in the same position
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return (
    <nav className="flex justify-center mt-8">
      <div className="pagination flex items-center space-x-2">
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`pagination-link ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} px-3 py-1 rounded-l-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {/* Page Number Buttons */}
        {pages.map((page, index) => 
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`pagination-link ${page === currentPage ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'} px-3 py-1 border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="pagination-ellipsis px-3 py-1 text-gray-500"
            >
              {page}
            </span>
          )
        )}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`pagination-link ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} px-3 py-1 rounded-r-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
