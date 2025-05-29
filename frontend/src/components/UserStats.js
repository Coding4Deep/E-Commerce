import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserStats = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/users/count`);
        setUserCount(data.count);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user count:', error);
        setError('Failed to load user statistics');
        setLoading(false);
      }
    };

    fetchUserCount();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">User Statistics</h2>
      <div className="flex items-center">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">{userCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;