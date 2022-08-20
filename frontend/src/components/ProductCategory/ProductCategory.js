import { useCallback } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { Editable, Product, ProductCreator } from 'components';
import { messages, Viewport } from 'config';
import { useDataContext } from 'context';

const mobileBreakpoints = { 100: 1 };
const breakpoints = { 200: 1, 650: 2, 940: 3 };

const productCategoryContainerStyle = {
  marginBottom: '1.5rem'
}

const storeCollectionContainerStyle = {
  marginBottom: '1.5rem',
};
const storeCollectionStyle = {
  marginBottom: '0px',
  display: 'inline-block',
  fontWeight: '600',
  fontSize: '32px',
  lineHeight: '48px'
};

const storeCollectionDescriptionStyle = {
  display: 'inline-block',
};

const ProductCategory = ({ isView, products, viewport, id, index }) => {
  const { actions } = useDataContext();

  const handleCategoryDeleteClick = useCallback(() => {
    actions.deleteCategory({
      id,
    });
  }, [id]);

  return (
    <div style={productCategoryContainerStyle}>
      <div style={storeCollectionContainerStyle}>
        <div>
          <Editable
            isView={isView}
            tag={'h2'}
            styles={{ edit: storeCollectionStyle }}
            placeholder={'New Section'}
            storePath={`collections[${index}].title`}
            isDeletable={true}
            onDeleteClick={handleCategoryDeleteClick}
            deleteMessage={messages.categoryDeleteMessage}
            name="store-collection-title"
          />
        </div>
        <Editable
          isView={isView}
          tag={'p'}
          placeholder="Add a section description"
          styles={{ edit: storeCollectionDescriptionStyle }}
          storePath={`collections[${index}].description`}
          name="store-collection-description"
        />
      </div>
      {!isView && <ProductCreator selectedViewport={viewport} categoryId={id} />}
      <ResponsiveMasonry
        columnsCountBreakPoints={viewport === Viewport.Mobile ? mobileBreakpoints : breakpoints}
      >
        <Masonry gutter="1rem">
          {products.map((product, idx) => (
            <Product
              isView={isView}
              key={idx}
              index={idx}
              collectionIndex={index}
              product={product}
              selectedViewport={viewport}
              categoryId={id}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ProductCategory;
