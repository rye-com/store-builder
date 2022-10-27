import { gql, useMutation } from '@apollo/client';

export function useRequestProduct() {
  return useMutation(gql`
    mutation RequestProductByURL($input: RequestProductByURLInput!) {
      requestProductByURL(input: $input) {
        productID
      }
    }
  `);
}

/**
 * @param {'AMAZON' | 'SHOPIFY'} marketplace
 * @param {string} url
 */
export function createRequestProductVars(marketplace, url) {
  return {
    input: {
      marketplace,
      url,
    },
  };
}
