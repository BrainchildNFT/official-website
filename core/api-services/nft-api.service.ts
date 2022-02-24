import { doGet, doPost, doPut } from './http';
import { Response } from '../data/base';

export const nftApiService = {
  requestNFTInfo: (tokenURI: any) => {
    const body = null;
    const headers = {
      'Content-Type': 'application/json'
    };
    const method = 'GET';
    return new Promise((resolve, reject) => {
      fetch(tokenURI, { body, headers, method })
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
  requestIPFSInfo: async (endPoint: string) => {
    const data = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + process.env.infuraId,
      },
      mode: 'no-cors'
    });
    console.log('response = ', data);
    return data;
  },
  requestPlainText: async (): Promise<Response> => {
    return doGet('/api/v0/plainText');
  },
  requestWalletInfo: async (wallet: string): Promise<Response> => {
    return doGet('/api/v0/wallet/' + wallet);
  },
  registerWallet: async (wallet: string, signature: string): Promise<Response> => {
    return doPost('/api/v0/wallet/' + wallet, { signature });
  },
  updateWalletInfo: async (wallet: string, state: number, signature: string): Promise<Response> => {
    return doPut('/api/v0/wallet/' + wallet, { state, signature });
  },
  raffle: async (signature: string): Promise<Response> => {
    return doPost('/api/v0/raffle', { signature });
  },
  reset: async (signature: string): Promise<Response> => {
    return doPost('/api/v0/reset', { signature });
  }

};
