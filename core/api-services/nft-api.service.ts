import { doGet } from './http';

export const nftApiService = {
  requestNFTInfo: (tokenURI: any) => {
    return doGet(tokenURI);
  }
};
