export const Viewport = Object.freeze({
  Mobile: Symbol('mobile'),
  Desktop: Symbol('desktop'),
});

export const DOMAIN_NAME = window.location.hostname.split('.').reverse().slice(0, 2).reverse().join('.');

export const LOCALHOST = 'localhost';

export const messages = {
  categoryDeleteMessage:
    'Are you sure you want to delete this section and its contents including all of its products and captions?',
  pageUpdatedMessage: 'Your page has been saved and published',
  pageUpdateErrorMessage: 'There was an issue updating your page',
};

export const ErrorNames = {
  notFound: 'Not found',
};

export const RyeTokenMint = '496quLzLJFEQwc1mc3MwXtf7KcrzWqABh9D7jSFFWuAC';

export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

export const GA_USER_ID = process.env.REACT_APP_GA_USER_ID;
