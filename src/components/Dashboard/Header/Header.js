'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../../../utils/auth/auth'; // ปรับ path ให้ตรงกับที่เก็บฟังก์ชัน logout
import { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

export default function Header({ onToggleSidebar }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleLogout = async () => {
    setLoading(true);
    setAlert({ type: '', message: '' });
    try {
      const response = await logout();
      console.log("Logout successful:", response);
      if (!localStorage.getItem('token')) {
        setAlert({ type: 'success', message: 'Logout successful!' });
        router.push('/auth/login');
      } else {
        throw new Error('Failed to remove token');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      setAlert({ type: 'error', message: 'Logout failed. Please try again.' });
      setLoading(false);
    }
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative">
      <button onClick={onToggleSidebar} className="md:hidden text-gray-600">
        <FaBars />
      </button>
      <div className="flex items-center space-x-4">
        <FaSearch className="text-gray-600" />
        <input
          type="text"
          placeholder="Type to search..."
          className="border rounded-md px-4 py-2 focus:outline-none focus:ring"
        />
      </div>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600" />
        <div className="relative">
          <img
            src="/path/to/profile.jpg"
            alt="User Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
              <a href="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">
                <FaUserCircle className="inline mr-2" /> My Profile
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                disabled={loading}
              >
                <FaSignOutAlt className="inline mr-2" /> {loading ? 'Logging out...' : 'Log Out'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
