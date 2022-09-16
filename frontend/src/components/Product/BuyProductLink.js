import { useState } from 'react';

import { Button } from 'components';
import { CheckoutDialog } from 'components/CheckoutDialog/CheckoutDialog';

export function BuyProductLink({ storeName, isView, product }) {
  const [signInModalOpen, setSignInModalOpen] = useState();

  async function onBuyNow() {
    setSignInModalOpen(true);
  }

  return (
    <>
      <Button onClick={onBuyNow} className="btn-buynow" id="shopper-buy-now-button">
        Buy Now
      </Button>
      {signInModalOpen && (
        <CheckoutDialog
          show={signInModalOpen}
          close={() => setSignInModalOpen(false)}
          product={product}
        />
      )}
    </>
  );
}
