import { useState } from 'react';

import { Button } from 'components';
import { ShopperSignInDialog } from 'components/ShopperSignInDialog/ShopperSignInDialog';
import { useDataContext } from 'context';
import { useAuthContext } from 'context/AuthContext';
import { getStoreCanonicalURL } from 'utils';
import { getProductURL } from 'api/product';
import Spinner from 'react-bootstrap/Spinner';
import { CheckoutDialog } from 'components/CheckoutDialog/CheckoutDialog';

export function BuyProductLink({ storeName, isView, product }) {
  const { isAuthenticated } = useAuthContext();
  const [signInModalOpen, setSignInModalOpen] = useState();
  const { state } = useDataContext();
  const [isLoadingLink, setIsLoadingLink] = useState();

  async function onBuyNow(force) {
    if (product.marketplace === 'amazon') {
      setSignInModalOpen(true);
      return;
    }

    if (force || isAuthenticated || !isView) {
      setIsLoadingLink(true);
      const url = await getProductURL(product.product_id, storeName);
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
      {signInModalOpen &&
        (product.marketplace === 'amazon' ? (
          <CheckoutDialog
            show={signInModalOpen}
            close={() => setSignInModalOpen(false)}
            product={product}
          />
        ) : (
          <ShopperSignInDialog
            onSignIn={() => onBuyNow(true)}
            show={signInModalOpen}
            close={() => setSignInModalOpen(false)}
            redirectUrl={getStoreCanonicalURL(
              state.store_name,
              `/shopperAuth?productId=${product.product_id}&storeName=${storeName}`
            )}
          />
        ))}
    </>
  );
}
