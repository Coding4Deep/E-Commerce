const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { sendOrderNotification } = require('../services/rabbitmqService');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
    } = req.body;
    
    // For demo purposes, we'll use a hardcoded user ID
    // In a real app, this would come from authentication
    const userId = '60d0fe4f5311236168a109ca';
    
    // Get user's cart
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }
    
    // Calculate total price
    const totalPrice = cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    
    // Create order
    const order = await Order.create({
      user: userId,
      orderItems: cart.cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    
    // Send order notification via RabbitMQ
    await sendOrderNotification(order);
    
    // Clear cart after order is created
    cart.cartItems = [];
    await cart.save();
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    // For demo purposes, we'll use a hardcoded user ID
    // In a real app, this would come from authentication
    const userId = '60d0fe4f5311236168a109ca';
    
    const orders = await Order.find({ user: userId });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createOrder,
  getOrders,
};