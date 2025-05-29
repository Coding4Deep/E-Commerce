const memcachedClient = require('../config/memcached');

// Cache duration in seconds
const CACHE_DURATION = 3600; // 1 hour

const cacheProducts = (key, products) => {
  return new Promise((resolve, reject) => {
    memcachedClient.set(key, JSON.stringify(products), CACHE_DURATION, (err) => {
      if (err) {
        console.error('Memcached set error:', err);
        return reject(err);
      }
      resolve(true);
    });
  });
};

const getCachedProducts = (key) => {
  return new Promise((resolve, reject) => {
    memcachedClient.get(key, (err, data) => {
      if (err) {
        console.error('Memcached get error:', err);
        return reject(err);
      }
      if (!data) {
        return resolve(null);
      }
      try {
        const products = JSON.parse(data);
        resolve(products);
      } catch (e) {
        console.error('Error parsing cached data:', e);
        reject(e);
      }
    });
  });
};

const invalidateCache = (key) => {
  return new Promise((resolve, reject) => {
    memcachedClient.del(key, (err) => {
      if (err) {
        console.error('Memcached delete error:', err);
        return reject(err);
      }
      resolve(true);
    });
  });
};

module.exports = {
  cacheProducts,
  getCachedProducts,
  invalidateCache,
};