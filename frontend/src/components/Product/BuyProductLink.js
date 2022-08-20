import { useState } from 'react';

import { Button } from 'components';
import { ShopperSignInDialog } from 'components/ShopperSignInDialog/ShopperSignInDialog';
import { useDataContext } from 'context';
import { useAuthContext } from 'context/AuthContext';
import { getStoreCanonicalURL } from 'utils';
import { getProductURL } from 'api/product';
import Spinner from 'react-bootstrap/Spinner';

export function BuyProductLink({ productId, storeName, isView }) {
  const { isAuthenticated } = useAuthContext();
  const [signInModalOpen, setSignInModalOpen] = useState();
  const { state } = useDataContext();
  const [isLoadingLink, setIsLoadingLink] = useState();

  async function onBuyNow(force) {
    if (force || isAuthenticated || !isView) {
      setIsLoadingLink(true);
      const url = await getProductURL(productId, storeName);
      setIsLoadingLink(false);
      window.location.href = url;
    } else {
      setSignInModalOpen(true);
    }
  }

  return (
    <>
      <Button
        onClick={() => onBuyNow(false)}
        className="btn-buynow"
        id="shopper-buy-now-button"
        disabled={isLoadingLink}
      >
        {isLoadingLink ? <Spinner animation="border" role="status" size="sm" /> : 'Buy Now'}
      </Button>
      {signInModalOpen && (
        <ShopperSignInDialog
          onSignIn={() => onBuyNow(true)}
          show={signInModalOpen}
          close={() => setSignInModalOpen(false)}
          redirectUrl={getStoreCanonicalURL(
            state.store_name,
            `/shopperAuth?productId=${productId}&storeName=${storeName}`
          )}
        />
      )}
    </>
  );
}
