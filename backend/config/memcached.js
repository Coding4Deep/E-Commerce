const Memcached = require('memcached');

const memcachedClient = new Memcached(process.env.MEMCACHED_URI || 'memcached:11211', {
  retries: 10,
  retry: 10000,
  remove: true,
  failOverServers: [],
});

module.exports = memcachedClient;