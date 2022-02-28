const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  compress: false, // brotli compress rather than default gzip support of next.js
  env: {
    contractAddress: '0xd8a3c2A69aB79CF75C15299e00528f7dA244C42A',
    ownerAddress: '0x3feB1352Bd980D1a65893CBC07De763561236298',
    preSaleAmount: 60000000000000000,
    publicSaleAmount: 120000000000000000,
    rpcURI: 'https://speedy-nodes-nyc.moralis.io/a0dd13b0091772cbf75a91db/eth/rinkeby',
    network: 'rinkeby',
    chainId: 4,
    api: 'https://api.brainchildnft.com',
    infuraId: '41ef39b8a23943439d5c1d071593c52f',
    mintCount: 3,
    //googleApiKey: '',
    //production: process.env.PRODUCTION,
  },
  images: {
    domains: ["ipfs.io"],
  },
});
