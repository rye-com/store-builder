import { createApiCall } from 'api/call';
import { DATA_INITIAL_STATE } from 'context/Data/DataReducer';
import { generateWordPair } from 'utils';

export const createStore = async () => {
  const wordPair = generateWordPair();
  return await createApiCall({
    url: 'api/v1/store',
    method: 'POST',
    data: {
      store_name: wordPair,
      store_data: DATA_INITIAL_STATE,
    },
  }).then(() => ({
    ...DATA_INITIAL_STATE,
    store_name: wordPair,
  }));
};

export const saveStore = async (data) => {
  return await createApiCall({
    url: 'api/v1/store',
    method: 'POST',
    data,
  });
};

export const getStoreAuthed = async () => {
  return await createApiCall({
    url: 'api/v1/store/fetch',
    method: 'GET',
  });
};

export const getStore = async ({ storeName = null }) => {
  return await createApiCall({
    url: 'api/v1/store/fetch',
    method: 'GET',
    params: {
      store_name: storeName,
    },
  });
};

export const getTotalClicks = async () => {
  return await createApiCall({
    url: 'api/v1/aggregation/total_clicks',
    method: 'GET',
  });
};

export const getTotalViews = async () => {
  return await createApiCall({
    url: 'api/v1/aggregation/total_views',
    method: 'GET',
  });
};
