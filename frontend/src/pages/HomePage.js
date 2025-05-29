import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import UserStats from '../components/UserStats';
import Dashboard from '../components/Dashboard';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Dashboard />
        </div>
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default HomePage;