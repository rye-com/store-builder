import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Checkout } from './Checkout';
import { SelectShopifyVariant } from './SelectShopifyVariant';

/**
 * Checkout products
 * @param {{show: boolean, close: () => void, product: any}} param0 props
 * @returns
 */
export function CheckoutDialog({ show, close, product }) {
  const [shopifyVariantId, setShopifyVariantId] = useState();

  const content =
    product.marketplace === 'shopify' && !shopifyVariantId ? (
      <SelectShopifyVariant
        productId={product.product_id}
        onComplete={setShopifyVariantId}
        productUrl={product.product_url}
      />
    ) : (
      <Checkout product={product} variantId={shopifyVariantId} />
    );

  return (
    <Modal show={show} centered onHide={close} contentClassName="px-4 py-5">
      {content}
    </Modal>
  );
}
