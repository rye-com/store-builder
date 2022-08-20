import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Metaplex } from '@metaplex-foundation/js';
import { createApiCall } from './call';

const solanaCluster = 'devnet';
const connection = new Connection(clusterApiUrl(solanaCluster));
const metaplex = new Metaplex(connection);

export async function getTokens(publicKeyStr) {
  const publicKey = new PublicKey(publicKeyStr);
  const filters = [
    {
      dataSize: 165, //size of account (bytes)
    },
    {
      memcmp: {
        offset: 32, //location of our query in the account (bytes)
        bytes: publicKey.toBase58(), //our search criteria, a base58 encoded string
      },
    },
  ];

  const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
    filters: filters,
  });
  return accounts.map((account) => {
    const parsedAccountInfo = account.account.data;
    return {
      mint: parsedAccountInfo['parsed']['info']['mint'],
      accountInfo: parsedAccountInfo.parsed.info,
    };
  });
}

/**
 * @param {string} mintPubkey
 * @returns {Promise<{metadata: Nft, masterEdition: {key: number, supply: number}} | undefined>}
 */
export async function getNftMetadata(mintStr) {
  const mintKey = new PublicKey(mintStr);
  const task = metaplex.nfts().findByMint(mintKey);
  try {
    const nft = await task.run();
    const accInfo = await connection.getAccountInfo(nft.edition.parent, {
      commitment: 'confirmed',
    });
    const masterEdition = {
      key: accInfo.data.at(0),
      supply: accInfo.data.at(1),
    };

    return {
      metadata: nft,
      masterEdition,
    };
  } catch {
    return undefined;
  }
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
