import { Button } from 'components/Button';
import { createShopifyPaymentIntentVars } from 'gql/createPaymentIntent';
import { createGetShopifyOfferVars, useGetShopifyOffer } from 'gql/getOffer';
import Spinner from 'react-bootstrap/Spinner';

export function ShopifyOffer({
  variantId,
  product,
  orderDetails,
  createPaymentIntent,
  intentCalled,
}) {
  const { data, loading, error } = useGetShopifyOffer(
    createGetShopifyOfferVars(
      variantId,
      orderDetails.city,
      orderDetails.countryCode,
      orderDetails.stateCode
    )
  );
  const offer = data?.shopifyOffer;

  const acceptOffer = (event) => {
    event.preventDefault();
    if (intentCalled) return;

    createPaymentIntent({
      variables: createShopifyPaymentIntentVars(variantId, orderDetails),
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

  if (!offer?.isAvailable) {
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
        <img src={product.images[0]} alt="product" width="100%" className="mb-4" />
      )}

      <p>{product.title}</p>

      <p className="d-flex flex-row justify-content-between">
        <span>Subtotal:</span> <span>{offer?.subtotal.displayValue}</span>
      </p>
      <p className="d-flex flex-row justify-content-between">
        <span>Taxes:</span> <span>{offer?.taxes.displayValue}</span>
      </p>
      <p className="d-flex flex-row justify-content-between">
        <span>Shipping:</span> <span>{offer?.shipping.displayValue}</span>
      </p>
      <p className="d-flex flex-row justify-content-between">
        <span>Total:</span> <span>{offer?.total.displayValue}</span>
      </p>

      {!intentCalled && (
        <div className="d-flex flex-row justify-content-end">
          <Button type="submit">Continue to payment</Button>
        </div>
      )}
    </form>
  );
}
