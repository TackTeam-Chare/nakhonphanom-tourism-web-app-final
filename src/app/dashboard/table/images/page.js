'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getPlaceImages } from '@/utils/auth/admin/get/api';
import { deletePlaceImage } from '@/utils/auth/admin/delete/api';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImagesIndexPage = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await getPlaceImages();
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching images:', error);
        toast.error('Error fetching images');
      }
    };

    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this place?</p>
          <button
            onClick={async () => {
              try {
                await deletePlaceImage(id);
                setImages((prevImages) => prevImages.filter((image) => image.id !== id));
                toast.success('Place deleted successfully!');
                closeToast();
              } catch (error) {
                console.error(`Error deleting place with ID ${id}:`, error);
                toast.error('Error deleting place. Please try again.');
              }
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="bg-gray-600 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-700 transition duration-300 ease-in-out"
          >
            No
          </button>
        </div>
      ),
      { closeButton: false }
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Image',
        accessor: 'image_url',
        Cell: ({ cell: { value }, row }) => (
          <Image
            src={value}
            alt={row.original.image_path}
            width={100}
            height={100}
            className="object-cover rounded-lg"
            priority // Adding priority to ensure the image is loaded eagerly
          />
        ),
      },
      {
        Header: 'Tourism Entity',
        accessor: 'tourism_entities_id',
        Cell: ({ cell: { value }, row }) => (
          <span>{`ID: ${value}, Name: ${row.original.tourism_entity_name}`}</span>
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => router.push(`/dashboard/table/images/edit/${row.original.id}`)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [router]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: images,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">All Images</h1>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push('/dashboard/table/images/add')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Add New Images
          </button>
          <input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                      className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.original.id} className="hover:bg-gray-100 transition duration-300 ease-in-out">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
            Previous
          </button>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
            Next
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ImagesIndexPage;
