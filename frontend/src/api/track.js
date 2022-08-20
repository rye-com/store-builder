import { createApiCall } from './call';

function sendTrackRequest(event) {
  return createApiCall({
    url: 'api/v1/track_event',
    method: 'POST',
    data: event,
  });
}

export function trackStoreView(storeName) {
  return sendTrackRequest({
    event_type: 'store_view',
    store_name: storeName,
  });
}
