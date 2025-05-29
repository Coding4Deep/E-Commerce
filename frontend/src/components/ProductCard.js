import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    
    // Reset the "Added" state after 2 seconds
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 relative">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-400">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
            ({product.numReviews} reviews)
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0 || added}
            className={`flex items-center px-3 py-1 rounded-full transition-colors duration-300 ${
              product.countInStock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : added
                ? 'bg-green-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {added ? (
              'Added!'
            ) : (
              <>
                <ShoppingCartIcon className="h-4 w-4 mr-1" />
                <span className="text-xs">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Stock badge */}
      <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
        product.countInStock > 0
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
      </div>
    </div>
  );
};

export default ProductCard;