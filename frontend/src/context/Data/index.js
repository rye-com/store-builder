/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useMemo, useReducer, useContext, useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

import { DATA_INITIAL_STATE, INIT_STORE, DataReducer, getDataActions } from './DataReducer';
import { saveStore as saveStoreApi } from 'api';
import { messages } from 'config';
import { useToastContext } from 'context/Toast';

function getEssentialStoreData(storeData) {
  const storeClone = cloneDeep(storeData);
  storeClone.collections.forEach((collection) => {
    collection.products = collection.products.map((product) => ({
      product_id: product.product_id,
      blurb: product.blurb,
    }));
  });

  return storeClone;
}

export const DataContext = createContext({
  state: DATA_INITIAL_STATE,
  actions: {},
});

export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer((prevState, action) => {
    const newState = DataReducer(prevState, action);
    if (action.type !== INIT_STORE && !isEqual(prevState, newState)) {
      const { store_name, ...storeData } = newState;
      saveStoreApi({
        store_data: getEssentialStoreData(storeData),
        store_name: store_name,
      }).then((response) => {
        if (response.error) {
          setMessage({
            title: 'Page was not updated',
            content: messages.pageUpdateErrorMessage,
            type: 'success',
          });
        } else {
          setMessage({
            title: 'Page Updated',
            content: messages.pageUpdatedMessage,
            type: 'error',
          });
        }
      });
    }
    return newState;
  }, DATA_INITIAL_STATE);

  const actions = useMemo(() => getDataActions(dispatch), [dispatch]);

  const { setMessage } = useToastContext();

  return <DataContext.Provider value={{ state, actions }}>{children}</DataContext.Provider>;
};

export * from './DataReducer';
