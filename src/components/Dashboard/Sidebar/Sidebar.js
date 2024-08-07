import { useState } from 'react';
import { FaHome, FaUser, FaBox, FaTable, FaAngleDown, FaAngleUp, FaChevronLeft, FaChevronRight, FaCity, FaClock, FaImage, FaMapMarkerAlt, FaTags, FaThList, FaSun, FaLink } from 'react-icons/fa';
import Link from 'next/link';

export default function Sidebar({ isOpen, onToggleSidebar }) {
  const [isTableOpen, setIsTableOpen] = useState(false);

  return (
    <aside className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 min-h-screen p-4 flex flex-col`}>
      <div className="flex justify-between items-center mb-8">
        <div className={`text-2xl font-bold ${isOpen ? 'block' : 'hidden'}`}>Dashboard</div>
        <button onClick={onToggleSidebar} className="text-white">
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      <nav>
        <Link href="/dashboard">
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <FaHome className="text-2xl" />
            <span className={`${isOpen ? 'block' : 'hidden'}`}>Home</span>
          </div>
        </Link>
        <div>
          <button
            onClick={() => setIsTableOpen(!isTableOpen)}
            className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <FaTable className="text-2xl" />
              <span className={`${isOpen ? 'block' : 'hidden'}`}>Table</span>
            </div>
            {isOpen && (isTableOpen ? <FaAngleUp /> : <FaAngleDown />)}
          </button>
          {isTableOpen && isOpen && (
            <div className="pl-6">
              <Link href="/dashboard/table/admins">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaThList className="text-xl" />
                  <span className="ml-2">Admin</span>
                </div>
              </Link>
              <Link href="/dashboard/table/categories">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaTags className="text-xl" />
                  <span className="ml-2">Categories</span>
                </div>
              </Link>
              <Link href="/dashboard/table/districts">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaMapMarkerAlt className="text-xl" />
                  <span className="ml-2">District</span>
                </div>
              </Link>
              <Link href="/dashboard/table/time">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaClock className="text-xl" />
                  <span className="ml-2">Operating Hours</span>
                </div>
              </Link>
              <Link href="/dashboard/table/seasons">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaSun className="text-xl" />
                  <span className="ml-2">Seasons</span>
                </div>
              </Link>
              <Link href="/dashboard/table/seasons-relation">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaLink className="text-xl" />
                  <span className="ml-2">Seasons Relation</span>
                </div>
              </Link>
              <Link href="/dashboard/table/images">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaImage className="text-xl" />
                  <span className="ml-2">Tourism Entities Images</span>
                </div>
              </Link>
              <Link href="/dashboard/table/place">
                <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <FaCity className="text-xl" />
                  <span className="ml-2">Tourist Entities</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        <Link href="/dashboard/places">
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
            <FaBox className="text-2xl" />
            <span className={`${isOpen ? 'block' : 'hidden'}`}>Places</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
}
