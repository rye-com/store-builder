const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const { Metaplex } = require('@metaplex-foundation/js');

const solanaCluster = 'devnet';
const connection = new Connection(clusterApiUrl(solanaCluster));
const metaplex = new Metaplex(connection);

async function getTokens(publicKeyStr) {
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
async function getNftMetadata(mintStr) {
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

module.exports = {
  getTokens,
  getNftMetadata,
};
