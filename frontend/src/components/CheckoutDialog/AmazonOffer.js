import { Button } from 'components/Button';
import { createGetAmazonOfferVars, useGetAmazonOffer } from 'gql/getOffer';
import OperatorSpinner from 'components/OperatorSpinner';
import { createAmazonPaymentIntentVars } from 'gql/createPaymentIntent';

export function AmazonOffer({ product, orderDetails, createPaymentIntent, intentCalled }) {
  const { data, loading, error } = useGetAmazonOffer(
    createGetAmazonOfferVars(
      product.product_id,
      orderDetails.city,
      orderDetails.countryCode,
      orderDetails.stateCode
    )
  );

  const acceptOffer = (event) => {
    event.preventDefault();
    if (intentCalled) return;

    createPaymentIntent({
      variables: createAmazonPaymentIntentVars(product.product_id, orderDetails),
    });
  };

  if (loading) {
    return <OperatorSpinner fill={false} />;
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

  const { offer } = data.amazonOffer;

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
      <p className="d-flex flex-row justify-content-between">
        <span>Shipping:</span> <span>{offer.shipping.displayValue}</span>
      </p>
      <p className="d-flex flex-row justify-content-between">
        <span>Taxes:</span> <span>{offer.taxes.displayValue}</span>
      </p>
      <p className="d-flex flex-row justify-content-between">
        <span>Total:</span> <span>{offer.total.displayValue}</span>
      </p>
      {!intentCalled && (
        <div className="d-flex flex-row justify-content-end">
          <Button type="submit">Continue to payment</Button>
        </div>
      )}
    </form>
  );
}
