import classes from './TokenCards.module.css';
import { getNftMetadata, getSolScanLink } from 'api/wallet';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export function TokensCards({ nfts }) {
  return (
    <>
      <h3>NFTs</h3>
      <div className={classes.tokenCards}>
        {nfts.map((nft) => (
          <TokenCard key={nft.mint} mint={nft.mint} />
        ))}
      </div>
    </>
  );
}

function TokenCard({ mint }) {
  const [nft, setNft] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;

    getNftMetadata(mint).then((data) => {
      setNft(data);
      setLoaded(true);
    });
  }, [loaded, mint]);

  if (!loaded) {
    return <Spinner animation="border" />;
  }

  if (!nft) {
    return null;
  }

  const { metadata, masterEdition } = nft;
  const title = metadata?.json?.name;
  const price = 'TBD';
  const solScanLink = getSolScanLink(mint);

  return (
    <div className={classes.container}>
      <img src={metadata?.json?.image} alt={title} className={classes.img} />
      <div className="d-flex flex-row align-items-center justify-content-between p-2">
        <div className="d-flex flex-column">
          <span className={classes.mutedText}>{metadata?.symbol}</span>
          <span className={classes.title}>
            <a id="wallet-nft-card-info-link" href={solScanLink} target="_blank" rel="noreferrer">
              {title}
            </a>
          </span>
          <span className={classes.mutedText}>
            # {metadata?.edition?.number?.toString()} of {masterEdition.supply}
          </span>
        </div>
        <div className="d-flex flex-column align-items-end">
          <span className={classes.mutedText}>Price</span>
          <span className={classes.title}>{price}</span>
        </div>
      </div>
    </div>
  );
}
