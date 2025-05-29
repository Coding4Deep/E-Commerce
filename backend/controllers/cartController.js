const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    // For demo purposes, we'll use a hardcoded user ID
    // In a real app, this would come from authentication
    const userId = '60d0fe4f5311236168a109ca';
    
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      // Create an empty cart if none exists
      cart = await Cart.create({
        user: userId,
        cartItems: [],
      });
    }
    
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    
    // For demo purposes, we'll use a hardcoded user ID
    // In a real app, this would come from authentication
    const userId = '60d0fe4f5311236168a109ca';
    
    // Find the product
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if quantity is available
    if (product.countInStock < qty) {
      return res.status(400).json({ message: 'Product out of stock' });
    }
    
    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      // Create a new cart if none exists
      cart = await Cart.create({
        user: userId,
        cartItems: [],
      });
    }
    
    // Check if item already exists in cart
    const existItem = cart.cartItems.find(
      (item) => item.product.toString() === productId
    );
    
    if (existItem) {
      // Update quantity if item exists
      cart.cartItems = cart.cartItems.map((item) =>
        item.product.toString() === productId
          ? {
              ...item,
              qty: Number(qty),
            }
          : item
      );
    } else {
      // Add new item to cart
      cart.cartItems.push({
        product: productId,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: Number(qty),
      });
    }
    
    // Save updated cart
    await cart.save();
    
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getCart,
  addToCart,
};