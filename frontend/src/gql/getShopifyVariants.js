import { gql, useQuery } from '@apollo/client';

/**
 * @param {ReturnType<typeof createGetShopifyProductVariables>} variables
 * @returns
 */
export function useGetShopifyVariants(variables) {
  return useQuery(
    gql`
      query ProductByID($input: ProductByIDInput!) {
        productByID(input: $input) {
          images {
            url
          }
          variants {
            image {
              url
            }
            ... on ShopifyVariant {
              id
              option1
              price
            }
          }
        }
      }
    `,
    {
      variables,
    }
  );
}

/**
 * @param {string} productId
 */
export function createGetShopifyProductVariables(productId) {
  return {
    input: {
      id: productId.slice(8), // Remove SHOPIFY-
      marketplace: 'SHOPIFY',
    },
  };
}
