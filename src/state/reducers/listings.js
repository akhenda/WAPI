import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {
  SEARCH_FIELD_CHANGED,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE,
  FETCH_LISTING_SUCCESS,
  FETCH_LISTING_FAILURE,
  SEARCH_LISTINGS_SUCCESS,
  SEARCH_LISTINGS_FAILURE,
} from 'src/state/types';

const INITIAL_STATE = {
  error: {},
  categories: [],
  listings: [],
  selectedListing: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_FIELD_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_LISTINGS_SUCCESS:
      return { ...state, listings: action.payload };
    case FETCH_LISTINGS_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_LISTING_SUCCESS:
      return { ...state, selectedListing: action.payload };
    case FETCH_LISTING_FAILURE:
      return { ...state, error: action.payload };
    case SEARCH_LISTINGS_SUCCESS:
      return { ...state, listings: action.payload };
    case SEARCH_LISTINGS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const persistConfig = {
  storage,
  key: 'listings',
  blacklist: [],
};

export default persistReducer(persistConfig, authReducer);
