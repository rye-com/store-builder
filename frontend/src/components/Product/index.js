import { useState, useCallback, useContext, useLayoutEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Editable, OperatorCarousel, OperatorTooltip } from 'components';
import { BuyProductLink } from './BuyProductLink';
import { DataContext } from 'context';
import './style.scss';

const style = {
  productContainer: {
    position: 'relative',
    width: '100%',
  },
  productCardContainer: {
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',
    marginBottom: '10px',
    borderRadius: '8px',
    padding: '16px',
    width: '100%',
    marginTop: '1rem',
  },
  productImageContainer: {
    position: 'relative',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    marginTop: '12px',
  },
  productImageExtra: {
    width: '60px',
    padding: '10px',
  },
  productTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
    height: '2.3rem',
  },
  productDescription: {
    color: '#515151',
  },
  productPrice: {
    fontWeight: '300',
    fontSize: '13px',
    marginTop: 4,
    marginBottom: 16,
  },
  vendor: {
    fontSize: '0.835rem',
    color: '#919191',
    marginTop: 8,
    height: '0.5rem',
  },
  productBlurb: {
    fontStyle: 'italic',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  descriptionContainer: {
    height: '3rem',
    width: '100%',
  },
  contentContainer: {
    marginTop: '12px',
  },
  prouctIconContainer: {
    position: 'absolute',
    right: '0.8rem',
  },
};

export const Product = ({
  isView,
  product,
  selectedViewport,
  categoryId,
  index,
  collectionIndex,
}) => {
  const {
    actions,
    state: { store_name },
  } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const shortenedTitle = product.title;
  const producePrice = product.price ? `$ ${(product.price / 100).toFixed(2)}` : 'N/A';

  const handleDeleteClick = useCallback(() => {
    actions.deleteProduct({
      categoryId,
      productId: product.product_id,
    });
  }, [actions, categoryId, product]);

  const handleLoaded = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div style={style.productContainer}>
      <div style={style.descriptionContainer}>
        {loading ? (
          <Skeleton count={2} borderRadius={13} />
        ) : (
          <Editable
            name="product-blurb-editor"
            isView={isView}
            styles={{ edit: style.productBlurb, icon: style.prouctIconContainer }}
            className="description-container"
            placeholder="Tell people why you recommend this product"
            tag="p"
            value={product.blurb || 'Tell people why you recommend this product'}
            storePath={`collections[${collectionIndex}].products[${index}].blurb`}
            isDeletable
            onDeleteClick={handleDeleteClick}
            skipDeleteModal
            showTooltip={true}
            tooltipId={`${product.product_id}_blurb`}
          />
        )}
      </div>
      <div style={style.productCardContainer}>
        <div style={style.productImageContainer}>
          <OperatorCarousel images={product.images} loading={loading} onLoad={handleLoaded} />
        </div>
        <div style={style.contentContainer}>
          <OperatorTooltip tooltipText={product?.title} id={`${product.product_id}_title`}>
            <h4 style={style.productTitle}>
              {loading ? <Skeleton count={2} borderRadius={13} /> : shortenedTitle}
            </h4>
          </OperatorTooltip>
          <p style={style.productPrice}>
            {loading ? <Skeleton width={50} borderRadius={13} /> : producePrice}
          </p>
        </div>
        <div className="d-flex flex-column">
          <div>
            {loading ? (
              <Skeleton height={40} borderRadius={4} />
            ) : (
              <BuyProductLink storeName={store_name} isView={isView} product={product} />
            )}
          </div>
          <p style={style.vendor}>
            {loading ? (
              <Skeleton width={170} borderRadius={13} />
            ) : product?.vendor ? (
              `Sold by ${product.vendor}`
            ) : (
              ''
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
