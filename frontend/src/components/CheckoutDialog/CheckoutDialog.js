import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import cloneDeep from 'lodash/cloneDeep';
import { createPaymentIntentVars, useCreatePaymentIntent } from 'gql/createPaymentIntent';
import { PaymentForm } from 'components/CheckoutDialog/PaymentForm';
import { DetailsForm } from './DetailsForm';
import { AmazonOffer } from './AmazonOffer';

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
 * @param {{show: boolean, close: () => void, product: any}} param0 props
 * @returns
 */
export function CheckoutDialog({ show, close, product }) {
  const [orderDetails, setOrderDetails] = useState(() => {
    const storageRaw = localStorage.getItem('checkout_data');
    if (!storageRaw) {
      return cloneDeep(defaultState);
    }

    try {
      return JSON.parse(storageRaw);
    } catch {
      return cloneDeep(defaultState);
    }
  });

  let [createPaymentIntent, { called, data, error, reset }] = useCreatePaymentIntent();
  let [areDetailsSubmitted, setAreDetailsSubmitted] = useState(false);
  const acceptAmazonOffer = (event) => {
    event.preventDefault();
    createPaymentIntent({
      variables: createPaymentIntentVars(
        product.product_id,
        product.marketplace.toUpperCase(),
        orderDetails
      ),
    });
  };

  let formContent;
  if (areDetailsSubmitted) {
    formContent =
      product.marketplace === 'amazon' ? (
        <AmazonOffer
          product={product}
          orderDetails={orderDetails}
          acceptOffer={called ? undefined : acceptAmazonOffer}
        />
      ) : (
        <p>TODO SHOPIFY</p>
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
    <Modal
      show={show}
      centered
      onHide={() => {
        close();
        reset();
      }}
      contentClassName="px-4 py-5"
    >
      {formContent}
      {data && (
        <PaymentForm
          apiKey={data.createPaymentIntent.publishableAPIKey}
          clientSecret={data.createPaymentIntent.clientSecret}
        />
      )}
      {error && (
        <p className="text-danger">
          Error occurred during payment intent creation.{' '}
          <a href={product.product_url} target="_blank" rel="noreferrer">
            Retry on the store page
          </a>
        </p>
      )}
    </Modal>
  );
}
