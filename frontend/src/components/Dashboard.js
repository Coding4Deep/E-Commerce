import React from 'react';
import UserStats from './UserStats';

const Dashboard = () => {
  // Sample dashboard statistics
  const dashboardStats = [
    {
      title: 'Monthly Sales',
      value: '$12,500',
      change: '+12%',
      icon: 'chart',
      image: '/images/dashboard/sales-chart.png'
    },
    {
      title: 'New Customers',
      value: '64',
      change: '+8%',
      icon: 'users',
      image: '/images/dashboard/new-users.png'
    },
    {
      title: 'Avg. Order Value',
      value: '$195',
      change: '+5%',
      icon: 'shopping-cart',
      image: '/images/dashboard/order-value.png'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      icon: 'conversion',
      image: '/images/dashboard/conversion.png'
    }
  ];

  return (
    <div className="mt-8 mb-12">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h2>
      
      {/* User Statistics */}
      <div className="mb-8">
        <UserStats />
      </div>
      
      {/* Dashboard Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{stat.title}</h3>
              <div className={`flex items-center ${
                stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
                <span>{stat.change}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <img src={stat.image} alt={stat.title} className="w-16 h-16 object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;