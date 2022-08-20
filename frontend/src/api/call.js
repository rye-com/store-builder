import axios from 'axios';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { parseCookie } from 'utils';

import { API_BASE_URL } from 'config';
import { editorCookie } from 'context/AuthContext';

// Escape hatch to call react function from outside.
let logoutEditor = () => {};
export function setLogoutEditorCallback(logoutCallback) {
  logoutEditor = logoutCallback;
}

const API_KEY = 'fdf4265a2e1cc593b2da1a41';

const defaultConfig = (method, token) => {
  let baseHeaders = {};

  if (token && token !== 'undefined') {
    baseHeaders = {
      Authorization: `JWT ${token}`,
    };
  }

  let additionalHeaders = {
    'API-Key': API_KEY,
  };
  if (!isEqual(method, 'DELETE')) {
    additionalHeaders = {
      ...additionalHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  return {
    headers: {
      ...baseHeaders,
      ...additionalHeaders,
    },
    baseURL: API_BASE_URL,
  };
};

const createApiCallCreator =
  (token, logout) =>
  async ({ url, method, params, data, headers = {} }) => {
    try {
      let config = defaultConfig(method, token);
      if (!isEmpty(headers)) {
        config.headers = {
          ...config.headers,
          ...headers,
        };
      }
      const response = await axios.request({
        ...config,
        url,
        method,
        params,
        data,
      });
      return response.data;
    } catch (err) {
      if (err?.response?.status === 401) {
        logout();
      }
      return { error: err };
    }
  };

export const createApiCall = async ({ url, method, params, data, headers = {} }) => {
  const cookie = parseCookie(document.cookie);
  const token = cookie[editorCookie];

  return createApiCallCreator(token, logoutEditor)({ url, method, params, data, headers });
};
