import { gql, useMutation } from '@apollo/client';

export function useCreateAmazonPaymentIntent() {
  return useMutation(
    gql`
      mutation CreatePaymentIntent($input: CreateAmazonPaymentIntentInput!) {
        createAmazonPaymentIntent(input: $input) {
          clientSecret
          publishableAPIKey
        }
      }
    `
  );
}

/**
 * @param {string} productId
 * @param {any} orderDetails
 */
export function createAmazonPaymentIntentVars(productId, orderDetails) {
  return {
    input: {
      productID: productId.slice(5), // Remove AMZN-
      address: orderDetails,
    },
  };
}

export function useCreateShopifyPaymentIntent() {
  return useMutation(
    gql`
      mutation CreatePaymentIntent($input: CreateShopifyPaymentIntentInput!) {
        createShopifyPaymentIntent(input: $input) {
          clientSecret
          publishableAPIKey
        }
      }
    `
  );
}

/**
 * @param {string} variantID
 * @param {any} orderDetails
 */
export function createShopifyPaymentIntentVars(variantID, orderDetails) {
  return {
    input: {
      variantID,
      address: orderDetails,
    },
  };
}

export function extractPaymentIntentResponse(rawResponse) {
  if (!rawResponse) {
    return;
  }
  return Object.values(rawResponse)[0];
}
