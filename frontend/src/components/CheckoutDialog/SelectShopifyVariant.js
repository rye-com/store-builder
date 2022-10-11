import { Button } from 'components/Button';
import { Choice } from 'components/Choice/Choice';
import OperatorSpinner from 'components/OperatorSpinner';
import { createGetShopifyProductVariables, useGetShopifyVariants } from 'gql/getShopifyVariants';
import { useState } from 'react';

export function SelectShopifyVariant({ productId, onComplete, productUrl }) {
  const { data, loading, error } = useGetShopifyVariants(
    createGetShopifyProductVariables(productId)
  );
  const [variantId, setVariantId] = useState();
  const variants = data?.productByID?.variants;

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <OperatorSpinner fill={false} />
      </div>
    );
  }

  if (error || (!loading && !data.productByID)) {
    return (
      <p className="text-danger">
        Error occurred during fetching product variants.{' '}
        <a href={productUrl} target="_blank" rel="noreferrer">
          Retry on the store page
        </a>
      </p>
    );
  }
  return (
    <div className="d-flex flex-column flex-wrap gap-2">
      <h2>Choose product variant</h2>
      <div className="d-flex flex-column gap-2">
        <div>
          <img
            src={
              variants?.find((variant) => variant.id === variantId)?.image?.url ||
              data.productByID.images?.[0]?.url
            }
            alt={'variant'}
            width="100%"
          />
        </div>
        <div className="d-flex flex-row flex-wrap gap-2">
          {variants.map((variant) => (
            <Choice
              key={variant.id}
              onChange={() => setVariantId(variant.id)}
              checked={variantId === variant.id}
              label={getVariantLabel(variant)}
              value={variant.id}
            />
          ))}
        </div>
      </div>
      <Button disabled={!variantId} onClick={() => onComplete(variantId)}>
        Go to order details
      </Button>
    </div>
  );
}

function getVariantLabel(variant) {
  let options = [variant.option1, variant.option2, variant.option3].filter(Boolean).join(', ');
  return `${options} - ${variant.price}`;
}
