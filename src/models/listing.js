import API from 'src/services/api';
import DebugConfig from 'src/config/debug';
import FixtureAPI from 'src/services/fixtureApi';

import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_LISTING_SUCCESS,
  FETCH_LISTING_FAILURE,
  FETCH_LISTINGS_SUCCESS,
  FETCH_LISTINGS_FAILURE,
  SEARCH_LISTINGS_SUCCESS,
  SEARCH_LISTINGS_FAILURE,
} from 'src/state/types';


const api = DebugConfig.useFixtures ? FixtureAPI : API.create();


export const fetchCategories = (dispatch, token) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .getCategories()
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: res.data });
      }
    });
};

export const fetchCategoryListings = (dispatch, token, id, page) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .getCategoryListings(id, page)
    .then((res) => {
      if (res.status === 200) {
        const totalPages = res.headers['x-wp-totalpages'];
        dispatch({ type: FETCH_LISTINGS_SUCCESS, payload: { listings: res.data, totalPages } });
      } else {
        dispatch({ type: FETCH_LISTINGS_FAILURE, payload: res.data });
      }
    });
};

export const performSearch = (dispatch, token, search) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .searchListings(search)
    .then((res) => {
      if (res.status === 200) {
        const totalPages = res.headers['x-wp-totalpages'];
        dispatch({ type: SEARCH_LISTINGS_SUCCESS, payload: { listings: res.data, totalPages } });
      } else {
        dispatch({ type: SEARCH_LISTINGS_FAILURE, payload: res.data });
      }
    });
};

export const fetchListing = (dispatch, token, id) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api
    .getListing(id)
    .then((res) => {
      if (res.status === 200) {
        dispatch({ type: FETCH_LISTING_SUCCESS, payload: res.data });
      } else {
        dispatch({ type: FETCH_LISTING_FAILURE, payload: res.data });
      }
    });
};