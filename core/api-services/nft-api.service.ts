import { doGet, doPost, doPut } from './http';
import { Response } from '../data/base';

export const nftApiService = {
  requestURIInfo: (tokenURI: any) => {
    const body = null;
    const headers = {
      'Content-Type': 'application/json'
    };
    const method = 'Post';
    return new Promise((resolve, reject) => {
      fetch(tokenURI, {body, headers, method})
        .then(async res => {
          const result = await res.json();
          if (res.ok) {
            resolve(result);
          } else {
            reject(result);
          }
        })
        .catch(e => {
          console.log('api call failed on ', tokenURI);
          reject([]);
        });
    });
  },
  catIPFSInfo: async (ipfsURI: string) => {
    const uniqueId = ipfsURI.split('/ipfs/')[1];
    const endPoint = 'https://ipfs.infura.io:5001/api/v0/cat?arg=' + uniqueId;
    return nftApiService.requestURIInfo(endPoint);
  },
  requestPlainText: async (): Promise<Response> => {
    return doGet('/api/v0/plainText');
  },
  requestWalletInfo: async (wallet: string): Promise<Response> => {
    return doGet('/api/v0/wallet/' + wallet);
  },
  requestMintCount: async (wallet: string): Promise<Response> => {
    return doGet('/api/v0/mint-count/' + wallet);
  },
  registerWallet: async (wallet: string, signature: string): Promise<Response> => {
    return doPost('/api/v0/wallet/' + wallet, {signature});
  },
  registerDirectWallet: async (wallet: string, signature: string): Promise<Response> => {
    return doPost('/api/v0/direct-wallet/' + wallet, {signature});
  },
  updateWalletInfo: async (wallet: string, state: number, signature: string): Promise<Response> => {
    return doPut('/api/v0/wallet/' + wallet, {state, signature});
  },
  raffle: async (signature: string): Promise<Response> => {
    return doPost('/api/v0/raffle', {signature});
  },
  reset: async (signature: string): Promise<Response> => {
    return doPost('/api/v0/reset', {signature});
  }

};
