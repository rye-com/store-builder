import { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Barricade } from 'phosphor-react';

import { ProductCategory, PromoterInfo, StoreTitle, CategoryCreator, StoreName } from 'components';
import { Viewport } from 'config';
import { getScreenWidth, getStoreBuilderURL } from 'utils';
import { ReactComponent as DesktopIcon } from 'assets/images/desktop-icon.svg';
import { ReactComponent as MobileIcon } from 'assets/images/mobile-icon.svg';

const appBodyStyle = {
    display: 'flex',
    flexGrow: '1',
    flexDirection: 'column',
  },
  viewportSelectorStyle = {
    display: 'flex',
    borderColor: '#202020',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '5px',
    alignSelf: 'flex-start',
    height: '44px',
    width: '102px',
  },
  sharedIconStyles = {
    width: '56px',
    height: '40px',
    padding: '3px',
  },
  desktopIconStyle = {
    ...sharedIconStyles,
  },
  mobileIconStyle = {
    ...sharedIconStyles,
  },
  storeViewportBodyStyle = {
    width: '100%',
  },
  loginLinkStyle = {
    textAlign: 'center',
  },
  topBarStyle = {
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    padding: '12px 32px',
    background: '#f8f8f8',
  },
  noStoreDataStyle = {
    textAlign: 'center',
    paddingTop: '20rem',
  },
  emptyContentLoginStyle = {
    position: 'absolute',
    left: '50vw',
    top: '90vh',
  },
  emptyCollectionTitleStyle = {
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '48px',
    textAlign: 'center',
  },
  emptyCollectionContentStyle = {
    fontSize: '13px',
    fontWeight: '400',
    lineHeight: '19.5px',
    textAlign: 'center',
  };

const StoreContent = ({ storeData, isView }) => {
  const [selectedViewport, setSelectedViewport] = useState(
    !isView && getScreenWidth() < 1010 ? Viewport.Mobile : Viewport.Desktop
  );
  useEffect(() => {
    if (isView) {
      return;
    }
    const handleResize = () => {
      return setSelectedViewport(getScreenWidth() >= 1010 ? Viewport.Desktop : Viewport.Mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const storeViewportStyle = {
    maxWidth: selectedViewport === Viewport.Mobile ? 390 : 1020,
    width: '100%',
    flexGrow: '1',
    marginBottom: '20px',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: '20px',
  };

  useEffect(() => {
    window.heap.addEventProperties({
      storeName: storeData.store_name,
    });

    return () => {
      window.heap.addEventProperties({
        storeName: undefined,
      });
    };
  }, [storeData.store_name]);

  return (
    <div className={selectedViewport === Viewport.Mobile ? 'force-mobile' : undefined}>
      <div style={appBodyStyle}>
        {!isView && (
          <div style={topBarStyle}>
            <span style={viewportSelectorStyle}>
              <MobileIcon
                id="mobile-icon-viewport-selector"
                onClick={() => setSelectedViewport(Viewport.Mobile)}
                className={`device-icon ${
                  selectedViewport === Viewport.Mobile ? 'device-selected-icon' : ''
                }`}
                style={mobileIconStyle}
              />
              <DesktopIcon
                id="desktop-icon-viewport-selector"
                onClick={() => setSelectedViewport(Viewport.Desktop)}
                className={`device-icon ${
                  selectedViewport === Viewport.Desktop ? 'device-selected-icon' : ''
                }`}
                style={desktopIconStyle}
              />
            </span>
            {!isEmpty(storeData) && <StoreName />}
          </div>
        )}
        <div style={storeViewportStyle}>
          <div style={storeViewportBodyStyle}>
            {!isEmpty(storeData) && (
              <PromoterInfo data={storeData?.promoter} className="mt-3" isView={isView} />
            )}
            {!isEmpty(storeData) && <StoreTitle isView={isView} />}
            {storeData?.collections &&
              storeData?.collections.map((collection, idx) => (
                <ProductCategory
                  title={collection.title}
                  description={collection.description}
                  products={collection.products}
                  key={idx}
                  viewport={selectedViewport}
                  id={collection.id}
                  index={idx}
                  isView={isView}
                />
              ))}
            {isView && storeData?.collections?.length === 0 && (
              <div className="d-flex flex-column align-items-center">
                <Barricade size={110} />
                <h2 style={emptyCollectionTitleStyle}>This store is under construction</h2>
                <p style={emptyCollectionContentStyle}>
                  Products are still being added to this store, check back later once the products
                  have been added.
                </p>
              </div>
            )}
            {!isView && <CategoryCreator />}
            {
              isView && isEmpty(storeData) && <h2 style={noStoreDataStyle}>No Store Data</h2> //will be replaced with better UI
            }
            {isView &&
              (isEmpty(storeData) ? (
                <div style={emptyContentLoginStyle}>
                  <span>
                    <a href={getStoreBuilderURL('login')}>Login here</a>
                  </span>
                </div>
              ) : (
                <div style={loginLinkStyle}>
                  <span>
                    Is this your store?{' '}
                    <a id="influencer-page-login-here-link" href={getStoreBuilderURL('login')}>
                      Login here
                    </a>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreContent;
