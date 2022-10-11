import { Button } from 'components/Button';
import { Choice } from 'components/Choice/Choice';
import { createShopifyPaymentIntentVars } from 'gql/createPaymentIntent';
import { createGetShopifyOfferVars, useGetShopifyOffer } from 'gql/getOffer';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export function ShopifyOffer({
  variantId,
  product,
  orderDetails,
  createPaymentIntent,
  intentCalled,
}) {
  const [shippingMethodId, setShippingMethodId] = useState();
  const storeURL = new URL(product.product_url).origin;
  const { data, loading, error } = useGetShopifyOffer(
    createGetShopifyOfferVars(
      variantId,
      storeURL,
      orderDetails.city,
      orderDetails.countryCode,
      orderDetails.stateCode
    )
  );

  const acceptOffer = (event) => {
    event.preventDefault();
    if (intentCalled) return;

    createPaymentIntent({
      variables: createShopifyPaymentIntentVars(
        storeURL,
        variantId,
        orderDetails,
        shippingMethodId
      ),
    });
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="border" />
        <p>Loading offer...</p>
      </div>
    );
  }
  if (error) {
    return (
      <p className="text-danger">
        Error occurred during fetching offer.{' '}
        <a href={product.product_url} target="_blank" rel="noreferrer">
          Retry on the store page
        </a>
      </p>
    );
  }

  const { offer } = data.shopifyOffer;
  const selectedShippingMethod = offer.shippingMethods.find((x) => x.id === shippingMethodId);
  const taxes = selectedShippingMethod?.taxes?.value ?? offer.digitalItemTaxes?.value ?? 0;
  const total = selectedShippingMethod
    ? offer.subtotal.value + taxes + selectedShippingMethod.price.value
    : undefined;
  const totalDisplay = total && `$${Math.floor(total / 100)}.${total % 100}`;

  if (!offer.isAvailable) {
    return (
      <div>
        <p>Item is not in stock</p>
      </div>
    );
  }

  return (
    <form onSubmit={acceptOffer}>
      <h2>Offer</h2>
      {product.images?.length && (
        <img src={product.images[0]} alt="product image" width="100%" className="mb-4" />
      )}

      <p>{product.title}</p>
      <p className="d-flex flex-row justify-content-between">
        <span>Subtotal:</span> <span>{offer.subtotal.displayValue}</span>
      </p>
      {offer.isDigitalItem && (
        <p className="d-flex flex-row justify-content-between">
          <span>Taxes:</span> <span>{offer.digitalItemTaxes?.displayValue}</span>
        </p>
      )}

      <div className="mb-2">
        {!intentCalled &&
          offer.shippingMethods.map((method) => (
            <Choice
              key={method.id}
              label={`${method.label} (${method.price.displayValue})`}
              value={method.id}
              checked={method.id === shippingMethodId}
              onChange={() => setShippingMethodId(method.id)}
            />
          ))}
        {intentCalled && (
          <>
            <p className="d-flex flex-row justify-content-between">
              <span>Taxes:</span> <span>{selectedShippingMethod?.taxes.displayValue}</span>
            </p>
            <p className="d-flex flex-row justify-content-between">
              <span>Shipping:</span> <span>{selectedShippingMethod?.price.displayValue}</span>
            </p>
            <p className="d-flex flex-row justify-content-between">
              <span>Total:</span> <span>{totalDisplay}</span>
            </p>
          </>
        )}
      </div>

      {!intentCalled && (
        <div className="d-flex flex-row justify-content-end">
          <Button disabled={!shippingMethodId} type="submit">
            Continue to payment
          </Button>
        </div>
      )}
    </form>
  );
}
