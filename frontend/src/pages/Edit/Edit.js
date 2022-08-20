import { useEffect, useContext, useState } from 'react';

import StoreContent from 'components/StoreContent';
import { DataContext } from 'context';
import { createStore, getStoreAuthed } from 'api';
import { AuthPageLayout } from 'components/Auth/AuthPageLayout/AuthPageLayout';
import { ErrorNames } from 'config';
import { Button, OperatorSpinner } from 'components';

function Edit() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorName, setErrorName] = useState('');
  const {
    state,
    actions: { initStore },
  } = useContext(DataContext);

  useEffect(() => {
    getStoreAuthed().then((data) => {
      if (data?.store_data) {
        let newData = data.store_data;
        newData.store_name = data.store_name;
        initStore(newData);
        setIsLoaded(true);
      } else if (data.error) {
        const code = data.error?.response?.status;
        const errorText = data.error?.response?.data?.error ?? 'Error ';
        setErrorName(code === 404 ? ErrorNames.notFound : errorText);
      }
    });
  }, [initStore]);

  async function create() {
    let storeData = await createStore();
    initStore(storeData);
    setIsLoaded(true);
    setErrorName('');
  }

  if (errorName === ErrorNames.notFound) {
    return (
      <AuthPageLayout>
        <h1 className="text-center">Store does not exist</h1>
        <p className="mt-4 mb-0 text-center">Do you want to create a new store?</p>
        <Button className="mt-4" autoFocus onClick={create}>
          Create store
        </Button>
      </AuthPageLayout>
    );
  }

  if (errorName) {
    return (
      <AuthPageLayout>
        <h1 className="text-center">Error occurred</h1>
        <p className="mt-4 mb-0 text-center">{errorName}</p>
      </AuthPageLayout>
    );
  }

  return isLoaded ? <StoreContent storeData={state} isView={false} /> : <OperatorSpinner />;
}

export default Edit;
