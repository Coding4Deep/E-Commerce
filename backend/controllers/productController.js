const Product = require('../models/Product');
const { cacheProducts, getCachedProducts } = require('../services/memcachedService');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Try to get products from cache first
    const cachedProducts = await getCachedProducts('all_products');
    
    if (cachedProducts) {
      console.log('Returning products from cache');
      return res.json(cachedProducts);
    }
    
    // If not in cache, get from database
    console.log('Fetching products from database');
    const products = await Product.find({});
    console.log(`Found ${products.length} products in database`);
    
    // Store in cache for future requests
    if (products.length > 0) {
      await cacheProducts('all_products', products);
      console.log('Products cached successfully');
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    // Try to get featured products from cache first
    const cachedProducts = await getCachedProducts('featured_products');
    
    if (cachedProducts) {
      return res.json(cachedProducts);
    }
    
    // If not in cache, get from database
    const products = await Product.find({ featured: true });
    
    // Store in cache for future requests
    await cacheProducts('featured_products', products);
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    // Try to get product from cache first
    const cachedProduct = await getCachedProducts(`product_${req.params.id}`);
    
    if (cachedProduct) {
      return res.json(cachedProduct);
    }
    
    // If not in cache, get from database
    const product = await Product.findById(req.params.id);
    
    if (product) {
      // Store in cache for future requests
      await cacheProducts(`product_${req.params.id}`, product);
      return res.json(product);
    }
    
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductById,
};