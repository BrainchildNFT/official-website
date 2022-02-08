const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  compress: false, // brotli compress rather than default gzip support of next.js
  env: {
    contractAddress: '0xBD1029b72bf166322B4e8f22c87cc315c3f50789',
    //googleApiKey: '',
    //api: process.env.API_URL || 'http://127.0.0.1:3005/api',
    //production: process.env.PRODUCTION,
  },
});
