import { useState } from 'react';
import { Puff } from 'react-loader-spinner';
import cn from 'classnames';

import { createApiCall } from 'api/call';
import { useDataContext } from 'context';
import linkIcon from 'assets/images/link-icon.png';
import './styles.scss';
import { isUrl } from 'utils';
import { createRequestProductVars, useRequestProduct } from 'gql/requestProduct';

const productContainerStyle = {
    background: '#F8F8F8',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '1.5rem',
  },
  sharedProductStyle = {},
  findProductContainerStyle = {
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    position: 'relative',
    display: 'flex',
  },
  productURLInputStyle = {
    ...sharedProductStyle,
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingLeft: '50px',
    background: `url(${linkIcon}) no-repeat 10px center`,
    verticalAlign: 'middle',
    backgroundColor: 'white',
    outline: 'none',
    flex: 1,
    minWidth: '180px',
  },
  loaderWrapperStyle = {
    verticalAlign: 'middle',
    marginLeft: '10px',
  };

const ProductCreator = ({ categoryId }) => {
  const {
    actions: { addProduct },
  } = useDataContext();
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [productLinkInputText, setProductLinkInputText] = useState('');
  const [isError, setIsError] = useState(false);
  const [requestProduct] = useRequestProduct();

  function onProductTextChange(event) {
    setProductLinkInputText(event.target.value);
    if (event.target.value === '') setIsError(false);
    setIsProductLoading(true);
    const linkUrl = event.target.value;
    if (isUrl(linkUrl)) {
      createApiCall({
        url: 'api/v1/product/fetch',
        method: 'POST',
        data: {
          url: linkUrl,
        },
      }).then((data) => {
        setIsProductLoading(false);

        if (data.error) {
          setIsError(true);
          return;
        }

        requestProduct({
          variables: createRequestProductVars(data.marketplace.toUpperCase(), linkUrl),
        });

        addProduct({
          categoryId,
          ...data,
        });
        setProductLinkInputText('');
        setIsError(false);
      });
    } else {
      setIsProductLoading(false);
      setIsError(false);
    }
  }

  return (
    <div style={productContainerStyle}>
      <h2 className="product-creator__add-product">Add a product</h2>
      <p>Enter the amazon or shopify link of the product you want to add to your store</p>
      <div style={findProductContainerStyle}>
        <input
          id="product-creator-link-input"
          onChange={onProductTextChange}
          style={productURLInputStyle}
          type="link"
          value={productLinkInputText}
          placeholder="Enter product link"
          className={cn({ 'border border-danger': isError })}
          data-enter-product-link="true"
        />
        {isProductLoading && (
          <Puff color="#202020" height={30} width={30} wrapperStyle={loaderWrapperStyle} />
        )}
      </div>
      {isError && (
        <span className="text-danger product-creator__err-message">
          {'Unable to find product, please try another link'}
        </span>
      )}
    </div>
  );
};

export default ProductCreator;
