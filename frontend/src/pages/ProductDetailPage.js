import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const { addToCart } = useCart();
  
  const addToCartHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              ({product.numReviews} reviews)
            </span>
          </div>
          
          <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </p>
            <p className={`mt-2 ${
              product.countInStock > 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {product.description}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-gray-700 dark:text-gray-300 mr-3">Quantity:</span>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                disabled={product.countInStock === 0}
              >
                {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-md ${
                product.countInStock > 0
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400'
              } transition-colors duration-300`}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24">Brand:</span>
              <span className="text-gray-600 dark:text-gray-400">{product.brand}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300 font-semibold w-24">Category:</span>
              <span className="text-gray-600 dark:text-gray-400">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;