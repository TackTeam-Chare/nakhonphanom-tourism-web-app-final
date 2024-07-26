'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../../utils/auth/auth';
import { useState } from 'react';

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleLogout = async () => {
    setLoading(true);
    setAlert({ type: '', message: '' });
    try {
        //await logout();
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
    <div>
      {alert.message && (
        <div
          className={`${
            alert.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'
          } border px-4 py-3 rounded relative mb-4`}
          role="alert"
        >
          <span className="block sm:inline">{alert.message}</span>
        </div>
      )}
      <button
        onClick={handleLogout}
        className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default LogoutButton;
