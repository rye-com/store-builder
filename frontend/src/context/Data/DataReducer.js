import { createAction } from 'redux-actions';
import fp from 'lodash/fp';
import uniqBy from 'lodash/uniqBy';
import set from 'lodash/set';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export const DATA_INITIAL_STATE = {
  promoter: {
    avatar: '',
    name: '',
    bio: '',
    tags: [],
  },
  title: '',
  social: {},
  description: '',
  collections: [
    //-----array of following data type
    // {
    // id: 0,
    // title: '',
    // description: '',
    // products: [
    //----array of following data type
    // {
    //   product_id: "",
    //   created_at: "",
    //   currency: "",
    //   description: "",
    //   images: [],
    //   marketplace: "",
    //   price: 0,
    //   product_id: "",
    //   product_url: "",
    //   title: "",
    //   updated_at: "",
    //   vendor: "",
    // }
    // ]
    // }
  ],
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case INIT_STORE:
      return { ...state, ...action.payload };
    case UPDATE_STORE:
      let temp = cloneDeep(state);
      set(temp, action.payload.path, action.payload.value);
      if (window.heap && !isEqual(temp, state)) {
        window.heap.track(`Update store property`, { property: action.payload.path });
      }
      return temp;
    case ADD_CATEGORY:
      return {
        ...state,
        collections: uniqBy([...state.collections, action.payload], 'id'),
      };
    case ADD_SOCIAL_LINK:
      return {
        ...state,
        social: action.payload,
      };
    case DELETE_CATEGORY:
      const newCollections = state.collections.filter(
        (collection) => collection.id !== action.payload.id
      );
      return {
        ...state,
        collections: newCollections,
      };
    case ADD_PRODUCT:
      const collections = state.collections.map((collection) => {
        if (collection.id === action.payload.categoryId) {
          const newProducts = uniqBy([...collection.products, action.payload], 'product_id');
          return {
            ...collection,
            products: newProducts,
          };
        } else {
          return collection;
        }
      });
      return {
        ...state,
        collections,
      };
    case DELETE_PRODUCT:
      const pDeletedCollections = state.collections.map((collection) => {
        if (collection.id === action.payload.categoryId) {
          const deletedProducts = collection.products.filter(
            (produdct) => produdct.product_id !== action.payload.productId
          );
          return {
            ...collection,
            products: deletedProducts,
          };
        } else {
          return collection;
        }
      });
      return {
        ...state,
        collections: pDeletedCollections,
      };
    default:
      return state;
  }
};
////////////////////////////////////////
// Action types
////////////////////////////////////////
export const INIT_STORE = 'INIT_STORE';
export const UPDATE_STORE = 'UPDATE_STORE';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_SOCIAL_LINK = 'ADD_SOCIAL_LINK';

////////////////////////////////////////
// Actions
////////////////////////////////////////
export const addCategory = createAction(ADD_CATEGORY);
export const updateCategory = createAction(UPDATE_CATEGORY);
export const deleteCategory = createAction(DELETE_CATEGORY);
export const addProduct = createAction(ADD_PRODUCT);
export const updateProduct = createAction(UPDATE_PRODUCT);
export const deleteProduct = createAction(DELETE_PRODUCT);
export const addSocialLink = createAction(ADD_SOCIAL_LINK);
export const updateStore = createAction(UPDATE_STORE);
export const initStore = createAction(INIT_STORE);

export const getDataActions = (dispatch) => {
  return {
    addCategory: fp.compose(dispatch, addCategory),
    updateCategory: fp.compose(dispatch, updateCategory),
    deleteCategory: fp.compose(dispatch, deleteCategory),
    addProduct: fp.compose(dispatch, addProduct),
    updateProduct: fp.compose(dispatch, updateProduct),
    deleteProduct: fp.compose(dispatch, deleteProduct),
    addSocialLink: fp.compose(dispatch, addSocialLink),
    updateStore: fp.compose(dispatch, updateStore),
    initStore: fp.compose(dispatch, initStore),
  };
};
