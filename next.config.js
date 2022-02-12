const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  compress: false, // brotli compress rather than default gzip support of next.js
  env: {
    contractAddress: '0xF5C1FaD9aD2C12b13e528f585Ce7c528a65fAd51',
    preSaleAmount: 60000000000000000,
    publicSaleAmount: 120000000000000000,
    rpcURI: 'https://speedy-nodes-nyc.moralis.io/a0dd13b0091772cbf75a91db/eth/rinkeby',
    network: 'rinkeby',
    api: '',
    //googleApiKey: '',
    //production: process.env.PRODUCTION,
  },
  images: {
    domains: ["ipfs.io"],
  },
});
