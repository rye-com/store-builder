import { gql, useMutation } from '@apollo/client';

export function useScrapeProduct() {
  return useMutation(gql`
    mutation ScrapeProductByURL($input: ScrapeProductByURLInput!) {
      scrapeProductByURL(input: $input) {
        id
      }
    }
  `);
}

/**
 * @param {'AMAZON' | 'SHOPIFY'} marketplace
 * @param {string} url
 */
export function createScrapeProductVars(marketplace, url) {
  return {
    input: {
      marketplace,
      url,
    },
  };
}
