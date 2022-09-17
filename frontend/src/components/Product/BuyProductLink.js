import { useState } from 'react';

import { Button } from 'components';
import { ShopperSignInDialog } from 'components/ShopperSignInDialog/ShopperSignInDialog';
import { useDataContext } from 'context';
import { useAuthContext } from 'context/AuthContext';
import { getStoreCanonicalURL } from 'utils';
import { getProductURL } from 'api/product';
import Spinner from 'react-bootstrap/Spinner';
import { CheckoutDialog } from 'components/CheckoutDialog/CheckoutDialog';
import { featureFlags, useFeatureFlag } from 'featureFlags/useFeatureFlag';

export function BuyProductLink({ storeName, isView, product }) {
  const { isAuthenticated } = useAuthContext();
  const [modalOpen, setModalOpen] = useState();
  const { state } = useDataContext();
  const [isLoadingLink, setIsLoadingLink] = useState();
  const isCheckoutEnabled = useFeatureFlag(featureFlags.enableCheckout);

  async function onBuyNow(force) {
    if (isCheckoutEnabled) {
      setModalOpen(true);
      return;
    }

    if (force || isAuthenticated || !isView) {
      setIsLoadingLink(true);
      const url = await getProductURL(product.product_id, storeName);
      setIsLoadingLink(false);
      window.location.href = url;
    } else {
      setModalOpen(true);
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
      {modalOpen &&
        (isCheckoutEnabled ? (
          <CheckoutDialog show={modalOpen} close={() => setModalOpen(false)} product={product} />
        ) : (
          <ShopperSignInDialog
            onSignIn={() => onBuyNow(true)}
            show={modalOpen}
            close={() => setModalOpen(false)}
            redirectUrl={getStoreCanonicalURL(
              state.store_name,
              `/shopperAuth?productId=${product.product_id}&storeName=${storeName}`
            )}
          />
        ))}
    </>
  );
}
