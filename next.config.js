const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  compress: false, // brotli compress rather than default gzip support of next.js
  env: {
    // TODO: list environment variables
    //googleApiKey: '',
    //api: process.env.API_URL || 'http://127.0.0.1:3005/api',
    //production: process.env.PRODUCTION,
  },
});
