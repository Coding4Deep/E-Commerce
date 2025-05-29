const { getChannel } = require('../config/rabbitmq');

const sendOrderNotification = async (order) => {
  try {
    const channel = getChannel();
    if (!channel) {
      console.log('RabbitMQ channel not available, skipping order notification');
      return false;
    }
    
    const message = {
      orderId: order._id.toString(),
      userId: order.user.toString(),
      totalPrice: order.totalPrice,
      timestamp: new Date().toISOString(),
    };
    
    channel.sendToQueue(
      'order_notifications',
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    
    console.log(`Order notification sent for order ${order._id}`);
    return true;
  } catch (error) {
    console.error('Error sending order notification:', error);
    return false;
  }
};

const setupOrderConsumer = () => {
  try {
    const channel = getChannel();
    if (!channel) {
      console.log('RabbitMQ channel not available, skipping order consumer setup');
      return;
    }
    
    channel.consume('order_notifications', (msg) => {
      if (msg !== null) {
        const orderData = JSON.parse(msg.content.toString());
        console.log('Order notification received:', orderData);
        
        // Here you would typically send an email, SMS, or other notification
        // For demo purposes, we'll just log it
        console.log(`Processing order notification for order ${orderData.orderId}`);
        
        // Acknowledge the message
        channel.ack(msg);
      }
    });
    
    console.log('Order notification consumer set up');
  } catch (error) {
    console.error('Error setting up order consumer:', error);
  }
};

module.exports = {
  sendOrderNotification,
  setupOrderConsumer,
};