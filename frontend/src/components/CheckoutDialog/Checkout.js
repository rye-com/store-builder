import { PaymentForm } from 'components/CheckoutDialog/PaymentForm';
import OperatorSpinner from 'components/OperatorSpinner';
import {
  extractPaymentIntentResponse,
  useCreateAmazonPaymentIntent,
  useCreateShopifyPaymentIntent,
} from 'gql/createPaymentIntent';
import cloneDeep from 'lodash/cloneDeep';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { AmazonOffer } from './AmazonOffer';
import { DetailsForm } from './DetailsForm';
import { ShopifyOffer } from './ShopifyOffer';

const defaultState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  stateCode: '',
  countryCode: 'United States',
  zip: '',
};

/**
 * Checkout products
 * @param {{ product: any, variantId: string}} param0 props
 * @returns
 */
export function Checkout({ product, variantId }) {
  const [orderDetails, setOrderDetails] = useState(() => {
    const checkoutDataRaw = localStorage.getItem('checkout_data');
    if (!checkoutDataRaw) {
      return cloneDeep(defaultState);
    }

    try {
      return JSON.parse(checkoutDataRaw);
    } catch {
      return cloneDeep(defaultState);
    }
  });

  const amazonMutation = useCreateAmazonPaymentIntent();
  const shopifyMutation = useCreateShopifyPaymentIntent();
  const [createPaymentIntent, { called, data, error, loading }] =
    product.marketplace === 'amazon' ? amazonMutation : shopifyMutation;
  const paymentResponse = extractPaymentIntentResponse(data);

  let [areDetailsSubmitted, setAreDetailsSubmitted] = useState(false);
  let formContent;
  if (areDetailsSubmitted) {
    const Offer = product.marketplace === 'amazon' ? AmazonOffer : ShopifyOffer;
    formContent = (
      <Offer
        product={product}
        orderDetails={orderDetails}
        createPaymentIntent={createPaymentIntent}
        intentCalled={called}
        variantId={variantId}
      />
    );
  } else {
    formContent = (
      <DetailsForm
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
        submit={(event) => {
          event.preventDefault();
          localStorage.setItem('checkout_data', JSON.stringify(orderDetails));
          setAreDetailsSubmitted(true);
        }}
      />
    );
  }

  return (
    <>
      {formContent}
      {paymentResponse && (
        <PaymentForm
          apiKey={paymentResponse.publishableAPIKey}
          clientSecret={paymentResponse.clientSecret}
        />
      )}
      {loading && (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: 100 }}
        >
          <Spinner animation="border" />
          <p>Creating payment form</p>
        </div>
      )}
      {error && (
        <p className="text-danger">
          Error occurred during payment intent creation.{' '}
          <a href={product.product_url} target="_blank" rel="noreferrer">
            Retry on the store page
          </a>
        </p>
      )}
    </>
  );
}
