import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'components/Button';
import { useState } from 'react';

let stripePromise;

/**
 *
 * @param {{clientSecret: string, apiKey: string}} param0
 * @returns
 */
export const PaymentForm = WrapWithElements(WrappedForm);

/**
 *
 * @param {{clientSecret: string, apiKey: string}} param0
 * @returns
 */
export function WrapWithElements(Component) {
  return ({ clientSecret, apiKey, ...componentProps }) => {
    if (!stripePromise) {
      stripePromise = loadStripe(apiKey);
    }
    const options = {
      clientSecret,
      appearance: {
        theme: 'stripe',
      },
    };

    return (
      <Elements stripe={stripePromise} options={options}>
        <Component {...componentProps} />
      </Elements>
    );
  };
}

function WrappedForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('purchase_completed', 'true');
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: url.href,
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-danger">{error}</p>
      <PaymentElement />
      <div className="d-flex flex-row justify-content-end">
        <Button className="mt-4 " disabled={!stripe}>
          Pay
        </Button>
      </div>
    </form>
  );
}
