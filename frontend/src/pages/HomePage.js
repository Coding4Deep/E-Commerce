import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import UserStats from '../components/UserStats';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <UserStats />
        </div>
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default HomePage;