const amqp = require('amqplib');

let channel = null;

const connectRabbitMQ = async () => {
  try {
    // Add retry logic for RabbitMQ connection
    let retries = 5;
    let connection;
    
    while (retries) {
      try {
        connection = await amqp.connect(process.env.RABBITMQ_URI || 'amqp://rabbitmq:5672');
        break;
      } catch (err) {
        console.log(`RabbitMQ connection attempt failed, retries left: ${retries}`);
        retries--;
        // Wait for 5 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        if (retries === 0) {
          throw err;
        }
      }
    }
    
    channel = await connection.createChannel();
    
    // Ensure the order queue exists
    await channel.assertQueue('order_notifications', {
      durable: true
    });
    
    console.log('RabbitMQ Connected');
    return channel;
  } catch (error) {
    console.error(`RabbitMQ Error: ${error.message}`);
    // Don't exit the process, just log the error
    // process.exit(1);
    return null;
  }
};

const getChannel = () => {
  if (!channel) {
    console.warn('RabbitMQ channel not initialized');
    return null;
  }
  return channel;
};

module.exports = { connectRabbitMQ, getChannel };