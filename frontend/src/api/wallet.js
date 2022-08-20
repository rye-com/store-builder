import axios from 'axios';
import { createApiCall } from './call';

const solanaCluster = 'devnet';


export async function getTokens(publicKeyStr) {
  let response = await axios.request({
    url: '/api/getTokens',
    baseURL: process.env.REACT_APP_WALLET_API_BASE_URL,
    params: {
      publickey: publicKeyStr
    }
  })

  return response.data;
}

/**
 * @param {string} mintPubkey
 * @returns {Promise<{metadata: Nft, masterEdition: {key: number, supply: number}} | undefined>}
 */
export async function getNftMetadata(mintStr) {
  let response = await axios.request({
    url: '/api/getNftMetadata',
    baseURL: process.env.REACT_APP_WALLET_API_BASE_URL,
    params: {
      mintstr: mintStr
    }
  })

  return response.data;
}

export async function getPrivateKey() {
  return createApiCall({
    url: 'api/v1/account/private_key',
    method: 'POST',
  });
}

export function getSolScanLink(pubKey) {
  return `https://solscan.io/token/${pubKey}?cluster=${solanaCluster}`;
}
