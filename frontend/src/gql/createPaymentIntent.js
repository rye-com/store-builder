import { gql, useMutation } from '@apollo/client';

export function useCreatePaymentIntent() {
  return useMutation(gql`
    mutation CreatePaymentIntent($input: CreatePaymentIntentInput!) {
      createPaymentIntent(input: $input) {
        clientSecret
        publishableAPIKey
      }
    }
  `);
}

/**
 * @param {'AMAZON' | 'SHOPIFY'} marketplace
 * @param {string} productId
 * @param {any} orderDetails
 */
export function createPaymentIntentVars(productId, marketplace, orderDetails) {
  return {
    input: {
      productID: productId.slice(5), // Remove AMZN- and SHOP-
      marketplace: marketplace.toUpperCase(),
      address: orderDetails,
    },
  };
}
