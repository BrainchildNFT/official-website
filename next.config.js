const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  compress: false, // brotli compress rather than default gzip support of next.js
  env: {
    contractAddress: '0x59d40F2CAD16ecA53996706c7f4895a4A9d0183b',
    ownerAddress: '0xaE10709C836736331aDDbcCec86c6A6399419a6B',
    rpcURI: 'https://speedy-nodes-nyc.moralis.io/a0dd13b0091772cbf75a91db/eth/mainnet',
    api: 'https://api.brainchildnft.com',
    infuraId: '41ef39b8a23943439d5c1d071593c52f',
    mintCount: 3,
    //googleApiKey: '',
    //production: process.env.PRODUCTION,
  },
  images: {
    domains: ['ipfs.io'],
  },
});
