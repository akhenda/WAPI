import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import {
  CLEAR_LISTINGS,
  SELECT_CATEGORY,
  LISTINGS_LOADING,
  SEARCH_FIELD_CHANGED,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE,
  FETCH_LISTING_SUCCESS,
  FETCH_LISTING_FAILURE,
  SEARCH_LISTINGS_SUCCESS,
  SEARCH_LISTINGS_FAILURE,
  FETCH_USER_LISTINGS_SUCCESS,
  FETCH_USER_LISTINGS_FAILURE,
  FETCH_LISTING_REVIEWS_SUCCESS,
  FETCH_LISTING_REVIEWS_FAILURE,
  FETCH_FAVOURITE_LISTINGS_SUCCESS,
  FETCH_FAVOURITE_LISTINGS_FAILURE,
} from 'src/state/types';

const INITIAL_STATE = {
  error: {},
  categories: [],
  places: [],
  totalPages: 1,
  selectedCategory: null,
  selectedListing: null,
  favourites: [],
  reviews: [],
  loading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTINGS_LOADING:
      return { ...state, loading: true };
    case SELECT_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case SEARCH_FIELD_CHANGED:
      return { ...state, [action.payload.prop]: action.payload.value };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        error: {},
        loading: false,
        categories: action.payload,
      };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FETCH_LISTINGS_SUCCESS:
      return {
        ...state,
        error: {},
        places: action.payload.places,
        totalPages: Number(action.payload.totalPages),
      };
    case FETCH_LISTINGS_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_LISTING_SUCCESS:
      return {
        ...state,
        error: {},
        reviews: [], // let's also clear the reviews at this point
        selectedListing: action.payload,
      };
    case FETCH_LISTING_FAILURE:
      return { ...state, error: action.payload };
    case SEARCH_LISTINGS_SUCCESS:
      return {
        ...state,
        error: {},
        places: action.payload.places,
        totalPages: Number(action.payload.totalPages),
      };
    case SEARCH_LISTINGS_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_USER_LISTINGS_SUCCESS:
      return {
        ...state,
        error: {},
        places: action.payload.places,
      };
    case FETCH_USER_LISTINGS_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_FAVOURITE_LISTINGS_SUCCESS:
      return {
        ...state,
        error: {},
        favourites: action.payload.places,
      };
    case FETCH_FAVOURITE_LISTINGS_FAILURE:
      return { ...state, error: action.payload };
    case FETCH_LISTING_REVIEWS_SUCCESS:
      return {
        ...state,
        error: {},
        reviews: action.payload,
      };
    case FETCH_LISTING_REVIEWS_FAILURE:
      return { ...state, error: action.payload };
    case CLEAR_LISTINGS:
      return {
        ...state,
        error: {},
        places: [],
        totalPages: 1,
        selectedListing: null,
        selectedCategory: null,
      };
    default:
      return state;
  }
};

const persistConfig = {
  storage,
  key: 'listings',
  blacklist: ['favourites', 'reviews'],
};

export default persistReducer(persistConfig, authReducer);
