import { useEffect, useContext, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

import StoreContent from 'components/StoreContent';
import { OperatorSpinner } from 'components';
import { DataContext } from 'context';
import { getStore } from 'api';
import { getStoreUrl } from 'utils/helpers';
import { trackStoreView } from 'api/track';
import RyeIcon from 'assets/images/operator-icon.png';

let isViewed = false;

function View() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {
    state,
    actions: { initStore },
  } = useContext(DataContext);
  const storeName = useMemo(() => {
    return getStoreUrl();
  }, []);

  if (!isViewed) {
    trackStoreView(storeName);
    isViewed = true;
  }

  useEffect(() => {
    getStore({ storeName }).then((data) => {
      setIsLoading(false);
      if (data?.store_data) {
        setSuccess(true);
        let newData = data.store_data;
        newData.store_name = data.store_name;
        initStore(newData);
      } else {
        setSuccess(false);
      }
    });
  }, [initStore, storeName, setIsLoading, setSuccess]);

  return (
    <>
      {isLoading ? (
        <OperatorSpinner />
      ) : success ? (
        <>
          <Helmet>
            <title>{`${state?.promoter.name} | Rye Store`}</title>
            <meta name="image" content={state?.promoter?.avatar || RyeIcon} />
            <meta name="description" content={`${state?.title}`} />
            <meta name="description" content={`${state?.description}`} />
          </Helmet>
          <StoreContent storeData={state} isView={true} />
        </>
      ) : (
        <StoreContent storeData={{}} isView={true} />
      )}
    </>
  );
}

export default View;
