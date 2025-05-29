const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Sample products data
const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    image: '/images/headphones.jpg',
    description: 'High-quality wireless headphones with noise cancellation',
    brand: 'AudioTech',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    featured: true,
  },
  {
    name: 'Smartphone X',
    image: '/images/smartphone.jpg',
    description: 'Latest smartphone with advanced camera and long battery life',
    brand: 'TechGiant',
    category: 'Electronics',
    price: 699.99,
    countInStock: 7,
    rating: 4.8,
    numReviews: 8,
    featured: true,
  },
  {
    name: 'Coffee Maker Deluxe',
    image: '/images/coffeemaker.jpg',
    description: 'Programmable coffee maker with built-in grinder',
    brand: 'HomeAppliances',
    category: 'Kitchen',
    price: 129.99,
    countInStock: 5,
    rating: 4.2,
    numReviews: 10,
    featured: false,
  },
  {
    name: 'Fitness Tracker Pro',
    image: '/images/fitnesstracker.jpg',
    description: 'Track your workouts, heart rate, and sleep patterns',
    brand: 'FitTech',
    category: 'Fitness',
    price: 49.99,
    countInStock: 15,
    rating: 4,
    numReviews: 12,
    featured: true,
  },
  {
    name: 'Laptop Ultra',
    image: '/images/laptop.jpg',
    description: 'Powerful laptop for work and gaming',
    brand: 'TechGiant',
    category: 'Electronics',
    price: 1299.99,
    countInStock: 3,
    rating: 4.7,
    numReviews: 14,
    featured: true,
  },
  {
    name: 'Smart Watch',
    image: '/images/smartwatch.jpg',
    description: 'Stay connected with this stylish smart watch',
    brand: 'WearTech',
    category: 'Electronics',
    price: 199.99,
    countInStock: 8,
    rating: 4.3,
    numReviews: 6,
    featured: false,
  },
  {
    name: 'Digital Camera',
    image: '/images/camera.jpg',
    description: 'Professional digital camera with 4K video recording',
    brand: 'PhotoPro',
    category: 'Electronics',
    price: 599.99,
    countInStock: 4,
    rating: 4.6,
    numReviews: 9,
    featured: true,
  },
  {
    name: 'Blender Pro',
    image: '/images/blender.jpg',
    description: 'High-powered blender for smoothies and food processing',
    brand: 'KitchenMaster',
    category: 'Kitchen',
    price: 79.99,
    countInStock: 12,
    rating: 4.1,
    numReviews: 7,
    featured: false,
  },
  {
    name: 'Yoga Mat Premium',
    image: '/images/yogamat.jpg',
    description: 'Non-slip yoga mat for comfortable practice',
    brand: 'YogaEssentials',
    category: 'Fitness',
    price: 29.99,
    countInStock: 20,
    rating: 4.4,
    numReviews: 11,
    featured: false,
  },
  {
    name: 'Backpack Adventure',
    image: '/images/backpack.jpg',
    description: 'Durable backpack for hiking and travel',
    brand: 'OutdoorGear',
    category: 'Accessories',
    price: 59.99,
    countInStock: 9,
    rating: 4.2,
    numReviews: 8,
    featured: true,
  }
];

// Sample users data
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Import users
    await User.insertMany(users);
    console.log('Users imported successfully!');

    // Import products
    await Product.insertMany(products);
    console.log('Products imported successfully!');

    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}