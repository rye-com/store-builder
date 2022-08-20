import LogoImg from 'assets/icons/logo.svg';
import classNames from 'classnames';
import { TokensCards } from './TokenCards';
import classes from './WalletPage.module.css';
import jwt_decode from 'jwt-decode';
import { getTokenFromCookie } from 'utils';
import { useEffect, useState } from 'react';
import { getPrivateKey, getSolScanLink, getTokens } from 'api/wallet';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import { useToastContext } from 'context';
import { RyeTokenMint } from 'config';

export function Wallet() {
  const decoded = jwt_decode(getTokenFromCookie());
  const publicKey = decoded?.public_key;

  const [nfts, setNfts] = useState([]);
  useEffect(() => {
    let cancelled = false;
    getTokens(publicKey).then((res) => {
      if (!cancelled) {
        setNfts(res);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [publicKey]);

  const ryeTokensAmount =
    nfts.length > 0 &&
    nfts
      .filter(({ mint }) => mint === RyeTokenMint)
      .reduce((sum, cur) => cur.accountInfo.tokenAmount.uiAmount + sum, 0);

  return (
    <div className="d-flex flex-column w-100">
      <Container>
        <Header publicKey={publicKey} />
      </Container>
      <Separator />
      <Container className={classes.currencyCards}>
        <CurrencyCard
          icon={
            <span className={classNames(classes.currencyCardLogo, classes.currencyCardLogoText)}>
              $
            </span>
          }
          currencyTitle="USD"
          currencyAbbreviation="USD"
          amount={'TBD'}
        />
        <CurrencyCard
          icon={<img src={LogoImg} alt="logo" className={classes.currencyCardLogo} />}
          currencyTitle="RYE"
          currencyAbbreviation="RYE"
          amount={ryeTokensAmount}
          // convertedAmount={'$2,039.25 USD'}
        />
      </Container>
      <Separator />
      <Container>
        <TokensCards nfts={nfts} />
      </Container>
      <Separator />
      <Container>
        <RecoverKey />
      </Container>
    </div>
  );
}

function Header({ publicKey }) {
  return (
    <div className={classes.header}>
      <div className="d-flex flex-row flex-grow-1 align-items-center">
        <img src={LogoImg} alt="logo" className={classes.headerLogo} />
        <h1 className={classes.headerText}>My wallet</h1>
      </div>
      <a
        id="my-wallet-public-key-link"
        className={classes.publicAddress}
        href={getSolScanLink(publicKey)}
        target="_blank"
        rel="noreferrer"
      >
        {publicKey.slice(0, 4) + '...' + publicKey.slice(-4)}
      </a>
    </div>
  );
}

function Container({ children, className }) {
  return <div className={classNames(className, 'p-3 container-xxl')}>{children}</div>;
}

function Separator() {
  return <div className={classes.separator} role="presentation" />;
}

function CurrencyCard({ icon, currencyTitle, currencyAbbreviation, amount, convertedAmount }) {
  return (
    <div className={classes.currencyCard}>
      <div className="d-flex flex-row align-items-center">
        {icon}
        <div className="d-flex flex-column">
          <span className={classes.bodyBold}>{currencyAbbreviation}</span>
        </div>
      </div>

      <div>
        <div className="d-flex flex-column align-items-end justify-content-center h-100">
          <span className={classes.bodyBold}>
            {amount} <span className={classes.currencyTitle}>{currencyTitle}</span>
          </span>
          {convertedAmount && <span className={classes.convertedAmount}>{convertedAmount}</span>}
        </div>
      </div>
    </div>
  );
}

function RecoverKey() {
  // TODO start using react-query for data fetching!
  const [privateKey, setPrivateKey] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { setMessage } = useToastContext();

  async function recoverKey() {
    if (privateKey) {
      setShow(true);
      return;
    }

    setLoading(true);
    const response = await getPrivateKey();
    if ('private_key' in response) {
      setPrivateKey(response.private_key);
      setError(false);
      setShow(true);
    } else if ('error' in response) {
      setError(true);
      setPrivateKey(undefined);
    }
    setLoading(false);
  }

  function hideRecoverKey() {
    setShow(false);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(privateKey);
    setMessage({
      title: 'Success',
      content: 'Private key copied to the clipboard',
      type: 'success',
    });
  }

  return (
    <div>
      <p className={classes.recoverKeyText}>Want to recover your key?</p>
      {show ? (
        <button
          id="hide-my-private-key"
          className={classes.recoverKeyButton}
          onClick={hideRecoverKey}
        >
          Hide my private key
        </button>
      ) : (
        <button id="show-my-private-key" className={classes.recoverKeyButton} onClick={recoverKey}>
          Show me my private key
        </button>
      )}

      {loading && <Spinner animation="border" />}
      {error && <p>We could not get your private key</p>}
      {show && (
        <InputGroup className="mt-1" style={{ maxWidth: 500 }}>
          <Form.Control
            className={classes.withBorder}
            aria-label="Private key"
            readOnly
            value={privateKey}
          />
          <Button
            id="copy-private-key-clipboard"
            className={classes.withBorder}
            variant="outline-primary"
            onClick={copyToClipboard}
          >
            Copy to clipboard
          </Button>
        </InputGroup>
      )}
    </div>
  );
}

export default Wallet;
