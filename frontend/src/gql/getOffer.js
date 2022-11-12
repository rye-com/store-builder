import { gql, useQuery } from '@apollo/client';

/**
 * @param {ReturnType<typeof createGetAmazonOfferVars>} variables
 * @returns
 */
export function useGetAmazonOffer(variables) {
  return useQuery(
    gql`
      query AmazonOffer($input: AmazonOfferInput!) {
        amazonOffer(input: $input) {
          shipping {
            displayValue
          }
          subtotal {
            displayValue
          }
          taxes {
            displayValue
          }
          total {
            displayValue
          }
          isAvailable
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
 * @param {string} city
 * @param {string} countryCode
 * @param {string} stateCode
 */
export function createGetAmazonOfferVars(productId, city, countryCode, stateCode) {
  return {
    input: {
      location: {
        city,
        countryCode,
        stateCode,
      },
      productID: productId.slice(5), // Remove AMZN-
    },
  };
}

/**
 * @param {ReturnType<typeof createGetShopifyOfferVars>} variables
 * @returns
 */
export function useGetShopifyOffer(variables) {
  return useQuery(
    gql`
      query ShopifyOffer($input: ShopifyOfferInput!) {
        shopifyOffer(input: $input) {
          shipping {
            displayValue
          }
          subtotal {
            displayValue
          }
          taxes {
            displayValue
          }
          total {
            displayValue
          }
          isAvailable
        }
      }
    `,
    {
      variables,
    }
  );
}

/**
 * @param {string} variantID
 * @param {string} city
 * @param {string} countryCode
 * @param {string} stateCode
 */
export function createGetShopifyOfferVars(variantID, city, countryCode, stateCode) {
  return {
    input: {
      location: {
        city,
        countryCode,
        stateCode,
      },
      variantID,
    },
  };
}
