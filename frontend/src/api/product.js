import { createApiCall } from './call';

export async function getProductURL(productId, storeName) {
  let response = await createApiCall({
    url: 'api/v1/get_product_link',
    params: {
      product_id: productId,
      store_name: storeName,
    },
  });

  return response.product_link;
}
