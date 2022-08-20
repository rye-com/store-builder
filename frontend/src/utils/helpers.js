import { generateSlug } from 'random-word-slugs';

import { DOMAIN_NAME, LOCALHOST } from 'config';

///////////////////
//helper functions
///////////////////
export const generateWordPair = () => {
  const config = {
    partsOfSpeech: ['adjective', 'noun'],
    categories: {
      adjective: [
        'time',
        'appearance',
        'color',
        'condition',
        'personality',
        'shapes',
        'size',
        'sounds',
        'taste',
        'touch',
        'quantity',
      ],
      noun: [
        'people',
        'family',
        'education',
        'religion',
        'business',
        'animals',
        'transportation',
        'thing',
        'technology',
        'place',
      ],
    },
  };
  return generateSlug(2, config);
};

/**
 * Parse cookie
 * @param {*} str
 * @returns object
 */
export const parseCookie = (str = '') =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      if (v && v.length === 2) {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      }
      return acc;
    }, {});

export const getTokenFromCookie = () => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('token='))
    ?.split('=')[1];
};

export const setCookie = (name, value, options = {}) => {
  options = {
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const isSubDomain = () => {
  const host = window.location.host;
  if (host.includes(LOCALHOST)) {
    return true;
  } else {
    if (host !== DOMAIN_NAME) {
      return true;
    } else {
      return false;
    }
  }
};

export const getStoreUrl = () => {
  const host = window.location.host;
  return host.split('.')[0];
};

export const sanitizeInput = (input) => {
  return input
    .replace(/<[\/]{0,1}(div)[^><]*>/g, '')
    .replace(/<br>/g, '')
    .replace(/\s/g, '')
    .replace(/[^0-9A-Za-z-]+/gi, '');
};

export const getStoreCanonicalURL = (storeName, relativePath = '') => {
  return `${window.location.protocol}//${storeName}.${DOMAIN_NAME}${
    window.location.port ? ':' + window.location.port : ''
  }${relativePath}`;
};

export const getStoreBuilderURL = (relativePath = '') => {
  return `${window.location.protocol}//${DOMAIN_NAME}${
    window.location.port ? ':' + window.location.port : ''
  }/${relativePath}`;
};

export const removeEmpty = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== '' && v?.length !== 0));
};

export const getScreenWidth = () => window.innerWidth;

export function isUrl(urlString) {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}
