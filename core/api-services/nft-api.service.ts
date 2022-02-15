import { doGet } from './http';

export const nftApiService = {
  requestNFTInfo: (tokenURI: any) => {
    return doGet(tokenURI);
  },
  requestIPFSInfo: async (endPoint: string) => {
    const data = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + process.env.infuraId,
      },
      mode: 'no-cors'
    });
    console.log('response = ', data);
  }
};
